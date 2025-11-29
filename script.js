document.addEventListener("DOMContentLoaded", function() {
  // Hamburger menu toggle
  document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Load today's blog dynamically
  loadBlogForToday();

  // Generate months and dates for the sidebar
  generateSidebarDates();

  // Function to load the blog for today's date
  function loadBlogForToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month as 2 digits
    const day = String(today.getDate()).padStart(2, '0'); // Get day as 2 digits
    const blogUrl = `blogs/${getMonthName(month)}/${day}/2025.${day}.${month}.html`;

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

  // Helper function to get month name from month number
  function getMonthName(monthNumber) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    return months[monthNumber - 1];
  }

  // Function to generate sidebar with months and dates
  function generateSidebarDates() {
    const monthsList = document.getElementById('months-list');
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

    months.forEach((month, index) => {
      const monthElement = document.createElement('li');
      monthElement.innerHTML = `<a href="#" onclick="loadBlogForDate('${month}', 1)">${month.charAt(0).toUpperCase() + month.slice(1)} 2025</a>`;
      monthsList.appendChild(monthElement);
    });
  }

  // Function to load blog for a specific date when clicked from sidebar
  window.loadBlogForDate = function(month, day) {
    const blogUrl = `blogs/${month}/${day}/2025.${day}.${getMonthNumber(month)}.html`;

    fetch(blogUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Blog not found for the selected date');
        }
        return response.text();
      })
      .then(blogContent => {
        document.getElementById('today-blog').innerHTML = blogContent;
      })
      .catch(error => {
        document.getElementById('today-blog').innerHTML = '<p>Blog not available for the selected date.</p>';
      });
  };

  // Helper function to get month number from month name
  function getMonthNumber(monthName) {
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    return months.indexOf(monthName) + 1;
  }
});
