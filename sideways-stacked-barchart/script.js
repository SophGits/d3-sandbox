window.onload = function() {

  var margins = {
    top: 12,
    left: 48,
    right: 24,
    bottom: 24
  },
  legendPanel = {
    width: 220
  },
  width = 800 - margins.left - margins.right - legendPanel.width,
    height = 100 - margins.top - margins.bottom,
    dataset = [{
      data: [{
          month: 'USA',
          count: 123
      }, {
          month: 'Canada',
          count: 234
      }, {
          month: 'UK',
          count: 234
      }, {
          month: 'Italy',
          count: 234
      }, {
          month: 'France',
          count: 234
      }, {
          month: 'Netherlands',
          count: 234
      }, {
          month: 'Portugal',
          count: 234
      }, {
          month: 'Brazil',
          count: 234
      }, {
          month: 'Argentina',
          count: 234
      }, {
          month: 'Japan',
          count: 345
      }],
      name: 'Inner Qualities'
    }, {
      data: [{
          month: 'USA',
          count: 123
      }, {
          month: 'Canada',
          count: 234
      }, {
          month: 'UK',
          count: 234
      }, {
          month: 'Italy',
          count: 234
      }, {
          month: 'France',
          count: 234
      }, {
          month: 'Netherlands',
          count: 234
      }, {
          month: 'Portugal',
          count: 234
      }, {
          month: 'Brazil',
          count: 234
      }, {
          month: 'Argentina',
          count: 234
      }, {
          month: 'Japan',
          count: 345
      }],
      name: 'Physical Attributes'
    },
    {
      data: [{
          month: 'USA',
          count: 123
      }, {
          month: 'Canada',
          count: 234
      }, {
          month: 'UK',
          count: 234
      }, {
          month: 'Italy',
          count: 234
      }, {
          month: 'France',
          count: 234
      }, {
          month: 'Netherlands',
          count: 234
      }, {
          month: 'Portugal',
          count: 234
      }, {
          month: 'Brazil',
          count: 234
      }, {
          month: 'Argentina',
          count: 234
      }, {
          month: 'Japan',
          count: 345
      }],
      name: 'Style'
    }],
    series = dataset.map(function (d) {
        return d.name;
    }),
    dataset = dataset.map(function (d) {
        return d.data.map(function (obj, i) {
            return {
                y: obj.count,
                x: obj.month
            };
        });
    }),
    stack = d3.layout.stack();

  stack(dataset);

  var dataSet = dataset.map(function (group) {
    return group.map(function (d) {
      return {
          x: d.y,
          y: d.x,
          x0: d.y0
      };
    });
  }),
  svg = d3.select('body')
    .append('svg')
    .attr('width', width + margins.left + margins.right + legendPanel.width)
    .attr('height', height + margins.top + margins.bottom)
    .append('g')
    .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
  var xMax = d3.max(dataSet, function (group) { // group is all objs (properties are x,y,x0)
    return d3.max(group, function (d) {
        return d.x + d.x0;
    });
  }),
  xScale = d3.scale.linear()
    .domain([0, xMax])
    .range([0, width]),
  countries = dataSet[0].map(function (d) {
    return d.y;
  }),
  _ = console.log(countries),
  yScale = d3.scale.ordinal()
    .domain(countries)
    .rangeRoundBands([0, height], .1),
  yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left'),
  xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom'),
  colours = d3.scale.category10(),
  groups = svg.selectAll('g')
    .data(dataSet)
    .enter()
    .append('g')
    .style('fill', function (d, i) {
    return colours(i);
  }),
  rects = groups.selectAll('rect')
    .data(function (d) {
    return d;
  })
    .enter()
    .append('rect')
    .attr('x', function (d) {
    return xScale(d.x0);
  })
    .attr('y', function (d, i) {
    return yScale(d.y);
  })
    .attr('height', function (d) {
    return yScale.rangeBand();
  })
    .attr('width', function (d) {
    return xScale(d.x);
  })
  .on('mouseover', function (d) {
    var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
    var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;

    d3.select('#tooltip')
        .style('left', xPos + 'px')
        .style('top', yPos + 'px')
        .select('#value')
        .text(d.x);

    d3.select('#tooltip').classed('hidden', false);
  })
    .on('mouseout', function () {
    d3.select('#tooltip').classed('hidden', true);
  })

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

  svg.append('rect')
    .attr('fill', 'yellow')
    .attr('height', 30 * dataSet.length)
    .attr('y', 0)
    .attr('width', 220)
    .attr('x', width + margins.left);

  series.forEach(function (s, i) {
    svg.append('text')
      .attr('fill', 'black')
      .attr('x', width + margins.left + 8) // how indented into yellow box text is
      // .attr('width', 200)
      .attr('y', i * 24 + 24)
      .text(s);
    svg.append('rect')
      .attr('fill', colours(i))
      .attr('width', 40)
      .attr('height', 20)
      .attr('x', width + margins.left + 150)
      .attr('y', i * 24 + 6);
  });

}