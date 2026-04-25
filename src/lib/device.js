/**
 * Device fingerprinting utility — collects browser/OS/hardware context
 * with NO personally identifiable information (PII).
 *
 * Returns a flat object suitable for CSV/JSON export.
 */

export function getDeviceInfo() {
  // Guard for SSR
  if (typeof window === "undefined") return {}

  const ua      = navigator.userAgent
  const lang    = navigator.language || "unknown"
  const tz      = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown"
  const online  = navigator.onLine
  const cores   = navigator.hardwareConcurrency || "N/A"
  const memory  = navigator.deviceMemory ? navigator.deviceMemory + " GB" : "N/A"
  const conn    = navigator.connection
  const netType = conn?.effectiveType || "N/A"
  const netDown = conn?.downlink ? conn.downlink + " Mbps" : "N/A"

  return {
    deviceCategory:    detectCategory(ua),
    os:               detectOS(ua),
    browser:          detectBrowser(ua),
    browserVersion:   detectBrowserVersion(ua),
    screenResolution: `${screen.width}×${screen.height}`,
    viewportSize:     `${window.innerWidth}×${window.innerHeight}`,
    devicePixelRatio: window.devicePixelRatio || 1,
    colorDepth:       screen.colorDepth || "N/A",
    touchPoints:      navigator.maxTouchPoints || 0,
    language:         lang,
    timezone:         tz,
    cpuCores:         cores,
    ramGB:            memory,
    networkType:      netType,
    networkSpeed:     netDown,
    cookiesEnabled:   navigator.cookieEnabled,
    isOnline:         online,
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function detectCategory(ua) {
  if (/Mobile|Android(?!.*Tablet)|iPhone/i.test(ua)) return "Mobile"
  if (/iPad|Tablet|Kindle|PlayBook/i.test(ua))        return "Tablet"
  return "Desktop"
}

function detectOS(ua) {
  const map = [
    [/Windows NT 10\.0/,  "Windows 10/11"],
    [/Windows NT 6\.3/,   "Windows 8.1"],
    [/Windows NT 6\.1/,   "Windows 7"],
    [/Windows/,           "Windows"],
    [/Android ([\d.]+)/,  (m) => `Android ${m[1]}`],
    [/iPhone OS ([\d_]+)/,(m) => `iOS ${m[1].replace(/_/g, ".")}`],
    [/iPad.*OS ([\d_]+)/, (m) => `iPadOS ${m[1].replace(/_/g, ".")}`],
    [/Mac OS X/,          "macOS"],
    [/Linux/,             "Linux"],
  ]
  for (const [re, val] of map) {
    const m = ua.match(re)
    if (m) return typeof val === "function" ? val(m) : val
  }
  return "Unknown"
}

function detectBrowser(ua) {
  if (/Edg\//i.test(ua))                    return "Edge"
  if (/OPR\//i.test(ua))                    return "Opera"
  if (/SamsungBrowser/i.test(ua))           return "Samsung Browser"
  if (/UCBrowser/i.test(ua))               return "UC Browser"
  if (/Chrome/i.test(ua))                  return "Chrome"
  if (/Firefox/i.test(ua))                 return "Firefox"
  if (/Safari/i.test(ua))                  return "Safari"
  if (/MSIE|Trident/i.test(ua))            return "Internet Explorer"
  return "Unknown"
}

function detectBrowserVersion(ua) {
  const patterns = [
    /Edg\/([\d.]+)/i,
    /OPR\/([\d.]+)/i,
    /SamsungBrowser\/([\d.]+)/i,
    /UCBrowser\/([\d.]+)/i,
    /Firefox\/([\d.]+)/i,
    /Chrome\/([\d.]+)/i,
    /Version\/([\d.]+)/i,
    /rv:([\d.]+)/i,
  ]
  for (const re of patterns) {
    const m = ua.match(re)
    if (m) return m[1].split(".").slice(0, 2).join(".")
  }
  return "N/A"
}
