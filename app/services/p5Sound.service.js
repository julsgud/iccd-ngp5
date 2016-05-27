import SC from 'node-soundcloud';

function soundcloud() {
    'ngInject';

    let sc = SC;

    return {
        service: sc
    };
}

export default soundcloud;