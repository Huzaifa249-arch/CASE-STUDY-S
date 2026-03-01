// script.js - IPLStats Main JavaScript

// Sample Data
const iplData = {
    teams: [
        { id: 1, name: 'Mumbai Indians', logo: 'MI', captain: 'Rohit Sharma', homeGround: 'Wankhede Stadium', city: 'Mumbai', wins: 120, matches: 180 },
        { id: 2, name: 'Chennai Super Kings', logo: 'CSK', captain: 'MS Dhoni', homeGround: 'M. A. Chidambaram Stadium', city: 'Chennai', wins: 115, matches: 175 },
        { id: 3, name: 'Royal Challengers Bangalore', logo: 'RCB', captain: 'Faf du Plessis', homeGround: 'M. Chinnaswamy Stadium', city: 'Bangalore', wins: 95, matches: 170 },
        { id: 4, name: 'Kolkata Knight Riders', logo: 'KKR', captain: 'Shreyas Iyer', homeGround: 'Eden Gardens', city: 'Kolkata', wins: 98, matches: 165 },
        { id: 5, name: 'Delhi Capitals', logo: 'DC', captain: 'Rishabh Pant', homeGround: 'Arun Jaitley Stadium', city: 'Delhi', wins: 85, matches: 155 },
        { id: 6, name: 'Rajasthan Royals', logo: 'RR', captain: 'Sanju Samson', homeGround: 'Sawai Mansingh Stadium', city: 'Jaipur', wins: 82, matches: 150 },
        { id: 7, name: 'Sunrisers Hyderabad', logo: 'SRH', captain: 'Aiden Markram', homeGround: 'Rajiv Gandhi Stadium', city: 'Hyderabad', wins: 88, matches: 160 },
        { id: 8, name: 'Punjab Kings', logo: 'PBKS', captain: 'Shikhar Dhawan', homeGround: 'PCA Stadium', city: 'Mohali', wins: 80, matches: 155 }
    ],

    players: [
        { id: 1, name: 'Virat Kohli', team: 'Royal Challengers Bangalore', role: 'Batsman', matches: 210, runs: 6624, wickets: 4 },
        { id: 2, name: 'MS Dhoni', team: 'Chennai Super Kings', role: 'Wicket-keeper', matches: 220, runs: 4746, wickets: 0 },
        { id: 3, name: 'Rohit Sharma', team: 'Mumbai Indians', role: 'Batsman', matches: 215, runs: 5879, wickets: 15 },
        { id: 4, name: 'Jasprit Bumrah', team: 'Mumbai Indians', role: 'Bowler', matches: 120, runs: 56, wickets: 145 },
        { id: 5, name: 'Ravindra Jadeja', team: 'Chennai Super Kings', role: 'All-Rounder', matches: 190, runs: 2345, wickets: 127 },
        { id: 6, name: 'Andre Russell', team: 'Kolkata Knight Riders', role: 'All-Rounder', matches: 150, runs: 2134, wickets: 89 },
        { id: 7, name: 'David Warner', team: 'Delhi Capitals', role: 'Batsman', matches: 160, runs: 5443, wickets: 0 },
        { id: 8, name: 'Yuzvendra Chahal', team: 'Rajasthan Royals', role: 'Bowler', matches: 130, runs: 67, wickets: 158 },
        { id: 9, name: 'Hardik Pandya', team: 'Mumbai Indians', role: 'All-Rounder', matches: 110, runs: 1876, wickets: 52 },
        { id: 10, name: 'KL Rahul', team: 'Punjab Kings', role: 'Batsman', matches: 100, runs: 3165, wickets: 0 }
    ],

    matches: [
        { id: 1, team1: 'Mumbai Indians', team2: 'Chennai Super Kings', date: '2026-03-25', time: '19:30', venue: 'Wankhede Stadium, Mumbai', status: 'completed', result: 'Mumbai Indians won by 5 wickets' },
        { id: 2, team1: 'Royal Challengers Bangalore', team2: 'Kolkata Knight Riders', date: '2026-03-27', time: '19:30', venue: 'M. Chinnaswamy Stadium, Bangalore', status: 'completed', result: 'Royal Challengers Bangalore won by 15 runs' },
        { id: 3, team1: 'Delhi Capitals', team2: 'Rajasthan Royals', date: '2026-03-29', time: '15:30', venue: 'Arun Jaitley Stadium, Delhi', status: 'completed', result: 'Delhi Capitals won by 7 wickets' },
        { id: 4, team1: 'Sunrisers Hyderabad', team2: 'Punjab Kings', date: '2026-04-01', time: '19:30', venue: 'Rajiv Gandhi Stadium, Hyderabad', status: 'upcoming', result: 'Match not played' },
        { id: 5, team1: 'Mumbai Indians', team2: 'Royal Challengers Bangalore', date: '2026-04-03', time: '19:30', venue: 'Wankhede Stadium, Mumbai', status: 'upcoming', result: 'Match not played' },
        { id: 6, team1: 'Chennai Super Kings', team2: 'Kolkata Knight Riders', date: '2026-04-05', time: '15:30', venue: 'M. A. Chidambaram Stadium, Chennai', status: 'upcoming', result: 'Match not played' }
    ],

    news: [
        { id: 1, title: 'IPL 2026 Schedule Announced', description: 'The Board of Control for Cricket in India (BCCI) has announced the complete schedule for IPL 2026.', date: '2026-03-01', image: 'news1' },
        { id: 2, title: 'New Teams Join IPL', description: 'Two new franchises set to join IPL from next season, expanding the league to 10 teams.', date: '2026-02-28', image: 'news2' },
        { id: 3, title: 'Record-Breaking Auction', description: 'IPL 2026 auction sees record-breaking bids as teams build their squads for the new season.', date: '2026-02-25', image: 'news3' }
    ]
};

