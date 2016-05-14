function AppRun(AppConstants, $rootScope) {
    'ngInject';

    // load p5 first thing yall
    // function loader(p5Library) {
    //     console.log('p5 loaded');
    // }

    // loader(p5Library);

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

export default AppRun;