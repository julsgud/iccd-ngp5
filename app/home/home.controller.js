class HomeCtrl {
    constructor(AppConstants) {
        'ngInject';

        this.current = 'GoldCoast';
        this.appName = AppConstants.appName;
    }
}

export default HomeCtrl;