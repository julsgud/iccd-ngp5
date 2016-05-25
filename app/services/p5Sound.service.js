import p5S from 'node_modules/p5.sound';

function p5Sound() {
    'ngInject';

    let p5Sound = p5S;

    return {
        service: p5Sound
    };
}

export default p5Sound;