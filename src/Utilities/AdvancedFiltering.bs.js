// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Intl$OptolithClient = require("./Intl.bs.js");
var Ley_List$OptolithClient = require("../Data/Ley_List.bs.js");
var Ley_Function$OptolithClient = require("../Data/Ley_Function.bs.js");

function searchByMulti(searchAccessors, filterText, xs) {
  if (searchAccessors) {
    return Ley_List$OptolithClient.filter((function (x) {
                  return Curry._2(Ley_List$OptolithClient.any, (function (pred) {
                                if (pred.TAG) {
                                  return Curry._2(Ley_List$OptolithClient.any, (function (x$prime) {
                                                return Ley_List$OptolithClient.isInfixOf(Ley_List$OptolithClient.Extra.lower(filterText), Ley_List$OptolithClient.Extra.lower(x$prime));
                                              }), Curry._1(pred._0, x));
                                } else {
                                  return Ley_List$OptolithClient.isInfixOf(Ley_List$OptolithClient.Extra.lower(filterText), Ley_List$OptolithClient.Extra.lower(Curry._1(pred._0, x)));
                                }
                              }), searchAccessors);
                }), xs);
  } else {
    return xs;
  }
}

function sortByMulti(sortOptions, xs) {
  if (Curry._1(Ley_List$OptolithClient.length, xs) < 2 || Curry._1(Ley_List$OptolithClient.$$null, sortOptions)) {
    return xs;
  }
  var sortFunctions = Curry._2(Ley_List$OptolithClient.map, (function (x) {
          if (!x.reverse) {
            return x.compare;
          }
          var partial_arg = x.compare;
          return function (param, param$1) {
            return Ley_Function$OptolithClient.flip(partial_arg, param, param$1);
          };
        }), sortOptions);
  return Ley_List$OptolithClient.sortBy(function (param, param$1) {
                var _sortFunctions = sortFunctions;
                while(true) {
                  var sortFunctions$1 = _sortFunctions;
                  if (!sortFunctions$1) {
                    return /* EQ */1;
                  }
                  var match = Curry._2(sortFunctions$1.hd, param, param$1);
                  if (match !== 1) {
                    return match;
                  }
                  _sortFunctions = sortFunctions$1.tl;
                  continue ;
                };
              })(xs);
}

function compareLocale(staticData) {
  var partial_arg = Intl$OptolithClient.Collator.createWithOptions(staticData.messages.id, {
        numeric: true
      });
  return function (param, param$1) {
    return Intl$OptolithClient.Collator.compare(partial_arg, param, param$1);
  };
}

function sortStrings(staticData, xs) {
  return Ley_List$OptolithClient.sortBy(compareLocale(staticData))(xs);
}

function searchAndSortByMulti(searchAccessors, sortOptions, filterText, xs) {
  return sortByMulti(sortOptions, searchByMulti(searchAccessors, filterText, xs));
}

exports.searchByMulti = searchByMulti;
exports.sortByMulti = sortByMulti;
exports.compareLocale = compareLocale;
exports.sortStrings = sortStrings;
exports.searchAndSortByMulti = searchAndSortByMulti;
/* Intl-OptolithClient Not a pure module */
