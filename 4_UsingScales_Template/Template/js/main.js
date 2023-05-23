/*
*    main.js
*/

d3.json("data/buildings.json").then((data) => {

    
    var inner = 0.3;
    var outer = 0.3;
    var svgCanvas = 500;
    var fw = 30;

    //  Reading data

    var towers = [];

	data.forEach((d)=>{

		d.height = + d.height;
		towers.push(d.height);

	});

    var min_max= d3.extent(data, (d)=> {
       return d.height;
    });

    var max= min_max[1];

    //  Scale band X axis

    var x = d3.scaleBand()
        .domain(towers)
        .range([0, svgCanvas])
        .paddingInner(inner)
        .paddingOuter(outer);

    //  Scale linear Y axis

    var y = d3.scaleLinear()
        .domain([0, max])
        .range([0, svgCanvas]);

    //  SVG canvas

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", svgCanvas)
        .attr("height", svgCanvas)

    // addition of rects

    var rects = svg.selectAll("rect")
        .data(towers);

    rects.enter()
        .append("rect")
        .attr("x", (d) => {
            return x(d);
        })
        .attr("y", (d) => {
            return y(d);
        })
        .attr("width", fw)
        .attr("height", (d) => {
            return d;
        })
        .attr("fill", "white");

}).catch((error) => {
    console.log(error);
});