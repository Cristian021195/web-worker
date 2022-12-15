
self.onmessage = (ev) => {
    const index = ev.data;
    const number = calcFibonacci(index)

    self.postMessage({index, number})
}
/*self.addEventListener('message', (ev)=>{
    const index = ev.data;
    const number = calcFibonacci(index)

    self.postMessage({index, number})
})*/

function calcFibonacci(num=0){
    num = parseInt(num);

    if(num < 2){//usando recursividad
        return num
    }else{
        return calcFibonacci(num - 1) + calcFibonacci(num - 2)
    }
}