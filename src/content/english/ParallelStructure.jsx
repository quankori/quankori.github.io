import { useState } from 'react'
import { Button, Segmented, Tabs } from 'antd'
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  FileTextOutlined,
  ReloadOutlined,
  ToolOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './ParallelStructure.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Route parts: stem (locomotive) · car (item on the rails) · link     */
/*  (coupler words like "and", "but also") · end (final punctuation).   */
/*  A car with `bad` starts derailed; fixing it shows `good`.          */
/*  Text markup: [brackets] = highlighted parallel element.            */
/* ------------------------------------------------------------------ */

const ROUTES = [
  {
    key: 'ving',
    line: 'L1',
    name: 'Danh sách V-ing',
    group: 'List',
    parts: [
      { t: 'stem', text: 'In my free time, I enjoy' },
      { t: 'car', form: 'V-ing', good: 'swimming' },
      { t: 'link', text: ',' },
      { t: 'car', form: 'V-ing', good: 'running', bad: 'to run', badForm: 'to-V' },
      { t: 'link', text: ', and' },
      { t: 'car', form: 'V-ing', good: 'cycling', bad: 'bikes', badForm: 'Noun' },
      { t: 'end', text: '.' },
    ],
    explain: 'enjoy + V-ing, nên mọi mục trong danh sách đều phải là V-ing: swimming, running, and cycling.',
  },
  {
    key: 'tov',
    line: 'L2',
    name: 'Danh sách to-V',
    group: 'List',
    parts: [
      { t: 'stem', text: 'Our goals this year are' },
      { t: 'car', form: 'to-V', good: 'to cut costs' },
      { t: 'link', text: ',' },
      { t: 'car', form: 'to-V', good: 'to improve quality', bad: 'improving quality', badForm: 'V-ing' },
      { t: 'link', text: ', and' },
      { t: 'car', form: 'to-V', good: 'to increase sales', bad: 'sales should go up', badForm: 'Clause' },
      { t: 'end', text: '.' },
    ],
    explain: 'Mục đầu tiên là to-V → các mục sau cũng là to-V. (Có thể bỏ “to” ở mục 2, 3 nhưng phải bỏ đồng loạt.)',
  },
  {
    key: 'noun',
    line: 'L3',
    name: 'Danh sách danh từ',
    group: 'List',
    parts: [
      { t: 'stem', text: 'The job requires' },
      { t: 'car', form: 'Noun', good: 'patience' },
      { t: 'link', text: ',' },
      { t: 'car', form: 'Noun', good: 'creativity', bad: 'being creative', badForm: 'V-ing' },
      { t: 'link', text: ', and' },
      { t: 'car', form: 'Noun', good: 'good communication skills', bad: 'you must communicate well', badForm: 'Clause' },
      { t: 'end', text: '.' },
    ],
    explain: 'requires + danh từ. Hai mục lỗi được đổi thành danh từ / cụm danh từ: creativity, good communication skills.',
  },
  {
    key: 'notonly',
    line: 'L4',
    name: 'not only… but also',
    group: 'Pair',
    parts: [
      { t: 'stem', text: 'She is' },
      { t: 'link', text: 'not only' },
      { t: 'car', form: 'Adj', good: 'talented' },
      { t: 'link', text: 'but also' },
      { t: 'car', form: 'Adj', good: 'hard-working', bad: 'works very hard', badForm: 'Verb' },
      { t: 'end', text: '.' },
    ],
    explain: 'Sau “not only” là tính từ (talented) → sau “but also” cũng phải là tính từ (hard-working).',
  },
  {
    key: 'either',
    line: 'L5',
    name: 'either… or',
    group: 'Pair',
    parts: [
      { t: 'stem', text: 'We can' },
      { t: 'link', text: 'either' },
      { t: 'car', form: 'Verb', good: 'take the train' },
      { t: 'link', text: 'or' },
      { t: 'car', form: 'Verb', good: 'take the bus', bad: 'by bus', badForm: 'Prep' },
      { t: 'end', text: '.' },
    ],
    explain: 'Hai vế sau either/or cùng là cụm động từ: take the train / take the bus. (“by train or by bus” cũng đúng nếu cả hai vế là cụm giới từ.)',
  },
  {
    key: 'than',
    line: 'L6',
    name: 'So sánh với than',
    group: 'Compare',
    parts: [
      { t: 'car', form: 'V-ing', good: 'Reading books' },
      { t: 'link', text: 'is more relaxing than' },
      { t: 'car', form: 'V-ing', good: 'watching TV', bad: 'to watch TV', badForm: 'to-V' },
      { t: 'end', text: '.' },
    ],
    explain: 'Hai thứ được so sánh phải cùng dạng: Reading … than watching. (Hoặc: It is more relaxing to read than to watch TV.)',
  },
  {
    key: 'that-of',
    line: 'L7',
    name: 'So sánh “cùng loại”',
    group: 'Compare',
    parts: [
      { t: 'car', form: 'Noun phrase', good: 'The population of Hanoi' },
      { t: 'link', text: 'is larger than' },
      { t: 'car', form: 'Noun phrase', good: 'that of Da Nang', bad: 'Da Nang', badForm: 'City' },
      { t: 'end', text: '.' },
    ],
    explain: 'So sánh dân số với dân số, không phải dân số với một thành phố. Dùng “that of / those of” để lặp lại danh từ — rất hay gặp trong IELTS Task 1.',
  },
  {
    key: 'that',
    line: 'L8',
    name: 'that… and that…',
    group: 'Repeat',
    parts: [
      { t: 'stem', text: 'The report says' },
      { t: 'car', form: 'that-clause', good: 'that sales have fallen' },
      { t: 'link', text: 'and' },
      { t: 'car', form: 'that-clause', good: 'that costs have risen', bad: 'costs rising', badForm: 'V-ing' },
      { t: 'end', text: '.' },
    ],
    explain: 'Lặp lại “that” để người đọc biết cả hai ý đều là nội dung của bản báo cáo, và hai vế đều là mệnh đề đầy đủ.',
  },
]

