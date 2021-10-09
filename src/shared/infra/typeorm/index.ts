import { createConnection } from 'typeorm';

import Config from './config/ormconfig';

createConnection(Config);
