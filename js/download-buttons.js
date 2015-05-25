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
	}
});