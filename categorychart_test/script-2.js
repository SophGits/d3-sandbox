window.onload = function() {

var data = [
  {
    'type': 'brassicas',
    'subsets': {

      'broccoli': {

        'data': {
          'days': {
            '1': 10,
            '2': 11,
            '3': 13,
            '4': 18,
            '5': 19,
            '6': 33,
            '7': 44,
            '8': 70
          },
          'most-popular': {
            'name': 'Amy',
            'images': [
              '38.media.tumblr.com/avatar_ea669dd4715f_128.png',
              'www.cookingplanit.com/public/uploads/inventory/broccoli2_1329934875.jpg',
              'findicons.com/files/icons/1187/pickin_time/256/broccoli.png'
            ]
          }
        } // data

      }, // broccoli
      'kohlrabi': {

        'data': {
          'days': {
            '1': 1,
            '2': 21,
            '3': 11,
            '4': 11,
            '5': 11,
            '6': 11,
            '7': 14,
            '8': 11
          },
          'most-popular': {
            'name': 'Trudy',
            'images': [
              'www.germanfoodguide.com/Images/cooking/kohlrabi.jpg',
              'www.vegkitchen.com/wp-content/uploads/2014/03/Kohlrabi-bunch.jpg',
              'urbanfarmcolorado.com/wp-content/uploads/2015/01/kohlrabi.jpg'
            ]
          }
        } // data


      },
      'turnip': {
        'data': {
          'days': {
            '1': 1,
            '2': 21,
            '3': 21,
            '4': 21,
            '5': 21,
            '6': 18,
            '7': 15,
            '8': 11
          },
          'most-popular': {
            'name': 'Judy',
            'images': [
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      } // turnip

    },

  },
  {
    'type': 'gourds',
    'subsets': {
      'cucumber': {
        'data': {
          'days': {
            '1': 1,
            '2': 23,
            '3': 31,
            '4': 11,
            '5': 51,
            '6': 41,
            '7': 54,
            '8': 8
          },
          'most-popular': {
            'name': 'Henry',
            'images': [
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'courgette': {
        'data': {
          'days': {
            '1': 1,
            '2': 21,
            '3': 31,
            '4': 29,
            '5': 28,
            '6': 26,
            '7': 24,
            '8': 21
          },
          'most-popular': {
            'name': 'Pope',
            'images': [
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'pumpkin': {
        'data': {
          'days': {
            '1': 4,
            '2': 6,
            '3': 10,
            '4': 5,
            '5': 8,
            '6': 0,
            '7': 11,
            '8': 9
          },
          'most-popular': {
            'name': 'Bo',
            'images': [
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      }
    }
  },
  {
    'type': 'legumes',
    'subsets': {
      'chickpea': {
        'data': {
          'days': {
            '1': 12,
            '2': 21,
            '3': 17,
            '4': 41,
            '5': 11,
            '6': 61,
            '7': 34,
            '8': 19
          },
          'most-popular': {
            'name': 'Finch',
            'images': [
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'lentil': {
        'data': {
          'days': {
            '1': 10,
            '2': 12,
            '3': 12,
            '4': 12,
            '5': 12,
            '6': 12,
            '7': 14,
            '8': 12
          },
          'most-popular': {
            'name': 'Lemon',
            'images': [
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'peanut': {
        'data': {
          'days': {
            '1': 13,
            '2': 18,
            '3': 14,
            '4': 12,
            '5': 13,
            '6': 14,
            '7': 15,
            '8': 17
          },
          'most-popular': {
            'name': 'Bob',
            'images': [
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      }
    }
  }

];


var margin = { top: 20 , right: 30, bottom: 50, left: 60 },
    foo = {
      height: window.innerHeight - margin.top - margin.bottom,
      width:  window.innerWidth - margin.left - margin.right
    }

var svg = d3.select("body")
  .append("svg")
  .classed('names', true)
  .attr({
    width: window.innerWidth,
    height: window.innerHeight
});

var line = d3.svg.line()
    .x(function(d,i) { return x(d.x); }) // by this point, d is an Object like {x: 1960, y: "62.25436585"}
    .y(function(d) { return y(d.y); });

function getMaxVal() {
  var maximum = 0;
  data.forEach(function(val, i) {
    var subs = val.subsets;
    for(sub in subs) {
      var days = subs[sub].data['days'];
      for (day in days) {
        if(days[day] > maximum) {
          maximum = days[day];
        }
      }
    } // sub in subs
  })
  return maximum;
};

function getNumDays() {
  var numDays = 0;
  data.forEach(function(val, i) {
    var subs = val.subsets;
    for(sub in subs) {
      var days = subs[sub].data['days'];
      for (day in days) {
        if(day > numDays) {
          numDays = day;
        }
      }
    } // sub in subs
  })
  return numDays;
};

var maxValue = getMaxVal(),
    numDays = getNumDays(),
    y = d3.scale.linear().domain([maxValue, 0]).range([margin.top, foo.height + margin.top]),
    x = d3.scale.linear().domain([0, numDays]).range([0 -margin.right, foo.width + margin.left]);

data.map(function(val, i) {
  var subs = val.subsets;

  for(sub in subs) {
    var lineData = [];

    // console.log('days ',subs[sub].data['days']);
    // console.log('popular ',subs[sub].data['most-popular'].name);

    var days = subs[sub].data['days'];
    for (day in days) {
      lineData.push({ x: day, y: days[day] });
    }

    var g = d3.select('.names')
      .append('g')
      .classed(sub, true)
      .data([lineData])

    g.append('svg:path')
      .attr('d', line)
      .attr('foobar', sub)
      .attr('popular', subs[sub].data['most-popular'].name)
      .attr('image1', subs[sub].data['most-popular'].images[0])
      .classed(sub, true)
      .classed(val.type, true)
      .classed('dataline', true)
      .style({
        fill: 'none',
        'stroke-width': "10"
      })

      g.selectAll('circle')
        .data(function (d) { return d; })
        .enter().append('circle')
        .attr('cx', function (d) { return x(d.x); })
        .attr('cy', function (d) { return y(d.y +0.8); })
        .attr('r', 10)
        .style({
          fill: 'white',
          stroke: 'darkorange',
          'stroke-width': 2,
          'z-index': 10
        })
        .attr('popular', subs[sub].data['most-popular'].name)
        .classed(sub, true)
        .classed('datapoint', true)
        .on('mouseover', function(d, i) {
          tooltip.classed('hide', false)
          tooltip.html('<p>Hii '+ this.getAttribute('popular') +'</p>')
        })

  } // sub in subs
})

var heightScale = d3.scale.linear() // y = mx + b
  .domain([0, d3.max(maxValue)])
  .range([0, foo.height]);


// Y axis
  var vGuideScale = d3.scale.linear()
    .domain([0, maxValue])
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

// X axis
  var hGuideScale = d3.scale.linear()
    .domain([1, numDays]) // guess of 4 years
    .range([0, foo.width])

  var hAxis = d3.svg.axis()
    .scale(hGuideScale)
    .orient('bottom')
    .ticks(numDays)

  var hGuide = d3.select('svg')
    .append('g')
    .classed('x_axis', true)
  hAxis(hGuide)

  hGuide.attr('transform', 'translate(' + margin.left + ', ' + (foo.height + margin.top) + ')')
  hGuide.selectAll('path')
    .style({ fill: 'green', stroke: "blue", opacity: 0.6 });


  // Tooltip
  var tooltip = d3.select('body').append('div')
    .classed('tooltip', true)
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'pink')
    .style('opacity', 0)


  // Events
  d3.selectAll('path')
    .on('mouseover', function(d) {
      originalStrokeWidth = this.style['stroke-width'];
      tooltip.classed('hide', false)
      d3.select(this)
        .transition().duration(50)
        .style('opacity', 1)
        .style('stroke-width', '15')
    })

    .on('mouseout', function(d) {
      tooltip.classed('hide', true)
      d3.select(this)
        .transition().duration(50)
        .style('opacity', 0.8)
        .style('stroke-width', originalStrokeWidth)
    })

    .on('mousemove', function(d, i) {

      var x0 = x.invert(d3.mouse(this)[0])
          j = Math.floor(x0 + 0.5),
          xCoord = d[j - 1].x, // accts as if it's a bar, not a line with a gradient...
          yCoord = parseInt(d[j -1].y);

      tooltip.transition() // tooltip here
        .style('opacity', 0.9)
      tooltip.html('<p>' + this.getAttribute('foobar') + '</em>' + ' (' + xCoord + ', ' + yCoord + ')</p><img src="http://' + this.getAttribute('image1') + '" />' + '<p>' + this.getAttribute('popular') + '</p>')
        .style('left', (d3.event.pageX) -50 + 'px')
        .style('top', (d3.event.pageY - 210) + 'px')
    })




} // window
