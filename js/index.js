

const parallax = (e) => {
    document.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}

document.addEventListener("mousemove", parallax);


// CARDS PARALAX

class parallaxTiltEffect {
    constructor(element) {
        this.element = element;
        this.container = this.element.querySelector(".card__body");
        this.size = [520, 260];
        [this.w, this.h] = this.size;

        
        this.mouseOnComponent = false;
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.defaultStates = this.defaultStates.bind(this);
        this.setProperty = this.setProperty.bind(this);
        this.init = this.init.bind(this);
        this.init();
    }

    handleMouseMove(event) {
        const {offsetX, offsetY} = event;
        let X;
        let Y;

        X = ((offsetX - (this.w/2)) / 3) / 4;
        Y = (-(offsetY - (this.h/2)) / 3) / 3;

        this.setProperty('--rY', X.toFixed(2));
        this.setProperty('--rX', Y.toFixed(2));
    }

    handleMouseEnter() {
        this.mouseOnComponent = true;
        this.container.classList.add("card__body--active");
    }

    handleMouseLeave() {
        this.mouseOnComponent = false;
        this.defaultStates();
    }

    defaultStates() {
        this.container.classList.remove("card__body--active");
        this.setProperty('--rY', 0);
        this.setProperty('--rX', 0);
    }

    setProperty (p, v) {
        return this.container.style.setProperty(p, v);
    }

    init() {
        this.element.addEventListener('mousemove', this.handleMouseMove);
        this.element.addEventListener('mouseenter', this.handleMouseEnter);
        this.element.addEventListener('mouseleave', this.handleMouseLeave);
    }    
}

const elem = document.querySelectorAll('.card-wrap');

for (let i of elem) {
    new parallaxTiltEffect(i)
}


// Progress bar animation

const skillsSection = document.getElementById('skills-section');

const progressBars = document.querySelectorAll('.progress-bar');

const showProgress = () => {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress;
        progressBar.style.opacity = 1;
        progressBar.style.width = `${value}%`;
    });
}

const hideProgress = () => {
    progressBars.forEach(p => {
        p.style.opacity = 0;
        p.style.width = 0;
    });
}

window.addEventListener('scroll', () => {
    const sectionPos = skillsSection.getBoundingClientRect().top * 2;
    const screenPos = window.innerHeight;

    if(sectionPos < screenPos) {
        showProgress();
    } else if ((sectionPos / 2) > screenPos) {
        hideProgress()
    };
})