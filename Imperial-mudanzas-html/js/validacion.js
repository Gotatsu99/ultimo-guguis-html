// Validación en tiempo real del formulario
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cotizacionForm');
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const email = document.getElementById('email');
    const servicio = document.getElementById('servicio');
    const mensaje = document.getElementById('mensaje');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Función para mostrar error
    function mostrarError(campo, mensaje) {
        const errorDiv = campo.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-mensaje')) {
            errorDiv.textContent = mensaje;
        } else {
            const nuevoError = document.createElement('div');
            nuevoError.className = 'error-mensaje';
            nuevoError.style.color = '#dc3545';
            nuevoError.style.fontSize = '0.85rem';
            nuevoError.style.marginTop = '5px';
            nuevoError.textContent = mensaje;
            campo.parentNode.appendChild(nuevoError);
        }
        campo.classList.add('error');
        campo.classList.remove('valid');
    }
    
    // Función para limpiar error
    function limpiarError(campo) {
        const errorDiv = campo.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-mensaje')) {
            errorDiv.remove();
        }
        campo.classList.remove('error');
        campo.classList.add('valid');
    }
    
    // Validar nombre
    nombre.addEventListener('input', function() {
        const valor = this.value.trim();
        if (valor.length < 3) {
            mostrarError(this, 'Mínimo 3 caracteres');
        } else if (!/^[a-zA-ZáéíóúñÑ\s]+$/.test(valor)) {
            mostrarError(this, 'Solo letras');
        } else {
            limpiarError(this);
        }
        validarFormularioCompleto();
    });
    
    // Validar teléfono
    telefono.addEventListener('input', function() {
        const valor = this.value.trim();
        if (!/^[0-9]+$/.test(valor)) {
            mostrarError(this, 'Solo números');
        } else if (valor.length < 7 || valor.length > 15) {
            mostrarError(this, 'Mínimo 7 dígitos');
        } else {
            limpiarError(this);
        }
        validarFormularioCompleto();
    });
    
    // Validar email
    email.addEventListener('input', function() {
        const valor = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
            mostrarError(this, 'Email inválido');
        } else {
            limpiarError(this);
        }
        validarFormularioCompleto();
    });
    
    // Validar servicio
    servicio.addEventListener('change', function() {
        if (this.value === '') {
            mostrarError(this, 'Selecciona un servicio');
        } else {
            limpiarError(this);
        }
        validarFormularioCompleto();
    });
    
    // Validar mensaje
    mensaje.addEventListener('input', function() {
        const valor = this.value.trim();
        if (valor.length < 10) {
            mostrarError(this, 'Mínimo 10 caracteres');
        } else {
            limpiarError(this);
        }
        validarFormularioCompleto();
    });
    
    // Validar formulario completo
    function validarFormularioCompleto() {
        const errores = document.querySelectorAll('.error-mensaje');
        if (errores.length === 0 && 
            nombre.value.trim() !== '' &&
            telefono.value.trim() !== '' &&
            email.value.trim() !== '' &&
            servicio.value !== '' &&
            mensaje.value.trim() !== '') {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
        }
    }
    
    // Loading al enviar
    form.addEventListener('submit', function(e) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // ========================================
        // EVENTO PARA GOOGLE ANALYTICS - FORMULARIO ENVIADO
        // ========================================
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'engagement',
                'event_label': 'formulario_cotizacion'
            });
        }
    });
});

// ========================================
// EVENTOS ADICIONALES PARA GOOGLE ANALYTICS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Verificar que gtag esté definido
    if (typeof gtag === 'undefined') return;
    
    // 1. Rastrear clics en teléfono
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'phone_call', {
                'event_category': 'contact',
                'event_label': 'click_telefono'
            });
        });
    });
    
    // 2. Rastrear clics en WhatsApp
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'whatsapp_click', {
                'event_category': 'contact',
                'event_label': 'click_whatsapp'
            });
        });
    });
    
    // 3. Rastrear clics en botones de cotización
    document.querySelectorAll('.btn-primary, .nav-cta, .cta-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            gtag('event', 'cotizacion_click', {
                'event_category': 'engagement',
                'event_label': 'click_cotizar'
            });
        });
    });
    
    // 4. Rastrear clics en el botón "Enviar Mensaje" del formulario de contacto
    const contactoForm = document.querySelector('.formulario-contacto form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', function() {
            gtag('event', 'contact_form_submit', {
                'event_category': 'engagement',
                'event_label': 'formulario_contacto'
            });
        });
    }
    
    // 5. Rastrear clics en el botón "Cómo llegar" del mapa
    document.querySelectorAll('.btn-mapa').forEach(btn => {
        btn.addEventListener('click', function() {
            gtag('event', 'map_click', {
                'event_category': 'navigation',
                'event_label': 'click_mapa'
            });
        });
    });
});