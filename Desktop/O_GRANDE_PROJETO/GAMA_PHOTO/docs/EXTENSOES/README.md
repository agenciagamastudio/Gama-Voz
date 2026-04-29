# 🎬 Lightroom Classic Actions Extension

**Create and execute batch actions on Lightroom photos (like Photoshop Actions, but for Lightroom)**

---

## 🎯 What This Is

A **Lightroom Classic plugin** that allows you to:

1. **Create actions** — Bundle multiple photo adjustments (exposure, saturation, tone) into a single "action"
2. **Execute in batch** — Apply that action to 100 photos at once (instead of one-by-one)
3. **Reuse** — Save actions to your library for future use

### Why You Need It

Lightroom Classic doesn't have a native "Actions" panel like Photoshop. If you process 50+ photos with the same adjustments, you currently have to:
- ❌ Click each photo + apply preset manually (50x tedious)
- ❌ Or write Lua scripts directly (not user-friendly)

With this plugin:
- ✅ Create "Vibrant Portrait" action in 2 minutes
- ✅ Apply to 50 photos in 1 click
- ✅ Reuse forever

---

## 📖 Documentation Index

| Document | Purpose | For Whom |
|----------|---------|----------|
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System design, data model, tech stack | Developers, Architects |
| **[DEVELOPMENT.md](DEVELOPMENT.md)** | Setup, coding, testing, debugging | Developers |
| **[USER_GUIDE.md](USER_GUIDE.md)** | How to use the plugin | End Users |
| **[IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md)** | Development plan (3 phases, 6 days) | Project Managers, Developers |

---

## 🚀 Quick Start

### Installation

```bash
# 1. Copy plugin folder to Lightroom
# macOS:
cp -r LIGHTROOM_PLUGIN ~/Library/Application\ Support/Adobe/Lightroom/Plugins/ActionsExtension

# Windows:
xcopy LIGHTROOM_PLUGIN "C:\Users\[YourUsername]\AppData\Roaming\Adobe\Lightroom\Plugins\ActionsExtension" /E /I
```

### First Action (5 minutes)

1. **Open Lightroom Classic**
2. **File → Plugins → Actions Extension → Create Action**
3. **Name it:** "Vibrant Portrait"
4. **Add steps:**
   - Vibrance: +25
   - Shadows: -15
5. **Save**

### Execute on Batch

1. **Select 50 photos** in Library
2. **File → Plugins → Actions Extension → Execute Batch**
3. **Choose:** "Vibrant Portrait"
4. **Click:** "Execute"
5. **Done!** ✅ All 50 photos updated in <30 seconds

---

## 🏗️ Architecture Overview

```
USER INTERFACE
(Lightroom dialogs: Create, Manage, Execute)
        │
        ▼
APPLICATION LOGIC
(Action Registry, Batch Executor, Action Builder)
        │
        ▼
LIGHTROOM SDK
(Native API: photos, develop settings, export)
```

**Tech Stack:**
- **Language:** Lua 5.1 (Lightroom SDK)
- **UI:** Native Lightroom dialogs
- **Storage:** JSON (on disk)
- **Distribution:** Local plugin

---

## 📊 Project Status

| Phase | Component | Status | Est. Completion |
|-------|-----------|--------|-----------------|
| **Phase 1** | Foundation (SDK, Data Layer) | 🔲 TODO | Day 2 |
| **Phase 2** | Batch Execution (UI, Core Logic) | 🔲 TODO | Day 4 |
| **Phase 3** | Polish (Templates, Docs, QA) | 🔲 TODO | Day 6 |
| **TOTAL** | MVP Complete | 🔲 TODO | 6 days |

---

## 📚 Key Features (MVP)

### ✅ Implemented (In This Design)
- Create actions via simple UI form
- Save/load actions from disk (JSON)
- Execute action on batch of photos
- Progress feedback during execution
- Error handling + graceful failures
- 5 predefined templates
- Full documentation + user guide

### 🔲 Future (Post-MVP)
- Drag-drop action creator UI
- Export batch in multiple formats
- Lightroom CC support
- Adobe Exchange distribution
- Cloud sync of actions

---

## 🎨 Example Use Cases

### Case 1: Portrait Photographer
```
Create action "Client A Brand"
  - Vibrance +20
  - Saturation +15
  - Highlights -5
  
Apply to 500 client photos
→ Automatic consistent look
```

### Case 2: Wedding Photographer
```
Create action "Golden Hour Batch"
  - Warm temperature +800K
  - Vibrance +25
  - Shadows +10

Apply to all 200 sunset photos
→ Done in 30 seconds
```

### Case 3: Content Creator
```
Create action "Instagram Mobile"
  - Resize to 1080x1350
  - Boost contrast +20
  - Export as JPEG 85%

Export 50 stories at once
→ Batch processing instead of one-by-one
```

---

## ⚙️ Technical Specs

