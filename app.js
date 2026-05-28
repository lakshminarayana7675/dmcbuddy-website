// Login / session management for DMC Buddy (simple localStorage)
(function(){
    const form = document.getElementById('agentLoginForm');
    const loginModal = document.getElementById('loginModal');
    const errorBox = document.getElementById('loginError');
    const registerBtn = document.getElementById('agentRegister');
    const pwToggle = document.getElementById('pwToggle');

    // nav user and logout elements (append to nav)
    const nav = document.querySelector('nav');
    const navUser = document.createElement('span');
    navUser.id = 'navUser';
    navUser.className = 'nav-user';
    navUser.style.display = 'none';
    navUser.style.marginLeft = '12px';

    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.className = 'btn-logout';
    logoutBtn.textContent = 'Logout';
    logoutBtn.style.marginLeft = '10px';
    logoutBtn.style.display = 'none';

    if(nav){
      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.alignItems = 'center';
      actions.style.gap = '8px';
      actions.appendChild(navUser);
      actions.appendChild(logoutBtn);
      nav.appendChild(actions);
    }

    function isValidEmail(email){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(msg){
      if(!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.add('show');
      setTimeout(()=> errorBox.classList.remove('show'), 3500);
    }

    function setLoggedIn(email){
      localStorage.setItem('dmcBuddySession', JSON.stringify({email: email, loginTime: new Date().toISOString()}));
      document.body.classList.add('logged-in');
      if(navUser){ navUser.textContent = email; navUser.style.display = 'inline-block'; }
      if(logoutBtn) logoutBtn.style.display = 'inline-block';
    }

    function setLoggedOut(){
      localStorage.removeItem('dmcBuddySession');
      document.body.classList.remove('logged-in');
      if(navUser){ navUser.textContent = ''; navUser.style.display = 'none'; }
      if(logoutBtn) logoutBtn.style.display = 'none';
    }

    // password toggle
    if(pwToggle){
      pwToggle.addEventListener('click', ()=>{
        const pw = document.getElementById('agentPassword');
        if(pw.type === 'password'){ pw.type = 'text'; pwToggle.textContent = 'Hide'; }
        else { pw.type = 'password'; pwToggle.textContent = 'Show'; }
      });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', ()=>{
      const s = localStorage.getItem('dmcBuddySession');
      if(s){
        try{ const session = JSON.parse(s); if(session && session.email) setLoggedIn(session.email); }
        catch(e){ localStorage.removeItem('dmcBuddySession'); }
      }
    });

    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const email = document.getElementById('agentEmail').value.trim();
        const pwd = document.getElementById('agentPassword').value;
        if(!email || !pwd) { showError('Fill both email and password'); return; }
        if(!isValidEmail(email)) { showError('Enter a valid email'); return; }
        if(pwd.length < 6){ showError('Password must be 6+ chars'); return; }
        // simulate login success
        setLoggedIn(email);
      });
    }

    if(registerBtn){ registerBtn.addEventListener('click', ()=> alert('Registration coming soon. Contact support.')); }

    if(logoutBtn){ logoutBtn.addEventListener('click', ()=> { if(confirm('Logout?')) setLoggedOut(); }); }
  })();

  const testimonials = [
    { text: '"DMC Buddy organized our entire corporate retreat flawlessly. From accommodations to activities, everything was perfect. Our team had an amazing time in Goa!"', name: 'Priya Sharma', role: 'Corporate Client', initials: 'PS' },
    { text: '"The Kerala backwaters trip was simply magical. Every detail was thought through — the houseboat, the cuisine, the activities. Truly a 5-star experience!"', name: 'Arjun Mehta', role: 'Family Traveller', initials: 'AM' },
    { text: '"Rajasthan trip exceeded all our expectations. The local guides were incredibly knowledgeable and the hotel choices were superb. Will definitely book again!"', name: 'Sunita Kapoor', role: 'Leisure Traveller', initials: 'SK' },
    { text: '"Professional, responsive, and genuinely passionate about travel. DMC Buddy turned our group tour of Agra into an unforgettable heritage journey."', name: 'Ravi Nair', role: 'Group Tour Member', initials: 'RN' }
  ];

  let current = 0;

  function changeTestimonial(dir) {
    current = (current + dir + testimonials.length) % testimonials.length;
    const t = testimonials[current];
    document.getElementById('testi-text').textContent = t.text;
    document.getElementById('testi-name').textContent = t.name;
    document.getElementById('testi-role').textContent = t.role;
    document.getElementById('testi-av').textContent = t.initials;
    document.querySelectorAll('.testi-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  document.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.addEventListener('click', () => changeTestimonial(i - current));
  });

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--orange)' : '';
    });
  });

  function playVideo() {

  const video = document.getElementById("travelVideo");

  const overlay = document.getElementById("videoOverlay");

  video.play();

  video.setAttribute("controls", true);

  overlay.style.opacity = "0";

  overlay.style.pointerEvents = "none";
}

document
  .getElementById("travelVideo")
  .addEventListener("pause", function () {

    document.getElementById("videoOverlay").style.opacity = "1";

  });

document
  .getElementById("travelVideo")
  .addEventListener("ended", function () {

    document.getElementById("videoOverlay").style.opacity = "1";

  });

  const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

  if(window.scrollY > 80){
    navbar.classList.add("scrolled");
  }else{
    navbar.classList.remove("scrolled");
  }

});
