import {
  ANIMATION_MODULE_TYPE,
  Directive,
  Input,
  NgModule,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵclassProp,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-E7NE7RSN.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-core-no-animation.mjs
var _NzNoAnimationDirective = class _NzNoAnimationDirective {
  constructor() {
    this.animationType = inject(ANIMATION_MODULE_TYPE, {
      optional: true
    });
    this.nzNoAnimation = false;
  }
};
_NzNoAnimationDirective.ɵfac = function NzNoAnimationDirective_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzNoAnimationDirective)();
};
_NzNoAnimationDirective.ɵdir = ɵɵdefineDirective({
  type: _NzNoAnimationDirective,
  selectors: [["", "nzNoAnimation", ""]],
  hostVars: 2,
  hostBindings: function NzNoAnimationDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("nz-animate-disabled", ctx.nzNoAnimation || ctx.animationType === "NoopAnimations");
    }
  },
  inputs: {
    nzNoAnimation: [2, "nzNoAnimation", "nzNoAnimation", booleanAttribute]
  },
  exportAs: ["nzNoAnimation"],
  standalone: true,
  features: [ɵɵInputTransformsFeature]
});
var NzNoAnimationDirective = _NzNoAnimationDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzNoAnimationDirective, [{
    type: Directive,
    args: [{
      selector: "[nzNoAnimation]",
      exportAs: "nzNoAnimation",
      standalone: true,
      host: {
        "[class.nz-animate-disabled]": `nzNoAnimation || animationType === 'NoopAnimations'`
      }
    }]
  }], null, {
    nzNoAnimation: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NzNoAnimationModule = class _NzNoAnimationModule {
};
_NzNoAnimationModule.ɵfac = function NzNoAnimationModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzNoAnimationModule)();
};
_NzNoAnimationModule.ɵmod = ɵɵdefineNgModule({
  type: _NzNoAnimationModule,
  imports: [NzNoAnimationDirective],
  exports: [NzNoAnimationDirective]
});
_NzNoAnimationModule.ɵinj = ɵɵdefineInjector({});
var NzNoAnimationModule = _NzNoAnimationModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzNoAnimationModule, [{
    type: NgModule,
    args: [{
      imports: [NzNoAnimationDirective],
      exports: [NzNoAnimationDirective]
    }]
  }], null, null);
})();

export {
  NzNoAnimationDirective
};
//# sourceMappingURL=chunk-VHVXSLYI.js.map
