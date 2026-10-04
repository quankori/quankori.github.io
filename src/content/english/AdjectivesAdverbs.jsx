import { useMemo, useState } from 'react'
import { Button, Input, Segmented } from 'antd'
import {
  ArrowRightOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
  StepForwardOutlined,
  UndoOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './AdjectivesAdverbs.module.css'

/* ------------------------------------------------------------------ */
/*  Data — in example sentences, wrap the key word in [brackets]       */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  { key: 'opinion', letter: 'O', name: 'Opinion', vi: 'Nhận xét', color: '#b93815', words: 'beautiful, lovely, nice, cheap' },
  { key: 'size', letter: 'S', name: 'Size', vi: 'Kích cỡ', color: '#a15c07', words: 'big, small, large, tall' },
  { key: 'age', letter: 'A', name: 'Age', vi: 'Tuổi / độ mới', color: '#7a5b00', words: 'old, new, young, ancient' },
  { key: 'shape', letter: 'Sh', name: 'Shape', vi: 'Hình dáng', color: '#3f6212', words: 'round, square, long' },
  { key: 'colour', letter: 'C', name: 'Colour', vi: 'Màu sắc', color: '#047857', words: 'red, black, green' },
  { key: 'origin', letter: 'O', name: 'Origin', vi: 'Nguồn gốc', color: '#0e6a86', words: 'Japanese, Italian, French' },
  { key: 'material', letter: 'M', name: 'Material', vi: 'Chất liệu', color: '#4338ca', words: 'wooden, leather, silk' },
  { key: 'purpose', letter: 'P', name: 'Purpose', vi: 'Mục đích', color: '#86198f', words: 'sports (car), running (shoes)' },
]

const CAT_INDEX = Object.fromEntries(CATEGORIES.map((c, i) => [c.key, i]))
const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]))

/* Words are listed in the CORRECT order. article: 'a/an' adapts to the first word. */
const TRAIN_PUZZLES = [
  {
    article: 'a/an',
    noun: 'table',
    vi: 'một cái bàn gỗ tròn, cũ, lớn và đẹp',
    words: [['beautiful', 'opinion'], ['large', 'size'], ['old', 'age'], ['round', 'shape'], ['wooden', 'material']],
  },
  {
    article: 'a/an',
    noun: 'bag',
    vi: 'một chiếc túi da Ý màu đen, nhỏ và xinh',
    words: [['nice', 'opinion'], ['small', 'size'], ['black', 'colour'], ['Italian', 'origin'], ['leather', 'material']],
  },
  {
    article: 'a/an',
    noun: 'car',
    vi: 'một chiếc xe thể thao Nhật màu đỏ, mới và to',
    words: [['big', 'size'], ['new', 'age'], ['red', 'colour'], ['Japanese', 'origin'], ['sports', 'purpose']],
  },
  {
    article: 'a pair of',
    noun: 'shoes',
    vi: 'một đôi giày chạy bộ màu trắng, thoải mái',
    words: [['comfortable', 'opinion'], ['white', 'colour'], ['running', 'purpose']],
  },
  {
    article: 'a/an',
    noun: 'cottage',
    vi: 'một căn nhà tranh nhỏ xinh, cũ, xây bằng đá',
    words: [['lovely', 'opinion'], ['little', 'size'], ['old', 'age'], ['stone', 'material']],
  },
  {
    article: 'a/an',
    noun: 'vase',
    vi: 'một chiếc bình sứ Trung Hoa cổ, cao và thanh lịch',
    words: [['elegant', 'opinion'], ['tall', 'size'], ['ancient', 'age'], ['Chinese', 'origin'], ['porcelain', 'material']],
  },
  {
    article: 'a/an',
    noun: 'bag',
    vi: 'một chiếc túi ngủ bằng nylon màu xanh lá, giá rẻ',
    words: [['cheap', 'opinion'], ['green', 'colour'], ['nylon', 'material'], ['sleeping', 'purpose']],
  },
]

const ADV_RULES = {
  base: { label: '+ ly', vi: 'Đa số tính từ: thêm -ly (kể cả tính từ tận cùng -e, -ful).', tone: 'green' },
  y: { label: 'phụ âm + y → ily', vi: 'Tận cùng là phụ âm + y: đổi y thành i rồi thêm -ly.', tone: 'green' },
  le: { label: '-le → -ly', vi: 'Tận cùng là phụ âm + le: bỏ e, thêm y.', tone: 'green' },
  ic: { label: '-ic → -ically', vi: 'Tận cùng là -ic: thêm -ally (ngoại lệ: public → publicly).', tone: 'green' },
  ll: { label: '-ll → -lly', vi: 'Tận cùng là -ll: chỉ thêm -y.', tone: 'green' },
  ue: { label: '-ue → -uly', vi: 'Tận cùng là -ue: bỏ e rồi thêm -ly.', tone: 'green' },
  irregular: { label: 'bất quy tắc', vi: 'Dạng trạng từ hoàn toàn khác tính từ.', tone: 'amber' },
  exception: { label: 'ngoại lệ', vi: 'Không theo quy tắc chính tả thông thường — phải học thuộc.', tone: 'amber' },
  same: { label: 'giữ nguyên', vi: 'Tính từ và trạng từ cùng một dạng. Không thêm -ly!', tone: 'amber' },
  lyAdj: { label: 'tính từ đuôi -ly', vi: 'Đây là TÍNH TỪ dù tận cùng bằng -ly. Không có trạng từ chuẩn → dùng "in a … way / manner".', tone: 'red' },
}

