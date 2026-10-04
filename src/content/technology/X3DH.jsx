import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Button, Collapse, ConfigProvider, Segmented, Select, Slider, Switch, theme } from 'antd'
import {
  ArrowRightOutlined,
  CaretRightOutlined,
  CheckCircleFilled,
  CloudServerOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
  MoonOutlined,
  PauseOutlined,
  RedoOutlined,
  RightOutlined,
  SafetyCertificateOutlined,
  SunOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import s from './X3DH.module.css'

/* ------------------------------------------------------------------ */
/* Shared vocabulary                                                   */
/* ------------------------------------------------------------------ */

const C = {
  IK: '#a78bfa',
  SPK: '#38bdf8',
  OPK: '#fbbf24',
  EK: '#f472b6',
  SK: '#34d399',
}

const LAB_THEME = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#2563eb',
    colorBgContainer: '#111a2e',
    colorBgElevated: '#16213a',
    colorBorder: '#2a3a5c',
    borderRadius: 8,
  },
}

/** Inline key chip: <K k="IK" w="A" /> renders IK_A in the IK colour. */
function K({ k, w }) {
  return (
    <span className={s.k} style={{ '--k': C[k] }}>
      {k}
      {w && <sub>{w}</sub>}
    </span>
  )
}

function Section({ id, num, title, lead, children }) {
  return (
    <section className={s.section} aria-labelledby={id}>
      <header className={s.sectionHead}>
        <span className={s.num} aria-hidden="true">
          {num}
        </span>
        <h2 id={id} className={s.h2}>
          {title}
        </h2>
      </header>
      {lead && <p className={s.lead}>{lead}</p>}
      {children}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 1. The problem                                                      */
/* ------------------------------------------------------------------ */

function ProblemVisual() {
  return (
    <div className={`${s.lab} ${s.problemLab}`}>
      <div className={s.trio}>
        <div className={s.actorCard}>
          <UserOutlined className={s.actorIcon} aria-hidden="true" />
          <div className={s.actorName}>Alice</div>
          <span className={`${s.status} ${s.statusOn}`}>
            <span className={s.dot} aria-hidden="true" /> online
          </span>
          <p className={s.actorNote}>Wants to send “hey” right now.</p>
        </div>
        <div className={s.link} aria-hidden="true">
          <span className={s.linkLabel}>fetches Bob’s keys</span>
          <span className={s.linkArrow}>⟵</span>
        </div>
        <div className={`${s.actorCard} ${s.actorServer}`}>
          <CloudServerOutlined className={s.actorIcon} aria-hidden="true" />
          <div className={s.actorName}>Server</div>
          <span className={`${s.status} ${s.statusWarn}`}>
            <WarningOutlined aria-hidden="true" /> untrusted
          </span>
          <p className={s.actorNote}>Stores public keys and relays ciphertext. Must never learn the secret.</p>
        </div>
        <div className={s.link} aria-hidden="true">
          <span className={s.linkLabel}>uploaded earlier</span>
          <span className={s.linkArrow}>⟵</span>
        </div>
        <div className={`${s.actorCard} ${s.actorAsleep}`}>
          <UserOutlined className={s.actorIcon} aria-hidden="true" />
          <div className={s.actorName}>
            Bob <span className={s.zzz} aria-hidden="true">z z z</span>
          </div>
          <span className={`${s.status} ${s.statusOff}`}>
            <MoonOutlined aria-hidden="true" /> offline
          </span>
          <p className={s.actorNote}>Phone is off. Will reconnect hours or days later.</p>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 2. The keys                                                         */
/* ------------------------------------------------------------------ */

const KEY_CARDS = [
  {
    k: 'IK',
    name: 'Identity Key',
    owner: 'Both: IK_A and IK_B (one per device)',
    life: 'Long-term: months to years',
    lifePct: 100,
    job: 'Who the device is. Signs the SPK and feeds DH1 and DH2, which authenticate both sides.',
  },
  {
    k: 'SPK',
    name: 'Signed Prekey',
    owner: 'Bob (the responder)',
    life: 'Medium: rotated every few days to weeks',
    lifePct: 45,
    job: 'An always-available DH key on the server. Signed by IK_B so Alice can tell nobody swapped it.',
  },
  {
    k: 'OPK',
    name: 'One-Time Prekey',
    owner: 'Bob (uploaded in batches, ~100)',
    life: 'Single use: handed out once, then deleted',
    lifePct: 14,
    job: 'Optional. Adds a DH that can never repeat: forward secrecy right away and replay protection.',
  },
  {
    k: 'EK',
    name: 'Ephemeral Key',
    owner: 'Alice (the initiator)',
    life: 'One handshake: private half wiped after SK',
    lifePct: 5,
    job: 'Alice’s fresh randomness for this run. Appears in DH2, DH3 and DH4.',
  },
]

function KeyCards() {
  return (
    <>
      <ul className={s.keyGrid}>
        {KEY_CARDS.map((c) => (
          <li key={c.k} className={s.keyCard} style={{ '--k': C[c.k] }}>
            <div className={s.keyCardTop}>
              <span className={s.keyBig}>{c.k}</span>
              <span className={s.keyName}>{c.name}</span>
            </div>
            <dl className={s.keyDl}>
              <dt>Owner</dt>
              <dd>{c.owner}</dd>
              <dt>Lifetime</dt>
              <dd>
                {c.life}
                <span className={s.lifeBar} aria-hidden="true">
                  <span style={{ width: `${c.lifePct}%` }} />
                </span>
              </dd>
              <dt>Job</dt>
              <dd>{c.job}</dd>
            </dl>
          </li>
        ))}
      </ul>
      <p className={s.note}>
        The names are roles, not four key pairs. One run touches five public keys: <K k="IK" w="A" />{' '}
        <K k="EK" w="A" /> from Alice and <K k="IK" w="B" /> <K k="SPK" w="B" /> <K k="OPK" w="B" /> from Bob,
        all X25519 (or X448). “X3” is the three mandatory DHs; the OPK adds an optional fourth.
      </p>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* 3. Handshake simulator                                              */
/* ------------------------------------------------------------------ */

const SHORT = ['Publish', 'Fetch', 'Verify', 'EK', 'DH1', 'DH2', 'DH3', 'DH4', 'KDF', 'Send', 'Bob', 'Ratchet']

function buildSteps(noOPK) {
  const km = noOPK ? 'DH1 ‖ DH2 ‖ DH3' : 'DH1 ‖ DH2 ‖ DH3 ‖ DH4'
  return [
    {
      title: 'Bob publishes a prekey bundle, then goes offline',
      body: (
        <p>
          Long before Alice shows up, Bob’s device uploads only public keys: <K k="IK" w="B" />, <K k="SPK" w="B" />{' '}
          with its signature <code>Sig(IK_B, Encode(SPK_B))</code>, and a batch of <K k="OPK" w="B" />s. Private halves
          never leave the device. Then his phone goes dark.
          {noOPK && ' In this run, earlier conversations have already drained the OPK pool.'}
        </p>
      ),
      tags: [],
      log: [
        ['bob', '→ server  PUT bundle {IK_B, SPK_B#3, sig, OPK_B×100}'],
        ...(noOPK ? [['server', 'OPK pool drained by earlier sessions → 0 left']] : []),
        ['bob', 'offline'],
      ],
    },
    {
      title: 'Alice fetches Bob’s bundle',
      body: noOPK ? (
        <p>
          Alice asks for Bob’s bundle. The pool is empty, so she gets <K k="IK" w="B" />, <K k="SPK" w="B" /> and the
          signature, but no OPK. She can still run X3DH with three DHs.
        </p>
      ) : (
        <p>
          Alice asks for Bob’s bundle. The server returns <K k="IK" w="B" />, <K k="SPK" w="B" />, the signature and{' '}
          <em>one</em> <K k="OPK" w="B" /> (id #17), and deletes that OPK from the pool so it is never handed out twice.
        </p>
      ),
      tags: [],
      log: [
        ['alice', '→ server  GET bundle(bob)'],
        noOPK
          ? ['server', '→ alice  {IK_B, SPK_B#3, sig}  // no OPK left']
          : ['server', '→ alice  {IK_B, SPK_B#3, sig, OPK_B#17}'],
        ...(noOPK ? [] : [['server', 'delete OPK_B#17 from pool (99 left)']]),
      ],
    },
    {
      title: 'Alice verifies the signed prekey',
      body: (
        <p>
          Before using anything, Alice checks <code>Sig(IK_B, Encode(SPK_B))</code> (XEdDSA). If it fails she aborts, with
          no fallback. A valid signature proves the holder of <K k="IK" w="B" /> authorized this prekey. Whether{' '}
          <K k="IK" w="B" /> really is Bob is a separate question, answered by safety numbers.
        </p>
      ),
      tags: [{ label: 'SPK authenticity', color: C.SPK }],
      log: [['alice', 'XEdDSA.verify(IK_B, Encode(SPK_B), sig) → ok']],
    },
    {
      title: 'Alice generates an ephemeral key',
      body: (
        <p>
          <K k="EK" w="A" /> is a brand-new key pair made for this handshake only. It is Alice’s fresh contribution, and
          its private half is wiped as soon as SK exists.
        </p>
      ),
      tags: [],
      log: [['alice', 'EK_A ← X25519.generate()']],
    },
    {
      title: 'DH1 = DH(IK_A, SPK_B)',
      body: (
        <p>
          Alice’s long-term identity meets Bob’s signed prekey. Only the holder of <K k="IK" w="A" />
          ’s private key can compute this, so it proves to Bob that the session really involves Alice’s identity.
        </p>
      ),
      tags: [{ label: 'Authenticates Alice', color: C.IK }],
      log: [['alice', 'DH1 = DH(IK_A, SPK_B)']],
    },
    {
      title: 'DH2 = DH(EK_A, IK_B)',
      body: (
        <p>
          Alice’s ephemeral meets Bob’s identity key. Only the holder of <K k="IK" w="B" />
          ’s private key can compute it, so only the real Bob can derive SK. DH1 + DH2 together give mutual
          authentication.
        </p>
      ),
      tags: [{ label: 'Authenticates Bob', color: C.IK }],
      log: [['alice', 'DH2 = DH(EK_A, IK_B)']],
    },
    {
      title: 'DH3 = DH(EK_A, SPK_B)',
      body: (
        <p>
          Ephemeral meets signed prekey: no long-term key involved. Once Alice wipes <K k="EK" w="A" /> and Bob rotates and
          deletes <K k="SPK" w="B" />, nobody can recompute DH3, not even an attacker who later steals both identity keys.
        </p>
      ),
      tags: [{ label: 'Forward secrecy', color: C.SPK }],
      log: [['alice', 'DH3 = DH(EK_A, SPK_B)']],
    },
    {
      title: noOPK ? 'DH4 skipped: no one-time prekey' : 'DH4 = DH(EK_A, OPK_B)',
      body: noOPK ? (
        <p>There is no OPK in this bundle, so there is no fourth DH.</p>
      ) : (
        <p>
          The optional fourth DH uses a key that exists for exactly one session. Bob deletes <K k="OPK" w="B" />
          ’s private half after use, so forward secrecy starts immediately instead of at the next SPK rotation, and a
          replayed initial message can’t be opened again.
        </p>
      ),
      tags: noOPK
        ? []
        : [
            { label: 'Immediate forward secrecy', color: C.OPK },
            { label: 'Replay protection', color: C.OPK },
          ],
      log: [noOPK ? ['alice', 'DH4 skipped (bundle had no OPK)'] : ['alice', 'DH4 = DH(EK_A, OPK_B)']],
    },
    {
      title: `SK = KDF(${km})`,
      body: (
        <p>
          The DH outputs are concatenated in a fixed order, prefixed with 32 <code>0xFF</code> bytes (for X25519), and run
          through HKDF with a zero salt and an app-specific info string. The 32-byte result is <K k="SK" />. Alice wipes{' '}
          <K k="EK" w="A" />
          ’s private key and the raw DH outputs, and builds the associated data{' '}
          <code>AD = Encode(IK_A) ‖ Encode(IK_B)</code>.
        </p>
      ),
      tags: [{ label: 'One 32-byte secret', color: C.SK }],
      log: [
        ['alice', `SK = HKDF(F ‖ ${km})`],
        ['alice', 'AD = Encode(IK_A) ‖ Encode(IK_B)'],
        ['alice', 'wipe EK_A private key and DH outputs'],
      ],
    },
    {
      title: 'Alice sends the initial message',
      body: (
        <>
          <p>Without waiting for Bob, Alice sends one message through the server:</p>
          <pre className={s.msg}>
            {`{
  IK_A, EK_A,             // her public keys
  spk_id: 3,${noOPK ? '' : '\n  opk_id: 17,'}
  ciphertext: AEAD(SK, "hey", AD)
}`}
          </pre>
          <p>
            AD binds both identities to the ciphertext, so it can’t be transplanted into a handshake that names someone
            else.
          </p>
        </>
      ),
      tags: [{ label: 'Identity binding (AD)', color: C.IK }],
      log: [
        ['alice', `→ server  {IK_A, EK_A, spk#3${noOPK ? '' : ', opk#17'}, AEAD(SK, "hey", AD)}`],
        ['server', 'queue message for bob'],
      ],
    },
    {
      title: 'Bob comes online and mirrors the math',
      body: (
        <p>
          Bob finds the private keys for SPK #3{noOPK ? '' : ' and OPK #17'} and computes the same DHs from his side:{' '}
          <code>DH1 = DH(SPK_B, IK_A)</code>, <code>DH2 = DH(IK_B, EK_A)</code>, <code>DH3 = DH(SPK_B, EK_A)</code>
          {noOPK ? '' : <>, <code>DH4 = DH(OPK_B, EK_A)</code></>}. Same inputs, same order, same <K k="SK" />. If the AEAD
          check passes{noOPK ? ' he reads the message' : <>, he deletes <K k="OPK" w="B" />’s private key</>}; if it
          fails, he aborts and deletes SK.
        </p>
      ),
      tags: [{ label: 'Same SK, no round trip', color: C.SK }],
      log: [
        ['bob', 'online · receives queued message'],
        ['bob', `mirror DHs: DH(SPK_B, IK_A) … ${noOPK ? 'DH(SPK_B, EK_A)' : 'DH(OPK_B, EK_A)'}`],
        ['bob', 'SK′ == SK → AEAD open ok → "hey"'],
        ...(noOPK ? [] : [['bob', 'delete OPK_B#17 private key']]),
      ],
    },
    {
      title: 'Hand off to the Double Ratchet',
      body: (
        <p>
          X3DH’s job ends here. <K k="SK" /> becomes the Double Ratchet’s initial root key, AD is reused as associated
          data, and <K k="SPK" w="B" /> serves as Bob’s first ratchet public key. From now on every message gets its own
          key.
        </p>
      ),
      tags: [{ label: 'Per-message keys next', color: C.SK }],
      log: [['both', 'DoubleRatchet.init(SK, AD, bobRatchetKey = SPK_B)']],
    },
  ]
}

// Diagram geometry (viewBox 480 × 336)
const CHIP_W = 104
const CHIP_H = 40
const AX = 10
const BX = 366
const X1 = AX + CHIP_W
const X2 = BX
const DHS = [
  { id: 'DH1', y1: 80, y2: 142, t: 0.3, a: C.IK, b: C.SPK, ak: 'IK', bk: 'SPK' },
  { id: 'DH2', y1: 208, y2: 70, t: 0.3, a: C.EK, b: C.IK, ak: 'EK', bk: 'IK' },
  { id: 'DH3', y1: 220, y2: 158, t: 0.7, a: C.EK, b: C.SPK, ak: 'EK', bk: 'SPK' },
  { id: 'DH4', y1: 232, y2: 230, t: 0.7, a: C.EK, b: C.OPK, ak: 'EK', bk: 'OPK' },
].map((d) => ({ ...d, lx: X1 + d.t * (X2 - X1), ly: d.y1 + d.t * (d.y2 - d.y1) }))
const KDF_BOX = { x: 140, y: 272, w: 200, h: 52 }

function SvgChip({ x, y, k, w, sub, glow, ghost, dim, struck }) {
  const color = C[k]
  return (
    <g
      className={s.svgChipG}
      style={{ opacity: dim ? 0.3 : 1, filter: glow ? `drop-shadow(0 0 6px ${color})` : 'none' }}
    >
      <rect
        x={x}
        y={y}
        width={CHIP_W}
        height={CHIP_H}
        rx="8"
        fill={color}
        fillOpacity={ghost ? 0 : 0.14}
        stroke={color}
        strokeWidth={glow ? 2.5 : 1.5}
        strokeDasharray={ghost ? '5 4' : undefined}
      />
      <text x={x + CHIP_W / 2} y={y + 26} textAnchor="middle" className={s.svgChipText} fill={color}>
        {ghost ? 'no OPK' : k}
        {!ghost && w && (
          <tspan dy="4" fontSize="12">
            {w}
          </tspan>
        )}
      </text>
      {struck && <line x1={x + 8} y1={y + CHIP_H / 2} x2={x + CHIP_W - 8} y2={y + CHIP_H / 2} stroke={color} strokeWidth="2" />}
      {sub && (
        <text x={x + CHIP_W / 2} y={y + CHIP_H + 15} textAnchor="middle" className={s.svgSub}>
          {sub}
        </text>
      )}
    </g>
  )
}

function HandshakeDiagram({ step, noOPK, title }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const cur = step >= 4 && step <= 7 ? step - 4 : -1
  const curDH = cur >= 0 && !(cur === 3 && noOPK) ? DHS[cur] : null
  const involved = (side, k) => curDH && (side === 'A' ? curDH.ak === k : curDH.bk === k)
  const mirror = step === 10
  const lineVisible = (i) => step >= 4 + i && !(i === 3 && noOPK)

  const opkSub = noOPK ? 'pool empty' : step === 0 ? 'pool ×100' : step >= 10 ? 'private deleted' : '#17 · popped'

  let kdfLine = ''
  if (step === 8) kdfLine = noOPK ? 'DH1‖DH2‖DH3' : 'DH1‖DH2‖DH3‖DH4'
  if (step === 9) kdfLine = 'encrypts first message'
  if (step === 10) kdfLine = 'Bob: SK′ = SK ✓'
  if (step === 11) kdfLine = '→ Double Ratchet'

  return (
    <svg viewBox="0 0 480 336" className={s.diagram} role="img" aria-label={`Key diagram. Current step: ${title}`}>
      <defs>
        {DHS.map((d) => (
          <linearGradient key={d.id} id={`${uid}-${d.id}`} gradientUnits="userSpaceOnUse" x1={X1} y1={d.y1} x2={X2} y2={d.y2}>
            <stop offset="0" stopColor={d.a} />
            <stop offset="1" stopColor={d.b} />
          </linearGradient>
        ))}
      </defs>

      <text x={AX + CHIP_W / 2} y="24" textAnchor="middle" className={s.svgHead}>
        ALICE
      </text>
      <text x={BX + CHIP_W / 2} y="24" textAnchor="middle" className={s.svgHead}>
        BOB
      </text>
      <text x={BX + CHIP_W / 2} y="40" textAnchor="middle" className={s.svgSub}>
        {step >= 10 ? 'private keys' : 'public, via server'}
      </text>

      {/* signature check arc */}
      {step === 2 && (
        <g>
          <path d={`M ${BX} 76 C ${BX - 40} 92, ${BX - 40} 128, ${BX} 144`} className={s.sigArc} />
          <text x={BX - 38} y="114" textAnchor="end" className={s.svgSig}>
            sig ✓
          </text>
        </g>
      )}

      {/* DH lines */}
      {DHS.map((d, i) =>
        lineVisible(i) ? (
          <line
            key={d.id}
            x1={X1}
            y1={d.y1}
            x2={X2}
            y2={d.y2}
            stroke={`url(#${uid}-${d.id})`}
            strokeWidth={i === cur ? 3.5 : 2}
            strokeOpacity={i === cur || mirror || step >= 8 ? 1 : 0.45}
            className={i === cur ? s.flow : mirror ? s.flowBack : undefined}
          />
        ) : null,
      )}

      {/* KDF combine lines */}
      {step >= 8 &&
        DHS.map((d, i) =>
          lineVisible(i) ? (
            <line
              key={`k${d.id}`}
              x1={d.lx}
              y1={d.ly + 11}
              x2={KDF_BOX.x + KDF_BOX.w / 2}
              y2={KDF_BOX.y}
              stroke={C.SK}
              strokeOpacity="0.55"
              strokeWidth="1.5"
              className={step === 8 ? s.flow : undefined}
            />
          ) : null,
        )}

      {/* DH labels */}
      {DHS.map((d, i) =>
        lineVisible(i) ? (
          <g key={`l${d.id}`}>
            <rect
              x={d.lx - 24}
              y={d.ly - 11}
              width="48"
              height="22"
              rx="11"
              fill="#0b1220"
              stroke={i === cur ? '#f8fafc' : '#4b5d80'}
              strokeWidth={i === cur ? 2 : 1}
            />
            <text x={d.lx} y={d.ly + 5} textAnchor="middle" className={s.svgLabel}>
              {d.id}
            </text>
          </g>
        ) : null,
      )}

      {/* Alice chips */}
      <SvgChip x={AX} y={60} k="IK" w="A" sub="long-term" glow={involved('A', 'IK') || step === 9} />
      {step >= 3 && (
        <SvgChip
          x={AX}
          y={200}
          k="EK"
          w="A"
          sub={step >= 8 ? 'private wiped' : 'fresh, this run'}
          glow={step === 3 || involved('A', 'EK')}
        />
      )}

      {/* Bob chips */}
      <SvgChip x={BX} y={50} k="IK" w="B" sub="long-term" glow={step === 2 || involved('B', 'IK')} />
      <SvgChip
        x={BX}
        y={130}
        k="SPK"
        w="B"
        sub={step >= 2 ? 'signature ok' : 'signed by IK_B'}
        glow={step === 2 || involved('B', 'SPK') || step === 11}
      />
      <SvgChip
        x={BX}
        y={210}
        k="OPK"
        w="B"
        ghost={noOPK}
        sub={opkSub}
        glow={!noOPK && (step === 1 || involved('B', 'OPK'))}
        struck={!noOPK && step >= 10}
      />

      {/* KDF box */}
      {step >= 8 && (
        <g>
          <rect
            x={KDF_BOX.x}
            y={KDF_BOX.y}
            width={KDF_BOX.w}
            height={KDF_BOX.h}
            rx="10"
            fill="#0b1220"
            stroke={C.SK}
            strokeWidth="2"
            style={{ filter: `drop-shadow(0 0 8px ${C.SK}66)` }}
          />
          <text x={KDF_BOX.x + KDF_BOX.w / 2} y={KDF_BOX.y + 22} textAnchor="middle" className={s.svgKdf}>
            HKDF → SK
          </text>
          <text x={KDF_BOX.x + KDF_BOX.w / 2} y={KDF_BOX.y + 41} textAnchor="middle" className={s.svgKdfSub}>
            {kdfLine}
          </text>
        </g>
      )}
    </svg>
  )
}

function ActorStrip({ step, noOPK }) {
  const bobOnline = step === 0 || step >= 10
  let serverNote
  if (step === 0) serverNote = noOPK ? 'Bundle stored · OPK pool: 0' : 'Bundle stored · OPK pool: 100'
  else if (step <= 8) serverNote = noOPK ? 'OPK pool: 0 (none to give)' : 'OPK pool: 99 · #17 handed out'
  else if (step === 9) serverNote = '1 message queued for Bob'
  else serverNote = 'Message delivered'

  let bobNote = 'Phone off'
  if (step === 0) bobNote = 'Uploads bundle, then sleeps'
  if (step >= 10) bobNote = 'Back online'

  return (
    <div className={s.strip}>
      <div className={s.stripItem}>
        <UserOutlined aria-hidden="true" />
        <div>
          <div className={s.stripName}>
            Alice{' '}
            <span className={`${s.mini} ${step === 0 ? s.miniOff : s.miniOn}`}>{step === 0 ? 'idle' : 'online'}</span>
          </div>
          <div className={s.stripNote}>{step === 0 ? 'Not here yet' : step >= 10 ? 'Already sent “hey”' : 'Running X3DH locally'}</div>
        </div>
      </div>
      <div className={s.stripItem}>
        <CloudServerOutlined aria-hidden="true" />
        <div>
          <div className={s.stripName}>
            Server <span className={`${s.mini} ${s.miniWarn}`}>untrusted</span>
          </div>
          <div className={s.stripNote}>{serverNote}</div>
        </div>
      </div>
      <div className={s.stripItem}>
        {bobOnline ? <SunOutlined aria-hidden="true" /> : <MoonOutlined aria-hidden="true" />}
        <div>
          <div className={s.stripName}>
            Bob{' '}
            <span className={`${s.mini} ${bobOnline ? s.miniOn : s.miniOff}`}>{bobOnline ? 'online' : 'offline'}</span>
          </div>
          <div className={s.stripNote}>{bobNote}</div>
        </div>
      </div>
    </div>
  )
}

const ACTOR_COLOR = { alice: C.EK, bob: C.SPK, server: '#cbd5e1', both: C.SK }

function Simulator() {
  const [step, setStep] = useState(0)
  const [noOPK, setNoOPK] = useState(false)
  const [playing, setPlaying] = useState(false)
  const switchId = useId()
  const logRef = useRef(null)
  const steps = useMemo(() => buildSteps(noOPK), [noOPK])
  const last = steps.length - 1
  const skipped = (i) => noOPK && i === 7

  const nextOf = (i) => {
    let n = i + 1
    if (skipped(n)) n += 1
    return Math.min(n, last)
  }
  const prevOf = (i) => {
    let n = i - 1
    if (skipped(n)) n -= 1
    return Math.max(n, 0)
  }

  useEffect(() => {
    if (!playing) return undefined
    if (step >= last) {
      setPlaying(false)
      return undefined
    }
    const t = setTimeout(() => setStep((cur) => nextOf(cur)), 3000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, step, last, noOPK])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [step, noOPK])

  const togglePlay = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (step >= last) setStep(0)
    setPlaying(true)
  }

  const onToggleOPK = (v) => {
    setNoOPK(v)
    if (v && step === 7) setStep(8)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setStep(nextOf(step))
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setStep(prevOf(step))
    }
  }

  const cur = steps[step]
  const logLines = steps.slice(0, step + 1).flatMap((st, i) => st.log.map((l, j) => ({ who: l[0], text: l[1], i, key: `${i}-${j}` })))

  return (
    <ConfigProvider theme={LAB_THEME}>
      <div className={`${s.lab} ${s.sim}`}>
        <div className={s.simTop}>
          <div className={s.labTitle}>
            <span className={s.led} aria-hidden="true" /> handshake.sim
          </div>
          <div className={s.toggle}>
            <Switch id={switchId} size="small" checked={noOPK} onChange={onToggleOPK} />
            <label htmlFor={switchId}>Bundle has no OPK</label>
          </div>
        </div>

        <ol className={s.rail} aria-label="Handshake steps" onKeyDown={onKeyDown}>
          {SHORT.map((label, i) => {
            const isSkipped = skipped(i)
            const state = i === step ? s.railCur : i < step ? s.railDone : ''
            return (
              <li key={label}>
                <button
                  type="button"
                  className={`${s.railBtn} ${state} ${isSkipped ? s.railSkip : ''}`}
                  aria-current={i === step ? 'step' : undefined}
                  aria-label={`Step ${i + 1}: ${isSkipped ? 'DH4 (skipped, no OPK)' : steps[i].title}`}
                  disabled={isSkipped}
                  onClick={() => {
                    setPlaying(false)
                    setStep(i)
                  }}
                >
                  <span className={s.railNum}>{i + 1}</span>
                  <span className={s.railLabel}>{label}</span>
                </button>
              </li>
            )
          })}
        </ol>

        <ActorStrip step={step} noOPK={noOPK} />

        <div className={s.stage}>
          <div className={s.diagramWrap}>
            <HandshakeDiagram step={step} noOPK={noOPK} title={cur.title} />
          </div>
          <div className={s.side}>
            <div className={s.stepCard} aria-live="polite">
              <div className={s.eyebrow}>
                Step {step + 1} / {steps.length}
              </div>
              <h3 className={s.stepTitle}>{cur.title}</h3>
              <div className={s.stepBody}>{cur.body}</div>
              {cur.tags.length > 0 && (
                <div className={s.tags}>
                  {cur.tags.map((t) => (
                    <span key={t.label} className={s.tag} style={{ '--k': t.color }}>
                      <CheckCircleFilled aria-hidden="true" /> {t.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className={s.log} ref={logRef} tabIndex={0} aria-label="Protocol log">
              {logLines.map((l) => (
                <div key={l.key} className={`${s.logLine} ${l.i === step ? s.logNew : ''}`}>
                  <span className={s.logWho} style={{ color: ACTOR_COLOR[l.who] }}>
                    {l.who.padEnd(6, ' ')}
                  </span>
                  <span>{l.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {noOPK && (
          <div className={s.warnBox} role="note">
            <WarningOutlined aria-hidden="true" className={s.warnIcon} />
            <p>
              <strong>No OPK means SK = KDF(DH1 ‖ DH2 ‖ DH3).</strong> The session is still mutually authenticated, but
              two protections weaken. <em>Replay:</em> an attacker can resend Alice’s initial message and Bob derives the
              same SK and accepts it again, so the post-X3DH protocol must mix in fresh randomness from Bob quickly.{' '}
              <em>Forward secrecy:</em> this session’s secrecy now waits for <K k="SPK" w="B" /> to be rotated and deleted,
              instead of ending the moment a one-time key is burned. A malicious server can force this mode by withholding
              OPKs.
            </p>
          </div>
        )}

        <div className={s.controls}>
          <Button
            icon={<LeftOutlined />}
            onClick={() => {
              setPlaying(false)
              setStep(prevOf(step))
            }}
            disabled={step === 0}
          >
            Prev
          </Button>
          <Button type="primary" icon={playing ? <PauseOutlined /> : <CaretRightOutlined />} onClick={togglePlay}>
            {playing ? 'Pause' : step >= last ? 'Replay' : 'Autoplay'}
          </Button>
          <Button
            onClick={() => {
              setPlaying(false)
              setStep(nextOf(step))
            }}
            disabled={step >= last}
          >
            Next <RightOutlined />
          </Button>
          <span className={s.kbdHint}>Tip: ← → keys work while a step button has focus.</span>
        </div>
      </div>
    </ConfigProvider>
  )
}

/* ------------------------------------------------------------------ */
/* 4. Toy Diffie-Hellman playground                                    */
/* ------------------------------------------------------------------ */

const PRIMES = [23, 47, 97]

function modPow(base, exp, mod) {
  let r = 1n
  let b = BigInt(base) % BigInt(mod)
  let e = BigInt(exp)
  const m = BigInt(mod)
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m
    b = (b * b) % m
    e >>= 1n
  }
  return Number(r)
}

function primeFactors(n) {
  const out = []
  let x = n
  for (let f = 2; f * f <= x; f += 1) {
    if (x % f === 0) {
      out.push(f)
      while (x % f === 0) x /= f
    }
  }
  if (x > 1) out.push(x)
  return out
}

function primitiveRoots(p) {
  const qs = primeFactors(p - 1)
  const roots = []
  for (let g = 2; g < p; g += 1) {
    if (qs.every((q) => modPow(g, (p - 1) / q, p) !== 1)) roots.push(g)
  }
  return roots
}

function discreteLog(g, target, p) {
  for (let x = 1; x < p; x += 1) if (modPow(g, x, p) === target) return x
  return null
}

/** Toy combiner: 32-bit FNV-1a over "v1|v2|...". Deliberately NOT HKDF. */
function toyMix(values) {
  let h = 0x811c9dc5
  for (const ch of values.join('|')) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const randSecret = (p) => 2 + Math.floor(Math.random() * (p - 3))

function Pow({ b, e, p, r }) {
  return (
    <span className={s.pow}>
      {b}
      <sup>{e}</sup> mod {p} = <strong>{r}</strong>
    </span>
  )
}

function Labeled({ label, id, children }) {
  return (
    <div className={s.ctl}>
      <span className={s.ctlLabel} id={id}>
        {label}
      </span>
      {children}
    </div>
  )
}

function ClassicDH({ p, g, a, b, setA, setB }) {
  const ids = useId()
  const A = modPow(g, a, p)
  const B = modPow(g, b, p)
  const sA = modPow(B, a, p)
  const sB = modPow(A, b, p)
  const eveA = discreteLog(g, A, p)
  const eveS = eveA ? modPow(B, eveA, p) : null

  return (
    <>
      <div className={s.ctlRow}>
        <Labeled label={`Alice’s secret a = ${a}`} id={`${ids}-a`}>
          <Slider min={2} max={p - 2} value={a} onChange={setA} ariaLabelledByForHandle={`${ids}-a`} />
        </Labeled>
        <Labeled label={`Bob’s secret b = ${b}`} id={`${ids}-b`}>
          <Slider min={2} max={p - 2} value={b} onChange={setB} ariaLabelledByForHandle={`${ids}-b`} />
        </Labeled>
      </div>

      <div className={s.dhCols}>
        <div className={s.party} style={{ '--k': C.EK }}>
          <div className={s.partyHead}>Alice</div>
          <div className={s.row}>
            <EyeInvisibleOutlined aria-hidden="true" /> <span className={s.priv}>a = {a}</span>
            <span className={s.rowHint}>private</span>
          </div>
          <div className={s.row}>
            <EyeOutlined aria-hidden="true" /> A = <Pow b={g} e={a} p={p} r={A} />
          </div>
          <div className={s.row}>
            <EyeInvisibleOutlined aria-hidden="true" /> s = <Pow b={B} e={a} p={p} r={sA} />
          </div>
        </div>

        <div className={s.wire}>
          <div className={s.partyHead}>
            <EyeOutlined aria-hidden="true" /> Eve on the wire sees
          </div>
          <div className={s.wireVals}>
            <span>p = {p}</span>
            <span>g = {g}</span>
            <span>A = {A}</span>
            <span>B = {B}</span>
          </div>
          <div className={s.wireHidden}>Never sent: a, b, s</div>
          <div className={s.brute}>
            Brute force: try x = 1, 2, 3… until {g}
            <sup>x</sup> ≡ {A} (mod {p}). Found x = {eveA} after {eveA} tries, so s = {eveS}. Trivial at p = {p};
            hopeless when p is around 2<sup>255</sup>.
          </div>
        </div>

        <div className={s.party} style={{ '--k': C.SPK }}>
          <div className={s.partyHead}>Bob</div>
          <div className={s.row}>
            <EyeInvisibleOutlined aria-hidden="true" /> <span className={s.priv}>b = {b}</span>
            <span className={s.rowHint}>private</span>
          </div>
          <div className={s.row}>
            <EyeOutlined aria-hidden="true" /> B = <Pow b={g} e={b} p={p} r={B} />
          </div>
          <div className={s.row}>
            <EyeInvisibleOutlined aria-hidden="true" /> s = <Pow b={A} e={b} p={p} r={sB} />
          </div>
        </div>
      </div>

      <div className={s.match} role="status">
        <CheckCircleFilled aria-hidden="true" /> Both sides get s = {sA}
        {sA === sB ? '' : ' (mismatch?)'} without ever sending a or b.
      </div>
    </>
  )
}

const TOY_KEYS = [
  { id: 'ikA', k: 'IK', w: 'A' },
  { id: 'ekA', k: 'EK', w: 'A' },
  { id: 'ikB', k: 'IK', w: 'B' },
  { id: 'spkB', k: 'SPK', w: 'B' },
  { id: 'opkB', k: 'OPK', w: 'B' },
]

// [label, Alice private, Bob public] and the mirror [Bob private, Alice public]
const TOY_DH = [
  { id: 'DH1', aPriv: 'ikA', bPub: 'spkB', bPriv: 'spkB', aPub: 'ikA' },
  { id: 'DH2', aPriv: 'ekA', bPub: 'ikB', bPriv: 'ikB', aPub: 'ekA' },
  { id: 'DH3', aPriv: 'ekA', bPub: 'spkB', bPriv: 'spkB', aPub: 'ekA' },
  { id: 'DH4', aPriv: 'ekA', bPub: 'opkB', bPriv: 'opkB', aPub: 'ekA' },
]
const KEY_BY_ID = Object.fromEntries(TOY_KEYS.map((t) => [t.id, t]))

function ToyX3DH({ p, g, keys, setKeys }) {
  const [useOPK, setUseOPK] = useState(true)
  const switchId = useId()
  const pub = Object.fromEntries(Object.entries(keys).map(([id, x]) => [id, modPow(g, x, p)]))
  const rows = TOY_DH.filter((d) => useOPK || d.id !== 'DH4').map((d) => ({
    ...d,
    alice: modPow(pub[d.bPub], keys[d.aPriv], p),
    bob: modPow(pub[d.aPub], keys[d.bPriv], p),
  }))
  const aliceVals = rows.map((r) => r.alice)
  const bobVals = rows.map((r) => r.bob)
  const skA = toyMix(aliceVals)
  const skB = toyMix(bobVals)
  const swapped = [aliceVals[1], aliceVals[0], ...aliceVals.slice(2)]
  const skSwap = toyMix(swapped)

  const reroll = () => setKeys(Object.fromEntries(TOY_KEYS.map((t) => [t.id, randSecret(p)])))
  const chip = (id) => <K k={KEY_BY_ID[id].k} w={KEY_BY_ID[id].w} />
  const name = (id) => `${KEY_BY_ID[id].k}_${KEY_BY_ID[id].w}`

  return (
    <>
      <div className={s.toyBar}>
        <div className={s.toggle}>
          <Switch id={switchId} size="small" checked={useOPK} onChange={setUseOPK} />
          <label htmlFor={switchId}>Include OPK (DH4)</label>
        </div>
        <Button icon={<RedoOutlined />} onClick={reroll}>
          New random keys
        </Button>
      </div>

      <ul className={s.toyKeys}>
        {TOY_KEYS.filter((t) => useOPK || t.id !== 'opkB').map((t) => (
          <li key={t.id} className={s.toyKey}>
            <K k={t.k} w={t.w} />
            <span className={s.toyPriv}>
              <EyeInvisibleOutlined aria-hidden="true" /> priv {keys[t.id]}
            </span>
            <span className={s.toyPub}>
              <EyeOutlined aria-hidden="true" /> pub {g}
              <sup>{keys[t.id]}</sup> mod {p} = <strong>{pub[t.id]}</strong>
            </span>
          </li>
        ))}
      </ul>

      <ul className={s.toyDhList}>
        {rows.map((r) => (
          <li key={r.id} className={s.toyDh}>
            <div className={s.toyDhHead}>
              <span className={s.dhPill}>{r.id}</span> {chip(r.aPriv)} × {chip(r.bPub)}
            </div>
            <div className={s.toyCalc}>
              <span className={s.who}>Alice</span>
              <span className={s.sym}>
                {name(r.bPub)}
                <sup>{name(r.aPriv)}</sup>
              </span>
              <Pow b={pub[r.bPub]} e={keys[r.aPriv]} p={p} r={r.alice} />
            </div>
            <div className={s.toyCalc}>
              <span className={s.who}>Bob</span>
              <span className={s.sym}>
                {name(r.aPub)}
                <sup>{name(r.bPriv)}</sup>
              </span>
              <Pow b={pub[r.aPub]} e={keys[r.bPriv]} p={p} r={r.bob} />
            </div>
            <div className={s.toyOk}>
              <CheckCircleFilled aria-hidden="true" /> {r.alice === r.bob ? 'match' : 'mismatch'}
            </div>
          </li>
        ))}
      </ul>

      <div className={s.combiner}>
        <div className={s.combinerHead}>
          <span className={s.toyBadge}>TOY COMBINER</span> FNV-1a over “{aliceVals.join('|')}”. Not HKDF, not secure.
        </div>
        <div className={s.combinerRows}>
          <div>
            <span className={s.who}>Alice</span> <K k="SK" /> = <code className={s.hex}>0x{skA}</code>
          </div>
          <div>
            <span className={s.who}>Bob</span> <K k="SK" /> = <code className={s.hex}>0x{skB}</code>{' '}
            {skA === skB && (
              <span className={s.okText}>
                <CheckCircleFilled aria-hidden="true" /> same key
              </span>
            )}
          </div>
          <div className={s.swap}>
            <span className={s.who}>Swap DH1↔DH2</span> <code className={s.hex}>0x{skSwap}</code>{' '}
            {skSwap === skA ? '(same here only because DH1 = DH2; try new keys)' : '→ different key. Order is part of the protocol.'}
          </div>
        </div>
      </div>
      <p className={s.labNote}>
        Real X3DH does this with X25519 points and 32-byte outputs, then HKDF. With a modulus this small the DH outputs
        collide often and Eve can brute-force every key; only the shape of the trick carries over.
      </p>
    </>
  )
}

function Playground() {
  const [mode, setMode] = useState('dh')
  const [p, setP] = useState(23)
  const [g, setG] = useState(5)
  const [a, setA] = useState(6)
  const [b, setB] = useState(15)
  const [keys, setKeys] = useState({ ikA: 6, ekA: 9, ikB: 15, spkB: 4, opkB: 11 })
  const roots = useMemo(() => primitiveRoots(p), [p])
  const ids = useId()

  const onP = (np) => {
    setP(np)
    const r = primitiveRoots(np)
    if (!r.includes(g)) setG(r[0])
    setA((v) => clamp(v, 2, np - 2))
    setB((v) => clamp(v, 2, np - 2))
    setKeys((ks) => Object.fromEntries(Object.entries(ks).map(([id, x]) => [id, clamp(x, 2, np - 2)])))
  }

  return (
    <ConfigProvider theme={LAB_THEME}>
      <div className={`${s.lab} ${s.play}`}>
        <div className={s.simTop}>
          <div className={s.labTitle}>
            <span className={s.led} aria-hidden="true" /> toy-dh.lab
          </div>
          <Segmented
            aria-label="Playground mode"
            value={mode}
            onChange={setMode}
            options={[
              { label: 'Classic DH', value: 'dh' },
              { label: 'Toy X3DH', value: 'x3dh' },
            ]}
          />
        </div>

        <div className={s.params}>
          <Labeled label="Prime modulus p (public)" id={`${ids}-p`}>
            <Segmented
              aria-labelledby={`${ids}-p`}
              value={p}
              onChange={onP}
              options={PRIMES.map((v) => ({ label: String(v), value: v }))}
            />
          </Labeled>
          <Labeled label="Generator g (public, a primitive root mod p)" id={`${ids}-g`}>
            <Select
              aria-labelledby={`${ids}-g`}
              value={g}
              onChange={setG}
              options={roots.map((v) => ({ label: String(v), value: v }))}
              className={s.gSelect}
              popupMatchSelectWidth={false}
            />
          </Labeled>
        </div>

        {mode === 'dh' ? (
          <ClassicDH p={p} g={g} a={a} b={b} setA={setA} setB={setB} />
        ) : (
          <ToyX3DH p={p} g={g} keys={keys} setKeys={setKeys} />
        )}
      </div>
    </ConfigProvider>
  )
}

/* ------------------------------------------------------------------ */
/* 5. What each DH buys you                                            */
/* ------------------------------------------------------------------ */

const DH_TABLE = [
  {
    dh: 'DH1',
    pair: [['IK', 'A'], ['SPK', 'B']],
    buys: 'Authenticates Alice to Bob',
    who: 'Alice’s IK private, or Bob’s SPK private',
  },
  {
    dh: 'DH2',
    pair: [['EK', 'A'], ['IK', 'B']],
    buys: 'Authenticates Bob to Alice',
    who: 'Alice’s EK private, or Bob’s IK private',
  },
  {
    dh: 'DH3',
    pair: [['EK', 'A'], ['SPK', 'B']],
    buys: 'Forward secrecy, once EK_A is wiped and SPK_B rotated out',
    who: 'Alice’s EK private, or Bob’s SPK private',
  },
  {
    dh: 'DH4',
    pair: [['EK', 'A'], ['OPK', 'B']],
    buys: 'Immediate forward secrecy + replay protection (optional)',
    who: 'Alice’s EK private, or Bob’s OPK private',
  },
]

const SCENARIOS = [
  {
    title: 'An identity key leaks later',
    verdict: 'Past sessions safe',
    tone: 'ok',
    text: 'DH1 and DH2 become computable, but DH3 and DH4 still need EK_A and SPK_B/OPK_B private keys, which are gone. The catch is the future: the thief can now impersonate that identity in new sessions, so revoke the key and re-verify.',
  },
  {
    title: 'A signed prekey leaks before rotation',
    verdict: 'Depends on IK_B and the OPK',
    tone: 'warn',
    text: 'SPK_B alone is not enough: DH2 still needs EK_A or IK_B. If IK_B leaks too, a recorder can recompute sessions that used this SPK without an OPK. Sessions with a deleted OPK stay safe. Rotate SPKs and delete old private halves after a short grace window.',
  },
  {
    title: 'The OPK pool runs dry',
    verdict: 'Weaker, still authenticated',
    tone: 'warn',
    text: 'New sessions fall back to three DHs. Authentication is unchanged, but the initial message becomes replayable and forward secrecy waits for SPK rotation. A malicious server can cause this on purpose by withholding OPKs.',
  },
  {
    title: 'The server swaps in its own keys',
    verdict: 'Undetected without verification',
    tone: 'bad',
    text: 'If the server hands Alice its own IK and a validly self-signed SPK, every check passes and it sits in the middle. Only out-of-band verification, a pinned earlier key, or key transparency catches this.',
  },
]

const TONE_ICON = {
  ok: <CheckCircleFilled aria-hidden="true" />,
  warn: <WarningOutlined aria-hidden="true" />,
  bad: <WarningOutlined aria-hidden="true" />,
}

function Properties() {
  return (
    <>
      <div className={s.tableWrap}>
        <table className={s.propTable}>
          <thead>
            <tr>
              <th scope="col">DH</th>
              <th scope="col">Keys</th>
              <th scope="col">What it buys you</th>
              <th scope="col">Recomputable by whoever holds</th>
            </tr>
          </thead>
          <tbody>
            {DH_TABLE.map((r) => (
              <tr key={r.dh}>
                <th scope="row" data-label="DH">
                  <span className={s.dhPillLight}>{r.dh}</span>
                </th>
                <td data-label="Keys">
                  <K k={r.pair[0][0]} w={r.pair[0][1]} /> × <K k={r.pair[1][0]} w={r.pair[1][1]} />
                </td>
                <td data-label="Buys">{r.buys}</td>
                <td data-label="Exposed by">{r.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={s.note}>
        An attacker needs <em>every</em> DH to rebuild SK. Mixing long-term keys (authentication) with short-lived ones
        (forward secrecy) means no single stolen key is enough.
      </p>
      <h3 className={s.h3}>What happens if…</h3>
      <ul className={s.scenarios}>
        {SCENARIOS.map((sc) => (
          <li key={sc.title} className={`${s.scenario} ${s[`tone_${sc.tone}`]}`}>
            <div className={s.scenarioTitle}>{sc.title}</div>
            <div className={s.verdict}>
              {TONE_ICON[sc.tone]} {sc.verdict}
            </div>
            <p>{sc.text}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* 6. Production gotchas                                               */
/* ------------------------------------------------------------------ */

const GOTCHAS = [
  {
    key: 'race',
    label: 'One-time prekey races and exhaustion',
    body: [
      'Retries, a restored server snapshot or a malicious server can hand the same OPK to two initiators. Bob must delete the OPK private key after the first successful use and decide how to treat a second initial message naming a consumed id. Treat server-side “pop once” as an optimization, not a guarantee.',
      'When the pool hits zero, new sessions silently fall back to three DHs. Monitor pool size and replenish in batches, uploading only public keys.',
    ],
  },
  {
    key: 'spk',
    label: 'Stale signed prekeys and rotation',
    body: [
      'Rotate the SPK every few days to weeks and sign each new one with IK. Keep the previous SPK private key for a bounded grace period so messages built from a slightly old bundle still decrypt, then delete it. Keeping old SPKs forever erodes forward secrecy; deleting instantly makes delayed messages undecryptable.',
      'A valid signature does not prove freshness. Give bundles ids and an expiry policy.',
    ],
  },
  {
    key: 'replay',
    label: 'Replay of the initial message',
    body: [
      'Without an OPK, an attacker can resend Alice’s initial message and Bob derives the same SK again. Even with OPKs, a backup restore or non-atomic deletion can reopen the hole.',
      'Mitigate by mixing in fresh responder randomness quickly (the Double Ratchet’s first DH step does this), remembering ids of processed initial messages for a bounded time, and never using the X3DH key for more than the first message.',
    ],
  },
  {
    key: 'multi',
    label: 'Multi-device: one bundle per device',
    body: [
      'X3DH runs between devices, not people. Bob’s phone, laptop and tablet each publish their own IK, SPK and OPKs, and Alice runs a separate X3DH, and keeps a separate session, with each one. Adding or removing devices is an identity problem above X3DH (Signal’s Sesame algorithm handles session management).',
    ],
  },
  {
    key: 'safety',
    label: 'Identity key changes and safety numbers',
    body: [
      'Reinstalling the app usually means a new IK. Silently accepting it gives a compromised server a clean substitution path; blocking forever breaks recovery. Show a clear “safety number changed” warning.',
      'A safety number is a fingerprint of both identity keys. Comparing it in person, or scanning a QR code, is how users confirm that IK_B really belongs to Bob.',
    ],
  },
  {
    key: 'mitm',
    label: 'Server MITM without verification',
    body: [
      'The server chooses which IK_B Alice sees. If it substitutes its own identity key and runs a second X3DH with the real Bob, every signature checks out and it can read everything. X3DH cannot detect this on its own; only out-of-band verification, a previously pinned key, or key transparency can.',
    ],
  },
  {
    key: 'delete',
    label: 'Deleting private keys transactionally',
    body: [
      'The forward-secrecy argument rests on deletion: EK_A right after SK, OPK_B after the first successful decrypt, old SPKs after the grace window. Make “consume OPK + store session + delete key” one atomic, crash-safe operation, or a crash or retry can leave a key alive or lose a session.',
      'Keep single-use secrets out of backups. Restoring a consumed OPK resurrects replay risk.',
    ],
  },
  {
    key: 'abort',
    label: 'A signature or key check fails: stop',
    body: [
      'Abort the handshake. No “try without verification”, no fallback curve. Also reject invalid public keys and all-zero DH outputs. A failed check means corruption, a buggy peer or active substitution.',
    ],
  },
]

function Gotchas() {
  return (
    <Collapse
      className={s.collapse}
      items={GOTCHAS.map((gt) => ({
        key: gt.key,
        label: gt.label,
        children: gt.body.map((para) => (
          <p key={para.slice(0, 24)} className={s.gotchaP}>
            {para}
          </p>
        )),
      }))}
    />
  )
}

/* ------------------------------------------------------------------ */
/* 7. What comes next                                                  */
/* ------------------------------------------------------------------ */

const GO_CODE = `import (
	"bytes"
	"crypto/sha256"
	"io"
	"slices"

	"golang.org/x/crypto/hkdf"
)

// deriveSK folds the DH outputs into the 32-byte X3DH secret.
// Order is part of the protocol: DH1, DH2, DH3, then DH4 only if a
// one-time prekey was used. dh4 is nil otherwise.
func deriveSK(dh1, dh2, dh3, dh4 []byte) ([]byte, error) {
	// F = 32 bytes of 0xFF for X25519 (domain separation, per the spec).
	f := bytes.Repeat([]byte{0xFF}, 32)
	km := slices.Concat(f, dh1, dh2, dh3)
	if dh4 != nil {
		km = append(km, dh4...)
	}

	salt := make([]byte, sha256.Size) // zero-filled, hash length
	info := []byte("MyApp_X3DH_v1")   // identifies your application

	sk := make([]byte, 32)
	r := hkdf.New(sha256.New, km, salt, info)
	if _, err := io.ReadFull(r, sk); err != nil {
		return nil, err
	}
	return sk, nil
}

// Alice: deriveSK(IK_A·SPK_B, EK_A·IK_B, EK_A·SPK_B, EK_A·OPK_B)
// Bob:   deriveSK(SPK_B·IK_A, IK_B·EK_A, SPK_B·EK_A, OPK_B·EK_A)`

const GO_KEYWORDS = new Set(['import', 'func', 'return', 'if', 'nil', 'err', 'for', 'range', 'var', 'const', 'package'])
const GO_BUILTINS = new Set(['make', 'append', 'byte', 'error', 'string', 'int'])
const GO_TOKEN = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|(\b0x[0-9A-Fa-f]+\b|\b\d+\b)|([A-Za-z_]\w*)/g

function highlightGo(line) {
  const out = []
  let last = 0
  let m
  GO_TOKEN.lastIndex = 0
  while ((m = GO_TOKEN.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index))
    const [tok, comment, str, num, ident] = m
    let cls
    if (comment) cls = s.tCom
    else if (str) cls = s.tStr
    else if (num) cls = s.tNum
    else if (ident && GO_KEYWORDS.has(ident)) cls = s.tKey
    else if (ident && GO_BUILTINS.has(ident)) cls = s.tType
    else if (ident && line[m.index + tok.length] === '(') cls = s.tFn
    out.push(
      cls ? (
        <span key={m.index} className={cls}>
          {tok}
        </span>
      ) : (
        tok
      ),
    )
    last = m.index + tok.length
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

function CodeBlock({ code, lang }) {
  const lines = code.split('\n')
  return (
    <div className={s.codeWrap}>
      <div className={s.codeBar}>
        <span className={s.codeDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>x3dh/kdf.{lang}</span>
      </div>
      <pre className={s.code} tabIndex={0} aria-label="Go code: deriving SK with HKDF">
        <code>
          {lines.map((ln, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} className={s.codeLine}>
              {highlightGo(ln)}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

function Handoff() {
  return (
    <>
      <div className={`${s.lab} ${s.flowLab}`}>
        <div className={s.flowBox}>
          <div className={s.flowHead}>X3DH output</div>
          <ul className={s.flowList}>
            <li>
              <K k="SK" /> shared secret
            </li>
            <li>
              <code>AD</code> both identity keys
            </li>
            <li>
              <K k="SPK" w="B" /> Bob’s first ratchet key
            </li>
          </ul>
        </div>
        <ArrowRightOutlined className={s.flowArrow} aria-hidden="true" />
        <div className={s.flowBox}>
          <div className={s.flowHead}>Root key = SK</div>
          <p>A DH ratchet step on every change of turn mixes fresh DH output into the root key.</p>
        </div>
        <ArrowRightOutlined className={s.flowArrow} aria-hidden="true" />
        <div className={s.flowBox}>
          <div className={s.flowHead}>Chain keys</div>
          <p>One sending and one receiving chain, each advanced by a one-way KDF.</p>
        </div>
        <ArrowRightOutlined className={s.flowArrow} aria-hidden="true" />
        <div className={s.flowBox}>
          <div className={s.flowHead}>Message keys</div>
          <p>One per message, used once, then deleted.</p>
        </div>
      </div>
      <p className={s.body}>
        Reusing <K k="SK" /> for the whole conversation would make one leak expose every message. The Double Ratchet
        turns it into a fresh key per message (forward secrecy) and heals after a compromise once new DH output arrives
        (post-compromise security). X3DH’s only job is to give it a good, authenticated starting point. The KDF step that
        produces that starting point looks like this in Go, using <code>crypto/ecdh</code> for the DHs and{' '}
        <code>x/crypto/hkdf</code>:
      </p>
      <CodeBlock code={GO_CODE} lang="go" />
      <p className={s.note}>
        This is a sketch of one function, not an X3DH library. Both sides must agree on the curve encoding, the F prefix,
        salt, info string, DH order and output length byte for byte. <code>crypto/ecdh</code>’s X25519 already rejects
        low-order points (all-zero output); the XEdDSA signature that lets IK double as a signing key is not in Go’s
        standard library.
      </p>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function X3DH() {
  return (
    <div className={s.page}>
      <Section
        id="x3dh-problem"
        num="01"
        title="The problem"
        lead="Classic Diffie-Hellman needs both people online for a round trip. Messaging can’t wait for that: Alice must be able to send an encrypted first message to Bob while his phone is off, through a server that is not allowed to read it and might even try to impersonate him."
      >
        <ProblemVisual />
        <p className={s.body}>
          X3DH (Extended Triple Diffie-Hellman, from Signal) solves it by having Bob publish key material{' '}
          <em>in advance</em>. Alice fetches it whenever she likes, finishes the whole handshake on her own and sends
          immediately. Bob completes his half when he reconnects and lands on exactly the same secret. X3DH is only the
          key agreement; the conversation itself runs on the Double Ratchet.
        </p>
      </Section>

      <Section
        id="x3dh-keys"
        num="02"
        title="The keys"
        lead="Four kinds of key pairs, each with its own colour. The colours stay the same for the rest of the page."
      >
        <KeyCards />
      </Section>

      <Section
        id="x3dh-sim"
        num="03"
        title="Step through the handshake"
        lead="Twelve steps from Bob’s upload to the Double Ratchet. Use Next, click any step, or press Autoplay. Flip “Bundle has no OPK” to see the three-DH fallback."
      >
        <Simulator />
      </Section>

      <Section
        id="x3dh-toy"
        num="04"
        title="Toy Diffie-Hellman playground"
        lead="The same trick with numbers small enough to check by hand. Real X3DH uses elliptic-curve points (X25519), but the shape is identical: publish g^secret, keep the secret, raise the other side’s public value to your secret."
      >
        <Playground />
      </Section>

      <Section id="x3dh-props" num="05" title="What each DH buys you">
        <Properties />
      </Section>

      <Section
        id="x3dh-gotchas"
        num="06"
        title="Production gotchas"
        lead="The math is the easy part. These are the places real deployments go wrong."
      >
        <Gotchas />
      </Section>

      <Section id="x3dh-next" num="07" title="What comes next">
        <Handoff />
      </Section>

      <p className={s.source}>
        <SafetyCertificateOutlined aria-hidden="true" /> Based on Signal’s X3DH specification (Marlinspike &amp; Perrin).
        Toy values on this page are for intuition only.
      </p>
    </div>
  )
}
