// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Int$OptolithClient = require("../../Data/Int.bs.js");
var ListH$OptolithClient = require("../../Data/ListH.bs.js");
var Maybe$OptolithClient = require("../../Data/Maybe.bs.js");
var IntMap$OptolithClient = require("../../Data/IntMap.bs.js");
var Data_Map$OptolithClient = require("../../Data/Data_Map.bs.js");
var Function$OptolithClient = require("../../Data/Function.bs.js");
var JsonStrict$OptolithClient = require("../Utilities/JsonStrict.bs.js");
var Static_Erratum$OptolithClient = require("./Static_Erratum.bs.js");
var Static_SourceRef$OptolithClient = require("./Static_SourceRef.bs.js");
var Static_Prerequisites$OptolithClient = require("./Static_Prerequisites.bs.js");

function outerToInt(id) {
  var variant = id.NAME;
  if (variant === "Cantrip") {
    return 5;
  } else if (variant === "LiturgicalChant") {
    return 6;
  } else if (variant === "Generic") {
    return 1;
  } else if (variant === "Skill") {
    return 2;
  } else if (variant === "Spell") {
    return 4;
  } else if (variant === "Blessing") {
    return 7;
  } else {
    return 3;
  }
}

function compare(x, y) {
  var x$prime = outerToInt(x);
  var y$prime = outerToInt(y);
  if (x$prime === y$prime) {
    return x.VAL - y.VAL | 0;
  } else {
    return x$prime - y$prime | 0;
  }
}

var Ord = {
  compare: compare
};

function showId(id) {
  var variant = id.NAME;
  if (variant === "Cantrip") {
    return "Cantrip(" + (Int$OptolithClient.show(id.VAL) + ")");
  } else if (variant === "LiturgicalChant") {
    return "LiturgicalChant(" + (Int$OptolithClient.show(id.VAL) + ")");
  } else if (variant === "Generic") {
    return "Generic(" + (Int$OptolithClient.show(id.VAL) + ")");
  } else if (variant === "Skill") {
    return "Skill(" + (Int$OptolithClient.show(id.VAL) + ")");
  } else if (variant === "Spell") {
    return "Spell(" + (Int$OptolithClient.show(id.VAL) + ")");
  } else if (variant === "Blessing") {
    return "Blessing(" + (Int$OptolithClient.show(id.VAL) + ")");
  } else {
    return "CombatTechnique(" + (Int$OptolithClient.show(id.VAL) + ")");
  }
}

var SelectOptionMap = Data_Map$OptolithClient.Make(Ord);

function tL10n(json) {
  return {
          id: Json_decode.field("id", Static_Prerequisites$OptolithClient.Decode.selectOptionId, json),
          name: Json_decode.field("name", Json_decode.string, json),
          description: JsonStrict$OptolithClient.optionalField("description", Json_decode.string, json),
          specializations: JsonStrict$OptolithClient.optionalField("specializations", (function (param) {
                  return Json_decode.list(Json_decode.string, param);
                }), json),
          specializationInput: JsonStrict$OptolithClient.optionalField("specializationInput", Json_decode.string, json),
          src: Json_decode.field("src", Static_SourceRef$OptolithClient.Decode.list, json),
          errata: Json_decode.field("errata", Static_Erratum$OptolithClient.Decode.list, json)
        };
}

function tUniv(json) {
  return {
          id: Json_decode.field("id", Static_Prerequisites$OptolithClient.Decode.selectOptionId, json),
          cost: JsonStrict$OptolithClient.optionalField("cost", Json_decode.$$int, json),
          prerequisites: Static_Prerequisites$OptolithClient.Decode.t(json),
          isSecret: JsonStrict$OptolithClient.optionalField("isSecret", Json_decode.bool, json),
          languages: JsonStrict$OptolithClient.optionalField("languages", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json),
          continent: JsonStrict$OptolithClient.optionalField("continent", Json_decode.$$int, json),
          isExtinct: JsonStrict$OptolithClient.optionalField("isExtinct", Json_decode.bool, json),
          animalGr: JsonStrict$OptolithClient.optionalField("animalGr", Json_decode.$$int, json),
          animalLevel: JsonStrict$OptolithClient.optionalField("animalLevel", Json_decode.$$int, json)
        };
}

