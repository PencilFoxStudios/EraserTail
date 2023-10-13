// tslint:disable:no-console
// tslint:disable:class-name
// tslint:disable:no-var-requires
// tslint:disable:no-string-literal

import * as ETcl from "../index";
import * as ET from '../types'
import axios from "axios"
export default class EraserTailCloud {
    private dataDogURL: string;
    private EraserTailClient: ETcl.EraserTailClient;
    constructor(EraserTail: ETcl.EraserTailClient) {
        this.dataDogURL = `https://http-intake.logs.us5.datadoghq.com/api/v2/logs?dd-api-key=${process.env.DATADOG_API_KEY}&ddsource=nodejs&service=${EraserTail.name}`
        if (!process.env.DATADOG_APPTOKEN) {
            throw EraserTail.log("EraserTail Error", "Environment variable DATADOG_APPTOKEN is undefined. Cloud logging has been disabled.")
        }
        this.EraserTailClient = EraserTail
    }
    logs: {
        create(PROPERTIES: ET.ERASERTAIL_LOG): Promise<ET.ERASERTAIL_LOG | null>,
    } = {
            create: async (PROPERTIES: ET.ERASERTAIL_LOG): Promise<ET.ERASERTAIL_LOG | null> => {
                const result = await axios.post(this.dataDogURL + `&message=${PROPERTIES.HEADLINE}&status=${PROPERTIES.LOG_TYPE}`, PROPERTIES)
                return result.data
            },

        }
}

