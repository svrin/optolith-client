// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Attribute$OptolithClient = require("./Attribute.bs.js");
var Ley_IntMap$OptolithClient = require("../Data/Ley_IntMap.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");

function getValues(mp, param) {
  return [
          Curry._1(Attribute$OptolithClient.Dynamic.getValueDef, Curry._2(Ley_IntMap$OptolithClient.lookup, param[0], mp)),
          Curry._1(Attribute$OptolithClient.Dynamic.getValueDef, Curry._2(Ley_IntMap$OptolithClient.lookup, param[1], mp)),
          Curry._1(Attribute$OptolithClient.Dynamic.getValueDef, Curry._2(Ley_IntMap$OptolithClient.lookup, param[2], mp))
        ];
}

function t(param) {
  return Json_decode.tuple3(Json_decode.$$int, Json_decode.$$int, Json_decode.$$int, param);
}

var Decode = {
  t: t
};

exports.getValues = getValues;
exports.Decode = Decode;
/* Attribute-OptolithClient Not a pure module */
