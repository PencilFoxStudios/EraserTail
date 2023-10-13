"use strict";
// tslint:disable:no-console
// tslint:disable:class-name
// tslint:disable:no-var-requires
// tslint:disable:no-string-literal
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class EraserTailCloud {
    constructor(EraserTail) {
        this.logs = {
            create: (PROPERTIES) => __awaiter(this, void 0, void 0, function* () {
                const result = yield axios_1.default.post(this.dataDogURL + `&message=${PROPERTIES.HEADLINE}&status=${PROPERTIES.LOG_TYPE}`, PROPERTIES);
                return result.data;
            }),
        };
        this.dataDogURL = `https://http-intake.logs.us5.datadoghq.com/api/v2/logs?dd-api-key=${process.env.DATADOG_API_KEY}&ddsource=nodejs&service=${EraserTail.name}`;
        if (!process.env.DATADOG_APPTOKEN) {
            throw EraserTail.log("EraserTail Error", "Environment variable DATADOG_APPTOKEN is undefined. Cloud logging has been disabled.");
        }
        this.EraserTailClient = EraserTail;
    }
}
exports.default = EraserTailCloud;
