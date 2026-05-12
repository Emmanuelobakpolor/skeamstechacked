/**
 * Navigation utility to handle scrolling to sections
 * Works across all pages
 */

export const scrollToSection = (sectionId: string, delay: number = 500) => {
  // If we're on the home page, scroll immediately
  if (typeof window !== 'undefined' && window.location.pathname === '/') {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  // If we're on another page, navigate to home and then scroll
  if (typeof window !== 'undefined') {
    // Store the target section in sessionStorage
    sessionStorage.setItem('scrollToSection', sectionId);

    // Navigate to home
    window.location.href = '/';
  }
};

export const handleHashNavigation = () => {
  if (typeof window === 'undefined') return;

  // Check if there's a stored section to scroll to
  const targetSection = sessionStorage.getItem('scrollToSection');
  if (targetSection) {
    sessionStorage.removeItem('scrollToSection');

    // Wait for page to load, then scroll
    const timer = setTimeout(() => {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);

    return () => clearTimeout(timer);
  }

  // Also handle direct hash navigation (e.g., /#services)
  if (window.location.hash) {
    const sectionId = window.location.hash.replace('#', '');
    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);

    return () => clearTimeout(timer);
  }
};
