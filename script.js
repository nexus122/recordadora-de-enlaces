// Miramos si existe el localStorage state para recogerlo, si no cremos un estado de la aplicación nuevo
let state = {
    enlaces: [],
}

if(localStorage.state){
    state = JSON.parse(localStorage.state);
    draw(state.enlaces);
}

/* EVENTOS */
// Gestion del evento submit
document.querySelector("#nuevoEnlace").addEventListener('submit', (e) => {
    e.preventDefault();    
    let enlace = document.querySelector("#enlace").value;
    let nombre = document.querySelector("#nombre").value;
    let ahora = Date.now();

    if(enlace.trim() == ""){
        return;
    }

    state.enlaces.push({ enlace: enlace, date: ahora, id: ahora, nombre:nombre });    
    saveLocalStorage();
    draw(state.enlaces);
    
    // Eliminamos el texto que se ha escrito en el campo.
    document.querySelector("#enlace").value = "";
    document.querySelector("#nombre").value = "";
})

document.querySelector("#buscador").addEventListener('keyup', (e) => {
    let search = e.target.value;
    if(search.trim() == ""){        
        draw(state.enlaces);
        return;
    }

    let result = state.enlaces.filter(enlace => {        
        return enlace.nombre.toLowerCase().includes(search.toLowerCase());
    });

    console.log("Resultado: ", result);
    draw(result);    
});

/* Funciones operativas */
// Funcion para ordenar los elementos por fecha
function order() {
    state.enlaces.sort((a, b) => {
        return a.date - b.date;
    });
}

function dateFormater(date){
    let dateObject = new Date(date);
    let day = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    let hour = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let formatedDate = `<i class="fa-solid fa-calendar"></i> ${day}/${month}/${year} - <i class="fa-solid fa-clock"></i> ${hour}:${minutes}`;
    return formatedDate;
}

// Funcion para pintar los enlaces en el DOM
function draw(param) {
    order();
    let html = "";
    param.forEach(enlace => {
        html += `
        <tr>
            <td>
                <a href="${enlace.enlace}" target="_blank"><b>${enlace.nombre? enlace.nombre: enlace.enlace}</b></a>
            </td>
            <td>
                ${dateFormater(enlace.date)}
            </td>
            <td>
                <button class="btn btn-danger delete" onclick="deleteEnlace(${enlace.id})"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        <tr>`;
    });
    document.querySelector("#lista").innerHTML = html;
}

// Funcion para borrar enlaces
function deleteEnlace(param) {
    console.log("Entramos en borrar: ", param);    
    state.enlaces = state.enlaces.filter(enlace => {
        return enlace.id != param;
    });
    draw(state.enlaces);
    saveLocalStorage();
}

// Guardar el estado de la app en el localStorage
function saveLocalStorage(){
    localStorage.setItem("state", JSON.stringify(state));
}