const LIST_FORMS = [
  { form: 'Noun', vi: 'Danh từ', ex: 'She loves [music], [art], and [literature].' },
  { form: 'Adjective', vi: 'Tính từ', ex: 'The hotel was [clean], [quiet], and [cheap].' },
  { form: 'V-ing', vi: 'Danh động từ', ex: 'He is good at [cooking], [singing], and [telling jokes].' },
  { form: 'to-V', vi: 'Động từ nguyên mẫu có to', ex: 'I want [to travel], [to learn], and [to grow].' },
  { form: 'Verb', vi: 'Động từ cùng thì', ex: 'She [opened] the door, [looked] around, and [left].' },
  { form: 'Clause', vi: 'Mệnh đề', ex: 'I know [who he is], [where he lives], and [what he does].' },
]

const PAIRS = [
  { pair: 'both … and', ex: 'The course is [both useful] and [enjoyable].', note: 'Hai chủ ngữ nối bằng both…and → động từ số nhiều: Both Lan and Minh are…' },
  { pair: 'either … or', ex: 'You can [either pay now] or [pay later].', note: 'Chủ ngữ either…or: động từ chia theo chủ ngữ gần nó nhất.' },
  { pair: 'neither … nor', ex: 'He [neither called] nor [texted] me.', note: 'Neither the manager nor the staff were… (chia theo “the staff”).' },
  { pair: 'not only … but also', ex: 'She speaks [not only English] but also [Korean].', note: 'Đặt “not only” ngay trước phần được nhấn mạnh, đối xứng với “but also”.' },
  { pair: 'whether … or', ex: 'I can’t decide [whether to stay] or [to leave].', note: 'Hai vế cùng dạng: whether to stay or (to) leave / whether I stay or I leave.' },
]

