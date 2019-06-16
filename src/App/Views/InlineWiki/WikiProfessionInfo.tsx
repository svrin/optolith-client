import * as React from "react";
import { equals } from "../../../Data/Eq";
import { ident } from "../../../Data/Function";
import { fmap, fmapF } from "../../../Data/Functor";
import { compare } from "../../../Data/Int";
import { all, append, cons, consF, deleteAt, find, findIndex, flength, foldr, imap, intercalate, isList, List, ListI, map, NonEmptyList, notElem, notNull, snoc, sortBy, subscript, toArray, uncons, unsafeIndex } from "../../../Data/List";
import { alt_, any, bind, bindF, ensure, fromJust, fromMaybe, fromMaybe_, isJust, Just, liftM2, mapMaybe, Maybe, maybe, maybeR, maybeRNullF, maybeToList, maybe_, Nothing } from "../../../Data/Maybe";
import { elems, lookup, lookupF, member, memberF, OrderedMap } from "../../../Data/OrderedMap";
import { difference, fromList, insert, OrderedSet, toList } from "../../../Data/OrderedSet";
import { fst, snd } from "../../../Data/Pair";
import { fromDefault, Record } from "../../../Data/Record";
import { show } from "../../../Data/Show";
import { Pair, Tuple } from "../../../Data/Tuple";
import { sel1, sel2, sel3 } from "../../../Data/Tuple/Select";
import { upd1, upd2, upd3 } from "../../../Data/Tuple/Update";
import { Sex } from "../../Models/Hero/heroTypeHelpers";
import { ActivatableNameCostIsActive, ActivatableNameCostIsActiveA_ } from "../../Models/View/ActivatableNameCostIsActive";
import { IncreasableForView } from "../../Models/View/IncreasableForView";
import { IncreasableListForView } from "../../Models/View/IncreasableListForView";
import { ProfessionCombined, ProfessionCombinedA_ } from "../../Models/View/ProfessionCombined";
import { ProfessionVariantCombined, ProfessionVariantCombinedA_ } from "../../Models/View/ProfessionVariantCombined";
import { Attribute } from "../../Models/Wiki/Attribute";
import { Blessing } from "../../Models/Wiki/Blessing";
import { Book } from "../../Models/Wiki/Book";
import { Cantrip } from "../../Models/Wiki/Cantrip";
import { L10n, L10nRecord } from "../../Models/Wiki/L10n";
import { LiturgicalChant } from "../../Models/Wiki/LiturgicalChant";
import { ProfessionRequireIncreasable } from "../../Models/Wiki/prerequisites/IncreasableRequirement";
import { isRaceRequirement, RaceRequirement } from "../../Models/Wiki/prerequisites/RaceRequirement";
import { isSexRequirement, SexRequirement } from "../../Models/Wiki/prerequisites/SexRequirement";
import { CantripsSelection } from "../../Models/Wiki/professionSelections/CantripsSelection";
import { CombatTechniquesSelection } from "../../Models/Wiki/professionSelections/CombatTechniquesSelection";
import { CursesSelection } from "../../Models/Wiki/professionSelections/CursesSelection";
import { LanguagesScriptsSelection } from "../../Models/Wiki/professionSelections/LanguagesScriptsSelection";
import { ProfessionSelections } from "../../Models/Wiki/professionSelections/ProfessionAdjustmentSelections";
import { ProfessionVariantSelections } from "../../Models/Wiki/professionSelections/ProfessionVariantAdjustmentSelections";
import { isRemoveCombatTechniquesSelection } from "../../Models/Wiki/professionSelections/RemoveCombatTechniquesSelection";
import { isRemoveSpecializationSelection } from "../../Models/Wiki/professionSelections/RemoveSpecializationSelection";
import { CombatTechniquesSecondSelection } from "../../Models/Wiki/professionSelections/SecondCombatTechniquesSelection";
import { SkillsSelection } from "../../Models/Wiki/professionSelections/SkillsSelection";
import { SpecializationSelection } from "../../Models/Wiki/professionSelections/SpecializationSelection";
import { TerrainKnowledgeSelection } from "../../Models/Wiki/professionSelections/TerrainKnowledgeSelection";
import { Race } from "../../Models/Wiki/Race";
import { Skill } from "../../Models/Wiki/Skill";
import { SpecialAbility } from "../../Models/Wiki/SpecialAbility";
import { Spell } from "../../Models/Wiki/Spell";
import { IncreaseSkill } from "../../Models/Wiki/sub/IncreaseSkill";
import { IncreaseSkillList } from "../../Models/Wiki/sub/IncreaseSkillList";
import { ProfessionSelectionIds } from "../../Models/Wiki/wikiTypeHelpers";
import { getSelectOptionName } from "../../Utilities/Activatable/selectionUtils";
import { ndash } from "../../Utilities/Chars";
import { localizeOrList, translate, translateP } from "../../Utilities/I18n";
import { getNumericId, prefixRace, prefixSA } from "../../Utilities/IDUtils";
import { add, dec, gt } from "../../Utilities/mathUtils";
import { pipe, pipe_ } from "../../Utilities/pipe";
import { getNameBySex, getNameBySexM } from "../../Utilities/rcpUtils";
import { renderMaybe } from "../../Utilities/ReactUtils";
import { sortRecordsByName, sortStrings } from "../../Utilities/sortBy";
import { whilePred } from "../../Utilities/whilePred";
import { WikiSource } from "./Elements/WikiSource";
import { WikiBoxTemplate } from "./WikiBoxTemplate";
import { WikiProperty } from "./WikiProperty";

export interface WikiProfessionInfoProps {
  attributes: OrderedMap<string, Record<Attribute>>
  blessings: OrderedMap<string, Record<Blessing>>
  books: OrderedMap<string, Record<Book>>
  cantrips: OrderedMap<string, Record<Cantrip>>
  x: Record<ProfessionCombined>
  liturgicalChants: OrderedMap<string, Record<LiturgicalChant>>
  l10n: L10nRecord
  sex: Maybe<Sex>
  races: OrderedMap<string, Record<Race>>
  skills: OrderedMap<string, Record<Skill>>
  spells: OrderedMap<string, Record<Spell>>
  specialAbilities: OrderedMap<string, Record<SpecialAbility>>
}

