import { useState } from 'react'
import { Button, Segmented, Switch } from 'antd'
import {
  ArrowRightOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  MergeCellsOutlined,
  ReloadOutlined,
  ScissorOutlined,
  UserOutlined,
} from '@ant-design/icons'
import styles from './RelativeClauses.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: [relative clause]  *relative word*  {noun}         */
/*                  ~optional word~ (shown faded)                      */
/* ------------------------------------------------------------------ */

const WORD_KEYS = ['who', 'whom', 'which', 'that', 'whose', 'where', 'when', 'why']

const ROLE = {
  who: 'who thay cho người và làm chủ ngữ (văn nói dùng cả cho tân ngữ).',
  whom: 'whom thay cho người và chỉ làm tân ngữ.',
  which: 'which thay cho vật / con vật, hoặc cả một mệnh đề phía trước (sau dấu phẩy).',
  that: 'that thay cho người hoặc vật, nhưng chỉ dùng trong mệnh đề xác định (không có dấu phẩy).',
  whose: 'whose luôn đi với một danh từ phía sau và chỉ sự sở hữu (thay cho his / her / its / their).',
  where: 'where = giới từ + which, chỉ dùng cho nơi chốn.',
  when: 'when = giới từ + which, chỉ dùng cho thời gian.',
  why: 'why = for which, chỉ dùng sau "the reason".',
}

const MERGES = [
  {
    a: { pre: '', noun: 'The woman', post: ' is a doctor.' },
    b: { pre: '', ref: 'She', post: ' lives next door.' },
    clause: 'lives next door',
    kind: 'người · chủ ngữ',
    correct: ['who', 'that'],
    note: '"She" là chủ ngữ của câu 2 và chỉ người → who (hoặc that trong mệnh đề xác định). Đại từ làm chủ ngữ không được lược bỏ.',
    wrong: { whom: 'whom chỉ làm tân ngữ, mà ở đây "she" là chủ ngữ của "lives".' },
  },
  {
    a: { pre: '', noun: 'The man', post: ' was very kind.' },
    b: { pre: 'I met ', ref: 'him', post: ' at the station.' },
    clause: 'I met at the station',
    kind: 'người · tân ngữ',
    correct: ['whom', 'who', 'that'],
    note: '"him" là tân ngữ chỉ người → whom (trang trọng), who / that (thân mật). Vì là tân ngữ nên có thể bỏ hẳn: The man I met at the station was very kind.',
    wrong: {},
  },
  {
    a: { pre: '', noun: 'The laptop', post: ' is very fast.' },
    b: { pre: 'I bought ', ref: 'it', post: ' last week.' },
    clause: 'I bought last week',
    kind: 'vật · tân ngữ',
    correct: ['which', 'that'],
    note: '"it" là tân ngữ chỉ vật → which / that. Có thể lược bỏ: The laptop I bought last week is very fast.',
    wrong: { who: 'who chỉ dùng cho người, còn laptop là đồ vật.' },
  },
  {
    a: { pre: 'I have ', noun: 'a friend', post: '.' },
    b: { pre: '', ref: 'Her', post: ' father is a pilot.' },
    clause: 'father is a pilot',
    kind: 'sở hữu',
    correct: ['whose'],
    note: '"Her father" là quan hệ sở hữu → whose + danh từ. whose dùng được cho cả người lẫn vật: a house whose roof is red.',
    wrong: {
      who: '"a friend who father is…" thiếu ý sở hữu: cần một từ thay cho "her" → whose.',
      that: 'that không mang nghĩa sở hữu; "her father" → whose father.',
    },
  },
  {
    a: { pre: 'This is ', noun: 'the village', post: '.' },
    b: { pre: 'I was born ', ref: 'there', post: '.' },
    clause: 'I was born',
    kind: 'nơi chốn',
    correct: ['where'],
    note: '"there" = in the village → where (= in which). Cách khác: the village in which I was born / the village which I was born in.',
    wrong: {
      which: 'Muốn dùng which thì phải giữ giới từ: the village in which I was born / which I was born in. Chỉ "which I was born" là thiếu "in".',
      that: 'Thiếu giới từ: phải là the village that I was born in. Gọn nhất là where.',
    },
  },
  {
    a: { pre: 'I still remember ', noun: 'the day', post: '.' },
    b: { pre: 'We first met ', ref: 'on that day', post: '.' },
    clause: 'we first met',
    kind: 'thời gian',
    correct: ['when', 'that'],
    note: '"on that day" → when (= on which). Với danh từ chỉ thời gian, văn nói cũng dùng that hoặc bỏ hẳn: the day (that) we first met.',
    wrong: { which: 'which cần giới từ đi kèm: the day on which we first met. Thay cả cụm bằng when.' },
  },
  {
    a: { pre: 'Tell me ', noun: 'the reason', post: '.' },
    b: { pre: 'You were late ', ref: 'for that reason', post: '.' },
    clause: 'you were late',
    kind: 'lý do',
    correct: ['why', 'that'],
    note: '"for that reason" → why (= for which). Văn nói cũng dùng that hoặc bỏ: the reason (that) you were late.',
    wrong: { which: 'which cần giới từ: the reason for which you were late. Gọn hơn: the reason why…' },
  },
  {
    a: { pre: '', noun: 'My father', post: ' is an engineer.' },
    b: { pre: '', ref: 'He', post: ' works for a Japanese company.' },
    clause: 'works for a Japanese company',
    kind: 'người · thông tin thêm',
    nd: true,
    correct: ['who'],
    note: 'Ai cũng chỉ có một người bố, nên mệnh đề chỉ bổ sung thông tin → mệnh đề không xác định: đặt giữa hai dấu phẩy, dùng who, không dùng that.',
    wrong: { that: 'that không bao giờ đứng sau dấu phẩy. "My father" đã rõ là ai nên đây là mệnh đề không xác định → who.' },
  },
  {
    a: { pre: '', noun: 'He passed the exam', post: '.' },
    b: { pre: '', ref: 'This', post: ' surprised everyone.' },
    clause: 'surprised everyone',
    kind: 'cả mệnh đề',
    nd: true,
    correct: ['which'],
    note: '"This" chỉ cả sự việc "He passed the exam" → dùng ", which" (luôn có dấu phẩy phía trước).',
    wrong: { that: 'that không thay cho cả mệnh đề và không đứng sau dấu phẩy → ", which".' },
  },
]

