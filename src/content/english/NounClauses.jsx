import { useLayoutEffect, useRef, useState } from 'react'
import { Button } from 'antd'
import {
  ApiOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  RetweetOutlined,
  ThunderboltFilled,
} from '@ant-design/icons'
import styles from './NounClauses.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: [noun clause]  *key word*                          */
/* ------------------------------------------------------------------ */

const CARDS = [
  { key: 'that', label: 'that…', text: 'that he quit his job', color: '#facc15' },
  { key: 'whether', label: 'whether…', text: 'whether he quit his job', color: '#22d3ee' },
  { key: 'if', label: 'if…', text: 'if he quit his job', color: '#fb923c' },
  { key: 'wh', label: 'wh-…', text: 'why he quit his job', color: '#f472b6' },
  { key: 'what', label: 'what…', text: 'what he told his boss', color: '#a3e635' },
]

// s: 'ok' | 'warn' | 'bad'
const SLOTS = [
  {
    key: 'subject',
    label: 'Subject',
    vi: 'Chủ ngữ',
    before: '',
    after: ' is still a mystery.',
    nounEq: 'His decision is still a mystery.',
    verdict: {
      that: { s: 'warn', vi: 'Đúng ngữ pháp nhưng rất trang trọng. Tự nhiên hơn: It is still a mystery that he quit his job. Khi làm chủ ngữ, không được bỏ "that".' },
      whether: { s: 'ok', vi: 'whether… đứng đầu câu làm chủ ngữ: hoàn toàn đúng.' },
      if: { s: 'bad', vi: 'if không thể đứng đầu câu làm chủ ngữ → phải dùng whether.' },
      wh: { s: 'ok', vi: 'Mệnh đề wh- làm chủ ngữ; cả mệnh đề tính là số ít nên dùng "is".' },
      what: { s: 'ok', vi: 'What he told his boss = the thing that he told his boss → làm chủ ngữ như một danh từ.' },
    },
  },
  {
    key: 'object',
    label: 'Object',
    vi: 'Tân ngữ',
    before: 'Nobody knows ',
    after: '.',
    nounEq: 'Nobody knows the truth.',
    verdict: {
      that: { s: 'ok', vi: 'Sau động từ (know, think, say, believe…) that làm tân ngữ và có thể lược bỏ: Nobody knows he quit his job.' },
      whether: { s: 'ok', vi: 'whether làm tân ngữ sau know / ask / wonder: đúng.' },
      if: { s: 'ok', vi: 'Ở vị trí tân ngữ sau know / ask / wonder, if = whether.' },
      wh: { s: 'ok', vi: 'Câu hỏi gián tiếp: why + S + V, không đảo trợ động từ.' },
      what: { s: 'ok', vi: 'what… làm tân ngữ của "knows".' },
    },
  },
  {
    key: 'complement',
    label: 'Complement',
    vi: 'Bổ ngữ (sau be)',
    before: 'The problem is ',
    after: '.',
    nounEq: 'The problem is his attitude.',
    verdict: {
      that: { s: 'ok', vi: 'S + be + that-clause: The problem / The truth / The reason is that…' },
      whether: { s: 'ok', vi: 'S + be + whether…: đúng, thường dùng với the question / the problem.' },
      if: { s: 'warn', vi: 'Sau "be" chỉ nên dùng whether; "is if…" chỉ gặp trong văn nói rất thân mật.' },
      wh: { s: 'ok', vi: 'S + be + wh-clause: The problem is why / how / where…' },
      what: { s: 'ok', vi: 'S + be + what-clause: đúng.' },
    },
  },
  {
    key: 'prep',
    label: 'After preposition',
    vi: 'Sau giới từ',
    before: 'We argued about ',
    after: '.',
    nounEq: 'We argued about his resignation.',
    verdict: {
      that: { s: 'bad', vi: 'Không dùng that ngay sau giới từ → about the fact that he quit his job.' },
      whether: { s: 'ok', vi: 'Sau giới từ dùng whether: about / on / of whether…' },
      if: { s: 'bad', vi: 'if không đứng sau giới từ → about whether…' },
      wh: { s: 'ok', vi: 'Giới từ + wh-clause: about why / how / where… đúng.' },
      what: { s: 'ok', vi: 'Giới từ + what-clause: about what he told his boss.' },
    },
  },
  {
    key: 'appositive',
    label: 'Appositive',
    vi: 'Đồng vị ngữ',
    before: 'The rumour ',
    after: ' spread quickly.',
    nounEq: 'The rumour (= his resignation) spread quickly.',
    verdict: {
      that: { s: 'ok', vi: 'that-clause giải thích nội dung của danh từ đứng trước: the rumour / fact / news / idea that… Ở đây không được bỏ that.' },
      whether: { s: 'bad', vi: 'whether chỉ đi sau danh từ mang nghĩa câu hỏi (the question whether…), không đi với "rumour".' },
      if: { s: 'bad', vi: 'if không dùng làm đồng vị ngữ cho danh từ.' },
      wh: { s: 'bad', vi: '"The rumour why…" không đúng. Đồng vị ngữ cho rumour / fact / news là that-clause.' },
      what: { s: 'bad', vi: 'what đã bao hàm nghĩa “the thing that”, không đứng sau một danh từ khác.' },
    },
  },
]

