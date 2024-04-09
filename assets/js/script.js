const input = document.querySelector('#pesosCl');
const select = document.querySelector('#divisas');
const button = document.querySelector('#buscarDivisa');
const span = document.querySelector('#resultado');
const canvas = document.querySelector('.graficosDiv');
const url = "https://mindicador.cl/api";
const formatDate = (date) => {
    const year = date.getFullYear();
    const mes = date.getMonth();
    const day = date.getDate();
    return `${day}/${mes}/${year}`;
}

let myChart = null;

function rendergraf(data) {
    const config = {
        type: "line",
        data: {
            labels: data.map((elem) => formatDate (new Date(elem.fecha))
            ),
            datasets: [{
                label: "10 días",
                backgroundColor: "red",
                data: data.map((elem) => elem.valor
                ),
      }] }
      }
    canvas.style.backgroundColor = "white";
    if (myChart){
        myChart.detroy();
    }
    myChart = new Chart(canvas, config)
} 

async function buscar(){
    try{
        const valores = input.value;
        const divisa = select.value;
        const fetching = await fetch(`${url}/${divisa}`);
        const databuscar = await fetching.json();
        return databuscar;
    }catch (error){
        console.log(error)
    }
    }
button.addEventListener('click', async()=>{
    const result = await buscar()
    const serie = result.serie;
    const ultimoValor = serie[0].valor;
    const data = serie.slice(0,10).reverse(); 
    let conversion = parseFloat (input.value)/ultimoValor ;
    span.innerHTML = conversion.toFixed(2)

rendergraf(data);

})

