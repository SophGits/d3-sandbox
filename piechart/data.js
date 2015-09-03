// go to http://www.lynda.com/D3js-tutorials/Improving-our-pie-layout/162449/185074-4.html

window.onload = function() {

  var width = 400,
      height = 400,
      radius = 200,
      colours = ['red', 'orange', 'yellow', 'lightblue', 'pink', 'lawngreen'];

  var piedata = [
    {
      label: "Banana",
      value: 40
    },
    {
      label: "Apple",
      value: 20
    },
    {
      label: "Mango",
      value: 40
    },
    {
      label: "Cherry",
      value: 60
    },
    {
      label: "Blueberry",
      value: 50
    },
    {
      label: "Pineapple",
      value: 10
    }
  ]

  var pie = d3.layout.pie()
    .value(function(d) {
      return d.value;
    })

  var arc = d3.svg.arc()
    .outerRadius(radius)

  var thisChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width -radius) + ', ' + (height -radius) + ')')
    .selectAll('path').data(pie(piedata))
    .enter().append('g')
      .attr('class', 'slice')

    var slices = d3.selectAll('g.slice')
        .append('path')
        .attr('fill', function(d,i) {
          return colours[i];
        })
        .attr('d', arc)
    var text = d3.selectAll('g.slice')
      .append('text')
      .text(function(d,i){
        return d.data.label;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', 'darkblue')
      .attr('transform', function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        return 'translate(' + arc.centroid(d) +')' // puts labels in centre of each slice
      })

} // window onload