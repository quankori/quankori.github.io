import { useId, useRef, useState } from 'react'
import { Button, Segmented, Tag, Tooltip, Typography } from 'antd'
import {
  ArrowRightOutlined,
  BulbOutlined,
  SwapOutlined,
} from '@ant-design/icons'
import styles from './Tenses.module.css'

const { Title, Paragraph, Text } = Typography

/* ------------------------------------------------------------------ */
/*  DATA — edit here                                                   */
/*  Formulas: [text] = auxiliary (highlighted).                        */
/*  Examples: **text** = verb phrase (highlighted).                    */
/* ------------------------------------------------------------------ */

const TIMES = [
  {
    key: 'past',
    label: 'Past',
    vi: 'Quá khứ',
    accent: '#d46b08',
    ink: '#873800',
    tints: ['#fff7e6', '#ffe7ba', '#ffd591', '#ffc069'],
    tag: 'orange',
    aux: 'was/were · had · did',
  },
  {
    key: 'present',
    label: 'Present',
    vi: 'Hiện tại',
    accent: '#08979c',
    ink: '#00474f',
    tints: ['#e6fffb', '#b5f5ec', '#87e8de', '#5cdbd3'],
    tag: 'cyan',
    aux: 'am/is/are · have/has · do/does',
  },
  {
    key: 'future',
    label: 'Future',
    vi: 'Tương lai',
    accent: '#722ed1',
    ink: '#391085',
    tints: ['#f9f0ff', '#efdbff', '#d3adf7', '#b37feb'],
    tag: 'purple',
    aux: 'will + nguyên mẫu',
  },
]

const ASPECTS = [
  {
    key: 'simple',
    label: 'Simple',
    vi: 'Đơn',
    block: 'V',
    idea: 'Nhìn sự việc như một điểm, một thói quen hoặc một sự thật.',
  },
  {
    key: 'continuous',
    label: 'Continuous',
    vi: 'Tiếp diễn',
    block: 'be + V-ing',
    idea: 'Đang diễn ra, còn dở dang tại một thời điểm.',
  },
  {
    key: 'perfect',
    label: 'Perfect',
    vi: 'Hoàn thành',
    block: 'have + V3',
    idea: 'Đã xong trước một mốc, đứng ở mốc đó nhìn lại.',
  },
  {
    key: 'perfectContinuous',
    label: 'Perfect Continuous',
    vi: 'Hoàn thành tiếp diễn',
    block: 'have + been + V-ing',
    idea: 'Kéo dài liên tục cho tới một mốc, nhấn mạnh thời lượng.',
  },
]

// Timeline geometry (SVG viewBox units)
const TL = { W: 640, H: 196, LEFT: 24, RIGHT: 616, NOW: 320, AXIS: 140, LANE: 96 }

