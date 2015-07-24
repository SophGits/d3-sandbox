// Creating blocks
// colouring them
// deleting excess placeholders for rects

window.onload = function() {
  svg = d3.select("body").append("svg").attr({
    width: 1200,
    height: 400
  })

  svg.selectAll("rect")
    .data(d3.range(5))
    .enter()
    .append("rect")
    .attr({
      width: 100,
      height: 100,
      y: 100,
      x: function(d, i) { return i*101},
      fill: "red"
    });

  var moreData = d3.range(3); // of the range of 5 rectangles we've made (above), select 3 of them
  var rects = svg.selectAll("rect").data(moreData); // select 3 (the first 3) of all the rects and ...
  rects.attr("fill", "#ccc"); // fill them with a light grey

  rects.exit().attr("fill", "#ececec"); // with the 'exit' (excess) rects, colour them this darker grey
}