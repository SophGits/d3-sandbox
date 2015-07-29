window.onload = function() {

    var vintages = [
        "OTR",
        "1 year\n PartEx",
        "2 years\n PartEx",
        "3 years\n PartEx",
        "4 years\n PartEx"
    ],

      width = 925,
      height = 550,
      margin = 50,
      startYear = 0,
      endYear = 5,
      lowestOTR = 800,
      highestOTR = 15000,
      y = d3.scale.linear().domain([highestOTR, lowestOTR]).range([0 + margin, height - margin]),
      x = d3.scale.linear()
        .domain([0, vintages.length -1])
        .range([0 + margin -5, width]),
      years = d3.range(startYear, endYear);

    var vis = d3.select("#chart")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        // .attr("transform", "translate(0, 500)");


    var line = d3.svg.line()
        .x(function(d) { return x(d.x); }) // by this point, d is an Object like {x: 1960, y: "62.25436585"}
        .y(function(d) { return y(d.y); });

    d3.text('up-to-15k.csv', 'text/csv', function(text) {
        var cars = d3.csv.parseRows(text);

            var manufacturerList = [];
        for (i=1; i < cars.length; i++) {
            var values = cars[i].slice(6, 11); // from index 2 to end of data
            var currData = [];
            var started = false;
            for (j=0; j < values.length; j++) {
                if (values[j] != '') {
                    currData.push({ x: years[j], y: values[j] }); // see range (above) for years array
                    manufacturerList.push(cars[i][0]);
                    if (!started) {
                        started = true;
                    }
                }
            }

            function removeDuplicates(value, index, self) {
                return self.indexOf(value) === index;
            }
            manufacturerList = manufacturerList.filter( removeDuplicates );

            vis.append("svg:path")
                .data([currData])
                .attr("manufacturer", cars[i][0].toLowerCase())
                .attr("model", cars[i][1])
                // .attr("class", countries_regions[countries[i][1]]) // eg ECS (Albania is in Europe and Central Asia)
                .attr("d", line) // the D3 line fn (above) takes the whole array of point objects (each obj containing an x and y coordinate) and draws the path for us.
                .on("mouseover", onmouseover)
                .on("mouseout", onmouseout)
                .on("mousemove", onmousemove)
                .on("click", onclick);
                // appends data, and away we go on the next item in the loop. var srarted is false again and a new set of datapoints for the next country is collated and appended
        }
        listManufacturers(manufacturerList);
    });

    vis.append("svg:line")
        .attr("x1", x(startYear))
        .attr("y1", y(lowestOTR))
        .attr("x2", x(endYear -1))
        .attr("y2", y(lowestOTR))
        .attr("class", "axis")

    // line for y-axis
    vis.append("svg:line")
        .attr("x1", x(startYear))
        .attr("y1", y(lowestOTR))
        .attr("x2", x(startYear))
        .attr("y2", y(highestOTR))
        .attr("class", "axis")

    vis.selectAll(".xLabel")
        .data(x.ticks(4))
        .enter().append("svg:text")
        .attr("class", "xLabel")
        .text(String)
        .attr("x", function(d) { return x(d) }) // x(0) = 45 x(2) = 397
        .attr("y", height -10)
        .attr("text-anchor", "middle")

    function replaceXnums() {
        var nums = vis.selectAll(".xLabel");
        nums.each( function(i) {
            this.innerHTML = vintages[i]
        });
    }
    replaceXnums();

    vis.selectAll(".yLabel")
        .data(y.ticks(4))
        .enter().append("svg:text")
        .attr("class", "yLabel")
        .text(String)
        .attr("x", 0)
        .attr("y", function(d) { return y(d) })
        .attr("text-anchor", "right")
        .attr("dy", 3)

    function replaceYnums() {
        var nums = vis.selectAll(".yLabel");
        nums.each( function(i) {
            var original = this.innerHTML;
            this.innerHTML = '&#163;' + original;
        });
    }
    replaceYnums();


    function extendYTick() {
      vis.selectAll(".yTicks")
        .attr("x2", x(4))
            // .on("mouseover", function() {
            //   d3.select(this).attr("x2", x(4))
            // })
            // .on("mouseout", function() {
            //   d3.select(this).attr("x2", x(-0.04))
            // })
    }
    function retractYTick() {
      vis.selectAll(".yTicks")
        .attr("x2", x(-0.04))
    }

    function setListenerOnYNums() {
        var nums = vis.selectAll(".yLabel");
        $.each(nums, function() {
            $(this).on('mouseover', function()  {
                extendYTick();
            })
            $(this).on('mouseout', function()  {
                retractYTick();
            })
        })
    }
    setListenerOnYNums();

    vis.selectAll(".xTicks")
        .data(x.ticks(5))
        .enter().append("svg:line")
        .attr("class", "xTicks")
        .attr("x1", function(d) { return x(d); })
        .attr("y1", y(lowestOTR))
        .attr("x2", function(d) { return x(d); })
        .attr("y2", y(lowestOTR)+7)

    vis.selectAll(".yTicks")
        .data(y.ticks(4))
        .enter().append("svg:line")
        .attr("class", "yTicks")
        .attr("y1", function(d) { return y(d); })
        .attr("x1", x(0))
        .attr("y2", function(d) { return y(d); })
        .attr("x2", x(-0.04))
            .on("mouseover", function() {
              d3.select(this).attr("x2", x(4))
            })
            .on("mouseout", function() {
              d3.select(this).attr("x2", x(-0.04))
            })

    var tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '0 10px')
      .style('background', 'white')
      .style('opacity', 0)

    function onclick(d, i) {
        // var currClass = d3.select(this).attr("class");
        if (d3.select(this).classed('selected')) {
            d3.select(this).classed('selected', false);
            var manufacturer = this.attributes['manufacturer'].value.toLowerCase();
            $('.' + manufacturer).removeClass('bar');
            d3.selectAll("path[manufacturer=" + manufacturer + "]").classed('baz', false);
        } else {
            d3.select(this).classed('selected', true);
            var manufacturer = this.attributes['manufacturer'].value.toLowerCase();
            $('.' + manufacturer).addClass('bar');
            d3.selectAll("path[manufacturer=" + manufacturer + "]").classed('baz', true);
        }
    }

    function onmousemove(d, i) {
        var x0 = x.invert(d3.mouse(this)[0])
             i = Math.round(x0),
             xCoord = d[i].x,
             yCoord = parseInt(d[i].y);
         // console.log(xCoord + ', ' + yCoord);

         tooltip.transition()
           .style('opacity', 0.9)
         tooltip.html(this.getAttribute('manufacturer').toUpperCase() + ' ' + this.getAttribute('model') + '<br/>(x,y): ' + d[i].x + ', ' + d[i].y)
         // tooltip.html(d[i].Manufacturer + ' ' + d.x + ', ' + d.y)
           .style('left', (d3.event.pageX - 30) + 'px')
           .style('top', (d3.event.pageY -55) + 'px');

         // focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
    }

    function onmouseover(d, i) {
        if (!d3.select(this).classed('current')) {
            d3.select(this).classed('current', true)
            var manufacturer = this.attributes['manufacturer'].value.toLowerCase();
            $('.' + manufacturer).addClass('foo');
        }
    }

    function onmouseout(d, i) {
        if (d3.select(this).classed('current')) {
            var manufacturer = this.attributes['manufacturer'].value.toLowerCase();
            $('.' + manufacturer).removeClass("foo");
            // debugger
            d3.select(this).classed('current', false)
        }
        // $("#default-blurb").show();
        // $("#blurb-content").html('');
    }

    function showRegion(regionCode) {
        var cars = d3.selectAll("path."+regionCode);
        if (cars.classed('highlight')) {
            cars.attr("class", regionCode);
        } else {
            cars.classed('highlight', true);
        }
    }

    function listManufacturers( list ) {
        console.log(list);
        var manuf;
        for(var i=list.length; i--; ) {
            manuf = list[i].toLowerCase()
            $('#key').append('<div class="' + manuf + ' type">' + list[i] + '</div>');
        }
        $('#key .type').on('click', function() {
            var manuf = this.classList[0];
            if ( this.classList.contains("bar") ) {
                $(this).removeClass('bar');
                d3.selectAll("path[manufacturer=" + manuf + "]").classed('baz', false);
            } else {
                $(this).addClass('bar');
                d3.selectAll("path[manufacturer=" + manuf + "]").classed('baz', true);
            }
        })
    }
}