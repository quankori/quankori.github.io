import { useCallback, useMemo, useState } from 'react'
import { Button, Input, Segmented, Switch, Table } from 'antd'
import {
  AppstoreOutlined,
  CheckCircleFilled,
  CheckOutlined,
  RetweetOutlined,
  SearchOutlined,
  TableOutlined,
} from '@ant-design/icons'
import styles from './IrregularVerbs.module.css'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/*  [base, past simple, past participle, Vietnamese meaning, pattern]  */
/*  Use "/" for accepted alternatives, e.g. "was/were", "got/gotten".  */
/* ------------------------------------------------------------------ */

const GROUPS = [
  {
    key: 'AAA',
    label: 'A-A-A',
    letters: ['A', 'A', 'A'],
    color: '#0f766e',
    desc: 'Ba dạng giống hệt nhau. Phần lớn là động từ ngắn một âm tiết, tận cùng bằng -t hoặc -d. Học một, nhớ cả ba!',
  },
  {
    key: 'ABA',
    label: 'A-B-A',
    letters: ['A', 'B', 'A'],
    color: '#b45309',
    desc: 'Quá khứ phân từ quay về giống nguyên mẫu, chỉ quá khứ đơn đổi nguyên âm. Nhóm rất nhỏ: come, become, overcome, run.',
  },
  {
    key: 'ABB',
    label: 'A-B-B',
    letters: ['A', 'B', 'B'],
    color: '#1d4ed8',
    desc: 'Quá khứ đơn và quá khứ phân từ giống nhau: chỉ cần nhớ một dạng mới. Đây là nhóm lớn nhất, chia thành nhiều quy luật nhỏ.',
  },
  {
    key: 'ABC',
    label: 'A-B-C',
    letters: ['A', 'B', 'C'],
    color: '#be185d',
    desc: 'Ba dạng khác nhau. Nghe có vẻ khó, nhưng phần lớn vẫn đi theo vài “giai điệu” nguyên âm quen thuộc.',
  },
]

const PATTERNS = [
  { key: 'aaa', group: 'AAA', name: 'A-A-A', sample: 'cut · cut · cut', desc: 'Không đổi gì cả. Riêng "read" viết giống nhau nhưng V2/V3 đọc là /red/.' },
  { key: 'aba', group: 'ABA', name: 'A-B-A', sample: 'come · came · come', desc: 'V3 quay về giống V1, chỉ V2 đổi nguyên âm: come → came → come, run → ran → run.' },
  { key: 'ought', group: 'ABB', name: '-ought / -aught', sample: 'buy · bought · bought', desc: 'V2 = V3, đều đọc /ɔːt/. Viết -ought (buy, bring, think, fight, seek), riêng catch và teach viết -aught.' },
  { key: 'dt', group: 'ABB', name: '-d → -t', sample: 'send · sent · sent', desc: 'Đổi phụ âm cuối -d thành -t: build → built, spend → spent, lend → lent.' },
  { key: 'eet', group: 'ABB', name: 'ee / ea → e', sample: 'sleep · slept · slept', desc: 'Nguyên âm dài /iː/ rút ngắn thành /e/, thường thêm -t: keep → kept, feel → felt, mean → meant. Một số chỉ rút ngắn: meet → met, feed → fed, lead → led.' },
  { key: 'abb', group: 'ABB', name: 'A-B-B khác', sample: 'make · made · made', desc: 'V2 = V3 nhưng không theo một quy luật chung. Hãy học theo cặp "V1 → V2/V3" để chỉ phải nhớ hai dạng.' },
  { key: 'iau', group: 'ABC', name: 'i → a → u', sample: 'sing · sang · sung', desc: 'Chỉ đổi một nguyên âm theo nhịp i → a → u, phụ âm giữ nguyên: swim → swam → swum, drink → drank → drunk. Nhớ câu: “I sing, I sang, I have sung”.' },
  { key: 'ew', group: 'ABC', name: '-ew / -own', sample: 'blow · blew · blown', desc: 'V2 tận cùng -ew, V3 thêm -n: know → knew → known, draw → drew → drawn. "show" là ngoại lệ ở V2 (showed) nhưng V3 vẫn là shown.' },
  { key: 'oen', group: 'ABC', name: 'o → o + en', sample: 'break · broke · broken', desc: 'V2 mang nguyên âm o, V3 = V2 + -en: speak → spoke → spoken, choose → chose → chosen, forget → forgot → forgotten.' },
  { key: 'ien', group: 'ABC', name: 'i → o → i + en', sample: 'write · wrote · written', desc: 'V3 dùng nguyên âm i ngắn + -en, thường nhân đôi phụ âm: write → written, ride → ridden, bite → bitten, hide → hidden.' },
  { key: 'orn', group: 'ABC', name: '-ore / -orn', sample: 'wear · wore · worn', desc: 'V2 tận cùng -ore, V3 tận cùng -orn: tear → tore → torn, swear → swore → sworn.' },
  { key: 'abc', group: 'ABC', name: 'A-B-C khác', sample: 'go · went · gone', desc: 'Không theo quy luật chung — lại chính là những động từ dùng nhiều nhất (be, do, go, see…). Cần học thuộc từng từ.' },
]

