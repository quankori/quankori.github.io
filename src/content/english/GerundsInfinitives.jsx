import { useState } from 'react'
import { Button } from 'antd'
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  FieldTimeOutlined,
  ReloadOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './GerundsInfinitives.module.css'

/* ------------------------------------------------------------------ */
/*  Data — {braces} highlight the verb pattern in examples            */
/* ------------------------------------------------------------------ */

const DOORS = [
  { key: 'ing', sign: 'V-ing', hint: 'chỉ đi với V-ing' },
  { key: 'both', sign: 'cả hai', hint: 'đi được với cả V-ing và to-V' },
  { key: 'to', sign: 'to-V', hint: 'chỉ đi với to-V' },
]

const POOL = [
  // V-ing door
  { verb: 'enjoy', door: 'ing', prompt: 'I really enjoy ___ for my friends.', base: 'cook', fill: 'cooking', why: 'enjoy + V-ing: thích làm gì.' },
  { verb: 'avoid', door: 'ing', prompt: 'Try to avoid ___ late at night.', base: 'eat', fill: 'eating', why: 'avoid + V-ing: tránh làm gì.' },
  { verb: 'finish', door: 'ing', prompt: 'Have you finished ___ the report?', base: 'write', fill: 'writing', why: 'finish + V-ing: làm xong việc gì.' },
  { verb: 'mind', door: 'ing', prompt: 'Would you mind ___ the door?', base: 'close', fill: 'closing', why: 'mind + V-ing: phiền / ngại làm gì.' },
  { verb: 'suggest', door: 'ing', prompt: 'She suggested ___ a taxi.', base: 'take', fill: 'taking', why: 'suggest + V-ing (hoặc suggest that…). Không dùng ✗ suggest sb to do.' },
  { verb: 'consider', door: 'ing', prompt: 'We’re considering ___ to Da Nang.', base: 'move', fill: 'moving', why: 'consider + V-ing: cân nhắc làm gì.' },
  { verb: 'keep', door: 'ing', prompt: 'He keeps ___ me!', base: 'interrupt', fill: 'interrupting', why: 'keep + V-ing: cứ liên tục làm gì.' },
  { verb: 'practise', door: 'ing', prompt: 'You should practise ___ English every day.', base: 'speak', fill: 'speaking', why: 'practise + V-ing: luyện tập làm gì.' },
  { verb: 'deny', door: 'ing', prompt: 'The suspect denied ___ the money.', base: 'steal', fill: 'stealing', why: 'deny + V-ing: phủ nhận đã làm gì.' },
  { verb: 'risk', door: 'ing', prompt: 'Don’t risk ___ your job.', base: 'lose', fill: 'losing', why: 'risk + V-ing: liều làm gì / có nguy cơ.' },
  { verb: 'can’t help', door: 'ing', prompt: 'I can’t help ___ at his jokes.', base: 'laugh', fill: 'laughing', why: 'can’t help + V-ing: không nhịn được, không thể không làm.' },
  { verb: 'admit', door: 'ing', prompt: 'He admitted ___ a mistake.', base: 'make', fill: 'making', why: 'admit + V-ing: thừa nhận đã làm gì.' },
  { verb: 'miss', door: 'ing', prompt: 'I miss ___ by the sea.', base: 'live', fill: 'living', why: 'miss + V-ing: nhớ (tiếc) việc từng làm.' },
  { verb: 'give up', door: 'ing', prompt: 'He gave up ___ two years ago.', base: 'smoke', fill: 'smoking', why: 'give up + V-ing: từ bỏ việc gì.' },
  { verb: 'imagine', door: 'ing', prompt: 'Can you imagine ___ on Mars?', base: 'live', fill: 'living', why: 'imagine + V-ing: tưởng tượng làm gì.' },
  // to-V door
  { verb: 'want', door: 'to', prompt: 'I want ___ Japanese.', base: 'learn', fill: 'to learn', why: 'want + to V: muốn làm gì.' },
  { verb: 'decide', door: 'to', prompt: 'They decided ___ the house.', base: 'sell', fill: 'to sell', why: 'decide + to V: quyết định làm gì.' },
  { verb: 'hope', door: 'to', prompt: 'We hope ___ you again soon.', base: 'see', fill: 'to see', why: 'hope + to V: hy vọng làm gì.' },
  { verb: 'plan', door: 'to', prompt: 'I’m planning ___ Hue next month.', base: 'visit', fill: 'to visit', why: 'plan + to V: lên kế hoạch làm gì.' },
  { verb: 'agree', door: 'to', prompt: 'She agreed ___ me with my CV.', base: 'help', fill: 'to help', why: 'agree + to V: đồng ý làm gì.' },
  { verb: 'refuse', door: 'to', prompt: 'He refused ___ the question.', base: 'answer', fill: 'to answer', why: 'refuse + to V: từ chối làm gì.' },
  { verb: 'promise', door: 'to', prompt: 'I promise ___ you tonight.', base: 'call', fill: 'to call', why: 'promise + to V: hứa làm gì.' },
  { verb: 'afford', door: 'to', prompt: 'We can’t afford ___ a new car.', base: 'buy', fill: 'to buy', why: 'can / can’t afford + to V: đủ / không đủ tiền (điều kiện) làm gì.' },
  { verb: 'manage', door: 'to', prompt: 'Did you manage ___ on time?', base: 'finish', fill: 'to finish', why: 'manage + to V: xoay xở làm được (dù khó).' },
  { verb: 'offer', door: 'to', prompt: 'He offered ___ me home.', base: 'drive', fill: 'to drive', why: 'offer + to V: đề nghị (sẵn lòng) làm gì.' },
  { verb: 'expect', door: 'to', prompt: 'I expect ___ from them this week.', base: 'hear', fill: 'to hear', why: 'expect + to V: mong đợi, dự kiến làm gì.' },
  { verb: 'learn', door: 'to', prompt: 'She learned ___ when she was six.', base: 'swim', fill: 'to swim', why: 'learn + to V: học (cách) làm gì.' },
  { verb: 'would like', door: 'to', prompt: 'I’d like ___ a table for two.', base: 'book', fill: 'to book', why: 'would like + to V: muốn (lịch sự). Khác với like + V-ing.' },
  { verb: 'pretend', door: 'to', prompt: 'He pretended ___ asleep.', base: 'be', fill: 'to be', why: 'pretend + to V: giả vờ làm gì.' },
  // both door
  { verb: 'begin', door: 'both', prompt: 'It began ___ at noon.', base: 'rain', fill: 'raining / to rain', why: 'begin + V-ing / to V: nghĩa gần như không đổi.' },
  { verb: 'start', door: 'both', prompt: 'She started ___ English at ten.', base: 'learn', fill: 'learning / to learn', why: 'start + V-ing / to V: nghĩa không đổi.' },
  { verb: 'continue', door: 'both', prompt: 'Prices continue ___.', base: 'rise', fill: 'rising / to rise', why: 'continue + V-ing / to V: nghĩa không đổi.' },
  { verb: 'like', door: 'both', prompt: 'I like ___ before bed.', base: 'read', fill: 'reading / to read', why: 'like / love / hate / prefer + V-ing hoặc to V. Nhưng would like chỉ + to V.' },
  { verb: 'prefer', door: 'both', prompt: 'I prefer ___ from home.', base: 'work', fill: 'working / to work', why: 'prefer + V-ing / to V. Cấu trúc so sánh: prefer doing A to doing B.' },
  { verb: 'remember', door: 'both', prompt: 'I remember ___ the door. / Remember ___ the door!', base: 'lock', fill: 'locking / to lock', why: 'Cả hai nhưng ĐỔI NGHĨA: remember doing = nhớ đã làm; remember to do = nhớ để làm. Xem phần dòng thời gian bên dưới.' },
  { verb: 'stop', door: 'both', prompt: 'He stopped ___. / He stopped ___ a coffee.', base: 'smoke / buy', fill: 'smoking / to buy', why: 'Cả hai nhưng ĐỔI NGHĨA: stop doing = bỏ, ngừng hẳn; stop to do = dừng lại để làm việc khác.' },
  { verb: 'try', door: 'both', prompt: 'Try ___ the window. / I tried ___ the jar.', base: 'open', fill: 'opening / to open', why: 'Cả hai nhưng ĐỔI NGHĨA: try doing = thử xem sao; try to do = cố gắng làm.' },
  { verb: 'forget', door: 'both', prompt: 'I’ll never forget ___ her. / Don’t forget ___ me.', base: 'meet / call', fill: 'meeting / to call', why: 'Cả hai nhưng ĐỔI NGHĨA: forget doing = quên đã làm; forget to do = quên (nên không) làm.' },
]

