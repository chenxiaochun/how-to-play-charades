# 推广与 SEO 进度清单

> **给 AI / 协作者：** 开始任何推广、SEO、外链相关任务前，先读本文件。完成或确认某项后，立即更新对应行的状态与日期。不要重复询问已标记为 ✅ 的事项，除非用户明确要求复查。

**最后更新：** 2026-06-23（Quora 首条回答）  
**主域名：** https://how-to-play-charades.com  
**Vercel 项目：** charades（chenxiaochuns-projects）

---

## 数据基线（用于对比，勿删）

| 指标 | 数值 | 记录日期 |
|------|------|----------|
| GSC 近 3 个月展示 | ~1122 | 2026-06 |
| GSC 点击 | 1 | 2026-06 |
| GSC 平均排名 | ~33 | 2026-06 |
| 突破口词 `can you use props in charades` | 排名 ~10.8 | 2026-06 |
| 大词 `how to play charades` 等 | 排名 39–65 | 2026-06 |
| Sitemap URL 数 | ~42–46 | 2026-06 |

**下次复查建议：** 2026-06-25 起（2 周后看 props 词与收录）

---

## ✅ 已完成 — 代码与技术

| 任务 | 完成日 | 备注 |
|------|--------|------|
| 静态站迁移 Next.js 16 + React 19 + TS | 2026-03 | commit `a92396b` |
| 动态 sitemap / robots.txt | 2026-03 | |
| Canonical + hreflang + x-default | 2026-03 | |
| 旧 URL 301 重定向 | 2026-03 | `next.config.ts` |
| OG 图、favicon、apple-icon | 2026-03 | |
| JSON-LD（首页 HowTo、博客 Article 等） | 2026-03~06 | |
| 隐私政策 + Cookie 同意横幅 | 2026-03 | |
| Cookie 同意后再加载 GA / AdSense | 2026-06 | commit `f388ef6` |
| AdSense 验证 meta + ads.txt | 2026-06 | ca-pub-3519124760724427 |
| 首次访问默认英文 `/en` | 2026-06 | `src/proxy.ts` |
| 博客多文章架构 `/blog` + `[slug]` | 2026-06 | 现共 5 篇 |
| About 页（E-E-A-T） | 2026-06 | |
| 专题页 8 个（含 Halloween、Team building） | 2026-06 | |
| Guides hub + 内链 | 2026-06 | |
| 规则页 Props FAQ + FAQPage schema | 2026-06 | commit `ebc7625` |
| `.vercelignore` 排除 `marketing/` | 2026-06 | commit `1b403d4` |
| Bing 验证文件 `public/BingSiteAuth.xml` | 2026-06-11 | commit `5eac80c` |
| Pinterest 素材与发布脚本 | 2026-06 | `marketing/pins/` |
| 外链文案 `marketing/outreach-en.md` | 2026-06 | 含 Reddit / AlternativeTo / Quora |
| www → apex 308 重定向 | 2026-06-11 | Vercel Domains 已配置；curl 验证 308→主域名 |
| 规则页深度内容（手势表、示例回合、计分、8 条 FAQ） | 2026-06-12 | `src/lib/i18n/en.ts`、`zh.ts` + `RulesList.tsx` |
| Halloween 专题页深度内容（62 词、派对脚本、规则对照表） | 2026-06-12 | `src/lib/topics/en.ts`、`zh.ts` + `TopicPage.tsx` |

---

## ✅ 已完成 — 搜索引擎与站长工具

| 任务 | 完成日 | 备注 |
|------|--------|------|
| Google Search Console 添加资源 | 2026-06 | 用户已添加 |
| `GOOGLE_SITE_VERIFICATION` 环境变量 | 2026-06 | 用户已配置 GSC |
| GSC 提交 sitemap | 2026-06 | 在「站点地图」提交 `sitemap.xml`（非网址检查） |
| GSC 请求收录 `/en/rules` | 2026-06-11 | 针对 props 长尾词 |
| GSC 重新请求收录 `/en/rules`（加深后） | 2026-06-12 | 部署 commit `5e3533f` 后；网址检查确认 **已编入索引** + FAQ/Breadcrumb 结构化数据有效 |
| GSC 重新请求收录 `/en/halloween-charades`（加深后） | 2026-06-12 | 部署 commit `5e3533f` 后；网址检查确认 **已编入索引** |
| GSC 请求收录新页面 | 2026-06-12 | halloween-charades、team-building-charades、about、charades-for-classroom |
| GSC 重新抓取 sitemap | 2026-06-12 | 站点地图页重新提交 |
| Bing 提交 sitemap | 2026-06-12 | `https://how-to-play-charades.com/sitemap.xml` |
| 规则页上线确认（含 Props FAQ） | 2026-06-11 | 用户确认 |
| Bing Webmaster Tools 注册与验证 | 2026-06-11 | 用户确认「2,3,5都做了」 |
| www 跳转检查 | 2026-06-11 | Vercel 308 正常；用户曾见 `/env-vars` 为偶发异常 |

