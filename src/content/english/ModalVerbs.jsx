import { useState } from 'react'
import { Tabs } from 'antd'
import {
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  DashboardOutlined,
  ExperimentOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './ModalVerbs.module.css'

/* ------------------------------------------------------------------ */
/*  Data — wrap the modal phrase in {braces} to highlight it          */
/* ------------------------------------------------------------------ */

const CERTAINTY = [
  {
    key: 'must',
    label: 'must',
    level: 95,
    tag: 'Gần như chắc chắn',
    meaning:
      'Dùng khi suy luận có căn cứ, người nói gần như chắc chắn điều đó đúng: “chắc hẳn là”. Đây là suy đoán, không phải nghĩa “phải”.',
    present: 'must + V / be V-ing',
    past: 'must have + V3',
    examples: [
      { en: 'She’s been working for 12 hours. She {must be} exhausted.', vi: 'Cô ấy làm việc 12 tiếng rồi. Chắc hẳn cô ấy kiệt sức.' },
      { en: 'The streets are wet. It {must have rained} last night.', vi: 'Đường ướt hết. Chắc hẳn tối qua trời mưa.' },
    ],
  },
  {
    key: 'should',
    label: 'should / ought to',
    level: 75,
    tag: 'Khả năng cao (theo dự tính)',
    meaning:
      'Dùng khi dự đoán điều bình thường sẽ xảy ra nếu mọi thứ diễn ra như kế hoạch: “chắc là sẽ, lẽ ra là”.',
    present: 'should / ought to + V',
    past: 'should have + V3 (lẽ ra đã…)',
    examples: [
      { en: 'I posted it on Monday, so the parcel {should arrive} tomorrow.', vi: 'Tôi gửi hôm thứ Hai nên chắc mai gói hàng sẽ tới.' },
      { en: 'He left an hour ago. He {ought to be} home by now.', vi: 'Anh ấy đi được một tiếng rồi. Giờ này chắc đã về đến nhà.' },
    ],
  },
  {
    key: 'may',
    label: 'may',
    level: 55,
    tag: 'Có thể (khoảng một nửa)',
    meaning: 'Dùng khi thấy điều đó có khả năng đúng nhưng không chắc: “có lẽ, có thể”.',
    present: 'may + V / may not + V',
    past: 'may have + V3',
    examples: [
      { en: 'Take an umbrella. It {may rain} this afternoon.', vi: 'Mang ô đi. Chiều nay có thể trời mưa.' },
      { en: 'She {may not have received} my email yet.', vi: 'Có thể cô ấy chưa nhận được email của tôi.' },
    ],
  },
  {
    key: 'might',
    label: 'might / could',
    level: 35,
    tag: 'Có thể, nhưng không chắc lắm',
    meaning:
      'Dùng khi khả năng thấp hơn “may” một chút. “could” ở đây là khả năng, không phải quá khứ của “can”.',
    present: 'might / could + V',
    past: 'might / could have + V3',
    examples: [
      { en: 'He’s not answering. He {might be} in a meeting.', vi: 'Anh ấy không nghe máy. Có thể anh ấy đang họp.' },
      { en: 'I can’t find my keys. I {could have left} them at work.', vi: 'Tôi không tìm thấy chìa khóa. Có thể tôi để quên ở chỗ làm.' },
    ],
  },
  {
    key: 'cant',
    label: 'can’t / couldn’t',
    level: 4,
    tag: 'Chắc chắn là không',
    meaning:
      'Dùng khi suy luận chắc chắn điều đó KHÔNG thể đúng: “không thể nào”. Đây là phủ định của “must” khi suy đoán (không dùng mustn’t).',
    present: 'can’t + V / be',
    past: 'can’t / couldn’t have + V3',
    examples: [
      { en: 'That {can’t be} Tom. Tom is in Japan this week.', vi: 'Đó không thể là Tom. Tuần này Tom ở Nhật.' },
      { en: 'She {can’t have seen} me — she didn’t say hello.', vi: 'Chắc chắn cô ấy không thấy tôi — cô ấy không chào.' },
    ],
  },
]

const OBLIGATION = [
  {
    key: 'must',
    label: 'must / have to',
    pos: 4,
    zone: 'Bắt buộc phải làm',
    color: '#15803d',
    meaning:
      'must: người nói tự thấy cần thiết, hoặc quy định viết trang trọng. have to: bắt buộc do hoàn cảnh, luật lệ bên ngoài. Quá khứ chỉ có had to.',
    examples: [
      { en: 'I {must call} my mum tonight — it’s her birthday.', vi: 'Tối nay tôi phải gọi cho mẹ — hôm nay sinh nhật mẹ.' },
      { en: 'In Vietnam, you {have to wear} a helmet on a motorbike.', vi: 'Ở Việt Nam đi xe máy phải đội mũ bảo hiểm.' },
      { en: 'Yesterday I {had to work} late.', vi: 'Hôm qua tôi phải làm muộn.' },
    ],
  },
  {
    key: 'hadBetter',
    label: 'had better',
    pos: 19,
    zone: 'Tốt hơn hết là nên',
    color: '#4d7c0f',
    meaning:
      'Lời khuyên mạnh cho một tình huống cụ thể, ngầm cảnh báo hậu quả nếu không làm. Viết tắt ’d better, theo sau là V nguyên mẫu (không có “to”).',
    examples: [
      { en: 'We{’d better leave} now, or we’ll miss the train.', vi: 'Tốt hơn hết là đi ngay, không thì lỡ tàu.' },
      { en: 'You {had better not be} late again.', vi: 'Tốt nhất là đừng đến muộn nữa.' },
    ],
  },
  {
    key: 'should',
    label: 'should / ought to',
    pos: 34,
    zone: 'Nên làm',
    color: '#0e7490',
    meaning: 'Lời khuyên, ý kiến về điều đúng đắn nên làm. ought to cùng nghĩa, hơi trang trọng hơn.',
    examples: [
      { en: 'You {should see} a doctor about that cough.', vi: 'Bạn nên đi khám vì cái ho đó.' },
      { en: 'We {ought to recycle} more plastic.', vi: 'Chúng ta nên tái chế nhiều nhựa hơn.' },
    ],
  },
  {
    key: 'dontHave',
    label: 'don’t have to / needn’t',
    pos: 54,
    zone: 'Không cần — tùy bạn',
    color: '#64748b',
    meaning:
      'Không bắt buộc: làm cũng được, không làm cũng không sao. Hoàn toàn khác mustn’t (cấm).',
    examples: [
      { en: 'It’s Sunday. You {don’t have to get up} early.', vi: 'Hôm nay Chủ nhật. Bạn không cần dậy sớm.' },
      { en: 'You {needn’t bring} anything — we have plenty of food.', vi: 'Bạn không cần mang gì — chúng tôi có nhiều đồ ăn rồi.' },
    ],
  },
  {
    key: 'shouldnt',
    label: 'shouldn’t',
    pos: 74,
    zone: 'Không nên',
    color: '#c2410c',
    meaning: 'Lời khuyên đừng làm vì đó không phải điều tốt, nhưng không phải lệnh cấm.',
    examples: [
      { en: 'You {shouldn’t eat} so much sugar.', vi: 'Bạn không nên ăn nhiều đường như vậy.' },
      { en: 'Kids {shouldn’t spend} hours on their phones.', vi: 'Trẻ con không nên dành hàng giờ với điện thoại.' },
    ],
  },
  {
    key: 'mustnt',
    label: 'mustn’t',
    pos: 96,
    zone: 'Cấm — không được làm',
    color: '#b91c1c',
    meaning: 'Lệnh cấm, điều không được phép làm (do luật lệ hoặc người nói cấm).',
    examples: [
      { en: 'You {mustn’t touch} that wire — it’s dangerous!', vi: 'Không được chạm vào dây điện đó — nguy hiểm!' },
      { en: 'Passengers {mustn’t smoke} on the plane.', vi: 'Hành khách không được hút thuốc trên máy bay.' },
    ],
  },
]

const ZONES = ['Phải làm', 'Nên làm', 'Tùy bạn', 'Không nên', 'Cấm']

const DNA = [
  {
    rule: 'Modal + V nguyên mẫu',
    vi: 'Sau động từ khuyết thiếu là động từ nguyên mẫu không “to”.',
    good: 'She can swim.',
    bad: 'She can to swim. / She can swims.',
  },
  {
    rule: 'Không thêm -s',
    vi: 'Modal giữ nguyên với mọi chủ ngữ, kể cả he / she / it.',
    good: 'He must go.',
    bad: 'He musts go.',
  },
  {
    rule: 'Không mượn “do”',
    vi: 'Câu hỏi: đảo modal lên trước. Phủ định: thêm not ngay sau modal.',
    good: 'Can you drive? · I can’t drive.',
    bad: 'Do you can drive? · I don’t can drive.',
  },
]

const FUNCTIONS = [
  {
    key: 'ability',
    label: 'Ability',
    vi: 'Khả năng',
    formula: 'can / could / be able to + V',
    points: [
      { term: 'can', desc: 'Khả năng ở hiện tại hoặc khả năng nói chung.' },
      { term: 'could', desc: 'Khả năng chung trong quá khứ (biết làm trong một giai đoạn).' },
      { term: 'was / were able to', desc: 'Làm được một việc cụ thể trong một lần ở quá khứ (= managed to). Câu khẳng định không dùng could cho nghĩa này.' },
      { term: 'will be able to', desc: 'Khả năng trong tương lai — vì can không đứng sau will hay một modal khác.' },
    ],
    examples: [
      { en: 'She {can speak} three languages.', vi: 'Cô ấy nói được ba thứ tiếng.' },
      { en: 'When I was five, I {could swim}.', vi: 'Hồi 5 tuổi tôi đã biết bơi.' },
      { en: 'The fire spread fast, but everyone {was able to get} out.', vi: 'Lửa lan nhanh nhưng mọi người đã thoát ra được.' },
      { en: 'After this course, you {will be able to read} English novels.', vi: 'Học xong khóa này bạn sẽ đọc được tiểu thuyết tiếng Anh.' },
    ],
    note: 'Phủ định couldn’t vẫn dùng được cho một lần cụ thể: I tried, but I couldn’t open the door.',
  },
  {
    key: 'permission',
    label: 'Permission',
    vi: 'Xin phép · cho phép',
    formula: 'Can / Could / May + I + V…?',
    points: [
      { term: 'Can I…?', desc: 'Xin phép thân mật, với bạn bè, người nhà.' },
      { term: 'Could I…?', desc: 'Lịch sự hơn. could ở đây không mang nghĩa quá khứ.' },
      { term: 'May I…?', desc: 'Trang trọng nhất, dùng với người lạ, cấp trên.' },
      { term: 'You can / may (not)…', desc: 'Cho phép hoặc không cho phép. Quá khứ: was / were allowed to.' },
    ],
    examples: [
      { en: '{Can I borrow} your charger?', vi: 'Cho mình mượn sạc nhé?' },
      { en: '{Could I use} your phone for a minute?', vi: 'Tôi dùng điện thoại của anh một phút được không?' },
      { en: '{May I come} in?', vi: 'Tôi vào được không ạ?' },
      { en: 'Visitors {may not take} photos inside the museum.', vi: 'Khách tham quan không được chụp ảnh trong bảo tàng.' },
    ],
    note: 'Trả lời cho phép: “Yes, of course you can.” — không trả lời “Yes, you could.”',
  },
  {
    key: 'requests',
    label: 'Requests & offers',
    vi: 'Nhờ vả · đề nghị · mời',
    formula: 'Could / Would you + V…?  ·  Shall I / we + V…?',
    points: [
      { term: 'Can / Could / Would you…?', desc: 'Nhờ ai làm gì. could và would lịch sự hơn can.' },
      { term: 'Would you mind + V-ing…?', desc: 'Nhờ rất lịch sự. Lưu ý sau mind là V-ing.' },
      { term: 'Shall I…?', desc: 'Đề nghị giúp đỡ: “Để tôi… nhé?”' },
      { term: 'Shall we…?', desc: 'Gợi ý cùng làm: “Chúng ta… nhé?”' },
      { term: 'Would you like + N / to V?', desc: 'Lời mời lịch sự.' },
    ],
    examples: [
      { en: '{Could you open} the window, please?', vi: 'Bạn mở giúp cửa sổ được không?' },
      { en: '{Would you mind waiting} a moment?', vi: 'Phiền anh chờ một chút được không?' },
      { en: 'That bag looks heavy. {Shall I carry} it for you?', vi: 'Túi trông nặng quá. Để tôi xách giúp nhé?' },
      { en: '{Would you like} some tea?', vi: 'Bạn uống chút trà nhé?' },
    ],
    note: '“Will you…?” cũng dùng để nhờ nhưng khá thẳng, nghe gần như ra lệnh.',
  },
  {
    key: 'advice',
    label: 'Advice',
    vi: 'Lời khuyên',
    formula: 'should / ought to / had better + V',
    points: [
      { term: 'should', desc: 'Lời khuyên thông thường, phổ biến nhất.' },
      { term: 'ought to', desc: 'Nghĩa như should, hơi trang trọng. Phủ định: ought not to.' },
      { term: 'had better (’d better)', desc: 'Khuyên mạnh cho tình huống cụ thể, ngụ ý hậu quả. Phủ định: had better not + V.' },
    ],
    examples: [
      { en: 'You {should get} more sleep.', vi: 'Bạn nên ngủ nhiều hơn.' },
      { en: 'You {ought to apologise} to her.', vi: 'Bạn nên xin lỗi cô ấy.' },
      { en: 'It’s going to rain. You{’d better take} an umbrella.', vi: 'Sắp mưa rồi. Tốt hơn là cầm theo ô.' },
    ],
    note: 'had better nói về hiện tại / tương lai dù có “had”, và không có “to”: ✗ You had better to go.',
  },
  {
    key: 'obligation',
    label: 'Obligation',
    vi: 'Bắt buộc · cấm · không cần',
    formula: 'must / have to + V  ·  mustn’t ≠ don’t have to',
    points: [
      { term: 'must', desc: 'Bắt buộc theo ý người nói, hoặc biển báo, quy định viết.' },
      { term: 'have to', desc: 'Bắt buộc do quy định, hoàn cảnh bên ngoài. Có đủ các thì: had to, will have to, has had to.' },
      { term: 'mustn’t', desc: 'Cấm, không được phép làm.' },
      { term: 'don’t have to', desc: 'Không cần làm, không bắt buộc.' },
    ],
    examples: [
      { en: 'I {must finish} this report today.', vi: 'Tôi phải xong báo cáo này trong hôm nay.' },
      { en: 'Nurses {have to work} night shifts.', vi: 'Y tá phải làm ca đêm.' },
      { en: 'You {mustn’t park} here.', vi: 'Không được đỗ xe ở đây.' },
      { en: 'You {don’t have to pay} — it’s free.', vi: 'Bạn không cần trả tiền — miễn phí mà.' },
    ],
    note: 'have to là động từ thường nên câu hỏi / phủ định cần do: Do you have to wear a uniform? — I don’t have to.',
  },
  {
    key: 'deductionPresent',
    label: 'Deduction · now',
    vi: 'Suy đoán hiện tại',
    formula: 'must / may / might / could / can’t + V (be / be V-ing)',
    points: [
      { term: 'must', desc: 'Chắc chắn đúng (có bằng chứng).' },
      { term: 'may / might / could', desc: 'Có thể đúng, không chắc.' },
      { term: 'can’t / couldn’t', desc: 'Chắc chắn không đúng.' },
      { term: 'must be V-ing', desc: 'Suy đoán việc đang diễn ra lúc nói.' },
    ],
    examples: [
      { en: 'The lights are on. They {must be} at home.', vi: 'Đèn đang sáng. Chắc họ ở nhà.' },
      { en: 'Try again later — he {might be} in a meeting.', vi: 'Gọi lại sau nhé — có thể anh ấy đang họp.' },
      { en: 'You’ve just eaten! You {can’t be} hungry.', vi: 'Bạn vừa ăn xong! Không thể đói được.' },
      { en: 'She’s not answering. She {must be driving}.', vi: 'Cô ấy không nghe máy. Chắc đang lái xe.' },
    ],
    note: 'Xem thanh “Certainty” ở trên để so sánh mức độ chắc chắn.',
  },
  {
    key: 'deductionPast',
    label: 'Deduction · past',
    vi: 'Suy đoán quá khứ',
    formula: 'must / might / could / can’t + have + V3',
    points: [
      { term: 'must have V3', desc: 'Chắc hẳn đã…' },
      { term: 'may / might / could have V3', desc: 'Có lẽ đã…' },
      { term: 'can’t / couldn’t have V3', desc: 'Chắc chắn đã không…' },
    ],
    examples: [
      { en: 'The ground is wet. It {must have rained} overnight.', vi: 'Mặt đất ướt. Chắc hẳn đêm qua trời mưa.' },
      { en: 'I {might have left} my wallet in the taxi.', vi: 'Có lẽ tôi để quên ví trên taxi.' },
      { en: 'He {can’t have stolen} it — he was with me all evening.', vi: 'Không thể là anh ấy lấy — cả tối anh ấy ở cùng tôi.' },
    ],
    note: 'could have V3 còn có nghĩa “đã có thể (nhưng không làm)”: You could have told me!',
  },
  {
    key: 'regrets',
    label: 'Past regrets',
    vi: 'Tiếc nuối · trách móc',
    formula: 'should / ought to + have + V3',
    points: [
      { term: 'should have V3', desc: 'Lẽ ra nên làm (nhưng đã không làm).' },
      { term: 'shouldn’t have V3', desc: 'Lẽ ra không nên làm (nhưng đã làm).' },
      { term: 'could have V3', desc: 'Đã có thể làm (nhưng không làm).' },
    ],
    examples: [
      { en: 'I {should have studied} harder for the test.', vi: 'Lẽ ra tôi nên học chăm hơn cho bài kiểm tra.' },
      { en: 'You {shouldn’t have shouted} at him.', vi: 'Lẽ ra bạn không nên quát anh ấy.' },
      { en: 'We {ought to have booked} a table.', vi: 'Lẽ ra chúng ta nên đặt bàn trước.' },
    ],
    note: 'Cấu trúc này luôn nói về quá khứ đã không thể thay đổi, nên thường mang sắc thái tiếc hoặc trách.',
  },
  {
    key: 'habits',
    label: 'Would · past habits',
    vi: 'Thói quen trong quá khứ',
    formula: 'would + V  ·  used to + V',
    points: [
      { term: 'would + V', desc: 'Hành động lặp đi lặp lại trong quá khứ, giọng hồi tưởng. Cần ngữ cảnh quá khứ rõ ràng.' },
      { term: 'used to + V', desc: 'Dùng cho cả hành động lặp lại lẫn trạng thái trong quá khứ.' },
      { term: 'Trạng thái', desc: 'Với be, have, live, like, know… chỉ dùng used to, không dùng would.' },
    ],
    examples: [
      { en: 'When we were kids, we {would play} football after school.', vi: 'Hồi nhỏ, tan học là bọn tôi lại đá bóng.' },
      { en: 'My grandma {would tell} us stories every night.', vi: 'Tối nào bà cũng kể chuyện cho chúng tôi.' },
      { en: 'I {used to live} in Da Nang. (✗ I would live in Da Nang.)', vi: 'Tôi từng sống ở Đà Nẵng.' },
    ],
    note: 'Không dùng would cho thói quen hiện tại; hiện tại dùng thì hiện tại đơn hoặc tend to.',
  },
  {
    key: 'needn',
    label: 'Needn’t',
    vi: 'Không cần · lẽ ra không cần',
    formula: 'needn’t + V  ·  needn’t have + V3',
    points: [
      { term: 'needn’t + V', desc: 'Không cần làm (hiện tại / tương lai) = don’t need to / don’t have to.' },
      { term: 'needn’t have + V3', desc: 'ĐÃ làm, nhưng hóa ra không cần thiết.' },
      { term: 'didn’t need to + V', desc: 'Không cần làm (thường là nên đã không làm).' },
    ],
    examples: [
      { en: 'You {needn’t come} if you’re busy.', vi: 'Nếu bận thì bạn không cần đến.' },
      { en: 'I {needn’t have cooked} so much — only two guests came.', vi: 'Lẽ ra tôi không cần nấu nhiều thế — chỉ có hai khách đến.' },
      { en: 'I {didn’t need to buy} bread, so I went straight home.', vi: 'Tôi không cần mua bánh mì nên về thẳng nhà.' },
    ],
    note: 'need dạng modal chủ yếu dùng trong câu phủ định / câu hỏi (Need I stay?). Câu khẳng định dùng need to: I need to go.',
  },
]

const MISTAKES = [
  { bad: 'She can sings very well.', good: 'She can sing very well.', why: 'Sau modal là V nguyên mẫu, không chia động từ.' },
  { bad: 'He musts finish it today.', good: 'He must finish it today.', why: 'Modal không thêm -s ở ngôi thứ ba số ít.' },
  { bad: 'Do you can swim?', good: 'Can you swim?', why: 'Modal tự đảo lên đầu câu hỏi, không mượn do.' },
  { bad: 'You must to wear a seatbelt.', good: 'You must wear a seatbelt.', why: 'Không có “to” sau must (ngoại lệ: ought to, have to).' },
  { bad: 'You mustn’t come tomorrow — it’s a holiday.', good: 'You don’t have to come tomorrow — it’s a holiday.', why: 'mustn’t = cấm; ý “không cần” phải dùng don’t have to / needn’t.' },
  { bad: 'That mustn’t be Tom — he’s in Japan.', good: 'That can’t be Tom — he’s in Japan.', why: 'Phủ định của suy luận “must” là can’t.' },
  { bad: 'I will can drive next year.', good: 'I will be able to drive next year.', why: 'Hai modal không đi liền nhau; dùng be able to.' },
  { bad: 'Yesterday I must work late.', good: 'Yesterday I had to work late.', why: 'must không có dạng quá khứ; dùng had to.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

function mercuryColor(level) {
  return `hsl(${Math.round(215 - level * 2.15)} 80% 45%)`
}

function ExampleList({ items }) {
  return (
    <ul className={styles.exList}>
      {items.map((ex) => (
        <li key={ex.en} className={styles.ex}>
          <p className={styles.exEn}><Hl text={ex.en} /></p>
          <p className={styles.exVi}>{ex.vi}</p>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/*  Dial 1 — certainty thermometer                                     */
/* ------------------------------------------------------------------ */

function CertaintyDial() {
  const [key, setKey] = useState('must')
  const s = CERTAINTY.find((c) => c.key === key)

  return (
    <section className={styles.instrument} aria-labelledby="mv-cert-title">
      <header className={styles.instHead}>
        <span className={styles.instTag}>Dial 01</span>
        <h2 id="mv-cert-title" className={styles.instTitle}>Certainty — Mức độ chắc chắn</h2>
        <p className={styles.instSub}>Dùng khi suy đoán. Chọn một modal để xem bạn tin điều đó đúng bao nhiêu phần trăm.</p>
      </header>

      <div className={styles.certBody}>
        <div className={styles.thermo} style={{ '--merc': mercuryColor(s.level) }}>
          <div className={styles.glass} aria-hidden="true">
            <div className={styles.tube}>
              <div className={styles.mercury} style={{ height: `${s.level}%` }} />
              {[25, 50, 75].map((t) => (
                <span key={t} className={styles.grad} style={{ bottom: `${t}%` }} />
              ))}
            </div>
            <div className={styles.bulb} />
          </div>
          <div className={styles.scale} role="group" aria-label="Chọn modal theo mức độ chắc chắn">
            {CERTAINTY.map((c) => (
              <button
                key={c.key}
                type="button"
                className={styles.stop}
                style={{ bottom: `${c.level}%`, '--dot': mercuryColor(c.level) }}
                aria-pressed={c.key === key}
                onClick={() => setKey(c.key)}
              >
                <span className={styles.stopPct}>{c.level}%</span>
                <span className={styles.stopLabel}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.readout} aria-live="polite" key={s.key}>
          <div className={styles.readTop}>
            <span className={styles.readPct}>{s.level}<small>%</small></span>
            <span className={styles.readTag} style={{ '--dot': mercuryColor(s.level) }}>{s.tag}</span>
          </div>
          <p className={styles.readModal}>{s.label}</p>
          <p className={styles.readMeaning}>{s.meaning}</p>
          <div className={styles.forms}>
            <div className={styles.formCell}>
              <span className={styles.formLabel}>Hiện tại</span>
              <code className={styles.formCode}>{s.present}</code>
            </div>
            <div className={styles.formCell}>
              <span className={styles.formLabel}>Quá khứ</span>
              <code className={styles.formCode}>{s.past}</code>
            </div>
          </div>
          <ExampleList items={s.examples} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Dial 2 — obligation scale                                          */
/* ------------------------------------------------------------------ */

function ObligationDial() {
  const [key, setKey] = useState('must')
  const o = OBLIGATION.find((x) => x.key === key)

  return (
    <section className={styles.instrument} aria-labelledby="mv-obl-title" style={{ '--zone': o.color }}>
      <header className={styles.instHead}>
        <span className={styles.instTag}>Dial 02</span>
        <h2 id="mv-obl-title" className={styles.instTitle}>Obligation — Phải làm hay bị cấm?</h2>
        <p className={styles.instSub}>Từ “bắt buộc làm” đến “cấm làm”. Chú ý: “không cần” nằm ở giữa, rất xa “cấm”.</p>
      </header>

      <div className={styles.scaleWrap}>
        <div className={styles.scaleEnds} aria-hidden="true">
          <span>✔ PHẢI LÀM</span>
          <span>KHÔNG ĐƯỢC LÀM ✖</span>
        </div>
        <div className={styles.rail} aria-hidden="true">
          {OBLIGATION.map((x) => (
            <span key={x.key} className={styles.railDot} style={{ left: `${x.pos}%` }} />
          ))}
          <span className={styles.puck} style={{ left: `${o.pos}%` }} />
          <span className={styles.puckLabel} style={{ left: `${o.pos}%`, transform: `translateX(-${o.pos}%)` }}>
            {o.label}
          </span>
        </div>
        <div className={styles.zoneRow} aria-hidden="true">
          {ZONES.map((z) => (
            <span key={z}>{z}</span>
          ))}
        </div>
      </div>

      <div className={styles.oblButtons} role="group" aria-label="Chọn modal theo mức độ bắt buộc">
        {OBLIGATION.map((x) => (
          <button
            key={x.key}
            type="button"
            className={styles.oblBtn}
            style={{ '--c': x.color }}
            aria-pressed={x.key === key}
            onClick={() => setKey(x.key)}
          >
            <span className={styles.oblBtnLabel}>{x.label}</span>
            <span className={styles.oblBtnZone}>{x.zone}</span>
          </button>
        ))}
      </div>

      <div className={styles.oblReadout} aria-live="polite" key={o.key}>
        <p className={styles.oblZone}>{o.zone}</p>
        <p className={styles.readMeaning}>{o.meaning}</p>
        <ExampleList items={o.examples} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function GrammarDna() {
  return (
    <section className={styles.dna} aria-labelledby="mv-dna-title">
      <h2 id="mv-dna-title" className={styles.sectionTitle}>
        <ExperimentOutlined aria-hidden="true" /> Ba quy tắc “gen” của mọi modal
      </h2>
      <div className={styles.dnaGrid}>
        {DNA.map((d, i) => (
          <article key={d.rule} className={styles.dnaCard}>
            <span className={styles.dnaNum}>0{i + 1}</span>
            <h3 className={styles.dnaRule}>{d.rule}</h3>
            <p className={styles.dnaVi}>{d.vi}</p>
            <p className={styles.dnaGood}><CheckCircleFilled aria-hidden="true" /> {d.good}</p>
            <p className={styles.dnaBad}><CloseCircleFilled aria-hidden="true" /> <s>{d.bad}</s></p>
          </article>
        ))}
      </div>
      <p className={styles.dnaNote}>
        Ngoại lệ: <strong>have to</strong>, <strong>need to</strong>, <strong>be able to</strong> là động từ thường (chia thì, dùng do).
        <strong> ought to</strong> luôn đi kèm “to”.
      </p>
    </section>
  )
}

function FunctionPanel({ f }) {
  return (
    <div className={styles.fnPanel}>
      <p className={styles.fnFormula}><code>{f.formula}</code></p>
      <dl className={styles.fnPoints}>
        {f.points.map((p) => (
          <div key={p.term} className={styles.fnPoint}>
            <dt>{p.term}</dt>
            <dd>{p.desc}</dd>
          </div>
        ))}
      </dl>
      <ExampleList items={f.examples} />
      {f.note && (
        <p className={styles.fnNote}>
          <BulbOutlined aria-hidden="true" /> {f.note}
        </p>
      )}
    </div>
  )
}

function Functions() {
  return (
    <section className={styles.functions} aria-labelledby="mv-fn-title">
      <h2 id="mv-fn-title" className={styles.sectionTitle}>
        <DashboardOutlined aria-hidden="true" /> Modal theo chức năng
      </h2>
      <Tabs
        className={styles.tabs}
        items={FUNCTIONS.map((f) => ({
          key: f.key,
          label: (
            <span className={styles.tabLabel}>
              <span>{f.label}</span>
              <small>{f.vi}</small>
            </span>
          ),
          children: <FunctionPanel f={f} />,
        }))}
      />
    </section>
  )
}

function Mistakes() {
  return (
    <section className={styles.mistakes} aria-labelledby="mv-mistakes-title">
      <h2 id="mv-mistakes-title" className={styles.sectionTitle}>
        <WarningOutlined aria-hidden="true" /> Lỗi hay gặp
      </h2>
      <ul className={styles.mistakeList}>
        {MISTAKES.map((m) => (
          <li key={m.bad} className={styles.mistake}>
            <p className={styles.mBad}><span aria-hidden="true">❌</span> <s>{m.bad}</s></p>
            <p className={styles.mGood}><span aria-hidden="true">✅</span> {m.good}</p>
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

export default function ModalVerbs() {
  return (
    <div className={styles.page}>
      <div className={styles.console}>
        <CertaintyDial />
        <ObligationDial />
      </div>
      <GrammarDna />
      <Functions />
      <Mistakes />
    </div>
  )
}
