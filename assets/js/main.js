// Luna Crystal Studio — interactions

// Mobile nav
document.addEventListener('click', function (e) {
  var toggle = e.target.closest('.nav-toggle');
  if (toggle) {
    document.querySelector('.nav').classList.toggle('open');
    return;
  }
  if (e.target.closest('.nav a')) {
    document.querySelector('.nav').classList.remove('open');
  }
});

// FAQ accordion
document.querySelectorAll('.faq__q').forEach(function (q) {
  q.addEventListener('click', function () {
    var item = q.closest('.faq__item');
    var ans = item.querySelector('.faq__a');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(function (o) {
      o.classList.remove('open');
      o.querySelector('.faq__a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// Product gallery
document.querySelectorAll('.pd__thumb').forEach(function (t) {
  t.addEventListener('click', function () {
    var main = document.querySelector('.pd__main img');
    if (!main) return;
    main.src = t.dataset.full;
    document.querySelectorAll('.pd__thumb').forEach(function (x) { x.classList.remove('active'); });
    t.classList.add('active');
  });
});

// Shop filter
var filters = document.querySelectorAll('.filter');
if (filters.length) {
  function applyFilter(key) {
    document.querySelectorAll('[data-cats]').forEach(function (card) {
      var cats = card.dataset.cats || '';
      card.classList.toggle('hidden', !(key === 'all' || cats.indexOf('|' + key + '|') > -1));
    });
    filters.forEach(function (f) { f.classList.toggle('active', f.dataset.filter === key); });
  }
  filters.forEach(function (f) {
    f.addEventListener('click', function () { applyFilter(f.dataset.filter); });
  });
  var hash = (location.hash || '').replace('#', '');
  if (hash && document.querySelector('.filter[data-filter="' + hash + '"]')) applyFilter(hash);
}

// Contact / newsletter forms -> FormSubmit (emails to the studio inbox)
document.querySelectorAll('form[data-email]').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('button[type="submit"]');
    var email = form.dataset.email;

    var data = new FormData(form);
    if (form.dataset.subject) data.append('_subject', form.dataset.subject);
    data.append('_captcha', 'false');
    data.append('_template', 'table');

    if (btn) { btn.disabled = true; btn.dataset.label = btn.textContent; btn.textContent = 'Sending…'; }
    if (msg) { msg.style.color = ''; msg.textContent = ''; }

    fetch('https://formsubmit.co/ajax/' + email, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
      .then(function (r) { return r.json(); })
      .then(function () {
        if (msg) msg.textContent = 'Thank you! Your message is on its way. ✨';
        form.reset();
      })
      .catch(function () {
        if (msg) { msg.style.color = '#b5504f'; msg.textContent = 'Something went wrong — please email us directly at ' + email; }
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = btn.dataset.label || 'Send'; }
      });
  });
});
