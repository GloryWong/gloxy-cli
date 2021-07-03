import dotenvFlow from 'dotenv-flow';
import path from 'path';

const envPath = path.resolve(__dirname, '..');
dotenvFlow.config({ path: envPath, default_node_env: 'test' });
