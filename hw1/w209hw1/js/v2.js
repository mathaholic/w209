//code inspiration, video 3.3.1
//and
//https://bl.ocks.org/mbostock/3305937

//var dataUrl = "http://localhost:8000/uniquexw209HW.tsv";
var dataUrl = "/uniquexw209HW.tsv";

var margin = {top: 10, right: 20, bottom: 60, left: 40},
    width = 2060 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// var x = d3.scale.linear()
//                 .range([0, width]);

// var y = d3.scale.linear()
//                 .range([height, 0]);

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv(dataUrl, function(error, data) {
  if (error) throw error;

  // Coerce the data to numbers.
  data.forEach(function(d) {
    d.x = d.MonthWeek;
    d.y = +d.Steps;
    console.log(d.y);
  });

  // Compute the scales’ domains.
  //x.domain(d3.extent(data, function(d) { return d.x; })).nice();
  //x.domain(d3.extent([0,124])).nice();
  x.domain(data.map(function(d) { return d.x; }));
  y.domain(d3.extent(data, function(d) { return d.y; }));
  console.log(data.y);

  // Add the x-axis.
  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(d3.svg.axis().scale(x).orient("bottom"));

  // Add the y-axis.
  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(d3.svg.axis().scale(y).orient("left"));

  // svg.append("svg")
  //     .attr("class", "axis axis--y")
  //     .call(d3.axisLeft(y).ticks(50, "s"))
  //   .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", "0.71em")
  //     .attr("text-anchor", "end")
  //     .text("y");

  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Steps per Day");

  // svg.append("g")
  //     .attr("class", "axis")
  //     //.attr("transform", "translate(0," + height + ")")
  //     //.attr("transform", "rotate(90)")
  //     .call(d3.axisBottom(x).ticks(20, ))
  //     .attr("transform", "rotate(-65)");
  // svg.append("g")
  //       .attr("class", "axis")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(d3.axisBottom(x));

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(10))
      .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  // Add the points!
  svg.selectAll(".point")
     .data(data)
     .enter().append("circle")
     .attr("class", "point")
     .attr("r", 4.5)
     .attr("cx", function(d) { return x(d.x); })
     .attr("cy", function(d) { return y(d.y); });
});


// var bars = svg.selectAll("rect");

// bars.enter()