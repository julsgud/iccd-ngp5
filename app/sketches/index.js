import angular from 'angular';

let sketchesModule = angular.module('app.sketches', []);

import GoldCoast from './gold-coast.service';
sketchesModule.factory('GoldCoast', GoldCoast);

// import GoldCoastLyrics from './gold-coast_lyrics.service';
// sketchesModule.factory('GoldCoastLyrics', GoldCoastLyrics);

import CiclosLyrics from './ciclos_lyrics.service';
sketchesModule.factory('CiclosLyrics', CiclosLyrics);

export default sketchesModule;