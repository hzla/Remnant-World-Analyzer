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

function loadFile(o)
    {
        var fr = new FileReader();
        fr.onload = function(e)
            {
                showDataFile(e, o);
            };
        fr.readAsText(o.files[0]);
    }

    function showDataFile(e, o)
    {
        $('tr:not(.header-row)').remove()

        text = e.target.result 
        text = text.split("/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13")[0]
        text = text.split("/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City")[1].replace(/Game/g,"\n")
        textArray = text.split("\n")

        zones = {}
        
        zones["Earth"] = {}
        zones["Rhom"] = {}
        zones["Yaesha"] = {}
        zones["Corsus"] = {}
        
        var currentMainLocaion = "Fairview";
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
                eventType = "Item"
                eventName = textLine.split("/")[3].split("_")[2]
            }

            if (textLine.search("OverWorldPOI") != -1 || textLine.search("OverworldPOI") != -1) {
                if(textLine.search("StuckMerchant") != -1 || textLine.search("WailingWood") != -1 || textLine.search("Flautist") != -1 || textLine.search("MudTooth") != -1){
                    eventType = "NPC"
                    eventName = textLine.split("/")[3].split("_")[2]
                    currentSublocation = ''
                }
         
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
                            
                            $('#events').append(html)
                        }       
                    } else {
                        zones[zone][eventType] = eventName
                            html = "<tr><td>" + zone + ": " + currentMainLocation.split(/(?=[A-Z])/).join(' ') + ": " + currentSublocation.split(/(?=[A-Z])/).join(' ') +  "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
                        $('#events').append(html)
                    }
            }
            $('#filters').show()
            }            
        }
}

$( document ).ready(function() {
    $('#toggle-items').on('click', function() {
       $('tr:not(.header-row)').hide()
        $('td').each(function() {
            if ($(this).text().search('Item') != -1) {
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
    $('#toggle-npcs').on('click', function() {
        $('tr:not(.header-row)').hide()
         $('td').each(function() {
             if ($(this).text().search('NPC') != -1) {
                 $(this).parent().show()
             }
         })
         
     })
        $('#toggle-all').on('click', function() {
            $('tr').show()
    })
})
