

document.addEventListener('DOMContentLoaded', function() {
    const $formulario = document.getElementById('form');
    $formulario.addEventListener('submit', obtenerDatos);
});

function obtenerDatos(e){
    e.preventDefault();
    const $day = document.getElementById('day');
    const $months = document.getElementById('months')
    const $year = document.getElementById('year')

   validarForm([$day,$months,$year])

}

function validarForm(fecha){

    //Evaluar campo por campo
     fecha.forEach(e=>{
        if(e.value.trim() === ''){
            alertaEstadoInput(e,'#e54a4a')
            alertaText(e.parentElement,'this field is required')
        }
        // if(fecha[0].value.trim() !== '' && validarDia(fecha[0].value)){
        //     console.log(`${e.id}`)
        // }
        else{
            alertaEstadoInput(e,' #22b335')
            limpiarAlerta(e.parentElement,'.msError')
        }
    })
    
}

function validarDia(day) {
    const regex = /^(0?[1-9]|[1-2][0-9]|3[0-1])$/
    return regex.test(day)
}

function validarMes(months) {
    // Lógica de validación para el mes
}

function validarAnio(year) {
    // Lógica de validación para el año
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
        $paragraph.style.fontSize = '0.8rem'
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


    