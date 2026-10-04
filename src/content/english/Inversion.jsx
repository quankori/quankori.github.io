import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button, Collapse } from 'antd'
import {
  BulbOutlined,
  ReadOutlined,
  RetweetOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './Inversion.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*                                                                     */
/*  Swap board sentences: chunks separated by " / ", each "text:ROLE". */
/*  Roles                                                              */
/*    T  trigger (negative / limiting element)                         */
/*    A  auxiliary or "be" that jumps before the subject               */
/*    D  do / does / did added because there is no auxiliary           */
/*    M  full verb that jumps (place inversion)                        */
/*    S  subject      V  main verb      R  rest of the sentence        */
/*    X  word that disappears in the inverted sentence (if, not)       */
/*  Chunks with the same role keep their identity between the two     */
/*  sentences (1st T ↔ 1st T, 2nd T ↔ 2nd T…), which drives the swap.  */
/*                                                                     */
/*  Reference examples: [trigger]  {inverted auxiliary / verb}         */
/* ------------------------------------------------------------------ */

const FAMILIES = [
  {
    key: 'negative',
    label: 'Trạng từ phủ định',
    en: 'Negative adverbials',
    color: '#b42318',
    formula: 'Negative adverbial + trợ động từ + S + V',
    words: ['Never', 'Rarely', 'Seldom', 'Little', 'Hardly ever', 'Nowhere', 'At no time', 'Under no circumstances', 'On no account', 'In no way'],
    use: 'Dùng khi muốn nhấn mạnh ý phủ định hoặc "hiếm khi". Gặp nhiều trong văn viết, diễn văn, tin tức và bài thi viết.',
    examples: [
      { en: '[Never] {have} I felt so tired.', vi: 'Chưa bao giờ tôi thấy mệt đến vậy.' },
      { en: '[Seldom] {do} we see such talent.', vi: 'Hiếm khi chúng ta thấy tài năng như thế.' },
      { en: '[At no time] {was} the public in danger.', vi: 'Không lúc nào người dân gặp nguy hiểm.' },
      { en: '[On no account] {should} you share your password.', vi: 'Tuyệt đối không được chia sẻ mật khẩu.' },
    ],
    note: 'Hardly ever, Scarcely ever cũng đảo như Rarely. "Hardly" đứng một mình thường đi với "when" (xem nhóm Chuỗi thời gian).',
  },
  {
    key: 'only',
    label: 'Cụm "Only" · Not only',
    en: '"Only" phrases',
    color: '#a15c07',
    formula: 'Only + từ / cụm / mệnh đề + trợ động từ + S + V',
    words: ['Only after', 'Only when', 'Only then', 'Only if', 'Only by', 'Only in this way', 'Not only … but also'],
    use: 'Dùng để nhấn mạnh điều kiện hoặc thời điểm duy nhất: "chỉ khi… thì mới…", "chỉ sau khi… mới…".',
    examples: [
      { en: '[Only if] you apologise {will} she forgive you.', vi: 'Chỉ khi bạn xin lỗi thì cô ấy mới tha thứ.' },
      { en: '[Only by] practising every day {can} you improve.', vi: 'Chỉ bằng cách luyện tập mỗi ngày bạn mới tiến bộ được.' },
      { en: '[Only then] {did} we understand the risk.', vi: 'Chỉ đến lúc đó chúng tôi mới hiểu được rủi ro.' },
      { en: '[Not only] {is} he smart, but he is also kind.', vi: 'Anh ấy không những thông minh mà còn tốt bụng.' },
    ],
    note: 'Với Only after / Only when / Only if + mệnh đề: đảo ở MỆNH ĐỀ CHÍNH phía sau; mệnh đề đi cùng "only" giữ trật tự bình thường.',
  },
  {
    key: 'time',
    label: 'Chuỗi thời gian',
    en: 'Time sequences',
    color: '#1d5f8c',
    formula: 'Hardly / Scarcely + had + S + V3 + when… · No sooner + had + S + V3 + than… · Not until + mốc / mệnh đề + trợ động từ + S + V',
    words: ['Hardly … when', 'Scarcely … when', 'No sooner … than', 'Not until'],
    use: 'Diễn tả hai việc nối tiếp nhau rất nhanh trong quá khứ ("vừa mới… thì…"), hoặc nhấn mạnh "mãi đến khi… mới…".',
    examples: [
      { en: '[Hardly] {had} the film started [when] the power went out.', vi: 'Phim vừa mới chiếu thì mất điện.' },
      { en: '[Scarcely] {had} I closed my eyes [when] the baby cried.', vi: 'Tôi vừa nhắm mắt thì em bé khóc.' },
      { en: '[No sooner] {had} we left [than] it began to snow.', vi: 'Chúng tôi vừa đi thì trời bắt đầu có tuyết.' },
      { en: '[Not until] midnight {did} the party end.', vi: 'Mãi đến nửa đêm bữa tiệc mới kết thúc.' },
    ],
    note: 'Nhớ đúng cặp: Hardly / Scarcely đi với WHEN, No sooner đi với THAN. Vế đầu thường ở quá khứ hoàn thành, vế sau ở quá khứ đơn.',
  },
  {
    key: 'soSuch',
    label: 'So / Such … that',
    en: 'So … that · Such … that',
    color: '#6b3fa0',
    formula: 'So + adj / adv + be / trợ động từ + S + that… · Such + be + N + that…',
    words: ['So + adj … that', 'So + adv … that', 'Such … that'],
    use: 'Nhấn mạnh mức độ dẫn tới kết quả: "đến mức mà…". Đưa phần "so + tính từ" hoặc "such" lên đầu rồi đảo.',
    examples: [
      { en: '[So] beautiful {was} the view [that] we stopped the car.', vi: 'Cảnh đẹp đến mức chúng tôi dừng xe lại.' },
      { en: '[So] fast {did} he run [that] nobody could catch him.', vi: 'Anh ấy chạy nhanh đến mức không ai bắt kịp.' },
      { en: '[Such] {was} her anger [that] she couldn’t speak.', vi: 'Cô ấy giận đến mức không nói nên lời.' },
    ],
    note: 'Với "Such", động từ be chia theo danh từ đứng sau: Such was the noise… / Such were the problems…',
  },
  {
    key: 'cond',
    label: 'Câu điều kiện',
    en: 'Conditional inversion',
    color: '#0f766e',
    formula: 'Had + S + V3 (loại 3) · Were + S … / Were + S + to V (loại 2) · Should + S + V (loại 1)',
    words: ['Had …', 'Were …', 'Should …'],
    use: 'Bỏ "if" và đưa had / were / should lên đầu câu. Nghĩa không đổi nhưng trang trọng hơn — hay gặp trong email công việc và văn bản.',
    examples: [
      { en: '{Had} we known, we would have helped.', vi: 'Nếu chúng tôi biết thì đã giúp rồi.' },
      { en: '{Were} she here, she would know what to do.', vi: 'Nếu cô ấy ở đây, cô ấy sẽ biết phải làm gì.' },
      { en: '{Were} I to win the lottery, I would travel the world.', vi: 'Nếu tôi trúng số, tôi sẽ đi du lịch khắp thế giới.' },
      { en: '{Should} you have any questions, please contact us.', vi: 'Nếu bạn có thắc mắc, vui lòng liên hệ chúng tôi.' },
      { en: '{Had} I not seen it, I wouldn’t have believed it.', vi: 'Nếu không tận mắt thấy, tôi đã không tin.' },
    ],
    note: 'Phủ định: "not" đứng SAU chủ ngữ — Had I not known… (không viết Hadn’t I known…).',
  },
  {
    key: 'place',
    label: 'Nơi chốn · chuyển động',
    en: 'Place inversion',
    color: '#4d6a1f',
    formula: 'Trạng từ / cụm nơi chốn, hướng + V (động từ chính) + S (danh từ)',
    words: ['Here', 'There', 'Down', 'Up', 'Away', 'Into the room', 'On the hill'],
    use: 'Dùng khi mô tả cảnh vật, chuyển động cho sinh động. "Here comes…/There goes…" rất tự nhiên trong văn nói; các cụm dài hơn mang màu sắc văn chương.',
    examples: [
      { en: '[Here] {comes} the bus!', vi: 'Xe buýt tới rồi kìa!' },
      { en: '[There] {goes} our last chance.', vi: 'Thế là mất cơ hội cuối cùng rồi.' },
      { en: '[Down] {came} the rain.', vi: 'Mưa ào xuống.' },
      { en: '[On the hill] {stands} an old castle.', vi: 'Trên đồi sừng sững một lâu đài cổ.' },
    ],
    note: 'Đảo ĐỘNG TỪ CHÍNH, không mượn do/does/did. Không đảo khi chủ ngữ là đại từ: Here it comes! · Off they went.',
  },
]

const FORMALITY = ['', 'Tự nhiên · văn nói', 'Trang trọng vừa', 'Rất trang trọng · văn viết']

const TRIGGERS = [
  // ---- negative adverbials
  {
    key: 'never',
    family: 'negative',
    label: 'Never',
    normal: 'I:S / have:A / never:T / seen:V / such a beautiful sunset.:R',
    inverted: 'Never:T / have:A / I:S / seen:V / such a beautiful sunset.:R',
    formula: 'Never + have/has/had + S + V3',
    vi: 'Chưa bao giờ tôi thấy hoàng hôn nào đẹp đến thế.',
    note: 'Câu đã có trợ động từ "have" → chỉ cần đưa "have" lên trước chủ ngữ, động từ chính giữ nguyên.',
    formality: 2,
  },
  {
    key: 'rarely',
    family: 'negative',
    label: 'Rarely',
    normal: 'She:S / rarely:T / visits:V / her hometown.:R',
    inverted: 'Rarely:T / does:D / she:S / visit:V / her hometown.:R',
    formula: 'Rarely + do/does/did + S + V (nguyên mẫu)',
    vi: 'Hiếm khi cô ấy về thăm quê.',
    note: 'Không có trợ động từ → mượn "does" (ngôi 3 số ít, hiện tại). Động từ chính trở về nguyên mẫu: visits → visit.',
    formality: 2,
  },
  {
    key: 'seldom',
    family: 'negative',
    label: 'Seldom',
    normal: 'We:S / seldom:T / eat out:V / on weekdays.:R',
    inverted: 'Seldom:T / do:D / we:S / eat out:V / on weekdays.:R',
    formula: 'Seldom + do/does/did + S + V',
    vi: 'Hiếm khi chúng tôi ăn ngoài vào ngày thường.',
    note: '"Seldom" = "rarely" nhưng trang trọng hơn. Chủ ngữ "we" → mượn "do".',
    formality: 3,
  },
  {
    key: 'little',
    family: 'negative',
    label: 'Little',
    normal: 'He:S / did:A / not:X / realise:V / that he was being followed.:R',
    inverted: 'Little:T / did:A / he:S / realise:V / that he was being followed.:R',
    formula: 'Little + do/does/did + S + V (know, realise, suspect, imagine…)',
    vi: 'Anh ta hoàn toàn không hề nhận ra mình đang bị theo dõi.',
    note: '"Little" ở đây mang nghĩa phủ định mạnh ("chẳng hề"), đi với động từ nhận thức. "not" biến mất vì "Little" đã mang nghĩa phủ định.',
    formality: 2,
  },
  {
    key: 'noCircumstances',
    family: 'negative',
    label: 'Under no circumstances',
    normal: 'You:S / should:A / not:X / open:V / this door:R / under any circumstances.:T',
    inverted: 'Under no circumstances:T / should:A / you:S / open:V / this door.:R',
    formula: 'Under no circumstances + trợ động từ + S + V',
    vi: 'Trong bất kỳ trường hợp nào bạn cũng không được mở cánh cửa này.',
    note: '"not … under any circumstances" gộp thành "Under no circumstances" ở đầu câu. Tương tự: On no account, In no way, At no time.',
    formality: 3,
  },
  // ---- only
  {
    key: 'onlyAfter',
    family: 'only',
    label: 'Only after',
    normal: 'I:S / understood:V / the problem:R / only after I had read the report twice.:T',
    inverted: 'Only after I had read the report twice:T / did:D / I:S / understand:V / the problem.:R',
    formula: 'Only after + N / V-ing / mệnh đề + trợ động từ + S + V',
    vi: 'Chỉ sau khi đọc bản báo cáo hai lần tôi mới hiểu được vấn đề.',
    note: 'Mệnh đề "I had read the report twice" giữ nguyên; chỉ mệnh đề chính đảo: did I understand.',
    formality: 3,
  },
  {
    key: 'onlyWhen',
    family: 'only',
    label: 'Only when',
    normal: 'You:S / can:A / leave:V / only when you have finished the test.:T',
    inverted: 'Only when you have finished the test:T / can:A / you:S / leave.:V',
    formula: 'Only when + mệnh đề + trợ động từ + S + V',
    vi: 'Chỉ khi làm xong bài kiểm tra bạn mới được về.',
    note: 'Có sẵn modal "can" → đưa "can" lên trước "you".',
    formality: 2,
  },
  {
    key: 'onlyThen',
    family: 'only',
    label: 'Only then',
    normal: 'I:S / realised:V / my mistake:R / only then.:T',
    inverted: 'Only then:T / did:D / I:S / realise:V / my mistake.:R',
    formula: 'Only then + trợ động từ + S + V',
    vi: 'Chỉ đến lúc đó tôi mới nhận ra lỗi của mình.',
    note: 'Quá khứ đơn không có trợ động từ → mượn "did", động từ về nguyên mẫu: realised → realise.',
    formality: 2,
  },
  {
    key: 'notOnly',
    family: 'only',
    label: 'Not only … but also',
    normal: 'She:S / not only:T / sings:V / beautifully, but she also plays the piano.:R',
    inverted: 'Not only:T / does:D / she:S / sing:V / beautifully, but she also plays the piano.:R',
    formula: 'Not only + trợ động từ + S + V, but + S + also + V',
    vi: 'Cô ấy không những hát hay mà còn chơi piano.',
    note: 'Chỉ đảo vế "Not only"; vế "but … also" giữ trật tự bình thường.',
    formality: 2,
  },
  // ---- time sequences
  {
    key: 'hardly',
    family: 'time',
    label: 'Hardly … when',
    normal: 'I:S / had:A / hardly:T / arrived:V / home:R / when:T / it started to rain.:R',
    inverted: 'Hardly:T / had:A / I:S / arrived:V / home:R / when:T / it started to rain.:R',
    formula: 'Hardly + had + S + V3 + when + S + V2',
    vi: 'Tôi vừa mới về đến nhà thì trời đổ mưa.',
    note: '"Scarcely" dùng y hệt. Vế sau bắt đầu bằng WHEN (không phải than).',
    formality: 3,
  },
  {
    key: 'noSooner',
    family: 'time',
    label: 'No sooner … than',
    normal: 'She:S / had:A / no sooner:T / sat down:V / than:T / the phone rang.:R',
    inverted: 'No sooner:T / had:A / she:S / sat down:V / than:T / the phone rang.:R',
    formula: 'No sooner + had + S + V3 + than + S + V2',
    vi: 'Cô ấy vừa ngồi xuống thì điện thoại reo.',
    note: '"sooner" là dạng so sánh hơn nên đi với THAN.',
    formality: 3,
  },
  {
    key: 'notUntil',
    family: 'time',
    label: 'Not until',
    normal: 'I:S / didn’t:A / know:V / the truth:R / until I read her letter.:T',
    inverted: 'Not until I read her letter:T / did:A / I:S / know:V / the truth.:R',
    formula: 'Not until + mốc thời gian / mệnh đề + trợ động từ + S + V',
    vi: 'Mãi đến khi đọc thư của cô ấy tôi mới biết sự thật.',
    note: '"not" chuyển lên đi cùng "until"; "didn’t" chỉ còn "did" và nhảy lên trước chủ ngữ. Đảo ở mệnh đề chính, không đảo trong "I read her letter".',
    formality: 3,
  },
  // ---- so / such
  {
    key: 'soThat',
    family: 'soSuch',
    label: 'So + adj … that',
    normal: 'The storm:S / was:A / so strong:T / that all flights were cancelled.:R',
    inverted: 'So strong:T / was:A / the storm:S / that all flights were cancelled.:R',
    formula: 'So + adj + be + S + that + mệnh đề',
    vi: 'Cơn bão mạnh đến mức tất cả chuyến bay đều bị hủy.',
    note: 'Động từ "be" tự đảo, không cần do. Với động từ thường: So fast did he run that…',
    formality: 3,
  },
  {
    key: 'suchThat',
    family: 'soSuch',
    label: 'Such … that',
    normal: 'The noise:S / was:A / such:T / that nobody could sleep.:R',
    inverted: 'Such:T / was:A / the noise:S / that nobody could sleep.:R',
    formula: 'Such + be + N + that + mệnh đề',
    vi: 'Tiếng ồn lớn đến mức không ai ngủ được.',
    note: '"Such" đứng một mình (không có tính từ) nghĩa là "lớn / dữ dội đến mức". Be chia theo danh từ: Such were the problems that…',
    formality: 3,
  },
  // ---- conditionals
  {
    key: 'had',
    family: 'cond',
    label: 'Had … (loại 3)',
    normal: 'If:X / I:S / had:A / known:V / the truth, I would have told you.:R',
    inverted: 'Had:A / I:S / known:V / the truth, I would have told you.:R',
    formula: 'Had + S + V3, S + would have + V3',
    vi: 'Nếu tôi biết sự thật thì tôi đã nói với bạn rồi.',
    note: 'Bỏ "If", đưa "had" lên đầu. Ở đây chính trợ động từ đóng vai trò "trigger".',
    formality: 2,
  },
  {
    key: 'were',
    family: 'cond',
    label: 'Were … (loại 2)',
    normal: 'If:X / I:S / were:A / in your position, I would accept the offer.:R',
    inverted: 'Were:A / I:S / in your position, I would accept the offer.:R',
    formula: 'Were + S + …, S + would + V',
    vi: 'Nếu tôi ở vị trí của bạn, tôi sẽ nhận lời đề nghị.',
    note: 'Chỉ đảo được với "were" (không đảo với động từ thường). Với động từ thường dùng "Were + S + to V": Were I to move…',
    formality: 3,
  },
  {
    key: 'should',
    family: 'cond',
    label: 'Should … (loại 1)',
    normal: 'If:X / you:S / should:A / need:V / any help, please call me.:R',
    inverted: 'Should:A / you:S / need:V / any help, please call me.:R',
    formula: 'Should + S + V, mệnh đề chính / câu mệnh lệnh',
    vi: 'Nếu bạn cần giúp đỡ, hãy gọi cho tôi.',
    note: 'Rất hay gặp trong email trang trọng: Should you have any questions…',
    formality: 2,
  },
  // ---- place
  {
    key: 'here',
    family: 'place',
    label: 'Here comes …',
    normal: 'The bus:S / comes:M / here.:T',
    inverted: 'Here:T / comes:M / the bus!:S',
    formula: 'Here / There + V + S (danh từ)',
    vi: 'Xe buýt tới rồi kìa!',
    note: 'Động từ chính "comes" nhảy lên, không mượn do. Nếu chủ ngữ là đại từ thì KHÔNG đảo: Here it comes!',
    formality: 1,
  },
  {
    key: 'down',
    family: 'place',
    label: 'Down came …',
    normal: 'The rain:S / came:M / down.:T',
    inverted: 'Down:T / came:M / the rain.:S',
    formula: 'Trạng từ chỉ hướng + V + S',
    vi: 'Mưa ào xuống.',
    note: 'Down / Up / Out / Away / Off + động từ chuyển động: Out jumped the cat. Tạo cảm giác bất ngờ, sinh động.',
    formality: 1,
  },
  {
    key: 'intoRoom',
    family: 'place',
    label: 'Into the room …',
    normal: 'A tall stranger:S / walked:M / into the room.:T',
    inverted: 'Into the room:T / walked:M / a tall stranger.:S',
    formula: 'Cụm giới từ nơi chốn + V + S',
    vi: 'Một người lạ cao lớn bước vào phòng.',
    note: 'Văn phong kể chuyện: đưa nơi chốn lên trước để đẩy nhân vật mới (thông tin mới) ra cuối câu.',
    formality: 3,
  },
]

const ROLE_LEGEND = [
  { role: 'T', label: 'Yếu tố đứng đầu (trigger)' },
  { role: 'A', label: 'Trợ động từ / be nhảy lên' },
  { role: 'D', label: 'do / does / did thêm vào' },
  { role: 'M', label: 'Động từ chính nhảy lên' },
  { role: 'S', label: 'Chủ ngữ' },
  { role: 'X', label: 'Từ sẽ biến mất' },
]

const RULES = [
  {
    title: 'Chỉ đảo khi yếu tố phủ định / hạn chế đứng ĐẦU câu',
    body: 'Nếu "never, rarely, only then…" vẫn ở giữa câu thì câu giữ trật tự bình thường. Đảo ngữ chỉ xảy ra khi bạn đưa yếu tố đó lên đầu để nhấn mạnh.',
    pairs: [
      { en: 'I have [never] been there.', ok: true, tag: 'không đảo' },
      { en: '[Never] {have} I been there.', ok: true, tag: 'đảo' },
      { en: 'Never I have been there.', ok: false, tag: 'sai' },
    ],
  },
  {
    title: 'Đảo TRỢ ĐỘNG TỪ, không đảo động từ chính',
    body: 'Đưa trợ động từ (have, will, can, should, be…) lên trước chủ ngữ. Không có trợ động từ thì mượn do / does / did và đưa động từ chính về nguyên mẫu. Ngoại lệ: đảo ngữ nơi chốn đảo luôn động từ chính.',
    pairs: [
      { en: '[Rarely] {does} he call home.', ok: true, tag: 'mượn does' },
      { en: '[Seldom] {is} she late.', ok: true, tag: 'be tự đảo' },
      { en: 'Rarely calls he home.', ok: false, tag: 'sai' },
    ],
  },
  {
    title: 'Only after / Only when / Not until: đảo ở mệnh đề chính',
    body: 'Mệnh đề đi liền sau "only… / not until…" giữ nguyên trật tự; phần đảo nằm ở mệnh đề chính phía sau.',
    pairs: [
      { en: '[Not until] I saw her {did} I believe it.', ok: true, tag: 'đúng' },
      { en: 'Not until did I see her I believed it.', ok: false, tag: 'sai' },
    ],
  },
  {
    title: 'Đảo ngữ = văn phong trang trọng',
    body: 'Đảo ngữ thường dùng trong văn viết, diễn văn, báo chí, email trang trọng và bài thi (IELTS Writing, chuyển đổi câu). Trong hội thoại hằng ngày người bản xứ thường nói câu thường. Riêng "Here comes… / There goes…" thì rất tự nhiên trong văn nói.',
    pairs: [
      { en: 'I’ve never seen anything like it.', ok: true, tag: 'văn nói' },
      { en: '[Never] {have} I seen anything like it.', ok: true, tag: 'trang trọng' },
    ],
  },
]

const MISTAKES = [
  { wrong: 'Never I have seen such a mess.', right: 'Never have I seen such a mess.', why: 'Đưa "never" lên đầu thì phải đảo trợ động từ "have" lên trước chủ ngữ.' },
  { wrong: 'Rarely she goes to the cinema.', right: 'Rarely does she go to the cinema.', why: 'Không có trợ động từ → mượn "does".' },
  { wrong: 'Rarely does she goes to the cinema.', right: 'Rarely does she go to the cinema.', why: '"does" đã chia ngôi 3 số ít, động từ chính phải ở nguyên mẫu.' },
  { wrong: 'Not until I got home I noticed the cut.', right: 'Not until I got home did I notice the cut.', why: 'Phải đảo ở mệnh đề chính (did I notice).' },
  { wrong: 'Hardly had I sat down than the bell rang.', right: 'Hardly had I sat down when the bell rang.', why: 'Hardly / Scarcely đi với WHEN; chỉ No sooner mới đi với THAN.' },
  { wrong: 'If had I known, I would have come.', right: 'Had I known, I would have come.', why: 'Đảo ngữ điều kiện thay thế "if" — không dùng cả hai.' },
  { wrong: 'Hadn’t I known the risk, I would have signed.', right: 'Had I not known the risk, I would have signed.', why: 'Trong đảo ngữ điều kiện, "not" đứng sau chủ ngữ, không viết tắt.' },
  { wrong: 'Here comes it!', right: 'Here it comes!', why: 'Chủ ngữ là đại từ (it, he, they…) thì không đảo ở đảo ngữ nơi chốn.' },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseLine(line) {
  const counts = {}
  return line.split(' / ').map((chunk) => {
    const cut = chunk.lastIndexOf(':')
    const text = chunk.slice(0, cut)
    const role = chunk.slice(cut + 1)
    const n = counts[role] ?? 0
    counts[role] = n + 1
    return { id: `${role}${n}`, text, role }
  })
}

function plainLine(line) {
  return parseLine(line).map((t) => t.text).join(' ')
}

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const ROLE_CLASS = {
  T: styles.roleT,
  A: styles.roleA,
  D: styles.roleD,
  M: styles.roleM,
  S: styles.roleS,
  V: styles.roleV,
  R: styles.roleR,
  X: styles.roleX,
}

function Marked({ text }) {
  const parts = text.split(/(\[[^\]]+\]|\{[^}]+\})/g).filter(Boolean)
  return parts.map((p, i) => {
    if (p.startsWith('[')) return <mark key={i} className={styles.mkT}>{p.slice(1, -1)}</mark>
    if (p.startsWith('{')) return <mark key={i} className={styles.mkA}>{p.slice(1, -1)}</mark>
    return <span key={i}>{p}</span>
  })
}

