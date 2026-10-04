import { useMemo, useState } from 'react'
import { Segmented } from 'antd'
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  EnvironmentOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import styles from './Prepositions.module.css'

/* ------------------------------------------------------------------ */
/*  Data — wrap the target preposition in [brackets] to highlight it   */
/* ------------------------------------------------------------------ */

const LEVELS = [
  { key: 'in', word: 'IN', scope: 'Rộng nhất' },
  { key: 'on', word: 'ON', scope: 'Vừa' },
  { key: 'at', word: 'AT', scope: 'Chính xác nhất' },
]

const FUNNEL = {
  time: {
    in: {
      tagline: 'Khoảng thời gian dài',
      chips: ['2019', 'May', 'summer', 'the 1990s', 'the morning'],
      summary: 'Dùng IN cho những khoảng thời gian dài, chứa nhiều ngày bên trong: năm, tháng, mùa, thập kỷ, thế kỷ, và các buổi trong ngày.',
      rules: [
        { label: 'Năm · thập kỷ · thế kỷ', items: ['in 2019', 'in the 1990s', 'in the 21st century'] },
        { label: 'Tháng · mùa', items: ['in May', 'in (the) summer', 'in the rainy season'] },
        { label: 'Buổi trong ngày', items: ['in the morning', 'in the afternoon', 'in the evening'] },
        { label: 'Sau một khoảng thời gian (tương lai)', items: ['in two weeks', 'in a minute', 'in ten years'] },
      ],
      examples: [
        { en: 'I was born [in] 1998.', vi: 'Tôi sinh năm 1998.' },
        { en: 'It often rains [in] the summer here.', vi: 'Ở đây trời hay mưa vào mùa hè.' },
        { en: 'I’ll be back [in] ten minutes.', vi: 'Mười phút nữa tôi sẽ quay lại.' },
      ],
    },
    on: {
      tagline: 'Một ngày cụ thể',
      chips: ['Monday', '4 October', 'my birthday', 'Monday morning'],
      summary: 'Dùng ON cho một ngày cụ thể: thứ trong tuần, ngày tháng, ngày lễ có chữ "Day", và một buổi của một ngày cụ thể.',
      rules: [
        { label: 'Thứ trong tuần', items: ['on Monday', 'on Fridays', 'on weekdays'] },
        { label: 'Ngày tháng', items: ['on 4 October', 'on October 4th', 'on 1 January 2025'] },
        { label: 'Ngày đặc biệt', items: ['on my birthday', 'on Christmas Day', 'on New Year’s Eve'] },
        { label: 'Buổi của một ngày cụ thể', items: ['on Monday morning', 'on Friday night', 'on the morning of 5 May'] },
      ],
      examples: [
        { en: 'We have a meeting [on] Monday.', vi: 'Chúng tôi có cuộc họp vào thứ Hai.' },
        { en: 'She called me [on] my birthday.', vi: 'Cô ấy gọi cho tôi vào ngày sinh nhật.' },
        { en: 'The shop opened [on] the morning of 5 May.', vi: 'Cửa hàng khai trương vào sáng ngày 5 tháng 5.' },
      ],
    },
    at: {
      tagline: 'Một thời điểm chính xác',
      chips: ['7 pm', 'noon', 'night', 'the weekend', 'Christmas'],
      summary: 'Dùng AT cho một điểm thời gian chính xác trên đồng hồ, và một số cụm cố định như at night, at noon, at the weekend (Anh), at Christmas.',
      rules: [
        { label: 'Giờ trên đồng hồ', items: ['at 7 pm', 'at 6:30', 'at half past nine'] },
        { label: 'Mốc trong ngày', items: ['at noon', 'at midnight', 'at sunrise', 'at night'] },
        { label: 'Kỳ nghỉ (cả dịp lễ)', items: ['at Christmas', 'at Easter', 'at the weekend (UK)'] },
        { label: 'Cụm cố định', items: ['at the moment', 'at the same time', 'at the end of the month'] },
      ],
      examples: [
        { en: 'The film starts [at] 7 pm.', vi: 'Phim bắt đầu lúc 7 giờ tối.' },
        { en: 'I can’t sleep [at] night.', vi: 'Tôi không ngủ được vào ban đêm.' },
        { en: 'We visit our grandparents [at] Christmas.', vi: 'Chúng tôi về thăm ông bà vào dịp Giáng sinh.' },
      ],
    },
  },
  place: {
    in: {
      tagline: 'Bên trong một không gian',
      chips: ['Vietnam', 'Hanoi', 'the kitchen', 'the car'],
      summary: 'Dùng IN khi ở bên trong một khu vực có ranh giới: quốc gia, thành phố, phòng, hộp, và những phương tiện nhỏ mà ta ngồi "trong" đó.',
      rules: [
        { label: 'Quốc gia · thành phố · khu vực', items: ['in Vietnam', 'in Ho Chi Minh City', 'in the countryside'] },
        { label: 'Không gian kín · có vách', items: ['in the room', 'in the box', 'in my pocket'] },
        { label: 'Xe nhỏ (không đứng được)', items: ['in the car', 'in a taxi', 'in a boat'] },
        { label: 'Không gian mở có giới hạn', items: ['in the garden', 'in the park', 'in the sky', 'in the water'] },
      ],
      examples: [
        { en: 'My sister lives [in] Da Nang.', vi: 'Chị tôi sống ở Đà Nẵng.' },
        { en: 'The keys are [in] the drawer.', vi: 'Chìa khóa ở trong ngăn kéo.' },
        { en: 'We talked [in] the car for an hour.', vi: 'Chúng tôi nói chuyện trong xe hơi cả tiếng.' },
      ],
    },
    on: {
      tagline: 'Trên một bề mặt · một đường',
      chips: ['the table', 'the wall', 'the bus', 'the 3rd floor'],
      summary: 'Dùng ON khi tiếp xúc với một bề mặt, nằm dọc một con đường, ở một tầng của tòa nhà, hoặc đi trên phương tiện công cộng lớn.',
      rules: [
        { label: 'Bề mặt', items: ['on the table', 'on the wall', 'on the floor', 'on the ceiling'] },
        { label: 'Đường phố (không có số nhà)', items: ['on Le Loi Street', 'on the main road', 'on the left'] },
        { label: 'Phương tiện công cộng · xe hai bánh', items: ['on the bus', 'on the train', 'on the plane', 'on my bike'] },
        { label: 'Tầng · trang · màn hình', items: ['on the 3rd floor', 'on page 10', 'on the screen', 'on the map'] },
      ],
      examples: [
        { en: 'There’s a clock [on] the wall.', vi: 'Có một cái đồng hồ trên tường.' },
        { en: 'Our office is [on] the 3rd floor.', vi: 'Văn phòng của chúng tôi ở tầng 3.' },
        { en: 'I read a book [on] the train.', vi: 'Tôi đọc sách trên tàu.' },
      ],
    },
    at: {
      tagline: 'Một điểm cụ thể',
      chips: ['the bus stop', 'the corner', 'home', '25 Ly Thuong Kiet St.'],
      summary: 'Dùng AT cho một điểm cụ thể trên bản đồ (không quan tâm bên trong hay bên trên), địa chỉ có số nhà, nơi làm việc/học tập và sự kiện.',
      rules: [
        { label: 'Điểm · vị trí cụ thể', items: ['at the bus stop', 'at the door', 'at the corner', 'at the traffic lights'] },
        { label: 'Địa chỉ có số nhà', items: ['at 25 Ly Thuong Kiet Street', 'at number 12'] },
        { label: 'Nhà · nơi làm việc · học tập', items: ['at home', 'at work', 'at school', 'at university'] },
        { label: 'Sự kiện · địa điểm công cộng', items: ['at the party', 'at the concert', 'at the airport', 'at the station'] },
      ],
      examples: [
        { en: 'Wait for me [at] the bus stop.', vi: 'Đợi tôi ở trạm xe buýt nhé.' },
        { en: 'She’s not [at] home right now.', vi: 'Bây giờ cô ấy không có ở nhà.' },
        { en: 'We met [at] a friend’s wedding.', vi: 'Chúng tôi gặp nhau ở đám cưới một người bạn.' },
      ],
    },
  },
}

