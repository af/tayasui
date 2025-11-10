const nav = document.querySelector('nav')
const main = document.querySelector('main')

// localStorage-based theme switcher
const theme = localStorage.getItem('theme')
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}
if (theme) setTheme(theme)
document
  .querySelector('[name=theme]')
  ?.addEventListener('change', (evt) => setTheme(evt.target.value))

const navigateTo = (hash) => {
  const page = window.DOCS.find((p) => p.name === hash)
  if (page) {
    location.hash = hash
    main.innerHTML = page.markdown
  }

  // Update nav links
  nav.querySelectorAll('a[aria-current]').forEach((a) => a.removeAttribute('aria-current'))
  document.querySelector(`a[href="#${hash}"]`)?.setAttribute('aria-current', 'page')
}
nav.addEventListener('click', (e) => {
  const link = e.target
  if (link.tagName !== 'A') return
  e.preventDefault()

  const linkHash = new URL(link.href).hash?.replace('#', '')
  navigateTo(linkHash)
})

window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '')
  navigateTo(hash)
})
window.addEventListener('load', () => {
  const hash = location.hash.replace('#', '')
  navigateTo(hash)
})
