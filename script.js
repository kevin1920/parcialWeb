let usuarios = []

obtenerInfoLocalStorage()

let indexActualizar = null

function atraparDatos() {
    let tipoDocumento = document.getElementById("cmbIdentificacion").value
    let identificacion = document.getElementById("txtId").value
    let nombres = document.getElementById("txtNombres").value
    let apellidos = document.getElementById("txtApellidos").value
    let correo = document.getElementById("txtEmail").value
    let peso = parseFloat(document.getElementById("txtPeso").value)
    let estatura = parseFloat(document.getElementById("txtEstatura").value)

    let imc = calcularImc(estatura, peso)
    let estadoPeso = determinarEstadoPeso(imc)

    usuario = { tipoDocumento, identificacion, nombres, apellidos, correo, peso, estatura, imc, estadoPeso }
    return usuario
}

function crearUsuario() {
    limpiarMensajes()
    let usuario = atraparDatos()
    let usuarioExiste = usuarios.find(x => usuario.identificacion === x.identificacion)
    let mensaje = document.getElementById("mensaje")
    let data = ""
    if (usuarioExiste) {
        data = `<div class="alert alert-danger" role="alert">
        Error,El usuario ya existe <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
    } else {
        usuarios.push(usuario)
        data = `<div class="alert alert-success" role="alert">
        El usuario se agrego correctamente <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
        agregarInfoLocalStorage(usuarios)
        listarUsuario()
        limpiarCampos()
    }
}

function listarUsuario() {
    let lista = document.getElementById("listaUsuarios")
    let data = ""
    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i]
        data += "<tr>"
        data += `<td>${usuario.tipoDocumento}</td>`
        data += `<td>${usuario.identificacion}</td>`
        data += `<td>${usuario.nombres}</td>`
        data += `<td>${usuario.apellidos}</td>`
        data += `<td>${usuario.correo}</td>`
        data += `<td>${usuario.peso}kg</td>`
        data += `<td>${usuario.estatura}m</td>`
        data += `<td>${usuario.imc}</td>`
        data += `<td><button type="button" onclick = "mostrarEstadoPeso(${i})" class="btn btn-primary">Ver Estado</button></td>`
        data += `<td><button type="button" onclick = "cargarDatos(${i})" class="btn btn-primary">Editar</button></td>`
        data += `<td><button type="button" onclick = "eliminarUsuario(${i})" class="btn btn-primary">Eliminar</button></td>`
        data += "</tr>"
    }
    lista.innerHTML = data
}

function mostrarEstadoPeso(index) {
    limpiarMensajes()
    let usuario = usuarios[index]
    let ventana = document.getElementById("ventanaEmergente")
    let data = ""
    data = `<div class="alert alert-dark" role="alert">
    El usuario ${usuario.nombres} tiene ${usuario.estadoPeso} <a href="#" class="alert-link"></a>
    </div>`
    ventana.innerHTML = data
}

function eliminarUsuario(index) {
    limpiarMensajes()
    usuarios.splice(index, 1)
    listarUsuario()
    agregarInfoLocalStorage(usuarios)
}

function cargarDatos(index) {
    limpiarMensajes()
    indexActualizar = index
    let usuario = usuarios[index]
    document.getElementById("cmbIdentificacion").value = usuario.tipoDocumento
    document.getElementById("txtId").value = usuario.identificacion
    document.getElementById("txtNombres").value = usuario.nombres
    document.getElementById("txtApellidos").value = usuario.apellidos
    document.getElementById("txtEmail").value = usuario.correo
    document.getElementById("txtPeso").value = usuario.peso
    document.getElementById("txtEstatura").value = usuario.estatura
    document.getElementById("btnCrearUsuario").style.display = "none"
    document.getElementById("btnActualizarUsuario").style.display = "inline"
}

function actualizarUsuario() {
    let usuario = atraparDatos()
    usuarios.splice(indexActualizar, 1, usuario)
    listarUsuario()
    limpiarCampos()
    agregarInfoLocalStorage(usuarios)
    document.getElementById("btnCrearUsuario").style.display = "inline"
    document.getElementById("btnActualizarUsuario").style.display = "none"
}

function calcularImc(altura, peso) {
    return peso / Math.pow(altura, 2)
}

function determinarEstadoPeso(imc) {
    let estadoPeso = ""

    if (imc < 18.5) {
        estadoPeso = "Peso insuficiente"
    }
    if (18.5 <= imc && imc <= 24.9) {
        estadoPeso = "Peso Normal"
    } 
    if (25 <= imc && imc <= 26.9) {
        estadoPeso = "Sobre peso grado 1"
    } 
    if (27 <= imc && imc <= 29.9) {
        estadoPeso = "Sobre peso grado 2 (preobesidad)"
    } 
    if (30 <= imc && imc <= 34.9) {
        estadoPeso = "Obesidad de tipo 1"
    } 
    if (35 <= imc && imc <= 39.9) {
        estadoPeso = "obesidad de tipo 2"
    } 
    if (40 <= imc && imc <= 49.9) {
        estadoPeso = "Obesidad de tipo 3 (mórbida)"
    } 
    if (imc > 50){
        estadoPeso = "Obesidad de tipo 4 (extrema)"
    }    

    return estadoPeso
}

function limpiarCampos() {
    document.getElementById("cmbIdentificacion").value = ""
    document.getElementById("txtId").value = ""
    document.getElementById("txtNombres").value = ""
    document.getElementById("txtApellidos").value = ""
    document.getElementById("txtEmail").value = ""
    document.getElementById("txtPeso").value = ""
    document.getElementById("txtEstatura").value = ""
}

function limpiarMensajes(){
    let ventana = document.getElementById("ventanaEmergente")
    let mensaje = document.getElementById("mensaje")
    ventana.innerHTML=""
    mensaje.innerHTML=""
}

function agregarInfoLocalStorage(listaUsuario){
    localStorage.setItem("ListaUsuarios",JSON.stringify(listaUsuario))
}

function obtenerInfoLocalStorage(){
    let listaObtenida = localStorage.getItem("ListaUsuarios")
    if(listaObtenida == null){
        usuarios = []
    }else{
        usuarios = JSON.parse(listaObtenida)
        listarUsuario()
    }
}