window.onload = function() {
    var regions = {
        "SAS": "South Asia" ,
        "ECS": "Europe and Central Asia",
        "MEA": "Middle East & North Africa",
        "SSF": "Sub-Saharan Africa",
        "LCN": "Latin America & Caribbean",
        "EAS": "East Asia &amp; Pacific",
        "NAC": "North America"
    },

      w = 925,
      h = 550,
      margin = 30,
      startYear = 1960,
      endYear = 2010,
      startAge = 20,
      endAge = 80,
      y = d3.scale.linear().domain([endAge, startAge]).range([0 + margin, h - margin]),
      x = d3.scale.linear().domain([1960, 2009]).range([0 + margin -5, w]),
      years = d3.range(startYear, endYear);

    var vis = d3.select("#chart")
        .append("svg:svg")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        // .attr("transform", "translate(0, 600)");


    var line = d3.svg.line()
        .x(function(d,i) { return x(d.x); }) // by this point, d is an Object like {x: 1960, y: "62.25436585"}
        .y(function(d) { return y(d.y); });


    // Regions
    var countries_regions = {};
    d3.text('country-regions.csv', 'text/csv', function(text) {
        var regions = d3.csv.parseRows(text);
        for (i=1; i < regions.length; i++) {
            countries_regions[regions[i][0]] = regions[i][1];
        }
    });

    var startEnd = {},
        countryCodes = {};
    d3.text('life-expectancy-cleaned-all.csv', 'text/csv', function(text) {
        var countries = d3.csv.parseRows(text);

        for (i=1; i < countries.length; i++) {
            var values = countries[i].slice(2, countries[i.length-1]); // from index 2 to end of data
            var currData = [];
            countryCodes[countries[i][1]] = countries[i][0]; // [0] is code, [1] to full name (AFG -> Afghanistan)

            var started = false;
            for (j=0; j < values.length; j++) {
                if (values[j] != '') {
                    currData.push({ x: years[j], y: values[j] }); // see range (above) for years array
                    // obj:
                    //   x: 1960
                    //   y: "31.13209756"
                    if (!started) {
                        startEnd[countries[i][1]] = { 'startYear':years[j], 'startVal':values[j] }; // just makes AFG obj with startVal & startYear
                        started = true;
                    } else if (j == values.length-1) {
                        startEnd[countries[i][1]]['endYear'] = years[j];
                        startEnd[countries[i][1]]['endVal'] = values[j];
                    }

                }
            }
            debugger
            vis.append("svg:path")
                .data([currData])
                .attr("country", countries[i][1]) // code (eg ALB)
                .attr("class", countries_regions[countries[i][1]]) // eg ECS (Albania is in Europe and Central Asia)
                .attr("d", line) // the D3 line fn (above) takes the whole array of point objects (each obj containing an x and y coordinate) and draws the path for us.
                .on("mouseover", onmouseover)
                .on("mouseout", onmouseout);
                // appends data, and away we go on the next item in the loop. var srarted is false again and a new set of datapoints for the next country is collated and appended
        }
    });

    vis.append("svg:line")
        .attr("x1", x(1960))
        .attr("y1", y(startAge))
        .attr("x2", x(2009))
        .attr("y2", y(startAge))
        .attr("class", "axis")

    vis.append("svg:line")
        .attr("x1", x(startYear))
        .attr("y1", y(startAge))
        .attr("x2", x(startYear))
        .attr("y2", y(endAge))
        .attr("class", "axis")

    vis.selectAll(".xLabel")
        .data(x.ticks(5))
        .enter().append("svg:text")
        .attr("class", "xLabel")
        .text(String)
        .attr("x", function(d) { return x(d) })
        .attr("y", h-10)
        .attr("text-anchor", "middle")

    vis.selectAll(".yLabel")
        .data(y.ticks(4))
        .enter().append("svg:text")
        .attr("class", "yLabel")
        .text(String)
      .attr("x", 0)
      .attr("y", function(d) { return y(d) })
      .attr("text-anchor", "right")
      .attr("dy", 3)

    vis.selectAll(".xTicks")
        .data(x.ticks(5))
        .enter().append("svg:line")
        .attr("class", "xTicks")
        .attr("x1", function(d) { return x(d); })
        .attr("y1", y(startAge))
        .attr("x2", function(d) { return x(d); })
        .attr("y2", y(startAge)+7)

    vis.selectAll(".yTicks")
        .data(y.ticks(4))
        .enter().append("svg:line")
        .attr("class", "yTicks")
        .attr("y1", function(d) { return y(d); })
        .attr("x1", x(1959.5))
        .attr("y2", function(d) { return y(d); })
        .attr("x2", x(1960))

    function onclick(d, i) {
        var currClass = d3.select(this).attr("class");
        if (d3.select(this).classed('selected')) {
            d3.select(this).attr("class", currClass.substring(0, currClass.length-9));
        } else {
            d3.select(this).classed('selected', true);
        }
    }

    function onmouseover(d, i) {
        var currClass = d3.select(this).attr("class");
        d3.select(this)
            .attr("class", currClass + " current");

        var countryCode = $(this).attr("country");
        var countryVals = startEnd[countryCode];
        var percentChange = 100 * (countryVals['endVal'] - countryVals['startVal']) / countryVals['startVal'];

        var blurb = '<h2>' + countryCodes[countryCode] + '</h2>';
        blurb += "<p>On average: a life expectancy of " + Math.round(countryVals['startVal']) + " years in " + countryVals['startYear'] + " and " + Math.round(countryVals['endVal']) + " years in " + countryVals['endYear'] + ", ";
        if (percentChange >= 0) {
            blurb += "an increase of " + Math.round(percentChange) + " percent."
        } else {
            blurb += "a decrease of " + -1 * Math.round(percentChange) + " percent."
        }
        blurb += "</p>";

        $("#default-blurb").hide();
        $("#blurb-content").html(blurb);
    }
    function onmouseout(d, i) {
        var currClass = d3.select(this).attr("class");
        var prevClass = currClass.substring(0, currClass.length-8);
        d3.select(this)
            .attr("class", prevClass);
        // $("#blurb").text("hi again");
        $("#default-blurb").show();
        $("#blurb-content").html('');
    }

    function showRegion(regionCode) {
        var countries = d3.selectAll("path."+regionCode);
        if (countries.classed('highlight')) {
            countries.attr("class", regionCode);
        } else {
            countries.classed('highlight', true);
        }
    }
}