| Aspect | Specification |
|--------|---------------|
| **Plugin Type** | Lua (Lightroom SDK) |
| **Compatible With** | Lightroom Classic 2020.1+ |
| **Data Format** | JSON (human-editable) |
| **Storage Location** | `~/.config/Adobe/Lightroom/Plugins/` |
| **Performance** | <30 sec for 100 photos on modern CPU |
| **Undo Support** | ✅ Full (standard Lightroom undo) |
| **Crash Safety** | Batch can resume if interrupted |

---

## 🛠️ Development

### Prerequisites
- Lightroom Classic (2020.1 or later)
- Text editor (VS Code, Sublime, etc)
- Basic Lua knowledge
- Adobe Lightroom SDK docs

### Getting Started

1. **Read:** [DEVELOPMENT.md](DEVELOPMENT.md) (setup, testing, debugging)
2. **Follow:** [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) (phase-by-phase plan)
3. **Code:** Start with Phase 1 (Info.lua + ActionRegistry)
4. **Test:** Manual testing in Lightroom UI

### File Structure

```
LIGHTROOM_PLUGIN/
├── Info.lua                 (plugin manifest)
├── ActionRegistry.lua       (data management)
├── ActionBuilder.lua        (UI for creating actions)
├── BatchExecutor.lua        (core batch logic)
├── LightroomAPI.lua         (SDK wrapper)
├── Utils.lua                (helpers)
└── actions/                 (user actions saved here)
    ├── templates.json       (predefined templates)
    └── [custom actions]
```

---

## 🔗 Resources

### Lightroom SDK
- [Adobe Lightroom Classic Developer](https://developer.adobe.com/lightroom-classic/)
- [SDK Guide (PDF)](https://www.adobe.io/open/standards/PDFS/LightroomSDK.pdf)
- [GitHub Examples](https://github.com/Jaid/lightroom-sdk-8-examples)

### Lua Reference
- [Lua 5.1 Documentation](https://www.lua.org/manual/5.1/)
- [Sam Rambles: Lightroom Plugin Guide](https://samrambles.com/guides/writing-lightroom-classic-plugins/)

### Best Practices
- Use `LrLogger` for debugging (not print)
- Wrap long operations in `LrTasks`
- Always provide progress feedback to user
- Error messages should be user-friendly

---

## 🚨 Known Limitations

| Limitation | Reason | Workaround |
|-----------|--------|-----------|
| No automated unit testing | SDK doesn't support it | Manual testing in Lightroom UI |
| Lua debugging is primitive | Lightroom limitation | Verbose logging + manual debug |
| Batch UI locks during execution | SDK limitation | Use progress callback for feedback |
| No Lightroom CC support (yet) | Different architecture | Plan for Phase 4 |

---

## 📞 Support & Contact

### Bugs
1. Check [DEVELOPMENT.md](DEVELOPMENT.md) troubleshooting section
2. Review debug log: `File → Plugins → Show Debug Log`
3. Check [USER_GUIDE.md](USER_GUIDE.md) FAQ

### Feature Requests
See [IMPLEMENTATION_ROADMAP.md](IMPLEMENTATION_ROADMAP.md) for planned phases.

### Questions
- **"How do I create my first action?"** → See [USER_GUIDE.md](USER_GUIDE.md) Quick Start
- **"How do I extend this plugin?"** → See [DEVELOPMENT.md](DEVELOPMENT.md)
- **"What settings can I use?"** → See [USER_GUIDE.md](USER_GUIDE.md) Settings Reference

---

## 📝 Version History

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| **1.0.0** | 2026-04-28 | 🏗️ Design | Architecture complete, ready for development |
| 0.1 (Concept) | 2026-04-28 | ✅ Done | Initial concept approved by user |

---

## 🎓 Project Owner

**Created by:** @architect (Aria)  
**For:** GAMA_PHOTO (personal/internal use)  
**Status:** Ready for Phase 1 Development  
**Next Assignment:** @dev (Dex)

---

## 📄 License

Personal/Internal Use — No public distribution yet.

---

## 🙏 Credits

- **Architecture:** @architect (Aria)
- **SDK Reference:** Adobe Lightroom Classic
- **Design Inspiration:** Photoshop Actions panel

---

**Last Updated:** 2026-04-28  
**Status:** ✅ Architecture Complete — Ready for Development

---

## 📚 Document Map

```
GAMA_PHOTO/docs/EXTENSOES/
├── README.md (📍 You are here)
├── ARCHITECTURE.md (→ System design deep-dive)
├── DEVELOPMENT.md (→ Setup & coding guide)
├── USER_GUIDE.md (→ How to use)
└── IMPLEMENTATION_ROADMAP.md (→ Development timeline)
```

**Start here:** Pick a role below

| Role | Start With |
|------|-----------|
| 👨‍💼 Project Manager | IMPLEMENTATION_ROADMAP.md |
| 👨‍💻 Developer | DEVELOPMENT.md |
| 🎨 End User | USER_GUIDE.md |
| 🏛️ Architect | ARCHITECTURE.md |

---

**Questions?** Check the relevant doc above. Enjoy! 🚀
