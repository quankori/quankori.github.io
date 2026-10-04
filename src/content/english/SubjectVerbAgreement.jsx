import { useRef, useState } from 'react'
import { Button, Segmented } from 'antd'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LeftOutlined,
  RightOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './SubjectVerbAgreement.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: *subject* [verb]                                   */
/*  Demo markup:    *head noun*  ~words that only look like subject~   */
/*                  ___ = the verb slot                                */
/* ------------------------------------------------------------------ */

const GROUPS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'sg', label: 'Luôn số ít' },
  { value: 'pl', label: 'Số nhiều' },
  { value: 'mixed', label: 'Tùy trường hợp' },
]

const GROUP_NAME = { sg: 'Luôn số ít', pl: 'Số nhiều', mixed: 'Tùy trường hợp' }

const RULES = [
  {
    key: 'basic',
    group: 'mixed',
    title: 'Cơ bản: số ít / số nhiều',
    formula: 'S số ít + V-s/es (is, has, was) · S số nhiều + V nguyên mẫu (are, have, were)',
    explain:
      'Động từ chia theo chủ ngữ. Ở hiện tại đơn, chủ ngữ ngôi 3 số ít (he, she, it, danh từ số ít) thêm -s/-es; I / you / we / they và danh từ số nhiều dùng động từ nguyên mẫu.',
    examples: ['*My brother* [works] in a bank.', '*My brothers* [work] in a bank.', '*The children* [were] tired.'],
    demo: {
      text: '*The students* ___ English every morning.',
      num: 'pl',
      options: [['studies', 'sg'], ['study', 'pl']],
      why: '“The students” là danh từ số nhiều → động từ nguyên mẫu “study”.',
    },
  },
  {
    key: 'between',
    group: 'mixed',
    title: 'Bỏ qua phần chen giữa',
    formula: 'S + (of… / with… / along with… / as well as…) + V chia theo S',
    explain:
      'Cụm giới từ hoặc cụm along with, together with, as well as, accompanied by chen giữa không làm thay đổi chủ ngữ. Tìm danh từ chính (head noun) rồi chia theo nó.',
    examples: [
      '*The box* of apples [is] heavy.',
      '*The teacher*, along with her students, [is] visiting the museum.',
      '*The quality* of these products [has] improved.',
    ],
    demo: {
      text: 'The *box* ~of apples~ ___ on the table.',
      num: 'sg',
      options: [['are', 'pl'], ['is', 'sg']],
      why: 'Danh từ chính là “box” (số ít); “of apples” chỉ là phần bổ nghĩa chen giữa.',
    },
  },
  {
    key: 'each',
    group: 'sg',
    title: 'Each · every · -one · -body · -thing',
    formula: 'Each / Every + N số ít + V số ít · Each of + N số nhiều + V số ít',
    explain:
      'Each, every, either, neither và đại từ bất định (everyone, somebody, nothing, anyone…) mang nghĩa “từng cái một” → động từ số ít. Either of / neither of + N số nhiều: văn trang trọng dùng số ít, văn nói đôi khi dùng số nhiều.',
    examples: ['*Every student* [has] a laptop.', '*Each of the rooms* [has] a balcony.', '*Everyone* [is] here.'],
    demo: {
      text: '*Each* ~of the players~ ___ a number on his shirt.',
      num: 'sg',
      options: [['has', 'sg'], ['have', 'pl']],
      why: 'Chủ ngữ thật là “Each” (từng người một) → số ít; “of the players” chỉ bổ nghĩa.',
    },
  },
  {
    key: 'nearest',
    group: 'mixed',
    title: 'Either…or · Neither…nor: theo chủ ngữ gần nhất',
    formula: 'Either A or B · Neither A nor B · Not only A but also B · A or B → V theo B',
    explain:
      'Với các cặp liên từ này, động từ hòa hợp với chủ ngữ đứng gần động từ nhất (B). Mẹo: đặt chủ ngữ số nhiều ở cuối để câu nghe tự nhiên hơn.',
    examples: [
      'Neither the teacher nor *the students* [were] late.',
      'Either the students or *the teacher* [is] responsible.',
      'Not only my parents but also *my sister* [likes] jazz.',
    ],
    demo: {
      text: 'Neither my parents nor *my sister* ___ coffee.',
      num: 'sg',
      options: [['drink', 'pl'], ['drinks', 'sg']],
      why: 'Chủ ngữ gần động từ nhất là “my sister” (số ít) → drinks.',
    },
  },
  {
    key: 'both',
    group: 'pl',
    title: 'Both…and · A and B',
    formula: 'Both A and B + V số nhiều · A and B + V số nhiều',
    explain:
      'Hai chủ ngữ nối bằng “and” cộng lại thành số nhiều. Ngoại lệ: “and” nối hai từ chỉ cùng một thứ/một người → số ít: Bread and butter is my breakfast · The singer and songwriter is here (một người).',
    examples: [
      '*Both Tom and Mary* [are] doctors.',
      '*My friend and I* [go] to the gym.',
      '*Bread and butter* [is] my favourite breakfast. (một món)',
    ],
    demo: {
      text: '*Both the kitchen and the bathroom* ___ quite small.',
      num: 'pl',
      options: [['is', 'sg'], ['are', 'pl']],
      why: '“Both … and …” gộp hai chủ ngữ → số nhiều → are.',
    },
  },
  {
    key: 'number',
    group: 'mixed',
    title: 'A number of vs The number of',
    formula: 'A number of + N số nhiều + V số nhiều · The number of + N số nhiều + V số ít',
    explain:
      '“A number of” = nhiều (many) → chủ ngữ thật là danh từ số nhiều phía sau. “The number of” = con số, số lượng → chủ ngữ là “number” (số ít).',
    examples: [
      '*A number of students* [are] absent today.',
      '*The number* of students [is] increasing.',
      '*The number* of cars on the road [has] doubled.',
    ],
    demo: {
      text: 'The *number* ~of cars in the city~ ___ growing fast.',
      num: 'sg',
      options: [['are', 'pl'], ['is', 'sg']],
      why: '“The number of” = số lượng → chủ ngữ là “number” (số ít) → is.',
    },
  },
  {
    key: 'collective',
    group: 'mixed',
    title: 'Danh từ tập hợp',
    formula: 'Team / family / class / government / audience + V số ít (một khối) · police / people / cattle + V số nhiều',
    explain:
      'Danh từ tập hợp xem như một khối thống nhất → số ít (đặc biệt trong tiếng Anh Mỹ). Tiếng Anh Anh có thể dùng số nhiều khi nhấn mạnh từng thành viên. Police, people, cattle luôn đi với động từ số nhiều.',
    examples: [
      '*The team* [is] in first place.',
      '*My family* [are] all early risers. (BrE — từng thành viên)',
      '*The police* [are] investigating the case.',
    ],
    demo: {
      text: '*The police* ___ looking for the thief.',
      num: 'pl',
      options: [['is', 'sg'], ['are', 'pl']],
      why: '“Police” luôn mang nghĩa số nhiều (các cảnh sát) → are.',
    },
  },
  {
    key: 'uncountable',
    group: 'sg',
    title: 'Danh từ không đếm được',
    formula: 'Information / advice / furniture / money / equipment / luggage + V số ít',
    explain:
      'Danh từ không đếm được luôn đi với động từ số ít, dù tiếng Việt hiểu là “nhiều” (nhiều đồ đạc, nhiều thông tin). Không thêm -s: ✗ informations, ✗ furnitures.',
    examples: ['*The information* [was] very useful.', '*Your advice* [has] helped me a lot.', '*Money* [isn’t] everything.'],
    demo: {
      text: '*The furniture* ~in these rooms~ ___ very old.',
      num: 'sg',
      options: [['is', 'sg'], ['are', 'pl']],
      why: '“Furniture” không đếm được → số ít; “in these rooms” chỉ chen giữa.',
    },
  },
  {
    key: 'there',
    group: 'mixed',
    title: 'There is / There are',
    formula: 'There is / was + N số ít, không đếm được · There are / were + N số nhiều',
    explain:
      '“There” không phải chủ ngữ thật — động từ chia theo danh từ đứng sau. Khi liệt kê nhiều thứ, văn nói thường chia theo danh từ đầu tiên: There is a pen and two notebooks in my bag.',
    examples: ['There [is] *a book* on the desk.', 'There [are] *many people* in the hall.', 'There [was] *some milk* in the fridge.'],
    demo: {
      text: 'There ___ *a lot of problems* with this plan.',
      num: 'pl',
      options: [['is', 'sg'], ['are', 'pl']],
      why: 'Danh từ sau động từ là “problems” (số nhiều) → are.',
    },
  },
  {
    key: 'amount',
    group: 'sg',
    title: 'Thời gian · tiền · khoảng cách',
    formula: 'Lượng thời gian / tiền / khoảng cách / cân nặng (một tổng thể) + V số ít',
    explain:
      'Khi một lượng được xem như một tổng thể (một khoảng thời gian, một khoản tiền, một quãng đường), dùng động từ số ít dù danh từ có -s.',
    examples: ['*Ten years* [is] a long time.', '*Five hundred dollars* [is] too much for a phone.', '*Two kilometres* [isn’t] far.'],
    demo: {
      text: '*Three hours* ___ enough to finish the test.',
      num: 'sg',
      options: [['are', 'pl'], ['is', 'sg']],
      why: '“Three hours” là một khoảng thời gian tổng thể → is.',
    },
  },
  {
    key: 'title',
    group: 'sg',
    title: 'Tên sách, phim, tổ chức, quốc gia',
    formula: 'Tên tác phẩm / công ty / quốc gia + V số ít',
    explain:
      'Một tựa đề hay một tên riêng chỉ là một tác phẩm, một thực thể — dù trong tên có danh từ số nhiều hay có “and”.',
    examples: [
      '*“Little Women”* [was] written by Louisa May Alcott.',
      '*The United States* [has] fifty states.',
      '*The Philippines* [is] an island nation.',
    ],
    demo: {
      text: '*“Romeo and Juliet”* ___ a tragedy by Shakespeare.',
      num: 'sg',
      options: [['are', 'pl'], ['is', 'sg']],
      why: 'Đây là tên một vở kịch → một tác phẩm → số ít.',
    },
  },
  {
    key: 'ics',
    group: 'sg',
    title: 'Tận cùng -s nhưng số ít',
    formula: 'News · mathematics · physics · economics · politics · measles + V số ít',
    explain:
      'Tên môn học (-ics), “news”, tên một số bệnh (measles, diabetes) trông giống số nhiều nhưng là số ít. Lưu ý: statistics là môn học → số ít; “the statistics” (các số liệu) → số nhiều: The statistics show…',
    examples: ['*The news* [was] surprising.', '*Mathematics* [is] my favourite subject.', '*Measles* [is] a contagious disease.'],
    demo: {
      text: '*Physics* ___ difficult for many students.',
      num: 'sg',
      options: [['is', 'sg'], ['are', 'pl']],
      why: '“Physics” là tên môn học → số ít.',
    },
  },
  {
    key: 'gerund',
    group: 'sg',
    title: 'V-ing · To V · mệnh đề làm chủ ngữ',
    formula: 'V-ing… / To V… / What… / That… + V số ít',
    explain:
      'Một hành động hay một mệnh đề làm chủ ngữ được xem như một việc → động từ số ít. Hai V-ing nối bằng “and” chỉ hai việc riêng → số nhiều: Reading and writing are important.',
    examples: ['*Swimming* [is] good for your health.', '*Learning languages* [takes] time.', '*What he said* [was] true.'],
    demo: {
      text: '*Reading* ~books before bed~ ___ me relax.',
      num: 'sg',
      options: [['help', 'pl'], ['helps', 'sg']],
      why: 'Chủ ngữ là hành động “Reading books before bed” (một việc) → helps. Đừng để “books” đánh lừa.',
    },
  },
  {
    key: 'oneof',
    group: 'sg',
    title: 'One of the + N số nhiều',
    formula: 'One of the + N số nhiều + V số ít',
    explain:
      'Chủ ngữ là “one” (một trong số…) → động từ số ít. Danh từ sau “one of the” phải ở số nhiều.',
    examples: [
      '*One* of my friends [lives] in Canada.',
      '*One* of the best films of the year [is] on tonight.',
      '*One* of these keys [opens] the back door.',
    ],
    demo: {
      text: '*One* ~of the windows~ ___ broken.',
      num: 'sg',
      options: [['are', 'pl'], ['is', 'sg']],
      why: 'Chủ ngữ là “One” → is; “windows” phải số nhiều nhưng không quyết định động từ.',
    },
  },
  {
    key: 'part',
    group: 'mixed',
    title: 'Some / most / half / % + of + N',
    formula: 'All / Some / Most / Half / Phân số / % + of + N → V chia theo N',
    explain:
      'Với các từ chỉ một phần, động từ chia theo danh từ sau “of”: N số nhiều → V số nhiều; N số ít hoặc không đếm được → V số ít.',
    examples: ['*Half of the cake* [has] been eaten.', '*Sixty percent of the students* [are] girls.', '*Most of the information* [is] correct.'],
    demo: {
      text: '*Most of the students* ___ passed the exam.',
      num: 'pl',
      options: [['has', 'sg'], ['have', 'pl']],
      why: 'Danh từ sau “of” là “students” (số nhiều) → have.',
    },
  },
]