const ROUND_MIX = { ing: 5, to: 5, both: 2 }

const MEANING = [
  {
    verb: 'remember',
    ing: { form: 'remember + V-ing', meaning: 'Nhớ lại một việc ĐÃ làm.', ex: 'I remember {locking} the door.', vi: 'Tôi nhớ là đã khóa cửa rồi.', events: [{ label: 'khóa cửa', kind: 'act' }, { label: 'nhớ lại', kind: 'verb' }] },
    to: { form: 'remember + to V', meaning: 'Nhớ ra để làm (việc chưa làm).', ex: 'Remember {to lock} the door!', vi: 'Nhớ khóa cửa nhé!', events: [{ label: 'nhớ ra', kind: 'verb' }, { label: 'khóa cửa', kind: 'act' }] },
  },
  {
    verb: 'forget',
    ing: { form: 'forget + V-ing', meaning: 'Quên một việc đã làm (thường: never forget).', ex: 'I’ll never forget {meeting} her.', vi: 'Tôi sẽ không bao giờ quên lần gặp cô ấy.', events: [{ label: 'gặp cô ấy', kind: 'act' }, { label: 'không quên', kind: 'verb' }] },
    to: { form: 'forget + to V', meaning: 'Quên làm việc cần làm → nên không làm.', ex: 'I forgot {to send} the email.', vi: 'Tôi quên gửi email.', events: [{ label: 'quên', kind: 'verb' }, { label: 'gửi email', kind: 'miss' }] },
  },
  {
    verb: 'stop',
    ing: { form: 'stop + V-ing', meaning: 'Ngừng hẳn việc đang làm / bỏ thói quen.', ex: 'He stopped {smoking} last year.', vi: 'Anh ấy bỏ thuốc từ năm ngoái.', events: [{ label: 'hút thuốc', kind: 'act' }, { label: 'dừng hẳn', kind: 'verb' }] },
    to: { form: 'stop + to V', meaning: 'Dừng việc đang làm lại ĐỂ làm việc khác.', ex: 'He stopped {to buy} a coffee.', vi: 'Anh ấy dừng lại để mua cà phê.', events: [{ label: 'đang lái xe', kind: 'act' }, { label: 'dừng lại', kind: 'verb' }, { label: 'mua cà phê', kind: 'act' }] },
  },
  {
    verb: 'try',
    ing: { form: 'try + V-ing', meaning: 'Thử làm (dễ làm được) xem có hiệu quả không.', ex: 'Try {drinking} ginger tea for your cough.', vi: 'Thử uống trà gừng xem có đỡ ho không.', events: [{ label: 'thử uống trà', kind: 'act' }, { label: 'có hiệu quả?', kind: 'verb' }] },
    to: { form: 'try + to V', meaning: 'Cố gắng làm một việc khó (có thể không làm được).', ex: 'I tried {to open} the jar, but I couldn’t.', vi: 'Tôi cố mở cái lọ nhưng không được.', events: [{ label: 'cố gắng', kind: 'verb' }, { label: 'mở lọ', kind: 'miss' }] },
  },
  {
    verb: 'regret',
    ing: { form: 'regret + V-ing', meaning: 'Hối hận vì đã làm gì.', ex: 'I regret {saying} that to her.', vi: 'Tôi hối hận vì đã nói điều đó với cô ấy.', events: [{ label: 'đã nói', kind: 'act' }, { label: 'hối hận', kind: 'verb' }] },
    to: { form: 'regret + to V', meaning: 'Lấy làm tiếc phải (thông báo tin không vui), dùng với say / tell / inform.', ex: 'We regret {to inform} you that the flight is cancelled.', vi: 'Chúng tôi rất tiếc phải thông báo chuyến bay bị hủy.', events: [{ label: 'lấy làm tiếc', kind: 'verb' }, { label: 'thông báo', kind: 'act' }] },
  },
  {
    verb: 'mean',
    ing: { form: 'mean + V-ing', meaning: 'Có nghĩa là, kéo theo việc gì.', ex: 'The new job means {moving} to Hanoi.', vi: 'Công việc mới đồng nghĩa với việc chuyển ra Hà Nội.', events: [{ label: 'nhận việc mới', kind: 'verb' }, { label: 'phải chuyển nhà', kind: 'act' }] },
    to: { form: 'mean + to V', meaning: 'Định, có ý định làm gì.', ex: 'I meant {to call} you, but I forgot.', vi: 'Tôi định gọi cho bạn nhưng lại quên.', events: [{ label: 'định', kind: 'verb' }, { label: 'gọi điện', kind: 'miss' }] },
  },
  {
    verb: 'go on',
    ing: { form: 'go on + V-ing', meaning: 'Tiếp tục CÙNG một việc.', ex: 'She went on {talking} for an hour.', vi: 'Cô ấy cứ nói tiếp suốt một tiếng.', events: [{ label: 'nói', kind: 'act' }, { label: 'tiếp tục', kind: 'verb' }, { label: 'vẫn nói', kind: 'act' }] },
    to: { form: 'go on + to V', meaning: 'Chuyển sang làm việc KHÁC tiếp theo.', ex: 'After the intro, he went on {to explain} the rules.', vi: 'Sau phần giới thiệu, anh ấy chuyển sang giải thích luật.', events: [{ label: 'giới thiệu', kind: 'act' }, { label: 'chuyển tiếp', kind: 'verb' }, { label: 'giải thích luật', kind: 'act' }] },
  },
  {
    verb: 'need',
    ing: { form: 'need + V-ing', meaning: 'Nghĩa BỊ ĐỘNG: cần được làm (chủ ngữ là vật).', ex: 'The car needs {washing}.', vi: 'Cái xe cần được rửa. (= needs to be washed)', events: [{ label: 'cái xe', kind: 'verb' }, { label: 'được rửa', kind: 'act' }] },
    to: { form: 'need + to V', meaning: 'Nghĩa CHỦ ĐỘNG: chủ ngữ cần phải làm.', ex: 'I need {to wash} the car.', vi: 'Tôi cần rửa xe.', events: [{ label: 'tôi', kind: 'verb' }, { label: 'rửa xe', kind: 'act' }] },
  },
]

