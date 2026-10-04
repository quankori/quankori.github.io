import { useState } from 'react'
import { Segmented } from 'antd'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CrownOutlined,
  RiseOutlined,
} from '@ant-design/icons'
import styles from './Comparisons.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Sentence markup: [form]  {than / as / the …}  <modifier>           */
/* ------------------------------------------------------------------ */

const RULES = {
  short: {
    name: '1 âm tiết',
    formula: 'adj + -er · the + adj + -est',
    vi: 'Tính từ một âm tiết: thêm -er để so sánh hơn, the … -est để so sánh nhất.',
    examples: [['tall', 'taller', 'tallest'], ['cheap', 'cheaper', 'cheapest'], ['old', 'older', 'oldest']],
  },
  e: {
    name: 'Tận cùng -e',
    formula: 'adj + -r · the + adj + -st',
    vi: 'Đã có sẵn e ở cuối: chỉ thêm -r / -st.',
    examples: [['large', 'larger', 'largest'], ['nice', 'nicer', 'nicest'], ['wide', 'wider', 'widest']],
  },
  double: {
    name: 'Gấp đôi phụ âm',
    formula: '1 nguyên âm + 1 phụ âm → gấp đôi',
    vi: 'Một âm tiết, kết thúc bằng MỘT nguyên âm + MỘT phụ âm: gấp đôi phụ âm cuối rồi thêm -er / -est.',
    examples: [['big', 'bigger', 'biggest'], ['hot', 'hotter', 'hottest'], ['thin', 'thinner', 'thinnest']],
  },
  y: {
    name: 'Phụ âm + y',
    formula: '-y → -ier · -iest',
    vi: 'Tận cùng là phụ âm + y (kể cả tính từ hai âm tiết): đổi y thành i rồi thêm -er / -est.',
    examples: [['happy', 'happier', 'happiest'], ['busy', 'busier', 'busiest'], ['heavy', 'heavier', 'heaviest']],
  },
  long: {
    name: '2+ âm tiết',
    formula: 'more + adj · the most + adj',
    vi: 'Tính từ từ hai âm tiết trở lên (không tận cùng -y): thêm more / the most phía trước, KHÔNG thêm -er.',
    examples: [['modern', 'more modern', 'most modern'], ['expensive', 'more expensive', 'most expensive'], ['popular', 'more popular', 'most popular']],
  },
  two: {
    name: '2 âm tiết “hai cách”',
    formula: '-er / -est hoặc more / most',
    vi: 'Một số tính từ hai âm tiết dùng được cả hai cách (thường là -er/-est trong văn nói): clever, narrow, quiet, simple, gentle.',
    examples: [['clever', 'cleverer / more clever', 'cleverest / most clever'], ['narrow', 'narrower / more narrow', 'narrowest / most narrow'], ['quiet', 'quieter / more quiet', 'quietest / most quiet']],
  },
  irregular: {
    name: 'Bất quy tắc',
    formula: 'phải học thuộc',
    vi: 'Không theo quy tắc nào — xem bảng bên dưới.',
    examples: [['good', 'better', 'best'], ['bad', 'worse', 'worst'], ['far', 'farther / further', 'farthest / furthest']],
  },
}

const RULE_ORDER = ['short', 'e', 'double', 'y', 'long', 'two', 'irregular']