const WORDS = [
  { w: 'who', for: 'Người', role: 'Chủ ngữ (văn nói: cả tân ngữ)', ex: 'The girl [*who* sits next to me] is from Hue.' },
  { w: 'whom', for: 'Người', role: 'Tân ngữ · trang trọng', ex: 'The doctor [*whom* we consulted] was very patient.' },
  { w: 'which', for: 'Vật · con vật · cả mệnh đề', role: 'Chủ ngữ hoặc tân ngữ', ex: 'The phone [*which* I lost] was brand new.' },
  { w: 'that', for: 'Người · vật', role: 'Chỉ trong mệnh đề xác định', ex: 'It’s the best film [*that* I have ever seen].' },
  { w: 'whose', for: 'Sở hữu (người, vật)', role: 'whose + danh từ', ex: 'I met a man [*whose* car had broken down].' },
  { w: 'where', for: 'Nơi chốn', role: '= in / at / on + which', ex: 'That’s the café [*where* we first met].' },
  { w: 'when', for: 'Thời gian', role: '= in / on / at + which', ex: '2020 was the year [*when* everything changed].' },
  { w: 'why', for: 'Lý do', role: '= for which (sau the reason)', ex: 'That’s the reason [*why* I called you].' },
]

const KINDS = [
  {
    key: 'def',
    title: 'Defining · Xác định',
    points: [
      'Không có dấu phẩy.',
      'Cần thiết để biết đang nói tới ai / cái nào: bỏ đi thì câu mất nghĩa.',
      'Dùng được that.',
      'Được lược bỏ đại từ khi nó làm tân ngữ.',
    ],
    examples: [
      'The students [*who* passed the test] will get a certificate.',
      'The cake [~that~ you made] was delicious.',
    ],
  },
  {
    key: 'nondef',
    title: 'Non-defining · Không xác định',
    points: [
      'Đặt giữa / sau dấu phẩy.',
      'Chỉ là thông tin thêm: bỏ đi câu vẫn đủ nghĩa.',
      'Không dùng that.',
      'Không được lược bỏ đại từ quan hệ.',
    ],
    examples: [
      'My sister, [*who* lives in Hue], is a nurse.',
      'Da Lat, [*which* I visited last year], is famous for flowers.',
      'She didn’t call me back, [*which* made me angry].',
    ],
  },
]

