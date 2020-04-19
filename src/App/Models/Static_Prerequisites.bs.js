// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var JsonStrict$OptolithClient = require("../Utilities/YAML/JsonStrict.bs.js");

function partial_arg_000(param) {
  return Json_decode.map((function (id) {
                return /* One */Block.__(0, [id]);
              }), Json_decode.$$int, param);
}

var partial_arg_001 = /* :: */[
  (function (param) {
      return Json_decode.map((function (id) {
                    return /* Many */Block.__(1, [id]);
                  }), (function (param) {
                    return Json_decode.list(Json_decode.$$int, param);
                  }), param);
    }),
  /* [] */0
];

var partial_arg = /* :: */[
  partial_arg_000,
  partial_arg_001
];

function oneOrManyInt(param) {
  return Json_decode.oneOf(partial_arg, param);
}

function sex(json) {
  var str = Json_decode.string(json);
  switch (str) {
    case "f" :
        return /* Female */1;
    case "m" :
        return /* Male */0;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown sex prerequisite: " + str
          ];
  }
}

function partial_arg_000$1(json) {
  return {
          id: Curry._1(oneOrManyInt, json),
          active: true
        };
}

var partial_arg_001$1 = /* :: */[
  (function (json) {
      return {
              id: Json_decode.field("id", oneOrManyInt, json),
              active: Json_decode.field("active", Json_decode.bool, json)
            };
    }),
  /* [] */0
];

var partial_arg$1 = /* :: */[
  partial_arg_000$1,
  partial_arg_001$1
];

function race(param) {
  return Json_decode.oneOf(partial_arg$1, param);
}

function primaryAttribute(json) {
  var str = Json_decode.field("type", Json_decode.string, json);
  var tmp;
  switch (str) {
    case "blessed" :
        tmp = /* Blessed */1;
        break;
    case "magical" :
        tmp = /* Magical */0;
        break;
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown primary attribute type: " + str
          ];
  }
  return {
          value: Json_decode.field("value", Json_decode.$$int, json),
          scope: tmp
        };
}

function pact(json) {
  return {
          category: Json_decode.field("category", Json_decode.$$int, json),
          domain: Json_decode.field("domain", (function (param) {
                  return JsonStrict$OptolithClient.maybe(oneOrManyInt, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Advantage" :
        return /* Advantage */Block.__(0, [Json_decode.$$int(json)]);
    case "Disadvantage" :
        return /* Disadvantage */Block.__(1, [Json_decode.$$int(json)]);
    case "SpecialAbility" :
        return /* SpecialAbility */Block.__(2, [Json_decode.$$int(json)]);
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown activatable ID scope: " + scope
          ];
  }
}

function scopedSelectOptionId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Blessing" :
        return /* Blessing */Block.__(6, [Json_decode.$$int(json)]);
    case "Cantrip" :
        return /* Cantrip */Block.__(4, [Json_decode.$$int(json)]);
    case "CombatTechnique" :
        return /* CombatTechnique */Block.__(2, [Json_decode.$$int(json)]);
    case "LiturgicalChant" :
        return /* LiturgicalChant */Block.__(5, [Json_decode.$$int(json)]);
    case "Skill" :
        return /* Skill */Block.__(1, [Json_decode.$$int(json)]);
    case "Spell" :
        return /* Spell */Block.__(3, [Json_decode.$$int(json)]);
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown select option ID scope: " + scope
          ];
  }
}

function selectOptionId(json) {
  return Json_decode.oneOf(/* :: */[
              (function (param) {
                  return Json_decode.map((function (x) {
                                return /* Generic */Block.__(0, [x]);
                              }), Json_decode.$$int, param);
                }),
              /* :: */[
                scopedSelectOptionId,
                /* [] */0
              ]
            ], json);
}