function t(univ, l10n) {
  return {
          id: univ.id,
          name: l10n.name,
          cost: univ.cost,
          prerequisites: univ.prerequisites,
          description: l10n.description,
          isSecret: univ.isSecret,
          languages: univ.languages,
          continent: univ.continent,
          isExtinct: univ.isExtinct,
          specializations: l10n.specializations,
          specializationInput: l10n.specializationInput,
          animalGr: univ.animalGr,
          animalLevel: univ.animalLevel,
          target: /* Nothing */0,
          wikiEntry: /* Nothing */0,
          src: l10n.src,
          errata: l10n.errata
        };
}

function category(json) {
  var str = Json_decode.string(json);
  switch (str) {
    case "BLESSINGS" :
        return /* Blessings */0;
    case "CANTRIPS" :
        return /* Cantrips */1;
    case "COMBAT_TECHNIQUES" :
        return /* CombatTechniques */2;
    case "LITURGICAL_CHANTS" :
        return /* LiturgicalChants */3;
    case "SKILLS" :
        return /* Skills */4;
    case "SPELLS" :
        return /* Spells */5;
    default:
      throw {
            RE_EXN_ID: Json_decode.DecodeError,
            _1: "Unknown select option category: " + str,
            Error: new Error()
          };
  }
}

function categoryWithGroups(json) {
  return {
          category: Json_decode.field("category", category, json),
          groups: JsonStrict$OptolithClient.optionalField("groups", (function (param) {
                  return Json_decode.list(Json_decode.$$int, param);
                }), json)
        };
}

function entryToSelectOption(id, name, wikiEntry, src, errata) {
  return {
          id: id,
          name: name,
          cost: /* Nothing */0,
          prerequisites: Static_Prerequisites$OptolithClient.empty,
          description: /* Nothing */0,
          isSecret: /* Nothing */0,
          languages: /* Nothing */0,
          continent: /* Nothing */0,
          isExtinct: /* Nothing */0,
          specializations: /* Nothing */0,
          specializationInput: /* Nothing */0,
          animalGr: /* Nothing */0,
          animalLevel: /* Nothing */0,
          target: /* Nothing */0,
          wikiEntry: /* Just */{
            _0: wikiEntry
          },
          src: src,
          errata: errata
        };
}

function insertEntry(s) {
  return Curry._2(SelectOptionMap.insert, s.id, s);
}

function resolveWithoutGroups(f, mp, xs) {
  return Curry._3(IntMap$OptolithClient.Foldable.foldr, (function (x) {
                var s = Curry._1(f, x);
                return Curry._2(SelectOptionMap.insert, s.id, s);
              }), xs, mp);
}

function resolveGroups(f, g, grs, mp, xs) {
  return Curry._3(IntMap$OptolithClient.Foldable.foldr, (function (x) {
                if (!ListH$OptolithClient.Foldable.elem(Curry._1(g, x), grs)) {
                  return Function$OptolithClient.id;
                }
                var s = Curry._1(f, x);
                return Curry._2(SelectOptionMap.insert, s.id, s);
              }), xs, mp);
}

function blessingToSelectOption(x) {
  return entryToSelectOption({
              NAME: "Blessing",
              VAL: x.id
            }, x.name, {
              TAG: /* Blessing */0,
              _0: x
            }, x.src, x.errata);
}

function resolveBlessings(param, param$1) {
  return resolveWithoutGroups(blessingToSelectOption, param, param$1);
}

function cantripToSelectOption(x) {
  return entryToSelectOption({
              NAME: "Cantrip",
              VAL: x.id
            }, x.name, {
              TAG: /* Cantrip */1,
              _0: x
            }, x.src, x.errata);
}

function resolveCantrips(param, param$1) {
  return resolveWithoutGroups(cantripToSelectOption, param, param$1);
}

function combatTechniqueToSelectOption(x) {
  return entryToSelectOption({
              NAME: "CombatTechnique",
              VAL: x.id
            }, x.name, {
              TAG: /* CombatTechnique */2,
              _0: x
            }, x.src, x.errata);
}