/* Hand-checked words with examples. Words not listed fall back to the spelling rules. */
const ADV_LEXICON = {
  quick: { ex: ['He is a [quick] reader.', 'He reads [quickly].'] },
  careful: { ex: ['She is a [careful] driver.', 'She drives [carefully].'] },
  happy: { ex: ['The children look [happy].', 'The children played [happily].'] },
  easy: { ex: ['The test was [easy].', 'I passed the test [easily].'] },
  gentle: { ex: ['He has a [gentle] voice.', 'He spoke [gently] to the baby.'] },
  terrible: { ex: ['The weather was [terrible].', 'I slept [terribly] last night.'] },
  basic: { ex: ['These are [basic] rules.', '[Basically], the plan is simple.'] },
  tragic: { ex: ['It was a [tragic] accident.', 'The story ended [tragically].'] },
  full: { ex: ['The glass is [full].', 'I [fully] understand your point.'] },
  true: { ex: ['It is a [true] story.', 'I am [truly] sorry.'] },
  nice: { ex: ['She has a [nice] smile.', 'She asked [nicely].'] },
  good: {
    adv: 'well',
    rule: 'irregular',
    ex: ['She is a [good] cook.', 'She cooks [well].'],
    note: '"well" cũng có thể là tính từ nghĩa "khỏe mạnh": I don’t feel well today.',
  },
  fast: {
    adv: 'fast',
    rule: 'same',
    ex: ['He is a [fast] runner.', 'He runs [fast].'],
    note: 'Không có từ "fastly".',
  },
  hard: {
    adv: 'hard',
    rule: 'same',
    ex: ['She is a [hard] worker.', 'She works [hard].'],
    trap: { word: 'hardly', vi: 'hầu như không', ex: 'She [hardly] works. (Cô ấy hầu như chẳng làm gì.)' },
  },
  late: {
    adv: 'late',
    rule: 'same',
    ex: ['The train was [late].', 'The train arrived [late].'],
    trap: { word: 'lately', vi: 'gần đây (= recently)', ex: 'Have you seen him [lately]?' },
  },
  high: {
    adv: 'high',
    rule: 'same',
    ex: ['It is a [high] wall.', 'The kite flew [high].'],
    trap: { word: 'highly', vi: 'rất, cực kỳ (mức độ)', ex: 'It is a [highly] successful film.' },
  },
  early: { adv: 'early', rule: 'same', ex: ['I caught an [early] bus.', 'I got up [early].'] },
  friendly: {
    adv: null,
    rule: 'lyAdj',
    ex: ['The staff are [friendly].', 'They greeted us [in a friendly way].'],
  },
  lovely: {
    adv: null,
    rule: 'lyAdj',
    ex: ['What a [lovely] song!', 'She sang it [in a lovely way].'],
  },
  lonely: { adv: null, rule: 'lyAdj', ex: ['He felt [lonely] in the big city.', 'He spent the holiday [alone] — diễn đạt lại bằng từ khác thay vì cố tạo trạng từ.'] },
  silly: { adv: null, rule: 'lyAdj', ex: ['That was a [silly] idea.', 'He behaved [in a silly way].'] },
  public: {
    adv: 'publicly',
    rule: 'exception',
    ex: ['He made a [public] apology.', 'He apologised [publicly].'],
    note: 'Ngoại lệ của quy tắc -ic: không viết "publically".',
  },
  whole: { adv: 'wholly', rule: 'exception', ex: ['I ate the [whole] cake.', 'I [wholly] agree with you.'] },
  shy: { adv: 'shyly', rule: 'exception', ex: ['She is a [shy] girl.', 'She smiled [shyly].'], note: 'Tính từ một âm tiết tận cùng -y thường giữ y: shy → shyly.' },
}

const CONVERTER_PICKS = ['quick', 'careful', 'happy', 'gentle', 'basic', 'full', 'true', 'good', 'fast', 'hard', 'late', 'high', 'friendly', 'lovely', 'public']

const LINKING_VERBS = ['be', 'look', 'seem', 'feel', 'smell', 'taste', 'sound', 'become', 'get', 'appear']

const POSITION_CONTRASTS = [
  { en: 'The soup tastes [good].', vi: 'Món súp có vị ngon. → taste là động từ nối, mô tả món súp → tính từ.', kind: 'adj' },
  { en: 'He tasted the soup [carefully].', vi: 'Anh ấy nếm súp một cách cẩn thận. → taste là hành động → trạng từ.', kind: 'adv' },
  { en: 'She looks [angry].', vi: 'Trông cô ấy có vẻ giận. → mô tả trạng thái của chủ ngữ.', kind: 'adj' },
  { en: 'She looked at me [angrily].', vi: 'Cô ấy nhìn tôi một cách giận dữ. → mô tả cách hành động.', kind: 'adv' },
]

