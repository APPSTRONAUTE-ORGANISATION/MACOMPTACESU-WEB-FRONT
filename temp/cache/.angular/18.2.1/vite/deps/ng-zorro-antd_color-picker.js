import {
  NzPopoverDirective
} from "./chunk-NYGBIHYC.js";
import {
  NzInputNumberComponent
} from "./chunk-QQOE6RL7.js";
import {
  NzInputDirective,
  NzInputGroupComponent
} from "./chunk-NIPEFFQY.js";
import "./chunk-V23QYTYI.js";
import {
  NzOptionComponent,
  NzSelectComponent,
  NzSelectModule
} from "./chunk-5YBEKOWN.js";
import "./chunk-6QRKVXG3.js";
import "./chunk-NR7ALWPM.js";
import "./chunk-BDZBVC5R.js";
import "./chunk-YVXF6PCS.js";
import "./chunk-SLEUWCFZ.js";
import "./chunk-UCP6QBHQ.js";
import "./chunk-QKMR4MEI.js";
import "./chunk-3YLFXDIK.js";
import "./chunk-VHVXSLYI.js";
import "./chunk-WP7ODIQM.js";
import "./chunk-BFXMQ4QR.js";
import "./chunk-YQ6AXWF6.js";
import "./chunk-DJVUKSGR.js";
import "./chunk-SUOSFYYC.js";
import "./chunk-YTEYNRVT.js";
import {
  TinyColor
} from "./chunk-RAYHCNL2.js";
import {
  isNonEmptyString,
  isTemplateRef
} from "./chunk-C2DAABKN.js";
import "./chunk-MMNUBKF4.js";
import "./chunk-MVWYHCZ2.js";
import "./chunk-YE3Q3QYQ.js";
import "./chunk-VN4KSR5M.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule
} from "./chunk-X7Y33CQ3.js";
import "./chunk-WRHOHE34.js";
import "./chunk-BCVVR5GH.js";
import {
  DOCUMENT,
  NgClass,
  NgTemplateOutlet
} from "./chunk-Q25YKKCU.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
  ViewChild,
  booleanAttribute,
  forwardRef,
  inject,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-E7NE7RSN.js";
