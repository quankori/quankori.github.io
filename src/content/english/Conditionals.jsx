import { useState } from 'react'
import { Select, Switch } from 'antd'
import {
  BulbOutlined,
  ExperimentOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import styles from './Conditionals.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: [if-clause]  {main clause}                         */
/*  Builder markup: *verb* is shown in bold                            */
/* ------------------------------------------------------------------ */

const TYPES = [
  {
    key: 'zero',
    badge: '0',
    name: 'Zero conditional',
    vi: 'Loại 0',
    reality: 97,
    meter: 'Luôn đúng',
    color: '#15803d',
    glow: '#4ade80',
    time: 'Sự thật hiển nhiên · thói quen',
    ifFormula: 'If + S + V(s/es)',
    ifTense: 'present simple',
    mainFormula: 'S + V(s/es)',
    mainTense: 'present simple',
    usage:
      'Dùng cho sự thật hiển nhiên, quy luật khoa học hoặc thói quen: hễ điều kiện xảy ra thì kết quả chắc chắn xảy ra.',
    examples: [
      { en: '[If you heat ice], {it melts}.', vi: 'Nếu bạn làm nóng nước đá, nó sẽ tan.' },
      { en: '[If I drink coffee at night], {I can’t sleep}.', vi: 'Hễ uống cà phê buổi tối là tôi không ngủ được.' },
      { en: '{Plants die} [if they don’t get enough light].', vi: 'Cây sẽ chết nếu không có đủ ánh sáng.' },
    ],
    tip: {
      title: 'If ≈ When',
      body: 'Ở loại 0 có thể thay "if" bằng "when / whenever" mà nghĩa gần như không đổi: When you heat ice, it melts. Cả hai mệnh đề đều ở hiện tại đơn.',
    },
  },
  {
    key: 'first',
    badge: '1',
    name: 'First conditional',
    vi: 'Loại 1',
    reality: 75,
    meter: 'Có thể xảy ra',
    color: '#0e7490',
    glow: '#22d3ee',
    time: 'Hiện tại · tương lai',
    ifFormula: 'If + S + V(s/es)',
    ifTense: 'present simple',
    mainFormula: 'S + will / can / may + V',
    mainTense: 'future / modal',
    usage:
      'Dùng khi nói về một điều có thể xảy ra ở hiện tại hoặc tương lai và kết quả có khả năng đi kèm. Hay dùng để hứa hẹn, cảnh báo, đe dọa.',
    examples: [
      { en: '[If it rains tomorrow], {we will stay at home}.', vi: 'Nếu mai trời mưa, chúng tôi sẽ ở nhà.' },
      { en: '[If she studies hard], {she can pass the exam}.', vi: 'Nếu cô ấy học chăm, cô ấy có thể thi đỗ.' },
      { en: '[Unless you hurry], {you’ll miss the bus}.', vi: 'Nếu bạn không nhanh lên, bạn sẽ lỡ xe buýt.' },
    ],
    tip: {
      title: 'Unless = if not · Should you…',
      body: 'Unless you hurry = If you don’t hurry. Văn phong trang trọng có thể đảo ngữ với "should": Should you need any help, please call me. (= If you need…). Không dùng "will" trong mệnh đề if: ✗ If it will rain…',
    },
  },
  {
    key: 'second',
    badge: '2',
    name: 'Second conditional',
    vi: 'Loại 2',
    reality: 40,
    meter: 'Trái thực tế hiện tại',
    color: '#1d4ed8',
    glow: '#60a5fa',
    time: 'Hiện tại (giả định)',
    ifFormula: 'If + S + V2/V-ed (were)',
    ifTense: 'past simple',
    mainFormula: 'S + would / could / might + V',
    mainTense: 'would + bare infinitive',
    usage:
      'Dùng khi nói về một điều không có thật ở hiện tại, hoặc rất khó xảy ra trong tương lai. Thì quá khứ ở đây không chỉ thời gian mà chỉ "khoảng cách" với thực tế. Cũng dùng để khuyên: If I were you…',
    examples: [
      { en: '[If I had more free time], {I would learn the guitar}.', vi: 'Nếu tôi có nhiều thời gian rảnh hơn, tôi sẽ học guitar. (thực tế: tôi không rảnh)' },
      { en: '[If I were you], {I would take that job}.', vi: 'Nếu tôi là bạn, tôi sẽ nhận công việc đó.' },
      { en: '{She could buy a house} [if she earned more].', vi: 'Cô ấy có thể mua nhà nếu cô ấy kiếm được nhiều hơn.' },
    ],
    tip: {
      title: '"were" cho mọi ngôi',
      body: 'Trong câu điều kiện loại 2, dùng "were" cho tất cả các ngôi: If I / he / she / it were… ("was" chấp nhận trong văn nói). Đảo ngữ trang trọng: Were I rich, I would travel the world.',
    },
  },
  {
    key: 'third',
    badge: '3',
    name: 'Third conditional',
    vi: 'Loại 3',
    reality: 3,
    meter: 'Không thể xảy ra nữa',
    color: '#be123c',
    glow: '#fb7185',
    time: 'Quá khứ (đã qua)',
    ifFormula: 'If + S + had + V3/V-ed',
    ifTense: 'past perfect',
    mainFormula: 'S + would / could / might + have + V3',
    mainTense: 'would have + past participle',
    usage:
      'Dùng khi nói về một điều không có thật trong quá khứ: tưởng tượng quá khứ đã khác đi. Thường mang ý tiếc nuối hoặc trách móc, vì kết quả đã không thể thay đổi.',
    examples: [
      { en: '[If I had known about the party], {I would have come}.', vi: 'Nếu tôi biết về bữa tiệc thì tôi đã đến rồi. (thực tế: tôi không biết)' },
      { en: '[If we had left earlier], {we wouldn’t have missed the flight}.', vi: 'Nếu chúng ta đi sớm hơn thì đã không lỡ chuyến bay.' },
      { en: '{She might have passed} [if she had studied harder].', vi: 'Cô ấy có lẽ đã thi đỗ nếu cô ấy học chăm hơn.' },
    ],
    tip: {
      title: 'Đảo ngữ: Had I known…',
      body: 'Bỏ "if", đưa "had" lên đầu: Had I known, I would have come. = If I had known… Không dùng "would" trong mệnh đề if: ✗ If I would have known…',
    },
  },
  {
    key: 'mixedPast',
    badge: 'M',
    name: 'Mixed: past → present',
    vi: 'Hỗn hợp A',
    reality: 18,
    meter: 'Quá khứ khác → hiện tại khác',
    color: '#6d28d9',
    glow: '#a78bfa',
    time: 'Điều kiện quá khứ · kết quả hiện tại',
    ifFormula: 'If + S + had + V3',
    ifTense: 'past perfect (loại 3)',
    mainFormula: 'S + would / could + V (now)',
    mainTense: 'would + V (loại 2)',
    usage:
      'Điều kiện trái với quá khứ, nhưng kết quả trái với hiện tại: một việc đã (không) xảy ra trong quá khứ vẫn ảnh hưởng tới bây giờ. Mệnh đề if của loại 3 + mệnh đề chính của loại 2.',
    examples: [
      { en: '[If I had taken that job], {I would live in Hanoi now}.', vi: 'Nếu hồi đó tôi nhận công việc ấy, giờ tôi đã sống ở Hà Nội.' },
      { en: '[If she hadn’t missed the bus], {she would be here now}.', vi: 'Nếu cô ấy không lỡ xe buýt thì giờ cô ấy đã ở đây.' },
      { en: '[If you had saved some money], {you wouldn’t be broke today}.', vi: 'Nếu bạn đã tiết kiệm tiền thì hôm nay bạn đâu có cháy túi.' },
    ],
    tip: {
      title: 'Nhìn trạng từ thời gian',
      body: 'Dấu hiệu nhận biết: mệnh đề chính có "now, today, still" còn mệnh đề if nhắc tới quá khứ (last year, yesterday, back then).',
    },
  },
  {
    key: 'mixedPresent',
    badge: 'M',
    name: 'Mixed: present → past',
    vi: 'Hỗn hợp B',
    reality: 10,
    meter: 'Hiện tại khác → quá khứ khác',
    color: '#a21caf',
    glow: '#e879f9',
    time: 'Điều kiện hiện tại · kết quả quá khứ',
    ifFormula: 'If + S + V2/V-ed (were)',
    ifTense: 'past simple (loại 2)',
    mainFormula: 'S + would / could + have + V3',
    mainTense: 'would have + V3 (loại 3)',
    usage:
      'Điều kiện trái với hiện tại (thường là tính cách, khả năng hay sự thật lâu dài), kết quả trái với quá khứ. Mệnh đề if của loại 2 + mệnh đề chính của loại 3.',
    examples: [
      { en: '[If I weren’t so shy], {I would have talked to her at the party}.', vi: 'Nếu tôi không nhút nhát như vậy thì tôi đã bắt chuyện với cô ấy ở bữa tiệc.' },
      { en: '[If he spoke English], {he would have understood the instructions}.', vi: 'Nếu anh ấy biết tiếng Anh thì đã hiểu được hướng dẫn rồi.' },
      { en: '[If she were more careful], {she wouldn’t have made that mistake}.', vi: 'Nếu cô ấy cẩn thận hơn thì đã không mắc lỗi đó.' },
    ],
    tip: {
      title: 'Đặc điểm lâu dài',
      body: 'Mệnh đề if mô tả điều luôn đúng ở hiện tại (He doesn’t speak English, I am shy) nên dùng quá khứ đơn; kết quả là một sự việc cụ thể đã qua nên dùng "would have + V3".',
    },
  },
]

const SCENARIOS = [
  {
    key: 'exam',
    label: 'Học bài · thi cử',
    forms: {
      zero: { ifc: 'if students *study* regularly', main: 'they usually *do* well in exams' },
      first: { ifc: 'if you *study* hard', main: 'you *will pass* the exam' },
      second: { ifc: 'if you *studied* harder', main: 'you *would pass* the exam' },
      third: { ifc: 'if you *had studied* harder', main: 'you *would have passed* the exam' },
      mixedPast: { ifc: 'if you *had studied* harder last year', main: 'you *would be* at university now' },
      mixedPresent: { ifc: 'if you *were* a more hard-working student', main: 'you *would have passed* last week’s exam' },
    },
  },
  {
    key: 'rain',
    label: 'Trời mưa · ở nhà',
    forms: {
      zero: { ifc: 'if it *rains*', main: 'the ground *gets* wet' },
      first: { ifc: 'if it *rains* tomorrow', main: 'we *will stay* at home' },
      second: { ifc: 'if it *were raining* now', main: 'we *would stay* at home' },
      third: { ifc: 'if it *had rained* yesterday', main: 'we *would have stayed* at home' },
      mixedPast: { ifc: 'if it *hadn’t rained* all night', main: 'the roads *wouldn’t be* flooded now' },
      mixedPresent: { ifc: 'if I *weren’t* afraid of storms', main: 'I *would have gone* out last night' },
    },
  },
  {
    key: 'money',
    label: 'Tiền · mua xe',
    forms: {
      zero: { ifc: 'if you *save* a little every month', main: 'your savings *grow*' },
      first: { ifc: 'if I *get* the bonus', main: 'I *will buy* a new car' },
      second: { ifc: 'if I *had* more money', main: 'I *would buy* a new car' },
      third: { ifc: 'if I *had saved* more money', main: 'I *would have bought* that car' },
      mixedPast: { ifc: 'if I *had saved* money last year', main: 'I *would have* a car now' },
      mixedPresent: { ifc: 'if I *were* rich', main: 'I *would have bought* that car yesterday' },
    },
  },
  {
    key: 'english',
    label: 'Tiếng Anh · công việc',
    forms: {
      zero: { ifc: 'if you *speak* English', main: 'you *have* more job options' },
      first: { ifc: 'if she *practises* every day', main: 'she *will get* the job' },
      second: { ifc: 'if she *spoke* English fluently', main: 'she *would get* the job' },
      third: { ifc: 'if she *had spoken* English better', main: 'she *would have got* the job' },
      mixedPast: { ifc: 'if she *had learned* English at school', main: 'she *would be working* abroad now' },
      mixedPresent: { ifc: 'if she *spoke* English', main: 'she *would have understood* yesterday’s interview' },
    },
  },
]

const STOPS = TYPES.map((t) => [t.reality, t.glow]).sort((a, b) => a[0] - b[0])

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const CX = 160
const CY = 168
const R = 128

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function colorAt(v) {
  if (v <= STOPS[0][0]) return STOPS[0][1]
  if (v >= STOPS[STOPS.length - 1][0]) return STOPS[STOPS.length - 1][1]
  for (let i = 0; i < STOPS.length - 1; i += 1) {
    const [v0, c0] = STOPS[i]
    const [v1, c1] = STOPS[i + 1]
    if (v >= v0 && v <= v1) {
      const t = (v - v0) / (v1 - v0 || 1)
      const a = hexToRgb(c0)
      const b = hexToRgb(c1)
      const mix = a.map((x, k) => Math.round(x + (b[k] - x) * t))
      return `rgb(${mix.join(',')})`
    }
  }
  return STOPS[0][1]
}

function point(v, radius) {
  const theta = Math.PI - (v / 100) * Math.PI
  return [CX + radius * Math.cos(theta), CY - radius * Math.sin(theta)]
}

const ARC_SEGMENTS = Array.from({ length: 48 }, (_, i) => {
  const v0 = (i / 48) * 100
  const v1 = ((i + 1) / 48) * 100 + 0.4
  const [x0, y0] = point(v0, R)
  const [x1, y1] = point(Math.min(v1, 100), R)
  return { d: `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`, color: colorAt((v0 + v1) / 2) }
})

function capitalize(text) {
  const i = text.search(/[a-zA-Z]/)
  if (i < 0) return text
  return text.slice(0, i) + text[i].toUpperCase() + text.slice(i + 1)
}

function stripMarks(text) {
  return text.replace(/\*/g, '')
}

function Marked({ text }) {
  const parts = text.split(/(\[[^\]]+\]|\{[^}]+\})/g).filter(Boolean)
  return parts.map((p, i) => {
    if (p.startsWith('[')) return <mark key={i} className={styles.ifSeg}>{p.slice(1, -1)}</mark>
    if (p.startsWith('{')) return <mark key={i} className={styles.mainSeg}>{p.slice(1, -1)}</mark>
    return <span key={i}>{p}</span>
  })
}

