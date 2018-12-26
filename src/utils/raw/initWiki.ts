import { IdPrefixes } from '../../constants/IdPrefixes';
import * as Raw from '../../types/rawdata';
import * as Wiki from '../../types/wiki';
import { PrimaryAttributeDamageThresholdCreator } from '../heroData/PrimaryAttributeDamageThresholdCreator';
import { prefixId as prefixId, prefixRawId } from '../IDUtils';
import { add } from '../mathUtils';
import { cons, cons_, List } from '../structures/List';
import { alt, fmap, fromNullable, Just, Maybe, Nothing } from '../structures/Maybe';
import { OrderedMap } from '../structures/OrderedMap';
import { fromBoth } from '../structures/Pair';
import { Record, StringKeyObject } from '../structures/Record';
import { createAdvantage } from '../wikiData/AdvantageCreator';
import { createAttribute } from '../wikiData/AttributeCreator';
import { createBlessing } from '../wikiData/BlessingCreator';
import { createCantrip } from '../wikiData/CantripCreator';
import { createCombatTechnique } from '../wikiData/CombatTechniqueCreator';
import { createCulture } from '../wikiData/CultureCreator';
import { createDisadvantage } from '../wikiData/DisadvantageCreator';
import { ExperienceLevelCreator } from '../wikiData/ExperienceLevelCreator';
import { ItemTemplateCreator } from '../wikiData/ItemTemplateCreator';
import { createLiturgicalChant } from '../wikiData/LiturgicalChantCreator';
import { createProfession } from '../wikiData/ProfessionCreator';
import { createProfessionVariant } from '../wikiData/ProfessionVariantCreator';
import { createRace } from '../wikiData/RaceCreator';
import { createRaceVariant } from '../wikiData/RaceVariantCreator';
import { createSkill } from '../wikiData/SkillCreator';
import { createSpecialAbility } from '../wikiData/SpecialAbilityCreator';
import { createSpell } from '../wikiData/SpellCreator';
import { createCommonProfessionObject } from '../wikiData/sub/CommonProfessionCreator';
import { createDie } from '../wikiData/sub/DieCreator';
import { createIncreaseSkill } from '../wikiData/sub/IncreaseSkillCreator';
import { createNameBySex } from '../wikiData/sub/NameBySexCreator';
import { createSourceLink } from '../wikiData/sub/SourceLinkCreator';
import { convertRawApplications, convertRawIncreaseSkills, convertRawPrerequisiteObjects, convertRawPrerequisites, convertRawProfessionDependencyObjects, convertRawProfessionPrerequisiteObjects, convertRawProfessionRequiresActivatableObject, convertRawProfessionSelections, convertRawProfessionVariantSelections, convertRawSelections, mapRawWithPrefix } from './convertRawObjectsToWikiUtils';

const getSourceBooks =
  (srcIds: string[], srcPages: number[]): List<Record<Wiki.SourceLink>> =>
    List.fromArray (srcIds .map (
      (bookId, index) => createSourceLink (bookId) (srcPages [index])
    ))

export const initExperienceLevel =
  (locale: StringKeyObject<Raw.RawExperienceLevelLocale>) =>
  (raw: Raw.RawExperienceLevel): Maybe<Record<Wiki.ExperienceLevel>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const { name } = localeObject

      return Just (ExperienceLevelCreator ({
        ...raw,
        id,
        name,
      }))
    }

    return Nothing
  }

interface SizeNew {
  sizeBase: Maybe<number>;
  sizeRandom: Maybe<List<Record<Wiki.Die>>>;
}

const convertSize = (old: (number | [number, number])[] | undefined): SizeNew =>
  old !== undefined
    ? old .reduce<SizeNew> (
      (obj, value) => {
        if (typeof value === 'number') {
          return {
            ...obj,
            sizeBase: fmap (add (value)) (obj .sizeBase),
          }
        }

        const [ amount, sides ] = value

        return {
          ...obj,
          sizeRandom: fmap (cons_ (createDie (amount) (sides))) (obj .sizeRandom),
        };
      },
      {
        sizeBase: Just (0),
        sizeRandom: Just (List.empty),
      }
    )
    : {
      sizeBase: Nothing,
      sizeRandom: Nothing,
    }

