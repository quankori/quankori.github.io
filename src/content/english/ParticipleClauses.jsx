import { useState } from 'react'
import { Segmented, Switch } from 'antd'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  FieldTimeOutlined,
  SwapRightOutlined,
  SwapLeftOutlined,
} from '@ant-design/icons'
import styles from './ParticipleClauses.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Sentence segments:                                                 */
/*    { t }            unchanged text                                  */
/*    { cut }          only in the full clause (removed when reduced)  */
/*    { full, short }  the verb that changes form                      */
/*    r: 'p' participle part · 'm' main clause · 's' shared subject    */
/*  Timeline: positions in % on a "before → after" axis                */
/* ------------------------------------------------------------------ */

const FORMS = [
  {
    key: 'present',
    tag: 'V-ing',
    name: 'Present participle',
    vi: 'Hiện tại phân từ',
    voice: 'active',
    time: 'Cùng lúc',
    segs: [
      { cut: 'When ', r: 'p' },
      { cut: 'I', r: 's' },
      { cut: ' was ', r: 'p' },
      { full: 'walking', short: 'Walking', r: 'p' },
      { t: ' down the street', r: 'p' },
      { t: ', ' },
      { t: 'I', r: 's' },
      { t: ' met an old friend.', r: 'm' },
    ],
    a: { from: 8, to: 82, label: 'walk down the street' },
    b: { from: 52, to: 52, label: 'meet an old friend' },
    relation: 'Đang đi thì gặp: hai hành động diễn ra cùng lúc (hoặc nối tiếp ngay).',
    rule: 'Dùng V-ing khi chủ ngữ tự thực hiện hành động (chủ động) và hành động xảy ra cùng lúc hoặc ngay trước hành động chính.',
    examples: [
      { en: '[Feeling tired], she went to bed early.', vi: '= Because she felt tired… (lý do)' },
      { en: '[Opening the door], he saw a cat on the sofa.', vi: '= When he opened the door… (ngay trước)' },
    ],
  },
  {
    key: 'past',
    tag: 'V3',
    name: 'Past participle',
    vi: 'Quá khứ phân từ',
    voice: 'passive',
    time: 'Thời gian: theo ngữ cảnh',
    segs: [
      { cut: 'Because ', r: 'p' },
      { cut: 'it', r: 's' },
      { cut: ' was ', r: 'p' },
      { full: 'built', short: 'Built', r: 'p' },
      { t: ' in 1890', r: 'p' },
      { t: ', ' },
      { t: 'the house', r: 's' },
      { t: ' needs a lot of repairs.', r: 'm' },
    ],
    a: { from: 6, to: 22, label: 'be built (1890)' },
    b: { from: 64, to: 94, label: 'need repairs (now)' },
    relation: 'Ngôi nhà “được xây”: chủ ngữ chịu tác động. V3 nói về thể bị động; thời gian do ngữ cảnh (in 1890) cho biết.',
    rule: 'Dùng V3 / V-ed khi chủ ngữ bị / được tác động (bị động). Thay cho cả "S + be + V3".',
    examples: [
      { en: '[Seen from the air], the island looks like a turtle.', vi: '= When it is seen from the air…' },
      { en: '[Written in simple English], the book is easy to read.', vi: '= Because it is written…' },
    ],
  },
  {
    key: 'perfect',
    tag: 'Having V3',
    name: 'Perfect participle',
    vi: 'Phân từ hoàn thành',
    voice: 'active',
    time: 'Xong trước',
    segs: [
      { cut: 'After ', r: 'p' },
      { cut: 'she', r: 's' },
      { cut: ' ', r: 'p' },
      { full: 'had finished', short: 'Having finished', r: 'p' },
      { t: ' the report', r: 'p' },
      { t: ', ' },
      { t: 'she', r: 's' },
      { t: ' left the office.', r: 'm' },
    ],
    a: { from: 6, to: 42, label: 'finish the report ✓' },
    b: { from: 66, to: 66, label: 'leave the office' },
    relation: 'Hành động 1 hoàn tất rồi mới tới hành động 2. Having + V3 nhấn mạnh thứ tự trước → sau.',
    rule: 'Dùng Having + V3 khi hành động trong mệnh đề phân từ đã xong trước hành động chính (chủ động).',
    examples: [
      { en: '[Having lived in Japan for ten years], he speaks Japanese fluently.', vi: '= Because he has lived…' },
      { en: '[Having lost his keys], Tom had to climb in through the window.', vi: '= As he had lost his keys…' },
    ],
  },
  {
    key: 'perfectPassive',
    tag: 'Having been V3',
    name: 'Perfect passive',
    vi: 'Hoàn thành bị động',
    voice: 'passive',
    time: 'Xong trước · bị động',
    segs: [
      { cut: 'Because ', r: 'p' },
      { cut: 'he', r: 's' },
      { cut: ' ', r: 'p' },
      { full: 'had been warned', short: 'Having been warned', r: 'p' },
      { t: ' about the traffic', r: 'p' },
      { t: ', ' },
      { t: 'he', r: 's' },
      { t: ' left home early.', r: 'm' },
    ],
    a: { from: 10, to: 36, label: 'be warned ✓' },
    b: { from: 68, to: 68, label: 'leave home early' },
    relation: 'Anh ấy “đã được cảnh báo” trước, rồi mới rời nhà: vừa bị động vừa xảy ra trước.',
    rule: 'Dùng Having been + V3 khi chủ ngữ bị / được tác động và việc đó đã xong trước hành động chính.',
    examples: [
      { en: '[Having been rejected twice], she decided to try a different company.', vi: '= After she had been rejected twice…' },
      { en: '[Having been told the news], we hurried to the hospital.', vi: '= When we had been told the news…' },
    ],
  },
]

