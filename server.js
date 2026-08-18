const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const JSONBIN_KEY = process.env.JSONBIN_KEY;
const JSONBIN_BIN = process.env.JSONBIN_BIN;

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
  if (!JSONBIN_KEY || !JSONBIN_BIN) {
    return res.status(500).json({ error: '伺服器尚未設定 JSONBIN_KEY 或 JSONBIN_BIN 環境變數' });
  }
  try {
    const r = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN}/latest`, {
      headers: { 'X-Master-Key': JSONBIN_KEY }
    });
    if (!r.ok) {
      return res.status(r.status).json({ error: `JSONBin 回傳 ${r.status}` });
    }
    const json = await r.json();
    res.json({ ok: true, data: json.record });
  } catch (err) {
    console.error('GET /api/data error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/data', async (req, res) => {
  if (!JSONBIN_KEY || !JSONBIN_BIN) {
    return res.status(500).json({ error: '伺服器尚未設定 JSONBIN_KEY 或 JSONBIN_BIN 環境變數' });
  }
  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: '無效的資料格式' });
    }
    const r = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_KEY
      },
      body: JSON.stringify(body)
    });
    if (!r.ok) {
      return res.status(r.status).json({ error: `JSONBin 回傳 ${r.status}` });
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('POST /api/data error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 小組名冊 proxy：轉打 System A（bni-kpi）的公開端點
// 走伺服器端 fetch 是因為 bni-kpi 的 /api/groups 沒有 CORS 標頭，瀏覽器直接打會被擋
const KPI_BASE = process.env.KPI_BASE || 'https://bni-kpi-production.up.railway.app';
app.get('/api/groups', async (req, res) => {
  try {
    const r = await fetch(`${KPI_BASE}/api/groups`);
    if (!r.ok) {
      return res.status(r.status).json({ error: `分會系統回傳 ${r.status}` });
    }
    const json = await r.json();
    res.json({ ok: true, groups: json });
  } catch (err) {
    console.error('GET /api/groups error:', err);
    res.status(502).json({ error: '無法連上分會系統：' + err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    hasKey: !!JSONBIN_KEY,
    hasBin: !!JSONBIN_BIN,
    time: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ BNI 座位系統已啟動：http://localhost:${PORT}`);
});
