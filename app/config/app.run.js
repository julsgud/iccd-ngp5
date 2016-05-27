function AppRun(AppConstants, $rootScope, SC) {
    'ngInject';

    // initalize soundcloud
    // soundcloudInit(SC);

    // update page title on succesful state change
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.setPageTitle(toState.title);
    });

    // print to ui-router errors for debugging
    $rootScope.$on('$stateChangeError', (event, error) =>{
        console.error(error);
    });

    // set the page title with this!
    $rootScope.setPageTitle = (title) => {
        $rootScope.pageTitle = AppConstants.appName;
        if (title) {
            $rootScope.pageTitle += ' \u2014 ';
            $rootScope.pageTitle += title;
        }
    };
}

function soundcloudInit(SC) {
    'ngInject';

    SC.initialize({
        client_id: '40663c6e7e46ace3c3db0209c8bf9389',
        redirect_uri: 'http://example.com/callback'
    });
}

export default AppRun;