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
        period: { zh: '入学年份 — 预计毕业年份', en: 'Start year — Expected graduation' }
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
        zh: '示例动态 · 整理新的阅读笔记。',
        en: 'Example update · Collecting new reading notes.'
      },
      target: 'more'
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
  more: {
    intro: {
      zh: '笔记、摄影与生活中的小发现。',
      en: 'Notes, photographs, and small discoveries along the way.'
    },
    photo: 'assets/campus.png',
    photoAlt: {
      zh: '阳光下的校园与树影，示意图片',
      en: 'An illustrative sunlit campus with leafy trees'
    },
    photoCaption: {
      zh: '校园与日常 · AI 生成的示意图片',
      en: 'Campus moments · AI-generated illustrative image'
    },
    writings: [
      {
        id: 'note-a',
        title: { zh: '一次关于学习方法的整理', en: 'A note on how I learn' },
        date: '2026.11',
        intro: {
          zh: '文章示例 · 这里可以分享你的学习过程、理解和思考。',
          en: 'Example note · A place to share your learning process and reflections.'
        },
        paragraphs: [
          {
            zh: '这是一个文章位置示例。你可以把已有的学习笔记、项目复盘或阅读记录整理到这里。',
            en: 'This is a sample article slot. Add a learning note, project reflection, or reading journal of your own here.'
          },
          {
            zh: '一篇笔记可以从具体问题开始，再介绍你的理解过程、遇到的困难和最终收获。为需要进一步阅读的内容附上来源链接，会让记录更容易被使用。',
            en: 'A note can begin with a concrete question, followed by your reasoning, challenges, and what you learned. Add source links when readers may want to explore further.'
          }
        ]
      },
      {
        id: 'note-b',
        title: { zh: '校园里的秋日随记', en: 'Little moments on campus' },
        date: '2026.10',
        intro: {
          zh: '生活记录示例 · 给研究和项目之外的日常留一点空间。',
          en: 'Example journal · A little space for life beyond research and projects.'
        },
        paragraphs: [
          {
            zh: '这里可以放摄影、运动、阅读或日常观察。选择你愿意公开分享的片段，慢慢积累成自己的记录。',
            en: 'Share photographs, running, books, or everyday observations. Choose moments you would like to make public and build a journal over time.'
          }
        ]
      }
    ],
    experiences: []
  }
};
