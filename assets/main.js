const SECRET_KEYWORD = "lelolela"; 
// Función para verificar la identidad
function verifyIdentity() {
    const keywordInput = document.getElementById('keyword');
    const keyword = keywordInput.value.trim().toLowerCase(); // Convertir a minúsculas
    const errorMessage = document.getElementById('errorMessage');
    const keywordSection = document.getElementById('keywordSection');
    const giftSection = document.getElementById('giftSection');
    
    if (keyword === SECRET_KEYWORD) {
        // Palabra correcta - mostrar regalo
        keywordSection.style.display = 'none';
        giftSection.style.display = 'block';
        
        // Animación de celebración
        createCelebration();
    } else {
        // Palabra incorrecta - mostrar error
        errorMessage.classList.add('show');
        keywordInput.classList.add('error');
        
        // Agitar el input
        keywordInput.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            keywordInput.style.animation = '';
        }, 500);
        
        // Limpiar input después de error
        keywordInput.value = '';
        keywordInput.focus();
    }
}

// Convertir a minúsculas mientras el usuario escribe
document.getElementById('keyword').addEventListener('input', function(e) {
    // Guardar la posición del cursor
    const cursorPosition = e.target.selectionStart;
    const originalLength = this.value.length;
    
    // Convertir el valor a minúsculas
    this.value = this.value.toLowerCase();
    
    // Ajustar la posición del cursor si se eliminaron caracteres
    const newLength = this.value.length;
    const newPosition = cursorPosition - (originalLength - newLength);
    e.target.setSelectionRange(newPosition, newPosition);
    
    // Ocultar mensaje de error
    document.getElementById('errorMessage').classList.remove('show');
});

// Permitir enviar con Enter
document.getElementById('keyword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verifyIdentity();
    }
});

// Función para copiar al portapapeles - VERSIÓN CORREGIDA
function copyToClipboard(elementId, messageId, btnElement) {
    const element = document.getElementById(elementId);
    // Obtener solo el texto, ignorando el botón
    const textToCopy = element.childNodes[0].nodeValue.trim();
    
    // Usar el API del portapapeles
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Mostrar mensaje de copiado
        const messageElement = document.getElementById(messageId);
        messageElement.classList.add('show');
        
        // Ocultar mensaje después de 2 segundos
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 2000);
        
        // Animación del botón - AHORA USANDO EL PARÁMETRO btnElement
        if (btnElement) {
            btnElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                btnElement.style.transform = 'scale(1)';
            }, 200);
        }
    }).catch(err => {
        console.error('Error al copiar: ', err);
        alert('No se pudo copiar automáticamente. Por favor, selecciona y copia manualmente.');
    });
}

// Función para crear celebración visual
function createCelebration() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💙', '💎', '🌟', '✨', '💫', '🦋'][Math.floor(Math.random() * 6)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animation = `float-up ${Math.random() * 3 + 2}s ease-out forwards`;
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.filter = 'hue-rotate(200deg)';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 100);
    }
}

// Mensaje de bienvenida en consola (para los curiosos)
console.log('%c🌸 ¡Hola, mujer maravillosa! 🌸', 'color: #d43f6b; font-size: 16px; font-weight: bold;');
console.log('%c💝 La palabra clave es una palabra bonita que te describe su amor! :)', 'color: #b23b5e; font-size: 14px;');