const THAT_USES = [
  { label: 'Tân ngữ (that thường được bỏ)', ex: ['I think [~that~ she is right].', 'He said [~that~ he was tired].'] },
  { label: 'It + be + adj / noun + that', ex: ['It is clear [*that* we need more time].', 'It’s a pity [*that* you can’t come].'] },
  { label: 'The fact that… (cả sau giới từ)', ex: ['[The fact *that* he lied] upset me.', 'Despite [the fact *that* it rained], we went out.'] },
  { label: 'Tính từ cảm xúc + that', ex: ['I’m sure [~that~ you’ll pass].', 'She was surprised [*that* nobody called].'] },
]

const WHETHER_IF = [
  { pos: 'Tân ngữ sau know / ask / wonder / not sure', w: true, i: true, ex: 'I wonder whether / if she’ll come.' },
  { pos: 'Đầu câu, làm chủ ngữ', w: true, i: false, ex: 'Whether he agrees doesn’t matter.' },
  { pos: 'Sau giới từ', w: true, i: false, ex: 'It depends on whether we have time.' },
  { pos: 'Trước to-V', w: true, i: false, ex: 'I can’t decide whether to stay.' },
  { pos: 'Ngay trước “or not”', w: true, i: false, ex: 'Whether or not you like it, we’re going.' },
  { pos: 'Sau be (bổ ngữ)', w: true, i: false, ex: 'The question is whether it’s worth it.' },
]

