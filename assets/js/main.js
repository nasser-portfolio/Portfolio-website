const { animate, text, stagger } = anime

const { chars: chars1 } = text.split('.home__profession-1', {chars: true})
const { chars: chars2 } = text.split('.home__profession-2', {chars: true})

animate(chars1, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
})

animate(chars2, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 4000, ease: 'in(3)' }
  ],
  duration: 900,
  ease: 'out(3)',
  delay: stagger(80),
  loop: true,
})

const swiperProjects = new Swiper('.projects__swiper', {
  loop: true,
  spaceBetween:24,
  grabCursor: true,
  speed: 600,
  slidesPerView: 'auto',

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
})

const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target,
          targetContent = document.querySelector(targetSelector)

    
    tabContents.forEach((content) => content.classList.remove('work-active'))
    tabs.forEach((t) => t.classList.remove('work-active'))

    
    tab.classList.add('work-active')
    targetContent.classList.add('work-active')
  })
})

const copyBtn = document.getElementById('contact-btn'),
      copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
  // Use the clipboard API to copy text
  navigator.clipboard.writeText(copyEmail).then(() => {
    copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'

    // Restore the original text
    setTimeout(() => {
      copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>'
    }, 2000)
  })
})

const textYear = document.getElementById('footer-year'),
      currentYear = new Date().getFullYear()


textYear.textContent = currentYear

const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollY = window.scrollY

  sections.forEach(section => {
    const id = section.id, // id of each section
          top = section.offsetTop - 50, // Distance from the top edge
          height = section.offsetHeight, // Element height
          link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

    if (!link) return

    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
  })
}

window.addEventListener('scroll', scrollActive)



const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 

const cursorMove = () => {

  cursor.style.left = `${mouseX}px`
  cursor.style.top = `${mouseY}px`
  cursor.style.transform = 'translate(-50%, -50%)'

  requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

cursorMove()


const a = document.querySelectorAll('a')

a.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('hide-cursor')
  })

  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hide-cursor')
  })
})

const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 300,
  reset: true, // Animations repeat
})

sr.reveal('.home__image, .projects__container, .work__container, .contact__container')
sr.reveal('.home__data', { delay: 900, origin: 'bottom' })
sr.reveal('.home__info', { delay: 1200, origin: 'bottom' })
sr.reveal('.home__social, .home__cv', { delay: 1500 })
sr.reveal('.about__data', { origin: 'left' })
sr.reveal('.about__image', { origin: 'right' })
