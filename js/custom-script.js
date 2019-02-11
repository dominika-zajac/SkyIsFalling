const qS = (selector) => document.querySelector(selector);
const qSA = (selectors) => document.querySelectorAll(selectors);
let hit = false;
let resetId = 0;
let shootingAllowed = true;
let velo = 0;
let dVelo = -0.03;
let score = 0;
let playing = false;


const setTargetPosition = () => {
    const tmp_x = Math.floor(Math.random() * 11 - 5);
    const tmp_y = 4;
    const tmp_z = Math.floor(Math.random() * 5 -6);
    console.log(tmp_x, tmp_y, tmp_z);
    qS("#target").body.position.set(tmp_x, tmp_y, tmp_z);
};


const setAngularVelocity = () => {
    qS("#target").setAttribute("rotation", "0 0 0");
    const randX = (Math.random()*2)-1;
    const randY = (Math.random()*2)-1;
    const randZ = (Math.random()*2)-1;
    qS("#target").body.angularVelocity.set(randX, randY, randZ);
};

const resetTarget = () => {
    clearTimeout(resetId);
    setTargetPosition();
    velo += dVelo;
    qS("#target").body.velocity.set(0, velo, 0);
    setAngularVelocity();
    hit = false;
};

qS("#bullet").addEventListener('collide', (e) => {
    if (!playing) return;
    let target = qS("#target");
    if(e.detail.body.id === target.body.id && !hit) {
        hit = true;
        score = score + 1;
        target.components.sound.playSound();
        clearTimeout(resetId);
        resetId = setTimeout(resetTarget, 1);
    }
});

qSA(".spot").forEach(function(element) {
    element.addEventListener('collide', (e) => {
        let target = qS("#target");
        let spot = qSA(".spot")[0];
        if(e.detail.body.id === target.body.id) {
            playing = false;
            spot.components.sound.playSound();
            qS("#messageBox").setAttribute("position","0 0.5 -3");
            qS("#message").setAttribute("value","Game over!\nYour score: "+score + "\nLook here\\nto try again");
        }
    });
});

qS("#messageBox").addEventListener('collide', (e) => {
        qS("#messageBox").setAttribute("position","0 -5 0");
        playing = true;
        score = 0;
        shootingAllowed = true;
        velo = 0;
        qS("#target").body.velocity.set(0,velo,0);
        resetTarget()

});

AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.el.addEventListener('click', function (e) {
            if (!shootingAllowed) return;

            const camPos = AFRAME.scenes[0].camera.getWorldPosition();
            const worldDir = AFRAME.scenes[0].camera.getWorldDirection();
            worldDir.multiplyScalar(10);
            qS("#bullet").body.position.set(camPos.x, camPos.y, camPos.z);
            qS("#bullet").body.velocity.set(worldDir.x, worldDir.y, worldDir.z);

            qS("#ball").setAttribute("position","0 -5 0");
            shootingAllowed = false;
            setTimeout(function() {
                shootingAllowed = true;
                qS("#ball").setAttribute("position","1 -0.5 -0.2");
            }, 700);
        });
    }
});