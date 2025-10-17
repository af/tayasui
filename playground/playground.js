// faux pjax
const nav = document.querySelector('nav')
const main = document.querySelector('main')
nav.addEventListener('click', (e) => {
  const link = e.target
  if (link.tagName !== 'A') return
  e.preventDefault()

  link.parentElement
    .querySelectorAll('a[aria-current]')
    .forEach((a) => a.removeAttribute('aria-current'))
  link.setAttribute('aria-current', 'page')

  history.pushState(null, null, e.target.href)
  fetch(link.href)
    .then((r) => r.text())
    .then((html) => {
      main.innerHTML = html
    })
})
