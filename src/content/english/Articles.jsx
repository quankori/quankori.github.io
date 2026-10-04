import { useState } from 'react'
import { Button, Segmented, Select } from 'antd'
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ReloadOutlined,
  SoundOutlined,
  UndoOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './Articles.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: [the] highlighted · [Ø] zero-article chip          */
/* ------------------------------------------------------------------ */

const LEAVES = {
  a: { label: 'a', color: '#d9480f', x: 40, y: 404, title: 'a + phụ âm', vi: 'Danh từ đếm được, số ít, chưa xác định, từ sau bắt đầu bằng ÂM phụ âm.' },
  an: { label: 'an', color: '#7048e8', x: 190, y: 404, title: 'an + nguyên âm', vi: 'Danh từ đếm được, số ít, chưa xác định, từ sau bắt đầu bằng ÂM nguyên âm.' },
  the: { label: 'the', color: '#0c8a5f', x: 300, y: 404, title: 'the — xác định', vi: 'Người nghe biết rõ là cái nào: đã nhắc tới, duy nhất, rõ trong ngữ cảnh…' },
  zero: { label: 'Ø', color: '#52606d', x: 450, y: 404, title: 'Ø — không mạo từ', vi: 'Danh từ số nhiều hoặc không đếm được, nói chung chung.' },
}

const NODES = {
  n1: {
    x: 260, y: 40, short: 'Đếm được?',
    q: 'Danh từ này có đếm được không?',
    help: 'Đếm được: book, idea, hour. Không đếm được: water, advice, music.',
    options: [
      { label: 'Có, đếm được', edge: 'Có', to: 'n2' },
      { label: 'Không đếm được', edge: 'Không', to: 'n5' },
    ],
  },
  n2: {
    x: 150, y: 130, short: 'Số ít?',
    q: 'Danh từ đang ở số ít hay số nhiều?',
    help: 'Số ít: a cat. Số nhiều: cats.',
    options: [
      { label: 'Số ít', edge: 'Số ít', to: 'n3' },
      { label: 'Số nhiều', edge: 'Số nhiều', to: 'n5' },
    ],
  },
  n3: {
    x: 110, y: 222, short: 'Xác định?',
    q: 'Người nghe đã biết là cái nào chưa?',
    help: 'Đã nhắc tới, duy nhất (the sun), rõ trong ngữ cảnh (the door), so sánh nhất, số thứ tự…',
    options: [
      { label: 'Đã biết / duy nhất', edge: 'Có', to: 'the' },
      { label: 'Chưa — một cái bất kỳ', edge: 'Không', to: 'n4' },
    ],
  },
  n4: {
    x: 110, y: 312, short: 'Âm đầu?',
    q: 'Từ ngay sau mạo từ bắt đầu bằng ÂM gì?',
    help: 'Nghe ÂM, không nhìn chữ: an hour (/aʊ/), a university (/juː/).',
    options: [
      { label: 'Âm nguyên âm', edge: 'Nguyên âm', to: 'an' },
      { label: 'Âm phụ âm (kể cả /j/, /w/)', edge: 'Phụ âm', to: 'a' },
    ],
  },
  n5: {
    x: 390, y: 222, short: 'Xác định?',
    q: 'Đang nói về cái cụ thể người nghe biết, hay nói chung?',
    help: 'Cụ thể: the keys I gave you. Nói chung: Dogs are loyal. Water is essential.',
    options: [
      { label: 'Cụ thể, đã xác định', edge: 'Có', to: 'the' },
      { label: 'Nói chung chung', edge: 'Không', to: 'zero' },
    ],
  },
}

