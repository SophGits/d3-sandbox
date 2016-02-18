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
              'https://38.media.tumblr.com/avatar_ea669dd4715f_128.png',
              'https://www.cookingplanit.com/public/uploads/inventory/broccoli2_1329934875.jpg',
              'http://findicons.com/files/icons/1187/pickin_time/256/broccoli.png'
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
              'http://www.germanfoodguide.com/Images/cooking/kohlrabi.jpg',
              'http://www.vegkitchen.com/wp-content/uploads/2014/03/Kohlrabi-bunch.jpg',
              'http://urbanfarmcolorado.com/wp-content/uploads/2015/01/kohlrabi.jpg'
            ]
          }
        } // data


      },
      'turnip': {
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
            'name': 'Judy',
            'images': [
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
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
            '2': 21,
            '3': 11,
            '4': 11,
            '5': 11,
            '6': 11,
            '7': 14,
            '8': 11
          },
          'most-popular': {
            'name': 'Henry',
            'images': [
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'courgette': {
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
            'name': 'Pope',
            'images': [
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'pumpkin': {
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
            'name': 'Bo',
            'images': [
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
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
            'name': 'Finch',
            'images': [
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'lentil': {
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
            'name': 'Lemon',
            'images': [
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      },
      'peanut': {
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
            'name': 'Bob',
            'images': [
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg',
              'http://www.vetprofessionals.com/catprofessional/images/home-cat.jpg'
            ]
          }
        } // data
      }
    }
  }

];

var maxValue = 0,
    numDays = 0;
data.map(function(val, i) {
  var subs = val.subsets;
  for(sub in subs) {
    console.log('days ',subs[sub].data['days']);
    console.log('popular ',subs[sub].data['most-popular'].name);

    var days = subs[sub].data['days'];
    for (day in days) {
      if(days[day] > maxValue) {
        maxValue = days[day];
      }
      if(day > numDays) {
        numDays = day;
      }
    }

  }
})

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

var heightScale = d3.scale.linear() // y = mx + b
  .domain([0, d3.max(maxValue)])
  .range([0, foo.height]);

var line = d3.svg.line()
    .x(function(d,i) { return x(d.x); }) // by this point, d is an Object like {x: 1960, y: "62.25436585"}
    .y(function(d) { return y(d.y); });

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
  vGuide.selectAll('line')
    .style({ stroke: "red" })

// X axis
  var hGuideScale = d3.scale.linear()
    .domain([0, numDays]) // guess of 4 years
    .range([0, foo.width])

  var hAxis = d3.svg.axis()
    .scale(hGuideScale)
    .orient('bottom')
    .ticks(3)

  var hGuide = d3.select('svg')
    .append('g')
    .classed('x_axis', true)
  hAxis(hGuide)

  hGuide.attr('transform', 'translate(' + margin.left + ', ' + (foo.height + margin.top) + ')')
  hGuide.selectAll('path')
    .style({ fill: 'green', stroke: "blue", opacity: 0.6 });
  hGuide.selectAll('line')
    .style({ stroke: "red" })


}
