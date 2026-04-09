const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 提供 public 資料夾內的靜態檔案
app.use(express.static(path.join(__dirname, 'public')));

// 首頁導向 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ BNI 座位系統已啟動：http://localhost:${PORT}`);
});