const VERB_ROWS = [
  // A-A-A
  ['cut', 'cut', 'cut', 'cắt', 'aaa'],
  ['put', 'put', 'put', 'đặt, để', 'aaa'],
  ['set', 'set', 'set', 'đặt, thiết lập', 'aaa'],
  ['let', 'let', 'let', 'để cho, cho phép', 'aaa'],
  ['hit', 'hit', 'hit', 'đánh, va vào', 'aaa'],
  ['hurt', 'hurt', 'hurt', 'làm đau, bị đau', 'aaa'],
  ['cost', 'cost', 'cost', 'có giá, tốn', 'aaa'],
  ['shut', 'shut', 'shut', 'đóng, khép', 'aaa'],
  ['quit', 'quit', 'quit', 'từ bỏ, nghỉ việc', 'aaa'],
  ['spread', 'spread', 'spread', 'lan truyền, trải ra', 'aaa'],
  ['bet', 'bet', 'bet', 'đánh cược', 'aaa'],
  ['burst', 'burst', 'burst', 'nổ tung, vỡ òa', 'aaa'],
  ['cast', 'cast', 'cast', 'ném, tuyển vai', 'aaa'],
  ['read', 'read', 'read', 'đọc', 'aaa'],
  ['split', 'split', 'split', 'chia, tách ra', 'aaa'],
  // A-B-A
  ['come', 'came', 'come', 'đến', 'aba'],
  ['become', 'became', 'become', 'trở thành', 'aba'],
  ['overcome', 'overcame', 'overcome', 'vượt qua', 'aba'],
  ['run', 'ran', 'run', 'chạy', 'aba'],
  // A-B-B: -ought / -aught
  ['buy', 'bought', 'bought', 'mua', 'ought'],
  ['bring', 'brought', 'brought', 'mang đến', 'ought'],
  ['think', 'thought', 'thought', 'nghĩ', 'ought'],
  ['fight', 'fought', 'fought', 'chiến đấu, cãi nhau', 'ought'],
  ['seek', 'sought', 'sought', 'tìm kiếm', 'ought'],
  ['catch', 'caught', 'caught', 'bắt, đón (xe)', 'ought'],
  ['teach', 'taught', 'taught', 'dạy', 'ought'],
  // A-B-B: -d → -t
  ['build', 'built', 'built', 'xây dựng', 'dt'],
  ['send', 'sent', 'sent', 'gửi', 'dt'],
  ['spend', 'spent', 'spent', 'tiêu (tiền), dành (thời gian)', 'dt'],
  ['lend', 'lent', 'lent', 'cho mượn', 'dt'],
  ['bend', 'bent', 'bent', 'uốn cong, cúi xuống', 'dt'],
  // A-B-B: ee/ea → e
  ['keep', 'kept', 'kept', 'giữ', 'eet'],
  ['sleep', 'slept', 'slept', 'ngủ', 'eet'],
  ['feel', 'felt', 'felt', 'cảm thấy', 'eet'],
  ['meet', 'met', 'met', 'gặp', 'eet'],
  ['feed', 'fed', 'fed', 'cho ăn', 'eet'],
  ['lead', 'led', 'led', 'dẫn dắt', 'eet'],
  ['leave', 'left', 'left', 'rời đi, để lại', 'eet'],
  ['mean', 'meant', 'meant', 'có nghĩa là', 'eet'],
  ['deal', 'dealt', 'dealt', 'giải quyết, chia (bài)', 'eet'],
  // A-B-B: other
  ['have', 'had', 'had', 'có', 'abb'],
  ['make', 'made', 'made', 'làm, chế tạo', 'abb'],
  ['say', 'said', 'said', 'nói', 'abb'],
  ['pay', 'paid', 'paid', 'trả tiền', 'abb'],
  ['lay', 'laid', 'laid', 'đặt, đẻ (trứng)', 'abb'],
  ['hear', 'heard', 'heard', 'nghe', 'abb'],
  ['hold', 'held', 'held', 'cầm, tổ chức', 'abb'],
  ['sell', 'sold', 'sold', 'bán', 'abb'],
  ['tell', 'told', 'told', 'kể, bảo', 'abb'],
  ['find', 'found', 'found', 'tìm thấy', 'abb'],
  ['stand', 'stood', 'stood', 'đứng', 'abb'],
  ['understand', 'understood', 'understood', 'hiểu', 'abb'],
  ['sit', 'sat', 'sat', 'ngồi', 'abb'],
  ['win', 'won', 'won', 'thắng', 'abb'],
  ['get', 'got', 'got/gotten', 'nhận được, trở nên', 'abb'],
  ['shoot', 'shot', 'shot', 'bắn, quay (phim)', 'abb'],
  ['lose', 'lost', 'lost', 'mất, thua', 'abb'],
  // A-B-C: i → a → u
  ['begin', 'began', 'begun', 'bắt đầu', 'iau'],
  ['drink', 'drank', 'drunk', 'uống', 'iau'],
  ['sing', 'sang', 'sung', 'hát', 'iau'],
  ['ring', 'rang', 'rung', 'reo, gọi điện', 'iau'],
  ['swim', 'swam', 'swum', 'bơi', 'iau'],
  ['sink', 'sank', 'sunk', 'chìm', 'iau'],
  ['shrink', 'shrank', 'shrunk', 'co lại', 'iau'],
  // A-B-C: -ew / -own
  ['blow', 'blew', 'blown', 'thổi', 'ew'],
  ['grow', 'grew', 'grown', 'trồng, lớn lên', 'ew'],
  ['know', 'knew', 'known', 'biết', 'ew'],
  ['throw', 'threw', 'thrown', 'ném', 'ew'],
  ['fly', 'flew', 'flown', 'bay', 'ew'],
  ['draw', 'drew', 'drawn', 'vẽ', 'ew'],
  ['withdraw', 'withdrew', 'withdrawn', 'rút (tiền), rút lui', 'ew'],
  ['show', 'showed', 'shown', 'cho xem, chỉ ra', 'ew'],
  // A-B-C: o → o + en
  ['break', 'broke', 'broken', 'làm vỡ', 'oen'],
  ['choose', 'chose', 'chosen', 'chọn', 'oen'],
  ['speak', 'spoke', 'spoken', 'nói (ngôn ngữ)', 'oen'],
  ['steal', 'stole', 'stolen', 'ăn trộm', 'oen'],
  ['wake', 'woke', 'woken', 'thức dậy', 'oen'],
  ['freeze', 'froze', 'frozen', 'đóng băng', 'oen'],
  ['forget', 'forgot', 'forgotten', 'quên', 'oen'],
  // A-B-C: i → o → i + en
  ['write', 'wrote', 'written', 'viết', 'ien'],
  ['ride', 'rode', 'ridden', 'cưỡi, đi (xe)', 'ien'],
  ['drive', 'drove', 'driven', 'lái xe', 'ien'],
  ['rise', 'rose', 'risen', 'mọc, tăng lên', 'ien'],
  ['bite', 'bit', 'bitten', 'cắn', 'ien'],
  ['hide', 'hid', 'hidden', 'trốn, giấu', 'ien'],
  // A-B-C: -ore / -orn
  ['wear', 'wore', 'worn', 'mặc, đội, đeo', 'orn'],
  ['tear', 'tore', 'torn', 'xé rách', 'orn'],
  ['swear', 'swore', 'sworn', 'thề, chửi thề', 'orn'],
  ['bear', 'bore', 'born/borne', 'chịu đựng, sinh ra', 'orn'],
  // A-B-C: other
  ['be', 'was/were', 'been', 'thì, là, ở', 'abc'],
  ['do', 'did', 'done', 'làm', 'abc'],
  ['go', 'went', 'gone', 'đi', 'abc'],
  ['see', 'saw', 'seen', 'nhìn thấy', 'abc'],
  ['eat', 'ate', 'eaten', 'ăn', 'abc'],
  ['give', 'gave', 'given', 'cho, tặng', 'abc'],
  ['forgive', 'forgave', 'forgiven', 'tha thứ', 'abc'],
  ['take', 'took', 'taken', 'cầm, lấy, mất (thời gian)', 'abc'],
  ['fall', 'fell', 'fallen', 'rơi, ngã', 'abc'],
  ['shake', 'shook', 'shaken', 'lắc, rung', 'abc'],
  ['lie', 'lay', 'lain', 'nằm', 'abc'],
]

