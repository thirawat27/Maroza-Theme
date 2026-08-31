# 📜 Changelog

All notable changes to the **Maroza Theme** extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-08-31

### 🎨 Syntax Palette Overhaul (Light, Soothing Aqua, Cyber Chill, Zen Pro)
- **Higher-Chroma Colors** — Rebuilt the syntax palettes so accents read as saturated rather than pastel, without sacrificing readability. Every syntax color stays at or above the 4.5:1 (WCAG AA) contrast ratio against its editor background.
  - *Soothing Aqua* — mean accent chroma **+33%**
  - *Cyber Chill* — mean accent chroma **+23%**
  - *Zen Pro* — mean accent chroma **+63%** (kept warm and muted to preserve its low-fatigue identity)
  - *Light* — retuned for a contrast gain of **+0.8 to +1.5** across every role (chroma is already near its ceiling on a white background)
- **Wider Hue Separation** — Adjusted accent hues so neighboring roles (types, functions, support, keywords) stay visually distinct.
- **Maroza Dark Unchanged** — Dark remains the reference theme and was not touched in this release.

### 🛠️ Developer Experience (DX) Fixes
Each theme was previously generated from a small shared palette, which collapsed many distinct editor states onto the same color. These are now separated:
- **Selections** — active selection, inactive selection, and other-occurrence highlights are now three distinct shades (active reads louder than inactive).
- **Find** — the current match now clearly outranks the other matches, with a matching border.
- **Read vs Write Occurrences** — `wordHighlight` and `wordHighlightStrong` are no longer identical.
- **Tabs** — active, inactive, and hovered tabs now use different surfaces, so the active tab is obvious.
- **Lists** — hover, focus, active selection, and inactive selection are now four distinct backgrounds in the Explorer, Quick Open, and other lists.
- **Indent Guides** — became visible (previously equal to the editor background), with a stronger active guide.
- **Editor Rulers** — dimmed from full text brightness to a subtle line.
- **Diff Editor** — deleted-line highlighting restored (previously equal to the editor background).
- **Rendered Whitespace, CodeLens, Folded Regions** — dimmed so they no longer compete with code.
- **Git Gutter & Diff** — added, modified, and deleted markers use solid, readable colors instead of faint pastels.
- **Bracket Match** — given its own accent instead of reusing the selection color.

### 🖥️ Terminal
- **Full 16-Color ANSI Palette** — Each theme previously exposed only ~7 real ANSI colors (normal equaled bright, and blue equaled cyan). All 16 slots are now distinct, so dim output and colored CLI text render correctly.
- **Accurate Ansi Black** — fixed *Light*'s near-white `ansiBlack` that was invisible on a light background.

## [1.0.4] - 2026-01-07

### 🔧 Standardization Update
- **Unified Theme Standards** — Applied Maroza Dark Theme standards across all themes:
  - Added `fontStyle: "bold"` to **Functions**, **Classes**, **Types**, **Tags**, and **Headings** in *Maroza Light Theme*
  - Added `fontStyle: "bold"` to **Tags** and **Headings** in *Maroza Cyber Chill*
  - Added `fontStyle: "bold"` to **Functions** and **Tags** in *Maroza Soothing Aqua*
- **Complete Language Coverage** — Added missing Language-specific rules to *Maroza Soothing Aqua*:
  - Ruby, Shell, PowerShell, Lua, GraphQL, YAML, XML, Kotlin, Scala, Docker, Batch, LaTeX, C#, Dart, R, Perl, Blade, Twig, and Terraform
- **Consistency Improvements** — Ensured all themes now follow the same font styling conventions for key code elements

## [1.0.3] - 2026-01-07

### 🚀 Major Enhancements
- **"State of the Art" Consistency** — Updated *Maroza Light*, *Soothing Aqua*, and *Cyber Chill* to match the premium quality of the Dark theme.
- **Typography Overhaul** — Added **Bold** formatting to Keywords, Classes, Functions, and HTML Tags, plus *Italic* formatting for Parameters across all themes.
- **Realistic UI** — Implemented 3D-styled Keybinding Labels and sharper, defined borders for a more impactful user interface.
- **100% Language Support** — Added comprehensive token colors for Ruby, Shell, Lua, GraphQL, Kotlin, Scala, Dart, R, and more to ensure full coverage.
- **Visual Refinements** — Polished borders and structural elements (Sidebar, Activity Bar, etc.) for a cleaner, modern look.

## [1.0.2] - 2026-01-06

### 📚 Documentation
- **README Refinement** — Standardized description formats for all themes to match Maroza Zen Pro (Use of bullet points and emojis)

## [1.0.1] - 2026-01-06

### 🔧 Maintenance
- **Icon Update** — Added refined Maroza identity icon
- **Documentation** — Cleaned up README and removed preview images for better loading speed

## [1.0.0] - 2026-01-06

### 🎉 Initial Release

#### Themes Included
- **Maroza Dark Theme** — A sleek dark theme with balanced contrast and vibrant accents
- **Maroza Light Theme** — A clean light theme perfect for well-lit environments
- **Maroza Soothing Aqua** — A calming dark theme with refreshing aqua tones
- **Maroza Cyber Chill** — A modern dark theme with cyberpunk-inspired aesthetics
- **Maroza Zen Pro** ⭐ — *NEW* The ultimate programmer's theme for professionals

#### Features
- **5 Theme Variants** — Professional themes for every preference
- **60+ Semantic Token Colors** — Rich syntax highlighting for all languages
- **6-Color Bracket Highlighting** — Rainbow bracket pair colorization
- **30+ Symbol Icons** — Customized icon colors for breadcrumbs and outlines
- **Complete UI Coverage** — 400+ UI color tokens for all VS Code elements
- **Debug & Testing Icons** — Full set of debugging and test runner icons
- **Modern UI Support** — Command Center, Notebooks, Sticky Scroll, Inline Chat
- **Eye-Friendly Design** — Carefully balanced contrast to reduce eye strain
- **GitLens Support** — Enhanced colors for GitLens extension

#### Maroza Zen Pro - Special Edition
Designed specifically for professional developers who code all day:
- 🎯 Focus-first design for maximum productivity
- 👁️ Warm, muted colors optimized for eye health
- ⚡ Balanced contrast for long coding sessions
- 🧠 Clear visual hierarchy to reduce cognitive load

---

## [Unreleased]

### Planned
- Custom icon theme support
- More language-specific syntax optimizations
- Additional accessibility improvements

---

## Contributing

Found a bug or have a suggestion? Please open an issue on [GitHub](https://github.com/thirawat27/maroza-theme/issues).

---

<p align="center">
  <a href="https://github.com/thirawat27/maroza-theme">🌸 Maroza Theme</a> — Made with ❤️ by Thirawat27
</p>
