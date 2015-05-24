$.getJSON('https://api.twitch.tv/kraken/streams?limit=1&callback=?', function(data) {
	if (data) {
		var streamer = data.streams[0].channel.name;
		var obj = '<object class="video" type="application/x-shockwave-flash" height="255" width="400" bgcolor="#000000">'+
			'<param name="allowFullScreen" value="true">'+
			'<param name="allowScriptAccess" value="always">'+
			'<param name="allowNetworking" value="all">'+
			'<param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf">'+
			'<param name="flashvars" value="hostname=www.twitch.tv&amp;channel='+streamer+'&amp;auto_play=true&amp;start_volume=0">'+
			'<param name="wmode" value="opaque">'+
			'</object>';

		$('.video-section').append(obj);
	}
});