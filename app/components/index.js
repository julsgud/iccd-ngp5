import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import p5 from './p5.directive';
componentsModule.directive('p5', p5);

export default componentsModule;