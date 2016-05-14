function AppConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'layout/app-view.html'
            // todo: what do you need to preload?
        });

        $urlRouterProvider.otherwise('/');
}

export default AppConfig;