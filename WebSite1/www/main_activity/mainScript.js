myApp.onPageInit('main', function (page) 
{

    $("#toggle").click(function () 
	{
        if ($('#panel').css('display') == 'block') 
        {

            var height = '-=' + $('#panel').height();
            $('#panel').css('visibility', 'hidden');

        } else 
        {
            $('#lower').css('width', '100%');
            $('#panel').css('visibility', 'visible');

            var height = '+=' + $('#panel').height();

        }
        $("#panel").slideToggle("slow");
    });




createDropdown(videos);

setInterval(function () {
     vid = document.getElementById("beachVid");

        getCurTime();
    }, 1000);


});



function getCurTime() {
    $("div#dronInfo").text(Math.round(vid.currentTime));


   // alert(vid.currentTime);
}

function setCurTime() {
    vid.currentTime = 5;
}