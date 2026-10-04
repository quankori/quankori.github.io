import { useState } from 'react'
import { Button, Tabs } from 'antd'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons'
import styles from './Conjunctions.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TYPES = {
  coord: { name: 'Coordinating', vi: 'Liên từ kết hợp', color: '#0f766e', soft: '#dff3ef' },
  sub: { name: 'Subordinating', vi: 'Liên từ phụ thuộc', color: '#c2410c', soft: '#fdeadf' },
  correl: { name: 'Correlative', vi: 'Liên từ tương quan', color: '#6d28d9', soft: '#efe7fd' },
  adv: { name: 'Conjunctive adverb', vi: 'Trạng từ liên kết', color: '#be185d', soft: '#fce7f1' },
}

/*
 * Bridge scenarios.
 *  coord: "A, w B."  (order 'ba' → "B, w A.")
 *  sub:   attach = clause the conjunction introduces; commaMain adds a comma
 *         when the main clause comes first; noFront hides the fronted version.
 *  adv:   "A; w, B."  and  "A. W, B."
 */
const ISLANDS = [
  {
    a: 'it was raining heavily',
    b: 'we stayed at home',
    options: [
      { w: 'so', type: 'coord', ok: true, vi: 'so = vì vậy: mệnh đề sau là KẾT QUẢ của mệnh đề trước.' },
      { w: 'because', type: 'sub', ok: true, attach: 'a', vi: 'because = bởi vì: đứng trước mệnh đề chỉ NGUYÊN NHÂN.' },
      { w: 'therefore', type: 'adv', ok: true, vi: 'therefore = do đó. Là trạng từ liên kết nên cần dấu chấm phẩy hoặc dấu chấm phía trước.' },
      { w: 'for', type: 'coord', ok: true, order: 'ba', vi: 'for = vì (trang trọng, văn viết). Mệnh đề sau “for” là lý do và luôn đứng sau.' },
      { w: 'but', type: 'coord', ok: false, vi: 'but chỉ sự ĐỐI LẬP, còn ở đây là quan hệ nguyên nhân – kết quả.' },
      { w: 'although', type: 'sub', ok: false, vi: 'although = mặc dù (nhượng bộ): “Mặc dù mưa to, chúng tôi ở nhà” không hợp logic.' },
    ],
  },
  {
    a: 'the hotel was expensive',
    b: 'we decided to stay there',
    options: [
      { w: 'but', type: 'coord', ok: true, vi: 'but = nhưng: hai ý đối lập nhau.' },
      { w: 'yet', type: 'coord', ok: true, vi: 'yet = vậy mà: đối lập, mang chút ngạc nhiên.' },
      { w: 'although', type: 'sub', ok: true, attach: 'a', vi: 'although + mệnh đề = mặc dù. Không dùng thêm “but” trong cùng câu.' },
      { w: 'however', type: 'adv', ok: true, vi: 'however = tuy nhiên. Trạng từ liên kết: dùng “; however,” hoặc “. However,”.' },
      { w: 'so', type: 'coord', ok: false, vi: 'so chỉ kết quả: “Khách sạn đắt nên chúng tôi ở lại” không hợp logic.' },
      { w: 'because', type: 'sub', ok: false, vi: 'Giá đắt không phải lý do để ở lại → không dùng because.' },
    ],
  },
  {
    a: 'you hurry',
    b: 'you will miss the last bus',
    options: [
      { w: 'unless', type: 'sub', ok: true, attach: 'a', vi: 'unless = if not: “Nếu bạn không nhanh lên, bạn sẽ lỡ chuyến xe cuối.”' },
      { w: 'or', type: 'coord', ok: false, vi: '“or” (nếu không thì) đi sau câu mệnh lệnh: Hurry, or you will miss the last bus. Với mệnh đề “you hurry” phải dùng unless.' },
      { w: 'until', type: 'sub', ok: false, vi: 'until = cho đến khi: chỉ mốc thời gian, không phải điều kiện.' },
      { w: 'because', type: 'sub', ok: false, vi: 'Nhanh lên không phải là lý do lỡ xe → sai nghĩa.' },
      { w: 'so', type: 'coord', ok: false, vi: '“Bạn nhanh lên nên bạn sẽ lỡ xe” — ngược nghĩa.' },
    ],
  },
  {
    a: 'she was cooking dinner',
    b: 'her husband was setting the table',
    options: [
      { w: 'while', type: 'sub', ok: true, attach: 'a', vi: 'while = trong khi: hai hành động diễn ra cùng lúc (thường với thì tiếp diễn).' },
      { w: 'and', type: 'coord', ok: true, vi: 'and = và: nối thêm một ý ngang hàng.' },
      { w: 'but', type: 'coord', ok: false, vi: 'Hai việc không đối lập nhau → không dùng but.' },
      { w: 'so', type: 'coord', ok: false, vi: 'Việc nấu ăn không phải nguyên nhân của việc dọn bàn.' },
      { w: 'unless', type: 'sub', ok: false, vi: 'unless chỉ điều kiện phủ định, không hợp ngữ cảnh.' },
    ],
  },
  {
    a: 'I’ll call you',
    b: 'I arrive at the airport',
    options: [
      { w: 'as soon as', type: 'sub', ok: true, attach: 'b', vi: 'as soon as = ngay khi. Mệnh đề thời gian dùng HIỆN TẠI ĐƠN để nói về tương lai (✗ will arrive).' },
      { w: 'when', type: 'sub', ok: true, attach: 'b', vi: 'when = khi. Cũng dùng hiện tại đơn trong mệnh đề thời gian.' },
      { w: 'until', type: 'sub', ok: false, vi: 'until = cho đến khi: “gọi cho bạn cho đến khi tôi tới” không hợp nghĩa.' },
      { w: 'because', type: 'sub', ok: false, vi: 'Việc tới sân bay là thời điểm, không phải lý do.' },
      { w: 'but', type: 'coord', ok: false, vi: 'Không có ý đối lập.' },
    ],
  },
  {
    a: 'take an umbrella',
    b: 'it rains later',
    options: [
      { w: 'in case', type: 'sub', ok: true, attach: 'b', vi: 'in case = phòng khi: chuẩn bị trước cho một việc CÓ THỂ xảy ra.' },
      { w: 'because', type: 'sub', ok: false, vi: 'because nói lý do chắc chắn; trời chưa mưa nên dùng in case.' },
      { w: 'so that', type: 'sub', ok: false, vi: 'so that = để mà (mục đích): mang ô không phải “để trời mưa”.' },
      { w: 'unless', type: 'sub', ok: false, vi: '“Mang ô trừ khi trời mưa” — ngược nghĩa.' },
    ],
  },
  {
    a: 'he saved money every month',
    b: 'he could buy a laptop',
    options: [
      { w: 'so that', type: 'sub', ok: true, attach: 'b', noFront: true, vi: 'so that = để (chỉ mục đích), thường đi với can / could / will / would.' },
      { w: 'so', type: 'coord', ok: true, vi: 'so = vì vậy: nhấn mạnh KẾT QUẢ (anh ấy đã có thể mua).' },
      { w: 'therefore', type: 'adv', ok: true, vi: 'therefore = do đó: kết quả, văn phong trang trọng hơn so.' },
      { w: 'although', type: 'sub', ok: false, vi: 'Không có sự nhượng bộ/đối lập.' },
      { w: 'or', type: 'coord', ok: false, vi: 'or chỉ sự lựa chọn, không hợp nghĩa.' },
    ],
  },
  {
    a: 'Lan loves spicy food',
    b: 'her brother hates it',
    options: [
      { w: 'whereas', type: 'sub', ok: true, attach: 'b', commaMain: true, noFront: true, vi: 'whereas = trong khi (đối lập hai sự thật). Thường có dấu phẩy trước whereas.' },
      { w: 'while', type: 'sub', ok: true, attach: 'b', commaMain: true, noFront: true, vi: 'while cũng dùng để đối lập như whereas.' },
      { w: 'but', type: 'coord', ok: true, vi: 'but = nhưng: đơn giản, phổ biến nhất.' },
      { w: 'however', type: 'adv', ok: true, vi: 'however = tuy nhiên: tách thành hai mệnh đề bằng ; hoặc dấu chấm.' },
      { w: 'so', type: 'coord', ok: false, vi: 'Không có quan hệ nguyên nhân – kết quả.' },
      { w: 'because', type: 'sub', ok: false, vi: 'Sở thích của Lan không phải lý do anh trai ghét đồ cay.' },
    ],
  },
  {
    a: 'I have lived here',
    b: 'I was ten',
    options: [
      { w: 'since', type: 'sub', ok: true, attach: 'b', vi: 'since = từ khi: mốc bắt đầu trong quá khứ; mệnh đề chính thường ở hiện tại hoàn thành.' },
      { w: 'when', type: 'sub', ok: false, vi: 'Hiện tại hoàn thành không đi với “when + quá khứ” để chỉ mốc bắt đầu → dùng since.' },
      { w: 'until', type: 'sub', ok: false, vi: 'until chỉ điểm KẾT THÚC, mà việc sống ở đây vẫn tiếp diễn.' },
      { w: 'because', type: 'sub', ok: false, vi: '“Mười tuổi” không phải lý do → sai nghĩa.' },
    ],
  },
]