const LEXICON = {
  tall: { comp: 'taller', sup: 'tallest', rule: 'short' },
  short: { comp: 'shorter', sup: 'shortest', rule: 'short' },
  old: { comp: 'older', sup: 'oldest', rule: 'short', note: 'Trong gia đình có thể dùng elder / eldest trước danh từ: my elder sister.' },
  young: { comp: 'younger', sup: 'youngest', rule: 'short' },
  fast: { comp: 'faster', sup: 'fastest', rule: 'short' },
  slow: { comp: 'slower', sup: 'slowest', rule: 'short' },
  clever: { comp: 'cleverer', sup: 'cleverest', rule: 'two', alt: ['more clever', 'most clever'] },
  expensive: { comp: 'more expensive', sup: 'most expensive', rule: 'long', less: true },
  cheap: { comp: 'cheaper', sup: 'cheapest', rule: 'short' },
  heavy: { comp: 'heavier', sup: 'heaviest', rule: 'y' },
  light: { comp: 'lighter', sup: 'lightest', rule: 'short' },
  thin: { comp: 'thinner', sup: 'thinnest', rule: 'double' },
  good: { comp: 'better', sup: 'best', rule: 'irregular' },
  bad: { comp: 'worse', sup: 'worst', rule: 'irregular' },
  popular: { comp: 'more popular', sup: 'most popular', rule: 'long', less: true },
  far: { comp: 'farther', sup: 'farthest', rule: 'irregular', alt: ['further', 'furthest'], note: 'Với khoảng cách, farther và further đều đúng. Nghĩa trừu tượng “thêm, hơn nữa” chỉ dùng further: further information.' },
  near: { comp: 'nearer', sup: 'nearest', rule: 'short' },
  busy: { comp: 'busier', sup: 'busiest', rule: 'y' },
  quiet: { comp: 'quieter', sup: 'quietest', rule: 'two', alt: ['more quiet', 'most quiet'] },
  big: { comp: 'bigger', sup: 'biggest', rule: 'double' },
  small: { comp: 'smaller', sup: 'smallest', rule: 'short' },
  comfortable: { comp: 'more comfortable', sup: 'most comfortable', rule: 'long', less: true },
  large: { comp: 'larger', sup: 'largest', rule: 'e' },
}

const DATASETS = [
  {
    key: 'friends',
    label: 'Ba người bạn',
    items: ['Mai', 'Nam', 'Linh'],
    metrics: {
      height: { label: 'Chiều cao', unit: 'cm', values: [158, 174, 166] },
      age: { label: 'Tuổi', unit: 'tuổi', values: [24, 21, 27] },
      speed: { label: 'Tốc độ chạy', unit: 'km/h', values: [11, 14, 9] },
      score: { label: 'Điểm kiểm tra', unit: '/10', values: [8.5, 7, 9] },
    },
    adjectives: [
      { word: 'tall', metric: 'height', dir: 1 },
      { word: 'short', metric: 'height', dir: -1 },
      { word: 'old', metric: 'age', dir: 1 },
      { word: 'young', metric: 'age', dir: -1 },
      { word: 'fast', metric: 'speed', dir: 1 },
      { word: 'slow', metric: 'speed', dir: -1 },
      { word: 'clever', metric: 'score', dir: 1 },
    ],
  },
  {
    key: 'phones',
    label: 'Ba chiếc điện thoại',
    items: ['Nova', 'Pixo', 'Zeta'],
    metrics: {
      price: { label: 'Giá', unit: 'triệu đ', values: [22, 9, 15] },
      weight: { label: 'Cân nặng', unit: 'g', values: [205, 168, 187] },
      thickness: { label: 'Độ dày', unit: 'mm', values: [8.9, 7.4, 8.1] },
      rating: { label: 'Điểm đánh giá', unit: '/10', values: [9.1, 7.4, 8.3] },
      users: { label: 'Người dùng', unit: 'triệu', values: [3.1, 8.4, 5] },
    },
    adjectives: [
      { word: 'expensive', metric: 'price', dir: 1 },
      { word: 'cheap', metric: 'price', dir: -1 },
      { word: 'heavy', metric: 'weight', dir: 1 },
      { word: 'light', metric: 'weight', dir: -1 },
      { word: 'thin', metric: 'thickness', dir: -1 },
      { word: 'good', metric: 'rating', dir: 1 },
      { word: 'bad', metric: 'rating', dir: -1 },
      { word: 'popular', metric: 'users', dir: 1 },
    ],
  },
  {
    key: 'cafes',
    label: 'Ba quán cà phê',
    items: ['Mây Café', 'Gió Café', 'Nắng Café'],
    metrics: {
      distance: { label: 'Khoảng cách từ nhà', unit: 'km', values: [1.2, 4.5, 3] },
      guests: { label: 'Khách mỗi giờ', unit: 'khách', values: [40, 85, 60] },
      seats: { label: 'Số chỗ ngồi', unit: 'chỗ', values: [40, 120, 70] },
      comfort: { label: 'Độ thoải mái', unit: '/5', values: [4.6, 3.8, 4.2] },
    },
    adjectives: [
      { word: 'far', metric: 'distance', dir: 1 },
      { word: 'near', metric: 'distance', dir: -1 },
      { word: 'busy', metric: 'guests', dir: 1 },
      { word: 'quiet', metric: 'guests', dir: -1 },
      { word: 'big', metric: 'seats', dir: 1 },
      { word: 'small', metric: 'seats', dir: -1 },
      { word: 'comfortable', metric: 'comfort', dir: 1 },
    ],
  },
]