const PCA = ProfessionCombined.A
const PCA_ = ProfessionCombinedA_
const PSA = ProfessionSelections.A
const PVCA = ProfessionVariantCombined.A
const PVCA_ = ProfessionVariantCombinedA_
const PVSA = ProfessionVariantSelections.A
const ISA = IncreaseSkill.A
const ILSA = IncreaseSkillList.A
const IFVA = IncreasableForView.A
const IFVAL = IncreasableForView.AL
const ILFVA = IncreasableListForView.A
const ANCIAA = ActivatableNameCostIsActive.A
const ANCIAA_ = ActivatableNameCostIsActiveA_
const PRIA = ProfessionRequireIncreasable.A
const CTSA = CombatTechniquesSelection.A
const CTSSA = CombatTechniquesSecondSelection.A

// tslint:disable-next-line: cyclomatic-complexity
export function WikiProfessionInfo (props: WikiProfessionInfoProps): JSX.Element {
  const {
    attributes,
    blessings,
    cantrips,
    x,
    liturgicalChants,
    l10n,
    races,
    sex,
    skills,
    spells,
    specialAbilities,
  } = props

  const selections = PCA.mappedSelections (x)

  const name = getNameBySex (fromMaybe<Sex> ("m") (sex)) (PCA_.name (x))
  const msubname = getNameBySexM (fromMaybe<Sex> ("m") (sex)) (PCA_.subname (x))

  const specializationSelectionString =
    getSpecializationSelection (l10n) (skills) (x)

  const skillsSelectionJoinedObject =
    getSkillSelection (l10n) (x)

  const cursesSelection =
    PSA[ProfessionSelectionIds.CURSES] (selections)

  const languagesLiteracySelection =
    PSA[ProfessionSelectionIds.LANGUAGES_SCRIPTS] (selections)

  const combatTechniquesSelectionString =
    getCombatTechniquesSelection (l10n) (x)

  const terrainKnowledgeSelectionString =
    getTerrainKnowledgeSelection (l10n) (specialAbilities) (x)

  const spellsString =
    getSpells (l10n) (cantrips) (spells) (x)

  const liturgicalChantsString =
    getLiturgicalChants (l10n) (blessings) (liturgicalChants) (x)

  const raceRequirement =
     pipe_ (x, PCA_.dependencies, find (isRaceRequirement))

  const sexRequirement =
     pipe_ (x, PCA_.dependencies, find (isSexRequirement))

  // if (["nl-BE"].includes(l10n.id)) {
  //   return (
  //     <WikiBoxTemplate className="profession" title={subname ? `${name} (${subname})` : name}>
  //       <WikiProperty l10n={l10n} title="apvalue">
  //         {x.ap} {translate(l10n, "aptext")}
  //       </WikiProperty>
  //       <CombatTechniques
  //         combatTechniquesSelectionString={combatTechniquesSelectionString}
  //         x={x}
  //         l10n={l10n}
  //         />
  //       <WikiProperty l10n={l10n} title="skills" />
  //       <SkillsList
  //         profession={x}
  //         l10n={l10n}
  //         skillsSelection={skillsSelectionJoinedObject}
  //         />
  //       {typeof spellsString === "string" ? (
  //         <WikiProperty l10n={l10n} title="spells">
  //           {spellsString}
  //         </WikiProperty>
  //       ) : null}
  //       {typeof liturgicalChantsString === "string" ? (
  //         <WikiProperty l10n={l10n} title="liturgicalchants">
  //           {liturgicalChantsString}
  //         </WikiProperty>
  //       ) : null}
  //       <VariantList
  //         {...props}
  //         combatTechniquesSelectionString={combatTechniquesSelectionString}
  //         profession={x}
  //         specializationSelectionString={specializationSelectionString}
  //         />
  //     </WikiBoxTemplate>
  //   )
  // }

  const getRaceNameAP =
    (race: Record<Race>) =>
      `${Race.A.name (race)} (${Race.A.ap (race)} ${translate (l10n) ("adventurepoints.short")})`

  const mrace_depencency_str =
    bind (raceRequirement)
         (pipe (
           race_dep => {
             const value = RaceRequirement.A.value (race_dep)

             return isList (value)
               ? pipe_ (
                   value,
                   mapMaybe (pipe (prefixRace, lookupF (races), fmap (getRaceNameAP))),
                   ensure (notNull),
                   fmap (localizeOrList (l10n))
                 )
               : pipe_ (value, prefixRace, lookupF (races), fmap (getRaceNameAP))
           },
           fmap (str => `${translate (l10n) ("race")}: ${str}`)
         ))

  const prereq_strs =
    pipe_ (
      x,
      PCA.mappedPrerequisites,
      mapMaybe (e => {
        if (ProfessionRequireIncreasable.is (e)) {
          const id = PRIA.id (e)
          const value = PRIA.value (e)
          const mwiki_entry =
            alt_<Record<Attribute> | Record<Skill>> (lookup (id) (attributes))
                                                    (() => lookup (id) (skills))

          return fmapF (mwiki_entry)
                       (wiki_entry =>
                         Attribute.is (wiki_entry)
                           ? `${Attribute.A.short (wiki_entry)} ${value}`
                           : `${Skill.A.name (wiki_entry)} ${value}`)
        }
        else {
          const pr_name = ANCIAA_.name (e)
          const pr_cost = ANCIAA_.finalCost (e)

          return Just (`${pr_name} (${pr_cost} ${translate (l10n) ("adventurepoints.short")})`)
        }
      }),
      sortStrings (L10n.A.id (l10n))
    )

  const prerequisites = List (
    ...maybeToList (mrace_depencency_str),
    ...maybeToList (PCA_.prerequisitesStart (x)),
    ...prereq_strs,
    ...maybeToList (PCA_.prerequisitesEnd (x))
  )

  const sex_dep_str =
    fmapF (sexRequirement)
          (sex_dep => {
            const space_before = notNull (prerequisites) ? " " : ""
            const sex_tag = translate (l10n) ("sex")
            const sex_value =
              SexRequirement.A.value (sex_dep) === "m"
                ? translate (l10n) ("male")
                : translate (l10n) ("female")

            return `${space_before}${sex_tag}: ${sex_value}`
          })

  const sas_str =
    pipe_ (
      List<string> (),
      maybe<ident<List<string>>> (ident)
                                 ((curss: Record<CursesSelection>) =>
                                   consF (translateP (l10n)
                                                     ("cursestotalingap")
                                                     (List (CursesSelection.A.value (curss)))))
                                 (cursesSelection),
      maybe<ident<List<string>>> (ident) <string> (consF) (terrainKnowledgeSelectionString),
      maybe<ident<List<string>>> (ident) <string> (consF) (specializationSelectionString),
      maybe<ident<List<string>>> (ident)
                                 ((curss: Record<LanguagesScriptsSelection>) =>
                                   consF (translateP (l10n)
                                                     ("languagesandliteracytotalingap")
                                                     (List (
                                                       LanguagesScriptsSelection.A.value (curss)
                                                     ))))
                                 (languagesLiteracySelection),
      ensure (notNull),
      maybe (translate (l10n) ("none"))
            (pipe (sortStrings (L10n.A.id (l10n)), intercalate (", ")))
    )

  const final_ap =
    fromMaybe_ (() => pipe_ (
                        x,
                        PCA.mappedVariants,
                        foldr (pipe (PVCA_.ap, insert))
                              (OrderedSet.empty),
                        toList,
                        sortBy (compare),
                        localizeOrList (l10n)
                      ))
               (fmapF (PCA_.ap (x)) (show))

  return (
    <WikiBoxTemplate
      className="profession"
      title={maybe (name) ((subname: string) => `${name} (${subname})`) (msubname)}
      >
      <WikiProperty l10n={l10n} title="apvalue">
        {final_ap} {translate (l10n) ("adventurepoints")}
      </WikiProperty>
      <WikiProperty l10n={l10n} title="prerequisites">
        {maybe (translate (l10n) ("none")) (intercalate (", ")) (ensure (notNull) (prerequisites))}
        {renderMaybe (sex_dep_str)}
      </WikiProperty>
      <WikiProperty l10n={l10n} title="specialabilities">
        {sas_str}
      </WikiProperty>
      <CombatTechniques
        combatTechniquesSelectionString={combatTechniquesSelectionString}
        x={x}
        l10n={l10n}
        />
      <WikiProperty l10n={l10n} title="skills" />
      <SkillsList
        profession={x}
        l10n={l10n}
        skillsSelection={skillsSelectionJoinedObject}
        />
      {maybeRNullF (spellsString)
                   (str => (
                     <WikiProperty l10n={l10n} title="spells">
                       {str}
                     </WikiProperty>
                   ))}
      {maybeRNullF (liturgicalChantsString)
                   (str => (
                     <WikiProperty l10n={l10n} title="liturgicalchants">
                       {str}
                     </WikiProperty>
                   ))}
      <WikiProperty l10n={l10n} title="suggestedadvantages">
        {fromMaybe (translate (l10n) ("none")) (PCA_.suggestedAdvantagesText (x))}
      </WikiProperty>
      <WikiProperty l10n={l10n} title="suggesteddisadvantages">
        {fromMaybe (translate (l10n) ("none")) (PCA_.suggestedDisadvantagesText (x))}
      </WikiProperty>
      <WikiProperty l10n={l10n} title="unsuitableadvantages">
        {fromMaybe (translate (l10n) ("none")) (PCA_.unsuitableAdvantagesText (x))}
      </WikiProperty>
      <WikiProperty l10n={l10n} title="unsuitabledisadvantages">
        {fromMaybe (translate (l10n) ("none")) (PCA_.unsuitableDisadvantagesText (x))}
      </WikiProperty>
      <VariantList
        {...props}
        combatTechniquesSelectionString={combatTechniquesSelectionString}
        profession={x}
        specializationSelectionString={specializationSelectionString}
        />
      <WikiSource {...props} acc={PCA_} />
    </WikiBoxTemplate>
  )
}

