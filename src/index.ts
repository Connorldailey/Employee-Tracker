import Cli from './classes/Cli.js';
import { connectToDb } from './connection.js';

await connectToDb();

const cli = new Cli();

cli.startCli();