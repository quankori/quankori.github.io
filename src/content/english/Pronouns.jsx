import { useState } from 'react'
import { Segmented } from 'antd'
import {
  AimOutlined,
  TableOutlined,
  TeamOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './Pronouns.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: [highlighted pronoun]                              */
/* ------------------------------------------------------------------ */

const COLS = [
  { key: 'subject', label: 'Subject', vi: 'Chủ ngữ', color: '#1864ab', rule: 'Đứng trước động từ, là người/vật thực hiện hành động.', formula: 'Pronoun + V' },
  { key: 'object', label: 'Object', vi: 'Tân ngữ', color: '#a61e4d', rule: 'Đứng sau động từ hoặc sau giới từ (to, for, with, between…).', formula: 'V / prep + pronoun' },
  { key: 'possAdj', label: 'Possessive adj.', vi: 'Tính từ sở hữu', color: '#2b8a3e', rule: 'Luôn đi kèm một danh từ phía sau: my phone, their house.', formula: 'my/your… + N' },
  { key: 'possPron', label: 'Possessive pron.', vi: 'Đại từ sở hữu', color: '#c25e00', rule: 'Đứng một mình, thay cho “tính từ sở hữu + danh từ”: mine = my + N.', formula: 'pronoun (không có N)' },
  { key: 'reflexive', label: 'Reflexive', vi: 'Phản thân', color: '#5f3dc4', rule: 'Khi chủ ngữ và tân ngữ là cùng một người/vật, hoặc để nhấn mạnh “tự mình”.', formula: 'S + V + -self/-selves' },
]

const ROWS = [
  {
    key: 'i', label: 'I', person: 'Ngôi 1 · số ít',
    forms: ['I', 'me', 'my', 'mine', 'myself'],
    ex: [
      ['[I] love black coffee.', 'Tôi thích cà phê đen.'],
      ['She called [me] yesterday.', 'Cô ấy gọi cho tôi hôm qua.'],
      ['[My] phone is dead.', 'Điện thoại của tôi hết pin.'],
      ['That umbrella is [mine].', 'Cái ô đó là của tôi.'],
      ['I taught [myself] to cook.', 'Tôi tự học nấu ăn.'],
    ],
  },
  {
    key: 'you', label: 'you', person: 'Ngôi 2 · số ít',
    forms: ['you', 'you', 'your', 'yours', 'yourself'],
    ex: [
      ['[You] look tired today.', 'Hôm nay trông bạn mệt.'],
      ['I’ll help [you] with the report.', 'Tôi sẽ giúp bạn làm báo cáo.'],
      ['Is this [your] bag?', 'Đây có phải túi của bạn không?'],
      ['The red car is [yours].', 'Chiếc xe đỏ là của bạn.'],
      ['Help [yourself] to some cake.', 'Bạn cứ tự nhiên lấy bánh nhé.'],
    ],
  },
  {
    key: 'he', label: 'he', person: 'Ngôi 3 · số ít (nam)',
    forms: ['he', 'him', 'his', 'his', 'himself'],
    ex: [
      ['[He] works in a bank.', 'Anh ấy làm ở ngân hàng.'],
      ['I met [him] at the station.', 'Tôi gặp anh ấy ở nhà ga.'],
      ['[His] brother is a doctor.', 'Anh trai của anh ấy là bác sĩ.'],
      ['This jacket isn’t mine — it’s [his].', 'Áo khoác này không phải của tôi, là của anh ấy.'],
      ['He cut [himself] while cooking.', 'Anh ấy tự làm đứt tay khi nấu ăn.'],
    ],
  },
  {
    key: 'she', label: 'she', person: 'Ngôi 3 · số ít (nữ)',
    forms: ['she', 'her', 'her', 'hers', 'herself'],
    ex: [
      ['[She] speaks three languages.', 'Cô ấy nói được ba thứ tiếng.'],
      ['Please tell [her] the truth.', 'Hãy nói thật với cô ấy.'],
      ['[Her] voice is beautiful.', 'Giọng của cô ấy rất hay.'],
      ['The idea was [hers], not mine.', 'Ý tưởng đó là của cô ấy, không phải của tôi.'],
      ['She looked at [herself] in the mirror.', 'Cô ấy nhìn mình trong gương.'],
    ],
  },
  {
    key: 'it', label: 'it', person: 'Ngôi 3 · số ít (vật, con vật)',
    forms: ['it', 'it', 'its', '—', 'itself'],
    ex: [
      ['[It] is raining again.', 'Trời lại mưa rồi.'],
      ['I bought a new laptop and I love [it].', 'Tôi mua laptop mới và rất thích nó.'],
      ['The dog wagged [its] tail.', 'Con chó vẫy đuôi (của nó).'],
      ['✗ The bed is its. → ✓ The bed is [the dog’s].', 'Hầu như không dùng "its" đứng một mình; thay bằng danh từ + ’s.'],
      ['The machine turns [itself] off.', 'Máy tự tắt.'],
    ],
  },
  {
    key: 'we', label: 'we', person: 'Ngôi 1 · số nhiều',
    forms: ['we', 'us', 'our', 'ours', 'ourselves'],
    ex: [
      ['[We] are going to Hue next week.', 'Tuần sau chúng tôi đi Huế.'],
      ['They invited [us] to dinner.', 'Họ mời chúng tôi ăn tối.'],
      ['[Our] flat is quite small.', 'Căn hộ của chúng tôi khá nhỏ.'],
      ['Their garden is bigger than [ours].', 'Vườn của họ rộng hơn vườn của chúng tôi.'],
      ['We really enjoyed [ourselves] at the party.', 'Chúng tôi rất vui ở bữa tiệc.'],
    ],
  },
  {
    key: 'youPl', label: 'you', person: 'Ngôi 2 · số nhiều',
    forms: ['you', 'you', 'your', 'yours', 'yourselves'],
    ex: [
      ['[You] all did a great job!', 'Các bạn đều làm rất tốt!'],
      ['I’ll see [you] both tomorrow.', 'Mai tôi gặp cả hai bạn nhé.'],
      ['Please take [your] seats, everyone.', 'Mọi người vui lòng về chỗ ngồi.'],
      ['These tickets are [yours], kids.', 'Mấy vé này là của các con đấy.'],
      ['Help [yourselves] to drinks, guys!', 'Mọi người cứ tự nhiên lấy đồ uống nhé!'],
    ],
  },
  {
    key: 'they', label: 'they', person: 'Ngôi 3 · số nhiều',
    forms: ['they', 'them', 'their', 'theirs', 'themselves'],
    ex: [
      ['[They] live next door.', 'Họ sống ở nhà bên.'],
      ['I like [them] a lot.', 'Tôi rất quý họ.'],
      ['[Their] children are lovely.', 'Con của họ rất dễ thương.'],
      ['The final decision is [theirs].', 'Quyết định cuối cùng là của họ.'],
      ['They built the house [themselves].', 'Họ tự xây ngôi nhà.'],
    ],
  },
]

const DEMOS = {
  'sg-near': { word: 'this', ex: '[This] coffee is too hot.', vi: 'Ly cà phê này nóng quá.' },
  'sg-far': { word: 'that', ex: '[That] mountain over there is Fansipan.', vi: 'Ngọn núi đằng kia là Fansipan.' },
  'pl-near': { word: 'these', ex: '[These] shoes are really comfortable.', vi: 'Đôi giày này rất êm.' },
  'pl-far': { word: 'those', ex: 'Look at [those] birds in the sky!', vi: 'Nhìn những con chim trên trời kia kìa!' },
}

const DEMO_NOTES = [
  { title: 'Thời gian', text: '[this] week, [these] days (hiện tại) · [that] day, in [those] days (quá khứ)' },
  { title: 'Giới thiệu, điện thoại', text: '[This] is my friend Lan. · Hi, [this] is Minh speaking.' },
  { title: 'Phản hồi điều vừa nói', text: '[That]’s great! · [That]’s right. · Is [that] true?' },
  { title: 'Đứng một mình hoặc + N', text: '[This] is delicious. (đại từ) · [This] cake is delicious. (+ danh từ)' },
]

const PREFIXES = [
  { key: 'some', label: 'some-', vi: 'câu khẳng định, lời mời' },
  { key: 'any', label: 'any-', vi: 'câu hỏi, phủ định' },
  { key: 'no', label: 'no-', vi: 'nghĩa phủ định sẵn' },
  { key: 'every', label: 'every-', vi: 'tất cả' },
]
const SUFFIXES = [
  { key: 'one', label: '-one / -body', vi: 'người' },
  { key: 'thing', label: '-thing', vi: 'vật' },
  { key: 'where', label: '-where', vi: 'nơi chốn' },
]
const INDEF = {
  some: {
    one: { w: 'someone / somebody', vi: 'ai đó', ex: '[Someone] is knocking at the door.' },
    thing: { w: 'something', vi: 'cái gì đó', ex: 'I want [something] to eat.' },
    where: { w: 'somewhere', vi: 'đâu đó', ex: 'Let’s go [somewhere] quiet.' },
  },
  any: {
    one: { w: 'anyone / anybody', vi: 'có ai / bất kỳ ai', ex: 'Is [anyone] home?' },
    thing: { w: 'anything', vi: 'gì / bất cứ thứ gì', ex: 'I didn’t buy [anything].' },
    where: { w: 'anywhere', vi: 'đâu / bất cứ đâu', ex: 'You can sit [anywhere] you like.' },
  },
  no: {
    one: { w: 'no one / nobody', vi: 'không ai', ex: '[Nobody] knows the answer.' },
    thing: { w: 'nothing', vi: 'không có gì', ex: 'There’s [nothing] in the fridge.' },
    where: { w: 'nowhere', vi: 'không nơi nào', ex: 'The keys are [nowhere] to be found.' },
  },
  every: {
    one: { w: 'everyone / everybody', vi: 'mọi người', ex: '[Everyone] loves the holidays.' },
    thing: { w: 'everything', vi: 'mọi thứ', ex: '[Everything] is ready.' },
    where: { w: 'everywhere', vi: 'khắp nơi', ex: 'I’ve looked [everywhere] for my glasses.' },
  },
}
const INDEF_RULES = [
  'Luôn đi với động từ số ít: [Everyone is] here. [Nobody knows].',
  'Nhưng khi thay thế lại, thường dùng they/their: [Someone] left [their] phone.',
  'no- đã mang nghĩa phủ định → không thêm not: ✗ I don’t know nobody → ✓ I don’t know [anybody] / I know [nobody].',
  'Tính từ đứng SAU: [something interesting], [nowhere special].',
]

const NOTES = [
  {
    key: 'they',
    title: 'Singular “they”',
    body: 'Dùng they/them/their cho một người chưa rõ giới tính, hoặc người không muốn dùng he/she. Động từ vẫn chia như số nhiều.',
    ex: ['Someone called — [they] left a message.', 'Each student must bring [their] own laptop.', 'Alex is my colleague. [They are] a designer.'],
  },
  {
    key: 'its',
    title: 'its vs it’s',
    body: 'its = của nó (sở hữu, KHÔNG có dấu ’). it’s = it is / it has. Mẹo: thay bằng “it is” — nếu câu vẫn đúng thì viết it’s.',
    ex: ['The company changed [its] logo.', '[It’s] (= It is) cold today.', '[It’s] (= It has) been a long day.'],
  },
  {
    key: 'me',
    title: 'I hay me?',
    body: 'Làm chủ ngữ → I. Sau động từ hoặc giới từ → me. Mẹo: bỏ người kia đi rồi đọc lại câu. Lịch sự: nhắc người khác trước, mình sau.',
    ex: ['My friend and [I] went to Hue. (I went…)', 'She invited my friend and [me]. (She invited me)', 'This is between you and [me].'],
  },
  {
    key: 'rel',
    title: 'Relative pronouns',
    body: 'who, whom, whose, which, that dùng để nối mệnh đề quan hệ — xem chi tiết ở trang Relative Clauses.',
    ex: ['The woman [who] lives next door is a doctor.', 'The book [that] you lent me is great.'],
  },
]

const MISTAKES = [
  { bad: 'Me and him went to the cinema.', good: '[He and I] went to the cinema.', why: 'Chủ ngữ phải dùng dạng subject (he, I).' },
  { bad: 'Between you and I, …', good: 'Between you and [me], …', why: 'Sau giới từ "between" dùng dạng tân ngữ.' },
  { bad: 'The company changed it’s logo.', good: 'The company changed [its] logo.', why: 'Sở hữu là "its" (không có dấu ’); it’s = it is.' },
  { bad: 'Everyone have finished.', good: 'Everyone [has] finished.', why: 'Đại từ bất định -one/-body đi với động từ số ít.' },
  { bad: 'This book is my.', good: 'This book is [mine]. / This is [my] book.', why: 'Đứng một mình dùng đại từ sở hữu; "my" phải có danh từ đi kèm.' },
  { bad: 'He hurt him while skiing. (chính anh ấy)', good: 'He hurt [himself] while skiing.', why: 'Chủ ngữ và tân ngữ cùng một người → phản thân.' },
  { bad: 'This cookies are delicious.', good: '[These] cookies are delicious.', why: 'Danh từ số nhiều → these/those.' },
  { bad: 'They did it theirselves.', good: 'They did it [themselves].', why: 'Không có từ "theirselves"/"hisself"; dùng themselves, himself.' },
  { bad: 'I don’t know nobody here.', good: 'I don’t know [anybody] here.', why: 'Tránh phủ định kép: not + any-, hoặc chỉ dùng no-.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Hl({ text, color }) {
  return text.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) =>
    p.startsWith('[') ? (
      <mark key={i} className={styles.hl} style={color ? { '--hl': color } : undefined}>{p.slice(1, -1)}</mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

function SectionHead({ id, icon, title, sub }) {
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
/*  Signature: pronoun matrix                                          */
/* ------------------------------------------------------------------ */

function Matrix() {
  const [sel, setSel] = useState({ row: 'she', col: 'object' })
  const [hover, setHover] = useState(null)
  const active = hover || sel

  const rowIdx = ROWS.findIndex((r) => r.key === active.row)
  const colIdx = COLS.findIndex((c) => c.key === active.col)
  const row = ROWS[rowIdx]
  const col = COLS[colIdx]

  const cellClass = (ri, ci) => {
    const inRow = ri === rowIdx
    const inCol = ci === colIdx
    let cls = styles.cell
    if (inRow && inCol) cls += ` ${styles.cellFocus}`
    else if (inRow || inCol) cls += ` ${styles.cellLit}`
    else if (rowIdx >= 0 || colIdx >= 0) cls += ` ${styles.cellDim}`
    return cls
  }

  let detail
  if (row && col) {
    const [en, vi] = row.ex[colIdx]
    detail = (
      <div className={styles.detailCell} style={{ '--col': col.color }}>
        <div className={styles.tile}>
          <span className={styles.tileTag}>{col.label}</span>
          <span className={styles.tileWord}>{row.forms[colIdx]}</span>
          <span className={styles.tilePerson}>{row.person}</span>
        </div>
        <div className={styles.detailText}>
          <p className={styles.detailRule}><strong>{col.vi}:</strong> {col.rule}</p>
          <p className={styles.detailFormula}>{col.formula}</p>
          <p className={styles.detailEn}><Hl text={en} color={col.color} /></p>
          <p className={styles.detailVi}>{vi}</p>
        </div>
      </div>
    )
  } else if (row) {
    detail = (
      <div>
        <p className={styles.detailHead}><strong>{row.label}</strong> · {row.person} — cả hàng trong câu:</p>
        <ul className={styles.detailList}>
          {row.ex.map(([en, vi], ci) => (
            <li key={COLS[ci].key} style={{ '--col': COLS[ci].color }}>
              <span className={styles.listTag}>{COLS[ci].vi}</span>
              <span className={styles.listEn}><Hl text={en} color={COLS[ci].color} /></span>
              <span className={styles.listVi}>{vi}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  } else if (col) {
    detail = (
      <div style={{ '--col': col.color }}>
        <p className={styles.detailHead}><strong>{col.label}</strong> · {col.vi} — {col.rule}</p>
        <p className={styles.detailFormula}>{col.formula}</p>
        <ul className={styles.detailList}>
          {ROWS.map((r) => (
            <li key={r.key} style={{ '--col': col.color }}>
              <span className={styles.listTag}>{r.label}</span>
              <span className={styles.listEn}><Hl text={r.ex[colIdx][0]} color={col.color} /></span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <section className={styles.matrixPanel} aria-labelledby="pro-matrix-title">
      <div className={styles.matrixHead}>
        <div>
          <span className={styles.eyebrow}>Pronoun matrix</span>
          <h2 id="pro-matrix-title" className={styles.matrixTitle}>8 ngôi × 5 dạng</h2>
        </div>
        <p className={styles.matrixHint}>Chọn tiêu đề hàng, tiêu đề cột hoặc một ô để xem ví dụ.</p>
      </div>

      <div className={styles.gridScroll} tabIndex={0} aria-label="Bảng đại từ, có thể cuộn ngang">
        <div className={styles.grid} role="table" aria-label="Bảng đại từ nhân xưng" onMouseLeave={() => setHover(null)}>
          <div role="row" className={styles.gridRow}>
            <span role="columnheader" className={styles.corner}>
              <span>ngôi ↓</span>
              <span>dạng →</span>
            </span>
            {COLS.map((c, ci) => (
              <span role="columnheader" key={c.key} className={styles.colHeadWrap}>
                <button
                  type="button"
                  className={`${styles.colHead} ${ci === colIdx ? styles.headOn : ''}`}
                  style={{ '--col': c.color }}
                  aria-pressed={sel.col === c.key && !sel.row}
                  onClick={() => setSel({ row: null, col: c.key })}
                  onMouseEnter={() => setHover({ row: null, col: c.key })}
                  onFocus={() => setHover(null)}
                >
                  <span className={styles.colLabel}>{c.label}</span>
                  <span className={styles.colVi}>{c.vi}</span>
                </button>
              </span>
            ))}
          </div>
          {ROWS.map((r, ri) => (
            <div role="row" key={r.key} className={styles.gridRow}>
              <span role="rowheader" className={styles.rowHeadWrap}>
                <button
                  type="button"
                  className={`${styles.rowHead} ${ri === rowIdx ? styles.headOn : ''}`}
                  aria-pressed={sel.row === r.key && !sel.col}
                  onClick={() => setSel({ row: r.key, col: null })}
                  onMouseEnter={() => setHover({ row: r.key, col: null })}
                  onFocus={() => setHover(null)}
                >
                  <span className={styles.rowLabel}>{r.label}</span>
                  <span className={styles.rowPerson}>{r.person}</span>
                </button>
              </span>
              {r.forms.map((f, ci) => (
                <span role="cell" key={COLS[ci].key} className={styles.cellWrap}>
                  <button
                    type="button"
                    className={`${cellClass(ri, ci)} ${f === '—' ? styles.cellEmpty : ''}`}
                    style={{ '--col': COLS[ci].color }}
                    aria-pressed={sel.row === r.key && sel.col === COLS[ci].key}
                    aria-label={`${f === '—' ? 'không có' : f}: ${COLS[ci].vi}, ${r.person}`}
                    onClick={() => setSel({ row: r.key, col: COLS[ci].key })}
                    onMouseEnter={() => setHover({ row: r.key, col: COLS[ci].key })}
                    onFocus={() => setHover(null)}
                  >
                    {f}
                  </button>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.detail} aria-live="polite">{detail}</div>

      <p className={styles.matrixTip}>
        <strong>Mẹo:</strong> tính từ sở hữu (<em>my, your…</em>) luôn cần danh từ theo sau; đại từ sở hữu (<em>mine, yours…</em>) thì đứng một mình.
        Số nhiều của phản thân dùng <em>-selves</em>: ourselves, yourselves, themselves.
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Demonstratives — near / far                                        */
/* ------------------------------------------------------------------ */

function Balls({ cx, count, r, active }) {
  const offsets = count === 1 ? [0] : [-r * 2.2, 0, r * 2.2]
  return offsets.map((dx, i) => (
    <circle key={i} cx={cx + dx} cy={128 - r} r={r} className={active ? styles.ballOn : styles.ball} />
  ))
}

function Demonstratives() {
  const [num, setNum] = useState('sg')
  const [dist, setDist] = useState('near')
  const demo = DEMOS[`${num}-${dist}`]
  const count = num === 'sg' ? 1 : 3
  const targetX = dist === 'near' ? 140 : 318

  return (
    <section className={styles.card} aria-labelledby="pro-demo-title">
      <SectionHead id="pro-demo-title" icon={<AimOutlined />} title="this · that · these · those" sub="Chọn số lượng và khoảng cách để xem từ chỉ định phù hợp." />
      <div className={styles.demoControls}>
        <Segmented value={num} onChange={setNum} options={[{ value: 'sg', label: 'Số ít' }, { value: 'pl', label: 'Số nhiều' }]} />
        <Segmented value={dist} onChange={setDist} options={[{ value: 'near', label: 'Gần' }, { value: 'far', label: 'Xa' }]} />
      </div>

      <div className={styles.scene}>
        <svg viewBox="0 0 400 150" className={styles.sceneSvg} role="img" aria-label={`${demo.word}: ${num === 'sg' ? 'một vật' : 'nhiều vật'} ở ${dist === 'near' ? 'gần' : 'xa'}`}>
          <rect x="84" y="20" width="116" height="112" rx="10" className={dist === 'near' ? styles.zoneOn : styles.zone} />
          <rect x="262" y="20" width="116" height="112" rx="10" className={dist === 'far' ? styles.zoneOn : styles.zone} />
          <text x="142" y="38" textAnchor="middle" className={styles.zoneLabel}>gần · here</text>
          <text x="320" y="38" textAnchor="middle" className={styles.zoneLabel}>xa · there</text>
          <line x1="0" y1="128" x2="400" y2="128" className={styles.ground} />
          <circle cx="36" cy="64" r="11" className={styles.figure} />
          <line x1="36" y1="75" x2="36" y2="106" className={styles.figureLine} />
          <line x1="36" y1="106" x2="26" y2="127" className={styles.figureLine} />
          <line x1="36" y1="106" x2="46" y2="127" className={styles.figureLine} />
          <line x1="36" y1="84" x2="24" y2="98" className={styles.figureLine} />
          <line x1="36" y1="84" x2={dist === 'near' ? 62 : 66} y2={dist === 'near' ? 92 : 76} className={styles.figureLine} />
          <line x1="70" y1={dist === 'near' ? 94 : 74} x2={targetX - 40} y2={dist === 'near' ? 104 : 74} className={styles.pointer} markerEnd="url(#pro-arrow)" />
          <defs>
            <marker id="pro-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className={styles.arrowHead} />
            </marker>
          </defs>
          <Balls cx={142} count={count} r={12} active={dist === 'near'} />
          <Balls cx={320} count={count} r={7} active={dist === 'far'} />
        </svg>
        <div className={styles.demoWordBox} aria-live="polite">
          <span className={styles.demoWord}>{demo.word}</span>
          <p className={styles.demoEx}><Hl text={demo.ex} /></p>
          <p className={styles.demoVi}>{demo.vi}</p>
        </div>
      </div>

      <table className={styles.demoTable}>
        <thead>
          <tr>
            <th scope="col"><span className={styles.srOnly}>Số lượng</span></th>
            <th scope="col">Gần</th>
            <th scope="col">Xa</th>
          </tr>
        </thead>
        <tbody>
          {['sg', 'pl'].map((n) => (
            <tr key={n}>
              <th scope="row">{n === 'sg' ? 'Số ít' : 'Số nhiều'}</th>
              {['near', 'far'].map((d) => (
                <td key={d} className={n === num && d === dist ? styles.demoCellOn : ''}>{DEMOS[`${n}-${d}`].word}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className={styles.noteGrid}>
        {DEMO_NOTES.map((n) => (
          <li key={n.title}>
            <strong>{n.title}</strong>
            <span><Hl text={n.text} /></span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Indefinite pronouns                                                */
/* ------------------------------------------------------------------ */

function Indefinites() {
  const [pick, setPick] = useState({ p: 'every', s: 'one' })
  const item = INDEF[pick.p][pick.s]
  return (
    <section className={styles.card} aria-labelledby="pro-indef-title">
      <SectionHead id="pro-indef-title" icon={<TeamOutlined />} title="Đại từ bất định" sub="Ghép tiền tố + hậu tố. Bấm vào một ô để xem nghĩa và ví dụ." />
      <div className={styles.indefWrap}>
        <table className={styles.indefTable}>
          <thead>
            <tr>
              <th scope="col"><span className={styles.srOnly}>Tiền tố</span></th>
              {SUFFIXES.map((s) => (
                <th scope="col" key={s.key}>
                  {s.label}
                  <small>{s.vi}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PREFIXES.map((p) => (
              <tr key={p.key}>
                <th scope="row">
                  {p.label}
                  <small>{p.vi}</small>
                </th>
                {SUFFIXES.map((s) => (
                  <td key={s.key}>
                    <button
                      type="button"
                      className={styles.indefBtn}
                      aria-pressed={pick.p === p.key && pick.s === s.key}
                      onClick={() => setPick({ p: p.key, s: s.key })}
                    >
                      {INDEF[p.key][s.key].w}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.indefDetail} aria-live="polite">
          <p className={styles.indefWord}>{item.w}</p>
          <p className={styles.indefVi}>{item.vi}</p>
          <p className={styles.indefEx}><Hl text={item.ex} /></p>
        </div>
      </div>
      <ul className={styles.ruleList}>
        {INDEF_RULES.map((r) => (
          <li key={r}><Hl text={r} /></li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Reciprocal                                                         */
/* ------------------------------------------------------------------ */

function Reciprocal() {
  return (
    <section className={styles.card} aria-labelledby="pro-recip-title">
      <SectionHead id="pro-recip-title" icon="⇄" title="each other / one another vs. themselves" sub="Tác động qua lại giữa hai bên khác với mỗi người tự tác động lên mình." />
      <div className={styles.recip}>
        <figure className={styles.recipFig}>
          <svg viewBox="0 0 200 110" className={styles.recipSvg} role="img" aria-label="Hai người nhìn nhau: mũi tên đi qua lại giữa hai người">
            <defs>
              <marker id="pro-recip-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#a61e4d" />
              </marker>
            </defs>
            <circle cx="40" cy="62" r="20" className={styles.personA} />
            <circle cx="160" cy="62" r="20" className={styles.personB} />
            <text x="40" y="67" textAnchor="middle" className={styles.personText}>Lan</text>
            <text x="160" y="67" textAnchor="middle" className={styles.personText}>Mai</text>
            <path d="M64 50 Q100 22 136 50" className={styles.recipArrow} markerEnd="url(#pro-recip-a)" />
            <path d="M136 76 Q100 104 64 76" className={styles.recipArrow} markerEnd="url(#pro-recip-a)" />
          </svg>
          <figcaption>
            <Hl text="Lan and Mai looked at [each other]." color="#a61e4d" />
            <span>Lan nhìn Mai, Mai nhìn Lan — nhìn nhau.</span>
          </figcaption>
        </figure>
        <figure className={styles.recipFig}>
          <svg viewBox="0 0 200 110" className={styles.recipSvg} role="img" aria-label="Mỗi người tự nhìn mình: mũi tên vòng về chính người đó">
            <defs>
              <marker id="pro-recip-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#5f3dc4" />
              </marker>
            </defs>
            <circle cx="50" cy="66" r="20" className={styles.personA} />
            <circle cx="150" cy="66" r="20" className={styles.personB} />
            <text x="50" y="71" textAnchor="middle" className={styles.personText}>Lan</text>
            <text x="150" y="71" textAnchor="middle" className={styles.personText}>Mai</text>
            <path d="M36 48 C 26 10, 74 10, 64 48" className={styles.selfArrow} markerEnd="url(#pro-recip-b)" />
            <path d="M136 48 C 126 10, 174 10, 164 48" className={styles.selfArrow} markerEnd="url(#pro-recip-b)" />
          </svg>
          <figcaption>
            <Hl text="Lan and Mai looked at [themselves] in the mirror." color="#5f3dc4" />
            <span>Mỗi người tự nhìn chính mình trong gương.</span>
          </figcaption>
        </figure>
      </div>
      <ul className={styles.ruleList}>
        <li><Hl text="[each other] và [one another] gần như dùng thay nhau; one another trang trọng hơn và hay dùng cho nhiều hơn hai người: The team members support [one another]." /></li>
        <li><Hl text="Dạng sở hữu: They borrowed [each other’s] notes." /></li>
        <li><Hl text="Không dùng làm chủ ngữ: ✗ Each other like… → ✓ They like [each other]." /></li>
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Notes & mistakes                                                   */
/* ------------------------------------------------------------------ */

function Notes() {
  return (
    <section className={styles.card} aria-labelledby="pro-notes-title">
      <SectionHead id="pro-notes-title" icon={<TableOutlined />} title="Những điểm dễ nhầm" sub="Bốn chủ đề nhỏ mà người học hay vấp." />
      <ul className={styles.notes}>
        {NOTES.map((n) => (
          <li key={n.key} className={styles.note}>
            <h3 className={styles.noteTitle}>{n.title}</h3>
            <p className={styles.noteBody}>{n.body}</p>
            <ul className={styles.noteEx}>
              {n.ex.map((e) => (
                <li key={e}><Hl text={e} /></li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.card} aria-labelledby="pro-mistakes-title">
      <SectionHead id="pro-mistakes-title" icon={<WarningOutlined />} title="Lỗi hay gặp" sub="Sai dạng đại từ là lỗi rất dễ bị “bắt” khi viết." />
      <ul className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mistake}>
            <p className={styles.bad}><span aria-hidden="true">❌</span> <s>{m.bad}</s></p>
            <p className={styles.good}><span aria-hidden="true">✅</span> <Hl text={m.good} color="#2b8a3e" /></p>
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

export default function Pronouns() {
  return (
    <div className={styles.page}>
      <Matrix />
      <Demonstratives />
      <Indefinites />
      <Reciprocal />
      <Notes />
      <Mistakes />
    </div>
  )
}
