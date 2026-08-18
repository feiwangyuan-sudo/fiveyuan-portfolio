# fiveyuan Portfolio

清新、克制科技感的单页个人作品集，基于 Next.js、TypeScript 与 Tailwind CSS。

## 启动

```bash
npm install
npm run dev
```

打开 [我的个人网站](https://fiveyuan-portfolio-git-main-feiwangyuan-sudos-projects.vercel.app/) 查看网站。生产构建使用：

```bash
npm run build
```

## 更新内容

所有需要日常修改的内容都集中在 `src/lib/site.ts`：

- GitHub、博客、邮箱、抖音链接
- 首个项目的在线体验与源码链接
- 项目名称、简介和标签

当项目增多时，可以在 `src/lib/site.ts` 中扩展项目列表，并将项目卡片抽取为独立组件或详情页。
