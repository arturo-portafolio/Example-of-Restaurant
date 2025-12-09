// ========================================
// CONFIGURACIÓN - Editar estos valores según tus necesidades
// ========================================

// URL del backend del chatbot (n8n con GPT)
// IMPORTANTE: Reemplaza esta URL con tu endpoint de n8n que conecta con GPT
const CHATBOT_API_URL = 'https://n8n-yl61.onrender.com/webhook/restaurant-chatbot';

// Información del restaurante
const restaurantInfo = {
    nombre: "Restaurante Demo",
    eslogan: "Sabores caseros todos los días",
    descripcion: "En Restaurante Demo nos especializamos en ofrecer comida típica de alta calidad con un ambiente familiar acogedor.",
    direccion: "Calle Ejemplo 123, Ciudad, País",
    telefono: "+507 6000-000090",
    // IMPORTANTE: Reemplaza este número con tu número de WhatsApp real en formato internacional
    // Formato: código de país + número (sin espacios, guiones ni signos +)
    // Ejemplo para Panamá: 50760000000
    whatsappNumero: "5076000000090",
    horario: {
        semana: "Lunes a Viernes: 11:00 AM - 10:00 PM",
        finDeSemana: "Sábado y Domingo: 12:00 PM - 11:00 PM"
    }
};

// Menú de platos
const menuItems = [
    {
        id: 1,
        nombre: "Sancocho de Gallina",
        descripcion: "Tradicional sopa con gallina criolla, verduras frescas y culantro.",
        precio: "$8.50"
    },
    {
        id: 2,
        nombre: "Ceviche Mixto",
        descripcion: "Fresco ceviche de mariscos con limón, cebolla y cilantro.",
        precio: "$12.00"
    },
    {
        id: 3,
        nombre: "Bistec Encebollado",
        descripcion: "Jugoso bistec de res con cebollas caramelizadas, arroz y ensalada.",
        precio: "$10.50"
    },
    {
        id: 4,
        nombre: "Arroz con Pollo",
        descripcion: "Arroz amarillo con pollo tierno, vegetales y especias.",
        precio: "$9.00"
    },
    {
        id: 5,
        nombre: "Patacones con Carne",
        descripcion: "Crujientes patacones acompañados de carne desmechada.",
        precio: "$11.00"
    },
    {
        id: 6,
        nombre: "Pescado Frito",
        descripcion: "Pescado fresco frito con patacones y ensalada verde.",
        precio: "$13.50"
    },
    {
        id: 7,
        nombre: "Tamales Caseros",
        descripcion: "Tamales tradicionales envueltos en hoja de plátano.",
        precio: "$4.50"
    },
    {
        id: 8,
        nombre: "Tres Leches",
        descripcion: "Delicioso postre de tres leches con crema batida.",
        precio: "$5.00"
    },
    { id: 9, 
     nombre: "Carimañolas Rellenas", 
     descripcion: "Carimañolas de yuca fritas rellenas de carne y queso, servidas con salsa blanca.", 
     precio: "$6.50" 
    },
    {
        id: 10,
        nombre: "Jugos Naturales",
        descripcion: "Jugos naturales de frutas variadas, servidos en vaso de 12 oz.",
        precio: "$3.00"
    },
    {
        id: 11,
        nombre: "Sodas",
        descripcion: "Gaseosas en lata o botella individual, siempre bien frías.",
        precio: "$2.00"
    },
    {
        id: 12,
        nombre: "Bebidas Calientes",
        descripcion: "Café, té o chocolate caliente, servidos en taza.",
        precio: "$2.50"
    }
];

// ========================================
// FUNCIONALIDAD PRINCIPAL
// ========================================

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeNavigation();
    initializeWhatsApp();
    initializeChatbot();
    updateContactInfo();
});

// Renderizar el menú dinámicamente
function initializeMenu() {
    const menuGrid = document.getElementById('menuGrid');
    
    if (!menuGrid) return;
    
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <div class="menu-item-header">
                <h3>${item.nombre}</h3>
                <span class="menu-item-price">${item.precio}</span>
            </div>
            <p>${item.descripcion}</p>
        `;
        menuGrid.appendChild(menuItemElement);
    });
}

// Navegación suave y menú móvil
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Scroll suave y cierre de menú móvil
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Cerrar menú móvil si está abierto
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
}

// Funcionalidad de WhatsApp (solo para el botón de contacto)
function initializeWhatsApp() {
    const contactWhatsAppBtn = document.getElementById('contactWhatsAppBtn');
    
    const whatsappClickHandler = (e) => {
        e.preventDefault();
        openWhatsApp();
    };
    
    if (contactWhatsAppBtn) {
        contactWhatsAppBtn.addEventListener('click', whatsappClickHandler);
    }
}

function openWhatsApp() {
    // Validar que el número esté configurado
    if (!restaurantInfo.whatsappNumero || restaurantInfo.whatsappNumero.trim() === "") {
        alert("Número de WhatsApp no configurado. Por favor, actualiza el número en script.js");
        return;
    }
    
    const mensaje = encodeURIComponent("Hola, quiero información sobre reservas");
    const url = `https://wa.me/${restaurantInfo.whatsappNumero}?text=${mensaje}`;
    
    window.open(url, '_blank');
}

// Actualizar información de contacto
function updateContactInfo() {
    const addressText = document.getElementById('addressText');
    const phoneText = document.getElementById('phoneText');
    
    if (addressText) {
        addressText.textContent = restaurantInfo.direccion;
    }
    
    if (phoneText) {
        phoneText.textContent = restaurantInfo.telefono;
    }
}

