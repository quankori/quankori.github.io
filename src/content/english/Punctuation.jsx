import { useState } from 'react'
import { Collapse } from 'antd'
import {
  WarningOutlined,
} from '@ant-design/icons'
import styles from './Punctuation.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  `hl` lists the characters highlighted in that sign's examples.     */
/* ------------------------------------------------------------------ */

const SIGNS = [
  {
    key: 'period',
    glyph: '.',
    name: 'Full stop / Period',
    plate: 'STOP',
    hl: '.',
    metaphor: 'Dừng hẳn',
    desc: 'Kết thúc một câu trần thuật hoặc câu mệnh lệnh bình thường. Xe dừng hẳn — ý đã trọn, câu mới bắt đầu bằng chữ hoa.',
    uses: [
      { label: 'Kết thúc câu trần thuật', ex: 'We arrived at noon.' },
      { label: 'Câu mệnh lệnh nhẹ nhàng', ex: 'Please close the door.' },
      { label: 'Câu hỏi gián tiếp vẫn dùng dấu chấm', ex: 'I wonder where she is.' },
      { label: 'Viết tắt (kiểu Mỹ)', ex: 'Dr. Lan starts work at 7 a.m.' },
    ],
  },
  {
    key: 'comma',
    glyph: ',',
    name: 'Comma',
    plate: 'YIELD',
    hl: ',',
    metaphor: 'Giảm tốc, nhường đường',
    desc: 'Ngắt nhẹ bên trong câu: chưa dừng hẳn, chỉ chậm lại để người đọc tách các phần cho rõ.',
    uses: [
      { label: 'Liệt kê từ 3 mục trở lên', ex: 'I bought eggs, milk, and bread.' },
      { label: 'Sau cụm / mệnh đề mở đầu', ex: 'After lunch, we went to the beach.' },
      { label: 'Trước FANBOYS nối hai mệnh đề độc lập', ex: 'It was late, so we took a taxi.' },
      { label: 'Bao mệnh đề quan hệ không xác định', ex: 'My mother, who is a nurse, works at night.' },
      { label: 'Gọi tên người nghe', ex: 'Lan, can you help me?' },
    ],
  },
  {
    key: 'semicolon',
    glyph: ';',
    name: 'Semicolon',
    plate: 'ROUNDABOUT',
    hl: ';',
    metaphor: 'Bùng binh nối hai con đường',
    desc: 'Nối hai mệnh đề độc lập có quan hệ chặt chẽ mà không cần liên từ. Hai bên dấu ; đều phải là câu hoàn chỉnh.',
    uses: [
      { label: 'Nối hai mệnh đề độc lập', ex: 'I love tea; my brother prefers coffee.' },
      { label: 'Trước trạng từ nối (however, therefore…)', ex: 'It was raining; however, we went out.' },
      { label: 'Tách các mục dài đã có dấu phẩy bên trong', ex: 'We visited Hue, Vietnam; Bangkok, Thailand; and Seoul, Korea.' },
    ],
  },
  {
    key: 'colon',
    glyph: ':',
    name: 'Colon',
    plate: 'AHEAD',
    hl: ':',
    metaphor: 'Phía trước là…',
    desc: 'Báo hiệu “sắp tới là”: một danh sách, một lời giải thích hay một trích dẫn. Phần đứng trước dấu hai chấm phải là một mệnh đề hoàn chỉnh.',
    uses: [
      { label: 'Giới thiệu danh sách', ex: 'You need three things: patience, practice and time.' },
      { label: 'Giải thích / nhấn mạnh', ex: 'She had one goal: to win.' },
      { label: 'Giờ, tỉ số, tiêu đề phụ', ex: 'The train leaves at 9:30.' },
    ],
  },
  {
    key: 'dash',
    glyph: '—',
    name: 'Dash (em dash)',
    plate: 'DETOUR',
    hl: '—',
    metaphor: 'Đường vòng',
    desc: 'Rẽ ra khỏi mạch câu để chèn thêm thông tin, nhấn mạnh, hoặc đổi hướng đột ngột. Mạnh và “ồn” hơn dấu phẩy, hay dùng trong văn thân mật.',
    uses: [
      { label: 'Chèn thông tin (thay cặp dấu phẩy)', ex: 'My best friend—the one from Hue—is getting married.' },
      { label: 'Nhấn mạnh phần cuối', ex: 'There was only one problem—money.' },
      { label: 'Đổi hướng đột ngột', ex: 'I was about to leave—then the phone rang.' },
    ],
  },
  {
    key: 'hyphen',
    glyph: '-',
    name: 'Hyphen',
    plate: 'LINK',
    hl: '-',
    metaphor: 'Cầu nối nhỏ',
    desc: 'Gạch ngắn, không có khoảng trắng, nối các từ thành một từ ghép. Không nhầm với dash (gạch dài) dùng để ngắt câu.',
    uses: [
      { label: 'Tính từ ghép đứng trước danh từ', ex: 'She is a well-known writer.' },
      { label: 'Tuổi, số đo làm tính từ', ex: 'They have a five-year-old son.' },
      { label: 'Số từ 21 đến 99', ex: 'He turned twenty-one yesterday.' },
      { label: 'Một số tiền tố', ex: 'My ex-boss had to re-enter the data.' },
    ],
  },
  {
    key: 'apostrophe',
    glyph: '’',
    name: 'Apostrophe',
    plate: 'MERGE',
    hl: '’',
    metaphor: 'Nhập làn',
    desc: 'Hai từ “nhập làn” thành một (it is → it’s), hoặc chỉ sự sở hữu. Không dùng ’ để tạo số nhiều.',
    uses: [
      { label: 'Rút gọn (contraction)', ex: 'It’s cold, and I don’t have a coat.' },
      { label: 'Sở hữu — danh từ số ít: ’s', ex: 'This is my sister’s room.' },
      { label: 'Sở hữu — số nhiều tận cùng -s: s’', ex: 'The students’ books are on the shelf.' },
      { label: 'Sở hữu — số nhiều bất quy tắc: ’s', ex: 'The children’s toys are everywhere.' },
    ],
  },
  {
    key: 'quotes',
    glyph: '“ ”',
    name: 'Quotation marks',
    plate: 'TUNNEL',
    hl: '“”',
    metaphor: 'Đường hầm',
    desc: 'Bao lời nói trực tiếp, trích dẫn hoặc tên bài viết/bài hát. Có lối vào thì phải có lối ra: luôn đi thành cặp.',
    uses: [
      { label: 'Lời nói trực tiếp', ex: '“I’m tired,” she said.' },
      { label: 'Câu hỏi trong lời trích', ex: 'He asked, “Are you coming?”' },
      { label: 'Tên bài hát, bài báo, chương sách', ex: 'My favourite song is “Yesterday.”' },
    ],
  },
  {
    key: 'question',
    glyph: '?',
    name: 'Question mark',
    plate: 'INFO',
    hl: '?',
    metaphor: 'Trạm hỏi đường',
    desc: 'Kết thúc một câu hỏi trực tiếp, kể cả câu hỏi đuôi. Câu hỏi gián tiếp (I wonder…, She asked…) dùng dấu chấm.',
    uses: [
      { label: 'Câu hỏi trực tiếp', ex: 'Where do you live?' },
      { label: 'Câu hỏi đuôi', ex: 'You’re a student, aren’t you?' },
      { label: 'Câu hỏi lịch sự', ex: 'Could you tell me where the station is?' },
    ],
  },
  {
    key: 'exclamation',
    glyph: '!',
    name: 'Exclamation mark',
    plate: 'WARNING',
    hl: '!',
    metaphor: 'Biển cảnh báo',
    desc: 'Thể hiện cảm xúc mạnh, ngạc nhiên hoặc mệnh lệnh gấp. Dùng tiết kiệm — trong văn trang trọng gần như không dùng, và không dùng “!!!”.',
    uses: [
      { label: 'Cảm thán', ex: 'What a beautiful day!' },
      { label: 'Cảnh báo, mệnh lệnh gấp', ex: 'Watch out!' },
      { label: 'Ngạc nhiên', ex: 'You won the lottery!' },
    ],
  },
]