const IRREGULARS = [
  { base: 'good', comp: 'better', sup: 'the best', vi: 'tốt' },
  { base: 'well (khỏe)', comp: 'better', sup: 'the best', vi: 'khỏe; trạng từ “tốt”' },
  { base: 'bad', comp: 'worse', sup: 'the worst', vi: 'tệ' },
  { base: 'far', comp: 'farther / further', sup: 'the farthest / furthest', vi: 'xa; further còn nghĩa “thêm”' },
  { base: 'little', comp: 'less', sup: 'the least', vi: 'ít (không đếm được)' },
  { base: 'many / much', comp: 'more', sup: 'the most', vi: 'nhiều' },
]

const STRUCTURES = [
  {
    key: 'asas',
    title: 'as … as / not as … as',
    formula: 'as + adj + as · not as (so) + adj + as',
    vi: 'So sánh bằng: hai đối tượng ngang nhau. Phủ định “not as … as” = kém hơn. Giữa hai chữ as là tính từ NGUYÊN MẪU.',
    examples: [
      { en: 'Linh is {as} [tall] {as} her brother.', vi: 'Linh cao bằng anh trai.' },
      { en: 'This phone is {not as} [expensive] {as} that one.', vi: 'Chiếc này không đắt bằng chiếc kia.' },
      { en: 'My bag is {the same} colour {as} yours.', vi: 'Túi tôi cùng màu với túi bạn. (the same + N + as)' },
    ],
  },
  {
    key: 'double',
    title: 'The + comparative, the + comparative',
    formula: 'The + so sánh hơn + S + V, the + so sánh hơn + S + V',
    vi: 'Càng … càng …: sự thay đổi của vế này kéo theo vế kia.',
    examples: [
      { en: '{The} [sooner], {the} [better].', vi: 'Càng sớm càng tốt.' },
      { en: '{The} [more] you practise, {the} [more confident] you become.', vi: 'Càng luyện tập, bạn càng tự tin.' },
      { en: '{The} [harder] you work, {the} [more] you earn.', vi: 'Càng làm chăm, càng kiếm nhiều.' },
    ],
  },
  {
    key: 'andand',
    title: 'comparative + and + comparative',
    formula: 'X-er and X-er · more and more + adj',
    vi: 'Ngày càng …: diễn tả sự thay đổi liên tục. Tính từ dài thì lặp lại more, không lặp tính từ.',
    examples: [
      { en: 'It’s getting [colder and colder].', vi: 'Trời ngày càng lạnh.' },
      { en: 'Life is becoming [more and more expensive].', vi: 'Cuộc sống ngày càng đắt đỏ. (✗ more expensive and more expensive)' },
    ],
  },
  {
    key: 'mod',
    title: 'much / far / a bit + comparative',
    formula: 'much · far · a lot · a bit · slightly + so sánh hơn',
    vi: 'Nhấn mạnh mức chênh lệch nhiều hay ít. KHÔNG dùng “very” trước so sánh hơn.',
    examples: [
      { en: 'Nam is <much> [taller] {than} Mai.', vi: 'Nam cao hơn Mai nhiều.' },
      { en: 'The train is <far> [more comfortable] {than} the bus.', vi: 'Tàu hỏa thoải mái hơn xe buýt rất nhiều.' },
      { en: 'This one is <a bit> [cheaper].', vi: 'Cái này rẻ hơn một chút.' },
    ],
  },
  {
    key: 'less',
    title: 'less / the least',
    formula: 'less + adj + than · the least + adj',
    vi: 'Ngược với more / most: kém hơn, kém nhất. Thường dùng với tính từ dài. Chú ý: less + danh từ không đếm được, fewer + danh từ đếm được số nhiều.',
    examples: [
      { en: 'Pixo is [less expensive] {than} Nova.', vi: 'Pixo ít đắt hơn Nova.' },
      { en: 'It’s {the} [least popular] app in the store.', vi: 'Đó là ứng dụng ít phổ biến nhất.' },
      { en: 'I have [less] time and [fewer] friends here.', vi: 'Ở đây tôi có ít thời gian hơn và ít bạn hơn.' },
    ],
  },
  {
    key: 'sup',
    title: 'Superlative: in / of / ever',
    formula: 'the + -est / most … + in (nơi, nhóm) / of (số lượng)',
    vi: 'Dùng “in” với nơi chốn hoặc tập thể, “of” với một số lượng. “one of the + so sánh nhất + danh từ số nhiều”. Hay đi với hiện tại hoàn thành + ever.',
    examples: [
      { en: 'She is {the} [tallest] {in} her class.', vi: 'Cô ấy cao nhất lớp.' },
      { en: 'It’s one of {the} [best] restaurants {in} town.', vi: 'Đó là một trong những nhà hàng ngon nhất thị trấn.' },
      { en: 'This is {the} [most interesting] book I have ever read.', vi: 'Đây là cuốn sách hay nhất tôi từng đọc.' },
    ],
  },
]