---

## ✅ 已完成 — 站外推广

| 任务 | 完成日 | 备注 |
|------|--------|------|
| Pinterest 发布 3 个 Pin | 2026-06 | Halloween / Classroom / Family；账号 XiaochunChen |
| Reddit r/boardgames 回复 | 2026-06-11 | [High quality charades ideas](https://www.reddit.com/r/boardgames/comments/1tuuanr/high_quality_charades_ideas/) |
| Reddit r/Teachers 回复 | 2026-06-11 | 用户称 Reddit 1–2 条均完成 |
| AlternativeTo 正确提交流程文档化 | 2026-06 | `marketing/outreach-en.md`（旧 /submit/ 链接已 404） |
| AlternativeTo 提交新应用 | 2026-06-23 | 用户确认已提交；审核约数天 |
| Quora 回答问题带链接 | 2026-06-23 | 用户确认已发 1 条；文案见 `outreach-en.md` |

---

## ⏳ 待办 — 有明确时间表

| 任务 | 最早执行日 | 优先级 | 说明 |
|------|------------|--------|------|
| GSC 复查 props 词排名与点击 | **2026-06-25** 起 | P1 | 查 `can you use props in charades` |
| Bing 展示数据复查 | **2026-06-25** 起 | P2 | Bing Webmaster 性能报告 |

---

## 📋 待办 — 运营与收录（无固定日，按需做）

| 任务 | 状态 | 说明 |
|------|------|------|
| GSC 请求收录新页面 | ✅ 已完成 | 见上方「搜索引擎」区块 2026-06-12 |
| GSC 重新提交 sitemap | ✅ 已完成 | 2026-06-12 |
| Bing 提交 sitemap | ✅ 已完成 | 2026-06-12 |
| AdSense 广告位 slot ID | 未做 | 需创建广告单元并配置 `NEXT_PUBLIC_ADSENSE_SLOT` |
| AdSense 审核通过 | 等待中 | 保持内容、隐私政策、ads.txt |
| Reddit 帖下有人回复时互动 | 持续 | 不必主动刷帖 |
| Quora 继续回答（目标 3–4 条） | 进行中 | 已发 1 条（2026-06-23）；间隔几天再发，勿复制粘贴 |
| 再发 Pinterest Pin（如 Christmas） | 未做 | 素材可复用 `marketing/pins/` 流程 |
| 每月新增 2–4 篇博客 | 未开始 | 长期内容计划 |
| `marketing/reddit-replies.md` 归档 6 条帖+回复 | 未做 | 可选，便于复用 |
| GSC 重新请求收录加深后的 `/en/rules`、`/en/halloween-charades` | ✅ 已完成 | 2026-06-12 |
| 加深 `/en/charades-words` 完整词表 | 未做 | 内容质量 P1 |
| 加深 `/en/blog/charades-for-classroom` 15 分钟教案 | 未做 | 内容质量 P1 |

---

## 🚫 暂不需要做（避免重复建议）

| 任务 | 原因 |
|------|------|
| 对 `sitemap.xml` 本身「请求编入索引」 | sitemap 不是网页，应在「站点地图」提交 |
| 大改首页 title 冲 `how to play charades` | 大词排名 39+，短期收效低 |
| 再买链 / 群发评论刷 URL | 白帽原则，已记录在 outreach 指南 |
| 把 `marketing/` 部署到 Vercel | 已 `.vercelignore` 排除 |
| 重复问「规则页是否上线」 | 2026-06-11 已确认 |
| 重复问「GSC 是否添加资源」 | 已添加 |
| 重复问「Pinterest 是否已发」 | 3 个 Pin 已发 |

---

## 更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-06-11 | 初版：汇总代码、GSC、Bing、Reddit、Pinterest、www 跳转等全部已知进度 |
| 2026-06-11 | 记录 GSC 数据基线；标记今日任务 1–5 完成（规则页、GSC 收录、Reddit×2、Bing、www） |
| 2026-06-12 | GSC 补收录 4 个新 URL；GSC 重新抓取 sitemap；Bing 提交 sitemap |
| 2026-06-12 | 规则页 + Halloween 专题页内容加深（手势表、62 词、派对脚本） |
| 2026-06-12 | 部署 `5e3533f`；GSC 重新收录 rules + halloween-charades |
| 2026-06-12 | 网址检查确认 `/en/rules`（含 FAQ 结构化数据）与 `/en/halloween-charades` 均已编入索引 |
| 2026-06-23 | 用户确认 AlternativeTo 已提交（Suggest new application） |
| 2026-06-23 | 用户确认 Quora 已发 1 条回答 |

---

## 如何更新本文件

1. 用户说「我做了 X」→ 把 X 从待办移到已完成，写上日期
2. AI 完成代码/部署 → 同上，并注明 commit 或文件路径
3. 新增待办 → 加到对应区块，写清优先级与原因
4. 复查 GSC/Bing 后 → 更新「数据基线」表，在更新日志记一笔
