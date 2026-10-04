import { useState } from 'react'
import { Button, Switch } from 'antd'
import {
  ApartmentOutlined,
  BuildOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  RightOutlined,
  UndoOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './SentenceStructure.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: {S:The sun} {V:rises} — role code before the colon */
/* ------------------------------------------------------------------ */

const ROLES = {
  S: { code: 'S', name: 'Subject', vi: 'Chủ ngữ', color: '#d62828', ink: '#ffffff' },
  V: { code: 'V', name: 'Verb', vi: 'Động từ', color: '#f6c90e', ink: '#3b2f00' },
  O: { code: 'O', name: 'Object', vi: 'Tân ngữ', color: '#1d5fd1', ink: '#ffffff' },
  Oi: { code: 'Oi', name: 'Indirect object', vi: 'Tân ngữ gián tiếp', color: '#8fd0f7', ink: '#0b2a4a' },
  Od: { code: 'Od', name: 'Direct object', vi: 'Tân ngữ trực tiếp', color: '#1d5fd1', ink: '#ffffff' },
  C: { code: 'C', name: 'Complement', vi: 'Bổ ngữ', color: '#15803d', ink: '#ffffff' },
  A: { code: 'A', name: 'Adverbial', vi: 'Trạng ngữ', color: '#7e3fbf', ink: '#ffffff' },
}

const LEGEND = ['S', 'V', 'O', 'C', 'A']

const PATTERNS = [
  {
    key: 'sv',
    name: 'S + V',
    verbType: 'Intransitive verb · nội động từ',
    bricks: [['S', 'The baby'], ['V', 'is sleeping']],
    usage:
      'Dùng với nội động từ — động từ không cần tân ngữ mà câu vẫn đủ nghĩa: sleep, arrive, happen, cry, laugh, disappear, rise.',
    examples: [
      { en: '{S:The sun} {V:rises} in the east.', vi: 'Mặt trời mọc ở hướng đông.' },
      { en: '{S:Something strange} {V:happened} last night.', vi: 'Tối qua đã xảy ra một chuyện lạ.' },
      { en: '{S:Prices} {V:have gone up}.', vi: 'Giá cả đã tăng.' },
    ],
    tip: 'Nhiều động từ vừa là nội vừa là ngoại động từ: The door opened (S + V) · She opened the door (S + V + O).',
  },
  {
    key: 'svo',
    name: 'S + V + O',
    verbType: 'Transitive verb · ngoại động từ',
    bricks: [['S', 'She'], ['V', 'reads'], ['O', 'comic books']],
    usage:
      'Dùng với ngoại động từ — động từ cần một tân ngữ (người/vật chịu tác động): buy, make, love, need, finish, visit, watch.',
    examples: [
      { en: '{S:I} {V:have finished} {O:my homework}.', vi: 'Tôi đã làm xong bài tập.' },
      { en: '{S:Linh} {V:loves} {O:her new job}.', vi: 'Linh rất thích công việc mới.' },
      { en: '{S:We} {V:need} {O:more time}.', vi: 'Chúng tôi cần thêm thời gian.' },
    ],
    tip: 'Tân ngữ là đại từ thì dùng dạng tân ngữ: me, him, her, us, them — ✗ She loves he → ✅ She loves him.',
  },
  {
    key: 'svc',
    name: 'S + V + C',
    verbType: 'Linking verb · động từ nối',
    bricks: [['S', 'My father'], ['V', 'is'], ['C', 'a doctor']],
    usage:
      'Dùng với động từ nối: be, become, seem, look, feel, sound, taste, smell, get, stay. Bổ ngữ (C) mô tả hoặc gọi tên lại chủ ngữ — thường là danh từ hoặc tính từ.',
    examples: [
      { en: '{S:This soup} {V:tastes} {C:delicious}.', vi: 'Món súp này ngon.' },
      { en: '{S:She} {V:became} {C:a famous singer}.', vi: 'Cô ấy đã trở thành ca sĩ nổi tiếng.' },
      { en: '{S:You} {V:look} {C:tired}.', vi: 'Trông bạn mệt mỏi.' },
    ],
    tip: 'Sau động từ nối dùng tính từ, không dùng trạng từ: ✗ The soup tastes deliciously → ✅ The soup tastes delicious.',
  },
  {
    key: 'svoo',
    name: 'S + V + O + O',
    verbType: 'Ditransitive verb · động từ hai tân ngữ',
    bricks: [['S', 'He'], ['V', 'gave'], ['Oi', 'his mother'], ['Od', 'some flowers']],
    usage:
      'Dùng với động từ có hai tân ngữ: give, send, show, buy, tell, lend, teach. Oi (gián tiếp) thường là người nhận, đứng trước; Od (trực tiếp) là vật được trao.',
    examples: [
      { en: '{S:My uncle} {V:sent} {Oi:me} {Od:a postcard}.', vi: 'Chú tôi gửi cho tôi một tấm bưu thiếp.' },
      { en: '{S:The guide} {V:showed} {Oi:us} {Od:the old town}.', vi: 'Hướng dẫn viên dẫn chúng tôi đi xem phố cổ.' },
      { en: '{S:She} {V:bought} {Oi:her son} {Od:a bike}.', vi: 'Cô ấy mua cho con trai một chiếc xe đạp.' },
    ],
    tip: 'Có thể đổi thành S + V + Od + to/for + Oi: He gave some flowers to his mother. Một số động từ chỉ dùng cách này: explain, describe, suggest → ✗ explain me the rule → ✅ explain the rule to me.',
  },
  {
    key: 'svoc',
    name: 'S + V + O + C',
    verbType: 'Complex-transitive verb',
    bricks: [['S', 'They'], ['V', 'elected'], ['O', 'her'], ['C', 'team captain']],
    usage:
      'Bổ ngữ (C) mô tả hoặc gọi tên lại tân ngữ (O). Hay gặp với: make, call, name, elect, find, keep, consider, paint.',
    examples: [
      { en: '{S:The news} {V:made} {O:everyone} {C:happy}.', vi: 'Tin đó làm mọi người vui.' },
      { en: '{S:We} {V:call} {O:him} {C:“the Professor”}.', vi: 'Chúng tôi gọi anh ấy là “Giáo sư”.' },
      { en: '{S:I} {V:found} {O:the film} {C:boring}.', vi: 'Tôi thấy bộ phim chán.' },
    ],
    tip: 'Phân biệt: She made him a cake (S + V + Oi + Od — làm bánh cho anh ấy) ≠ She made him angry (S + V + O + C — làm anh ấy giận).',
  },
  {
    key: 'sva',
    name: 'S + V + A',
    verbType: 'Verb + obligatory adverbial',
    bricks: [['S', 'She'], ['V', 'lives'], ['A', 'in Da Nang']],
    usage:
      'Một số động từ bắt buộc có trạng ngữ (A) chỉ nơi chốn, thời gian hoặc cách thức thì câu mới đủ nghĩa: live, stay, be, go, lie, last. Có thêm tân ngữ thì thành S + V + O + A (put, place).',
    examples: [
      { en: '{S:The meeting} {V:lasted} {A:two hours}.', vi: 'Cuộc họp kéo dài hai tiếng.' },
      { en: '{S:My keys} {V:are} {A:on the table}.', vi: 'Chìa khóa của tôi ở trên bàn.' },
      { en: '{S:He} {V:put} {O:the keys} {A:in his pocket}.', vi: 'Anh ấy bỏ chìa khóa vào túi.' },
    ],
    tip: 'Bỏ A đi câu sẽ cụt: ✗ She lives. ✗ He put the keys. Khác với trạng ngữ tùy chọn (yesterday, quickly) — bỏ đi câu vẫn đúng.',
  },
]

const PUZZLES = [
  { pattern: 'S + V', chunks: [['S', 'The old bridge'], ['V', 'collapsed']], vi: 'Cây cầu cũ đã sập.' },
  { pattern: 'S + V + O', chunks: [['S', 'My brother'], ['V', 'plays'], ['O', 'the guitar']], vi: 'Anh trai tôi chơi đàn guitar.' },
  { pattern: 'S + V + C', chunks: [['S', 'This soup'], ['V', 'tastes'], ['C', 'a bit salty']], vi: 'Món súp này hơi mặn.' },
  { pattern: 'S + V + A', chunks: [['S', 'We'], ['V', 'stayed'], ['A', 'at a small hotel']], vi: 'Chúng tôi ở một khách sạn nhỏ.' },
  { pattern: 'S + V + O + A', chunks: [['S', 'She'], ['V', 'put'], ['O', 'the flowers'], ['A', 'in a vase']], vi: 'Cô ấy cắm hoa vào bình.' },
  { pattern: 'S + V + Oi + Od', chunks: [['S', 'The teacher'], ['V', 'showed'], ['Oi', 'us'], ['Od', 'a short video']], vi: 'Cô giáo cho chúng tôi xem một đoạn video ngắn.' },
  { pattern: 'S + V + O + C', chunks: [['S', 'The noise'], ['V', 'kept'], ['O', 'the baby'], ['C', 'awake']], vi: 'Tiếng ồn khiến em bé thức suốt.' },
]

/* Sentence types: k = ic (independent clause) | dc (dependent clause) | cj (connector) */
const SENTENCE_TYPES = [
  {
    key: 'simple',
    name: 'Simple sentence',
    vi: 'Câu đơn',
    formula: '1 IC',
    desc: 'Chỉ có một mệnh đề độc lập. Chủ ngữ hoặc động từ có thể “ghép” (Lan and her sister · sing and dance) mà vẫn là câu đơn, vì chỉ có một cụm S + V.',
    parts: [{ k: 'ic', t: 'Lan and her sister grow vegetables in the garden.' }],
    trans: 'Lan và chị gái trồng rau trong vườn.',
  },
  {
    key: 'compound',
    name: 'Compound sentence',
    vi: 'Câu ghép',
    formula: 'IC + , FANBOYS + IC  ·  IC ; IC',
    desc: 'Hai (hoặc nhiều) mệnh đề độc lập ngang hàng, nối bằng liên từ kết hợp FANBOYS (for, and, nor, but, or, yet, so) có dấu phẩy phía trước, hoặc bằng dấu chấm phẩy (; however, …).',
    parts: [
      { k: 'ic', t: 'I wanted to go out,' },
      { k: 'cj', t: 'but' },
      { k: 'ic', t: 'it was raining.' },
    ],
    trans: 'Tôi muốn ra ngoài, nhưng trời đang mưa.',
  },
  {
    key: 'complex',
    name: 'Complex sentence',
    vi: 'Câu phức',
    formula: 'IC + DC',
    desc: 'Một mệnh đề độc lập + ít nhất một mệnh đề phụ thuộc. Mệnh đề phụ bắt đầu bằng liên từ phụ thuộc (because, although, when, if, while, after…) hoặc đại từ quan hệ (who, which, that). Mệnh đề phụ đứng đầu câu → thêm dấu phẩy.',
    parts: [
      { k: 'cj', t: 'Although' },
      { k: 'dc', t: 'it was raining,' },
      { k: 'ic', t: 'we went for a walk.' },
    ],
    trans: 'Mặc dù trời mưa, chúng tôi vẫn đi dạo.',
  },
  {
    key: 'cc',
    name: 'Compound-complex sentence',
    vi: 'Câu ghép phức',
    formula: '≥ 2 IC + ≥ 1 DC',
    desc: 'Kết hợp cả hai: ít nhất hai mệnh đề độc lập và ít nhất một mệnh đề phụ thuộc. Hay gặp trong văn viết học thuật, kể chuyện.',
    parts: [
      { k: 'cj', t: 'When' },
      { k: 'dc', t: 'the bell rang,' },
      { k: 'ic', t: 'the students left,' },
      { k: 'cj', t: 'but' },
      { k: 'ic', t: 'the teacher stayed behind.' },
    ],
    trans: 'Khi chuông reo, học sinh ra về, nhưng thầy giáo ở lại.',
  },
]

const PART_LABEL = { ic: 'Independent clause', dc: 'Dependent clause', cj: 'Connector' }

const PHRASES = [
  { kind: 'Noun phrase', vi: 'cụm danh từ', ex: 'a cup of hot tea' },
  { kind: 'Verb phrase', vi: 'cụm động từ', ex: 'has been waiting' },
  { kind: 'Prepositional phrase', vi: 'cụm giới từ', ex: 'in the morning' },
  { kind: 'Adjective phrase', vi: 'cụm tính từ', ex: 'very proud of her son' },
  { kind: 'Infinitive / -ing phrase', vi: 'cụm to V / V-ing', ex: 'to learn English · walking home' },
]

const CLAUSES = [
  { kind: 'Independent clause', vi: 'đứng một mình được', lead: '', s: 'she', v: 'smiled', rest: '' },
  { kind: 'Dependent clause', vi: 'phải bám vào mệnh đề chính', lead: 'because', s: 'the bus', v: 'was', rest: 'late' },
  { kind: 'Relative clause', vi: 'mệnh đề quan hệ (phụ thuộc)', lead: '', s: 'who', v: 'lives', rest: 'next door' },
]

const MISTAKES = [
  { bad: 'Is very hot today.', good: 'It is very hot today.', why: 'Câu tiếng Anh luôn cần chủ ngữ. Nói về thời tiết, thời gian, khoảng cách dùng chủ ngữ giả “it”.' },
  { bad: 'She very beautiful.', good: 'She is very beautiful.', why: 'Tiếng Việt không cần “là” trước tính từ, nhưng tiếng Anh bắt buộc có động từ (be).' },
  { bad: 'I like very much football.', good: 'I like football very much.', why: 'Không chen trạng từ vào giữa động từ và tân ngữ: V + O đi liền nhau.' },
  { bad: 'I was tired, I went to bed early.', good: 'I was tired, so I went to bed early.', why: 'Hai mệnh đề độc lập không nối bằng dấu phẩy trơn (comma splice). Thêm FANBOYS, dùng “;” hoặc tách câu.' },
  { bad: 'Because I was hungry.', good: 'I ate a sandwich because I was hungry.', why: 'Mệnh đề phụ thuộc không đứng một mình thành câu (sentence fragment).' },
  { bad: 'Although it rained, but we went out.', good: 'Although it rained, we went out.', why: 'Although và but đều là từ nối — chỉ dùng một trong hai.' },
  { bad: 'He explained me the problem.', good: 'He explained the problem to me.', why: '“Explain” không theo mẫu S + V + Oi + Od; phải dùng explain + something + to + somebody.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function roleStyle(code) {
  const r = ROLES[code]
  return { '--brick': r.color, '--brick-ink': r.ink }
}

function shuffledOrder(n) {
  const arr = Array.from({ length: n }, (_, i) => i)
  for (let tries = 0; tries < 6; tries += 1) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    if (arr.some((v, i) => v !== i)) break
  }
  return arr
}

function RoleText({ text }) {
  const parts = text.split(/(\{\w+:[^}]+\})/g).filter(Boolean)
  return parts.map((p, i) => {
    const m = p.match(/^\{(\w+):([^}]+)\}$/)
    if (!m) return <span key={i}>{p}</span>
    return (
      <span key={i} className={styles.tagged} style={roleStyle(m[1])}>
        <span className={styles.taggedText}>{m[2]}</span>
        <span className={styles.taggedCode} aria-hidden="true">{m[1]}</span>
      </span>
    )
  })
}

