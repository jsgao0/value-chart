(function(w) {
    'use strict';
    var caculator = require('./caculator'),
        moment = require('moment');
    window.onload = function() {
        var d3 = require('d3'),
            svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
            parseTime = d3.timeParse("%d-%b-%y"),
            x = d3.scaleTime().rangeRound([0, width]),
            y = d3.scaleLinear().rangeRound([height, 0]),
            area = d3.area()
                .x(function(d) { return x(d.date); })
                .y1(function(d) { return y(d.close); });

        var tasks = caculator.calculate({
            tasks: [
            {
                "name": "task1",
                "workingDays": 8,
                "startDate": 1234141312,
                "value": 100
            },
            {
                "name": "task1",
                "workingDays": 5,
                "startDate": 1320541312,
                "value": 10
            },
            {
                "name": "task1",
                "workingDays": 3,
                "startDate": 1234141312,
                "value": 10
            }
            ]
        }).map(function(d) {
            return {
                date: parseTime(moment(+d[0]).format('D-MMM-YY')),
                close: d[1]
            };
        });
        (function(data) {
            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.close; })]);
            area.y0(y(0));

            g.append("path")
                .datum(data)
                .attr("stroke", "black")
                .attr("fill", "none")
                .attr("d", area);

            g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Total Value");
        })(tasks);
    };
})(window);