// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Ley_Map$OptolithClient = require("./Ley_Map.bs.js");

function compare(x, y) {
  return y - x | 0;
}

var IntMap = Ley_Map$OptolithClient.Make({
      compare: compare
    });

var foldr = IntMap.foldr;

var foldl = IntMap.foldl;

var toList = IntMap.toList;

var length = IntMap.length;

var elem = IntMap.elem;

var sum = IntMap.sum;

var maximum = IntMap.maximum;

var minimum = IntMap.minimum;

var concat = IntMap.concat;

var concatMap = IntMap.concatMap;

var con = IntMap.con;

var dis = IntMap.dis;

var any = IntMap.any;

var all = IntMap.all;

var notElem = IntMap.notElem;

var find = IntMap.find;

var mapMEither = IntMap.mapMEither;

var $$null = IntMap.$$null;

var size = IntMap.size;

var member = IntMap.member;

var notMember = IntMap.notMember;

var lookup = IntMap.lookup;

var findWithDefault = IntMap.findWithDefault;

var empty = IntMap.empty;

var singleton = IntMap.singleton;

var insert = IntMap.insert;

var insertWith = IntMap.insertWith;

var insertWithKey = IntMap.insertWithKey;

var insertLookupWithKey = IntMap.insertLookupWithKey;

var $$delete = IntMap.$$delete;

var adjust = IntMap.adjust;

var adjustWithKey = IntMap.adjustWithKey;

var update = IntMap.update;

var updateWithKey = IntMap.updateWithKey;

var updateLookupWithKey = IntMap.updateLookupWithKey;

var alter = IntMap.alter;

var union = IntMap.union;

var map = IntMap.map;

var mapWithKey = IntMap.mapWithKey;

var foldrWithKey = IntMap.foldrWithKey;

var foldlWithKey = IntMap.foldlWithKey;

var elems = IntMap.elems;

var keys = IntMap.keys;

var assocs = IntMap.assocs;

var fromList = IntMap.fromList;

var fromArray = IntMap.fromArray;

var filter = IntMap.filter;

var filterWithKey = IntMap.filterWithKey;

var mapMaybe = IntMap.mapMaybe;

var mapMaybeWithKey = IntMap.mapMaybeWithKey;

var zip = IntMap.zip;

var zipOption = IntMap.zipOption;

var countWith = IntMap.countWith;

var countWithKey = IntMap.countWithKey;

var countBy = IntMap.countBy;

var countByM = IntMap.countByM;

var groupBy = IntMap.groupBy;

exports.IntMap = IntMap;
exports.foldr = foldr;
exports.foldl = foldl;
exports.toList = toList;
exports.length = length;
exports.elem = elem;
exports.sum = sum;
exports.maximum = maximum;
exports.minimum = minimum;
exports.concat = concat;
exports.concatMap = concatMap;
exports.con = con;
exports.dis = dis;
exports.any = any;
exports.all = all;
exports.notElem = notElem;
exports.find = find;
exports.mapMEither = mapMEither;
exports.$$null = $$null;
exports.size = size;
exports.member = member;
exports.notMember = notMember;
exports.lookup = lookup;
exports.findWithDefault = findWithDefault;
exports.empty = empty;
exports.singleton = singleton;
exports.insert = insert;
exports.insertWith = insertWith;
exports.insertWithKey = insertWithKey;
exports.insertLookupWithKey = insertLookupWithKey;
exports.$$delete = $$delete;
exports.adjust = adjust;
exports.adjustWithKey = adjustWithKey;
exports.update = update;
exports.updateWithKey = updateWithKey;
exports.updateLookupWithKey = updateLookupWithKey;
exports.alter = alter;
exports.union = union;
exports.map = map;
exports.mapWithKey = mapWithKey;
exports.foldrWithKey = foldrWithKey;
exports.foldlWithKey = foldlWithKey;
exports.elems = elems;
exports.keys = keys;
exports.assocs = assocs;
exports.fromList = fromList;
exports.fromArray = fromArray;
exports.filter = filter;
exports.filterWithKey = filterWithKey;
exports.mapMaybe = mapMaybe;
exports.mapMaybeWithKey = mapMaybeWithKey;
exports.zip = zip;
exports.zipOption = zipOption;
exports.countWith = countWith;
exports.countWithKey = countWithKey;
exports.countBy = countBy;
exports.countByM = countByM;
exports.groupBy = groupBy;
/* IntMap Not a pure module */
