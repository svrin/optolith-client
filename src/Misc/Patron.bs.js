// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Ley_Int$OptolithClient from "../Data/Ley_Int.bs.js";
import * as Yaml_Zip$OptolithClient from "./Yaml_Zip.bs.js";
import * as JsonStrict$OptolithClient from "./JsonStrict.bs.js";
import * as Ley_IntMap$OptolithClient from "../Data/Ley_IntMap.bs.js";
import * as Ley_Option$OptolithClient from "../Data/Ley_Option.bs.js";

function categoryL10n(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json)
        };
}

function categoryUniv(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          primaryPatronCultures: JsonStrict$OptolithClient.field("primaryPatronCultures", (function (param) {
                  return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                }), json)
        };
}

function category(univ, l10n) {
  return {
          id: univ.id,
          name: l10n.name,
          primaryPatronCultures: univ.primaryPatronCultures
        };
}

function tL10n(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          name: JsonStrict$OptolithClient.field("name", JsonStrict$OptolithClient.string, json)
        };
}

function tUniv(json) {
  return {
          id: JsonStrict$OptolithClient.field("id", JsonStrict$OptolithClient.$$int, json),
          category: JsonStrict$OptolithClient.field("category", JsonStrict$OptolithClient.$$int, json),
          skills: JsonStrict$OptolithClient.field("skills", (function (param) {
                  return JsonStrict$OptolithClient.tuple3(JsonStrict$OptolithClient.$$int, JsonStrict$OptolithClient.$$int, JsonStrict$OptolithClient.$$int, param);
                }), json),
          limitedToCultures: JsonStrict$OptolithClient.field("limitedToCultures", (function (param) {
                  return JsonStrict$OptolithClient.list(JsonStrict$OptolithClient.$$int, param);
                }), json),
          isLimitedToCulturesReverse: JsonStrict$OptolithClient.optionalField("isLimitedToCulturesReverse", JsonStrict$OptolithClient.bool, json)
        };
}

function t(univ, l10n) {
  return [
          univ.id,
          {
            id: univ.id,
            name: l10n.name,
            category: univ.category,
            skills: univ.skills,
            limitedToCultures: univ.limitedToCultures,
            isLimitedToCulturesReverse: Ley_Option$OptolithClient.fromOption(false, univ.isLimitedToCulturesReverse)
          }
        ];
}

function all(yamlData) {
  return Curry._1(Ley_IntMap$OptolithClient.fromList, Yaml_Zip$OptolithClient.zipBy(Ley_Int$OptolithClient.show, t, (function (x) {
                    return x.id;
                  }), (function (x) {
                    return x.id;
                  }), JsonStrict$OptolithClient.list(tUniv, yamlData.patronsUniv), JsonStrict$OptolithClient.list(tL10n, yamlData.patronsL10n)));
}

var Decode = {
  categoryL10n: categoryL10n,
  categoryUniv: categoryUniv,
  category: category,
  tL10n: tL10n,
  tUniv: tUniv,
  t: t,
  all: all
};

export {
  Decode ,
  
}
/* Ley_IntMap-OptolithClient Not a pure module */