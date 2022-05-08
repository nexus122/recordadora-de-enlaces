// Miramos si existe el localStorage state para recogerlo, si no cremos un estado de la aplicación nuevo
let state = {
    enlaces: [],
}

if(localStorage.state){
    state = JSON.parse(localStorage.state);
    draw();
}

// Eventos
document.querySelector("#enviar").addEventListener('click', (e) => {
    e.preventDefault();    
    let enlace = document.querySelector("#enlace").value;
    let nombre = document.querySelector("#nombre").value;
    let ahora = Date.now();

    if(enlace.trim() == ""){
        return;
    }

    state.enlaces.push({ enlace: enlace, date: ahora, id: ahora, nombre:nombre });    
    saveLocalStorage();
    draw();
})

function order() {
    state.enlaces.sort((a, b) => {
        return a.date - b.date;
    });
}

function draw() {
    order();
    let html = "";
    state.enlaces.forEach(enlace => {
        html += `
        <tr>
            <td>
                <a href="${enlace.enlace}" target="_blank">${enlace.enlace}</a>
            </td>
            <td>
                ${enlace.date}
            </td>
            <td>
                <button class="btn btn-danger delete" onclick="deleteEnlace(${enlace.id})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </td>
        <tr>`;
    });
    document.querySelector("#lista").innerHTML = html;
}

function deleteEnlace(param) {
    console.log("Entramos en borrar: ", param);    
    state.enlaces = state.enlaces.filter(enlace => {
        return enlace.id != param;
    });
    draw();
    saveLocalStorage();
}

function saveLocalStorage(){
    localStorage.setItem("state", JSON.stringify(state));
}