const TENSES = [
  /* ----------------------------- PAST ----------------------------- */
  {
    id: 'past-simple',
    time: 'past',
    aspect: 'simple',
    name: 'Past Simple',
    vi: 'Quá khứ đơn',
    short: 'V2 / V-ed',
    formula: {
      pos: 'S + V2/V-ed',
      neg: 'S + [did not] + V',
      q: '[Did] + S + V?',
    },
    note: 'Với to be: was / were. Sau did / did not, động từ trở về nguyên mẫu: She didn’t go (không phải didn’t went).',
    usages: [
      { vi: 'Dùng khi hành động đã xảy ra và kết thúc tại một thời điểm xác định trong quá khứ.', en: 'I **visited** Da Nang last summer.' },
      { vi: 'Dùng khi kể một chuỗi hành động nối tiếp nhau trong quá khứ.', en: 'He **came** home, **took** a shower and **went** to bed.' },
      { vi: 'Dùng khi nói về thói quen trong quá khứ, nay không còn nữa.', en: 'When I was a kid, I **walked** to school every day.' },
    ],
    signals: ['yesterday', 'last night', 'last week', 'ago', 'in 2019', 'when I was…', 'then'],
    confusion: {
      vs: 'present-perfect',
      vi: 'Past Simple gắn với thời điểm đã kết thúc, không còn liên quan tới hiện tại. Present Perfect không nêu thời điểm và nhấn mạnh kết quả/liên hệ tới bây giờ.',
      a: 'She **worked** here for 5 years. (giờ đã nghỉ)',
      b: 'She **has worked** here for 5 years. (vẫn đang làm)',
    },
    diagram: {
      caption: 'Một chấm duy nhất tại thời điểm xác định trong quá khứ: đã xong và tách hẳn khỏi hiện tại.',
      shapes: [
        { type: 'tick', x: 170 },
        { type: 'dot', x: 170 },
        { type: 'label', x: 170, text: 'yesterday / in 2019' },
        { type: 'label', x: 230, y: 124, text: 'finished — no link to now', muted: true },
      ],
    },
  },
  {
    id: 'past-continuous',
    time: 'past',
    aspect: 'continuous',
    name: 'Past Continuous',
    vi: 'Quá khứ tiếp diễn',
    short: 'was/were + V-ing',
    formula: {
      pos: 'S + [was/were] + V-ing',
      neg: 'S + [was/were not] + V-ing',
      q: '[Was/Were] + S + V-ing?',
    },
    note: 'I / he / she / it → was; you / we / they → were.',
    usages: [
      { vi: 'Dùng khi hành động đang diễn ra tại một thời điểm xác định trong quá khứ.', en: 'At 8 p.m. yesterday, I **was watching** TV.' },
      { vi: 'Dùng khi một hành động đang diễn ra thì bị hành động khác (Past Simple) xen vào.', en: 'I **was cooking** when the phone rang.' },
      { vi: 'Dùng khi hai hành động diễn ra song song trong quá khứ.', en: 'While she **was studying**, her brother **was playing** games.' },
      { vi: 'Dùng để tả bối cảnh mở đầu một câu chuyện.', en: 'The sun **was shining** and the birds **were singing**.' },
    ],
    signals: ['at this time yesterday', 'at 8 p.m. last night', 'while', 'when', 'all evening'],
    confusion: {
      vs: 'past-simple',
      vi: 'Hành động dài làm nền dùng Past Continuous; hành động ngắn xen vào dùng Past Simple.',
      a: 'I **was sleeping** when the alarm went off. (đang ngủ — nền)',
      b: 'The alarm **went off** at 6. (một điểm — xen vào)',
    },
    diagram: {
      caption: 'Đường lượn sóng: hành động đang dở dang quanh một mốc trong quá khứ — thường là lúc có việc khác xen vào.',
      shapes: [
        { type: 'wave', x1: 80, x2: 260 },
        { type: 'ref', x: 175, label: '8 p.m. / the phone rang' },
        { type: 'label', x: 120, text: 'in progress' },
      ],
    },
  },
  {
    id: 'past-perfect',
    time: 'past',
    aspect: 'perfect',
    name: 'Past Perfect',
    vi: 'Quá khứ hoàn thành',
    short: 'had + V3',
    formula: {
      pos: 'S + [had] + V3',
      neg: 'S + [had not] + V3',
      q: '[Had] + S + V3?',
    },
    note: 'had dùng cho mọi chủ ngữ. had not = hadn’t. V3 = quá khứ phân từ (gone, seen, worked…).',
    usages: [
      { vi: 'Dùng khi một hành động đã hoàn tất trước một hành động khác trong quá khứ.', en: 'When we arrived, the film **had** already **started**.' },
      { vi: 'Dùng khi hành động hoàn tất trước một mốc thời gian trong quá khứ (by + mốc quá khứ).', en: 'By 2010, she **had moved** to Canada.' },
      { vi: 'Dùng trong câu điều kiện loại 3 và câu ước về quá khứ.', en: 'If I **had known**, I would have helped.' },
    ],
    signals: ['before', 'after', 'by the time', 'already', 'by + past time', 'until then'],
    confusion: {
      vs: 'past-simple',
      vi: 'Có hai việc trong quá khứ: việc xảy ra trước dùng Past Perfect, việc xảy ra sau dùng Past Simple.',
      a: 'The train **had left** before I got to the station. (rời đi trước)',
      b: 'I **got** to the station at 9. (đến sau)',
    },
    diagram: {
      caption: 'Hành động 1 hoàn tất trước mốc quá khứ (hành động 2): “quá khứ của quá khứ”.',
      shapes: [
        { type: 'dot', x: 100 },
        { type: 'line', x1: 112, x2: 222, arrow: true },
        { type: 'ref', x: 230, label: 'action 2 / past moment' },
        { type: 'label', x: 100, text: 'action 1 (earlier)' },
      ],
    },
  },
  {
    id: 'past-perfect-continuous',
    time: 'past',
    aspect: 'perfectContinuous',
    name: 'Past Perfect Continuous',
    vi: 'Quá khứ hoàn thành tiếp diễn',
    short: 'had been + V-ing',
    formula: {
      pos: 'S + [had been] + V-ing',
      neg: 'S + [had not been] + V-ing',
      q: '[Had] + S + [been] + V-ing?',
    },
    note: 'Thường đi với for / since để nói hành động đã kéo dài bao lâu tính tới mốc quá khứ.',
    usages: [
      { vi: 'Dùng khi hành động kéo dài liên tục cho tới trước một hành động/mốc trong quá khứ.', en: 'She **had been working** there for ten years before she retired.' },
      { vi: 'Dùng để giải thích nguyên nhân của một tình trạng trong quá khứ.', en: 'The ground was wet because it **had been raining**.' },
    ],
    signals: ['for', 'since', 'before', 'by the time', 'how long', 'all day'],
    confusion: {
      vs: 'past-perfect',
      vi: 'Past Perfect nhấn mạnh việc đã hoàn tất (kết quả, số lượng). Past Perfect Continuous nhấn mạnh quá trình kéo dài.',
      a: 'He **had been writing** for hours when the power went out.',
      b: 'He **had written** two chapters by noon.',
    },
    diagram: {
      caption: 'Quá trình kéo dài liên tục (lượn sóng) và chạm tới một mốc trong quá khứ.',
      shapes: [
        { type: 'wave', x1: 60, x2: 222, arrow: true },
        { type: 'ref', x: 230, label: 'past moment' },
        { type: 'label', x: 140, text: 'for hours, non-stop' },
      ],
    },
  },

  /* ---------------------------- PRESENT --------------------------- */
  {
    id: 'present-simple',
    time: 'present',
    aspect: 'simple',
    name: 'Present Simple',
    vi: 'Hiện tại đơn',
    short: 'V / V(s/es)',
    formula: {
      pos: 'S + V(s/es)',
      neg: 'S + [do/does not] + V',
      q: '[Do/Does] + S + V?',
    },
    note: 'He / she / it → V thêm -s/-es và dùng does. Với to be: am / is / are.',
    usages: [
      { vi: 'Dùng khi diễn tả thói quen, hành động lặp đi lặp lại.', en: 'She **goes** to the gym every morning.' },
      { vi: 'Dùng khi nói về sự thật hiển nhiên, chân lý.', en: 'Water **boils** at 100°C.' },
      { vi: 'Dùng cho lịch trình, thời gian biểu cố định (tàu xe, lịch học).', en: 'The train **leaves** at 7:30 tomorrow.' },
      { vi: 'Dùng với động từ chỉ trạng thái: know, like, want, believe…', en: 'I **know** the answer.' },
    ],
    signals: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day', 'on Mondays'],
    confusion: {
      vs: 'present-continuous',
      vi: 'Present Simple là việc lâu dài, thường xuyên. Present Continuous là việc đang diễn ra hoặc chỉ tạm thời.',
      a: 'I **work** in Hanoi. (công việc lâu dài)',
      b: 'I **am working** in Hanoi this month. (tạm thời)',
    },
    diagram: {
      caption: 'Những chấm lặp lại trải khắp quá khứ, hiện tại và tương lai: thói quen hoặc sự thật luôn đúng.',
      shapes: [
        { type: 'dots', xs: [70, 130, 190, 250, 320, 390, 450, 510, 570] },
        { type: 'label', x: 320, text: 'always · usually · every day' },
      ],
    },
  },
  {
    id: 'present-continuous',
    time: 'present',
    aspect: 'continuous',
    name: 'Present Continuous',
    vi: 'Hiện tại tiếp diễn',
    short: 'am/is/are + V-ing',
    formula: {
      pos: 'S + [am/is/are] + V-ing',
      neg: 'S + [am/is/are not] + V-ing',
      q: '[Am/Is/Are] + S + V-ing?',
    },
    note: 'Động từ trạng thái (know, love, believe, own…) thường không chia ở dạng tiếp diễn.',
    usages: [
      { vi: 'Dùng khi hành động đang diễn ra ngay lúc nói.', en: 'Listen! The baby **is crying**.' },
      { vi: 'Dùng khi hành động mang tính tạm thời quanh thời điểm hiện tại.', en: 'I **am reading** a great book this week.' },
      { vi: 'Dùng cho kế hoạch đã sắp xếp chắc chắn trong tương lai gần.', en: 'We **are meeting** the client tomorrow.' },
      { vi: 'Dùng với always để phàn nàn về một thói quen gây khó chịu.', en: 'He **is always leaving** his socks on the floor.' },
    ],
    signals: ['now', 'right now', 'at the moment', 'at present', 'currently', 'Look!', 'Listen!', 'this week'],
    confusion: {
      vs: 'present-simple',
      vi: 'Present Continuous là việc đang diễn ra hoặc tạm thời; Present Simple là việc cố định, thường xuyên.',
      a: 'She **is working** from home today. (tạm thời)',
      b: 'She **works** at a bank. (cố định)',
    },
    diagram: {
      caption: 'Một đường lượn sóng bao quanh NOW: hành động đang diễn ra, chưa kết thúc.',
      shapes: [
        { type: 'wave', x1: 240, x2: 400 },
        { type: 'label', x: 320, text: 'right now / at the moment' },
      ],
    },
  },
  {
    id: 'present-perfect',
    time: 'present',
    aspect: 'perfect',
    name: 'Present Perfect',
    vi: 'Hiện tại hoàn thành',
    short: 'have/has + V3',
    formula: {
      pos: 'S + [have/has] + V3',
      neg: 'S + [have/has not] + V3',
      q: '[Have/Has] + S + V3?',
    },
    note: 'He / she / it → has. Không dùng với mốc thời gian đã kết thúc như yesterday, last week, ago, in 2019.',
    usages: [
      { vi: 'Dùng khi hành động đã xảy ra, không rõ thời điểm, nhưng kết quả còn ở hiện tại.', en: 'I **have lost** my keys. (giờ vẫn chưa tìm thấy)' },
      { vi: 'Dùng khi nói về trải nghiệm tính đến hiện tại.', en: 'She **has visited** Japan three times.' },
      { vi: 'Dùng khi trạng thái bắt đầu trong quá khứ và kéo dài đến nay (since / for).', en: 'We **have known** each other since 2015.' },
      { vi: 'Dùng khi việc vừa mới xảy ra (just, already, yet).', en: 'He **has just finished** his homework.' },
    ],
    signals: ['just', 'already', 'yet', 'ever', 'never', 'so far', 'recently', 'since', 'for', 'up to now'],
    confusion: {
      vs: 'past-simple',
      vi: 'Có thời điểm cụ thể đã qua → Past Simple. Không nêu thời điểm, quan tâm kết quả bây giờ → Present Perfect.',
      a: 'I **have lost** my keys. (bây giờ không có chìa)',
      b: 'I **lost** my keys yesterday. (chuyện của hôm qua)',
    },
    diagram: {
      caption: 'Hành động xảy ra trong quá khứ (không nói rõ lúc nào); mũi tên nối tới NOW: kết quả còn ảnh hưởng tới hiện tại.',
      shapes: [
        { type: 'dot', x: 150 },
        { type: 'line', x1: 162, x2: 312, arrow: true },
        { type: 'label', x: 150, text: 'action (time not stated)' },
        { type: 'label', x: 320, y: 30, text: 'result / link to NOW' },
      ],
    },
  },
  {
    id: 'present-perfect-continuous',
    time: 'present',
    aspect: 'perfectContinuous',
    name: 'Present Perfect Continuous',
    vi: 'Hiện tại hoàn thành tiếp diễn',
    short: 'have/has been + V-ing',
    formula: {
      pos: 'S + [have/has been] + V-ing',
      neg: 'S + [have/has not been] + V-ing',
      q: '[Have/Has] + S + [been] + V-ing?',
    },
    note: 'Hay đi với How long…? và for / since để hỏi – đáp về thời lượng.',
    usages: [
      { vi: 'Dùng khi hành động bắt đầu trong quá khứ, kéo dài liên tục tới hiện tại, nhấn mạnh thời lượng.', en: 'I **have been learning** English for three years.' },
      { vi: 'Dùng khi hành động vừa dừng nhưng để lại dấu vết thấy được ở hiện tại.', en: 'She is out of breath because she **has been running**.' },
      { vi: 'Dùng để hỏi một việc đã kéo dài bao lâu.', en: 'How long **have** you **been waiting**?' },
    ],
    signals: ['for', 'since', 'all day', 'all morning', 'how long', 'lately', 'recently'],
    confusion: {
      vs: 'present-perfect',
      vi: 'Present Perfect nhấn mạnh kết quả, số lượng đã xong. Present Perfect Continuous nhấn mạnh quá trình, thời gian kéo dài.',
      a: 'I **have been writing** emails all morning. (quá trình)',
      b: 'I **have written** three emails. (kết quả)',
    },
    diagram: {
      caption: 'Lượn sóng bắt đầu từ quá khứ, chạy liên tục tới NOW (có thể còn tiếp): nhấn mạnh quá trình kéo dài.',
      shapes: [
        { type: 'wave', x1: 130, x2: 312, arrow: true },
        { type: 'wave', x1: 324, x2: 396, faded: true },
        { type: 'label', x: 220, text: 'for 3 years / since 2023' },
        { type: 'label', x: 362, y: 124, text: 'may continue', muted: true },
      ],
    },
  },

  /* ----------------------------- FUTURE --------------------------- */
  {
    id: 'future-simple',
    time: 'future',
    aspect: 'simple',
    name: 'Future Simple',
    vi: 'Tương lai đơn',
    short: 'will + V',
    formula: {
      pos: 'S + [will] + V',
      neg: 'S + [will not] + V',
      q: '[Will] + S + V?',
    },
    note: 'will not = won’t. Động từ sau will luôn ở dạng nguyên mẫu, cho mọi chủ ngữ.',
    usages: [
      { vi: 'Dùng khi quyết định ngay tại lúc nói.', en: 'It’s cold. I **will close** the window.' },
      { vi: 'Dùng khi dự đoán không có căn cứ rõ ràng (hay đi với think, probably).', en: 'I think it **will rain** tomorrow.' },
      { vi: 'Dùng cho lời hứa, lời đề nghị, lời yêu cầu.', en: 'I **will help** you with your homework.' },
    ],
    signals: ['tomorrow', 'next week', 'soon', 'in 2030', 'I think', 'probably', 'perhaps'],
    confusion: {
      vs: 'future-continuous',
      vi: 'will + V là một việc (một điểm) sẽ xảy ra. will be + V-ing là việc đang dở dang tại một thời điểm tương lai.',
      a: 'I **will call** you at 8. (gọi lúc 8 giờ)',
      b: 'At 8, I **will be having** dinner. (lúc 8 giờ đang ăn)',
    },
    diagram: {
      caption: 'Một chấm ở tương lai: một hành động, quyết định hay dự đoán sẽ xảy ra.',
      shapes: [
        { type: 'tick', x: 470 },
        { type: 'dot', x: 470 },
        { type: 'label', x: 470, text: 'tomorrow / next week' },
      ],
    },
  },
  {
    id: 'future-continuous',
    time: 'future',
    aspect: 'continuous',
    name: 'Future Continuous',
    vi: 'Tương lai tiếp diễn',
    short: 'will be + V-ing',
    formula: {
      pos: 'S + [will be] + V-ing',
      neg: 'S + [will not be] + V-ing',
      q: '[Will] + S + [be] + V-ing?',
    },
    note: 'Luôn cần một mốc thời gian tương lai cụ thể để “đứng” vào giữa hành động.',
    usages: [
      { vi: 'Dùng khi hành động đang diễn ra tại một thời điểm xác định trong tương lai.', en: 'This time tomorrow, I **will be flying** to Paris.' },
      { vi: 'Dùng cho việc sẽ diễn ra như một phần lịch trình thông thường.', en: 'I **will be passing** the post office, so I can post your letter.' },
      { vi: 'Dùng để hỏi lịch sự về kế hoạch của người khác.', en: '**Will** you **be using** the car tonight?' },
    ],
    signals: ['this time tomorrow', 'at 8 a.m. next Monday', 'this time next week', 'all day tomorrow'],
    confusion: {
      vs: 'future-perfect',
      vi: 'Future Continuous: tại mốc tương lai việc vẫn đang làm dở. Future Perfect: trước mốc đó việc đã xong.',
      a: 'At 9, I **will be writing** the report. (đang viết)',
      b: 'By 9, I **will have written** the report. (đã viết xong)',
    },
    diagram: {
      caption: 'Tại một mốc trong tương lai, hành động đang diễn ra dở dang.',
      shapes: [
        { type: 'wave', x1: 390, x2: 570 },
        { type: 'ref', x: 480, label: '8 p.m. tomorrow' },
        { type: 'label', x: 425, text: 'in progress' },
      ],
    },
  },
  {
    id: 'future-perfect',
    time: 'future',
    aspect: 'perfect',
    name: 'Future Perfect',
    vi: 'Tương lai hoàn thành',
    short: 'will have + V3',
    formula: {
      pos: 'S + [will have] + V3',
      neg: 'S + [will not have] + V3',
      q: '[Will] + S + [have] + V3?',
    },
    note: 'Gần như luôn có by + mốc tương lai hoặc by the time + mệnh đề (chia hiện tại đơn).',
    usages: [
      { vi: 'Dùng khi hành động sẽ hoàn tất trước một thời điểm trong tương lai.', en: 'By 2030, I **will have graduated**.' },
      { vi: 'Dùng khi hành động hoàn tất trước một hành động khác trong tương lai.', en: 'When you arrive, we **will have finished** dinner.' },
    ],
    signals: ['by + future time', 'by the time', 'by then', 'before', 'by the end of…'],
    confusion: {
      vs: 'future-simple',
      vi: 'Future Simple: việc xảy ra vào thời điểm đó. Future Perfect: việc xong trước, chậm nhất là thời điểm đó.',
      a: 'I **will have finished** the report by Friday. (xong trước thứ Sáu)',
      b: 'I **will finish** the report on Friday. (làm vào thứ Sáu)',
    },
    diagram: {
      caption: 'Hành động sẽ hoàn tất trước (hoặc muộn nhất là đúng) một mốc trong tương lai.',
      shapes: [
        { type: 'dot', x: 410 },
        { type: 'line', x1: 422, x2: 502, arrow: true },
        { type: 'ref', x: 510, label: 'deadline: by Friday' },
        { type: 'label', x: 410, text: 'done' },
      ],
    },
  },
  {
    id: 'future-perfect-continuous',
    time: 'future',
    aspect: 'perfectContinuous',
    name: 'Future Perfect Continuous',
    vi: 'Tương lai hoàn thành tiếp diễn',
    short: 'will have been + V-ing',
    formula: {
      pos: 'S + [will have been] + V-ing',
      neg: 'S + [will not have been] + V-ing',
      q: '[Will] + S + [have been] + V-ing?',
    },
    note: 'Công thức: by + mốc tương lai + for + khoảng thời gian.',
    usages: [
      { vi: 'Dùng khi hành động kéo dài liên tục tới một thời điểm trong tương lai, nhấn mạnh thời lượng.', en: 'By next June, I **will have been working** here for ten years.' },
      { vi: 'Dùng để giải thích trạng thái tại một thời điểm tương lai.', en: 'She’ll be exhausted at 6 because she **will have been driving** all day.' },
    ],
    signals: ['for + duration', 'by the time', 'by next…', 'by the end of…'],
    confusion: {
      vs: 'future-perfect',
      vi: 'Future Perfect nhấn mạnh kết quả, số lượng hoàn tất. Future Perfect Continuous nhấn mạnh quá trình kéo dài.',
      a: 'By Friday, I **will have been reading** for 20 hours.',
      b: 'By Friday, I **will have read** five books.',
    },
    diagram: {
      caption: 'Quá trình bắt đầu từ trước, kéo dài liên tục qua NOW cho tới một mốc tương lai: nhấn mạnh tổng thời lượng.',
      shapes: [
        { type: 'wave', x1: 180, x2: 502, arrow: true },
        { type: 'ref', x: 510, label: 'by 2030' },
        { type: 'label', x: 350, text: 'for 10 years, non-stop' },
      ],
    },
  },
]

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TIME_BY_KEY = Object.fromEntries(TIMES.map((t) => [t.key, t]))
const ASPECT_INDEX = Object.fromEntries(ASPECTS.map((a, i) => [a.key, i]))
const TENSE_BY_ID = Object.fromEntries(TENSES.map((t) => [t.id, t]))
const GRID = TIMES.map((time) =>
  ASPECTS.map((aspect) => TENSES.find((t) => t.time === time.key && t.aspect === aspect.key)),
)

