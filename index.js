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
        $('tr').remove()

        text = e.target.result 
        text = text.split("/Game/Campaign_Main/Quest_Campaign_Ward13.Quest_Campaign_Ward13")[0]
        text = text.split("/Game/Campaign_Main/Quest_Campaign_City.Quest_Campaign_City")[1].replace(/Game/g,"\n")
        textArray = text.split("\n")

        zones = {}


        zones["Earth"] = {}
        zones["Rhom"] = {}
        zones["Yaesha"] = {}
        zones["Corsus"] = {}

        for (i=0; i < textArray.length; i ++) {
            var zone;
            var eventType;
            var eventName;
            var lastEventname;

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

            }
            if (textLine.search("Quest_Boss") != -1) {
                eventType = "World Boss"
                eventName = textLine.split("/")[3].split("_")[2]
            }
            if (textLine.search("Siege") != -1) {
                eventType = "Siege"
                eventName = textLine.split("/")[3].split("_")[2]
            }
            if (textLine.search("Mini") != -1) {
                eventType = "Miniboss"
                eventName = textLine.split("/")[3].split("_")[2]
            }
            if (textLine.search("Quest_Event") != -1) {
                eventType = "Item Drop"
                eventName = textLine.split("/")[3].split("_")[2]
            }
            
            if (eventName != lastEventname) {
              // Replacements
                eventName = eventName.replace('LizAndLiz', 'LizChicagoTypewriter').replace('Fatty', 'TheUncleanOne').replace('WastelandGuardian', 'Claviger').replace('RootEnt', 'EntBoss').replace('Wolf', 'TheRavager').replace('RootDragon', 'Singe').replace('SwarmMaster', 'Scourge').replace('RootWraith','Shroud').replace('RootTumbleweed', 'TheMangler').replace('Kincaller', 'Warden').replace('Tyrant','Thrall').replace('Vyr', 'ShadeAndShatter').replace('ImmolatorAndZephyr','ScaldAndSear').replace('RootBrute', 'Gorefist').replace('SlimeHulk', 'Canker').replace('BlinkFiend','Onslaught').replace('Sentinal', 'Raze').replace('Penitent', 'Letos Amulet')
                if (zone != undefined && eventType != undefined && eventName != undefined) {
                    if (zones[zone][eventType] != undefined) {
                        if (zones[zone][eventType].search(eventName) == -1) {
                            zones[zone][eventType] += ", " + eventName
                            html = "<tr class='" + zone + "'><td>" + zone + "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
                            $('#events').append(html)
                        } 
                        
                    } else {
                        zones[zone][eventType] = eventName
                        html = "<tr class='" + zone + "'><td>" + zone + "</td><td>" + eventType + "</td><td>" + eventName.split(/(?=[A-Z])/).join(' ') + "</td></tr>"
                        $('#events').append(html)
                    }
            }
            $('#filters').show()

            }
            
        }
}

$( document ).ready(function() {

    $('#toggle-items').on('click', function() {
       $('tr').hide()
        $('td').each(function() {
            if ($(this).text().search('Item Drop') != -1) {
                $(this).parent().show()
            }
        })
    })
     $('#toggle-sd').on('click', function() {
       $('tr').hide()
        $('td').each(function() {
            if ($(this).text().search('Side Dungeon') != -1) {
                $(this).parent().show()
            }
        })
    })
      $('#toggle-mb').on('click', function() {
       $('tr').hide()
        $('td').each(function() {
            if ($(this).text().search('Miniboss') != -1) {
                $(this).parent().show()
            }
        })
    })
       $('#toggle-bosses').on('click', function() {
       $('tr').hide()
        $('td').each(function() {
            if ($(this).text().search('World Boss') != -1) {
                $(this).parent().show()
            }
        })
    })
        $('#toggle-all').on('click', function() {
            $('tr').show()
    })
})
