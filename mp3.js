
let field, audio, all, current, rr, back, label;
let print = (x) => {
    back = document.getElementById('back');
    field = document.querySelectorAll('fieldset');
    current = field[0].querySelector('audio');

  /*   let write = (x) => { */
        let legend = field[x].querySelector('legend');
        audio = field[x].querySelector('audio');

        legend.innerHTML = audio.src.slice(audio.src.lastIndexOf('/') + 1);
        field[x].style.boxShadow = '0 0 10px gray';
        field[x].style.border = '4px solid rgb(197, 197, 197)';

        setTimeout(() => {
            legend.style.fontSize = '.7em';
            /* legend.style.boxShadow = '0 -3px 10px grey'; */
        }, 200);
        audio.style.width = '19em';
        audio.volume = .2;
        audio.setAttribute('onpause', 'document.getElementById(\'ply\').src = img[1];');
        
        if (x < field.length - 1){
            setTimeout(() => {
                print(x+=1)
            }, 100);
        }else{
            vol2();
            grow();
            play(current);
            // document.getElementById('ply').src = './img/pause.svg';
            next();
            
        }
}
truth = () => {
    for(let i = 0; i < field.length - 1; i++){
        let rep = document.getElementById('rep');
        if (field[i].querySelector('audio').loop){
            /* console.log(field[i].querySelector('audio').loop); */
            field[i].querySelector('audio').loop = false;
            rep.src = './img/none.svg';
            /* console.log("▲ Before, now ▼");
            console.log(field[i].querySelector('audio').loop);
            console.log(" ");
            if (i<field.length - 1){
                truth(i+=1);
            } */
        }else{
            /* console.log(field[i].querySelector('audio').loop); */
            field[i].querySelector('audio').loop = true;
            rep.src = './img/one.svg';
            /* console.log("▲ Before, now ▼");
            console.log(field[i].querySelector('audio').loop);
            console.log(" ");
            if (i<field.length - 1){
                truth(i+=1);
            } */
        } 
    }
    
};

let next = () => {
    all = document.querySelectorAll('audio');
    // all[0].play();
    // let pn;
    for(let i = 0; i < all.length - 1; i++){
        // pn = all[i].parentElement.nextElementSibling.querySelector('audio');
        all[i].setAttribute('onended', 'nex()');
        
        all[i].setAttribute("onplay", `stop(this)`);
    }
}

let stop  = (x) => {
    current = x;
    play(x)
    document.getElementById('ply').src = img[0];
    for(let i = 0; i<all.length - 1; i++){
        if (!all[i].paused/*  && !(all[i] == x) */){
            if (all[i] !== x){
                // all[i].pause();
                pause(all[i]);
                all[i].currentTime = 0;
                console.log('Audio' + i + " paused.")
            }
            /* else{
                // console.log(i + 'i, x' + x);
            } */
        }
    }
    // play();
}

let img = ['./img/pause.svg', './img/play.svg'];

let pl = (meta) => {
    if(!current.paused){
        current.pause();
        meta.src = img[1];
    }else if(current.paused){
        meta.src = img[0];
        // x.style.boxShadow = '0 0 10px blue';
        play(current);
    }
}
let play = (x) => {
    x.volume = v;
    x.style.boxShadow = '0 0 10px rgba(47, 90, 107, 0.932)';
    x.play();
    document.getElementById('ply').src = img[0];
    back.innerText = x.previousElementSibling.innerText;
}
let pause = (x) => {
    x.style.boxShadow = '0 0 10px white';
    x.pause()
    document.getElementById('ply').src = img[1];
}

let nex = () => {
    current.currentTime = 0;
    pause(current);
    play(current.parentElement.nextElementSibling.querySelector('audio'));
    // document.getElementById('ply').src = img[0];
}
let prev = () => {
    current.currentTime = 0;
    pause(current);
    play(current.parentElement.previousElementSibling.querySelector('audio'));
    // document.getElementById('ply').src = img[0];
}
let v, vs, prog, width, speed, bar, distance, duration;
let grow = () => {
    prog = document.getElementById('prog');
    label = document.getElementById('label');
    bar = document.getElementById('bar');
    prog.style.width = '65vw';

    distance = prog.clientWidth;
    duration = current.duration;
    width = (distance * current.currentTime) / duration;
    bar.style.width = width + 'px';

    let v = document.getElementById('vol').clientWidth * current.volume, durate0 = document.getElementById('durate0').innerText = Math.floor(current.duration / 60) + ":" + Math.floor(current.duration % 60), update = current.duration - current.currentTime;
    durate = document.getElementById('durate').innerText = "-" + Math.floor(update / 60) + ":" + Math.floor(update % 60);
    document.getElementById('ch').style.width = v + 'px';
    let con = 1 * v / document.getElementById('vol').clientWidth;
    vs.innerText = (Math.floor(con * 100))+ '%◄';
    // }
     back.style.width = label.offsetWidth + 'px';
    if(permit){
        setTimeout(() => {
            grow()
        }, 0);
    };
};
let permit = true, l;

let rec = (e) => {
    permit = true;
    let point = e.layerX, ct = (duration * point) / distance;
    current.currentTime = ct;
    grow();
};
let vol = (x) => {
    current.muted = false;
    let X = x.layerX, ch = document.getElementById('ch'), parent = document.getElementById('vol'), p = parent.clientWidth;
    v = X / p;
    current.volume = v;vs.innerText = (Math.floor(v * 100))+ '%◄';
    ch.style.width = X + 'px';
}
let ehh = false;
let con = () => {
    ehh = true;
};
let go = (e) => {
    if(ehh){
        let x = e.clientX, ww = prog.offsetWidth, mw = window.innerWidth, di = (mw-ww),d2 = di/2,ct = (duration * (x-d2)) / distance;
        if ((ct > 0) & (ct <= duration)) {
            current.currentTime = (ct);
            hover(e);
        }
    };
};
let off = () => {
    ehh = false;
    hide();
};
function prop(e){
    e.stopPropagation();
};

function vol2() {
    let ch = document.getElementById('vol').clientWidth, cc = document.getElementById('ch').clientWidth, res = (1 * cc)/ch;
    current.volume = res;
    v = res;
    vs = document.getElementById('vs');vs.innerText = (Math.floor(res * 100))+ '%◄';
}
let hover = (show) => {
    let x = show.clientX, ww = prog.offsetWidth, mw = window.innerWidth, di = (mw-ww),d2 = di/2,ct = (duration * (x-d2)) / distance, title = document.getElementById('title');
    title.innerText = Math.floor(ct / 60) + ":" + Math.floor(ct % 60);    title.style.display = 'block';
    title.style.left = (x - (25 / 50 * title.offsetWidth)) + 'px';
    title.style.top = (window.innerHeight - label.offsetHeight) + 'px';
}
function hover2(show){    
    let x =show.clientX, y =show.clientY, point = show.layerX, ct = (duration * point) / distance, title = document.getElementById('title');
    title.innerText = Math.floor(ct / 60) + ":" + Math.floor(ct % 60);
    
    title.style.display = 'block';
    title.style.left = (x - (25 / 50 * title.offsetWidth)) + 'px';
    title.style.top = (window.innerHeight - label.offsetHeight) + 'px';
}

function hide(){
    title = document.getElementById('title').style.display = 'none';
}
