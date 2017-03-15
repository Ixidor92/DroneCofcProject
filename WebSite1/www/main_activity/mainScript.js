var map;
var vid;
var Xcoords = [];
var Ycoords = [];

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

    initMap();



});

function loadKmlLayer(src) {
    var kmlLayer = new google.maps.KmlLayer(src, {
        suppressInfoWindows: true,
        preserveViewport: true,
        zoom: 17,
        map: map
    });
}

function initMap() {
    //videoSec = getCurTime();
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.6630, lng: -79.9205 },
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    loadKmlLayer('https://dl.dropboxusercontent.com/s/uwyr9ogsont4qiw/FollyBeachMap.kml?dl=1');
}



function gmapLoop() {
    setInterval(function () {
        vid = document.getElementById("beachVid");

        getCurTime();
    }, 2000);
}

function setTerrain() {
    map.setMapTypeId('terrain');
//    var kmzLayer = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/s/uwyr9ogsont4qiw/FollyBeachMap.kml?dl=1');
  //  kmzLayer.setMap(map);
    //map.setZoom(19);
}

function setSatellite() {
    map.setMapTypeId('satellite');
}

function getCurTime() {
    var videoSec = Math.round(vid.currentTime);

    var yourLat = Ycoords[videoSec]
    var yourLng = Xcoords[videoSec]

    



    var latLng = new google.maps.LatLng(yourLat, yourLng); //Makes a latlng
    map.panTo(latLng); //Make map global

   // map.setCenter({ lat: yourLat, lng: yourLng })


    //return videoSec;

}

function setCurTime() {
    vid.currentTime = 5;
}




function changeVideo(element, choice) {
    var selection = document.getElementById("videos").value;
    element.removeChild(videoSource);
    addSourceToVideo(element, choice);

    element.load();
    element.play();

    var x = document.getElementById("videos").selectedIndex;
    var y = document.getElementById("videos").options;
    var indexOfChoice = y[x].index;
    //console.log(indexOfChoice);

    //This will be in a database/SERVER
    var srtFiles = 
        ["https://dl.dropboxusercontent.com/s/3r24rzogrelv5s7/DJI_0001.SRT?dl=1",
         "https://dl.dropboxusercontent.com/s/b01avn34k71duv4/DJI_0007.SRT?dl=1",
         "https://dl.dropboxusercontent.com/s/1k36j6vgbak3fx5/DJI_0011.SRT?dl=1",
         "https://dl.dropboxusercontent.com/s/o8nwdv5eopzmn89/DJI_0013.SRT?dl=1"
        ];


    var srtURL = srtFiles[indexOfChoice-1];
    //console.log(srtURL)

    $.ajax({
        url: srtURL,
        success: function (file_content) {
            var lines = file_content.split("\n");
            var startIndex = 3;
            while (lines[startIndex] != null) {
                var firstPos = lines[startIndex].indexOf("(");
                var lastPos = lines[startIndex].lastIndexOf(")");
                var gpsCoords = lines[startIndex].slice(firstPos + 1, lastPos - 3);
                var splitXYcoords = gpsCoords.split(",");
                Xcoords.push(splitXYcoords[0])
                Ycoords.push(splitXYcoords[1])
                startIndex = startIndex + 6;
            }
        }
    });

    gmapLoop()
}


function addSourceToVideo(element, src) {
    var source = document.createElement('source');

    source.id = "videoSource";
    source.src = "/WebSite1/www/main_activity/follyVideos/" + src;
    source.type = "video/mp4";

    element.appendChild(source);
}

function createDropdown(element) {
    var myArray = new Array("exampleOne.mp4", "exampleTwo.mp4", "exampleThree.mp4", "exampleFour.mp4");
    for (i = 0; i < myArray.length; i++) {
        var op = document.createElement('option');
        var t = document.createTextNode(myArray[i]);
        op.value = myArray[i];
        op.appendChild(t);
        element.appendChild(op);
    }
}