const SCENARIOS = [
  { key: 'free', sentence: null, label: 'Tự do (không có câu mẫu)' },
  { key: 'elephant', sentence: 'I saw ___ elephant at the zoo.', answer: 'an', path: { n1: 0, n2: 0, n3: 1, n4: 0 }, why: '"elephant" đếm được, số ít, nhắc lần đầu và bắt đầu bằng âm /e/.' },
  { key: 'sun', sentence: '___ sun rises in the east.', answer: 'the', path: { n1: 0, n2: 0, n3: 0 }, why: 'Chỉ có một mặt trời → duy nhất → the.' },
  { key: 'uni', sentence: 'She is ___ university student.', answer: 'a', path: { n1: 0, n2: 0, n3: 1, n4: 1 }, why: '"university" đọc /juː/ — âm phụ âm /j/ → a.' },
  { key: 'water', sentence: '___ water is essential for life.', answer: 'zero', path: { n1: 1, n5: 1 }, why: 'Nước nói chung (không đếm được, không cụ thể) → không mạo từ.' },
  { key: 'salt', sentence: 'Can you pass me ___ salt, please?', answer: 'the', path: { n1: 1, n5: 0 }, why: 'Lọ muối trên bàn mà cả hai cùng thấy → xác định → the.' },
  { key: 'hour', sentence: 'We waited for ___ hour.', answer: 'an', path: { n1: 0, n2: 0, n3: 1, n4: 0 }, why: '"hour" có h câm, âm đầu là /aʊ/ → an.' },
  { key: 'dogs', sentence: '___ dogs are loyal animals.', answer: 'zero', path: { n1: 0, n2: 1, n5: 1 }, why: 'Chó nói chung (số nhiều, khái quát) → không mạo từ.' },
  { key: 'keys', sentence: 'Where are ___ keys I gave you?', answer: 'the', path: { n1: 0, n2: 1, n5: 0 }, why: 'Những chiếc chìa khóa cụ thể ("I gave you") → the.' },
]

const SOUND_WORDS = [
  { w: 'hour', art: 'an', ipa: '/ˈaʊə/', note: 'h câm → âm đầu /aʊ/' },
  { w: 'university', art: 'a', ipa: '/ˌjuːnɪˈvɜːsəti/', note: 'u đọc /juː/ → âm /j/' },
  { w: 'MBA', art: 'an', ipa: '/ˌem biː ˈeɪ/', note: 'chữ M đọc /em/' },
  { w: 'European', art: 'a', ipa: '/ˌjʊərəˈpiːən/', note: 'Eu đọc /jʊə/ → âm /j/' },
  { w: 'honest man', art: 'an', ipa: '/ˈɒnɪst/', note: 'h câm → âm /ɒ/' },
  { w: 'one-way ticket', art: 'a', ipa: '/ˌwʌn ˈweɪ/', note: 'one đọc /wʌn/ → âm /w/' },
  { w: 'umbrella', art: 'an', ipa: '/ʌmˈbrelə/', note: 'u đọc /ʌ/ → nguyên âm' },
  { w: 'UFO', art: 'a', ipa: '/ˌjuː ef ˈəʊ/', note: 'U đọc /juː/' },
  { w: 'X-ray', art: 'an', ipa: '/ˈeks reɪ/', note: 'X đọc /eks/' },
  { w: 'horse', art: 'a', ipa: '/hɔːs/', note: 'h được phát âm' },
  { w: 'FBI agent', art: 'an', ipa: '/ˌef biː ˈaɪ/', note: 'F đọc /ef/' },
  { w: 'useful tip', art: 'a', ipa: '/ˈjuːsfl/', note: 'u đọc /juː/' },
]

const THE_USES = [
  { title: 'Đã nhắc tới trước đó', ex: 'I bought a book and a pen. [The] book is great.' },
  { title: 'Duy nhất', ex: '[the] sun, [the] moon, [the] internet, [the] world' },
  { title: 'Rõ trong ngữ cảnh', ex: 'Could you close [the] door, please?', note: 'Cánh cửa của căn phòng hai người đang ngồi.' },
  { title: 'So sánh nhất', ex: 'It’s [the] tallest building in Vietnam.' },
  { title: 'Số thứ tự · only · same', ex: '[the] first time, [the] only way, [the] same day' },
  { title: 'Sông, biển, đại dương, dãy núi, sa mạc', ex: '[the] Mekong, [the] Pacific, [the] Alps, [the] Sahara', note: 'Nhưng đỉnh núi và hồ đơn lẻ thì không: Mount Fansipan, Lake Toba.' },
  { title: 'Tên nước số nhiều / có Republic, Kingdom, States', ex: '[the] USA, [the] UK, [the] Philippines, [the] Netherlands' },
  { title: 'the + tính từ = nhóm người', ex: '[the] rich, [the] poor, [the] elderly', note: 'Đi với động từ số nhiều: The rich are getting richer.' },
  { title: 'Nhạc cụ', ex: 'She plays [the] piano and [the] guitar.', note: 'Nhưng thể thao không có the: play football.' },
  { title: 'the + họ số nhiều = cả gia đình', ex: '[the] Nguyens, [the] Smiths' },
]

