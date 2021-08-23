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
    const address = server?.address();
    const port = _.isString(address) ? address : address?.port;
    console.log(`bitcoin exchange running on port ${port}\n`);
});