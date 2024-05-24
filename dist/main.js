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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var path = require("path");
var csv_writer_1 = require("csv-writer");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, selectors, extractedData, rows, maxLength, i, data, index, _a, _b, _c, _i, key, elements, _d, _e, _f, csvWriter;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0: return [4 /*yield*/, playwright_1.chromium.launch({ headless: false })];
            case 1:
                browser = _j.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _j.sent();
                return [4 /*yield*/, page.goto("https://helloworld.kurly.com/")];
            case 3:
                _j.sent();
                selectors = {
                    postTitle: ".post-title",
                    titleSummary: ".title-summary",
                    postAuthor: ".post-autor",
                    postDate: ".post-date",
                };
                extractedData = [];
                return [4 /*yield*/, Promise.all(Object.values(selectors).map(function (selector) { return page.$$(selector); }))];
            case 4:
                rows = _j.sent();
                maxLength = Math.max.apply(Math, rows.map(function (r) { return r.length; }));
                i = 0;
                _j.label = 5;
            case 5:
                if (!(i < maxLength)) return [3 /*break*/, 13];
                data = {};
                index = 0;
                _a = selectors;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _j.label = 6;
            case 6:
                if (!(_i < _b.length)) return [3 /*break*/, 11];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 10];
                key = _c;
                elements = rows[index++];
                _d = data;
                _e = key;
                if (!elements[i]) return [3 /*break*/, 8];
                return [4 /*yield*/, elements[i].textContent()];
            case 7:
                _f = (_h = (_g = (_j.sent())) === null || _g === void 0 ? void 0 : _g.trim()) !== null && _h !== void 0 ? _h : null;
                return [3 /*break*/, 9];
            case 8:
                _f = null;
                _j.label = 9;
            case 9:
                _d[_e] = _f;
                _j.label = 10;
            case 10:
                _i++;
                return [3 /*break*/, 6];
            case 11:
                extractedData.push(data);
                _j.label = 12;
            case 12:
                i++;
                return [3 /*break*/, 5];
            case 13:
                csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                    path: path.join(__dirname, "extracted_data.csv"),
                    header: Object.keys(selectors).map(function (key) { return ({ id: key, title: key }); }),
                });
                // Write the data to CSV
                return [4 /*yield*/, csvWriter.writeRecords(extractedData)];
            case 14:
                // Write the data to CSV
                _j.sent();
                console.log("Data has been written to extracted_data.csv");
                // Close the browser
                return [4 /*yield*/, browser.close()];
            case 15:
                // Close the browser
                _j.sent();
                return [2 /*return*/];
        }
    });
}); })();