function resolveCombatTechniques(mgrs) {
  if (!mgrs) {
    return function (param, param$1) {
      return resolveWithoutGroups(combatTechniqueToSelectOption, param, param$1);
    };
  }
  var grs = mgrs._0;
  return function (param, param$1) {
    return resolveGroups(combatTechniqueToSelectOption, (function (x) {
                  return x.gr;
                }), grs, param, param$1);
  };
}

function liturgicalChantToSelectOption(x) {
  return entryToSelectOption({
              NAME: "LiturgicalChant",
              VAL: x.id
            }, x.name, {
              TAG: /* LiturgicalChant */3,
              _0: x
            }, x.src, x.errata);
}

function resolveLiturgicalChants(mgrs) {
  if (!mgrs) {
    return function (param, param$1) {
      return resolveWithoutGroups(liturgicalChantToSelectOption, param, param$1);
    };
  }
  var grs = mgrs._0;
  return function (param, param$1) {
    return resolveGroups(liturgicalChantToSelectOption, (function (x) {
                  return x.gr;
                }), grs, param, param$1);
  };
}

function skillToSelectOption(x) {
  return entryToSelectOption({
              NAME: "Skill",
              VAL: x.id
            }, x.name, {
              TAG: /* Skill */4,
              _0: x
            }, x.src, x.errata);
}

function resolveSkills(mgrs) {
  if (!mgrs) {
    return function (param, param$1) {
      return resolveWithoutGroups(skillToSelectOption, param, param$1);
    };
  }
  var grs = mgrs._0;
  return function (param, param$1) {
    return resolveGroups(skillToSelectOption, (function (x) {
                  return x.gr;
                }), grs, param, param$1);
  };
}

function spellToSelectOption(x) {
  return entryToSelectOption({
              NAME: "Spell",
              VAL: x.id
            }, x.name, {
              TAG: /* Spell */5,
              _0: x
            }, x.src, x.errata);
}

function resolveSpells(mgrs) {
  if (!mgrs) {
    return function (param, param$1) {
      return resolveWithoutGroups(spellToSelectOption, param, param$1);
    };
  }
  var grs = mgrs._0;
  return function (param, param$1) {
    return resolveGroups(spellToSelectOption, (function (x) {
                  return x.gr;
                }), grs, param, param$1);
  };
}

function resolveCategories(blessings, cantrips, combatTechniques, liturgicalChants, skills, spells, categories) {
  return ListH$OptolithClient.Foldable.foldr((function (cat) {
                var match = cat.category;
                switch (match) {
                  case /* Blessings */0 :
                      return function (param) {
                        return resolveBlessings(blessings, param);
                      };
                  case /* Cantrips */1 :
                      return function (param) {
                        return resolveCantrips(cantrips, param);
                      };
                  case /* CombatTechniques */2 :
                      var partial_arg = resolveCombatTechniques(cat.groups);
                      return function (param) {
                        return partial_arg(combatTechniques, param);
                      };
                  case /* LiturgicalChants */3 :
                      var partial_arg$1 = resolveLiturgicalChants(cat.groups);
                      return function (param) {
                        return partial_arg$1(liturgicalChants, param);
                      };
                  case /* Skills */4 :
                      var partial_arg$2 = resolveSkills(cat.groups);
                      return function (param) {
                        return partial_arg$2(skills, param);
                      };
                  case /* Spells */5 :
                      var partial_arg$3 = resolveSpells(cat.groups);
                      return function (param) {
                        return partial_arg$3(spells, param);
                      };
                  
                }
              }), SelectOptionMap.empty, Maybe$OptolithClient.fromMaybe(/* [] */0, categories));
}

function l10nToSelectOption(l10n) {
  return {
          id: l10n.id,
          name: l10n.name,
          cost: /* Nothing */0,
          prerequisites: Static_Prerequisites$OptolithClient.empty,
          description: l10n.description,
          isSecret: /* Nothing */0,
          languages: /* Nothing */0,
          continent: /* Nothing */0,
          isExtinct: /* Nothing */0,
          specializations: l10n.specializations,
          specializationInput: l10n.specializationInput,
          animalGr: /* Nothing */0,
          animalLevel: /* Nothing */0,
          target: /* Nothing */0,
          wikiEntry: /* Nothing */0,
          src: l10n.src,
          errata: l10n.errata
        };
}

