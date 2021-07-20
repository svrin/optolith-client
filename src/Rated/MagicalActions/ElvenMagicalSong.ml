module Static = struct
  type t = {
    id : Id.ElvenMagicalSong.t;
    name : string;
    check : Check.t;
    check_mod : Check.Modifier.t option;
    effect : string;
    cost : Rated.Static.Activatable.MainParameter.t;
    skill : Id.Skill.t NonEmptyList.t;
    property : int;
    ic : ImprovementCost.t;
    src : PublicationRef.list;
    errata : Erratum.list;
  }

  module Decode = struct
    open Decoders_bs.Decode

    type translation = {
      name : string;
      effect : string;
      cost : Rated.Static.Activatable.MainParameter.Decode.translation;
      target : string;
      errata : Erratum.list option;
    }

    let translation =
      field "name" string
      >>= fun name ->
      field "effect" string
      >>= fun effect ->
      field "cost" Rated.Static.Activatable.MainParameter.Decode.translation
      >>= fun cost ->
      field "target" string
      >>= fun target ->
      field_opt "errata" Erratum.Decode.list
      >>= fun errata -> succeed { name; effect; cost; target; errata }

    type multilingual = {
      id : Id.ElvenMagicalSong.t;
      check : Check.t;
      checkMod : Check.Modifier.t option;
      skill : Id.Skill.t NonEmptyList.t;
      property : int;
      ic : ImprovementCost.t;
      src : PublicationRef.list;
      translations : translation TranslationMap.t;
    }

    let multilingual locale_order =
      field "id" Id.ElvenMagicalSong.Decode.t
      >>= fun id ->
      field "check" Check.Decode.t
      >>= fun check ->
      field_opt "checkMod" Check.Modifier.Decode.t
      >>= fun checkMod ->
      field "skill" (NonEmptyList.Decode.one_or_many Id.Skill.Decode.t)
      >>= fun skill ->
      field "property" int
      >>= fun property ->
      field "ic" ImprovementCost.Decode.t
      >>= fun ic ->
      field "src" (PublicationRef.Decode.make_list locale_order)
      >>= fun src ->
      field "translations" (TranslationMap.Decode.t translation)
      >>= fun translations ->
      succeed { id; check; checkMod; skill; property; ic; src; translations }

    let make_assoc locale_order =
      let open Option.Infix in
      multilingual locale_order
      >|= fun multilingual ->
      multilingual.translations
      |> TranslationMap.preferred locale_order
      <&> fun translation ->
      ( multilingual.id,
        {
          id = multilingual.id;
          name = translation.name;
          check = multilingual.check;
          check_mod = multilingual.checkMod;
          effect = translation.effect;
          cost =
            Rated.Static.Activatable.MainParameter.Decode.make false
              translation.cost;
          skill = multilingual.skill;
          property = multilingual.property;
          ic = multilingual.ic;
          src = multilingual.src;
          errata = translation.errata |> Option.value ~default:[];
        } )
  end
end

module Dynamic = Rated.Dynamic.Activatable.Make (struct
  open Static

  type id = Id.ElvenMagicalSong.t

  type static = t

  let ic x = x.ic
end)