const REORDER = [
  {
    label: 'Where does she live?',
    q: [
      { id: 'w', t: 'Where', r: 'wh' },
      { id: 'aux', t: 'does', r: 'aux' },
      { id: 's', t: 'she', r: 's' },
      { id: 'v', t: 'live', r: 'v' },
      { id: 'end', t: '?', r: 'p' },
    ],
    e: [
      { id: 'f1', t: 'I', r: 'f' },
      { id: 'f2', t: 'don’t', r: 'f' },
      { id: 'f3', t: 'know', r: 'f' },
      { id: 'w', t: 'where', r: 'wh' },
      { id: 's', t: 'she', r: 's' },
      { id: 'v', t: 'lives', r: 'v' },
      { id: 'end', t: '.', r: 'p' },
    ],
    note: 'Bỏ trợ động từ "does", động từ chia theo chủ ngữ (lives). Trật tự: wh + S + V.',
  },
  {
    label: 'Who is that man?',
    q: [
      { id: 'w', t: 'Who', r: 'wh' },
      { id: 'aux', t: 'is', r: 'aux' },
      { id: 's1', t: 'that', r: 's' },
      { id: 's2', t: 'man', r: 's' },
      { id: 'end', t: '?', r: 'p' },
    ],
    e: [
      { id: 'f1', t: 'Tell', r: 'f' },
      { id: 'f2', t: 'me', r: 'f' },
      { id: 'w', t: 'who', r: 'wh' },
      { id: 's1', t: 'that', r: 's' },
      { id: 's2', t: 'man', r: 's' },
      { id: 'aux', t: 'is', r: 'aux' },
      { id: 'end', t: '.', r: 'p' },
    ],
    note: '"is" nhảy ra sau chủ ngữ "that man".',
  },
  {
    label: 'What time is it?',
    q: [
      { id: 'w', t: 'What', r: 'wh' },
      { id: 'w2', t: 'time', r: 'wh' },
      { id: 'aux', t: 'is', r: 'aux' },
      { id: 's', t: 'it', r: 's' },
      { id: 'end', t: '?', r: 'p' },
    ],
    e: [
      { id: 'f1', t: 'Do', r: 'f' },
      { id: 'f2', t: 'you', r: 'f' },
      { id: 'f3', t: 'know', r: 'f' },
      { id: 'w', t: 'what', r: 'wh' },
      { id: 'w2', t: 'time', r: 'wh' },
      { id: 's', t: 'it', r: 's' },
      { id: 'aux', t: 'is', r: 'aux' },
      { id: 'end', t: '?', r: 'p' },
    ],
    note: 'Câu ngoài (Do you know…?) vẫn là câu hỏi, nhưng phần bên trong là S + V: what time it is.',
  },
  {
    label: 'Can you help me?',
    q: [
      { id: 'aux', t: 'Can', r: 'aux' },
      { id: 's', t: 'you', r: 's' },
      { id: 'v', t: 'help', r: 'v' },
      { id: 'o', t: 'me', r: 'v' },
      { id: 'end', t: '?', r: 'p' },
    ],
    e: [
      { id: 'f1', t: 'I', r: 'f' },
      { id: 'f2', t: 'wonder', r: 'f' },
      { id: 'if', t: 'if', r: 'wh' },
      { id: 's', t: 'you', r: 's' },
      { id: 'aux', t: 'can', r: 'aux' },
      { id: 'v', t: 'help', r: 'v' },
      { id: 'o', t: 'me', r: 'v' },
      { id: 'end', t: '.', r: 'p' },
    ],
    note: 'Câu hỏi Yes / No → thêm if / whether, rồi S + V.',
  },
  {
    label: '“Where do you live?” (tường thuật)',
    q: [
      { id: 'w', t: 'Where', r: 'wh' },
      { id: 'aux', t: 'do', r: 'aux' },
      { id: 's', t: 'you', r: 's' },
      { id: 'v', t: 'live', r: 'v' },
      { id: 'end', t: '?', r: 'p' },
    ],
    e: [
      { id: 'f1', t: 'She', r: 'f' },
      { id: 'f2', t: 'asked', r: 'f' },
      { id: 'f3', t: 'me', r: 'f' },
      { id: 'w', t: 'where', r: 'wh' },
      { id: 's', t: 'I', r: 's' },
      { id: 'v', t: 'lived', r: 'v' },
      { id: 'end', t: '.', r: 'p' },
    ],
    note: 'Câu hỏi tường thuật: đổi ngôi (you → I), lùi thì (live → lived), trật tự S + V, bỏ dấu "?".',
  },
  {
    label: '“Are you ready?” (tường thuật)',
    q: [
      { id: 'aux', t: 'Are', r: 'aux' },
      { id: 's', t: 'you', r: 's' },
      { id: 'c', t: 'ready', r: 'v' },
      { id: 'end', t: '?', r: 'p' },
    ],
    e: [
      { id: 'f1', t: 'He', r: 'f' },
      { id: 'f2', t: 'asked', r: 'f' },
      { id: 'if', t: 'whether', r: 'wh' },
      { id: 's', t: 'I', r: 's' },
      { id: 'aux', t: 'was', r: 'aux' },
      { id: 'c', t: 'ready', r: 'v' },
      { id: 'end', t: '.', r: 'p' },
    ],
    note: 'Yes / No → asked if / whether; are → was (lùi thì) và đứng sau chủ ngữ.',
  },
]

const WHAT_EVER = [
  { w: 'what', vi: '= the thing(s) that', ex: '[*What* I need] is a long holiday.' },
  { w: 'whatever', vi: 'bất cứ thứ gì', ex: 'You can order [*whatever* you like].' },
  { w: 'whoever', vi: 'bất cứ ai', ex: '[*Whoever* wins the race] will get a medal.' },
  { w: 'whichever', vi: 'cái nào… cũng', ex: 'Take [*whichever* seat you prefer].' },
  { w: 'wherever', vi: 'bất cứ đâu', ex: 'I’ll follow you [*wherever* you go].' },
  { w: 'whenever', vi: 'bất cứ khi nào', ex: 'Call me [*whenever* you need help].' },
]

