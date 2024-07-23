"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var path = require("path");
var readJsonFilesInFolder = function (folderPath) { return __awaiter(void 0, void 0, void 0, function () {
    var result, files, _i, files_1, file, filePath, data, validData, jsonData, err_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = {};
                _a.label = 1;
            case 1:
                _a.trys.push([1, 9, , 10]);
                return [4 /*yield*/, fs_1.promises.readdir(folderPath)];
            case 2:
                files = _a.sent();
                _i = 0, files_1 = files;
                _a.label = 3;
            case 3:
                if (!(_i < files_1.length)) return [3 /*break*/, 8];
                file = files_1[_i];
                filePath = path.join(folderPath, file);
                if (path.extname(file) !== ".json")
                    return [3 /*break*/, 7];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, fs_1.promises.readFile(filePath, "utf8")];
            case 5:
                data = _a.sent();
                validData = replaceWrongChars(data);
                jsonData = JSON.parse(validData);
                result[file] = {
                    layers: jsonData.layers.map(function (layer) {
                        return {
                            index: layer.index,
                            stoneCount: layer.stones.length
                        };
                    })
                };
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                console.error("Error reading or parsing file ".concat(file, ":"), err_1);
                return [3 /*break*/, 7];
            case 7:
                _i++;
                return [3 /*break*/, 3];
            case 8: return [3 /*break*/, 10];
            case 9:
                err_2 = _a.sent();
                console.error("Error reading directory:", err_2);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/, result];
        }
    });
}); };
var replaceWrongChars = function (data) {
    var oldData = data;
    oldData = oldData.replace(String.fromCharCode(65279), "");
    while (oldData !== data) {
        oldData = data;
        data = data.replace(String.fromCharCode(65279), "");
    }
    return data;
};
var writeObjectToJsonFile = function (filePath, obj) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonString, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                jsonString = JSON.stringify(obj, null, 2);
                return [4 /*yield*/, fs_1.promises.writeFile(filePath, jsonString, "utf8")];
            case 1:
                _a.sent(); // Write JSON string to file
                console.log("Successfully wrote to ".concat(filePath));
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error("Error writing to file:", err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var renameTxtFilesToJson = function (folderPath) { return __awaiter(void 0, void 0, void 0, function () {
    var files, _i, files_2, file, filePath, newFilePath, err_4, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, fs_1.promises.readdir(folderPath)];
            case 1:
                files = _a.sent();
                _i = 0, files_2 = files;
                _a.label = 2;
            case 2:
                if (!(_i < files_2.length)) return [3 /*break*/, 7];
                file = files_2[_i];
                filePath = path.join(folderPath, file);
                if (path.extname(file) !== ".txt")
                    return [3 /*break*/, 6];
                newFilePath = path.join(folderPath, path.basename(file, ".txt") + ".json");
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, fs_1.promises.rename(filePath, newFilePath)];
            case 4:
                _a.sent();
                console.log("Renamed ".concat(file, " to ").concat(path.basename(newFilePath)));
                return [3 /*break*/, 6];
            case 5:
                err_4 = _a.sent();
                console.error("Error renaming file ".concat(file, ":"), err_4);
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 9];
            case 8:
                err_5 = _a.sent();
                console.error("Error reading directory:", err_5);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, filePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, renameTxtFilesToJson("./levels")];
            case 1:
                _a.sent();
                return [4 /*yield*/, readJsonFilesInFolder("./levels")];
            case 2:
                result = _a.sent();
                filePath = path.join("./output", "output.json");
                return [4 /*yield*/, writeObjectToJsonFile(filePath, result)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main();
