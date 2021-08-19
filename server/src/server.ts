import * as express from 'express';
import * as _ from 'lodash';
import { appRouter as routes } from './routes/routes.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

routes(app);

// todo rename variables
const server = app.listen(3000, function () {
    const b = server?.address();
    const c = _.isString(b) ? b : b?.port;
    console.log(`bitcoin trading app running on port ${c}\n`);
});