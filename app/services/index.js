import angular from 'angular';

let servicesModule = angular.module('app.services', []);

import p5Wrapper from './p5Wrapper.service';
servicesModule.factory('p5Wrapper', p5Wrapper);

import p5 from './p5Library.service';
servicesModule.factory('p5', p5);

import SC from './soundcloud.service';
servicesModule.factory('SC', SC);

// import youtube from './youtube.service';
// servicesModule.factory('youtube', youtube);

export default servicesModule;