import { ref, watch } from 'vue';

const themes = {
    default: {
        name: 'Default',
        primary: '#ef4444', // red-500
        primaryDark: '#dc2626', // red-600
    },
    forest: {
        name: 'Forest',
        primary: '#10b981', // emerald-500
        primaryDark: '#059669', // emerald-600
    },
    ocean: {
        name: 'Ocean',
        primary: '#3b82f6', // blue-500
        primaryDark: '#2563eb', // blue-600
    },
    sunset: {
        name: 'Sunset',
        primary: '#f97316', // orange-500
        primaryDark: '#ea580c', // orange-600
    },
    purple: {
        name: 'Purple Dream',
        primary: '#a855f7', // purple-500
        primaryDark: '#9333ea', // purple-600
    }
};

// Helper function to get initial dark mode state
const getInitialDarkMode = () => {
    const stored = localStorage.getItem('focus-flow-dark-mode');
    if (stored === null) {
        // Check system preference, default to light mode if not available
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        // Default to light mode
        return false;
    }
    return stored === 'true';
};

// Shared state
const isDarkMode = ref(getInitialDarkMode());
const currentTheme = ref(localStorage.getItem('focus-flow-theme') || 'default');

// Apply theme function
const applyTheme = () => {
    const root = document.documentElement;

    // Apply dark mode class - ensure it's correctly set
    if (isDarkMode.value) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    // Apply theme colors
    const theme = themes[currentTheme.value];
    if (theme) {
        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-primary-dark', theme.primaryDark);
    }

    // Update theme data attribute for CSS
    root.setAttribute('data-theme', currentTheme.value);
};

// Initialize theme immediately (before Vue components mount)
if (typeof document !== 'undefined') {
    applyTheme();
}

export function useTheme() {
    const toggleDarkMode = () => {
        isDarkMode.value = !isDarkMode.value;
        localStorage.setItem('focus-flow-dark-mode', isDarkMode.value.toString());
        // Force immediate application
        applyTheme();
        // Double-check the class is applied correctly
        const root = document.documentElement;
        if (isDarkMode.value) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const setTheme = (themeName) => {
        if (themes[themeName]) {
            currentTheme.value = themeName;
            localStorage.setItem('focus-flow-theme', themeName);
            applyTheme();
        }
    };

    // Watch for changes (only set up once, but safe to call multiple times)
    watch([isDarkMode, currentTheme], () => {
        applyTheme();
    }, { immediate: false });

    return {
        isDarkMode,
        currentTheme,
        themes,
        toggleDarkMode,
        setTheme,
        applyTheme
    };
}
