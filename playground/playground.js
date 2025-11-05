// faux pjax
const nav = document.querySelector('nav')
const main = document.querySelector('main')

document.querySelector('[name=theme]')?.addEventListener('change', (evt) => {
  document.documentElement.setAttribute('data-theme', evt.target.value)
})

nav.addEventListener('click', (e) => {
  const link = e.target
  if (link.tagName !== 'A') return
  e.preventDefault()

  nav.querySelectorAll('a[aria-current]').forEach((a) => a.removeAttribute('aria-current'))
  link.setAttribute('aria-current', 'page')

  history.pushState(null, null, e.target.href)
  fetch(link.href)
    .then((r) => r.text())
    .then((html) => {
      main.innerHTML = html
    })
})
