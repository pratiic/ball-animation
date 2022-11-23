const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 150;
const images = [];
const ball = {
    frame: 0,
};

const getZeroes = (index) => {
    if (index < 10) {
        return "000";
    } else if (index < 100) {
        return "00";
    } else {
        return "0";
    }
};

const getCurrentFrame = (index) => {
    return `./images/${getZeroes(index)}${index}.jpg`;
};

for (let i = 1; i <= frameCount; i++) {
    const image = new Image();
    image.src = getCurrentFrame(i);
    images.push(image);
}

const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0, canvas.width, canvas.height);
};

gsap.registerPlugin("scrollTrigger");
gsap.to(ball, {
    frame: frameCount - 4,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: true,
        pin: "canvas",
        end: "500%",
    },
    onUpdate: render,
});

images[0].onload = render;
