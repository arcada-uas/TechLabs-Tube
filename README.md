# TechLabs-Tube
Det var dags att ladda upp koden för min hostingsajt för föreläsningar.

## Tech stack
Sajten använder PHP för användarhantering, och JS för interaktivitet. 
Videorna är vanliga HTML5 element, enda tillägget är javascript hotkeys för tangenterna L och J som skuffar framåt och bakåt tiden med 15s.

## Features
Dark mode, light mode, chapters från studerandesubmitted timecodes och textning som görs lokalt manuellt med hjälp av whisper-live (medium model sv)

## Såhär ser sajten ut
![image](https://github.com/user-attachments/assets/cccbc597-c63e-411b-9985-48c408656a39)

## Utmaningar
Videona hostas i full resolution från en nätverksskiva på en gammal-ish server, om många tittar på videon samtidigt kommer den nåttag att stärva.
Backup lösningen på nätverksskivan gör att videon som inhyses på skivan finns lagrade flera gånger i backupsen, det här är inte effektiv användning av hårdskiveutrymme.

# Roadmap
Flera kolleger har önska _en upload interface_ i form av en "studio" av nåt slag, klippande av videon innan uppladdning t.ex.
Det här är ett större projekt och vi har en studis som har valt det här som tema för examensarbetet.
_Playlist funktionalitet_ kunde vara ett skönt tillägg, då kunde man ladda upp mindre klipp och organisera dem smidigt i en spellista.
_Auto chapterisation_ har föreslagits och testats med LLM summarization av autotranskriptionen. Resultaten var av varierande kvalitet.
_Auto chapterisation using CV_ har föreslagits som nästa test, där man kunde hitta text större än 28pt med CV och göra en chapter av det med Tesseract eller motsvarande OCR.
