$.getJSON('https://api.twitch.tv/kraken/streams?limit=1&callback=?', function(data) {
	if (data) {
		var preview = data.streams[0].preview.template;
		preview = preview.replace('{width}', '1280');
		preview = preview.replace('{height}', '720');

		$('.video-section').css('background-image', 'url('+preview+')');
	}
});