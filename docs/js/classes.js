$(document).ready(function() {

    let statColors = {
        "Critical Strike": "#bf6c00",
        "Haste": "#0087bf",
        "Mastery": "#9200bf",
        "Versatility": "#bf0000"
    };


    $.ajax({
        type: 'GET',
        url: 'data/classes.json',
        dataType: 'json',
        success: function(data) {
                        
            $.each(data, function(originalClassName, data) {

                let className = originalClassName.replace(" ", "")

                // Adds character class div, header, and list of specializations
                $("#classes").append(`<div class="class" id="${className}" ></div>`);
                $(`#${className}`).append("<h1>" + originalClassName + "</h1>");
                $(`#${className}`).append("<ul class='specList'></ul>");

                $("#specs").append(`<div class="class" id="${className}"></div>`);
                
                
                $.each(data, function(classSpec, classData) {

                    $.each(classData, function(originalSpecName, specData) {

                        let specName = originalSpecName.replace(" ", "")

                        let urlClass = originalClassName.toLowerCase().replace(" ", "-");
                        let urlSpec = originalSpecName.toLowerCase().replace(" ", "-");
                        let urlClassType = specData['ClassType'].toLowerCase();

                        // Add each specialization to the list of specializations
                        $(`#classes > #${className} > ul`).append(`<li id="${specName}"><img src="${specData['SpecIcon']}"/><p>${originalSpecName}</p></li>`);


                        $(`#specs > #${className}`).append(`<div class="spec" id="${specName}"></div>`);




                        $(`#specs > #${className} > #${specName}`).append(`<h2>${originalSpecName} ${originalClassName}</h2>`);
                        $(`#specs > #${className} > #${specName}`).append(`<img src="./imgs/banners/${className.toLowerCase()}_${specName.toLowerCase()}_banner.jpg">`);

                        // $(`#specs > ul#${className} > #${specName}`).after("<div class='stats'></div>");
                        $(`#specs > #${className} > #${specName}`).append("<div class='statBar'></div>");

                        // Add each stat to stats div, along with the associated color to go along with it.
                        specData['StatPriority'].forEach(stat => {
                            $(`#specs > #${className} > #${specName} > div.statBar`).append(`<div style="background-color: ${statColors[stat]};">${stat}</div>`);
                        });

                        $(`#specs > #${className} > #${specName}`).append("<ul class='specLinks'></ul>");


                        

                        console.log(urlClass, urlSpec, urlClassType);

                        // Append Useful Links
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/overview-pve-${urlClassType}#${originalSpecName.replace(" ", "-").toLowerCase()}-${originalClassName.replace(" ", "-").toLowerCase()}-overview' target='_blank'><li class='link'>Overview</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/abilities-talents-pve-${urlClassType}#baseline-${originalSpecName.replace(" ", "-").toLowerCase()}-${originalClassName.replace(" ", "-").toLowerCase()}-spells' target='_blank'><li class='link'>Abilities</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/rotation-cooldowns-pve-${urlClassType}#how-to-play-${originalSpecName.replace(" ", "-").toLowerCase()}-${originalClassName.replace(" ", "-").toLowerCase()}' target='_blank'><li class='link'>Rotation</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/cheat-sheet' target='_blank'><li class='link'>Cheat Sheet</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/talent-builds-pve-${urlClassType}#talent-import-codes' target='_blank'><li class='link'>Talent Imports</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/talent-builds-pve-${urlClassType}#mythic-talent-build' target='_blank'><li class='link'>M+ Talents</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/talent-builds-pve-${urlClassType}#raid-talent-builds' target='_blank'><li class='link'>Raid Talents</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/hero-talents#raid' target='_blank'><li class='link'>Hero Talents</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/tier-set-bonuses#set-bonuses' target='_blank'><li class='link'>Tier Set</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/bis-gear#dsf67g4d-bis-items' target='_blank'><li class='link'>BiS Armor</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/bis-gear#trinket-tier-list' target='_blank'><li class='link'>BiS Trinkets</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/best-weakauras-macros-addons#recommended-${originalSpecName.replace(" ", "-").toLowerCase()}-${originalClassName.replace(" ", "-").toLowerCase()}-weakauras' target='_blank'><li class='link'>WA & Addons</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/enchants-gems-pve-${urlClassType}#consumables' target='_blank'><li class='link'>Consumables</li></a>`);
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/enchants-gems-pve-${urlClassType}#enchants' target='_blank'><li class='link'>Enchantments</li></a>`);
                        // $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='https://www.wowhead.com/guide/classes/${urlClass}/${urlSpec}/stat-priority-pve-${urlClassType}' target='_blank'><li class='link'>Stats</li></a>`);

                    })
                    
                });
            });

        }


    }).then(function() {
        
        // Hide all the subclasses, until one is clicked
        $(".spec").hide();
        $(".spec").hide();

    });
});


// $(window).scroll(function() {
//     $('div').stop(true, true);
// });



$(document).on('click', '.specList > li', function(event) {

    // Reset all the borders and hide any subclasses that are open

    // console.log($(this).attr("id"));

    // let thisClass = $(this).attr("class");

    // if (thisClass == "selected") {
    //     $(this).css("border-color", "#303030");
    //     // $(this).parent().parent().find(`.spec`).slideUp(750);

    //     $("#classes").animate({ width: "100vw"}, 750);
    //     $("#specs").animate({ width: "0vw"}, 750);
    //     $(".spec").animate({ width: "0vw", display: `none`, border: 0}, 750);

    //     $("#classes > li").removeAttr("class");
    //     $(this).removeAttr("class");
    //     return;
    // }

    // thisClass == "selected" ? $("li").removeClass("selected") : $(this).addClass("selected");

    // $("li").css("border", "solid 5px #303030");
    // $(".spec").hide();

    

    if (event.target === this) {

        let className = $(this).parent().parent().attr("id");
        let specName = $(this).attr("id");
        let classColor = $(this).find("p").css("color")

        if ($(this).attr("class") == "selected") {
            $(".specList > li").removeClass().css("border", "solid 5px #303030");
            $("#classes").animate({ width: "100vw"}, 750);
            $(".spec").animate({ width: "0vw", display: `none`, border: 0}, 750);
            $("#specs").animate({ width: "0vw"}, 750);
            return;
        }

        // Check if spec panel is already open
        if ($("#specs").width() != 0) {
            $(".spec").css("z-index", 0);
            $(".specList > li").removeClass().css("border", "solid 5px #303030");
        }

        
        // Change the border color of the selected class
        $(this).attr("class", "selected");
        $(this).css("border-color", classColor);
        

        $(`#specs > #${className} > #${specName}`).show().css({
            "border": `7px solid ${classColor}`,
            "width": "32vw",
            "z-index": 5
        });;
        // $(`#specs > #${className} > #${specName}`)

        let specInfo = $(`#specs > #${className} > #${specName} > h2`)

        if ($("#specs").width() == 0) {
            $("#classes").animate({ width: "65vw"}, 750);
            $("#specs").animate({ width: "35vw"}, 750);
        }

        $('html, body').animate({
            scrollTop: specInfo.offset().top - 65
        }, 750);

    }


    // $(window).on('scroll', function() {
    //     $('html, body').stop(true, true);
    // });

});