const getSpecializationSelection =
  (l10n: L10nRecord) =>
  (skills: OrderedMap<string, Record<Skill>>) =>
  (profession: Record<ProfessionCombined>): Maybe<string> =>
    pipe_ (
      profession,
      PCA.mappedSelections,
      PSA[ProfessionSelectionIds.SPECIALIZATION],
      bindF (sel => {
              const sid = SpecializationSelection.A.sid (sel)

              if (isList (sid)) {
                return pipe_ (
                  sid,
                  mapMaybe (pipe (lookupF (skills), fmap (Skill.A.name))),
                  ensure (notNull),
                  fmap (pipe (
                    sortStrings (L10n.A.id (l10n)),
                    localizeOrList (l10n)
                  ))
                )
              }
              else {
                return pipe_ (sid, lookupF (skills), fmap (Skill.A.name))
              }
            }),
      fmap (pipe (List.pure, translateP (l10n) ("skillspecialization")))
    )

interface CombatTechniquesProps {
  combatTechniquesSelectionString: Maybe<string>
  x: Record<ProfessionCombined>
  l10n: L10nRecord
}

function CombatTechniques (props: CombatTechniquesProps): JSX.Element {
  const {
    combatTechniquesSelectionString: selectionString,
    x,
    l10n,
  } = props

  const cts =
    pipe_ (
      x,
      PCA.mappedCombatTechniques,
      map (e => `${IFVA.name (e)} ${IFVA.value (e) + 6}`),
      sortStrings (L10n.A.id (l10n)),
      maybe<ident<List<string>>> (ident) <string> (consF) (selectionString),
      ensure (notNull),
      maybe (ndash) (intercalate (", "))
    )

  return (
    <WikiProperty l10n={l10n} title="combattechniques">
      {cts}
    </WikiProperty>
  )
}

interface SkillsSelectionJoined {
  properties: Record<SkillsSelection>
  text: string
}

const SkillsSelectionJoined =
  fromDefault<SkillsSelectionJoined> ({
    properties: SkillsSelection.default,
    text: "",
  })

const getSkillSelection =
  (l10n: L10nRecord) =>
  (profession: Record<ProfessionCombined>): Maybe<Record<SkillsSelectionJoined>> =>
    pipe_ (
      profession,
      PCA.mappedSelections,
      PSA[ProfessionSelectionIds.SKILLS],
      fmap (sel => {
        const skill_gr = subscript (translate (l10n) ("skillgroups"))
                                   (fromMaybe (0) (SkillsSelection.A.gr (sel)))

        return SkillsSelectionJoined ({
          properties: sel,
          text: translateP (l10n)
                           ("skillsselection")
                           (List<string | number> (
                             SkillsSelection.A.value (sel),
                             fromMaybe ("...") (skill_gr)
                           )),
        })
      })
    )

