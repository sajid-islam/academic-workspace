export const themeScript = `
(function() {
  try {
    const saved = localStorage.getItem('theme') ?? 'system';

    document.documentElement.classList.remove(
      'theme-light',
      'theme-dark',
      'theme-system'
    );

    document.documentElement.classList.add('theme-' + saved);

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved) || (saved === 'system' && systemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;
