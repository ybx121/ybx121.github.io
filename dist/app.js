(() => {
  'use strict';

  const content = window.HOMEPAGE;
  const labels = {
    zh: {
      about: '关于',
      news: '近期动态',
      research: '科研',
      projects: '精选项目',
      life: '生活',
      football: '足球',
      travel: '旅行',
      navEducation: '教育',
      navNews: '动态',
      navProjects: '项目',
      interests: '研究兴趣',
      resume: '简历',
      example: '示例资料 · 待替换',
      copyEmail: '复制邮箱',
      copied: '已复制',
      copyFailed: '暂时无法复制，请手动选择文本。',
      close: '关闭',
      top: '返回顶部',
      skip: '跳转到主要内容',
      nav: '主要导航',
      profile: '个人资料',
      missing: '链接尚待添加',
      missingHint: '相关材料将在补充后开放。',
      project: '项目',
      citation: '引用',
      copyCitation: '复制 BibTeX',
      showAll: '查看全部动态',
      showLess: '收起历史动态',
      emptyNews: '新的动态将在这里更新。',
      emptyPapers: '论文成果将在正式发表后更新。',
      emptyProjects: '项目将在整理完成后更新。',
      image: '图片',
      projectExample: '示例项目',
      cvExample: '简历示例 · 待替换为个人经历',
      education: '教育经历',
      emptyEducation: '教育经历将在补充后更新。',
      publications: '发表论文',
      cvProjects: '项目经历',
      contact: '联系方式',
      print: '打印 / 保存 PDF',
      updated: '更新于',
      motto: '保持好奇，持续探索。',
      footerExample: '头像、论文和项目均为示例内容',
      siteTitle: '科研与项目'
    },
    en: {
      about: 'About',
      news: 'Recent news',
      research: 'Research',
      projects: 'Selected projects',
      life: 'Life',
      football: 'Football',
      travel: 'Travel',
      navEducation: 'Education',
      navNews: 'News',
      navProjects: 'Projects',
      interests: 'Research interests',
      resume: 'CV',
      example: 'Example profile · To be personalized',
      copyEmail: 'Copy email',
      copied: 'Copied',
      copyFailed: 'Copy is unavailable. Please select the text manually.',
      close: 'Close',
      top: 'Back to top',
      skip: 'Skip to main content',
      nav: 'Main navigation',
      profile: 'Profile',
      missing: 'Link to be added',
      missingHint: 'This resource will be available when added.',
      project: 'Project',
      citation: 'Cite',
      copyCitation: 'Copy BibTeX',
      showAll: 'View all updates',
      showLess: 'Show fewer updates',
      emptyNews: 'New updates will appear here.',
      emptyPapers: 'Publications will be added after publication.',
      emptyProjects: 'Projects will be added here.',
      image: 'Image',
      projectExample: 'Example project',
      cvExample: 'Example CV · Replace with your own experience',
      education: 'Education',
      emptyEducation: 'Education details will be added here.',
      publications: 'Publications',
      cvProjects: 'Projects',
      contact: 'Contact',
      print: 'Print / Save as PDF',
      updated: 'Updated',
      motto: 'Stay curious. Keep exploring.',
      footerExample: 'Illustrative avatar, publications, and projects',
      siteTitle: 'Research & Projects'
    }
  };

  const profileElement = document.getElementById('about');
  const mainElement = document.getElementById('main');
  const dialog = document.getElementById('detail-dialog');
  const dialogContent = document.getElementById('dialog-content');
  const toastElement = document.getElementById('toast');
  const topButton = document.getElementById('back-to-top');
  let language = initialLanguage();
  let expandedNews = false;
  let observer;
  let toastTimer;
  let currentDialog = null;
  const travelState = { view: 'china', selected: { china: '', world: '' } };

  function initialLanguage() {
    const query = new URLSearchParams(window.location.search).get('lang');
    if (query === 'zh' || query === 'en') return query;
    try {
      const stored = localStorage.getItem('blue-homepage-language');
      if (stored === 'zh' || stored === 'en') return stored;
    } catch {
      // The page also works when browser storage is unavailable.
    }
    return 'zh';
  }

  function text(value) {
    if (typeof value === 'string') return value;
    return value?.[language] ?? value?.zh ?? value?.en ?? '';
  }

  function escape(value) {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value ?? '').replace(/[&<>"']/g, (character) => entities[character]);
  }

  function icon(name) {
    return `<svg class="icon" aria-hidden="true"><use href="#icon-${escape(name)}"></use></svg>`;
  }

  function allowedUrl(value) {
    if (!value) return '';
    try {
      const parsed = new URL(value, window.location.href);
      return ['http:', 'https:', 'mailto:', 'file:'].includes(parsed.protocol) ? value : '';
    } catch {
      return '';
    }
  }

  function resourceLink(label, value, className = '') {
    const url = allowedUrl(value);
    if (!url) {
      return `<button type="button" class="text-button ${className}" data-action="missing" data-label="${escape(label)}">${escape(label)}</button>`;
    }
    const external = /^https?:/i.test(url);
    return `<a class="${className}" href="${escape(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escape(label)}</a>`;
  }

  function heading(title, secondary = '') {
    return `<div class="section-heading"><h2>${escape(title)}</h2>${secondary ? `<span class="section-english" lang="en">${escape(secondary)}</span>` : ''}</div>`;
  }

  function renderProfile() {
    const profile = content.profile;
    const ui = labels[language];
    const socialLinks = (profile.socials || [])
      .map(
        (social) => `
      <div class="contact-row">
        ${icon(social.icon || 'arrow')}
        ${resourceLink(text(social.label), social.url)}
      </div>`
      )
      .join('');
    const resume = allowedUrl(profile.cvUrl)
      ? `<a class="resume-button" href="${escape(profile.cvUrl)}" target="_blank" rel="noopener">${escape(ui.resume)} ${icon('arrow')}</a>`
      : `<button class="resume-button" type="button" data-action="resume">${escape(ui.resume)} ${icon('arrow')}</button>`;

    return `
      <div class="portrait-wrap">
        <img class="portrait" src="${escape(profile.portrait)}" alt="${escape(text(profile.portraitAlt))}" width="320" height="320" fetchpriority="high">
      </div>
      <div class="profile-identity">
        <h1>${escape(text(profile.name))}</h1>
        <p class="english-name">${escape(text(profile.secondaryName))}</p>
        <p class="profile-role">${escape(text(profile.role))}</p>
        ${content.exampleMode ? `<p class="example-label">${escape(ui.example)}</p>` : ''}
      </div>
      <p class="profile-intro">${escape(text(profile.intro))}</p>
      <div class="profile-interests">
        <h2>${escape(ui.interests)}</h2>
        <div class="interest-list">${(profile.interests || []).map((interest) => `<span>${escape(text(interest))}</span>`).join('')}</div>
      </div>
      <div class="profile-contacts">
        <div class="contact-row">
          ${icon('mail')}
          <a href="mailto:${escape(profile.email)}">${escape(profile.email)}</a>
          <button type="button" class="icon-button copy-email" data-action="copy-email" aria-label="${escape(ui.copyEmail)}" title="${escape(ui.copyEmail)}">${icon('copy')}</button>
        </div>
        ${socialLinks}
      </div>
      <div class="profile-actions">${resume}</div>`;
  }

  function renderNews() {
    const ui = labels[language];
    const news = [...(content.news || [])].sort((first, second) =>
      second.date.localeCompare(first.date)
    );
    const items = news
      .map(
        (item, index) => `
      <li${index >= 6 ? ` class="extra-news"${expandedNews ? '' : ' hidden'}` : ''}>
        <time datetime="${escape(item.datetime || item.date.replaceAll('.', '-'))}">${escape(item.date)}</time>
        <span>${item.target ? `<a href="#${escape(item.target)}">${escape(text(item.text))}</a>` : escape(text(item.text))}</span>
      </li>`
      )
      .join('');
    return `
      <section class="content-section" id="news">
        ${heading(ui.news)}
        ${news.length ? `<ul class="news-list">${items}</ul>` : `<p class="empty-copy">${escape(ui.emptyNews)}</p>`}
        ${news.length > 6 ? `<button class="text-button news-more" type="button" data-action="news" aria-expanded="${expandedNews}">${escape(expandedNews ? ui.showLess : ui.showAll)}</button>` : ''}
      </section>`;
  }

  function renderPublication(paper) {
    const authors = (paper.authors || [])
      .map((author) => {
        if (typeof author === 'string') return escape(author);
        return author.isMe ? `<strong>${escape(author.name)}</strong>` : escape(author.name);
      })
      .join(', ');
    const primaryUrl = (paper.links || []).find((link) => link.url)?.url;
    return `
      <article class="work-entry publication-entry">
        <figure class="work-figure">
          <button type="button" class="work-figure-button" data-action="paper-image" data-id="${escape(paper.id)}" aria-label="${escape(text(paper.imageAlt))}">
            <img src="${escape(paper.image)}" alt="${escape(text(paper.imageAlt))}" width="600" height="267" loading="lazy">
          </button>
        </figure>
        <div class="work-copy">
          <h3 class="work-title">${primaryUrl ? resourceLink(text(paper.title), primaryUrl) : escape(text(paper.title))}</h3>
          <p class="work-authors">${authors}</p>
          <p class="work-meta">${escape(text(paper.venue))}</p>
          <p class="work-description">${escape(text(paper.summary))}</p>
          <div class="work-links">
            ${(paper.links || []).map((link) => resourceLink(text(link.label), link.url)).join('')}
            ${paper.bibtex ? `<button class="text-button" type="button" data-action="citation" data-id="${escape(paper.id)}" aria-label="${escape(labels[language].citation + ' · ' + text(paper.title))}">BibTeX</button>` : ''}
          </div>
        </div>
      </article>`;
  }

  function renderResearch() {
    const ui = labels[language];
    const papers = content.publications || [];
    return `
      <section class="content-section" id="research">
        ${heading(ui.research, language === 'zh' ? 'Publications' : '')}
        ${papers.length ? `<div class="publication-list">${papers.map(renderPublication).join('')}</div>` : `<p class="empty-copy">${escape(ui.emptyPapers)}</p>`}
      </section>`;
  }

  function renderProject(project) {
    const ui = labels[language];
    return `
      <article class="work-entry project-entry">
        <figure class="work-figure">
          <button class="work-figure-button" type="button" data-action="project" data-id="${escape(project.id)}" aria-label="${escape(ui.project + ' · ' + text(project.title))}">
            <img src="${escape(project.image)}" alt="${escape(text(project.imageAlt))}" width="600" height="267" loading="lazy">
          </button>
        </figure>
        <div class="work-copy">
          <h3 class="work-title"><button class="text-button" type="button" data-action="project" data-id="${escape(project.id)}">${escape(text(project.title))}</button></h3>
          <p class="work-description">${escape(text(project.summary))}</p>
          <div class="work-links">
            <button class="text-button" type="button" data-action="project" data-id="${escape(project.id)}">${escape(ui.project)}${icon('arrow')}</button>
            ${(project.links || []).map((link) => resourceLink(text(link.label), link.url)).join('')}
          </div>
        </div>
      </article>`;
  }

  function renderProjects() {
    const ui = labels[language];
    const projects = content.projects || [];
    return `
      <section class="content-section" id="projects">
        ${heading(ui.projects)}
        ${projects.length ? `<div class="project-list">${projects.map(renderProject).join('')}</div>` : `<p class="empty-copy">${escape(ui.emptyProjects)}</p>`}
      </section>`;
  }

  function renderEducation() {
    const ui = labels[language];
    const education = content.profile.education || [];
    return `
      <section class="content-section" id="education">
        ${heading(ui.education)}
        ${
          education.length
            ? `<div class="education-list">${education
                .map(
                  (entry) => `
          <article class="education-entry">
            <p class="education-period">${escape(text(entry.period))}</p>
            <div class="education-content">
              <div class="education-institution">
                ${entry.logo ? `<img class="education-logo" src="${escape(entry.logo)}" alt="${escape(text(entry.school))}" width="48" height="48" loading="lazy">` : icon('academic')}
                <h3>${entry.url ? resourceLink(text(entry.school), entry.url) : escape(text(entry.school))}</h3>
              </div>
              <p class="education-degree">${escape(text(entry.degree))}</p>
              ${(entry.details || []).map((detail) => `<p class="education-detail">${escape(text(detail))}</p>`).join('')}
            </div>
          </article>`
                )
                .join('')}</div>`
            : `<p class="empty-copy">${escape(ui.emptyEducation)}</p>`
        }
      </section>`;
  }

  function renderLife() {
    const ui = labels[language];
    const football = content.life?.football || {};
    return `
      <section class="content-section" id="life">
        <span class="anchor-alias" id="more" aria-hidden="true"></span>
        ${heading(ui.life)}
        <div class="life-interest football-interest">
          <h3 class="interest-heading">${escape(ui.football)}</h3>
          <div class="football-layout">
            ${football.photo ? `<button class="life-photo" type="button" data-action="football-photo" aria-label="${escape(text(football.photoAlt))}"><img src="${escape(football.photo)}" alt="${escape(text(football.photoAlt))}" width="600" height="290" loading="lazy"></button>` : ''}
            <p>${escape(text(football.description))}</p>
          </div>
        </div>
        <div class="life-interest travel-interest">
          <h3 class="interest-heading">${escape(ui.travel)}</h3>
          <div id="travel-map"></div>
        </div>
      </section>`;
  }

  function render() {
    const ui = labels[language];
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = text(content.profile.name) + ' · ' + ui.siteTitle;
    document.querySelector('meta[name="description"]').content = text(content.profile.intro);
    document.querySelector('meta[name="robots"]').content = content.exampleMode
      ? 'noindex, nofollow'
      : 'index, follow';
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = text(content.profile.intro);
    document.getElementById('skip-link').textContent = ui.skip;
    profileElement.setAttribute('aria-label', ui.profile);
    profileElement.innerHTML = renderProfile();
    const nav = document.getElementById('main-nav');
    nav.setAttribute('aria-label', ui.nav);
    nav.innerHTML = [
      ['about', ui.about],
      ['news', ui.navNews],
      ['research', ui.research],
      ['projects', ui.navProjects],
      ['education', ui.navEducation],
      ['life', ui.life]
    ]
      .map(([id, label]) => `<a href="#${id}" data-section="${id}">${escape(label)}</a>`)
      .join('');
    mainElement.innerHTML =
      renderNews() + renderResearch() + renderProjects() + renderEducation() + renderLife();
    window.HomepageTravel.mount(document.getElementById('travel-map'), {
      language,
      visits: content.life?.travel || {},
      state: travelState
    });
    mainElement.setAttribute('aria-busy', 'false');
    document.getElementById('footer').innerHTML = `
      <p>${escape(ui.motto)}</p>
      <p class="footer-note">${escape(ui.updated + ' ' + text(content.updated))}${content.exampleMode ? ' · ' + escape(ui.footerExample) : ''}</p>`;
    document.querySelectorAll('[data-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    document.getElementById('dialog-close').setAttribute('aria-label', ui.close);
    topButton.setAttribute('aria-label', ui.top);
    if (dialog.open && currentDialog) renderDialog();
    observeSections();
  }

  function observeSections() {
    observer?.disconnect();
    if (!('IntersectionObserver' in window)) return;
    const sections = [...document.querySelectorAll('.main-content > section')];
    observer = new IntersectionObserver(
      () => {
        const active =
          [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 200) ||
          sections[0];
        document.querySelectorAll('[data-section]').forEach((link) => {
          if (link.dataset.section === active?.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      },
      { rootMargin: '-80px 0px -58% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  function setLanguage(next) {
    if (!labels[next] || next === language) return;
    language = next;
    try {
      localStorage.setItem('blue-homepage-language', language);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url);
    } catch {
      // Language changes still work in file previews and private browsing.
    }
    render();
  }

  function toast(message) {
    clearTimeout(toastTimer);
    toastElement.textContent = message;
    toastElement.hidden = false;
    toastTimer = setTimeout(() => {
      toastElement.hidden = true;
    }, 3200);
  }

  async function copy(value) {
    try {
      await navigator.clipboard.writeText(value);
      toast(labels[language].copied);
    } catch {
      toast(labels[language].copyFailed);
    }
  }

  function projectDetail(project) {
    return `
      <p class="dialog-kicker">${escape(text(project.type))} · ${escape(text(project.period))}</p>
      <h2 id="dialog-title">${escape(text(project.title))}</h2>
      <p class="dialog-lead">${escape(text(project.summary))}</p>
      <img class="dialog-hero" src="${escape(project.image)}" alt="${escape(text(project.imageAlt))}">
      <div class="tag-list">${(project.tags || []).map((tag) => `<span>${escape(tag)}</span>`).join('')}</div>
      ${(project.sections || [])
        .map(
          (section) => `
        <section class="dialog-section">
          <h3>${escape(text(section.heading))}</h3>
          ${(section.paragraphs || []).map((paragraph) => `<p>${escape(text(paragraph))}</p>`).join('')}
          ${section.items?.length ? `<ul class="detail-list">${section.items.map((item) => `<li>${escape(text(item))}</li>`).join('')}</ul>` : ''}
        </section>`
        )
        .join('')}
      <div class="dialog-actions">${(project.links || []).map((link) => resourceLink(text(link.label), link.url)).join('')}</div>`;
  }

  function cvDetail() {
    const ui = labels[language];
    const profile = content.profile;
    return `
      <div class="cv-head">
        ${content.exampleMode ? `<p class="dialog-kicker">${escape(ui.cvExample)}</p>` : ''}
        <h2 id="dialog-title">${escape(text(profile.name))}</h2>
        <p class="cv-subtitle">${escape(text(profile.role))}</p>
        <p class="cv-subtitle">${escape(profile.email)}</p>
      </div>
      <section class="cv-section"><h3>${escape(ui.education)}</h3>
        ${(profile.education || []).map((item) => `<div class="cv-entry"><h4>${escape(text(item.school))}</h4><p>${escape(text(item.degree))}</p><p>${escape(text(item.period))}</p></div>`).join('')}
      </section>
      <section class="cv-section"><h3>${escape(ui.interests)}</h3><p>${(profile.interests || []).map((interest) => escape(text(interest))).join(' · ')}</p></section>
      ${content.publications?.length ? `<section class="cv-section"><h3>${escape(ui.publications)}</h3>${content.publications.map((paper) => `<div class="cv-entry"><h4>${escape(text(paper.title))}</h4><p>${escape(text(paper.venue))}</p><p>${escape(text(paper.summary))}</p></div>`).join('')}</section>` : ''}
      ${content.projects?.length ? `<section class="cv-section"><h3>${escape(ui.cvProjects)}</h3>${content.projects.map((project) => `<div class="cv-entry"><h4>${escape(text(project.title))}</h4><p>${escape(text(project.summary))}</p></div>`).join('')}</section>` : ''}
      <div class="dialog-actions"><button class="print-button" type="button" data-action="print">${icon('print')}${escape(ui.print)}</button></div>`;
  }

  function renderDialog() {
    const { type, item } = currentDialog;
    const ui = labels[language];
    dialog.classList.toggle('image-dialog', type === 'image');
    if (type === 'project') dialogContent.innerHTML = projectDetail(item);
    if (type === 'resume') dialogContent.innerHTML = cvDetail();
    if (type === 'citation') {
      dialogContent.innerHTML = `
        <p class="dialog-kicker">BibTeX</p>
        <h2 id="dialog-title">${escape(text(item.title))}</h2>
        <pre class="citation-text">${escape(item.bibtex)}</pre>
        <div class="dialog-actions"><button class="print-button" type="button" data-action="copy-citation" data-id="${escape(item.id)}">${icon('copy')}${escape(ui.copyCitation)}</button></div>`;
    }
    if (type === 'image') {
      dialogContent.innerHTML = `
        <h2 id="dialog-title">${escape(text(item.title))}</h2>
        <img class="full-image" src="${escape(item.image)}" alt="${escape(text(item.alt))}">
        <p class="image-caption">${escape(text(item.caption))}</p>`;
    }
  }

  function openDialog(type, item) {
    currentDialog = { type, item };
    renderDialog();
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.classList.add('dialog-open');
  }

  document.addEventListener('click', (event) => {
    const aboutLink = event.target.closest('a[href="#about"]');
    if (aboutLink) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
      return;
    }
    const languageButton = event.target.closest('[data-language]');
    if (languageButton) {
      setLanguage(languageButton.dataset.language);
      return;
    }
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const { action, id } = button.dataset;
    const ui = labels[language];
    if (action === 'missing')
      toast(button.dataset.label + ' · ' + ui.missing + ' · ' + ui.missingHint);
    if (action === 'copy-email') copy(content.profile.email);
    if (action === 'resume') openDialog('resume');
    if (action === 'print') window.print();
    if (action === 'project') {
      const project = content.projects.find((item) => item.id === id);
      if (project) openDialog('project', project);
    }
    if (action === 'citation' || action === 'copy-citation' || action === 'paper-image') {
      const paper = content.publications.find((item) => item.id === id);
      if (!paper) return;
      if (action === 'citation') openDialog('citation', paper);
      if (action === 'copy-citation') copy(paper.bibtex);
      if (action === 'paper-image')
        openDialog('image', {
          title: paper.title,
          image: paper.image,
          alt: paper.imageAlt,
          caption: paper.summary
        });
    }
    if (action === 'football-photo') {
      const football = content.life.football;
      openDialog('image', {
        title: ui.football,
        image: football.photo,
        alt: football.photoAlt,
        caption: football.caption
      });
    }
    if (action === 'news') {
      expandedNews = !expandedNews;
      document.querySelectorAll('.extra-news').forEach((item) => {
        item.hidden = !expandedNews;
      });
      button.setAttribute('aria-expanded', String(expandedNews));
      button.textContent = expandedNews ? ui.showLess : ui.showAll;
    }
  });

  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    currentDialog = null;
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  });
  topButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  });
  window.addEventListener(
    'scroll',
    () => {
      topButton.hidden = window.scrollY < 650;
    },
    { passive: true }
  );

  render();
  const initialSection = window.location.hash.slice(1);
  if (
    ['about', 'news', 'research', 'projects', 'education', 'life', 'more'].includes(initialSection)
  ) {
    requestAnimationFrame(() => document.getElementById(initialSection)?.scrollIntoView());
  }
})();
