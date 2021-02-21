sublocations = {
	//Double checked location and events with remnantfromtheashes.wiki.fextralife.com
	
	//Earth
    "RootWraith": "TheHiddenSanctum",
    "RootBrute": "SunkenPassage",
    "Brabus": "CutthroatChannel",
    "RootTumbleweed": "TheTangledPass",
    "Splitter": "ResearchStationAlpha",
    "RootEnt": "TheChokingHollow",
    "RootDragon": "TheAshYard",
    "HuntersHideout": "HiddenGrotto",
    "MadMerchant": "Junktown",
    "LastWill": "Sorrow'sField",
    "RootShrine": "TheGallows",
    "LizAndLiz": "TheWarren",
	"RootCultist": "MarrowPass",
	
	// Rhom
    "SwarmMaster": "TheIronRift",	
    "HoundMaster": "TheBurrows",
    "Sentinel": "ShackledCanyon",
    "Vyr": "TheArdentTemple",
    "WastelandGuardian": "LoomOfTheBlackSun",
    "TheHarrow": "TheBunker",
    "TheLostGantry": "ConcourseOfTheSun",
    "ArmorVault": "VaultOfTheHeralds",
    "TheCleanRoom": "ThePurgeHall",
	
	// Corsus
    "SlimeHulk": "TheDrownedTrench",
    "Tyrant": "TheCapillary",
    "FlickeringHorror": "HallOfWhispers",
    "BarbTerror": "NeedleLair",
    "QueensTemple": "IskalTemple",
    "SwampGuardian": 'TheGrotto',
    "Wisp": "CircletHatchery",
    "FetidPool": "FetidPools",
    "BrainBug": "StrangePass",
    "Fatty": " TheShack",
	
	// Yaesha
    'KinCaller': "TheHallOfJudgement",
    "BlinkFiend": "Widow'sPass",
    'BlinkThief': 'VerdantStrand',
    "StormCaller": "Heretic'sNest",
    "ImmolatorAndZephyr": "WitheringVillage",
	"Wolf": "Ravager'sHaunt",
    'DoeShrine': "Widow'sVestry",
    'WolfShrine': "TempleOfTheRavager",
    'TheRisen': "Ahanae'sLament",
    'TotemFather': "TheScaldingGlade",
    'StuckMerchant': "MerchantDungeon",
	
	//Reisum
	"UrikkiBlademasters": "ValenhagMines",
	"ShieldWarden": "Exiles'sTrench",
	"BlizzardMage": "WutheringKeep",
	"TheJackal": "WildReach",
	"WarningTotems": "Magir'sDirge",
	"ShamanFlames": "GraveOfTheElders",
	"RatRider": "CrimsonHold",
	"FrozenLords": "Judgement'sSpear",
	"IceSkimmer": "TheFrieranSea",
	"CreepersPeeper": "Watcher'sHollow"

}


mainLocations = {
 "City Overworld Zone1": "Fairview",
 "City Overworld Zone2": "Westcourt",
 "Wasteland Overworld Zone1": "TheEasternWind",
 "Wasteland Overworld Zone2": "TheScouringWaste",
 "Jungle Overworld Zone1": "TheVerdantStrand",
 "Jungle Overworld Zone2": "TheScaldingGlade",
 "Swamp Overworld Zone1": "TheFetidGlade",
 "Swamp Overworld Zone2": "TheMistFen",
 "Snow Overworld Zone1": "DrolniirWoods",
 "Snow Overworld Zone2": "DeepfrostExpanse"
}

function loadFile(o) {
    var fr = new FileReader();
    fr.onload = function(e) {
        showDataFile(e, o);
    };
    fr.readAsText(o.files[0]);
}

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

let dropArea;

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    files = e.dataTransfer.files;

    o = {files: files}
    loadFile(o);
}

