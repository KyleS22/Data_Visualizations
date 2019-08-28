
d3.csv("mammal_data.csv").then(function (data) {
        dataset = data;
	dataset.forEach(function(d){
		d['Mass (grams)'] = +d['Mass (grams)'];
		d['Resting Heart Rate (BPM)'] = +d['Resting Heart Rate (BPM)']
		d['Longevity (Years)'] = +d['Longevity (Years)']
	});

        generateVisualization(dataset);
 });


function generateVisualization(dataset){
	
	
	
	// Width and height of visualization
	var width = 1600;
	
	var height = 900;

	var leftPad = 150;
	var bottomPad = 100;

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
			.range([leftPad, width-leftPad]);

	var scaleY = d3.scaleLinear()
			.domain([minLongevity, maxLongevity])
			.range([bottomPad, height-bottomPad]);

	var scaleMass = d3.scaleSqrt()
				.domain([minMass, maxMass])
				.range([5, 50]);
	creatureNames = []

	dataset.forEach(function(d){
		creatureNames.push(d["Creature"])
	})

	var scaleColour = d3.scaleOrdinal()
				.domain(creatureNames)
				.range(["#ff0000", "#942f2f", "#ff8c08", "#f0e005", "#89fa00", "#36b500", "#0dffb6", "#00f2ff",
					"#00f2ff", "#00398a", "#816bff", "#9747ff", "#d400ff", "#ff00c8", "#b50061"]);
				
	var xAxis = d3.axisBottom()
			.scale(scaleX);
	
	var yAxis = d3.axisLeft()
			.scale(scaleY);

	//create svg element
	var svg = d3.select("body")
			.append("svg")
			.attr("width", width)
			.attr("height", height);


	// Add a circle for each row in the csv.  Colour will represent the creature, size represents the mass, x is heart rate, y is longevity
	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function(d){
			return scaleX(d["Resting Heart Rate (BPM)"]);
		})
		.attr("cy", function(d){
			return scaleY(d["Longevity (Years)"]);
		})
		.attr("r", function(d){
			return scaleMass(d["Mass (grams)"]);
		})
		.attr("stroke-width", 1)
		.attr("stroke", "black")
		.attr("fill", function(d){
			return scaleColour(d["Creature"]);
		})
	
	svg.append("g")
		.attr("transform", "translate(50, 10)")
		.call(yAxis)
	
	var xAxisTranslate = height/2 + 10;

	svg.append("g")
		.attr("transform", "translate(0, " + 800 + ")")
		.call(xAxis);

	// TODO: Add a legend
}