// Authentication State
let isLoggedIn = false;

// Page Navigation
function showPage(pageId) {
    // Update active link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Redirect to appropriate page
    window.location.href = `${pageId}.html`;
}

// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const authButtons = document.getElementById('authButtons');
    navLinks.classList.toggle('show');
    authButtons.classList.toggle('show');
}

// Authentication Handlers
function handleLogin() {
    // Simulate login
    isLoggedIn = true;
    updateAuthUI();
    showNotification('Successfully logged in!', 'success');
}

function handleSignup() {
    // Simulate signup
    showNotification('Please fill the registration form.', 'info');
}

function handleLogout() {
    isLoggedIn = false;
    updateAuthUI();
    showNotification('Successfully logged out!', 'success');
}

function updateAuthUI() {
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const logoutBtn = document.querySelector('.logout-btn');

    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        signupBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        z-index: 1001;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Filter Functions
function filterTeams() {
    const searchTerm = document.getElementById('teamSearch')?.value.toLowerCase() || '';
    const cityFilter = document.getElementById('cityFilter')?.value || '';
    
    const filteredTeams = iplData.teams.filter(team => {
        const matchesSearch = team.name.toLowerCase().includes(searchTerm);
        const matchesCity = !cityFilter || team.city === cityFilter;
        return matchesSearch && matchesCity;
    });
    
    displayTeams(filteredTeams);
}

function filterPlayers() {
    const searchTerm = document.getElementById('playerSearch')?.value.toLowerCase() || '';
    const roleFilter = document.getElementById('roleFilter')?.value || '';
    
    const filteredPlayers = iplData.players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm) || 
                             player.team.toLowerCase().includes(searchTerm);
        const matchesRole = !roleFilter || player.role === roleFilter;
        return matchesSearch && matchesRole;
    });
    
    displayPlayers(filteredPlayers);
}

function filterMatches() {
    const teamFilter = document.getElementById('teamFilter')?.value || '';
    
    const filteredMatches = iplData.matches.filter(match => {
        return !teamFilter || match.team1 === teamFilter || match.team2 === teamFilter;
    });
    
    displayMatches(filteredMatches);
}

// Display Functions
function displayTeams(teams) {
    const container = document.getElementById('teamsGrid');
    if (!container) return;
    
    if (teams.length === 0) {
        container.innerHTML = '<div class="no-results">No teams found matching your criteria.</div>';
        return;
    }
    
    container.innerHTML = teams.map(team => `
        <div class="team-card">
            <div class="team-logo">${team.logo}</div>
            <h3>${team.name}</h3>
            <div class="team-detail">
                <span class="label">Captain:</span>
                <span class="value">${team.captain}</span>
            </div>
            <div class="team-detail">
                <span class="label">Home Ground:</span>
                <span class="value">${team.homeGround}</span>
            </div>
            <div class="team-detail">
                <span class="label">Wins/Matches:</span>
                <span class="value">${team.wins}/${team.matches}</span>
            </div>
            <div class="team-detail">
                <span class="label">Win %:</span>
                <span class="value">${((team.wins/team.matches)*100).toFixed(1)}%</span>
            </div>
        </div>
    `).join('');
}

function displayPlayers(players) {
    const container = document.getElementById('playersGrid');
    if (!container) return;
    
    if (players.length === 0) {
        container.innerHTML = '<div class="no-results">No players found matching your criteria.</div>';
        return;
    }
    
    container.innerHTML = players.map(player => `
        <div class="player-card">
            <div class="player-image">${player.name.split(' ').map(n => n[0]).join('')}</div>
            <h3>${player.name}</h3>
            <div class="player-team">${player.team}</div>
            <span class="player-role">${player.role}</span>
            <div class="player-stats">
                <div class="stat">
                    <div class="stat-value">${player.matches}</div>
                    <div class="stat-label">Matches</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${player.runs}</div>
                    <div class="stat-label">Runs</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${player.wickets}</div>
                    <div class="stat-label">Wickets</div>
                </div>
            </div>
        </div>
    `).join('');
}

