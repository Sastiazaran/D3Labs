/*
*    main.js
*/


var dataArr = [];

d3.json("data/buildings.json").then((data)=> {
	data.forEach((d, i)=>{
		d.height = +d.height;
        dataArr.push(d.height)
	});

    var svg = d3.select("#chart-area").append("svg")
	.attr("width", 850)
	.attr("height", 850);

    console.log(dataArr);
    var rects = svg.selectAll("rect")
        .data(dataArr);

    rects.enter()
        .append("rect")
            .attr("x", (d,i) => { return i * 30})
            .attr("y", (d) =>{
                var y = 850-d;
                return y;
            })
            .attr("width", 28)
            .attr("height", (d) =>{ return d; })
            .attr("fill","brown");
    }).catch((error) => {
        console.log(error);
    });