const FANBOYS = [
  { w: 'for', vi: 'vì (lý do, trang trọng)', ex: 'She was exhausted, [for] she had worked all day.' },
  { w: 'and', vi: 'và (thêm ý)', ex: 'I cooked dinner, [and] my sister washed the dishes.' },
  { w: 'nor', vi: 'cũng không (đảo ngữ sau nor)', ex: 'He doesn’t drink coffee, [nor] does he drink tea.' },
  { w: 'but', vi: 'nhưng (đối lập)', ex: 'The room is small, [but] it is very cosy.' },
  { w: 'or', vi: 'hoặc; nếu không thì', ex: 'Hurry up, [or] we will be late.' },
  { w: 'yet', vi: 'vậy mà (đối lập bất ngờ)', ex: 'He is rich, [yet] he is unhappy.' },
  { w: 'so', vi: 'vì vậy (kết quả)', ex: 'It was late, [so] we took a taxi.' },
]

const SUBORDINATORS = [
  { w: 'because', group: 'Lý do', ex: 'I stayed at home [because] I was ill.' },
  { w: 'although / though / even though', group: 'Nhượng bộ', ex: '[Even though] it was cold, we went swimming.', note: 'even though nhấn mạnh hơn; though thân mật, có thể đứng cuối câu: We went swimming, though.' },
  { w: 'while', group: 'Đồng thời / đối lập', ex: '[While] I was reading, the phone rang.' },
  { w: 'whereas', group: 'Đối lập', ex: 'I like tea, [whereas] my wife prefers coffee.' },
  { w: 'when', group: 'Thời gian', ex: 'Call me [when] you get home.' },
  { w: 'since', group: 'Thời gian / lý do', ex: 'I have known her [since] we were kids.', note: 'since còn nghĩa “vì”: Since it’s late, let’s go home.' },
  { w: 'until', group: 'Thời gian (cho đến khi)', ex: 'Wait here [until] I come back.' },
  { w: 'as soon as', group: 'Thời gian (ngay khi)', ex: 'I’ll text you [as soon as] I land.' },
  { w: 'unless', group: 'Điều kiện (= if not)', ex: 'You won’t pass [unless] you study.' },
  { w: 'so that', group: 'Mục đích', ex: 'Speak louder [so that] everyone can hear you.' },
  { w: 'in case', group: 'Phòng khi', ex: 'Take a jacket [in case] it gets cold.' },
]

