import { MILESTONES, ITEMS, PROFILE, UI } from '../data/journey.js'
import { TOTAL_SCARS, clamp, smoothstep } from '../path.js'

const $ = (sel, root = document) => root.querySelector(sel)
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const TOTAL_SKILLS = MILESTONES.reduce((n, m) => n + m.skills.length, 0)

export class Hud {
  constructor({ timeline, onJump }) {
    this.tl = timeline
    this.onJump = onJump
    this.cache = {}
    this.cardEls = []
    this.lastStage = -1
    this.bubbleShown = false
  }

  mount() {
    this.render()
  }

  t(key) {
    return UI[key]
  }

  render() {
    $('#loader-text').textContent = this.t('loading')

    $('#hero').innerHTML = `
      <p class="hero__kicker">${this.t('heroKicker')}</p>
      <h1 class="hero__title">${this.t('heroTitle')}</h1>
      <p class="hero__sub">${this.t('heroSub')}</p>
      <div class="hero__hint"><span class="mouse"><i></i></span>${this.t('scrollHint')}</div>`

    $('#cards').innerHTML = MILESTONES.map((m, i) => {
      const item = ITEMS[m.item]
      return `
      <article class="card ${i % 2 ? 'card--right' : 'card--left'}" data-i="${i}" aria-hidden="true">
        <header class="card__head">
          <span class="card__year">${m.year}</span>
          <span class="card__period">${esc(m.period)}</span>
        </header>
        <h2 class="card__title">${esc(m.title)}</h2>
        <p class="card__place"><b>${esc(m.place)}</b> · ${esc(m.role)}</p>
        <p class="card__story">${esc(m.story)}</p>
        <div class="card__cols">
          <section class="card__thorns"><h3><span class="ico">✦</span>${this.t('thorns')}</h3>
            <ul>${m.thorns.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
          <section class="card__gains"><h3><span class="ico">◆</span>${this.t('gains')}</h3>
            <ul>${m.gains.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
        </div>
        <footer class="card__foot">
          <div class="card__skills">${m.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}</div>
          <div class="card__item"><span>${item.icon}</span>${this.t('got')}: <b>${item.label}</b></div>
        </footer>
      </article>`
    }).join('')
    this.cardEls = [...document.querySelectorAll('.card')]

    $('#altimeter').innerHTML = `
      <div class="alt__track"><div class="alt__fill"></div></div>
      ${MILESTONES.map((m, i) => `<button class="alt__tick" data-i="${i}" style="--p:${(i + 1) / (MILESTONES.length + 1)}" aria-label="${m.year} ${esc(m.place)}"><span>${m.year}</span></button>`).join('')}
      <button class="alt__tick alt__tick--top" data-i="top" style="--p:1" aria-label="2026"><span>2026</span></button>
      <div class="alt__marker"><span class="alt__label"></span></div>`
    document.querySelectorAll('.alt__tick').forEach((b) => b.addEventListener('click', () => this.onJump(b.dataset.i)))

    $('#stats').innerHTML = `
      <div class="stats__row stats__top"><span class="stats__lv">${this.t('level')} <b class="js-lv">1</b></span><span class="stats__where js-where"></span></div>
      <div class="stats__row"><span class="stats__label">${this.t('knowledge')}</span><span class="bar bar--know"><i class="js-know"></i></span><span class="stats__num js-know-n"></span></div>
      <div class="stats__row"><span class="stats__label">${this.t('scars')}</span><span class="scars js-scars"></span><span class="stats__num js-scars-n"></span></div>
      <div class="stats__row"><span class="stats__label">${this.t('inventory')}</span><span class="inv js-inv"></span></div>`

    $('#outro').innerHTML = `
      <p class="outro__kicker">${this.t('outroKicker')}</p>
      <h2 class="outro__title">${this.t('outroTitle')}</h2>
      <p class="outro__sub">${this.t('outroSub')}</p>
      <ul class="outro__stats">
        <li><b>6+</b>${this.t('statYears')}</li>
        <li><b>5</b>${this.t('statCompanies')}</li>
        <li><b>2</b>${this.t('statCerts')}</li>
        <li><b>${TOTAL_SKILLS}</b>${this.t('statSkills')}</li>
        <li><b>${TOTAL_SCARS}</b>${this.t('statScars')}</li>
        <li><b>∞</b>${this.t('statNext')}</li>
      </ul>
      <div class="outro__cta">
        <a class="btn btn--primary" href="mailto:${PROFILE.email}">${this.t('email')}</a>
        <a class="btn" href="${PROFILE.github}" target="_blank" rel="noopener">GitHub</a>
        <button class="btn btn--ghost js-restart">↑ ${this.t('restart')}</button>
      </div>
      <p class="outro__foot">${PROFILE.name} · ${PROFILE.location}</p>`
    $('.js-restart').addEventListener('click', () => this.onJump('start'))
    this.cache = {}
  }

  set(key, value, fn) {
    if (this.cache[key] === value) return
    this.cache[key] = value
    fn(value)
  }

