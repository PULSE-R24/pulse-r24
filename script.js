/* PULSE-R – 7-DAY LIST + BLOG FILES + CALENDAR */

// ================= TODAY DATE =================
function getTodayDate() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
}

// ================= LAST 7 REAL DATES =================
function getLast7Days() {
    const today = new Date();
    const days = [];
    // index 0..6, where index 6 = today (Day 7)
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        days.push({
            index: 7 - i,                 // Day 1..7
            dateStr,
            display: dateStr.split('-')[2] // "30"
        });
    }
    return days;
}

// ================= SIDEBAR =================
function openSidebar() {
    document.getElementById('sidebar').style.width = '280px';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ================= LOAD BLOG FILE INTO RIGHT SIDE =================
function loadBlogIntoDayDetail(dateStr) {
    const detail = document.getElementById('dayDetail');
    const blogPath = `blogs/${dateStr}.html`;

    detail.innerHTML = `
        <h3>Loading ${dateStr}...</h3>
        <p>Please wait.</p>
    `;

    fetch(blogPath)
        .then(r => r.ok ? r.text() : Promise.reject())
        .then(html => {
            detail.innerHTML = html;
        })
        .catch(() => {
            detail.innerHTML = `
                <h3>${dateStr}</h3>
                <p>No blog yet. Create <code>${blogPath}</code></p>
            `;
        });
}

// ================= WEEK VIEW (LEFT LIST + RIGHT BLOG) =================
function renderWeek(activeIndex = 6) { // 0..6, where 6 = Day 7 (today)
    const days = getLast7Days();
    const dayList = document.getElementById('dayList');

    dayList.innerHTML = '';
    days.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = `day-item ${idx === activeIndex ? 'active' : ''}`;
        li.innerHTML = `<strong>Day ${item.index}</strong><br><small>${item.display}</small>`;
        li.onclick = () => {
            renderWeek(idx);               // update active highlight
            loadBlogIntoDayDetail(item.dateStr); // load that day's blog
        };
        dayList.appendChild(li);
    });

    // load blog for active day on initial render
    const activeDay = days[activeIndex];
    loadBlogIntoDayDetail(activeDay.dateStr);
}

// ================= CALENDAR =================
function toggleMonth(monthId) {
    document.querySelectorAll('.calendar-grid').forEach(cal => cal.style.display = 'none');
    const targetCal = document.getElementById(monthId);
    const isVisible = targetCal.style.display === 'grid';
    if (isVisible) {
        targetCal.style.display = 'none';
        return;
    }
    targetCal.style.display = 'grid';
    if (targetCal.children.length === 0) {
        generateCalendar(monthId, 2025, getMonthNumber(monthId));
    }
}

function getMonthNumber(monthId) {
    const months = {jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
    return months[monthId];
}

function generateCalendar(containerId, year, month) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    grid.style.gap = '2px';
    grid.style.padding = '12px 16px';
    grid.style.background = '#f8f9fa';

    ['SUN','MON','TUE','WED','THU','FRI','SAT'].forEach(d => {
        const header = document.createElement('div');
        header.className = 'calendar-day day-header';
        header.textContent = d;
        grid.appendChild(header);
    });

    const firstDay = new Date(year, month-1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day empty';
        grid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        cell.textContent = day;
        cell.style.cursor = 'pointer';

        const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        cell.onclick = () => {
            // calendar click → hide week card, show only this blog full-screen
           // document.getElementById('weekSection').style.display = 'none';

            const detail = document.getElementById('dayDetail');
            const blogPath = `blogs/${dateStr}.html`;

            detail.innerHTML = `
                <h3>Loading ${dateStr}...</h3>
                <p>Please wait.</p>
            `;

            fetch(blogPath)
                .then(r => r.ok ? r.text() : Promise.reject())
                .then(html => detail.innerHTML = html)
                .catch(() => {
                    detail.innerHTML = `
                        <h3>${dateStr}</h3>
                        <p>No blog yet. Create <code>${blogPath}</code></p>
                    `;
                });

            closeSidebar();
        };

        grid.appendChild(cell);
    }

    container.appendChild(grid);
}

// ================= INIT =================
window.onload = function() {
    // sidebar
    document.getElementById('menuToggle').onclick = openSidebar;
    document.getElementById('closeSidebar').onclick = closeSidebar;
    document.getElementById('overlay').onclick = closeSidebar;

    // month items
    document.querySelectorAll('.month-item').forEach(item => {
        item.onclick = (e) => {
            e.stopPropagation();
            toggleMonth(item.dataset.month);
        };
    });

    // Back Today → restore 7 days with today active
    document.getElementById('backTodayBtn').onclick = () => {
        document.getElementById('weekSection').style.display = 'block';
        renderWeek(6); // Day 7 = today
    };
    document.getElementById('backToday').onclick = () => {
        document.getElementById('weekSection').style.display = 'block';
        renderWeek(6);
    };

    // first load: show 7-day card and load today's blog in Day 7
    document.getElementById('weekSection').style.display = 'block';
    renderWeek(6); // index 6 = Day 7 (today)
};
  
