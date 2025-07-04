const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Trả về file lớn (ví dụ 10MB) để test download
app.get("/download", (req, res) => {
  const size = 10 * 1024 * 1024; // 10MB
  const buffer = Buffer.alloc(size, "a");
  res.setHeader("Content-Type", "application/octet-stream");
  res.send(buffer);
});

// Nhận dữ liệu upload
app.post("/upload", express.raw({ limit: "100mb", type: "*/*" }), (req, res) => {
  res.send("OK");
});

// Ping endpoint
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Phục vụ giao diện web
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
