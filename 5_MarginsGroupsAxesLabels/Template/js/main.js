/*
*    main.js
*/

d3.json("data/buildings.json").then((data) => {

    console.log(data);
    
    var margin = {top:10, right: 10, bottom: 100, left: 100};
    //var svgCanvas = 500;
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;
    var inner = 0.3;
    var outer = 0.3;

    var g = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + " " + margin.top + ")");

    var x = d3.scaleBand()
    .domain(data.map(function(d) {return d.name;}))
    .range([0, width])
    .paddingInner(inner)
    .paddingOuter(outer);

    var y = d3.scaleLinear()
    .domain([0, 828])
    .range([height, 0]);

    g.append("text")
		.attr("class", "x axis-label")
		.attr("x", (width/4))
		.attr("y", height+140)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.style("fill","black")
		.text("Worlds' tallest buildings");

	g.append("text")
		.attr("class", "y axis-label")
		.attr("x", - (height / 2))
		.attr("y", -60)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.style("fill","black")
		.text("Height (m)");

    //  Reading data

    var bottomAxis = d3.axisBottom(x);
	g.append("g")
		.attr("class", "bottom axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(bottomAxis)
	.selectAll("text")
		.attr("y", "10")
		.attr("x", "-5")
		.attr("text-anchor", "end")
		.attr("transform", "rotate(-40)");

	var leftAxis = d3.axisLeft(y).ticks(5);
	g.append("g")
		.attr("class", "left axis")
		.call(leftAxis);

	var rects = g.selectAll("rect").data(data);

    // addition of rects

    rects.enter()
        .append("rect")
        .attr("x", (d) => {
            return x(d.name);
        })
        .attr("y", (d) => {
            return y(d.height);
        })
        .attr("width", x.bandwidth)
        .attr("height", (d) => {
            return height - y(d.height);
        })
        .attr("fill", "gray");

}).catch((error) => {
    console.log(error);
});