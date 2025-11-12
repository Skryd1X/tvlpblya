const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};
const json = (c,b)=>({ statusCode:c, headers:{ "content-type":"application/json", ...CORS }, body:JSON.stringify(b) });

// URL бота на Render + общий ключ (совпадает с переменной на Render)
const BOT_BROADCAST_URL = "https://seedswordsbot.onrender.com/broadcast"; // ← вставь свой точный URL
const BROADCAST_KEY     = process.env.BROADCAST_KEY || "tvlp-key";

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  try {
    if (event.httpMethod !== "POST") return json(405, { ok:false, error:"Method Not Allowed" });

    let body = {};
    try { body = JSON.parse(event.body || "{}"); }
    catch { return json(400, { ok:false, error:"Invalid JSON" }); }

    const res = await fetch(BOT_BROADCAST_URL, {
      method: "POST",
      headers: { "content-type": "application/json", "x-key": BROADCAST_KEY },
      body: JSON.stringify(body), // пробрасываем всё как есть (address, network, extras)
    });
    const data = await res.json();
    return json(200, { ok: !!data.ok, relay: data });
  } catch (e) {
    return json(500, { ok:false, error:String(e) });
  }
}
