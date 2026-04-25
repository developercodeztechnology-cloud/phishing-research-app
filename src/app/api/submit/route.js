/**
 * Server-side API route: POST /api/submit
 *
 * Receives a completed session payload from the client and forwards it
 * to the Google Apps Script webhook (which writes to Google Sheets).
 *
 * env:  GOOGLE_SHEETS_WEBHOOK  — deployed Apps Script URL
 *
 * The server-side forward keeps the webhook URL out of client bundles.
 */

export async function POST(request) {
  try {
    const payload = await request.json()
    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK

    // ── No webhook configured → return graceful no-op ──────────────────
    if (!webhook) {
      return Response.json(
        { ok: false, message: "GOOGLE_SHEETS_WEBHOOK not set in environment variables." },
        { status: 200 }
      )
    }

    // ── Forward to Google Apps Script ──────────────────────────────────
    const gsRes = await fetch(webhook, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
      // Give Apps Script up to 10 seconds to respond
      signal:  AbortSignal.timeout(10_000),
    })

    if (!gsRes.ok) {
      return Response.json(
        { ok: false, message: `Apps Script responded with status ${gsRes.status}` },
        { status: 200 }
      )
    }

    return Response.json({ ok: true, message: "Session submitted successfully." })
  } catch (err) {
    console.error("[/api/submit] Error:", err)
    return Response.json(
      { ok: false, message: err.message || "Internal server error" },
      { status: 200 } // Always 200 so client can read the body
    )
  }
}
