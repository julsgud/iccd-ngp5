import angular from 'angular';

let servicesModule = angular.module('app.services', []);

import p5Wrapper from './p5Wrapper.service';
servicesModule.factory('p5Wrapper', p5Wrapper);

export default servicesModule;