import "./chunk-DIY53FAD.js";
import "./chunk-3MOREFHL.js";
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil
} from "./chunk-XKVMYM44.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// node_modules/ng-zorro-antd/fesm2022/ng-zorro-antd-color-picker.mjs
var _c0 = ["*"];
var _c1 = ["slider"];
var _c2 = ["transform"];
function NgAntdColorPickerComponent_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function NgAntdColorPickerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgAntdColorPickerComponent_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.panelRenderHeader);
  }
}
function NgAntdColorPickerComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "color-slider", 8);
    ɵɵlistener("nzOnChange", function NgAntdColorPickerComponent_Conditional_6_Template_color_slider_nzOnChange_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.handleChange($event, "alpha"));
    })("nzOnChangeComplete", function NgAntdColorPickerComponent_Conditional_6_Template_color_slider_nzOnChangeComplete_0_listener($event) {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.nzOnChangeComplete.emit($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("color", ctx_r0.colorValue)("value", ctx_r0.toRgbString)("gradientColors", ctx_r0.gradientColors)("disabled", ctx_r0.disabled);
  }
}
function NgAntdColorPickerComponent_Conditional_8_ng_template_0_Template(rf, ctx) {
}
function NgAntdColorPickerComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NgAntdColorPickerComponent_Conditional_8_ng_template_0_Template, 0, 0, "ng-template", 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.panelRenderFooter);
  }
}
function NzColorFormatComponent_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 7)(1, "nz-input-group", 11);
    ɵɵelement(2, "input", 12);
    ɵɵelementEnd()();
  }
}
function NzColorFormatComponent_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8)(1, "div", 13);
    ɵɵelement(2, "nz-input-number", 14);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 13);
    ɵɵelement(4, "nz-input-number", 15);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 13);
    ɵɵelement(6, "nz-input-number", 16);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(2);
    ɵɵproperty("nzMin", 0)("nzMax", 360)("nzStep", 1)("nzPrecision", 0);
    ɵɵadvance(2);
    ɵɵproperty("nzMin", 0)("nzMax", 100)("nzStep", 1)("nzFormatter", ctx_r0.formatterPercent)("nzParser", ctx_r0.parserPercent);
    ɵɵadvance(2);
    ɵɵproperty("nzMin", 0)("nzMax", 100)("nzStep", 1)("nzFormatter", ctx_r0.formatterPercent)("nzParser", ctx_r0.parserPercent);
  }
}
function NzColorFormatComponent_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 9)(1, "div", 17);
    ɵɵelement(2, "nz-input-number", 18);
    ɵɵelementEnd();
    ɵɵelementStart(3, "div", 17);
    ɵɵelement(4, "nz-input-number", 19);
    ɵɵelementEnd();
    ɵɵelementStart(5, "div", 17);
    ɵɵelement(6, "nz-input-number", 20);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    ɵɵadvance(2);
    ɵɵproperty("nzMin", 0)("nzMax", 255)("nzStep", 1);
    ɵɵadvance(2);
    ɵɵproperty("nzMin", 0)("nzMax", 255)("nzStep", 1);
    ɵɵadvance(2);
    ɵɵproperty("nzMin", 0)("nzMax", 255)("nzStep", 1);
  }
}
function NzColorFormatComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 10);
    ɵɵelement(1, "nz-input-number", 21);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("nzMin", 0)("nzMax", 100)("nzStep", 1)("nzFormatter", ctx_r0.formatterPercent)("nzParser", ctx_r0.parserPercent);
  }
}
function NzColorPickerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "nz-color-block", 4);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("nzColor", ctx_r1.blockColor)("nzSize", ctx_r1.nzSize);
  }
}
function NzColorPickerComponent_Conditional_2_ng_template_0_Template(rf, ctx) {
}
function NzColorPickerComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzColorPickerComponent_Conditional_2_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nzFlipFlop);
  }
}
function NzColorPickerComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.showText, " ");
  }
}
function NzColorPickerComponent_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ng-antd-color-picker", 7);
    ɵɵlistener("nzOnChange", function NzColorPickerComponent_ng_template_4_Template_ng_antd_color_picker_nzOnChange_0_listener($event) {
      ɵɵrestoreView(_r3);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.colorChange($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const nzPanelRenderHeader_r4 = ɵɵreference(7);
    const nzPanelRenderFooter_r5 = ɵɵreference(9);
    ɵɵproperty("value", ctx_r1.nzValue)("defaultValue", ctx_r1.nzDefaultValue)("disabled", ctx_r1.nzDisabled)("panelRenderHeader", nzPanelRenderHeader_r4)("panelRenderFooter", nzPanelRenderFooter_r5)("disabledAlpha", ctx_r1.nzDisabledAlpha);
  }
}
function NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 12);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r1.nzTitle);
  }
}
function NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 10);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(3);
    ɵɵproperty("innerHTML", ctx_r1.nzTitle, ɵɵsanitizeHtml);
  }
}
function NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 13);
    ɵɵlistener("click", function NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_4_Template_div_click_0_listener() {
      ɵɵrestoreView(_r6);
      const ctx_r1 = ɵɵnextContext(3);
      return ɵɵresetView(ctx_r1.clearColorHandle());
    });
    ɵɵelementEnd();
  }
}
function NzColorPickerComponent_ng_template_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8)(1, "div", 9);
    ɵɵtemplate(2, NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_2_Template, 1, 1, "ng-container")(3, NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_3_Template, 1, 1, "span", 10);
    ɵɵelementEnd();
    ɵɵtemplate(4, NzColorPickerComponent_ng_template_6_Conditional_0_Conditional_4_Template, 1, 0, "div", 11);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵadvance(2);
    ɵɵconditional(ctx_r1.isNzTitleTemplateRef ? 2 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.isNzTitleNonEmptyString ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r1.nzAllowClear ? 4 : -1);
  }
}
function NzColorPickerComponent_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, NzColorPickerComponent_ng_template_6_Conditional_0_Template, 5, 3, "div", 8);
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵconditional(ctx_r1.nzTitle || ctx_r1.nzAllowClear ? 0 : -1);
  }
}
function NzColorPickerComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "nz-color-format", 14);
    ɵɵlistener("formatChange", function NzColorPickerComponent_ng_template_8_Template_nz_color_format_formatChange_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.formatChange($event));
    })("nzOnFormatChange", function NzColorPickerComponent_ng_template_8_Template_nz_color_format_nzOnFormatChange_0_listener($event) {
      ɵɵrestoreView(_r7);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.nzOnFormatChange.emit($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("colorValue", ctx_r1.blockColor)("clearColor", ctx_r1.clearColor)("format", ctx_r1.nzFormat)("nzDisabledAlpha", ctx_r1.nzDisabledAlpha);
  }
}
var getRoundNumber = (value) => Math.round(Number(value || 0));
var convertHsb2Hsv = (color) => {
  if (color && typeof color === "object" && "h" in color && "b" in color) {
    const _a = color, {
      b
    } = _a, resets = __objRest(_a, [
      "b"
    ]);
    return __spreadProps(__spreadValues({}, resets), {
      v: b
    });
  }
  if (typeof color === "string" && /hsb/.test(color)) {
    return color.replace(/hsb/, "hsv");
  }
  return color;
};
var Color = class extends TinyColor {
  constructor(color) {
    super(convertHsb2Hsv(color));
  }
  toHsbString() {
    const hsb = this.toHsb();
    const saturation = getRoundNumber(hsb.s * 100);
    const lightness = getRoundNumber(hsb.b * 100);
    const hue = getRoundNumber(hsb.h);
    const alpha = hsb.a;
    const hsbString = `hsb(${hue}, ${saturation}%, ${lightness}%)`;
    const hsbaString = `hsba(${hue}, ${saturation}%, ${lightness}%, ${alpha.toFixed(alpha === 0 ? 0 : 2)})`;
    return alpha === 1 ? hsbString : hsbaString;
  }
  toHsb() {
    let hsv = this.toHsv();
    if (typeof this.originalInput === "object" && this.originalInput) {
      if ("h" in this.originalInput) {
        hsv = this.originalInput;
      }
    }
    const _a = hsv, {
      v
    } = _a, resets = __objRest(_a, [
      "v"
    ]);
    return __spreadProps(__spreadValues({}, resets), {
      b: hsv.v
    });
  }
};
var generateColor = (color) => {
  if (color instanceof Color) {
    return color;
  }
  return new Color(color);
};
var defaultColor = generateColor("#1677ff");
function calculateColor(offset, containerRef, targetRef, color, type) {
  const {
    width,
    height
  } = containerRef.getBoundingClientRect();
  const {
    width: targetWidth,
    height: targetHeight
  } = targetRef.getBoundingClientRect();
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;
  const saturation = (offset.x + centerOffsetX) / width;
  const bright = 1 - (offset.y + centerOffsetY) / height;
  const hsb = color?.toHsb() || {
    a: 0,
    h: 0,
    s: 0,
    b: 0
  };
  const alphaOffset = saturation;
  const hueOffset = (offset.x + centerOffsetX) / width * 360;
  if (type) {
    switch (type) {
      case "hue":
        return generateColor(__spreadProps(__spreadValues({}, hsb), {
          h: hueOffset <= 0 ? 0 : hueOffset
        }));
      case "alpha":
        return generateColor(__spreadProps(__spreadValues({}, hsb), {
          a: alphaOffset <= 0 ? 0 : alphaOffset
        }));
    }
  }
  return generateColor({
    h: hsb.h,
    s: saturation <= 0 ? 0 : saturation,
    b: bright >= 1 ? 1 : bright,
    a: hsb.a
  });
}
var calculateOffset = (containerRef, targetRef, color, type) => {
  const {
    width,
    height
  } = containerRef.getBoundingClientRect();
  const {
    width: targetWidth,
    height: targetHeight
  } = targetRef.getBoundingClientRect();
  const centerOffsetX = targetWidth / 2;
  const centerOffsetY = targetHeight / 2;
  const hsb = color?.toHsb() || {
    a: 0,
    h: 0,
    s: 0,
    b: 0
  };
  if (targetWidth === 0 && targetHeight === 0 || targetWidth !== targetHeight) {
    return null;
  }
  if (type) {
    switch (type) {
      case "hue":
        return {
          x: hsb.h / 360 * width - centerOffsetX,
          y: -centerOffsetY / 3
        };
      case "alpha":
        return {
          x: hsb.a * width - centerOffsetX,
          y: -centerOffsetY / 3
        };
    }
  }
  return {
    x: hsb.s * width - centerOffsetX,
    y: (1 - hsb.b) * height - centerOffsetY
  };
};
var _NgAntdColorBlockComponent = class _NgAntdColorBlockComponent {
  constructor() {
    this.color = defaultColor.toHsbString();
    this.nzOnClick = new EventEmitter();
  }
};
_NgAntdColorBlockComponent.ɵfac = function NgAntdColorBlockComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgAntdColorBlockComponent)();
};
_NgAntdColorBlockComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgAntdColorBlockComponent,
  selectors: [["ng-antd-color-block"]],
  inputs: {
    color: "color"
  },
  outputs: {
    nzOnClick: "nzOnClick"
  },
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 2,
  vars: 2,
  consts: [[1, "ant-color-picker-color-block", 3, "click"], [1, "ant-color-picker-color-block-inner"]],
  template: function NgAntdColorBlockComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵlistener("click", function NgAntdColorBlockComponent_Template_div_click_0_listener() {
        return ctx.nzOnClick.emit(true);
      });
      ɵɵelement(1, "div", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵstyleProp("background-color", ctx.color);
    }
  },
  encapsulation: 2
});
var NgAntdColorBlockComponent = _NgAntdColorBlockComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgAntdColorBlockComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "ng-antd-color-block",
      standalone: true,
      template: `
    <div class="ant-color-picker-color-block" (click)="nzOnClick.emit(true)">
      <div class="ant-color-picker-color-block-inner" [style.background-color]="color"></div>
    </div>
  `
    }]
  }], null, {
    color: [{
      type: Input
    }],
    nzOnClick: [{
      type: Output
    }]
  });
})();
var _HandlerComponent = class _HandlerComponent {
  constructor() {
    this.color = null;
    this.size = "default";
  }
};
_HandlerComponent.ɵfac = function HandlerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _HandlerComponent)();
};
_HandlerComponent.ɵcmp = ɵɵdefineComponent({
  type: _HandlerComponent,
  selectors: [["color-handler"]],
  inputs: {
    color: "color",
    size: "size"
  },
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 1,
  vars: 4,
  consts: [[1, "ant-color-picker-handler"]],
  template: function HandlerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelement(0, "div", 0);
    }
    if (rf & 2) {
      ɵɵstyleProp("background-color", ctx.color);
      ɵɵclassProp("ant-color-picker-handler-sm", ctx.size === "small");
    }
  },
  encapsulation: 2
});
var HandlerComponent = _HandlerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HandlerComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "color-handler",
      standalone: true,
      template: `
    <div
      class="ant-color-picker-handler"
      [style.background-color]="color"
      [class.ant-color-picker-handler-sm]="size === 'small'"
    ></div>
  `
    }]
  }], null, {
    color: [{
      type: Input
    }],
    size: [{
      type: Input
    }]
  });
})();
var _PaletteComponent = class _PaletteComponent {
};
_PaletteComponent.ɵfac = function PaletteComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PaletteComponent)();
};
_PaletteComponent.ɵcmp = ɵɵdefineComponent({
  type: _PaletteComponent,
  selectors: [["color-palette"]],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 0,
  consts: [[1, "ant-color-picker-palette", 2, "position", "relative"]],
  template: function PaletteComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0);
      ɵɵprojection(1);
      ɵɵelementEnd();
    }
  },
  encapsulation: 2
});
var PaletteComponent = _PaletteComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaletteComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "color-palette",
      standalone: true,
      template: `
    <div class="ant-color-picker-palette" style="position: relative">
      <ng-content></ng-content>
    </div>
  `
    }]
  }], null, null);
})();
function getPosition$1(e) {
  const obj = "touches" in e ? e.touches[0] : e;
  const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
  const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  return {
    pageX: obj.pageX - scrollXOffset,
    pageY: obj.pageY - scrollYOffset
  };
}
var _PickerComponent = class _PickerComponent {
  toRgbString() {
    return this.color?.toRgbString();
  }
  toHsb() {
    return `hsl(${this.color?.toHsb().h},100%, 50%)`;
  }
  constructor(cdr) {
    this.cdr = cdr;
    this.color = null;
    this.nzOnChange = new EventEmitter();
    this.nzOnChangeComplete = new EventEmitter();
    this.disabled = false;
    this.offsetValue = {
      x: 0,
      y: 0
    };
    this.dragRef = false;
    this.document = inject(DOCUMENT);
    this.mouseMoveRef = () => null;
    this.mouseUpRef = () => null;
    this.updateOffset = (e, direction = "y") => {
      const {
        pageX,
        pageY
      } = getPosition$1(e);
      const {
        x: rectX,
        y: rectY,
        width,
        height
      } = this.containerRef?.nativeElement?.getBoundingClientRect() || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      const {
        width: targetWidth,
        height: targetHeight
      } = this.transformRef?.nativeElement?.getBoundingClientRect() || {
        width: 0,
        height: 0
      };
      const centerOffsetX = targetWidth / 2;
      const centerOffsetY = targetHeight / 2;
      const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
      const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;
      const calcOffset = {
        x: offsetX,
        y: direction === "x" ? this.offsetValue.y : offsetY
      };
      if (targetWidth === 0 && targetHeight === 0 || targetWidth !== targetHeight) {
        return;
      }
      this.offsetValue = calcOffset;
      this.nzOnChange.emit(calculateColor(calcOffset, this.containerRef.nativeElement, this.transformRef.nativeElement, this.color));
      this.cdr.detectChanges();
    };
    this.onDragMove = (e) => {
      e.preventDefault();
      this.updateOffset(e);
    };
    this.onDragStop = (e) => {
      e.preventDefault();
      this.dragRef = false;
      this.document.removeEventListener("mousemove", this.onDragMove);
      this.document.removeEventListener("mouseup", this.mouseUpRef);
      this.document.removeEventListener("touchmove", this.mouseMoveRef);
      this.document.removeEventListener("touchend", this.mouseUpRef);
      this.mouseMoveRef = () => null;
      this.mouseUpRef = () => null;
      this.nzOnChangeComplete?.emit();
    };
    this.onDragStart = (e) => {
      if (this.disabled) {
        return;
      }
      this.updateOffset(e);
      this.dragRef = true;
      this.document.addEventListener("mousemove", this.onDragMove);
      this.document.addEventListener("mouseup", this.onDragStop);
      this.document.addEventListener("touchmove", this.onDragMove);
      this.document.addEventListener("touchend", this.onDragStop);
      this.mouseMoveRef = this.onDragMove;
      this.mouseUpRef = this.onDragStop;
      this.cdr.markForCheck();
    };
  }
  ngOnInit() {
    this.document.removeEventListener("mousemove", this.mouseMoveRef);
    this.document.removeEventListener("mouseup", this.mouseUpRef);
    this.document.removeEventListener("touchmove", this.mouseMoveRef);
    this.document.removeEventListener("touchend", this.mouseUpRef);
    this.mouseMoveRef = () => null;
    this.mouseUpRef = () => null;
  }
  ngOnChanges(changes) {
    const {
      color
    } = changes;
    if (color) {
      if (!this.dragRef && this.containerRef && this.transformRef) {
        const calcOffset = calculateOffset(this.containerRef.nativeElement, this.transformRef.nativeElement, this.color);
        if (calcOffset) {
          this.offsetValue = calcOffset;
          this.cdr.detectChanges();
        }
      }
    }
  }
  ngAfterViewInit() {
    if (!this.dragRef && this.containerRef && this.transformRef) {
      const calcOffset = calculateOffset(this.containerRef.nativeElement, this.transformRef.nativeElement, this.color);
      if (calcOffset) {
        this.offsetValue = calcOffset;
        this.cdr.detectChanges();
      }
    }
  }
  dragStartHandle(e) {
    this.onDragStart(e);
  }
};
_PickerComponent.ɵfac = function PickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _PickerComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
};
_PickerComponent.ɵcmp = ɵɵdefineComponent({
  type: _PickerComponent,
  selectors: [["color-picker"]],
  viewQuery: function PickerComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 5);
      ɵɵviewQuery(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerRef = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.transformRef = _t.first);
    }
  },
  inputs: {
    color: "color",
    disabled: [2, "disabled", "disabled", booleanAttribute]
  },
  outputs: {
    nzOnChange: "nzOnChange",
    nzOnChangeComplete: "nzOnChangeComplete"
  },
  standalone: true,
  features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 7,
  vars: 7,
  consts: [["slider", ""], ["transform", ""], [1, "ant-color-picker-select", 3, "mousedown", "touchstart"], [2, "position", "absolute", "z-index", "1"], [3, "color"], [1, "ant-color-picker-saturation", 2, "background-image", "linear-gradient(0deg, #000, transparent),\n          linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"]],
  template: function PickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 2, 0);
      ɵɵlistener("mousedown", function PickerComponent_Template_div_mousedown_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dragStartHandle($event));
      })("touchstart", function PickerComponent_Template_div_touchstart_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dragStartHandle($event));
      });
      ɵɵelementStart(2, "color-palette")(3, "div", 3, 1);
      ɵɵelement(5, "color-handler", 4);
      ɵɵelementEnd();
      ɵɵelement(6, "div", 5);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵadvance(3);
      ɵɵstyleProp("left", ctx.offsetValue.x + "px")("top", ctx.offsetValue.y + "px");
      ɵɵadvance(2);
      ɵɵproperty("color", ctx.toRgbString());
      ɵɵadvance();
      ɵɵstyleProp("background-color", ctx.toHsb());
    }
  },
  dependencies: [HandlerComponent, PaletteComponent],
  encapsulation: 2
});
var PickerComponent = _PickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PickerComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "color-picker",
      standalone: true,
      imports: [HandlerComponent, PaletteComponent],
      template: `
    <div
      #slider
      class="ant-color-picker-select"
      (mousedown)="dragStartHandle($event)"
      (touchstart)="dragStartHandle($event)"
    >
      <color-palette>
        <div
          #transform
          style="position: absolute; z-index: 1;"
          [style.left]="offsetValue.x + 'px'"
          [style.top]="offsetValue.y + 'px'"
        >
          <color-handler [color]="toRgbString()" />
        </div>
        <div
          class="ant-color-picker-saturation"
          style="
        background-image: linear-gradient(0deg, #000, transparent),
          linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
      "
          [style.background-color]="toHsb()"
        ></div>
      </color-palette>
    </div>
  `
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    containerRef: [{
      type: ViewChild,
      args: ["slider", {
        static: false
      }]
    }],
    transformRef: [{
      type: ViewChild,
      args: ["transform", {
        static: false
      }]
    }],
    color: [{
      type: Input
    }],
    nzOnChange: [{
      type: Output
    }],
    nzOnChangeComplete: [{
      type: Output
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _GradientComponent = class _GradientComponent {
  constructor() {
    this.colors = [];
    this.direction = "to right";
    this.type = "hue";
    this.gradientColors = "";
  }
  ngOnInit() {
    this.useMemo();
  }
  ngOnChanges(changes) {
    const {
      colors,
      type
    } = changes;
    if (colors || type) {
      this.useMemo();
    }
  }
  useMemo() {
    this.gradientColors = this.colors.map((color, idx) => {
      const result = generateColor(color);
      if (this.type === "alpha" && idx === this.colors.length - 1) {
        result.setAlpha(1);
      }
      return result.toRgbString();
    }).join(",");
  }
};
_GradientComponent.ɵfac = function GradientComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _GradientComponent)();
};
_GradientComponent.ɵcmp = ɵɵdefineComponent({
  type: _GradientComponent,
  selectors: [["color-gradient"]],
  inputs: {
    colors: "colors",
    direction: "direction",
    type: "type"
  },
  standalone: true,
  features: [ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  ngContentSelectors: _c0,
  decls: 2,
  vars: 2,
  consts: [[1, "ant-color-picker-gradient", 2, "position", "absolute", "inset", "0"]],
  template: function GradientComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵelementStart(0, "div", 0);
      ɵɵprojection(1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵstyleProp("background", "linear-gradient(" + ctx.direction + ", " + ctx.gradientColors + ")");
    }
  },
  encapsulation: 2
});
var GradientComponent = _GradientComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GradientComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "color-gradient",
      standalone: true,
      template: `
    <div
      class="ant-color-picker-gradient"
      style="position: absolute; inset: 0"
      [style.background]="'linear-gradient(' + direction + ', ' + gradientColors + ')'"
    >
      <ng-content></ng-content>
    </div>
  `
    }]
  }], () => [], {
    colors: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
function getPosition(e) {
  const obj = "touches" in e ? e.touches[0] : e;
  const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft || window.pageXOffset;
  const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  return {
    pageX: obj.pageX - scrollXOffset,
    pageY: obj.pageY - scrollYOffset
  };
}
var _SliderComponent = class _SliderComponent {
  constructor(cdr) {
    this.cdr = cdr;
    this.gradientColors = [];
    this.direction = "to right";
    this.type = "hue";
    this.color = null;
    this.value = null;
    this.disabled = false;
    this.nzOnChange = new EventEmitter();
    this.nzOnChangeComplete = new EventEmitter();
    this.offsetValue = {
      x: 0,
      y: 0
    };
    this.dragRef = false;
    this.mouseMoveRef = () => null;
    this.mouseUpRef = () => null;
    this.document = inject(DOCUMENT);
    this.updateOffset = (e, direction = "x") => {
      const {
        pageX,
        pageY
      } = getPosition(e);
      const {
        x: rectX,
        y: rectY,
        width,
        height
      } = this.containerRef?.nativeElement?.getBoundingClientRect() || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      const {
        width: targetWidth,
        height: targetHeight
      } = this.transformRef?.nativeElement?.getBoundingClientRect() || {
        width: 0,
        height: 0
      };
      const centerOffsetX = targetWidth / 2;
      const centerOffsetY = targetHeight / 2;
      const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
      const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;
      const calcOffset = {
        x: offsetX,
        y: direction === "x" ? this.offsetValue.y : offsetY
      };
      if (targetWidth === 0 && targetHeight === 0 || targetWidth !== targetHeight) {
        return;
      }
      this.offsetValue = calcOffset;
      this.nzOnChange.emit(calculateColor(calcOffset, this.containerRef.nativeElement, this.transformRef.nativeElement, this.color, this.type));
      this.cdr.detectChanges();
    };
    this.onDragMove = (e) => {
      e.preventDefault();
      this.updateOffset(e);
    };
    this.onDragStop = (e) => {
      e.preventDefault();
      this.dragRef = false;
      this.document.removeEventListener("mousemove", this.onDragMove);
      this.document.removeEventListener("mouseup", this.mouseUpRef);
      this.document.removeEventListener("touchmove", this.mouseMoveRef);
      this.document.removeEventListener("touchend", this.mouseUpRef);
      this.mouseMoveRef = () => null;
      this.mouseUpRef = () => null;
      this.nzOnChangeComplete?.emit(this.type);
    };
    this.onDragStart = (e) => {
      if (this.disabled) {
        return;
      }
      this.updateOffset(e);
      this.dragRef = true;
      this.document.addEventListener("mousemove", this.onDragMove);
      this.document.addEventListener("mouseup", this.onDragStop);
      this.document.addEventListener("touchmove", this.onDragMove);
      this.document.addEventListener("touchend", this.onDragStop);
      this.mouseMoveRef = this.onDragMove;
      this.mouseUpRef = this.onDragStop;
      this.cdr.markForCheck();
    };
  }
  ngOnInit() {
    this.document.removeEventListener("mousemove", this.mouseMoveRef);
    this.document.removeEventListener("mouseup", this.mouseUpRef);
    this.document.removeEventListener("touchmove", this.mouseMoveRef);
    this.document.removeEventListener("touchend", this.mouseUpRef);
    this.mouseMoveRef = () => null;
    this.mouseUpRef = () => null;
  }
  ngOnChanges(changes) {
    const {
      color
    } = changes;
    if (color) {
      if (!this.dragRef && this.containerRef && this.transformRef) {
        const calcOffset = calculateOffset(this.containerRef.nativeElement, this.transformRef.nativeElement, this.color, this.type);
        if (calcOffset) {
          this.offsetValue = calcOffset;
          this.cdr.detectChanges();
        }
      }
    }
  }
  ngAfterViewInit() {
    if (!this.dragRef && this.containerRef && this.transformRef) {
      const calcOffset = calculateOffset(this.containerRef.nativeElement, this.transformRef.nativeElement, this.color, this.type);
      if (calcOffset) {
        this.offsetValue = calcOffset;
        this.cdr.detectChanges();
      }
    }
  }
  dragStartHandle(e) {
    this.onDragStart(e);
  }
};
_SliderComponent.ɵfac = function SliderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _SliderComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
};
_SliderComponent.ɵcmp = ɵɵdefineComponent({
  type: _SliderComponent,
  selectors: [["color-slider"]],
  viewQuery: function SliderComponent_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c1, 5);
      ɵɵviewQuery(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.containerRef = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.transformRef = _t.first);
    }
  },
  inputs: {
    gradientColors: "gradientColors",
    direction: "direction",
    type: "type",
    color: "color",
    value: "value",
    disabled: [2, "disabled", "disabled", booleanAttribute]
  },
  outputs: {
    nzOnChange: "nzOnChange",
    nzOnChangeComplete: "nzOnChangeComplete"
  },
  standalone: true,
  features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 7,
  vars: 9,
  consts: [["slider", ""], ["transform", ""], [1, "ant-color-picker-slider", 3, "mousedown", "touchstart", "ngClass"], [2, "position", "absolute", "z-index", "1"], ["size", "small", 3, "color"], [3, "colors", "direction", "type"]],
  template: function SliderComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 2, 0);
      ɵɵlistener("mousedown", function SliderComponent_Template_div_mousedown_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dragStartHandle($event));
      })("touchstart", function SliderComponent_Template_div_touchstart_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.dragStartHandle($event));
      });
      ɵɵelementStart(2, "color-palette")(3, "div", 3, 1);
      ɵɵelement(5, "color-handler", 4);
      ɵɵelementEnd();
      ɵɵelement(6, "color-gradient", 5);
      ɵɵelementEnd()();
    }
    if (rf & 2) {
      ɵɵproperty("ngClass", "ant-color-picker-slider-" + ctx.type);
      ɵɵadvance(3);
      ɵɵstyleProp("left", ctx.offsetValue.x + "px")("top", ctx.offsetValue.y + "px");
      ɵɵadvance(2);
      ɵɵproperty("color", ctx.value);
      ɵɵadvance();
      ɵɵproperty("colors", ctx.gradientColors)("direction", ctx.direction)("type", ctx.type);
    }
  },
  dependencies: [PaletteComponent, GradientComponent, HandlerComponent, NgClass],
  styles: ["[_nghost-%COMP%]{display:block;width:100%}"]
});
var SliderComponent = _SliderComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SliderComponent, [{
    type: Component,
    args: [{
      selector: "color-slider",
      standalone: true,
      imports: [PaletteComponent, GradientComponent, HandlerComponent, NgClass],
      template: `
    <div
      #slider
      (mousedown)="dragStartHandle($event)"
      (touchstart)="dragStartHandle($event)"
      class="ant-color-picker-slider"
      [ngClass]="'ant-color-picker-slider-' + type"
    >
      <color-palette>
        <div
          #transform
          style="position: absolute; z-index: 1;"
          [style.left]="offsetValue.x + 'px'"
          [style.top]="offsetValue.y + 'px'"
        >
          <color-handler size="small" [color]="value"></color-handler>
        </div>
        <color-gradient [colors]="gradientColors" [direction]="direction" [type]="type"></color-gradient>
      </color-palette>
    </div>
  `,
      styles: [":host{display:block;width:100%}\n"]
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    containerRef: [{
      type: ViewChild,
      args: ["slider", {
        static: false
      }]
    }],
    transformRef: [{
      type: ViewChild,
      args: ["transform", {
        static: false
      }]
    }],
    gradientColors: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOnChange: [{
      type: Output
    }],
    nzOnChangeComplete: [{
      type: Output
    }]
  });
})();
var _NgAntdColorPickerComponent = class _NgAntdColorPickerComponent {
  constructor(cdr) {
    this.cdr = cdr;
    this.nzOnChange = new EventEmitter();
    this.nzOnChangeComplete = new EventEmitter();
    this.panelRenderHeader = null;
    this.panelRenderFooter = null;
    this.disabledAlpha = false;
    this.disabled = false;
    this.colorValue = null;
    this.alphaColor = "";
    this.hueColor = ["rgb(255, 0, 0) 0%", "rgb(255, 255, 0) 17%", "rgb(0, 255, 0) 33%", "rgb(0, 255, 255) 50%", "rgb(0, 0, 255) 67%", "rgb(255, 0, 255) 83%", "rgb(255, 0, 0) 100%"];
    this.gradientColors = ["rgba(255, 0, 4, 0) 0%", this.alphaColor];
    this.toRgbString = this.colorValue?.toRgbString() || "";
  }
  ngOnInit() {
    this.setColorValue(this.value);
  }
  ngOnChanges(changes) {
    const {
      value,
      defaultValue
    } = changes;
    if (value || defaultValue) {
      this.setColorValue(this.value);
    }
  }
  hasValue(value) {
    return !!value;
  }
  setColorValue(color) {
    let mergeState;
    if (this.hasValue(color)) {
      mergeState = color;
    } else if (this.hasValue(this.defaultValue)) {
      mergeState = this.defaultValue;
    } else {
      mergeState = defaultColor;
    }
    this.colorValue = generateColor(mergeState);
    this.setAlphaColor(this.colorValue);
    this.toRgbString = this.colorValue?.toRgbString() || "";
    this.cdr.detectChanges();
  }
  setAlphaColor(colorValue) {
    const rgb = generateColor(colorValue.toRgbString());
    this.alphaColor = rgb.toRgbString();
    this.gradientColors = ["rgba(255, 0, 4, 0) 0%", this.alphaColor];
    this.cdr.markForCheck();
  }
  handleChange(color, type) {
    this.setColorValue(color);
    this.nzOnChange.emit({
      color,
      type
    });
  }
};
_NgAntdColorPickerComponent.ɵfac = function NgAntdColorPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgAntdColorPickerComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
};
_NgAntdColorPickerComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgAntdColorPickerComponent,
  selectors: [["ng-antd-color-picker"]],
  inputs: {
    value: "value",
    defaultValue: "defaultValue",
    panelRenderHeader: "panelRenderHeader",
    panelRenderFooter: "panelRenderFooter",
    disabledAlpha: [2, "disabledAlpha", "disabledAlpha", booleanAttribute],
    disabled: [2, "disabled", "disabled", booleanAttribute]
  },
  outputs: {
    nzOnChange: "nzOnChange",
    nzOnChangeComplete: "nzOnChangeComplete"
  },
  standalone: true,
  features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 9,
  vars: 14,
  consts: [[1, "ant-color-picker-panel"], [3, "ngTemplateOutlet"], [3, "nzOnChange", "nzOnChangeComplete", "color", "disabled"], [1, "ant-color-picker-slider-container"], [1, "ant-color-picker-slider-group"], [3, "nzOnChange", "nzOnChangeComplete", "color", "value", "gradientColors", "disabled"], ["type", "alpha", 3, "color", "value", "gradientColors", "disabled"], [3, "color"], ["type", "alpha", 3, "nzOnChange", "nzOnChangeComplete", "color", "value", "gradientColors", "disabled"]],
  template: function NgAntdColorPickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0);
      ɵɵtemplate(1, NgAntdColorPickerComponent_Conditional_1_Template, 1, 1, null, 1);
      ɵɵelementStart(2, "color-picker", 2);
      ɵɵlistener("nzOnChange", function NgAntdColorPickerComponent_Template_color_picker_nzOnChange_2_listener($event) {
        return ctx.handleChange($event);
      })("nzOnChangeComplete", function NgAntdColorPickerComponent_Template_color_picker_nzOnChangeComplete_2_listener($event) {
        return ctx.nzOnChangeComplete.emit($event);
      });
      ɵɵelementEnd();
      ɵɵelementStart(3, "div", 3)(4, "div", 4)(5, "color-slider", 5);
      ɵɵlistener("nzOnChange", function NgAntdColorPickerComponent_Template_color_slider_nzOnChange_5_listener($event) {
        return ctx.handleChange($event, "hue");
      })("nzOnChangeComplete", function NgAntdColorPickerComponent_Template_color_slider_nzOnChangeComplete_5_listener($event) {
        return ctx.nzOnChangeComplete.emit($event);
      });
      ɵɵelementEnd();
      ɵɵtemplate(6, NgAntdColorPickerComponent_Conditional_6_Template, 1, 4, "color-slider", 6);
      ɵɵelementEnd();
      ɵɵelement(7, "ng-antd-color-block", 7);
      ɵɵelementEnd();
      ɵɵtemplate(8, NgAntdColorPickerComponent_Conditional_8_Template, 1, 1, null, 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      let tmp_6_0;
      ɵɵclassProp("ant-color-picker-panel-disabled", ctx.disabled);
      ɵɵadvance();
      ɵɵconditional(ctx.panelRenderHeader ? 1 : -1);
      ɵɵadvance();
      ɵɵproperty("color", ctx.colorValue)("disabled", ctx.disabled);
      ɵɵadvance(2);
      ɵɵclassProp("ant-color-picker-slider-group-disabled-alpha", ctx.disabledAlpha);
      ɵɵadvance();
      ɵɵproperty("color", ctx.colorValue)("value", "hsl(" + (ctx.colorValue == null ? null : (tmp_6_0 = ctx.colorValue.toHsb()) == null ? null : tmp_6_0.h) + ",100%, 50%)")("gradientColors", ctx.hueColor)("disabled", ctx.disabled);
      ɵɵadvance();
      ɵɵconditional(!ctx.disabledAlpha ? 6 : -1);
      ɵɵadvance();
      ɵɵproperty("color", ctx.toRgbString);
      ɵɵadvance();
      ɵɵconditional(ctx.panelRenderFooter ? 8 : -1);
    }
  },
  dependencies: [PickerComponent, SliderComponent, NgAntdColorBlockComponent, NgTemplateOutlet],
  encapsulation: 2
});
var NgAntdColorPickerComponent = _NgAntdColorPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgAntdColorPickerComponent, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "ng-antd-color-picker",
      standalone: true,
      imports: [PickerComponent, SliderComponent, NgAntdColorBlockComponent, NgTemplateOutlet],
      template: `
    <div class="ant-color-picker-panel" [class.ant-color-picker-panel-disabled]="disabled">
      @if (panelRenderHeader) {
        <ng-template [ngTemplateOutlet]="panelRenderHeader"></ng-template>
      }
      <color-picker
        [color]="colorValue"
        (nzOnChange)="handleChange($event)"
        [disabled]="disabled"
        (nzOnChangeComplete)="nzOnChangeComplete.emit($event)"
      ></color-picker>
      <div class="ant-color-picker-slider-container">
        <div class="ant-color-picker-slider-group" [class.ant-color-picker-slider-group-disabled-alpha]="disabledAlpha">
          <color-slider
            [color]="colorValue"
            [value]="'hsl(' + colorValue?.toHsb()?.h + ',100%, 50%)'"
            [gradientColors]="hueColor"
            (nzOnChange)="handleChange($event, 'hue')"
            [disabled]="disabled"
            (nzOnChangeComplete)="nzOnChangeComplete.emit($event)"
          ></color-slider>
          @if (!disabledAlpha) {
            <color-slider
              type="alpha"
              [color]="colorValue"
              [value]="toRgbString"
              [gradientColors]="gradientColors"
              (nzOnChange)="handleChange($event, 'alpha')"
              [disabled]="disabled"
              (nzOnChangeComplete)="nzOnChangeComplete.emit($event)"
            ></color-slider>
          }
        </div>
        <ng-antd-color-block [color]="toRgbString"></ng-antd-color-block>
      </div>
      @if (panelRenderFooter) {
        <ng-template [ngTemplateOutlet]="panelRenderFooter"></ng-template>
      }
    </div>
  `
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    value: [{
      type: Input
    }],
    defaultValue: [{
      type: Input
    }],
    nzOnChange: [{
      type: Output
    }],
    nzOnChangeComplete: [{
      type: Output
    }],
    panelRenderHeader: [{
      type: Input
    }],
    panelRenderFooter: [{
      type: Input
    }],
    disabledAlpha: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var _NgAntdColorPickerModule = class _NgAntdColorPickerModule {
};
_NgAntdColorPickerModule.ɵfac = function NgAntdColorPickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgAntdColorPickerModule)();
};
_NgAntdColorPickerModule.ɵmod = ɵɵdefineNgModule({
  type: _NgAntdColorPickerModule,
  imports: [NgAntdColorPickerComponent, NgAntdColorBlockComponent],
  exports: [NgAntdColorPickerComponent, NgAntdColorBlockComponent]
});
_NgAntdColorPickerModule.ɵinj = ɵɵdefineInjector({});
var NgAntdColorPickerModule = _NgAntdColorPickerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgAntdColorPickerModule, [{
    type: NgModule,
    args: [{
      imports: [NgAntdColorPickerComponent, NgAntdColorBlockComponent],
      exports: [NgAntdColorPickerComponent, NgAntdColorBlockComponent]
    }]
  }], null, null);
})();
var _NzColorBlockComponent = class _NzColorBlockComponent {
  constructor() {
    this.nzColor = defaultColor.toHexString();
    this.nzSize = "default";
    this.nzOnClick = new EventEmitter();
  }
};
_NzColorBlockComponent.ɵfac = function NzColorBlockComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzColorBlockComponent)();
};
_NzColorBlockComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzColorBlockComponent,
  selectors: [["nz-color-block"]],
  hostAttrs: [1, "ant-color-picker-inline"],
  hostVars: 4,
  hostBindings: function NzColorBlockComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-color-picker-inline-sm", ctx.nzSize === "small")("ant-color-picker-inline-lg", ctx.nzSize === "large");
    }
  },
  inputs: {
    nzColor: "nzColor",
    nzSize: "nzSize"
  },
  outputs: {
    nzOnClick: "nzOnClick"
  },
  exportAs: ["NzColorBlock"],
  standalone: true,
  features: [ɵɵStandaloneFeature],
  decls: 1,
  vars: 1,
  consts: [[3, "nzOnClick", "color"]],
  template: function NzColorBlockComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ng-antd-color-block", 0);
      ɵɵlistener("nzOnClick", function NzColorBlockComponent_Template_ng_antd_color_block_nzOnClick_0_listener($event) {
        return ctx.nzOnClick.emit($event);
      });
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵproperty("color", ctx.nzColor);
    }
  },
  dependencies: [NgAntdColorPickerModule, NgAntdColorBlockComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NzColorBlockComponent = _NzColorBlockComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzColorBlockComponent, [{
    type: Component,
    args: [{
      selector: "nz-color-block",
      exportAs: "NzColorBlock",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgAntdColorPickerModule],
      template: ` <ng-antd-color-block [color]="nzColor" (nzOnClick)="nzOnClick.emit($event)"></ng-antd-color-block> `,
      host: {
        class: "ant-color-picker-inline",
        "[class.ant-color-picker-inline-sm]": `nzSize === 'small'`,
        "[class.ant-color-picker-inline-lg]": `nzSize === 'large'`
      }
    }]
  }], () => [], {
    nzColor: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzOnClick: [{
      type: Output
    }]
  });
})();
var _NzColorFormatComponent = class _NzColorFormatComponent {
  validatorFn() {
    return (control) => {
      const REGEXP = /^[0-9a-fA-F]{6}$/;
      if (!control.value) {
        return {
          error: true
        };
      } else if (!REGEXP.test(control.value)) {
        return {
          error: true
        };
      }
      return null;
    };
  }
  constructor(formBuilder) {
    this.formBuilder = formBuilder;
    this.format = null;
    this.colorValue = "";
    this.clearColor = false;
    this.nzDisabledAlpha = false;
    this.formatChange = new EventEmitter();
    this.nzOnFormatChange = new EventEmitter();
    this.destroy$ = new Subject();
    this.formatterPercent = (value) => `${value} %`;
    this.parserPercent = (value) => value.replace(" %", "");
    this.validateForm = this.formBuilder.nonNullable.group({
      isFormat: this.formBuilder.control("hex"),
      hex: this.formBuilder.control("1677FF", this.validatorFn()),
      hsbH: 215,
      hsbS: 91,
      hsbB: 100,
      rgbR: 22,
      rgbG: 119,
      rgbB: 255,
      roundA: 100
    });
  }
  ngOnInit() {
    this.validateForm.valueChanges.pipe(filter(() => this.validateForm.valid), debounceTime(200), distinctUntilChanged((prev, current) => Object.keys(prev).every((key) => prev[key] === current[key])), takeUntil(this.destroy$)).subscribe((value) => {
      let color = "";
      switch (value.isFormat) {
        case "hsb":
          color = generateColor({
            h: Number(value.hsbH),
            s: Number(value.hsbS) / 100,
            b: Number(value.hsbB) / 100,
            a: Number(value.roundA) / 100
          }).toHsbString();
          break;
        case "rgb":
          color = generateColor({
            r: Number(value.rgbR),
            g: Number(value.rgbG),
            b: Number(value.rgbB),
            a: Number(value.roundA) / 100
          }).toRgbString();
          break;
        default:
          const hex = generateColor(value.hex);
          const hexColor = generateColor({
            r: hex.r,
            g: hex.g,
            b: hex.b,
            a: Number(value.roundA) / 100
          });
          color = hexColor.getAlpha() < 1 ? hexColor.toHex8String() : hexColor.toHexString();
          break;
      }
      this.formatChange.emit({
        color,
        format: value.isFormat || this.format || "hex"
      });
    });
    this.validateForm.get("isFormat")?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.nzOnFormatChange.emit(value);
    });
  }
  ngOnChanges(changes) {
    const {
      colorValue,
      format,
      clearColor
    } = changes;
    if (colorValue) {
      const colorValue2 = {
        hex: generateColor(this.colorValue).toHex(),
        hsbH: Math.round(generateColor(this.colorValue).toHsb().h),
        hsbS: Math.round(generateColor(this.colorValue).toHsb().s * 100),
        hsbB: Math.round(generateColor(this.colorValue).toHsb().b * 100),
        rgbR: Math.round(generateColor(this.colorValue).r),
        rgbG: Math.round(generateColor(this.colorValue).g),
        rgbB: Math.round(generateColor(this.colorValue).b),
        roundA: Math.round(generateColor(this.colorValue).roundA * 100)
      };
      this.validateForm.patchValue(colorValue2);
    }
    if (format && this.format) {
      this.validateForm.get("isFormat")?.patchValue(this.format);
    }
    if (clearColor && this.clearColor) {
      this.validateForm.get("roundA")?.patchValue(0);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
};
_NzColorFormatComponent.ɵfac = function NzColorFormatComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzColorFormatComponent)(ɵɵdirectiveInject(FormBuilder));
};
_NzColorFormatComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzColorFormatComponent,
  selectors: [["nz-color-format"]],
  inputs: {
    format: "format",
    colorValue: "colorValue",
    clearColor: [2, "clearColor", "clearColor", booleanAttribute],
    nzDisabledAlpha: [2, "nzDisabledAlpha", "nzDisabledAlpha", booleanAttribute]
  },
  outputs: {
    formatChange: "formatChange",
    nzOnFormatChange: "nzOnFormatChange"
  },
  exportAs: ["NzColorFormat"],
  standalone: true,
  features: [ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 11,
  vars: 3,
  consts: [[1, "ant-color-picker-input-container", 3, "formGroup"], [1, "ant-color-picker-format-select"], ["formControlName", "isFormat", "nzBorderless", "", "nzSize", "small"], ["nzValue", "hex", "nzLabel", "HEX"], ["nzValue", "hsb", "nzLabel", "HSB"], ["nzValue", "rgb", "nzLabel", "RGB"], [1, "ant-color-picker-input"], [1, "ant-color-picker-hex-input"], [1, "ant-color-picker-hsb-input"], [1, "ant-color-picker-rgb-input"], [1, "ant-color-picker-steppers", "ant-color-picker-alpha-input"], ["nzPrefix", "#", "nzSize", "small"], ["nz-input", "", "nzSize", "small", "formControlName", "hex"], [1, "ant-color-picker-steppers", "ant-color-picker-hsb-input"], ["formControlName", "hsbH", "nzSize", "small", 3, "nzMin", "nzMax", "nzStep", "nzPrecision"], ["formControlName", "hsbS", "nzSize", "small", 3, "nzMin", "nzMax", "nzStep", "nzFormatter", "nzParser"], ["formControlName", "hsbB", "nzSize", "small", 3, "nzMin", "nzMax", "nzStep", "nzFormatter", "nzParser"], [1, "ant-color-picker-steppers", "ant-color-picker-rgb-input"], ["formControlName", "rgbR", "nzSize", "small", 3, "nzMin", "nzMax", "nzStep"], ["formControlName", "rgbG", "nzSize", "small", 3, "nzMin", "nzMax", "nzStep"], ["formControlName", "rgbB", "nzSize", "small", 3, "nzMin", "nzMax", "nzStep"], ["formControlName", "roundA", "nzSize", "small", 3, "nzMin", "nzMax", "nzStep", "nzFormatter", "nzParser"]],
  template: function NzColorFormatComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "nz-select", 2);
      ɵɵelement(3, "nz-option", 3)(4, "nz-option", 4)(5, "nz-option", 5);
      ɵɵelementEnd()();
      ɵɵelementStart(6, "div", 6);
      ɵɵtemplate(7, NzColorFormatComponent_Case_7_Template, 3, 0, "div", 7)(8, NzColorFormatComponent_Case_8_Template, 7, 14, "div", 8)(9, NzColorFormatComponent_Case_9_Template, 7, 9, "div", 9);
      ɵɵelementEnd();
      ɵɵtemplate(10, NzColorFormatComponent_Conditional_10_Template, 2, 5, "div", 10);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      let tmp_1_0;
      ɵɵproperty("formGroup", ctx.validateForm);
      ɵɵadvance(7);
      ɵɵconditional((tmp_1_0 = ctx.validateForm.controls.isFormat.value) === "hex" ? 7 : tmp_1_0 === "hsb" ? 8 : 9);
      ɵɵadvance(3);
      ɵɵconditional(!ctx.nzDisabledAlpha ? 10 : -1);
    }
  },
  dependencies: [ReactiveFormsModule, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, NzSelectModule, NzOptionComponent, NzSelectComponent, NzInputDirective, NzInputGroupComponent, NzInputNumberComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NzColorFormatComponent = _NzColorFormatComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzColorFormatComponent, [{
    type: Component,
    args: [{
      selector: "nz-color-format",
      exportAs: "NzColorFormat",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [ReactiveFormsModule, NzSelectModule, NzInputDirective, NzInputGroupComponent, NzInputNumberComponent],
      template: `
    <div [formGroup]="validateForm" class="ant-color-picker-input-container">
      <div class="ant-color-picker-format-select">
        <nz-select formControlName="isFormat" nzBorderless nzSize="small">
          <nz-option nzValue="hex" nzLabel="HEX" />
          <nz-option nzValue="hsb" nzLabel="HSB" />
          <nz-option nzValue="rgb" nzLabel="RGB" />
        </nz-select>
      </div>

      <div class="ant-color-picker-input">
        @switch (validateForm.controls.isFormat.value) {
          @case ('hex') {
            <div class="ant-color-picker-hex-input">
              <nz-input-group nzPrefix="#" nzSize="small">
                <input nz-input nzSize="small" formControlName="hex" />
              </nz-input-group>
            </div>
          }
          @case ('hsb') {
            <div class="ant-color-picker-hsb-input">
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  formControlName="hsbH"
                  [nzMin]="0"
                  [nzMax]="360"
                  [nzStep]="1"
                  [nzPrecision]="0"
                  nzSize="small"
                />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  formControlName="hsbS"
                  [nzMin]="0"
                  [nzMax]="100"
                  [nzStep]="1"
                  [nzFormatter]="formatterPercent"
                  [nzParser]="parserPercent"
                  nzSize="small"
                />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-hsb-input">
                <nz-input-number
                  formControlName="hsbB"
                  [nzMin]="0"
                  [nzMax]="100"
                  [nzStep]="1"
                  [nzFormatter]="formatterPercent"
                  [nzParser]="parserPercent"
                  nzSize="small"
                />
              </div>
            </div>
          }
          @default {
            <div class="ant-color-picker-rgb-input">
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number formControlName="rgbR" [nzMin]="0" [nzMax]="255" [nzStep]="1" nzSize="small" />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number formControlName="rgbG" [nzMin]="0" [nzMax]="255" [nzStep]="1" nzSize="small" />
              </div>
              <div class="ant-color-picker-steppers ant-color-picker-rgb-input">
                <nz-input-number formControlName="rgbB" [nzMin]="0" [nzMax]="255" [nzStep]="1" nzSize="small" />
              </div>
            </div>
          }
        }
      </div>

      @if (!nzDisabledAlpha) {
        <div class="ant-color-picker-steppers ant-color-picker-alpha-input">
          <nz-input-number
            formControlName="roundA"
            [nzMin]="0"
            [nzMax]="100"
            [nzStep]="1"
            [nzFormatter]="formatterPercent"
            [nzParser]="parserPercent"
            nzSize="small"
          />
        </div>
      }
    </div>
  `
    }]
  }], () => [{
    type: FormBuilder
  }], {
    format: [{
      type: Input
    }],
    colorValue: [{
      type: Input
    }],
    clearColor: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabledAlpha: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    formatChange: [{
      type: Output
    }],
    nzOnFormatChange: [{
      type: Output
    }]
  });
})();
var _NzColorPickerComponent = class _NzColorPickerComponent {
  constructor(formBuilder, cdr) {
    this.formBuilder = formBuilder;
    this.cdr = cdr;
    this.nzFormat = null;
    this.nzValue = "";
    this.nzSize = "default";
    this.nzDefaultValue = "";
    this.nzTrigger = "click";
    this.nzTitle = "";
    this.nzFlipFlop = null;
    this.nzShowText = false;
    this.nzOpen = false;
    this.nzAllowClear = false;
    this.nzDisabled = false;
    this.nzDisabledAlpha = false;
    this.nzOnChange = new EventEmitter();
    this.nzOnFormatChange = new EventEmitter();
    this.nzOnClear = new EventEmitter();
    this.nzOnOpenChange = new EventEmitter();
    this.isTemplateRef = isTemplateRef;
    this.isNonEmptyString = isNonEmptyString;
    this.destroy$ = new Subject();
    this.isNzDisableFirstChange = true;
    this.blockColor = "";
    this.clearColor = false;
    this.showText = defaultColor.toHexString();
    this.formControl = this.formBuilder.control("");
    this.onChange = () => {
    };
  }
  writeValue(value) {
    this.nzValue = value;
    this.getBlockColor();
    this.formControl.patchValue(value);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched() {
  }
  setDisabledState(isDisabled) {
    this.nzDisabled = this.isNzDisableFirstChange && this.nzDisabled || isDisabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }
  ngOnInit() {
    this.getBlockColor();
    this.formControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (!!value) {
        let color = value;
        if (this.nzFormat === "hex") {
          color = generateColor(value).getAlpha() < 1 ? generateColor(value).toHex8String() : generateColor(value).toHexString();
        } else if (this.nzFormat === "hsb") {
          color = generateColor(value).toHsbString();
        } else if (this.nzFormat === "rgb") {
          color = generateColor(value).toRgbString();
        }
        this.showText = color;
        this.onChange(color);
        this.cdr.markForCheck();
      }
    });
  }
  ngOnChanges(changes) {
    const {
      nzValue,
      nzDefaultValue
    } = changes;
    if (nzValue || nzDefaultValue) {
      this.getBlockColor();
    }
  }
  clearColorHandle() {
    this.clearColor = true;
    this.nzOnClear.emit(true);
    this.cdr.markForCheck();
  }
  getBlockColor() {
    if (!!this.nzValue) {
      this.blockColor = generateColor(this.nzValue).toRgbString();
    } else if (!!this.nzDefaultValue) {
      this.blockColor = generateColor(this.nzDefaultValue).toRgbString();
    } else {
      this.blockColor = defaultColor.toHexString();
    }
  }
  colorChange(value) {
    this.blockColor = value.color.getAlpha() < 1 ? value.color.toHex8String() : value.color.toHexString();
    this.clearColor = false;
    this.cdr.markForCheck();
  }
  formatChange(value) {
    this.nzValue = value.color;
    this.clearColor = false;
    this.getBlockColor();
    this.nzOnChange.emit({
      color: generateColor(value.color),
      format: value.format
    });
    this.formControl.patchValue(value.color);
    this.cdr.markForCheck();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  get isNzTitleNonEmptyString() {
    return isNonEmptyString(this.nzTitle);
  }
  get isNzTitleTemplateRef() {
    return isTemplateRef(this.nzTitle);
  }
};
_NzColorPickerComponent.ɵfac = function NzColorPickerComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzColorPickerComponent)(ɵɵdirectiveInject(FormBuilder), ɵɵdirectiveInject(ChangeDetectorRef));
};
_NzColorPickerComponent.ɵcmp = ɵɵdefineComponent({
  type: _NzColorPickerComponent,
  selectors: [["nz-color-picker"]],
  hostAttrs: [1, "ant-color-picker-inline"],
  hostVars: 2,
  hostBindings: function NzColorPickerComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("ant-color-picker-disabled", ctx.nzDisabled);
    }
  },
  inputs: {
    nzFormat: "nzFormat",
    nzValue: "nzValue",
    nzSize: "nzSize",
    nzDefaultValue: "nzDefaultValue",
    nzTrigger: "nzTrigger",
    nzTitle: "nzTitle",
    nzFlipFlop: "nzFlipFlop",
    nzShowText: [2, "nzShowText", "nzShowText", booleanAttribute],
    nzOpen: [2, "nzOpen", "nzOpen", booleanAttribute],
    nzAllowClear: [2, "nzAllowClear", "nzAllowClear", booleanAttribute],
    nzDisabled: [2, "nzDisabled", "nzDisabled", booleanAttribute],
    nzDisabledAlpha: [2, "nzDisabledAlpha", "nzDisabledAlpha", booleanAttribute]
  },
  outputs: {
    nzOnChange: "nzOnChange",
    nzOnFormatChange: "nzOnFormatChange",
    nzOnClear: "nzOnClear",
    nzOnOpenChange: "nzOnOpenChange"
  },
  exportAs: ["NzColorPicker"],
  standalone: true,
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => _NzColorPickerComponent),
    multi: true
  }]), ɵɵInputTransformsFeature, ɵɵNgOnChangesFeature, ɵɵStandaloneFeature],
  decls: 10,
  vars: 11,
  consts: [["colorPicker", ""], ["nzPanelRenderHeader", ""], ["nzPanelRenderFooter", ""], ["nz-popover", "", 3, "nzPopoverVisibleChange", "nzPopoverContent", "nzPopoverTrigger", "nzPopoverVisible"], [3, "nzColor", "nzSize"], [3, "ngTemplateOutlet"], [1, "ant-color-picker-trigger-text"], [3, "nzOnChange", "value", "defaultValue", "disabled", "panelRenderHeader", "panelRenderFooter", "disabledAlpha"], [1, "ant-color-picker-title"], [1, "ant-color-picker-title-content"], [3, "innerHTML"], [1, "ant-color-picker-clear"], [4, "ngTemplateOutlet"], [1, "ant-color-picker-clear", 3, "click"], [3, "formatChange", "nzOnFormatChange", "colorValue", "clearColor", "format", "nzDisabledAlpha"]],
  template: function NzColorPickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "div", 3);
      ɵɵlistener("nzPopoverVisibleChange", function NzColorPickerComponent_Template_div_nzPopoverVisibleChange_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.nzOnOpenChange.emit($event));
      });
      ɵɵtemplate(1, NzColorPickerComponent_Conditional_1_Template, 1, 2, "nz-color-block", 4)(2, NzColorPickerComponent_Conditional_2_Template, 1, 1, null, 5)(3, NzColorPickerComponent_Conditional_3_Template, 2, 1, "div", 6);
      ɵɵelementEnd();
      ɵɵtemplate(4, NzColorPickerComponent_ng_template_4_Template, 1, 6, "ng-template", null, 0, ɵɵtemplateRefExtractor)(6, NzColorPickerComponent_ng_template_6_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor)(8, NzColorPickerComponent_ng_template_8_Template, 1, 4, "ng-template", null, 2, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const colorPicker_r8 = ɵɵreference(5);
      ɵɵclassProp("ant-color-picker-trigger", !ctx.nzFlipFlop)("ant-color-picker-sm", ctx.nzSize === "small")("ant-color-picker-lg", ctx.nzSize === "large");
      ɵɵproperty("nzPopoverContent", colorPicker_r8)("nzPopoverTrigger", !ctx.nzDisabled ? ctx.nzTrigger : null)("nzPopoverVisible", ctx.nzOpen);
      ɵɵadvance();
      ɵɵconditional(!ctx.nzFlipFlop ? 1 : 2);
      ɵɵadvance(2);
      ɵɵconditional(ctx.nzShowText && !!ctx.showText && !ctx.nzFlipFlop ? 3 : -1);
    }
  },
  dependencies: [NgAntdColorPickerModule, NgAntdColorPickerComponent, NzPopoverDirective, NzColorBlockComponent, NzColorFormatComponent, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
});
var NzColorPickerComponent = _NzColorPickerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzColorPickerComponent, [{
    type: Component,
    args: [{
      selector: "nz-color-picker",
      exportAs: "NzColorPicker",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgAntdColorPickerModule, NzPopoverDirective, NzColorBlockComponent, NzColorFormatComponent, NgTemplateOutlet],
      template: `
    <div
      [class.ant-color-picker-trigger]="!nzFlipFlop"
      [class.ant-color-picker-sm]="nzSize === 'small'"
      [class.ant-color-picker-lg]="nzSize === 'large'"
      nz-popover
      [nzPopoverContent]="colorPicker"
      [nzPopoverTrigger]="!nzDisabled ? nzTrigger : null"
      [nzPopoverVisible]="nzOpen"
      (nzPopoverVisibleChange)="nzOnOpenChange.emit($event)"
    >
      @if (!nzFlipFlop) {
        <nz-color-block [nzColor]="blockColor" [nzSize]="nzSize" />
      } @else {
        <ng-template [ngTemplateOutlet]="nzFlipFlop" />
      }
      @if (nzShowText && !!showText && !nzFlipFlop) {
        <div class="ant-color-picker-trigger-text">
          {{ showText }}
        </div>
      }
    </div>
    <ng-template #colorPicker>
      <ng-antd-color-picker
        [value]="nzValue"
        [defaultValue]="nzDefaultValue"
        [disabled]="nzDisabled"
        [panelRenderHeader]="nzPanelRenderHeader"
        [panelRenderFooter]="nzPanelRenderFooter"
        [disabledAlpha]="nzDisabledAlpha"
        (nzOnChange)="colorChange($event)"
      />
    </ng-template>
    <ng-template #nzPanelRenderHeader>
      @if (nzTitle || nzAllowClear) {
        <div class="ant-color-picker-title">
          <div class="ant-color-picker-title-content">
            @if (isNzTitleTemplateRef) {
              <ng-container *ngTemplateOutlet="$any(nzTitle)" />
            }
            @if (isNzTitleNonEmptyString) {
              <span [innerHTML]="nzTitle"></span>
            }
          </div>
          @if (nzAllowClear) {
            <div class="ant-color-picker-clear" (click)="clearColorHandle()"></div>
          }
        </div>
      }
    </ng-template>
    <ng-template #nzPanelRenderFooter>
      <nz-color-format
        [colorValue]="blockColor"
        [clearColor]="clearColor"
        [format]="nzFormat"
        [nzDisabledAlpha]="nzDisabledAlpha"
        (formatChange)="formatChange($event)"
        (nzOnFormatChange)="nzOnFormatChange.emit($event)"
      />
    </ng-template>
  `,
      host: {
        class: "ant-color-picker-inline",
        "[class.ant-color-picker-disabled]": `nzDisabled`
      },
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NzColorPickerComponent),
        multi: true
      }]
    }]
  }], () => [{
    type: FormBuilder
  }, {
    type: ChangeDetectorRef
  }], {
    nzFormat: [{
      type: Input
    }],
    nzValue: [{
      type: Input
    }],
    nzSize: [{
      type: Input
    }],
    nzDefaultValue: [{
      type: Input
    }],
    nzTrigger: [{
      type: Input
    }],
    nzTitle: [{
      type: Input
    }],
    nzFlipFlop: [{
      type: Input
    }],
    nzShowText: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOpen: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzAllowClear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzDisabledAlpha: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    nzOnChange: [{
      type: Output
    }],
    nzOnFormatChange: [{
      type: Output
    }],
    nzOnClear: [{
      type: Output
    }],
    nzOnOpenChange: [{
      type: Output
    }]
  });
})();
var _NzColorPickerModule = class _NzColorPickerModule {
};
_NzColorPickerModule.ɵfac = function NzColorPickerModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NzColorPickerModule)();
};
_NzColorPickerModule.ɵmod = ɵɵdefineNgModule({
  type: _NzColorPickerModule,
  imports: [NzColorPickerComponent, NzColorBlockComponent, NzColorFormatComponent],
  exports: [NzColorPickerComponent, NzColorBlockComponent]
});
_NzColorPickerModule.ɵinj = ɵɵdefineInjector({
  imports: [NzColorPickerComponent, NzColorFormatComponent]
});
var NzColorPickerModule = _NzColorPickerModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NzColorPickerModule, [{
    type: NgModule,
    args: [{
      imports: [NzColorPickerComponent, NzColorBlockComponent, NzColorFormatComponent],
      exports: [NzColorPickerComponent, NzColorBlockComponent]
    }]
  }], null, null);
})();
export {
  NzColorBlockComponent,
  NzColorPickerComponent,
  NzColorPickerModule
};
//# sourceMappingURL=ng-zorro-antd_color-picker.js.map
