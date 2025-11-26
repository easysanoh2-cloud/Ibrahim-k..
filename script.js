
const modal = document.getElementById('infomodal');
const profilepic = document.getElementById('profilepic');
const closeBtn = document.querySelector('.close');

// Defensive guards: only add listeners if elements exist
function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.remove('anchored');
    modal.style.left = '';
    modal.style.top = '';
}

if (profilepic && modal) {
    profilepic.addEventListener('click', (e) => {
        const rect = profilepic.getBoundingClientRect();
        modal.classList.add('anchored');
        modal.style.display = 'block';
        const left = rect.left + window.pageXOffset;
        const top = rect.bottom + window.pageYOffset + 8; // 8px gap
        const content = modal.querySelector('.modal-content');
        const modalWidth = content ? content.offsetWidth : modal.offsetWidth;
        let adjustedLeft = left;
        const viewportRight = window.pageXOffset + window.innerWidth - 8;
        if (adjustedLeft + modalWidth > viewportRight) {
          adjustedLeft = Math.max(window.pageXOffset + 8, viewportRight - modalWidth);
        }

        modal.style.left = `${adjustedLeft}px`;
        modal.style.top = `${top}px`;
    });
}

if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', (event) => {
    if (!modal || modal.style.display !== 'block') return;
    if (modal.classList.contains('anchored')) {
        const content = modal.querySelector('.modal-content');
        if (content && !content.contains(event.target) && event.target !== profilepic) {
            closeModal();
        }
    } else {
        if (event.target === modal) closeModal();
    }
});

// Menu toggle for small screens
const menuToggle = document.querySelector('.menu-toggle');
const navLink = document.querySelector('.nav-link');
if (menuToggle && navLink) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLink.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Close menu when a nav item is clicked
    navLink.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLink.classList.remove('open')));
}

// Close button inside the slide-out menu (visible on small screens)
const menuClose = document.querySelector('.menu-close');
if (menuClose && navLink) {
    menuClose.addEventListener('click', () => {
        navLink.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    });
}

// Confirmation modal for form submission
const contactForm = document.getElementById('contactForm');
const confirmModal = document.getElementById('confirmModal');
const confirmCheckbox = document.getElementById('confirmCheckbox');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const confirmClose = document.querySelector('.confirm-close');

function closeConfirmModal(){
    if (!confirmModal) return;
    confirmModal.style.display = 'none';
    confirmModal.setAttribute('aria-hidden','true');
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e){
        // prevent immediate submission and show confirmation modal
        e.preventDefault();
        if (!confirmModal) {
            contactForm.submit();
            return;
        }
        confirmModal.style.display = 'block';
        confirmModal.setAttribute('aria-hidden','false');
        if (confirmCheckbox) confirmCheckbox.checked = false;
        if (confirmBtn) confirmBtn.disabled = true;
    });
}

if (confirmCheckbox) {
    confirmCheckbox.addEventListener('change', () => {
        if (confirmBtn) confirmBtn.disabled = !confirmCheckbox.checked;
    });
}

if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        closeConfirmModal();
        // submit the form programmatically
        if (contactForm) contactForm.submit();
    });
}

if (cancelBtn) cancelBtn.addEventListener('click', closeConfirmModal);
if (confirmClose) confirmClose.addEventListener('click', closeConfirmModal);

// close when clicking outside the modal-content
window.addEventListener('click', (event) => {
    if (!confirmModal) return;
    if (event.target === confirmModal) closeConfirmModal();
});