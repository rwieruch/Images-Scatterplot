'use strict';

/**
 * @ngdoc directive
 * @name d3OnAngularSeedApp.directive:scatterplot
 * @description
 * # scatterplot
 */
angular.module('d3OnAngularSeedApp')
  .directive('scatterplot', ['d3Service', 'fisheyeService', function(d3Service, fisheyeService) {
    return {
      restrict: 'EA',
      scope: {
      	data: '='
      },
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

        	// move node to front
        	d3.selection.prototype.moveToFront = function() {
					  return this.each(function(){
					    this.parentNode.appendChild(this);
					  });
					};

        	var margin = {top: 60, right: 60, bottom: 60, left: 60},
    				width = 700 - margin.left - margin.right,
    				height = 700 - margin.top - margin.bottom;

  				// setup x 
					var xValue = function(d) { return d.behavior;}, // data -> value
					    xScale = d3.scale.linear().range([0, width]), // value -> display
					    xMap = function(d) { return xScale(xValue(d));}, // data -> display
					    xAxis = d3.svg.axis().scale(xScale).tickFormat("").orient("bottom");

					// setup y
					var yValue = function(d) { return d.results;}, // data -> value
					    yScale = d3.scale.linear().range([height, 0]), // value -> display
					    yMap = function(d) { return yScale(yValue(d));}, // data -> display
					    yAxis = d3.svg.axis().scale(yScale).tickFormat("").orient("left");

					// setup fill color
					var cValue = function(d) { return d.status;},
					    color = d3.scale.category10();

    			var tip = d3.select("body").append("div")
						.attr("class", "tip")
						.style("opacity", 1);

					// root svg element
			    var svg = d3.select(element[0]).append('svg')
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				  // gradients
			    var horizontalGradient = svg.append("svg:defs")
					  .append("svg:linearGradient")
					    .attr("id", "horizontal-gradient")
					    .attr("x1", "0%")
					    .attr("y1", "0%")
					    .attr("x2", "100%")
					    .attr("y2", "0%")
					    .attr("spreadMethod", "pad");

					horizontalGradient.append("svg:stop")
					    .attr("offset", "0%")
					    .attr("stop-color", "#c00")
					    .attr("stop-opacity", 1);

					horizontalGradient.append("svg:stop")
					    .attr("offset", "100%")
					    .attr("stop-color", "#0c0")
					    .attr("stop-opacity", 1);

			    var verticalGradient = svg.append("svg:defs")
					  .append("svg:linearGradient")
					    .attr("id", "vertical-gradient")
					    .attr("x1", "0%")
					    .attr("y1", "0%")
					    .attr("x2", "0%")
					    .attr("y2", "100%")
					    .attr("spreadMethod", "pad");

					verticalGradient.append("svg:stop")
					    .attr("offset", "0%")
					    .attr("stop-color", "#0c0")
					    .attr("stop-opacity", 1);

					verticalGradient.append("svg:stop")
					    .attr("offset", "100%")
					    .attr("stop-color", "#c00")
					    .attr("stop-opacity", 1);

		      scope.data.forEach(function(d) {
				    d.results = +d.results;
				    d.behavior = +d.behavior;

						// prepare images for circles
				    svg.append('svg:pattern')
						    .attr('id', d.id)
						    .attr('x', 0)
						    .attr('y', 0)
						    .attr('width', 9)
						    .attr('height', 39)
					    .append('svg:image')
					    	.attr('id', 'img_' + d.id)
						    .attr('xlink:href', 'images/' + d.img)
						    .attr('x', 0)
						    .attr('y', 0)
						    .attr('width', 40)
						    .attr('height', 40)
							 	.attr('stroke-width','1px')
							 	.attr('stroke','#d8d8d8');
				  });

			    // don't want dots overlapping axis, so add in buffer to data domain
				  xScale.domain([-5, 105]);
				  yScale.domain([-5, 105]);

				  // x-axis
				  var xAxis = svg.append("g")
				      .attr("class", "x axis")
				      .attr("transform", "translate(0," + height + ")")
				      .call(xAxis);

				  // use gradient
				  svg.select(".x.axis").select("path")	
				  		.attr("stroke", "url(#horizontal-gradient)")
				      .attr("fill", "url(#horizontal-gradient)");

			    xAxis.append("text")
			      .attr("class", "label-mid")
			      .attr("x", width/2)
			      .attr("y", 22)
			      .style("text-anchor", "middle")
			      .text("Behavior");	

			    xAxis.append("text")
			      .attr("class", "label-small")
			      .attr("x", width)
			      .attr("y", 22)
			      .style("text-anchor", "end")
			      .text("great");  

			    xAxis.append("text")
			      .attr("class", "label-small")
			      .attr("x", 0)
			      .attr("y", 22)
			      .style("text-anchor", "start")
			      .text("poor");       

				  // y-axis
				  var yAxis = svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis);

				  // use gradient
				  svg.select(".y.axis").select("path")	
				  		.attr("stroke", "url(#vertical-gradient)")
				      .attr("fill", "url(#vertical-gradient)");	

				  yAxis.append("text")
				      .attr("class", "label-mid")
				      .attr("transform", "rotate(-90)")
				      .attr("x", -height/2)
				      .attr("y", -22)
				      .attr("dy", ".71em")
				      .style("text-anchor", "middle")
				      .text("Results");

				  yAxis.append("text")
				      .attr("class", "label-small")
				      .attr("transform", "rotate(-90)")
				      .attr("y", -22)
				      .attr("dy", ".71em")
				      .style("text-anchor", "end")
				      .text("great");

				  yAxis.append("text")
				      .attr("class", "label-small")
				      .attr("transform", "rotate(-90)")
				      .attr("x", -height)
				      .attr("y", -22)
				      .attr("dy", ".71em")
				      .style("text-anchor", "start")
				      .text("poor");

				  // data dots
				  var circles = svg.selectAll(".dot")
				      .data(scope.data)
				    .enter().append("circle")
				      .attr("class", "dot")
				      .style("fill", function(d) { return  "url(#" + d.id + ")";})// "url(#image)")
				      .attr("r", 20)
				      .attr("cx", xMap)
				      .attr("cy", yMap)
				      .style("stroke", function(d) { return color(cValue(d));})
			      .on("mouseover", function(d) {
			      	d3.select('#img_' + d.id).transition()
	              .duration(200)
	              .attr('width', 80)
	              .attr('height', 80);
			        d3.select(this).transition()
	              .duration(200)
	              .attr("r", 40);
	            d3.select(this).moveToFront();

				    	tip.style("opacity", .9);      
	    				// Transformation relative to the page body
		        	var matrix = this.getScreenCTM().translate(+this.getAttribute("cx"),+this.getAttribute("cy"));
            	tip.html(d.info)
            		.style("border-color", color(cValue(d)))
            		.style("left", (window.pageXOffset + matrix.e) + "px")
            		.style("top", (window.pageYOffset + matrix.f + -35) + "px").transition().duration(500).delay(200).ease("bounce").style("top", (window.pageYOffset + matrix.f + -8) + "px");
            })
			      .on("mouseout", function(d) {
			      	d3.select('#img_' + d.id).transition()
	              .duration(200)
	              .attr('width', 40)
	              .attr('height', 40);
			        d3.select(this).transition()
	              .duration(200)
	              .attr("r", 20);

	            tip.style("opacity", 0);
			      });

        });
      }};
  }]);