function palette(tense) {
  const time = TIME_BY_KEY[tense.time]
  return {
    '--accent': time.accent,
    '--ink': time.ink,
    '--tint': time.tints[ASPECT_INDEX[tense.aspect]],
    '--soft': time.tints[0],
  }
}

function timeVars(time) {
  return { '--accent': time.accent, '--ink': time.ink, '--tint': time.tints[1], '--soft': time.tints[0] }
}

function Formula({ text }) {
  return text
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('[') ? (
        <mark key={i} className={styles.aux}>
          {part.slice(1, -1)}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      ),
    )
}

function Example({ text }) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith('**') ? (
        <strong key={i} className={styles.verb}>
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      ),
    )
}

function wavePath(x1, x2, y, arrow) {
  const end = arrow ? x2 - 10 : x2
  const n = Math.max(2, Math.round((end - x1) / 9))
  const h = (end - x1) / n
  let d = `M${x1} ${y}`
  for (let i = 0; i < n; i++) {
    const cx = x1 + h * i + h / 2
    const cy = y + (i % 2 === 0 ? -12 : 12)
    d += ` Q${cx.toFixed(1)} ${cy} ${(x1 + h * (i + 1)).toFixed(1)} ${y}`
  }
  if (arrow) d += ` L${x2} ${y}`
  return d
}

