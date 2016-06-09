class HomeCtrl {
    constructor(AppConstants, $scope) {
        'ngInject';

        this.current = 'CiclosLyrics';
        this.appName = AppConstants.appName;
    }

}

export default HomeCtrl;