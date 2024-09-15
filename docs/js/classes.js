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

                        // Add each specialization to the list of specializations
                        $(`#classes > #${className} > ul`).append(`<li id="${specName}"><img src="${specData['SpecIcon']}"/><p>${originalSpecName}</p></li>`);


                        $(`#specs > #${className}`).append(`<div class="spec" id="${specName}"></div>`);




                        $(`#specs > #${className} > #${specName}`).append(`<h2>${originalSpecName} ${originalClassName}</h2>`);
                        $(`#specs > #${className} > #${specName}`).append(`<img src="../imgs/banners/${className.toLowerCase()}_${specName.toLowerCase()}_banner.jpg">`);

                        $(`#specs > #${className} > #${specName}`).append("<ul></ul>");

                        // $(`#specs > ul#${className} > #${specName}`).after("<div class='stats'></div>");
                        $(`#specs > #${className} > #${specName}`).append("<div class='statBar'></div>");

                        // Add each stat to stats div, along with the associated color to go along with it.
                        specData['StatPriority'].forEach(stat => {
                            $(`#specs > #${className} > #${specName} > div.statBar`).append(`<div style="background-color: ${statColors[stat]};">${stat}</div>`);
                        });

                        $(`#specs > #${className} > #${specName}`).append("<ul class='specLinks'></ul>");

                        // Append BiS and SkillTree Links to current spec
                        $(`#specs > #${className} > #${specName} > .specLinks`).append(`<a href='${specData['SkillTree']}' target='_blank'><li class='link'>Talent Tree</li></a>`);
                        $(`#specs > #${className} > #${specName} .specLinks`).append(`<a href='${specData['BiS']}' target='_blank'><li class='link'>BiS Armor</li></a>`);

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