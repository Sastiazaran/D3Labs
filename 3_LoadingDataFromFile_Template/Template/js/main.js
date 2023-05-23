/*
*    main.js
*/

// ./D3Labs/resources/data/ages.csv

d3.json("data/ages.json").then((data) => {

    var ages = [];

    data.forEach((d) => {
        d.age = + d.age;
        ages.push(d.age);
    });
    console.log(data);

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400)

    var circles = svg.selectAll("circle")
        .data(ages);

    circles.enter()
        .append("circle")
        .attr("cx", (d, i) => {
            // console.log("Item: " + d + " Index: " + i);
            return (i * 50) + 25;
        })
        .attr("cy", 250)
        .attr("r", (d) => { return d; })
        .attr("fill", "gray");

}).catch((error) => {
    console.log(error);
});