function Verbs({ text }) {
  return text.split(/(\*[^*]+\*)/g).filter(Boolean).map((p, i) =>
    p.startsWith('*') ? <strong key={i} className={styles.verb}>{p.slice(1, -1)}</strong> : <span key={i}>{p}</span>,
  )
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function RealityMeter({ active, onSelect }) {
  const deg = (active.reality - 50) * 1.8
  return (
    <section className={styles.meterPanel} aria-label="Thước đo mức độ có thật">
      <div className={styles.meterHead}>
        <span className={styles.eyebrow}>Reality meter</span>
        <span className={styles.meterHint}>Chọn một loại câu để xem nó “thật” đến đâu</span>
      </div>

      <div className={styles.gaugeWrap}>
        <svg viewBox="0 0 320 190" className={styles.gauge} role="img" aria-label={`${active.name}: mức độ có thật khoảng ${active.reality}%`}>
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            className={styles.track}
          />
          {ARC_SEGMENTS.map((s, i) => (
            <path key={i} d={s.d} stroke={s.color} className={styles.arcSeg} />
          ))}
          {[0, 25, 50, 75, 100].map((v) => {
            const [x0, y0] = point(v, R - 20)
            const [x1, y1] = point(v, R - 13)
            return <line key={v} x1={x0} y1={y0} x2={x1} y2={y1} className={styles.tick} />
          })}
          {TYPES.map((t) => {
            const [x, y] = point(t.reality, R)
            const on = t.key === active.key
            return (
              <g key={t.key} className={styles.marker} onClick={() => onSelect(t.key)} aria-hidden="true">
                <circle cx={x} cy={y} r={on ? 9 : 6} fill={on ? '#fff' : '#0b1220'} stroke={t.glow} strokeWidth="2.5" />
              </g>
            )
          })}
          <g className={styles.needle} style={{ transform: `rotate(${deg}deg)`, transformOrigin: `${CX}px ${CY}px` }}>
            <path d={`M ${CX - 5} ${CY} L ${CX} ${CY - R + 26} L ${CX + 5} ${CY} Z`} fill="#f8fafc" />
          </g>
          <circle cx={CX} cy={CY} r="13" fill={active.glow} className={styles.hub} />
          <circle cx={CX} cy={CY} r="5" fill="#0b1220" />
          <text x={CX} y={CY - 52} textAnchor="middle" className={styles.readout}>
            {active.reality}%
          </text>
          <text x={CX} y={CY - 34} textAnchor="middle" className={styles.readoutLabel}>
            mức “có thật”
          </text>
        </svg>
        <div className={styles.ends} aria-hidden="true">
          <span>0% · không thể xảy ra nữa</span>
          <span>100% · luôn đúng</span>
        </div>
      </div>

      <p className={styles.meterVerdict} aria-live="polite">
        <span className={styles.verdictDot} style={{ background: active.glow }} />
        <strong>{active.vi}:</strong>&nbsp;{active.meter}
      </p>

      <div className={styles.typeGrid} role="group" aria-label="Chọn loại câu điều kiện">
        {TYPES.map((t) => (
          <button
            key={t.key}
            type="button"
            className={styles.typeBtn}
            aria-pressed={t.key === active.key}
            onClick={() => onSelect(t.key)}
            style={{ '--glow': t.glow }}
          >
            <span className={styles.typeBadge}>{t.badge}</span>
            <span className={styles.typeText}>
              <span className={styles.typeVi}>{t.vi}</span>
              <span className={styles.typeEn}>{t.name}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

function FormulaBlocks({ type }) {
  return (
    <div className={styles.formula} aria-label="Công thức">
      <div className={`${styles.block} ${styles.blockIf}`}>
        <span className={styles.blockLabel}>If-clause</span>
        <code className={styles.blockCode}>{type.ifFormula}</code>
        <span className={styles.blockTense}>{type.ifTense}</span>
      </div>
      <span className={styles.comma} aria-hidden="true">,</span>
      <div className={`${styles.block} ${styles.blockMain}`}>
        <span className={styles.blockLabel}>Main clause</span>
        <code className={styles.blockCode}>{type.mainFormula}</code>
        <span className={styles.blockTense}>{type.mainTense}</span>
      </div>
    </div>
  )
}

function TypeDetail({ type }) {
  return (
    <section className={styles.detail} aria-labelledby="cond-detail-title">
      <header className={styles.detailHead}>
        <span className={styles.detailBadge}>{type.badge}</span>
        <div>
          <h2 id="cond-detail-title" className={styles.detailTitle}>{type.name}</h2>
          <p className={styles.detailTime}>{type.time}</p>
        </div>
      </header>

      <FormulaBlocks type={type} />

      <p className={styles.usage}>{type.usage}</p>

      <ul className={styles.examples}>
        {type.examples.map((ex) => (
          <li key={ex.en} className={styles.example}>
            <p className={styles.exEn}><Marked text={ex.en} /></p>
            <p className={styles.exVi}>{ex.vi}</p>
          </li>
        ))}
      </ul>
      <p className={styles.legend}>
        <mark className={styles.ifSeg}>if-clause</mark>
        <mark className={styles.mainSeg}>main clause</mark>
      </p>

      <aside className={styles.tip}>
        <BulbOutlined className={styles.tipIcon} aria-hidden="true" />
        <div>
          <strong className={styles.tipTitle}>{type.tip.title}</strong>
          <p className={styles.tipBody}>{type.tip.body}</p>
        </div>
      </aside>
    </section>
  )
}

function SentenceBuilder({ active, onSelect }) {
  const [scenarioKey, setScenarioKey] = useState(SCENARIOS[0].key)
  const [swapped, setSwapped] = useState(false)
  const scenario = SCENARIOS.find((s) => s.key === scenarioKey)
  const form = scenario.forms[active.key]

  const ifText = swapped ? form.ifc : capitalize(form.ifc)
  const mainText = swapped ? capitalize(form.main) : form.main
  const plain = swapped
    ? `${stripMarks(mainText)} ${stripMarks(ifText)}.`
    : `${stripMarks(ifText)}, ${stripMarks(mainText)}.`

  const ifBlock = (
    <div className={`${styles.piece} ${styles.pieceIf}`} key="if">
      <span className={styles.pieceLabel}>if-clause</span>
      <span className={styles.pieceText}><Verbs text={ifText} /></span>
    </div>
  )
  const mainBlock = (
    <div className={`${styles.piece} ${styles.pieceMain}`} key="main">
      <span className={styles.pieceLabel}>main clause</span>
      <span className={styles.pieceText}><Verbs text={mainText} />{swapped ? '' : '.'}</span>
    </div>
  )

  return (
    <section className={styles.builder} aria-labelledby="cond-builder-title">
      <div className={styles.sectionHead}>
        <ExperimentOutlined className={styles.sectionIcon} aria-hidden="true" />
        <div>
          <h2 id="cond-builder-title" className={styles.sectionTitle}>Sentence builder</h2>
          <p className={styles.sectionSub}>Cùng một tình huống, đổi loại câu để thấy động từ thay đổi thế nào.</p>
        </div>
      </div>

      <div className={styles.builderControls}>
        <label className={styles.control}>
          <span className={styles.controlLabel}>Tình huống</span>
          <Select
            value={scenarioKey}
            onChange={setScenarioKey}
            options={SCENARIOS.map((s) => ({ value: s.key, label: s.label }))}
            className={styles.select}
            aria-label="Chọn tình huống"
          />
        </label>
        <div className={styles.control}>
          <span className={styles.controlLabel} id="cond-swap-label">Đảo thứ tự mệnh đề</span>
          <Switch
            checked={swapped}
            onChange={setSwapped}
            aria-labelledby="cond-swap-label"
            checkedChildren={<SwapOutlined />}
            unCheckedChildren={<SwapOutlined />}
          />
        </div>
      </div>

      <div className={styles.pillRow} role="group" aria-label="Loại câu">
        {TYPES.map((t) => (
          <button
            key={t.key}
            type="button"
            className={styles.pill}
            aria-pressed={t.key === active.key}
            onClick={() => onSelect(t.key)}
          >
            {t.vi}
          </button>
        ))}
      </div>

      <div className={styles.assembly} aria-live="polite">
        {swapped ? (
          <>
            {mainBlock}
            <span className={styles.joinNone} title="Không có dấu phẩy">∅</span>
            {ifBlock}
            <span className={styles.period}>.</span>
          </>
        ) : (
          <>
            {ifBlock}
            <span className={styles.joinComma}>,</span>
            {mainBlock}
          </>
        )}
      </div>

      <p className={styles.plain}>{plain}</p>

      <p className={styles.commaRule}>
        {swapped ? (
          <>
            <strong>Mệnh đề chính đứng trước</strong> → <em>không</em> cần dấu phẩy giữa hai mệnh đề.
          </>
        ) : (
          <>
            <strong>Mệnh đề if đứng trước</strong> → đặt <em>dấu phẩy</em> sau mệnh đề if.
          </>
        )}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Conditionals() {
  const [activeKey, setActiveKey] = useState('second')
  const active = TYPES.find((t) => t.key === activeKey)

  return (
    <div className={styles.page} style={{ '--accent': active.color, '--glow': active.glow }}>
      <RealityMeter active={active} onSelect={setActiveKey} />
      <TypeDetail type={active} />
      <SentenceBuilder active={active} onSelect={setActiveKey} />
    </div>
  )
}
