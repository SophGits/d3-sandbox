// Adding a y axis

window.onload = function() {

  var bardata = [];

  for(var i=0; i<50; i++) {
    bardata.push( Math.round( Math.random()*50 ) + 5 )
  }

  bardata.sort(function compareNumbers(a,b) {
    return a -b;
  }) // sorts the data!

  var height = 400,
      width = 600,
      barWidth = 50,
      barOffset = 5;

  var tempColour;

  var yScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([0, height])

  var xScale = d3.scale.ordinal()
    .domain(d3.range(0, bardata.length))
    .rangeBands([0, width])

  var colours = d3.scale.linear()
    .domain([0, bardata.length]) //domain now dependent on position of data (rather than value)
    .range(['lightgreen', 'seagreen'])

  var tooltip = d3.select('body').append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0)

  var thisChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', 'lightblue')
    .append('g') // add an svg grouping element
    .selectAll('rect').data(bardata)
    .enter().append('rect')
      .style('fill', function(d,i) {
        return colours(i)
      })
      .attr('width', xScale.rangeBand())
      .attr('height', 0) // initial height of 0
      .attr('x', function(d,i) {
        return xScale(i);
      })
      .attr('y', height)
    .on('mouseover', function(d) {
      tooltip.transition()
        .style('opacity', 0.9)
      tooltip.html(d)
        .style('left', (d3.event.pageX - 30) + 'px')
        .style('top', (d3.event.pageY) + 'px')
      tempColour = this.style.fill;
      d3.select(this)
        .transition().duration(200)
        .style('opacity', 0.5)
        .style('fill', 'yellow')
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .transition().duration(800)
        .style('opacity', 1)
        .style('fill', tempColour)
    })

    thisChart.transition().duration(600)
      .attr('height', function(d) {
        return yScale(d)
      })
      .attr('y', function(d) {
        return height - yScale(d);
      })
      .delay(function(d,i) {
        return i * 60
      })
      .ease('elastic')
      .duration(1000)

    var vGuideScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([height, 0]) // opposite way round to yscale

    var vAxis = d3.svg.axis()
      .scale(vGuideScale)
      .orient('left')
      .ticks(10) // number of divisions / tick marks

    var vGuide = d3.select('svg').append('g')
    vAxis(vGuide)

    vGuide.attr('transform', 'translate(35, 1)')
    vGuide.selectAll('path')
      .style({ fill: 'yellow', stroke: "blue", opacity: 0.3 });
    vGuide.selectAll('line')
      .style({ stroke: "red" })

} // window onload