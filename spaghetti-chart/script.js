window.onload = function() {

  var tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0)

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d, i) {
        console.log(d, i);
        return x(i);
      })
      .y(function(d) {
        return y(d.OTR);
      });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("cars.json", function(error, data) {
    if (error) throw error;

    // data.forEach(function(d) {
    //   d.OTR = +d.OTR; // if you want to cumulatively plot
    //   d.twelveMonth12kmilesPartEx = d.twelveMonth12kmilesPartEx;
    //   d.twentyFourMonth24kMilesPartEx = d.twentyFourMonth24kMilesPartEx;
    //   d.thirtySixMonth36kkMilesPartEx = d.thirtySixMonth36kkMilesPartEx;
    // });

    x.domain([0, 30]);
    y.domain(d3.extent(data, function(d) { return d.OTR; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price (OTR)");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .on('mouseover', function(d, i) {
          tooltip.transition()
            .style('opacity', 0.9)
          tooltip.html(d[i].Manufacturer + ' ' + d.x + ', ' + d.y)
            .style('left', (d3.event.pageX - 30) + 'px')
            .style('top', (d3.event.pageY) + 'px')
          });

  });
}