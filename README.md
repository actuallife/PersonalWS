# 林漢洲 Han-Chou Lin — 個人學術網站

純靜態網站（HTML + CSS + JS），不需要任何建置工具，可直接部署於 GitHub Pages。

```
├── index.html            ← 中文版（首頁）
├── en/index.html         ← English version
├── assets/
│   ├── css/style.css     ← 共用樣式（含深色模式）
│   ├── js/main.js        ← 選單、著作篩選、深色模式切換
│   └── img/
│       ├── profile.jpg   ← 個人照片
│       └── favicon.svg
└── .nojekyll
```

## 部署到 GitHub Pages

### 方法 A：個人主網址（推薦）`https://<帳號>.github.io`
1. 在 GitHub 建立新的 repository，名稱必須是 **`<你的帳號>.github.io`**（例如 `hanchoulin.github.io`），設為 Public。
2. 把本資料夾全部檔案上傳到 repository 根目錄：
   - 網頁操作：repository 頁面 → **Add file → Upload files** → 把資料夾內容整個拖進去 → Commit。
   - 或用指令：
     ```bash
     cd 本資料夾
     git init
     git add .
     git commit -m "Initial website"
     git branch -M main
     git remote add origin https://github.com/<帳號>/<帳號>.github.io.git
     git push -u origin main
     ```
3. 到 **Settings → Pages**，Source 選 **Deploy from a branch**，Branch 選 `main` / `/ (root)` → Save。
4. 約 1–2 分鐘後即可在 `https://<帳號>.github.io` 看到網站；英文版在 `/en/`。

### 方法 B：專案網址 `https://<帳號>.github.io/<repo名稱>/`
任意 repository 名稱皆可，步驟同上。網站使用相對路徑，放在子路徑下也能正常運作。

### 自訂網域（選用）
若有自己的網域（例如 `hclin.tw`），在 Settings → Pages → Custom domain 填入，並在 DNS 設定 CNAME 指向 `<帳號>.github.io`。

## 如何更新內容
- 中文內容改 `index.html`，英文內容改 `en/index.html`（兩個檔案結構相同，對應段落以註解 `<!-- ===== 區塊名稱 ===== -->` 標示）。
- **新增一篇論文**：在 `<ol class="pub-list">` 內複製一個 `<li class="pub" ...>` 修改即可。
  `data-type` 可填 `journal`、`conference`、`thesis`，再加上 `selected` 會出現在「代表著作」篩選中；篩選按鈕上的數字會自動計算。
- **更換照片**：覆蓋 `assets/img/profile.jpg`（建議直式 4:5，寬 480px 以上）。
- **加入 Google Scholar / ORCID / ResearchGate**：在 hero 的 `.btn-row` 裡加一個按鈕，例如
  ```html
  <a class="btn" href="https://scholar.google.com/citations?user=XXXX" target="_blank" rel="noopener">Google Scholar</a>
  ```
- 主色調可在 `assets/css/style.css` 最上方的 `:root` 變數修改（`--navy`、`--accent`）。
