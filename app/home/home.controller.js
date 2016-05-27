class HomeCtrl {
    constructor(AppConstants, $scope) {
        'ngInject';

        this.current = 'GoldCoast';
        this.appName = AppConstants.appName;
    }

}

export default HomeCtrl;