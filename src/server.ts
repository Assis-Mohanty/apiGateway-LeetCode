import express from 'express';
import { serverConfig } from './config';
import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { problemMiddleware, submissionMiddleware, userMiddleware } from './routers/v1/reverseProxy';
import { authMiddleware } from './middlewares/auth.middlewares';
import { requireAdmin } from './middlewares/requireAdmin.middlewares';
const app = express();


/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/api/v2', v2Router);
app.use('/api/v1/user',authMiddleware,userMiddleware)
app.use('/api/v1/admin',authMiddleware,requireAdmin,userMiddleware)
app.use('/api/v1/problems',authMiddleware,problemMiddleware)
app.use('/api/v1/submissions',authMiddleware,submissionMiddleware)



/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, () => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrl+C to stop the server.`);
});
