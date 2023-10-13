// tslint:disable:class-name
export interface ERASERTAIL_HEARTBEAT_SERVICE {
    SERVICE_NAME: string,
    SERVICE_NAME_HUMAN: string,
    SERVICE_STATUS: "DOWN" | "LIMITED" | "UP" | "MAINTENANCE"
}
export interface ERASERTAIL_HEARTBEAT {
    SERVICES: ERASERTAIL_HEARTBEAT_SERVICE[]
}
export interface ERASERTAIL_LOG {
    APPLICATION_ICON: string | null, 
    LOG_TYPE: "Debug" | "Info" | "Warn" | "Error" | "Crash" | "EraserTail Debug" | "EraserTail Warn" | "EraserTail Error" | "Heartbeat",
    APPLICATION_NAME: string,
    APPLICATION_NAME_HUMAN: string,
    LOG_TIMESTAMP: string,
    HEADLINE: string,
    DESCRIPTION: string|null,
    LOG_ID: string | null,
    HEARTBEAT: ERASERTAIL_HEARTBEAT | null
}
export declare type ApiColor = "default" | "gray" | "brown" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink" | "red" | "gray_background" | "brown_background" | "orange_background" | "yellow_background" | "green_background" | "blue_background" | "purple_background" | "pink_background" | "red_background";
export interface ERASERTAIL_LOGGING_STYLE {
    LOG_TYPE: ERASERTAIL_LOG["LOG_TYPE"],
    LOG_PREPEND: string,
    LOG_APPEND: string,
    LOG_VISIBLE: boolean,
    STYLE_PREFIX_COLOR: string,
    STYLE_PREFIX_BOLD: boolean,
    STYLE_LINE_COLOR: string,
    STYLE_LINE_BOLD: boolean,
}
export interface ERASERTAIL_CLIENT_PARAMS {
    APPLICATION_ICON: string | null, 
    APPLICATION_NAME: string,
    APPLICATION_NAME_HUMAN: string,
    APPLICATION_PREFIX: string,
    APPLICATION_COLOR_PRIMARY: string,
    APPLICATION_COLOR_SECONDARY: string,
    APPLICATION_LOGGING_STYLES: ERASERTAIL_LOGGING_STYLE[] | null,
    APPLICATION_SERVICES: ERASERTAIL_HEARTBEAT_SERVICE[],
    AUTO_HEARTBEAT: boolean,
    AUTO_HEARTBEAT_INTERVAL: number|null,
    LOG_TO_CLOUD: boolean
}