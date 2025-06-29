// Alternar tema claro/escuro
const themeToggleBtn = document.getElementById('themeToggle');

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️ Claro';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggleBtn.textContent = '🌙 Escuro';
  }
  localStorage.setItem('theme', theme);
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-mode')
    ? 'dark'
    : 'light';

  if (currentTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

// Inicializa o tema baseado no que está salvo ou no horário
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Tema automático com base no horário (18h-6h escuro)
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }
}

// Saudação dinâmica
function setGreeting() {
  const greetingElement = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greetingText = 'Olá! Seja bem-vindo(a).';

  if (hour >= 5 && hour < 12) {
    greetingText = 'Bom dia! ☀️';
  } else if (hour >= 12 && hour < 18) {
    greetingText = 'Boa tarde! 🌤️';
  } else if (hour >= 18 && hour < 22) {
    greetingText = 'Boa noite! 🌙';
  } else {
    greetingText = 'Boa madrugada! 🌌';
  }

  greetingElement.textContent = greetingText;
}

// Copiar WhatsApp e E-mail
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`Copiado para a área de transferência:\n${text}`);
      })
      .catch(() => {
        alert('Não foi possível copiar. Tente manualmente.');
      });
  } else {
    alert('Seu navegador não suporta copiar automaticamente.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setGreeting();

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-copy');

      if (type === 'whatsapp') {
        copyToClipboard('+5511999999999'); // Atualize para seu número real
      } else if (type === 'email') {
        copyToClipboard('seuemail@email.com'); // Atualize para seu e-mail real
      }
    });
  });
});