const VERBS = VERB_ROWS.map(([base, past, pp, meaning, pattern]) => ({ base, past, pp, meaning, pattern }))
const PATTERN_BY_KEY = Object.fromEntries(PATTERNS.map((p) => [p.key, p]))
const GROUP_BY_KEY = Object.fromEntries(GROUPS.map((g) => [g.key, g]))
const groupOf = (verb) => GROUP_BY_KEY[PATTERN_BY_KEY[verb.pattern].group]

const KNOWN_KEY = 'irregular-verbs:known'

/* ------------------------------------------------------------------ */
/*  Storage helpers (page must work without localStorage)              */
/* ------------------------------------------------------------------ */

function readStore(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStore(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable — keep in memory only */
  }
}

function normalize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ')
}

/** Highlight the part of `form` that differs from `base` (after the shared prefix). */
function Changed({ base, form }) {
  return form.split('/').map((alt, idx) => {
    let i = 0
    while (i < base.length && i < alt.length && base[i] === alt[i]) i += 1
    return (
      <span key={alt}>
        {idx > 0 && <span className={styles.slash}>/</span>}
        {alt.slice(0, i)}
        {i < alt.length && <mark className={styles.diff}>{alt.slice(i)}</mark>}
      </span>
    )
  })
}

/* ------------------------------------------------------------------ */
/*  Pattern filter                                                     */
/* ------------------------------------------------------------------ */