const COMPARES = [
  { ex: '[Reading] is better than [watching] TV.', note: 'V-ing ↔ V-ing' },
  { ex: 'It is cheaper [to cook] at home than [to eat] out.', note: 'to-V ↔ to-V' },
  { ex: 'I would rather [walk] than [drive].', note: 'would rather + V ↔ than + V' },
  { ex: '[The climate in Hanoi] is colder than [that in Ho Chi Minh City].', note: 'climate ↔ that (= the climate)' },
  { ex: '[Her salary] is as high as [that of her manager].', note: 'salary ↔ that of (= the salary of)' },
  { ex: '[Prices in 2024] were higher than [those in 2020].', note: 'Danh từ số nhiều → those' },
]

const REPEATS = [
  {
    bad: 'He said that he was tired and he wanted to go home.',
    good: 'He said [that] he was tired and [that] he wanted to go home.',
    note: 'Lặp “that” cho thấy cả hai ý đều là lời anh ấy nói, không phải hai câu độc lập.',
  },
  {
    bad: 'We can save money by cooking at home and cycling to work.',
    good: 'We can save money [by] cooking at home and [by] cycling to work.',
    note: 'Câu gốc vẫn đúng, nhưng lặp “by” giúp câu dài dễ đọc hơn và rõ ràng hai cách tiết kiệm.',
  },
  {
    bad: 'The aim is to reduce waste and protecting the environment.',
    good: 'The aim is [to] reduce waste and [to] protect the environment.',
    note: 'Lặp “to” làm hai đường ray rõ ràng: to reduce … and to protect.',
  },
  {
    bad: 'She is interested and good at maths.',
    good: 'She is interested [in] and good [at] maths.',
    note: 'Hai tính từ đi với hai giới từ khác nhau → phải giữ cả hai giới từ.',
  },
]

const RESUME = {
  before: [
    { text: 'Managed a team of five designers', ok: true },
    { text: 'Responsible for the monthly budget', ok: false },
    { text: 'Increasing online sales by 20%', ok: false },
    { text: 'I trained new staff every quarter', ok: false },
  ],
  after: [
    { text: '[Managed] a team of five designers', ok: true },
    { text: '[Oversaw] the monthly budget', ok: true },
    { text: '[Increased] online sales by 20%', ok: true },
    { text: '[Trained] new staff every quarter', ok: true },
  ],
  slidesBefore: ['Market analysis', 'Analysing our competitors', 'How we will grow'],
  slidesAfter: ['[Market] analysis', '[Competitor] analysis', '[Growth] strategy'],
}

const MISTAKES = [
  { bad: 'I like swimming, to run, and bikes.', good: 'I like [swimming], [running], and [cycling].', why: 'Mọi mục trong danh sách cùng một dạng (V-ing).' },
  { bad: 'She is not only smart but also works hard.', good: 'She is not only [smart] but also [hard-working].', why: 'Sau not only là tính từ → sau but also cũng là tính từ.' },
  { bad: 'She not only plays the piano but also the violin.', good: 'She plays not only [the piano] but also [the violin].', why: 'Đặt cặp tương liên ngay trước hai phần song song (hai danh từ).' },
  { bad: 'Either you call me or send an email.', good: 'Either [call me] or [send me an email].', why: '“Either you call” (mệnh đề) không cân với “send an email” (cụm động từ).' },
  { bad: 'Reading is better than to watch TV.', good: '[Reading] is better than [watching] TV.', why: 'Hai thứ được so sánh phải cùng dạng.' },
  { bad: 'The weather in Hue is wetter than Hanoi.', good: 'The weather in Hue is wetter than [that in] Hanoi.', why: 'So sánh thời tiết với thời tiết (that = the weather).' },
  { bad: 'The plan aims to cut costs, improving quality, and to save time.', good: 'The plan aims [to cut] costs, [(to) improve] quality, and [(to) save] time.', why: 'Hoặc lặp “to” ở mọi mục, hoặc chỉ dùng “to” một lần ở đầu — không trộn với V-ing.' },
  { bad: 'Skills: teamwork, communicating, and I can use Excel.', good: 'Skills: [teamwork], [communication], and [Excel].', why: 'Gạch đầu dòng/danh sách kỹ năng trong CV dùng cùng một loại từ (danh từ).' },
]