const SLOTS = [
  { key: 'front', label: 'Đầu câu' },
  { key: 'subject', label: 'Chủ ngữ' },
  { key: 'mid', label: 'Giữa' },
  { key: 'verb', label: 'Động từ' },
  { key: 'object', label: 'Tân ngữ' },
  { key: 'end', label: 'Cuối câu' },
]

const ADVERB_TYPES = [
  {
    key: 'manner',
    name: 'Manner',
    vi: 'Cách thức',
    question: 'How? — làm như thế nào?',
    words: ['quickly', 'carefully', 'well', 'hard', 'fast', 'quietly'],
    slots: ['end'],
    position: 'Thường đứng cuối câu: sau động từ, hoặc sau tân ngữ nếu có. Không chen giữa động từ và tân ngữ.',
    examples: [
      { en: 'She speaks English [fluently].', vi: 'Cô ấy nói tiếng Anh trôi chảy. (✗ speaks fluently English)' },
      { en: 'He closed the door [quietly].', vi: 'Anh ấy đóng cửa khẽ khàng.' },
    ],
  },
  {
    key: 'place',
    name: 'Place',
    vi: 'Nơi chốn',
    question: 'Where? — ở đâu?',
    words: ['here', 'there', 'outside', 'upstairs', 'abroad', 'everywhere'],
    slots: ['end'],
    position: 'Thường đứng cuối câu, sau động từ hoặc tân ngữ.',
    examples: [
      { en: 'The kids are playing [outside].', vi: 'Bọn trẻ đang chơi ngoài trời.' },
      { en: 'I left my keys [upstairs].', vi: 'Tôi để quên chìa khóa trên lầu.' },
    ],
  },
  {
    key: 'time',
    name: 'Time',
    vi: 'Thời gian',
    question: 'When? — khi nào?',
    words: ['now', 'yesterday', 'soon', 'later', 'tonight', 'already'],
    slots: ['end', 'front'],
    position: 'Thường đứng cuối câu; có thể đưa lên đầu câu để nhấn mạnh thời điểm.',
    examples: [
      { en: 'We met [yesterday].', vi: 'Chúng tôi đã gặp nhau hôm qua.' },
      { en: '[Tomorrow] I’m flying to Đà Nẵng.', vi: 'Ngày mai tôi bay ra Đà Nẵng.' },
    ],
  },
  {
    key: 'frequency',
    name: 'Frequency',
    vi: 'Tần suất',
    question: 'How often? — bao lâu một lần?',
    words: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never'],
    slots: ['mid'],
    position: 'Đứng TRƯỚC động từ thường, nhưng đứng SAU "be" và sau trợ động từ (can, have, will, don’t…).',
    examples: [
      { en: 'I [usually] walk to work.', vi: 'Tôi thường đi bộ đi làm. (trước động từ thường)' },
      { en: 'She is [always] late.', vi: 'Cô ấy luôn đến muộn. (sau be)' },
      { en: 'They have [never] seen snow.', vi: 'Họ chưa bao giờ thấy tuyết. (sau trợ động từ)' },
    ],
  },
  {
    key: 'degree',
    name: 'Degree',
    vi: 'Mức độ',
    question: 'How much? — đến mức nào?',
    words: ['very', 'quite', 'too', 'extremely', 'really', 'enough'],
    slots: [],
    position: 'Đứng ngay TRƯỚC tính từ / trạng từ mà nó bổ nghĩa. Riêng "enough" đứng SAU tính từ / trạng từ.',
    examples: [
      { en: 'The coffee is [too] hot to drink.', vi: 'Cà phê nóng quá, không uống được.' },
      { en: 'She drives [extremely] carefully.', vi: 'Cô ấy lái xe cực kỳ cẩn thận.' },
      { en: 'He isn’t old [enough] to vote.', vi: 'Cậu ấy chưa đủ tuổi đi bầu cử.' },
    ],
  },
]

const FEELINGS = [
  { ing: 'boring', ed: 'bored', ingEx: 'The lecture was [boring].', edEx: 'The students were [bored].' },
  { ing: 'interesting', ed: 'interested', ingEx: 'This book is [interesting].', edEx: 'I’m [interested] in history.' },
  { ing: 'tiring', ed: 'tired', ingEx: 'It was a [tiring] journey.', edEx: 'We felt [tired] after the journey.' },
  { ing: 'exciting', ed: 'excited', ingEx: 'The final was [exciting].', edEx: 'The fans were [excited].' },
  { ing: 'confusing', ed: 'confused', ingEx: 'The instructions are [confusing].', edEx: 'I’m [confused] by the instructions.' },
  { ing: 'surprising', ed: 'surprised', ingEx: 'The result was [surprising].', edEx: 'Everyone was [surprised] by the result.' },
  { ing: 'embarrassing', ed: 'embarrassed', ingEx: 'That was an [embarrassing] moment.', edEx: 'He felt [embarrassed].' },
]

