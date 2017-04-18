﻿var map;
var vid;
var beachName ='';
//srt parsing files
var Xcoords = [];
var Ycoords = [];
var droneHeight = [];
var droneTime = [];
var droneDate = [];

//Server files
var kmlSrcArray = [];
var videoSrcArray = [];
var srtSrcArray = [];



myApp.onPageInit('main', function (page)
{



    //$("#toggle").click(function () 
	//{
    //    if ($('#panel').css('display') == 'block') 
    //    {

    //        var height = '-=' + $('#panel').height();
    //        $('#panel').css('visibility', 'hidden');

    //    } else 
    //    {
    //        $('#lower').css('width', '100%');
    //        $('#panel').css('visibility', 'visible');

    //        var height = '+=' + $('#panel').height();

    //    }
    //    $("#panel").slideToggle("slow");
    //});


	//createDropdown(videos);



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
    //https://www.dropbox.com/s/bfslbxmzdbzigh0/follyFloodZones.kml?dl=1
    //loadKmlLayer('https://dl.dropboxusercontent.com/s/uwyr9ogsont4qiw/FollyBeachMap.kml?dl=1');
    //loadKmlLayer('https://dl.dropboxusercontent.com/s/vlomruiknr1ydfo/folly_shoreline.shp.kml?dl=1');


    //https://www.dropbox.com/s/vlomruiknr1ydfo/folly_shoreline.shp.kml?dl=1
    //https://www.dropbox.com/s/pbgwl9lkbwlw4cp/follyShoreLine.kml?dl=1
    loadKmlLayer('https://dl.dropboxusercontent.com/s/bfslbxmzdbzigh0/follyFloodZones.kml?dl=1');


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
        $('.slidePresentation-container').css('visibility', 'hidden');

    }
    else {
        $('.slidePresentation-container').css('visibility', 'visible');

    }
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

    //var srtURL = "http://153.9.205.25/~aecom/WebSite1/www/Beaches/" + beachName + "/" + 'DJI_0001.SRT';

    var srtURL = "http://153.9.205.25/~aecom/WebSite1/www/getSrt.php?srtFile=" + srtSrcArray[indexOfChoice-1] +'&beach='+beachName;


    //url: 'http://153.9.205.25/~aecom/WebSite1/www/getInfo.php?beach='+beach,

    //var srtURL = srtFiles[indexOfChoice-1];

    //console.log(srtURL)

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
            createDropdown(videos);
            initMap();


            console.log(videoSrcArray);
            console.log(srtSrcArray);
            console.log(kmlSrcArray);
        }
    });

    


    mainView.router.load({
        url: '../main_activity/main.html',
        context: {
            title: beach.replace(/([A-Z])/g, ' $1').trim(),
        }
    })

    //console.log('IM HERE')




    
}