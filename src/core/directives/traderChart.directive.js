// Usage
// <div data-at-barchart assets="vm.account.assets"></div>
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

        function link(scope, element) {
            var tableRowHeight = 37; // TODO: take out hard coding

            // initialize the chart
            var base = d3.select(element[0]).append('svg');
            var barChart = new BarChart(base);
            barChart.barHeight(tableRowHeight);

            // Redraw whenever assets change
            scope.$watch('assets', draw, true);

            // Redraw whenever window resizes
            // TODO: Add a throttle function
            angular.element($window).on('resize', draw);

            // Remove the redraw handler when the scope is destroyed
            // This prevents redrawing when the view containing the barchart is destroyed
            scope.$on('$destroy', function() {
                angular.element($window).off('resize', draw);
            });

            function draw() {
                var assets = scope.assets;

                // This can happen when the server has not yet returned the assets
                if (!assets) { return; }
                
                barChart
                    .width(element.width())
                    .draw(assets);
            }
        }
    }

    /* ----- BarChart -----*/
    function BarChart(base) {
        this.base = base;

        this.margin = {top: 50, right: 200, bottom: 10, left: 50};
        this.axisMargin = 5;

        this.x = d3.scale.linear();

        this.y = d3.scale.ordinal();
        
        this.xAxis = d3.svg.axis()
            .scale(this.x)
            .orient('top')
            .ticks(3)
            .tickFormat(d3.format('.0%'));

        // chart base
        this.base
            .attr('class', 'chart');

        // x-axis base
        this.xAxisBase = this.base.append('g')
            .attr('class', 'x axis');

        // plot base
        this.plotBase = this.base.append('g')
            .attr('class', 'plot')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        //Lagend
        this.legends = [    {'title': 'Total', 'color': '#FFF4D2'},
                            {'title': 'Placed', 'color': '#FECC88'},
                            {'title': 'Executed', 'color': '#FF8000'}
                                ];
        this.legendbase = this.base.append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(' + (this.margin.right -this.margin.left) + ','+ this.margin.top+')');

        this.legentEnter = this.legendbase
            .selectAll('g.legend')
            .data(this.legends.slice())
            .enter();

        this.legentEnter.append('rect')
            .attr('x', 0)
            .attr('width', 18)
            .attr('height', 18)
            .attr('y',function(d,i){
                return i * 20;
            })
            .style('fill', function (d) {
                return d.color;
            });
        this.legentEnter.append('text')
            .attr('x', 20)
            .attr('y',function(d,i){
                return i * 20 + 9;
            })
            .attr('dy', '.35em')
            .style('text-anchor', 'start')
            .text(function (d) {
                return d.title;
            });
    }

    BarChart.prototype.width = function(newWidth) {
        this.w = newWidth;
        this.plotWidth = this.w - this.margin.left - this.margin.right;
        this.base.attr('width', this.w);
        this.x.range([0, this.plotWidth]);
        return this;
    };

    BarChart.prototype.barHeight = function(newBarHeight) {
        this.bh = newBarHeight;
        return this;
    };
    
    BarChart.prototype.draw = function(data) {
        // Compute y-dimensions based on bar height
        this.plotHeight = this.bh * data.length;
        this.h = this.plotHeight + this.margin.top + this.margin.bottom;
        this.base.attr('height', this.h);
        this.y.rangeBands([0, this.plotHeight], 0.05, 0);
        this.xAxisBase.attr(
            'transform',
            'translate(' + this.margin.left + ',' + (this.margin.top + this.axisMargin) + ')'
        );

        // Set the domains for the scales from the supplied data
        // this.x.domain([0, d3.max(data.map(function(d) { return d.; }))]);
        this.y.domain(data.map(function(d) { return d.id; }));

        // Draw the axes
        // this.xAxis.tickValues(this.x.domain());
        this.xAxisBase.call(this.xAxis);

        

        // Create the 'update selection' by selecting the bars and joining with data.
        // Update selection contains the DOM elements that were successfully bound to data
        // plus references to enter and exit selections.
        var updateSelection = this.plotBase.selectAll('.bar')
            .data(data, function(d) { return d.id; });

        // Remove the exiting bars (this is the 'exit selection')
        updateSelection.exit()
            .remove();

        // Get the 'enter selection'
        // Contains placeholder DOM nodes for each data element that was not bound
        var enterSelection = updateSelection.enter();

        // Add a group for each entering element - these are the entering bars
        var barsEnter = enterSelection
            .append('g')
            .attr('class', 'bar');

        // Add the rectangle for the bar

        barsEnter
            .append('rect')
            .attr('x', 0)
            .attr('width', 0)
            .attr('class', 'total')
            .attr('height', this.y.rangeBand());

        barsEnter
            .append('rect')
            .attr('x', 0)
            .attr('width', 0)
            .attr('class', 'placed')
            .attr('height', this.y.rangeBand());

        barsEnter
            .append('rect')
            .attr('x', 0)
            .attr('width', 0)
            .attr('class', 'executed')
            .attr('height', this.y.rangeBand());

        // Draw the bars
        var self = this;
        updateSelection.select('rect.total')
            .attr('x', 0)
            .attr('y', function(d) { return self.y(d.id); })
            .attr('height', this.y.rangeBand())
            .transition()
            .duration(1000)
            .attr('width', function(d) { return self.x(d.quantity/d.quantity); });
        updateSelection.select('rect.placed')
            .attr('x', 0)
            .attr('y', function(d) { return self.y(d.id); })
            .attr('height', this.y.rangeBand())
            .transition()
            .duration(1000)
            .attr('width', function(d) { return self.x(d.quantityPlaced/d.quantity); });

        updateSelection.select('rect.executed')
            .attr('x', 0)
            .attr('y', function(d) { return self.y(d.id); })
            .attr('height', this.y.rangeBand())
            .transition()
            .duration(1000)
            .attr('width', function(d) { return self.x(d.quantityExecuted/d.quantity); });

        barsEnter
            .append('text')
            .attr('class', 'id')
            .attr('x', -3)
            .attr('y', function(d) { return (self.y(d.id) + self.y.rangeBand() / 3); })
            .attr('dy', '1em')
            .style('text-anchor', 'end')
            .text(function (d) {
                return d.id;
            });
        barsEnter
            .append('text')
            .attr('class', 'quantity')
            .attr('x', this.x(1) + 3)
            .attr('y', function(d) { return (self.y(d.id) + self.y.rangeBand() / 3); })
            .attr('dy', '1em')
            .style('text-anchor', 'start')
            .text(function (d) {
                return d.quantity;
            });
        barsEnter
            .append('rect')
            .attr('class', 'quantitybar total')
            .attr('x', this.x(1))
            .attr('y', function(d) { return (self.y(d.id) + self.y.rangeBand() - 2); })
            .attr('height',2)
            .attr('width',50);
        updateSelection.select('text.quantity')
            .attr('x', this.x(1) + 3)
            .attr('y', function(d) { return (self.y(d.id) + self.y.rangeBand() / 3); });
        updateSelection.select('rect.quantitybar.total')
            .attr('x', this.x(1))
            .attr('y', function(d) { return (self.y(d.id) + self.y.rangeBand() - 2); });

        //Legends
        if(this.plotWidth < 515){
            this.legendbase.attr('transform', 'translate(' + (this.margin.right -this.margin.left) + ',5)');
            this.legendbase.selectAll('g.legend rect')   
                .attr('x', function(d,i){
                    return i * 90 + 9;
                })
                .attr('y', 0);
            this.legendbase.selectAll('g.legend text')   
                .attr('x', function(d,i){
                    return i * 90 + 9;
                })
                .attr('y', 9)
                .style('text-anchor', 'end');
        }
        else{
            this.legendbase.attr('transform', 'translate(' + (this.margin.right -this.margin.left) + ','+ this.margin.top+')');
            this.legendbase.selectAll('g.legend rect')   
                .attr('x', this.x(1))
                .attr('y',function(d,i){
                    return i * 20;
                });
            this.legendbase.selectAll('g.legend text')   
                .attr('x', this.x(1) + 20)
                .attr('y',function(d,i){
                    return i * 20 + 9;
                })
                .style('text-anchor', 'start');
        }

        
    };
})();