const MISTAKES = [
  { wrong: 'She sings very good.', right: 'She sings very well.', why: 'Bổ nghĩa cho động từ "sings" phải dùng trạng từ: good → well.' },
  { wrong: 'This soup tastes deliciously.', right: 'This soup tastes delicious.', why: '"taste" ở đây là động từ nối → theo sau là tính từ, không phải trạng từ.' },
  { wrong: 'He drives very fastly.', right: 'He drives very fast.', why: 'fast vừa là tính từ vừa là trạng từ; "fastly" không tồn tại.' },
  { wrong: 'He works hardly to support his family.', right: 'He works hard to support his family.', why: 'hardly nghĩa là "hầu như không" — nghĩa ngược hẳn!' },
  { wrong: 'I’m very boring in this class.', right: 'I’m very bored in this class.', why: '"I’m boring" = tôi là người nhàm chán. Cảm xúc của người dùng -ed.' },
  { wrong: 'She bought a leather black bag.', right: 'She bought a black leather bag.', why: 'OSASCOMP: Colour (black) đứng trước Material (leather).' },
  { wrong: 'She always is late.', right: 'She is always late.', why: 'Trạng từ tần suất đứng sau động từ "be".' },
  { wrong: 'I speak fluently English.', right: 'I speak English fluently.', why: 'Không đặt trạng từ cách thức giữa động từ và tân ngữ.' },
  { wrong: 'He talked to me friendly.', right: 'He talked to me in a friendly way.', why: 'friendly là tính từ; không có trạng từ "friendlily" dùng phổ biến.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

function articleFor(puzzle, firstWord) {
  if (puzzle.article !== 'a/an') return puzzle.article
  if (!firstWord) return 'a/an'
  return /^[aeiou]/i.test(firstWord) ? 'an' : 'a'
}

function Hl({ text, className }) {
  return text
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith('[') ? (
        <mark key={i} className={className || styles.hl}>{p.slice(1, -1)}</mark>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
}

function convertAdjective(raw) {
  const w = raw.trim().toLowerCase()
  if (!w) return { status: 'empty' }
  if (!/^[a-z]{2,20}$/.test(w)) return { status: 'invalid' }

  const known = ADV_LEXICON[w]
  if (known && known.rule) {
    return { status: 'ok', adj: w, adv: known.adv, rule: known.rule, whole: true, ex: known.ex, note: known.note, trap: known.trap, curated: true }
  }

  let parts
  if (w.endsWith('ly')) {
    return { status: 'ok', adj: w, adv: null, rule: 'lyAdj', whole: true, guess: true }
  } else if (w.endsWith('ic')) {
    parts = { rule: 'ic', stem: w, from: '', to: 'ally' }
  } else if (/[^aeiou]y$/.test(w)) {
    parts = { rule: 'y', stem: w.slice(0, -1), from: 'y', to: 'ily' }
  } else if (/[^aeiou]le$/.test(w)) {
    parts = { rule: 'le', stem: w.slice(0, -1), from: 'e', to: 'y' }
  } else if (w.endsWith('ll')) {
    parts = { rule: 'll', stem: w, from: '', to: 'y' }
  } else if (w.endsWith('ue')) {
    parts = { rule: 'ue', stem: w.slice(0, -1), from: 'e', to: 'ly' }
  } else {
    parts = { rule: 'base', stem: w, from: '', to: 'ly' }
  }
  return {
    status: 'ok',
    adj: w,
    adv: parts.stem + parts.to,
    rule: parts.rule,
    parts,
    ex: known?.ex,
    curated: Boolean(known),
  }
}

/* ------------------------------------------------------------------ */
/*  Signature 1 — adjective-order train                                */
/* ------------------------------------------------------------------ */

function OrderLegend() {
  return (
    <ol className={styles.legend} aria-label="Thứ tự tính từ OSASCOMP">
      {CATEGORIES.map((c, i) => (
        <li key={c.key} className={styles.legendItem} style={{ '--cat': c.color }}>
          <span className={styles.legendNum}>{i + 1}</span>
          <span className={styles.legendLetter}>{c.letter}</span>
          <span className={styles.legendName}>{c.name}</span>
          <span className={styles.legendVi}>{c.vi}</span>
        </li>
      ))}
      <li className={`${styles.legendItem} ${styles.legendNoun}`}>
        <span className={styles.legendNum}>+</span>
        <span className={styles.legendLetter}>N</span>
        <span className={styles.legendName}>Noun</span>
        <span className={styles.legendVi}>Danh từ</span>
      </li>
    </ol>
  )
}

function OrderTrain() {
  const [pi, setPi] = useState(0)
  const puzzle = TRAIN_PUZZLES[pi]
  const [order, setOrder] = useState(() => shuffledOrder(TRAIN_PUZZLES[0].words.length))
  const [slots, setSlots] = useState(() => Array(TRAIN_PUZZLES[0].words.length).fill(null))
  const [status, setStatus] = useState('build')
  const [hints, setHints] = useState(false)
  const [solved, setSolved] = useState([])

  const full = slots.every((s) => s !== null)
  const pool = order.filter((wi) => !slots.includes(wi))
  const firstWord = slots[0] !== null ? puzzle.words[slots[0]][0] : null
  const article = articleFor(puzzle, firstWord)
  const showCats = hints || status !== 'build'

  const load = (i) => {
    const n = TRAIN_PUZZLES[i].words.length
    setPi(i)
    setOrder(shuffledOrder(n))
    setSlots(Array(n).fill(null))
    setStatus('build')
  }

  const place = (wi) => {
    if (status === 'go') return
    const k = slots.indexOf(null)
    if (k < 0) return
    const next = [...slots]
    next[k] = wi
    setSlots(next)
    setStatus('build')
  }

  const unload = (k) => {
    if (status === 'go') return
    const next = [...slots]
    next[k] = null
    setSlots(next)
    setStatus('build')
  }

  const clear = () => {
    setSlots(Array(puzzle.words.length).fill(null))
    setStatus('build')
  }

  const depart = () => {
    if (!full) return
    const ok = slots.every((wi, i) => wi === i)
    setStatus(ok ? 'go' : 'wrong')
    if (ok && !solved.includes(pi)) setSolved([...solved, pi])
  }

  let conflict = null
  if (status === 'wrong') {
    for (let i = 0; i < slots.length - 1; i += 1) {
      const a = puzzle.words[slots[i]]
      const b = puzzle.words[slots[i + 1]]
      if (CAT_INDEX[a[1]] > CAT_INDEX[b[1]]) {
        conflict = { a, b }
        break
      }
    }
  }

  const phrase = `${article === 'a/an' ? 'a' : article} ${puzzle.words.map((w) => w[0]).join(' ')} ${puzzle.noun}`

  return (
    <section className={styles.station} aria-labelledby="adj-train-title">
      <div className={styles.stationHead}>
        <div>
          <p className={styles.eyebrow}>Adjective order · OSASCOMP</p>
          <h2 id="adj-train-title" className={styles.stationTitle}>Đoàn tàu tính từ</h2>
          <p className={styles.stationSub}>
            Bấm từng tính từ trên sân ga để chất lên toa. Tàu chỉ chạy khi các toa đúng thứ tự
            Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose → danh từ.
          </p>
        </div>
        <div className={styles.stops} role="group" aria-label="Chọn chuyến tàu">
          {TRAIN_PUZZLES.map((p, i) => (
            <button
              key={i}
              type="button"
              className={styles.stop}
              aria-pressed={i === pi}
              aria-label={`Chuyến ${i + 1}${solved.includes(i) ? ' (đã hoàn thành)' : ''}`}
              onClick={() => load(i)}
            >
              {solved.includes(i) ? <CheckCircleFilled aria-hidden="true" /> : i + 1}
            </button>
          ))}
        </div>
      </div>

      <OrderLegend />

      <div className={styles.ticket}>
        <span className={styles.ticketLabel}>Vé chuyến {pi + 1}</span>
        <span className={styles.ticketVi}>“{puzzle.vi}”</span>
      </div>

      <div className={styles.trackWrap}>
        <div className={`${styles.train} ${status === 'go' ? styles.trainGo : ''} ${status === 'wrong' ? styles.trainShake : ''}`}>
          <div className={styles.articleCar}>
            <span>{article}</span>
          </div>
          {slots.map((wi, k) => {
            if (wi === null) {
              return (
                <div key={k} className={`${styles.car} ${styles.carEmpty}`}>
                  <span className={styles.carNo}>Toa {k + 1}</span>
                  <span className={styles.carWord}>—</span>
                </div>
              )
            }
            const [word, cat] = puzzle.words[wi]
            const c = CAT[cat]
            const wrong = status === 'wrong' && wi !== k
            return (
              <button
                key={k}
                type="button"
                className={`${styles.car} ${showCats ? styles.carTinted : ''} ${wrong ? styles.carWrong : ''}`}
                style={{ '--cat': c.color }}
                onClick={() => unload(k)}
                disabled={status === 'go'}
                aria-label={`Toa ${k + 1}: ${word}${showCats ? ` (${c.name})` : ''}. Bấm để dỡ xuống`}
              >
                <span className={styles.carNo}>Toa {k + 1}</span>
                <span className={styles.carWord}>{word}</span>
                {showCats && <span className={styles.carCat}>{c.name}</span>}
              </button>
            )
          })}
          <div className={styles.loco}>
            <span className={styles.smoke} aria-hidden="true" />
            <span className={styles.locoLabel}>noun</span>
            <span className={styles.locoWord}>{puzzle.noun}</span>
          </div>
        </div>
        <div className={styles.rails} aria-hidden="true" />
      </div>

      <div className={styles.platform}>
        <p className={styles.platformLabel}>Sân ga — tính từ đang chờ lên tàu</p>
        <div className={styles.pool}>
          {pool.length === 0 && <span className={styles.poolEmpty}>Đã chất hết hàng lên tàu.</span>}
          {pool.map((wi) => {
            const [word, cat] = puzzle.words[wi]
            return (
              <button
                key={wi}
                type="button"
                className={`${styles.crate} ${hints ? styles.crateHint : ''}`}
                style={{ '--cat': CAT[cat].color }}
                onClick={() => place(wi)}
                disabled={status === 'go'}
              >
                {word}
                {hints && <small className={styles.crateCat}>{CAT[cat].name}</small>}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.controls}>
        {status === 'go' ? (
          <Button
            type="primary"
            className={styles.brassBtn}
            icon={<StepForwardOutlined />}
            onClick={() => load((pi + 1) % TRAIN_PUZZLES.length)}
          >
            Chuyến tiếp theo
          </Button>
        ) : (
          <Button type="primary" className={styles.brassBtn} icon={<ArrowRightOutlined />} iconPlacement="end" onClick={depart} disabled={!full}>
            Khởi hành
          </Button>
        )}
        <Button icon={<UndoOutlined />} onClick={clear} disabled={status === 'go' || slots.every((s) => s === null)}>
          Dỡ hết toa
        </Button>
        <Button
          icon={hints ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          onClick={() => setHints((h) => !h)}
          aria-pressed={hints}
        >
          {hints ? 'Ẩn nhãn loại' : 'Hiện nhãn loại'}
        </Button>
      </div>

      <div className={styles.signal} aria-live="polite">
        {status === 'build' && (
          <p className={styles.signalIdle}>
            <span className={`${styles.lamp} ${full ? styles.lampAmber : ''}`} aria-hidden="true" />
            {full ? 'Đủ toa rồi — bấm “Khởi hành” để kiểm tra.' : `Còn ${slots.filter((s) => s === null).length} toa trống.`}
          </p>
        )}
        {status === 'wrong' && (
          <p className={styles.signalStop}>
            <span className={`${styles.lamp} ${styles.lampRed}`} aria-hidden="true" />
            <span>
              Đèn đỏ! {conflict ? (
                <>
                  “<strong>{conflict.a[0]}</strong>” ({CAT[conflict.a[1]].name}) phải đứng <em>sau</em> “
                  <strong>{conflict.b[0]}</strong>” ({CAT[conflict.b[1]].name}).
                </>
              ) : 'Thứ tự chưa đúng.'} Bấm vào toa để dỡ xuống và xếp lại.
            </span>
          </p>
        )}
        {status === 'go' && (
          <div className={styles.signalGo}>
            <p className={styles.signalGoHead}>
              <span className={`${styles.lamp} ${styles.lampGreen}`} aria-hidden="true" />
              Đèn xanh — tàu đã khởi hành!
            </p>
            <p className={styles.phrase}>
              {phrase.split(' ').map((token, i) => {
                const hit = puzzle.words.find((w) => w[0] === token)
                return hit ? (
                  <span key={i} className={styles.phraseWord} style={{ '--cat': CAT[hit[1]].color }} title={CAT[hit[1]].name}>
                    {token}
                  </span>
                ) : (
                  <span key={i} className={styles.phrasePlain}>{token}</span>
                )
              })}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Signature 2 — adjective → adverb converter                        */
/* ------------------------------------------------------------------ */

function Converter() {
  const [word, setWord] = useState('happy')
  const r = useMemo(() => convertAdjective(word), [word])
  const rule = r.status === 'ok' ? ADV_RULES[r.rule] : null

  return (
    <section className={styles.converter} aria-labelledby="adj-conv-title">
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>02</span>
        <div>
          <h2 id="adj-conv-title" className={styles.sectionTitle}>Máy đổi tính từ → trạng từ</h2>
          <p className={styles.sectionSub}>Gõ một tính từ hoặc chọn nhanh bên dưới để xem quy tắc thêm -ly và các bẫy thường gặp.</p>
        </div>
      </div>

      <div className={styles.convInputRow}>
        <label htmlFor="adj-conv-input" className={styles.convLabel}>Tính từ</label>
        <Input
          id="adj-conv-input"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="ví dụ: careful"
          allowClear
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          maxLength={20}
          className={styles.convInput}
        />
      </div>

      <div className={styles.picks} role="group" aria-label="Chọn nhanh tính từ">
        {CONVERTER_PICKS.map((p) => (
          <button key={p} type="button" className={styles.pick} aria-pressed={word.trim().toLowerCase() === p} onClick={() => setWord(p)}>
            {p}
          </button>
        ))}
      </div>

      <div className={styles.machine} aria-live="polite">
        {r.status === 'empty' && <p className={styles.machineMsg}>Nhập một tính từ để bắt đầu.</p>}
        {r.status === 'invalid' && <p className={styles.machineMsg}>Chỉ nhập một từ tiếng Anh (chữ cái a–z).</p>}
        {r.status === 'ok' && (
          <>
            <div className={styles.machineRow}>
              <div className={styles.slotIn}>
                <span className={styles.slotTag}>adjective</span>
                <span className={styles.slotWord}>
                  {r.parts ? (
                    <>
                      {r.parts.stem}
                      {r.parts.from && <span className={styles.endOld}>{r.parts.from}</span>}
                    </>
                  ) : (
                    r.adj
                  )}
                </span>
              </div>
              <div className={`${styles.gear} ${styles[`tone_${rule.tone}`]}`}>
                <span className={styles.gearLabel}>{rule.label}</span>
                <ArrowRightOutlined aria-hidden="true" />
              </div>
              <div className={`${styles.slotOut} ${r.adv ? '' : styles.slotNone}`}>
                <span className={styles.slotTag}>adverb</span>
                <span className={styles.slotWord}>
                  {!r.adv && '✗ không có'}
                  {r.adv && r.parts && (
                    <>
                      {r.parts.stem}
                      <span className={styles.endNew}>{r.parts.to}</span>
                    </>
                  )}
                  {r.adv && !r.parts && r.adv}
                </span>
              </div>
            </div>

            <p className={styles.ruleText}>{rule.vi}</p>
            {r.note && <p className={styles.ruleNote}><BulbOutlined aria-hidden="true" /> {r.note}</p>}
            {r.guess && (
              <p className={styles.ruleNote}>
                <BulbOutlined aria-hidden="true" /> Từ tận cùng -ly thường đã là trạng từ (slowly) hoặc là tính từ đuôi -ly (friendly, lovely, lonely, silly, ugly). Với loại sau, dùng “in a … way”.
              </p>
            )}

            {r.ex && (
              <div className={styles.exPair}>
                <p><span className={styles.exTag}>adj</span> <Hl text={r.ex[0]} /></p>
                <p><span className={`${styles.exTag} ${styles.exTagAdv}`}>adv</span> <Hl text={r.ex[1]} className={styles.hlAdv} /></p>
              </div>
            )}

            {r.trap && (
              <div className={styles.trap}>
                <WarningOutlined aria-hidden="true" className={styles.trapIcon} />
                <div>
                  <strong>Bẫy: {r.adj} ≠ {r.trap.word}</strong>
                  <p>“{r.trap.word}” nghĩa là <em>{r.trap.vi}</em>. <Hl text={r.trap.ex} className={styles.hlAdv} /></p>
                </div>
              </div>
            )}

            {!r.curated && !r.guess && (
              <p className={styles.machineFoot}>Kết quả áp dụng quy tắc chính tả. Hãy chắc chắn từ bạn nhập là tính từ và tra từ điển nếu nghi ngờ ngoại lệ.</p>
            )}
          </>
        )}
      </div>

      <div className={styles.ruleGrid}>
        {['base', 'y', 'le', 'ic', 'll', 'ue', 'same', 'lyAdj'].map((k) => (
          <div key={k} className={`${styles.ruleCard} ${styles[`tone_${ADV_RULES[k].tone}`]}`}>
            <code className={styles.ruleCode}>{ADV_RULES[k].label}</code>
            <span className={styles.ruleCardText}>
              {{
                base: 'slow → slowly · careful → carefully · nice → nicely',
                y: 'happy → happily · easy → easily',
                le: 'gentle → gently · terrible → terribly',
                ic: 'basic → basically · tragic → tragically',
                ll: 'full → fully · dull → dully',
                ue: 'true → truly · due → duly',
                same: 'fast, hard, late, early, high, daily',
                lyAdj: 'friendly, lovely, lonely, silly, ugly',
              }[k]}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function AdjectivePosition() {
  return (
    <section className={styles.panel} aria-labelledby="adj-pos-title">
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>03</span>
        <div>
          <h2 id="adj-pos-title" className={styles.sectionTitle}>Tính từ đứng ở đâu?</h2>
          <p className={styles.sectionSub}>Tính từ bổ nghĩa cho danh từ; trạng từ bổ nghĩa cho động từ, tính từ, trạng từ khác hoặc cả câu.</p>
        </div>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.posCard}>
          <h3 className={styles.posTitle}>1 · Trước danh từ</h3>
          <code className={styles.formula}>(a/an/the) + adj + noun</code>
          <p className={styles.posText}>Dùng khi tính từ trực tiếp mô tả danh từ. Nhiều tính từ thì theo thứ tự OSASCOMP.</p>
          <p className={styles.posEx}>She has a <mark className={styles.hl}>beautiful</mark> voice.</p>
          <p className={styles.posEx}>It was a <mark className={styles.hl}>long</mark>, <mark className={styles.hl}>tiring</mark> day.</p>
        </div>
        <div className={styles.posCard}>
          <h3 className={styles.posTitle}>2 · Sau động từ nối</h3>
          <code className={styles.formula}>S + linking verb + adj</code>
          <p className={styles.posText}>Động từ nối không diễn tả hành động mà mô tả trạng thái của chủ ngữ → theo sau là tính từ.</p>
          <div className={styles.chips}>
            {LINKING_VERBS.map((v) => (
              <span key={v} className={styles.chip}>{v}</span>
            ))}
          </div>
          <p className={styles.posEx}>You look <mark className={styles.hl}>tired</mark>. · It became <mark className={styles.hl}>dark</mark>.</p>
        </div>
      </div>

      <h3 className={styles.subTitle}>Cùng động từ — tính từ hay trạng từ?</h3>
      <ul className={styles.contrastList}>
        {POSITION_CONTRASTS.map((c) => (
          <li key={c.en} className={styles.contrast}>
            <span className={`${styles.kind} ${c.kind === 'adv' ? styles.kindAdv : ''}`}>{c.kind === 'adv' ? 'adverb' : 'adjective'}</span>
            <div>
              <p className={styles.contrastEn}><Hl text={c.en} className={c.kind === 'adv' ? styles.hlAdv : styles.hl} /></p>
              <p className={styles.contrastVi}>{c.vi}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function AdverbTypes() {
  const [key, setKey] = useState('frequency')
  const t = ADVERB_TYPES.find((x) => x.key === key)

  return (
    <section className={styles.panel} aria-labelledby="adv-types-title">
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>04</span>
        <div>
          <h2 id="adv-types-title" className={styles.sectionTitle}>5 loại trạng từ & vị trí trong câu</h2>
          <p className={styles.sectionSub}>Chọn một loại để xem nó thường “đỗ” ở ga nào trong câu.</p>
        </div>
      </div>

      <Segmented
        block
        className={styles.typeSwitch}
        value={key}
        onChange={setKey}
        options={ADVERB_TYPES.map((x) => ({ value: x.key, label: x.name }))}
        aria-label="Loại trạng từ"
      />

      <div className={styles.typeBody}>
        <p className={styles.typeQ}>
          <strong>{t.vi}</strong> · {t.question}
        </p>
        <div className={styles.chips}>
          {t.words.map((w) => (
            <span key={w} className={`${styles.chip} ${styles.chipAdv}`}>{w}</span>
          ))}
        </div>

        {t.slots.length > 0 ? (
          <ol className={styles.slotLine} aria-label="Vị trí thường gặp">
            {SLOTS.map((s) => {
              const on = t.slots.includes(s.key)
              const main = on && t.slots[0] === s.key
              return (
                <li key={s.key} className={`${styles.slotStop} ${on ? styles.slotOn : ''} ${on && !main ? styles.slotAlt : ''}`}>
                  <span className={styles.slotDot} aria-hidden="true" />
                  <span className={styles.slotName}>{s.label}</span>
                  {on && <span className={styles.srOnly}>{main ? ' (vị trí chính)' : ' (vị trí phụ)'}</span>}
                </li>
              )
            })}
          </ol>
        ) : (
          <div className={styles.degreeLine}>
            <span className={styles.degreeBox}><mark className={styles.hlAdv}>very / quite / too</mark> + adj / adv</span>
            <span className={styles.degreeBox}>adj / adv + <mark className={styles.hlAdv}>enough</mark></span>
          </div>
        )}

        <p className={styles.posText}>{t.position}</p>
        <ul className={styles.exList}>
          {t.examples.map((e) => (
            <li key={e.en}>
              <p className={styles.exEn}><Hl text={e.en} className={styles.hlAdv} /></p>
              <p className={styles.exVi}>{e.vi}</p>
            </li>
          ))}
        </ul>
      </div>

      <aside className={styles.mpt}>
        <strong className={styles.mptTitle}>Nhiều trạng từ ở cuối câu: Manner → Place → Time</strong>
        <p className={styles.mptSentence}>
          She sang <span className={styles.mptM}>beautifully</span> <span className={styles.mptP}>at the concert</span>{' '}
          <span className={styles.mptT}>last night</span>.
        </p>
        <p className={styles.mptKey}>
          <span className={styles.mptM}>cách thức</span> <span className={styles.mptP}>nơi chốn</span> <span className={styles.mptT}>thời gian</span>
        </p>
      </aside>
    </section>
  )
}

function Feelings() {
  return (
    <section className={styles.panel} aria-labelledby="adj-feel-title">
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>05</span>
        <div>
          <h2 id="adj-feel-title" className={styles.sectionTitle}>-ed hay -ing?</h2>
          <p className={styles.sectionSub}>
            <strong>-ing</strong>: tính chất của sự vật/người <em>gây ra</em> cảm xúc. <strong>-ed</strong>: cảm xúc mà người <em>cảm thấy</em>.
          </p>
        </div>
      </div>
      <ul className={styles.feelGrid}>
        {FEELINGS.map((f) => (
          <li key={f.ing} className={styles.feelCard}>
            <div className={styles.feelSide}>
              <span className={styles.feelTag}>-ing · gây ra</span>
              <span className={styles.feelWord}>{f.ing}</span>
              <span className={styles.feelEx}><Hl text={f.ingEx} className={styles.hlIng} /></span>
            </div>
            <ArrowRightOutlined className={styles.feelArrow} aria-hidden="true" />
            <div className={styles.feelSide}>
              <span className={`${styles.feelTag} ${styles.feelTagEd}`}>-ed · cảm thấy</span>
              <span className={styles.feelWord}>{f.ed}</span>
              <span className={styles.feelEx}><Hl text={f.edEx} className={styles.hlEd} /></span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.panel} aria-labelledby="adj-mistakes-title">
      <div className={styles.sectionHead}>
        <span className={styles.sectionNum}>06</span>
        <div>
          <h2 id="adj-mistakes-title" className={styles.sectionTitle}>Lỗi hay gặp</h2>
          <p className={styles.sectionSub}>Những lỗi người Việt rất hay mắc khi dùng tính từ và trạng từ.</p>
        </div>
      </div>
      <ul className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <li key={m.wrong} className={styles.mistake}>
            <p className={styles.wrong}><CloseCircleFilled aria-hidden="true" /> <s>{m.wrong}</s><span className={styles.srOnly}> (sai)</span></p>
            <p className={styles.right}><CheckCircleFilled aria-hidden="true" /> {m.right}<span className={styles.srOnly}> (đúng)</span></p>
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

export default function AdjectivesAdverbs() {
  return (
    <div className={styles.page}>
      <OrderTrain />
      <Converter />
      <AdjectivePosition />
      <AdverbTypes />
      <Feelings />
      <Mistakes />
    </div>
  )
}