function getWorldData(textArray, worldMode) {
    zones = {}

    zones["Earth"] = {}
    zones["Rhom"] = {}
    zones["Yaesha"] = {}
    zones["Corsus"] = {}
    zones["Reisum"] = {}

    var currentMainLocation;

    if (worldMode == "#adventure") {
        currentMainLocation = textArray[1].split("/")[1].split("_")[1]
    } else {
        currentMainLocation = "Fairview"
    }

    var currentSublocation = "";

    for (i = 0; i < textArray.length; i++) {
        var zone;
        var eventType;
        var eventName;
        var lastEventname;
        var inSmallDungeon = true;

        textLine = textArray[i]

        if (!textLine.split("/")[1]) {
            // hack shit because I'm getting weird extra lines
            // could perhaps safely remove this by starting at i=1
            continue
        }

        //translate world/region names to readable text
        if ( textLine.search("World_City") != -1) {
            zone = "Earth"
        }
        if ( textLine.search("World_Wasteland") != -1) {
            zone = "Rhom"
        }
        if ( textLine.search("World_Jungle") != -1) {
            zone = "Yaesha"
        }
        if ( textLine.search("World_Swamp") != -1) {
            zone = "Corsus"
        }
        if ( textLine.search("World_Snow") != -1) {
            zone = "Reisum"
        }

        lastEventname = eventName

        //look for side dungeons
        if (textLine.search("SmallD") != -1) {
            eventType = "Side Dungeon"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            }
            inSmallDungeon = true
        }
        //look for overworld POI's
        if (textLine.search("OverworldPOI") != -1) {
            eventType = "Point of Interest"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = currentMainLocation
            if (worldMode == "#adventure") {
                currentSublocation = ''
            }
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            }
            inSmallDungeon = true
        }

        //Look for quest bosses
        if (textLine.search("Quest_Boss") != -1) {
            eventType = "World Boss"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            }
        }

        //look for sieges
        if (textLine.search("Siege") != -1) {
            eventType = "Siege"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            }
        }

        //look for minibosses
        if (textLine.search("Mini") != -1) {
            eventType = "Miniboss"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            if (currentSublocation == undefined){
                currentSublocation = "Not added yet"
            }
        }

        //look for Item drops
        if (textLine.search("Quest_Event") != -1) {
            eventType = "Item Drop"
            eventName = textLine.split("/")[3].split("_")[2]

            // edge case for out of order items
            if (textLine.split("/")[1].split("_")[1] != textArray[i - 1].split("/")[1].split("_")[1]) {
                currentSublocation = ''
            }

        }

        if (textLine.search("Overworld_Zone") != -1) {
            currentMainLocation = textLine.split("/")[3].split("_")[1] + " " + textLine.split("/")[3].split("_")[2] + " " +  textLine.split("/")[3].split("_")[3]
            currentMainLocation = mainLocations[currentMainLocation]

        }

        //Renames the bosses
        if (eventName != lastEventname) {
          // Replacements
            if (eventName != undefined) {
                 eventName = eventName.replace('FlickeringHorror', 'DreamEater')
                 .replace('Wisp', 'HiveWisps')
                 .replace('TheRisen', 'Reanimators')
                 .replace('LizAndLiz', 'LizChicagoTypewriter')
                 .replace('Fatty', 'TheUncleanOne')
                 .replace('WastelandGuardian', 'Claviger')
                 .replace('RootEnt', 'EntBoss')
                 .replace('RootDragon', 'Singe')
                 .replace('SwarmMaster', 'Scourge')
                 .replace('RootWraith','Shroud')
                 .replace('RootTumbleweed', 'TheMangler')
                 .replace('Kincaller', 'Warden')
                 .replace('Tyrant','Thrall')
                 .replace('Vyr', 'ShadeAndShatter')
                 .replace('ImmolatorAndZephyr','ScaldAndSear')
                 .replace('RootBrute', 'Gorefist')
                 .replace('SlimeHulk', 'Canker')
                 .replace('BlinkFiend','Onslaught')
                 .replace('Sentinel', 'Raze')
                 .replace('Penitent', 'Letos Amulet')
                 .replace('LastWill', 'SupplyRunAssaultRifle')
                 .replace('SwampGuardian','Ixillis')
                 .replace('Splitter','RiphideLetosArmor')
				 .replace('RatRider','Brudvaak')
				 

            }
            //This populates the table for data to be pulled
            if (zone != undefined && eventType != undefined && eventName != undefined) {

                if (zones[zone][eventType] != undefined) {
                    if (zones[zone][eventType].search(eventName) == -1) {
                        zones[zone][eventType] += ", " + eventName

                        if (worldMode == "#adventure") {
                            mainLocationText = ''
                        } else {
                            mainLocationText = currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": "
                        }
                        html = "<tr><td>" + zone + ": " + mainLocationText + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
                    }
                } else {
                    zones[zone][eventType] = eventName

                        if (worldMode == "#adventure") {
                            mainLocationText = ''
                        } else {
                            mainLocationText = currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": "
                        }

                        html = "<tr><td>" + zone + ": " + mainLocationText + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
                }
                $(worldMode).append(html)
            }
            $('#filters').show()
        }
    }

}

updateFilters = function(checked) {
    $('.filter').each((i,f) => {
        try {
            f.checked=checked
        }
        catch {}
    })

    if (checked) {
        document.getElementById('f-name').value = ""
    }
}

