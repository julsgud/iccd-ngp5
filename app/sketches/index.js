import angular from 'angular';

let sketchesModule = angular.module('app.sketches', []);

import GoldCoast from './gold-coast.service';
sketchesModule.factory('GoldCoast', GoldCoast);

export default sketchesModule;