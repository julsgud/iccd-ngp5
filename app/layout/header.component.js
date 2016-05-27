function AppHeaderCtrl() {
		'ngInject';

		this.title = 'I Can Chase Dragons';

		console.log('Header says hi');
}

let AppHeader = {
	controller: AppHeaderCtrl,
	templateUrl: 'layout/header.html'
};

export default AppHeader;