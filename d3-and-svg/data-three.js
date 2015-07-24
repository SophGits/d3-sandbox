window.onload = function() {

  // This is good.
  // Scaling a bar chart so the largest bar fills the screen height (try adjusting screen height and reloading)
  // making the fill a range of colour (yellow to pink). Note the larger bars are pinker.
  // Source: https://code.tutsplus.com/courses/beautiful-data-with-d3/lessons/scales-part-2

  var svg = d3.select("body").append("svg").attr({
    width: window.innerWidth,
    height: window.innerHeight
  })

  var data = [10, 2, 8, 4, 5, 6, 3];

  var heightSCale = d3.scale.linear() // y = mx + b
    .domain([0, d3.max(data)])
    .range([0, window.innerHeight - 40]);

  var colourScale = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range(["yellow", "pink"]);

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr({
      width: 100,
      height: heightSCale, // height passes d as the 1st param, which is what heightscale needs
      x: function(d, i) { return i * 101 ;},
      y: 20,
      fill: colourScale
    })



  // Uncomment below to see power scale:
  // Source: https://code.tutsplus.com/courses/beautiful-data-with-d3/lessons/scales-part-2

  // var svg = d3.select("body").append("svg").attr({
  //   width: window.innerWidth,
  //   height: window.innerHeight
  // })

  // // y = mx^k + b  (a power scale)

  // var padding = 10;
  // var radius = 4;
  // var data = d3.range(150);

  // var cxScale = d3.scale.pow().exponent(2) // y = mx^2 + b
  //   .domain([0, d3.max(data)])
  //   .range([padding + radius/2, window.innerWidth - padding - radius/2]);

  // var cyScale = d3.scale.linear()
  //   .domain([0, d3.max(data)])
  //   .range([window.innerHeight - padding - radius/2, padding + radius/2]);

  // svg.selectAll("circle")
  //   .data(data)
  //   .enter()
  //   .append("circle")
  //   .attr({
  //     cx: cxScale,
  //     cy: cyScale,
  //     r: radius
  //   });

}