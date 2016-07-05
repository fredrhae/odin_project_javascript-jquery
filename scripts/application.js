var containerName = ".container";
var squareClassName = 'square';
var numberSquaresInGrid = 16;

// Do the calculations related with div creations
$(document).ready(function(){
		
	var sizeSquare = calculateSizeSquares();
	
	createGrid(sizeSquare);

});

var Size = function(width, height) {
	this.width = width;
	this.height = height;
}

var createGrid = function(size) {
	
	for(var i = 1; i <= numberSquaresInGrid; i ++)
	{
		var currentRowName = 'row' + i;
		var $currentRow = $("<div id=" + currentRowName + " style='clear:both'></div>");
		
		for(var j = 0; j < numberSquaresInGrid; j ++)
		{
			$currentRow.append(createSquare(size));	
		}
		
		$(containerName).append($currentRow);
	}
}

var createSquare = function (size) {	
	var $newDiv = $('<div></div>');
	$newDiv.addClass(squareClassName);
	$newDiv.width(size.width).height(size.height);
	
	console.log("Created a square of Width = " + size.width + "Height = " + size.height);
	
	return $newDiv;
};

var calculateSizeSquares = function() {
	var containerHeight = $(containerName).height();
	var containerWidth = $(containerName).width();
	
	// var safetyMargin = (containerWidth * 10) / 100;
	
	// var widthSquare = (containerWidth - safetyMargin) / numberSquaresInGrid;
	
	var widthBorders = numberSquaresInGrid * 2;
	
	var widthMargins = numberSquaresInGrid * 2;
	
	console.log("container = " + containerWidth + "| Borders = " + widthBorders + "| Margins = " + widthBorders);
	
	var widthSquare = (containerWidth - widthBorders - widthMargins) / numberSquaresInGrid;
	
	var sizeSquare = new Size(widthSquare, widthSquare);
	
	console.log("Calculated size from square: ");
	console.log("Height = " + sizeSquare.height + "| Width = " + sizeSquare.width);
	
	return sizeSquare;
}