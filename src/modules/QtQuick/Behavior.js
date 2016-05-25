registerQmlType({
  module: 'QtQuick',
  name:   'Behavior',
  versions: /.*/,
  baseClass: 'QtObject',
  constructor: function QMLBehavior(meta) {
    callSuper(this, meta);

    createProperty("Animation", this, "animation");
    this.$defaultProperty = "animation";
    createProperty("bool", this, "enabled", {initialValue: true});

    var self = this;

    function useTransition(animation) {
        var transitionTarget;
        if (meta.object.$on === "scale") {
            transitionTarget = "transform";
        } else
        if (meta.object.$on === "opacity") {
            transitionTarget = "opacity";
        } else {
            return false
        }

        self.$parent.dom.style.transition = transitionTarget + " " + animation.duration + "ms";
        return true;
    }

    this.animationChanged.connect(this, function(newVal) {
        if (useTransition(newVal)) {
            return;
        }
        newVal.target = this.$parent;
        newVal.property = meta.object.$on;
        this.$parent.$properties[meta.object.$on].animation = newVal;
    });
    this.enabledChanged.connect(this, function(newVal) {
        if (useTransition(this.animation)) {
            return;
        }
        this.$parent.$properties[meta.object.$on].animation = newVal ? this.animation : null;
    });
  }
});
