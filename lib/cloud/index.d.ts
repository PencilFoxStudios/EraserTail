import * as ETcl from "../index";
import * as ET from '../types';
export default class EraserTailCloud {
    private dataDogURL;
    private EraserTailClient;
    constructor(EraserTail: ETcl.EraserTailClient);
    logs: {
        create(PROPERTIES: ET.ERASERTAIL_LOG): Promise<ET.ERASERTAIL_LOG | null>;
    };
}