function showDataFile(e, o){
    $('tr:not(.header-row)').remove()

    updateFilters(true)

    text = e.target.result
    text = text.split("/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13")[0]
    main_campaign = text.split("/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City")[1]
    if (main_campaign) {
        text = main_campaign.replace(/Game/g,"\n")
    } else { // subject 2923 campaign
        text = text.split("/Game/Campaign_Clementine/Quests/WardPrime/Quest_WardPrime_Template.Quest_WardPrime_Template")[0]
        text = text.split("/Game/World_Rural/Templates/Template_Rural_Overworld_02.Template_Rural_Overworld_02")[1].replace(/Game/g,"\n")
    }

    textArray = text.split("\n")

    adText = e.target.result

    adText = adText.split("\n")
    tempList = []
    for(i = 0; i < adText.length; i++)
    {
        if (String(adText[i]).includes('Adventure') === true)
        {
            tempList.push(adText[i])
        }
    }
    // regardless of campaign type, the last line collected will have our current adventure data
    adText = tempList[tempList.length - 1]
   
    if (adText != undefined) {
        adventureMode = true
        adText = adText.replace(/Game/g,"\n")
        adTextArray = adText.split("\n")
    } else {
        adventureMode = false
    }

    if (adventureMode) {
        getWorldData(adTextArray, "#adventure")
		
		$('.main-mode').hide()
		$('.adventure-mode').show()
		$('#toggle-adv').text("Show Campaign Mode")
    } else {
		getWorldData(textArray, "#main")
		
		$('.main-mode').show()
		$('.adventure-mode').hide()
		$('#toggle-adv').text("Show Adventure Mode")
	}

}

updateTable = function() {
    $('tr:not(.header-row)').hide()

    //Type
    if (document.getElementById('f-items').checked) {
        $('td').each(function() {
            if ($(this).text().search('Item Drop') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-sidedgs').checked) {
        $('td').each(function() {
            if ($(this).text().search('Side Dungeon') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-sieges').checked) {
        $('td').each(function() {
            if ($(this).text().search('Siege') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-poi').checked) {
        $('td').each(function() {
            if ($(this).text().search('Point of Interest') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-minibosses').checked) {
        $('td').each(function() {
            if ($(this).text().search('Miniboss') != -1) {
                $(this).parent().show()
            }
        })
    }
    if (document.getElementById('f-bosses').checked) {
        $('td').each(function() {
            if ($(this).text().search('World Boss') != -1) {
                $(this).parent().show()
            }
        })
    }

    //Regions
    earth = document.getElementById('f-earth').checked
    rhom = document.getElementById('f-rhom').checked
    corsus = document.getElementById('f-corsus').checked
    yaesha = document.getElementById('f-reisum').checked
    reisum = document.getElementById('f-yaesha').checked
    $('td').each(function() {
        if (
        ($(this).text().search('Earth')!=-1 && !earth) ||
        ($(this).text().search('Rhom')!=-1 && !rhom) ||
        ($(this).text().search('Corsus')!=-1 && !corsus) ||
        ($(this).text().search('Reisum')!=-1 && !reisum) ||
        ($(this).text().search('Yaesha')!=-1 && !yaesha))
        {
            $(this).parent().hide()
        }
    })

    //Name filter
    name = document.getElementById('f-name').value
    if (name.length>0) {
        jQuery('tr:not(.header-row)').each(function() {
            if ($(this).find('td:eq(2)').text().toLowerCase().search(name.toLowerCase())==-1) {
                $(this).hide()
            }
        })
    }
}

$( document ).ready(function() {
    $('#apply').on('click',updateTable)

    $('#toggle-adv').on('click', function() {
        $('.main-mode, .adventure-mode').toggle()
        if ($(this).text() == "Show Adventure Mode") {
            $(this).text("Show Campaign Mode")
        } else {
            $(this).text("Show Adventure Mode")
        }
    })

    dropArea = document.getElementById('drop-area');
    dropArea.addEventListener('dragenter',preventDefaults, false);
    dropArea.addEventListener('dragenter',highlight, false);
    dropArea.addEventListener('dragover',preventDefaults, false);
    dropArea.addEventListener('dragover',highlight, false);
    dropArea.addEventListener('dragleave',preventDefaults, false);
    dropArea.addEventListener('dragleave',unhighlight, false);
    dropArea.addEventListener('drop',preventDefaults, false);
    dropArea.addEventListener('drop',unhighlight, false);
    dropArea.addEventListener('drop',handleDrop, false);
})
