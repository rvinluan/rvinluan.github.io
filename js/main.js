var etc = {
	palette: [
		'FFFFFF',
		'FFFFFF',
		'FFFFFF',
		'FFFFFF',
		'FFFFFF'
	],
	paletteTitle: 'undefined',
	url: '#',
	firstLoad: true,
};

/**
* Converts an RGB color value to HSL. Conversion formula
* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
* Assumes r, g, and b are contained in the set [0, 255] and
* returns h, s, and l in the set [0, 1].
*
* @param   Number  r       The red color value
* @param   Number  g       The green color value
* @param   Number  b       The blue color value
* @return  Array           The HSL representation
*/
etc.rgbToHsl = function(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b), min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if(max == min){
		h = s = 0; // achromatic
	}else{
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return [h, s, l];
}

/*
Find the index of the largest item in the array.
This is used to determine which color to use for the background.

As of 11/17 this is no longer in use anywhere,
but I'm keeping it because it could be one day.
*/
etc.findLargest = function(array) {
	var max_index = -1,
		max_value = 0;
	for(var i = 0; i < array.length; i++) {
		if(array[i] > max_value) {
			max_value = array[i];
			max_index = i;
		}
	}
	return max_index;
}


etc.getPalette = function() {
	$.getJSON("http://www.colourlovers.com/api/palettes/top?jsonCallback=?", {
		numResults: 1,
		resultOffset: parseInt(Math.random() * 100, 10),
		showPaletteWidths: 1
	}, function(json) {
		if(json[0].colors.length < 5) {
			etc.getPalette();
			return;
		}
		etc.palette = json[0].colors;
		etc.paletteTitle = json[0].title;
		etc.url = json[0].url;
		if(etc.firstLoad) {
			etc.changeColors(etc.palette, etc.paletteTitle, etc.url);
			etc.firstLoad = false;
		}
	});
}

etc.getPalette();

etc.changeColors = function(palette, title, url) {
	var flavors,
		textString;
		
	flavors = [
		$('.colored:nth-child(5n+1)'),
		$('.colored:nth-child(5n+2)'),
		$('.colored:nth-child(5n+3)'),
		$('.colored:nth-child(5n+4)'),
		$('.colored:nth-child(5n)')
	];
	
	for(var i = 0; i < palette.length; i++) {
		var lightness = etc.rgbToHsl(
				parseInt(palette[i].substring(0,2),16),
				parseInt(palette[i].substring(2,4),16),
				parseInt(palette[i].substring(4,6),16)
			)[2];
		if(lightness >= 0.5) {
			flavors[i].removeClass('dark').addClass('light');
		} else {
			flavors[i].removeClass('light').addClass('dark');
			$('.color-button').css('color','#'+palette[i]);
		}

		flavors[i].animate({backgroundColor: '#'+palette[i]}, 200*(i+1));
	}

	//check to see if the palette title ends with punctuation
	//if it doesn't, append a period
	textString = title.match(/[\!\?\.\)]$/) ? title : title + '.';

	$('.palette-title').text(textString).attr('href', url).show();

	etc.getPalette();
}

etc.init = function() {
	etc.changeColors(etc.palette, etc.paletteTitle, etc.url);
}

$(function(){
	etc.init();

	$('.color-button').click(function(e){
		e.preventDefault();
		etc.changeColors(etc.palette, etc.paletteTitle, etc.url);
	});
});