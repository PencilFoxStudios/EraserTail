import * as ET from "./types";
export declare class EraserTailClient {
    name: string;
    nameHuman: string;
    private prefix;
    styles: ET.ERASERTAIL_LOGGING_STYLE[];
    private colorPrimary;
    private colorSecondary;
    private cloudEnabled;
    private autoHeartbeatEnabled;
    private autoHeartbeatInterval;
    applicationIcon: string | null;
    services: ET.ERASERTAIL_HEARTBEAT_SERVICE[];
    constructor(params: ET.ERASERTAIL_CLIENT_PARAMS);
    runAutoHeartbeat(): void;
    updateService(serviceName: ET.ERASERTAIL_HEARTBEAT_SERVICE["SERVICE_NAME"], serviceStatus: ET.ERASERTAIL_HEARTBEAT_SERVICE["SERVICE_STATUS"]): "DOWN" | "LIMITED" | "UP" | "MAINTENANCE";
    log(type: ET.ERASERTAIL_LOG["LOG_TYPE"], output: string | object, description?: string | object, cloud?: boolean, verboseInConsole?: boolean): void;
}
