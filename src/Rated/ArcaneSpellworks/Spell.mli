(** This module contains definitions and simple utility functions for both the
    dynamic and the static parts of a spell. *)

module Static : sig
  type t = {
    id : Id.Spell.t;
    name : string;
    check : Check.t;
    check_mod : Check.Modifier.t option;
    effect : string;
    casting_time : Rated.Static.Activatable.MainParameter.t;
    cost : Rated.Static.Activatable.MainParameter.t;
    range : Rated.Static.Activatable.MainParameter.t;
    duration : Rated.Static.Activatable.MainParameter.t;
    target : string;
    property : int;
    traditions : Id.MagicalTradition.Set.t;
    ic : ImprovementCost.t;
    prerequisites : Prerequisite.Collection.Spellwork.t;
    enhancements : Enhancement.Static.t IntMap.t;
    src : PublicationRef.list;
    errata : Erratum.list;
  }
  (** The spell type. *)

  module Decode : sig
    val make_assoc : (Id.Spell.t, t) Parsing.make_assoc
  end
end

module Dynamic :
  Rated.Dynamic.Activatable.ByMagicalTradition.S
    with type id = Id.Spell.t
     and type static = Static.t