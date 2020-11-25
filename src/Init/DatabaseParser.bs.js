// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Yaml = require("yaml");
var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Item$OptolithClient = require("../Equipment/Item.bs.js");
var Pact$OptolithClient = require("../Misc/Pact.bs.js");
var Race$OptolithClient = require("../RaceCultureProfession/Race.bs.js");
var Curse$OptolithClient = require("../Increasable/Curse.bs.js");
var Skill$OptolithClient = require("../Increasable/Skill.bs.js");
var Spell$OptolithClient = require("../Increasable/Spell.bs.js");
var State$OptolithClient = require("../Misc/State.bs.js");
var IdName$OptolithClient = require("../Misc/IdName.bs.js");
var Script$OptolithClient = require("../Misc/Script.bs.js");
var Cantrip$OptolithClient = require("../Activatable/Cantrip.bs.js");
var Culture$OptolithClient = require("../RaceCultureProfession/Culture.bs.js");
var Blessing$OptolithClient = require("../Activatable/Blessing.bs.js");
var CoreRule$OptolithClient = require("../Rules/CoreRule.bs.js");
var Language$OptolithClient = require("../Misc/Language.bs.js");
var Ley_List$OptolithClient = require("../Data/Ley_List.bs.js");
var Advantage$OptolithClient = require("../Activatable/Advantage.bs.js");
var Attribute$OptolithClient = require("../Increasable/Attribute.bs.js");
var Condition$OptolithClient = require("../Misc/Condition.bs.js");
var FocusRule$OptolithClient = require("../Rules/FocusRule.bs.js");
var Curriculum$OptolithClient = require("../RaceCultureProfession/Curriculum.bs.js");
var Ley_IntMap$OptolithClient = require("../Data/Ley_IntMap.bs.js");
var Ley_Option$OptolithClient = require("../Data/Ley_Option.bs.js");
var Profession$OptolithClient = require("../RaceCultureProfession/Profession.bs.js");
var RogueSpell$OptolithClient = require("../Increasable/RogueSpell.bs.js");
var SkillGroup$OptolithClient = require("../Increasable/SkillGroup.bs.js");
var AnimalShape$OptolithClient = require("../Activatable/AnimalShape.bs.js");
var GeodeRitual$OptolithClient = require("../Increasable/GeodeRitual.bs.js");
var Publication$OptolithClient = require("../Sources/Publication.bs.js");
var TradeSecret$OptolithClient = require("../Misc/TradeSecret.bs.js");
var AnimistForce$OptolithClient = require("../Increasable/AnimistForce.bs.js");
var Disadvantage$OptolithClient = require("../Activatable/Disadvantage.bs.js");
var MagicalDance$OptolithClient = require("../Increasable/MagicalDance.bs.js");
var OptionalRule$OptolithClient = require("../Rules/OptionalRule.bs.js");
var MagicalMelody$OptolithClient = require("../Increasable/MagicalMelody.bs.js");
var ZibiljaRitual$OptolithClient = require("../Increasable/ZibiljaRitual.bs.js");
var DatabaseReader$OptolithClient = require("./DatabaseReader.bs.js");
var SpecialAbility$OptolithClient = require("../Activatable/SpecialAbility.bs.js");
var ArcaneTradition$OptolithClient = require("../Activatable/ArcaneTradition.bs.js");
var CombatTechnique$OptolithClient = require("../Increasable/CombatTechnique.bs.js");
var ExperienceLevel$OptolithClient = require("../Misc/ExperienceLevel.bs.js");
var LiturgicalChant$OptolithClient = require("../Increasable/LiturgicalChant.bs.js");
var BlessedTradition$OptolithClient = require("../Activatable/BlessedTradition.bs.js");
var DominationRitual$OptolithClient = require("../Increasable/DominationRitual.bs.js");
var ElvenMagicalSong$OptolithClient = require("../Increasable/ElvenMagicalSong.bs.js");
var EquipmentPackage$OptolithClient = require("../Equipment/EquipmentPackage.bs.js");
var MagicalTradition$OptolithClient = require("../Activatable/MagicalTradition.bs.js");
var DerivedCharacteristic$OptolithClient = require("../Misc/DerivedCharacteristic.bs.js");
var EnhancementsSpecialAbility$OptolithClient = require("../Increasable/EnhancementsSpecialAbility.bs.js");

