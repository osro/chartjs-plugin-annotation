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
      var chartArea = chartInstance.chartArea;

      var xScale = chartInstance.scales[options.xScaleID];
      var yScale = chartInstance.scales[options.yScaleID];

      var left = chartArea.left,
        top = chartArea.top,
        right = chartArea.right,
        bottom = chartArea.bottom;

      model.x = xScale.getPixelForValue(options.xValue);
      model.y = yScale.getPixelForValue(options.yValue);
      model.radius = options.radius;
      model.borderWidth = options.borderWidth;
      model.fillColor = options.fillColor;
      model.borderColor = options.borderColor;
    },
    inRange: function(mouseX, mouseY) {
      var model = this._model;
      var result = this.pointInCircle(mouseX, mouseY, model.x, model.y, model.radius);
      return result;
    },
    pointInCircle: function(x, y, cx, cy, radius) {
      var distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
      return distancesquared <= radius * radius;
    },
    getCenterPoint: function() {
      var model = this._model;
      return {
        x: model.x,
        y: model.y
      };
    },
    draw: function() {
      var model = this._model;
      var ctx = this.chartInstance.chart.ctx;
      var centerX = model.x;
      var centerY = model.y;
      var radius = model.radius;
      var borderWidth = model.borderWidth;
      var fillColor = model.fillColor;
      var borderColor = model.borderColor;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();

      ctx.save();
      ctx.restore();
    }
  });

  return CircleAnnotation;
};
