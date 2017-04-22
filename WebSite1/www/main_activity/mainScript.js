var map;
var vid;
var beachName ='';
//srt parsing files
var Xcoords = [];
var Ycoords = [];
var droneHeight = [];
var droneTime = [];
var droneDate = [];
var data;

var image = '../main_activity/blueIcon.png '

//var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';


//kml layers
var kmlLayer1;
var kmlLayer2;
var kmlLayer3;
var kmlLayer4;
var kmlLayer5;

//Server files
var kmlSrcArray = [];
var videoSrcArray = [];
var srtSrcArray = [];

var kmlTemp = ['https://dl.dropboxusercontent.com/s/mklumc400rhofjn/charleston_PFD.kml?dl=1', 'https://dl.dropboxusercontent.com/s/c99sgjqunvos71x/floodzones.kml?dl=1', 'https://dl.dropboxusercontent.com/s/qpc6xixqmw6b6dx/groins.kml?dl=1', 'https://dl.dropboxusercontent.com/s/omfzuniqm8qhibx/Shoreline.kml?dl=1', 'https://dl.dropboxusercontent.com/s/03v0xew2o922hwg/transects.kml?dl=1'];



myApp.onPageInit('main', function (page)
{
    //pixelSearch();
});



function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 32.6630, lng: -79.9205 },
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });


}



function gmapLoop() {
    setInterval(function () {
        vid = document.getElementById("beachVid");
        var videoSec = getCurTime();

        $$("div#droneDate").text('Date: ' + droneDate[videoSec]);
        $$("div#droneHeight").text('Altitude: ' + droneHeight[videoSec]+' Meters');
        $$("div#droneTime").text('Time: ' + droneTime[videoSec]);
        $$("div#droneCoords").text('GPS: (' + Xcoords[videoSec] + ',' + Ycoords[videoSec]+')');

    }, 1000);
}

//Might be useless now
function setTerrain() {
    map.setMapTypeId('terrain');
}

//Might be useless now
function setSatellite() {
    map.setMapTypeId('satellite');
}

function getCurTime() {
    var videoSec = Math.round(vid.currentTime);
    var yourLat = Ycoords[videoSec]
    var yourLng = Xcoords[videoSec]   
    var latLng = new google.maps.LatLng(yourLat, yourLng); //Makes a latlng

    panTo(yourLat, yourLng)
    return videoSec;

}

//might be useless
function setCurTime() {
    vid.currentTime = 5;
}

var srcChanged = 0;
var toggler = 0;
function toggleSlide() {

    if (srcChanged == 1) {
        $("#myiframe").attr("src", "https://docs.google.com/presentation/d/1IeqKvbWp7m9_8CJw7zToX88lVHbKgbIZB23N5qdO31c/embed?start=false&loop=false&delayms=3000");
    }
    toggler++;
    if (toggler % 2 == 0)
    {
        $('.slidePresentation-container').css('visibility', 'hidden'); }
    else { $('.slidePresentation-container').css('visibility', 'visible');}
    srcChanged = 0;
}

function editSlide() {
    $("#myiframe").attr("src", "https://docs.google.com/presentation/d/1IeqKvbWp7m9_8CJw7zToX88lVHbKgbIZB23N5qdO31c/edit#slide=id.g2125cc5467_2_10");
    $('.slidePresentation-container').css('visibility', 'visible');
    srcChanged = 1;
}