/* ------------------------------------------------------------------ */
/*  Signature: swap board                                              */
/* ------------------------------------------------------------------ */

function SwapBoard() {
  const [familyKey, setFamilyKey] = useState('negative')
  const [exKey, setExKey] = useState('never')
  const [inverted, setInverted] = useState(false)
  const [playId, setPlayId] = useState(1)

  const ex = TRIGGERS.find((t) => t.key === exKey)
  const family = FAMILIES.find((f) => f.key === ex.family)
  const tokens = useMemo(() => parseLine(inverted ? ex.inverted : ex.normal), [ex, inverted])
  const familyTriggers = TRIGGERS.filter((t) => t.family === familyKey)

  const chipEls = useRef(new Map())
  const before = useRef(null)
  const timer = useRef(0)

  const snapshot = () => {
    const rects = new Map()
    chipEls.current.forEach((el, id) => rects.set(id, el.getBoundingClientRect()))
    before.current = rects
  }

  // auto-play the inversion shortly after a trigger is chosen
  useEffect(() => {
    if (!playId) return undefined
    timer.current = window.setTimeout(() => {
      snapshot()
      setInverted(true)
    }, 750)
    return () => window.clearTimeout(timer.current)
  }, [playId])

  // FLIP animation: old position → new position, the auxiliary jumps in an arc
  useLayoutEffect(() => {
    const prev = before.current
    before.current = null
    if (!prev || reducedMotion()) return
    chipEls.current.forEach((el, id) => {
      if (typeof el.animate !== 'function') return
      const role = el.dataset.role
      const now = el.getBoundingClientRect()
      const old = prev.get(id)
      if (!old) {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(-34px) scale(0.5)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 520, delay: 380, easing: 'cubic-bezier(.2,.9,.3,1.35)', fill: 'backwards' },
        )
        return
      }
      const dx = old.left - now.left
      const dy = old.top - now.top
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return
      const jump = role === 'A' || role === 'M'
      const frames = jump
        ? [
            { transform: `translate(${dx}px, ${dy}px)` },
            { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 58}px) rotate(-8deg)`, offset: 0.5 },
            { transform: 'none' },
          ]
        : [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }]
      el.animate(frames, { duration: jump ? 820 : 640, easing: 'cubic-bezier(.45,.05,.25,1)' })
    })
  }, [tokens])

  const chooseFamily = (key) => {
    setFamilyKey(key)
    const first = TRIGGERS.find((t) => t.family === key)
    chooseTrigger(first.key)
  }

  const chooseTrigger = (key) => {
    window.clearTimeout(timer.current)
    setExKey(key)
    setInverted(false)
    setPlayId((n) => n + 1)
  }

  const flip = () => {
    window.clearTimeout(timer.current)
    snapshot()
    setInverted((v) => !v)
  }

  const hasDo = ex.inverted.includes(':D')
  const jumper = ex.inverted.includes(':M') ? 'động từ chính' : hasDo ? 'do / does / did (thêm vào)' : 'trợ động từ'

  return (
    <section className={styles.board} style={{ '--fam': family.color }} aria-labelledby="inv-board-title">
      <div className={styles.boardHead}>
        <p className={styles.kicker}>Bàn đảo chữ</p>
        <h2 id="inv-board-title" className={styles.boardTitle}>Đưa trigger lên đầu — trợ động từ nhảy qua chủ ngữ</h2>
      </div>

      <div className={styles.families} role="group" aria-label="Nhóm đảo ngữ">
        {FAMILIES.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`${styles.familyBtn} ${f.key === familyKey ? styles.familyOn : ''}`}
            style={{ '--c': f.color }}
            aria-pressed={f.key === familyKey}
            onClick={() => chooseFamily(f.key)}
          >
            <span className={styles.familyDot} aria-hidden="true" />
            {f.label}
          </button>
        ))}
      </div>

      <div className={styles.triggers} role="group" aria-label="Chọn trigger">
        {familyTriggers.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`${styles.triggerBtn} ${t.key === exKey ? styles.triggerOn : ''}`}
            aria-pressed={t.key === exKey}
            onClick={() => chooseTrigger(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.press}>
        <div className={styles.pressLabel}>
          <span className={inverted ? styles.stateInv : styles.stateNorm}>
            {inverted ? 'Đảo ngữ' : 'Câu thường'}
          </span>
          <span className={styles.formality} title="Mức độ trang trọng">
            {[1, 2, 3].map((n) => (
              <span key={n} className={`${styles.fDot} ${n <= ex.formality ? styles.fDotOn : ''}`} aria-hidden="true" />
            ))}
            <span>{FORMALITY[ex.formality]}</span>
          </span>
        </div>

        <div className={styles.line} aria-hidden="true">
          {tokens.map((tok) => (
            <span
              key={`${ex.key}-${tok.id}`}
              ref={(el) => {
                if (el) chipEls.current.set(tok.id, el)
                else chipEls.current.delete(tok.id)
              }}
              data-role={tok.role}
              className={`${styles.chip} ${ROLE_CLASS[tok.role]}`}
            >
              {tok.role === 'D' && <span className={styles.plus}>+</span>}
              {tok.text}
            </span>
          ))}
        </div>
        <p className={styles.srOnly} aria-live="polite">
          {inverted ? 'Đảo ngữ: ' : 'Câu thường: '}
          {tokens.map((t) => t.text).join(' ')}
        </p>

        <div className={styles.pressFoot}>
          <Button type="primary" icon={<RetweetOutlined />} onClick={flip} className={styles.flipBtn}>
            {inverted ? 'Về câu thường' : 'Đảo ngữ!'}
          </Button>
          <span className={styles.jumpNote}>
            Nhảy lên trước chủ ngữ: <strong>{jumper}</strong>
          </span>
        </div>
      </div>

      <div className={styles.readout}>
        <div className={styles.readRow}>
          <span className={styles.readTag}>Trước</span>
          <span className={styles.readText}>{plainLine(ex.normal)}</span>
        </div>
        <div className={styles.readRow}>
          <span className={`${styles.readTag} ${styles.readTagInv}`}>Sau</span>
          <span className={`${styles.readText} ${styles.readStrong}`}>{plainLine(ex.inverted)}</span>
        </div>
        <p className={styles.formula}>
          <span className={styles.formulaLabel}>Công thức</span> {ex.formula}
        </p>
        <p className={styles.meaning}>{ex.vi}</p>
        <p className={styles.note}>
          <BulbOutlined aria-hidden="true" /> {ex.note}
        </p>
      </div>

      <ul className={styles.legend} aria-label="Chú thích màu">
        {ROLE_LEGEND.map((l) => (
          <li key={l.role}>
            <span className={`${styles.legendChip} ${ROLE_CLASS[l.role]}`} aria-hidden="true" />
            {l.label}
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Rules                                                              */
/* ------------------------------------------------------------------ */

function Rules() {
  return (
    <section className={styles.section} aria-labelledby="inv-rules-title">
      <h2 id="inv-rules-title" className={styles.h2}>
        <ReadOutlined aria-hidden="true" /> Bốn quy tắc vàng
      </h2>
      <ol className={styles.rules}>
        {RULES.map((r, i) => (
          <li key={r.title} className={styles.rule}>
            <span className={styles.ruleNum} aria-hidden="true">{i + 1}</span>
            <div className={styles.ruleBody}>
              <h3 className={styles.ruleTitle}>{r.title}</h3>
              <p className={styles.ruleText}>{r.body}</p>
              <ul className={styles.pairs}>
                {r.pairs.map((p) => (
                  <li key={p.en} className={p.ok ? styles.pairOk : styles.pairBad}>
                    <span className={styles.pairTag}>{p.ok ? '✓' : '✗'} {p.tag}</span>
                    <span className={p.ok ? '' : styles.strike}><Marked text={p.en} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Family reference                                                   */
/* ------------------------------------------------------------------ */

function FamilyReference() {
  const items = FAMILIES.map((f) => ({
    key: f.key,
    label: (
      <span className={styles.refLabel} style={{ '--c': f.color }}>
        <span className={styles.familyDot} aria-hidden="true" />
        <span>{f.label}</span>
        <span className={styles.refEn}>{f.en}</span>
      </span>
    ),
    children: (
      <div className={styles.refBody} style={{ '--c': f.color }}>
        <p className={styles.refFormula}>{f.formula}</p>
        <p className={styles.refUse}>{f.use}</p>
        <div className={styles.refWords}>
          {f.words.map((w) => (
            <span key={w} className={styles.refWord}>{w}</span>
          ))}
        </div>
        <ul className={styles.refExamples}>
          {f.examples.map((e) => (
            <li key={e.en}>
              <span className={styles.refEnLine}><Marked text={e.en} /></span>
              <span className={styles.refVi}>{e.vi}</span>
            </li>
          ))}
        </ul>
        <p className={styles.refNote}>{f.note}</p>
      </div>
    ),
  }))

  return (
    <section className={styles.section} aria-labelledby="inv-ref-title">
      <h2 id="inv-ref-title" className={styles.h2}>
        <ReadOutlined aria-hidden="true" /> Sáu nhóm đảo ngữ
      </h2>
      <Collapse items={items} defaultActiveKey={['negative']} className={styles.collapse} />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Common mistakes                                                    */
/* ------------------------------------------------------------------ */

function Mistakes() {
  return (
    <section className={styles.section} aria-labelledby="inv-mistakes-title">
      <h2 id="inv-mistakes-title" className={styles.h2}>
        <WarningOutlined aria-hidden="true" /> Lỗi hay gặp
      </h2>
      <div className={styles.mistakes}>
        {MISTAKES.map((m) => (
          <article key={m.wrong} className={styles.mistake}>
            <p className={styles.wrong}>
              <span aria-hidden="true">❌</span> <span className={styles.strike}>{m.wrong}</span>
            </p>
            <p className={styles.right}>
              <span aria-hidden="true">✅</span> {m.right}
            </p>
            <p className={styles.why}>{m.why}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Inversion() {
  return (
    <div className={styles.page}>
      <p className={styles.lead}>
        Đảo ngữ (inversion) là đưa <strong>trợ động từ</strong> lên trước <strong>chủ ngữ</strong> giống câu hỏi, nhưng câu vẫn là câu
        khẳng định. Nó xảy ra khi một yếu tố phủ định hoặc hạn chế (Never, Rarely, Only then…) được <strong>đưa lên đầu câu</strong> để
        nhấn mạnh. Chọn một trigger bên dưới và xem các chữ đổi chỗ.
      </p>
      <SwapBoard />
      <Rules />
      <FamilyReference />
      <Mistakes />
    </div>
  )
}
