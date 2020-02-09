import * as React from "react"
import { useDispatch } from "react-redux"
import { ident } from "../../../Data/Function"
import { fmap } from "../../../Data/Functor"
import { consF, find, List, map, notNull } from "../../../Data/List"
import { bind, ensure, join, Just, liftM2, Maybe, maybe } from "../../../Data/Maybe"
import { Record } from "../../../Data/Record"
import { selectProfessionVariant } from "../../Actions/ProfessionVariantActions"
import { Sex } from "../../Models/Hero/heroTypeHelpers"
import { ProfessionCombined, ProfessionCombinedA_ } from "../../Models/View/ProfessionCombined"
import { ProfessionVariantCombinedA_ } from "../../Models/View/ProfessionVariantCombined"
import { RadioOption } from "../../Models/View/RadioOption"
import { L10nRecord } from "../../Models/Wiki/L10n"
import { translate, translateP } from "../../Utilities/I18n"
import { pipe, pipe_ } from "../../Utilities/pipe"
import { getNameBySex } from "../../Utilities/rcpUtils"
import { sortRecordsByName } from "../../Utilities/sortBy"
import { RadioButtonGroup } from "../Universal/RadioButtonGroup"

export interface ProfessionVariantsProps {
  currentProfessionId: Maybe<string>
  currentProfessionVariantId: Maybe<string>
  l10n: L10nRecord
  professions: Maybe<List<Record<ProfessionCombined>>>
  sex: Maybe<Sex>
}

const PCA = ProfessionCombined.A
const PCA_ = ProfessionCombinedA_
const PVCA_ = ProfessionVariantCombinedA_

export const ProfessionVariants: React.FC<ProfessionVariantsProps> = props => {
  const {
    currentProfessionId,
    currentProfessionVariantId,
    l10n,
    professions,
    sex: msex,
  } = props

  const dispatch = useDispatch ()

  const handleProfessionVariantSelect =
    React.useCallback (
      (id: Maybe<string>) => dispatch (selectProfessionVariant (id)),
      [ dispatch ]
    )

  const mvars =
    liftM2 ((sex: Sex) => (prof: Record<ProfessionCombined>) =>
             pipe_ (
               prof,
               PCA.mappedVariants,
               ensure (notNull),
               fmap (pipe (
                 map (prof_var => {
                   const name = getNameBySex (sex) (PVCA_.name (prof_var))
                   const ap = Maybe.sum (PCA_.ap (prof)) + PVCA_.ap (prof_var)

                   return RadioOption ({
                     name: translateP (l10n)
                                      ("general.withapvalue")
                                      (List<string | number> (name, ap)),
                     value: Just (PVCA_.id (prof_var)),
                   })
                 }),
                 sortRecordsByName (l10n),
                 PCA_.isVariantRequired (prof)
                   ? ident
                   : consF (RadioOption ({
                              name: translate (l10n) ("profession.variants.novariant"),
                            }))
               ))
             ))
           (msex)
           (bind (professions) (find (pipe (PCA_.id, Maybe.elemF (currentProfessionId)))))

  return maybe (<></>)
               ((vars: List<Record<RadioOption<string>>>) => (
                 <RadioButtonGroup
                   active={currentProfessionVariantId}
                   onClick={handleProfessionVariantSelect}
                   array={vars}
                   />
               ))
               (join (mvars))
}
