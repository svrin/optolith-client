// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Decoder$OptolithClient = require("../Utilities/Decoder.bs.js");
var Erratum$OptolithClient = require("../Sources/Erratum.bs.js");
var JsonStrict$OptolithClient = require("./JsonStrict.bs.js");
var Ley_IntMap$OptolithClient = require("../Data/Ley_IntMap.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");
var PublicationRef$OptolithClient = require("../Sources/PublicationRef.bs.js");
var TranslationMap$OptolithClient = require("./TranslationMap.bs.js");

function t(json) {
  return JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json);
}

var Translation = {
  t: t
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function multilingual(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          translations: Json_decode.field("translations", TranslationMap.Decode.t, json)
        };
}

function multilingualAssoc(json) {
  var x = multilingual(json);
  return [
          x.id,
          x
        ];
}

var Specialization = {
  Translation: Translation,
  TranslationMap: TranslationMap,
  multilingual: multilingual,
  multilingualAssoc: multilingualAssoc
};

function t$1(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          specializationInput: JsonStrict$OptolithClient.optionalField("description", JsonStrict$OptolithClient.string, json),
          errata: JsonStrict$OptolithClient.optionalField("errata", Erratum$OptolithClient.Decode.list, json)
        };
}

var Translation$1 = {
  t: t$1
};

var TranslationMap$1 = TranslationMap$OptolithClient.Make(Translation$1);

function multilingual$1(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          maxLevel: JsonStrict$OptolithClient.optionalField("maxLevel", JsonStrict$OptolithClient.$$int, json),
          specializations: Ley_Option$OptolithClient.option(Ley_IntMap$OptolithClient.empty, Ley_IntMap$OptolithClient.fromList, JsonStrict$OptolithClient.optionalField("specializations", (function (param) {
                      return JsonStrict$OptolithClient.list(multilingualAssoc, param);
                    }), json)),
          continent: JsonStrict$OptolithClient.field("continent", JsonStrict$OptolithClient.$$int, json),
          isExtinct: JsonStrict$OptolithClient.field("isExtinct", JsonStrict$OptolithClient.bool, json),
          src: JsonStrict$OptolithClient.field("src", PublicationRef$OptolithClient.Decode.multilingualList, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap$1.Decode.t, json)
        };
}

function resolveTranslations(langs, x) {
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._2(TranslationMap$1.Decode.getFromLanguageOrder, langs, x.translations), (function (translation) {
                return {
                        id: x.id,
                        name: translation.name,
                        maxLevel: x.maxLevel,
                        specializations: Curry._2(Ley_IntMap$OptolithClient.mapMaybe, (function (specialization) {
                                return Curry._2(TranslationMap.Decode.getFromLanguageOrder, langs, specialization.translations);
                              }), x.specializations),
                        specializationInput: translation.specializationInput,
                        continent: x.continent,
                        isExtinct: x.isExtinct,
                        src: PublicationRef$OptolithClient.Decode.resolveTranslationsList(langs, x.src),
                        errata: Ley_Option$OptolithClient.fromOption(/* [] */0, translation.errata)
                      };
              }));
}

function t$2(langs, json) {
  return resolveTranslations(langs, multilingual$1(json));
}

function toAssoc(x) {
  return [
          x.id,
          x
        ];
}

function assoc(param, param$1) {
  return Decoder$OptolithClient.decodeAssoc(t$2, toAssoc, param, param$1);
}

var Decode = {
  Specialization: Specialization,
  Translation: Translation$1,
  TranslationMap: TranslationMap$1,
  multilingual: multilingual$1,
  resolveTranslations: resolveTranslations,
  t: t$2,
  toAssoc: toAssoc,
  assoc: assoc
};

exports.Decode = Decode;
/* TranslationMap Not a pure module */
