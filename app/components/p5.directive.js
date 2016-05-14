function p5(p5Wrapper) {
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

            scope.$on('$destroy', function(sketch) {
                wrapper.destroy();
            });
        }
    };
}

export default p5;