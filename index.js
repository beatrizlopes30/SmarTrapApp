        // Menu Mobile Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link, .btn').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Scroll suave para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Animação de elementos ao scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observar todos os elementos com classe de animação
        document.querySelectorAll('.fade-in, .delay-1, .delay-2, .delay-3').forEach(el => {
            observer.observe(el);
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if(window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            }
        });
        
        // Feedback para botões de ação
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if(this.getAttribute('href') === '#contact') {
                    e.preventDefault();
                    const originalText = this.innerText;
                    this.innerText = 'Redirecionando...';
                    
                    setTimeout(() => {
                        this.innerText = originalText;
                        // Simulando envio de formulário
                        alert('Obrigado pelo seu interesse! Em breve nossa equipe entrará em contato para agendar uma demonstração.');
                    }, 800);
                }
            });
        });