const MISTAKES = [
  { wrong: 'He is more taller than me.', right: 'He is taller than me.', why: 'Không dùng more cùng với -er. Chọn một trong hai.' },
  { wrong: 'This is the most good restaurant.', right: 'This is the best restaurant.', why: 'good là bất quy tắc: better / the best.' },
  { wrong: 'She is very taller than her sister.', right: 'She is much taller than her sister.', why: 'Trước so sánh hơn dùng much / far / a lot / a bit, không dùng very.' },
  { wrong: 'My phone is bigger then yours.', right: 'My phone is bigger than yours.', why: 'than (hơn) khác then (sau đó).' },
  { wrong: 'He is as tall than his father.', right: 'He is as tall as his father.', why: 'So sánh bằng: as … as, không trộn với than.' },
  { wrong: 'The more you practise, the more better you speak.', right: 'The more you practise, the better you speak.', why: 'better đã là so sánh hơn; không thêm more.' },
  { wrong: 'It’s the bigest city in Viet Nam.', right: 'It’s the biggest city in Viet Nam.', why: 'big: 1 nguyên âm + 1 phụ âm → gấp đôi g.' },
  { wrong: 'She is the tallest of her class.', right: 'She is the tallest in her class.', why: 'in + nơi chốn / tập thể; of + số lượng (of the three, of all).' },
  { wrong: 'It’s one of the best restaurant in town.', right: 'It’s one of the best restaurants in town.', why: 'one of the … + danh từ số nhiều.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const MEDALS = ['gold', 'silver', 'bronze']

function fmt(n) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1)
}

