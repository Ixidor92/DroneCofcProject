var Xcoords = [];
var Ycoords = [];

function changeVideo(element, choice)
{
	var selection = document.getElementById("videos").value;
	element.removeChild(videoSource);
	addSourceToVideo(element, choice);
			
	element.load();
	element.play();
	//<link rel="stylesheet" href="/WebSite1/www/main_activity/mainStyle.css">
	//jQuery.get('http://localhost:61012/DJI_0013.srt', function (data) {
	//    var lines = data.split("\n");

	//    console.log(lines);




    //    })
    //https://www.dropbox.com/s/o8nwdv5eopzmn89/DJI_0013.SRT?dl=0
	$.ajax({
	    url: "https://dl.dropboxusercontent.com/s/o8nwdv5eopzmn89/DJI_0013.SRT?dl=1",
	    success: function (file_content) {
	        //console.log(file_content);
	        var lines = file_content.split("\n");

	        //console.log("SUCCESS")

	        var startIndex = 3;
	        while (lines[startIndex] != null) {

	            //console.log(lines[startIndex])
	            var firstPos = lines[startIndex].indexOf("(");
	            var lastPos = lines[startIndex].lastIndexOf(")");



	            var gpsCoords = lines[startIndex].slice(firstPos + 1, lastPos - 3);
	            var splitXYcoords = gpsCoords.split(",");


	            Xcoords.push(splitXYcoords[0])
	            Ycoords.push(splitXYcoords[1])


	            startIndex = startIndex + 6;               
	        }

	        //console.log(Xcoords[7]);
	        //console.log(Ycoords[7]);







	    }
	});



}
				
					
function addSourceToVideo(element, src)
{
	var source = document.createElement('source');
		
	source.id = "videoSource";
	source.src = "follyVideos/" + src;
	source.type = "video/mp4";
		
	element.appendChild(source);
}

function createDropdown(element)
{
    var myArray = new Array("exampleOne.mp4", "exampleTwo.mp4", "exampleThree.mp4", "exampleFour.mp4");
    for (i = 0; i < myArray.length; i++)

	{	  
		var op = document.createElement('option');
		var t = document.createTextNode(myArray[i]);
		op.value = myArray[i];
		op.appendChild(t);
		element.appendChild(op);
	}
}										