const EXCEPTIONS = [
  {
    title: 'Không dùng giới từ trước this / next / last / every',
    note: 'Các từ này đã xác định thời gian nên bỏ in / on / at. Tương tự với today, tomorrow, yesterday.',
    good: ['I’ll see you next Monday.', 'We met last summer.', 'She runs every morning.'],
    bad: ['on next Monday', 'in last summer'],
  },
  {
    title: 'in the car  vs  on the bus',
    note: 'Xe nhỏ, chỉ ngồi được, bước vào là ngồi luôn → IN (car, taxi). Phương tiện lớn, có lối đi, đứng lên được, hoặc ngồi "trên" yên xe → ON (bus, train, plane, ship, bike, motorbike).',
    good: ['in the car / in a taxi', 'on the bus / on the plane', 'on my motorbike'],
    bad: ['on the car', 'in the bike'],
  },
  {
    title: 'at the weekend (UK)  vs  on the weekend (US)',
    note: 'Cả hai đều đúng: tiếng Anh–Anh dùng "at", tiếng Anh–Mỹ dùng "on". Chọn một kiểu và dùng nhất quán.',
    good: ['What are you doing at the weekend? (UK)', 'What are you doing on the weekend? (US)'],
    bad: ['in the weekend'],
  },
  {
    title: 'in the morning  ·  on Monday morning  ·  at night',
    note: 'Buổi chung chung → IN. Khi gắn với một ngày cụ thể, ngày "thắng" → ON. Riêng "night" là cụm cố định với AT.',
    good: ['in the morning', 'on Monday morning', 'at night'],
    bad: ['in Monday morning', 'at the morning'],
  },
  {
    title: 'on time  vs  in time',
    note: 'on time = đúng giờ (theo lịch). in time = kịp lúc, đủ sớm để làm gì đó.',
    good: ['The train left on time.', 'We arrived in time to see the start.'],
    bad: [],
  },
  {
    title: 'at the end  vs  in the end',
    note: 'at the end (of…) = ở cuối (một thời điểm/vị trí). in the end = cuối cùng thì, rốt cuộc.',
    good: ['at the end of the film', 'In the end, we stayed home.'],
    bad: ['in the end of the month'],
  },
  {
    title: 'at the corner  vs  in the corner',
    note: 'Góc đường là một điểm → at / on the corner. Góc phòng là bên trong một không gian → in the corner.',
    good: ['at the corner of the street', 'in the corner of the room'],
    bad: ['in the corner of the street'],
  },
  {
    title: 'at home  ·  go home',
    note: '"home" không cần "the". Với động từ chỉ chuyển động (go, come, get) thì bỏ luôn giới từ.',
    good: ['She’s at home.', 'I go home at 6.'],
    bad: ['at the home', 'go to home'],
  },
]