function Sentence({ text }) {
  return text
    .split(/(\[[^\]]+\]|\{[^}]+\}|<[^>]+>)/g)
    .filter(Boolean)
    .map((p, i) => {
      if (p.startsWith('[')) return <mark key={i} className={styles.form}>{p.slice(1, -1)}</mark>
      if (p.startsWith('{')) return <span key={i} className={styles.link}>{p.slice(1, -1)}</span>
      if (p.startsWith('<')) return <span key={i} className={styles.mod}>{p.slice(1, -1)}</span>
      return <span key={i}>{p}</span>
    })
}

function modifierFor(a, b) {
  const rel = Math.abs(a - b) / Math.min(Math.abs(a), Math.abs(b))
  if (rel >= 0.3) return { word: 'much', vi: 'chênh lệch lớn' }
  if (rel <= 0.08) return { word: 'a bit', vi: 'chênh lệch nhỏ' }
  return null
}

function buildSentences(data, adj) {
  const lex = LEXICON[adj.word]
  const metric = data.metrics[adj.metric]
  const ranked = data.items
    .map((name, i) => ({ name, value: metric.values[i] }))
    .sort((x, y) => (y.value - x.value) * adj.dir)
  const [first, second, third] = ranked
  const comp = (a, b) => {
    const m = modifierFor(a.value, b.value)
    return `${a.name} is ${m ? `<${m.word}> ` : ''}[${lex.comp}] {than} ${b.name}.`
  }
  const lines = [
    { tag: 'Superlative', text: `${first.name} is {the} [${lex.sup}] {of the three}.` },
    { tag: 'Comparative', text: comp(first, second) },
    { tag: 'Comparative', text: comp(second, third) },
    { tag: 'not as … as', text: `${third.name} is {not as} [${adj.word}] {as} ${first.name}.` },
  ]
  if (lex.less) {
    lines.push({ tag: 'less', text: `${third.name} is [less ${adj.word}] {than} ${first.name}.` })
    lines.push({ tag: 'least', text: `${third.name} is {the} [least ${adj.word}] {of the three}.` })
  }
  if (lex.alt) {
    lines.push({ tag: 'Cũng đúng', text: `${first.name} is [${lex.alt[0]}] {than} ${second.name}.` })
  }
  return { ranked, lines, lex, metric }
}

/* ------------------------------------------------------------------ */
/*  Signature — podium + bar chart                                     */
/* ------------------------------------------------------------------ */

