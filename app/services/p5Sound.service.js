// import p5 from 'p5.sound';

function p5Sound() {
    'ngInject';

    let p5s = p5;

    return {
        service: p5s
    };
}

export default p5Sound;