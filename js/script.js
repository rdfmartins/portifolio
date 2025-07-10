document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const backToTopButton = document.getElementById('back-to-top');
    const revealElements = document.querySelectorAll('section');

    // Menu Hambúrguer
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Fechar o menu ao clicar em um item de navegação
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Botão Voltar ao Topo
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Animação de Revelação ao Rolar
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    

    // Lógica do Prompt Overlay
    const promptOverlay = document.querySelector('.prompt-overlay');
    const profileImageContainer = document.querySelector('.profile-image-container');

    if (promptOverlay && profileImageContainer) {
        promptOverlay.addEventListener('click', async () => {
            const promptText = profileImageContainer.dataset.prompt;
            try {
                await navigator.clipboard.writeText(promptText);
                const originalText = 'Prompt <i class="fa-solid fa-copy"></i>';
                promptOverlay.innerHTML = 'Copied! <i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    promptOverlay.innerHTML = originalText; // Restaura para o texto inicial
                }, 2000); // Volta ao normal após 2 segundos
            } catch (err) {
                console.error('Falha ao copiar o prompt: ', err);
                alert('Erro ao copiar o prompt. Por favor, tente novamente.');
            }
        });
    }

    // Garante que o menu mobile seja resetado em telas maiores
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});