function Highlight({ text }) {
  return text.split(/(\[[^\]]+\])/g).filter(Boolean).map((p, i) =>
    p.startsWith('[') ? <strong key={i} className={styles.hl}>{p.slice(1, -1)}</strong> : <span key={i}>{p}</span>,
  )
}

/* ------------------------------------------------------------------ */
/*  Funnel                                                             */
/* ------------------------------------------------------------------ */

function Funnel({ mode, level, onLevel }) {
  const data = FUNNEL[mode]
  const detail = data[level]

  return (
    <div className={styles.funnelLayout}>
      <div className={styles.funnelCol}>
        <div className={styles.scale} aria-hidden="true">
          <span>rộng</span>
          <span className={styles.scaleLine} />
          <span>hẹp</span>
        </div>
        <div className={styles.funnel} role="group" aria-label={mode === 'time' ? 'Giới từ chỉ thời gian' : 'Giới từ chỉ nơi chốn'}>
          {LEVELS.map((lv) => (
            <button
              key={lv.key}
              type="button"
              className={`${styles.level} ${styles[`level_${lv.key}`]}`}
              aria-pressed={level === lv.key}
              aria-controls="prep-detail"
              onClick={() => onLevel(lv.key)}
            >
              <span className={styles.levelWord}>{lv.word}</span>
              <span className={styles.levelTag}>{data[lv.key].tagline}</span>
              <span className={styles.levelChips} aria-hidden="true">
                {data[lv.key].chips.slice(0, lv.key === 'at' ? 2 : 3).join(' · ')}
              </span>
            </button>
          ))}
          <div className={styles.spout} aria-hidden="true">
            <span className={styles.drop} />
          </div>
        </div>
      </div>

      <section id="prep-detail" className={`${styles.detail} ${styles[`detail_${level}`]}`} aria-live="polite">
        <div className={styles.detailHead}>
          <span className={styles.detailWord}>{level.toUpperCase()}</span>
          <div>
            <p className={styles.detailScope}>{LEVELS.find((l) => l.key === level).scope} · {mode === 'time' ? 'thời gian' : 'nơi chốn'}</p>
            <h2 className={styles.detailTitle}>{detail.tagline}</h2>
          </div>
        </div>
        <p className={styles.summary}>{detail.summary}</p>

        <div className={styles.rules}>
          {detail.rules.map((r) => (
            <div key={r.label} className={styles.rule}>
              <p className={styles.ruleLabel}>{r.label}</p>
              <ul className={styles.ruleItems}>
                {r.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ul className={styles.examples}>
          {detail.examples.map((ex) => (
            <li key={ex.en}>
              <p className={styles.exEn}><Highlight text={ex.en} /></p>
              <p className={styles.exVi}>{ex.vi}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Exceptions                                                         */
/* ------------------------------------------------------------------ */

function Exceptions() {
  return (
    <section className={styles.section} aria-labelledby="prep-exc-title">
      <div className={styles.sectionHead}>
        <WarningOutlined className={styles.sectionIcon} aria-hidden="true" />
        <div>
          <h2 id="prep-exc-title" className={styles.sectionTitle}>Exceptions &amp; cặp dễ nhầm</h2>
          <p className={styles.sectionSub}>Những chỗ “cái phễu” không áp dụng hoàn toàn.</p>
        </div>
      </div>
      <div className={styles.excGrid}>
        {EXCEPTIONS.map((ex) => (
          <article key={ex.title} className={styles.exc}>
            <h3 className={styles.excTitle}>{ex.title}</h3>
            <p className={styles.excNote}>{ex.note}</p>
            <ul className={styles.excList}>
              {ex.good.map((g) => (
                <li key={g} className={styles.good}>
                  <CheckCircleFilled aria-label="Đúng" /> <span>{g}</span>
                </li>
              ))}
              {ex.bad.map((b) => (
                <li key={b} className={styles.bad}>
                  <CloseCircleFilled aria-label="Sai" /> <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Prepositions() {
  const [mode, setMode] = useState('time')
  const [level, setLevel] = useState('in')

  const modeOptions = useMemo(
    () => [
      { value: 'time', label: 'Thời gian', icon: <ClockCircleOutlined /> },
      { value: 'place', label: 'Nơi chốn', icon: <EnvironmentOutlined /> },
    ],
    [],
  )

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <p className={styles.heroText}>
            Hình dung một cái phễu: <strong className={styles.kIn}>IN</strong> ở miệng phễu cho những thứ rộng,{' '}
            <strong className={styles.kOn}>ON</strong> ở giữa, <strong className={styles.kAt}>AT</strong> ở đáy cho điểm chính xác nhất.
            Chạm vào từng tầng để xem quy tắc.
          </p>
          <Segmented
            options={modeOptions}
            value={mode}
            onChange={setMode}
            size="large"
            className={styles.modeSwitch}
            aria-label="Chọn thời gian hoặc nơi chốn"
          />
        </div>
        <Funnel mode={mode} level={level} onLevel={setLevel} />
      </section>

      <Exceptions />
    </div>
  )
}