const TOPICS = [
  {
    key: 'splice',
    title: 'Comma splice — lỗi “phẩy nối câu”',
    body: 'Hai mệnh đề độc lập (mỗi bên đều đứng một mình được) không được nối bằng một dấu phẩy trơn. Có 4 cách sửa:',
    lines: [
      { bad: 'I was tired, I went to bed.' },
      { good: 'I was tired. I went to bed.', note: 'tách thành hai câu' },
      { good: 'I was tired; I went to bed.', note: 'dấu chấm phẩy' },
      { good: 'I was tired, so I went to bed.', note: 'phẩy + FANBOYS' },
      { good: 'Because I was tired, I went to bed.', note: 'biến một vế thành mệnh đề phụ' },
    ],
  },
  {
    key: 'oxford',
    title: 'Oxford comma — dấu phẩy trước “and” cuối danh sách',
    body: 'Dấu phẩy trước “and/or” ở mục cuối là tùy chọn (văn Mỹ, học thuật hay dùng; báo chí Anh thường bỏ). Nó hữu ích khi tránh hiểu lầm — quan trọng nhất là dùng nhất quán.',
    lines: [
      { warn: 'I’d like to thank my parents, Ana and John.', note: 'dễ hiểu thành: bố mẹ tôi tên là Ana và John' },
      { good: 'I’d like to thank my parents, Ana, and John.', note: 'rõ ràng: ba đối tượng riêng biệt' },
    ],
  },
  {
    key: 'its',
    title: 'its vs it’s (và các cặp tương tự)',
    body: 'Đại từ sở hữu KHÔNG có dấu ’. Dấu ’ trong it’s, you’re, they’re, who’s là chữ cái bị lược bỏ.',
    lines: [
      { good: 'It’s raining.', note: 'it’s = it is / it has' },
      { good: 'The dog wagged its tail.', note: 'its = của nó' },
      { good: 'You’re late. / Your bag is here.', note: 'you are / của bạn' },
      { good: 'They’re here. / Their car is new.', note: 'they are / của họ' },
      { good: 'Who’s that? / Whose phone is this?', note: 'who is / của ai' },
    ],
  },
  {
    key: 'relative',
    title: 'Dấu phẩy với mệnh đề quan hệ',
    body: 'Mệnh đề không xác định (non-defining) chỉ thêm thông tin, bỏ đi câu vẫn rõ nghĩa → đặt giữa hai dấu phẩy. Mệnh đề xác định (defining) cho biết “người/vật nào” → không có dấu phẩy. “That” không bao giờ đứng sau dấu phẩy.',
    lines: [
      { good: 'My father, who is 60, still plays football.', note: 'tôi chỉ có một bố → thông tin thêm' },
      { good: 'The man who called you is my uncle.', note: 'xác định “người đàn ông nào”' },
      { bad: 'Hanoi, that is the capital, is busy.' },
      { good: 'Hanoi, which is the capital, is busy.', note: 'non-defining dùng which, không dùng that' },
    ],
  },
  {
    key: 'intro',
    title: 'Dấu phẩy sau phần mở đầu',
    body: 'Cụm từ, trạng từ nối hay mệnh đề phụ đứng đầu câu → thêm dấu phẩy trước mệnh đề chính. Cụm rất ngắn (2–3 từ) có thể bỏ phẩy. Nếu mệnh đề phụ đứng sau mệnh đề chính thì thường không cần phẩy.',
    lines: [
      { good: 'However, the plan failed.' },
      { good: 'When the film ended, everyone clapped.' },
      { good: 'Everyone clapped when the film ended.', note: 'mệnh đề phụ đứng sau → không phẩy' },
      { good: 'In 2020(,) we moved to Da Nang.', note: 'cụm ngắn: phẩy tùy chọn' },
    ],
  },
  {
    key: 'hyphen',
    title: 'Hyphen (-) vs en dash (–) vs em dash (—)',
    body: 'Ba “gạch” khác nhau về độ dài và chức năng. Hyphen nối từ; en dash chỉ khoảng; em dash ngắt câu. Khi gõ phím, nhiều người dùng “ - ” thay cho dash, nhưng đừng dùng dash để ghép từ.',
    lines: [
      { good: 'a part-time job', note: 'hyphen: nối từ, không cách' },
      { good: 'pages 10–25 · 2010–2020', note: 'en dash: khoảng (từ… đến…)' },
      { good: 'The answer—if there is one—is simple.', note: 'em dash: chèn / ngắt ý' },
      { good: 'The job is part time.', note: 'sau động từ thường không cần hyphen' },
    ],
  },
]

