class AppFooterCtrl {
	constructor(GoldCoast) {
		'ngInject';

		this.title1 = GoldCoast.title1;
		this.title2 = GoldCoast.title2;
	}
}

let AppFooter = {
	controller: AppFooterCtrl,
	templateUrl: 'layout/footer.html'
};

export default AppFooter;