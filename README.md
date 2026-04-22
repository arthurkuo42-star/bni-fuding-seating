# bni-fuding-seating

BNI 高雄富鼎分會 · 座位管理系統。

> **此系統獨立運作**，與 [bni-kpi](https://github.com/arthurkuo42-star/bni-kpi) / [bni-speaker-tracker](https://github.com/arthurkuo42-star/bni-speaker-tracker) 無關。只共用同一個 JSONBin 帳號。

## 用途

- 管理分會會員座位安排
- 支援編輯模式與唯讀模式

## 技術棧

- Node.js + Express
- 前後端一體（`public/index.html` 由同一個 server 提供）
- 資料存 JSONBin `BNI seat` bin

## 使用模式

| 模式 | URL | 說明 |
|---|---|---|
| 編輯 | `https://你的網址/` | 預設，可拖曳與儲存 |
| 唯讀 | `https://你的網址/?readonly=1` | 給一般夥伴檢視 |

> ⚠️ 目前後端沒有寫入認證，唯讀模式只是前端不顯示編輯按鈕。知道 URL 直接 POST `/api/data` 的話任何人都能寫。未來建議加 `ADMIN_KEY` 保護。

## 本機測試

```bash
npm install
cp .env.example .env   # 再填實際值
npm start              # 預設 localhost:3000
```

## Railway 部署

專案 `comfortable-reverence`。推 `main` → 自動部署。環境變數改動後手動 Redeploy。

## 環境變數

見 [`.env.example`](.env.example)。

| 變數 | 說明 |
|---|---|
| `JSONBIN_KEY` | ⚠️ 變數名與 bni-kpi 不同，但**值是同一把** Master Key |
| `JSONBIN_BIN` | 座位 bin（BNI seat，`69d750fe...`）|
| `PORT` | 本機開發用，Railway 會自動給 |

**regenerate Master Key 時別忘了更新本 service 的 `JSONBIN_KEY`**（變數名不同容易漏）。

## 相關

- 整體架構：見本機 `富鼎網站/ARCHITECTURE.md`
