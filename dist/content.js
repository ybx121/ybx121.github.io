/* Edit this file to replace the example identity, publications and projects.
 * Bilingual text is stored as { zh: '中文', en: 'English' }.
 * URLs may be relative (assets/cv.pdf) or absolute HTTPS URLs.
 */
window.HOMEPAGE = {
  exampleMode: true,
  updated: { zh: '2026 年 11 月', en: 'November 2026' },
  profile: {
    name: { zh: '你的姓名', en: 'Your Name' },
    secondaryName: { zh: 'YOUR NAME', en: '你的姓名' },
    role: { zh: '学校名称 · 专业名称', en: 'University · Your Major' },
    portrait: 'assets/avatar.svg',
    portraitAlt: { zh: '个人照片占位图', en: 'Profile portrait placeholder' },
    intro: {
      zh: '关注研究与实践，记录项目与日常中的好奇。',
      en: 'Exploring ideas through research and practice. Collecting projects, questions, and little discoveries along the way.'
    },
    interests: [
      { zh: '方向 A', en: 'Research area A' },
      { zh: '方向 B', en: 'Research area B' }
    ],
    email: 'hello@example.com',
    socials: [
      { label: { zh: 'GitHub', en: 'GitHub' }, icon: 'github', url: '' },
      { label: { zh: '学术账号', en: 'Scholar' }, icon: 'academic', url: '' }
    ],
    cvUrl: '',
    education: [
      {
        school: { zh: '学校名称', en: 'University Name' },
        degree: { zh: '专业名称 · 学位阶段', en: 'Your Major · Degree' },
        period: { zh: '入学年份 — 预计毕业年份', en: 'Start year — Expected graduation' },
        logo: 'assets/university.svg',
        url: '',
        details: []
      }
    ]
  },
  news: [
    {
      date: '2026.11',
      datetime: '2026-11',
      text: {
        zh: '示例动态 · 建立个人主页，记录研究与项目。',
        en: 'Example update · A new home for research and projects.'
      },
      target: 'about'
    },
    {
      date: '2026.10',
      datetime: '2026-10',
      text: {
        zh: '示例动态 · 分享项目与学习记录。',
        en: 'Example update · Sharing projects and learning notes.'
      },
      target: 'projects'
    },
    {
      date: '2026.09',
      datetime: '2026-09',
      text: {
        zh: '示例动态 · 记录生活中的片段。',
        en: 'Example update · Collecting moments from everyday life.'
      },
      target: 'life'
    }
  ],
  publications: [
    {
      id: 'paper-a',
      title: { zh: '示例论文标题', en: 'Example Publication Title' },
      authors: [
        { name: 'Your Name', isMe: true },
        { name: 'Collaborators', isMe: false }
      ],
      venue: 'Conference / Journal · Year',
      image: 'assets/research-a.svg',
      imageAlt: { zh: '示例论文方法框架图', en: 'Illustrative research architecture' },
      summary: {
        zh: '在这里简要介绍研究问题、核心方法与主要贡献。',
        en: 'A short description of the research question, approach, and contribution.'
      },
      links: [
        { label: 'Paper', url: '' },
        { label: 'PDF', url: '' },
        { label: 'Code', url: '' }
      ],
      bibtex:
        '@article{yourname_example_a,\n  title = {Example Publication Title},\n  author = {Your Name and Collaborators},\n  journal = {Journal Name},\n  year = {YEAR}\n}'
    },
    {
      id: 'paper-b',
      title: { zh: '另一篇示例论文', en: 'Another Example Publication' },
      authors: [
        { name: 'Your Name', isMe: true },
        { name: 'Collaborators', isMe: false }
      ],
      venue: 'Conference / Journal · Year',
      image: 'assets/research-b.svg',
      imageAlt: { zh: '示例论文流程图', en: 'Illustrative research pipeline' },
      summary: {
        zh: '用两三句话概括这篇论文的主要工作和结果。',
        en: 'An overview of the main ideas and findings in this example paper.'
      },
      links: [
        { label: 'Paper', url: '' },
        { label: 'PDF', url: '' },
        { label: 'Code', url: '' }
      ],
      bibtex:
        '@article{yourname_example_b,\n  title = {Another Example Publication},\n  author = {Your Name and Collaborators},\n  journal = {Journal Name},\n  year = {YEAR}\n}'
    }
  ],
  projects: [
    {
      id: 'project-a',
      title: { zh: '项目示例 A', en: 'Example Project A' },
      summary: {
        zh: '围绕具体问题，完成设计、实现与验证。',
        en: 'From a concrete question to a designed, built, and evaluated prototype.'
      },
      image: 'assets/project-a.svg',
      imageAlt: { zh: '蓝色层叠山峦项目封面', en: 'A layered blue landscape project cover' },
      type: { zh: '个人项目 · 示例内容', en: 'Personal project · Example content' },
      period: { zh: '项目时间待填写', en: 'Project dates to be added' },
      tags: ['Research', 'Design', 'Development'],
      links: [{ label: 'GitHub', url: '' }],
      sections: [
        {
          heading: { zh: '项目概览', en: 'Overview' },
          paragraphs: [
            {
              zh: '这里用于介绍项目的背景、目标和使用场景。替换为你的真实项目后，读者可以在这里进一步了解这项工作。',
              en: 'Introduce the background, goal, and intended use of your project here. Replace this example with the story of your own work.'
            }
          ]
        },
        {
          heading: { zh: '我的工作', en: 'My contribution' },
          items: [
            {
              zh: '说明你负责的问题定义与方案设计。',
              en: 'Describe your role in framing the problem and designing the approach.'
            },
            {
              zh: '介绍实现的关键模块和技术选择。',
              en: 'Explain the key components you implemented and the choices you made.'
            },
            {
              zh: '补充有依据的结果、演示或验证材料。',
              en: 'Include results, a demonstration, or supporting evaluation.'
            }
          ]
        },
        {
          heading: { zh: '复盘与下一步', en: 'Reflection and next steps' },
          paragraphs: [
            {
              zh: '记录项目中的收获、遇到的困难，以及下一步希望改进的地方。',
              en: 'Share what you learned, the challenges you encountered, and what you would explore next.'
            }
          ]
        }
      ]
    },
    {
      id: 'project-b',
      title: { zh: '项目示例 B', en: 'Example Project B' },
      summary: {
        zh: '把学习中的想法，做成可以体验的小工具。',
        en: 'Turning an idea from everyday learning into a useful little tool.'
      },
      image: 'assets/project-b.png',
      imageAlt: {
        zh: '阳光下的笔记本电脑与项目界面示意图',
        en: 'An illustrative laptop workspace in soft daylight'
      },
      type: { zh: '工具开发 · 示例内容', en: 'A small tool · Example content' },
      period: { zh: '项目时间待填写', en: 'Project dates to be added' },
      tags: ['Tools', 'Interaction', 'Open source'],
      links: [{ label: 'GitHub', url: '' }],
      sections: [
        {
          heading: { zh: '项目概览', en: 'Overview' },
          paragraphs: [
            {
              zh: '从学习或生活中的一个具体需求出发，介绍这个工具面向谁、提供什么功能，以及它目前的完成情况。',
              en: 'Start with a real need from your learning or daily life. Explain who the tool is for, what it does, and its current state.'
            }
          ]
        },
        {
          heading: { zh: '核心功能', en: 'Key features' },
          items: [
            { zh: '功能一及其适用场景。', en: 'The first feature and when it is useful.' },
            {
              zh: '功能二及其交互方式。',
              en: 'The second feature and how people interact with it.'
            },
            { zh: '个人承担的实现与验证工作。', en: 'Your implementation and validation work.' }
          ]
        },
        {
          heading: { zh: '实现与思考', en: 'Implementation and reflection' },
          paragraphs: [
            {
              zh: '在这里补充技术选择、关键难点和你的解决过程，并链接到真实的代码或演示。',
              en: 'Discuss technical choices, challenges, and how you approached them, with links to the actual code or demonstration.'
            }
          ]
        }
      ]
    }
  ],
  life: {
    football: {
      description: {
        zh: '踢球、看球，也记录与足球有关的片段。',
        en: 'Playing, watching, and collecting moments from the beautiful game.'
      },
      photo: 'assets/football.svg',
      photoAlt: { zh: '蓝色足球场示意图', en: 'An illustrative blue football pitch' },
      caption: {
        zh: '足球记录将在整理后更新。',
        en: 'Football stories will be added here.'
      }
    },
    travel: {
      // Province names or six-digit administrative codes, for example '浙江省' or '330000'.
      visitedProvinces: [],
      // Country names or three-letter ISO codes, for example '日本' or 'JPN'.
      visitedCountries: []
    }
  }
};