const getCombatTechniquesSelection =
  (l10n: L10nRecord) =>
  (profession: Record<ProfessionCombined>): Maybe<string> => {
    const selections = PCA.mappedSelections (profession)

    const msel = PSA[ProfessionSelectionIds.COMBAT_TECHNIQUES] (selections)
    const msecond_sel = PSA[ProfessionSelectionIds.COMBAT_TECHNIQUES_SECOND] (selections)

    return fmapF (msel)
                 (sel => {
                   const fst_counter = subscript (translate (l10n) ("combattechniquecounter"))
                                                 (CTSA.amount (sel) - 1)

                   const firstValue = CTSA.value (sel) + 6

                   const entryList =
                     pipe_ (
                       sel,
                       CTSA.sid,
                       sortStrings (L10n.A.id (l10n)),
                       intercalate (", ")
                     )

                   return maybe_ (() => {
                                   const precedingText =
                                     translateP (l10n)
                                                ("combattechniquesselection")
                                                (List<string | number> (
                                                  renderMaybe (fst_counter),
                                                  firstValue
                                                ))

                                   return `${precedingText}${entryList}`
                                 })
                                 ((second_sel: Record<CombatTechniquesSecondSelection>) => {
                                   const snd_counter =
                                     subscript (translate (l10n) ("combattechniquecounter"))
                                               (CTSSA.amount (second_sel) - 1)

                                   const secondValue = CTSSA.value (second_sel) + 6

                                   const precedingText =
                                     translateP (l10n)
                                                ("combattechniquessecondselection")
                                                (List<string | number> (
                                                  renderMaybe (fst_counter),
                                                  firstValue,
                                                  renderMaybe (snd_counter),
                                                  secondValue
                                                ))

                                   return `${precedingText}${entryList}`
                                 })
                                 (msecond_sel)
                 })
  }

const getTerrainKnowledgeSelection =
  (l10n: L10nRecord) =>
  (specialAbilities: OrderedMap<string, Record<SpecialAbility>>) =>
  (profession: Record<ProfessionCombined>): Maybe<string> =>
    pipe_ (
      profession,
      PCA_.selections,
      PSA[ProfessionSelectionIds.TERRAIN_KNOWLEDGE],
      liftM2 ((terrain_knowledge: Record<SpecialAbility>) =>
               pipe (
                 TerrainKnowledgeSelection.A.sid,
                 mapMaybe (pipe (Just, getSelectOptionName (terrain_knowledge))),
                 localizeOrList (l10n),
                 xs => `${SpecialAbility.A.name (terrain_knowledge)} (${xs})`
               ))
             (lookup (prefixSA (12)) (specialAbilities))
    )

const getSpells =
  (l10n: L10nRecord) =>
  (cantrips: OrderedMap<string, Record<Cantrip>>) =>
  (spells: OrderedMap<string, Record<Spell>>) =>
  (profession: Record<ProfessionCombined>): Maybe<string> => {
    const cantrips_str =
      pipe_ (
        profession,
        PCA_.selections,
        PSA[ProfessionSelectionIds.CANTRIPS],
        maybe ("")
              (cantrips_sel => {
                const mcounter = subscript (translate (l10n) ("cantripcounter"))
                                           (CantripsSelection.A.amount (cantrips_sel) - 1)

                const precedingText =
                  fmapF (mcounter) (pipe (List.pure, translateP (l10n) ("cantripsfromlist")))

                const options =
                  pipe_ (
                    cantrips_sel,
                    CantripsSelection.A.sid,
                    mapMaybe (pipe (lookupF (cantrips), fmap (Cantrip.A.name))),
                    sortStrings (L10n.A.id (l10n)),
                    intercalate (", ")
                  )

                return `${precedingText}${options}, `
              })
      )

    const spells_str =
      pipe_ (
        profession,
        PCA_.spells,
        mapMaybe (x => {
          if (IncreaseSkillList.is (x)) {
            const ids = ILSA.id (x)
            const value = ILSA.value (x)

            return pipe_ (
              ids,
              mapMaybe (pipe (lookupF (spells), fmap (Spell.A.name))),
              ensure (pipe (flength, gt (1))),
              fmap (pipe (localizeOrList (l10n), names => `${names} ${value}`))
            )
          }
          else {
            const id = ISA.id (x)
            const value = ISA.value (x)

            return fmapF (lookup (id) (spells)) (spell => `${Spell.A.name (spell)} ${value}`)
          }
        }),
        sortStrings (L10n.A.id (l10n)),
        intercalate (", ")
      )


    return cantrips_str.length === 0 || spells_str.length === 0
      ? Nothing
      : Just (`${cantrips_str}${spells_str}`)
  }

const getLiturgicalChants =
  (l10n: L10nRecord) =>
  (blessings: OrderedMap<string, Record<Blessing>>) =>
  (liturgicalChants: OrderedMap<string, Record<LiturgicalChant>>) =>
  (profession: Record<ProfessionCombined>): Maybe<string> => {
    return pipe_ (
      profession,
      PCA_.liturgicalChants,
      mapMaybe (x => {
        if (IncreaseSkillList.is (x)) {
          const ids = ILSA.id (x)
          const value = ILSA.value (x)

          return pipe_ (
            ids,
            mapMaybe (pipe (lookupF (liturgicalChants), fmap (LiturgicalChant.A.name))),
            ensure (pipe (flength, gt (1))),
            fmap (pipe (localizeOrList (l10n), names => `${names} ${value}`))
          )
        }
        else {
          const id = ISA.id (x)
          const value = ISA.value (x)

          return fmapF (lookup (id) (liturgicalChants))
                       (chant => `${LiturgicalChant.A.name (chant)} ${value}`)
        }
      }),
      xs => {
        const incl_blessings = PCA_.blessings (profession)

        if (flength (incl_blessings) === 12) {
          return cons (xs) (translate (l10n) ("thetwelveblessings"))
        }
        else if (flength (incl_blessings) === 9) {
          return pipe_ (
            blessings,
            elems,
            mapMaybe (pipe (
                       ensure (pipe (
                                Blessing.A.id,
                                id => notElem (id) (incl_blessings) && getNumericId (id) <= 12
                              )),
                       fmap (Blessing.A.name)
                     )),
            sortStrings (L10n.A.id (l10n)),
            translateP (l10n) ("thetwelveblessingsexceptions"),
            str => cons (xs) (str)
          )
        }

        return xs
      },
      sortStrings (L10n.A.id (l10n)),
      ensure (notNull),
      fmap (intercalate (", "))
    )
  }