function PatternFilter({ group, pattern, onGroup, onPattern, counts }) {
  const subPatterns = group ? PATTERNS.filter((p) => p.group === group) : []
  const info = pattern ? PATTERN_BY_KEY[pattern] : null
  const g = group ? GROUP_BY_KEY[group] : null

  return (
    <section className={styles.filter} aria-label="Lọc theo quy luật">
      <div className={styles.chipRow} role="group" aria-label="Nhóm">
        <button type="button" className={styles.chip} aria-pressed={!group} onClick={() => onGroup(null)}>
          Tất cả <span className={styles.chipCount}>{VERBS.length}</span>
        </button>
        {GROUPS.map((gr) => (
          <button
            key={gr.key}
            type="button"
            className={styles.chip}
            aria-pressed={group === gr.key}
            onClick={() => onGroup(gr.key)}
            style={{ '--chip': gr.color }}
          >
            <span className={styles.chipLetters} aria-hidden="true">
              {gr.letters.map((l, i) => (
                <span key={i} className={styles[`letter${l}`]}>{l}</span>
              ))}
            </span>
            <span className={styles.srOnly}>{gr.label}</span>
            <span className={styles.chipCount}>{counts.group[gr.key]}</span>
          </button>
        ))}
      </div>

      {g ? (
        <div className={styles.patternPanel} style={{ '--chip': g.color }}>
          <div className={styles.patternHead}>
            <div className={styles.bigLetters} aria-hidden="true">
              {g.letters.map((l, i) => (
                <span key={i} className={`${styles.bigLetter} ${styles[`letter${l}`]}`}>{l}</span>
              ))}
            </div>
            <p className={styles.patternDesc}>{g.desc}</p>
          </div>

          {subPatterns.length > 1 && (
            <div className={styles.chipRow} role="group" aria-label="Quy luật nhỏ">
              <button type="button" className={`${styles.chip} ${styles.subChip}`} aria-pressed={!pattern} onClick={() => onPattern(null)}>
                Tất cả {g.label}
              </button>
              {subPatterns.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  className={`${styles.chip} ${styles.subChip}`}
                  aria-pressed={pattern === p.key}
                  onClick={() => onPattern(p.key)}
                >
                  {p.name} <span className={styles.chipCount}>{counts.pattern[p.key]}</span>
                </button>
              ))}
            </div>
          )}

          {(info || subPatterns.length === 1) && (
            <div className={styles.rule} aria-live="polite">
              <code className={styles.ruleSample}>{(info || subPatterns[0]).sample}</code>
              <p className={styles.ruleDesc}>{(info || subPatterns[0]).desc}</p>
            </div>
          )}
        </div>
      ) : (
        <p className={styles.intro}>
          Đừng học thuộc lòng cả bảng! Hầu hết động từ bất quy tắc thuộc một vài <strong>khuôn mẫu</strong>. Chọn một nhóm
          ở trên — A là nguyên mẫu, B và C là dạng mới — để xem quy luật, rồi lật thẻ để tự kiểm tra.
        </p>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Flashcards                                                         */
/* ------------------------------------------------------------------ */

function FlashCard({ verb, flipped, onFlip, known, onToggleKnown }) {
  const g = groupOf(verb)
  const p = PATTERN_BY_KEY[verb.pattern]
  return (
    <li className={`${styles.cardItem} ${known ? styles.isKnown : ''}`} style={{ '--chip': g.color }}>
      <button
        type="button"
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        aria-pressed={flipped}
        aria-label={flipped ? `${verb.base}: ${verb.past}, ${verb.pp}` : `${verb.base} — lật thẻ để xem V2 và V3`}
        onClick={onFlip}
      >
        <span className={styles.inner}>
          <span className={`${styles.face} ${styles.front}`} aria-hidden={flipped}>
            <span className={styles.faceTag}>{g.label} · {p.name}</span>
            <span className={styles.base}>{verb.base}</span>
            <span className={styles.meaning}>{verb.meaning}</span>
            <span className={styles.flipHint}><RetweetOutlined aria-hidden="true" /> lật thẻ</span>
          </span>
          <span className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
            <span className={styles.forms}>
              <span className={styles.formRow}>
                <span className={styles.formLabel}>V1</span>
                <span className={styles.formValue}>{verb.base}</span>
              </span>
              <span className={styles.formRow}>
                <span className={styles.formLabel}>V2</span>
                <span className={styles.formValue}><Changed base={verb.base} form={verb.past} /></span>
              </span>
              <span className={styles.formRow}>
                <span className={styles.formLabel}>V3</span>
                <span className={styles.formValue}><Changed base={verb.base} form={verb.pp} /></span>
              </span>
            </span>
            <span className={styles.backMeaning}>{verb.meaning}</span>
          </span>
        </span>
      </button>
      <button type="button" className={styles.knownBtn} aria-pressed={known} onClick={onToggleKnown}>
        {known ? <CheckCircleFilled aria-hidden="true" /> : <CheckOutlined aria-hidden="true" />}
        {known ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}
        <span className={styles.srOnly}> ({verb.base})</span>
      </button>
    </li>
  )
}

function CardGrid({ verbs, known, onToggleKnown }) {
  const [flipped, setFlipped] = useState(() => new Set())

  const toggle = (base) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(base)) next.delete(base)
      else next.add(base)
      return next
    })

  const allFlipped = verbs.length > 0 && verbs.every((v) => flipped.has(v.base))

  return (
    <>
      <div className={styles.gridBar}>
        <span className={styles.gridCount}>{verbs.length} thẻ</span>
        <Button size="small" icon={<RetweetOutlined />} onClick={() => setFlipped(allFlipped ? new Set() : new Set(verbs.map((v) => v.base)))}>
          {allFlipped ? 'Úp tất cả' : 'Lật tất cả'}
        </Button>
      </div>
      <ul className={styles.grid}>
        {verbs.map((v) => (
          <FlashCard
            key={v.base}
            verb={v}
            flipped={flipped.has(v.base)}
            onFlip={() => toggle(v.base)}
            known={known.has(v.base)}
            onToggleKnown={() => onToggleKnown(v.base)}
          />
        ))}
      </ul>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Table                                                              */
/* ------------------------------------------------------------------ */

function VerbTable({ verbs, known, onToggleKnown }) {
  const columns = [
    {
      title: 'V1 · Nguyên mẫu',
      dataIndex: 'base',
      key: 'base',
      sorter: (a, b) => a.base.localeCompare(b.base),
      defaultSortOrder: 'ascend',
      render: (t) => <strong>{t}</strong>,
    },
    {
      title: 'V2 · Quá khứ đơn',
      dataIndex: 'past',
      key: 'past',
      sorter: (a, b) => a.past.localeCompare(b.past),
      render: (t, r) => <Changed base={r.base} form={t} />,
    },
    {
      title: 'V3 · Quá khứ phân từ',
      dataIndex: 'pp',
      key: 'pp',
      sorter: (a, b) => a.pp.localeCompare(b.pp),
      render: (t, r) => <Changed base={r.base} form={t} />,
    },
    {
      title: 'Nghĩa',
      dataIndex: 'meaning',
      key: 'meaning',
      sorter: (a, b) => a.meaning.localeCompare(b.meaning, 'vi'),
    },
    {
      title: 'Quy luật',
      key: 'pattern',
      sorter: (a, b) => PATTERNS.indexOf(PATTERN_BY_KEY[a.pattern]) - PATTERNS.indexOf(PATTERN_BY_KEY[b.pattern]),
      render: (_, r) => {
        const g = groupOf(r)
        return (
          <span className={styles.tablePattern} style={{ '--chip': g.color }}>
            {g.label}
            <small>{PATTERN_BY_KEY[r.pattern].name}</small>
          </span>
        )
      },
    },
    {
      title: 'Đã thuộc',
      key: 'known',
      align: 'center',
      width: 90,
      sorter: (a, b) => Number(known.has(a.base)) - Number(known.has(b.base)),
      render: (_, r) => (
        <button
          type="button"
          className={styles.tableKnown}
          aria-pressed={known.has(r.base)}
          aria-label={`${r.base}: ${known.has(r.base) ? 'bỏ đánh dấu đã thuộc' : 'đánh dấu đã thuộc'}`}
          onClick={() => onToggleKnown(r.base)}
        >
          {known.has(r.base) ? <CheckCircleFilled /> : <CheckOutlined />}
        </button>
      ),
    },
  ]

  return (
    <Table
      className={styles.table}
      size="small"
      rowKey="base"
      columns={columns}
      dataSource={verbs}
      pagination={{ pageSize: 25, showSizeChanger: false, hideOnSinglePage: true }}
      scroll={{ x: 680 }}
      locale={{ emptyText: 'Không tìm thấy động từ nào.' }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IrregularVerbs() {
  const [view, setView] = useState('cards')
  const [group, setGroup] = useState(null)
  const [pattern, setPattern] = useState(null)
  const [query, setQuery] = useState('')
  const [hideKnown, setHideKnown] = useState(false)
  const [known, setKnown] = useState(() => {
    const list = readStore(KNOWN_KEY, [])
    return new Set(Array.isArray(list) ? list : [])
  })

  const toggleKnown = useCallback((base) => {
    setKnown((prev) => {
      const next = new Set(prev)
      if (next.has(base)) next.delete(base)
      else next.add(base)
      writeStore(KNOWN_KEY, [...next])
      return next
    })
  }, [])

  const counts = useMemo(() => {
    const c = { group: {}, pattern: {} }
    VERBS.forEach((v) => {
      const g = PATTERN_BY_KEY[v.pattern].group
      c.group[g] = (c.group[g] || 0) + 1
      c.pattern[v.pattern] = (c.pattern[v.pattern] || 0) + 1
    })
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = normalize(query)
    return VERBS.filter((v) => {
      if (group && PATTERN_BY_KEY[v.pattern].group !== group) return false
      if (pattern && v.pattern !== pattern) return false
      if (hideKnown && known.has(v.base)) return false
      if (!q) return true
      return [v.base, v.past, v.pp, v.meaning].some((f) => f.toLowerCase().includes(q))
    })
  }, [group, pattern, query, hideKnown, known])

  const selectGroup = (g) => {
    setGroup(g)
    setPattern(null)
  }

  const knownCount = known.size
  const knownPct = Math.round((knownCount / VERBS.length) * 100)

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <Input
          allowClear
          prefix={<SearchOutlined aria-hidden="true" />}
          placeholder="Tìm động từ hoặc nghĩa…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.search}
          aria-label="Tìm động từ"
        />
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'cards', label: 'Thẻ', icon: <AppstoreOutlined /> },
            { value: 'table', label: 'Bảng', icon: <TableOutlined /> },
          ]}
          aria-label="Chế độ xem"
        />
        <label className={styles.hideKnown}>
          <Switch size="small" checked={hideKnown} onChange={setHideKnown} />
          <span>Ẩn từ đã thuộc</span>
        </label>
        <div className={styles.progress} title={`${knownCount}/${VERBS.length} đã thuộc`}>
          <span className={styles.progressText}>
            Đã thuộc <strong>{knownCount}</strong>/{VERBS.length}
          </span>
          <span className={styles.progressBar} aria-hidden="true">
            <span style={{ width: `${knownPct}%` }} />
          </span>
        </div>
      </div>

      <PatternFilter group={group} pattern={pattern} onGroup={selectGroup} onPattern={setPattern} counts={counts} />

      {view === 'cards' &&
        (filtered.length ? (
          <CardGrid verbs={filtered} known={known} onToggleKnown={toggleKnown} />
        ) : (
          <p className={styles.empty}>Không tìm thấy động từ nào. Thử từ khóa khác hoặc chọn “Tất cả”.</p>
        ))}
      {view === 'table' && <VerbTable verbs={filtered} known={known} onToggleKnown={toggleKnown} />}
    </div>
  )
}