function activatable(json) {
  return {
          id: Json_decode.field("id", activatableId, json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableMultiEntry(json) {
  return {
          id: Json_decode.field("id", (function (param) {
                  return Json_decode.list(activatableId, param);
                }), json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("level", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableMultiSelect(json) {
  return {
          id: Json_decode.field("id", activatableId, json),
          active: Json_decode.field("active", Json_decode.bool, json),
          sid: Json_decode.field("sid", (function (param) {
                  return Json_decode.list(selectOptionId, param);
                }), json),
          sid2: Json_decode.field("sid2", (function (param) {
                  return JsonStrict$OptolithClient.maybe(selectOptionId, param);
                }), json),
          level: Json_decode.field("tier", (function (param) {
                  return JsonStrict$OptolithClient.maybe(Json_decode.$$int, param);
                }), json)
        };
}

function activatableSkillId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "LiturgicalChant" :
        return /* LiturgicalChant */Block.__(1, [Json_decode.$$int(json)]);
    case "Spell" :
        return /* Spell */Block.__(0, [Json_decode.$$int(json)]);
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown activatable skill ID scope: " + scope
          ];
  }
}

function activatableSkill(json) {
  return {
          id: Json_decode.field("id", activatableSkillId, json),
          active: Json_decode.field("active", Json_decode.bool, json)
        };
}

function increasableId(json) {
  var scope = Json_decode.field("scope", Json_decode.string, json);
  switch (scope) {
    case "Attribute" :
        return /* Attribute */Block.__(0, [Json_decode.$$int(json)]);
    case "CombatTechnique" :
        return /* CombatTechnique */Block.__(2, [Json_decode.$$int(json)]);
    case "LiturgicalChant" :
        return /* LiturgicalChant */Block.__(4, [Json_decode.$$int(json)]);
    case "Skill" :
        return /* Skill */Block.__(1, [Json_decode.$$int(json)]);
    case "Spell" :
        return /* Spell */Block.__(3, [Json_decode.$$int(json)]);
    default:
      throw [
            Json_decode.DecodeError,
            "Unknown increasable ID scope: " + scope
          ];
  }
}

function increasable(json) {
  return {
          id: Json_decode.field("id", increasableId, json),
          value: Json_decode.field("value", Json_decode.$$int, json)
        };
}

function increasableMultiEntry(json) {
  return {
          id: Json_decode.field("id", (function (param) {
                  return Json_decode.list(increasableId, param);
                }), json),
          value: Json_decode.field("value", Json_decode.$$int, json)
        };
}

function replacementAtIndex(json) {
  return /* tuple */[
          Json_decode.field("index", Json_decode.$$int, json),
          Json_decode.field("replacement", Json_decode.string, json)
        ];
}

function tIndexL10n(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.string, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.string, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.string, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.string, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.string, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.string, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json)
        };
}

function tIndexL10nAtLevel(json) {
  return /* tuple */[
          Json_decode.field("level", Json_decode.$$int, json),
          Json_decode.field("hide", tIndexL10n, json)
        ];
}

function tIndexWithLevelL10n(json) {
  return {
          sex: JsonStrict$OptolithClient.optionalField("sexPrerequisite", Json_decode.string, json),
          race: JsonStrict$OptolithClient.optionalField("racePrerequisite", Json_decode.string, json),
          culture: JsonStrict$OptolithClient.optionalField("culturePrerequisite", Json_decode.string, json),
          pact: JsonStrict$OptolithClient.optionalField("pactPrerequisite", Json_decode.string, json),
          social: JsonStrict$OptolithClient.optionalField("socialStatusPrerequisite", Json_decode.string, json),
          primaryAttribute: JsonStrict$OptolithClient.optionalField("primaryAttributePrerequisite", Json_decode.string, json),
          activatable: JsonStrict$OptolithClient.optionalField("activatablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiEntry: JsonStrict$OptolithClient.optionalField("activatableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          activatableMultiSelect: JsonStrict$OptolithClient.optionalField("activatableMultiSelectPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasable: JsonStrict$OptolithClient.optionalField("increasablePrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          increasableMultiEntry: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(replacementAtIndex, param);
                }), json),
          levels: JsonStrict$OptolithClient.optionalField("increasableMultiEntryPrerequisites", (function (param) {
                  return Json_decode.list(tIndexL10nAtLevel, param);
                }), json)
        };
}

var Decode = {
  oneOrManyInt: oneOrManyInt,
  sex: sex,
  race: race,
  culture: oneOrManyInt,
  primaryAttribute: primaryAttribute,
  pact: pact,
  socialStatus: Json_decode.$$int,
  activatableId: activatableId,
  scopedSelectOptionId: scopedSelectOptionId,
  selectOptionId: selectOptionId,
  activatable: activatable,
  activatableMultiEntry: activatableMultiEntry,
  activatableMultiSelect: activatableMultiSelect,
  activatableSkillId: activatableSkillId,
  activatableSkill: activatableSkill,
  increasableId: increasableId,
  increasable: increasable,
  increasableMultiEntry: increasableMultiEntry,
  replacementAtIndex: replacementAtIndex,
  tIndexL10n: tIndexL10n,
  tIndexL10nAtLevel: tIndexL10nAtLevel,
  tIndexWithLevelL10n: tIndexWithLevelL10n
};

exports.Decode = Decode;
/* No side effect */
