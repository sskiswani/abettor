import * as ng from 'angular';
import markdown from './common/Markdown';

const app = ng.module('app', []);
markdown(app);
export default app;
