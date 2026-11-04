# LOCKKING Smart Lock OEM/ODM Website — Technical Handoff

## 项目概述 (Project Overview)

- **项目名称 (Project Name):** LOCKKING 智能门锁独立站 (Global B2B OEM/ODM Manufacturer)
- **目标市场 (Target Market):** 欧美地区的品牌商、进口商、批发商及安防集成商 (Brands, Importers, Wholesalers, Security System Integrators)
- **视觉风格 (Visual Direction):** 欧美工业科技感、高端专业；深海军蓝 (`#0B192C`) 与科技蓝 (`#2563EB`)。避免廉价 B2C 零售或阿里巴巴/1688 批发风格。

## 核心架构与功能需求 (Key Architectural Requirements)

1. **中英文实时切换 (Bilingual Support):** 支持全站文本节点和按钮在英文 (`en`) 与中文 (`cn`) 之间一键切换。
2. **响应式与移动端一体化 (Responsive Mobile-First):** 移动端与桌面端共享同一套视觉资产与设计规范，通过弹性网格及移动端折叠菜单适配。
3. **B2B 询盘转化导向 (B2B Conversion Focus):** 核心目标是获取海外大客户询盘 (Inquiries / RFQ) 及 NDA 保护申请，而非直接网购下单。

## 交接目录结构 (Handoff Structure)

- `README.md`: 技术交接说明。
- `design-specifications/tokens-and-specs.md`: 完整设计规范（颜色、字体、间距、圆角）。
- `source-code/index.html`: 首页完整源码。
- `source-code/products.html`: 产品列表页源码。
- `source-code/mobile-responsive.html`: 移动端适配源码/说明；优先采用桌面与移动端共用的响应式实现。
- `assets/placeholders.md`: 素材与图片清单说明。

## 工作流程 (Workflow)

1. **Gemini:** 提供已批准的视觉设计、页面源代码、响应式实现和素材。
2. **ChatGPT:** 审核代码、设计规范和素材完整性，整理技术方案与开发任务。
3. **Codex:** 根据审核通过的交接成果进行编码、整合和测试。

## 导入状态 (Import Status)

本仓库此前建立的是交接目录骨架。当前 README 已更新为 Gemini 提供的项目说明；其他文件仍需以 Gemini 实际输出为准。不得将占位文件视为最终设计或真实实现。

## 导入与验收要求 (Import and Review)

- 保留 Gemini 已确认的设计，不在代码交接阶段擅自重新设计。
- 每个文件按实际路径保存，代码必须完整，不得使用省略号、伪代码或占位内容代替。
- 图片、图标、字体等素材应提供真实文件或可访问来源，并注明用途。
- 未经确认的产品规格、功能、认证、价格、评价及制造能力一律标记为 TBD，不得编造。
- 桌面端和移动端应保持一致的品牌视觉；优先使用同一套代码和响应式布局。
- 正式交给 Codex 前，由 ChatGPT 检查页面、依赖、资源路径、交互、多语言和响应式行为。