function changeVideo(element, choice) {
    element.removeChild(videoSource);
    addSourceToVideo(element, choice);
    initMap();
    $("#kml-pdf").prop("checked", false);
    $("#kml-flood").prop("checked", false);
    $("#kml-groins").prop("checked", false);
    $("#kml-transects").prop("checked", false);


    element.load();
    element.play();

    var x = document.getElementById("videos").selectedIndex;
    var y = document.getElementById("videos").options;
    var indexOfChoice = y[x].index;
    var srtURL = "http://153.9.205.25/~aecom/WebSite1/www/getSrt.php?srtFile=" + srtSrcArray[indexOfChoice-1] +'&beach='+beachName;

    console.log(srtURL)

    $.ajax({
        url: srtURL,
        crossDomain: true,

        success: function (file_content) {
            //console.log(file_content)
            Xcoords = [];
            Ycoords = [];
            droneHeight = [];
            droneTime = [];
            droneDate = [];

            var lines = file_content.split("\n");
            var startIndex = 3;
            while (lines[startIndex] != null) {
                //Parse and get Coords.
                var firstPos = lines[startIndex].indexOf("(");
                var lastPos = lines[startIndex].lastIndexOf(")");
                var gpsCoords = lines[startIndex].slice(firstPos + 1, lastPos - 3);
                var splitXYcoords = gpsCoords.split(",");
                Xcoords.push(splitXYcoords[0])
                Ycoords.push(splitXYcoords[1])
                //end of coords

                //Parse and get height
                var firstPos = lines[startIndex].indexOf(":");
                var lastPos = (lines[startIndex].length)-1;
                var gpsHeight = lines[startIndex].slice(firstPos + 1, lastPos);
                droneHeight.push(gpsHeight);
                //end of height

                //Parse time
                var newIndex = startIndex - 1;
                var firstPos = (lines[newIndex].indexOf(":"))-2;
                var lastPos = firstPos + 8;
                droneTime.push(lines[newIndex].slice(firstPos, lastPos));
                //end of time

                //Parse date
                var firstPos = (lines[newIndex].indexOf(")")) + 2;
                var lastPos = firstPos + 10;
                droneDate.push(lines[newIndex].slice(firstPos, lastPos));
                //end of date






                startIndex = startIndex + 6;
            }
        }
    });

    gmapLoop()
}


function addSourceToVideo(element, src) {
    var source = document.createElement('source');

    source.id = "videoSource";
    source.src = "../Beaches/FollyBeach/"+ src;
    source.type = "video/mp4";

    element.appendChild(source);
}

function createDropdown(element) {
    //var myArray = new Array("exampleOne.mp4", "exampleTwo.mp4", "exampleThree.mp4", "exampleFour.mp4");

    // videoSrcArray
    //console.log(videoSrcArray)



    for (i = 0; i < videoSrcArray.length; i++) {
        var op = document.createElement('option');
        var t = document.createTextNode(videoSrcArray[i]);
        op.value = videoSrcArray[i];
        op.appendChild(t);
        element.appendChild(op);
    }
}


var panPath = [];   // An array of points the current panning action will use
var panQueue = [];  // An array of subsequent panTo actions to take
var STEPS = 50;     // The number of steps that each panTo action will undergo




//function loadKmlLayer(src) {
//    var kmlLayer = new google.maps.KmlLayer(src, {
//        suppressInfoWindows: true,
//        preserveViewport: true,
//        //zoom: 17,
//        map: map
//    });
//}

function toggleKML(layer) {

    if (layer=='pdf'){
        if (document.getElementById('kml-pdf').checked) {
            kmlLayer1 = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/s/mklumc400rhofjn/charleston_PFD.kml?dl=1', {
                suppressInfoWindows: true,
                preserveViewport: true,
                map: map
            });
            kmlLayer1.setMap(map);
        } else {
            kmlLayer1.setMap(null);
        }
    }
    if (layer == 'flood') {
        if (document.getElementById('kml-flood').checked) {
            kmlLayer2 = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/s/c99sgjqunvos71x/floodzones.kml?dl=1', {
                suppressInfoWindows: true,
                preserveViewport: true,
                map: map
            });
            kmlLayer2.setMap(map);
        } else {
            kmlLayer2.setMap(null);
        }
    }
    if (layer == 'groins') {
        if (document.getElementById('kml-groins').checked) {
            kmlLayer3 = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/s/qpc6xixqmw6b6dx/groins.kml?dl=1', {
                suppressInfoWindows: true,
                preserveViewport: true,
                map: map
            });
            kmlLayer3.setMap(map);
        } else {
            kmlLayer3.setMap(null);
        }
    }
    if (layer == 'shore') {
        if (document.getElementById('kml-shore').checked) {
            kmlLayer4 = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/s/omfzuniqm8qhibx/Shoreline.kml?dl=1', {
                suppressInfoWindows: true,
                preserveViewport: true,
                map: map
            });
            kmlLayer4.setMap(map);
        } else {
            kmlLayer4.setMap(null);
        }
    }
    if (layer == 'transects') {
        if (document.getElementById('kml-transects').checked) {
            kmlLayer5 = new google.maps.KmlLayer('https://dl.dropboxusercontent.com/s/03v0xew2o922hwg/transects.kml?dl=1', {
                suppressInfoWindows: true,
                preserveViewport: true,
                map: map
            });
            kmlLayer5.setMap(map);
        } else {
            kmlLayer5.setMap(null);
        }
    }







}

