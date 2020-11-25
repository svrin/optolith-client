// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Decoder$OptolithClient = require("../Utilities/Decoder.bs.js");
var Erratum$OptolithClient = require("../Sources/Erratum.bs.js");
var Advantage$OptolithClient = require("./Advantage.bs.js");
var JsonStrict$OptolithClient = require("../Misc/JsonStrict.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");
var Prerequisite$OptolithClient = require("../Prerequisites/Prerequisite.bs.js");
var SelectOption$OptolithClient = require("./SelectOption.bs.js");
var PublicationRef$OptolithClient = require("../Sources/PublicationRef.bs.js");
var TranslationMap$OptolithClient = require("../Misc/TranslationMap.bs.js");

function t(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          nameInWiki: JsonStrict$OptolithClient.optionalField("nameInWiki", JsonStrict$OptolithClient.string, json),
          rules: JsonStrict$OptolithClient.field("rules", JsonStrict$OptolithClient.string, json),
          input: JsonStrict$OptolithClient.optionalField("input", JsonStrict$OptolithClient.string, json),
          range: JsonStrict$OptolithClient.optionalField("range", JsonStrict$OptolithClient.string, json),
          prerequisites: JsonStrict$OptolithClient.optionalField("prerequisites", JsonStrict$OptolithClient.string, json),
          prerequisitesStart: JsonStrict$OptolithClient.optionalField("prerequisitesStart", JsonStrict$OptolithClient.string, json),
          prerequisitesEnd: JsonStrict$OptolithClient.optionalField("prerequisitesEnd", JsonStrict$OptolithClient.string, json),
          apValue: JsonStrict$OptolithClient.optionalField("apValue", JsonStrict$OptolithClient.string, json),
          apValueAppend: JsonStrict$OptolithClient.optionalField("apValueAppend", JsonStrict$OptolithClient.string, json),
          errata: JsonStrict$OptolithClient.optionalField("errata", Erratum$OptolithClient.Decode.list, json)
        };
}

var Translation = {
  t: t
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function multilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          noMaxAPInfluence: JsonStrict$OptolithClient.optionalField("noMaxAPInfluence", JsonStrict$OptolithClient.bool, json),
          isExclusiveToArcaneSpellworks: JsonStrict$OptolithClient.optionalField("isExclusiveToArcaneSpellworks", JsonStrict$OptolithClient.bool, json),
          levels: JsonStrict$OptolithClient.optionalField("levels", JsonStrict$OptolithClient.$$int, json),
          max: JsonStrict$OptolithClient.optionalField("max", JsonStrict$OptolithClient.$$int, json),
          selectOptionCategories: JsonStrict$OptolithClient.optionalField("selectOptionCategories", (function (param) {
                  return JsonStrict$OptolithClient.list(SelectOption$OptolithClient.Decode.Category.t, param);
                }), json),
          selectOptions: Ley_Option$OptolithClient.option(SelectOption$OptolithClient.$$Map.empty, SelectOption$OptolithClient.$$Map.fromList, JsonStrict$OptolithClient.optionalField("selectOptions", (function (param) {
                      return JsonStrict$OptolithClient.list(SelectOption$OptolithClient.Decode.multilingualAssoc, param);
                    }), json)),
          prerequisites: JsonStrict$OptolithClient.field("prerequisites", Prerequisite$OptolithClient.Collection.AdvantageDisadvantage.Decode.multilingual, json),
          apValue: JsonStrict$OptolithClient.optionalField("apValue", Advantage$OptolithClient.Static.Decode.apValue, json),
          gr: JsonStrict$OptolithClient.field("gr", JsonStrict$OptolithClient.$$int, json),
          src: JsonStrict$OptolithClient.field("src", PublicationRef$OptolithClient.Decode.multilingualList, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap.Decode.t, json)
        };
}

function toAssoc(x) {
  return [
          x.id,
          x
        ];
}

function assoc(blessings, cantrips, combatTechniques, liturgicalChants, skills, spells, tradeSecrets, languages, scripts, animalShapes, spellEnhancements, liturgicalChantEnhancements) {
  return function (param, param$1) {
    return Decoder$OptolithClient.decodeAssoc((function (param, param$1) {
                  var x = multilingual(param$1);
                  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap.Decode.getFromLanguageOrder, param, x.translations), (function (translation) {
                                var src = PublicationRef$OptolithClient.Decode.resolveTranslationsList(param, x.src);
                                var errata = translation.errata;
                                return {
                                        id: x.id,
                                        name: translation.name,
                                        nameInWiki: translation.nameInWiki,
                                        noMaxAPInfluence: Ley_Option$OptolithClient.fromOption(false, x.noMaxAPInfluence),
                                        isExclusiveToArcaneSpellworks: Ley_Option$OptolithClient.fromOption(false, x.isExclusiveToArcaneSpellworks),
                                        levels: x.levels,
                                        max: x.max,
                                        rules: translation.rules,
                                        selectOptions: Curry._2(SelectOption$OptolithClient.Decode.ResolveCategories.mergeSelectOptions, Curry._2(SelectOption$OptolithClient.$$Map.mapMaybe, (function (param$2) {
                                                    return SelectOption$OptolithClient.Decode.resolveTranslations(param, param$2);
                                                  }), x.selectOptions), Curry.app(SelectOption$OptolithClient.Decode.ResolveCategories.resolveCategories, [
                                                  blessings,
                                                  cantrips,
                                                  combatTechniques,
                                                  liturgicalChants,
                                                  skills,
                                                  spells,
                                                  tradeSecrets,
                                                  languages,
                                                  scripts,
                                                  animalShapes,
                                                  spellEnhancements,
                                                  liturgicalChantEnhancements,
                                                  src,
                                                  Ley_Option$OptolithClient.fromOption(/* [] */0, errata),
                                                  x.selectOptionCategories
                                                ])),
                                        input: translation.input,
                                        range: translation.range,
                                        prerequisites: Curry._2(Prerequisite$OptolithClient.Collection.AdvantageDisadvantage.Decode.resolveTranslations, param, x.prerequisites),
                                        prerequisitesText: translation.prerequisites,
                                        prerequisitesTextStart: translation.prerequisitesStart,
                                        prerequisitesTextEnd: translation.prerequisitesEnd,
                                        apValue: x.apValue,
                                        apValueText: translation.apValue,
                                        apValueTextAppend: translation.apValueAppend,
                                        gr: x.gr,
                                        src: src,
                                        errata: Ley_Option$OptolithClient.fromOption(/* [] */0, errata)
                                      };
                              }));
                }), toAssoc, param, param$1);
  };
}

var Static = {
  Decode: {
    assoc: assoc
  }
};

exports.Static = Static;
/* TranslationMap Not a pure module */