const MISTAKES = [
  { bad: 'Everyone have finished.', good: 'Everyone has finished.', why: 'Everyone / everybody nghĩa là “mọi người” nhưng về ngữ pháp là số ít.' },
  { bad: 'The news are good.', good: 'The news is good.', why: '“News” không đếm được, luôn số ít dù có -s.' },
  { bad: 'A number of student has left.', good: 'A number of students have left.', why: 'A number of + danh từ số nhiều + động từ số nhiều.' },
  { bad: 'The quality of these products are poor.', good: 'The quality of these products is poor.', why: 'Chủ ngữ là “quality”, không phải “products”.' },
  { bad: 'There is many problems.', good: 'There are many problems.', why: 'Sau “there”, động từ chia theo danh từ phía sau (problems → are).' },
  { bad: 'One of my friend live in Hue.', good: 'One of my friends lives in Hue.', why: 'One of + N số nhiều (friends) + V số ít (lives).' },
  { bad: 'The informations are useful.', good: 'The information is useful.', why: '“Information” không đếm được: không thêm -s, động từ số ít.' },
  { bad: 'He don’t like coffee.', good: 'He doesn’t like coffee.', why: 'Trợ động từ cũng phải hòa hợp: he / she / it + does / doesn’t.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function ExampleText({ text }) {
  return text.split(/(\*[^*]+\*|\[[^\]]+\])/g).filter(Boolean).map((p, i) => {
    if (p.startsWith('*')) return <mark key={i} className={styles.subj}>{p.slice(1, -1)}</mark>
    if (p.startsWith('[')) return <mark key={i} className={styles.verb}>{p.slice(1, -1)}</mark>
    return <span key={i}>{p}</span>
  })
}