const MISTAKES = [
  { bad: 'I was tired, I went home.', good: 'I was tired, so I went home.', why: 'Comma splice: hai mệnh đề độc lập không nối bằng dấu phẩy trơn.' },
  { bad: 'Its raining again.', good: 'It’s raining again.', why: 'It’s = it is. “its” (không ’) là “của nó”.' },
  { bad: 'Apple’s for sale.', good: 'Apples for sale.', why: 'Số nhiều chỉ thêm -s, không thêm ’.' },
  { bad: 'The man in the red shirt, is my uncle.', good: 'The man in the red shirt is my uncle.', why: 'Không đặt một dấu phẩy chen giữa chủ ngữ và động từ.' },
  { bad: 'I wonder where he is?', good: 'I wonder where he is.', why: 'Câu hỏi gián tiếp là câu trần thuật → dấu chấm.' },
  { bad: 'Wait , what ? Really !', good: 'Wait, what? Really!', why: 'Tiếng Anh không có khoảng trắng trước , . ? ! : ; — chỉ cách sau dấu.' },
  { bad: 'You need: eggs, milk and flour.', good: 'You need eggs, milk and flour.', why: 'Trước dấu hai chấm phải là mệnh đề hoàn chỉnh; “You need” chưa trọn ý.' },
  { bad: 'a well known writer', good: 'a well-known writer', why: 'Tính từ ghép đứng trước danh từ cần hyphen.' },
]

