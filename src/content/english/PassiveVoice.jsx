import { useLayoutEffect, useRef, useState } from 'react'
import { Button, Select, Switch } from 'antd'
import {
  ArrowRightOutlined,
  SwapOutlined,
  ToolOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './PassiveVoice.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  Example markup: {passive part} is highlighted                      */
/*  num: '1sg' (I) · '3sg' (he/she/it, singular noun) · 'pl'           */
/* ------------------------------------------------------------------ */

const SENTENCES = [
  {
    key: 'chef',
    label: 'The chef · the soup',
    subj: 'the chef',
    subjNum: '3sg',
    agent: 'the chef',
    obj: 'the soup',
    objSubj: 'the soup',
    objNum: '3sg',
    verb: { base: 'cook', s: 'cooks', past: 'cooked', pp: 'cooked', ing: 'cooking' },
    keepAgent: true,
    note: 'Người làm (the chef) là thông tin có ích → có thể giữ “by the chef”.',
  },
  {
    key: 'bridge',
    label: 'They · a new bridge',
    subj: 'they',
    subjNum: 'pl',
    agent: 'them',
    obj: 'a new bridge',
    objSubj: 'a new bridge',
    objNum: '3sg',
    verb: { base: 'build', s: 'builds', past: 'built', pp: 'built', ing: 'building' },
    keepAgent: false,
    note: '“They” không rõ là ai → thường bỏ “by them”. Đại từ chủ ngữ they đổi thành tân ngữ them.',
  },
  {
    key: 'letters',
    label: 'My sister · these letters',
    subj: 'my sister',
    subjNum: '3sg',
    agent: 'my sister',
    obj: 'these letters',
    objSubj: 'these letters',
    objNum: 'pl',
    verb: { base: 'write', s: 'writes', past: 'wrote', pp: 'written', ing: 'writing' },
    keepAgent: true,
    note: 'Chủ ngữ mới “these letters” là số nhiều → be chia số nhiều: are / were / have been.',
  },
  {
    key: 'bike',
    label: 'Somebody · my bike',
    subj: 'somebody',
    subjNum: '3sg',
    agent: 'somebody',
    obj: 'my bike',
    objSubj: 'my bike',
    objNum: '3sg',
    verb: { base: 'steal', s: 'steals', past: 'stole', pp: 'stolen', ing: 'stealing' },
    keepAgent: false,
    note: 'Không biết ai làm (somebody) → bỏ hẳn “by somebody”. Đây là lý do số 1 để dùng bị động.',
  },
  {
    key: 'teacher',
    label: 'The teacher · me',
    subj: 'the teacher',
    subjNum: '3sg',
    agent: 'the teacher',
    obj: 'me',
    objSubj: 'I',
    objNum: '1sg',
    verb: { base: 'ask', s: 'asks', past: 'asked', pp: 'asked', ing: 'asking' },
    keepAgent: true,
    note: 'Tân ngữ “me” lên làm chủ ngữ phải đổi thành “I”, và be chia theo I: am / was / have been.',
  },
  {
    key: 'english',
    label: 'People · English',
    subj: 'people',
    subjNum: 'pl',
    agent: 'people',
    obj: 'English',
    objSubj: 'English',
    objNum: '3sg',
    verb: { base: 'speak', s: 'speaks', past: 'spoke', pp: 'spoken', ing: 'speaking' },
    keepAgent: false,
    note: '“people” là chủ thể chung chung → bỏ: English is spoken all over the world.',
  },
]

const beNow = (n) => (n === '1sg' ? 'am' : n === 'pl' ? 'are' : 'is')
const haveNow = (n) => (n === '3sg' ? 'has' : 'have')
const bePast = (n) => (n === 'pl' ? 'were' : 'was')

const TENSES = [
  {
    key: 'presSimple', group: 'Present', name: 'Present simple', vi: 'Hiện tại đơn',
    actF: 'V / V-s', pasF: 'am / is / are + V3',
    act: (v, n) => (n === '3sg' ? v.s : v.base),
    pas: (v, n) => `${beNow(n)} ${v.pp}`,
  },
  {
    key: 'presCont', group: 'Present', name: 'Present continuous', vi: 'Hiện tại tiếp diễn',
    actF: 'am / is / are + V-ing', pasF: 'am / is / are + being + V3',
    act: (v, n) => `${beNow(n)} ${v.ing}`,
    pas: (v, n) => `${beNow(n)} being ${v.pp}`,
  },
  {
    key: 'presPerf', group: 'Present', name: 'Present perfect', vi: 'Hiện tại hoàn thành',
    actF: 'have / has + V3', pasF: 'have / has + been + V3',
    act: (v, n) => `${haveNow(n)} ${v.pp}`,
    pas: (v, n) => `${haveNow(n)} been ${v.pp}`,
  },
  {
    key: 'presPerfCont', group: 'Present', name: 'Present perfect continuous', vi: 'Hiện tại hoàn thành tiếp diễn', rare: true,
    actF: 'have / has + been + V-ing', pasF: 'have / has + been + being + V3',
    act: (v, n) => `${haveNow(n)} been ${v.ing}`,
    pas: (v, n) => `${haveNow(n)} been being ${v.pp}`,
  },
  {
    key: 'pastSimple', group: 'Past', name: 'Past simple', vi: 'Quá khứ đơn',
    actF: 'V2 / V-ed', pasF: 'was / were + V3',
    act: (v) => v.past,
    pas: (v, n) => `${bePast(n)} ${v.pp}`,
  },
  {
    key: 'pastCont', group: 'Past', name: 'Past continuous', vi: 'Quá khứ tiếp diễn',
    actF: 'was / were + V-ing', pasF: 'was / were + being + V3',
    act: (v, n) => `${bePast(n)} ${v.ing}`,
    pas: (v, n) => `${bePast(n)} being ${v.pp}`,
  },
  {
    key: 'pastPerf', group: 'Past', name: 'Past perfect', vi: 'Quá khứ hoàn thành',
    actF: 'had + V3', pasF: 'had + been + V3',
    act: (v) => `had ${v.pp}`,
    pas: (v) => `had been ${v.pp}`,
  },
  {
    key: 'pastPerfCont', group: 'Past', name: 'Past perfect continuous', vi: 'Quá khứ hoàn thành tiếp diễn', rare: true,
    actF: 'had + been + V-ing', pasF: 'had + been + being + V3',
    act: (v) => `had been ${v.ing}`,
    pas: (v) => `had been being ${v.pp}`,
  },
  {
    key: 'futSimple', group: 'Future', name: 'Future simple', vi: 'Tương lai đơn',
    actF: 'will + V', pasF: 'will + be + V3',
    act: (v) => `will ${v.base}`,
    pas: (v) => `will be ${v.pp}`,
  },
  {
    key: 'futCont', group: 'Future', name: 'Future continuous', vi: 'Tương lai tiếp diễn', rare: true,
    actF: 'will + be + V-ing', pasF: 'will + be + being + V3',
    act: (v) => `will be ${v.ing}`,
    pas: (v) => `will be being ${v.pp}`,
  },
  {
    key: 'futPerf', group: 'Future', name: 'Future perfect', vi: 'Tương lai hoàn thành',
    actF: 'will + have + V3', pasF: 'will + have + been + V3',
    act: (v) => `will have ${v.pp}`,
    pas: (v) => `will have been ${v.pp}`,
  },
  {
    key: 'futPerfCont', group: 'Future', name: 'Future perfect continuous', vi: 'Tương lai hoàn thành tiếp diễn', rare: true,
    actF: 'will + have + been + V-ing', pasF: 'will + have + been + being + V3',
    act: (v) => `will have been ${v.ing}`,
    pas: (v) => `will have been being ${v.pp}`,
  },
  {
    key: 'modal', group: 'Modal', name: 'Modal (can, must, should…)', vi: 'Động từ khuyết thiếu',
    actF: 'modal + V', pasF: 'modal + be + V3',
    act: (v) => `can ${v.base}`,
    pas: (v) => `can be ${v.pp}`,
  },
]

const STEPS = [
  { n: '1', text: 'Tân ngữ (object) lên đầu câu làm chủ ngữ mới.' },
  { n: '2', text: 'Động từ → be (giữ nguyên thì của câu chủ động) + V3.' },
  { n: '3', text: 'Chủ ngữ cũ → by + tân ngữ, hoặc bỏ nếu không cần.' },
]

const STATIONS = [
  {
    key: 'why',
    title: 'Khi nào dùng bị động?',
    formula: 'S (người / vật chịu tác động) + be + V3',
    body: 'Dùng khi người thực hiện không quan trọng, không rõ là ai, hoặc quá hiển nhiên; khi muốn nhấn mạnh hành động / kết quả; và trong văn phong trang trọng: tin tức, khoa học, quy trình, thông báo.',
    examples: [
      { en: 'My car {was stolen} last night.', vi: 'Xe tôi bị trộm tối qua. (không biết ai lấy)' },
      { en: 'The results {will be announced} on Friday.', vi: 'Kết quả sẽ được công bố vào thứ Sáu.' },
      { en: 'The water {is heated} to 100°C.', vi: 'Nước được đun nóng tới 100°C. (mô tả quy trình)' },
    ],
  },
  {
    key: 'agent',
    title: 'Giữ hay bỏ “by + agent”?',
    formula: '… + be + V3 (+ by + O)',
    body: 'Bỏ khi chủ thể là people, someone / somebody, they, chung chung hoặc hiển nhiên. Giữ khi người thực hiện là thông tin mới, quan trọng.',
    examples: [
      { en: 'Rice {is grown} in the Mekong Delta.', vi: 'Lúa được trồng ở đồng bằng sông Cửu Long. (bỏ “by farmers”)' },
      { en: 'The Mona Lisa {was painted by Leonardo da Vinci}.', vi: 'Bức Mona Lisa do Leonardo da Vinci vẽ. (agent là thông tin chính)' },
      { en: 'The thief {was arrested}.', vi: 'Tên trộm đã bị bắt. (hiển nhiên là cảnh sát)' },
    ],
  },
  {
    key: 'twoObjects',
    title: 'Động từ có hai tân ngữ',
    formula: 'give / send / show / offer / tell / teach / lend + O(người) + O(vật)',
    body: 'Có hai cách chuyển. Lấy NGƯỜI làm chủ ngữ là cách tự nhiên, phổ biến hơn. Nếu lấy VẬT làm chủ ngữ, cần thêm to / for trước người.',
    pairs: [
      { act: 'They gave me a book.', pas: '{I was given} a book.', tag: 'phổ biến' },
      { act: 'They gave me a book.', pas: 'A book {was given to} me.', tag: 'nhấn vào vật' },
      { act: 'Mum made me a cake.', pas: 'A cake {was made for} me.', tag: 'make / buy → for' },
    ],
  },
  {
    key: 'get',
    title: 'Get-passive',
    formula: 'get + V3',
    body: 'Thân mật, dùng trong văn nói. Hay dùng cho sự việc bất ngờ, không mong muốn, hoặc một sự thay đổi trạng thái. Câu hỏi / phủ định dùng do / did.',
    examples: [
      { en: 'My phone {got stolen} on the bus.', vi: 'Điện thoại tôi bị trộm trên xe buýt.' },
      { en: 'He {got promoted} last month.', vi: 'Tháng trước anh ấy được thăng chức.' },
      { en: 'Did anyone {get hurt}?', vi: 'Có ai bị thương không?' },
    ],
  },
  {
    key: 'causative',
    title: 'Have / get something done',
    formula: 'have / get + O (vật) + V3',
    body: 'Thể nhờ bảo (causative): nhờ hoặc thuê người khác làm cho mình. Cũng dùng cho việc không may xảy ra với mình. Dạng chủ động: have + người + V, get + người + to V.',
    examples: [
      { en: 'I {had my hair cut} yesterday.', vi: 'Hôm qua tôi đi cắt tóc. (thợ cắt cho tôi)' },
      { en: 'We’re {getting the roof repaired}.', vi: 'Chúng tôi đang thuê người sửa mái nhà.' },
      { en: 'She {had her bag stolen} at the airport.', vi: 'Cô ấy bị lấy mất túi ở sân bay.' },
      { en: 'I’ll {have the mechanic check} the brakes. / I’ll {get him to check} them.', vi: 'Tôi sẽ nhờ thợ kiểm tra phanh.' },
    ],
  },
  {
    key: 'reporting',
    title: 'It is said that… / He is said to…',
    formula: 'It + be + said / believed / thought / reported + that…  ·  S + be + said + to V / to have V3',
    body: 'Bị động của động từ tường thuật, dùng khi đưa tin, nói về ý kiến chung. Dùng to have V3 khi sự việc xảy ra TRƯỚC thời điểm nói / tin.',
    pairs: [
      { act: 'People say that he is very rich.', pas: '{It is said that} he is very rich.', tag: 'It + that' },
      { act: 'People say that he is very rich.', pas: 'He {is said to be} very rich.', tag: 'to V' },
      { act: 'People believe the thief escaped abroad.', pas: 'The thief {is believed to have escaped} abroad.', tag: 'to have V3' },
    ],
  },
  {
    key: 'verbPatterns',
    title: 'Bị động sau V-ing / to-V',
    formula: 'being + V3  ·  to be + V3  ·  having been + V3',
    body: 'Khi động từ đứng sau một động từ đòi V-ing hoặc to-V mà chủ ngữ là người chịu tác động, dùng dạng bị động tương ứng. Riêng need + V-ing mang nghĩa bị động.',
    examples: [
      { en: 'I hate {being lied} to.', vi: 'Tôi ghét bị nói dối.' },
      { en: 'She expects {to be invited} to the wedding.', vi: 'Cô ấy mong được mời dự đám cưới.' },
      { en: 'He denied {having been paid}.', vi: 'Anh ta phủ nhận đã được trả tiền.' },
      { en: 'The car {needs washing}. = The car {needs to be washed}.', vi: 'Xe cần được rửa.' },
    ],
  },
  {
    key: 'intransitive',
    title: 'Nội động từ: không có bị động',
    formula: 'happen · occur · arrive · die · exist · seem · appear · disappear · fall · rise',
    body: 'Chỉ động từ có tân ngữ (ngoại động từ) mới chuyển được sang bị động. Nội động từ không có tân ngữ nên không có dạng be + V3. Một số động từ trạng thái như have (sở hữu), resemble, suit, fit, lack cũng hầu như không dùng bị động.',
    examples: [
      { en: 'The accident {happened} at 9 pm.  (✗ was happened)', vi: 'Tai nạn xảy ra lúc 9 giờ tối.' },
      { en: 'Prices {have risen} again.  (✗ have been risen)', vi: 'Giá lại tăng rồi.' },
      { en: 'Dinosaurs {died out} millions of years ago.  (✗ were died out)', vi: 'Khủng long tuyệt chủng từ hàng triệu năm trước.' },
    ],
  },
]

const MISTAKES = [
  { bad: 'The accident was happened at 9 pm.', good: 'The accident happened at 9 pm.', why: 'happen là nội động từ, không có bị động.' },
  { bad: 'The house was build in 1990.', good: 'The house was built in 1990.', why: 'Sau be phải là V3 (built), không phải V nguyên mẫu.' },
  { bad: 'These letters was written by my sister.', good: 'These letters were written by my sister.', why: 'be chia theo chủ ngữ MỚI (these letters → số nhiều).' },
  { bad: 'The bridge is being build now.', good: 'The bridge is being built now.', why: 'Tiếp diễn bị động: be + being + V3.' },
  { bad: 'I was gave a present.', good: 'I was given a present.', why: 'V3 của give là given; gave là V2.' },
  { bad: 'I cut my hair yesterday. (ý: đi tiệm cắt)', good: 'I had my hair cut yesterday.', why: 'Người khác làm cho mình → have something done.' },
  { bad: 'He is said that he is rich.', good: 'It is said that he is rich. / He is said to be rich.', why: 'Với that-clause phải dùng chủ ngữ giả It; với người thì dùng to V.' },
  { bad: 'My wallet was stolen by someone.', good: 'My wallet was stolen.', why: '“by someone” không thêm thông tin gì → nên bỏ.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function cap(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function Hl({ text }) {
  return text
    .split(/(\{[^}]+\})/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith('{') ? (
        <mark key={i} className={styles.hl}>{p.slice(1, -1)}</mark>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

const TENSE_OPTIONS = ['Present', 'Past', 'Future', 'Modal'].map((g) => ({
  label: g,
  title: g,
  options: TENSES.filter((t) => t.group === g).map((t) => ({ value: t.key, label: `${t.name} · ${t.vi}` })),
}))

/* ------------------------------------------------------------------ */
/*  Transformer                                                        */
/* ------------------------------------------------------------------ */

function Transformer({ tenseKey, onTense }) {
  const [sentKey, setSentKey] = useState(SENTENCES[0].key)
  const [passive, setPassive] = useState(false)
  const [keepAgent, setKeepAgent] = useState(SENTENCES[0].keepAgent)
  const chipRefs = useRef({})
  const before = useRef(null)

  const s = SENTENCES.find((x) => x.key === sentKey)
  const t = TENSES.find((x) => x.key === tenseKey)
  const actVerb = t.act(s.verb, s.subjNum)
  const pasVerb = t.pas(s.verb, s.objNum)

  const toggle = () => {
    const rects = {}
    Object.entries(chipRefs.current).forEach(([k, el]) => {
      if (el) rects[k] = el.getBoundingClientRect()
    })
    before.current = rects
    setPassive((p) => !p)
  }

  useLayoutEffect(() => {
    const prev = before.current
    before.current = null
    if (!prev || prefersReducedMotion()) return
    Object.entries(chipRefs.current).forEach(([k, el]) => {
      if (!el || !prev[k] || typeof el.animate !== 'function') return
      const now = el.getBoundingClientRect()
      const dx = prev[k].left - now.left
      const dy = prev[k].top - now.top
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return
      const lift = k === 'obj' ? -34 : k === 'subj' ? 34 : 0
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)` },
          { transform: `translate(${dx / 2}px, ${dy / 2 + lift}px) scale(1.06)`, offset: 0.5 },
          { transform: 'translate(0, 0)' },
        ],
        { duration: 750, easing: 'cubic-bezier(0.45, 0, 0.25, 1)' },
      )
    })
  }, [passive])

  const pickSentence = (key) => {
    const next = SENTENCES.find((x) => x.key === key)
    setSentKey(key)
    setKeepAgent(next.keepAgent)
  }

  const chips = {
    subj: {
      role: passive ? (keepAgent ? 'by + agent' : 'agent · lược bỏ') : 'Subject',
      text: passive ? `by ${s.agent}` : cap(s.subj),
      cls: styles.chipSubj,
      dropped: passive && !keepAgent,
    },
    verb: {
      role: passive ? 'be + V3' : 'Verb',
      text: passive ? pasVerb : actVerb,
      cls: styles.chipVerb,
    },
    obj: {
      role: passive ? 'Subject mới' : 'Object',
      text: passive ? cap(s.objSubj) : s.obj,
      cls: styles.chipObj,
    },
  }
  const order = passive ? ['obj', 'verb', 'subj'] : ['subj', 'verb', 'obj']
  const sentence = passive
    ? `${cap(s.objSubj)} ${pasVerb}${keepAgent ? ` by ${s.agent}` : ''}.`
    : `${cap(s.subj)} ${actVerb} ${s.obj}.`

  return (
    <section className={styles.machine} aria-labelledby="pv-machine-title">
      <div className={styles.hazard} aria-hidden="true" />
      <div className={styles.machineInner}>
        <header className={styles.machineHead}>
          <span className={styles.plate}>PV-01 · Transformer</span>
          <h2 id="pv-machine-title" className={styles.machineTitle}>Cỗ máy chuyển câu</h2>
          <p className={styles.machineSub}>Chọn câu và thì, rồi bấm nút để xem từng bộ phận di chuyển.</p>
        </header>

        <div className={styles.controls}>
          <div className={styles.control}>
            <span className={styles.controlLabel} id="pv-sent-label">Câu mẫu</span>
            <div className={styles.sentPicker} role="group" aria-labelledby="pv-sent-label">
              {SENTENCES.map((x) => (
                <button
                  key={x.key}
                  type="button"
                  className={styles.sentBtn}
                  aria-pressed={x.key === sentKey}
                  onClick={() => pickSentence(x.key)}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
          <label className={styles.control}>
            <span className={styles.controlLabel}>Thì</span>
            <Select
              value={tenseKey}
              onChange={onTense}
              options={TENSE_OPTIONS}
              className={styles.select}
              aria-label="Chọn thì"
            />
          </label>
        </div>

        <div className={styles.belt}>
          <p className={styles.modeTag} aria-live="polite">
            {passive ? 'PASSIVE · bị động' : 'ACTIVE · chủ động'}
            {t.rare && passive && <span className={styles.rareTag}>hiếm dùng</span>}
          </p>
          <div className={styles.chips}>
            {order.map((k) => {
              const c = chips[k]
              return (
                <div
                  key={k}
                  ref={(el) => {
                    chipRefs.current[k] = el
                  }}
                  className={`${styles.chip} ${c.cls} ${c.dropped ? styles.chipDropped : ''}`}
                >
                  <span className={styles.chipRole}>{c.role}</span>
                  <span key={c.text} className={styles.chipText}>{c.text}</span>
                </div>
              )
            })}
            <span className={styles.stopMark} aria-hidden="true">.</span>
          </div>
          <div className={styles.rollers} aria-hidden="true">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>

        <p className={styles.output} aria-live="polite">
          <span className={styles.outputLabel}>Output</span>
          <span className={styles.outputText}>{sentence}</span>
        </p>

        <div className={styles.actions}>
          <Button
            type="primary"
            size="large"
            icon={<SwapOutlined />}
            onClick={toggle}
            className={styles.leverBtn}
            aria-pressed={passive}
          >
            {passive ? 'Trở lại chủ động' : 'Chuyển sang bị động'}
          </Button>
          <div className={styles.agentSwitch}>
            <Switch
              checked={keepAgent}
              onChange={setKeepAgent}
              aria-labelledby="pv-agent-label"
            />
            <span id="pv-agent-label">Giữ “by + agent”</span>
          </div>
        </div>

        <ol className={`${styles.steps} ${passive ? styles.stepsOn : ''}`}>
          {STEPS.map((st) => (
            <li key={st.n} className={styles.step}>
              <span className={styles.stepNum}>{st.n}</span>
              <span>{st.text}</span>
            </li>
          ))}
        </ol>

        <p className={styles.machineNote}>
          <ToolOutlined aria-hidden="true" /> {s.note}
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Be-form table                                                      */
/* ------------------------------------------------------------------ */

function BeTable({ tenseKey, onTense }) {
  const sample = SENTENCES[0]
  return (
    <section className={styles.tableWrap} aria-labelledby="pv-table-title">
      <h2 id="pv-table-title" className={styles.sectionTitle}>Bảng “be” theo thì</h2>
      <p className={styles.sectionSub}>
        Bí quyết: giữ nguyên thì của câu chủ động, chỉ thay động từ chính bằng <strong>be</strong> chia ở thì đó + <strong>V3</strong>.
        Bấm một dòng để nạp thì đó vào cỗ máy.
      </p>
      <ul className={styles.beList}>
        {TENSES.map((t) => (
          <li key={t.key}>
            <button
              type="button"
              className={styles.beRow}
              aria-pressed={t.key === tenseKey}
              onClick={() => onTense(t.key)}
            >
              <span className={styles.beTense}>
                <strong>{t.name}</strong>
                <small>{t.vi}{t.rare ? ' · hiếm dùng' : ''}</small>
              </span>
              <span className={styles.beForms}>
                <code className={styles.beAct}>{t.actF}</code>
                <ArrowRightOutlined aria-hidden="true" className={styles.beArrow} />
                <code className={styles.bePas}>{t.pasF}</code>
              </span>
              <span className={styles.beEx}>
                {cap(sample.objSubj)} <mark className={styles.hl}>{t.pas(sample.verb, sample.objNum)}</mark>.
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className={styles.tableNote}>
        Các thì “hiếm dùng” (be being, been being) đúng ngữ pháp nhưng nghe nặng nề; người bản xứ thường chuyển sang thì đơn giản hơn
        hoặc giữ câu chủ động.
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Stations (rule cards)                                              */
/* ------------------------------------------------------------------ */

function Stations() {
  return (
    <section aria-labelledby="pv-stations-title">
      <h2 id="pv-stations-title" className={styles.sectionTitle}>Các trạm kiến thức</h2>
      <div className={styles.stations}>
        {STATIONS.map((st, i) => (
          <article key={st.key} className={styles.station}>
            <header className={styles.stationHead}>
              <span className={styles.stationNum}>{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.stationTitle}>{st.title}</h3>
            </header>
            <p className={styles.stationFormula}><code>{st.formula}</code></p>
            <p className={styles.stationBody}>{st.body}</p>
            {st.examples && (
              <ul className={styles.exList}>
                {st.examples.map((ex) => (
                  <li key={ex.en} className={styles.ex}>
                    <p className={styles.exEn}><Hl text={ex.en} /></p>
                    <p className={styles.exVi}>{ex.vi}</p>
                  </li>
                ))}
              </ul>
            )}
            {st.pairs && (
              <ul className={styles.pairList}>
                {st.pairs.map((p) => (
                  <li key={p.pas} className={styles.pair}>
                    <span className={styles.pairAct}>{p.act}</span>
                    <ArrowRightOutlined aria-hidden="true" className={styles.pairArrow} />
                    <span className={styles.pairPas}><Hl text={p.pas} /></span>
                    <span className={styles.pairTag}>{p.tag}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.mistakes} aria-labelledby="pv-mistakes-title">
      <h2 id="pv-mistakes-title" className={styles.sectionTitle}>
        <WarningOutlined aria-hidden="true" /> Lỗi hay gặp
      </h2>
      <div className={styles.mistakeGrid}>
        {MISTAKES.map((m) => (
          <div key={m.bad} className={styles.mistake}>
            <p className={styles.mBad}><span aria-hidden="true">❌</span> <s>{m.bad}</s></p>
            <p className={styles.mGood}><span aria-hidden="true">✅</span> {m.good}</p>
            <p className={styles.mWhy}>{m.why}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PassiveVoice() {
  const [tenseKey, setTenseKey] = useState('presSimple')
  return (
    <div className={styles.page}>
      <Transformer tenseKey={tenseKey} onTense={setTenseKey} />
      <BeTable tenseKey={tenseKey} onTense={setTenseKey} />
      <Stations />
      <Mistakes />
    </div>
  )
}
