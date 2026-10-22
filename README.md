# Claudia Cash — v24

A personal safe-to-spend budget that answers one question: **what can I safely spend until next payday?** It runs as a single-file web app (PWA) on GitHub Pages, installs to the iPhone home screen, and is fed by CSV exports from Monarch.

Your data is cached on the device (IndexedDB) and, when you sign in with Google, synced to your Supabase project so the phone and the Mac see the same budget.

---

## What's new in v24

### Apple subscriptions
Apple bills App Store subscriptions in bundles — one Apple Card charge, or one bank "APPLE.COM BILL" charge through PayPal, can cover four apps. v24 uses your **Apple receipt emails** to split those bundles into the real apps.

- **Subscriptions → Apple subscriptions** lists every App Store subscription: price, plan, what pays for it, last charge, renewal date, total spent, and Keep / Review / Cancel.
- Comes loaded with your 58 receipts since March 31. 54 match a charge exactly; the rest are newer than your last import.
- Bundled Apple charges now show as the real apps in the subscriptions table, on Home and in Needs attention. Tax is assigned to the streaming items that are actually taxed (HBO Max, Peacock, Hulu, rentals).
- **Transactions** shows what's inside each Apple charge, e.g. *X $4.00 · ChatGPT $19.99*.
- Alerts: weekly plans and what they've cost, back-to-back double charges (refund candidates), two plans of the same app at once, price changes, yearly renewals within 30 days, and new subscriptions.
- **Stopped or canceled**, **One-time purchases** and **Unmatched** (Apple charges with no receipt, e.g. Apple Store purchases) sit underneath.
- Apple Cash transfers and Apple Card interest are no longer mistaken for an Apple subscription.

**Adding receipts**
- **Add receipt:** open a "Your receipt from Apple." email, select all, copy, paste. The app reads the date, order, apps, plans, renewal dates, tax and payment method; fix any name before saving and it remembers it.
- **Import file / Export:** a JSON list of receipts. Ask Claude to pull new receipts from Gmail into a file, then import it. Re-importing the same receipt updates it instead of duplicating it.
- **Manage on Apple ↗** opens Apple's subscription page to actually cancel.

## What's new in v23

### PayPal double entries fixed
Monarch records most PayPal purchases twice: once on the **PayPal** account ("Payment to Spotify") and again on the bank account or card PayPal pulled the money from ("PAYPAL DES:PURCHASE ID:SPOTIFY…"), usually 0–4 days later.

- The app now keeps the **bank/card copy** (where the money actually left) and skips the matching **PayPal-account copy**.
- Applies to Subscriptions, Monthly History, Budgets and bill matching.
- PayPal purchases with no bank/card twin (paid from your PayPal balance) still count.
- Pending PayPal "Authorization to …" holds followed by the real "Payment to …" are skipped too.
- Subscriptions use PayPal's clean merchant name, e.g. `XANDRIEUSAD` → **Qobuz USA**.
- Nothing is deleted. Skipped rows stay on the Transactions tab, labeled *PayPal copy · not counted*.
- **Settings → PayPal** shows how many were skipped and can turn this off.

## What's new in v22

### Monthly card-payment update
- At the start of each month, Home shows **"New month: update your card payments."**
- **Review** opens a preview: each credit card bill, its current amount, the payments found last month, and an editable new amount. Nothing changes until you tap **Update checked bills**.
- Two payments to one card in a month are **added together**. Type over it if you'd rather use one.
- Unpaid amounts in this and future pay cycles follow along, unless you've overridden them for a cycle.
- Also available from **Bills → Update card payments** and **Settings → Monthly card payments**, which keeps a log.
- Each bill has a **Credit card payment?** setting (Auto / Yes / No) for anything not detected automatically.

### Home page
- **Subscriptions this pay period** now sits below the Bills section.
- Hover (Mac) or tap (iPhone) **Expected**, **Charged so far**, **Still to come** or **From cash, not a Bill** to see the subscriptions behind each total, with date, amount and account.
- New banners:
  - **Price increases:** subscriptions that went up, with the extra cost per year. Clears when you mark one Keep or Cancel.
  - **Data getting old:** transactions or balances more than 7 days old, with import buttons.

