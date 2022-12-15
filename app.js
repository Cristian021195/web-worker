const $calc = document.getElementById('calc');
const $num = document.getElementById('num');
const $res = document.getElementById('res');
const $kill = document.getElementById('kill');

//registracion de web worker
let customWorker = new Worker('./worker.js');
customWorker.onmessage = (ev) => {
    $res.textContent = ev.data?.number;
}

//eventos
$calc.addEventListener('click', ()=>{
    //
    customWorker.postMessage($num.value);
})

$kill.addEventListener('click', ()=>{
    //
    customWorker.terminate();
    customWorker = undefined;
})