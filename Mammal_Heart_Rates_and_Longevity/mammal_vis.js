
d3.csv("mammal_data.csv").then(function (data) {
        dataset = data;
        generateVisualization(dataset);
 });


function generateVisualization(dataset){
	
	// Width and height of visualization
	var width = '400';
	
	var height = '400';


	// Max and Min mass values
	var maxMass = d3.max(dataset, function(d) {
		return d["Mass (grams)"];
	});

	var minMass = d3.min(dataset, function(d) {
		return d["Mass (grams)"];
	});

	// Max and min heartrates
	var maxHeart = d3.max(dataset, function(d) {
		return d["Resting Heart Rate (BPM)"];
	});

	var minHeart = d3.min(dataset, function(d) {
		return d["Resting Heart Rate (BPM)"];
	});
	
	var maxLongevity = d3.max(dataset, function(d) {
		return d["Longevity (Years)"];
	});

	var minLongevity = d3.min(dataset, function(d) {
		return d["Longevity (Years)"];
	});


	// Create x, y, and mass scales
	var scaleX = d3.scaleLinear()
			.domain([minHeart, maxHeart])
			.range(10, width-10);

	var scaleY = d3.scaleLinear()
			.domain([minLongevity, maxLongevity])
			.range(10, height-10);

	var scaleMass = d3.scaleLinear()
				.domain([minMass, maxMass])
				.range([5, 50]);


	//create svg element
	var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

	console.log("Here")	
	// TODO: Add a circle for each row in the csv.  Colour will represent the creature, size represents the mass, x is heart rate, y is longevity
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("x", function(d){
			console.log(scaleX(d["Resting Heart Rate (BPM)"]));
			return scaleX(d["Resting Heart Rate (BPM)"]);
		})
		.attr("y", function(d){
			return scaleY(d["Longevity (Years)"]);
		});

	// TODO: Add a legend
}

