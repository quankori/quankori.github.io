import { useId, useMemo, useState } from 'react'
import { Button, Input, Segmented } from 'antd'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ReloadOutlined,
  SettingOutlined,
  SwapOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './Nouns.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: [highlighted part]                                 */
/* ------------------------------------------------------------------ */

const JAR_ITEMS = [
  { word: 'apple', icon: '🍎', type: 'c', why: 'Đếm được: one apple, two apples.' },
  { word: 'water', icon: '💧', type: 'u', why: 'Chất lỏng → không đếm được. Đếm bằng đơn vị: a glass of water.' },
  { word: 'advice', icon: '💬', type: 'u', why: 'Khác tiếng Việt, "advice" không đếm được: some advice, a piece of advice (✗ an advice).' },
  { word: 'chair', icon: '🪑', type: 'c', why: 'Đồ vật riêng lẻ, đếm được: three chairs.' },
  { word: 'information', icon: 'ℹ️', type: 'u', why: 'Không đếm được: some information (✗ informations).' },
  { word: 'furniture', icon: '🛋️', type: 'u', why: 'Danh từ chỉ cả nhóm đồ nội thất → không đếm được: a piece of furniture.' },
  { word: 'money', icon: '💵', type: 'u', why: '"money" không đếm được (much money); đếm được là "coin, note, dollar".' },
  { word: 'coin', icon: '🪙', type: 'c', why: 'Từng đồng xu riêng lẻ → đếm được: five coins.' },
  { word: 'luggage', icon: '🧳', type: 'u', why: 'Hành lý nói chung → không đếm được: two pieces of luggage.' },
  { word: 'news', icon: '📰', type: 'u', why: 'Có đuôi -s nhưng không đếm được và đi với động từ số ít: The news is good.' },
  { word: 'rice', icon: '🍚', type: 'u', why: 'Hạt quá nhỏ để đếm → không đếm được: a bowl of rice.' },
  { word: 'idea', icon: '💡', type: 'c', why: 'Ý tưởng đếm được: I have an idea / two ideas.' },
  { word: 'suitcase', icon: '💼', type: 'c', why: 'Cái vali cụ thể → đếm được: two suitcases (còn "luggage" thì không).' },
  { word: 'job', icon: '👷', type: 'c', why: '"job" đếm được (a job, two jobs); "work" (công việc nói chung) thì không đếm được.' },
]

const RULES = [
  { key: 's', label: '+ s', name: 'Quy tắc chung', ex: 'book → books · day → days' },
  { key: 'es', label: '+ es', name: 'Sau s, x, z, ch, sh', ex: 'bus → buses · box → boxes · watch → watches' },
  { key: 'ies', label: 'y → ies', name: 'Phụ âm + y', ex: 'baby → babies · city → cities' },
  { key: 'ves', label: 'f/fe → ves', name: 'Một số từ tận cùng f/fe', ex: 'leaf → leaves · knife → knives' },
  { key: 'o', label: 'o → oes / os', name: 'Tận cùng -o', ex: 'potato → potatoes · photo → photos' },
  { key: 'irregular', label: 'Bất quy tắc', name: 'Đổi nguyên âm / đuôi', ex: 'man → men · child → children' },
  { key: 'same', label: 'Không đổi', name: 'Số ít = số nhiều', ex: 'sheep → sheep · fish → fish' },
  { key: 'classical', label: 'Latin / Hy Lạp', name: 'Giữ đuôi gốc', ex: 'cactus → cacti · criterion → criteria' },
  { key: 'none', label: 'Không có số nhiều', name: 'Danh từ không đếm được', ex: 'advice · information · news' },
]