const LISTS = [
  {
    key: 'ing',
    title: 'Chỉ + V-ing',
    verbs: 'enjoy, avoid, finish, mind, suggest, consider, keep, practise, deny, risk, can’t help, admit, miss, imagine, give up, postpone, delay, dislike, recommend, can’t stand, it’s worth, it’s no use',
  },
  {
    key: 'to',
    title: 'Chỉ + to-V',
    verbs: 'want, decide, hope, plan, agree, refuse, promise, afford, manage, offer, expect, learn, would like, pretend, choose, seem, fail, arrange, threaten, deserve, tend, intend',
  },
  {
    key: 'both',
    title: 'Cả hai',
    verbs: 'Nghĩa gần như không đổi: begin, start, continue, like, love, hate, prefer. Đổi nghĩa: stop, remember, forget, try, regret, mean, go on, need.',
  },
]

const PATTERNS = [
  {
    key: 'objTo',
    title: 'Verb + O + to-V',
    formula: 'want / ask / tell / allow / advise / encourage / expect / invite / remind / warn / persuade + sb + to V',
    body: 'Dùng khi muốn / yêu cầu / cho phép NGƯỜI KHÁC làm gì. Phủ định: + sb + not to V.',
    examples: [
      { en: 'I want {you to help} me.', vi: 'Tôi muốn bạn giúp tôi. (✗ I want that you help me)' },
      { en: 'The doctor advised {him to rest}.', vi: 'Bác sĩ khuyên anh ấy nghỉ ngơi.' },
      { en: 'She told {me not to worry}.', vi: 'Cô ấy bảo tôi đừng lo.' },
    ],
  },
  {
    key: 'bare',
    title: 'make / let / have + O + V (bare)',
    formula: 'make / let / have + sb + V nguyên mẫu  ·  help + sb + (to) V',
    body: 'make = bắt, let = để cho, have = nhờ / sai. Không có “to”. Khi chuyển sang bị động, make cần “to”: be made to do. let không có bị động → dùng be allowed to.',
    examples: [
      { en: 'My mum {made me clean} my room.', vi: 'Mẹ bắt tôi dọn phòng.' },
      { en: 'Let {me help} you.', vi: 'Để tôi giúp bạn.' },
      { en: 'I’ll {have the technician check} it.', vi: 'Tôi sẽ nhờ kỹ thuật viên kiểm tra.' },
      { en: 'I {was made to wait} for an hour.', vi: 'Tôi bị bắt chờ một tiếng.' },
    ],
  },
  {
    key: 'senses',
    title: 'see / hear / watch + O + V / V-ing',
    formula: 'see / hear / watch / notice / feel + sb + V (toàn bộ) / V-ing (đang diễn ra)',
    body: 'V nguyên mẫu: chứng kiến TOÀN BỘ hành động từ đầu đến cuối. V-ing: chỉ thấy MỘT PHẦN, lúc hành động đang diễn ra.',
    examples: [
      { en: 'I saw {him cross} the road.', vi: 'Tôi thấy anh ấy băng qua đường (từ đầu đến cuối).' },
      { en: 'I saw {him crossing} the road.', vi: 'Tôi thấy anh ấy đang băng qua đường.' },
      { en: 'We heard {someone singing} next door.', vi: 'Chúng tôi nghe thấy ai đó đang hát ở nhà bên.' },
    ],
  },
  {
    key: 'prep',
    title: 'Giới từ + V-ing',
    formula: 'interested in · good at · afraid of · tired of · instead of · before / after · without · look forward to · object to',
    body: 'Sau giới từ luôn là V-ing. Bẫy lớn: “to” trong look forward to, be / get used to, object to, when it comes to là GIỚI TỪ, không phải to của to-V.',
    examples: [
      { en: 'She’s interested {in learning} photography.', vi: 'Cô ấy thích học nhiếp ảnh.' },
      { en: 'I’m looking forward {to hearing} from you.', vi: 'Tôi mong sớm nhận được hồi âm của bạn.' },
      { en: 'He left {without saying} goodbye.', vi: 'Anh ấy đi mà không chào.' },
    ],
  },
  {
    key: 'usedTo',
    title: 'used to do ≠ be used to doing',
    formula: 'used to + V  ·  be / get used to + V-ing',
    body: 'used to + V: thói quen / trạng thái trong quá khứ, nay không còn. be used to + V-ing: đã quen với việc gì. get used to + V-ing: dần quen với việc gì.',
    examples: [
      { en: 'I {used to get up} at 5 am.', vi: 'Tôi từng dậy lúc 5 giờ sáng (giờ không còn).' },
      { en: 'I’m {used to getting up} early.', vi: 'Tôi đã quen dậy sớm.' },
      { en: 'You’ll soon {get used to driving} on the left.', vi: 'Bạn sẽ sớm quen lái xe bên trái.' },
    ],
  },
  {
    key: 'subject',
    title: 'V-ing làm chủ ngữ · It + adj + to-V',
    formula: 'V-ing + V(số ít)…  ·  It + be + adj + (for sb) + to V',
    body: 'Danh động từ làm chủ ngữ, động từ chia số ít. Cấu trúc It + adj + to-V tự nhiên hơn khi cụm to-V dài. Ngoài ra: It’s no use / no good / worth + V-ing.',
    examples: [
      { en: '{Swimming} is good for your back.', vi: 'Bơi tốt cho lưng.' },
      { en: '{It is important to sleep} well before an exam.', vi: 'Ngủ ngon trước kỳ thi là điều quan trọng.' },
      { en: '{It’s hard for me to understand} his accent.', vi: 'Tôi khó hiểu giọng của anh ấy.' },
      { en: 'This film is {worth watching}.', vi: 'Bộ phim này đáng xem.' },
    ],
  },
  {
    key: 'tooEnough',
    title: 'too / enough + to-V',
    formula: 'too + adj / adv + (for sb) + to V  ·  adj / adv + enough + to V  ·  enough + N + to V',
    body: 'too = quá… đến nỗi không thể. enough = đủ… để. Lưu ý: enough đứng SAU tính từ nhưng TRƯỚC danh từ. Không lặp lại tân ngữ ở cuối câu.',
    examples: [
      { en: 'The tea is {too hot to drink}.', vi: 'Trà nóng quá, không uống được. (✗ to drink it)' },
      { en: 'She’s {old enough to vote}.', vi: 'Cô ấy đủ tuổi để bầu cử.' },
      { en: 'We don’t have {enough time to finish}.', vi: 'Chúng ta không đủ thời gian để làm xong.' },
    ],
  },
]

