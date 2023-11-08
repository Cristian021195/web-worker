const $calc = document.getElementById('calc');
const $num = document.getElementById('num');
const $res = document.getElementById('res');
const $kill = document.getElementById('kill');
const $peticionar = document.getElementById('peticionar');
const $res_peticionar = document.getElementById('res-peticionar');
const $div = document.createElement('div');

//registracion de web worker
let customWorker = new Worker('./worker.js');
let fetchWorker = new Worker('./fetchworker.js');
fetchWorker.contenedor = $res_peticionar;

fetchWorker.onmessage = (ev) => {
    $res_peticionar.textContent = JSON.stringify(ev.data, null, 2);
}

function cargando(){
    $res_peticionar.textContent = 'Cargando..';
}

customWorker.onmessage = (ev) => {
    $res.textContent = ev.data?.number;
}

//eventos
$peticionar.addEventListener('submit', (e)=>{
    e.preventDefault();    
    fetchWorker.postMessage('https://jsonplaceholder.typicode.com/todos/1');
})

$calc.addEventListener('click', ()=>{
    customWorker.postMessage($num.value);
})

$kill.addEventListener('click', ()=>{
    customWorker.terminate();
    customWorker = undefined;
})