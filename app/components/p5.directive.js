function p5($window, $state, p5Wrapper) {
    'ngInject';

    return {
        restrict: 'E',
        scope: {
            sketch: '='
        },
        link: function(scope, element, attrs) {
            let wrapper = p5Wrapper();

            scope.$watch('sketch', function(sketch) {
                wrapper.init(sketch, element[0]);
            });

            scope.$on('$destroy', function() {
                wrapper.destroy();
            });
        }
    };
}

export default p5;