const SUBJUNCTIVE = [
  { en: 'The doctor recommended [that he *stop* smoking].', wrong: 'stops', vi: 'Không thêm -s dù chủ ngữ là "he".' },
  { en: 'She insisted [that I *be* on time].', wrong: 'am / was', vi: 'Động từ to be giữ nguyên "be".' },
  { en: 'They suggested [that we *not go* out at night].', wrong: 'don’t go', vi: 'Phủ định: not + V nguyên mẫu, không dùng do.' },
  { en: 'It is essential [that every student *attend* the meeting].', wrong: 'attends', vi: 'It is essential / vital / important that + S + V nguyên mẫu.' },
]

const MISTAKES = [
  { bad: 'I don’t know where does she live.', good: 'I don’t know where she lives.', vi: 'Trong mệnh đề danh từ không đảo ngữ: wh + S + V.' },
  { bad: 'Can you tell me what time is it?', good: 'Can you tell me what time it is?', vi: 'Phần câu hỏi lồng bên trong dùng trật tự câu kể.' },
  { bad: 'It depends on if we have enough money.', good: 'It depends on whether we have enough money.', vi: 'Sau giới từ chỉ dùng whether.' },
  { bad: 'The thing what I like most is the food.', good: 'What I like most is the food. / The thing that I like most…', vi: 'what = the thing that; không dùng "the thing what".' },
  { bad: 'He suggested that she goes to the doctor.', good: 'He suggested that she go to the doctor.', vi: 'suggest / recommend / insist that + S + V nguyên mẫu (hoặc should + V).' },
  { bad: 'She asked me where had I been.', good: 'She asked me where I had been.', vi: 'Câu hỏi tường thuật: S + V, không đảo, không có dấu "?".' },
  { bad: 'He is worried about that he might fail.', good: 'He is worried that he might fail. / …about the fact that…', vi: 'Không đặt that-clause ngay sau giới từ.' },
  { bad: 'Whomever wins will get the prize.', good: 'Whoever wins will get the prize.', vi: '"Whoever" làm chủ ngữ của "wins", nên không dùng whomever.' },
]

const STATUS = {
  ok: { icon: <CheckCircleFilled />, text: 'Khớp' },
  warn: { icon: <ExclamationCircleFilled />, text: 'Được, nhưng…' },
  bad: { icon: <CloseCircleFilled />, text: 'Không khớp' },
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Inner({ text }) {
  return text
    .split(/(\*[^*]+\*|~[^~]+~)/g)
    .filter(Boolean)
    .map((p, i) => {
      if (p.startsWith('*')) return <strong key={i} className={styles.keyWord}>{p.slice(1, -1)}</strong>
      if (p.startsWith('~')) return <span key={i} className={styles.optional}>({p.slice(1, -1)})</span>
      return <span key={i}>{p}</span>
    })
}

function Rich({ text }) {
  return text
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith('[') ? (
        <mark key={i} className={styles.clauseMark}><Inner text={p.slice(1, -1)} /></mark>
      ) : (
        <Inner key={i} text={p} />
      ),
    )
}

function capitalize(text) {
  return text ? text[0].toUpperCase() + text.slice(1) : text
}

