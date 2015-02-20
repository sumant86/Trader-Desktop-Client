// Usage
// <div data-trader-chart class="row" assets="vm.account.assets"></div>
/* global d3 */
/* jshint -W126 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('atTraderChart', TraderChartDirective);

    TraderChartDirective.$inject = ['$window'];

    /* @ngInject */
    function TraderChartDirective($window) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                assets: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch('assets', draw, true);
            
            angular.element($window).on('resize', function(){
                draw(n);
            });
            
            scope.$on('$destroy', function() {
                angular.element($window).off('resize', draw);
            });

            function draw(n){
                if (!n || typeof(n[0]) === "undefined") {
                    return;
                }
                var margin = {t: 20, r: 150, b: 20, l: 70}, height = 550;
                d3.select(element[0]).select("svg").remove();
                var svg = d3.select(element[0]).append("svg")
                        .style('width', '100%')
                        .attr('height', height)
                        .attr("transform", "translate(0," + (margin.t) + ")");
                var width = parseInt(d3.select("svg").style("width").replace("px",""));
                var w = width - margin.l - margin.r;
                var h = height - margin.t - margin.b;
                var yCount = n.length;

                var y = d3.scale.linear().range([h - margin.t - margin.b, 0]);
                var x = d3.scale.linear().range([0, w - margin.r - margin.l]);

                var color = ["#FF8000", "#FECC88", "#FFF4D2"];
                var getRanges = function (d) {
                    var e, p;
                    e = ((d.quantityExecuted / d.quantity)).toFixed(4);
                    p = ((d.quantityPlaced / d.quantity)).toFixed(4);
                    return [[0, e], [e, (p - e).toFixed(4)], [p, 1 - p]];
                };
                var line = d3.svg.line()
                        .x(function (d) {
                            return d.x;
                        })
                        .y(function (d) {
                            return d.y;
                        });
                var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("top")
                        .tickSubdivide(true)
                        .tickFormat(d3.format(".0%"))
                        .ticks(3);
                var y_domain = [yCount, 0];

                var yAxis = d3.svg.axis()
                        .scale(y)
                        .ticks(0)
                        .tickSubdivide(true)
                        .orient("left");
                y.domain(y_domain);

                svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                        .call(xAxis);

                svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + margin.l + "," + (margin.t) + ")")
                        .call(yAxis);

                // function for the x grid lines
                function make_x_axis() {
                    return d3.svg.axis()
                            .scale(x)
                            .orient("bottom")
                            .ticks(10);
                }

                // function for the y grid lines
                function make_y_axis() {
                    return d3.svg.axis()
                            .scale(y)
                            .orient("left")
                            .ticks(0);
                }
                // Draw the x Grid lines
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.l + "," + (h) + ")")
                        .call(make_x_axis()
                                .tickSize(-h, 0, 0)
                                .tickFormat("")
                                );

                // Draw the y Grid lines
                svg.append("g")
                        .attr("class", "grid")
                        .attr("transform", "translate(" + margin.l + "," + (h + margin.t) + ")")
                        .call(make_y_axis()
                                .tickSize(-w, 0, 0)
                                .tickFormat("")
                                );
                n.forEach(function (td, j) {
                    svg.append("g")
                            .append("text")
                            .text(td.id)
                            .attr("transform", "translate(" + (margin.l - 20) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount) + ")");
                    // Put Total quantity on the right of bar
                    svg.append("g")
                            .append("text")
                            .text(td.quantity)
                            .attr("transform", "translate(" + (w - margin.r + 10) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount) + ")");
                    // Draw a line below total quantity right to bar
                    svg.append("g")
                            .append("path")
                            .attr("class", "line")
                            .attr("d", line([{x: 0, y: 0}, {x: 60, y: 0}]))
                            .attr("transform", "translate(" + (w - margin.r) + "," + (y(j) + Math.floor((w / yCount) / 2) + yCount + 1) + ")");
                    
                    svg.append("g")
                            .attr("transform", "translate(" + margin.l + "," + (y(j) + margin.t - Math.floor((w / yCount) / 2)) + ")")
                            .selectAll("rect")
                            .data(getRanges(td))
                            .enter()
                            .append("rect")
                            .attr("class", "bar")
                            .style("fill", function (d, i) {
                                return color[i];
                            })
                            .attr("width", function (d, i) {
                                return x(d[1]);
                            })
                            .attr("height", Math.floor((w / yCount) / 2))
                            .attr("transform", function (d) {
                                return "translate(" + x(d[0]) + "," + Math.floor((w / yCount) / 2) + ")";
                            });
                            
                });
                var legends = [{"title": "Executed", "color": "#FF8000"}, {"title": "Placed", "color": "#FECC88"}, {"title": "Total", "color": "#FFF4D2"}];
                var legend = svg.selectAll(".legend")
                        .data(legends.slice().reverse())
                        .enter().append("g")
                        .attr("class", "legend")
                        .attr("transform", function (d, i) {
//                            return "translate(" + (-margin.l - margin.r - i * 100) + ",0)"; // Horizontal
                            return "translate(" + (-margin.l - margin.r) + "," + i * 20 + ")";// Vertical
                        });

                legend.append("rect")
                        .attr("x", width)
                        .attr("width", 18)
                        .attr("height", 18)
                        .style("fill", function (d) {
                            return d.color;
                        });

                legend.append("text")
                        .attr("x", width + 20)
                        .attr("y", 9)
                        .attr("dy", ".35em")
                        .style("text-anchor", "start")
                        .text(function (d) {
                            return d.title;
                        });
            }
        }
        
    }
    
})();
