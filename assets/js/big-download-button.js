$('.download-button').on('click', function(event) {
	event.preventDefault();
	var target = $(this.getAttribute('href'));
	$('body').animate(
		{scrollTop: target.offset().top},
		1100,
		$.bez([.55,0,.1,1])
	);
});