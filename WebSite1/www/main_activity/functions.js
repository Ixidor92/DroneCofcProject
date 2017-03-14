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
    ///WebSite1/www/index_activity/dronebeach.jpg
	$.ajax({
	    url: "/WebSite1/www/index_activity/DJI_0013.srt", success: function (file_content) {
	        console.log(file_content);
            console.log("SUCCESS")
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