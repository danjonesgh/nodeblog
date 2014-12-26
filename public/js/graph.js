
var data = [7, 9, 6, 11, 11, 7, 13];



d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .style("background-color", "#18453B")
    .style("margin-bottom", "6px")
    .style("color", "white")
    .style("padding", "6px")
    .text(function(d) { return d; });



