document.addEventListener("DOMContentLoaded", function() {
  // Hamburger menu toggle
  document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
    this.classList.toggle('open');
  });
  
  // Add month and date handlers here...
});
