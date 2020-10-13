// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Int$OptolithClient = require("../../Data/Int.bs.js");
var IntMap$OptolithClient = require("../../Data/IntMap.bs.js");
var Yaml_Zip$OptolithClient = require("../Utilities/Yaml_Zip.bs.js");

function tL10n(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          name: Json_decode.field("name", Json_decode.string, json)
        };
}

function tUniv(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          ap: Json_decode.field("ap", Json_decode.$$int, json),
          maxAttributeValue: Json_decode.field("maxAttributeValue", Json_decode.$$int, json),
          maxSkillRating: Json_decode.field("maxSkillRating", Json_decode.$$int, json),
          maxCombatTechniqueRating: Json_decode.field("maxCombatTechniqueRating", Json_decode.$$int, json),
          maxTotalAttributeValues: Json_decode.field("maxTotalAttributeValues", Json_decode.$$int, json),
          maxSpellsLiturgicalChants: Json_decode.field("maxSpellsLiturgicalChants", Json_decode.$$int, json),
          maxUnfamiliarSpells: Json_decode.field("maxUnfamiliarSpells", Json_decode.$$int, json)
        };
}

function t(univ, l10n) {
  return /* tuple */[
          univ.id,
          {
            id: univ.id,
            name: l10n.name,
            ap: univ.ap,
            maxAttributeValue: univ.maxAttributeValue,
            maxSkillRating: univ.maxSkillRating,
            maxCombatTechniqueRating: univ.maxCombatTechniqueRating,
            maxTotalAttributeValues: univ.maxTotalAttributeValues,
            maxSpellsLiturgicalChants: univ.maxSpellsLiturgicalChants,
            maxUnfamiliarSpells: univ.maxUnfamiliarSpells
          }
        ];
}

function all(yamlData) {
  return Curry._1(IntMap$OptolithClient.fromList, Yaml_Zip$OptolithClient.zipBy(Int$OptolithClient.show, t, (function (x) {
                    return x.id;
                  }), (function (x) {
                    return x.id;
                  }), Json_decode.list(tUniv, yamlData.experienceLevelsUniv), Json_decode.list(tL10n, yamlData.experienceLevelsL10n)));
}

var Decode = {
  tL10n: tL10n,
  tUniv: tUniv,
  t: t,
  all: all
};

exports.Decode = Decode;
/* IntMap-OptolithClient Not a pure module */