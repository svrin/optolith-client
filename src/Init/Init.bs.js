// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Path = require("path");
var Yaml = require("yaml");
var Curry = require("bs-platform/lib/js/curry.js");
var Electron = require("electron");
var Worker_threads = require("worker_threads");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var IO$OptolithClient = require("../Data/IO.bs.js");
var Locale$OptolithClient = require("../Misc/Locale.bs.js");
var Ley_Int$OptolithClient = require("../Data/Ley_Int.bs.js");
var Messages$OptolithClient = require("../Misc/Messages.bs.js");
var AppConfig$OptolithClient = require("../Misc/AppConfig.bs.js");
var DatabaseReader$OptolithClient = require("./DatabaseReader.bs.js");

function getSupportedLanguages(param) {
  return Curry._2(IO$OptolithClient.Infix.$less$amp$great, IO$OptolithClient.readFile(Path.join(DatabaseReader$OptolithClient.dataRoot, "SupportedLanguages.yml")), (function (data) {
                return Curry._1(Locale$OptolithClient.Supported.Decode.map, Yaml.parse(data));
              }));
}

function getConfig(param) {
  var filePath = Path.join(Electron.app.getPath("userData"), "config.yml");
  var filePathOld = Path.join(Electron.app.getPath("userData"), "config.json");
  return Curry._2(IO$OptolithClient.Infix.$great$great$eq, IO$OptolithClient.existsFile(filePath), (function (isDefaultConfigPresent) {
                if (isDefaultConfigPresent) {
                  return Curry._2(IO$OptolithClient.Infix.$less$amp$great, IO$OptolithClient.readFile(filePath), (function (data) {
                                return AppConfig$OptolithClient.Decode.t(Yaml.parse(data));
                              }));
                } else {
                  return Curry._2(IO$OptolithClient.Infix.$great$great$eq, IO$OptolithClient.existsFile(filePathOld), (function (isOldConfigPresent) {
                                if (isOldConfigPresent) {
                                  return Curry._2(IO$OptolithClient.Infix.$less$amp$great, IO$OptolithClient.readFile(filePathOld), (function (data) {
                                                return Curry._1(AppConfig$OptolithClient.Decode.Old.t, Yaml.parse(data));
                                              }));
                                } else {
                                  return Curry._1(IO$OptolithClient.$$return, AppConfig$OptolithClient.$$default);
                                }
                              }));
                }
              }));
}

function getLocaleOrderFromConfig(supportedLanguages, config) {
  return Locale$OptolithClient.filterBySupported(Locale$OptolithClient.Supported.systemLocaleToId(supportedLanguages, Electron.app.getLocale()), supportedLanguages, Locale$OptolithClient.fromList(config.locales));
}

function getUIMessages(localeOrder) {
  var preferredLocale = Locale$OptolithClient.getPreferred(localeOrder);
  return Curry._2(IO$OptolithClient.Infix.$less$amp$great, IO$OptolithClient.readFile(Path.join(DatabaseReader$OptolithClient.dataRoot, "UI", preferredLocale + ".yml")), (function (data) {
                return Messages$OptolithClient.Decode.t(preferredLocale, Yaml.parse(data));
              }));
}

var WorkerError = Caml_exceptions.create("Init-OptolithClient.WorkerError");

function parseAndDecodeDatabase(workerPath, workerData, onProgress) {
  return new Promise((function (resolve, reject) {
                var worker = new Worker_threads.Worker(workerPath, {
                      workerData: workerData
                    });
                worker.on("message", (function (progress) {
                        if (progress.TAG) {
                          return resolve(progress._0);
                        } else {
                          return Curry._1(onProgress, progress._0);
                        }
                      }));
                worker.on("error", (function (err) {
                        return reject(err);
                      }));
                worker.on("exit", (function (code) {
                        return reject({
                                    RE_EXN_ID: WorkerError,
                                    _1: code,
                                    _2: "Worker stopped with exit code " + Ley_Int$OptolithClient.show(code)
                                  });
                      }));
                
              }));
}

function getInitialData(onMinimalDataReceived, initWorkerPath, onProgress) {
  return Curry._2(IO$OptolithClient.Infix.$great$great$eq, getSupportedLanguages(undefined), (function (supportedLanguages) {
                return Curry._2(IO$OptolithClient.Infix.$great$great$eq, getConfig(undefined), (function (config) {
                              var localeOrder = getLocaleOrderFromConfig(supportedLanguages, config);
                              return Curry._2(IO$OptolithClient.Infix.$great$great$eq, getUIMessages(localeOrder), (function (uiMessages) {
                                            Curry._4(onMinimalDataReceived, supportedLanguages, localeOrder, config, uiMessages);
                                            return Curry._2(IO$OptolithClient.Infix.$great$great$eq, DatabaseReader$OptolithClient.readFiles(function (percentage) {
                                                            return Curry._1(onProgress, {
                                                                        TAG: /* DatabaseLoaded */0,
                                                                        _0: percentage
                                                                      });
                                                          }), (function (database) {
                                                          return parseAndDecodeDatabase(initWorkerPath, [
                                                                      localeOrder,
                                                                      uiMessages,
                                                                      database
                                                                    ], (function (percentage) {
                                                                        return Curry._1(onProgress, {
                                                                                    TAG: /* DatabaseParsed */1,
                                                                                    _0: percentage
                                                                                  });
                                                                      }));
                                                        }));
                                          }));
                            }));
              }));
}

var readDatabase = DatabaseReader$OptolithClient.readFiles;

exports.getSupportedLanguages = getSupportedLanguages;
exports.getConfig = getConfig;
exports.getLocaleOrderFromConfig = getLocaleOrderFromConfig;
exports.getUIMessages = getUIMessages;
exports.readDatabase = readDatabase;
exports.WorkerError = WorkerError;
exports.parseAndDecodeDatabase = parseAndDecodeDatabase;
exports.getInitialData = getInitialData;
/* path Not a pure module */
