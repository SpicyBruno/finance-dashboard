# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

One user: Gabriele, the owner, managing his own finances. He opens it often, mostly on the iPhone (installed on the home screen) and sometimes on a desktop browser, to log expenses, check investments and keep the rest of his finances current.

Other users are not in scope. Multi-user support may come later; that decision is deliberately open and nothing should be built for it now.

## Product Purpose

A personal finance dashboard ("Prospetto Finanziario Personale") that keeps the whole picture in one place: net worth and its trend, monthly income and spending, a transaction log, investments against target allocation, projections, mortgage scenarios, monthly snapshots and payslips. Success means the owner can record what happened and see where his money stands in seconds, without handing his data to anyone.

## Positioning

Built around one person's actual finances, not a generic budgeting app:

- reads Italian payslips (cedolini) from PDF or a phone photo and extracts the net pay and month;
- compares the PIP Alleata Previdenza pension plan against an ETF alternative (cost opportunity);
- simulates Italian mortgages with a second scenario side by side;
- runs entirely on the device, with no account and no server.

## Operating Context

- Installed as a PWA on the iPhone home screen; also used in a desktop browser.
- Monthly rhythm: payslip from Università Padova, monthly snapshot of net worth.
- Frequent rhythm: logging income and expenses as they happen, or importing a bank statement (CSV, PDF or photo).
- Holdings tracked: PIP Alleata Previdenza, Bitcoin (Crypto.com), ETF on Scalable Capital (SWDA/VWCE).
- Deployed by Netlify, which auto-deploys from the `main` branch of `SpicyBruno/finance-dashboard`.

## Capabilities and Constraints

Sections: Quadro, Entrate & Spese, Movimenti, Investimenti, Proiezioni, Mutui, Storico, Cedolini.

Binding constraints (confirmed by the owner):

- **Data stays on the device.** Everything lives in the browser's localStorage. No account, no server, no cloud sync. The backup is the owner's own JSON export/import.
- **Works offline.** The installed app must open and work without a connection; the service worker caches the app and its libraries (`vendor/`).

Known tension: PDF and photo reading (pdf.js, tesseract.js) are loaded from a CDN on first use, so the first payslip or statement import needs a connection.

Technical facts: React 18 and Recharts served from `vendor/`; `src/app.jsx` is compiled to `app.js` with Babel (`npm run build`), no bundler. The interface is in Italian with Italian number and date formats; the owner did not make Italian-only a binding constraint.

Removed at the owner's request (October 2026): the Mercati section (Polymarket positions and watchlist, Kelly calculator, crypto Fear & Greed gauge) and the blank `template.html`. Saved Polymarket data is still kept in the data model so existing backups lose nothing.

Open decisions:

- Multi-user support: maybe later, not now.
- The "Roadmap settembre 2026" card in Investimenti refers to a contract renewal date that has passed; the owner has not said what it should say.

## Brand Commitments

Existing names: "Prospetto Finanziario Personale" (full) and "Finanze" (home-screen name). No other brand commitments have been made.

## Evidence on Hand

The real data is the owner's own and lives only on his devices. The defaults in `src/app.jsx` (`DEFAULT_DATA`) mirror his situation (salary, holdings, mortgage parameters). No external content, testimonials or claims exist, and none should be invented.

## Product Principles

1. **Private by construction.** Nothing the owner records leaves the device unless he exports it himself.
2. **Usable with no signal.** Any core task (logging, checking, reviewing) works offline once installed.
3. **Fast to record, quick to read.** He opens it often: entering a transaction or reading his position must take seconds on the phone.
4. **One owner, no speculative scaffolding.** No accounts, sharing or multi-user structure until he asks for it.
5. **Sections earn their place.** What he doesn't use gets removed, as Mercati was, rather than kept as clutter.
