window.onload = function() {
 // // eg 1
   // d3.selectAll('#chart .item:nth-child(odd)')
   //   // .text('select')
   //   .append('span')
   //   .html(' <strong>selection</strong>')

   // // eg 2
   // d3.selectAll('#chart')
   //   .insert('span', ':nth-child(2') // insert at a specific position instead of append
   //   .html(' <strong>#2 selection</strong>')

   // // eg 3
   // d3.selectAll('#chart .item:nth-child(4')
   //   .remove();

   // eg 4
   // d3.selectAll('.item:nth-child(3)')
   // // eg a
   // // .classed('highlight', true) // other syntax
   // // eg b
   //   // .classed({
   //   //   "highlight": true,
   //   //   "item": false,
   //   //   "bigger": true
   //   // })
   // // eg c:
   // // .style({
   // //   "background": "red"
   // // })

  var myStyles = [
    { width: 200, colour: "yellow" },
    { width: 100, colour: "orange" },
    { width: 120, colour: "lawngreen" },
    { width: 170, colour: "lightblue" }
  ];
  d3.selectAll(".item")
    .data(myStyles)
    .style({
      "color": "darkred",
      "background": function(d) {
      return d.colour;
    },
    width: function(d) {
      return d.width + "px";
    }
  });

}