  update(st, { scars, mp, stepNo, stepTotal }) {
    const T = st.t
    // hero / outro
    const heroO = 1 - smoothstep(0.05, 0.55, T)
    this.set('hero', heroO.toFixed(3), (v) => {
      const el = $('#hero')
      el.style.opacity = v
      el.style.transform = `translateY(${(-(1 - v) * 40).toFixed(1)}px)`
      el.style.visibility = v > 0.001 ? 'visible' : 'hidden'
    })
    const outroO = smoothstep(this.tl.outro.t0 - 0.25, this.tl.outro.t0 + 0.55, T)
    this.set('outro', outroO.toFixed(3), (v) => {
      const el = $('#outro')
      el.style.opacity = v
      el.style.transform = `translateY(${((1 - v) * 40).toFixed(1)}px)`
      el.style.visibility = v > 0.001 ? 'visible' : 'hidden'
      el.classList.toggle('is-on', v > 0.5)
    })
    const chrome = 1 - outroO
    this.set('chrome', (heroO > 0.9 ? 0 : chrome).toFixed(2), (v) => {
      $('#stats').style.opacity = v
      $('#altimeter').style.opacity = v
      $('#progress').style.opacity = v
    })

    // cards
    st.cards.forEach((o, i) => {
      this.set('card' + i, o.toFixed(3), (v) => {
        const el = this.cardEls[i]
        el.style.opacity = v
        el.style.visibility = v > 0.001 ? 'visible' : 'hidden'
        el.style.setProperty('--o', v)
        el.classList.toggle('is-on', v > 0.55)
        el.setAttribute('aria-hidden', v > 0.5 ? 'false' : 'true')
      })
    })

    // stats
    let stage = 0
    st.acquire.forEach((a) => (stage += a >= 0.5 ? 1 : 0))
    this.set('lv', stage, (v) => {
      $('.js-lv').textContent = v + 1
      const m = MILESTONES[Math.max(0, v - 1)]
      $('.js-where').textContent = v ? `${m.year} · ${m.place}` : '—'
      $('.js-inv').innerHTML = MILESTONES.map((ms, i) =>
        `<span class="inv__slot ${i < v ? 'is-full' : ''}" title="${i < v ? ITEMS[ms.item].label : ''}">${i < v ? ITEMS[ms.item].icon : ''}</span>`).join('')
    })
    let skills = 0
    MILESTONES.forEach((m, i) => (skills += st.acquire[i] >= 0.5 ? m.skills.length : 0))
    this.set('know', skills, (v) => {
      $('.js-know').style.width = `${(v / TOTAL_SKILLS) * 100}%`
      $('.js-know-n').textContent = `${v} ${this.t('skillsUnit')}`
    })
    this.set('scars', scars, (v) => {
      $('.js-scars').innerHTML = Array.from({ length: TOTAL_SCARS }, (_, i) => `<i class="${i < v ? 'is-on' : ''}"></i>`).join('')
      $('.js-scars-n').textContent = v
    })

    // altimeter
    const p = clamp((mp + 1) / (MILESTONES.length + 1))
    this.set('alt', p.toFixed(4), (v) => {
      $('.alt__fill').style.transform = `scaleY(${v})`
      $('.alt__marker').style.setProperty('--p', v)
    })
    const yearIdx = Math.max(0, Math.min(MILESTONES.length - 1, Math.round(mp)))
    const year = mp > MILESTONES.length - 0.5 ? '2026' : mp < -0.5 ? '2016' : MILESTONES[yearIdx].year
    this.set('year', year, (v) => ($('.alt__label').textContent = v))

    this.set('step', stepNo, (v) => {
      $('#progress').innerHTML = `<span>${this.t('step')}</span> <b>${v}</b> / ${stepTotal}<i style="width:${(v / stepTotal) * 100}%"></i>`
    })
    if (stage !== this.lastStage) this.lastStage = stage
  }

  float(text, x, y, kind) {
    const el = document.createElement('div')
    el.className = `floater floater--${kind}`
    el.textContent = text
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    $('#floaters').appendChild(el)
    setTimeout(() => el.remove(), 1800)
  }

  scar(x, y, reduced) {
    this.float(this.t('scarToast'), x, y, 'scar')
    if (reduced) return
    const v = $('#vignette')
    v.classList.remove('is-hit')
    void v.offsetWidth
    v.classList.add('is-hit')
  }

  levelUp(i, x, y) {
    const m = MILESTONES[i]
    const item = ITEMS[m.item]
    const toast = $('#toast')
    toast.innerHTML = `<span class="toast__lv">${this.t('levelUp')} · ${this.t('level')} ${i + 2}</span><span class="toast__item">${item.icon} ${item.label}</span>`
    toast.classList.remove('is-on')
    void toast.offsetWidth
    toast.classList.add('is-on')
    m.skills.forEach((s, k) => setTimeout(() => this.float('+' + s, x + (k % 2 ? 1 : -1) * (20 + k * 9), y - k * 6, 'skill'), k * 110))
  }

  bubble(text, x, y) {
    const b = $('#bubble')
    if (text == null) {
      if (this.bubbleShown) b.classList.remove('is-on')
      this.bubbleShown = false
      return
    }
    b.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`
    if (!this.bubbleShown || b.dataset.text !== text) {
      b.dataset.text = text
      b.textContent = text
      b.classList.add('is-on')
    }
    this.bubbleShown = true
  }
}
