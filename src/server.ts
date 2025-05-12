import app from "./app";
import DB from "./config/db";

const PORT = process.env.PORT || 8000;

DB().then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}).catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });


