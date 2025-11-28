document.addEventListener("DOMContentLoaded", function() {
  // Get today's date
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]; // Formats date to YYYY-MM-DD

  // Load today's blog post dynamically
  const todayBlogContainer = document.getElementById('today-blog');
  loadBlog(todayDate, todayBlogContainer);

  // Handle Hamburger Menu Toggle
  document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Handle Month Selection in Sidebar
  populateMonthList();

  function loadBlog(date, container) {
    const blogUrl = `blogs/${date}.html`; // Construct the URL for the daily blog post
    fetch(blogUrl)
      .then(response => {
        if (!response.ok) throw new Error('Blog not found');
        return response.text();
      })
      .then(html => {
        container.innerHTML = html; // Load the blog content into the container
      })
      .catch(error => {
        container.innerHTML = `<p>Error loading blog: ${error.message}</p>`;
      });
  }

  function populateMonthList() {
    const months = ['January 2025', 'February 2025', 'March 2025']; // Add more months as needed
    const monthsList = document.querySelector('.months-list');
    months.forEach(month => {
      const monthDiv = document.createElement('div');
      monthDiv.classList.add('month-item');
      monthDiv.innerText = month;
      monthDiv.addEventListener('click', () => loadMonthBlogs(month));
      monthsList.appendChild(monthDiv);
    });
  }

  function loadMonthBlogs(month) {
    // Logic for loading blog posts for a selected month
    alert(`Loading blogs for ${month}`);
  }
});
