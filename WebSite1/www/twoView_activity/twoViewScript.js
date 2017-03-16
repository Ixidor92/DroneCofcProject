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
	var lefty = document.getElementById("leftVid");
	var righty = document.getElementById("rightVid");
	
	lefty.play();
	righty.play();
}

function syncStop()
{
	var lefty = document.getElementById("leftVid");
	var righty = document.getElementById("rightVid");
	
	lefty.pause();
	righty.pause();
}

function syncLoad()
{
	var lefty = document.getElementById("leftVid");
	var righty = document.getElementById("rightVid");
	
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
    source.src = "/WebSite1/www/main_activity/follyVideos/" + src;
    source.type = "video/mp4";

    element.appendChild(source);
}

function addRightSource(element, src) {
    var source = document.createElement('source');

    source.id = "rightSource";
    source.src = "/WebSite1/www/main_activity/follyVideos/" + src;
    source.type = "video/mp4";

    element.appendChild(source);
}