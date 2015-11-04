$.getJSON('https://api.github.com/repos/mccxiv/tc/releases?callback=?', function(response) {
	if (response) {
		$('.release-name').html(response.data[0].name);
		var releases = ['tc-windows', 'tc-setup', 'tc-osx', 'tc-linux'];
		response.data[0].assets.forEach(function(asset) {
			releases.forEach(function(release) {
				if (asset.name.indexOf(release) === 0) {
					$('.'+release).attr('href', asset.browser_download_url);
				}
			})
		});

		for (var i = 0; i < 11; i++) {
			if (response.data[i]) {
				var title = $('<h1>').html(response.data[i].name);
				title.append(' <span class="version">('+response.data[i].tag_name+')</span>');
				var body = $('<p>').html(markdownit().render(response.data[i].body));
				$('.changes').append(title).append(body);
			}
		}
	}
});