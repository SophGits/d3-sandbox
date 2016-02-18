window.onload = function() {

var data = [
  {
    'name': 'Amy',
    'num': 10,
  },
  {
    'name': 'Rita',
    'num': 2
  },
  {
    'name': 'Kim K',
    'num': 9
  },
  {
    'name': 'Lacey',
    'num': 5
  },
  {
    'name': 'Howard',
    'num': 2
  },
  {
    'name': 'Joy',
    'num': 1
  }
];
var barData = [],
    personData = [];


for (key in data) {
  barData.push(data[key].num)
  personData.push(data[key].name)
}

var margin = { top: 20 , right: 30, bottom: 50, left: 60 },
    foo = {
      height: window.innerHeight - margin.top - margin.bottom,
      width:  window.innerWidth - margin.left - margin.right
    }

var svg = d3.select("body").append("svg").attr({
  width: window.innerWidth,
  height: window.innerHeight
});

var heightScale = d3.scale.linear() // y = mx + b
  .domain([0, d3.max(barData)])
  .range([0, foo.height]);

var colourScale = d3.scale.linear()
  .domain([0, d3.max(barData)])
  .range(["yellow", "pink"]);

var bars = svg
  .append('g')
  .classed('bars', true)
  .selectAll("rect")
  .data(barData)
  .enter()
  .append("rect")
  .attr({
    width: (foo.width /barData.length) -1,
    height: 0, // height passes d as the 1st param, which is what heightscale needs
    x: function(d, i) { return i * (foo.width /barData.length) +1 ;},
    y: function(d, i) { return foo.height },
    fill: colourScale
  });

// Initial bar animation
bars.transition().duration(600)
  .attr('height', function(d) {
    return heightScale(d)
  })
  .attr({
    y: function(d, i) { return foo.height - heightScale(d) }, // 400 is height of svg
  })
  .delay(function(d,i) {
    return i * 80 // each one animates after 60ms multiplied by its index
  })
  .ease('bounce-in')
  .duration(1000)

// Tooltip
var tooltip = d3.select('body').append('div')
  .classed('tooltip', true)
  .style('position', 'absolute')
  .style('padding', '0 10px')
  .style('background', 'white')
  .style('opacity', 0)

// Events
  bars.on('mouseover', function(d) {
    tooltip.classed('hide', false)
    tempColour = this.style.fill;
    d3.select(this)
      .transition().duration(300)
      .style('opacity', 0.3)
      .style('fill', 'green')
  })
  .on('mouseout', function(d) {
    tooltip.classed('hide', true)

    d3.select(this)
      .transition().duration(600)
      .style('opacity', 1)
      .style('fill', tempColour)
  })
  .on('mousemove', function(d, i) {
    tooltip.transition() // tooltip here
      .style('opacity', 0.9)
    tooltip.html(personData[i] + ' ' + d)
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY + 20) + 'px')
  })

// Y axis
  var vGuideScale = d3.scale.linear()
    .domain([0, d3.max(barData)])
    .range([foo.height, 0]) // opposite way round to yscale

  var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10) // number of divisions / tick marks

  var vGuide = d3.select('svg')
    .append('g')
    .classed('y_axis', true)
  vAxis(vGuide)

  vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top +')')
  vGuide.selectAll('path')
    .style({ fill: 'yellow', stroke: "blue", opacity: 0.3 });
  vGuide.selectAll('line')
    .style({ stroke: "red" })

// X axis
  var hGuideScale = d3.scale.linear()
    .domain([0, 4]) // guess of 4 years
    .range([0, foo.width])

  var hAxis = d3.svg.axis()
    .scale(hGuideScale)
    .orient('bottom')
    .ticks(4)

  var hGuide = d3.select('svg')
    .append('g')
    .classed('x_axis', true)
  hAxis(hGuide)

  hGuide.attr('transform', 'translate(' + margin.left + ', ' + (foo.height + margin.top) + ')')
  hGuide.selectAll('path')
    .style({ fill: 'green', stroke: "blue", opacity: 0.6 });
  hGuide.selectAll('line')
    .style({ stroke: "red" })

  bars
    .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

}
