window.onload = function() {
  var fruits = [
    { name: "banana",    colour: "yellow",     rating: 300 },
    { name: "apple",     colour: "lightgreen", rating: 360 },
    { name: "grapefruit",colour: "pink",       rating: 200 },
    { name: "lychee",    colour: "linen",      rating: 250 },
    { name: "pineapple", colour: "brown",      rating:  150 },
    { name: "orange",    colour: "orange",     rating: 280 }
  ]

  d3.selectAll("#chart").selectAll("div")
    .data(fruits)
    .enter().append("div")
    .classed("item", true)
    .text(function(d) {
      return d.name;
    })
    .style({
      "color": "darkred",
      "background": function(d) {
        return d.colour;
      },
      width: function(d) {
        return d.rating + "px";
      }
   })
}