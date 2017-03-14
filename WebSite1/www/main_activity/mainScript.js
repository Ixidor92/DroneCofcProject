var map;
var vid;

myApp.onPageInit('main', function (page)
{

    setInterval(function () {
        vid = document.getElementById("beachVid");

        getCurTime();
    }, 500);




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

    initMap();



});




function initMap() {
    //videoSec = getCurTime();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.6630, lng: -79.9205 },
        zoom: 15,
        mapTypeId: 'satellite'
    });
}


function getCurTime() {
    var videoSec = Math.round(vid.currentTime);
    //console.log(Xcoords[Math.round(vid.currentTime)])

    //$("div#dronInfo").text(videoSec);
    // $("#myiframe").attr("src", "newwebpage.html");
    var yourLat = parseFloat(Ycoords[videoSec])
    var yourLng = parseFloat(Xcoords[videoSec])

    console.log(yourLat,yourLng);

    map.setCenter({ lat: yourLat, lng: yourLng })
    //$("#gmapSrc").attr("src",'https://www.google.com/maps/d/embed?mid=1KhqUQNFNyPEiI5GyDVVbQYMsbB8&&ll='+ Ycoords[videoSec]+"%2C"+Xcoords[videoSec]+"&z=19");
    return videoSec;
    //                            <iframe id="gmapSrc" src="https://www.google.com/maps/d/embed?mid=1KhqUQNFNyPEiI5GyDVVbQYMsbB8&&ll=32.66301517807783%2C-79.92057232897491&z=19"></iframe>


   // alert(vid.currentTime);
}

function setCurTime() {
    vid.currentTime = 5;
}