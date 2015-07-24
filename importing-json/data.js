// with properly-aligned y axis

window.onload = function() {

  var bardata = [];
  var manufacturerData = [];

  var margin = { top: 30 , right: 30, bottom: 40, left: 50 }

  d3.json('cars.json', function(data) {

    for (key in data) {
      bardata.push(data[key].OTR)
      manufacturerData.push(data[key].Manufacturer)
    }

    var height = 400 - margin.top - margin.bottom,
        width = 600 - margin.left - margin.right,
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
      .domain([0, d3.max(bardata)]) //domain now dependent on position of data (rather than value)
      .range(['lightgreen', 'seagreen'])

    var tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '0 10px')
      .style('background', 'white')
      .style('opacity', 0)

    var thisChart = d3.select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background', 'lightblue')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
      .selectAll('rect').data(bardata)
      .enter().append('rect')
        .style('fill', colours)
        .attr('width', xScale.rangeBand())
        .attr('height', 0) // initial height of 0
        .attr('x', function(d,i) {
          return xScale(i);
        })
        .attr('y', height)
      .on('mouseover', function(d, i) {
        tooltip.transition()
          .style('opacity', 0.9)
        tooltip.html('OTR: &pound' + d + ' ' + manufacturerData[i])
          .style('left', (d3.event.pageX - 30) + 'px')
          .style('top', (d3.event.pageY) + 'px')
        tempColour = this.style.fill;
        d3.select(this)
          .style('fill', 'yellow')
      })
      .on('mouseout', function(d) {
        d3.select(this)
          .style('fill', tempColour)
      })

      thisChart.transition().duration(1)
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
        .duration(1)

      var vGuideScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([height, 0]) // opposite way round to yscale

      var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')
        .ticks(10) // number of divisions / tick marks

      var vGuide = d3.select('svg').append('g')
      vAxis(vGuide)

      vGuide.attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
      vGuide.selectAll('path')
        .style({ fill: 'yellow', stroke: "blue", opacity: 0.3 });
      vGuide.selectAll('line')
        .style({ stroke: "red" })
      vGuide.selectAll('text')
        .style({ "font-size": "9px" })

  }) // info,tsv

} // window onload