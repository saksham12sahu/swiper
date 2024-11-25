const overlayPath = document.querySelector('.overlay__path');

const paths = {
    step1: {
        unfilled: 'M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z',
        inBetween: 'M 0 0 h 43 c -60 55 140 65 0 100 H 0 V 0 Z',
        filled: 'M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z',
    },
    step2: {
        filled: 'M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z',
        inBetween: 'M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z',
        unfilled: 'M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z',
    }
};

const landingEl = document.querySelector('.view--2');

const switchCtrl = document.querySelector('button.button--open');

const backCtrl = landingEl.querySelector('.button--close');

let isAnimating = false;

let page = 1;

const pageSwitchTimeline = gsap.timeline({
    paused: true,
    onComplete: () => isAnimating = false
})
    .set(overlayPath, {
        attr: { d: paths.step1.unfilled }
    })
    .to(overlayPath, {
        duration: 0.8,
        ease: 'power3.in',
        attr: { d: paths.step1.inBetween }
    }, 0)
    .to(overlayPath, {
        duration: 0.2,
        ease: 'power1',
        attr: { d: paths.step1.filled },
        onComplete: () => switchPages()
    })

    .set(overlayPath, {
        attr: { d: paths.step2.filled }
    })

    .to(overlayPath, {
        duration: 0.15,
        ease: 'sine.in',
        attr: { d: paths.step2.inBetween }
    })
    .to(overlayPath, {
        duration: 1,
        ease: 'power4',
        attr: { d: paths.step2.unfilled }
    });

const switchPages = () => {
    if (page === 2) {
        landingEl.classList.add('view--open');
    }
    else {
        landingEl.classList.remove('view--open');
    }
}

const reveal = () => {

    if (isAnimating) return;
    isAnimating = true;

    page = 2;

    pageSwitchTimeline.play(0);
}

const unreveal = () => {

    if (isAnimating) return;
    isAnimating = true;

    page = 1;

    pageSwitchTimeline.play(0);
}

switchCtrl.addEventListener('click', reveal);
backCtrl.addEventListener('click', unreveal);