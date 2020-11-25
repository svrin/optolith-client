// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Decoder$OptolithClient = require("../Utilities/Decoder.bs.js");
var JsonStrict$OptolithClient = require("./JsonStrict.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");
var TranslationMap$OptolithClient = require("./TranslationMap.bs.js");

function t(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json)
        };
}

var Translation = {
  t: t
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function multilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          ap: JsonStrict$OptolithClient.field("ap", JsonStrict$OptolithClient.$$int, json),
          maxAttributeValue: JsonStrict$OptolithClient.field("maxAttributeValue", JsonStrict$OptolithClient.$$int, json),
          maxSkillRating: JsonStrict$OptolithClient.field("maxSkillRating", JsonStrict$OptolithClient.$$int, json),
          maxCombatTechniqueRating: JsonStrict$OptolithClient.field("maxCombatTechniqueRating", JsonStrict$OptolithClient.$$int, json),
          maxAttributeTotal: JsonStrict$OptolithClient.field("maxAttributeTotal", JsonStrict$OptolithClient.$$int, json),
          maxNumberSpellsLiturgicalChants: JsonStrict$OptolithClient.field("maxNumberSpellsLiturgicalChants", JsonStrict$OptolithClient.$$int, json),
          maxUnfamiliarSpells: JsonStrict$OptolithClient.field("maxUnfamiliarSpells", JsonStrict$OptolithClient.$$int, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap.Decode.t, json)
        };
}

function t$1(langs, json) {
  var x = multilingual(json);
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap.Decode.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return {
                        id: x.id,
                        name: translation.name,
                        ap: x.ap,
                        maxAttributeValue: x.maxAttributeValue,
                        maxSkillRating: x.maxSkillRating,
                        maxCombatTechniqueRating: x.maxCombatTechniqueRating,
                        maxAttributeTotal: x.maxAttributeTotal,
                        maxNumberSpellsLiturgicalChants: x.maxNumberSpellsLiturgicalChants,
                        maxUnfamiliarSpells: x.maxUnfamiliarSpells
                      };
              }));
}

function toAssoc(x) {
  return [
          x.id,
          x
        ];
}

function assoc(param, param$1) {
  return Decoder$OptolithClient.decodeAssoc(t$1, toAssoc, param, param$1);
}

var Decode = {
  assoc: assoc
};

exports.Decode = Decode;
/* TranslationMap Not a pure module */