/* ------------------------------------------------------------------ */
/*  Sign artwork                                                       */
/* ------------------------------------------------------------------ */

const OCT = Array.from({ length: 8 }, (_, i) => {
  const a = ((22.5 + 45 * i) * Math.PI) / 180
  return `${(32 + 30 * Math.cos(a)).toFixed(1)},${(32 + 30 * Math.sin(a)).toFixed(1)}`
}).join(' ')

const W = '#ffffff'
const RED = '#c8102e'
const BLUE = '#1f5fbf'
const BLACK = '#1a1a1a'

function SignArt({ kind }) {
  switch (kind) {
    case 'period':
      return (
        <>
          <polygon points={OCT} fill={RED} stroke={W} strokeWidth="3" />
          <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="800" fill={W} fontFamily="Arial, sans-serif">STOP</text>
        </>
      )
    case 'comma':
      return (
        <>
          <polygon points="5,9 59,9 32,57" fill={W} stroke={RED} strokeWidth="6" strokeLinejoin="round" />
          <text x="32" y="25" textAnchor="middle" fontSize="9" fontWeight="800" fill={RED} fontFamily="Arial, sans-serif">YIELD</text>
        </>
      )
    case 'semicolon':
      return (
        <>
          <circle cx="32" cy="32" r="29" fill={BLUE} stroke={W} strokeWidth="2" />
          <circle cx="32" cy="32" r="13" fill="none" stroke={W} strokeWidth="5" />
          {[0, 120, 240].map((r) => (
            <polygon key={r} points="28,12 38,19 28,26" fill={W} transform={`rotate(${r} 32 32)`} />
          ))}
        </>
      )
    case 'colon':
      return (
        <>
          <rect x="4" y="4" width="56" height="56" rx="8" fill={BLUE} stroke={W} strokeWidth="2" />
          <path d="M14 32 H44 M34 21 L46 32 L34 43" stroke={W} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )
    case 'dash':
      return (
        <>
          <rect x="12" y="12" width="40" height="40" rx="4" transform="rotate(45 32 32)" fill="#f58220" stroke={BLACK} strokeWidth="2.5" />
          <path d="M25 45 V33 Q25 27 31 27 H40 M36 22 L42 27 L36 32" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )
    case 'hyphen':
      return (
        <>
          <rect x="4" y="12" width="56" height="40" rx="6" fill="#0b6e4f" stroke={W} strokeWidth="2" />
          <rect x="11" y="26" width="19" height="12" rx="6" fill="none" stroke={W} strokeWidth="3.5" />
          <rect x="34" y="26" width="19" height="12" rx="6" fill="none" stroke={W} strokeWidth="3.5" />
          <line x1="24" y1="32" x2="40" y2="32" stroke={W} strokeWidth="3.5" strokeLinecap="round" />
        </>
      )
    case 'apostrophe':
      return (
        <>
          <rect x="12" y="12" width="40" height="40" rx="4" transform="rotate(45 32 32)" fill="#ffcd00" stroke={BLACK} strokeWidth="2.5" />
          <path d="M36 50 V17 M30 23 L36 15 L42 23" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 50 Q24 38 35 30" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )
    case 'quotes':
      return (
        <>
          <rect x="4" y="4" width="56" height="56" rx="8" fill={BLUE} stroke={W} strokeWidth="2" />
          <path d="M13 50 V34 A19 19 0 0 1 51 34 V50 Z" fill={W} />
          <path d="M22 50 V36 A10 10 0 0 1 42 36 V50 Z" fill={BLACK} />
        </>
      )
    case 'question':
      return (
        <>
          <rect x="4" y="4" width="56" height="56" rx="8" fill={BLUE} stroke={W} strokeWidth="2" />
          <circle cx="32" cy="32" r="19" fill={W} />
          <text x="32" y="42" textAnchor="middle" fontSize="28" fontWeight="900" fill={BLUE} fontFamily="Arial, sans-serif">?</text>
        </>
      )
    case 'exclamation':
      return (
        <>
          <polygon points="32,6 60,56 4,56" fill={W} stroke={RED} strokeWidth="5" strokeLinejoin="round" />
          <text x="32" y="51" textAnchor="middle" fontSize="28" fontWeight="900" fill={BLACK} fontFamily="Arial, sans-serif">!</text>
        </>
      )
    default:
      return null
  }
}

function Sign({ kind, size }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={styles.signSvg} aria-hidden="true" focusable="false">
      <SignArt kind={kind} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Highlight({ text, chars }) {
  const cls = chars.replace(/[-\\\]^]/g, '\\$&')
  const parts = text.split(new RegExp(`([${cls}])`, 'g')).filter((p) => p !== '')
  return parts.map((p, i) =>
    chars.includes(p) && p.length === 1 ? (
      <mark key={i} className={styles.paint}>{p}</mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

function GuideHead({ id, children, sub }) {
  return (
    <div className={styles.guideWrap}>
      <h2 id={id} className={styles.guide}>{children}</h2>
      {sub && <p className={styles.guideSub}>{sub}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function SignRoad() {
  const [key, setKey] = useState('comma')
  const sign = SIGNS.find((s) => s.key === key)

  return (
    <section className={styles.road} aria-labelledby="pn-road-title">
      <div className={styles.roadHead}>
        <p className={styles.roadEyebrow}>Punctuation road code</p>
        <h2 id="pn-road-title" className={styles.roadTitle}>Mỗi dấu câu là một biển báo</h2>
        <p className={styles.roadHint}>Chọn một biển để xem luật đi đường của dấu câu đó.</p>
      </div>

      <div className={styles.signRow} role="group" aria-label="Chọn dấu câu">
        {SIGNS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={styles.post}
            aria-pressed={s.key === key}
            onClick={() => setKey(s.key)}
            aria-label={`${s.name} (${s.glyph}) — ${s.metaphor}`}
          >
            <Sign kind={s.key} size={48} />
            <span className={styles.plate}>{s.glyph}</span>
            <span className={styles.postLabel}>{s.plate}</span>
          </button>
        ))}
      </div>

      <div className={styles.lane} aria-hidden="true" />

      <div className={styles.detail} aria-live="polite">
        <div className={styles.detailSign}>
          <Sign kind={sign.key} size={92} />
          <span className={styles.bigGlyph}>{sign.glyph}</span>
        </div>
        <div className={styles.detailBody}>
          <p className={styles.detailKicker}>{sign.plate} · {sign.name}</p>
          <h3 className={styles.detailTitle}>{sign.metaphor}</h3>
          <p className={styles.detailDesc}>{sign.desc}</p>
          <ul className={styles.uses}>
            {sign.uses.map((u) => (
              <li key={u.ex} className={styles.use}>
                <span className={styles.useLabel}>{u.label}</span>
                <span className={styles.useEx}><Highlight text={u.ex} chars={sign.hl} /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function TopicLine({ line }) {
  const kind = line.bad ? 'bad' : line.warn ? 'warn' : 'good'
  const icon = kind === 'bad' ? '❌' : kind === 'warn' ? '⚠️' : '✅'
  return (
    <li className={`${styles.tLine} ${styles[`t_${kind}`]}`}>
      <span aria-hidden="true">{icon}</span>
      <span className={styles.tText}>{line.bad || line.warn || line.good}</span>
      {line.note && <span className={styles.tNote}>{line.note}</span>}
    </li>
  )
}

function Topics() {
  const items = TOPICS.map((t) => ({
    key: t.key,
    label: <span className={styles.topicLabel}>{t.title}</span>,
    children: (
      <div className={styles.topicBody}>
        <p>{t.body}</p>
        <ul className={styles.tList}>
          {t.lines.map((l, i) => (
            <TopicLine key={i} line={l} />
          ))}
        </ul>
      </div>
    ),
  }))

  return (
    <section aria-labelledby="pn-topics-title">
      <GuideHead id="pn-topics-title" sub="Những điểm hay bị hỏi và hay viết sai nhất.">Luật đi đường chi tiết</GuideHead>
      <Collapse items={items} defaultActiveKey={['splice']} className={styles.collapse} />
    </section>
  )
}

function Mistakes() {
  return (
    <section aria-labelledby="pn-mistakes-title">
      <GuideHead id="pn-mistakes-title" sub="Vi phạm luật giao thông dấu câu thường gặp.">
        <WarningOutlined aria-hidden="true" /> Lỗi hay gặp
      </GuideHead>
      <ul className={styles.tickets}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.ticket}>
            <span className={styles.ticketTag}>Phạt</span>
            <p className={styles.tBadLine}><span aria-hidden="true">❌</span> {m.bad}</p>
            <p className={styles.tGoodLine}><span aria-hidden="true">✅</span> {m.good}</p>
            <p className={styles.tWhy}>{m.why}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Punctuation() {
  return (
    <div className={styles.page}>
      <SignRoad />
      <Topics />
      <Mistakes />
    </div>
  )
}
