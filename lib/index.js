"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EraserTailClient = void 0;
// tslint:disable:no-console
// tslint:disable:class-name
// tslint:disable:no-var-requires
const chalk = require("chalk");
const cloud_1 = require("./cloud");
const shader = require('shader');
require('dotenv').config();
class EraserTailClient {
    constructor(params) {
        var _a, _b;
        this.services = [];
        this.name = params.APPLICATION_NAME;
        this.nameHuman = params.APPLICATION_NAME_HUMAN;
        this.prefix = params.APPLICATION_PREFIX;
        this.styles = (_a = params.APPLICATION_LOGGING_STYLES) !== null && _a !== void 0 ? _a : [];
        this.colorPrimary = params.APPLICATION_COLOR_PRIMARY;
        this.colorSecondary = params.APPLICATION_COLOR_SECONDARY;
        this.services = params.APPLICATION_SERVICES;
        this.autoHeartbeatEnabled = params.AUTO_HEARTBEAT;
        this.autoHeartbeatInterval = params.AUTO_HEARTBEAT_INTERVAL;
        this.applicationIcon = (_b = params.APPLICATION_ICON) !== null && _b !== void 0 ? _b : "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fea120301-dd55-42ac-9bae-550b36204722%2Ffirefox_duIP1WdCE3.png?table=collection&id=8e076208-75be-401e-ad0f-79b09609b69f&spaceId=1a8c758f-4957-4029-8be0-91f00204b052&width=60&userId=297acf67-47ed-4477-9548-7e39beb85ca2&cache=v2";
        if (!this.styles.find((style) => style.LOG_TYPE === "Debug")) {
            this.styles.push({
                LOG_TYPE: "Debug",
                LOG_PREPEND: "   ",
                LOG_APPEND: "",
                LOG_VISIBLE: true,
                STYLE_PREFIX_COLOR: "#FFFFFF",
                STYLE_PREFIX_BOLD: false,
                STYLE_LINE_COLOR: "#CDCDCD",
                STYLE_LINE_BOLD: false,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "Info")) {
            this.styles.push({
                LOG_TYPE: "Info",
                LOG_PREPEND: "   ",
                LOG_APPEND: "",
                LOG_VISIBLE: true,
                STYLE_PREFIX_COLOR: "#30A8ED",
                STYLE_PREFIX_BOLD: false,
                STYLE_LINE_COLOR: "#3084ED",
                STYLE_LINE_BOLD: false,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "Warn")) {
            this.styles.push({
                LOG_TYPE: "Warn",
                LOG_PREPEND: "   ",
                LOG_APPEND: "",
                LOG_VISIBLE: true,
                STYLE_PREFIX_COLOR: "#ED9E30",
                STYLE_PREFIX_BOLD: false,
                STYLE_LINE_COLOR: "#EDC930",
                STYLE_LINE_BOLD: false,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "Error")) {
            this.styles.push({
                LOG_TYPE: "Error",
                LOG_PREPEND: "   ",
                LOG_APPEND: "",
                LOG_VISIBLE: true,
                STYLE_PREFIX_COLOR: "#ED3030",
                STYLE_PREFIX_BOLD: true,
                STYLE_LINE_COLOR: "#D94545",
                STYLE_LINE_BOLD: false,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "Crash")) {
            this.styles.push({
                LOG_TYPE: "Crash",
                LOG_PREPEND: "!! ",
                LOG_APPEND: "",
                LOG_VISIBLE: true,
                STYLE_PREFIX_COLOR: "#FF0000",
                STYLE_PREFIX_BOLD: true,
                STYLE_LINE_COLOR: "#E60101",
                STYLE_LINE_BOLD: true,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "EraserTail Debug")) {
            this.styles.push({
                LOG_TYPE: "EraserTail Debug",
                LOG_PREPEND: "[ET] { ",
                LOG_APPEND: " } [ET]",
                LOG_VISIBLE: false,
                STYLE_PREFIX_COLOR: "#FFFFFF",
                STYLE_PREFIX_BOLD: false,
                STYLE_LINE_COLOR: "#CDCDCD",
                STYLE_LINE_BOLD: false,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "EraserTail Warn")) {
            this.styles.push({
                LOG_TYPE: "EraserTail Warn",
                LOG_PREPEND: "   ",
                LOG_APPEND: "",
                LOG_VISIBLE: true,
                STYLE_PREFIX_COLOR: "#ED9E30",
                STYLE_PREFIX_BOLD: false,
                STYLE_LINE_COLOR: "#EDC930",
                STYLE_LINE_BOLD: false,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "EraserTail Error")) {
            this.styles.push({
                LOG_TYPE: "EraserTail Error",
                LOG_PREPEND: "[ET] { ",
                LOG_APPEND: " } [ET]",
                LOG_VISIBLE: true,
                STYLE_PREFIX_COLOR: "#ED3030",
                STYLE_PREFIX_BOLD: true,
                STYLE_LINE_COLOR: "#D94545",
                STYLE_LINE_BOLD: false,
            });
        }
        if (!this.styles.find((style) => style.LOG_TYPE === "Heartbeat")) {
            this.styles.push({
                LOG_TYPE: "Heartbeat",
                LOG_PREPEND: "❤️",
                LOG_APPEND: "",
                LOG_VISIBLE: false,
                STYLE_PREFIX_COLOR: "#FF90E1",
                STYLE_PREFIX_BOLD: true,
                STYLE_LINE_COLOR: "#C95CAC",
                STYLE_LINE_BOLD: false,
            });
        }
        this.cloudEnabled = params.LOG_TO_CLOUD && ((typeof process.env.ERASERTAIL_TOKEN) === "string") && ((typeof process.env.ERASERTAIL_DATABASE_ID) === "string");
        if (params.LOG_TO_CLOUD && (typeof process.env.DATADOG_API_KEY !== "string"))
            this.log("EraserTail Warn", "Unable to connect to EraserTail Cloud: DATADOG_API_KEY environment variable is undefined.");
        if (!this.cloudEnabled)
            this.log("EraserTail Warn", "Cloud logging is disabled for this application!");
        process.on('uncaughtException', (err, origin) => {
            this.log("Crash", err.message, `Origin: ${origin}\n${err}`);
            this.services.forEach((service) => {
                this.updateService(service.SERVICE_NAME, "DOWN");
            });
            this.log("Heartbeat", "Passed out!");
            setTimeout(() => {
                process.exit(1);
            }, 3500);
        });
        process.on('warning', (warning) => {
            this.log("Warn", warning.message, warning.stack, true);
        });
        if (this.autoHeartbeatEnabled) {
            this.runAutoHeartbeat();
        }
    }
    runAutoHeartbeat() {
        var _a;
        if (!this.autoHeartbeatEnabled)
            return;
        setTimeout(() => {
            this.log("Heartbeat", "Bum-bum!");
            this.runAutoHeartbeat();
        }, (_a = this.autoHeartbeatInterval) !== null && _a !== void 0 ? _a : 30000); // If not provided, push heartbeat every 30 seconds.
    }
    updateService(serviceName, serviceStatus) {
        const serviceIndex = this.services.findIndex((service) => service.SERVICE_NAME === serviceName);
        this.services[serviceIndex].SERVICE_STATUS = serviceStatus;
        return this.services[serviceIndex].SERVICE_STATUS;
    }
    log(type, output, description = "NoneProvided", cloud = true, verboseInConsole = false) {
        if (description === "NoneProvided" && type === "Heartbeat")
            description = {
                SERVICES: this.services
            };
        const logStyleDetails = this.styles.find((logStyle) => logStyle.LOG_TYPE === type);
        const appStyle = chalk.bgHex(this.colorSecondary).hex(this.colorPrimary);
        let prefixStyle = chalk.hex(logStyleDetails.STYLE_PREFIX_COLOR).bgHex(shader(logStyleDetails.STYLE_PREFIX_COLOR, -0.75));
        let lineStyle = chalk.hex(logStyleDetails.STYLE_LINE_COLOR);
        const stackStyle = chalk.hex(shader(logStyleDetails.STYLE_LINE_COLOR, -0.3));
        if (logStyleDetails.STYLE_PREFIX_BOLD)
            prefixStyle = prefixStyle.bold;
        if (logStyleDetails.STYLE_LINE_BOLD)
            lineStyle = lineStyle.bold;
        // if((typeof output) === "object") output = output.toString()
        // if((typeof description) === "object") description = description.toString()
        let hl = output;
        let dsc = description;
        if (typeof hl === "object") {
            hl = JSON.stringify(hl, null, 2);
        }
        if (typeof dsc === "object") {
            dsc = JSON.stringify(dsc, null, 2);
        }
        dsc = dsc.replace(hl, "");
        if (logStyleDetails.LOG_VISIBLE) {
            console.log(appStyle(logStyleDetails.LOG_PREPEND) +
                appStyle(this.prefix) +
                prefixStyle(`[${logStyleDetails.LOG_TYPE}]`) + " " +
                lineStyle(hl) + logStyleDetails.LOG_APPEND + stackStyle((description !== "No further information.") && verboseInConsole ? `\n${dsc}` : ""));
        }
        if (this.cloudEnabled && cloud) {
            const ETCloudClient = new cloud_1.default(this);
            ETCloudClient.logs.create({
                LOG_TYPE: type,
                APPLICATION_NAME: this.name,
                APPLICATION_NAME_HUMAN: this.nameHuman,
                LOG_TIMESTAMP: (new Date).toISOString(),
                HEADLINE: hl,
                DESCRIPTION: dsc,
                LOG_ID: null,
                APPLICATION_ICON: this.applicationIcon,
                HEARTBEAT: type === "Heartbeat" ? description : null
            });
        }
    }
}
exports.EraserTailClient = EraserTailClient;
