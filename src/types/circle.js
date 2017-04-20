module.exports = function(Chart) {
  var helpers = require('../helpers.js')(Chart);



  var CircleAnnotation = Chart.Annotation.Element.extend({
    setDataLimits: function() {
      var model = this._model;
      var options = this.options;
      var chartInstance = this.chartInstance;
      var xScale = chartInstance.scales[options.xScaleID];
      var yScale = chartInstance.scales[options.yScaleID];
      var chartArea = chartInstance.chartArea;

      // Set the data range for this annotation
      model.ranges = {};
    },
    configure: function() {
      var model = this._model;
      var options = this.options;
      var chartInstance = this.chartInstance;

      var xScale = chartInstance.scales[options.xScaleID];
      var yScale = chartInstance.scales[options.yScaleID];

      model.x = xScale.getPixelForValue(options.xValue);
      model.y = yScale.getPixelForValue(options.yValue);
      model.radius = options.radius;
    },
    draw: function() {
      var model = this._model;
      var ctx = this.chartInstance.chart.ctx;
      var centerX = model.x;
      var centerY = model.y;
      var radius = model.radius;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'green';
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';
      ctx.stroke();

      ctx.save();
      ctx.restore();
    }
  });

  return CircleAnnotation;
};