function panTo(newLat, newLng) {
    if (panPath.length > 0) {
        // We are already panning...queue this up for next move
        panQueue.push([newLat, newLng]);
    } else {
        // Lets compute the points we'll use
        panPath.push("LAZY SYNCRONIZED LOCK");  // make length non-zero - 'release' this before calling setTimeout
        var curLat = map.getCenter().lat();
        var curLng = map.getCenter().lng();
        var dLat = (newLat - curLat) / STEPS;
        var dLng = (newLng - curLng) / STEPS;

        for (var i = 0; i < STEPS; i++) {
            panPath.push([curLat + dLat * i, curLng + dLng * i]);
        }
        panPath.push([newLat, newLng]);
        panPath.shift();      // LAZY SYNCRONIZED LOCK
        setTimeout(doPan, 20);
    }
}

function doPan() {
    var next = panPath.shift();
    if (next != null) {
        // Continue our current pan action
        map.panTo(new google.maps.LatLng(next[0], next[1]));

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(next[0], next[1]),
            map: map,
            icon: image,
            //title: 'Hello World!'
        });

        setTimeout(doPan, 20);
    } else {
        // We are finished with this pan - check if there are any queue'd up locations to pan to 
        var queued = panQueue.shift();
        if (queued != null) {
            panTo(queued[0], queued[1]);
        }
    }
}



function pixelSearch() {
    //document.addEventListener('DOMContentLoaded', function () {
        var v = document.getElementById('beachVid');
        var canvas = document.getElementById('c');
        var context = canvas.getContext('2d');

        var cw = Math.floor(canvas.clientWidth);
        var ch = Math.floor(canvas.clientHeight);
        canvas.width = cw;
        canvas.height = ch;

        v.addEventListener('play', function () {
            draw(this, context, cw, ch);
            //var imageData = context.getImageData(0,0,20,20);
            //console.log(imageData)

        }, false);

    //}, false);

    function draw(v, c, w, h) {
        if (v.paused || v.ended) return false;
        c.drawImage(v, 0, 0, w, h);
        var data = c.getImageData(0, 0, 10, 10).data;
        //console.log(data)

        setTimeout(draw, 20, v, c, w, h);
    }



}


function loadBeach(beach) {

    beachName = beach;

    $.ajax({
        //This will retrieve the contents of the folder
        url: 'http://153.9.205.25/~aecom/WebSite1/www/getInfo.php?beach='+beach,
        dataType: "json",
        crossDomain: true,

        success: function (data) {
            $.each(data, function(i,filename) {

                switch(filename.split('.').pop()) {
                    case 'mp4':
                        videoSrcArray.push(filename);

                        var res = filename.split(".");
                        res = res[0] + ".SRT";
                        srtSrcArray.push(res);

                        break;
                    case 'MOV':
                        videoSrcArray.push(filename);
                        break;
                        



                    case 'kml':
                        kmlSrcArray.push(filename);
                        break;
                }

            });

            setTimeout(function () {
                createDropdown(videos);
                initMap();


            }, 1500);



            //console.log(videoSrcArray);
            //console.log(srtSrcArray);
            //console.log(kmlSrcArray);
        }
    });

    


    mainView.router.load({
        url: '../main_activity/main.html',
        context: {
            title: beach.replace(/([A-Z])/g, ' $1').trim(),
        }
    })
    //createDropdown();

    //console.log('IM HERE')




    
}