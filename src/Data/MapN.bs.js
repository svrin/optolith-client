// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as List from "bs-platform/lib/es6/list.js";
import * as $$Array from "bs-platform/lib/es6/array.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_int from "bs-platform/lib/es6/js_int.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as Ley_Option$OptolithClient from "./Ley_Option.bs.js";
import * as Ley_Result$OptolithClient from "./Ley_Result.bs.js";
import * as Ley_Function$OptolithClient from "./Ley_Function.bs.js";

function entries(x) {
  return Array.from(x.entries());
}

function keys(x) {
  return Array.from(x.keys());
}

function values(x) {
  return Array.from(x.values());
}

var Native = {
  entries: entries,
  keys: keys,
  values: values
};

function foldr(f, initial, mp) {
  return Array.from(mp.entries()).reduceRight((function (acc, param) {
                return Curry._2(f, param[1], acc);
              }), initial);
}

function foldl(f, initial, mp) {
  return Array.from(mp.entries()).reduce((function (acc, param) {
                return Curry._2(f, acc, param[1]);
              }), initial);
}

function toList(mp) {
  return $$Array.to_list(Array.from(mp.entries()));
}

function $$null(mp) {
  return mp.size() === 0;
}

function length(prim) {
  return prim.size();
}

function elem(e, mp) {
  return Array.from(mp.values()).some(function (x) {
              return Caml_obj.caml_equal(x, e);
            });
}

function sum(mp) {
  return foldr((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, mp);
}

function product(mp) {
  return foldr((function (prim, prim$1) {
                return Math.imul(prim, prim$1);
              }), 1, mp);
}

function maximum(mp) {
  return foldr((function (prim, prim$1) {
                return Math.max(prim, prim$1);
              }), Js_int.min, mp);
}

function minimum(mp) {
  return foldr((function (prim, prim$1) {
                return Math.min(prim, prim$1);
              }), Js_int.max, mp);
}

function concat(mp) {
  return foldl(List.append, /* [] */0, mp);
}

function concatMap(f, mp) {
  return new Map(Array.from(mp.entries()).reduce((function (acc, param) {
                    var x = Curry._1(f, param[1]);
                    return Array.from(x.entries()).concat(acc);
                  }), []));
}

function con(mp) {
  return Array.from(mp.values()).every(Ley_Function$OptolithClient.id);
}

function dis(mp) {
  return Array.from(mp.values()).some(Ley_Function$OptolithClient.id);
}

function any(pred, mp) {
  return Array.from(mp.values()).some(Curry.__1(pred));
}

function all(pred, mp) {
  return Array.from(mp.values()).every(Curry.__1(pred));
}

function notElem(e, mp) {
  return !elem(e, mp);
}

function find(pred, mp) {
  return Caml_option.undefined_to_opt(Array.from(mp.values()).find(Curry.__1(pred)));
}

var Foldable = {
  foldr: foldr,
  foldl: foldl,
  toList: toList,
  $$null: $$null,
  length: length,
  elem: elem,
  sum: sum,
  product: product,
  maximum: maximum,
  minimum: minimum,
  concat: concat,
  concatMap: concatMap,
  con: con,
  dis: dis,
  any: any,
  all: all,
  notElem: notElem,
  find: find
};

function mapMEitherHelper(f, xs) {
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
}

function mapMEither(f, mp) {
  return Ley_Result$OptolithClient.Functor.$less$$great((function (xs) {
                return new Map($$Array.of_list(xs));
              }), mapMEitherHelper(f, $$Array.to_list(Array.from(mp.entries()))));
}

var Traversable = {
  mapMEither: mapMEither
};

function size(prim) {
  return prim.size();
}

function member(key, mp) {
  return Array.from(mp.keys()).some(function (k) {
              return Caml_obj.caml_equal(k, key);
            });
}

function notMember(key, mp) {
  return !Array.from(mp.keys()).some(function (k) {
              return Caml_obj.caml_equal(k, key);
            });
}

function lookup(key, mp) {
  return Curry._2(Ley_Option$OptolithClient.Infix.$less$$great, (function (prim) {
                return prim[1];
              }), Caml_option.undefined_to_opt(Array.from(mp.entries()).find(function (param) {
                      return Caml_obj.caml_equal(param[0], key);
                    })));
}

function findWithDefault(def, key, mp) {
  return Ley_Option$OptolithClient.fromOption(def, lookup(key, mp));
}

export {
  Native ,
  Foldable ,
  Traversable ,
  size ,
  member ,
  notMember ,
  lookup ,
  findWithDefault ,

}
/* Ley_Option-OptolithClient Not a pure module */
