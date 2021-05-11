import {ConnectionOptions, createConnection} from 'typeorm';
import config from './config';

export default createConnection(config as ConnectionOptions);
