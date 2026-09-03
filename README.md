# Cash Tracker v4

Adds account-aware bill funding, transfer alerts, and subscription detection
to your existing Cash Tracker PWA. Your saved data is preserved — the new
fields are added on first load, nothing is overwritten.

## What's new

**Funding & Transfers tab**
- Each bill can now be linked to the account that pays it.
- Per-account view: bills due this cycle, current balance, expected paycheck
  deposit, and the net after bills and your cushion.
- Transfer alerts: how much to move, from which account, to which account,
  and by what date (2 days before the earliest bill it covers).
- Credit cards are excluded from the cash math — they're debt, not funding.
- Savings accounts are used as a transfer source only after checking accounts
  are exhausted. Moves under $10 are suppressed as noise.

**Subscriptions tab**
- Detects recurring services from imported history.
- PayPal charges are resolved to the real vendor from the statement descriptor
  (`ID:SPOTIFY...` → Spotify, `ID:MICROSOFT` → Microsoft, etc).
- Vendor names are collapsed so "Google One" and "Google" aren't counted twice.
- Card payments, bar tabs, gas, and groceries are filtered out.
- Monthly total, annualized cost, and a "needs review" count for bundled
  Apple/PayPal charges that can't be itemized from bank data.
- Hide false positives, or promote any subscription to a tracked bill.

**Balance import**
- "Import balances" reads a Monarch Balances CSV and uses the most recent row
  for each account.
- Cash accounts get their balance set; anything matching a credit card name
  updates the Credit Cards tab instead, stored as a positive amount owed.
- Warns about accounts whose newest balance is over 45 days old, and lists any
  account it couldn't match so you can fix the statement name.

**Other**
- Import now stores the Original Statement field (needed for PayPal resolution).
- Accounts have a "statement name" so app accounts match Monarch account names,
  plus an expected-deposit field.
- "Add from transactions" builds accounts from your imported history.
- "Auto-link bills" reads which account actually paid each merchant.
- "Fix unlinked" proposes matches for bills whose alias doesn't match anything.
- Settings: per-account cushion, card payment basis, transfer hub account.
- Transfer alert banner on the dashboard.
- Service worker now uses network-first so updates land without a hard reset.

## First-run setup (5 minutes, in order)

1. Open the app, go to **Transactions → Import CSV**, load your newest Monarch
   export. This is required — the new features read from it.
2. **Accounts → Add from transactions.** Delete any you don't want. Confirm
   "Include in cash on hand" is on only for real checking/savings.
3. **Accounts → Edit** each one and set the **statement name** to match the
   Monarch account name exactly (a dropdown suggests them).
4. **Funding & Transfers → Detect deposits.** This sets each account's expected
   per-paycheck deposit from your most recent deposit, not an average.
5. **Funding & Transfers → Auto-link bills**, then **Fix unlinked** for the rest.
6. **Settings → Funding rules.** Cushion is set to $0; pick your hub account
   (the one transfers should come from by default).
7. **Import balances** from the dashboard using your Balances CSV export, or
   type them in manually with "Update balances".

## Publishing

Same as before: upload `index.html`, `manifest.webmanifest`, `service-worker.js`,
and the `icons/` folder to your `cash-tracker` repo, then Settings → Pages →
Deploy from a branch → main → /(root).

On iPhone: open the Pages URL in Safari → Share → Add to Home Screen.

## Data & privacy

Everything stays in your browser's local storage. Nothing is uploaded. Export a
JSON backup from Settings before clearing Safari data or changing phones.
