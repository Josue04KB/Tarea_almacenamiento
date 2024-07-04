// Agregar un listener para el evento de envío del formulario y validar los datos,
// Ademas crear un Local Storage para guardar algunos datos.
document.getElementById('clientForm').addEventListener('submit', function(event) {
    // Prevenir el envío del formulario por defecto
    event.preventDefault();

    // Crear variables para obtener los valores de los campos del formulario
    const cedula = document.getElementById('cedula').value;
    const apellidos = document.getElementById('apellidos').value;
    const nombres = document.getElementById('nombres').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;

    // Definir las expresiones regulares para la validación
    const cedulaRegex = /^\d{10}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const telefonoRegex = /^\d{7,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar la cédula (10 digitos como maximo)
    if (!cedulaRegex.test(cedula)) {
        alert('La cédula debe contener exactamente 10 dígitos.');
        return;
    }

    // Validar los apellidos y nombres (solo letras)
    if (!nameRegex.test(apellidos) || !nameRegex.test(nombres)) {
        alert('Los apellidos y nombres solo deben contener letras.');
        return;
    }

    // Validar el teléfono (minimo 7 y 10 dígitos como maximo)
    if (!telefonoRegex.test(telefono)) {
        alert('El teléfono debe contener entre 7 y 10 dígitos.');
        return;
    }

    // Validar el correo electrónico (formato válido)
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }

    // Obtener la lista de clientes desde localStorage
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    // Verificar si el cliente ya existe en la lista
    const isClientRegistered = clients.find(client => client.cedula === cedula);

    // Si el cliente ya existe, mostrar una alerta y detener el envío
    if (isClientRegistered) {
        alert('Este cliente ya ha sido ingresado.');
        return;
    }

    // Agregar el nuevo cliente a la lista y guardar en localStorage
    clients.push({ cedula, apellidos, nombres, direccion, telefono, email });
    localStorage.setItem('clients', JSON.stringify(clients));

    // Mostrar una alerta de éxito
    alert('Formulario enviado con éxito!');
});