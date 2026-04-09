# BNI 高雄富鼎分會 · 座位管理系統

## 本機測試
```bash
npm install
npm start
```
打開瀏覽器進入 http://localhost:3000

## Railway 部署
1. 將此專案推上 GitHub
2. 在 Railway 建立新專案 → Deploy from GitHub
3. 選擇此 repo
4. Railway 會自動讀 package.json 並執行 `npm start`

## 使用模式
- **編輯模式**（預設）：`https://你的網址/`
- **唯讀模式**（給夥伴看）：`https://你的網址/?readonly=1`

## 雲端設定
首次使用需到 JSONBin.io 註冊並取得 Master Key 與 Bin ID，
在右上角「⚙️ 雲端設定」填入即可。

唯讀模式也需要設定一次雲端金鑰（建議使用 Access Key 限制權限）。