const IRREGULAR = {
  man: 'men', woman: 'women', child: 'children', mouse: 'mice', tooth: 'teeth',
  foot: 'feet', person: 'people', goose: 'geese', ox: 'oxen', louse: 'lice',
}
const UNCHANGED = ['sheep', 'fish', 'deer', 'series', 'species', 'aircraft', 'salmon', 'means']
const CLASSICAL = {
  cactus: 'cacti', fungus: 'fungi', nucleus: 'nuclei', stimulus: 'stimuli', criterion: 'criteria',
  phenomenon: 'phenomena', bacterium: 'bacteria', curriculum: 'curricula', datum: 'data', medium: 'media',
}
const UNCOUNTABLE_WORDS = [
  'information', 'advice', 'furniture', 'luggage', 'baggage', 'news', 'money', 'water', 'rice', 'homework',
  'equipment', 'knowledge', 'music', 'traffic', 'weather', 'research', 'evidence', 'progress', 'milk', 'sugar',
]
const VES = {
  leaf: 'leaves', knife: 'knives', wife: 'wives', life: 'lives', wolf: 'wolves', half: 'halves',
  shelf: 'shelves', thief: 'thieves', calf: 'calves', loaf: 'loaves', self: 'selves', elf: 'elves', scarf: 'scarves',
}
const F_EXCEPTIONS = ['roof', 'chief', 'belief', 'proof', 'chef', 'reef', 'safe', 'cliff', 'giraffe']
const OES = ['potato', 'tomato', 'hero', 'echo', 'veto', 'torpedo']
const CH_AS_K = ['stomach', 'monarch', 'epoch', 'patriarch']

const PRESETS = [
  'book', 'box', 'baby', 'day', 'leaf', 'roof', 'potato', 'photo', 'child',
  'mouse', 'tooth', 'person', 'sheep', 'cactus', 'analysis', 'criterion', 'phenomenon', 'advice',
]

const QUANTIFIERS = [
  { word: 'many', with: ['c'], ex: 'How [many] chairs do we need?', vi: 'Nhiều — thường dùng trong câu hỏi và phủ định.' },
  { word: 'much', with: ['u'], ex: 'I don’t have [much] time.', vi: 'Nhiều — thường dùng trong câu hỏi và phủ định.' },
  { word: 'a lot of / lots of', with: ['c', 'u'], ex: 'She has [a lot of] friends and [lots of] money.', vi: 'Nhiều — dùng tự nhiên trong câu khẳng định.' },
  { word: 'a few', with: ['c'], ex: 'I have [a few] ideas.', vi: 'Một vài — đủ dùng, nghĩa tích cực.' },
  { word: 'few', with: ['c'], ex: '[Few] people came, sadly.', vi: 'Rất ít, gần như không — nghĩa tiêu cực.' },
  { word: 'a little', with: ['u'], ex: 'Add [a little] salt.', vi: 'Một chút — đủ dùng, nghĩa tích cực.' },
  { word: 'little', with: ['u'], ex: 'There is [little] hope left.', vi: 'Rất ít, hầu như không — nghĩa tiêu cực.' },
  { word: 'some', with: ['c', 'u'], ex: 'I bought [some] apples and [some] rice.', vi: 'Một ít / vài — câu khẳng định, lời mời, lời đề nghị: Would you like some tea?' },
  { word: 'any', with: ['c', 'u'], ex: 'Do you have [any] questions? There isn’t [any] milk.', vi: 'Nào / chút nào — câu hỏi và câu phủ định.' },
  { word: 'several · a number of', with: ['c'], ex: 'We visited [several] museums.', vi: 'Một số, vài (nhiều hơn a few) — chỉ với danh từ số nhiều.' },
  { word: 'a great deal of · an amount of', with: ['u'], ex: 'It took [a great deal of] effort.', vi: 'Một lượng lớn — văn phong trang trọng, chỉ với không đếm được.' },
  { word: 'fewer / less', with: ['c', 'u'], ex: '[fewer] cars, [less] traffic', vi: 'Ít hơn: fewer + đếm được số nhiều; less + không đếm được.' },
]

