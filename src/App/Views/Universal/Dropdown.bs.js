// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Label$OptolithClient = require("./Label.bs.js");
var Ley_Int$OptolithClient = require("../../../Data/Ley_Int.bs.js");
var Ley_List$OptolithClient = require("../../../Data/Ley_List.bs.js");
var ClassNames$OptolithClient = require("../../../Utilities/ClassNames.bs.js");
var Ley_Option$OptolithClient = require("../../../Data/Ley_Option.bs.js");
var ReactUtils$OptolithClient = require("../../../Utilities/ReactUtils.bs.js");
var ScrollView$OptolithClient = require("./ScrollView.bs.js");

function Dropdown$Item(Props) {
  var active = Props.active;
  var equals = Props.equals;
  var option = Props.option;
  var onChange = Props.onChange;
  var disabled = Props.disabled;
  var isActive = Curry._2(equals, active, option.value);
  var handleClick = React.useCallback((function (param) {
          if (!disabled && !isActive) {
            return Curry._1(onChange, option.value);
          }
          
        }), [
        isActive,
        option,
        onChange,
        disabled
      ]);
  return React.createElement("div", {
              className: ClassNames$OptolithClient.fold({
                    hd: ClassNames$OptolithClient.cond("active", isActive),
                    tl: /* [] */0
                  }),
              onClick: handleClick
            }, ReactUtils$OptolithClient.s(option.label));
}

var Item = {
  make: Dropdown$Item
};

function Dropdown(Props) {
  var name = Props.name;
  var label = Props.label;
  var options = Props.options;
  var valueToKey = Props.valueToKey;
  var onChange = Props.onChange;
  var disabled = Props.disabled;
  var active = Props.active;
  var equalsOpt = Props.equals;
  var placeholder = Props.placeholder;
  var equals = equalsOpt !== undefined ? equalsOpt : (function (prim, prim$1) {
        return prim === prim$1;
      });
  var match = React.useState(function () {
        return false;
      });
  var setIsOpen = match[1];
  var isOpen = match[0];
  var match$1 = React.useState(function () {
        return /* Bottom */1;
      });
  var setPosition = match$1[1];
  var position = match$1[0];
  var containerRef = React.useRef(null);
  var handleSwitch = React.useCallback((function (param) {
          var maybeRef = containerRef.current;
          if (!(maybeRef == null) && !isOpen) {
            var height = Ley_Int$OptolithClient.min(166, Math.imul(Curry._1(Ley_List$OptolithClient.length, options), 33) + 1 | 0);
            var rect = maybeRef.getBoundingClientRect();
            Curry._1(setPosition, (function (param) {
                    if (window.innerHeight - 32.0 - rect.top < height) {
                      return /* Top */0;
                    } else {
                      return /* Bottom */1;
                    }
                  }));
          }
          return Curry._1(setIsOpen, (function (prim) {
                        return !prim;
                      }));
        }), [
        isOpen,
        options
      ]);
  var handleChange = React.useCallback((function (option) {
          Curry._1(setIsOpen, (function (param) {
                  return false;
                }));
          return Curry._1(onChange, option);
        }), [
        setIsOpen,
        onChange
      ]);
  var handleOutsideClick = React.useCallback((function ($$event) {
          if (isOpen) {
            Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Caml_option.nullable_to_opt(containerRef.current), (function (currentRef) {
                    if (!currentRef.contains($$event.target)) {
                      return Curry._1(setIsOpen, (function (param) {
                                    return false;
                                  }));
                    }
                    
                  }));
            return ;
          }
          
        }), [isOpen]);
  React.useEffect((function () {
          window.addEventListener("mousedown", handleOutsideClick);
          window.addEventListener("ontouchstart", handleOutsideClick);
          return (function (param) {
                    window.removeEventListener("mousedown", handleOutsideClick);
                    window.removeEventListener("ontouchstart", handleOutsideClick);
                    
                  });
        }), [handleOutsideClick]);
  var activeOption = Curry._2(Ley_List$OptolithClient.find, (function (option) {
          return Curry._2(equals, active, option.value);
        }), options);
  var activetext = Ley_Option$OptolithClient.fromOption("", Curry._2(Ley_Option$OptolithClient.Infix.$less$pipe$great, Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, activeOption, (function (x) {
                  return x.label;
                })), placeholder));
  var overlayElement = React.createElement("div", {
        className: "dropdown-overlay"
      }, React.createElement(ScrollView$OptolithClient.make, {
            children: ReactUtils$OptolithClient.list(Curry._2(Ley_List$OptolithClient.map, (function (option) {
                        return React.createElement(Dropdown$Item, {
                                    active: active,
                                    equals: equals,
                                    option: option,
                                    onChange: handleChange,
                                    disabled: disabled,
                                    key: Curry._1(valueToKey, option.value)
                                  });
                      }), options))
          }));
  var placeholderElement = React.createElement("div", {
        style: {
          height: "0px"
        }
      });
  return React.createElement("div", {
              ref: containerRef,
              className: ClassNames$OptolithClient.fold({
                    hd: Curry._1(ClassNames$OptolithClient.safe, "dropdown"),
                    tl: {
                      hd: Curry._1(ClassNames$OptolithClient.safe, position ? "dropdown--bottom" : "dropdown--top"),
                      tl: {
                        hd: ClassNames$OptolithClient.cond("disabled", disabled),
                        tl: /* [] */0
                      }
                    }
                  })
            }, React.createElement(Label$OptolithClient.make, {
                  name: name,
                  labelText: label
                }), React.createElement("div", undefined, position || !isOpen ? placeholderElement : overlayElement, React.createElement("div", {
                      className: ClassNames$OptolithClient.fold({
                            hd: Curry._1(ClassNames$OptolithClient.safe, "value"),
                            tl: {
                              hd: ClassNames$OptolithClient.cond("placeholder", Ley_Option$OptolithClient.isNone(activeOption)),
                              tl: /* [] */0
                            }
                          }),
                      onClick: handleSwitch
                    }, ReactUtils$OptolithClient.s(activetext)), position && isOpen ? overlayElement : placeholderElement));
}

var make = Dropdown;

exports.Item = Item;
exports.make = make;
/* react Not a pure module */
