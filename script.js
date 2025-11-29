document.addEventListener("DOMContentLoaded", function() {
  // Hamburger menu toggle
  document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Load today's blog dynamically
  loadTodayBlog();

  function loadTodayBlog() {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month as 2 digits
    const day = String(today.getDate()).padStart(2, '0'); // Get day as 2 digits
    const blogDate = `${year}-${month}-${day}`;

    // Create the blog URL and insert the content dynamically
    const blogUrl = `blogs/${blogDate}.html`;
    
    fetch(blogUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Blog not found for today');
        }
        return response.text();
      })
      .then(blogContent => {
        document.getElementById('today-blog').innerHTML = blogContent;
      })
      .catch(error => {
        document.getElementById('today-blog').innerHTML = '<p>Blog not available for today.</p>';
      });
  }
});
