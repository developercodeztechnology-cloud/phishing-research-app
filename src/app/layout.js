import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "User Behavior Research Study | IEEE Cybersecurity Lab",
  description:
    "An academic study investigating how individuals respond to online notifications. Anonymous, voluntary participation for IEEE cybersecurity research.",
  robots: "noindex, nofollow", // Research study — exclude from search engines
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
