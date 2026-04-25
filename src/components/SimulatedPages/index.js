"use client"

/**
 * Central export + page-type mapping for all simulated pages.
 * ScenarioScreen imports this to resolve pageType → Component.
 */

import InstagramPage from "./InstagramPage"
import BankPage      from "./BankPage"
import GooglePage    from "./GooglePage"
import RewardPage    from "./RewardPage"
import DeliveryPage  from "./DeliveryPage"
import AmazonPage    from "./AmazonPage"
import SwiggyPage    from "./SwiggyPage"
import LinkedInPage  from "./LinkedInPage"
import JioBillPage   from "./JioBillPage"

/**
 * Maps scenario.pageType → React component.
 * If no match found, ScenarioScreen falls back to the card-based view.
 */
export const PAGE_MAP = {
  "instagram":  InstagramPage,
  "bank":       BankPage,       // phishing bank login
  "bank-legit": BankPage,       // reuses same component; scenario.type drives UI tweaks
  "google":     GooglePage,
  "reward":     RewardPage,
  "delivery":   DeliveryPage,
  "amazon":     AmazonPage,
  "swiggy":     SwiggyPage,
  "linkedin":   LinkedInPage,
  "jio":        JioBillPage,
}

export {
  InstagramPage,
  BankPage,
  GooglePage,
  RewardPage,
  DeliveryPage,
  AmazonPage,
  SwiggyPage,
  LinkedInPage,
  JioBillPage,
}
