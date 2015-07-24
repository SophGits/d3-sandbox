// Add mouseover/out event

window.onload = function() {

  var bardata = [20, 30, 20, 15, 40, 80];

  var height = 400,
      width = 600,
      barWidth = 50,
      barOffset = 5;

  var tempColour; // make variable

  var yScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([0, height])

  var xScale = d3.scale.ordinal()
    .domain(d3.range(0, bardata.length))
    .rangeBands([0, width])

  var colours = d3.scale.linear()
    .domain([0, bardata.length])
    .range(['lightgreen', 'seagreen'])

  d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', 'lightblue')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
      .style('fill', function(d,i) {
        return colours(i)
      })
      .attr('width', xScale.rangeBand())
      .attr('height', function(d,i) {
        return yScale(d)
      })
      .attr('x', function(d,i) {
        return xScale(i);
      })
      .attr('y', function(d) {
        return height - yScale(d);
      })
    .on('mouseover', function(d) {
      tempColour = this.style.fill;
      d3.select(this)
        .style('opacity', 0.5)
        .style('fill', 'yellow') // on mouseover apply half opacity and a yellow colour
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .style('opacity', 1)
        .style('fill', tempColour) // fill with original colour
    })

} // window onload