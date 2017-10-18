// Code inspiration: https://bl.ocks.org/mbostock/3885304

//var dataUrl = "http://people.ischool.berkeley.edu/~nhaas/w209hw1.tsv";
//var dataUrl = "/Users/nicholeh/student285/w209/hw1/w209hw1.tsv"
var dataUrl = "http://localhost:8000/uniquexw209HW.tsv";
// var parsedTSV = d3.tsv.parseRows(dataUrl);

var svg = d3.select("svg"),
    margin = {top: 10, right: 200, bottom: 300, left: 20},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

d3.tsv(dataUrl, function(d) {
  d.Steps = +d.Steps;
  return d.Steps;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.MonthWeek; }));
  y.domain([0, d3.max(data, function(d) { return d.Steps; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(1000))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Steps");

  g.selectAll(".bar")
    .data(dataUrl)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.MonthWeek); })
      .attr("y", function(d) { return y(d.Steps); })
      .attr("width", x.bandwidth())                                      
      .attr("height", function(d) { return height - y(d.Steps)
                                   ; 
                                  });
});