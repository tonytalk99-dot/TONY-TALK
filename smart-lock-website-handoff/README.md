# LOCKKING Smart Lock Website - 运行与交互说明 (Mobile & Execution Guide)

## 1. 移动端适配实现方案 (Mobile Responsive Implementation)
正如交接要求所述，**移动端与桌面端共用同一套网站源码与设计语言**，没有采用独立或分离的移动端子站点。
- **响应式断点 (Breakpoints):** 基于 Tailwind CSS 的标准响应式网格断点（如 `md:grid-cols-3` 在手机端自动堆叠为单列 `grid-cols-1`）。
- **视口与触控优化 (Touch-friendly Hit Targets):** 移动端屏幕下自动收起水平长导航，并优化所有 CTA 按钮及表单输入框的间距（Padding）与触控靶心大小，确保单手拇指流操作顺畅。

## 2. 交互逻辑与按钮行为 (Interaction Logic & Behaviors)
- **中英文实时切换 (Bilingual Toggle):** 点击导航栏右侧的 `中 / EN` 按钮，通过 JavaScript 遍历所有带有 `data-en` 和 `data-cn` 属性的 DOM 元素，瞬间实现文案无刷新切换。
- **B2B 询盘表单 (Lead Generation Form):** 首页底部的表单包含姓名、企业邮箱、采购量 (MOQ) 选择与定制需求输入。提交后会触发本地交互反馈（Alert 提示并支持多语言文案适配），方便前端开发者对接后端 API。
- **锚点平滑滚动 (Smooth Scrolling):** 导航栏中的产品、工厂、联系我们等链接均采用平滑滚动定位，提升海外 B2B 用户的浏览体验。

## 3. 项目运行方法 (How to Run & Test)
本独立站采用轻量化现代前端架构（HTML5 + Tailwind CSS CDN + Vanilla ES6 JS），无需复杂的 Webpack 或 Vite 编译配置：
1. 将 `index.html` 和 `products.html` 放入同一个本地文件夹中。
2. 直接在任意现代浏览器（Chrome, Safari, Edge）中双击打开 `index.html`。
3. 您即可实时测试中英文双语切换、响应式视口缩放及 B2B 表单交互。