function SectionHead({ icon, title, sub, id }) {
  return (
    <header className={styles.sectionHead}>
      <span className={styles.sectionIcon} aria-hidden="true">{icon}</span>
      <div>
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {sub && <p className={styles.sectionSub}>{sub}</p>}
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  Signature: plugboard                                               */
/* ------------------------------------------------------------------ */

function Plugboard() {
  const [slotKey, setSlotKey] = useState('subject')
  const [cardKey, setCardKey] = useState(null)
  const [plugCount, setPlugCount] = useState(0)
  const slot = SLOTS.find((s) => s.key === slotKey)
  const card = CARDS.find((c) => c.key === cardKey)
  const verdict = card ? slot.verdict[card.key] : null

  const plug = (key) => {
    setCardKey(key)
    setPlugCount((n) => n + 1)
  }
  const pickSlot = (key) => {
    setSlotKey(key)
    if (cardKey) setPlugCount((n) => n + 1)
  }

  const clauseText = card ? (slot.before ? card.text : capitalize(card.text)) : ''

  return (
    <section className={styles.board} aria-labelledby="nc-board-title">
      <div className={styles.boardHead}>
        <span className={styles.eyebrow}>
          <ApiOutlined aria-hidden="true" /> Plugboard
        </span>
        <h2 id="nc-board-title" className={styles.boardTitle}>Mệnh đề danh từ = một “danh từ” cắm được vào nhiều ổ</h2>
        <p className={styles.boardHint}>
          Chọn một ổ cắm (vị trí trong câu), rồi cắm một thẻ mệnh đề vào. Kéo thả hoặc bấm vào thẻ đều được.
        </p>
      </div>

      <div className={styles.sockets} role="group" aria-label="Chọn vị trí trong câu">
        {SLOTS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={styles.socketBtn}
            aria-pressed={s.key === slotKey}
            onClick={() => pickSlot(s.key)}
          >
            <span className={styles.holes} aria-hidden="true"><i /><i /></span>
            <span className={styles.socketLabel}>{s.label}</span>
            <span className={styles.socketVi}>{s.vi}</span>
          </button>
        ))}
      </div>

      <div
        className={styles.frame}
        data-status={verdict ? verdict.s : undefined}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const key = e.dataTransfer.getData('text/plain')
          if (CARDS.some((c) => c.key === key)) plug(key)
        }}
      >
        <span className={styles.frameTag}>{slot.label} slot</span>
        <p className={styles.frameSentence} aria-live="polite">
          {slot.before}
          {card ? (
            <span
              key={`${plugCount}`}
              className={styles.plugged}
              style={{ '--card': card.color }}
            >
              {clauseText}
            </span>
          ) : (
            <span className={styles.emptySlot}>
              <span className={styles.holes} aria-hidden="true"><i /><i /></span>
              <span>cắm thẻ vào đây</span>
            </span>
          )}
          {slot.after}
        </p>
        <p className={styles.nounEq}>
          <span>≈ thay bằng danh từ:</span> {slot.nounEq}
        </p>
      </div>

      <div className={styles.cards} role="group" aria-label="Thẻ mệnh đề danh từ">
        {CARDS.map((c) => (
          <button
            key={c.key}
            type="button"
            className={styles.card}
            style={{ '--card': c.color }}
            aria-pressed={c.key === cardKey}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', c.key)
              e.dataTransfer.effectAllowed = 'copy'
            }}
            onClick={() => plug(c.key)}
          >
            <span className={styles.prongs} aria-hidden="true"><i /><i /></span>
            <span className={styles.cardLabel}>{c.label}</span>
            <span className={styles.cardText}>{c.text}</span>
          </button>
        ))}
      </div>

      <div className={styles.verdict} aria-live="polite">
        {verdict ? (
          <div className={styles.verdictBox} data-status={verdict.s} key={`${slotKey}-${cardKey}`}>
            <p className={styles.verdictHead}>
              {STATUS[verdict.s].icon} <strong>{STATUS[verdict.s].text}</strong>
              <span className={styles.verdictMeta}>
                {card.label} → {slot.vi}
              </span>
            </p>
            <p className={styles.verdictText}>{verdict.vi}</p>
          </div>
        ) : (
          <p className={styles.verdictIdle}>
            <ThunderboltFilled aria-hidden="true" /> Chưa có thẻ nào được cắm.
          </p>
        )}
      </div>

      <div className={styles.matrixWrap}>
        <table className={styles.matrix}>
          <caption>Bảng tổng kết · bấm một ô để thử</caption>
          <thead>
            <tr>
              <th scope="col"><span className={styles.srOnly}>Vị trí</span></th>
              {CARDS.map((c) => (
                <th key={c.key} scope="col" style={{ '--card': c.color }}>
                  <span className={styles.matrixCard}>{c.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((s) => (
              <tr key={s.key}>
                <th scope="row">{s.vi}</th>
                {CARDS.map((c) => {
                  const v = s.verdict[c.key]
                  const on = s.key === slotKey && c.key === cardKey
                  return (
                    <td key={c.key}>
                      <button
                        type="button"
                        className={styles.cell}
                        data-status={v.s}
                        aria-pressed={on}
                        aria-label={`${c.label} ở vị trí ${s.vi}: ${STATUS[v.s].text}`}
                        onClick={() => {
                          setSlotKey(s.key)
                          plug(c.key)
                        }}
                      >
                        {STATUS[v.s].icon}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Embedded question reorder (FLIP animation)                          */
/* ------------------------------------------------------------------ */

function Reorder() {
  const [qi, setQi] = useState(0)
  const [embedded, setEmbedded] = useState(false)
  const boxRef = useRef(null)
  const prev = useRef(new Map())
  const item = REORDER[qi]
  const tokens = embedded ? item.e : item.q
  const qText = new Map(item.q.map((t) => [t.id, t.t.toLowerCase()]))
  const eIds = new Set(item.e.map((t) => t.id))
  const removed = item.q.filter((t) => !eIds.has(t.id) && t.r !== 'p')

  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box) return
    const reduce =
      typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hadPrev = prev.current.size > 0
    const next = new Map()
    box.querySelectorAll('[data-id]').forEach((el) => {
      const id = el.dataset.id
      const pos = { x: el.offsetLeft, y: el.offsetTop }
      next.set(id, pos)
      if (reduce || typeof el.animate !== 'function' || !hadPrev) return
      const old = prev.current.get(id)
      if (old) {
        const dx = old.x - pos.x
        const dy = old.y - pos.y
        if (dx || dy) {
          el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], {
            duration: 650,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          })
        }
      } else {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(-16px) scale(0.8)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 450, delay: 300, easing: 'ease-out', fill: 'backwards' },
        )
      }
    })
    prev.current = next
  }, [qi, embedded])

  const pick = (i) => {
    prev.current = new Map()
    setQi(i)
    setEmbedded(false)
  }

  return (
    <section className={styles.panel} aria-labelledby="nc-order-title">
      <SectionHead
        id="nc-order-title"
        icon={<RetweetOutlined />}
        title="Câu hỏi lồng: trật tự câu kể"
        sub="Khi một câu hỏi nằm trong câu khác (hoặc được tường thuật), nó trở thành mệnh đề danh từ: không đảo ngữ, không do / does / did."
      />
      <div className={styles.orderPicks} role="group" aria-label="Chọn câu hỏi">
        {REORDER.map((r, i) => (
          <button
            key={r.label}
            type="button"
            className={styles.orderPick}
            aria-pressed={i === qi}
            onClick={() => pick(i)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className={styles.orderStage}>
        <div className={styles.orderTop}>
          <span className={styles.orderMode}>{embedded ? 'Mệnh đề danh từ' : 'Câu hỏi trực tiếp'}</span>
          <Button
            type="primary"
            className={styles.yellowBtn}
            icon={<RetweetOutlined />}
            onClick={() => setEmbedded((v) => !v)}
            aria-pressed={embedded}
          >
            {embedded ? 'Về câu hỏi' : 'Lồng vào câu'}
          </Button>
        </div>
        <p className={styles.tokens} ref={boxRef} aria-live="polite">
          {tokens.map((tok) => {
            const changed = embedded && qText.has(tok.id) && qText.get(tok.id) !== tok.t.toLowerCase()
            return (
              <span
                key={tok.id}
                data-id={tok.id}
                className={styles.token}
                data-role={tok.r}
                data-changed={changed ? 'y' : undefined}
              >
                {tok.t}
              </span>
            )
          })}
        </p>
        <div className={styles.removed}>
          {embedded && removed.length > 0 && (
            <>
              <span>Bỏ:</span>
              {removed.map((t) => <s key={t.id} className={styles.removedTok}>{t.t}</s>)}
            </>
          )}
        </div>
        <ul className={styles.legend} aria-label="Chú thích màu">
          <li data-role="wh">wh / if</li>
          <li data-role="s">chủ ngữ</li>
          <li data-role="aux">trợ động từ</li>
          <li data-role="v">động từ…</li>
        </ul>
        <p className={styles.orderNote}>{embedded ? item.note : 'Bấm “Lồng vào câu” để xem các từ đổi chỗ.'}</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function ThatSection() {
  return (
    <section className={styles.panel} aria-labelledby="nc-that-title">
      <SectionHead
        id="nc-that-title"
        icon="that"
        title="That-clause"
        sub="that + S + V: biến một câu kể thành một “danh từ”. Làm tân ngữ thì thường bỏ that; làm chủ ngữ hoặc đồng vị ngữ thì giữ."
      />
      <div className={styles.thatGrid}>
        {THAT_USES.map((u) => (
          <article key={u.label} className={styles.thatCard}>
            <h3 className={styles.thatLabel}>{u.label}</h3>
            <ul>
              {u.ex.map((ex) => <li key={ex}><Rich text={ex} /></li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function WhetherSection() {
  return (
    <section className={styles.panel} aria-labelledby="nc-whether-title">
      <SectionHead
        id="nc-whether-title"
        icon="?/?"
        title="whether hay if?"
        sub="Cả hai đều nghĩa là “liệu… có… không”. if chỉ an toàn ở vị trí tân ngữ; mọi chỗ khác dùng whether."
      />
      <div className={styles.wiTable} role="table" aria-label="So sánh whether và if">
        <div className={styles.wiRow} role="row">
          <span role="columnheader">Vị trí</span>
          <span role="columnheader" className={styles.wiHead}>whether</span>
          <span role="columnheader" className={styles.wiHead}>if</span>
        </div>
        {WHETHER_IF.map((r) => (
          <div key={r.pos} className={styles.wiRow} role="row">
            <span role="cell" className={styles.wiPos}>
              {r.pos}
              <em>{r.ex}</em>
            </span>
            <span role="cell" className={styles.wiMark} data-ok="y" aria-label="được">
              <CheckCircleFilled />
            </span>
            <span role="cell" className={styles.wiMark} data-ok={r.i ? 'y' : 'n'} aria-label={r.i ? 'được' : 'không được'}>
              {r.i ? <CheckCircleFilled /> : <CloseCircleFilled />}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function WhatSection() {
  return (
    <section className={styles.panel} aria-labelledby="nc-what-title">
      <SectionHead
        id="nc-what-title"
        icon="-ever"
        title="what & các từ -ever"
        sub="what = the thing(s) that, tự đóng vai một danh từ, nên không đứng sau danh từ khác."
      />
      <ul className={styles.everGrid}>
        {WHAT_EVER.map((w) => (
          <li key={w.w} className={styles.everCard}>
            <span className={styles.everWord}>{w.w}</span>
            <span className={styles.everVi}>{w.vi}</span>
            <p className={styles.everEx}><Rich text={w.ex} /></p>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        <strong>whoever hay whomever?</strong> Xét vai trò trong mệnh đề:{' '}
        <em>Give it to whoever needs it</em> (whoever là chủ ngữ của “needs”, dù đứng sau “to”).
      </p>
    </section>
  )
}

function SubjunctiveSection() {
  return (
    <section className={`${styles.panel} ${styles.subjPanel}`} aria-labelledby="nc-subj-title">
      <SectionHead
        id="nc-subj-title"
        icon="V₀"
        title="Giả định sau suggest / insist / recommend"
        sub="suggest, recommend, insist, demand, propose, require, It is essential / vital / important + that + S + V nguyên mẫu (cho mọi ngôi)."
      />
      <ul className={styles.subjList}>
        {SUBJUNCTIVE.map((s) => (
          <li key={s.en} className={styles.subjItem}>
            <p className={styles.subjEn}><Rich text={s.en} /></p>
            <p className={styles.subjWrong}>
              <span aria-hidden="true">❌</span> <s>{s.wrong}</s> — {s.vi}
            </p>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        Tiếng Anh–Anh hay dùng <em>should + V</em>: <em>The doctor recommended that he should stop smoking.</em> Cả hai đều đúng.
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Mistakes + practice                                                */
/* ------------------------------------------------------------------ */

function Mistakes() {
  return (
    <section className={styles.panel} aria-labelledby="nc-mistakes-title">
      <SectionHead id="nc-mistakes-title" icon="✗" title="Lỗi hay gặp" sub="Phần lớn lỗi đến từ thói quen đảo ngữ như câu hỏi." />
      <ul className={styles.mistakes}>
        {MISTAKES.map((mk) => (
          <li key={mk.bad} className={styles.mistake}>
            <p className={styles.bad}><span aria-hidden="true">❌</span> {mk.bad}</p>
            <p className={styles.good}><span aria-hidden="true">✅</span> {mk.good}</p>
            <p className={styles.why}>{mk.vi}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NounClauses() {
  return (
    <div className={styles.page}>
      <Plugboard />
      <ThatSection />
      <WhetherSection />
      <Reorder />
      <WhatSection />
      <SubjunctiveSection />
      <Mistakes />
    </div>
  )
}