const DANGLING = [
  {
    bad: 'Walking into the room, the lights turned on.',
    who: 'the lights',
    act: 'walking into the room',
    fix: 'Walking into the room, I turned on the lights.',
    alt: 'When I walked into the room, the lights turned on.',
  },
  {
    bad: 'Having finished dinner, the dishes were washed.',
    who: 'the dishes',
    act: 'having finished dinner',
    fix: 'Having finished dinner, we washed the dishes.',
    alt: 'After we had finished dinner, the dishes were washed.',
  },
  {
    bad: 'Being a rainy day, we stayed at home.',
    who: 'we',
    act: 'being a rainy day',
    fix: 'It being a rainy day, we stayed at home.',
    alt: 'As it was a rainy day, we stayed at home.',
  },
]

const CONJ = [
  { conj: 'After', en: '[After finishing] her homework, she went out.', vi: 'Sau khi làm xong bài…' },
  { conj: 'Before', en: '[Before leaving], turn off the lights.', vi: 'Trước khi đi…' },
  { conj: 'While', en: '[While waiting] for the bus, I read the news.', vi: 'Trong lúc chờ xe buýt…' },
  { conj: 'When', en: '[When asked] about the plan, he said nothing.', vi: 'Khi được hỏi… (bị động)' },
  { conj: 'If', en: '[If heated], ice turns into water.', vi: 'Nếu bị đun nóng… (bị động)' },
  { conj: 'Once', en: '[Once opened], the jar should be kept in the fridge.', vi: 'Một khi đã mở…' },
  { conj: 'Although', en: '[Although injured], he kept playing.', vi: 'Dù bị thương…' },
  { conj: 'Since', en: '[Since moving] to Saigon, she has been much happier.', vi: 'Từ khi chuyển vào Sài Gòn…' },
]

const WITH = [
  { en: '[With prices rising], people are spending less.', type: 'V-ing', vi: 'Giá cả đang tăng (chủ động).' },
  { en: '[With so many people watching], she felt nervous.', type: 'V-ing', vi: 'Nhiều người đang nhìn.' },
  { en: '[With the work finished], we went home.', type: 'V3', vi: 'Công việc đã được làm xong (bị động).' },
  { en: 'He sat there [with his eyes closed].', type: 'V3', vi: 'Mắt nhắm lại (bị động, trạng thái).' },
]

const NEGATIVE = [
  { en: '[Not knowing] what to do, she called her mother.', vi: 'Vì không biết phải làm gì…' },
  { en: '[Not having received] a reply, he wrote again.', vi: 'Vì chưa nhận được hồi âm…' },
  { en: '[Not wanting] to wake the baby, we whispered.', vi: 'Vì không muốn đánh thức em bé…' },
]

const USES = [
  {
    key: 'reason',
    label: 'Lý do',
    short: '[Feeling tired], I went to bed early.',
    full: 'Because I felt tired, I went to bed early.',
  },
  {
    key: 'time',
    label: 'Thời gian',
    short: '[Arriving at the airport], we found our flight had been cancelled.',
    full: 'When we arrived at the airport, we found…',
  },
  {
    key: 'result',
    label: 'Kết quả',
    short: 'The bus broke down, [leaving us stranded in the rain].',
    full: 'The bus broke down, and this left us stranded in the rain.',
  },
  {
    key: 'condition',
    label: 'Điều kiện',
    short: '[Used carefully], this knife will last for years.',
    full: 'If it is used carefully, this knife will last for years.',
  },
  {
    key: 'parallel',
    label: 'Đồng thời',
    short: 'She sat by the window, [reading a book].',
    full: 'She sat by the window and read a book.',
  },
]