const MISTAKES = [
  { bad: 'I enjoy to swim in the sea.', good: 'I enjoy swimming in the sea.', why: 'enjoy chỉ đi với V-ing.' },
  { bad: 'She decided going abroad.', good: 'She decided to go abroad.', why: 'decide chỉ đi với to-V.' },
  { bad: 'I look forward to hear from you.', good: 'I look forward to hearing from you.', why: '“to” ở đây là giới từ → V-ing.' },
  { bad: 'My mum made me to clean my room.', good: 'My mum made me clean my room.', why: 'make + O + V nguyên mẫu (không “to”).' },
  { bad: 'I want that you help me.', good: 'I want you to help me.', why: 'want + O + to V, không dùng mệnh đề that.' },
  { bad: 'I’m used to get up early.', good: 'I’m used to getting up early.', why: 'be used to + V-ing = đã quen với.' },
  { bad: 'He suggested me to see a doctor.', good: 'He suggested seeing a doctor. / He suggested (that) I see a doctor.', why: 'suggest không đi với sb + to V.' },
  { bad: 'The box is too heavy for me to lift it.', good: 'The box is too heavy for me to lift.', why: 'Chủ ngữ đã là tân ngữ của lift → không lặp lại “it”.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeDeck() {
  const picks = Object.entries(ROUND_MIX).flatMap(([door, n]) =>
    shuffle(POOL.filter((c) => c.door === door)).slice(0, n),
  )
  return shuffle(picks)
}

function Hl({ text, tone }) {
  return text
    .split(/(\{[^}]+\})/g)
    .filter(Boolean)
    .map((p, i) =>
      p.startsWith('{') ? (
        <mark key={i} className={`${styles.hl} ${tone ? styles[`hl_${tone}`] : ''}`}>{p.slice(1, -1)}</mark>
      ) : (
        <span key={i}>{p}</span>
      ),
    )
}

