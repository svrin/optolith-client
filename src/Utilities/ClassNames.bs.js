// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Ley_List$OptolithClient = require("../Data/Ley_List.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");

function fold(xs) {
  return Ley_List$OptolithClient.intercalate(" ", Ley_Option$OptolithClient.catOptions(xs));
}

function cond(className, condition) {
  if (condition) {
    return className;
  }
  
}

var safe = Ley_Option$OptolithClient.$$return;

exports.fold = fold;
exports.cond = cond;
exports.safe = safe;
/* Ley_List-OptolithClient Not a pure module */