const MISTAKES = [
  {
    bad: 'Walking into the room, the lights turned on.',
    good: 'Walking into the room, I turned on the lights.',
    vi: 'Dangling participle: chủ ngữ của mệnh đề chính phải là người thực hiện “walking”.',
  },
  {
    bad: 'Writing in 1949, the novel is still popular.',
    good: 'Written in 1949, the novel is still popular.',
    vi: 'Cuốn tiểu thuyết “được viết” → bị động → V3.',
  },
  {
    bad: 'Finished the work, he went home.',
    good: 'Having finished the work, he went home.',
    vi: 'Anh ấy tự làm xong (chủ động) rồi mới về → Having + V3, không dùng V3 trơn.',
  },
  {
    bad: 'After finished lunch, we went for a walk.',
    good: 'After finishing lunch, we went for a walk.',
    vi: 'After / before / since đi với V-ing khi chủ động.',
  },
  {
    bad: 'Knowing not what to say, he left.',
    good: 'Not knowing what to say, he left.',
    vi: '"Not" đứng ngay trước phân từ.',
  },
  {
    bad: 'Being tired, so I went to bed.',
    good: 'Being tired, I went to bed.',
    vi: 'Mệnh đề phân từ đã chứa ý “vì”, không thêm so / but.',
  },
  {
    bad: 'Having been finished the report, she left.',
    good: 'Having finished the report, she left.',
    vi: 'Having been + V3 là bị động; cô ấy tự viết xong báo cáo → Having + V3.',
  },
  {
    bad: 'With the prices rise, people buy less.',
    good: 'With prices rising, people buy less.',
    vi: 'Cấu trúc with + O + V-ing / V3, không dùng động từ chia thì.',
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Bracket({ text }) {
  return text
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith('[') ? (
        <mark key={i} className={styles.partMark}>{p.slice(1, -1)}</mark>
      ) : (
        <span key={i}>{p}</span>
      ),
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
/*  Signature: two-event timeline                                      */
/* ------------------------------------------------------------------ */

function Sentence({ segs, mode, moved }) {
  const short = mode === 'short'
  return segs.map((s, i) => {
    const roleCls = s.r === 'p' ? styles.segP : s.r === 'm' ? styles.segM : s.r === 's' ? styles.segS : ''
    if (s.cut !== undefined) {
      const cls = short ? styles.vanish : moved ? styles.appear : ''
      return (
        <span key={i} className={`${roleCls} ${styles.cutSeg} ${cls}`} aria-hidden={short ? true : undefined}>
          {s.cut}
        </span>
      )
    }
    if (s.full !== undefined) {
      return (
        <span key={`${i}-${mode}`} className={`${roleCls} ${styles.verbSeg} ${moved ? styles.flash : ''}`}>
          {short ? s.short : s.full}
        </span>
      )
    }
    return (
      <span key={i} className={roleCls}>
        {s.t}
      </span>
    )
  })
}

function Lane({ label, ev, kind, guide }) {
  const point = ev.from === ev.to
  return (
    <div className={styles.lane}>
      <div className={styles.laneInfo}>
        <span className={styles.laneLabel}>{label}</span>
        <span className={styles.laneEvent} data-kind={kind}>{ev.label}</span>
      </div>
      <div className={styles.laneRail}>
        <span className={styles.guide} style={{ left: `${guide}%` }} />
        <span
          className={`${styles.event} ${point ? styles.eventPoint : ''}`}
          data-kind={kind}
          style={{ left: `${ev.from}%`, width: point ? undefined : `${ev.to - ev.from}%` }}
        />
      </div>
    </div>
  )
}

function Timeline() {
  const [formKey, setFormKey] = useState(FORMS[0].key)
  const [mode, setMode] = useState('full')
  const [moved, setMoved] = useState(false)
  const f = FORMS.find((x) => x.key === formKey)
  const subject = f.segs.filter((s) => s.r === 's' && s.t !== undefined).map((s) => s.t)[0]
  const removedSubject = f.segs.filter((s) => s.r === 's' && s.cut !== undefined).map((s) => s.cut)[0]

  const pickForm = (k) => {
    setFormKey(k)
    setMode('full')
    setMoved(false)
  }

  return (
    <section className={styles.stage} aria-labelledby="pc-stage-title">
      <div className={styles.stageHead}>
        <span className={styles.eyebrow}>
          <FieldTimeOutlined aria-hidden="true" /> Two-event timeline
        </span>
        <h2 id="pc-stage-title" className={styles.stageTitle}>Dạng phân từ cho biết thời gian &amp; thể</h2>
        <p className={styles.stageHint}>Chọn một dạng, rồi chuyển giữa câu đầy đủ và câu rút gọn.</p>
      </div>

      <div className={styles.formTabs} role="group" aria-label="Chọn dạng phân từ">
        {FORMS.map((x) => (
          <button
            key={x.key}
            type="button"
            className={styles.formTab}
            aria-pressed={x.key === formKey}
            onClick={() => pickForm(x.key)}
          >
            <span className={styles.formTag}>{x.tag}</span>
            <span className={styles.formVi}>{x.vi}</span>
          </button>
        ))}
      </div>

      <div className={styles.board}>
        <div className={styles.modeRow}>
          <Segmented
            value={mode}
            onChange={(v) => {
              setMode(v)
              setMoved(true)
            }}
            options={[
              { value: 'full', label: 'Mệnh đề đầy đủ' },
              { value: 'short', label: 'Rút gọn' },
            ]}
            className={styles.modeSeg}
            aria-label="Chế độ câu"
          />
          <div className={styles.badges}>
            <span className={styles.badge} data-voice={f.voice}>
              {f.voice === 'active' ? <SwapRightOutlined aria-hidden="true" /> : <SwapLeftOutlined aria-hidden="true" />}
              {f.voice === 'active' ? 'Chủ động · S làm' : 'Bị động · S bị / được'}
            </span>
            <span className={styles.badge}>{f.time}</span>
          </div>
        </div>

        <p className={styles.sentence} aria-live="polite">
          <Sentence segs={f.segs} mode={mode} moved={moved} />
        </p>
        <p className={styles.subjectNote}>
          {mode === 'full' ? (
            <>
              Hai mệnh đề có chung chủ ngữ: <mark className={styles.subjMark}>{removedSubject}</mark> ={' '}
              <mark className={styles.subjMark}>{subject}</mark> → được phép rút gọn.
            </>
          ) : (
            <>
              Chủ ngữ ẩn của phân từ chính là <mark className={styles.subjMark}>{subject}</mark> ở mệnh đề chính.
            </>
          )}
        </p>

        <div className={styles.timeline} role="img" aria-label={`Dòng thời gian: ${f.a.label}, rồi ${f.b.label}. ${f.relation}`}>
          <Lane label="Phân từ" ev={f.a} kind="a" guide={f.b.from} />
          <Lane label="Mệnh đề chính" ev={f.b} kind="b" guide={f.b.from} />
          <div className={styles.axis} aria-hidden="true">
            <span>trước</span>
            <span className={styles.axisLine} />
            <span>sau</span>
          </div>
        </div>
        <p className={styles.relation}>{f.relation}</p>
      </div>

      <div className={styles.formDetail}>
        <h3 className={styles.formName}>
          {f.name} <span>· {f.vi}</span>
        </h3>
        <p className={styles.formRule}>{f.rule}</p>
        <ul className={styles.exList}>
          {f.examples.map((ex) => (
            <li key={ex.en}>
              <p className={styles.exEn}><Bracket text={ex.en} /></p>
              <p className={styles.exVi}>{ex.vi}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function DanglingLab() {
  const [fixed, setFixed] = useState({})
  return (
    <section className={styles.panel} aria-labelledby="pc-dangling-title">
      <SectionHead
        id="pc-dangling-title"
        icon="S = S"
        title="Quy tắc vàng: cùng chủ ngữ"
        sub="Chủ ngữ ẩn của phân từ luôn là chủ ngữ của mệnh đề chính. Nếu không, ta có “dangling participle” — câu nghe rất buồn cười."
      />
      <ul className={styles.dangleList}>
        {DANGLING.map((d, i) => {
          const on = !!fixed[i]
          return (
            <li key={d.bad} className={styles.dangle} data-fixed={on ? 'y' : undefined}>
              <div className={styles.dangleTop}>
                <p className={styles.dangleSentence}>
                  {on ? (
                    <>
                      <CheckCircleFilled className={styles.okIcon} aria-hidden="true" /> {d.fix}
                    </>
                  ) : (
                    <>
                      <CloseCircleFilled className={styles.badIcon} aria-hidden="true" /> {d.bad}
                    </>
                  )}
                </p>
                <label className={styles.fixSwitch}>
                  <Switch
                    size="small"
                    checked={on}
                    onChange={(v) => setFixed((x) => ({ ...x, [i]: v }))}
                    aria-label={`Sửa câu ${i + 1}`}
                  />
                  <span>Sửa</span>
                </label>
              </div>
              {on ? (
                <p className={styles.dangleNote}>
                  Hoặc dùng mệnh đề đầy đủ: <em>{d.alt}</em>
                </p>
              ) : (
                <p className={styles.dangleNote}>
                  Phân từ “<em>{d.act}</em>” bị gắn với chủ ngữ <strong>{d.who}</strong> của mệnh đề chính — vô lý!
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function ConjSection() {
  return (
    <section className={styles.panel} aria-labelledby="pc-conj-title">
      <SectionHead
        id="pc-conj-title"
        icon="+"
        title="Liên từ + phân từ"
        sub="Giữ lại liên từ để nghĩa rõ hơn: After / Before / Since + V-ing; When / While / If / Once / Although + V-ing hoặc V3."
      />
      <ul className={styles.conjGrid}>
        {CONJ.map((c) => (
          <li key={c.conj} className={styles.conjCard}>
            <span className={styles.conjWord}>{c.conj}</span>
            <p className={styles.exEn}><Bracket text={c.en} /></p>
            <p className={styles.exVi}>{c.vi}</p>
          </li>
        ))}
      </ul>

      <div className={styles.twoCol}>
        <div className={styles.miniBox}>
          <h3 className={styles.miniTitle}>with + O + V-ing / V3</h3>
          <p className={styles.miniText}>Dùng khi mệnh đề phân từ có chủ ngữ riêng (khác chủ ngữ chính), thường diễn tả bối cảnh hoặc lý do.</p>
          <ul className={styles.miniList}>
            {WITH.map((w) => (
              <li key={w.en}>
                <span className={styles.typeChip} data-type={w.type}>{w.type}</span>
                <span>
                  <Bracket text={w.en} />
                  <small>{w.vi}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.miniBox}>
          <h3 className={styles.miniTitle}>Phủ định: Not + phân từ</h3>
          <p className={styles.miniText}>“Not” luôn đứng trước phân từ (Not having + V3 thường gặp hơn Having not + V3).</p>
          <ul className={styles.miniList}>
            {NEGATIVE.map((n) => (
              <li key={n.en}>
                <span className={styles.typeChip} data-type="not">not</span>
                <span>
                  <Bracket text={n.en} />
                  <small>{n.vi}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function UsesSection() {
  const [key, setKey] = useState(USES[0].key)
  const u = USES.find((x) => x.key === key)
  return (
    <section className={styles.panel} aria-labelledby="pc-uses-title">
      <SectionHead
        id="pc-uses-title"
        icon="≈"
        title="Một mệnh đề phân từ, nhiều ý nghĩa"
        sub="Phân từ thay cho because / when / if / and… Chọn ý nghĩa để so sánh với câu đầy đủ."
      />
      <Segmented
        options={USES.map((x) => ({ value: x.key, label: x.label }))}
        value={key}
        onChange={setKey}
        className={styles.usesSeg}
        aria-label="Chọn ý nghĩa"
      />
      <div className={styles.usePair} key={u.key}>
        <p className={styles.useShort}><Bracket text={u.short} /></p>
        <span className={styles.useEq} aria-label="tương đương">=</span>
        <p className={styles.useFull}>{u.full}</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Mistakes + practice                                                */
/* ------------------------------------------------------------------ */

function Mistakes() {
  return (
    <section className={styles.panel} aria-labelledby="pc-mistakes-title">
      <SectionHead id="pc-mistakes-title" icon="!" title="Lỗi hay gặp" sub="Soát lại chủ ngữ, thể và thứ tự thời gian." />
      <ol className={styles.mistakes}>
        {MISTAKES.map((mk) => (
          <li key={mk.bad} className={styles.mistake}>
            <p className={styles.bad}><span aria-hidden="true">❌</span> {mk.bad}</p>
            <p className={styles.good}><span aria-hidden="true">✅</span> {mk.good}</p>
            <p className={styles.why}>{mk.vi}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ParticipleClauses() {
  return (
    <div className={styles.page}>
      <Timeline />
      <DanglingLab />
      <ConjSection />
      <UsesSection />
      <Mistakes />
    </div>
  )
}