/* Small aspect symbol, reused in the legend, matrix and cheat sheet */
function AspectGlyph({ aspect, color = 'currentColor', size = 40 }) {
  const h = size * 0.35
  const common = { fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  let body
  if (aspect === 'simple') body = <circle cx="20" cy="7" r="4" fill={color} />
  else if (aspect === 'continuous') body = <path d="M4 7 Q8 1 12 7 T20 7 T28 7 T36 7" {...common} />
  else if (aspect === 'perfect')
    body = (
      <g>
        <circle cx="5" cy="7" r="2.6" fill={color} />
        <path d="M8 7 H31 M27 3.5 L31 7 L27 10.5" {...common} />
        <path d="M36 1.5 V12.5" {...common} />
      </g>
    )
  else
    body = (
      <g>
        <path d="M3 7 Q6.5 1 10 7 T17 7 T24 7 L31 7 M27 3.5 L31 7 L27 10.5" {...common} />
        <path d="M36 1.5 V12.5" {...common} />
      </g>
    )
  return (
    <svg width={size} height={h} viewBox="0 0 40 14" aria-hidden="true" className={styles.glyph}>
      {body}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Timeline (signature visual)                                        */
/* ------------------------------------------------------------------ */

function Timeline({ tense }) {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const time = TIME_BY_KEY[tense.time]
  const accent = time.accent
  const { W, H, LEFT, RIGHT, NOW, AXIS, LANE } = TL
  const arrowId = `arrow-${uid}`
  const axisArrowId = `axis-${uid}`
  const titleId = `tl-title-${uid}`
  const descId = `tl-desc-${uid}`

  let region
  if (tense.time === 'past') region = { x: LEFT, w: NOW - LEFT }
  else if (tense.time === 'future') region = { x: NOW, w: RIGHT - NOW }
  else region = { x: NOW - 70, w: 140 }

  const renderShape = (s, i) => {
    const delay = { animationDelay: `${0.1 + i * 0.12}s` }
    switch (s.type) {
      case 'dots':
        return (
          <g key={i}>
            <line
              x1={s.xs[0]}
              x2={s.xs[s.xs.length - 1]}
              y1={LANE}
              y2={LANE}
              stroke={accent}
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="2 6"
            />
            {s.xs.map((x, j) => (
              <circle
                key={x}
                className={styles.pop}
                style={{ animationDelay: `${0.05 + j * 0.06}s` }}
                cx={x}
                cy={LANE}
                r="6.5"
                fill={accent}
              />
            ))}
          </g>
        )
      case 'dot':
        return (
          <g key={i} className={styles.pop} style={delay}>
            <circle cx={s.x} cy={LANE} r="13" fill={accent} fillOpacity="0.18" />
            <circle cx={s.x} cy={LANE} r="7.5" fill={accent} />
          </g>
        )
      case 'tick':
        return (
          <line
            key={i}
            className={styles.fade}
            style={delay}
            x1={s.x}
            x2={s.x}
            y1={LANE}
            y2={AXIS}
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
        )
      case 'line':
        return (
          <path
            key={i}
            className={styles.draw}
            style={delay}
            pathLength="1"
            d={`M${s.x1} ${LANE} L${s.x2} ${LANE}`}
            stroke={accent}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            markerEnd={s.arrow ? `url(#${arrowId})` : undefined}
          />
        )
      case 'wave':
        if (s.faded)
          return (
            <path
              key={i}
              className={styles.fadeSoft}
              style={delay}
              d={wavePath(s.x1, s.x2, LANE, false)}
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          )
        return (
          <path
            key={i}
            className={styles.draw}
            style={delay}
            pathLength="1"
            d={wavePath(s.x1, s.x2, LANE, s.arrow)}
            stroke={accent}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            markerEnd={s.arrow ? `url(#${arrowId})` : undefined}
          />
        )
      case 'ref':
        return (
          <g key={i} className={styles.fade} style={delay}>
            <line x1={s.x} x2={s.x} y1={AXIS} y2={42} stroke="#434343" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d={`M${s.x} 40 L${s.x + 15} 46 L${s.x} 52 Z`} fill="#434343" />
            <circle cx={s.x} cy={AXIS} r="5" fill="#fff" stroke="#434343" strokeWidth="2" />
            <text x={s.x} y={30} textAnchor="middle" className={styles.svgRef}>
              {s.label}
            </text>
          </g>
        )
      case 'label':
        return (
          <text
            key={i}
            className={`${styles.fade} ${s.muted ? styles.svgMuted : styles.svgLabel}`}
            style={{ ...delay, fill: s.muted ? undefined : time.ink }}
            x={s.x}
            y={s.y ?? LANE - 24}
            textAnchor={s.anchor ?? 'middle'}
          >
            {s.text}
          </text>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.timelineScroll}>
      <svg
        key={tense.id}
        className={styles.timelineSvg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
      >
        <title id={titleId}>{`Timeline: ${tense.name}`}</title>
        <desc id={descId}>{tense.diagram.caption}</desc>
        <defs>
          <marker id={arrowId} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill={accent} />
          </marker>
          <marker id={axisArrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 Z" fill="#8c8c8c" />
          </marker>
        </defs>

        {/* highlighted time region */}
        <rect
          className={styles.fade}
          x={region.x}
          y={40}
          width={region.w}
          height={AXIS - 40}
          rx="10"
          fill={time.tints[0]}
        />

        {/* axis */}
        <line
          x1={LEFT}
          x2={RIGHT}
          y1={AXIS}
          y2={AXIS}
          stroke="#8c8c8c"
          strokeWidth="2"
          markerEnd={`url(#${axisArrowId})`}
        />
        <text x={LEFT} y={AXIS + 30} className={styles.svgAxis}>
          ← PAST
        </text>
        <text x={RIGHT - 6} y={AXIS + 30} textAnchor="end" className={styles.svgAxis}>
          FUTURE →
        </text>

        {/* NOW marker — always visible */}
        <line x1={NOW} x2={NOW} y1={40} y2={AXIS + 6} stroke="#1677ff" strokeWidth="2" strokeDasharray="5 4" />
        <rect x={NOW - 27} y={AXIS + 13} width="54" height="24" rx="12" fill="#1677ff" />
        <text x={NOW} y={AXIS + 30} textAnchor="middle" className={styles.svgNow}>
          NOW
        </text>

        {tense.diagram.shapes.map(renderShape)}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Intro() {
  return (
    <section className={styles.intro} aria-labelledby="tenses-intro">
      <div className={styles.equation}>
        <span id="tenses-intro" className={styles.eqWord}>
          Thì
        </span>
        <span className={styles.eqOp}>=</span>
        <span className={styles.eqWord}>Thời gian</span>
        <span className={styles.eqOp}>+</span>
        <span className={styles.eqWord}>Khía cạnh</span>
        <span className={styles.eqOp}>→</span>
        <span className={styles.eqResult}>3 × 4 = 12</span>
      </div>
      <Paragraph className={styles.lead}>
        Đừng học thuộc 12 thì riêng lẻ. Mỗi thì chỉ là một <b>thời gian</b> (Past / Present / Future) ghép với một{' '}
        <b>khía cạnh</b> (Simple / Continuous / Perfect / Perfect Continuous). Nắm 3 thời gian và 4 khía cạnh là bạn tự
        suy ra được cả 12 công thức.
      </Paragraph>

      <div className={styles.legendGrid}>
        <div className={styles.legendBlock}>
          <Text className={styles.legendTitle}>3 thời gian — quyết định trợ động từ đầu tiên</Text>
          <ul className={styles.timeList}>
            {TIMES.map((t) => (
              <li key={t.key} className={styles.timeItem} style={timeVars(t)}>
                <span className={styles.timeSwatch} aria-hidden="true" />
                <span className={styles.timeName}>
                  {t.label} <span className={styles.timeVi}>· {t.vi}</span>
                </span>
                <code className={styles.timeAux}>{t.aux}</code>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.legendBlock}>
          <Text className={styles.legendTitle}>4 khía cạnh — “khối lắp ghép” phía sau</Text>
          <ul className={styles.aspectList}>
            {ASPECTS.map((a) => (
              <li key={a.key} className={styles.aspectItem}>
                <span className={styles.aspectIcon}>
                  <AspectGlyph aspect={a.key} color="#1f1f1f" size={34} />
                </span>
                <span className={styles.aspectText}>
                  <span className={styles.aspectName}>
                    {a.label} <span className={styles.timeVi}>· {a.vi}</span>
                  </span>
                  <code className={styles.aspectBlock}>{a.block}</code>
                  <span className={styles.aspectIdea}>{a.idea}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Paragraph className={styles.example}>
        <BulbOutlined aria-hidden="true" /> Ví dụ: <b>Past</b> + <b>Perfect Continuous</b> = <code>had been + V-ing</code>{' '}
        → <Example text="She **had been working** all day." />
      </Paragraph>
    </section>
  )
}

function Matrix({ selectedId, onSelect, panelId }) {
  const refs = useRef([])

  const focusCell = (r, c) => {
    const tense = GRID[r][c]
    onSelect(tense.id)
    refs.current[r * 4 + c]?.focus()
  }

  const onKeyDown = (e, r, c) => {
    let nr = r
    let nc = c
    if (e.key === 'ArrowRight') nc = Math.min(3, c + 1)
    else if (e.key === 'ArrowLeft') nc = Math.max(0, c - 1)
    else if (e.key === 'ArrowDown') nr = Math.min(2, r + 1)
    else if (e.key === 'ArrowUp') nr = Math.max(0, r - 1)
    else if (e.key === 'Home') nc = 0
    else if (e.key === 'End') nc = 3
    else return
    e.preventDefault()
    focusCell(nr, nc)
  }

  return (
    <div className={styles.matrixWrap}>
      <div className={styles.matrix} role="group" aria-label="Bản đồ 12 thì: hàng là thời gian, cột là khía cạnh">
        <div className={styles.corner} aria-hidden="true">
          <span>Time ↓</span>
          <span>Aspect →</span>
        </div>
        {ASPECTS.map((a) => (
          <div key={a.key} className={styles.colHead}>
            <AspectGlyph aspect={a.key} color="#595959" size={30} />
            <span className={styles.colLabel}>{a.label}</span>
            <span className={styles.colVi}>{a.vi}</span>
          </div>
        ))}
        {TIMES.map((time, r) => (
          <div key={time.key} className={styles.rowContents}>
            <div className={styles.rowHead} style={timeVars(time)}>
              <span className={styles.rowLabel}>{time.label}</span>
              <span className={styles.rowVi}>{time.vi}</span>
            </div>
            {GRID[r].map((tense, c) => {
              const selected = tense.id === selectedId
              return (
                <button
                  key={tense.id}
                  type="button"
                  ref={(el) => {
                    refs.current[r * 4 + c] = el
                  }}
                  className={`${styles.cell} ${selected ? styles.cellActive : ''}`}
                  style={palette(tense)}
                  tabIndex={selected ? 0 : -1}
                  aria-pressed={selected}
                  aria-controls={panelId}
                  onClick={() => onSelect(tense.id)}
                  onKeyDown={(e) => onKeyDown(e, r, c)}
                >
                  <AspectGlyph aspect={tense.aspect} color={TIME_BY_KEY[tense.time].accent} size={30} />
                  <span className={styles.cellName} lang="en">{tense.name}</span>
                  <span className={styles.cellFormula}>{tense.short}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <p className={styles.hint}>Bấm vào một ô (hoặc dùng phím mũi tên ← ↑ → ↓) để xem chi tiết.</p>
    </div>
  )
}

const FORMULA_ROWS = [
  { key: 'pos', sign: '+', label: 'Khẳng định' },
  { key: 'neg', sign: '−', label: 'Phủ định' },
  { key: 'q', sign: '?', label: 'Nghi vấn' },
]

function Detail({ tense, onSelect, panelId, panelRef }) {
  const time = TIME_BY_KEY[tense.time]
  const aspect = ASPECTS[ASPECT_INDEX[tense.aspect]]
  const other = TENSE_BY_ID[tense.confusion.vs]

  return (
    <section
      id={panelId}
      ref={panelRef}
      className={styles.detail}
      style={palette(tense)}
      aria-label={`Chi tiết: ${tense.name}`}
      tabIndex={-1}
    >
      <div key={tense.id} className={styles.detailInner}>
        <header className={styles.detailHead}>
          <div className={styles.detailTags}>
            <Tag color={time.tag}>{time.label}</Tag>
            <Tag>{aspect.label}</Tag>
          </div>
          <Title level={3} className={styles.detailTitle}>
            {tense.name}
          </Title>
          <Text className={styles.detailVi}>{tense.vi}</Text>
        </header>

        <figure className={styles.figure}>
          <Timeline tense={tense} />
          <figcaption className={styles.caption}>{tense.diagram.caption}</figcaption>
        </figure>

        <div className={styles.detailGrid}>
          <div className={styles.detailCol}>
            <h4 className={styles.h4}>Công thức</h4>
            <ul className={styles.formulaList}>
              {FORMULA_ROWS.map((row) => (
                <li key={row.key} className={styles.formulaRow}>
                  <Tooltip title={row.label}>
                    <span className={styles.sign} aria-label={row.label} role="img">
                      {row.sign}
                    </span>
                  </Tooltip>
                  <span className={styles.formulaText}>
                    <Formula text={tense.formula[row.key]} />
                  </span>
                </li>
              ))}
            </ul>
            <p className={styles.note}>{tense.note}</p>

            <h4 className={styles.h4}>Dấu hiệu nhận biết</h4>
            <div className={styles.signals}>
              {tense.signals.map((s) => (
                <Tag key={s} color={time.tag} className={styles.signalTag}>
                  {s}
                </Tag>
              ))}
            </div>
          </div>

          <div className={styles.detailCol}>
            <h4 className={styles.h4}>Cách dùng</h4>
            <ol className={styles.usageList}>
              {tense.usages.map((u) => (
                <li key={u.en} className={styles.usage}>
                  <span className={styles.usageVi}>{u.vi}</span>
                  <span className={styles.usageEn}>
                    <Example text={u.en} />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.confusion}>
          <div className={styles.confusionHead}>
            <SwapOutlined aria-hidden="true" />
            <span>
              Hay nhầm: <b>{tense.name}</b> vs <b>{other.name}</b>
            </span>
          </div>
          <p className={styles.confusionText}>{tense.confusion.vi}</p>
          <div className={styles.compare}>
            <div className={styles.compareItem} style={palette(tense)}>
              <span className={styles.compareLabel}>{tense.name}</span>
              <span><Example text={tense.confusion.a} /></span>
            </div>
            <div className={styles.compareItem} style={palette(other)}>
              <span className={styles.compareLabel}>{other.name}</span>
              <span><Example text={tense.confusion.b} /></span>
            </div>
          </div>
          <Button type="link" className={styles.jump} onClick={() => onSelect(other.id)}>
            Xem {other.name} <ArrowRightOutlined aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

function CheatSheet({ onReview }) {
  const [filter, setFilter] = useState('all')
  const times = filter === 'all' ? TIMES : TIMES.filter((t) => t.key === filter)

  return (
    <section className={styles.section} aria-labelledby="tenses-cheat">
      <div className={styles.sectionHead}>
        <Title level={2} id="tenses-cheat" className={styles.h2}>
          Bảng tóm tắt
        </Title>
        <Text type="secondary">Một trang để ôn: công thức khẳng định và một câu ví dụ cho mỗi thì.</Text>
      </div>
      <Segmented
        className={styles.segmented}
        value={filter}
        onChange={setFilter}
        options={[
          { label: 'Tất cả', value: 'all' },
          ...TIMES.map((t) => ({ label: t.label, value: t.key })),
        ]}
      />
      <div className={`${styles.cheatGrid} ${filter !== 'all' ? styles.cheatSingle : ''}`}>
        {times.map((time) => (
          <div key={time.key} className={styles.cheatCol} style={timeVars(time)}>
            <div className={styles.cheatColHead}>
              <span className={styles.timeSwatch} aria-hidden="true" />
              {time.label} <span className={styles.timeVi}>· {time.vi}</span>
            </div>
            {TENSES.filter((t) => t.time === time.key).map((t) => (
              <button
                key={t.id}
                type="button"
                className={styles.cheatCard}
                style={palette(t)}
                onClick={() => onReview(t.id)}
                aria-label={`${t.name}: xem chi tiết`}
              >
                <span className={styles.cheatTop}>
                  <AspectGlyph aspect={t.aspect} color={time.accent} size={26} />
                  <span className={styles.cheatName}>{t.name}</span>
                </span>
                <span className={styles.cheatFormula}>
                  <Formula text={t.formula.pos} />
                </span>
                <span className={styles.cheatExample}>
                  <Example text={t.usages[0].en} />
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Tenses() {
  const [selectedId, setSelectedId] = useState('present-perfect')
  const panelRef = useRef(null)
  const panelId = `${useId().replace(/[^a-zA-Z0-9_-]/g, '')}-tense-detail`
  const tense = TENSE_BY_ID[selectedId]

  const review = (id) => {
    setSelectedId(id)
    const el = panelRef.current
    if (!el) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }

  return (
    <div className={styles.page}>
      <Intro />

      <section className={styles.section} aria-labelledby="tenses-map">
        <div className={styles.sectionHead}>
          <Title level={2} id="tenses-map" className={styles.h2}>
            Bản đồ 12 thì
          </Title>
          <Text type="secondary">
            Hàng = thời gian, cột = khía cạnh. Màu cho biết thời gian, đậm dần theo khía cạnh.
          </Text>
        </div>
        <div className={styles.mapLayout}>
          <Matrix selectedId={selectedId} onSelect={setSelectedId} panelId={panelId} />
          <Detail tense={tense} onSelect={setSelectedId} panelId={panelId} panelRef={panelRef} />
        </div>
      </section>

      <CheatSheet onReview={review} />
    </div>
  )
}