interface SkillsListProps {
  profession: Record<ProfessionCombined>
  l10n: L10nRecord
  skillsSelection: Maybe<Record<SkillsSelectionJoined>>
}

function SkillsList (props: SkillsListProps): JSX.Element {
  const {
    profession,
    l10n,
    skillsSelection,
  } = props

  const xss = List (
    PCA.mappedPhysicalSkills (profession),
    PCA.mappedSocialSkills (profession),
    PCA.mappedNatureSkills (profession),
    PCA.mappedKnowledgeSkills (profession),
    PCA.mappedCraftSkills (profession)
  )

  return (
    <>
      {pipe_ (
        xss,
        imap (i => xs => (
               <Skills
                 key={i}
                 groupIndex={i}
                 list={xs}
                 l10n={l10n}
                 skillsSelection={skillsSelection}
                 />
             )),
        toArray
      )}
    </>
  )
}

interface SkillProps {
  l10n: L10nRecord
  groupIndex: number
  list: List<Record<IncreasableForView>>
  skillsSelection: Maybe<Record<SkillsSelectionJoined>>
}

function Skills (props: SkillProps) {
  const {
    groupIndex,
    list,
    l10n,
    skillsSelection: mskills_selection,
  } = props

  return pipe_ (
      list,
      map (e => `${IFVA.name (e)} ${IFVA.value (e)}`),
      sortStrings (L10n.A.id (l10n)),
      xs => maybe (xs)
                  ((skills_selection: Record<SkillsSelectionJoined>) => {
                    const mgr =
                      pipe_ (
                        skills_selection,
                        SkillsSelectionJoined.A.properties,
                        SkillsSelection.A.gr
                      )

                    const is_group_valid = any (pipe (dec, equals (groupIndex))) (mgr)

                    return is_group_valid
                      ? snoc (xs) (SkillsSelectionJoined.A.text (skills_selection))
                      : xs
                  })
                  (mskills_selection),
      intercalate (", "),
      joined_text => (
        <p className="skill-group">
          <span>{renderMaybe (subscript (translate (l10n) ("skillgroups")) (groupIndex))}</span>
          <span>{notNull (list) ? joined_text : ndash}</span>
        </p>
      )
    )
}

interface VariantListHeaderProps {
  l10n: L10nRecord
}

function VariantListHeader (props: VariantListHeaderProps): JSX.Element {
  const { l10n } = props

  return (
    <p className="profession-variants">
      <span>{translate (l10n) ("variants")}</span>
    </p>
  )
}

interface VariantListProps {
  attributes: OrderedMap<string, Record<Attribute>>
  combatTechniquesSelectionString: Maybe<string>
  liturgicalChants: OrderedMap<string, Record<LiturgicalChant>>
  l10n: L10nRecord
  profession: Record<ProfessionCombined>
  sex: Maybe<Sex>
  skills: OrderedMap<string, Record<Skill>>
  specializationSelectionString: Maybe<string>
  spells: OrderedMap<string, Record<Spell>>
}

function VariantList (props: VariantListProps): JSX.Element | null {
  const {
    l10n,
    profession,
  } = props

  const variants = PCA.mappedVariants (profession)

  if (notNull (variants)) {
    return (
      <>
        <VariantListHeader l10n={l10n} />
        <ul className="profession-variants">
          {
            pipe_ (
              variants,
              map (variant => (
                    <Variant
                      {...props}
                      key={PVCA_.id (variant)}
                      variant={variant}
                      />
                  )),
              toArray
            )
          }
        </ul>
      </>
    )
  }

  return null
}

interface VariantProps {
  attributes: OrderedMap<string, Record<Attribute>>
  combatTechniquesSelectionString: Maybe<string>
  liturgicalChants: OrderedMap<string, Record<LiturgicalChant>>
  l10n: L10nRecord
  profession: Record<ProfessionCombined>
  sex: Maybe<Sex>
  skills: OrderedMap<string, Record<Skill>>
  specializationSelectionString: Maybe<string>
  spells: OrderedMap<string, Record<Spell>>
  variant: Record<ProfessionVariantCombined>
}

function Variant (props: VariantProps) {
  const {
    l10n,
    profession,
    sex: msex,
    variant,
  } = props

  const fullText = PVCA_.fullText (variant)

  const name = getNameBySex (fromMaybe<Sex> ("m") (msex)) (PVCA_.name (variant))

  const ap_sum = Maybe.sum (PCA_.ap (profession)) + PVCA_.ap (variant)

  if (isJust (fullText)) {
    return (
      <li>
        <span>{name}</span>
        <span>({ap_sum} {translate (l10n) ("adventurepoints.short")})</span>
        <span>{fromJust (fullText)}</span>
      </li>
    )
  }

  return (
    <li>
      <span>{name}</span>
      <span>({ap_sum} {translate (l10n) ("adventurepoints.short")})</span>
      <span>
        {maybeRNullF (PVCA_.precedingText (variant))
                     (str => <span>{str}</span>)}
        <VariantPrerequisites {...props} />
        <VariantSpecialAbilities {...props} />
        <VariantLanguagesLiteracySelection
          {...props}
          mappedProfSelections={PCA_.selections (profession)}
          />
        <VariantSpecializationSelection
          {...props}
          mappedProfSelections={PCA_.selections (profession)}
          />
        <VariantCombatTechniquesSelection
          {...props}
          mappedProfSelections={PCA_.selections (profession)}
          />
        <VariantSkillsSelection {...props} />
        {maybeRNullF (PVCA_.concludingText (variant))
                     (str => <span>{str}</span>)}
      </span>
    </li>
  )
}

interface VariantPrerequisitesProps {
  attributes: OrderedMap<string, Record<Attribute>>
  l10n: L10nRecord
  skills: OrderedMap<string, Record<Skill>>
  variant: Record<ProfessionVariantCombined>
}

