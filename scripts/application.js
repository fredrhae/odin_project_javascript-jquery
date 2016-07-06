// Do the calculations related with div creations
$(document).ready(function(){
	setSelectedModeHandler();
	createGrid();
	setButtonEffect();	
});

// Classes and objects definitions

// Constant definitions
var containerName = ".container";
var squareClassName = 'square';
var modeSelectorName = '#options';
var selectedMode = 'trail';
var numberSquaresPerSide = 16;

// Objects definition
var Size = function(width, height) {
	this.width = width;
	this.height = height;
}
// Functions related with the grid creation
var calculateSizeSquares = function() {
	var containerHeight = $(containerName).height();
	var containerWidth = $(containerName).width();
	
	var widthBorders = numberSquaresPerSide * 2;
	
	var widthMargins = numberSquaresPerSide * 2;
	
	console.log("container = " + containerWidth + "| Borders = " + widthBorders + "| Margins = " + widthBorders);
	
	var widthSquare = (containerWidth - widthBorders - widthMargins) / numberSquaresPerSide;
	
	var sizeSquare = new Size(widthSquare, widthSquare);
	
	console.log("Calculated size from square: ");
	console.log("Height = " + sizeSquare.height + "| Width = " + sizeSquare.width);
	
	return sizeSquare;
}

var createSquare = function (size) {	
	var $newDiv = $('<div></div>');
	$newDiv.addClass(squareClassName);
	$newDiv.width(size.width).height(size.height);
	
	return $newDiv;
};

var createGridSquares = function(sizeSquare) {
	
	var $container = $(containerName);
	for(var i = 1; i <= numberSquaresPerSide; i ++)
	{
		var currentRowName = 'row' + i;
		var $currentRow = $("<div id=" + currentRowName + " style='clear:both'></div>");
		
		for(var j = 1; j <= numberSquaresPerSide; j ++)
		{
			$currentRow.append(createSquare(sizeSquare));	
		}
		
		$container.append($currentRow);
	}
}

var createGrid = function () {
	var sizeSquare = calculateSizeSquares();
	
	createGridSquares(sizeSquare);
	
	switch (selectedMode)
	{
		case 'trail':
			setTrailEffect();
			break;
		case 'draw':
			setDrawEffect();
			break;
		case 'increase_black_tone':
			setIncreaseBlackEffect();
			break;
		case 'random':
			setRandomDrawEffect();
			break;
	}
}

function removeGrid() {
	for(var i = 1; i <= numberSquaresPerSide; i ++)
	{
		var currentRowName = '#row' + i;
		$(currentRowName).remove();
	}
}

// Functions with modes for sketch-pad

var setTrailEffect = function () {
	$('.' + squareClassName).hover(
		function(){
			$(this).animate({backgroundColor: "black"}, "fast");
		},
		function(){
			$(this).animate({backgroundColor: "white"}, "fast");
	});
}

var setDrawEffect = function () {
	$('.' + squareClassName).mouseenter(
		function(){
			$(this).css({'background-color': 'black'});
	});
}

var setRandomDrawEffect = function () {
	$('.' + squareClassName).mouseenter(
		function(){
			var color = getRandomColor();
			$(this).css({'background-color': color});
	});
}

var setIncreaseBlackEffect = function () {
	$('.' + squareClassName).mouseenter(
		function(){
			var currentColor = $(this).css('background-color');

			// If square is not black, increase the percentage of black
			var result = colorIsBlack(currentColor);
			if(result == false || result == null)// null means it's white
			{
				var newColor = increaseBlack(currentColor);
				$(this).css({'background-color': newColor});
			}
	});
}

// Auxiliar functions
function getRandomColor(){
	var red = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);
		
	var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
	
	return color ;
}

function colorIsBlack(color) {
	var rgbChannels = getRgbValues(color);
	if(rgbChannels != null)
	{
		for(var i = 0; i < 3; i ++)
		{
			if(rgbChannels[i] != 0)
				return false;
		}
		// If all channel has value zero, it means that color is black
		return true;
	}
	
	return null;
}

function increaseBlack(currentColor)
{
	var rgbChannels = getRgbValues(currentColor);
	if(rgbChannels != null)
	{
		// Increase 10% black in all channels
		for(var i = 0; i < 3; i++)
		{
			rgbChannels[i] -= 26;
			if(rgbChannels[i] < 0)
			{
				rgbChannels[i] = 0;
			}
		}
	}
	// If result is null, it means that square is white
	else {
		// Set the first of 10% of black
		rgbChannels = [230,230,230];
	}
	
	var newColor = 'rgb(' + rgbChannels[0] + ',' + rgbChannels[1] + ',' + rgbChannels[2] + ')';

	return newColor;
}

function getRgbValues(color)
{
	var colorParts = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	if(colorParts == null)
	{
		return null;
	} else {
		var rgbChannels = [colorParts[1],colorParts[2],colorParts[3]]
		return rgbChannels;
	}
}

function setButtonEffect() {
	$('.button').click(function() {
		$(this).effect( "highlight", {color: '#2284A1'}, 500 );
	});
}

// Functions related with buttons and dropdown events

function clearGrid() {
	removeGrid();
	createGrid();
}

function changeGrid() {
	// Remove old grid
	removeGrid();
	var squares = parseInt(prompt("Please, enter the number of squares per side to make the new grid", "64"), 10);
	if(squares < 1 || isNaN(squares))
	{
		alert("The number you typed is not valid, the default value of 64 will be used.");
		numberSquaresPerSide = 64;
	} else {
		numberSquaresPerSide = squares;
	}
	createGrid();
}

function setSelectedModeHandler() {
	 $(modeSelectorName).change(function () {
                selectedMode = $(modeSelectorName + " option:selected").val();
				removeGrid();
				createGrid();
            });
}