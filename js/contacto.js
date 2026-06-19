const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nombre = document.getElementById("contactName").value.trim();
    let apellido = document.getElementById("contactLastName").value.trim();
    let correo = document.getElementById("contactEmail").value.trim();
    let telefono = document.getElementById("Telefono").value.trim();
    let mensaje = document.getElementById("contactMessage").value.trim();

    let valido = true;

    if (nombre.length < 3) {
        document.querySelector('[data-error="contactName"]').textContent = "El nombre debe tener mínimo 3 caracteres";
        valido = false;
    }

    if (apellido.length < 3) {
        document.querySelector('[data-error="contactLastName"]').textContent = "El apellido debe tener mínimo 3 caracteres";
        valido = false;
    }

    if (!correo.includes("@")) {
        document.querySelector('[data-error="contactEmail"]').textContent = "Correo no válido";
        valido = false;
    }

    if (telefono.length < 7) {
        document.querySelector('[data-error="Telefono"]').textContent = "Teléfono no válido";
        valido = false;
    }

    if (mensaje.length < 10) {
        document.querySelector('[data-error="contactMessage"]').textContent = "El mensaje debe tener mínimo 10 caracteres";
        valido = false;
    }

    if (valido) {
        alert("Formulario enviado correctamente");
        form.reset();
    }
});