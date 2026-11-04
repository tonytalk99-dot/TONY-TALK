# Additional Pages Manifest & Component Reuse

在整站架构中，为了保持品牌视觉一致性（深海军蓝 `#0B192C` + 科技蓝 `#2563EB`）并减少冗余代码，以下内页可直接复用首页的 Header、Footer 及全局导航状态，并通过独立锚点或独立子页面文件呈现：

1. **OEM/ODM 制造服务专页 (`services.html`):**
   - 复用 `index.html` 的顶栏与底栏。
   - 核心内容：深度拆解芯片定制、App/SDK 对接、结构模具开发（Tooling）及 NDA 合作保障。
   
2. **工厂与品控专页 (`factory.html`):**
   - 复用 `index.html` 的 Manufacturing 模块并进行纵向延伸。
   - 核心内容：展示 SMT 电子贴片线、自动化组装、盐雾腐蚀测试实验室及 ISO9001 质量管理体系。

3. **联系我们与询盘专页 (`contact.html`):**
   - 复用 `index.html` 的 B2B 询盘表单组件。
   - 核心内容：海外样品申请（Sample Request）、大宗采购量评估（MOQ 选择）及工程对接通道。