interface VariantPrerequisiteIntermediate {
  id: string
  name: string
  active: Maybe<boolean>
}

const VariantPrerequisiteIntermediate =
  fromDefault<VariantPrerequisiteIntermediate> ({
    id: "",
    name: "",
    active: Nothing,
  })

function VariantPrerequisites (props: VariantPrerequisitesProps): JSX.Element {
  const {
    attributes,
    l10n,
    skills,
    variant,
  } = props

  return pipe_ (
    variant,
    PVCA.mappedPrerequisites,
    map (x => {
          if (ProfessionRequireIncreasable.is (x)) {
            const id = PRIA.id (x)
            const value = PRIA.value (x)

            type wiki_entry = Record<Attribute> | Record<Skill>

            const wiki_entry =
              alt_<wiki_entry> (lookup (id) (attributes)) (() => lookup (id) (skills))

            const mname = fmapF (wiki_entry)
                                (e => Attribute.is (e) ? Attribute.A.short (e) : Skill.A.name (e))

            return VariantPrerequisiteIntermediate ({
              id,
              name: `${renderMaybe (mname)} ${value}`,
            })
          }
          else {
            const id = ANCIAA_.id (x)
            const active = ANCIAA.isActive (x)
            const name = ANCIAA_.name (x)
            const finalCost = ANCIAA_.finalCost (x)

            return VariantPrerequisiteIntermediate ({
              id,
              name: `${name} (${finalCost} ${translate (l10n) ("adventurepoints.short")})`,
              active: Just (active),
            })
          }
        }),
    sortRecordsByName (L10n.A.id (l10n)),
    map (x => {
          if (Maybe.and (VariantPrerequisiteIntermediate.A.active (x))) {
            return (
              <span key={VariantPrerequisiteIntermediate.A.id (x)}>
                <span className="disabled">{VariantPrerequisiteIntermediate.A.name (x)}</span>
              </span>
            )
          }
          else {
            return (
              <span key={VariantPrerequisiteIntermediate.A.id (x)}>
                {VariantPrerequisiteIntermediate.A.name (x)}
              </span>
            )
          }
        }),
    xs => <span className="hard-break">{translate (l10n) ("prerequisites")}: {xs}</span>
  )
}

interface VariantSpecialAbilitiesProps {
  variant: Record<ProfessionVariantCombined>
}

function VariantSpecialAbilities (props: VariantSpecialAbilitiesProps): JSX.Element {
  return (
    <>
      {pipe_ (
        props.variant,
        PVCA.mappedSpecialAbilities,
        map (e => (
          <span key={ANCIAA_.id (e)}>
            <span className={!ANCIAA.isActive (e) ? "disabled" : undefined}>
              {ANCIAA_.name (e)}
            </span>
          </span>
        )),
        toArray
      )}
    </>
  )
}

interface VariantLanguagesLiteracySelectionProps {
  l10n: L10nRecord
  mappedProfSelections: Record<ProfessionSelections>
  variant: Record<ProfessionVariantCombined>
}

function VariantLanguagesLiteracySelection (
  props: VariantLanguagesLiteracySelectionProps
): JSX.Element | null {
  const {
    l10n,
    mappedProfSelections,
    variant,
  } = props

  const mappedProfVariantSelections = PVCA.mappedSelections (variant)

  const msel =
    PSA[ProfessionSelectionIds.LANGUAGES_SCRIPTS] (mappedProfSelections)

  const mvariant_sel =
    PVSA[ProfessionSelectionIds.LANGUAGES_SCRIPTS] (mappedProfVariantSelections)

  if (isJust (mvariant_sel)) {
    const variant_sel = fromJust (mvariant_sel)
    const vvalue = LanguagesScriptsSelection.A.value (variant_sel)

    const main_str = translateP (l10n) ("languagesandliteracytotalingap") (List (vvalue))

    if (isJust (msel)) {
      const value = LanguagesScriptsSelection.A.value (fromJust (msel))
      const instead = translate (l10n) ("insteadof")

      return (
        <span>
          <span>{main_str} {instead} {value}</span>
        </span>
      )
    }
    else {
      return (
        <span>
          <span>{main_str}</span>
        </span>
      )
    }
  }

  return null
}

interface VariantSpecializationSelectionProps {
  l10n: L10nRecord
  mappedProfSelections: Record<ProfessionSelections>
  skills: OrderedMap<string, Record<Skill>>
  specializationSelectionString: Maybe<string>
  variant: Record<ProfessionVariantCombined>
}

function VariantSpecializationSelection (
  props: VariantSpecializationSelectionProps
): JSX.Element | null {
  const {
    l10n,
    mappedProfSelections,
    skills,
    specializationSelectionString,
    variant,
  } = props

  const mappedProfVariantSelections = PVCA.mappedSelections (variant)

  const msel =
    PSA[ProfessionSelectionIds.SPECIALIZATION] (mappedProfSelections)

  const mvariant_sel =
    PVSA[ProfessionSelectionIds.SPECIALIZATION] (mappedProfVariantSelections)

  if (isJust (mvariant_sel)) {
    const variant_sel = fromJust (mvariant_sel)

    if (isRemoveSpecializationSelection (variant_sel)) {
      return (
        <span>
          <span className="disabled">{renderMaybe (specializationSelectionString)}</span>
        </span>
      )
    }
    else {
      const vsid = SpecializationSelection.A.sid (variant_sel)

      const mskill_text =
        isList (vsid)
          ? pipe_ (
              vsid,
              mapMaybe (pipe (lookupF (skills), fmap (Skill.A.name))),
              sortStrings (L10n.A.id (l10n)),
              ensure (pipe (flength, gt (1))),
              fmap (localizeOrList (l10n))
            )
          : pipe_ (vsid, lookupF (skills), fmap (Skill.A.name))

      const mmain_text = fmapF (mskill_text)
                               (skill_text => translateP (l10n)
                                                         ("skillspecialization")
                                                         (List (skill_text)))

      if (isJust (msel)) {
        const instead = translate (l10n) ("insteadof")

        return (
          <span>
            <span>
              {renderMaybe (mmain_text)}
              {" "}
              {instead}
              {" "}
              {renderMaybe (specializationSelectionString)}
            </span>
          </span>
        )
      }
      else {
        return (
          <span>
            <span>{renderMaybe (mmain_text)}</span>
          </span>
        )
      }
    }
  }

  return null
}