const OMIT = [
  { en: 'The book [~that~ you lent me] is great.', ok: true, vi: '"that" là tân ngữ của "lent" → bỏ được.' },
  { en: 'The people [~who~ we met in Hoi An] were friendly.', ok: true, vi: '"who" là tân ngữ của "met" → bỏ được.' },
  { en: 'The woman [*who* called you] didn’t leave her name.', ok: false, vi: '"who" là chủ ngữ của "called" → không bỏ được.' },
]

const PREP_LADDER = [
  { en: 'the man [to *whom* I spoke]', tag: 'Trang trọng nhất', vi: 'Giới từ đứng trước whom / which.' },
  { en: 'the man [*whom* / *who* I spoke to]', tag: 'Trung tính', vi: 'Giới từ chuyển xuống cuối mệnh đề.' },
  { en: 'the man [*that* I spoke to]', tag: 'Thân mật', vi: 'that không bao giờ đứng sau giới từ.' },
  { en: 'the man [I spoke to]', tag: 'Văn nói', vi: 'Lược bỏ đại từ tân ngữ, giữ giới từ ở cuối.' },
]

const PLACE_TIME = [
  { a: 'the house [*where* I grew up]', b: 'the house [in *which* I grew up]' },
  { a: 'the year [*when* we moved]', b: 'the year [in *which* we moved]' },
  { a: 'the reason [*why* she left]', b: 'the reason [for *which* she left]' },
]

const REDUCTIONS = [
  {
    key: 'ving',
    label: 'V-ing',
    title: 'Chủ động → V-ing',
    rule: 'Khi động từ trong mệnh đề ở thể chủ động: bỏ đại từ quan hệ (và "be" nếu có), đổi động từ chính sang V-ing.',
    formula: 'N + who / which (+ be) + V… → N + V-ing…',
    examples: [
      [{ t: 'The man ' }, { del: 'who is ' }, { t: 'standing', hi: true }, { t: ' at the door is my uncle.' }],
      [{ t: 'Students ' }, { del: 'who want', ins: 'wanting' }, { t: ' to join the club should sign up here.' }],
      [{ t: 'There is a path ' }, { del: 'that leads', ins: 'leading' }, { t: ' to the beach.' }],
    ],
  },
  {
    key: 'v3',
    label: 'V3',
    title: 'Bị động → V3 / V-ed',
    rule: 'Khi mệnh đề ở thể bị động: bỏ đại từ quan hệ + "be", chỉ giữ lại quá khứ phân từ (V3 / V-ed).',
    formula: 'N + which / who + be + V3… → N + V3…',
    examples: [
      [{ t: 'The book ' }, { del: 'which was ' }, { t: 'written', hi: true }, { t: ' by Nam Cao is still popular.' }],
      [{ t: 'Most of the goods ' }, { del: 'that are ' }, { t: 'made', hi: true }, { t: ' in this factory are exported.' }],
      [{ t: 'The bridge, ' }, { del: 'which was ' }, { t: 'built', hi: true }, { t: ' in 1902, is still in use.' }],
    ],
  },
  {
    key: 'tov',
    label: 'to-V',
    title: 'the first / last / only / so sánh nhất → to-V',
    rule: 'Sau the first, the second, the last, the only, the next và so sánh nhất: rút gọn thành to-V (chủ động) hoặc to be + V3 (bị động).',
    formula: 'the first / only / -est + N + who / that + V → … + to V',
    examples: [
      [{ t: 'Neil Armstrong was the first man ' }, { del: 'who walked', ins: 'to walk' }, { t: ' on the moon.' }],
      [{ t: 'She was the last person ' }, { del: 'who left', ins: 'to leave' }, { t: ' the office.' }],
      [{ t: 'He is the youngest player ' }, { del: 'who has ever won', ins: 'ever to win' }, { t: ' the title.' }],
      [{ t: 'This is the first bridge ' }, { del: 'that was built', ins: 'to be built' }, { t: ' in the area.' }],
    ],
  },
  {
    key: 'adj',
    label: 'Tính từ · danh từ',
    title: 'Cụm tính từ / cụm danh từ (appositive)',
    rule: 'Khi sau "which / who + be" là một cụm tính từ hoặc cụm danh từ: bỏ luôn đại từ + be. Cụm danh từ đứng sau dấu phẩy để giải thích gọi là đồng vị ngữ (appositive).',
    formula: 'N, which / who + be + cụm N / Adj → N, cụm N / Adj',
    examples: [
      [{ t: 'There was a basket ' }, { del: 'which was ' }, { t: 'full of apples', hi: true }, { t: ' on the table.' }],
      [{ t: 'Anyone ' }, { del: 'who is ' }, { t: 'interested in the course', hi: true }, { t: ' should email me.' }],
      [{ t: 'Hanoi, ' }, { del: 'which is ' }, { t: 'the capital of Vietnam', hi: true }, { t: ', has a long history.' }],
      [{ t: 'Mr Lam, ' }, { del: 'who is ' }, { t: 'our new manager', hi: true }, { t: ', starts on Monday.' }],
    ],
  },
]