const CORRELATIVES = [
  { pair: ['both', 'and'], vi: 'cả … và …', ex: '[Both] my mother [and] my father are teachers.', note: 'Chủ ngữ “both A and B” → động từ số nhiều.' },
  { pair: ['either', 'or'], vi: 'hoặc … hoặc …', ex: 'You can [either] call me [or] send an email.', note: 'Làm chủ ngữ: động từ chia theo danh từ GẦN nhất: Either Tom or his sisters are coming.' },
  { pair: ['neither', 'nor'], vi: 'không … cũng không …', ex: '[Neither] Tom [nor] his friends were at home.', note: 'Đã mang nghĩa phủ định → không thêm “not”. Động từ chia theo danh từ gần nhất.' },
  { pair: ['not only', 'but also'], vi: 'không những … mà còn …', ex: 'She is [not only] clever [but also] hard-working.', note: 'Đưa lên đầu câu thì đảo ngữ: Not only is she clever, but she is also hard-working.' },
  { pair: ['whether', 'or'], vi: 'liệu … hay …', ex: 'I don’t know [whether] he will come [or] not.', note: 'Thường đứng sau know, ask, wonder, decide.' },
]

const LINKERS = [
  { w: 'however', vi: 'tuy nhiên', role: 'đối lập' },
  { w: 'nevertheless', vi: 'tuy vậy', role: 'đối lập' },
  { w: 'therefore', vi: 'do đó', role: 'kết quả' },
  { w: 'consequently', vi: 'vì thế', role: 'kết quả' },
  { w: 'moreover', vi: 'hơn nữa', role: 'thêm ý' },
  { w: 'furthermore', vi: 'ngoài ra', role: 'thêm ý' },
  { w: 'otherwise', vi: 'nếu không thì', role: 'điều kiện' },
]

