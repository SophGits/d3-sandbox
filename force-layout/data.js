// http://www.lynda.com/D3js-tutorials/Controlling-text-nodes/162449/185077-4.html

window.onload = function() {

    var w = 900,
    h = 400;

    var circleWidth = 5;

    var palette = {
        "lightgray": "#819090",
        "gray": "#708284",
        "mediumgray": "#536870",
        "darkgray": "#475B62",

        "darkblue": "#0A2933",
        "darkerblue": "#042029",

        "paleryellow": "#FCF4DC",
        "paleyellow": "#EAE3CB",
        "yellow": "#A57706",
        "orange": "#BD3613",
        "red": "#D11C24",
        "pink": "#C61C6F",
        "purple": "#595AB7",
        "blue": "#2176C7",
        "green": "#259286",
        "yellowgreen": "#738A05"
    }

    var nodes = [
        { name: "Parent" },
        { name: "child1", target: [0] },
        { name: "child2", target: [0] },
        { name: "child3", target: [2] },
        { name: "child4", target: [2, 3] },
        { name: "child5", target: [1, 2, 3] },
    ];

    var links = [
    ]

    for ( var i=0; i<nodes.length; i++ ) {
        if( nodes[i].target !== undefined ) {
            for( var x = 0; x<nodes[i].target.length; x++ ) {
                links.push({
                    source: nodes[i],
                    target: nodes[nodes[i].target[x]]
                })
            }
        }
    }

    var myChart = d3.select('#chart')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

    var force = d3.layout.force()
        .nodes(nodes)
        .links([])
        .gravity(0.2)
        .charge(-1000)
        .size([w, h])

    var link = myChart.selectAll('line')
        .data(links).enter().append('line')
        .attr('stroke', palette.gray)

    var node = myChart.selectAll('circle')
        .data(nodes).enter()
        .append('g')
        .call(force.drag)

    node.append('circle') // making the circles that have already been selectAll'ed
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .attr('r', circleWidth )
        .attr('fill', palette.pink )

    node.append('text')
        .text(function(d) { return d.name })
        .attr('font-family', 'Arial')
        .attr('fill', function(d,i) {
            if(i>0) { return palette.mediumgray }
            else { return palette.yellowgreen }
        })
        .attr('text-anchor', 'end') //beginning = right / end = left
        .attr('font-size', '20px')

    force.on('tick', function(e) {
        node.attr('transform', function(d,i) {
            return 'translate('+ d.x + ',' + d.y + ')';
        })

        link
            .attr('x1', function(d) { return d.source.x })
            .attr('y1', function(d) { return d.source.y })
            .attr('x2', function(d) { return d.target.x })
            .attr('y2', function(d) { return d.target.y })

    })

    force.start();

} // window onload