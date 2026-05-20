Here is your updated Markdown file, tailored to reflect that you have the full legacy source files stored directly inside your workspace in the `ACETURBO` directory.

This updated version tells the AI assistant exactly where to look within your repository layout, enabling it to map files directly from `ACETURBO/` into your new Next.js structure while strictly preserving the **BOOSTFORGE** design token system.

You can overwrite your `migration-prompt.md` file with this version:

```markdown
# 🚀 Ace Turbo Content Mapping & Architecture Migration Prompt

## 📋 Context & Project Objective
I am currently working on a complete modern revamp of the **Ace Turbo** website within my active Next.js workspace (GitHub repo: `ace_turbo`). 

I have downloaded the entire legacy website codebase and placed the folder directly into my working directory under the name `ACETURBO`. 

The objective is to analyze the source code files located inside the `ACETURBO/` directory, extract the visible public-facing information, vehicle catalog frameworks, and product text blocks, and cleanly map them into my new Next.js frontend structure.

**CRITICAL RULE:** The legacy design choices, rigid HTML layout tables, old inline styles, or original color schemes from the `ACETURBO` files must **NEVER** be brought over. Instead, all extracted information must adapt seamlessly to the design approach and exact color palette of my new interface (**BOOSTFORGE** theme).

---

## 🎨 New System Design Token Specifications

When mapping content from files inside `ACETURBO/` into my new layout components, you must strictly utilize these Tailwind CSS styles and custom theme design tokens:

### 1. Unified Color Palette
* **Background (Canvas):** Dark charcoal/pitch (`bg-[#131315]`)
* **Surface Containers:** Slate-zinc container variants (`bg-[#201f22]`, `bg-[#2a2a2c]`, `bg-[#1c1b1d]`)
* **Primary Accent (High Contrast):** High-velocity forge orange (`text-[#ff571a]` / `bg-[#ff571a]`)
* **Secondary Text/Muted Elements:** Soft peach-tinted copper (`text-[#e6beb2]`) or silver-white (`text-[#e5e1e4]`)
* **Borders & Grids:** High-precision subtle dividing lines (`border-[#27272A]` or `border-zinc-800`)

### 2. Design & Typography Approach
* **Font Foundations:** Clean body text via `font-sans` (Inter), striking geometric accents using `font-heading` (Geist), and clinical technical metrics via `font-mono` (JetBrains Mono).
* **Borders & Corners:** Sharp, mechanical industrial aesthetics with micro-rounding borders (`rounded-[2px]` or `rounded-sm`).
* **Buttons & Links:** Flat background colors that change state on hover (`hover:brightness-110` or `hover:bg-white/5`), wrapped with clean font weights and responsive padding.

---

## 📑 Target Legacy Information to Extract & Map

Please analyze the file specified below from the local `ACETURBO` directory, extract its visible informational copy, and map it directly into the new architecture.

### Core Tracking Categories:
1.  **Vehicle & Turbo Specifications Mapping:** Parse dropdown menus, manual select fields, text listings, or structural product lists into decoupled Next.js API paths (`/api/vehicles/...`) or static React map-loop arrays.
2.  **Marketing & Technical Content Copy:** Extract copy from product bulletins, workshop descriptions, shipping parameters, and business policy fields.
3.  **Action Forms:** Rewrite any legacy `.php` submission handlers into React functional forms backed by client-side hooks.

---

## 🤖 Instructions for the AI Assistant

Your job is to act as an expert frontend migration engine. Process the specified legacy code from the local workspace folder by following these steps precisely:

1.  **Extract the Pure Data:** Identify the target legacy file within `ACETURBO/`. Strip away all legacy `<table>`, `<font>`, `<center>`, `<br>`, `&nbsp;`, inline `style="..."` attributes, and old Bootstrap/jQuery selectors. Retain only the underlying text labels, raw informational content, and relative asset filenames.
2.  **Sanitize the Strings:** Clean all extracted content so that it complies perfectly with modern JSX/TSX string typesetting and closing tag constraints.
3.  **Generate a Modular Next.js Component:** Return a modern, mobile-first React functional component (`.tsx`) tailored for Next.js Server or Client contexts.
4.  **Inject the New Theme Natively:** Style the newly created layout entirely with the custom dark-theme tokens defined above. Ensure it uses fluid utility tokens (such as `grid grid-cols-1 md:grid-cols-3` or `flex flex-col md:flex-row`) instead of absolute width tables, making it fully responsive for mobile phone visitors.

---

## 📥 Target Selection (Fill this out when prompting)

### 📂 Legacy File Path inside Workspace:
> `ACETURBO/[Pasted_Filename_Here.php]` (e.g., `ACETURBO/garretTurbos.php` or `ACETURBO/turboRepairs.php`)

### 🖥️ New Destination Path in Next.js Layout:
> `src/app/[target_route]/page.tsx` or `src/components/homepage/[Component_Name].tsx`

### 📝 Raw Source Code Context:
```html

```

```

```