myApp.onPageInit('main', function (page) {
    console.log('Main initialized');

    $("#toggle").click(function () {
        if ($('#panel').css('display') == 'block') {
            var height = '-=' + $('#panel').height();
        } else {
            var height = '+=' + $('#panel').height();
        }
        $("#panel").slideToggle("slow");
        $("#upper").animate({
            bottom: height
        }, "slow")
    });

});