// ========================================
// CHATBOT
// ========================================

let chatMessages = [];
let questionCount = 0;   // nº de preguntas del usuario
let chatLocked = false;  // true cuando ya llegó al límite

function initializeChatbot() {
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    
    // Abrir chatbot
    if (chatBubble) {
        chatBubble.addEventListener('click', openChatbot);
        chatBubble.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openChatbot();
            }
        });
    }
    
    // Cerrar chatbot
    if (chatClose) {
        chatClose.addEventListener('click', closeChatbot);
    }
    
    // Enviar mensaje
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    // Enviar mensaje con Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function openChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.add('active');
    chatWindow.setAttribute('aria-hidden', 'false');
    
// Si es la primera vez, mostrar mensaje de bienvenida
if (chatMessages.length === 0) {
    addBotMessage(
        "Hola 👋, soy el asistente del Restaurante Demo. Tienes cuatro preguntas para hacerme sobre el menú, horario o precios. Después de eso, por favor contáctanos por WhatsApp."
    );
}

    
    // Focus en el input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        setTimeout(() => chatInput.focus(), 100);
    }
}

function closeChatbot() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.remove('active');
    chatWindow.setAttribute('aria-hidden', 'true');
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    // Si no existen los elementos, salir
    if (!chatInput || !chatSend) {
        return;
    }

    // Si ya se llegó al límite de preguntas, solo mostrar mensaje fijo y no llamar al backend
    if (chatLocked) {
        addBotMessage("Lo siento, no puedo responder más preguntas. Puedes escribirnos por WhatsApp en la sección de contacto.");
        return;
    }

    // Evitar doble envío mientras hay una respuesta en curso
    if (chatInput.disabled || chatSend.disabled) {
        return;
    }

    const message = chatInput.value.trim();

    // No enviar mensajes vacíos
    if (message === '') {
        return;
    }

    // Contar esta pregunta (el saludo inicial del bot NO se cuenta)
    questionCount += 1;

    // Deshabilitar input y botón mientras se procesa (modo frost)
    chatInput.disabled = true;
    chatSend.disabled = true;
    chatInput.classList.add('chat-input-disabled');
    chatSend.classList.add('chat-send-disabled');

    // Agregar mensaje del usuario
    addUserMessage(message);

    // Limpiar input
    chatInput.value = '';

    // Mostrar indicador de "Escribiendo..."
    const typingIndicator = addTypingIndicator();

    try {
        const botResponse = await sendMessageToBackend(message);

        removeTypingIndicator(typingIndicator);

        // Ajustar respuesta según el nº de pregunta
let finalResponse = botResponse;

if (questionCount === 1) {
    // 1ª pregunta respondida
    finalResponse = botResponse + " Te quedan 3 preguntas más.";
} else if (questionCount === 2) {
    // 2ª pregunta respondida
    finalResponse = botResponse + " Te quedan 2 preguntas más.";
} else if (questionCount === 3) {
    // 3ª pregunta respondida
    finalResponse = botResponse + " Te queda 1 pregunta más, ¿qué más deseas preguntar?";
} else if (questionCount === 4) {
    // 4ª pregunta respondida: cerrar sesión de preguntas
    finalResponse = botResponse + " Esta fue tu cuarta pregunta. Para todo lo demás, por favor contáctanos por WhatsApp en la sección de contacto.";
    chatLocked = true;
}
        addBotMessage(finalResponse);
    } catch (error) {
        removeTypingIndicator(typingIndicator);
        // Mensaje estándar cuando hay error con el backend
        addBotMessage("Lo siento, no pude procesar tu mensaje. Puedes escribirnos por WhatsApp en la sección de contacto.");
    } finally {
        // Volver a habilitar input y botón (aunque esté bloqueado lógicamente)
        chatInput.disabled = false;
        chatSend.disabled = false;
        chatInput.classList.remove('chat-input-disabled');
        chatSend.classList.remove('chat-send-disabled');
        chatInput.focus();
    }
}



function addUserMessage(message) {
    chatMessages.push({ type: 'user', text: message });
    renderMessage('user', message);
}

function addBotMessage(message) {
    chatMessages.push({ type: 'bot', text: message });
    renderMessage('bot', message);
}

function renderMessage(type, text) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    chatMessagesContainer.appendChild(messageDiv);
    
    // Scroll al último mensaje
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// Enviar mensaje al backend (n8n + GPT)
async function sendMessageToBackend(message) {
    // Verificar que la URL del backend esté configurada
    if (!CHATBOT_API_URL || CHATBOT_API_URL === 'https://TU-ENDPOINT-N8N-AQUI') {
        // Si no está configurado, usar respuesta de fallback
        console.warn('CHATBOT_API_URL no está configurado. Usando respuestas de fallback.');
        throw new Error('Backend no configurado');
    }
    
    try {
        const response = await fetch(CHATBOT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                source: 'web-restaurant'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // El backend debería devolver { reply: "texto de respuesta" }
        if (data.reply) {
            return data.reply;
        } else {
            throw new Error('Formato de respuesta inválido');
        }
    } catch (error) {
        console.error('Error al contactar con el backend del chatbot:', error);
        throw error;
    }
}

// Agregar indicador de "Escribiendo..."
function addTypingIndicator() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.id = 'typingIndicator';
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.innerHTML = '<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>';
    
    typingDiv.appendChild(bubbleDiv);
    chatMessagesContainer.appendChild(typingDiv);
    
    // Scroll al último mensaje
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    
    return typingDiv;
}

// Remover indicador de "Escribiendo..."
function removeTypingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
    }
}
