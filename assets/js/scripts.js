document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    // Check local storage or system preference on load
    const currentTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (currentTheme === 'dark' || (!currentTheme && systemDark)) {
        htmlEl.classList.add('dark');
    } else {
        htmlEl.classList.remove('dark');
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            htmlEl.classList.toggle('dark');
            if (htmlEl.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Dropdown Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isClosed = dropdownMenu.classList.contains('opacity-0');
            
            if (isClosed) {
                // Open menu
                dropdownMenu.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.add('rotate-180');
            } else {
                // Close menu
                dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.remove('rotate-180');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.classList.contains('opacity-0') && !dropdownMenu.contains(e.target) && e.target !== menuToggle) {
                dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.remove('rotate-180');
            }
        });
        
        // Close when a link is clicked
        dropdownMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                dropdownMenu.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
                dropdownMenu.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                menuIcon.classList.remove('rotate-180');
            });
        });
    }
});
