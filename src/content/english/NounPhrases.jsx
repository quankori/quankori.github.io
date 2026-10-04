import { useState } from 'react'
import { Button, Segmented } from 'antd'
import {
  ApartmentOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
  MinusOutlined,
  PlusOutlined,
  ReloadOutlined,
  SwapOutlined,
  UndoOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './NounPhrases.module.css'

/* ------------------------------------------------------------------ */
/*  Data — wrap key words in [brackets] to highlight them              */
/* ------------------------------------------------------------------ */

const HEAD = { singular: 'house', plural: 'houses', color: '#b42346' }

// Order of the "+" buttons (and of "Thêm lớp kế tiếp").
const LAYERS = [
  {
    key: 'det',
    zone: 'det',
    short: 'Det',
    label: 'Determiner',
    vi: 'Từ hạn định',
    words: 'the',
    color: '#334155',
    note: 'Lớp ngoài cùng: mạo từ (a/an/the), sở hữu (my, the government’s), chỉ định (this, those). Danh từ đếm được số ít luôn cần một determiner.',
  },
  {
    key: 'quant',
    zone: 'det',
    short: 'Quant',
    label: 'Quantifier / number',
    vi: 'Số lượng',
    words: 'two',
    color: '#6b5b2e',
    note: 'Số đếm, số thứ tự, lượng từ: two, the first, several, many, all. Đứng sau the: the two…, the first… Khi thêm "two", head phải đổi sang số nhiều: houses.',
  },
  {
    key: 'adj',
    zone: 'pre',
    short: 'Adj',
    label: 'Adjective',
    vi: 'Tính từ',
    words: 'old',
    color: '#4d7c0f',
    note: 'Tính từ đứng trước danh từ (pre-modifier). Nhiều tính từ thì theo thứ tự ý kiến → kích thước → tuổi → hình dạng → màu → nguồn gốc → chất liệu → mục đích.',
  },
  {
    key: 'nmod',
    zone: 'pre',
    short: 'N-mod',
    label: 'Noun modifier',
    vi: 'Danh từ bổ nghĩa',
    words: 'stone',
    color: '#b45309',
    note: 'Danh từ đứng ngay trước head để phân loại (chất liệu, loại, mục đích): a stone house, a bus stop. Luôn sát head nhất và giữ dạng số ít.',
  },
  {
    key: 'prep',
    zone: 'post',
    short: 'PP',
    label: 'Prepositional phrase',
    vi: 'Cụm giới từ',
    words: 'on the hill',
    color: '#0f766e',
    note: 'Post-modifier phổ biến nhất: giới từ + danh từ đứng SAU head. the houses on the hill, a book about whales, the price of oil.',
  },
  {
    key: 'part',
    zone: 'post',
    short: 'Part',
    label: 'Participle phrase',
    vi: 'Cụm phân từ',
    words: 'built in 1900',
    color: '#1d4ed8',
    note: 'Mệnh đề quan hệ rút gọn: (which were) built in 1900. V3/V-ed mang nghĩa bị động; V-ing mang nghĩa chủ động (the man sitting next to me).',
  },
  {
    key: 'rel',
    zone: 'post',
    short: 'Rel',
    label: 'Relative clause',
    vi: 'Mệnh đề quan hệ',
    words: 'that my grandfather bought',
    color: '#6d28d9',
    excludes: 'inf',
    note: 'Mệnh đề đầy đủ bắt đầu bằng that/which/who/whose/where… luôn đứng cuối cụm. Động từ trong mệnh đề chia theo head mà nó bổ nghĩa.',
  },
  {
    key: 'inf',
    zone: 'post',
    short: 'To-V',
    label: 'To-infinitive',
    vi: 'Động từ nguyên mẫu có to',
    words: 'to rent',
    color: '#be185d',
    excludes: 'rel',
    note: 'to-V sau danh từ nói về mục đích hoặc việc cần làm: a house to rent, a decision to leave, the first person to arrive. (Ở đây chọn to-V hoặc mệnh đề quan hệ, không dùng cả hai.)',
  },
]

const LAYER_BY_KEY = Object.fromEntries(LAYERS.map((l) => [l.key, l]))

// From the inside out: which shell wraps which.
const WRAP_ORDER = ['nmod', 'adj', 'prep', 'part', 'rel', 'inf', 'quant', 'det']

const ZONES = [
  { key: 'det', label: 'Determiner', vi: 'hạn định / số lượng' },
  { key: 'pre', label: 'Pre-modifiers', vi: 'bổ ngữ đứng trước' },
  { key: 'head', label: 'HEAD', vi: 'danh từ chính' },
  { key: 'post', label: 'Post-modifiers', vi: 'bổ ngữ đứng sau' },
]

const WHY_ACADEMIC = [
  'Gói nhiều thông tin vào một cụm, câu gọn và “đặc” hơn — đúng phong cách học thuật.',
  'Giọng văn khách quan: nói về sự việc (the increase) thay vì con người làm gì (people increased).',
  'Dễ nối ý nguyên nhân – kết quả: [A] leads to / results in / is caused by [B].',
  'IELTS Task 1 & 2 chấm điểm Lexical Resource và Grammatical Range — cụm danh từ phức là cách “ăn điểm” tự nhiên.',
]

const NOMINAL = [
  {
    plain: 'The government [decided] to raise taxes, and this [surprised] many people.',
    academic: '[The government’s decision to raise taxes] surprised many people.',
    pair: 'decide → decision (giữ “to”: decide to → decision to)',
  },
  {
    plain: 'Pollution [increased rapidly], so more people [became ill].',
    academic: '[The rapid increase in pollution] led to [a rise in illness].',
    pair: 'increase rapidly → the rapid increase in; become ill → a rise in illness',
  },
  {
    plain: 'Because people [consume] more and more energy, cities are getting hotter.',
    academic: '[The growing consumption of energy] is making cities hotter.',
    pair: 'consume → consumption (of)',
  },
  {
    plain: 'If young people [cannot find] jobs, many of them [move] abroad.',
    academic: '[Youth unemployment] often results in [emigration].',
    pair: 'cannot find jobs → unemployment; move abroad → emigration',
  },
  {
    plain: 'The number of students [fell] slightly in 2020.',
    academic: 'There was [a slight fall in the number of students] in 2020.',
    pair: 'fell slightly → a slight fall in (IELTS Task 1)',
  },
]

const ORDER = [
  { key: 'O', label: 'Opinion', vi: 'Ý kiến', word: 'beautiful' },
  { key: 'S', label: 'Size', vi: 'Kích thước', word: 'small' },
  { key: 'A', label: 'Age', vi: 'Tuổi', word: 'old' },
  { key: 'Sh', label: 'Shape', vi: 'Hình dạng', word: 'round' },
  { key: 'C', label: 'Colour', vi: 'Màu', word: 'brown' },
  { key: 'Or', label: 'Origin', vi: 'Nguồn gốc', word: 'Italian' },
  { key: 'M', label: 'Material', vi: 'Chất liệu', word: 'wooden' },
  { key: 'P', label: 'Purpose', vi: 'Mục đích / loại', word: 'dining' },
]

const ORDER_EXAMPLES = [
  'a [lovely] [little] [old] cottage',
  'a [big] [black] [German] car',
  'an [expensive] [leather] handbag',
  'two [young] [Vietnamese] [software] engineers',
]

const COMPOUNDS = [
  {
    title: 'Noun + noun: danh từ đầu giữ số ít',
    note: 'Danh từ đứng trước làm nhiệm vụ như tính từ nên không thêm -s, kể cả khi ý nghĩa là số nhiều.',
    good: ['a shoe shop', 'a bus stop', 'a ticket office', 'a vegetable garden'],
    bad: ['a shoes shop', 'a tickets office'],
  },
  {
    title: 'Số + danh từ ghép: có gạch nối, không -s',
    note: 'Cụm “số + đơn vị” đứng trước danh từ → nối bằng gạch ngang, đơn vị ở số ít. So sánh: The boy is 10 years old (vị ngữ, không gạch nối, có -s).',
    good: ['a 10-year-old boy', 'a five-minute walk', 'a two-hour meeting', 'a three-bedroom flat'],
    bad: ['a 10-years-old boy', 'a five minutes walk'],
  },
  {
    title: 'Ngoại lệ: danh từ vốn luôn ở số nhiều',
    note: 'Một số danh từ luôn có -s (clothes, sports, sales, savings, arts) nên giữ nguyên khi làm bổ ngữ.',
    good: ['a clothes shop', 'a sports car', 'the sales department', 'a savings account'],
    bad: ['a cloth shop (= cửa hàng vải, nghĩa khác)'],
  },
]

const AGREEMENT = [
  { pre: 'The', head: 'list', post: 'of items on the shelves', verb: 'is', rest: 'out of date.', note: 'Head = list (số ít) → is. “items”, “shelves” chỉ nằm trong bổ ngữ.' },
  { pre: 'The', head: 'quality', post: 'of the new products', verb: 'has', rest: 'improved.', note: 'Head = quality (không đếm được) → has.' },
  { pre: '', head: 'One', post: 'of my best friends', verb: 'lives', rest: 'in Hue.', note: 'Head = one → lives, dù ngay trước động từ là “friends”.' },
  { pre: 'The', head: 'students', post: 'in the class that I teach', verb: 'are', rest: 'very motivated.', note: 'Head = students (số nhiều) → are. “class” và “I teach” không ảnh hưởng.' },
  { pre: 'The', head: 'number', post: 'of cars on the roads', verb: 'has', rest: 'doubled.', note: 'The number of + N số nhiều → động từ số ít. Nhưng: A number of cars ARE… (= many cars).' },
]

const MISTAKES = [
  { bad: 'She has a ten-years-old daughter.', good: 'She has a [ten-year-old] daughter.', why: 'Cụm số + danh từ đứng trước danh từ đóng vai tính từ → không thêm -s.' },
  { bad: 'It’s a five minutes walk from here.', good: 'It’s a [five-minute walk] from here.', why: 'Hoặc dùng sở hữu: five minutes’ walk.' },
  { bad: 'The list of items are on the desk.', good: 'The [list] of items [is] on the desk.', why: 'Tìm head (list) trước, rồi mới chia động từ.' },
  { bad: 'I bought a wooden old beautiful table.', good: 'I bought a [beautiful old wooden] table.', why: 'Thứ tự: ý kiến → tuổi → chất liệu.' },
  { bad: 'There is a new shoes shop near my house.', good: 'There is a new [shoe shop] near my house.', why: 'Danh từ bổ nghĩa đứng trước giữ dạng số ít.' },
  { bad: 'The people who lives here are friendly.', good: 'The people who [live] here are friendly.', why: 'Động từ trong mệnh đề quan hệ chia theo danh từ mà who thay thế (people).' },
  { bad: 'The decision of raising taxes was unpopular.', good: 'The [decision to raise] taxes was unpopular.', why: 'Danh từ hóa giữ cấu trúc của động từ gốc: decide to → decision to.' },
  { bad: 'Old house on the hill belongs to my uncle.', good: '[The] old house on the hill belongs to my uncle.', why: 'Danh từ đếm được số ít không đứng một mình — cần a/the/my…' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Marked({ text, className }) {
  const parts = text.split(/\[([^\]]+)\]/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className={className}>
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

function buildTree(on) {
  const plural = Boolean(on.quant)
  let node = { key: 'head', words: plural ? HEAD.plural : HEAD.singular }
  for (const key of WRAP_ORDER) {
    if (!on[key]) continue
    const layer = LAYER_BY_KEY[key]
    node = { key, words: layer.words, before: layer.zone !== 'post', child: node }
  }
  return node
}

function capitalize(text) {
  return text ? text[0].toUpperCase() + text.slice(1) : text
}

function colorOf(key) {
  return key === 'head' ? HEAD.color : LAYER_BY_KEY[key].color
}

function shortOf(key) {
  return key === 'head' ? 'HEAD' : LAYER_BY_KEY[key].short
}

/* ------------------------------------------------------------------ */
/*  Signature: the nesting-doll phrase builder                          */
/* ------------------------------------------------------------------ */

function Doll({ node, fresh }) {
  const isHead = node.key === 'head'
  return (
    <span
      className={`${styles.doll} ${isHead ? styles.dollHead : ''} ${fresh === node.key ? styles.dollFresh : ''}`}
      style={{ '--c': colorOf(node.key) }}
    >
      <span className={styles.dollTag}>{shortOf(node.key)}</span>
      <span className={styles.dollBody}>
        {isHead ? (
          <span className={styles.dollWord}>{node.words}</span>
        ) : (
          <>
            {node.before && <span className={styles.dollWord}>{node.words}</span>}
            <Doll node={node.child} fresh={fresh} />
            {!node.before && <span className={styles.dollWord}>{node.words}</span>}
          </>
        )}
      </span>
    </span>
  )
}

function Brackets({ node }) {
  const style = { '--c': colorOf(node.key) }
  if (node.key === 'head') {
    return (
      <span className={styles.br} style={style}>
        <span className={styles.brMark}>[</span>
        <sub className={styles.brSub}>HEAD</sub> <strong>{node.words}</strong>
        <span className={styles.brMark}>]</span>
      </span>
    )
  }
  return (
    <span className={styles.br} style={style}>
      <span className={styles.brMark}>[</span>
      <sub className={styles.brSub}>{shortOf(node.key)}</sub>
      {node.before ? (
        <>
          {' '}
          {node.words} <Brackets node={node.child} />
        </>
      ) : (
        <>
          {' '}
          <Brackets node={node.child} /> {node.words}
        </>
      )}
      <span className={styles.brMark}>]</span>
    </span>
  )
}

function DollWorkshop() {
  const [on, setOn] = useState({})
  const [history, setHistory] = useState([])
  const [focus, setFocus] = useState(null)

  const plural = Boolean(on.quant)
  const head = plural ? HEAD.plural : HEAD.singular
  const tree = buildTree(on)
  const fresh = history[history.length - 1] ?? null
  const nextLayer = LAYERS.find((l) => !on[l.key] && !(l.excludes && on[l.excludes]) && l.key !== 'inf')
  const needsDet = !on.det && !plural

  // Test sentence: "The two old stone houses … are for sale."
  const preWords = LAYERS.filter((l) => l.zone !== 'post' && on[l.key]).map((l) => l.words)
  if (needsDet) preWords.unshift(/^[aeiou]/i.test(preWords[0] ?? head) ? 'an' : 'a')
  const testStart = capitalize(preWords.join(' '))
  const postWords = LAYERS.filter((l) => l.zone === 'post' && on[l.key]).map((l) => l.words).join(' ')

  const add = (key) => {
    const layer = LAYER_BY_KEY[key]
    setOn((prev) => {
      const next = { ...prev, [key]: true }
      if (layer.excludes) delete next[layer.excludes]
      return next
    })
    setHistory((prev) => [...prev.filter((k) => k !== key && k !== layer.excludes), key])
    setFocus(key)
  }

  const remove = (key) => {
    setOn((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
    setHistory((prev) => prev.filter((k) => k !== key))
    setFocus(key)
  }

  const peel = () => {
    if (!history.length) return
    remove(history[history.length - 1])
  }

  const reset = () => {
    setOn({})
    setHistory([])
    setFocus(null)
  }

  const zoneWords = (zone) =>
    LAYERS.filter((l) => l.zone === zone && on[l.key]).map((l) => (
      <span key={l.key} className={styles.zoneWord} style={{ '--c': l.color }}>
        {l.words}
      </span>
    ))

  const focusLayer = focus ? LAYER_BY_KEY[focus] : null

  return (
    <section className={styles.workshop} aria-labelledby="np-workshop-title">
      <div className={styles.workshopHead}>
        <div>
          <p className={styles.eyebrow}>Búp bê lồng nhau</p>
          <h2 id="np-workshop-title" className={styles.workshopTitle}>
            Bắt đầu từ một danh từ, bọc thêm từng lớp
          </h2>
          <p className={styles.workshopSub}>
            Mỗi lần bấm <strong>+</strong> là một lớp búp bê mới bao quanh danh từ chính. Dù cụm dài đến đâu,
            “lõi” vẫn chỉ là <strong className={styles.headInline}>{head}</strong>.
          </p>
        </div>
      </div>

      <div className={styles.stage}>
        <p className={styles.phraseLine} aria-live="polite">
          {LAYERS.filter((l) => l.zone !== 'post' && on[l.key]).map((l) => (
            <span key={l.key} className={styles.phraseBit} style={{ '--c': l.color }}>
              {l.words}{' '}
            </span>
          ))}
          <span className={`${styles.phraseBit} ${styles.phraseHead}`} style={{ '--c': HEAD.color }}>
            {head}
          </span>
          {LAYERS.filter((l) => l.zone === 'post' && on[l.key]).map((l) => (
            <span key={l.key} className={styles.phraseBit} style={{ '--c': l.color }}>
              {' '}
              {l.words}
            </span>
          ))}
        </p>

        <div className={styles.dollFrame}>
          <Doll node={tree} fresh={fresh} />
        </div>

        <div className={styles.zones} aria-label="Bốn vùng của cụm danh từ">
          {ZONES.map((z) => (
            <div key={z.key} className={`${styles.zone} ${z.key === 'head' ? styles.zoneHead : ''}`}>
              <span className={styles.zoneLabel}>{z.label}</span>
              <span className={styles.zoneVi}>{z.vi}</span>
              <span className={styles.zoneWords}>
                {z.key === 'head' ? (
                  <span className={styles.zoneWord} style={{ '--c': HEAD.color }}>
                    {head}
                  </span>
                ) : (
                  zoneWords(z.key).length ? zoneWords(z.key) : <span className={styles.zoneEmpty}>—</span>
                )}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.bracketBox}>
          <span className={styles.bracketLabel}>Sơ đồ ngoặc</span>
          <code className={styles.bracketCode}>
            <Brackets node={tree} />
          </code>
        </div>

        <p className={styles.agree}>
          <span className={styles.agreeTag}>Câu thử</span>
          <span>
            {testStart && `${testStart} `}
            <strong className={styles.headInline}>{testStart ? head : capitalize(head)}</strong>{' '}
            {postWords && `${postWords} `}
            <strong className={styles.verbInline}>{plural ? 'are' : 'is'}</strong> for sale.
          </span>
          <span className={styles.agreeNote}>
            Động từ chỉ “nhìn” head: {head} → {plural ? 'are' : 'is'}.
          </span>
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.layerGrid} role="group" aria-label="Thêm hoặc bớt các lớp bổ ngữ">
          {LAYERS.map((l) => {
            const active = Boolean(on[l.key])
            return (
              <button
                key={l.key}
                type="button"
                className={`${styles.layerBtn} ${active ? styles.layerOn : ''}`}
                style={{ '--c': l.color }}
                aria-pressed={active}
                onClick={() => (active ? remove(l.key) : add(l.key))}
              >
                <span className={styles.layerIcon} aria-hidden="true">
                  {active ? <MinusOutlined /> : <PlusOutlined />}
                </span>
                <span className={styles.layerText}>
                  <span className={styles.layerName}>{l.label}</span>
                  <span className={styles.layerWords}>{l.words}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className={styles.actionRow}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => nextLayer && add(nextLayer.key)} disabled={!nextLayer} className={styles.primaryBtn}>
            {nextLayer ? `Thêm lớp: ${nextLayer.label}` : 'Đã đủ lớp'}
          </Button>
          <Button icon={<UndoOutlined />} onClick={peel} disabled={!history.length}>
            Bóc lớp vừa thêm
          </Button>
          <Button icon={<ReloadOutlined />} onClick={reset} disabled={!history.length}>
            Chỉ còn head
          </Button>
        </div>

        <div className={styles.noteCard} style={{ '--c': focusLayer ? focusLayer.color : HEAD.color }} aria-live="polite">
          {needsDet && (
            <p className={styles.warn}>
              <WarningOutlined aria-hidden="true" /> “{head}” là danh từ đếm được số ít — trong câu thật nó cần một determiner
              (a / the / my…). Câu thử bên trên đang tạm thêm “a/an”.
            </p>
          )}
          {focusLayer ? (
            <>
              <p className={styles.noteTitle}>
                {focusLayer.label} <span className={styles.noteVi}>· {focusLayer.vi}</span>
              </p>
              <p className={styles.noteText}>{focusLayer.note}</p>
            </>
          ) : (
            <p className={styles.noteText}>
              <strong>Head noun</strong> là danh từ chính — mọi từ khác chỉ bổ nghĩa cho nó. Bấm một nút “+” để bắt đầu bọc lớp.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rule sections                                                      */
/* ------------------------------------------------------------------ */

function SectionHead({ id, num, title, sub }) {
  return (
    <div className={styles.secHead}>
      <span className={styles.secNum} aria-hidden="true">
        {num}
      </span>
      <div>
        <h2 id={id} className={styles.secTitle}>
          {title}
        </h2>
        {sub && <p className={styles.secSub}>{sub}</p>}
      </div>
    </div>
  )
}

function Nominalisation() {
  const [style, setStyle] = useState('academic')
  return (
    <section className={styles.section} aria-labelledby="np-nom-title">
      <SectionHead
        id="np-nom-title"
        num="01"
        title="Nominalisation — vì sao văn học thuật “mê” cụm danh từ"
        sub="Biến động từ/tính từ thành danh từ, rồi bọc bổ ngữ quanh nó."
      />
      <ul className={styles.whyList}>
        {WHY_ACADEMIC.map((w) => (
          <li key={w}>
            <BulbOutlined aria-hidden="true" className={styles.whyIcon} /> {w}
          </li>
        ))}
      </ul>

      <div className={styles.nomToolbar}>
        <span className={styles.nomHint}>
          <SwapOutlined aria-hidden="true" /> Chuyển văn phong:
        </span>
        <Segmented
          value={style}
          onChange={setStyle}
          options={[
            { value: 'plain', label: 'Văn nói (động từ)' },
            { value: 'academic', label: 'Học thuật (cụm danh từ)' },
          ]}
          aria-label="Chọn văn phong"
        />
      </div>

      <ol className={styles.nomList}>
        {NOMINAL.map((n) => (
          <li key={n.academic} className={styles.nomItem}>
            <p className={`${styles.nomSentence} ${style === 'academic' ? styles.nomAcademic : ''}`}>
              <Marked text={style === 'plain' ? n.plain : n.academic} className={style === 'plain' ? styles.mVerb : styles.mNoun} />
            </p>
            <p className={styles.nomPair}>{n.pair}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function PreModOrder() {
  return (
    <section className={styles.section} aria-labelledby="np-order-title">
      <SectionHead
        id="np-order-title"
        num="02"
        title="Thứ tự các bổ ngữ đứng trước"
        sub="Determiner → số lượng → tính từ (theo thứ tự dưới đây) → danh từ bổ nghĩa → HEAD."
      />
      <div className={styles.orderStrip} role="list">
        {ORDER.map((o, i) => (
          <div key={o.key} className={styles.orderCell} role="listitem" style={{ '--i': i }}>
            <span className={styles.orderLabel}>{o.label}</span>
            <span className={styles.orderVi}>{o.vi}</span>
            <span className={styles.orderWord}>{o.word}</span>
          </div>
        ))}
        <div className={`${styles.orderCell} ${styles.orderHead}`} role="listitem">
          <span className={styles.orderLabel}>HEAD</span>
          <span className={styles.orderVi}>Danh từ</span>
          <span className={styles.orderWord}>table</span>
        </div>
      </div>
      <p className={styles.orderNote}>
        Mẹo nhớ: <strong>OSASCOMP</strong>. Tính từ chỉ ý kiến (đánh giá chủ quan) đứng xa head nhất; tính từ/danh từ
        mang tính phân loại (chất liệu, mục đích) đứng sát head nhất. Thực tế hiếm khi dùng quá 3 tính từ.
      </p>
      <ul className={styles.exampleList}>
        {ORDER_EXAMPLES.map((e) => (
          <li key={e}>
            <Marked text={e} className={styles.mAdj} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Compounds() {
  return (
    <section className={styles.section} aria-labelledby="np-comp-title">
      <SectionHead
        id="np-comp-title"
        num="03"
        title="Danh từ ghép: noun + noun"
        sub="Danh từ đứng trước đóng vai tính từ — nên “không có số nhiều”."
      />
      <div className={styles.compGrid}>
        {COMPOUNDS.map((c) => (
          <article key={c.title} className={styles.compCard}>
            <h3 className={styles.compTitle}>{c.title}</h3>
            <p className={styles.compNote}>{c.note}</p>
            <ul className={styles.compList}>
              {c.good.map((g) => (
                <li key={g} className={styles.yes}>
                  <CheckCircleFilled aria-label="Đúng" /> <span>{g}</span>
                </li>
              ))}
              {c.bad.map((b) => (
                <li key={b} className={styles.no}>
                  <CloseCircleFilled aria-label="Sai hoặc khác nghĩa" /> <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Agreement() {
  const [hide, setHide] = useState(false)
  return (
    <section className={styles.section} aria-labelledby="np-agree-title">
      <SectionHead
        id="np-agree-title"
        num="04"
        title="Tìm head noun → chia động từ đúng"
        sub="Động từ hòa hợp với head, không phải với danh từ đứng gần nó nhất."
      />
      <div className={styles.agreeToolbar}>
        <Button
          icon={hide ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          onClick={() => setHide((h) => !h)}
          aria-pressed={hide}
        >
          {hide ? 'Hiện lại bổ ngữ' : 'Làm mờ bổ ngữ'}
        </Button>
        <span className={styles.agreeHint}>Mẹo: che bổ ngữ đi, chỉ còn “head + động từ”.</span>
      </div>
      <ul className={styles.agreeList}>
        {AGREEMENT.map((a) => (
          <li key={a.head + a.post} className={styles.agreeItem}>
            <p className={styles.agreeSentence}>
              {a.pre && <span>{a.pre} </span>}
              <span className={styles.aHead}>{a.head}</span>{' '}
              <span className={`${styles.aPost} ${hide ? styles.aPostHidden : ''}`}>{a.post}</span>{' '}
              <span className={styles.aVerb}>{a.verb}</span> {a.rest}
            </p>
            <p className={styles.agreeExplain}>{a.note}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.section} aria-labelledby="np-mistake-title">
      <SectionHead id="np-mistake-title" num="05" title="Lỗi hay gặp" sub="Người Việt rất hay mắc những lỗi này khi viết cụm danh từ." />
      <div className={styles.mistakeGrid}>
        {MISTAKES.map((m) => (
          <article key={m.bad} className={styles.mistake}>
            <p className={styles.mWrong}>
              <CloseCircleFilled aria-label="Sai" /> <span>{m.bad}</span>
            </p>
            <p className={styles.mGood}>
              <CheckCircleFilled aria-label="Đúng" />{' '}
              <span>
                <Marked text={m.good} className={styles.mFix} />
              </span>
            </p>
            <p className={styles.mWhy}>{m.why}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NounPhrases() {
  return (
    <div className={styles.page}>
      <p className={styles.lead}>
        <ApartmentOutlined aria-hidden="true" className={styles.leadIcon} />
        <span>
          Một cụm danh từ = <strong>Determiner</strong> + <strong>Pre-modifiers</strong> + <strong className={styles.headInline}>HEAD</strong> +{' '}
          <strong>Post-modifiers</strong>. Dùng khi muốn gói nhiều thông tin vào một “khối” duy nhất — đặc sản của văn viết
          học thuật và IELTS.
        </span>
      </p>
      <DollWorkshop />
      <Nominalisation />
      <PreModOrder />
      <Compounds />
      <Agreement />
      <Mistakes />
    </div>
  )
}
