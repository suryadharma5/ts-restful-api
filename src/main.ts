import { logger } from "./application/logging";
import { web } from "./application/web";

web.listen(3001, () => {
    logger.info("Listening on port 3001")
})