// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Id$OptolithClient = require("../Misc/Id.bs.js");
var Ley_List$OptolithClient = require("../Data/Ley_List.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");

function isActive(x) {
  return Ley_List$OptolithClient.Extra.notNull(x.active);
}

function isActiveM(param) {
  return Ley_Option$OptolithClient.option(false, isActive, param);
}

function id(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
        return {
                TAG: /* Advantage */0,
                _0: x._0.id
              };
    case /* Disadvantage */1 :
        return {
                TAG: /* Disadvantage */1,
                _0: x._0.id
              };
    case /* SpecialAbility */2 :
        return {
                TAG: /* SpecialAbility */2,
                _0: x._0.id
              };
    
  }
}

function id$prime(x) {
  return x._0.id;
}

function idDeepVariant(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
        return {
                TAG: /* Advantage */0,
                _0: Id$OptolithClient.Advantage.fromInt(x._0.id)
              };
    case /* Disadvantage */1 :
        return {
                TAG: /* Disadvantage */1,
                _0: Id$OptolithClient.Disadvantage.fromInt(x._0.id)
              };
    case /* SpecialAbility */2 :
        return {
                TAG: /* SpecialAbility */2,
                _0: Id$OptolithClient.SpecialAbility.fromInt(x._0.id)
              };
    
  }
}

function name(x) {
  return x._0.name;
}

function selectOptions(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.selectOptions;
    case /* SpecialAbility */2 :
        return x._0.selectOptions;
    
  }
}

function input(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.input;
    case /* SpecialAbility */2 :
        return x._0.input;
    
  }
}

function apValue(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.apValue;
    case /* SpecialAbility */2 :
        return x._0.apValue;
    
  }
}

function apValue$prime(x) {
  var match = apValue(x);
  if (match !== undefined) {
    if (match.TAG) {
      return {
              TAG: /* Many */1,
              _0: match._0
            };
    } else {
      return {
              TAG: /* One */0,
              _0: match._0
            };
    }
  }
  
}

function max(x) {
  switch (x.TAG | 0) {
    case /* Advantage */0 :
    case /* Disadvantage */1 :
        return x._0.max;
    case /* SpecialAbility */2 :
        return x._0.max;
    
  }
}

exports.isActive = isActive;
exports.isActiveM = isActiveM;
exports.id = id;
exports.id$prime = id$prime;
exports.idDeepVariant = idDeepVariant;
exports.name = name;
exports.selectOptions = selectOptions;
exports.input = input;
exports.apValue = apValue;
exports.apValue$prime = apValue$prime;
exports.max = max;
/* Id-OptolithClient Not a pure module */
