function scrollReset($window, $state, $timeout) {
    'ngInject';

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            angular.element($window).bind('scroll', function () {
                // console.log(raw.scrollTop);
                // console.log(raw.offsetHeight);
                // console.log(raw.scrollHeight);
                if (raw.offsetHeight > 0) {
                    $timeout($state.go($state.current.name, null, {reload: true}), 8000);
                }
            });

            // angular.element($window).bind('orientationchange', function () {
            //         $timeout(() => $state.go($state.current.name, null, {reload: true}), 1000);
            // });
        }
    };
}

export default scrollReset;