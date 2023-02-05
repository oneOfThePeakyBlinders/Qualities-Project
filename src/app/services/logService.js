import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://84a8ed11ef5b40819c74071816eaa2be@o4504536033263616.ingest.sentry.io/4504536036212736",
        integrations: [new BrowserTracing()],

        // We recommend adjusting this value in production, or using tracesSampler
        // for finer control
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
}

const logger = {
    init,
    log
}

export default logger