### Subscriptions
- New **Last charge** column (date, amount, how long ago), plus a *Last charge* sort.
- **Needs attention** now shows the price and yearly cost, last and next charge, what pays for it, whether it's a Bill, charge count and total, and the last four charges.

### Settings
- **Merchant renames:** "When the merchant contains X, show it as Y" (e.g. *Deuscom → The Blowers*). Applies to all existing transactions and every future import. Bill matching still recognizes the original name.
- **Automatic backups:** a full copy of your data is saved on the device right before every CSV import. The last 3 are kept, each with **Download** and **Restore**. Use **Back up now** anytime.

### Payoff Planner
- **Balance by month:** each card's month-end balance for the last three months against today, the change, and a trend line.

### Fixes
- KPI boxes no longer run off the screen on iPhone (Payoff Planner and others).

---

## Tabs at a glance

| Tab | What it does |
|---|---|
| **Dashboard** | Cash on hand, this cycle's bills, paid / left, and **Safe to spend** until next payday. Bills for the cycle, cash accounts, subscriptions this pay period, and alert banners. |
| **Accounts** | Checking, savings and other accounts. Only accounts marked *Include in cash on hand* count toward Safe to spend. |
| **Funding & Transfers** | Which account pays each bill, what each account needs this cycle, and the transfers to make, and by when. |
| **Subscriptions** | Recurring services detected from your history, decisions (Keep / Review / Cancel), Needs attention queue, types and overlap, and Apple subscriptions itemized from receipts. |
| **Budgeting** | Monthly targets for discretionary categories, with suggestions from your last 6 months. |
| **Credit Cards** | Balances, limits, utilization, interest and payments per card. |
| **Payoff Planner** | Priority ranking, balance by month, payoff plan builder, strategy comparison and plan log. |
| **Investments** | Balance history and change for investment accounts. |
| **Data → Bills / Pay Cycles / Transactions / Monthly History** | The underlying records. |
| **Settings & Backup** | Pay and funding rules, backups, PayPal, merchant renames, monthly card payments, sync. |

---

## Routine

**Every week (or before you check Safe to spend):**
1. In Monarch, export **Transactions** and **Balances** as CSV.
2. In the app: **Import Transactions**, then **Import balances**. A backup is taken automatically before each.
3. Check the Home banners: transfers, price increases, renewals.

**When new Apple receipts arrive (or monthly):**
1. **Subscriptions → Apple subscriptions → Add receipt** and paste each receipt, or import a receipts file.

**Once a month (first few days):**
1. Tap **Review** on the *update your card payments* banner.
2. Check the amounts, then **Update checked bills**.

**When something looks wrong after an import:**
- **Settings → Automatic backups → Restore** the copy taken just before that import.

---

## Publishing an update

1. Copy `index.html` and `service-worker.js` from the version folder (e.g. `V24`) into the GitHub Pages repo, alongside the existing `manifest.webmanifest` and icons.
2. Commit and push.
3. Open the app. When the update banner appears, tap **Reload now**. The service worker cache name changes each version (`cash-tracker-v24`), so the new build replaces the old one cleanly.

On a new iPhone: open the Pages URL in Safari → Share → **Add to Home Screen**.

---

## Data & privacy

- Data is stored on each device in IndexedDB.
- When signed in with Google, it syncs to your Supabase project. Transactions are stored in their own table so each save stays small.
- **Settings → Export JSON backup** before changing phones or clearing Safari data. Automatic backups live only on the device that made them.

---

## Version history (recent)

| Version | Date | Highlights |
|---|---|---|
| v24 | Oct 22, 2026 | Apple subscriptions from receipt emails; bundled Apple charges split into real apps |
| v23 | Oct 22, 2026 | PayPal double entries skipped; clean PayPal merchant names |
| v22 | Oct 22, 2026 | Monthly card-payment update, hover details, last charge, richer Needs attention, price/stale banners, merchant renames, balance by month, automatic backups |
| v21 | Oct 15, 2026 | Subscriptions management: types, decisions, Needs attention, review of bundled Apple/PayPal charges |
| v20 | Sep 2026 | Subscriptions shown in the pay cycle |
| v19 | Sep 2026 | Cloud sync stores transactions separately for large histories |
| v7 | Sep 6, 2026 | Supabase sync with Google sign-in |
| v4 | Sep 3, 2026 | Funding & Transfers, subscription detection, PayPal vendor resolution |
