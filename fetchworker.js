self.onmessage = async (ev, fn) => {
    self.postMessage({data:{status:'cargando..'}, error:false});
    try {
        let data = await fetch(ev.data);
        let res = await data.json();
        self.postMessage({data:res, error:false});
    } catch (error) {
        self.postMessage({data:error, error:true});
    }
    /*const index = ev.data;
    const number = calcFibonacci(index)

    self.postMessage({index, number})*/
}