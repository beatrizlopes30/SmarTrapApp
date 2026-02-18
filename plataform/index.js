
// Dados simulados para os gráficos
const trendData = {
  labels: ['01/10', '05/10', '10/10', '15/10', '20/10', '25/10', '30/10'],
  datasets: [{
    label: 'Capturas Diárias',
    data: [85, 92, 78, 120, 142, 130, 118],
    borderColor: '#0B5345',
    backgroundColor: 'rgba(11, 83, 69, 0.1)',
    borderWidth: 3,
    tension: 0.4,
    fill: true
  }]
};

const speciesData = {
  labels: ['L. longipalpis', 'A. aegypti', 'C. quinquefasciatus', 'A. albopictus', 'Outros'],
  datasets: [{
    data: [38, 28, 18, 12, 4],
    backgroundColor: [
      '#0B5345',
      '#2E86C1',
      '#F39C12',
      '#27AE60',
      '#5D6D7E'
    ],
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }]
};

// Inicialização do dashboard
function initDashboard() {
  // Gráfico de tendência
  const trendCtx = document.getElementById('trendChart').getContext('2d');
  new Chart(trendCtx, {
    type: 'line',
    data: trendData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          title: {
            display: true,
            text: 'Número de Capturas'
          }
        },
        x: {
          grid: { color: 'rgba(0,0,0,0.05)' }
        }
      }
    }
  });

  // Gráfico de espécies
  const speciesCtx = document.getElementById('speciesChart').getContext('2d');
  new Chart(speciesCtx, {
    type: 'doughnut',
    data: speciesData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });

  // Gráficos para o PDF
  const pdfTrendCtx = document.getElementById('pdfTrendChart').getContext('2d');
  new Chart(pdfTrendCtx, {
    type: 'line',
    data: trendData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  const pdfSpeciesCtx = document.getElementById('pdfSpeciesChart').getContext('2d');
  new Chart(pdfSpeciesCtx, {
    type: 'pie',
    data: speciesData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });
}

// Sistema de login
function fazerLogin() {
  const codigo = document.getElementById('codigo').value;
  const senha = document.getElementById('senha').value;
  
  if (codigo === 'admin' && senha === '1234') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    // Atualizar data no relatório
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    document.getElementById('reportDate').textContent = now.toLocaleDateString('pt-BR', options);
    
    // Inicializar dashboard
    initDashboard();
    
    // Efeito visual
    document.querySelector('.dashboard').style.opacity = '0';
    document.querySelector('.dashboard').style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      document.querySelector('.dashboard').style.opacity = '1';
    }, 100);
  } else {
    alert('Credenciais inválidas. Use admin / 1234 para acesso de demonstração.');
  }
}

// Exportar PDF
function exportPDF() {
  // Mostrar relatório
  document.getElementById('pdfReport').style.display = 'block';
  
  // Configurar PDF
  const element = document.getElementById('pdfReport');
  const opt = {
    margin: [15, 15, 15, 15],
    filename: `relatorio_cientifico_smarttrap_${new Date().toISOString().slice(0,10)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF'
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { mode: ['css', 'legacy'] }
  };
  
  // Gerar PDF
  html2pdf().set(opt).from(element).save().then(() => {
    // Esconder relatório novamente
    document.getElementById('pdfReport').style.display = 'none';
  });
}

// Permitir login com Enter
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('senha').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      fazerLogin();
    }
  });
});