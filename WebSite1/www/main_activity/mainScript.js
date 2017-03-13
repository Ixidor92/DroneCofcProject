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
            $('#panel').css('visibility', 'show');

            var height = '+=' + $('#panel').height();

        }
        $("#panel").slideToggle("slow");

    });
	
});