function Studs({ count }) {
  return (
    <span className={styles.studs} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={styles.stud} />
      ))}
    </span>
  )
}

function Brick({ code, text, small }) {
  const r = ROLES[code]
  const studCount = Math.max(2, Math.min(5, Math.ceil(text.length / 5)))
  return (
    <span className={`${styles.brick} ${small ? styles.brickSmall : ''}`} style={roleStyle(code)}>
      <Studs count={studCount} />
      <span className={styles.brickCode}>{r.code}</span>
      <span className={styles.brickText}>{text}</span>
    </span>
  )
}

function SectionHead({ icon, title, sub, id }) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionIcon} aria-hidden="true">{icon}</span>
      <div>
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {sub && <p className={styles.sectionSub}>{sub}</p>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function PatternBoard() {
  const [key, setKey] = useState('svo')
  const p = PATTERNS.find((x) => x.key === key)

  return (
    <section className={styles.board} aria-labelledby="ss-board-title">
      <div className={styles.boardTop}>
        <div>
          <p className={styles.eyebrow}>Brick kit</p>
          <h2 id="ss-board-title" className={styles.boardTitle}>5 + 1 mẫu câu cơ bản</h2>
        </div>
        <ul className={styles.legend} aria-label="Chú thích màu">
          {LEGEND.map((c) => (
            <li key={c} className={styles.legendItem}>
              <span className={styles.legendSwatch} style={roleStyle(c)}>{c}</span>
              <span>{ROLES[c].vi}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.patternTabs} role="group" aria-label="Chọn mẫu câu">
        {PATTERNS.map((x) => (
          <button
            key={x.key}
            type="button"
            className={styles.patternTab}
            aria-pressed={x.key === key}
            onClick={() => setKey(x.key)}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className={styles.plate} aria-live="polite">
        <div className={styles.stack} key={p.key}>
          {p.bricks.map(([code, text], i) => (
            <span key={code + text} className={styles.drop} style={{ '--i': i }}>
              <Brick code={code} text={text} />
            </span>
          ))}
          <span className={styles.periodPeg} aria-hidden="true">.</span>
        </div>
        <p className={styles.verbType}>{p.verbType}</p>
      </div>

      <div className={styles.patternBody}>
        <p className={styles.usage}>{p.usage}</p>
        <ul className={styles.exList}>
          {p.examples.map((ex) => (
            <li key={ex.en} className={styles.exItem}>
              <p className={styles.exEn}><RoleText text={ex.en} /></p>
              <p className={styles.exVi}>{ex.vi}</p>
            </li>
          ))}
        </ul>
        <p className={styles.tip}>
          <BulbOutlined aria-hidden="true" className={styles.tipIcon} />
          <span>{p.tip}</span>
        </p>
        <p className={styles.note}>Phần không tô màu là thành phần tùy chọn (thời gian, nơi chốn thêm vào) — bỏ đi câu vẫn đúng.</p>
      </div>
    </section>
  )
}

function Builder() {
  const [index, setIndex] = useState(0)
  const [order, setOrder] = useState(() => shuffledOrder(PUZZLES[0].chunks.length))
  const [slots, setSlots] = useState(() => Array(PUZZLES[0].chunks.length).fill(null))
  const [hint, setHint] = useState(false)
  const [solved, setSolved] = useState([])

  const puzzle = PUZZLES[index]
  const full = slots.every((s) => s !== null)
  const slotOk = slots.map((s, i) => s !== null && puzzle.chunks[s][0] === puzzle.chunks[i][0])
  const allOk = full && slotOk.every(Boolean)
  const tray = order.filter((c) => !slots.includes(c))

  const place = (chunk) => {
    setSlots((prev) => {
      const free = prev.indexOf(null)
      if (free < 0 || prev.includes(chunk)) return prev
      const next = [...prev]
      next[free] = chunk
      return next
    })
  }

  const removeAt = (i) => {
    setSlots((prev) => prev.map((s, k) => (k === i ? null : s)))
  }

  if (allOk && !solved.includes(index)) {
    setSolved((v) => (v.includes(index) ? v : [...v, index]))
  }

  const load = (i) => {
    const n = PUZZLES[i].chunks.length
    setIndex(i)
    setOrder(shuffledOrder(n))
    setSlots(Array(n).fill(null))
  }

  const sentence = `${puzzle.chunks.map((c) => c[1]).join(' ')}.`

  return (
    <section className={styles.builder} aria-labelledby="ss-builder-title">
      <SectionHead
        id="ss-builder-title"
        icon={<BuildOutlined />}
        title="Sentence builder"
        sub="Bấm các khối từ để lắp vào ô theo đúng mẫu. Bấm khối đã lắp để tháo ra."
      />

      <div className={styles.builderBar}>
        <span className={styles.patternChip}>Mẫu: <strong>{puzzle.pattern}</strong></span>
        <span className={styles.counter}>Câu {index + 1}/{PUZZLES.length} · đã xây {solved.length}</span>
        <label className={styles.hintToggle}>
          <Switch size="small" checked={hint} onChange={setHint} aria-label="Tô màu khối trong khay" />
          <span>Gợi ý màu</span>
        </label>
      </div>

      <ol className={styles.slots} aria-label="Các ô của câu">
        {puzzle.chunks.map(([code], i) => {
          const filled = slots[i]
          const state = full ? (slotOk[i] ? styles.slotOk : styles.slotBad) : ''
          return (
            <li key={i} className={`${styles.slot} ${state}`} style={roleStyle(code)}>
              <span className={styles.slotLabel}>{code} · {ROLES[code].vi}</span>
              {filled === null ? (
                <span className={styles.slotEmpty} aria-label={`Ô trống ${code}`}>
                  <Studs count={3} />
                </span>
              ) : (
                <button
                  type="button"
                  className={styles.placed}
                  onClick={() => removeAt(i)}
                  aria-label={`Tháo khối “${puzzle.chunks[filled][1]}” khỏi ô ${code}`}
                >
                  <Brick code={puzzle.chunks[filled][0]} text={puzzle.chunks[filled][1]} small />
                </button>
              )}
              {full && (
                <span className={styles.slotMark} aria-hidden="true">
                  {slotOk[i] ? <CheckCircleFilled /> : <CloseCircleFilled />}
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <div className={styles.tray} aria-label="Khay khối từ">
        {tray.length === 0 && <span className={styles.trayEmpty}>Khay trống</span>}
        {tray.map((c) => (
          <button
            key={c}
            type="button"
            className={`${styles.trayBrick} ${hint ? '' : styles.unpainted}`}
            style={roleStyle(puzzle.chunks[c][0])}
            onClick={() => place(c)}
          >
            <Studs count={2} />
            {puzzle.chunks[c][1]}
          </button>
        ))}
      </div>

      <div className={styles.builderFeedback} aria-live="polite">
        {full && allOk && (
          <p className={styles.fbOk}>
            <CheckCircleFilled aria-hidden="true" /> Khớp hoàn hảo! <strong>{sentence}</strong>
            <span className={styles.fbVi}>{puzzle.vi}</span>
          </p>
        )}
        {full && !allOk && (
          <p className={styles.fbBad}>
            <CloseCircleFilled aria-hidden="true" /> Có khối nằm sai ô — màu khối phải trùng màu ô. Bấm khối sai để tháo ra và thử lại.
          </p>
        )}
      </div>

      <div className={styles.builderActions}>
        <Button icon={<UndoOutlined />} onClick={() => setSlots(Array(puzzle.chunks.length).fill(null))}>
          Tháo hết
        </Button>
        <Button
          type="primary"
          className={styles.brickBtn}
          icon={<RightOutlined />}
          iconPlacement="end"
          onClick={() => load((index + 1) % PUZZLES.length)}
        >
          Câu tiếp
        </Button>
      </div>
    </section>
  )
}

function SentenceTypes() {
  const [key, setKey] = useState('simple')
  const t = SENTENCE_TYPES.find((x) => x.key === key)

  return (
    <section className={styles.types} aria-labelledby="ss-types-title">
      <SectionHead
        id="ss-types-title"
        icon={<ApartmentOutlined />}
        title="4 loại câu theo số mệnh đề"
        sub="Mệnh đề độc lập (IC) là khối nền; mệnh đề phụ (DC) phải gắn vào khối nền; từ nối là chốt ghép."
      />
      <div className={styles.pinRow} role="group" aria-label="Chọn loại câu">
        {SENTENCE_TYPES.map((x) => (
          <button
            key={x.key}
            type="button"
            className={styles.pinBtn}
            aria-pressed={x.key === key}
            onClick={() => setKey(x.key)}
          >
            {x.vi}
          </button>
        ))}
      </div>

      <div className={styles.typeCard}>
        <div className={styles.typeHead}>
          <h3 className={styles.typeName}>{t.name}</h3>
          <code className={styles.typeFormula}>{t.formula}</code>
        </div>
        <p className={styles.typeDesc}>{t.desc}</p>

        <div className={styles.diagram} aria-hidden="true">
          {t.parts.map((part, i) => (
            <span key={i} className={`${styles.dPart} ${styles[`d_${part.k}`]}`}>
              <span className={styles.dLabel}>{part.k === 'cj' ? 'chốt' : part.k.toUpperCase()}</span>
              <span className={styles.dText}>{part.t}</span>
            </span>
          ))}
        </div>

        <p className={styles.typeSentence}>
          {t.parts.map((part, i) => (
            <span key={i}>
              <mark className={styles[`m_${part.k}`]} title={PART_LABEL[part.k]}>{part.t}</mark>
              {i < t.parts.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
        <p className={styles.typeTrans}>{t.trans}</p>
        <p className={styles.dLegend}>
          <mark className={styles.m_ic}>IC · mệnh đề độc lập</mark>
          <mark className={styles.m_dc}>DC · mệnh đề phụ</mark>
          <mark className={styles.m_cj}>từ nối</mark>
        </p>
      </div>
    </section>
  )
}

function PhraseClause() {
  return (
    <section className={styles.pc} aria-labelledby="ss-pc-title">
      <h2 id="ss-pc-title" className={styles.pcTitle}>Phrase vs Clause</h2>
      <p className={styles.pcRule}>
        Mẹo: tìm cặp <span className={styles.inlineS}>S</span> + <span className={styles.inlineV}>V chia thì</span>.
        Có → <strong>clause</strong> (mệnh đề). Không có → <strong>phrase</strong> (cụm từ).
      </p>
      <div className={styles.pcGrid}>
        <div className={styles.pcCol}>
          <h3 className={styles.pcHead}>Phrase · tấm phẳng, không có S + V</h3>
          <ul className={styles.pcList}>
            {PHRASES.map((p) => (
              <li key={p.kind} className={styles.tile}>
                <span className={styles.tileText}>{p.ex}</span>
                <span className={styles.tileKind}>{p.kind} · {p.vi}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.pcCol}>
          <h3 className={styles.pcHead}>Clause · khối có chốt S + V</h3>
          <ul className={styles.pcList}>
            {CLAUSES.map((c) => (
              <li key={c.kind} className={styles.clauseBrick}>
                <span className={styles.clauseLine}>
                  {c.lead && <span className={styles.lead}>{c.lead}</span>}
                  <span className={styles.cS}>{c.s}</span>
                  <span className={styles.cV}>{c.v}</span>
                  {c.rest && <span>{c.rest}</span>}
                </span>
                <span className={styles.tileKind}>{c.kind} · {c.vi}</span>
              </li>
            ))}
          </ul>
          <p className={styles.pcNote}>“to learn English”, “walking home” có động từ nhưng không chia thì và không có chủ ngữ → vẫn là phrase.</p>
        </div>
      </div>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.mistakes} aria-labelledby="ss-mistakes-title">
      <SectionHead id="ss-mistakes-title" icon={<WarningOutlined />} title="Lỗi hay gặp" sub="Người Việt hay “dịch thẳng” cấu trúc câu — đây là các lỗi điển hình." />
      <ul className={styles.mList}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mItem}>
            <p className={styles.mBad}><span aria-hidden="true">❌</span> <s>{m.bad}</s></p>
            <p className={styles.mGood}><span aria-hidden="true">✅</span> {m.good}</p>
            <p className={styles.mWhy}>{m.why}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SentenceStructure() {
  return (
    <div className={styles.page}>
      <PatternBoard />
      <Builder />
      <SentenceTypes />
      <PhraseClause />
      <Mistakes />
    </div>
  )
}
