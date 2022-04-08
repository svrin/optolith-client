import { fromDefault, makeLenses, Record } from "../../../Data/Record"
import { pipe } from "../../Utilities/pipe"
import { ActivatableSkillDependent } from "../ActiveEntries/ActivatableSkillDependent"
import { LiturgicalChant } from "../Wiki/LiturgicalChant"
import { IncreasableWithRequirements } from "./viewTypeHelpers"

export interface LiturgicalChantWithRequirements extends IncreasableWithRequirements {
    "@@name": "LiturgicalChantWithRequirements"
    wikiEntry: Record<LiturgicalChant>
    stateEntry: Record<ActivatableSkillDependent>
  }

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LiturgicalChantWithRequirements =
  fromDefault ("LiturgicalChantWithRequirements")
              <LiturgicalChantWithRequirements> ({
                wikiEntry: LiturgicalChant .default,
                stateEntry: ActivatableSkillDependent .default,
                isIncreasable: false,
                isDecreasable: false,
              })

const LCWRA = LiturgicalChantWithRequirements.A
const LCA = LiturgicalChant.A
const ASDA = ActivatableSkillDependent.A

export const LiturgicalChantWithRequirementsA_ = {
  id: pipe (LCWRA.wikiEntry, LCA.id),
  name: pipe (LCWRA.wikiEntry, LCA.name),
  nameShort: pipe (LCWRA.wikiEntry, LCA.nameShort),
  check: pipe (LCWRA.wikiEntry, LCA.check),
  checkmod: pipe (LCWRA.wikiEntry, LCA.checkmod),
  ic: pipe (LCWRA.wikiEntry, LCA.ic),
  gr: pipe (LCWRA.wikiEntry, LCA.gr),
  value: pipe (LCWRA.stateEntry, ASDA.value),
  costShort: pipe (LCWRA.wikiEntry, LCA.costShort),
  castingTimeShort: pipe (LCWRA.wikiEntry, LCA.castingTimeShort),
  rangeShort: pipe (LCWRA.wikiEntry, LCA.rangeShort),
  durationShort: pipe (LCWRA.wikiEntry, LCA.durationShort),
  tradition: pipe (LCWRA.wikiEntry, LCA.tradition),
  aspects: pipe (LCWRA.wikiEntry, LCA.aspects),
  effect: pipe (LCWRA.wikiEntry, LCA.effect),
  src: pipe (LCWRA.wikiEntry, LCA.src),
}

export const LiturgicalChantWithRequirementsL = makeLenses (LiturgicalChantWithRequirements)
