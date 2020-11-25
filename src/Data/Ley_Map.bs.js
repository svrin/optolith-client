// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var $$Map = require("bs-platform/lib/js/map.js");
var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Ley_Int$OptolithClient = require("./Ley_Int.bs.js");
var Ley_List$OptolithClient = require("./Ley_List.bs.js");
var Ley_Tuple$OptolithClient = require("./Ley_Tuple.bs.js");
var Ley_Option$OptolithClient = require("./Ley_Option.bs.js");
var Ley_Result$OptolithClient = require("./Ley_Result.bs.js");
var Ley_Foldable$OptolithClient = require("./Ley_Foldable.bs.js");
var Ley_Function$OptolithClient = require("./Ley_Function.bs.js");

function Make(Key) {
  var TypedMap = $$Map.Make(Key);
  var foldr = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, (function (param, v, acc) {
                  return Curry._2(f, v, acc);
                }), mp, initial);
  };
  var foldl = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, (function (param, v, acc) {
                  return Curry._2(f, acc, v);
                }), mp, initial);
  };
  var include = Ley_Foldable$OptolithClient.Make({
        foldr: foldr,
        foldl: foldl
      });
  var foldr$1 = include.foldr;
  var $$null = function (mp) {
    return Curry._1(TypedMap.is_empty, mp);
  };
  var member = TypedMap.mem;
  var notMember = function (key, mp) {
    return !Curry._2(member, key, mp);
  };
  var lookup = function (key, mp) {
    return Curry._2(Ley_Option$OptolithClient.Infix.$less$$great, (function (prim) {
                  return prim[1];
                }), Curry._2(TypedMap.find_first_opt, (function (k) {
                      return Curry._2(Key.compare, k, key) === 0;
                    }), mp));
  };
  var findWithDefault = function (def, key, mp) {
    return Ley_Option$OptolithClient.fromOption(def, lookup(key, mp));
  };
  var empty = TypedMap.empty;
  var insert = TypedMap.add;
  var insertWith = function (f, key, value, mp) {
    return Curry._3(insert, key, Ley_Option$OptolithClient.option(value, Curry._1(f, value), lookup(key, mp)), mp);
  };
  var insertWithKey = function (f, key, value, mp) {
    return Curry._3(insert, key, Ley_Option$OptolithClient.option(value, Curry._2(f, key, value), lookup(key, mp)), mp);
  };
  var insertLookupWithKey = function (f, key, value, mp) {
    var old = lookup(key, mp);
    return [
            old,
            Curry._3(insert, key, Ley_Option$OptolithClient.option(value, Curry._2(f, key, value), old), mp)
          ];
  };
  var adjust = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Caml_option.some(Curry._1(f, Caml_option.valFromOption(mx)));
                  }
                  
                }), mp);
  };
  var adjustWithKey = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Caml_option.some(Curry._2(f, key, Caml_option.valFromOption(mx)));
                  }
                  
                }), mp);
  };
  var update = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Curry._1(f, Caml_option.valFromOption(mx));
                  }
                  
                }), mp);
  };
  var updateWithKey = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, (function (mx) {
                  if (mx !== undefined) {
                    return Curry._2(f, key, Caml_option.valFromOption(mx));
                  }
                  
                }), mp);
  };
  var updateLookupWithKey = function (f, key, mp) {
    var old = lookup(key, mp);
    return [
            old,
            Curry._3(TypedMap.update, key, (function (mx) {
                    if (mx !== undefined) {
                      return Curry._2(f, key, Caml_option.valFromOption(mx));
                    }
                    
                  }), mp)
          ];
  };
  var alter = function (f, key, mp) {
    return Curry._3(TypedMap.update, key, Curry.__1(f), mp);
  };
  var union = function (mp1, mp2) {
    return Curry._3(TypedMap.union, (function (param, x, param$1) {
                  return Caml_option.some(x);
                }), mp1, mp2);
  };
  var mapWithKey = TypedMap.mapi;
  var foldrWithKey = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, Curry.__3(f), mp, initial);
  };
  var foldlWithKey = function (f, initial, mp) {
    return Curry._3(TypedMap.fold, (function (key, v, acc) {
                  return Curry._3(f, acc, key, v);
                }), mp, initial);
  };
  var elems = function (mp) {
    return List.map((function (prim) {
                  return prim[1];
                }), Curry._1(TypedMap.bindings, mp));
  };
  var keys = function (mp) {
    return List.map((function (prim) {
                  return prim[0];
                }), Curry._1(TypedMap.bindings, mp));
  };
  var assocs = TypedMap.bindings;
  var fromList = function (ps) {
    return List.fold_left((function (mp, param) {
                  return Curry._3(insert, param[0], param[1], mp);
                }), empty, ps);
  };
  var fromArray = function (ps) {
    return $$Array.fold_left((function (mp, param) {
                  return Curry._3(insert, param[0], param[1], mp);
                }), empty, ps);
  };
  var filter = function (pred, mp) {
    return Curry._2(TypedMap.filter, (function (param, x) {
                  return Curry._1(pred, x);
                }), mp);
  };
  var mapMaybe = function (f, mp) {
    return Curry._3(TypedMap.fold, (function (k, x, acc) {
                  var y = Curry._1(f, x);
                  if (y !== undefined) {
                    return Curry._3(insert, k, Caml_option.valFromOption(y), acc);
                  } else {
                    return acc;
                  }
                }), mp, empty);
  };
  var mapMaybeWithKey = function (f, mp) {
    return Curry._3(TypedMap.fold, (function (k, x, acc) {
                  var y = Curry._2(f, k, x);
                  if (y !== undefined) {
                    return Curry._3(insert, k, Caml_option.valFromOption(y), acc);
                  } else {
                    return acc;
                  }
                }), mp, empty);
  };
  var zip = function (mp1, mp2) {
    return mapMaybeWithKey((function (k, v1) {
                  return Curry._2(Ley_Option$OptolithClient.Infix.$less$$great, (function (param) {
                                return Ley_Tuple$OptolithClient.pair(v1, param);
                              }), lookup(k, mp2));
                }), mp1);
  };
  var zipOption = function (mp1, mp2) {
    return Curry._2(mapWithKey, (function (k, v1) {
                  return [
                          v1,
                          lookup(k, mp2)
                        ];
                }), mp1);
  };
  var countWith = function (pred, mp) {
    return Curry._3(foldr$1, (function (x) {
                  if (Curry._1(pred, x)) {
                    return Ley_Int$OptolithClient.inc;
                  } else {
                    return Ley_Function$OptolithClient.id;
                  }
                }), 0, mp);
  };
  var countWithKey = function (pred, mp) {
    return foldrWithKey((function (key, x) {
                  if (Curry._2(pred, key, x)) {
                    return Ley_Int$OptolithClient.inc;
                  } else {
                    return Ley_Function$OptolithClient.id;
                  }
                }), 0, mp);
  };
  var countBy = function (f, xs) {
    return Curry._3(Ley_List$OptolithClient.foldr, (function (x) {
                  var partial_arg = Curry._1(f, x);
                  return function (param) {
                    return alter((function (acc) {
                                  return Ley_Option$OptolithClient.option(1, Ley_Int$OptolithClient.inc, acc);
                                }), partial_arg, param);
                  };
                }), empty, xs);
  };
  var countByM = function (f, xs) {
    return Curry._3(Ley_List$OptolithClient.foldr, (function (x) {
                  return Ley_Option$OptolithClient.option(Ley_Function$OptolithClient.id, (function (key) {
                                return function (param) {
                                  return alter((function (acc) {
                                                return Ley_Option$OptolithClient.option(1, Ley_Int$OptolithClient.inc, acc);
                                              }), key, param);
                                };
                              }), Curry._1(f, x));
                }), empty, xs);
  };
  var groupBy = function (f, xs) {
    return Curry._3(Ley_List$OptolithClient.foldr, (function (x) {
                  var partial_arg = Curry._1(f, x);
                  return function (param) {
                    return alter((function (acc) {
                                  return Ley_Option$OptolithClient.option({
                                              hd: x,
                                              tl: /* [] */0
                                            }, (function (param) {
                                                return Ley_List$OptolithClient.$less$plus$great(x, param);
                                              }), acc);
                                }), partial_arg, param);
                  };
                }), empty, xs);
  };
  var mapMEitherHelper = function (f, xs) {
    if (!xs) {
      return {
              TAG: /* Ok */0,
              _0: /* [] */0
            };
    }
    var match = xs.hd;
    var new_value = Curry._1(f, match[1]);
    if (new_value.TAG) {
      return {
              TAG: /* Error */1,
              _0: new_value._0
            };
    }
    var zs = mapMEitherHelper(f, xs.tl);
    if (zs.TAG) {
      return {
              TAG: /* Error */1,
              _0: zs._0
            };
    } else {
      return {
              TAG: /* Ok */0,
              _0: {
                hd: [
                  match[0],
                  new_value._0
                ],
                tl: zs._0
              }
            };
    }
  };
  var mapMEither = function (f, mp) {
    return Ley_Result$OptolithClient.Functor.$less$$great(fromList, mapMEitherHelper(f, Curry._1(assocs, mp)));
  };
  return {
          foldr: foldr$1,
          foldl: include.foldl,
          toList: include.toList,
          length: include.length,
          elem: include.elem,
          sum: include.sum,
          maximum: include.maximum,
          minimum: include.minimum,
          concat: include.concat,
          concatMap: include.concatMap,
          con: include.con,
          dis: include.dis,
          any: include.any,
          all: include.all,
          notElem: include.notElem,
          find: include.find,
          mapMEither: mapMEither,
          $$null: $$null,
          size: TypedMap.cardinal,
          member: member,
          notMember: notMember,
          lookup: lookup,
          findWithDefault: findWithDefault,
          empty: empty,
          singleton: TypedMap.singleton,
          insert: insert,
          insertWith: insertWith,
          insertWithKey: insertWithKey,
          insertLookupWithKey: insertLookupWithKey,
          $$delete: TypedMap.remove,
          adjust: adjust,
          adjustWithKey: adjustWithKey,
          update: update,
          updateWithKey: updateWithKey,
          updateLookupWithKey: updateLookupWithKey,
          alter: alter,
          union: union,
          map: TypedMap.map,
          mapWithKey: mapWithKey,
          foldrWithKey: foldrWithKey,
          foldlWithKey: foldlWithKey,
          elems: elems,
          keys: keys,
          assocs: assocs,
          fromList: fromList,
          fromArray: fromArray,
          filter: filter,
          filterWithKey: TypedMap.filter,
          mapMaybe: mapMaybe,
          mapMaybeWithKey: mapMaybeWithKey,
          zip: zip,
          zipOption: zipOption,
          countWith: countWith,
          countWithKey: countWithKey,
          countBy: countBy,
          countByM: countByM,
          groupBy: groupBy
        };
}

exports.Make = Make;
/* Ley_List-OptolithClient Not a pure module */
