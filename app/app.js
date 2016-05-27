import angular from 'angular';

// config files
import constants from './config/app.constants';
import appConfig from './config/app.config';
import appRun from './config/app.run';

// 3rd party
import 'angular-ui-router';
import 'angular-youtube-mb';

// templates for caching. thanks gulp!
import './config/app.templates';

// original modules
import './layout';
import './components';
import './home';
import './sketches';
import './services';

// load app
const app = [
    'ui.router',
    'youtube-embed',
    'templates',
    'app.layout',
    'app.components',
    'app.home',
    'app.sketches',
    'app.services'
];

window.app = angular.module('app', app);

angular.module('app').constant('AppConstants', constants);

angular.module('app').config(appConfig);

angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {strictDi: true});