interface VariantCombatTechniquesSelectionProps {
  combatTechniquesSelectionString: Maybe<string>
  l10n: L10nRecord
  mappedProfSelections: Record<ProfessionSelections>
  variant: Record<ProfessionVariantCombined>
}

function VariantCombatTechniquesSelection (
  props: VariantCombatTechniquesSelectionProps
): JSX.Element | null {
  const {
    combatTechniquesSelectionString,
    l10n,
    mappedProfSelections,
    variant,
  } = props

  const mappedProfVariantSelections = PVCA.mappedSelections (variant)

  const msel =
    PSA[ProfessionSelectionIds.COMBAT_TECHNIQUES] (mappedProfSelections)

  const mvariant_sel =
    PVSA[ProfessionSelectionIds.COMBAT_TECHNIQUES] (mappedProfVariantSelections)

  if (isJust (mvariant_sel)) {
    const variant_sel = fromJust (mvariant_sel)

    if (isRemoveCombatTechniquesSelection (variant_sel)) {
      return (
        <span>
          <span className="disabled">{renderMaybe (combatTechniquesSelectionString)}</span>
        </span>
      )
    }
    else if (isJust (msel)) {
      const sel = fromJust (msel)
      const sid = CombatTechniquesSelection.A.sid (sel)
      const amount = CombatTechniquesSelection.A.amount (sel)
      const value = CombatTechniquesSelection.A.value (sel)
      const vsid = CombatTechniquesSelection.A.sid (variant_sel)
      const vamount = CombatTechniquesSelection.A.amount (variant_sel)
      const vvalue = CombatTechniquesSelection.A.value (variant_sel)

      const hasSameSids = OrderedSet.fnull (difference (fromList (sid)) (fromList (vsid)))
      const hasSameAmount = amount === vamount

      if (hasSameSids && hasSameAmount) {
        const instead = translate (l10n) ("insteadof")

        const joinedList = pipe_ (sid, sortStrings (L10n.A.id (l10n)), localizeOrList (l10n))

        return (
          <span>
            <span>{joinedList} {vvalue} {instead} {value}</span>
          </span>
        )
      }
    }
    else {
      const vsid = CombatTechniquesSelection.A.sid (variant_sel)
      const vamount = CombatTechniquesSelection.A.amount (variant_sel)
      const vvalue = CombatTechniquesSelection.A.value (variant_sel)

      const tag = translateP (l10n)
                             ("combattechniquesselection")
                             (List<string | number> (
                               unsafeIndex (translate (l10n) ("combattechniquecounter"))
                                           (vamount - 1),
                               vvalue + 6
                             ))

      const joinedList = pipe_ (vsid, sortStrings (L10n.A.id (l10n)), intercalate (", "))

      return (
        <span>
          <span>{tag}{joinedList}</span>
        </span>
      )
    }
  }

  return null
}

interface VariantSkillsSelectionProps {
  l10n: L10nRecord
  liturgicalChants: OrderedMap<string, Record<LiturgicalChant>>
  spells: OrderedMap<string, Record<Spell>>
  variant: Record<ProfessionVariantCombined>
}

function VariantSkillsSelection (props: VariantSkillsSelectionProps): JSX.Element {
  const {
    l10n,
    liturgicalChants,
    spells,
    variant,
  } = props

  const instead = translate (l10n) ("insteadof")

  const combatTechniquesList =
    pipe_ (variant, PVCA.mappedCombatTechniques, mapVariantSkills (l10n) (6))

  const skillsList =
    pipe_ (variant, PVCA.mappedSkills, mapVariantSkills (l10n) (0))

  const combinedSpellsList = combineSpells (spells) (PVCA.mappedSpells (variant))

  const spellsList =
    mapMaybe ((e: ListI<CombinedSpells>) => {
               if (CombinedSpell.is (e)) {
                 const newId = CSA.newId (e)
                 const oldId = CSA.oldId (e)
                 const value = CSA.value (e)

                 const mnew_spell_name = mapSpellNames (l10n) (spells) (newId)
                 const mold_spell_name = mapSpellNames (l10n) (spells) (oldId)

                 return liftM2 ((new_spell_name: string) => (old_spell_name: string) =>
                                 `${new_spell_name} ${value} ${instead} ${old_spell_name} ${value}`)
                               (mnew_spell_name)
                               (mold_spell_name)
               }
               else if (IncreasableListForView.is (e)) {
                const ids = ILFVA.id (e)
                const value = ILFVA.value (e)
                const previous = Maybe.sum (ILFVA.previous (e))

                return fmapF (mapSpellNames (l10n) (spells) (ids))
                             (name => `${name} ${previous + value} ${instead} ${previous}`)
               }
               else {
                 const id = IFVA.id (e)
                 const value = IFVA.value (e)
                 const previous = Maybe.sum (IFVA.previous (e))

                 return fmapF (mapSpellNames (l10n) (spells) (id))
                              (name => `${name} ${previous + value} ${instead} ${previous}`)
               }
             })
             (combinedSpellsList)

  const combinedList =
    intercalate (", ")
                (List (
                  ...sortStrings (L10n.A.id (l10n)) (combatTechniquesList),
                  ...sortStrings (L10n.A.id (l10n)) (skillsList),
                  ...sortStrings (L10n.A.id (l10n)) (spellsList)
                ))

  return maybeR (<span>{combinedList}</span>)
                ((chants: NonEmptyList<CombinedMappedSpell>) => {
                  const blessings = translate (l10n) ("thetwelveblessings")

                  return pipe_ (
                    chants,
                    mapMaybe (e => {
                      if (IncreasableListForView.is (e)) {
                        const names = mapMaybe (lookupF (liturgicalChants)) (ILFVA.id (e))

                        return fmapF (ensure (pipe (flength, gt (1))) (names))
                                     (pipe (
                                       localizeOrList (l10n),
                                       name => `${name} ${ILFVA.value (e)}`
                                     ))
                      }
                      else {
                        const mname = lookup (IFVA.id (e)) (liturgicalChants)

                        return fmapF (mname)
                                     (name => `${name} ${IFVA.value (e)}`)
                      }
                    }),
                    flength (PVCA_.blessings (variant)) === 12 ? consF (blessings) : ident,
                    sortStrings (L10n.A.id (l10n)),
                    intercalate (", "),
                    xs => ` ${translate (l10n) ("liturgicalchants")}: ${xs}`,
                    str => <span>{combinedList}{str}</span>
                  )
                })
                (ensure (notNull) (PVCA.mappedLiturgicalChants (variant)))
}