const ZERO_USES = [
  { title: 'Số nhiều / không đếm được, nói chung', ex: '[Ø] Cats are independent. [Ø] Music makes me happy.', note: 'Cụ thể thì dùng the: The music in this café is too loud.' },
  { title: 'Bữa ăn', ex: 'We have [Ø] dinner at seven.', note: 'Nhưng: The dinner we had last night was great. / a big lunch.' },
  { title: 'Ngôn ngữ, môn học', ex: 'She speaks [Ø] Japanese. I study [Ø] maths.', note: 'the Japanese = người Nhật (nói chung).' },
  { title: 'Hầu hết tên nước, thành phố, châu lục, đường phố', ex: 'I live in [Ø] Hanoi, [Ø] Vietnam, in [Ø] Asia.' },
  { title: 'Phương tiện với "by"', ex: 'go [Ø] by bus / by car / by plane', note: 'Nhưng: on foot; take the bus; in my car.' },
  { title: 'Thể thao, trò chơi', ex: 'play [Ø] football, play [Ø] chess' },
  { title: 'Thứ, tháng, năm', ex: 'on [Ø] Monday, in [Ø] July, in [Ø] 2026', note: 'Mùa dùng được cả hai: in summer / in the summer.' },
]

const PLACES = [
  { place: 'school', purpose: { en: 'go to [Ø] school', vi: 'đi học (với tư cách học sinh)' }, building: { en: 'go to [the] school', vi: 'đến trường vì việc khác, vd. họp phụ huynh' } },
  { place: 'university', purpose: { en: 'go to [Ø] university', vi: 'học đại học' }, building: { en: 'visit [the] university', vi: 'đến khuôn viên trường (tham quan, gặp ai đó)' } },
  { place: 'bed', purpose: { en: 'go to [Ø] bed', vi: 'đi ngủ' }, building: { en: 'sit on [the] bed', vi: 'ngồi lên cái giường' } },
  { place: 'hospital', purpose: { en: 'be in [Ø] hospital', vi: 'nằm viện (là bệnh nhân — Anh-Anh; Anh-Mỹ hay nói "in the hospital")' }, building: { en: 'visit someone at [the] hospital', vi: 'vào viện thăm người bệnh' } },
  { place: 'church', purpose: { en: 'go to [Ø] church', vi: 'đi lễ nhà thờ' }, building: { en: 'visit [the] church', vi: 'tham quan tòa nhà thờ' } },
  { place: 'prison', purpose: { en: 'go to [Ø] prison', vi: 'bị đi tù' }, building: { en: 'go to [the] prison', vi: 'đến nhà tù (để thăm ai đó)' } },
]

const MISTAKES = [
  { bad: 'She is teacher.', good: 'She is [a] teacher.', why: 'Nghề nghiệp với danh từ số ít đếm được cần a/an.' },
  { bad: 'He studies at an university.', good: 'He studies at [a] university.', why: '"university" bắt đầu bằng âm /j/ (phụ âm) → a.' },
  { bad: 'I’ll be back in a hour.', good: 'I’ll be back in [an] hour.', why: 'h câm → âm nguyên âm → an.' },
  { bad: 'The life is beautiful.', good: '[Life] is beautiful.', why: 'Nói về cuộc sống nói chung → không mạo từ.' },
  { bad: 'I play the football.', good: 'I play [football].', why: 'Thể thao không có the (nhạc cụ thì có: play the piano).' },
  { bad: 'I go to the bed at 11.', good: 'I go to [bed] at 11.', why: 'go to bed = đi ngủ (đúng mục đích) → không mạo từ.' },
  { bad: 'He is best student in class.', good: 'He is [the best] student in the class.', why: 'So sánh nhất luôn có the.' },
  { bad: 'We travelled by the train.', good: 'We travelled [by train].', why: 'by + phương tiện → không mạo từ.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Marked({ text }) {
  return text.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) => {
    if (!p.startsWith('[')) return <span key={i}>{p}</span>
    const inner = p.slice(1, -1)
    if (inner === 'Ø') return <span key={i} className={styles.zeroChip} aria-label="không mạo từ">Ø</span>
    return <mark key={i} className={styles.mark}>{inner}</mark>
  })
}