const CLAUSE_VS_NOUN = [
  {
    meaning: 'Lý do — vì',
    clause: { w: 'because', ex: 'We stayed in [because] it was raining.' },
    noun: { w: 'because of', ex: 'We stayed in [because of] the rain.' },
  },
  {
    meaning: 'Nhượng bộ — mặc dù',
    clause: { w: 'although / though / even though', ex: '[Although] it rained, we went out.' },
    noun: { w: 'despite / in spite of', ex: '[Despite] the rain, we went out. · [In spite of] feeling tired, she kept working.' },
  },
]

const MISTAKES = [
  { wrong: 'Although it rained, but we went out.', right: 'Although it rained, we went out.', why: 'Tiếng Việt nói “Mặc dù… nhưng…”, tiếng Anh chỉ dùng MỘT liên từ.' },
  { wrong: 'Because he was sick, so he stayed home.', right: 'Because he was sick, he stayed home.', why: 'Hoặc: He was sick, so he stayed home. Không dùng cả because và so.' },
  { wrong: 'I was tired, however I finished the report.', right: 'I was tired; however, I finished the report.', why: 'however là trạng từ liên kết: cần “;” hoặc dấu chấm phía trước và dấu phẩy phía sau.' },
  { wrong: 'Despite it rained, we went out.', right: 'Despite the rain, we went out.', why: 'despite / in spite of + danh từ hoặc V-ing. Với mệnh đề dùng although.' },
  { wrong: 'We were late because of the traffic was heavy.', right: 'We were late because the traffic was heavy.', why: 'because of + danh từ (because of the heavy traffic); because + mệnh đề.' },
  { wrong: 'Neither Tom nor his friends was at home.', right: 'Neither Tom nor his friends were at home.', why: 'Động từ chia theo chủ ngữ gần nhất (his friends → were).' },
  { wrong: 'She not only sings but also dancing.', right: 'She not only sings but also dances.', why: 'Cấu trúc song song: hai vế cùng dạng (sings – dances).' },
  { wrong: 'I’ll wait until he will come.', right: 'I’ll wait until he comes.', why: 'Mệnh đề thời gian dùng hiện tại đơn cho tương lai.' },
  { wrong: 'It was late, we went home.', right: 'It was late, so we went home.', why: 'Không nối hai mệnh đề độc lập chỉ bằng dấu phẩy (comma splice).' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const T = (t) => ({ k: 'text', t })
const P = (t) => ({ k: 'punct', t })
const C = (t) => ({ k: 'conn', t })

function joinVariants(isl, opt) {
  const { w } = opt
  if (opt.type === 'coord') {
    const [x, y] = opt.order === 'ba' ? [isl.b, isl.a] : [isl.a, isl.b]
    return [
      {
        label: 'Mệnh đề + dấu phẩy + FANBOYS + mệnh đề',
        parts: [T(cap(x)), P(','), T(' '), C(w), T(` ${y}`), P('.')],
      },
    ]
  }
  if (opt.type === 'sub') {
    const sub = opt.attach === 'a' ? isl.a : isl.b
    const main = opt.attach === 'a' ? isl.b : isl.a
    const v = [
      {
        label: opt.commaMain ? 'Mệnh đề chính + dấu phẩy + liên từ (ý đối lập)' : 'Mệnh đề chính + liên từ + mệnh đề phụ (không dấu phẩy)',
        parts: [T(cap(main)), ...(opt.commaMain ? [P(',')] : []), T(' '), C(w), T(` ${sub}`), P('.')],
      },
    ]
    if (!opt.noFront) {
      v.push({
        label: 'Mệnh đề phụ đứng trước → có dấu phẩy',
        parts: [C(cap(w)), T(` ${sub}`), P(','), T(` ${main}`), P('.')],
      })
    }
    return v
  }
  return [
    { label: 'Dấu chấm phẩy + trạng từ + dấu phẩy', parts: [T(cap(isl.a)), P(';'), T(' '), C(w), P(','), T(` ${isl.b}`), P('.')] },
    { label: 'Hoặc tách thành hai câu', parts: [T(cap(isl.a)), P('.'), T(' '), C(cap(w)), P(','), T(` ${isl.b}`), P('.')] },
  ]
}

function Marked({ text, color }) {
  return text
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith('[') ? (
        <mark key={i} className={styles.mk} style={color ? { '--tc': color } : undefined}>{p.slice(1, -1)}</mark>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
}

/* ------------------------------------------------------------------ */
/*  Signature — islands & bridges                                      */
/* ------------------------------------------------------------------ */

function BridgeArt({ state, type }) {
  const color = type ? TYPES[type].color : '#64748b'
  return (
    <svg className={styles.bridgeSvg} viewBox="0 0 200 120" aria-hidden="true" focusable="false">
      {state === 'none' && (
        <line x1="6" y1="58" x2="194" y2="58" className={styles.dash} />
      )}

      {state === 'ok' && type === 'coord' && (
        <g className={styles.build}>
          <rect x="0" y="54" width="200" height="9" rx="2" fill={color} />
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={8 + i * 18} y1="54" x2={8 + i * 18} y2="63" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" />
          ))}
          <line x1="0" y1="38" x2="200" y2="38" stroke={color} strokeWidth="3" />
          {Array.from({ length: 6 }, (_, i) => (
            <line key={i} x1={10 + i * 36} y1="38" x2={10 + i * 36} y2="54" stroke={color} strokeWidth="3" />
          ))}
          <line x1="40" y1="63" x2="40" y2="112" stroke={color} strokeWidth="5" />
          <line x1="160" y1="63" x2="160" y2="112" stroke={color} strokeWidth="5" />
        </g>
      )}

      {state === 'ok' && type === 'sub' && (
        <g className={styles.build}>
          <path d="M0 62 Q100 -10 200 62" fill="none" stroke={color} strokeWidth="6" />
          <rect x="0" y="54" width="200" height="9" rx="2" fill={color} />
          {[30, 55, 80, 100, 120, 145, 170].map((x) => {
            const t = x / 200
            const y = (1 - t) * (1 - t) * 62 + 2 * (1 - t) * t * -10 + t * t * 62
            return <line key={x} x1={x} y1={y + 2} x2={x} y2="54" stroke={color} strokeWidth="2" />
          })}
          <path d="M8 63 Q100 150 192 63" fill="none" stroke={color} strokeOpacity="0.35" strokeWidth="4" />
        </g>
      )}

      {state === 'ok' && type === 'adv' && (
        <g className={styles.build}>
          <rect x="34" y="8" width="8" height="104" fill={color} />
          <rect x="158" y="8" width="8" height="104" fill={color} />
          <path d="M0 50 Q20 14 38 10 Q100 60 162 10 Q180 14 200 50" fill="none" stroke={color} strokeWidth="2.5" />
          {[52, 70, 88, 100, 112, 130, 148].map((x) => {
            const t = (x - 38) / 124
            const y = (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * 60 + t * t * 10
            return <line key={x} x1={x} y1={y} x2={x} y2="54" stroke={color} strokeWidth="1.5" />
          })}
          <rect x="0" y="54" width="200" height="9" rx="2" fill={color} />
          <circle cx="100" cy="82" r="4" fill={color} />
          <circle cx="100" cy="96" r="4" fill={color} />
          <path d="M98 99 Q97 106 93 108" stroke={color} strokeWidth="3" fill="none" />
        </g>
      )}

      {state === 'bad' && (
        <g>
          <g className={styles.fallLeft}>
            <rect x="0" y="54" width="86" height="9" rx="2" fill={color} />
          </g>
          <g className={styles.fallRight}>
            <rect x="114" y="54" width="86" height="9" rx="2" fill={color} />
          </g>
          <g className={styles.splash}>
            <circle cx="92" cy="108" r="3" fill="#e0f2fe" />
            <circle cx="104" cy="104" r="2.5" fill="#e0f2fe" />
            <circle cx="112" cy="110" r="2" fill="#e0f2fe" />
          </g>
        </g>
      )}
    </svg>
  )
}

function Archipelago() {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const [found, setFound] = useState(() => ISLANDS.map(() => []))
  const isl = ISLANDS[idx]
  const options = [...isl.options].sort((x, y) => x.w.localeCompare(y.w))
  const opt = picked ? isl.options.find((o) => o.w === picked) : null
  const okCount = isl.options.filter((o) => o.ok).length

  const go = (d) => {
    setIdx((i) => (i + d + ISLANDS.length) % ISLANDS.length)
    setPicked(null)
  }

  const choose = (o) => {
    setPicked(o.w)
    if (o.ok && !found[idx].includes(o.w)) {
      setFound((f) => f.map((list, k) => (k === idx ? [...list, o.w] : list)))
    }
  }

  const state = !opt ? 'none' : opt.ok ? 'ok' : 'bad'

  return (
    <section className={styles.sea} aria-labelledby="cj-sea-title">
      <div className={styles.seaHead}>
        <div>
          <p className={styles.kicker}>Bridge builder</p>
          <h2 id="cj-sea-title" className={styles.seaTitle}>Nối hai hòn đảo</h2>
          <p className={styles.seaSub}>
            Mỗi hòn đảo là một mệnh đề. Chọn liên từ để bắc cầu — cầu chỉ đứng vững khi liên từ hợp nghĩa. Màu của cầu cho biết loại liên từ.
          </p>
        </div>
        <div className={styles.nav}>
          <Button shape="circle" icon={<LeftOutlined />} onClick={() => go(-1)} aria-label="Cặp đảo trước" />
          <span className={styles.navText}>
            Cặp {idx + 1}/{ISLANDS.length}
          </span>
          <Button shape="circle" icon={<RightOutlined />} onClick={() => go(1)} aria-label="Cặp đảo tiếp theo" />
        </div>
      </div>

      <div className={styles.water}>
        <div className={styles.island}>
          <span className={styles.islandTag}>Đảo A</span>
          <span className={styles.islandText}>{isl.a}</span>
        </div>
        <div className={`${styles.bridge} ${state === 'bad' ? styles.bridgeBad : ''}`}>
          <BridgeArt key={`${idx}-${picked}`} state={state} type={opt?.type} />
          <span
            className={`${styles.bridgeLabel} ${state === 'none' ? styles.bridgeEmpty : ''}`}
            style={opt ? { '--tc': TYPES[opt.type].color } : undefined}
          >
            {opt ? opt.w : '?'}
          </span>
        </div>
        <div className={styles.island}>
          <span className={styles.islandTag}>Đảo B</span>
          <span className={styles.islandText}>{isl.b}</span>
        </div>
      </div>

      <div className={styles.dock}>
        <p className={styles.dockLabel}>
          Bến cảng — chọn một liên từ
          <span className={styles.foundCount}>
            Đã bắc {found[idx].length}/{okCount} cầu đúng
          </span>
        </p>
        <div className={styles.planks} role="group" aria-label="Các liên từ">
          {options.map((o) => {
            const done = found[idx].includes(o.w)
            return (
              <button
                key={o.w}
                type="button"
                className={`${styles.plank} ${done ? styles.plankDone : ''}`}
                style={{ '--tc': TYPES[o.type].color, '--ts': TYPES[o.type].soft }}
                aria-pressed={picked === o.w}
                onClick={() => choose(o)}
              >
                {o.w}
                {done && <CheckCircleFilled className={styles.plankCheck} aria-label="đã tìm thấy" />}
              </button>
            )
          })}
        </div>
        <ul className={styles.typeKey} aria-label="Chú thích màu">
          {['coord', 'sub', 'adv'].map((k) => (
            <li key={k} style={{ '--tc': TYPES[k].color }}>
              <span className={styles.keyDot} aria-hidden="true" />
              {TYPES[k].vi}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.result} aria-live="polite">
        {!opt && <p className={styles.resultIdle}>Chưa có cầu. Hãy chọn một liên từ ở bến cảng.</p>}
        {opt && !opt.ok && (
          <div className={styles.resultBad}>
            <p className={styles.resultHead}>
              <CloseCircleFilled aria-hidden="true" /> Cầu sập! “{opt.w}” không hợp nghĩa ở đây.
            </p>
            <p className={styles.resultWhy}>{opt.vi}</p>
          </div>
        )}
        {opt && opt.ok && (
          <div className={styles.resultOk} style={{ '--tc': TYPES[opt.type].color, '--ts': TYPES[opt.type].soft }}>
            <p className={styles.resultHead}>
              <CheckCircleFilled aria-hidden="true" /> Cầu vững! <span className={styles.typeBadge}>{TYPES[opt.type].name} · {TYPES[opt.type].vi}</span>
            </p>
            {joinVariants(isl, opt).map((v) => (
              <div key={v.label} className={styles.variant}>
                <span className={styles.variantLabel}>{v.label}</span>
                <p className={styles.joined}>
                  {v.parts.map((p, i) => (
                    <span key={i} className={p.k === 'conn' ? styles.jConn : p.k === 'punct' ? styles.jPunct : undefined}>
                      {p.t}
                    </span>
                  ))}
                </p>
              </div>
            ))}
            <p className={styles.resultWhy}>{opt.vi}</p>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules (tabs)                                                       */
/* ------------------------------------------------------------------ */

function CoordinatingTab() {
  const t = TYPES.coord
  return (
    <div className={styles.tabBody}>
      <p className={styles.lead}>
        <strong>FANBOYS</strong> nối hai thành phần <em>ngang hàng</em> (hai từ, hai cụm, hoặc hai mệnh đề độc lập).
      </p>
      <ul className={styles.fanboys}>
        {FANBOYS.map((f) => (
          <li key={f.w} className={styles.fan} style={{ '--tc': t.color, '--ts': t.soft }}>
            <span className={styles.fanLetter} aria-hidden="true">{f.w[0].toUpperCase()}</span>
            <div className={styles.fanBody}>
              <p className={styles.fanWord}>
                <strong>{f.w}</strong> — {f.vi}
              </p>
              <p className={styles.fanEx}><Marked text={f.ex} color={t.color} /></p>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.callout}>
        <strong>Quy tắc dấu phẩy:</strong> đặt dấu phẩy TRƯỚC FANBOYS khi nối hai mệnh đề độc lập (mỗi bên có chủ ngữ + động từ):
        <em> It was late<b className={styles.punctHi}>,</b> so we took a taxi.</em> Không cần dấu phẩy khi chỉ nối hai từ/cụm từ: <em>tea and coffee</em>,{' '}
        <em>She sang and danced.</em>
      </div>
    </div>
  )
}

function SubordinatingTab() {
  const t = TYPES.sub
  return (
    <div className={styles.tabBody}>
      <p className={styles.lead}>
        Liên từ phụ thuộc mở đầu một <em>mệnh đề phụ</em> — mệnh đề này không đứng một mình được, phải gắn vào mệnh đề chính.
      </p>
      <ul className={styles.subList}>
        {SUBORDINATORS.map((s) => (
          <li key={s.w} className={styles.subItem}>
            <div className={styles.subHead}>
              <code className={styles.subWord} style={{ '--tc': t.color }}>{s.w}</code>
              <span className={styles.subGroup}>{s.group}</span>
            </div>
            <p className={styles.subEx}><Marked text={s.ex} color={t.color} /></p>
            {s.note && <p className={styles.subNote}>{s.note}</p>}
          </li>
        ))}
      </ul>
      <div className={styles.punctRules}>
        <div className={styles.punctRule}>
          <span className={styles.prTag}>Mệnh đề phụ trước</span>
          <p><span className={styles.jConn} style={{ '--tc': t.color }}>Because</span> I was ill<b className={styles.punctHi}>,</b> I stayed at home.</p>
        </div>
        <div className={styles.punctRule}>
          <span className={styles.prTag}>Mệnh đề chính trước</span>
          <p>I stayed at home <span className={styles.jConn} style={{ '--tc': t.color }}>because</span> I was ill. <small>(thường không có dấu phẩy)</small></p>
        </div>
      </div>
      <div className={styles.callout}>
        <strong>Tương lai trong mệnh đề thời gian / điều kiện:</strong> sau when, until, as soon as, unless, in case… dùng hiện tại đơn, không dùng will:{' '}
        <em>I’ll call you when I arrive.</em> (✗ when I will arrive)
      </div>
    </div>
  )
}

function CorrelativeTab() {
  const t = TYPES.correl
  return (
    <div className={styles.tabBody}>
      <p className={styles.lead}>
        Liên từ tương quan đi thành <em>cặp</em> — như hai trụ cầu. Hai vế được nối phải <strong>cùng dạng</strong> (danh từ – danh từ, tính từ – tính từ, động từ – động từ).
      </p>
      <ul className={styles.pairs}>
        {CORRELATIVES.map((c) => (
          <li key={c.pair.join('-')} className={styles.pair} style={{ '--tc': t.color, '--ts': t.soft }}>
            <div className={styles.pillars}>
              <span className={styles.pillar}>{c.pair[0]}</span>
              <span className={styles.span} aria-hidden="true" />
              <span className={styles.pillar}>{c.pair[1]}</span>
            </div>
            <p className={styles.pairVi}>{c.vi}</p>
            <p className={styles.pairEx}><Marked text={c.ex} color={t.color} /></p>
            <p className={styles.pairNote}>{c.note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AdverbTab() {
  const t = TYPES.adv
  return (
    <div className={styles.tabBody}>
      <p className={styles.lead}>
        <strong>however, therefore, moreover…</strong> KHÔNG phải liên từ mà là <em>trạng từ liên kết</em>: chúng không thể nối hai mệnh đề chỉ bằng dấu phẩy.
      </p>
      <div className={styles.patterns}>
        <p className={styles.pattern}>
          S + V<b className={styles.punctHi}>;</b> <span className={styles.jConn} style={{ '--tc': t.color }}>however</span>
          <b className={styles.punctHi}>,</b> S + V.
        </p>
        <p className={styles.pattern}>
          S + V<b className={styles.punctHi}>.</b> <span className={styles.jConn} style={{ '--tc': t.color }}>However</span>
          <b className={styles.punctHi}>,</b> S + V.
        </p>
        <p className={styles.pattern}>
          S<b className={styles.punctHi}>,</b> <span className={styles.jConn} style={{ '--tc': t.color }}>however</span>
          <b className={styles.punctHi}>,</b> V… <small>(chen giữa câu)</small>
        </p>
      </div>
      <ul className={styles.linkers}>
        {LINKERS.map((l) => (
          <li key={l.w} className={styles.linker} style={{ '--tc': t.color, '--ts': t.soft }}>
            <strong>{l.w}</strong>
            <span>{l.vi}</span>
            <small>{l.role}</small>
          </li>
        ))}
      </ul>
      <div className={styles.compare}>
        <p className={styles.cmpBad}><CloseCircleFilled aria-hidden="true" /> The test was hard, however I passed.</p>
        <p className={styles.cmpGood}><CheckCircleFilled aria-hidden="true" /> The test was hard; however, I passed.</p>
        <p className={styles.cmpGood}><CheckCircleFilled aria-hidden="true" /> The test was hard, but I passed.</p>
      </div>
    </div>
  )
}

function ClauseVsNounTab() {
  return (
    <div className={styles.tabBody}>
      <p className={styles.lead}>
        Cùng nghĩa nhưng khác loại từ đi sau: <strong>liên từ + mệnh đề (S + V)</strong> vs <strong>giới từ + danh từ / V-ing</strong>.
      </p>
      <div className={styles.cvn}>
        <div className={`${styles.cvnHead} ${styles.cvnRow}`} aria-hidden="true">
          <span />
          <span>+ mệnh đề (S + V)</span>
          <span>+ danh từ / V-ing</span>
        </div>
        {CLAUSE_VS_NOUN.map((r) => (
          <div key={r.meaning} className={styles.cvnRow}>
            <span className={styles.cvnMeaning}>{r.meaning}</span>
            <div className={styles.cvnCell}>
              <code className={styles.cvnWord} style={{ '--tc': TYPES.sub.color }}>{r.clause.w}</code>
              <p><Marked text={r.clause.ex} color={TYPES.sub.color} /></p>
            </div>
            <div className={styles.cvnCell}>
              <code className={styles.cvnWord} style={{ '--tc': '#475569' }}>{r.noun.w}</code>
              <p><Marked text={r.noun.ex} color="#475569" /></p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.callout}>
        <strong>Mẹo:</strong> muốn dùng despite / in spite of với mệnh đề, thêm <em>the fact that</em>:{' '}
        <em>Despite the fact that it rained, we went out.</em>
      </div>
    </div>
  )
}

function Rules() {
  const items = [
    { key: 'coord', label: 'FANBOYS', children: <CoordinatingTab /> },
    { key: 'sub', label: 'Phụ thuộc', children: <SubordinatingTab /> },
    { key: 'correl', label: 'Tương quan', children: <CorrelativeTab /> },
    { key: 'adv', label: 'however / therefore', children: <AdverbTab /> },
    { key: 'cvn', label: 'because vs because of', children: <ClauseVsNounTab /> },
  ]
  return (
    <section className={styles.panel} aria-labelledby="cj-rules-title">
      <h2 id="cj-rules-title" className={styles.panelTitle}>Bản đồ liên từ</h2>
      <p className={styles.panelSub}>Bốn nhóm từ nối và cặp dễ nhầm nhất.</p>
      <Tabs items={items} className={styles.tabs} />
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.panel} aria-labelledby="cj-mistakes-title">
      <h2 id="cj-mistakes-title" className={styles.panelTitle}>Lỗi hay gặp</h2>
      <p className={styles.panelSub}>Nhiều lỗi đến từ việc dịch từng chữ từ tiếng Việt.</p>
      <ul className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <li key={m.wrong} className={styles.mistake}>
            <p className={styles.wrong}>
              <CloseCircleFilled aria-hidden="true" /> <span><span className={styles.srOnly}>Sai: </span>{m.wrong}</span>
            </p>
            <p className={styles.right}>
              <CheckCircleFilled aria-hidden="true" /> <span><span className={styles.srOnly}>Đúng: </span>{m.right}</span>
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

export default function Conjunctions() {
  return (
    <div className={styles.page}>
      <Archipelago />
      <Rules />
      <Mistakes />
    </div>
  )
}