function mergeUnivIntoSelectOption(univ, x) {
  return {
          id: x.id,
          name: x.name,
          cost: Maybe$OptolithClient.Alternative.$less$pipe$great(univ.cost, x.cost),
          prerequisites: univ.prerequisites,
          description: x.description,
          isSecret: Maybe$OptolithClient.Alternative.$less$pipe$great(univ.isSecret, x.isSecret),
          languages: Maybe$OptolithClient.Alternative.$less$pipe$great(univ.languages, x.languages),
          continent: Maybe$OptolithClient.Alternative.$less$pipe$great(univ.continent, x.continent),
          isExtinct: Maybe$OptolithClient.Alternative.$less$pipe$great(univ.isExtinct, x.isExtinct),
          specializations: x.specializations,
          specializationInput: x.specializationInput,
          animalGr: Maybe$OptolithClient.Alternative.$less$pipe$great(univ.animalGr, x.animalGr),
          animalLevel: Maybe$OptolithClient.Alternative.$less$pipe$great(univ.animalLevel, x.animalLevel),
          target: x.target,
          wikiEntry: x.wikiEntry,
          src: x.src,
          errata: x.errata
        };
}

function mergeSelectOptions(ml10ns, munivs, fromCategories) {
  return Curry._1(Maybe$OptolithClient.maybe(Function$OptolithClient.id, (function (univs, mp) {
                    return ListH$OptolithClient.Foldable.foldr((function (univ, mp$prime) {
                                  return Curry._3(SelectOptionMap.adjust, (function (param) {
                                                return mergeUnivIntoSelectOption(univ, param);
                                              }), univ.id, mp$prime);
                                }), mp, univs);
                  }), munivs), Curry._1(Maybe$OptolithClient.maybe(Function$OptolithClient.id, (function (l10ns, mp) {
                        return ListH$OptolithClient.Foldable.foldr((function (l10n, mp$prime) {
                                      if (Curry._2(SelectOptionMap.member, l10n.id, mp$prime)) {
                                        throw {
                                              RE_EXN_ID: Json_decode.DecodeError,
                                              _1: "mergeSelectOptions: Key " + (showId(l10n.id) + "already in use"),
                                              Error: new Error()
                                            };
                                      }
                                      return Curry._3(SelectOptionMap.insert, l10n.id, l10nToSelectOption(l10n), mp$prime);
                                    }), mp, l10ns);
                      }), ml10ns), fromCategories));
}

var Decode = {
  tL10n: tL10n,
  tUniv: tUniv,
  t: t,
  category: category,
  categoryWithGroups: categoryWithGroups,
  entryToSelectOption: entryToSelectOption,
  insertEntry: insertEntry,
  resolveWithoutGroups: resolveWithoutGroups,
  resolveGroups: resolveGroups,
  blessingToSelectOption: blessingToSelectOption,
  resolveBlessings: resolveBlessings,
  cantripToSelectOption: cantripToSelectOption,
  resolveCantrips: resolveCantrips,
  combatTechniqueToSelectOption: combatTechniqueToSelectOption,
  resolveCombatTechniques: resolveCombatTechniques,
  liturgicalChantToSelectOption: liturgicalChantToSelectOption,
  resolveLiturgicalChants: resolveLiturgicalChants,
  skillToSelectOption: skillToSelectOption,
  resolveSkills: resolveSkills,
  spellToSelectOption: spellToSelectOption,
  resolveSpells: resolveSpells,
  resolveCategories: resolveCategories,
  l10nToSelectOption: l10nToSelectOption,
  mergeUnivIntoSelectOption: mergeUnivIntoSelectOption,
  mergeSelectOptions: mergeSelectOptions
};

exports.Ord = Ord;
exports.showId = showId;
exports.SelectOptionMap = SelectOptionMap;
exports.Decode = Decode;
/* SelectOptionMap Not a pure module */