function SectionHead({ id, icon, title, sub, tone }) {
  return (
    <header className={styles.sectionHead}>
      <span className={styles.lineBadge} style={{ background: tone || '#1f2933' }} aria-hidden="true">{icon}</span>
      <div>
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {sub && <p className={styles.sectionSub}>{sub}</p>}
      </div>
    </header>
  )
}

const EDGES = Object.entries(NODES).flatMap(([from, node]) =>
  node.options.map((opt, i) => ({ key: `${from}-${i}`, from, i, to: opt.to, label: opt.edge })),
)

function pos(id) {
  return NODES[id] || LEAVES[id]
}

/* ------------------------------------------------------------------ */
/*  Signature: decision flowchart (metro map)                          */
/* ------------------------------------------------------------------ */

function FlowMap({ path, current }) {
  const leaf = LEAVES[current] ? current : null
  const tone = leaf ? LEAVES[leaf].color : '#1f2933'
  const litEdges = new Set(path.map(([n, i]) => `${n}-${i}`))
  const visited = new Set(path.map(([n]) => n))

  return (
    <svg viewBox="0 0 520 440" className={styles.map} role="img" aria-label="Sơ đồ quyết định chọn a, an, the hoặc không mạo từ">
      {EDGES.map((e) => {
        const a = pos(e.from)
        const b = pos(e.to)
        const lit = litEdges.has(e.key)
        return (
          <line
            key={e.key}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            className={lit ? styles.edgeLit : styles.edge}
            style={lit ? { stroke: tone } : undefined}
          />
        )
      })}
      {EDGES.map((e) => {
        const a = pos(e.from)
        const b = pos(e.to)
        const mx = a.x + (b.x - a.x) * 0.5
        const my = a.y + (b.y - a.y) * 0.5
        const lit = litEdges.has(e.key)
        const w = e.label.length * 7 + 14
        return (
          <g key={`${e.key}-l`} className={lit ? styles.edgeLabelLit : styles.edgeLabel}>
            <rect x={mx - w / 2} y={my - 10} width={w} height={20} rx={10} style={lit ? { fill: tone } : undefined} />
            <text x={mx} y={my + 4} textAnchor="middle">{e.label}</text>
          </g>
        )
      })}
      {Object.entries(NODES).map(([id, n]) => {
        const isNow = current === id
        const done = visited.has(id)
        let cls = styles.station
        if (isNow) cls += ` ${styles.stationNow}`
        else if (done) cls += ` ${styles.stationDone}`
        return (
          <g key={id} className={cls}>
            <rect x={n.x - 56} y={n.y - 18} width={112} height={36} rx={18} style={done && !isNow ? { stroke: tone } : undefined} />
            <text x={n.x} y={n.y + 5} textAnchor="middle">{n.short}</text>
          </g>
        )
      })}
      {Object.entries(LEAVES).map(([id, l]) => {
        const on = leaf === id
        return (
          <g key={id} className={on ? styles.terminalOn : styles.terminal}>
            <circle cx={l.x} cy={l.y} r={on ? 30 : 25} style={{ fill: on ? l.color : '#fff', stroke: l.color }} />
            <text x={l.x} y={l.y + 7} textAnchor="middle" style={{ fill: on ? '#fff' : l.color }}>{l.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function FlowChart() {
  const [path, setPath] = useState([])
  const [scenarioKey, setScenarioKey] = useState('elephant')
  const scenario = SCENARIOS.find((s) => s.key === scenarioKey)

  const current = path.length ? NODES[path[path.length - 1][0]].options[path[path.length - 1][1]].to : 'n1'
  const node = NODES[current]
  const leaf = LEAVES[current]

  const answer = (i) => setPath((p) => [...p, [current, i]])
  const undo = () => setPath((p) => p.slice(0, -1))
  const restart = () => setPath([])
  const pickScenario = (k) => {
    setScenarioKey(k)
    setPath([])
  }

  let verdict = null
  if (leaf && scenario.sentence) {
    if (current === scenario.answer) {
      verdict = { ok: true, text: scenario.why }
    } else {
      const wrong = path.find(([n, i]) => scenario.path[n] !== undefined && scenario.path[n] !== i)
      const hint = wrong ? `Xem lại bước “${NODES[wrong[0]].short}”: nên chọn “${NODES[wrong[0]].options[scenario.path[wrong[0]]].label}”. ` : ''
      verdict = { ok: false, text: `${hint}${scenario.why}` }
    }
  }

  const filled = scenario.sentence
    ? scenario.sentence.split('___').map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && (
            <span className={leaf ? styles.blankFilled : styles.blank} style={leaf ? { background: leaf.color } : undefined}>
              {leaf ? leaf.label : '___'}
            </span>
          )}
        </span>
      ))
    : null

  return (
    <section className={styles.hero} aria-labelledby="art-flow-title">
      <div className={styles.heroHead}>
        <div>
          <span className={styles.eyebrow}>Decision map</span>
          <h2 id="art-flow-title" className={styles.heroTitle}>Đi theo tuyến để chọn mạo từ</h2>
        </div>
        <label className={styles.scenarioPick}>
          <span>Câu mẫu</span>
          <Select
            value={scenarioKey}
            onChange={pickScenario}
            options={SCENARIOS.map((s) => ({ value: s.key, label: s.sentence || s.label }))}
            className={styles.select}
            popupMatchSelectWidth={false}
            aria-label="Chọn câu mẫu"
          />
        </label>
      </div>

      {filled && <p className={styles.sentence} aria-live="polite">{filled}</p>}

      <div className={styles.heroBody}>
        <div className={styles.mapWrap}>
          <FlowMap path={path} current={current} />
        </div>

        <div className={styles.panel} aria-live="polite">
          {node ? (
            <>
              <p className={styles.stepNo}>Bước {path.length + 1}</p>
              <h3 className={styles.question}>{node.q}</h3>
              <p className={styles.help}>{node.help}</p>
              <div className={styles.answers}>
                {node.options.map((opt, i) => (
                  <button key={opt.label} type="button" className={styles.answerBtn} onClick={() => answer(i)}>
                    <span>{opt.label}</span>
                    <ArrowRightOutlined aria-hidden="true" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.arrival} style={{ '--tone': leaf.color }}>
              <p className={styles.stepNo}>Ga cuối</p>
              <p className={styles.arrivalWord}>{leaf.label}</p>
              <h3 className={styles.question}>{leaf.title}</h3>
              <p className={styles.help}>{leaf.vi}</p>
              {verdict && (
                <p className={verdict.ok ? styles.verdictOk : styles.verdictBad}>
                  {verdict.ok ? <CheckCircleFilled aria-hidden="true" /> : <CloseCircleFilled aria-hidden="true" />}{' '}
                  {verdict.ok ? 'Đúng tuyến! ' : `Chưa đúng — đáp án là “${LEAVES[scenario.answer].label}”. `}
                  {verdict.text}
                </p>
              )}
            </div>
          )}

          {path.length > 0 && (
            <ol className={styles.trail} aria-label="Các bước đã chọn">
              {path.map(([n, i]) => (
                <li key={n}>
                  <span>{NODES[n].short}</span> <strong>{NODES[n].options[i].edge}</strong>
                </li>
              ))}
            </ol>
          )}

          <div className={styles.panelActions}>
            <Button icon={<UndoOutlined />} onClick={undo} disabled={!path.length}>Quay lại</Button>
            <Button icon={<ReloadOutlined />} onClick={restart} disabled={!path.length}>Đi lại từ đầu</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  A vs AN by sound                                                   */
/* ------------------------------------------------------------------ */

function SoundBoard() {
  const [open, setOpen] = useState({})
  const allOpen = SOUND_WORDS.every((s) => open[s.w])
  return (
    <section className={styles.card} aria-labelledby="art-sound-title">
      <SectionHead
        id="art-sound-title"
        icon={<SoundOutlined />}
        tone="#7048e8"
        title="A hay AN? Nghe ÂM, đừng nhìn chữ"
        sub="Bấm vào từng thẻ để đoán rồi lật xem đáp án."
      />
      <div className={styles.rulePair}>
        <p><strong className={styles.aTag}>a</strong> + âm phụ âm: a book, a <u>u</u>niversity /j/, a <u>o</u>ne-way ticket /w/</p>
        <p><strong className={styles.anTag}>an</strong> + âm nguyên âm: an apple, an <u>h</u>our (h câm), an <u>M</u>BA /em/</p>
      </div>
      <ul className={styles.soundGrid}>
        {SOUND_WORDS.map((s) => {
          const isOpen = !!open[s.w]
          return (
            <li key={s.w}>
              <button
                type="button"
                className={`${styles.sound} ${isOpen ? (s.art === 'an' ? styles.soundAn : styles.soundA) : ''}`}
                aria-expanded={isOpen}
                onClick={() => setOpen((o) => ({ ...o, [s.w]: !o[s.w] }))}
              >
                <span className={styles.soundArt}>{isOpen ? s.art : '?'}</span>
                <span className={styles.soundWord}>{s.w}</span>
                <span className={styles.soundIpa}>{isOpen ? `${s.ipa} · ${s.note}` : 'bấm để lật'}</span>
              </button>
            </li>
          )
        })}
      </ul>
      <Button
        className={styles.flipAll}
        onClick={() => setOpen(allOpen ? {} : Object.fromEntries(SOUND_WORDS.map((s) => [s.w, true])))}
      >
        {allOpen ? 'Úp tất cả' : 'Lật tất cả'}
      </Button>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  The / zero lists                                                   */
/* ------------------------------------------------------------------ */

function UseList({ id, title, sub, items, tone, icon }) {
  return (
    <section className={styles.card} aria-labelledby={id}>
      <SectionHead id={id} icon={icon} tone={tone} title={title} sub={sub} />
      <ol className={styles.uses} style={{ '--tone': tone }}>
        {items.map((u, i) => (
          <li key={u.title} className={styles.use}>
            <span className={styles.useStop} aria-hidden="true">{i + 1}</span>
            <div className={styles.useBody}>
              <h3 className={styles.useTitle}>{u.title}</h3>
              <p className={styles.useEx}><Marked text={u.ex} /></p>
              {u.note && <p className={styles.useNote}>{u.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Places() {
  const [mode, setMode] = useState('purpose')
  return (
    <section className={styles.card} aria-labelledby="art-places-title">
      <SectionHead
        id="art-places-title"
        icon="🏫"
        tone="#52606d"
        title="go to school hay go to the school?"
        sub="Đến nơi đó đúng mục đích chính → không mạo từ. Chỉ nhắc tới tòa nhà / địa điểm → the."
      />
      <Segmented
        value={mode}
        onChange={setMode}
        options={[
          { value: 'purpose', label: 'Đúng mục đích (Ø)' },
          { value: 'building', label: 'Tòa nhà, địa điểm (the)' },
        ]}
        className={styles.segment}
      />
      <ul className={styles.placeGrid} aria-live="polite">
        {PLACES.map((p) => (
          <li key={p.place} className={`${styles.place} ${mode === 'building' ? styles.placeThe : ''}`}>
            <span className={styles.placeName}>{p.place}</span>
            <span className={styles.placeEn}><Marked text={p[mode].en} /></span>
            <span className={styles.placeVi}>{p[mode].vi}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.card} aria-labelledby="art-mistakes-title">
      <SectionHead id="art-mistakes-title" icon={<WarningOutlined />} tone="#c92a2a" title="Lỗi hay gặp" sub="Tiếng Việt không có mạo từ nên rất dễ bỏ sót hoặc thêm thừa." />
      <ul className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mistake}>
            <p className={styles.bad}><span aria-hidden="true">❌</span> <s>{m.bad}</s></p>
            <p className={styles.good}><span aria-hidden="true">✅</span> <Marked text={m.good} /></p>
            <p className={styles.why}>{m.why}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Articles() {
  return (
    <div className={styles.page}>
      <FlowChart />
      <SoundBoard />
      <UseList
        id="art-the-title"
        icon="the"
        tone="#0c8a5f"
        title="Khi nào dùng THE"
        sub="the = “cái đó đấy” — người nói và người nghe cùng biết là cái nào."
        items={THE_USES}
      />
      <UseList
        id="art-zero-title"
        icon="Ø"
        tone="#52606d"
        title="Khi nào KHÔNG dùng mạo từ (Ø)"
        sub="Nói chung chung, hoặc những cụm cố định."
        items={ZERO_USES}
      />
      <Places />
      <Mistakes />
    </div>
  )
}
