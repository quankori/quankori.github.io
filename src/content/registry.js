// The single source of truth for the left menu and the routes.
//
// To add a page:
//   1. Create a React component in src/content/<category>/<Name>.jsx
//      (default export, plus an optional <Name>.module.css next to it).
//   2. Add an entry to that category's `pages` below.
// Each page is lazy-loaded, so every page can have its own design and
// dependencies without slowing down the rest of the site.
//
// Page fields:
//   slug         URL segment: /<category>/<slug>
//   title        menu label and browser tab title
//   description  one line shown under the title in the page header
//   load         () => import('./...')  the page component
//   group        optional: menu sub-heading the page is listed under
//   props        optional props passed to the component
//   wide         optional: let the page use the full content width
import trips from '../data/trips.json'

const english = (group, pages) => pages.map((page) => ({ ...page, group }))

export const CATEGORIES = [
  {
    key: 'english',
    label: 'English',
    icon: 'translation',
    pages: [
      ...english('Basics', [
        {
          slug: 'sentence-structure',
          title: 'Sentence Structure',
          description: 'Cấu trúc câu: các khối S, V, O, C, A và 5 mẫu câu cơ bản, câu đơn, ghép, phức.',
          load: () => import('./english/SentenceStructure.jsx'),
        },
        {
          slug: 'nouns',
          title: 'Nouns',
          description: 'Danh từ đếm được và không đếm được, số ít và số nhiều, lượng từ đi kèm.',
          load: () => import('./english/Nouns.jsx'),
        },
        {
          slug: 'articles',
          title: 'Articles',
          description: 'A / An / The / không mạo từ: chọn đúng nhờ một sơ đồ quyết định.',
          load: () => import('./english/Articles.jsx'),
        },
        {
          slug: 'pronouns',
          title: 'Pronouns',
          description: 'Đại từ nhân xưng, tân ngữ, sở hữu, phản thân, chỉ định và bất định.',
          load: () => import('./english/Pronouns.jsx'),
        },
        {
          slug: 'subject-verb-agreement',
          title: 'Subject–Verb Agreement',
          description: 'Hòa hợp chủ ngữ và động từ, kể cả những chủ ngữ “bẫy”.',
          load: () => import('./english/SubjectVerbAgreement.jsx'),
        },
      ]),
      ...english('Word classes', [
        {
          slug: 'adjectives-adverbs',
          title: 'Adjectives & Adverbs',
          description: 'Tính từ và trạng từ: vị trí, trật tự tính từ, cách thêm -ly.',
          load: () => import('./english/AdjectivesAdverbs.jsx'),
        },
        {
          slug: 'comparisons',
          title: 'Comparatives & Superlatives',
          description: 'So sánh hơn, so sánh nhất, so sánh bằng và các dạng bất quy tắc.',
          load: () => import('./english/Comparisons.jsx'),
        },
        {
          slug: 'in-on-at',
          title: 'Prepositions: In · On · At',
          description: 'Giới từ chỉ thời gian và nơi chốn: từ rộng đến hẹp, như một cái phễu.',
          load: () => import('./english/Prepositions.jsx'),
        },
        {
          slug: 'conjunctions',
          title: 'Conjunctions',
          description: 'Liên từ kết hợp, phụ thuộc, tương quan và cách nối câu đúng dấu câu.',
          load: () => import('./english/Conjunctions.jsx'),
        },
      ]),
      ...english('Verbs', [
        {
          slug: 'tenses',
          title: '12 Tenses',
          description: '12 thì trong tiếng Anh trên một trục thời gian: công thức, cách dùng, dấu hiệu nhận biết và bài tập nhanh.',
          load: () => import('./english/Tenses.jsx'),
          wide: true,
        },
        {
          slug: 'irregular-verbs',
          title: 'Irregular Verbs',
          description: 'Động từ bất quy tắc dạng flashcard, nhóm theo quy luật biến đổi để dễ nhớ.',
          load: () => import('./english/IrregularVerbs.jsx'),
          wide: true,
        },
        {
          slug: 'modal-verbs',
          title: 'Modal Verbs',
          description: 'Động từ khuyết thiếu: khả năng, xin phép, lời khuyên, bắt buộc và suy đoán.',
          load: () => import('./english/ModalVerbs.jsx'),
        },
        {
          slug: 'passive-voice',
          title: 'Passive Voice',
          description: 'Câu bị động ở mọi thì, bị động hai tân ngữ, have something done.',
          load: () => import('./english/PassiveVoice.jsx'),
        },
        {
          slug: 'gerunds-infinitives',
          title: 'V-ing & To-V',
          description: 'Gerunds & infinitives: động từ nào đi với V-ing, to-V, hay cả hai mà đổi nghĩa.',
          load: () => import('./english/GerundsInfinitives.jsx'),
        },
        {
          slug: 'conditionals',
          title: 'Conditionals',
          description: 'Câu điều kiện loại 0, 1, 2, 3 và hỗn hợp, xếp theo mức độ “có thật” của tình huống.',
          load: () => import('./english/Conditionals.jsx'),
        },
      ]),
      ...english('Clauses', [
        {
          slug: 'relative-clauses',
          title: 'Relative Clauses',
          description: 'Mệnh đề quan hệ: who, which, that, whose, where… và cách rút gọn.',
          load: () => import('./english/RelativeClauses.jsx'),
        },
        {
          slug: 'noun-clauses',
          title: 'Noun Clauses',
          description: 'Mệnh đề danh từ: that, whether/if, wh- và trật tự từ trong câu hỏi gián tiếp.',
          load: () => import('./english/NounClauses.jsx'),
        },
        {
          slug: 'participle-clauses',
          title: 'Participle Clauses',
          description: 'Mệnh đề phân từ: V-ing, V3, having V3 và lỗi “dangling participle”.',
          load: () => import('./english/ParticipleClauses.jsx'),
        },
        {
          slug: 'noun-phrases',
          title: 'Complex Noun Phrases',
          description: 'Cụm danh từ phức: xây dần từng lớp quanh danh từ chính.',
          load: () => import('./english/NounPhrases.jsx'),
        },
      ]),
      ...english('Style', [
        {
          slug: 'inversion',
          title: 'Inversion',
          description: 'Đảo ngữ: Never, Hardly, Not only, Only when, So/Such và đảo ngữ câu điều kiện.',
          load: () => import('./english/Inversion.jsx'),
        },
        {
          slug: 'emphasis',
          title: 'Emphasis',
          description: 'Cấu trúc nhấn mạnh: câu chẻ It is… that, What… is, do/does/did.',
          load: () => import('./english/Emphasis.jsx'),
        },
        {
          slug: 'parallel-structure',
          title: 'Parallel Structure',
          description: 'Cấu trúc song song: các thành phần cùng vai trò phải cùng dạng.',
          load: () => import('./english/ParallelStructure.jsx'),
        },
        {
          slug: 'punctuation',
          title: 'Punctuation',
          description: 'Dấu câu: dấu phẩy, chấm phẩy, hai chấm, gạch ngang, nháy đơn.',
          load: () => import('./english/Punctuation.jsx'),
        },
      ]),
    ],
  },
  {
    key: 'travel',
    label: 'Travel',
    icon: 'compass',
    pages: [
      ...trips.map((trip) => {
        const photos = trip.visits.reduce((n, v) => n + v.photos.length, 0)
        return {
          slug: trip.id,
          title: trip.name,
          description: `${trip.country} · ${trip.visits.map((v) => v.date).join(', ')} · ${photos} photos`,
          load: () => import('./travel/Trip.jsx'),
          props: { id: trip.id },
          wide: true,
        }
      }),
      {
        slug: 'random',
        title: 'Random',
        description: 'Random frames from around the city.',
        load: () => import('./travel/Random.jsx'),
        wide: true,
      },
    ],
  },
  {
    key: 'technology',
    label: 'Technology',
    icon: 'code',
    pages: [
      {
        slug: 'x3dh',
        title: 'X3DH Key Agreement',
        description: 'How two devices that have never met agree on a secret, even when one of them is offline.',
        load: () => import('./technology/X3DH.jsx'),
        wide: true,
      },
      {
        slug: 'mls',
        title: 'MLS Group Chat',
        description: 'Messaging Layer Security: how a ratchet tree keeps group encryption cheap as the group grows.',
        load: () => import('./technology/MLS.jsx'),
        wide: true,
      },
    ],
  },
]

export const pagePath = (category, page) => `/${category.key}/${page.slug}`

export function findPage(categoryKey, slug) {
  const category = CATEGORIES.find((c) => c.key === categoryKey)
  const page = category?.pages.find((p) => p.slug === slug)
  return page ? { category, page } : null
}