const PARTITIVES = [
  { unit: 'a piece of', nouns: ['advice', 'information', 'furniture', 'news', 'luggage', 'cake'] },
  { unit: 'a bottle of', nouns: ['water', 'wine', 'milk'] },
  { unit: 'a glass of', nouns: ['water', 'milk', 'juice'] },
  { unit: 'a cup of', nouns: ['coffee', 'tea'] },
  { unit: 'a slice of', nouns: ['bread', 'cake', 'pizza'] },
  { unit: 'a loaf of', nouns: ['bread'] },
  { unit: 'a bowl of', nouns: ['rice', 'soup', 'noodles'] },
  { unit: 'a bar of', nouns: ['chocolate', 'soap'] },
  { unit: 'a kilo of', nouns: ['rice', 'meat', 'sugar'] },
  { unit: 'a sheet of', nouns: ['paper'] },
]

const DUAL = [
  {
    word: 'coffee',
    u: { en: 'I drink [coffee] every morning.', vi: 'cà phê (chất, nói chung)' },
    c: { en: 'Two [coffees], please.', vi: 'một ly cà phê (= a cup of coffee)' },
  },
  {
    word: 'paper',
    u: { en: 'The printer is out of [paper].', vi: 'giấy (chất liệu)' },
    c: { en: 'I read [a paper] on AI. / Buy [a paper].', vi: 'bài nghiên cứu / tờ báo' },
  },
  {
    word: 'glass',
    u: { en: 'The table is made of [glass].', vi: 'thủy tinh' },
    c: { en: 'Can I have [a glass] of water?', vi: 'cái ly, cái cốc' },
  },
  {
    word: 'time',
    u: { en: 'I don’t have much [time].', vi: 'thời gian' },
    c: { en: 'I’ve been there [three times].', vi: 'lần' },
  },
  {
    word: 'chicken',
    u: { en: 'We had [chicken] for dinner.', vi: 'thịt gà' },
    c: { en: 'There are [ten chickens] on the farm.', vi: 'con gà' },
  },
  {
    word: 'experience',
    u: { en: 'She has five years of [experience].', vi: 'kinh nghiệm' },
    c: { en: 'The trip was [an amazing experience].', vi: 'một trải nghiệm' },
  },
  {
    word: 'hair',
    u: { en: 'She has long black [hair].', vi: 'tóc (cả mái)' },
    c: { en: 'There’s [a hair] in my soup!', vi: 'một sợi tóc' },
  },
  {
    word: 'room',
    u: { en: 'Is there [room] for one more?', vi: 'chỗ trống, không gian' },
    c: { en: 'The hotel has [50 rooms].', vi: 'căn phòng' },
  },
]