interface WeightNew {
  weightBase: number;
  weightRandom: List<Record<Wiki.Die>>;
}

const convertWeight = (old: (number | [number, number])[]): WeightNew =>
  old.reduce<WeightNew> (
    (obj, value) => {
      if (typeof value === 'number') {
        return {
          ...obj,
          weightBase: obj .weightBase + value,
        }
      }

      const [ amount, sides ] = value

      return {
        ...obj,
        weightRandom: cons (obj .weightRandom) (createDie (amount) (sides)),
      }
    },
    {
      weightBase: 0,
      weightRandom: List.empty,
    }
  )

export const initRace =
  (locale: StringKeyObject<Raw.RawRaceLocale>) =>
  (raw: Raw.RawRace): Maybe<Record<Wiki.Race>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        attributeAdjustments: attributeAdjustmentsText,
        automaticAdvantages: automaticAdvantagesText,
        commonAdvantages: commonAdvantagesText,
        commonDisadvantages: commonDisadvantagesText,
        name,
        src: srcPages,
        stronglyRecommendedAdvantages: stronglyRecommendedAdvantagesText,
        stronglyRecommendedDisadvantages: stronglyRecommendedDisadvantagesText,
        uncommonAdvantages: uncommonAdvantagesText,
        uncommonDisadvantages: uncommonDisadvantagesText,
      } = localeObject

      const {
        ap,
        attr,
        attr_sel,
        auto_adv,
        eyes,
        gs,
        hair,
        imp_adv,
        imp_dadv,
        le,
        src: srcIds,
        typ_adv,
        typ_cultures,
        typ_dadv,
        size,
        sk,
        untyp_adv,
        untyp_dadv,
        weight,
        zk,
        vars,
      } = raw

      return Just (createRace ({
        id,
        name,
        lp: le,
        spi: sk,
        tou: zk,
        mov: gs,
        ap,

        attributeAdjustments: List.fromArray (attr .map (
          e => fromBoth<string, number> (prefixId (IdPrefixes.ATTRIBUTES) (e [1]))
                                        (e [0])
        )),
        attributeAdjustmentsSelection:
          fromBoth<number, List<string>> (attr_sel [0])
                                         (List.fromArray (attr_sel [1]
                                           .map (prefixId (IdPrefixes.ATTRIBUTES))
                                         )),
        attributeAdjustmentsText,
        automaticAdvantages: List.fromArray (auto_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        automaticAdvantagesText,

        eyeColors: fmap<number[], List<number>> (List.fromArray) (fromNullable (eyes)),
        hairColors: fmap<number[], List<number>> (List.fromArray) (fromNullable (hair)),

        stronglyRecommendedAdvantages:
          List.fromArray (imp_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        stronglyRecommendedAdvantagesText,
        stronglyRecommendedDisadvantages:
          List.fromArray (imp_dadv .map (prefixRawId (IdPrefixes.DISADVANTAGES))),
        stronglyRecommendedDisadvantagesText,

        ...convertSize (size),
        ...convertWeight (weight),

        commonAdvantages: List.fromArray (typ_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        commonAdvantagesText: fromNullable (commonAdvantagesText),
        commonCultures: List.fromArray (typ_cultures .map (prefixRawId (IdPrefixes.CULTURES))),
        commonDisadvantages:
          List.fromArray (typ_dadv .map (prefixRawId (IdPrefixes.DISADVANTAGES))),
        commonDisadvantagesText: fromNullable (commonDisadvantagesText),

        uncommonAdvantages: List.fromArray (untyp_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        uncommonAdvantagesText: fromNullable (uncommonAdvantagesText),
        uncommonDisadvantages:
          List.fromArray (untyp_dadv .map (prefixRawId (IdPrefixes.DISADVANTAGES))),
        uncommonDisadvantagesText: fromNullable (uncommonDisadvantagesText),

        variants: List.fromArray (vars .map (prefixRawId (IdPrefixes.RACE_VARIANTS))),
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initRaceVariant =
  (locale: StringKeyObject<Raw.RawRaceVariantLocale>) =>
  (raw: Raw.RawRaceVariant): Maybe<Record<Wiki.RaceVariant>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        commonAdvantages: commonAdvantagesText,
        commonDisadvantages: commonDisadvantagesText,
        name,
        uncommonAdvantages: uncommonAdvantagesText,
        uncommonDisadvantages: uncommonDisadvantagesText,
      } = localeObject

      const {
        eyes,
        hair,
        typ_adv,
        typ_cultures,
        typ_dadv,
        size,
        untyp_adv,
        untyp_dadv,
      } = raw

      return Just (createRaceVariant ({
        id,
        name,

        eyeColors: fmap<number[], List<number>> (List.fromArray) (fromNullable (eyes)),
        hairColors: fmap<number[], List<number>> (List.fromArray) (fromNullable (hair)),

        ...convertSize (size),

        commonAdvantages: List.fromArray (typ_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        commonAdvantagesText: fromNullable (commonAdvantagesText),
        commonCultures: List.fromArray (typ_cultures .map (prefixRawId (IdPrefixes.CULTURES))),
        commonDisadvantages:
          List.fromArray (typ_dadv .map (prefixRawId (IdPrefixes.DISADVANTAGES))),
        commonDisadvantagesText: fromNullable (commonDisadvantagesText),

        uncommonAdvantages: List.fromArray (untyp_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        uncommonAdvantagesText: fromNullable (uncommonAdvantagesText),
        uncommonDisadvantages:
          List.fromArray (untyp_dadv .map (prefixRawId (IdPrefixes.DISADVANTAGES))),
        uncommonDisadvantagesText: fromNullable (uncommonDisadvantagesText),
      }))
    }

    return Nothing
  }

export const initCulture =
  (locale: StringKeyObject<Raw.RawCultureLocale>) =>
  (raw: Raw.RawCulture): Maybe<Record<Wiki.Culture>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        src: srcPages,
        commonAdvantages,
        commonDisadvantages,
        uncommonAdvantages,
        uncommonDisadvantages,
        commonBlessedProfessions,
        commonMagicProfessions,
        commonMundaneProfessions,
        ...localeRest
      } = localeObject

      const {
        ap,
        lang,
        literacy,
        social,
        typ_prof,
        typ_adv,
        typ_dadv,
        untyp_adv,
        untyp_dadv,
        typ_talents,
        untyp_talents,
        talents,
        src: srcIds,
      } = raw

      return Just (createCulture ({
        ...localeRest,
        culturalPackageAdventurePoints: ap,
        id,
        languages: List.fromArray (lang),
        scripts: List.fromArray (literacy),
        socialStatus: List.fromArray (social),
        culturalPackageSkills: List.fromArray (talents .map (e => createIncreaseSkill ({
          id: prefixRawId (IdPrefixes.SKILLS) (e [0]),
          value: e [1],
        }))),
        commonProfessions: List.fromArray (
          typ_prof.map<Wiki.CommonProfession> (
            e => typeof e === 'boolean' ? e : createCommonProfessionObject ({
              ...e,
              list: List.fromArray (e.list),
            })
          )
        ),
        commonBlessedProfessions: fromNullable (commonBlessedProfessions),
        commonMagicProfessions: fromNullable (commonMagicProfessions),
        commonMundaneProfessions: fromNullable (commonMundaneProfessions),
        commonAdvantages: List.fromArray (typ_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        commonAdvantagesText: fromNullable (commonAdvantages),
        commonDisadvantages:
          List.fromArray (typ_dadv .map (prefixRawId (IdPrefixes.DISADVANTAGES))),
        commonDisadvantagesText: fromNullable (commonDisadvantages),
        uncommonAdvantages: List.fromArray (untyp_adv .map (prefixRawId (IdPrefixes.ADVANTAGES))),
        uncommonAdvantagesText: fromNullable (uncommonAdvantages),
        uncommonDisadvantages:
          List.fromArray (untyp_dadv .map (prefixRawId (IdPrefixes.DISADVANTAGES))),
        uncommonDisadvantagesText: fromNullable (uncommonDisadvantages),
        commonSkills: List.fromArray (typ_talents .map (prefixRawId (IdPrefixes.SKILLS))),
        uncommonSkills: List.fromArray (untyp_talents .map (prefixRawId (IdPrefixes.SKILLS))),
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initProfession =
  (locale: StringKeyObject<Raw.RawProfessionLocale>) =>
  (raw: Raw.RawProfession): Maybe<Record<Wiki.Profession>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        name,
        subname,
        req: localeReq,
        prerequisitesEnd,
        prerequisitesStart,
        suggestedAdvantages,
        suggestedDisadvantages,
        unsuitableAdvantages,
        unsuitableDisadvantages,
        src: srcPages,
      } = localeObject

      const {
        ap,
        apOfActivatables,
        pre_req,
        req,
        sel,
        sa,
        combattech,
        talents,
        spells,
        chants,
        typ_adv,
        typ_dadv,
        untyp_adv,
        untyp_dadv,
        vars,
        gr,
        src: srcIds,
        blessings,
        sgr,
      } = raw

      return Just (createProfession ({
        id,
        name: typeof name === 'object' ? createNameBySex (name) : name,
        subname: typeof subname === 'object'
          ? Just (createNameBySex (subname))
          : fromNullable (subname),
        ap,
        apOfActivatables,
        dependencies: convertRawProfessionDependencyObjects (pre_req),
        prerequisites:  convertRawProfessionPrerequisiteObjects ([...req, ...localeReq]),
        selections: convertRawProfessionSelections (sel),
        specialAbilities: List.fromArray (sa.map (convertRawProfessionRequiresActivatableObject)),
        combatTechniques: convertRawIncreaseSkills (IdPrefixes.COMBAT_TECHNIQUES) (combattech),
        skills: convertRawIncreaseSkills (IdPrefixes.SKILLS) (talents),
        spells: convertRawIncreaseSkills (IdPrefixes.SPELLS) (spells),
        liturgicalChants: convertRawIncreaseSkills (IdPrefixes.LITURGICAL_CHANTS) (chants),
        blessings: mapRawWithPrefix (IdPrefixes.BLESSINGS) (blessings),
        suggestedAdvantages: mapRawWithPrefix (IdPrefixes.ADVANTAGES) (typ_adv),
        suggestedDisadvantages: mapRawWithPrefix (IdPrefixes.DISADVANTAGES) (typ_dadv),
        unsuitableAdvantages: mapRawWithPrefix (IdPrefixes.ADVANTAGES) (untyp_adv),
        unsuitableDisadvantages: mapRawWithPrefix (IdPrefixes.DISADVANTAGES) (untyp_dadv),
        variants: mapRawWithPrefix (IdPrefixes.PROFESSION_VARIANTS) (vars),
        gr,
        subgr: sgr,
        prerequisitesEnd: fromNullable (prerequisitesEnd),
        prerequisitesStart: fromNullable (prerequisitesStart),
        suggestedAdvantagesText: fromNullable (suggestedAdvantages),
        suggestedDisadvantagesText: fromNullable (suggestedDisadvantages),
        unsuitableAdvantagesText: fromNullable (unsuitableAdvantages),
        unsuitableDisadvantagesText: fromNullable (unsuitableDisadvantages),
        isVariantRequired: false,
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initProfessionVariant =
  (locale: StringKeyObject<Raw.RawProfessionVariantLocale>) =>
  (raw: Raw.RawProfessionVariant): Maybe<Record<Wiki.ProfessionVariant>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        name,
        precedingText,
        fullText,
        concludingText,
      } = localeObject

      const {
        ap,
        apOfActivatables,
        pre_req,
        req,
        sel,
        sa,
        combattech,
        talents,
        spells,
        chants,
        blessings,
      } = raw

      return Just (createProfessionVariant ({
        id,
        name: typeof name === 'object' ? createNameBySex (name) : name,
        ap,
        apOfActivatables,
        dependencies: convertRawProfessionDependencyObjects (pre_req),
        prerequisites:  convertRawProfessionPrerequisiteObjects (req),
        selections: convertRawProfessionVariantSelections (sel),
        specialAbilities: List.fromArray (sa .map (convertRawProfessionRequiresActivatableObject)),
        combatTechniques: convertRawIncreaseSkills (IdPrefixes.COMBAT_TECHNIQUES) (combattech),
        skills: convertRawIncreaseSkills (IdPrefixes.SKILLS) (talents),
        spells: convertRawIncreaseSkills (IdPrefixes.SPELLS) (spells),
        liturgicalChants: convertRawIncreaseSkills (IdPrefixes.LITURGICAL_CHANTS) (chants),
        blessings: mapRawWithPrefix (IdPrefixes.BLESSINGS) (blessings),
        precedingText: fromNullable (precedingText),
        fullText: fromNullable (fullText),
        concludingText: fromNullable (concludingText),
      }))
    }

    return Nothing
  }

export const initAdvantage =
  (locale: StringKeyObject<Raw.RawAdvantageLocale>) =>
  (raw: Raw.RawAdvantage): Maybe<Record<Wiki.Advantage>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        sel: localeSel,
        src: srcPages,
        req: reqText,
        reqEnd,
        reqStart,
        reqIndex: reqIndexText,
        input,
        range,
        actions,
        apValue,
        apValueAppend,
        ...otherLocale
      } = localeObject

      const {
        ap,
        sel,
        req,
        src: srcIds,
        reqIndex: reqIndexIgnore,
        tiers,
        max,
        ...otherData
      } = raw

      return Just (createAdvantage ({
        ...otherLocale,
        ...otherData,
        cost: typeof ap === 'object' ? List.fromArray (ap) : ap,
        prerequisites: convertRawPrerequisites (req),
        select: convertRawSelections (localeSel) (sel),
        prerequisitesText: fromNullable (reqText),
        prerequisitesTextEnd: fromNullable (reqEnd),
        prerequisitesTextStart: fromNullable (reqStart),
        prerequisitesTextIndex: OrderedMap.fromArray<number, string | false> ([
          ...Object.entries (reqIndexText) .map<[number, string]> (pair => {
            const [index, text] = pair

            return [Number.parseInt (index, 10) - 1, text]
          }),
          ...reqIndexIgnore .map<[number, false]> (e => [Number.parseInt (e, 10), false]),
        ]),
        tiers: fromNullable (tiers),
        max: fromNullable (max),
        input: fromNullable (input),
        range: fromNullable (range),
        actions: fromNullable (actions),
        apValue: fromNullable (apValue),
        apValueAppend: fromNullable (apValueAppend),
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initDisadvantage =
  (locale: StringKeyObject<Raw.RawDisadvantageLocale>) =>
  (raw: Raw.RawDisadvantage): Maybe<Record<Wiki.Disadvantage>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        sel: localeSel,
        src: srcPages,
        req: reqText,
        reqEnd,
        reqStart,
        reqIndex: reqIndexText,
        input,
        range,
        actions,
        apValue,
        apValueAppend,
        ...otherLocale
      } = localeObject

      const {
        ap,
        sel,
        req,
        src: srcIds,
        reqIndex: reqIndexIgnore,
        tiers,
        max,
        ...otherData
      } = raw

      return Just (createDisadvantage ({
        ...otherLocale,
        ...otherData,
        cost: typeof ap === 'object' ? List.fromArray (ap) : ap,
        prerequisites: convertRawPrerequisites (req),
        select: convertRawSelections (localeSel) (sel),
        prerequisitesText: fromNullable (reqText),
        prerequisitesTextEnd: fromNullable (reqEnd),
        prerequisitesTextStart: fromNullable (reqStart),
        prerequisitesTextIndex: OrderedMap.fromArray<number, string | false> ([
          ...Object.entries (reqIndexText) .map<[number, string]> (pair => {
            const [index, text] = pair

            return [Number.parseInt (index, 10) - 1, text]
          }),
          ...reqIndexIgnore .map<[number, false]> (e => [Number.parseInt (e, 10), false]),
        ]),
        tiers: fromNullable (tiers),
        max: fromNullable (max),
        input: fromNullable (input),
        range: fromNullable (range),
        actions: fromNullable (actions),
        apValue: fromNullable (apValue),
        apValueAppend: fromNullable (apValueAppend),
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initSpecialAbility =
  (locale: StringKeyObject<Raw.RawSpecialAbilityLocale>) =>
  (raw: Raw.RawSpecialAbility): Maybe<Record<Wiki.SpecialAbility>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        sel: localeSel,
        src: srcPages,
        req: reqText,
        reqEnd,
        reqStart,
        reqIndex: reqIndexText,
        input,
        nameInWiki,
        rules,
        effect,
        volume,
        penalty,
        combatTechniques,
        aeCost,
        protectiveCircle,
        wardingCircle,
        bindingCost,
        property: propertyLocale,
        aspect: aspectLocale,
        apValue,
        apValueAppend,
        ...otherLocale
      } = localeObject

      const {
        ap,
        sel,
        req,
        src: srcIds,
        reqIndex: reqIndexIgnore,
        extended,
        tiers,
        max,
        subgr,
        property,
        aspect,
        ...otherData
      } = raw

      return Just (createSpecialAbility ({
        ...otherLocale,
        ...otherData,
        cost: typeof ap === 'object' ? List.fromArray (ap) : ap,
        input: fromNullable (input),
        max: fromNullable (max),
        tiers: fromNullable (tiers),
        prerequisites: Array.isArray (req[0])
          ? OrderedMap.fromArray<number, List<Wiki.AllRequirements>> (
            (req as [number, Raw.AllRawRequirements[]][]) .map (
              e => [
                e[0],
                convertRawPrerequisites (e[1]),
              ] as [number, List<Wiki.AllRequirements>]
            )
          )
          : convertRawPrerequisites (req as Raw.AllRawRequirements[]),
        select: convertRawSelections (localeSel) (sel),
        prerequisitesText: fromNullable (reqText),
        prerequisitesTextEnd: fromNullable (reqEnd),
        prerequisitesTextStart: fromNullable (reqStart),
        prerequisitesTextIndex: OrderedMap.fromArray<number, string | false> ([
          ...Object.entries (reqIndexText) .map<[number, string]> (pair => {
            const [index, text] = pair

            return [Number.parseInt (index, 10) - 1, text]
          }),
          ...reqIndexIgnore .map<[number, false]> (e => [Number.parseInt (e, 10), false]),
        ]),
        extended: fmap ((ext: (string | string[])[]) => List.fromArray (ext .map (
                         e => typeof e === 'object' ? List.fromArray (e) : e
                       )))
                       (fromNullable (extended)),
        nameInWiki: fromNullable (nameInWiki),
        subgr: fromNullable (subgr),
        combatTechniques: fromNullable (combatTechniques),
        rules: fromNullable (rules),
        effect: fromNullable (effect),
        volume: fromNullable (volume),
        penalty: fromNullable (penalty),
        aeCost: fromNullable (aeCost),
        protectiveCircle: fromNullable (protectiveCircle),
        wardingCircle: fromNullable (wardingCircle),
        bindingCost: fromNullable (bindingCost),
        property: alt<string | number> (fromNullable (propertyLocale)) (fromNullable (property)),
        aspect: alt<string | number> (fromNullable (aspectLocale)) (fromNullable (aspect)),
        apValue: fromNullable (apValue),
        apValueAppend: fromNullable (apValueAppend),
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initAttribute =
  (locale: StringKeyObject<Raw.RawAttributeLocale>) =>
  (raw: Raw.RawAttribute): Maybe<Record<Wiki.Attribute>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const { name, short } = localeObject

      return Just (createAttribute ({
        id,
        name,
        short,
      }))
    }

    return Nothing
  }

export const initCombatTechnique =
  (locale: StringKeyObject<Raw.RawCombatTechniqueLocale>) =>
  (raw: Raw.RawCombatTechnique): Maybe<Record<Wiki.CombatTechnique>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const { src: srcPages, special, ...otherLocale } = localeObject
      const { gr, skt, leit, bf, src: srcIds, ...otherData } = raw

      return Just (createCombatTechnique ({
        ...otherLocale,
        ...otherData,
        gr,
        ic: skt,
        primary: List.fromArray (leit),
        special: fromNullable (special),
        bf,
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initLiturgicalChant =
  (locale: StringKeyObject<Raw.RawLiturgyLocale>) =>
  (raw: Raw.RawLiturgy): Maybe<Record<Wiki.LiturgicalChant>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        castingtime,
        castingtimeShort,
        kpcost,
        kpcostShort,
        src: srcPages,
        ...otherLocale
      } = localeObject

      const { check, gr, skt, aspc, trad, mod, src: srcIds } = raw

      return Just (createLiturgicalChant ({
        ...otherLocale,
        aspects: List.fromArray (aspc),
        check: List.fromArray (check),
        checkmod: fromNullable (mod),
        gr,
        ic: skt,
        id,
        tradition: List.fromArray (trad),
        castingTime: castingtime,
        castingTimeShort: castingtimeShort,
        cost: kpcost,
        costShort: kpcostShort,
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initBlessing =
  (locale: StringKeyObject<Raw.RawBlessingLocale>) =>
  (raw: Raw.RawBlessing): Maybe<Record<Wiki.Blessing>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        name,
        src: srcPages,
        ...otherLocale
      } = localeObject

      const { aspc, trad, src: srcIds } = raw

      return Just (createBlessing ({
        ...otherLocale,
        name,
        aspects: List.fromArray (aspc),
        tradition: List.fromArray (trad),
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initSpell =
  (locale: StringKeyObject<Raw.RawSpellLocale>) =>
  (raw: Raw.RawSpell): Maybe<Record<Wiki.Spell>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        castingtime,
        castingtimeShort,
        aecost,
        aecostShort,
        src: srcPages,
        ...otherLocale
      } = localeObject

      const {
        check,
        gr,
        skt,
        merk,
        trad,
        subtrad,
        req,
        mod,
        src: srcIds,
      } = raw

      return Just (createSpell ({
        ...otherLocale,
        check: List.fromArray (check),
        checkmod: fromNullable (mod),
        gr,
        ic: skt,
        property: merk,
        tradition: List.fromArray (trad),
        subtradition: List.fromArray (subtrad),
        prerequisites: convertRawPrerequisiteObjects (req),
        castingTime: castingtime,
        castingTimeShort: castingtimeShort,
        cost: aecost,
        costShort: aecostShort,
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initCantrip =
  (locale: StringKeyObject<Raw.RawCantripLocale>) =>
  (raw: Raw.RawCantrip): Maybe<Record<Wiki.Cantrip>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        name,
        src: srcPages,
        note,
        ...otherLocale
      } = localeObject

      const { merk, trad, src: srcIds } = raw

      return Just (createCantrip ({
        ...otherLocale,
        name,
        property: merk,
        tradition: List.fromArray (trad),
        note: fromNullable (note),
        src: getSourceBooks (srcIds, srcPages),
      }))
    }

    return Nothing
  }

export const initSkill =
  (locale: StringKeyObject<Raw.RawSkillLocale>) =>
  (raw: Raw.RawSkill): Maybe<Record<Wiki.Skill>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        name,
        spec: appNames,
        spec_input,
        tools,
        ...other
      } = localeObject

      const {
        be,
        check,
        gr,
        skt,
        applications: appPrerequisites,
      } = raw

      return Just (createSkill ({
        ...other,
        check: List.fromArray (check),
        encumbrance: be,
        gr,
        ic: skt,
        name,
        applications: convertRawApplications (appNames, appPrerequisites),
        applicationsInput: fromNullable (spec_input),
        tools: fromNullable (tools),
      }))
    }

    return Nothing
  }

export const initItemTemplate =
  (locale: StringKeyObject<Raw.RawItemLocale>) =>
  (raw: Raw.RawItemTemplate): Maybe<Record<Wiki.ItemTemplate>> => {
    const { id } = raw
    const localeObject = locale [id]

    if (localeObject !== undefined) {
      const {
        name,
        src: srcPages,
        note,
        rules,
        advantage,
        disadvantage,
      } = localeObject

      const {
        price,
        weight,
        gr,
        imp,
        primaryThreshold,
        src: srcIds,
        combatTechnique,
        damageDiceNumber,
        damageDiceSides,
        damageFlat,
        at,
        pa,
        reach,
        length,
        stp,
        range,
        reloadTime,
        ammunition,
        pro,
        enc,
        addPenalties,
        isParryingWeapon,
        isTwoHandedWeapon,
        armorType,
        iniMod,
        movMod,
        stabilityMod,
      } = raw

      return Just (ItemTemplateCreator ({
        id,
        name,
        gr,
        weight: fromNullable (weight),
        amount: 1,
        price: fromNullable (price),
        improvisedWeaponGroup: fromNullable (imp),
        damageBonus:
          primaryThreshold !== undefined
            ? Just (PrimaryAttributeDamageThresholdCreator ({
              primary: fromNullable (primaryThreshold .primary),
              threshold: typeof primaryThreshold .threshold === 'object'
                ? List.fromArray (primaryThreshold .threshold)
                : primaryThreshold .threshold,
            }))
            : Nothing,
        template: id,
        isTemplateLocked: true,
        combatTechnique: fromNullable (combatTechnique),
        damageDiceNumber: fromNullable (damageDiceNumber),
        damageDiceSides: fromNullable (damageDiceSides),
        damageFlat: fromNullable (damageFlat),
        at: fromNullable (at),
        pa: fromNullable (pa),
        reach: fromNullable (reach),
        length: fromNullable (length),
        stp: fromNullable (stp),
        range: fmap<number[], List<number>> (List.fromArray) (fromNullable (range)),
        reloadTime: fromNullable (reloadTime),
        ammunition: fromNullable (ammunition),
        pro: fromNullable (pro),
        enc: fromNullable (enc),
        addPenalties: fromNullable (addPenalties),
        isParryingWeapon: fromNullable (isParryingWeapon),
        isTwoHandedWeapon: fromNullable (isTwoHandedWeapon),
        armorType: fromNullable (armorType),
        iniMod: fromNullable (iniMod),
        movMod: fromNullable (movMod),
        stabilityMod: fromNullable (stabilityMod),
        src: getSourceBooks (srcIds, srcPages),
        forArmorZoneOnly: Nothing,
        loss: Nothing,
        note: fromNullable (note),
        rules: fromNullable (rules),
        advantage: fromNullable (advantage),
        disadvantage: fromNullable (disadvantage),
      }))
    }

    return Nothing
  }