const RULE_TABS = [
  { key: 'list', label: 'Danh sách' },
  { key: 'pairs', label: 'Cặp tương liên' },
  { key: 'compare', label: 'So sánh' },
  { key: 'repeat', label: 'Lặp từ cho rõ' },
  { key: 'resume', label: 'CV & slides' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Marked({ text, className }) {
  return text.split(/\[([^\]]+)\]/g).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className={className}>
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

// Points along the bent rail: a quadratic curve that dips in the middle.
const SLEEPERS = [0.05, 0.17, 0.29, 0.41, 0.53, 0.65, 0.77, 0.89]
const dip = (t) => 8 + 36 * t * (1 - t)

function Rail({ bent }) {
  return (
    <svg className={styles.rail} viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g className={`${styles.railStraight} ${bent ? styles.railHidden : ''}`}>
        {SLEEPERS.map((t) => (
          <rect key={t} x={t * 100} y="4" width="5" height="18" className={styles.sleeper} />
        ))}
        <line x1="0" y1="8" x2="100" y2="8" className={styles.steel} vectorEffect="non-scaling-stroke" />
        <line x1="0" y1="18" x2="100" y2="18" className={styles.steel} vectorEffect="non-scaling-stroke" />
      </g>
      <g className={`${styles.railBent} ${bent ? '' : styles.railHidden}`}>
        {SLEEPERS.map((t) => (
          <rect key={t} x={t * 100} y={dip(t) - 4} width="5" height="16" className={styles.sleeperBent} />
        ))}
        <path d="M0 8 Q50 26 100 8" className={styles.steelBent} vectorEffect="non-scaling-stroke" />
        <path d="M0 16 Q50 34 100 16" className={styles.steelBent} vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}

function railIsBent(route, fixed) {
  return route.parts.some((p, i) => p.bad && !fixed[i])
}

/* ------------------------------------------------------------------ */
/*  Signature: the rail yard                                           */
/* ------------------------------------------------------------------ */

function Car({ part, broken, onToggle }) {
  const text = broken ? part.bad : part.good
  const form = broken ? part.badForm : part.form
  const fixable = Boolean(part.bad)

  const inner = (
    <>
      <span className={styles.carForm}>{form}</span>
      <span className={styles.carText}>{text}</span>
      {fixable && (
        <span className={styles.carHint}>
          {broken ? (
            <>
              <ToolOutlined aria-hidden="true" /> Bấm để sửa
            </>
          ) : (
            <>
              <CheckCircleFilled aria-hidden="true" /> Đã sửa
            </>
          )}
        </span>
      )}
    </>
  )

  return (
    <span className={`${styles.unit} ${broken ? styles.unitBroken : ''}`}>
      {fixable ? (
        <button
          type="button"
          className={`${styles.car} ${broken ? styles.carBroken : styles.carFixed}`}
          onClick={onToggle}
          aria-pressed={!broken}
          aria-label={
            broken
              ? `Toa trật bánh: "${part.bad}" (${part.badForm}). Bấm để sửa thành "${part.good}".`
              : `Toa đã sửa: "${part.good}" (${part.form}). Bấm để xem lại dạng sai.`
          }
        >
          {inner}
        </button>
      ) : (
        <span className={styles.car}>{inner}</span>
      )}
      <Rail bent={broken} />
    </span>
  )
}

function RailYard() {
  const [routeKey, setRouteKey] = useState(ROUTES[0].key)
  const [fixes, setFixes] = useState({})
  const route = ROUTES.find((r) => r.key === routeKey)
  const fixed = fixes[routeKey] ?? {}
  const brokenCount = route.parts.filter((p, i) => p.bad && !fixed[i]).length
  const totalBad = route.parts.filter((p) => p.bad).length

  const toggle = (i) =>
    setFixes((prev) => ({ ...prev, [routeKey]: { ...(prev[routeKey] ?? {}), [i]: !(prev[routeKey] ?? {})[i] } }))

  const fixAll = () =>
    setFixes((prev) => ({
      ...prev,
      [routeKey]: Object.fromEntries(route.parts.map((p, i) => [i, Boolean(p.bad)])),
    }))

  const breakAll = () => setFixes((prev) => ({ ...prev, [routeKey]: {} }))

  return (
    <section className={styles.yard} aria-labelledby="ps-yard-title">
      <div className={styles.yardTop}>
        <div>
          <p className={styles.eyebrow}>Rail yard · Đường ray song song</p>
          <h2 id="ps-yard-title" className={styles.yardTitle}>
            Mọi toa phải chạy trên cùng một đường ray
          </h2>
          <p className={styles.yardSub}>
            Các thành phần được nối bằng <em>and, or, but, than</em>… phải cùng dạng ngữ pháp. Một toa “lệch dạng” là
            đường ray cong ngay — bấm vào toa đỏ để sửa cho thẳng.
          </p>
        </div>
      </div>

      <div className={styles.yardBody}>
        <nav className={styles.board} aria-label="Chọn tuyến ví dụ">
          <p className={styles.boardHead}>
            <span>Tuyến</span>
            <span>Trạng thái</span>
          </p>
          <ul className={styles.boardList}>
            {ROUTES.map((r) => {
              const bent = railIsBent(r, fixes[r.key] ?? {})
              const active = r.key === routeKey
              return (
                <li key={r.key}>
                  <button
                    type="button"
                    className={`${styles.boardRow} ${active ? styles.boardActive : ''}`}
                    onClick={() => setRouteKey(r.key)}
                    aria-pressed={active}
                  >
                    <span className={styles.boardLine}>{r.line}</span>
                    <span className={styles.boardName}>{r.name}</span>
                    <span className={`${styles.signal} ${bent ? styles.signalRed : styles.signalGreen}`} aria-hidden="true" />
                    <span className={styles.srOnly}>{bent ? '(đang trật bánh)' : '(thẳng hàng)'}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.trackPanel}>
          <p className={styles.trackMeta}>
            <span className={styles.trackLine}>{route.line}</span> {route.name}
          </p>

          <div className={styles.track}>
            {route.parts.map((p, i) => {
              if (p.t === 'car') {
                return <Car key={`${routeKey}-${i}`} part={p} broken={Boolean(p.bad) && !fixed[i]} onToggle={() => toggle(i)} />
              }
              if (p.t === 'stem') {
                return (
                  <span key={`${routeKey}-${i}`} className={styles.unit}>
                    <span className={styles.engine}>
                      <span className={styles.engineLight} aria-hidden="true" />
                      <span className={styles.engineText}>{p.text}</span>
                    </span>
                    <Rail bent={false} />
                  </span>
                )
              }
              return (
                <span key={`${routeKey}-${i}`} className={`${styles.unit} ${p.t === 'end' ? styles.unitEnd : ''}`}>
                  <span className={p.t === 'end' ? styles.buffer : styles.coupler}>{p.text}</span>
                  <Rail bent={false} />
                </span>
              )
            })}
          </div>

          <div className={`${styles.status} ${brokenCount ? styles.statusRed : styles.statusGreen}`} role="status">
            <span className={`${styles.signal} ${brokenCount ? styles.signalRed : styles.signalGreen}`} aria-hidden="true" />
            <div>
              <p className={styles.statusHead}>
                {brokenCount
                  ? `Trật bánh: ${brokenCount}/${totalBad} toa lệch dạng`
                  : 'Thẳng hàng — mọi toa cùng một dạng'}
              </p>
              <p className={styles.statusText}>
                {brokenCount ? 'Toa màu đỏ đang mang dạng khác với toa đầu tiên. Bấm vào để sửa.' : route.explain}
              </p>
            </div>
          </div>

          <div className={styles.yardActions}>
            <Button type="primary" icon={<ToolOutlined />} onClick={fixAll} disabled={!brokenCount} className={styles.goBtn}>
              Sửa tất cả
            </Button>
            <Button icon={<ReloadOutlined />} onClick={breakAll} disabled={brokenCount === totalBad} className={styles.ghostBtn}>
              Làm trật bánh lại
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function ListRule() {
  return (
    <div className={styles.rulePane}>
      <p className={styles.ruleLead}>
        Dùng khi liệt kê từ hai thứ trở lên với <strong>and / or / but</strong>: chọn dạng của mục đầu tiên và giữ nguyên
        dạng đó cho tất cả các mục còn lại.
      </p>
      <div className={styles.formGrid}>
        {LIST_FORMS.map((f) => (
          <div key={f.form} className={styles.formCard}>
            <span className={styles.formTag}>{f.form}</span>
            <span className={styles.formVi}>{f.vi}</span>
            <p className={styles.formEx}>
              <Marked text={f.ex} className={styles.mRail} />
            </p>
          </div>
        ))}
      </div>
      <div className={styles.tip}>
        <strong>Với “to”:</strong> hoặc chỉ đặt một lần ở đầu (<em>to read, write, and speak</em>), hoặc lặp lại ở mọi
        mục (<em>to read, to write, and to speak</em>). Không trộn: <s>to read, write, and to speak</s>.
      </div>
    </div>
  )
}

function PairsRule() {
  return (
    <div className={styles.rulePane}>
      <p className={styles.ruleLead}>
        Cặp liên từ tương liên giống hai thanh ray: phần đứng sau <strong>vế thứ nhất</strong> và phần đứng sau{' '}
        <strong>vế thứ hai</strong> phải cùng loại (danh từ–danh từ, tính từ–tính từ, cụm động từ–cụm động từ…).
      </p>
      <ul className={styles.pairList}>
        {PAIRS.map((p) => (
          <li key={p.pair} className={styles.pairItem}>
            <span className={styles.pairName}>{p.pair}</span>
            <p className={styles.pairEx}>
              <Marked text={p.ex} className={styles.mRail} />
            </p>
            <p className={styles.pairNote}>{p.note}</p>
          </li>
        ))}
      </ul>
      <div className={styles.tip}>
        <strong>Vị trí rất quan trọng:</strong> <s>She not only plays the piano but also the violin.</s> → She plays{' '}
        <em>not only the piano but also the violin</em>. Đặt mỗi vế ngay trước phần song song.
      </div>
    </div>
  )
}

function CompareRule() {
  return (
    <div className={styles.rulePane}>
      <p className={styles.ruleLead}>
        Với <strong>than</strong>, <strong>as … as</strong>, <strong>rather than</strong>: hai thứ được so sánh phải cùng dạng
        và cùng loại. So sánh “quả táo với quả táo” — dùng <em>that of / those of</em> để không phải lặp danh từ.
      </p>
      <ul className={styles.compareList}>
        {COMPARES.map((c) => (
          <li key={c.ex} className={styles.compareItem}>
            <p className={styles.compareEx}>
              <Marked text={c.ex} className={styles.mRail} />
            </p>
            <span className={styles.compareNote}>{c.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RepeatRule() {
  return (
    <div className={styles.rulePane}>
      <p className={styles.ruleLead}>
        Khi các vế dài, lặp lại từ mở đầu (<strong>to, that, by, in, the…</strong>) ở mỗi vế giúp người đọc thấy rõ chỗ bắt
        đầu của từng “thanh ray”.
      </p>
      <ul className={styles.repeatList}>
        {REPEATS.map((r) => (
          <li key={r.good} className={styles.repeatItem}>
            <p className={styles.repeatFrom}>{r.bad}</p>
            <p className={styles.repeatTo}>
              <ArrowRightOutlined aria-hidden="true" className={styles.repeatArrow} /> <Marked text={r.good} className={styles.mRepeat} />
            </p>
            <p className={styles.repeatNote}>{r.note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ResumeRule() {
  const [view, setView] = useState('before')
  const after = view === 'after'
  const bullets = after ? RESUME.after : RESUME.before
  const slides = after ? RESUME.slidesAfter : RESUME.slidesBefore
  return (
    <div className={styles.rulePane}>
      <p className={styles.ruleLead}>
        Gạch đầu dòng trong CV, tiêu đề slide, mục lục cũng là một “danh sách”: bắt đầu tất cả bằng cùng một loại từ —
        thường là <strong>động từ quá khứ</strong> (CV) hoặc <strong>cụm danh từ</strong> (tiêu đề).
      </p>
      <Segmented
        value={view}
        onChange={setView}
        options={[
          { value: 'before', label: 'Trước khi sửa' },
          { value: 'after', label: 'Sau khi sửa' },
        ]}
        aria-label="Xem trước hoặc sau khi sửa"
      />
      <div className={styles.docs}>
        <article className={styles.doc}>
          <p className={styles.docHead}>
            <FileTextOutlined aria-hidden="true" /> CV · Experience
          </p>
          <ul className={styles.docList}>
            {bullets.map((b) => (
              <li key={b.text} className={b.ok ? styles.docOk : styles.docOff}>
                {b.ok ? <CheckCircleFilled aria-label="Đúng dạng" /> : <WarningOutlined aria-label="Lệch dạng" />}{' '}
                <span>
                  <Marked text={b.text} className={styles.mRail} />
                </span>
              </li>
            ))}
          </ul>
        </article>
        <article className={`${styles.doc} ${styles.slide}`}>
          <p className={styles.docHead}>Slide · Agenda</p>
          <ol className={styles.slideList}>
            {slides.map((s) => (
              <li key={s}>
                <Marked text={s} className={styles.mRail} />
              </li>
            ))}
          </ol>
        </article>
      </div>
      <p className={styles.docNote}>
        {after
          ? 'Mọi dòng CV bắt đầu bằng động từ quá khứ; mọi tiêu đề slide là cụm danh từ “X + noun”.'
          : 'Lẫn lộn: động từ quá khứ, cụm tính từ, V-ing và cả câu có chủ ngữ “I”. Tiêu đề slide: danh từ, V-ing, mệnh đề.'}
      </p>
    </div>
  )
}

const RULE_PANES = { list: ListRule, pairs: PairsRule, compare: CompareRule, repeat: RepeatRule, resume: ResumeRule }

function Rules() {
  return (
    <section className={styles.section} aria-labelledby="ps-rules-title">
      <h2 id="ps-rules-title" className={styles.secTitle}>
        <span className={styles.secKicker}>Quy tắc</span> Năm chỗ cần giữ song song
      </h2>
      <Tabs
        className={styles.tabs}
        items={RULE_TABS.map((t) => {
          const Pane = RULE_PANES[t.key]
          return { key: t.key, label: t.label, children: <Pane /> }
        })}
      />
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.section} aria-labelledby="ps-mistakes-title">
      <h2 id="ps-mistakes-title" className={styles.secTitle}>
        <span className={styles.secKicker}>Lỗi hay gặp</span> Những toa hay bị trật bánh
      </h2>
      <ul className={styles.mistakeList}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mistake}>
            <p className={styles.mWrong}>
              <CloseCircleFilled aria-label="Sai" /> <span>{m.bad}</span>
            </p>
            <p className={styles.mRight}>
              <CheckCircleFilled aria-label="Đúng" />{' '}
              <span>
                <Marked text={m.good} className={styles.mRail} />
              </span>
            </p>
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

export default function ParallelStructure() {
  return (
    <div className={styles.page}>
      <RailYard />
      <Rules />
      <Mistakes />
    </div>
  )
}