function DemoText({ text, verb, state }) {
  return text.split(/(\*[^*]+\*|~[^~]+~|___)/g).filter(Boolean).map((p, i) => {
    if (p.startsWith('*')) return <mark key={i} className={styles.subj}>{p.slice(1, -1)}</mark>
    if (p.startsWith('~')) {
      return (
        <span key={i} className={state === 'idle' ? styles.decoyQuiet : styles.decoy}>
          {p.slice(1, -1)}
        </span>
      )
    }
    if (p === '___') {
      return (
        <span key={i} className={`${styles.slot} ${verb ? styles[`slot_${state}`] : ''}`}>
          {verb || '?'}
        </span>
      )
    }
    return <span key={i}>{p}</span>
  })
}

/* ------------------------------------------------------------------ */
/*  Balance scale (signature)                                          */
/* ------------------------------------------------------------------ */

const PX = 180
const PY = 62
const ARM = 124

function Weights({ kind, label }) {
  if (kind === 'mystery') {
    return (
      <g className={styles.sack}>
        <path d="M -20 80 C -26 60 -18 44 -8 40 L -12 32 L 12 32 L 8 40 C 18 44 26 60 20 80 Z" />
        <text x="0" y="68" textAnchor="middle" className={styles.sackText}>?</text>
      </g>
    )
  }
  if (kind === 'sg') {
    return (
      <g className={styles.weight}>
        <rect x="-19" y="50" width="38" height="30" rx="5" />
        <text x="0" y="70" textAnchor="middle" className={styles.weightText}>{label}</text>
      </g>
    )
  }
  if (kind === 'pl') {
    return (
      <g className={styles.weight}>
        <rect x="-38" y="56" width="36" height="24" rx="4" />
        <rect x="2" y="56" width="36" height="24" rx="4" />
        <rect x="-18" y="30" width="36" height="24" rx="4" />
        <text x="0" y="47" textAnchor="middle" className={styles.weightText}>{label}</text>
      </g>
    )
  }
  return null
}

