var etc = {
	palette: [
		'FFFFFF',
		'CCCCCC',
		'FFFFFF',
		'CCCCCC',
		'FFFFFF'
	],
	paletteTitle: 'undefined',
	url: '#',
	firstLoad: true,
};

/*
* Calculates the Luminance (Y) of a color based off
* its linear R G B colors. Formula taken from
* http://en.wikipedia.org/wiki/Luminance_(relative)
* Returns a value relative to its input, in this case 255.
*/
etc.rgbToY = function(r, g, b) {
	return (0.2126*r) + (0.7152*g) + (0.0722*b);
}

/*
* Find the index of the largest item in the array.
* This is used to determine which color to use for the background.
* 
* As of 11/17 this is no longer in use anywhere,
* but I'm keeping it because it could be one day.
* Bad practice, I know.
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

/*
* Call the ColourLovers API and grab a palette.
* Their API provides an 'offset' parameter,
* so I only ever grab one result but it can be out of a random 100,
* instead of asking for 100 and choosing 1.
*/
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
		var luminance = etc.rgbToY(
			parseInt(palette[i].substring(0,2),16),
			parseInt(palette[i].substring(2,4),16),
			parseInt(palette[i].substring(4,6),16)
		);
		if(luminance >= (255/2)) {
			flavors[i].removeClass('dark').addClass('light');
		} else {
			flavors[i].removeClass('light').addClass('dark');
			$('.color-button').css('background-color','#'+palette[i]).removeClass('light').addClass('dark');
		}
		flavors[i].css('backgroundColor', '#'+palette[i]);
	}

	//check to see if the palette title ends with punctuation
	//if it doesn't, append a period
	textString = title.match(/[\!\?\.\)]$/) ? title : title + '.';

	$('.palette-title').text(textString).attr('href', url).show();

	//I grab a new palette after clicking the button,
	//so there's always a next palette in stock
	//and you don't wait for the API to see results.
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