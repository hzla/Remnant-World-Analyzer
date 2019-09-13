sublocations = {
    "RootCultist": "MarrowPass",
    "RootWraith": "TheHiddenSanctum",
    "RootBrute": "SunkenPassage",
    "Brabus": "CutthroatChannel",
    "RootTumbleweed": "TheTangledPass",
    "RootEnt": "TheChokingHollow",
    "RootDragon": "TheAshYard",
    "HuntersHideout": "HiddenGrotto",
    "MadMerchant": "Junktown",
    "LizAndLiz": "TheWarren",
    "LastWill": "FindMonkeyKey",
    "RootShrine": "TheGallows",
    "SwarmMaster": "TheIronRift",
    "HoundMaster": "TheBurrows",
    "Sentinel": "ShackledCanyon",
    "Vyr": "TheArdentTemple",
    "WastelandGuardian": "LoomOfTheBlackSun",
    "TheHarrow": "TheBunker",
    "TheLostGantry": "ConcourseOfTheSun",
    "ArmorVault": "VaultOfTheHeralds",
    "TheCleanRoom": "ThePurgeHall",
    "SlimeHulk": "TheDrownedTrench",
    "Fatty": "TheFetidGlade",
    "Tyrant": "TheCapillary",
    "SwampGuardian": 'The Grotto',
    'KinCaller': "TheHallOfJudgement",
    "BlinkFiend": "Widow'sPass",
    'StuckMerchant': "MerchantDungeon",
    'BlinkThief': 'ForgottenUndercroft',
    "StormCaller": "Heretic'sNest",
    "ImmolatorAndZephyr": "WitheringVillage",
    'Wolf': "TheScaldingGlade",
    'TotemFather': "TheScaldingGlade",
    'TheRisen': "Ahanae'sLament",
    'DoeShrine': "Widow'sVestry",
    'WolfShrine': "Martyr'sSanctuary" 
}

mainLocations = {
 "City Overworld Zone1": "Fairview",
 "City Overworld Zone2": "Westcourt",
 "Wasteland Overworld Zone1": "TheEasternWind",
 "Wasteland Overworld Zone2": "TheScouringWaste",
 "Jungle Overworld Zone1": "TheVerdantStrand",
 "Jungle Overworld Zone2": "TheScaldingGlade",
 "Swamp Overworld Zone1": "TheFetidGlade",
 "Swamp Overworld Zone2": "TheMistFen"
}

function loadFile(o) {
    
        var fr = new FileReader();
        fr.onload = function(e)
            {
                showDataFile(e, o);
            };
        fr.readAsText(o.files[0]);
}


function getWorldData(textArray, worldMode) {

    zones = {}
            
    zones["Earth"] = {}
    zones["Rhom"] = {}
    zones["Yaesha"] = {}
    zones["Corsus"] = {}
    
    var currentMainLocation; 

    if (worldMode == "#adventure") {
        currentMainLocation = textArray[1].split("/")[1].split("_")[1]
    } else {
        currentMainLocation = "Fairview"
    }

    var currentSublocation = "";

    for (i=0; i < textArray.length; i ++) {
        var zone;
        var eventType;
        var eventName;
        var lastEventname;
        var inSmallDungeon = true;

        textLine = textArray[i]
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

        lastEventname = eventName

        if (textLine.search("SmallD") != -1) {
            eventType = "Side Dungeon"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
            inSmallDungeon = true
        }
        if (textLine.search("OverworldPOI") != -1) {
            eventType = "Point of Interest"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = currentMainLocation
            inSmallDungeon = true
        }
        if (textLine.search("Quest_Boss") != -1) {
            eventType = "World Boss"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
        }
        if (textLine.search("Siege") != -1) {
            eventType = "Siege"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
        }
        if (textLine.search("Mini") != -1) {
            eventType = "Miniboss"
            eventName = textLine.split("/")[3].split("_")[2]
            currentSublocation = sublocations[eventName]
        }
        if (textLine.search("Quest_Event") != -1) {
            eventType = "Item Drop"
            eventName = textLine.split("/")[3].split("_")[2]
        }

        if (textLine.search("Overworld_Zone") != -1) {
            currentMainLocation = textLine.split("/")[3].split("_")[1] + " " + textLine.split("/")[3].split("_")[2] + " " +  textLine.split("/")[3].split("_")[3]
            currentMainLocation = mainLocations[currentMainLocation]
        }
        
        if (eventName != lastEventname) {
          // Replacements
            if (eventName != undefined) {
                 eventName = eventName.replace('TheRisen', 'Reanimators').replace('LizAndLiz', 'LizChicagoTypewriter').replace('Fatty', 'TheUncleanOne').replace('WastelandGuardian', 'Claviger').replace('RootEnt', 'EntBoss').replace('Wolf', 'TheRavager').replace('RootDragon', 'Singe').replace('SwarmMaster', 'Scourge').replace('RootWraith','Shroud').replace('RootTumbleweed', 'TheMangler').replace('Kincaller', 'Warden').replace('Tyrant','Thrall').replace('Vyr', 'ShadeAndShatter').replace('ImmolatorAndZephyr','ScaldAndSear').replace('RootBrute', 'Gorefist').replace('SlimeHulk', 'Canker').replace('BlinkFiend','Onslaught').replace('Sentinel', 'Raze').replace('Penitent', 'Letos Amulet').replace('LastWill', 'SupplyRunAssaultRifle').replace('SwampGuardian','Ixillis')
                
            }
           
            if (zone != undefined && eventType != undefined && eventName != undefined) {

                if (zones[zone][eventType] != undefined) {
                    if (zones[zone][eventType].search(eventName) == -1) {
                        zones[zone][eventType] += ", " + eventName

                        html = "<tr><td>" + zone + ": " + currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": " + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
                        
                        $(worldMode).append(html)
                    }       
                } else {
                    zones[zone][eventType] = eventName
                        html = "<tr><td>" + zone + ": " + currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": " + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
                    $(worldMode).append(html)
                }
            }
            $('#filters').show()
        }            
    }


}
   


function showDataFile(e, o){

    $('tr:not(.header-row)').remove()

    text = e.target.result 
    text = text.split("/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13")[0]
    text = text.split("/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City")[1].replace(/Game/g,"\n")
    
    textArray = text.split("\n")


    adText = e.target.result
    adText = adText.split(/\/Quests\/Quest_AdventureMode(.+)/)[1].replace(/Game/g,"\n")
    console.log(adText)
    // adText = adText.split("/Game/World_Base/Quests/Quest_Ward13/Quest_Ward13.Quest_Ward13_C")[0]
        
    

    

    adTextArray = adText.split("\n")

    getWorldData(adTextArray, "#adventure")
    getWorldData(textArray, "#main")


}

$( document ).ready(function() {
    $('#toggle-items').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Item Drop') != -1) {
                $(this).parent().show()
            }
        })
    })
     $('#toggle-sd').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Side Dungeon') != -1) {
                $(this).parent().show()
            }
        })
    })
    $('#toggle-mb').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Miniboss') != -1) {
                $(this).parent().show()
            }
        })
    })
    $('#toggle-adv').on('click', function() {
       $('.main-mode, .adventure-mode').toggle()
    })
    $('#toggle-poi').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Point') != -1) {
                $(this).parent().show()
            }
        })
    })
    $('#toggle-bosses').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('World Boss') != -1) {
                $(this).parent().show()
            }
        })     
    })
     $('#toggle-sieges').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Siege') != -1) {
                $(this).parent().show()
            }
        })     
    })
        $('#toggle-all').on('click', function() {
            $('tr').show()
    })
})
})
