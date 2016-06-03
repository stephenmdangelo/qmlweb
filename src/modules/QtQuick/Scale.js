registerQmlType({
  module:   'QtQuick',
  name:     'Scale',
  versions: /.*/,
  baseClass: 'QtObject',
  constructor: function QMLScale(meta) {
    callSuper(this, meta);

    createProperty("real", this, "xScale");
    createProperty("real", this, "yScale");

    this.origin = new QObject(this);
    createProperty("real", this.origin, "x");
    createProperty("real", this.origin, "y");

    var self = this;

    function updateOrigin() {
        self.$parent.dom.style.transformOrigin = self.origin.x + "px " + self.origin.y + "px";
        self.$parent.dom.style.MozTransformOrigin = self.origin.x + "px " + self.origin.y + "px";    // Firefox
        self.$parent.dom.style.webkitTransformOrigin = self.origin.x + "px " + self.origin.y + "px"; // Chrome, Safari and Opera
    }
    this.xScaleChanged.connect(this.$parent, this.$parent.$updateTransform);
    this.yScaleChanged.connect(this.$parent, this.$parent.$updateTransform);
    this.origin.xChanged.connect(this, updateOrigin);
    this.origin.yChanged.connect(this, updateOrigin);

    this.xScale = 0;
    this.yScale = 0;
    this.origin.x = 0;
    this.origin.y = 0;

    updateOrigin();
  }
});
