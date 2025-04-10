// This script prevents the white flash on mobile devices
(function() {
  // Set background color immediately
  document.documentElement.style.backgroundColor = '#111827';
  document.body.style.backgroundColor = '#111827';
  
  // Add a class to indicate the script has run
  document.documentElement.classList.add('js-no-flash');
  
  // Create a style element to ensure dark theme
  const style = document.createElement('style');
  style.textContent = `
    html, body {
      background-color: #111827 !important;
      color: #f9fafb !important;
    }
    
    /* Prevent transitions during page load */
    * {
      transition: none !important;
    }
  `;
  document.head.appendChild(style);
  
  // Remove the style after page load to allow transitions
  window.addEventListener('load', function() {
    setTimeout(function() {
      style.remove();
    }, 100);
  });
})(); 