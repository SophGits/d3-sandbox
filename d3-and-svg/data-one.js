window.onload = function() {

  // making a 'bar graph'

  var dataset = [8, 48, 14, 31, 23];

  svg = d3.select("body").append("svg").attr({
    width: 600,
    height: 400
  })

  svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr({
      x: function(d, i) { return i * 101; }, // puts 1px between bars
      y: function(d, i) { return 400 - (d * 5) }, // 400 is height of svg
      width: 100,
      height: function(d) { return d*5 },
      fill: "orange"
    })

}