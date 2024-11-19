let darkMode = true;
let transcript = false;
/* Dark mode eventlistener */
function darkModeHandler() {
    document.querySelector("#lightModeToggler").addEventListener("click", function () {
        if (!darkMode) {
            document.body.style.backgroundColor = "#3D3D3D";
            document.body.style.color = "#FFF";
            myStyle = document.styleSheets[0];
            myStyle.cssRules[1].style.color = "#b7b7ff"
            darkMode = true;
        } else {
            document.body.style.backgroundColor = "#FFF";
            myStyle = document.styleSheets[0];
            myStyle.cssRules[1].style.color = "#000081"
            darkMode = false;
        }
    })
}

/* Function to attach eventlisteners to timecode and transcription spans */
function attachListeners() {
    const elems = document.querySelectorAll("span");
    elems.forEach(function (elem) {
        elem.addEventListener("click", function () {
            seekTo(elem, elem.dataset.seconds)
        });
    });
    const lectures = document.querySelectorAll("small");
    lectures.forEach(function (lecture) {
        lecture.addEventListener("click", function () {
            swapLecture(lecture, lecture.dataset.lecture);
            currentLecture = lecture.dataset.lecture;
        });
    });
    /* L and J keys for 15 second skips */
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        const skipTime = 15;
        const currentLecture = document.querySelector(".current").dataset.lecture
        // console.log(document.querySelectorAll("[data-lecture=\""+currentLecture+"\"]")[1]); // Debug
        video = document.querySelectorAll("[data-lecture=\""+currentLecture+"\"]")[1].firstElementChild
        if (key === 'l') {
            video.currentTime = video.currentTime + skipTime
        } else if (key === 'j') {
            video.currentTime = video.currentTime - skipTime
        }
    });
}

/* Seek to right part of a video */
function seekTo(el, seconds) {
    // console.log(el.parentNode.parentNode.firstElementChild) // Debug
    video = el.parentNode.parentNode.firstElementChild;
    video.currentTime = seconds;
    video.play();
}

/* Swap between lectures, hide all lectures exept relevant one */
function swapLecture(targetLecture) {
    cues = [] // Empty cues when swapping lectures
    const currentLecture = document.querySelector(".current");
    currentLecture.classList.remove("current");
    targetLecture.classList.add("current");
    console.log("Swapping to lecture " + targetLecture.dataset.lecture);
    const lectures = document.querySelectorAll(".lecture");
    lectures.forEach(function(lecture) {
        lecture.style.display = "none";
    })
    document.querySelectorAll("[data-lecture=\""+targetLecture.dataset.lecture+"\"]")[1].style.display = "block";
}

/* Eventlisteners for "show transcription" button under videos */
const transcripts = document.querySelectorAll(".toggler:not(#lightModeToggler)");
transcripts.forEach(function (elem) {
    elem.addEventListener("click", function () {
        showTranscript(elem);
    });
});

/* Create spans for transcript box under video */
function showTranscript(elem) {
    elem.nextElementSibling.style.display = "inline-block";
    //console.log(elem.parentNode.firstElementChild.lastElementChild.src); // Debug
    fetchSubs(elem, elem.parentNode.firstElementChild.lastElementChild.src);
    elem.style.display = "none"; // Hide transcript button
}

/* Fetch text content from subtitle file of video */
let cues = []
function fetchSubs(elem, fileUrl) {
    fetch(fileUrl, { method: 'GET', headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
        .then(response => {
            if (!response.ok) { console.log('Unable to retrieve file.'); }
            return response.text();
        })
        .then(responseText => {
            return parseWebVTT(responseText);
        })
        .then(cues => {
            generateSubs(elem, cues);
            attachListeners(elem);
            initScrolling(elem);
        });
}

/* Create spans from subs */
function generateSubs(elem, cues) {
    let spansHTML = ""
    for (i = 0; i < cues.length; i++) {
        spansHTML += "<span data-seconds=" + cues[i].start + ">" + cues[i].content + "</span>"
    }
    elem.parentNode.lastElementChild.innerHTML = spansHTML;
}

// Function to parse webvtt file
function parseWebVTT(data) {
    let srt;
    srt = data.split('\n').slice(1).join('\n');     // remove WEBVTT identifier line
    srt = srt.replace(/\r+/g, ''); // remove dos newlines
    srt = srt.replace(/^\s+|\s+$/g, ''); // trim white space start and end

    // parse cues
    const cuelist = srt.split('\n\n');
    for (i = 0; i < cuelist.length; i++) {
        const cue = cuelist[i];
        let content = "", start, end, id = "";
        const s = cue.split(/\n/);
        let t = 0;
        // is there a cue identifier present?
        if (!s[t].match(/(\d+):(\d+):(\d+)/)) {
            // cue identifier present
            id = s[0];
            t = 1;
        }
        // is the next line the time string
        if (s[t].match(/(\d+):(\d+):(\d+)/)) {
            // parse time string
            const m = s[t].match(/(\d+):(\d+):(\d+)(?:.(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:.(\d+))?/);
            start = (parseInt(m[1], 10) * 60 * 60) + (parseInt(m[2], 10) * 60) + (parseInt(m[3], 10));
            end = (parseInt(m[5], 10) * 60 * 60) + (parseInt(m[6], 10) * 60) + (parseInt(m[7], 10));
        } else {
            // Unrecognized timestring: next cue
            continue;
        }
        // concatenate text lines to html text
        content = s.slice(t + 1).join("<br>");
        // add parsed cue
        cues.push({ id: id, start: start, end: end, content: content });
    }
    return cues;
}

/* Run the attachListeners once to enable timecode functionality */
attachListeners();

function initScrolling(elem) {
    // console.log(elem.parentNode.firstElementChild) // debug
    video = elem.parentNode.firstElementChild;
    /* The timeupdate event fires every second on a playing video element */
    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
        syncScrollToSubs(currentTime);
    });
}

function syncScrollToSubs(currentTime) {
    // Find the paragraph that matches the current time
    let targetParagraphs, targetParagraph;
    for (let i = 0; i < cues.length; i++) {
        if (cues[i].start <= currentTime) {
            targetParagraphs = document.querySelectorAll("[data-seconds='" + cues[i].start + "']");             // Find current target subtitle
            // There might be a timecode with the same data-seconds attribute, so make sure to select last elem
            targetParagraph = targetParagraphs[targetParagraphs.length - 1]
            // Highlight current paragraph, To-Do: remove previous highlights
            targetParagraph.style.fontWeight = "bold";
        }
    }
    // Scroll the container to the target paragraph
    if (targetParagraph) {
        const offsetTop = targetParagraph.offsetTop;
        let subtitlesContainer = targetParagraph.parentElement;
        const offsetBox = targetParagraph.parentElement.offsetTop
        // Added 47 px so that scrollpos is second row instead of top row, matter of preference maybe, reverted this change.
        subtitlesContainer.scrollTop = offsetTop - offsetBox;
    }
}

darkModeHandler()
