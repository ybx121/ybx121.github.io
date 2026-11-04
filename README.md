# ybx121.github.io · 清蓝个人主页

白底蓝色的中英双语个人主页。桌面端采用左侧个人资料、右侧纵向内容的布局，项目统一左图右文。手机端自动调整为单列。

## 本地查看

在本目录运行以下命令，然后打开终端显示的地址。

```sh
npm run dev
```

无需安装 npm 依赖。也可以直接用浏览器打开 `dist/index.html`。邮箱和引用的复制功能需要 HTTPS 或本地 HTTP 预览环境。

## 替换个人内容

修改 `dist/content.js`。中英文内容分别填写在 `zh` 和 `en` 字段中。

- `profile` 包含姓名、学校专业、简介、邮箱、研究兴趣、社交账号和教育经历。教育经历同时显示在首页和简历中，支持院校图标、学校链接、时间、专业学位和补充说明。
- 将个人照片放入 `dist/assets/`，再修改 `profile.portrait`。
- 有正式 PDF 简历时，将其放入 `dist/assets/`，把 `profile.cvUrl` 设置为 `assets/cv.pdf`。未设置时，简历按钮打开根据配置生成的可打印简历。
- `news` 填写近期动态，页面按日期倒序展示。超过六条时显示展开按钮。
- `publications` 只填写正式发表的论文。提供真实的作者顺序、发表信息和资源链接。
- `projects` 填写项目简介和详情，各项目会自动上下排列。
- `life.football` 填写足球介绍与配图。
- `news`、`publications` 和 `projects` 目前为空数组，页面只显示对应标题，不显示待更新文案。将真实条目加入数组后会自动显示。
- `life.football` 的介绍、图片和图注目前留空，页面只显示“足球”标题。填写任一内容后会自动显示相应部分。
- `examples.news`、`examples.publications`、`examples.projects` 和 `examples.football` 完整保留原先的示例，作为编辑模板。它们不参与页面或简历展示；需要时复制到对应正式字段，再改为真实内容。相关图片和交互功能均保留。
- `life.travel.visitedProvinces` 填写去过的省级地区名称或六位行政区划代码，例如 `['浙江省', '110000']`。
- `life.travel.visitedCountries` 填写去过的国家或地区名称、两位或三位代码，例如 `['日本', 'FRA']`。
- 两份到访名单目前都是空数组，地图中的所有地区均以暗色显示。填入名单后，对应地区会自动亮起。点选地图只查看地区状态。
- 国内和国外地图支持切换、地区选择、名称查看、缩放与放大后的拖动。地图数据保存在本地文件中，可随静态网站一起发布。
- 完成真实资料替换后，将 `exampleMode` 改为 `false`，移除示例标记并允许搜索引擎索引。

资源链接留空时，点击会提示待添加。使用真实的 HTTPS 链接，或站点内文件的相对路径。新增条目时为每项设置唯一的 `id`。

## 发布到 GitHub Pages

线上地址为 <https://ybx121.github.io/>，源码仓库为 <https://github.com/ybx121/ybx121.github.io>。

本机的编辑目录固定为 `E:\个人主页\outputs\personal-homepage`，在这里修改 `dist/content.js`、样式和图片。仓库保留整个源码目录结构，GitHub Pages 只发布 `dist/` 内的静态网站文件。

`.github/workflows/pages.yml` 会在 `main` 分支收到提交后检查 JavaScript 语法并自动发布。仓库 Settings → Pages → Build and deployment → Source 应保持为 **GitHub Actions**，无需将 `dist/` 的文件再手动复制到仓库根目录。

后续更新时，在本目录先运行：

```sh
npm run check
git status --short
git diff
```

确认改动后，只添加本次需要发布的文件。例如仅修改个人资料时：

```sh
git add dist/content.js
git diff --cached
git commit -m "feat(profile): update personal information"
git push github main
```

修改样式、图片或其他文件时，把相应路径添加到 `git add`。提交使用 Conventional Commits；推送成功后，到仓库 Actions 查看 **Publish homepage to GitHub Pages** 工作流，成功后刷新网站即可。也可以在该工作流页面选择 **Run workflow** 手动重发。

`github` 远程使用 `git@github.com:ybx121/ybx121.github.io.git`。Git 上传使用本机已有 SSH 配置；此仓库指定 Windows OpenSSH。原有 `.openai/hosting.json` 保留之前的 Sites 项目信息，GitHub Pages 的发布流程不依赖它。

## 当前示例内容

姓名、学校、专业、GitHub 和教育经历已填写为杨秉熹的资料。头像、简介、研究兴趣、邮箱和学术账号仍待补充，因此保留部分资料待完善的说明。原先的动态、论文、项目和足球示例完整保存在 `dist/content.js` 的 `examples` 模板区，默认不显示。头像、足球场和框架图是本地 SVG，电脑配图是 AI 生成的示意素材。

## 文件

- `dist/index.html` 为网站入口。
- `dist/styles.css` 控制配色、字体、间距和响应式排版。
- `dist/content.js` 集中存放可替换内容。
- `dist/app.js` 实现语言切换、弹窗、引用复制、教育经历与导航。
- `dist/travel.js` 实现旅行地图的到访状态与交互。
- `dist/assets/maps.js` 保存中国与世界地图的本地边界路径及地区名称。
- `dist/assets/` 存放全部本地图片。
- `preview.mjs` 是本地静态预览服务器。
- [配图生成提示词](ASSET_PROMPTS.md) 保存了示意图片的生成说明。
- [地图数据来源](MAP_SOURCES.md) 记录了边界数据来源与处理方式。