const MISTAKES = [
  {
    bad: 'The man who I met him yesterday is a teacher.',
    good: 'The man who I met yesterday is a teacher.',
    vi: 'Đại từ quan hệ đã thay cho "him", không lặp lại đại từ nữa.',
  },
  {
    bad: 'My mother, that is a teacher, loves cooking.',
    good: 'My mother, who is a teacher, loves cooking.',
    vi: 'Mệnh đề không xác định (có dấu phẩy) không dùng that.',
  },
  {
    bad: 'The person to who I spoke was helpful.',
    good: 'The person to whom I spoke was helpful.',
    vi: 'Ngay sau giới từ chỉ dùng whom (người) hoặc which (vật).',
  },
  {
    bad: 'This is the house where I lived in.',
    good: 'This is the house where I lived. / …which I lived in.',
    vi: 'where đã bao hàm giới từ (= in which), không thêm "in" nữa.',
  },
  {
    bad: 'He failed the test, that upset his parents.',
    good: 'He failed the test, which upset his parents.',
    vi: 'Thay cho cả mệnh đề phía trước chỉ dùng ", which".',
  },
  {
    bad: 'The girl lives next door is my classmate.',
    good: 'The girl who lives next door / The girl living next door…',
    vi: 'Không bỏ đại từ làm chủ ngữ. Muốn gọn thì rút gọn đúng cách thành V-ing.',
  },
  {
    bad: 'I know a boy who his father is a pilot.',
    good: 'I know a boy whose father is a pilot.',
    vi: 'Sở hữu → whose + danh từ, không dùng "who his".',
  },
  {
    bad: 'She was the first person arriving at the party.',
    good: 'She was the first person to arrive at the party.',
    vi: 'Sau the first / the last / the only rút gọn bằng to-V, không dùng V-ing.',
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Inner({ text }) {
  return text
    .split(/(\*[^*]+\*|~[^~]+~)/g)
    .filter(Boolean)
    .map((p, i) => {
      if (p.startsWith('*')) return <strong key={i} className={styles.relWord}>{p.slice(1, -1)}</strong>
      if (p.startsWith('~')) return <span key={i} className={styles.optional}>({p.slice(1, -1)})</span>
      return <span key={i}>{p}</span>
    })
}

function Rich({ text }) {
  return text
    .split(/(\[[^\]]+\]|\{[^}]+\})/g)
    .filter(Boolean)
    .map((p, i) => {
      if (p.startsWith('[')) return <mark key={i} className={styles.clauseMark}><Inner text={p.slice(1, -1)} /></mark>
      if (p.startsWith('{')) return <mark key={i} className={styles.nounMark}>{p.slice(1, -1)}</mark>
      return <Inner key={i} text={p} />
    })
}

