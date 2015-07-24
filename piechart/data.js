
window.onload = function() {

  var width = 400,
      height = 400,
      radius = 200,
      colours = ['green', 'lawngreen', 'limegreen'];

  var piedata = [
    {
      label: "Banana",
      value: 30
    },
    {
      label: "Apple",
      value: 50
    },
    {
      label: "Mango",
      value: 40
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
    .enter().append('path')
      .attr('fill', function(d,i) {
        return colours[i];
      })
      .attr('d', arc)

} // window onload