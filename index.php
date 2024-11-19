<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Inspelningar för kursen i Databearbetning</title>
<link rel="stylesheet" href="./style.css">
<script src="./script.js" defer></script>
</head>

<body>
<?php
$whitelist = array("bistromd", "parland");
if (in_array($_SERVER['REMOTE_USER'], $whitelist)) {
    ?>

    <div class="lectureSelector">
        <small class="current" data-lecture='1'>Lecture 1</small><small data-lecture='2'>Lecture 2</small><small data-lecture='3'>Lecture 3</small><small data-lecture='4'>Lecture 4</small>
        <button class="toggler" id="lightModeToggler">Toggle light mode</button>    
    </div>

    <div class="lecture" data-lecture='1'>
    <video controls preload="none" poster="lektion1.jpg">
    <source src="../lectures/DataLektion1.mp4" type="video/mp4">
    <track src="../lectures/DataLektion1.vtt" kind="subtitles" srclang="sv" label="Svenska" />
    </video>

    <div class="timecodes">
    <span data-seconds='0'>Start</span>
    <span data-seconds='120'>Inspelningar</span>
    <span data-seconds='360'>Börjar med presentation</span>
    <span data-seconds='420'>Kursinnehåll</span>
    <span data-seconds='600'>Kursplan och förväntningar</span>
    <span data-seconds='660'>Bedömning och närvaro</span>
    <span data-seconds='720'>mer info</span>
    <span data-seconds='840'>Anaconda/Jupyter Notebooks/CSC Notebooks</span>
    <span data-seconds='1320'>CSC Notebooks login</span>
    <span data-seconds='1500'>Join workspace</span>
    <span data-seconds='1560'>start session</span>
    <span data-seconds='1620'>skapa python3 notebook</span>
    <span data-seconds='1800'>stöd med studier? 10/28 :)</span>
    <span data-seconds='2100'>Upplägg, 8 lektioner, 4 inlämningsuppg.</span>
    <span data-seconds='2820'>PAUS över, fortsätter</span>
    <span data-seconds='2880'>Getting started, lite teori</span>
    <span data-seconds='3240'>JIT(just in time) compiler vs interpreter</span>
    <span data-seconds='3300'>verktyg</span>
    <span data-seconds='3480'>kodning, lite python syntax</span>
    <span data-seconds='3960'>python basics </span>
    <span data-seconds='4080'>interaktiv hjälp</span>
    <span data-seconds='4440'>import pandas as pd</span>
    <span data-seconds='4560'>Spel # 1 sten, sax påse</span>
    <span data-seconds='5160'>tips</span>
    <span data-seconds='5640'>PAUS</span>
    <span data-seconds='6420'>PAUS över, fortsätter</span>
    <span data-seconds='6600'>python challenge,code wars och code signal</span>
    <span data-seconds='7260'>fortsätter koda python basics while,list,reverse</span>
    <span data-seconds='7980'>funktioner, kalkylator</span>
    <span data-seconds='8400'>läxa, resurser och spel</span>
    <span data-seconds='8580'>documentation</span>
    </div>


    <button class="toggler">Show transcript</button>
    <div class="transcript">Transcript will be loaded here</div>
    </div>


    <div class="lecture" data-lecture='2'>
    <video controls preload="none" poster="lektion2.jpg">
    <source src="../lectures/DataLektion2.mp4" type="video/mp4">
    <track src="../lectures/DataLektion2.vtt" kind="subtitles" srclang="sv" label="Svenska" />
    </video>

    <div class="timecodes">
    <span data-seconds='0'>Lektionsupplägg</span>
    <span data-seconds='180'>Hur gick läxan?</span>
    <span data-seconds='540'>Python basics</span>
    <span data-seconds='600'>Öppna notebooksahtiappi</span>
    <span data-seconds='720'>Ny notebook, download as pynb</span>
    <span data-seconds='780'>Lektion 2 Datastrukturer och moduler</span>
    <span data-seconds='1140'>Varför databearbetning och datavetenskap?</span>
    <span data-seconds='1620'>Datastrukturer forts.</span>
    <span data-seconds='1680'>Köplistan</span>
    <span data-seconds='2040'>PAUS</span>
    <span data-seconds='2880'>Fortsätter, google trend</span>
    <span data-seconds='2940'>Datastrukturer fortsSets[],Tuples[],Lists[],Dictionary{}</span>
    <span data-seconds='3120'>Visar Tuples[]</span>
    <span data-seconds='3240'>Funktioner och loopar</span>
    <span data-seconds='3420'>fortsätter koda funktioner</span>
    <span data-seconds='3600'>Docstring</span>
    <span data-seconds='3720'>ask_for_input, str_to_int,add_numbers</span>
    <span data-seconds='4260'>Listor Klurigheter och tilläggsmoduler</span>
    <span data-seconds='4380'>Python fortsModuler och Klasser</span>
    <span data-seconds='4560'>OOP Encapsulation refresher</span>
    <span data-seconds='4800'>Spel #3 Optimus prime</span>
    <span data-seconds='5880'>PAUS</span>
    <span data-seconds='6480'>fortsätter</span>
    <span data-seconds='6660'>python i jupyter/Anaconda prompt, class Person</span>
    <span data-seconds='7020'>sparar som Persony</span>
    <span data-seconds='7380'>from Person import Person as person</span>
    <span data-seconds='7800'>Slutför spelen brush up ur skills</span>
    <span data-seconds='7980'>bra videoresurser</span>
    <span data-seconds='8100'>Läxan,förhöret,gör övningar</span>
    </div>


    <button class="toggler">Show transcript</button>
    <div class="transcript">Transcript will be loaded here</div>
    </div>

    <?php
    } 
else {    print("<br>Du har inte tillgång till inspelningarna, kontakta Dennis");  }
?>

</body>

</html>
