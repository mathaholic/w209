// Notes for w209

// #how to get a local HTTP Server 
// python -m SimpleHTTPServer 8085

// #JS to update a Barchart

var width = 400,
	height = 200, 
  barH = 20,
  chart = d3.select("#chart")
		.append("svg")
    .attr("width", width)
    .attr("height", height);
    

function barW(d) { return d; };
function barY(d, i) { return i*(barH+1);}

function updateChart(chartData) {

	var bars = chart.selectAll("rect")
  	.data(chartData);
    
  // Enter: items that must be created
  bars.enter()
  	.append("rect")
    .attr("x", 0)
    .attr("y", barY)
    .attr("width", barW)
    .attr("height", barH)    
    
  //Update: items that must be updated
  // **** YOUR CODE HERE
  //bars.enter()
  bars
      .attr("width", barW)
      .attr("height", barH);  
  //Exit: Items that must be deleted
  // **** YOUR CODE HERE
  bars.exit().remove();
  //aSDS
}

updateChart([20, 30, 40, 50]);
updateChart([10, 150]); 
updateChart([5,10,15,20,25,800]);
updateChart([15,31,3]);