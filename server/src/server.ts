import * as express from 'express';
import * as _ from 'lodash';
import * as cors from 'cors';
import { appRouter as routes } from './routes/routes.js';


const app = express();
const port = 5500;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

routes(app);

// todo rename variables
const server = app.listen(port, function () {
    const address = server?.address();
    const port = _.isString(address) ? address : address?.port;
    console.log(`bitcoin exchange running on port ${port}\n`);
});