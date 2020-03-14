let usuarios = []

function atraparDatos(){
    let tipoDocumento = document.getElementById("cmbIdentificacion").value
    let identificacion = document.getElementById("txtId").value
    let nombres = document.getElementById("txtNombres").value
    let apellidos = document.getElementById("txtApellidos").value
    let correo = document.getElementById("txtEmail").value
    let peso = parseFloat(document.getElementById("txtPeso").value)
    let estatura = parseFloat(document.getElementById("txtEstatura").value)

    let imc = calcularImc(estatura,peso)
    let estadoPeso = determinarEstadoPeso(imc)

    usuario = {tipoDocumento,identificacion,nombres,apellidos,correo,peso,estatura,imc,estadoPeso}
    return usuario
}

function crearUsuario(){
    let usuario = atraparDatos()
    let usuarioExiste = usuarios.find(x => usuario.identificacion === x.identificacion)
    let mensaje = document.getElementById("mensaje")
    let data = ""
    if(usuarioExiste){
        data = `<div class="alert alert-danger" role="alert">
        Error,El usuario ya existe <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
    }else{
        usuarios.push(usuario)
        data = `<div class="alert alert-success" role="alert">
        El usuario se agrego correctamente <a href="#" class="alert-link"></a>
        </div>`
        mensaje.innerHTML = data
        listarUsuario()
        limpiarCampos()
    }
}

function listarUsuario(){
    let lista = document.getElementById("listaUsuarios")
    let data = ""
    for(let i = 0; i<usuarios.length; i++){
        let usuario = usuarios[i]
        data += "<tr>"
        data += `<td>${usuario.tipoDocumento}</td>`
        data += `<td>${usuario.identificacion}</td>`
        data += `<td>${usuario.nombres}</td>`
        data += `<td>${usuario.apellidos}</td>`
        data += `<td>${usuario.correo}</td>`
        data += `<td>${usuario.peso}</td>`
        data += `<td>${usuario.estatura}</td>`
        data += `<td>${usuario.imc}</td>`
        data += `<td><button type="button" onclick = "mostrarEstadoPeso(${i})" class="btn btn-primary">Ver Estado</button></td>`
        data += `<td><button type="button" onclick = "cargarInfo(${i})" class="btn btn-primary">Editar</button></td>`
        data += `<td><button type="button" onclick = "eliminar(${i})" class="btn btn-primary">Eliminar</button></td>`
        data += "</tr>"
    }
    lista.innerHTML = data
}

function mostrarEstadoPeso(index){
    let usuario = usuarios[index]
    let ventana = document.getElementById("ventanaEmergente")
    let data = ""
    data = `<div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Estado del nivel de peso</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>${usuario.estadoPeso}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>`
  ventana.innerHTML = data
}

function calcularImc(altura,peso){
    return peso/Math.pow(altura,2)
}

function determinarEstadoPeso(imc){
    let estadoPeso = ""
    switch(imc){
        case imc<18.5:
            estadoPeso = "Peso insuficiente"
            break;
        case 18.5<=imc<=24.9:
            estadoPeso = "Peso Normal"
            break;
        case 25<=imc<=26.9:
            estadoPeso = "Sobre peso grado 1"
            break;
        case 27<=imc<=29.9:
            estadoPeso = "Sobre peso grado 2 (preobesidad)"
            break;
        case 30<=imc<=34.9:
            estadoPeso = "Obesidad de tipo 1"
            break;
        case 35<=imc<=39.9:
            estadoPeso = "obesidad de tipo 2"
            break;    
        case 40<=imc<=49.9:
            estadoPeso = "Obesidad de tipo 3 (mórbida)"
            break;
        case imc>50:
            estadoPeso = "Obesidad de tipo 4 (extrema)"
            break;
    }
    
    return estadoPeso
}

function limpiarCampos(){
    let tipoDocumento = document.getElementById("cmbIdentificacion").value = ""
    let identificacion = document.getElementById("txtId").value = ""
    let nombres = document.getElementById("txtNombres").value = ""
    let apellidos = document.getElementById("txtApellidos").value = ""
    let correo = document.getElementById("txtEmail").value = ""
    let peso = document.getElementById("txtPeso").value = ""
    let estatura = document.getElementById("txtEstatura").value = ""
}