function Blank({ text, fill }) {
  const parts = text.split('___')
  const blanks = parts.length - 1
  const fills = fill ? (blanks > 1 ? fill.split(' / ') : [fill]) : []
  return parts.map((p, i) => (
    <span key={i}>
      {p}
      {i < blanks && (
        <span className={fill ? styles.slotFilled : styles.slot}>{fill ? fills[i] ?? fill : '___'}</span>
      )}
    </span>
  ))
}

const doorName = (key) => DOORS.find((d) => d.key === key).sign

/* ------------------------------------------------------------------ */
/*  Signature: three doors                                             */
/* ------------------------------------------------------------------ */

function DoorGame() {
  const [deck, setDeck] = useState(makeDeck)
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [rooms, setRooms] = useState({ ing: [], both: [], to: [] })
  const [score, setScore] = useState(0)

  const done = index >= deck.length
  const card = deck[index]
  const correct = picked !== null && card && picked === card.door

  const choose = (door) => {
    if (picked !== null || done) return
    setPicked(door)
    if (door === card.door) {
      setScore((s) => s + 1)
    }
    setRooms((r) => ({ ...r, [card.door]: [...r[card.door], card.verb] }))
  }

  const next = () => {
    setPicked(null)
    setIndex((i) => i + 1)
  }

  const restart = () => {
    setDeck(makeDeck())
    setIndex(0)
    setPicked(null)
    setRooms({ ing: [], both: [], to: [] })
    setScore(0)
  }

  let cardCls = styles.card
  if (picked !== null) cardCls += correct ? ` ${styles[`fly_${picked}`]}` : ` ${styles.shake}`

  return (
    <section className={styles.hall} aria-labelledby="gi-hall-title">
      <header className={styles.hallHead}>
        <div>
          <h2 id="gi-hall-title" className={styles.hallTitle}>Hành lang ba cánh cửa</h2>
          <p className={styles.hallSub}>
            Mỗi động từ chỉ mở được đúng cửa của nó. Chọn cửa cho tấm thẻ: theo sau là <strong>V-ing</strong>, <strong>to-V</strong> hay <strong>cả hai</strong>?
          </p>
        </div>
        <div className={styles.tally} aria-live="polite">
          <span className={styles.tallyNum}>{score}</span>
          <span className={styles.tallyOf}>/ {deck.length} đúng</span>
        </div>
      </header>

      <div className={styles.stage}>
        {done ? (
          <div className={styles.finish} role="status">
            <p className={styles.finishScore}>{score}/{deck.length}</p>
            <p className={styles.finishText}>
              {score === deck.length
                ? 'Không cửa nào làm khó được bạn!'
                : score >= deck.length - 3
                  ? 'Gần như hoàn hảo! Chơi ván mới để gặp các động từ khác.'
                  : 'Xem lại danh sách động từ bên dưới rồi thử ván mới nhé.'}
            </p>
            <Button type="primary" icon={<ReloadOutlined />} onClick={restart} className={styles.doorBtn}>
              Ván mới
            </Button>
          </div>
        ) : (
          <div className={styles.cardSlot}>
            <p className={styles.cardCount}>Thẻ {index + 1}/{deck.length}</p>
            <div key={index} className={cardCls}>
              <span className={styles.cardVerb}>{card.verb}</span>
              <span className={styles.cardPrompt}>
                <Blank text={card.prompt} fill={picked !== null ? card.fill : null} />
              </span>
              <span className={styles.cardBase}>({card.base})</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.doors} role="group" aria-label="Chọn cửa">
        {DOORS.map((d) => {
          const isAnswer = picked !== null && card && d.key === card.door
          const isWrong = picked === d.key && !correct
          let cls = `${styles.door} ${styles[`door_${d.key}`]}`
          if (isAnswer) cls += ` ${styles.doorOpen}`
          if (isWrong) cls += ` ${styles.doorWrong}`
          return (
            <button
              key={d.key}
              type="button"
              className={cls}
              onClick={() => choose(d.key)}
              disabled={picked !== null || done}
              aria-label={`Cửa ${d.sign} — ${d.hint}`}
            >
              <span className={styles.doorSign}>{d.sign}</span>
              <span className={styles.frame}>
                <span className={styles.light} />
                <span className={styles.panel}>
                  <span className={styles.panelInset} />
                  <span className={styles.panelInset} />
                  <span className={styles.knob} />
                </span>
              </span>
              <span className={styles.doorCount}>{rooms[d.key].length} thẻ</span>
            </button>
          )
        })}
      </div>
      <div className={styles.floor} aria-hidden="true" />

      {picked !== null && card && (
        <div className={correct ? styles.fbOk : styles.fbBad} role="status">
          <p className={styles.fbHead}>
            {correct ? <CheckCircleFilled aria-hidden="true" /> : <CloseCircleFilled aria-hidden="true" />}{' '}
            {correct ? 'Đúng cửa!' : `Chưa đúng — “${card.verb}” thuộc cửa ${doorName(card.door)}.`}
          </p>
          <p className={styles.fbWhy}>{card.why}</p>
          <Button type="primary" onClick={next} icon={<ArrowRightOutlined />} iconPlacement="end" className={styles.doorBtn} autoFocus>
            {index === deck.length - 1 ? 'Xem kết quả' : 'Thẻ tiếp theo'}
          </Button>
        </div>
      )}

      <div className={styles.rooms}>
        {DOORS.map((d) => (
          <div key={d.key} className={`${styles.room} ${styles[`room_${d.key}`]}`}>
            <span className={styles.roomTitle}>Sau cửa {d.sign}</span>
            <span className={styles.roomVerbs}>
              {rooms[d.key].length ? rooms[d.key].map((v) => <span key={v} className={styles.roomChip}>{v}</span>) : <em>trống</em>}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.hallFoot}>
        <Button icon={<ReloadOutlined />} onClick={restart}>
          Xáo bài lại
        </Button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Verb lists                                                         */
/* ------------------------------------------------------------------ */

function VerbLists() {
  return (
    <section aria-labelledby="gi-lists-title">
      <h2 id="gi-lists-title" className={styles.sectionTitle}>Danh sách động từ cần thuộc</h2>
      <div className={styles.lists}>
        {LISTS.map((l) => (
          <article key={l.key} className={`${styles.listCard} ${styles[`room_${l.key}`]}`}>
            <h3 className={styles.listTitle}>{l.title}</h3>
            <p className={styles.listVerbs}>{l.verbs}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Meaning change timelines                                           */
/* ------------------------------------------------------------------ */

function Timeline({ events, tone }) {
  return (
    <ol className={`${styles.timeline} ${styles[`tl_${tone}`]}`} aria-label="Thứ tự diễn ra">
      {events.map((e, i) => (
        <li key={i} className={`${styles.tlNode} ${styles[`node_${e.kind}`]}`}>
          <span className={styles.tlDot}>{i + 1}</span>
          <span className={styles.tlLabel}>{e.label}</span>
        </li>
      ))}
    </ol>
  )
}

function MeaningSide({ side, tone }) {
  return (
    <div className={`${styles.side} ${styles[`side_${tone}`]}`}>
      <p className={styles.sideForm}>{side.form}</p>
      <p className={styles.sideMeaning}>{side.meaning}</p>
      <Timeline events={side.events} tone={tone} />
      <p className={styles.sideEx}><Hl text={side.ex} tone={tone} /></p>
      <p className={styles.sideVi}>{side.vi}</p>
    </div>
  )
}

function MeaningChange() {
  const [verb, setVerb] = useState(MEANING[0].verb)
  const item = MEANING.find((m) => m.verb === verb)
  return (
    <section className={styles.meaning} aria-labelledby="gi-meaning-title">
      <h2 id="gi-meaning-title" className={styles.sectionTitle}>
        <FieldTimeOutlined aria-hidden="true" /> Cùng động từ, khác nghĩa
      </h2>
      <p className={styles.sectionSub}>
        Mẹo nhớ: <strong>V-ing</strong> thường nhìn về việc đã / đang xảy ra (hành động đứng TRƯỚC);
        <strong> to-V</strong> nhìn về phía trước (hành động đứng SAU). Xem thứ tự trên dòng thời gian.
      </p>
      <div className={styles.verbPills} role="group" aria-label="Chọn động từ">
        {MEANING.map((m) => (
          <button
            key={m.verb}
            type="button"
            className={styles.verbPill}
            aria-pressed={m.verb === verb}
            onClick={() => setVerb(m.verb)}
          >
            {m.verb}
          </button>
        ))}
      </div>
      <div className={styles.sides} key={verb} aria-live="polite">
        <MeaningSide side={item.ing} tone="ing" />
        <MeaningSide side={item.to} tone="to" />
      </div>
      <p className={styles.legend}>
        <span className={`${styles.legendDot} ${styles.node_verb}`} /> động từ chính
        <span className={`${styles.legendDot} ${styles.node_act}`} /> hành động
        <span className={`${styles.legendDot} ${styles.node_miss}`} /> chưa / không xảy ra
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Patterns, mistakes                                                 */
/* ------------------------------------------------------------------ */

function Patterns() {
  return (
    <section aria-labelledby="gi-patterns-title">
      <h2 id="gi-patterns-title" className={styles.sectionTitle}>Các mẫu câu khác</h2>
      <div className={styles.patterns}>
        {PATTERNS.map((p) => (
          <article key={p.key} className={styles.pattern}>
            <h3 className={styles.patternTitle}>{p.title}</h3>
            <p className={styles.patternFormula}>{p.formula}</p>
            <p className={styles.patternBody}>{p.body}</p>
            <ul className={styles.exList}>
              {p.examples.map((ex) => (
                <li key={ex.en}>
                  <p className={styles.exEn}><Hl text={ex.en} /></p>
                  <p className={styles.exVi}>{ex.vi}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Mistakes() {
  return (
    <section aria-labelledby="gi-mistakes-title">
      <h2 id="gi-mistakes-title" className={styles.sectionTitle}>
        <WarningOutlined aria-hidden="true" /> Lỗi hay gặp
      </h2>
      <ul className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mistake}>
            <span className={styles.mBad}><span aria-hidden="true">❌</span> <s>{m.bad}</s></span>
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

export default function GerundsInfinitives() {
  return (
    <div className={styles.page}>
      <DoorGame />
      <VerbLists />
      <MeaningChange />
      <Patterns />
      <Mistakes />
    </div>
  )
}
