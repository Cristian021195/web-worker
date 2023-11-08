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


if (navigator.serviceWorker){
    let swLocation = '/web-worker/sw.js';
    if(window.location.href.includes('localhost')){
        swLocation = '/sw.js';
    }
    navigator.serviceWorker.register( swLocation ).then(res=>console.log('registrado sw'))
    .catch (error=>{console.log('error al registrar sw')});
    navigator.serviceWorker.addEventListener("message", (event) => {
        console.log(event.data.msg, event.data.url);
    });
}

