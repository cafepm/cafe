jQuery(function($) {
	prepararFotos();
});

function prepararFotos() {
	$('.gallery_demo_unstyled').addClass('gallery_demo'); // adds new class name to maintain degradability
	$('ul.gallery_demo').galleria({
		history   : true, // activates the history object for bookmarking, back-button etc.
		clickNext : true, // helper for making the image clickable
		insert    : '#main_image', // the containing selector for our main image
		onImage   : function(image,caption,thumb) { // let's add some image effects for demonstration purposes
		// fade in the image & caption
		if(! ($.browser.mozilla && navigator.appVersion.indexOf("Win")!=-1) ) { // FF/Win fades large images terribly slow
		image.css('display','none').fadeIn(1000);
		}
		caption.css('display','none').fadeIn(1000);
		// fetch the thumbnail container
		var _li = thumb.parents('li');
		// fade out inactive thumbnail
		_li.siblings().children('img.selected').fadeTo(500,0.3);
		// fade in active thumbnail
		thumb.fadeTo('fast',1).addClass('selected');
		// add a title for the clickable image
		image.attr('title','Next image >>');
	},
	onThumb : function(thumb) { // thumbnail effects goes here
	// fetch the thumbnail container
	var _li = thumb.parents('li');
	// if thumbnail is active, fade all the way.
	var _fadeTo = _li.is('.active') ? '1' : '0.3';
	// fade in the thumbnail when finnished loading
	thumb.css({display:'none',opacity:_fadeTo}).fadeIn(1500);
	// hover effects
	thumb.hover(
		function() { thumb.fadeTo('fast',1); },
		function() { _li.not('.active').children('img').fadeTo('fast',0.3); } // don't fade out if the parent is active
	)
	}
	});
}
</script>
<script type="text/javascript">
function mostrarFotos(quever) {
	var uia = quever + "/info.xml";
	$('ul.gallery_demo').empty();
	$('#main_image').empty();
	$.ajax({
		type: "GET",
		url: quever + "/info.xml",
		dataType: "xml",
		success: function(xml) {
			$("gallery_demo_unstyled").empty();
			$(xml).find('foto').each(function(){
				var foto_nombre = $(this).attr('name')
				var capo_info = $(this).text()
				
				$('<li></li>')
 				.html('<img src="' + quever + "/" + foto_nombre + '" alt="' + capo_info + '" title="' + capo_info + '">')
                                .appendTo('.gallery_demo')
                     });
			prepararFotos();
			$(".gallery_demo").children("li").addClass("active");
                 }
	});
}
$(document).ready(function() {
	$('#ultima').click();
});


