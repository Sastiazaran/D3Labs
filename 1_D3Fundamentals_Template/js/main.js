/*
*    main.js
*/


var svg = d3.select("#chart-area").append("svg")

    .attr("width", 400)

    .attr("height", 400);

var circle = svg.append("circle")

    .attr("cx", 150)

    .attr("cy", 150)

    .attr("r", 90)

    .attr("fill", "green");

var rect = svg.append("rect")

    .attr("x", 20)

    .attr("y", 20)

    .attr("width", 500)

    .attr("height", 50)

    .attr("fill", "red");

var rect = svg.append("rect")

    .attr("x", 20)

    .attr("y", 20)

    .attr("width", 50)

    .attr("height", 500)

    .attr("fill", "red");