function Pan({ side, angle, children }) {
  const rad = (angle * Math.PI) / 180
  const sign = side === 'left' ? -1 : 1
  const x = PX + sign * ARM * Math.cos(rad)
  const y = PY + sign * ARM * Math.sin(rad)
  return (
    <g className={styles.pan} style={{ transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)` }}>
      <line x1="0" y1="0" x2="-46" y2="80" className={styles.chain} />
      <line x1="0" y1="0" x2="46" y2="80" className={styles.chain} />
      <circle cx="0" cy="0" r="4" className={styles.hook} />
      {children}
      <path d="M -56 80 Q 0 108 56 80 Z" className={styles.dish} />
    </g>
  )
}

function Scale({ subjectNum, verb, state }) {
  let angle = -9
  if (verb) {
    const left = subjectNum === 'pl' ? 3 : 1
    const right = verb[1] === 'pl' ? 3 : 1
    angle = left === right ? 0 : left > right ? -13 : 13
  }
  const label = state === 'idle' ? 'Cân đang chờ: chọn động từ' : state === 'ok' ? 'Cân thăng bằng: đúng' : 'Cân lệch: sai'

  return (
    <svg viewBox="0 0 360 252" className={`${styles.scale} ${styles[`scale_${state}`]}`} role="img" aria-label={label}>
      <defs>
        <linearGradient id="sva-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0cf7d" />
          <stop offset="1" stopColor="#a8761f" />
        </linearGradient>
      </defs>
      <circle cx={PX} cy={PY} r="46" className={styles.halo} />
      {/* dial */}
      <path d="M 161.4 22.1 A 44 44 0 0 1 198.6 22.1" className={styles.dial} />
      <line x1={PX} y1="12" x2={PX} y2="20" className={styles.dialZero} />
      {/* pillar + base */}
      <rect x={PX - 6} y={PY} width="12" height="152" rx="3" fill="url(#sva-brass)" />
      <path d={`M ${PX - 58} 230 L ${PX - 36} 210 L ${PX + 36} 210 L ${PX + 58} 230 Z`} fill="url(#sva-brass)" />
      <rect x={PX - 72} y="229" width="144" height="10" rx="4" className={styles.plinth} />
      {/* beam + needle */}
      <g className={styles.beam} style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${PX}px ${PY}px` }}>
        <rect x={PX - ARM - 6} y={PY - 4} width={ARM * 2 + 12} height="8" rx="4" fill="url(#sva-brass)" />
        <line x1={PX} y1={PY} x2={PX} y2={PY - 36} className={styles.needle} />
      </g>
      <circle cx={PX} cy={PY} r="9" className={styles.pivot} />
      <Pan side="left" angle={angle}>
        <Weights kind={verb ? subjectNum : 'mystery'} label="S" />
      </Pan>
      <Pan side="right" angle={angle}>
        {verb && <Weights kind={verb[1]} label="V" />}
      </Pan>
    </svg>
  )
}

