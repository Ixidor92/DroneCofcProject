var lefty;
var righty;
myApp.onPageInit('twoView', function (page)
{
    createDropdown(leftVidSelect)
    createDropdown(rightVidSelect)

});


jQuery(function ($) {

        // Get a reference to the container.
        var container = $("#container");
        // Bind the link to toggle the slide.
        $("a").click(
            function (event) {
                // Prevent the default event.
                event.preventDefault();
                // Toggle the slide based on its current
                // visibility.
                if (container.is(":visible")) {
                    // Hide - slide up.
                    container.slideUp(2000);
                } else {
                    // Show - slide down.
                    container.slideDown(2000);
                }
            }
        );
		
		
    });
	

function syncPlay()
{
	lefty = document.getElementById("leftVid");
	righty = document.getElementById("rightVid");
	
	lefty.play();
	righty.play();
}

function syncStop()
{
	//var lefty = document.getElementById("leftVid");
	//var righty = document.getElementById("rightVid");
	
	lefty.pause();
	righty.pause();
}


function sliderPlay(sec) {
    //var lefty = document.getElementById("leftVid");
    //var righty = document.getElementById("rightVid");
    lefty.currentTime = sec;
    righty.currentTime = sec;
    lefty.play();
    righty.play();
    
}

function syncLoad()
{
	//lefty = document.getElementById("leftVid");
	//righty = document.getElementById("rightVid");
	
	lefty.load();
	righty.load();
}

function changeLeftVideo(element, sourceID, choice)
{
    element.removeChild(sourceID);
    addLeftSource(element, choice);

    element.load();
	
}

function changeRightVideo(element, sourceID, choice)
{
    element.removeChild(sourceID);
    addRightSource(element, choice);

    element.load();
	
}

function addLeftSource(element, src) {
    var source = document.createElement('source');

    source.id = "leftSource";
    source.src = "../main_activity/follyVideos/" + src;
    source.type = "video/mp4";

    element.appendChild(source);
}

function addRightSource(element, src) {
    var source = document.createElement('source');

    source.id = "rightSource";
    source.src = "../main_activity/follyVideos/" + src;
    source.type = "video/mp4";

    element.appendChild(source);
}