import angular from 'angular';

let servicesModule = angular.module('app.services', []);

import p5Wrapper from './p5Wrapper.service';
servicesModule.factory('p5Wrapper', p5Wrapper);

// import p5Sound from './p5Sound.service';
// servicesModule.factory('p5Sound', p5Sound);

export default servicesModule;