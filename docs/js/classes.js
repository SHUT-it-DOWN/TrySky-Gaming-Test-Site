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
                        
            $.each(data, function(originalClassType, data) {

                let classType = originalClassType.replace(" ", "")

                // Adds character class div, header, and list of specializations
                $("#classes").append(`<div class="class" id="${classType}" ></div>`);
                $(`#${classType}`).append("<h1>" + classType + "</h1>");
                $(`#${classType}`).append("<ul class='specList'></ul>");
                
                $.each(data, function(classSpec, classData) {

                    $.each(classData, function(originalSpecName, specData) {

                        let specName = originalSpecName.replace(" ", "")

                        // Add each specialization to the list of specializations
                        $(`#${classType} > ul`).append(`<li id="${specName}"><img src="${specData['SpecIcon']}"/><p>${originalSpecName}</p></li>`);

                        $(`#${classType}`).append(`<div class="spec" id="${specName}"></div>`);

                        console.log(`#${classType} > #${specName}`)

                        $(`#${classType} > #${specName}`).append("<h2>" + originalSpecName + "</h2>");
                        $(`#${classType} > #${specName}`).append("<ul></ul>");

                        $(`#${classType} > #${specName} > p`).after("<div class='stats'></div>");
                        $(`#${classType} > #${specName}`).append("<div class='stats'></div>");

                        // Add each stat to stats div, along with the associated color to go along with it.
                        specData['StatPriority'].forEach(stat => {
                            $(`#${classType} > #${specName} > div.stats `).append(`<div style="background-color: ${statColors[stat]};">${stat}</div>`);
                        });

                        // Append BiS and SkillTree Links to current spec
                        $(`#${classType} > #${specName} > ul`).append(`<a href='${specData['SkillTree']}' target='_blank'><li>Talent Tree</li></a>`);
                        $(`#${classType} > #${specName} > ul`).append(`<a href='${specData['BiS']}' target='_blank'><li>BiS Armor</li></a>`);

                    })
                    
                });
            });

        }


    }).then(function() {
        
        // Hide all the subclasses, until one is clicked
        $(".spec").hide();

    });
});






$(document).on('click', '.specList > li', function(event) {

    // Reset all the borders and hide any subclasses that are open


    let thisClass = $(this).attr("class");

    if (thisClass == "selected") {
        $(this).css("border", "solid 5px #303030");
        $(this).parent().parent().find(`.spec`).slideUp(750);
        $(this).removeAttr("class");
    }

    thisClass == "selected" ? $("li").removeClass("selected") : $(this).addClass("selected");

    $("li").css("border", "solid 5px #303030");
    $(".spec").hide();

    

    if (event.target === this) {

        let classID = $(this).attr("id");
        let classColor = $(this).find("p").css("color")
            
        $(this).css("border-color", classColor);

        $(this).parent().parent().find(`div#${classID}`).show();
        // $("html, body").scrollTop($(this).offset().top - 200);

        let parentElement = $(this).parent().parent();


        // $(this).animate({
        //     scrollTop: parentElement.offset().top - 100
        // }, 750);

        $('html, body').animate({
            scrollTop: parentElement.offset().top - 100
        }, 750);

    }
});