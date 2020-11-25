// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Decoder$OptolithClient = require("../Utilities/Decoder.bs.js");
var JsonStrict$OptolithClient = require("../Misc/JsonStrict.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");
var TranslationMap$OptolithClient = require("../Misc/TranslationMap.bs.js");

function t(json) {
  return {
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json),
          nameAbbr: JsonStrict$OptolithClient.field("nameAbbr", JsonStrict$OptolithClient.string, json),
          isMissingImplementation: JsonStrict$OptolithClient.optionalField("isMissingImplementation", JsonStrict$OptolithClient.bool, json)
        };
}

var Translation = {
  t: t
};

var TranslationMap = TranslationMap$OptolithClient.Make(Translation);

function multilingual(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          isCore: JsonStrict$OptolithClient.field("isCore", JsonStrict$OptolithClient.bool, json),
          isAdultContent: JsonStrict$OptolithClient.field("isAdultContent", JsonStrict$OptolithClient.bool, json),
          isMissingImplementation: JsonStrict$OptolithClient.optionalField("isMissingImplementation", JsonStrict$OptolithClient.bool, json),
          translations: JsonStrict$OptolithClient.field("translations", TranslationMap.Decode.t, json)
        };
}

function t$1(langs, json) {
  var x = multilingual(json);
  var match = x.isMissingImplementation;
  if (match !== undefined && match) {
    return ;
  } else {
    return Curry._2(Ley_Option$OptolithClient.Infix.$less$amp$great, Curry._3(TranslationMap.Decode.getFromLanguageOrderWith, (function (param) {
                      return Curry._1(Ley_Option$OptolithClient.dis, param.isMissingImplementation);
                    }), langs, x.translations), (function (translation) {
                  return {
                          id: x.id,
                          name: translation.name,
                          nameAbbr: translation.nameAbbr,
                          isCore: x.isCore,
                          isAdultContent: x.isAdultContent
                        };
                }));
  }
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
