import { useLayoutEffect, useRef, useState } from 'react'
import { Tabs } from 'antd'
import { Link } from 'react-router-dom'
import {
  BulbOutlined,
  LinkOutlined,
  StopOutlined,
  ToolOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './Emphasis.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Sentence markup: [focused part] is lit by the spotlight.           */
/* ------------------------------------------------------------------ */

const INVERSION_HREF = '/english/inversion'

const BASE_SENTENCE = 'Mai bought the red car in Tokyo last year.'

const PARTS = [
  { key: 'subject', text: 'Mai', role: 'Chủ ngữ', q: 'Ai?' },
  { key: 'verb', text: 'bought', role: 'Hành động', q: 'Làm gì?' },
  { key: 'object', text: 'the red car', role: 'Tân ngữ', q: 'Cái gì?' },
  { key: 'place', text: 'in Tokyo', role: 'Nơi chốn', q: 'Ở đâu?' },
  { key: 'time', text: 'last year', role: 'Thời gian', q: 'Khi nào?' },
]

const SCENES = {
  subject: {
    question: 'Who bought the red car in Tokyo last year?',
    vi: 'Chính Mai (chứ không phải ai khác) đã mua chiếc xe màu đỏ ở Tokyo năm ngoái.',
    lines: [
      { kind: 'Nhấn giọng', sub: 'văn nói', formula: 'Nhấn trọng âm vào phần cần làm nổi bật', en: '[MAI] bought the red car in Tokyo last year.' },
      { kind: 'It-cleft', sub: 'câu chẻ với It', formula: 'It + was + người + who / that + V…', en: 'It was [Mai] who bought the red car in Tokyo last year.' },
      { kind: 'Wh-cleft', sub: 'câu chẻ với Wh-', formula: 'The person who + V… + was + người', en: 'The person who bought the red car in Tokyo last year was [Mai].' },
    ],
    note: 'Tiêu điểm là người → dùng who (hoặc that), không dùng which. Wh-cleft về người dùng "The person who / The one who" thay cho "What".',
  },
  verb: {
    question: 'What did Mai do in Tokyo last year?',
    vi: 'Việc Mai đã làm ở Tokyo năm ngoái là MUA chiếc xe đỏ (chứ không phải thuê hay mượn).',
    lines: [
      { kind: 'do / does / did', sub: 'trợ động từ nhấn mạnh', formula: 'S + did + V nguyên mẫu', en: 'Mai [did buy] the red car in Tokyo last year.' },
      { kind: 'It-cleft', sub: 'không dùng được', blocked: true, formula: 'Không dùng it-cleft để nhấn động từ', en: 'It was bought that Mai the red car…' },
      { kind: 'Wh-cleft', sub: 'What … did was', formula: 'What + S + did + was + (to) V…', en: 'What Mai did in Tokyo last year was [buy the red car].' },
    ],
    note: 'Muốn nhấn mạnh HÀNH ĐỘNG thì dùng "do/does/did + V" hoặc "What + S + did + was + V". It-cleft chỉ dùng cho danh từ, đại từ, cụm trạng ngữ — không dùng cho động từ.',
  },
  object: {
    question: 'What did Mai buy in Tokyo last year?',
    vi: 'Thứ Mai mua ở Tokyo năm ngoái chính là chiếc xe màu đỏ (chứ không phải cái khác).',
    lines: [
      { kind: 'Nhấn giọng', sub: 'văn nói', formula: 'Nhấn trọng âm vào tân ngữ', en: 'Mai bought [the RED CAR] in Tokyo last year.' },
      { kind: 'It-cleft', sub: 'câu chẻ với It', formula: 'It + was + vật + that + S + V…', en: 'It was [the red car] that Mai bought in Tokyo last year.' },
      { kind: 'Wh-cleft', sub: 'câu chẻ với What', formula: 'What + S + V… + was + vật', en: 'What Mai bought in Tokyo last year was [the red car].' },
    ],
    note: 'Tiêu điểm là vật → dùng that (which ít gặp hơn). Wh-cleft với "What" là cách tự nhiên nhất để nhấn tân ngữ chỉ vật.',
  },
  place: {
    question: 'Where did Mai buy the red car last year?',
    vi: 'Chính ở Tokyo (chứ không phải Osaka) Mai đã mua chiếc xe đỏ năm ngoái.',
    lines: [
      { kind: 'Nhấn giọng', sub: 'văn nói', formula: 'Nhấn trọng âm vào nơi chốn', en: 'Mai bought the red car [in TOKYO] last year.' },
      { kind: 'It-cleft', sub: 'câu chẻ với It', formula: 'It + was + giới từ + nơi chốn + that + mệnh đề', en: 'It was [in Tokyo] that Mai bought the red car last year.' },
      { kind: 'Wh-cleft', sub: 'đảo: N + was + where', formula: 'Nơi chốn + was + where + mệnh đề', en: '[Tokyo] was where Mai bought the red car last year.' },
    ],
    note: 'It-cleft giữ nguyên giới từ "in" và dùng THAT (không dùng where). Wh-cleft mới dùng where: Tokyo was where… / The place where she bought it was Tokyo.',
  },
  time: {
    question: 'When did Mai buy the red car in Tokyo?',
    vi: 'Chính năm ngoái (chứ không phải năm nay) Mai đã mua chiếc xe đỏ ở Tokyo.',
    lines: [
      { kind: 'Nhấn giọng', sub: 'văn nói', formula: 'Nhấn trọng âm vào thời gian', en: 'Mai bought the red car in Tokyo [LAST YEAR].' },
      { kind: 'It-cleft', sub: 'câu chẻ với It', formula: 'It + was + thời gian + that + mệnh đề', en: 'It was [last year] that Mai bought the red car in Tokyo.' },
      { kind: 'Wh-cleft', sub: 'đảo: N + was + when', formula: 'Thời gian + was + when + mệnh đề', en: '[Last year] was when Mai bought the red car in Tokyo.' },
    ],
    note: 'Biến thể rất hay gặp: It was not until last year that Mai bought a car. (Mãi đến năm ngoái Mai mới mua xe.)',
  },
}

const CLEFT_COMPARE = [
  {
    name: 'It-cleft',
    formula: 'It + is / was + [tiêu điểm] + who / that + phần còn lại',
    where: 'Tiêu điểm đứng ngay sau "It is / It was".',
    use: 'Dùng khi sửa thông tin sai hoặc đối chiếu: "It was Mai, not Lan, who bought it."',
    example: 'It was [the red car] that she wanted, not the blue one.',
    tip: '"be" chia theo thì của câu gốc (It is / It was), luôn ở số ít — kể cả khi tiêu điểm số nhiều: It was the students who complained.',
  },
  {
    name: 'Wh-cleft',
    formula: 'What + S + V + is / was + [tiêu điểm]',
    where: 'Tiêu điểm dồn về CUỐI câu — vị trí của thông tin mới.',
    use: 'Dùng để dẫn dắt, tạo chút hồi hộp trước khi đưa ra điều quan trọng: "What I need is a long holiday."',
    example: 'What I really need is [a long holiday].',
    tip: 'Có thể đảo lại: A long holiday is what I really need. Với người/nơi/thời gian dùng The person who / The place where / The time when.',
  },
]

const TOOLKIT = [
  {
    key: 'do',
    label: 'do / does / did',
    title: 'Trợ động từ nhấn mạnh',
    formula: 'S + do / does / did + V nguyên mẫu',
    use: 'Dùng để khẳng định mạnh, phản bác ý kiến trái ngược hoặc thể hiện cảm xúc. Khi nói, nhấn giọng vào do/does/did.',
    examples: [
      { en: 'I [do] like your new haircut — honestly!', vi: 'Mình thật sự thích kiểu tóc mới của bạn mà!' },
      { en: 'She [does] know the answer; she’s just shy.', vi: 'Cô ấy biết đáp án thật đấy, chỉ là ngại thôi.' },
      { en: 'We [did] lock the door. I checked twice.', vi: 'Chúng tôi đã khóa cửa rồi mà. Tôi kiểm tra hai lần.' },
      { en: '[Do] sit down and make yourself at home.', vi: 'Mời bạn ngồi, cứ tự nhiên như ở nhà. (mời lịch sự)' },
    ],
    tip: 'Sau do/does/did động từ luôn ở nguyên mẫu: She does know (không phải does knows). Không dùng cách này với be hay modal — khi đó nhấn giọng vào chính be/modal: I AM listening!',
  },
  {
    key: 'fronting',
    label: 'Fronting',
    title: 'Đưa thành phần lên đầu câu',
    formula: 'Tân ngữ / tính từ / cụm từ + S + V…',
    use: 'Đưa một thành phần lên đầu để tạo đối chiếu hoặc nối với ý vừa nói. Mang màu sắc văn chương hoặc rất khẩu ngữ.',
    examples: [
      { en: '[That film] I will never forget.', vi: 'Bộ phim đó thì tôi sẽ không bao giờ quên.' },
      { en: '[Strange] as it may seem, I enjoyed the exam.', vi: 'Nghe thì lạ, nhưng tôi thấy kỳ thi thú vị.' },
      { en: 'He said he would win, and [win] he did.', vi: 'Anh ấy nói sẽ thắng, và anh ấy đã thắng thật.' },
      { en: '[Coffee] I can live without; [tea], never.', vi: 'Cà phê thì tôi bỏ được; còn trà thì không đời nào.' },
    ],
    tip: 'Fronting không làm đổi trật tự S + V phía sau (khác với đảo ngữ). Mẫu "Adj + as + S + V" nghĩa là "dù… đến đâu".',
  },
  {
    key: 'openers',
    label: 'The thing is…',
    title: 'Cụm mở đầu để dồn trọng tâm',
    formula: 'The thing / problem / point is (that)… · All + S + V + is… · The reason why… is that…',
    use: 'Các cụm này "dọn đường" để thông tin quan trọng xuất hiện cuối câu — rất tự nhiên trong hội thoại và thuyết trình.',
    examples: [
      { en: 'The thing is, [I don’t have enough time].', vi: 'Vấn đề là tôi không có đủ thời gian.' },
      { en: 'All I want is [a quiet weekend].', vi: 'Tất cả những gì tôi muốn là một cuối tuần yên tĩnh.' },
      { en: 'The reason why she left is that [she got a better offer].', vi: 'Lý do cô ấy nghỉ là vì cô ấy nhận được lời mời tốt hơn.' },
      { en: 'The last thing I need is [another meeting].', vi: 'Điều tôi ít cần nhất lúc này là thêm một cuộc họp.' },
    ],
    tip: '"All I want is…" (không viết All what I want). "The reason why… is that…" chuẩn hơn "is because…" trong văn viết trang trọng.',
  },
  {
    key: 'reflexive',
    label: 'myself · itself',
    title: 'Đại từ phản thân nhấn mạnh',
    formula: 'S + V… + myself / yourself / himself… · S + himself / herself + V…',
    use: 'Nhấn mạnh "chính người đó / tự tay" làm, không phải ai khác. Đặt ngay sau chủ ngữ hoặc cuối câu.',
    examples: [
      { en: 'I fixed the bike [myself].', vi: 'Tôi tự tay sửa chiếc xe đạp.' },
      { en: 'The CEO [herself] answered my email.', vi: 'Chính bà giám đốc đã trả lời email của tôi.' },
      { en: 'The house [itself] is small, but the garden is huge.', vi: 'Bản thân ngôi nhà thì nhỏ, nhưng khu vườn rất rộng.' },
    ],
    tip: 'Phân biệt: "I did it myself" = chính tôi làm; "I did it by myself" = tôi làm một mình (không ai giúp). Đại từ phản thân nhấn mạnh có thể bỏ đi mà câu vẫn đúng ngữ pháp.',
  },
  {
    key: 'intensifiers',
    label: 'the very · at all',
    title: 'Từ tăng cường',
    formula: 'the very + N · not … at all · no + N + whatsoever · Wh- + on earth / ever',
    use: 'Thêm một từ nhỏ để làm ý mạnh hơn: "chính là", "hoàn toàn không", "rốt cuộc"…',
    examples: [
      { en: 'This is [the very] book I was looking for.', vi: 'Đây chính là cuốn sách tôi đang tìm.' },
      { en: 'I don’t like horror films [at all].', vi: 'Tôi hoàn toàn không thích phim kinh dị.' },
      { en: 'There is no evidence [whatsoever].', vi: 'Không có bất kỳ bằng chứng nào cả.' },
      { en: 'What [on earth] are you doing?', vi: 'Bạn đang làm cái quái gì vậy?' },
      { en: 'She is [by far] the best player on the team.', vi: 'Cô ấy giỏi nhất đội, bỏ xa những người còn lại.' },
    ],
    tip: '"at all" và "whatsoever" dùng trong câu phủ định / câu hỏi. "whatsoever" đứng sau danh từ: no reason whatsoever. "the very" đứng trước danh từ: at the very end, the very first time.',
  },
  {
    key: 'inversion',
    label: 'Đảo ngữ',
    title: 'Đảo ngữ cũng là một cách nhấn mạnh',
    formula: 'Negative / limiting adverbial + trợ động từ + S + V',
    use: 'Đưa yếu tố phủ định hoặc "only…" lên đầu câu rồi đảo trợ động từ — cách nhấn mạnh trang trọng nhất, hay gặp trong văn viết.',
    examples: [
      { en: '[Never] have I seen such a beautiful city.', vi: 'Chưa bao giờ tôi thấy thành phố nào đẹp như vậy.' },
      { en: '[Only then] did she realise her mistake.', vi: 'Chỉ đến lúc đó cô ấy mới nhận ra lỗi của mình.' },
      { en: '[Not only] is it cheap, but it is also reliable.', vi: 'Nó không chỉ rẻ mà còn bền.' },
    ],
    tip: 'Xem trang Inversion — Đảo ngữ để thấy trợ động từ "nhảy" qua chủ ngữ với từng trigger.',
    link: true,
  },
]

const MISTAKES = [
  { wrong: 'It was Mai which bought the car.', right: 'It was Mai who bought the car.', why: 'Tiêu điểm là người → who hoặc that, không dùng which.' },
  { wrong: 'It was in Tokyo where Mai bought the car.', right: 'It was in Tokyo that Mai bought the car.', why: 'It-cleft dùng THAT, kể cả với nơi chốn và thời gian.' },
  { wrong: 'It were the students who complained.', right: 'It was the students who complained.', why: '"It" luôn đi với be số ít (is / was), dù tiêu điểm số nhiều.' },
  { wrong: 'What I need it is a rest.', right: 'What I need is a rest.', why: 'Mệnh đề "What I need" đã là chủ ngữ — không thêm "it".' },
  { wrong: 'All what I want is some sleep.', right: 'All I want is some sleep.', why: 'Sau "All" dùng thẳng mệnh đề (hoặc "All that I want…"), không dùng "what".' },
  { wrong: 'I did liked the film.', right: 'I did like the film.', why: 'Sau do/does/did động từ ở dạng nguyên mẫu.' },
  { wrong: 'The reason why I’m late is because of the traffic.', right: 'The reason why I’m late is that the traffic was terrible.', why: '"The reason… is because" thừa ý; văn viết chuẩn dùng "is that + mệnh đề".' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Lit({ text, className }) {
  const parts = text.split(/(\[[^\]]+\])/g).filter(Boolean)
  return parts.map((p, i) =>
    p.startsWith('[') ? (
      <mark key={i} className={className}>{p.slice(1, -1)}</mark>
    ) : (
      <span key={i}>{p}</span>
    ),
  )
}

/* ------------------------------------------------------------------ */
/*  Signature: spotlight stage                                         */
/* ------------------------------------------------------------------ */

function Stage({ focus, onFocus }) {
  const stageRef = useRef(null)
  const actorRefs = useRef({})
  const [beam, setBeam] = useState(null)

  useLayoutEffect(() => {
    const measure = () => {
      const stage = stageRef.current
      const el = actorRefs.current[focus]
      if (!stage || !el) return
      const s = stage.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      setBeam({ center: r.left - s.left + r.width / 2, width: r.width, bottom: r.bottom - s.top })
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return undefined
    const ro = new ResizeObserver(measure)
    ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [focus])

  const onKeyDown = (e) => {
    const i = PARTS.findIndex((p) => p.key === focus)
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % PARTS.length
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + PARTS.length) % PARTS.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = PARTS.length - 1
    if (next < 0) return
    e.preventDefault()
    const key = PARTS[next].key
    onFocus(key)
    actorRefs.current[key]?.focus()
  }

  const beamWidth = beam ? beam.width + 70 : 0
  const part = PARTS.find((p) => p.key === focus)

  return (
    <section className={styles.theatre} aria-labelledby="emp-stage-title">
      <div className={styles.valance} aria-hidden="true" />
      <div className={styles.marquee}>
        <p className={styles.marqueeKicker}>Tonight on stage</p>
        <h2 id="emp-stage-title" className={styles.marqueeTitle}>Rọi đèn vào phần muốn nhấn mạnh</h2>
        <p className={styles.marqueeHint}>Bấm vào một phần của câu (hoặc dùng phím ← →) để di chuyển đèn sân khấu.</p>
      </div>

      <div className={styles.stage} ref={stageRef}>
        {beam && (
          <>
            <div
              className={styles.beam}
              aria-hidden="true"
              style={{ width: beamWidth, height: beam.bottom + 18, transform: `translateX(${beam.center - beamWidth / 2}px)` }}
            />
            <div
              className={styles.pool}
              aria-hidden="true"
              style={{ width: beamWidth + 30, transform: `translate(${beam.center - (beamWidth + 30) / 2}px, ${beam.bottom - 14}px)` }}
            />
          </>
        )}

        <div className={styles.actors} role="radiogroup" aria-label="Phần câu được nhấn mạnh" onKeyDown={onKeyDown}>
          {PARTS.map((p) => {
            const on = p.key === focus
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={on ? 0 : -1}
                ref={(el) => {
                  actorRefs.current[p.key] = el
                }}
                className={`${styles.actor} ${on ? styles.actorOn : ''}`}
                onClick={() => onFocus(p.key)}
              >
                <span className={styles.actorText}>{p.text}</span>
                <span className={styles.actorRole}>
                  {p.role} · {p.q}
                </span>
              </button>
            )
          })}
          <span className={styles.period} aria-hidden="true">.</span>
        </div>
        <div className={styles.floor} aria-hidden="true" />
      </div>

      <p className={styles.srOnly} aria-live="polite">
        Đang nhấn mạnh: {part.text} ({part.role})
      </p>
    </section>
  )
}

function Script({ focus }) {
  const scene = SCENES[focus]
  return (
    <section className={styles.script} aria-labelledby="emp-script-title">
      <div className={styles.scriptHead}>
        <h2 id="emp-script-title" className={styles.h2}>Kịch bản</h2>
        <p className={styles.cue}>
          <span className={styles.cueLabel}>Câu hỏi gợi ý</span> {scene.question}
        </p>
      </div>
      <p className={styles.base}>
        <span className={styles.baseLabel}>Câu gốc</span> {BASE_SENTENCE}
      </p>
      <div className={styles.lines} key={focus}>
        {scene.lines.map((line) => (
          <article key={line.kind} className={`${styles.lineCard} ${line.blocked ? styles.lineBlocked : ''}`}>
            <header className={styles.lineHead}>
              <span className={styles.lineKind}>{line.kind}</span>
              <span className={styles.lineSub}>{line.sub}</span>
            </header>
            <p className={styles.lineFormula}>{line.formula}</p>
            {line.blocked ? (
              <p className={styles.lineBlockedText}>
                <StopOutlined aria-hidden="true" /> <span className={styles.strike}>{line.en}</span>
              </p>
            ) : (
              <p className={styles.lineEn}>
                <Lit text={line.en} className={styles.lit} />
              </p>
            )}
          </article>
        ))}
      </div>
      <p className={styles.sceneVi}>{scene.vi}</p>
      <p className={styles.sceneNote}>
        <BulbOutlined aria-hidden="true" /> {scene.note}
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Cleft comparison                                                   */
/* ------------------------------------------------------------------ */

function CleftCompare() {
  return (
    <section className={styles.section} aria-labelledby="emp-cleft-title">
      <h2 id="emp-cleft-title" className={styles.h2}>It-cleft hay Wh-cleft?</h2>
      <p className={styles.sectionLead}>
        Câu chẻ (cleft sentence) tách một câu thành hai phần để đẩy một thành phần vào "vùng sáng". Tiếng Việt hay dùng "chính… là…",
        "cái mà… là…".
      </p>
      <div className={styles.compare}>
        {CLEFT_COMPARE.map((c) => (
          <article key={c.name} className={styles.compareCard}>
            <h3 className={styles.compareName}>{c.name}</h3>
            <p className={styles.compareFormula}>{c.formula}</p>
            <dl className={styles.compareList}>
              <dt>Tiêu điểm ở đâu</dt>
              <dd>{c.where}</dd>
              <dt>Dùng khi</dt>
              <dd>{c.use}</dd>
            </dl>
            <p className={styles.compareExample}>
              <Lit text={c.example} className={styles.litSoft} />
            </p>
            <p className={styles.compareTip}>{c.tip}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Toolkit (other emphasis devices)                                   */
/* ------------------------------------------------------------------ */

function Toolkit() {
  const items = TOOLKIT.map((t) => ({
    key: t.key,
    label: t.label,
    children: (
      <div className={styles.tool}>
        <h3 className={styles.toolTitle}>{t.title}</h3>
        <p className={styles.toolFormula}>{t.formula}</p>
        <p className={styles.toolUse}>{t.use}</p>
        <ul className={styles.toolExamples}>
          {t.examples.map((e) => (
            <li key={e.en}>
              <span className={styles.toolEn}>
                <Lit text={e.en} className={styles.litSoft} />
              </span>
              <span className={styles.toolVi}>{e.vi}</span>
            </li>
          ))}
        </ul>
        <p className={styles.toolTip}>
          <BulbOutlined aria-hidden="true" /> {t.tip}
        </p>
        {t.link && (
          <Link className={styles.toolLink} to={INVERSION_HREF}>
            <LinkOutlined aria-hidden="true" /> Mở trang Inversion — Đảo ngữ
          </Link>
        )}
      </div>
    ),
  }))

  return (
    <section className={styles.section} aria-labelledby="emp-tools-title">
      <h2 id="emp-tools-title" className={styles.h2}>
        <ToolOutlined aria-hidden="true" /> Hộp đạo cụ nhấn mạnh
      </h2>
      <Tabs items={items} defaultActiveKey="do" className={styles.tabs} />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Common mistakes                                                    */
/* ------------------------------------------------------------------ */

function Mistakes() {
  return (
    <section className={styles.section} aria-labelledby="emp-mistakes-title">
      <h2 id="emp-mistakes-title" className={styles.h2}>
        <WarningOutlined aria-hidden="true" /> Lỗi hay gặp
      </h2>
      <ul className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <li key={m.wrong} className={styles.mistake}>
            <p className={styles.wrong}>
              <span aria-hidden="true">❌</span> <span className={styles.strike}>{m.wrong}</span>
            </p>
            <p className={styles.right}>
              <span aria-hidden="true">✅</span> {m.right}
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

export default function Emphasis() {
  const [focus, setFocus] = useState('object')

  return (
    <div className={styles.page}>
      <p className={styles.lead}>
        Cùng một câu, nhưng bạn có thể chọn phần nào được "đứng dưới ánh đèn". Tiếng Anh có nhiều công cụ để làm việc đó:{' '}
        <strong>câu chẻ (cleft)</strong>, <strong>do/does/did</strong>, đưa thành phần lên đầu câu, đại từ phản thân, từ tăng cường
        và đảo ngữ.
      </p>
      <Stage focus={focus} onFocus={setFocus} />
      <Script focus={focus} />
      <CleftCompare />
      <Toolkit />
      <Mistakes />
    </div>
  )
}