function SectionHead({ icon, title, sub, id }) {
  return (
    <div className={styles.sectionHead}>
      <span className={styles.sectionIcon} aria-hidden="true">{icon}</span>
      <div>
        <h2 id={id} className={styles.sectionTitle}>{title}</h2>
        {sub && <p className={styles.sectionSub}>{sub}</p>}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Signature: sentence merger                                         */
/* ------------------------------------------------------------------ */

function MergedSentence({ m, word }) {
  const commaAfter = m.nd && m.a.post.trim() !== '.'
  return (
    <>
      {m.a.pre}
      <mark className={styles.nounMark}>{m.a.noun}</mark>
      {m.nd ? ',' : ''}{' '}
      <span className={styles.zip}>
        <strong className={styles.relWord}>{word}</strong> {m.clause}
      </span>
      {commaAfter ? ',' : ''}
      {m.a.post}
    </>
  )
}

function Merger() {
  const [idx, setIdx] = useState(0)
  const [tried, setTried] = useState([])
  const [picked, setPicked] = useState(null)
  const [shake, setShake] = useState(0)
  const [solved, setSolved] = useState([])
  const m = MERGES[idx]
  const lastWrong = tried[tried.length - 1]

  const go = (i) => {
    setIdx(i)
    setTried([])
    setPicked(null)
    setShake(0)
  }

  const choose = (w) => {
    if (picked) return
    if (m.correct.includes(w)) {
      setPicked(w)
      setSolved((s) => (s.includes(idx) ? s : [...s, idx]))
    } else {
      setTried((t) => [...t.filter((x) => x !== w), w])
      setShake((k) => k + 1)
    }
  }

  const others = picked ? m.correct.filter((w) => w !== picked) : []
  const isLast = idx === MERGES.length - 1

  return (
    <section className={styles.bench} aria-labelledby="rel-merger-title">
      <div className={styles.benchHead}>
        <div>
          <span className={styles.eyebrow}>
            <MergeCellsOutlined aria-hidden="true" /> Sentence merger
          </span>
          <h2 id="rel-merger-title" className={styles.benchTitle}>Ghép hai câu thành một</h2>
          <p className={styles.benchHint}>
            Hai câu cùng nói về <mark className={styles.nounMark}>một đối tượng</mark>. Chọn từ quan hệ thay cho{' '}
            <mark className={styles.refMark}>từ lặp lại</mark> ở câu 2 để “khâu” chúng lại.
          </p>
        </div>
        <span className={styles.counter}>
          {solved.length}/{MERGES.length} đã ghép
        </span>
      </div>

      <div className={styles.pairNav} role="group" aria-label="Chọn cặp câu">
        {MERGES.map((item, i) => (
          <button
            key={i}
            type="button"
            className={styles.pairBtn}
            aria-pressed={i === idx}
            aria-label={`Cặp câu ${i + 1}: ${item.kind}${solved.includes(i) ? ' (đã ghép)' : ''}`}
            data-done={solved.includes(i) ? 'y' : undefined}
            onClick={() => go(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className={styles.stage}>
        {!picked ? (
          <div key={`s${idx}-${shake}`} className={`${styles.strips} ${shake > 0 ? styles.shake : ''}`}>
            <div className={`${styles.strip} ${styles.stripA}`}>
              <span className={styles.stripTag}>Câu 1</span>
              <p className={styles.stripText}>
                {m.a.pre}
                <mark className={styles.nounMark}>{m.a.noun}</mark>
                {m.a.post}
              </p>
            </div>
            <div className={styles.link} aria-hidden="true">
              <span className={styles.linkLine} />
              <span className={styles.linkTag}>{m.kind}</span>
              <span className={styles.linkLine} />
            </div>
            <div className={`${styles.strip} ${styles.stripB}`}>
              <span className={styles.stripTag}>Câu 2</span>
              <p className={styles.stripText}>
                {m.b.pre}
                <mark className={styles.refMark}>{m.b.ref}</mark>
                {m.b.post}
              </p>
            </div>
          </div>
        ) : (
          <div key={`m${idx}`} className={styles.mergedWrap}>
            <div className={`${styles.strip} ${styles.stripMerged}`}>
              <span className={styles.stripTag}>Câu ghép</span>
              <p className={styles.stripText}>
                <MergedSentence m={m} word={picked} />
              </p>
            </div>
            <p className={styles.replaced}>
              <mark className={styles.refMark}>{m.b.ref}</mark>
              <ArrowRightOutlined aria-hidden="true" />
              <strong className={styles.relWord}>{picked}</strong>
              {m.nd && <span className={styles.ndTag}>có dấu phẩy · non-defining</span>}
            </p>
          </div>
        )}
      </div>

      <div className={styles.wordRow} role="group" aria-label="Chọn từ quan hệ">
        {WORD_KEYS.map((w) => {
          let state
          if (picked === w) state = 'right'
          else if (picked && m.correct.includes(w)) state = 'also'
          else if (tried.includes(w)) state = 'wrong'
          return (
            <button
              key={w}
              type="button"
              className={styles.wordBtn}
              data-state={state}
              onClick={() => choose(w)}
              aria-disabled={picked ? true : undefined}
            >
              {w}
            </button>
          )
        })}
      </div>

      <div className={styles.verdict} aria-live="polite">
        {picked ? (
          <div className={styles.verdictOk}>
            <p className={styles.verdictLine}>
              <CheckCircleFilled aria-hidden="true" /> <strong>Ghép được rồi!</strong>
            </p>
            <p className={styles.verdictText}>{m.note}</p>
            {others.length > 0 && (
              <p className={styles.verdictAlso}>
                Cũng đúng: {others.map((w) => <code key={w}>{w}</code>)}
              </p>
            )}
            <Button
              type="primary"
              className={styles.benchBtn}
              icon={isLast ? <ReloadOutlined /> : <ArrowRightOutlined />}
              iconPlacement="end"
              onClick={() => go(isLast ? 0 : idx + 1)}
            >
              {isLast ? 'Quay lại cặp đầu' : 'Cặp tiếp theo'}
            </Button>
          </div>
        ) : lastWrong ? (
          <div className={styles.verdictBad}>
            <p className={styles.verdictLine}>
              <CloseCircleFilled aria-hidden="true" /> <strong>“{lastWrong}” chưa khớp</strong>
            </p>
            <p className={styles.verdictText}>
              {m.wrong[lastWrong] || `${ROLE[lastWrong]} Từ cần thay ở đây là "${m.b.ref}" (${m.kind}).`}
            </p>
          </div>
        ) : (
          <p className={styles.verdictIdle}>
            Từ cần thay: <mark className={styles.refMark}>{m.b.ref}</mark> · loại: {m.kind}
          </p>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function WordCards() {
  return (
    <section className={styles.panel} aria-labelledby="rel-words-title">
      <SectionHead
        id="rel-words-title"
        icon="who?"
        title="Tám từ nối của mệnh đề quan hệ"
        sub="Mệnh đề quan hệ đứng ngay sau danh từ để nói rõ hơn về danh từ đó."
      />
      <ul className={styles.wordCards}>
        {WORDS.map((item) => (
          <li key={item.w} className={styles.wordCard}>
            <div className={styles.wordCardTop}>
              <span className={styles.wordCardWord}>{item.w}</span>
              <span className={styles.wordCardFor}>{item.for}</span>
            </div>
            <p className={styles.wordCardRole}>{item.role}</p>
            <p className={styles.wordCardEx}><Rich text={item.ex} /></p>
          </li>
        ))}
      </ul>
      <aside className={styles.callout}>
        <BulbOutlined className={styles.calloutIcon} aria-hidden="true" />
        <p>
          <strong>Ưu tiên that</strong> sau so sánh nhất, the only, the first, all, everything, nothing, something và khi
          danh từ gồm cả người lẫn vật: <em>Everything that he said was true.</em>{' '}
          <em>The people and animals that I saw…</em>
        </p>
      </aside>
    </section>
  )
}

function CommaSwitch() {
  const [commas, setCommas] = useState(false)
  return (
    <div className={styles.commaBox}>
      <div className={styles.commaTop}>
        <span className={styles.commaLabel} id="rel-comma-label">Thêm dấu phẩy</span>
        <Switch checked={commas} onChange={setCommas} aria-labelledby="rel-comma-label" />
      </div>
      <p className={styles.commaSentence}>
        <mark className={styles.nounMark}>My brother</mark>
        {commas && <span className={styles.commaPop}>,</span>}{' '}
        <mark className={styles.clauseMark}><strong className={styles.relWord}>who</strong> lives in Canada</mark>
        {commas && <span className={styles.commaPop}>,</span>} is a chef.
      </p>
      <div className={styles.brothers} aria-hidden="true">
        {(commas ? [true] : [false, true, false]).map((on, i) => (
          <span key={`${commas}-${i}`} className={styles.brother} data-on={on ? 'y' : undefined}>
            <UserOutlined />
            {on && <small>Canada</small>}
          </span>
        ))}
      </div>
      <p className={styles.commaMeaning} aria-live="polite">
        {commas
          ? 'Tôi chỉ có một anh trai. "who lives in Canada" chỉ là thông tin thêm → non-defining.'
          : 'Tôi có nhiều anh trai. Mệnh đề giúp xác định đó là người anh sống ở Canada → defining.'}
      </p>
    </div>
  )
}

function DefiningSection() {
  return (
    <section className={styles.panel} aria-labelledby="rel-def-title">
      <SectionHead
        id="rel-def-title"
        icon=", ,"
        title="Xác định hay không xác định?"
        sub="Chỉ một cặp dấu phẩy cũng làm đổi nghĩa cả câu."
      />
      <div className={styles.kinds}>
        {KINDS.map((k) => (
          <article key={k.key} className={styles.kind} data-kind={k.key}>
            <h3 className={styles.kindTitle}>{k.title}</h3>
            <ul className={styles.kindPoints}>
              {k.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <ul className={styles.exList}>
              {k.examples.map((ex) => <li key={ex}><Rich text={ex} /></li>)}
            </ul>
          </article>
        ))}
      </div>
      <CommaSwitch />
      <p className={styles.note}>
        <strong>which thay cho cả mệnh đề:</strong> luôn đứng sau dấu phẩy và nói về toàn bộ sự việc phía trước:{' '}
        <em>It rained all weekend, which ruined our plans.</em>
      </p>
    </section>
  )
}

function OmitSection() {
  return (
    <section className={styles.panel} aria-labelledby="rel-omit-title">
      <SectionHead
        id="rel-omit-title"
        icon="( )"
        title="Lược bỏ đại từ · giới từ + whom / which"
        sub="Chỉ bỏ được đại từ làm tân ngữ, và chỉ trong mệnh đề xác định."
      />
      <ul className={styles.omitList}>
        {OMIT.map((o) => (
          <li key={o.en} className={styles.omitItem} data-ok={o.ok ? 'y' : 'n'}>
            <span className={styles.omitIcon} aria-label={o.ok ? 'Bỏ được' : 'Không bỏ được'}>
              {o.ok ? <CheckCircleFilled /> : <CloseCircleFilled />}
            </span>
            <div>
              <p className={styles.omitEn}><Rich text={o.en} /></p>
              <p className={styles.omitVi}>{o.vi}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3 className={styles.subTitle}>Giới từ đi đâu? Từ trang trọng tới thân mật</h3>
      <ol className={styles.ladder}>
        {PREP_LADDER.map((p, i) => (
          <li key={p.en} className={styles.rung} style={{ '--step': i }}>
            <span className={styles.rungTag}>{p.tag}</span>
            <span className={styles.rungEn}><Rich text={p.en} /></span>
            <span className={styles.rungVi}>{p.vi}</span>
          </li>
        ))}
      </ol>
      <p className={styles.note}>
        ❌ <em>the man to who I spoke</em> · ❌ <em>the man to that I spoke</em>. Với cụm động từ (look after, give up…)
        không tách giới từ: <em>the child whom she looks after</em>, không nói <em>after whom she looks</em>.
      </p>

      <h3 className={styles.subTitle}>where / when / why = giới từ + which</h3>
      <ul className={styles.equalList}>
        {PLACE_TIME.map((p) => (
          <li key={p.a} className={styles.equalItem}>
            <span><Rich text={p.a} /></span>
            <span className={styles.equalSign} aria-label="bằng">=</span>
            <span><Rich text={p.b} /></span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Reduction                                                          */
/* ------------------------------------------------------------------ */

function ReductionLine({ segs, on }) {
  return segs.map((s, i) => {
    if (s.del !== undefined) {
      return (
        <span key={i}>
          <span className={on ? `${styles.cut} ${styles.cutOn}` : styles.cut}>{s.del}</span>
          {on && s.ins && (
            <>
              {' '}
              <span className={styles.grow}>{s.ins}</span>
            </>
          )}
        </span>
      )
    }
    return (
      <span key={i} className={on && s.hi ? styles.keep : undefined}>
        {s.t}
      </span>
    )
  })
}

function resultText(segs) {
  return segs.map((s) => (s.del !== undefined ? s.ins || '' : s.t)).join('')
}

function Reduction() {
  const [type, setType] = useState(REDUCTIONS[0].key)
  const [on, setOn] = useState(false)
  const r = REDUCTIONS.find((x) => x.key === type)

  return (
    <section className={`${styles.panel} ${styles.reducePanel}`} aria-labelledby="rel-reduce-title">
      <SectionHead
        id="rel-reduce-title"
        icon={<ScissorOutlined />}
        title="Rút gọn mệnh đề quan hệ"
        sub="Cắt bỏ đại từ quan hệ (+ be) để câu gọn hơn. Bấm “Cắt” để xem từng bước."
      />
      <div className={styles.reduceControls}>
        <Segmented
          options={REDUCTIONS.map((x) => ({ value: x.key, label: x.label }))}
          value={type}
          onChange={(v) => {
            setType(v)
            setOn(false)
          }}
          className={styles.reduceSeg}
          aria-label="Chọn kiểu rút gọn"
        />
        <Button
          type={on ? 'default' : 'primary'}
          icon={on ? <ReloadOutlined /> : <ScissorOutlined />}
          onClick={() => setOn((v) => !v)}
          aria-pressed={on}
          className={styles.cutBtn}
        >
          {on ? 'Câu đầy đủ' : 'Cắt'}
        </Button>
      </div>

      <div className={styles.reduceRule}>
        <h3 className={styles.reduceTitle}>{r.title}</h3>
        <p>{r.rule}</p>
        <code className={styles.formula}>{r.formula}</code>
      </div>

      <ul className={styles.reduceList}>
        {r.examples.map((segs, i) => (
          <li key={`${type}-${i}`} className={styles.reduceItem}>
            <p className={styles.reduceLine}>
              <ReductionLine segs={segs} on={on} />
            </p>
            {on && (
              <p className={styles.reduceResult}>
                <CheckCircleFilled aria-hidden="true" /> {resultText(segs)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Mistakes + practice                                                */
/* ------------------------------------------------------------------ */

function Mistakes() {
  return (
    <section className={styles.panel} aria-labelledby="rel-mistakes-title">
      <SectionHead id="rel-mistakes-title" icon="✗✓" title="Lỗi hay gặp" sub="Những câu người học Việt Nam hay viết sai." />
      <ul className={styles.mistakes}>
        {MISTAKES.map((mk) => (
          <li key={mk.bad} className={styles.mistake}>
            <p className={styles.bad}><span aria-hidden="true">❌</span> {mk.bad}</p>
            <p className={styles.good}><span aria-hidden="true">✅</span> {mk.good}</p>
            <p className={styles.why}>{mk.vi}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RelativeClauses() {
  return (
    <div className={styles.page}>
      <Merger />
      <WordCards />
      <DefiningSection />
      <OmitSection />
      <Reduction />
      <Mistakes />
    </div>
  )
}