var Parser = {};

function idName(json) {
  return [
          Json_decode.field("id", Json_decode.$$int, json),
          Json_decode.field("name", Json_decode.string, json)
        ];
}

function idNames(json) {
  return Curry._1(Ley_IntMap$OptolithClient.fromList, Json_decode.list(idName, json));
}

function decodeFilesOfEntryType(decoder, fileContents) {
  return Curry._3(Ley_List$OptolithClient.foldl, (function (mp, fileContent) {
                return Ley_Option$OptolithClient.option(mp, (function (param) {
                              return Curry._3(Ley_IntMap$OptolithClient.insert, param[0], param[1], mp);
                            }), Curry._1(decoder, Yaml.parse(fileContent)));
              }), Ley_IntMap$OptolithClient.empty, fileContents);
}

var categoriesTotal = Curry._1(Ley_List$OptolithClient.length, DatabaseReader$OptolithClient.dirs);

var percentPerCategory = 1.0 / categoriesTotal;

function decodeFiles(onProgress, langs, messages, parsedData) {
  var animalShapes = decodeFilesOfEntryType((function (param) {
          return AnimalShape$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.animalShapes);
  Curry._1(onProgress, percentPerCategory);
  var animalShapePaths = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.animalShapePaths);
  Curry._1(onProgress, percentPerCategory * 2.0);
  var animalShapeSizes = decodeFilesOfEntryType(Curry._1(AnimalShape$OptolithClient.Size.Decode.assoc, langs), parsedData.animalShapeSizes);
  Curry._1(onProgress, percentPerCategory * 3.0);
  var animistForces = decodeFilesOfEntryType(Curry._1(AnimistForce$OptolithClient.Static.Decode.assoc, langs), parsedData.animistForces);
  Curry._1(onProgress, percentPerCategory * 4.0);
  var arcaneBardTraditions = decodeFilesOfEntryType((function (param) {
          return ArcaneTradition$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.arcaneBardTraditions);
  Curry._1(onProgress, percentPerCategory * 5.0);
  var arcaneDancerTraditions = decodeFilesOfEntryType((function (param) {
          return ArcaneTradition$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.arcaneDancerTraditions);
  Curry._1(onProgress, percentPerCategory * 6.0);
  var armorTypes = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.armorTypes);
  Curry._1(onProgress, percentPerCategory * 7.0);
  var aspects = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.aspects);
  Curry._1(onProgress, percentPerCategory * 8.0);
  var attributes = decodeFilesOfEntryType(Curry._1(Attribute$OptolithClient.Static.Decode.assoc, langs), parsedData.attributes);
  Curry._1(onProgress, percentPerCategory * 9.0);
  var blessedTraditions = decodeFilesOfEntryType((function (param) {
          return BlessedTradition$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.blessedTraditions);
  Curry._1(onProgress, percentPerCategory * 10.0);
  var blessings = decodeFilesOfEntryType(Curry._1(Blessing$OptolithClient.Static.Decode.assoc, langs), parsedData.blessings);
  Curry._1(onProgress, percentPerCategory * 11.0);
  var brews = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.brews);
  Curry._1(onProgress, percentPerCategory * 12.0);
  var cantrips = decodeFilesOfEntryType(Curry._1(Cantrip$OptolithClient.Static.Decode.assoc, langs), parsedData.cantrips);
  Curry._1(onProgress, percentPerCategory * 13.0);
  var combatSpecialAbilityGroups = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.combatSpecialAbilityGroups);
  Curry._1(onProgress, percentPerCategory * 14.0);
  var combatTechniqueGroups = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.combatTechniqueGroups);
  Curry._1(onProgress, percentPerCategory * 15.0);
  var combatTechniques = decodeFilesOfEntryType(Curry._1(CombatTechnique$OptolithClient.Static.Decode.assoc, langs), parsedData.combatTechniques);
  Curry._1(onProgress, percentPerCategory * 16.0);
  var conditions = decodeFilesOfEntryType(Curry._1(Condition$OptolithClient.Static.Decode.assoc, langs), parsedData.conditions);
  Curry._1(onProgress, percentPerCategory * 17.0);
  var coreRules = decodeFilesOfEntryType((function (param) {
          return CoreRule$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.coreRules);
  Curry._1(onProgress, percentPerCategory * 18.0);
  var cultures = decodeFilesOfEntryType(Curry._1(Culture$OptolithClient.Static.Decode.assoc, langs), parsedData.cultures);
  Curry._1(onProgress, percentPerCategory * 19.0);
  var curricula = decodeFilesOfEntryType(Curry._1(Curriculum$OptolithClient.Static.Decode.assoc, langs), parsedData.curricula);
  Curry._1(onProgress, percentPerCategory * 20.0);
  var curses = decodeFilesOfEntryType(Curry._1(Curse$OptolithClient.Static.Decode.assoc, langs), parsedData.curses);
  Curry._1(onProgress, percentPerCategory * 21.0);
  var derivedCharacteristics = decodeFilesOfEntryType(Curry._1(DerivedCharacteristic$OptolithClient.Static.Decode.assoc, langs), parsedData.derivedCharacteristics);
  Curry._1(onProgress, percentPerCategory * 22.0);
  var dominationRituals = decodeFilesOfEntryType(Curry._1(DominationRitual$OptolithClient.Static.Decode.assoc, langs), parsedData.dominationRituals);
  Curry._1(onProgress, percentPerCategory * 23.0);
  var elvenMagicalSongs = decodeFilesOfEntryType(Curry._1(ElvenMagicalSong$OptolithClient.Static.Decode.assoc, langs), parsedData.elvenMagicalSongs);
  Curry._1(onProgress, percentPerCategory * 24.0);
  var items = decodeFilesOfEntryType((function (param) {
          return Item$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.items);
  Curry._1(onProgress, percentPerCategory * 25.0);
  var equipmentGroups = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.equipmentGroups);
  Curry._1(onProgress, percentPerCategory * 26.0);
  var equipmentPackages = decodeFilesOfEntryType((function (param) {
          return EquipmentPackage$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.equipmentPackages);
  Curry._1(onProgress, percentPerCategory * 27.0);
  var experienceLevels = decodeFilesOfEntryType((function (param) {
          return ExperienceLevel$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.experienceLevels);
  Curry._1(onProgress, percentPerCategory * 28.0);
  var eyeColors = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.eyeColors);
  Curry._1(onProgress, percentPerCategory * 29.0);
  var focusRules = decodeFilesOfEntryType(Curry._1(FocusRule$OptolithClient.Static.Decode.assoc, langs), parsedData.focusRules);
  Curry._1(onProgress, percentPerCategory * 30.0);
  var geodeRituals = decodeFilesOfEntryType(Curry._1(GeodeRitual$OptolithClient.Static.Decode.assoc, langs), parsedData.geodeRituals);
  Curry._1(onProgress, percentPerCategory * 31.0);
  var hairColors = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.hairColors);
  Curry._1(onProgress, percentPerCategory * 32.0);
  var languages = decodeFilesOfEntryType((function (param) {
          return Language$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.languages);
  Curry._1(onProgress, percentPerCategory * 33.0);
  var liturgicalChantGroups = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.liturgicalChantGroups);
  Curry._1(onProgress, percentPerCategory * 34.0);
  var liturgicalChants = decodeFilesOfEntryType(Curry._1(LiturgicalChant$OptolithClient.Static.Decode.assoc, langs), parsedData.liturgicalChants);
  Curry._1(onProgress, percentPerCategory * 35.0);
  var liturgicalChantEnhancements = EnhancementsSpecialAbility$OptolithClient.liturgicalChantsToSpecialAbilityOptions(liturgicalChants);
  Curry._1(onProgress, percentPerCategory * 36.0);
  var magicalDances = decodeFilesOfEntryType(Curry._1(MagicalDance$OptolithClient.Static.Decode.assoc, langs), parsedData.magicalDances);
  Curry._1(onProgress, percentPerCategory * 37.0);
  var magicalMelodies = decodeFilesOfEntryType(Curry._1(MagicalMelody$OptolithClient.Static.Decode.assoc, langs), parsedData.magicalMelodies);
  Curry._1(onProgress, percentPerCategory * 38.0);
  var magicalTraditions = decodeFilesOfEntryType((function (param) {
          return MagicalTradition$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.magicalTraditions);
  Curry._1(onProgress, percentPerCategory * 39.0);
  var optionalRules = decodeFilesOfEntryType(Curry._1(OptionalRule$OptolithClient.Static.Decode.assoc, langs), parsedData.optionalRules);
  Curry._1(onProgress, percentPerCategory * 40.0);
  var pacts = decodeFilesOfEntryType(Curry._1(Pact$OptolithClient.Static.Decode.assoc, langs), parsedData.pacts);
  Curry._1(onProgress, percentPerCategory * 41.0);
  var professions = decodeFilesOfEntryType(Curry._1(Profession$OptolithClient.Static.Decode.assoc, langs), parsedData.professions);
  Curry._1(onProgress, percentPerCategory * 42.0);
  var properties = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.properties);
  Curry._1(onProgress, percentPerCategory * 43.0);
  var publications = decodeFilesOfEntryType((function (param) {
          return Publication$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.publications);
  Curry._1(onProgress, percentPerCategory * 44.0);
  var races = decodeFilesOfEntryType(Curry._1(Race$OptolithClient.Static.Decode.assoc, langs), parsedData.races);
  Curry._1(onProgress, percentPerCategory * 45.0);
  var reaches = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.reaches);
  Curry._1(onProgress, percentPerCategory * 46.0);
  var rogueSpells = decodeFilesOfEntryType(Curry._1(RogueSpell$OptolithClient.Static.Decode.assoc, langs), parsedData.rogueSpells);
  Curry._1(onProgress, percentPerCategory * 47.0);
  var scripts = decodeFilesOfEntryType((function (param) {
          return Script$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.scripts);
  Curry._1(onProgress, percentPerCategory * 48.0);
  var skillGroups = decodeFilesOfEntryType((function (param) {
          return SkillGroup$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.skillGroups);
  Curry._1(onProgress, percentPerCategory * 49.0);
  var skills = decodeFilesOfEntryType(Curry._1(Skill$OptolithClient.Static.Decode.assoc, langs), parsedData.skills);
  Curry._1(onProgress, percentPerCategory * 50.0);
  var socialStatuses = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.socialStatuses);
  Curry._1(onProgress, percentPerCategory * 51.0);
  var specialAbilityGroups = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.specialAbilityGroups);
  Curry._1(onProgress, percentPerCategory * 52.0);
  var spellGroups = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.spellGroups);
  Curry._1(onProgress, percentPerCategory * 53.0);
  var spells = decodeFilesOfEntryType(Curry._1(Spell$OptolithClient.Static.Decode.assoc, langs), parsedData.spells);
  Curry._1(onProgress, percentPerCategory * 54.0);
  var spellEnhancements = EnhancementsSpecialAbility$OptolithClient.spellsToSpecialAbilityOptions(spells);
  Curry._1(onProgress, percentPerCategory * 55.0);
  var states = decodeFilesOfEntryType(Curry._1(State$OptolithClient.Static.Decode.assoc, langs), parsedData.states);
  Curry._1(onProgress, percentPerCategory * 56.0);
  var subjects = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.subjects);
  Curry._1(onProgress, percentPerCategory * 57.0);
  var tradeSecrets = decodeFilesOfEntryType((function (param) {
          return TradeSecret$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.tradeSecrets);
  Curry._1(onProgress, percentPerCategory * 58.0);
  var tribes = decodeFilesOfEntryType((function (param) {
          return IdName$OptolithClient.Decode.assoc(langs, param);
        }), parsedData.tribes);
  Curry._1(onProgress, percentPerCategory * 59.0);
  var zibiljaRituals = decodeFilesOfEntryType(Curry._1(ZibiljaRitual$OptolithClient.Static.Decode.assoc, langs), parsedData.zibiljaRituals);
  Curry._1(onProgress, percentPerCategory * 60.0);
  var advantages = decodeFilesOfEntryType(Curry.app(Advantage$OptolithClient.Static.Decode.assoc, [
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
            langs
          ]), parsedData.advantages);
  Curry._1(onProgress, percentPerCategory * 61.0);
  var disadvantages = decodeFilesOfEntryType(Curry.app(Disadvantage$OptolithClient.Static.Decode.assoc, [
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
            langs
          ]), parsedData.disadvantages);
  Curry._1(onProgress, percentPerCategory * 62.0);
  var baseSpecialAbilities = decodeFilesOfEntryType(Curry.app(SpecialAbility$OptolithClient.Static.Decode.assoc, [
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
            langs
          ]), parsedData.specialAbilities);
  var specialAbilities = Curry._1(SpecialAbility$OptolithClient.Static.Decode.modifyParsed, baseSpecialAbilities);
  Curry._1(onProgress, percentPerCategory * 63.0);
  return {
          advantages: advantages,
          animalShapes: animalShapes,
          animalShapePaths: animalShapePaths,
          animalShapeSizes: animalShapeSizes,
          animistForces: animistForces,
          arcaneBardTraditions: arcaneBardTraditions,
          arcaneDancerTraditions: arcaneDancerTraditions,
          armorTypes: armorTypes,
          aspects: aspects,
          attributes: attributes,
          blessedTraditions: blessedTraditions,
          blessings: blessings,
          brews: brews,
          cantrips: cantrips,
          combatSpecialAbilityGroups: combatSpecialAbilityGroups,
          combatTechniqueGroups: combatTechniqueGroups,
          combatTechniques: combatTechniques,
          conditions: conditions,
          coreRules: coreRules,
          cultures: cultures,
          curricula: curricula,
          curses: curses,
          derivedCharacteristics: derivedCharacteristics,
          disadvantages: disadvantages,
          dominationRituals: dominationRituals,
          elvenMagicalSongs: elvenMagicalSongs,
          items: items,
          equipmentGroups: equipmentGroups,
          equipmentPackages: equipmentPackages,
          experienceLevels: experienceLevels,
          eyeColors: eyeColors,
          focusRules: focusRules,
          geodeRituals: geodeRituals,
          hairColors: hairColors,
          languages: languages,
          liturgicalChantEnhancements: liturgicalChantEnhancements,
          liturgicalChantGroups: liturgicalChantGroups,
          liturgicalChants: liturgicalChants,
          magicalDances: magicalDances,
          magicalMelodies: magicalMelodies,
          magicalTraditions: magicalTraditions,
          messages: messages,
          optionalRules: optionalRules,
          pacts: pacts,
          professions: professions,
          properties: properties,
          publications: publications,
          races: races,
          reaches: reaches,
          rogueSpells: rogueSpells,
          scripts: scripts,
          skillGroups: skillGroups,
          skills: skills,
          socialStatuses: socialStatuses,
          specialAbilities: specialAbilities,
          specialAbilityGroups: specialAbilityGroups,
          spellEnhancements: spellEnhancements,
          spellGroups: spellGroups,
          spells: spells,
          states: states,
          subjects: subjects,
          tradeSecrets: tradeSecrets,
          tribes: tribes,
          zibiljaRituals: zibiljaRituals
        };
}

var IM;

exports.IM = IM;
exports.Parser = Parser;
exports.idName = idName;
exports.idNames = idNames;
exports.decodeFilesOfEntryType = decodeFilesOfEntryType;
exports.categoriesTotal = categoriesTotal;
exports.percentPerCategory = percentPerCategory;
exports.decodeFiles = decodeFiles;
/* categoriesTotal Not a pure module */
