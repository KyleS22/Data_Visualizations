var width = 400;
var height = 400;


d3.csv("mammal_data.csv").then(function (data) {
        dataset = data;
        generateVisualization(dataset);
 });


function generateVisualization(dataset){
	
	// TODO: Create x, y, and mass scales
	
	//create svg element
	var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

	
	// TODO: Add a circle for each row in the csv.  Colour will represent the creature, size represents the mass, x is heart rate, y is longevity
	
	// TODO: Add a legend
}

