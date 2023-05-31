var margin = {top: 10, right: 10,  bottom: 100, left:100};

var width = 600;
var height = 400;

// with SELECT, the program find the id from the DOM
var g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom + 1)
        .attr('fill', 'black')
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


d3.json("data/revenues.json").then( (data) => {
    
    console.log(data);
    var max = 0;

    data.forEach( (d) => {
        d.revenue = +d.revenue;
        if (d.revenue > max){
            max = d.revenue;
        }
    });

    var months = data.map (  (d) => {
        return d.month;
    });

    var revenues = data.map ( (d) => {
        return d.revenue;
    });

    console.log(months);

    console.log(revenues);

    var rects = g.selectAll('rect')
    .data(data);

    var y = d3.scaleLinear().domain([max, 0]).range([0, height]);

    var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d/1000 + "k"; });
    g.append("g")
    .attr("class", "left axis")
    .call(leftAxis);

    var x = d3.scaleBand()
    .domain(months)
    .range([0, width])
	.paddingInner(0.3)
	.paddingOuter(0.2);

    var bottomAxis = d3.axisBottom(x);

    g.append("g")
	.attr("class", "bottom axis")
	.attr("transform", "translate(0, " + (height) + ")")
	.call(bottomAxis);

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2 ))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill","black").
        text("Revenue (dlls.)");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.top)
        .attr("transform", "translate(0, " + (40) + ")")
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black")
        .text("Month");

        var rects = g.selectAll('rect')
        .data(data);

    rects.enter()
        .append('rect')
            .attr('x', (h, i) => {return Math.round(x(h.month)) + 10})
            .attr('y', (h) => {return y(h.revenue)})
            .attr('width', 40 )
            .attr('height', (h) => {return height - y(h.revenue)})
            .attr('fill', '#cccc00');

})