function Playground({ index, setIndex, scaleRef }) {
  const [picked, setPicked] = useState(null)
  const rule = RULES[index]
  const demo = rule.demo
  const verb = picked !== null ? demo.options[picked] : null
  const state = !verb ? 'idle' : verb[1] === demo.num ? 'ok' : 'bad'
  const correct = demo.options.find((o) => o[1] === demo.num)[0]

  const go = (i) => {
    setPicked(null)
    setIndex((i + RULES.length) % RULES.length)
  }

  return (
    <section className={styles.lab} ref={scaleRef} tabIndex={-1} aria-labelledby="sva-lab-title">
      <div className={styles.labHead}>
        <div>
          <p className={styles.eyebrow}>Agreement scale</p>
          <h2 id="sva-lab-title" className={styles.labTitle}>Cân hòa hợp</h2>
        </div>
        <span className={styles.ruleChip}>
          {index + 1}/{RULES.length} · {rule.title}
        </span>
      </div>

      <p className={styles.labHint}>
        Đĩa trái là <strong>chủ ngữ thật</strong>, đĩa phải là <strong>động từ</strong>. Chọn động từ — cân chỉ thăng bằng khi số ít / số nhiều khớp nhau.
      </p>

      <p className={styles.demoSentence} aria-live="polite">
        <DemoText text={demo.text} verb={verb ? verb[0] : null} state={state} />
      </p>

      <div className={styles.labBody}>
        <Scale subjectNum={demo.num} verb={verb} state={state} />
        <div className={styles.panLabels} aria-hidden="true">
          <span>S · {verb ? (demo.num === 'sg' ? 'số ít' : 'số nhiều') : '?'}</span>
          <span>V · {verb ? (verb[1] === 'sg' ? 'số ít' : 'số nhiều') : '—'}</span>
        </div>
      </div>

      <div className={styles.verbPicks} role="group" aria-label="Chọn động từ">
        {demo.options.map(([v, n], i) => (
          <button
            key={v}
            type="button"
            className={styles.verbPick}
            aria-pressed={picked === i}
            onClick={() => setPicked(i)}
          >
            <span className={styles.verbWord}>{v}</span>
            <span className={styles.verbNum}>{n === 'sg' ? 'số ít' : 'số nhiều'}</span>
          </button>
        ))}
      </div>

      <div className={styles.verdict} role="status">
        {state === 'ok' && (
          <p className={styles.vOk}><CheckCircleFilled aria-hidden="true" /> Thăng bằng! {demo.why}</p>
        )}
        {state === 'bad' && (
          <p className={styles.vBad}>
            <CloseCircleFilled aria-hidden="true" /> Cân lệch — cần “{correct}”. {demo.why}
          </p>
        )}
        {state === 'idle' && <p className={styles.vIdle}>Gợi ý: phần chữ mờ chỉ là phần chen giữa, không phải chủ ngữ.</p>}
      </div>

      <div className={styles.labNav}>
        <Button icon={<LeftOutlined />} onClick={() => go(index - 1)} aria-label="Quy tắc trước">Trước</Button>
        <Button type="primary" className={styles.brassBtn} icon={<RightOutlined />} iconPlacement="end" onClick={() => go(index + 1)}>
          Câu tiếp
        </Button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules, mistakes                                                    */
/* ------------------------------------------------------------------ */

function Rules({ onTry }) {
  const [group, setGroup] = useState('all')
  const list = RULES.map((r, i) => ({ ...r, i })).filter((r) => group === 'all' || r.group === group)

  return (
    <section aria-labelledby="sva-rules-title" className={styles.rules}>
      <div className={styles.rulesHead}>
        <h2 id="sva-rules-title" className={styles.h2}>{RULES.length} quy tắc cần nhớ</h2>
        <div className={styles.segWrap}>
          <Segmented value={group} onChange={setGroup} options={GROUPS} aria-label="Lọc quy tắc" />
        </div>
      </div>
      <p className={styles.legendLine}>
        <mark className={styles.subj}>chủ ngữ thật</mark> · <mark className={styles.verb}>động từ</mark>
      </p>

      <ol className={styles.ruleGrid}>
        {list.map((r) => (
          <li key={r.key} className={`${styles.ruleCard} ${styles[`g_${r.group}`]}`}>
            <div className={styles.ruleTop}>
              <span className={styles.ruleNo}>{String(r.i + 1).padStart(2, '0')}</span>
              <span className={styles.ruleGroup}>{GROUP_NAME[r.group]}</span>
            </div>
            <h3 className={styles.ruleTitle}>{r.title}</h3>
            <p className={styles.ruleFormula}>{r.formula}</p>
            <p className={styles.ruleExplain}>{r.explain}</p>
            <ul className={styles.ruleEx}>
              {r.examples.map((ex) => (
                <li key={ex}><ExampleText text={ex} /></li>
              ))}
            </ul>
            <button type="button" className={styles.tryBtn} onClick={() => onTry(r.i)}>
              <span aria-hidden="true">⚖</span> Thử trên cân
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.mistakes} aria-labelledby="sva-mistakes-title">
      <h2 id="sva-mistakes-title" className={styles.h2}>
        <WarningOutlined aria-hidden="true" /> Lỗi hay gặp
      </h2>
      <ul className={styles.mList}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mRow}>
            <span className={styles.mBad}><span aria-hidden="true">❌</span> {m.bad}</span>
            <span className={styles.mGood}><span aria-hidden="true">✅</span> {m.good}</span>
            <span className={styles.mWhy}>{m.why}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SubjectVerbAgreement() {
  const [index, setIndex] = useState(1)
  const [runKey, setRunKey] = useState(0)
  const scaleRef = useRef(null)

  const tryRule = (i) => {
    setIndex(i)
    setRunKey((k) => k + 1)
    const el = scaleRef.current
    if (el) {
      const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      el.focus({ preventScroll: true })
    }
  }

  return (
    <div className={styles.page}>
      <Playground key={runKey} index={index} setIndex={setIndex} scaleRef={scaleRef} />
      <Rules onTry={tryRule} />
      <Mistakes />
    </div>
  )
}