function Podium() {
  const [dataKey, setDataKey] = useState(DATASETS[0].key)
  const data = DATASETS.find((d) => d.key === dataKey)
  const [adjWord, setAdjWord] = useState(DATASETS[0].adjectives[0].word)
  const adj = data.adjectives.find((a) => a.word === adjWord) || data.adjectives[0]
  const { ranked, lines, lex, metric } = buildSentences(data, adj)
  const max = Math.max(...metric.values)
  const placeOf = (name) => ranked.findIndex((r) => r.name === name)
  const rule = RULES[lex.rule]

  const switchData = (k) => {
    setDataKey(k)
    setAdjWord(DATASETS.find((d) => d.key === k).adjectives[0].word)
  }

  return (
    <section className={styles.arena} aria-labelledby="cmp-arena-title">
      <div className={styles.arenaHead}>
        <div>
          <p className={styles.kicker}>
            <RiseOutlined aria-hidden="true" /> Comparison arena
          </p>
          <h2 id="cmp-arena-title" className={styles.arenaTitle}>Bục vinh quang</h2>
          <p className={styles.arenaSub}>Chọn một nhóm và một tính từ: bảng xếp hạng thay đổi, câu so sánh tự sinh ra theo số liệu.</p>
        </div>
        <Segmented
          className={styles.dataSwitch}
          value={dataKey}
          onChange={switchData}
          options={DATASETS.map((d) => ({ value: d.key, label: d.label }))}
          aria-label="Chọn nhóm so sánh"
        />
      </div>

      <div className={styles.adjRow} role="group" aria-label="Chọn tính từ">
        {data.adjectives.map((a) => (
          <button
            key={a.word}
            type="button"
            className={styles.adjBtn}
            aria-pressed={a.word === adj.word}
            onClick={() => setAdjWord(a.word)}
          >
            {a.word}
            <span className={styles.adjDir} aria-hidden="true">{a.dir > 0 ? '▲' : '▼'}</span>
          </button>
        ))}
      </div>

      <div className={styles.stage}>
        <div className={styles.podium} role="img" aria-label={`Xếp hạng theo "${adj.word}": 1. ${ranked[0].name}, 2. ${ranked[1].name}, 3. ${ranked[2].name}`}>
          {data.items.map((name) => {
            const place = placeOf(name)
            return (
              <div key={name} className={`${styles.step} ${styles[MEDALS[place]]}`} style={{ order: [1, 0, 2][place] }}>
                <span className={styles.stepName}>{name}</span>
                <span className={styles.stepBlock}>
                  {place === 0 && <CrownOutlined className={styles.crown} aria-hidden="true" />}
                  <span className={styles.stepPlace}>{place + 1}</span>
                </span>
              </div>
            )
          })}
        </div>

        <div className={styles.chart}>
          <p className={styles.chartTitle}>
            {metric.label} <span className={styles.chartUnit}>({metric.unit})</span>
            <span className={styles.chartHint}>
              {adj.dir > 0 ? `▲ càng cao càng “${adj.word}”` : `▼ càng thấp càng “${adj.word}”`}
            </span>
          </p>
          <ul className={styles.bars}>
            {data.items.map((name, i) => {
              const v = metric.values[i]
              const place = placeOf(name)
              return (
                <li key={name} className={styles.barRow}>
                  <span className={styles.barName}>{name}</span>
                  <span className={styles.barTrack}>
                    <span className={`${styles.bar} ${styles[MEDALS[place]]}`} style={{ width: `${(v / max) * 100}%` }} />
                  </span>
                  <span className={styles.barValue}>{fmt(v)}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className={styles.forms}>
        <div className={styles.formCell}>
          <span className={styles.formTag}>Adjective</span>
          <span className={styles.formWord}>{adj.word}</span>
        </div>
        <div className={styles.formCell}>
          <span className={styles.formTag}>Comparative</span>
          <span className={styles.formWord}>{lex.comp}{lex.alt ? ` / ${lex.alt[0]}` : ''}</span>
        </div>
        <div className={styles.formCell}>
          <span className={styles.formTag}>Superlative</span>
          <span className={styles.formWord}>the {lex.sup}{lex.alt ? ` / ${lex.alt[1]}` : ''}</span>
        </div>
        <div className={`${styles.formCell} ${styles.formRule}`}>
          <span className={styles.formTag}>Quy tắc</span>
          <span className={styles.formRuleName}>{rule.name}</span>
        </div>
      </div>

      <ol className={styles.lines} aria-live="polite">
        {lines.map((l, i) => (
          <li key={`${adj.word}-${i}`} className={styles.line} style={{ animationDelay: `${i * 60}ms` }}>
            <span className={styles.lineTag}>{l.tag}</span>
            <span className={styles.lineText}><Sentence text={l.text} /></span>
          </li>
        ))}
      </ol>
      {lex.note && <p className={styles.note}>{lex.note}</p>}
      <p className={styles.legendRow}>
        <mark className={styles.form}>dạng so sánh</mark>
        <span className={styles.link}>than / as / the</span>
        <span className={styles.mod}>much / a bit</span>
        <span className={styles.legendText}>“much” khi chênh ≥ 30%, “a bit” khi chênh ≤ 8%.</span>
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function FormRules() {
  return (
    <section className={styles.panel} aria-labelledby="cmp-rules-title">
      <header className={styles.panelHead}>
        <span className={styles.panelIndex}>A</span>
        <div>
          <h2 id="cmp-rules-title" className={styles.panelTitle}>Cách tạo dạng so sánh</h2>
          <p className={styles.panelSub}>Đếm số âm tiết và nhìn chữ cái cuối của tính từ.</p>
        </div>
      </header>
      <div className={styles.ruleGrid}>
        {RULE_ORDER.map((k) => {
          const r = RULES[k]
          return (
            <article key={k} className={`${styles.ruleCard} ${styles[`rule_${k}`]}`}>
              <h3 className={styles.ruleName}>{r.name}</h3>
              <code className={styles.ruleFormula}>{r.formula}</code>
              <p className={styles.ruleVi}>{r.vi}</p>
              <table className={styles.ruleTable}>
                <tbody>
                  {r.examples.map(([a, b, c]) => (
                    <tr key={a}>
                      <th scope="row">{a}</th>
                      <td>{b}</td>
                      <td>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          )
        })}
      </div>

      <h3 className={styles.subhead}>Bảng bất quy tắc</h3>
      <div className={styles.irrGrid}>
        <div className={`${styles.irrRow} ${styles.irrHeader}`} aria-hidden="true">
          <span>Adjective</span>
          <span>Comparative</span>
          <span>Superlative</span>
        </div>
        {IRREGULARS.map((r) => (
          <div key={r.base} className={styles.irrRow}>
            <span className={styles.irrBase}>
              {r.base}
              <small>{r.vi}</small>
            </span>
            <span><span className={styles.srOnly}>so sánh hơn: </span>{r.comp}</span>
            <span><span className={styles.srOnly}>so sánh nhất: </span>{r.sup}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Structures() {
  const [key, setKey] = useState(STRUCTURES[0].key)
  const s = STRUCTURES.find((x) => x.key === key)
  return (
    <section className={styles.panel} aria-labelledby="cmp-struct-title">
      <header className={styles.panelHead}>
        <span className={styles.panelIndex}>B</span>
        <div>
          <h2 id="cmp-struct-title" className={styles.panelTitle}>Các cấu trúc so sánh đặc biệt</h2>
          <p className={styles.panelSub}>Chọn một cấu trúc để xem công thức và ví dụ.</p>
        </div>
      </header>
      <div className={styles.structTabs} role="group" aria-label="Cấu trúc">
        {STRUCTURES.map((x) => (
          <button key={x.key} type="button" className={styles.structTab} aria-pressed={x.key === key} onClick={() => setKey(x.key)}>
            {x.title}
          </button>
        ))}
      </div>
      <div className={styles.structBody}>
        <code className={styles.structFormula}>{s.formula}</code>
        <p className={styles.structVi}>{s.vi}</p>
        <ul className={styles.structEx}>
          {s.examples.map((e) => (
            <li key={e.en}>
              <p className={styles.exEn}><Sentence text={e.en} /></p>
              <p className={styles.exVi}>{e.vi}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.panel} aria-labelledby="cmp-mistakes-title">
      <header className={styles.panelHead}>
        <span className={styles.panelIndex}>C</span>
        <div>
          <h2 id="cmp-mistakes-title" className={styles.panelTitle}>Lỗi hay gặp</h2>
          <p className={styles.panelSub}>Phạm lỗi = bị trừ điểm. Nhớ kỹ những lỗi này!</p>
        </div>
      </header>
      <ul className={styles.fouls}>
        {MISTAKES.map((m) => (
          <li key={m.wrong} className={styles.foul}>
            <p className={styles.wrong}>
              <CloseCircleFilled aria-hidden="true" /> <span><span className={styles.srOnly}>Sai: </span>{m.wrong}</span>
            </p>
            <p className={styles.right}>
              <CheckCircleFilled aria-hidden="true" /> <span><span className={styles.srOnly}>Đúng: </span>{m.right}</span>
            </p>
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

export default function Comparisons() {
  return (
    <div className={styles.page}>
      <Podium />
      <FormRules />
      <Structures />
      <Mistakes />
    </div>
  )
}
