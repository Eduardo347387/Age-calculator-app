
document.addEventListener('DOMContentLoaded', function() {
    const $formulario = document.getElementById('form');
    $formulario.addEventListener('submit', obtenerDatos);
});

function obtenerDatos(e){
    e.preventDefault();
    let numeroElement = 0
    const $day = document.getElementById('day');
    const $months = document.getElementById('months')
    const $year = document.getElementById('year')
    
    const fechaValida = validarForm([$day,$months,$year])

    numeroElement = Object.values(fechaValida).length
    
    calcular(numeroElement, fechaValida)

}

function validarForm(fecha){
    const elementosValidos = {};
    //Evaluar campo por campo
    fecha.forEach(e=>{
        if(e.value.trim() === ''){
            alertaEstadoInput(e,'#e54a4a')
            alertaText(e.parentElement,'this field is required')
            return
        }
        else if(e.id === 'year' && validarAnio(e.value)){
            alertaEstadoInput(e,'#e54a4a')
            alertaText(e.parentElement,`must be a valid ${e.id}`)
            return
        }
       
        else if(e.id === 'months' && !validarMes(e.value)){
            alertaEstadoInput(e,'#e54a4a')
            alertaText(e.parentElement,`must be a valid ${e.id}`)
            return
        }
        else if(e.id === 'day' && !esFechaValida(fecha[2],fecha[1],fecha[0])){
            alertaEstadoInput(e,'#e54a4a')
            alertaText(e.parentElement,`must be a valid ${e.id}`)
            return
        }
        
        elementosValidos[e.id] = e.value;
        alertaEstadoInput(e,' #22b335')
        limpiarAlerta(e.parentElement,'.msError')
        
    })
    return elementosValidos;
}

function calcular(numElement,fecha){
    
    if(numElement === 3){
        const $day = document.getElementById('result-day')
        const $months = document.getElementById('result-months')
        const $year = document.getElementById('result-year')

        const {day,months,year} = fecha;
        
        const fechaNac = new Date(year,months-1,day);
        
        const fechaActual = new Date();

        const diferenciaMilisegundos = fechaActual - fechaNac;

        const edad = new Date(diferenciaMilisegundos);
    
        const anios = edad.getUTCFullYear() - 1970;
        const meses = edad.getUTCMonth();
        const dias = edad.getUTCDate() - 1;

        $day.textContent = dias;
        $months.textContent = meses;
        $year.textContent = anios;
    } 
}

function esFechaValida(anio, mes, dia) {
    anio = parseInt(anio.value)
    mes = parseInt(mes.value)
    dia = parseInt(dia.value)
    const fecha = new Date(anio, mes - 1, dia);
    return (
        fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia
    );
}


function validarMes(months) {
    const regex = /^(0?[1-9]|1[0-2])$/;
    return regex.test(months)
}

function validarAnio(year){
    const fechaActual = new Date()
    const regex = /^-?0*[1-9]\d{3,}\.?\d*$/;

    if(regex.test(year)){
        return parseInt(year) > fechaActual.getFullYear()
    }else{
        return true
    }
    
}

function alertaEstadoInput(referencia,color){
    let $title, $input;
    $title = referencia.parentElement.children[0]
    $input = referencia.parentElement.children[1]
    $title.style.color = color
    $input.style.borderColor = color
}

function alertaText(referencia,mensaje){

    //Si no existe la alerta se  va a crear una
    // y si existe simplemente se va a ejecutar la funcion 

    if(!limpiarAlerta(referencia,'.msError')){
        //se puede crear una funcion para crear elementos
        const $paragraph =  document.createElement('P')
        $paragraph.classList.add('msError')
        $paragraph.style.color = '#e54a4a'
        $paragraph.style.fontSize = '1rem'
        $paragraph.style.fontStyle = 'italic'
        $paragraph.style.paddingTop = '0.3rem'
        $paragraph.textContent = mensaje;
        
        referencia.appendChild($paragraph)
    }    
}

function limpiarAlerta(referencia,element) {
    const alerta = referencia.querySelector(element);
    if (alerta) {
        alerta.remove();
    }
    // else{
    //     return false
    // }
}


    