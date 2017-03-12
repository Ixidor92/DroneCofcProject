function changeVideo(element, choice)
{
	var selection = document.getElementById("videos").value;
	element.removeChild(videoSource);
	addSourceToVideo(element, choice);
			
	element.load();
	element.play();
}
				
					
function addSourceToVideo(element, src)
{
	var source = document.createElement('source');
		
	source.id = "videoSource";
	source.src = "videos/" + src;
	source.type = "video/mp4";
		
	element.appendChild(source);
}

function createDropdown(element)
{
	var myArray = new Array("upOnHigh.MOV", "highGui.MOV");
	for(i=0; i<myArray.length; i++) 
	{	  
		var op = document.createElement('option');
		var t = document.createTextNode(myArray[i]);
		op.value = myArray[i];
		op.appendChild(t);
		element.appendChild(op);
	}
}										