const mapSpellNames =
  (l10n: L10nRecord) =>
  (spells: OrderedMap<string, Record<Spell>>) =>
  (ids: string | NonEmptyList<string>) =>
    isList (ids)
      ? pipe_ (
          ids,
          mapMaybe (pipe (lookupF (spells), fmap (Spell.A.name))),
          ensure (pipe (flength, gt (1))),
          fmap (localizeOrList (l10n))
        )
      : fmapF (lookup (ids) (spells)) (Spell.A.name)

const mapVariantSkills =
  (l10n: L10nRecord) =>
  (add_x: number) =>
    map ((e: Record<IncreasableForView>) => {
      const prev = maybe (6) (add (add_x)) (IFVA.previous (e))

      return `${IFVA.name (e)} ${prev + IFVA.value (e)} ${translate (l10n) ("insteadof")} ${prev}`
    })

interface CombinedSpell {
  newId: string | NonEmptyList<string>
  oldId: string | NonEmptyList<string>
  value: number
}

const CombinedSpell = fromDefault<CombinedSpell> ({ newId: "", oldId: "", value: 0 })

const CSA = CombinedSpell.A

type CombinedMappedSpell = Record<IncreasableForView> | Record<IncreasableListForView>

type CombinedSpells = List<CombinedMappedSpell | Record<CombinedSpell>>

type CombinedSpellsTriple = Tuple<[
                              List<CombinedMappedSpell>,
                              List<Record<CombinedSpell>>,
                              List<CombinedMappedSpell>
                            ]>

type CombinedSpellsTripleValid = Tuple<[
                                   NonEmptyList<CombinedMappedSpell>,
                                   List<Record<CombinedSpell>>,
                                   List<CombinedMappedSpell>
                                 ]>

const combineSpellsPred =
  (x: CombinedSpellsTriple): x is CombinedSpellsTripleValid =>
    pipe_ (x, sel1, notNull)

const getCombinedSpellId =
  (x: CombinedMappedSpell) => IncreasableListForView.is (x) ? ILFVA.id (x) : IFVA.id (x)

const combineSpells =
  (spells: OrderedMap<string, Record<Spell>>) =>
  (xs: List<CombinedMappedSpell>): CombinedSpells => {

  type CST = CombinedSpellsTriple

  return pipe_ (
    Tuple (xs, List<Record<CombinedSpell>> (), List<CombinedMappedSpell> ()),
    whilePred (combineSpellsPred)
              ((t: CombinedSpellsTripleValid) => {
                const olds = sel1 (t)
                const combined_spells = sel2 (t)
                const single_spells = sel3 (t)

                const molds_separate = uncons (olds)
                const olds_separate =
                  fromJust (
                    molds_separate as
                      Just<Pair<CombinedMappedSpell, List<CombinedMappedSpell>>>
                  )

                const base = fst (olds_separate)
                const id = getCombinedSpellId (base)

                const value = IFVAL.value (base)

                const mprevious = IFVAL.previous (base)

                const olds_left = snd (olds_separate)

                const mbase_spell = lookup (id) (spells)

                return maybe<CST> (t)
                                  (_ =>
                                    maybe_ (() => {
                                             const mmatching_spell_index =
                                               findIndex ((e: CombinedMappedSpell) => {
                                                           const curr_id = getCombinedSpellId (e)
                                                           const curr_value = IFVAL.value (e)
                                                           const mcurr_previous = IFVAL.previous (e)

                                                           const matching_spell_exists =
                                                             isList (curr_id)
                                                               ? all (memberF (spells)) (curr_id)
                                                               : member (curr_id) (spells)

                                                           return Maybe.elem (value)
                                                                             (mcurr_previous)
                                                             && curr_value === 0
                                                             && matching_spell_exists
                                                         })
                                                         (olds_left)

                                             return maybe_ (() => pipe_ (
                                                                    t,
                                                                    upd1 (olds_left),
                                                                    upd3 (cons (single_spells)
                                                                               (base))
                                                                  ))
                                                           ((index: number) => {
                                                             const matching_spell =
                                                               unsafeIndex (olds_left) (index)

                                                             const oldId =
                                                               getCombinedSpellId (matching_spell)

                                                             return pipe_ (
                                                               t,
                                                               upd1 (deleteAt (index) (olds_left)),
                                                               upd2 (cons (combined_spells)
                                                                          (CombinedSpell ({
                                                                            oldId,
                                                                            newId: id,
                                                                            value,
                                                                          })))
                                                             )
                                                           })
                                                           (mmatching_spell_index)
                                           })
                                           ((previous: number) => {
                                             const mmatching_spell_index =
                                               findIndex ((e: CombinedMappedSpell) => {
                                                           const curr_id = getCombinedSpellId (e)
                                                           const curr_value = IFVAL.value (e)

                                                           const matching_spell_exists =
                                                             isList (curr_id)
                                                               ? all (memberF (spells)) (curr_id)
                                                               : member (curr_id) (spells)

                                                           return curr_value === previous
                                                             && matching_spell_exists
                                                         })
                                                         (olds_left)

                                             return maybe_ (() => pipe_ (
                                                                    t,
                                                                    upd1 (olds_left),
                                                                    upd3 (cons (single_spells)
                                                                               (base))
                                                                  ))
                                                           ((index: number) => {
                                                             const matching_spell =
                                                               unsafeIndex (olds_left) (index)

                                                             const newId =
                                                               getCombinedSpellId (matching_spell)

                                                             return pipe_ (
                                                               t,
                                                               upd1 (deleteAt (index) (olds_left)),
                                                               upd2 (cons (combined_spells)
                                                                          (CombinedSpell ({
                                                                            oldId: id,
                                                                            newId,
                                                                            value,
                                                                          })))
                                                             )
                                                           })
                                                           (mmatching_spell_index)
                                           })
                                           (mprevious))
                                  (mbase_spell)
              }),
    x => append<CombinedMappedSpell | Record<CombinedSpell>> (sel1 (x)) (sel2 (x))
  )
}