/**
 * @copyright codewithsadee 2023
 */

'use strict';

const toggleTheme = function(){
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark': 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme)
}

// Intialize  the theme
const storedTheme = localStorage.getItem('theme');
const systemThemeIsDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
const initialTheme = storedTheme ?? (systemThemeIsDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', initialTheme);


// Attach toggleTheme to theme button click event 
window.addEventListener('DOMContentLoaded', function(){
    const $themeBtn = document.querySelector('[data-theme-btn]');

    if($themeBtn) $themeBtn.addEventListener('click', toggleTheme);
})
