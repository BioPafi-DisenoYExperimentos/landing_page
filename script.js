//MENU HAMBURGUESA

const menu = document.querySelector(".menu-horizontal");
const openMenuBtn = document.querySelector(".open-menu");

//Funcion

function toggleMenu() {
  menu.classList.toggle("menu_opened");
}

openMenuBtn.addEventListener("click", toggleMenu);


document.addEventListener('DOMContentLoaded', function() {
  // Cargar idioma guardado
  const savedLang = localStorage.getItem('language') || 'es';
  toggleLanguage(savedLang, false);

  // Configurar botón
  document.getElementById('language-toggle').addEventListener('click', () => {
      const newLang = localStorage.getItem('language') === 'es' ? 'en' : 'es';
      toggleLanguage(newLang);
  });
});

function toggleLanguage(lang, save = true) {
  // Actualizar textos
  document.querySelectorAll('[data-lang-es], [data-lang-en]').forEach(element => {
      const text = element.getAttribute(`data-lang-${lang}`);
      if(text) {
          element.innerHTML = text.replace(/<br>/g, '<br>');
      }
  });

  // Actualizar atributo lang
  document.documentElement.lang = lang;

  // Guardar preferencia
  if(save) {
      localStorage.setItem('language', lang);
  }

  // Actualizar términos y condiciones
  if(window.location.pathname.includes('terms-conditions')) {
      document.title = lang === 'es' ? 'Terminos y condiciones' : 'Terms and Conditions';
  } else {
      document.title = lang === 'es' ? 
          'PlantSync – Cuida tus plantas con tecnología inteligente' : 
          'PlantSync – Smart plant care technology';
  }
}

// Waitlist Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('waitlist-modal');
  if (!modal) return;
  const closeBtn = document.querySelector('.close-modal');
  const waitlistForm = document.getElementById('waitlist-form');
  const successMsg = document.getElementById('waitlist-success-msg');
  const planInput = document.getElementById('selected-plan-input');
  const displayPlanInput = document.getElementById('display-plan');

  // Open modal on click
  document.querySelectorAll('.waitlist-trigger').forEach(button => {
    button.addEventListener('click', () => {
      const planName = button.getAttribute('data-plan');
      planInput.value = planName;
      displayPlanInput.value = planName;
      
      // Reset form and message
      waitlistForm.reset();
      waitlistForm.style.display = 'block';
      successMsg.style.display = 'none';
      
      modal.style.display = 'flex';
    });
  });

  // Close modal
  const closeModal = () => {
    modal.style.display = 'none';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Form submission
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('waitlist-name').value;
    const email = document.getElementById('waitlist-email').value;
    const plan = planInput.value;

    // Simulate saving to local storage (experiment analytics tracking)
    const key = `waitlist_${Date.now()}`;
    localStorage.setItem(key, JSON.stringify({ name, email, plan, timestamp: new Date().toISOString() }));

    // Show success message
    waitlistForm.style.display = 'none';
    successMsg.style.display = 'block';
  });
});