const MISTAKES = [
  { bad: 'I need some informations.', good: 'I need some [information].', why: '"information" không đếm được → không thêm -s.' },
  { bad: 'Can you give me an advice?', good: 'Can you give me [some advice] / [a piece of advice]?', why: 'Không dùng a/an với danh từ không đếm được; dùng some hoặc a piece of.' },
  { bad: 'The news are bad.', good: 'The news [is] bad.', why: '"news" không đếm được → động từ số ít dù có đuôi -s.' },
  { bad: 'We bought new furnitures.', good: 'We bought new [furniture].', why: '"furniture" là danh từ tập hợp không đếm được.' },
  { bad: 'How much people came?', good: 'How [many] people came?', why: '"people" là số nhiều đếm được → many.' },
  { bad: 'There are less cars today.', good: 'There are [fewer] cars today.', why: 'fewer + danh từ đếm được; less + không đếm được (less traffic).' },
  { bad: 'She has two childs.', good: 'She has two [children].', why: '"child" có số nhiều bất quy tắc: children.' },
  { bad: 'My luggages are heavy.', good: 'My [luggage is] heavy.', why: '"luggage" không đếm được → không -s, động từ số ít.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const VOWELS = 'aeiou'

function pluralize(raw) {
  const w = raw.trim().toLowerCase()
  if (!w) return null
  if (!/^[a-z]+$/.test(w)) return { error: 'Chỉ nhập một từ, gồm chữ cái a–z.' }

  if (UNCOUNTABLE_WORDS.includes(w)) {
    return { plural: null, rule: 'none', note: `"${w}" không đếm được → không có dạng số nhiều. Dùng some ${w} / a lot of ${w}.` }
  }
  if (IRREGULAR[w]) return { plural: IRREGULAR[w], rule: 'irregular', note: 'Bất quy tắc — phải học thuộc.' }
  if (UNCHANGED.includes(w)) return { plural: w, rule: 'same', note: `one ${w} → two ${w}.` }
  if (CLASSICAL[w]) return { plural: CLASSICAL[w], rule: 'classical', note: 'Giữ cách chia số nhiều của tiếng Latin / Hy Lạp.' }
  if (w.length > 4 && w.endsWith('sis')) {
    return { plural: `${w.slice(0, -2)}es`, rule: 'classical', note: 'Đuôi -is → -es (analysis → analyses, crisis → crises).' }
  }
  if (w === 'quiz') return { plural: 'quizzes', rule: 'es', note: 'Gấp đôi z rồi thêm -es.' }
  if (CH_AS_K.includes(w)) return { plural: `${w}s`, rule: 's', note: '-ch đọc là /k/ nên chỉ thêm -s (stomach → stomachs).' }
  if (/(s|x|z|ch|sh)$/.test(w)) return { plural: `${w}es`, rule: 'es', note: 'Thêm -es, đọc là /ɪz/.' }
  if (w.endsWith('y') && w.length > 1) {
    if (VOWELS.includes(w[w.length - 2])) {
      return { plural: `${w}s`, rule: 's', note: 'Nguyên âm + y → chỉ thêm -s (day → days, boy → boys).' }
    }
    return { plural: `${w.slice(0, -1)}ies`, rule: 'ies', note: 'Phụ âm + y → bỏ y, thêm -ies.' }
  }
  if (VES[w]) return { plural: VES[w], rule: 'ves', note: 'f / fe → ves.' }
  if (F_EXCEPTIONS.includes(w)) {
    return { plural: `${w}s`, rule: 's', note: 'Ngoại lệ của nhóm f/fe: chỉ thêm -s (roof → roofs, chief → chiefs).' }
  }
  if (/(f|fe)$/.test(w)) {
    return { plural: `${w}s`, rule: 's', note: 'Phần lớn từ tận cùng -f/-fe khác chỉ thêm -s; nhóm -ves (leaf, knife, wife…) cần học thuộc.' }
  }
  if (w.endsWith('o')) {
    if (OES.includes(w)) return { plural: `${w}es`, rule: 'o', note: 'Nhóm thêm -es: potatoes, tomatoes, heroes, echoes.' }
    if (VOWELS.includes(w[w.length - 2])) return { plural: `${w}s`, rule: 'o', note: 'Nguyên âm + o → thêm -s (zoo → zoos, radio → radios).' }
    return { plural: `${w}s`, rule: 'o', note: 'Từ mượn / viết tắt thường chỉ thêm -s (photo, piano, kilo). Một số từ thêm -es — nên tra từ điển.' }
  }
  return { plural: `${w}s`, rule: 's', note: 'Quy tắc chung: thêm -s.' }
}

function commonPrefix(a, b) {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1
  return i
}

function Hl({ text, cls }) {
  return text.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) =>
    p.startsWith('[') ? <mark key={i} className={cls || styles.hl}>{p.slice(1, -1)}</mark> : <span key={i}>{p}</span>,
  )
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
/*  Sorting jars                                                       */
/* ------------------------------------------------------------------ */

const JAR_BODY = 'M46 30 H114 V40 Q142 46 142 74 V186 Q142 204 124 204 H36 Q18 204 18 186 V74 Q18 46 46 40 Z'
const JARS = [
  { kind: 'c', name: 'Countable', vi: 'Đếm được', note: 'a/an · số nhiều · many' },
  { kind: 'u', name: 'Uncountable', vi: 'Không đếm được', note: 'không a/an · không -s · much' },
]
const TOTAL_C =JAR_ITEMS.filter((it) => it.type === 'c').length
const TOTAL_U = JAR_ITEMS.length - TOTAL_C

function JarSvg({ kind, items }) {
  const uid = useId().replace(/:/g, '')
  const clip = `jar-clip-${uid}`
  const total = kind === 'c' ? TOTAL_C : TOTAL_U
  const level = total ? items.length / total : 0
  const liquidShift = (1 - level) * 158

  return (
    <svg viewBox="0 0 160 212" className={styles.jarSvg} aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <path d={JAR_BODY} />
        </clipPath>
      </defs>
      <rect x="40" y="4" width="80" height="22" rx="6" className={kind === 'c' ? styles.lidC : styles.lidU} />
      <rect x="40" y="20" width="80" height="6" className={styles.lidShade} />
      <path d={JAR_BODY} className={styles.glass} />
      <g clipPath={`url(#${clip})`}>
        {kind === 'u' ? (
          <>
            <g className={styles.liquid} style={{ transform: `translateY(${liquidShift}px)` }}>
              <path d="M10 48 q 15 -7 30 0 t 30 0 t 30 0 t 30 0 t 30 0 V 220 H 10 Z" className={styles.liquidFill} />
            </g>
            {items.map((it, i) => {
              const row = Math.floor(i / 3)
              const x = 42 + (i % 3) * 38 + (row % 2) * 10
              const y = 196 - row * 26
              return (
                <text key={it.word} x={x} y={y} className={styles.dissolved} textAnchor="middle">
                  {it.icon}
                </text>
              )
            })}
          </>
        ) : (
          items.map((it, i) => {
            const col = i % 4
            const row = Math.floor(i / 4)
            const cx = 39 + col * 27 + (row % 2) * 6
            const cy = 186 - row * 28
            return (
              <g key={it.word} className={styles.marble}>
                <circle cx={cx} cy={cy} r="13" className={styles.marbleBall} />
                <text x={cx} y={cy + 5} textAnchor="middle" className={styles.marbleIcon}>{it.icon}</text>
              </g>
            )
          })
        )}
      </g>
      <path d="M30 80 Q30 60 44 54" className={styles.shine} />
      <path d="M28 96 V 150" className={styles.shine} />
      <text x="80" y="20" textAnchor="middle" className={styles.lidText}>{items.length}/{total}</text>
    </svg>
  )
}

function SortingJars() {
  const [placed, setPlaced] = useState({})
  const [selected, setSelected] = useState(JAR_ITEMS[0].word)
  const [feedback, setFeedback] = useState(null)

  const pending = JAR_ITEMS.filter((it) => !placed[it.word])
  const inJar = (kind) => JAR_ITEMS.filter((it) => placed[it.word] && it.type === kind)
  const correct = Object.values(placed).filter(Boolean).length
  const doneCount = Object.keys(placed).length
  const current = JAR_ITEMS.find((it) => it.word === selected && !placed[it.word]) || pending[0]

  const drop = (choice) => {
    if (!current) return
    const ok = choice === current.type
    const next = { ...placed, [current.word]: ok }
    setPlaced(next)
    setFeedback({ item: current, ok })
    const rest = JAR_ITEMS.filter((it) => !(it.word in next))
    setSelected(rest[0] ? rest[0].word : null)
  }

  const reset = () => {
    setPlaced({})
    setSelected(JAR_ITEMS[0].word)
    setFeedback(null)
  }

  return (
    <section className={styles.pantry} aria-labelledby="nouns-jars-title">
      <div className={styles.pantryHead}>
        <div>
          <span className={styles.eyebrow}>Sorting jars</span>
          <h2 id="nouns-jars-title" className={styles.pantryTitle}>Đếm được hay không đếm được?</h2>
          <p className={styles.pantryHint}>Chọn một món trên kệ rồi bấm vào lọ phù hợp.</p>
        </div>
        <div className={styles.pantryScore} aria-live="polite">
          <strong>{correct}</strong>/{JAR_ITEMS.length} đúng
          <Button size="small" icon={<ReloadOutlined />} onClick={reset} className={styles.ghostBtn}>
            Làm lại
          </Button>
        </div>
      </div>

      <div className={styles.shelfItems} role="group" aria-label="Các món chưa phân loại">
        {pending.length ? (
          pending.map((it) => (
            <button
              key={it.word}
              type="button"
              className={styles.itemChip}
              aria-pressed={current && current.word === it.word}
              onClick={() => setSelected(it.word)}
            >
              <span aria-hidden="true">{it.icon}</span> {it.word}
            </button>
          ))
        ) : (
          <p className={styles.shelfDone}>Kệ trống! Bạn đúng {correct}/{JAR_ITEMS.length} món ngay lần đầu.</p>
        )}
      </div>

      <div className={styles.jars}>
        {JARS.map((jar) => (
          <div key={jar.kind} className={`${styles.jar} ${jar.kind === 'c' ? styles.jarC : styles.jarU}`}>
            <button
              type="button"
              className={styles.jarBtn}
              onClick={() => drop(jar.kind)}
              disabled={!current}
              aria-label={current ? `Bỏ "${current.word}" vào lọ ${jar.name}` : `Lọ ${jar.name}`}
            >
              <JarSvg kind={jar.kind} items={inJar(jar.kind)} />
            </button>
          </div>
        ))}
        <div className={styles.shelfBoard} aria-hidden="true" />
        {JARS.map((jar) => (
          <div key={`${jar.kind}-info`} className={`${styles.jar} ${jar.kind === 'c' ? styles.jarC : styles.jarU}`}>
            <span className={styles.jarLabel}>
              <strong>{jar.name}</strong>
              <span>{jar.vi}</span>
            </span>
            <p className={styles.jarNote}>{jar.note}</p>
            <ul className={styles.jarList} aria-label={`Trong lọ ${jar.name}`}>
              {inJar(jar.kind).map((it) => (
                <li key={it.word} className={placed[it.word] ? '' : styles.jarListMiss}>
                  {it.word}
                  {!placed[it.word] && <span className={styles.srOnly}> (bạn đã chọn sai lọ)</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.jarFeedback} role="status">
        {feedback ? (
          <p className={feedback.ok ? styles.fbOk : styles.fbBad} key={`${feedback.item.word}-${doneCount}`}>
            {feedback.ok ? <CheckCircleFilled aria-hidden="true" /> : <CloseCircleFilled aria-hidden="true" />}{' '}
            <strong>{feedback.item.word}</strong>
            {feedback.ok ? ' — chính xác! ' : ` — chưa đúng, đã chuyển sang lọ ${feedback.item.type === 'c' ? 'Countable' : 'Uncountable'}. `}
            {feedback.item.why}
          </p>
        ) : (
          <p className={styles.fbIdle}>
            Đang cầm: <strong>{current ? current.word : '—'}</strong>
          </p>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Plural machine                                                     */
/* ------------------------------------------------------------------ */

function PluralMachine() {
  const [value, setValue] = useState('leaf')
  const result = useMemo(() => pluralize(value), [value])
  const singular = value.trim().toLowerCase()
  const activeRule = result && !result.error ? result.rule : null

  let output = <span className={styles.outEmpty}>…</span>
  if (result && result.error) output = <span className={styles.outEmpty}>?</span>
  else if (result && result.plural === null) output = <span className={styles.outNone}>∅</span>
  else if (result) {
    const k = result.rule === 'same' ? result.plural.length : commonPrefix(singular, result.plural)
    output = (
      <>
        {result.plural.slice(0, k)}
        {result.plural.slice(k) && <mark className={styles.outEnd}>{result.plural.slice(k)}</mark>}
      </>
    )
  }

  return (
    <section className={styles.machine} aria-labelledby="nouns-machine-title">
      <SectionHead
        id="nouns-machine-title"
        icon={<SettingOutlined />}
        title="Plural machine"
        sub="Gõ một danh từ số ít — máy sẽ chia số nhiều và bật đèn quy tắc đã dùng."
      />

      <div className={styles.machineBody}>
        <label className={styles.hopper}>
          <span className={styles.hopperLabel}>Singular</span>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={24}
            allowClear
            placeholder="vd: box"
            className={styles.hopperInput}
            aria-label="Danh từ số ít"
          />
        </label>
        <div className={styles.gearBox} aria-hidden="true">
          <SettingOutlined key={value} className={styles.gear} />
          <SettingOutlined key={`${value}-b`} className={`${styles.gear} ${styles.gearSmall}`} />
        </div>
        <div className={styles.tray} aria-live="polite">
          <span className={styles.hopperLabel}>Plural</span>
          <span className={styles.trayWord}>{output}</span>
        </div>
      </div>

      {result && (
        <p className={result.error ? styles.machineErr : styles.machineNote}>
          {result.error || result.note}
        </p>
      )}

      <div className={styles.presets} role="group" aria-label="Từ mẫu">
        {PRESETS.map((w) => (
          <button key={w} type="button" className={styles.preset} aria-pressed={singular === w} onClick={() => setValue(w)}>
            {w}
          </button>
        ))}
      </div>

      <ol className={styles.lamps} aria-label="Bảng quy tắc">
        {RULES.map((r) => (
          <li key={r.key} className={`${styles.lamp} ${activeRule === r.key ? styles.lampOn : ''}`} aria-current={activeRule === r.key ? 'true' : undefined}>
            <span className={styles.bulb} aria-hidden="true" />
            <span className={styles.lampText}>
              <strong>{r.label}</strong> <span className={styles.lampName}>{r.name}</span>
              <span className={styles.lampEx}>{r.ex}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules: basics, quantifiers, partitives, dual nouns                 */
/* ------------------------------------------------------------------ */

function Basics() {
  return (
    <section className={styles.card} aria-labelledby="nouns-basics-title">
      <SectionHead id="nouns-basics-title" icon="⚖️" title="Hai loại danh từ" sub="Câu hỏi đầu tiên: có thể nói “một, hai, ba…” trực tiếp với danh từ này không?" />
      <div className={styles.compare}>
        <div className={`${styles.compareCol} ${styles.colC}`}>
          <h3>Countable · đếm được</h3>
          <ul>
            <li>Có số ít và số nhiều: <Hl text="[a] chair → three chair[s]" /></li>
            <li>Số ít bắt buộc có từ hạn định: <Hl text="[a / the / my] book" /> (✗ I have book.)</li>
            <li>Đi với <b>many, a few, few, several, a number of</b></li>
            <li>Động từ theo số: <Hl text="The apple [is] red. The apples [are] red." /></li>
          </ul>
        </div>
        <div className={`${styles.compareCol} ${styles.colU}`}>
          <h3>Uncountable · không đếm được</h3>
          <ul>
            <li>Chỉ có một dạng, không thêm -s: <Hl text="water, rice, [advice]" /></li>
            <li>Không dùng a/an: <Hl text="[some] information" /> (✗ an information)</li>
            <li>Đi với <b>much, a little, little, a great deal of</b></li>
            <li>Luôn dùng động từ số ít: <Hl text="The furniture [is] new." /></li>
          </ul>
        </div>
      </div>
      <p className={styles.tip}>
        <b>Mẹo:</b> chất lỏng, chất khí, vật liệu, hạt nhỏ (water, air, wood, sugar), khái niệm trừu tượng (love, happiness, knowledge)
        và các danh từ “tập hợp” (furniture, luggage, equipment) thường không đếm được.
      </p>
    </section>
  )
}

function Quantifiers() {
  const [filter, setFilter] = useState('all')
  const list = QUANTIFIERS.filter((q) => filter === 'all' || q.with.includes(filter))
  return (
    <section className={styles.card} aria-labelledby="nouns-quant-title">
      <SectionHead id="nouns-quant-title" icon="🥄" title="Quantifiers — từ chỉ số lượng" sub="Lọc để xem từ nào đi với loại danh từ nào." />
      <Segmented
        value={filter}
        onChange={setFilter}
        options={[
          { value: 'all', label: 'Tất cả' },
          { value: 'c', label: 'Countable' },
          { value: 'u', label: 'Uncountable' },
        ]}
        className={styles.segment}
      />
      <ul className={styles.quantGrid}>
        {list.map((q) => (
          <li key={q.word} className={styles.quant}>
            <div className={styles.quantTop}>
              <strong className={styles.quantWord}>{q.word}</strong>
              <span className={styles.tags}>
                {q.with.includes('c') && <span className={styles.tagC}>C</span>}
                {q.with.includes('u') && <span className={styles.tagU}>U</span>}
              </span>
            </div>
            <p className={styles.quantEx}><Hl text={q.ex} /></p>
            <p className={styles.quantVi}>{q.vi}</p>
          </li>
        ))}
      </ul>
      <p className={styles.legendLine}>
        <span className={styles.tagC}>C</span> đếm được số nhiều · <span className={styles.tagU}>U</span> không đếm được
      </p>
    </section>
  )
}

function Partitives() {
  return (
    <section className={styles.card} aria-labelledby="nouns-part-title">
      <SectionHead
        id="nouns-part-title"
        icon="🍞"
        title="Partitives — “đếm” danh từ không đếm được"
        sub="Đếm cái vỏ (đơn vị), không đếm cái ruột: a bottle of water → two bottles of water."
      />
      <ul className={styles.partGrid}>
        {PARTITIVES.map((p) => (
          <li key={p.unit} className={styles.part}>
            <span className={styles.partUnit}>{p.unit}</span>
            <span className={styles.partNouns}>{p.nouns.join(' · ')}</span>
          </li>
        ))}
      </ul>
      <p className={styles.tip}>
        Số nhiều nằm ở <b>đơn vị</b>: <Hl text="three [pieces] of advice, two [loaves] of bread" /> (✗ three pieces of advices).
      </p>
    </section>
  )
}

function DualNouns() {
  const [flipped, setFlipped] = useState({})
  return (
    <section className={styles.card} aria-labelledby="nouns-dual-title">
      <SectionHead
        id="nouns-dual-title"
        icon={<SwapOutlined />}
        title="Danh từ “hai mặt”"
        sub="Cùng một từ, đếm được hay không tùy nghĩa. Bấm vào thẻ để lật."
      />
      <ul className={styles.dualGrid}>
        {DUAL.map((d) => {
          const side = flipped[d.word] ? 'c' : 'u'
          const data = d[side]
          return (
            <li key={d.word}>
              <button
                type="button"
                className={`${styles.dual} ${side === 'c' ? styles.dualC : styles.dualU}`}
                onClick={() => setFlipped((f) => ({ ...f, [d.word]: !f[d.word] }))}
                aria-label={`${d.word}: đang xem nghĩa ${side === 'c' ? 'đếm được' : 'không đếm được'}. Bấm để lật.`}
              >
                <span className={styles.dualHead}>
                  <strong>{d.word}</strong>
                  <span className={side === 'c' ? styles.tagC : styles.tagU}>{side === 'c' ? 'C' : 'U'}</span>
                </span>
                <span className={styles.dualEn}><Hl text={data.en} /></span>
                <span className={styles.dualVi}>{data.vi}</span>
                <span className={styles.dualFlip} aria-hidden="true"><SwapOutlined /> lật</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.card} aria-labelledby="nouns-mistakes-title">
      <SectionHead id="nouns-mistakes-title" icon={<WarningOutlined />} title="Lỗi hay gặp" sub="Người Việt hay đếm những thứ tiếng Anh không cho đếm." />
      <ul className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mistake}>
            <p className={styles.bad}><span aria-hidden="true">❌</span> <s>{m.bad}</s></p>
            <p className={styles.good}><span aria-hidden="true">✅</span> <Hl text={m.good} cls={styles.hlGood} /></p>
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

export default function Nouns() {
  return (
    <div className={styles.page}>
      <SortingJars />
      <Basics />
      <PluralMachine />
      <Quantifiers />
      <Partitives />
      <DualNouns />
      <Mistakes />
    </div>
  )
}