function displayMatches(matches) {
    const container = document.getElementById('matchesGrid');
    if (!container) return;
    
    if (matches.length === 0) {
        container.innerHTML = '<div class="no-results">No matches found.</div>';
        return;
    }
    
    container.innerHTML = matches.map(match => `
        <div class="match-card">
            <div class="match-header">
                <span class="match-date">${formatDate(match.date)} | ${match.time}</span>
                <span class="match-status status-${match.status}">${match.status}</span>
            </div>
            <div class="match-teams">
                <div class="team-vs">
                    <span class="team-name">${match.team1}</span>
                </div>
                <div class="vs">VS</div>
                <div class="team-vs">
                    <span class="team-name">${match.team2}</span>
                </div>
            </div>
            <div class="match-venue">${match.venue}</div>
            ${match.status === 'completed' ? 
                `<div class="match-result">${match.result}</div>` : 
                '<div class="match-result">Upcoming Match</div>'
            }
        </div>
    `).join('');
}

function displayPointsTable() {
    const tbody = document.getElementById('pointsBody');
    if (!tbody) return;
    
    // Calculate points (2 for win, 0 for loss)
    const pointsData = iplData.teams.map(team => ({
        ...team,
        points: team.wins * 2
    }));
    
    // Sort by points
    pointsData.sort((a, b) => b.points - a.points);
    
    tbody.innerHTML = pointsData.map((team, index) => `
        <tr class="${index < 4 ? 'top-team' : ''}">
            <td>${team.name}</td>
            <td>${team.matches}</td>
            <td>${team.wins}</td>
            <td>${team.matches - team.wins}</td>
            <td><strong>${team.points}</strong></td>
        </tr>
    `).join('');
}

function displayNews() {
    const container = document.getElementById('newsGrid');
    if (!container) return;
    
    container.innerHTML = iplData.news.map(news => `
        <div class="news-card">
            <div class="news-image">
                <span class="news-date">${formatDate(news.date)}</span>
            </div>
            <div class="news-content">
                <h3>${news.title}</h3>
                <p>${news.description}</p>
                <a href="#" class="read-more">Read More →</a>
            </div>
        </div>
    `).join('');
}

function displayFeaturedTeams() {
    const container = document.getElementById('featuredTeams');
    if (!container) return;
    
    // Show top 4 teams
    const featuredTeams = iplData.teams.slice(0, 4);
    
    container.innerHTML = featuredTeams.map(team => `
        <div class="team-card">
            <div class="team-logo">${team.logo}</div>
            <h3>${team.name}</h3>
            <div class="team-detail">
                <span class="label">Captain:</span>
                <span class="value">${team.captain}</span>
            </div>
            <div class="team-detail">
                <span class="label">Wins:</span>
                <span class="value">${team.wins}</span>
            </div>
        </div>
    `).join('');
}

// Utility Functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Contact Form Validation
function validateContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;
    const successMsg = document.getElementById('successMessage');
    
    // Reset previous styling
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.style.borderColor = '#e0e0e0';
    });
    
    // Validate name
    if (!name || name.trim() === '') {
        showFieldError('name', 'Name is required');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address');
        return false;
    }
    
    // Validate message
    if (!message || message.trim() === '') {
        showFieldError('message', 'Message is required');
        return false;
    }
    
    // Show success message
    if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.textContent = 'Thank you for contacting us! We will respond within 24 hours.';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
    
    return false;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = '#f44336';
        showNotification(message, 'error');
    }
}

// Initialize filter dropdowns
function initializeFilters() {
    // City filter for teams
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
        const cities = [...new Set(iplData.teams.map(team => team.city))];
        cities.sort().forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityFilter.appendChild(option);
        });
    }
    
    // Team filter for matches
    const teamFilter = document.getElementById('teamFilter');
    if (teamFilter) {
        const teams = [...new Set(iplData.teams.map(team => team.name))];
        teams.sort().forEach(team => {
            const option = document.createElement('option');
            option.value = team;
            option.textContent = team;
            teamFilter.appendChild(option);
        });
    }
}

// Initialize based on current page
function initializePage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active link
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === path) {
            link.classList.add('active');
        }
    });
    
    // Initialize page-specific content
    switch(path) {
        case 'index.html':
            displayNews();
            displayFeaturedTeams();
            break;
        case 'teams.html':
            initializeFilters();
            displayTeams(iplData.teams);
            break;
        case 'players.html':
            initializeFilters();
            displayPlayers(iplData.players);
            break;
        case 'matches.html':
            initializeFilters();
            displayMatches(iplData.matches);
            break;
        case 'points.html':
            displayPointsTable();
            break;
        case 'contact.html':
            // Contact form is already in HTML
            break;
    }
    
    // Check login status
    updateAuthUI();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializePage);