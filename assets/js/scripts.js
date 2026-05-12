document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    // Theme Cycle: light -> dark -> retro
    const themes = ['light', 'dark', 'retro'];
    let currentThemeIndex = themes.indexOf(localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    if (currentThemeIndex === -1) currentThemeIndex = 0;

    const applyTheme = (theme) => {
        htmlEl.classList.remove('dark', 'retro');
        if (theme !== 'light') {
            htmlEl.classList.add(theme);
        }
        localStorage.setItem('theme', theme);
    };

    // Initial Apply
    applyTheme(themes[currentThemeIndex]);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(themes[currentThemeIndex]);
        });
    }

    // Scroll Reveal Intersection Observer
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
        
        // Stagger children if they have reveal-item class
        const items = el.querySelectorAll('.reveal-item');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Cursor Glow Effect
    const cursorGlow = document.createElement('div');
    cursorGlow.id = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isClosed = dropdownMenu.classList.contains('opacity-0');
            
            if (isClosed) {
                dropdownMenu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.add('rotate-180');
            } else {
                dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.remove('rotate-180');
            }
        });

        document.addEventListener('click', (e) => {
            if (!dropdownMenu.classList.contains('opacity-0') && !dropdownMenu.contains(e.target) && e.target !== menuToggle) {
                dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.remove('rotate-180');
            }
        });
        
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.remove('rotate-180');
            });
        });
    }

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        const textToType = heroTitle.getAttribute('data-text');
        if (textToType) {
            heroTitle.innerHTML = '';
            let i = 0;
            let text = '';
            
            function typeWriter() {
                if (i < textToType.length) {
                    const char = textToType.charAt(i);
                    if (char === '\\' && textToType.charAt(i+1) === 'n') {
                        text += '<br>';
                        i += 2;
                    } else {
                        text += char;
                        i++;
                    }
                    
                    heroTitle.innerHTML = text + '<span class="animate-pulse border-r-[0.1em] border-textMain ml-1 inline-block h-[0.85em] align-baseline"></span>';
                    
                    const speed = char === ' ' ? 200 : Math.random() * 100 + 50;
                    setTimeout(typeWriter, speed);
                } else {
                    heroTitle.innerHTML = text;
                }
            }
            
            setTimeout(typeWriter, 500);
        }
    }
});
