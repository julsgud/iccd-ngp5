import p5 from 'node_modules/p5/lib/addons/p5.sound';

function p5Wrapper($injector) {
    'ngInject';

    let p5Wrapper = {
        // to be run when directive is loaded to DOM
        init: function(sketch, node) {
            // destroy any previous instance
            this.destroy();

            if(sketch) {
                // get sketch if it already exists
                if($injector.has(sketch)) {
                    sketch = $injector.get(sketch);
                }
                // create sketch
                this.instance = new p5(sketch, node);
            }
        },
        destroy: function() {
            if(this.instance) {
                this.instance.remove();
                this.instance = null;
            }
        }
    };

    return function() {
        return Object.create(p5Wrapper);
    };
};

export default p5Wrapper;