const { useState, useEffect, useMemo, useCallback, useRef } = React;
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar } = Recharts;

/* ── Icons ── */
const Ic = {
  dashboard: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>,
  wallet: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" /><path d="M4 6v14a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>,
  trend: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  chart: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 3 5-6" /></svg>,
  target: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  clock: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  home: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  download: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  upload: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
  reset: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>,
  trash: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
  plus: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  check: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  alert: ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  up: ({ size = 12 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>,
  down: ({ size = 12 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>,
  receipt: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
  candle: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="3" x2="7" y2="21" /><rect x="4" y="7" width="6" height="9" /><line x1="17" y1="3" x2="17" y2="21" /><rect x="14" y="10" width="6" height="7" /></svg>,
  exchange: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>,
  edit: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
  search: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  x: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  theme: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 1 0 9 9 6.6 6.6 0 0 1-9-9Z" /></svg>,
  more: ({ size = 20 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></svg>,
  chevron: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
  calendar: ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  camera: ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
};

/* ── Data ── */
const DEFAULT_DATA = {
  profile: { name: 'Gabriele', month: 'Aprile 2026', notes: 'Universita Padova — contratto fino 09/09/2026' },
  income: [
    { id: 1, label: 'Stipendio netto ricorrente', amount: 1550 },
    { id: 2, label: 'Entrate extra (vigilanza, ecc.)', amount: 0 }
  ],
  fixedExpenses: [
    { id: 1, label: 'Affitto / casa', amount: 350 },
    { id: 2, label: 'Bollette (luce, gas, internet)', amount: 120 },
    { id: 3, label: 'Abbonamenti (streaming, cloud)', amount: 30 },
    { id: 4, label: 'Assicurazioni', amount: 25 },
    { id: 5, label: 'Trasporti fissi', amount: 75 }
  ],
  loans: [
    { id: 1, label: 'Rata telefono', amount: 45, monthsLeft: 8 },
    { id: 2, label: 'Rata computer', amount: 75, monthsLeft: 10 },
    { id: 3, label: 'Altra rata', amount: 30, monthsLeft: 6 }
  ],
  variableExpenses: [
    { id: 1, label: 'Spesa alimentare', amount: 220 },
    { id: 2, label: 'Ristoranti / bar', amount: 80 },
    { id: 3, label: 'Svago / hobby', amount: 50 },
    { id: 4, label: 'Vestiti / cura personale', amount: 50 }
  ],
  investments: [
    { id: 1, label: 'PIP Alleata Previdenza', current: 2843, entryValue: 2500, monthly: 250, type: 'Pensione', risk: 'Medio' },
    { id: 2, label: 'Bitcoin (Crypto.com)', current: 1500, entryValue: 1200, monthly: 50, type: 'Cripto', risk: 'Alto' },
    { id: 3, label: 'ETF Scalable (SWDA/VWCE)', current: 500, entryValue: 500, monthly: 0, type: 'Equity', risk: 'Medio-Alto' }
  ],
  investmentsMeta: {
    targetAllocation: { Equity: 50, Cripto: 10, Pensione: 30, Liquidita: 10 }
  },
  markets: {
    polyPositions: [],
    pnlHistory: [],
    eurUsdRate: 1.08
  },
  liquidity: { current: 5500, targetEmergency: 9000 },
  mortgage: {
    amount: 150000,        // importo richiesto
    years: 25,             // durata in anni (scenario A)
    rate: 3.2,             // TAN annuo % (scenario A)
    rateB: 2.8,            // TAN annuo % scenario B (confronto)
    yearsB: 20,            // durata anni scenario B
    feesUpfront: 3500,     // spese una tantum (istruttoria, perizia, notaio, imposte)
    insuranceMonthly: 25   // assicurazione/polizza mensile
  },
  history: [],
  cedolini: [],
  transactions: [
    { id: 1001, date: '2026-04-28', type: 'income', category: 'Stipendio', description: 'Stipendio aprile — Universita Padova', paymentMethod: 'Bonifico', amount: 1550, status: 'Ricorrente', notes: 'Netto in busta', createdAt: '2026-04-28T08:00:00.000Z', updatedAt: '2026-04-28T08:00:00.000Z' },
    { id: 1002, date: '2026-04-26', type: 'income', category: 'Freelance', description: 'Sito web cliente — saldo fattura', paymentMethod: 'Bonifico', amount: 600, status: 'Completato', notes: 'Fattura 12/2026', createdAt: '2026-04-26T10:30:00.000Z', updatedAt: '2026-04-26T10:30:00.000Z' },
    { id: 1003, date: '2026-04-22', type: 'income', category: 'Rimborsi', description: 'Rimborso spese trasferta', paymentMethod: 'Bonifico', amount: 85, status: 'Completato', notes: '', createdAt: '2026-04-22T09:00:00.000Z', updatedAt: '2026-04-22T09:00:00.000Z' },
    { id: 1004, date: '2026-04-03', type: 'expense', category: 'Affitto / Mutuo', description: 'Affitto appartamento', paymentMethod: 'Bonifico', amount: 350, status: 'Ricorrente', notes: 'Canone mensile', createdAt: '2026-04-03T07:00:00.000Z', updatedAt: '2026-04-03T07:00:00.000Z' },
    { id: 1005, date: '2026-04-05', type: 'expense', category: 'Bollette', description: 'Luce e gas — bimestrale', paymentMethod: 'Addebito diretto', amount: 132.4, status: 'Completato', notes: 'Enel', createdAt: '2026-04-05T07:00:00.000Z', updatedAt: '2026-04-05T07:00:00.000Z' },
    { id: 1006, date: '2026-04-07', type: 'expense', category: 'Abbonamenti', description: 'Netflix + Spotify + iCloud', paymentMethod: 'Carta di credito', amount: 27.97, status: 'Ricorrente', notes: '', createdAt: '2026-04-07T07:00:00.000Z', updatedAt: '2026-04-07T07:00:00.000Z' },
    { id: 1007, date: '2026-04-09', type: 'expense', category: 'Spesa alimentare', description: 'Spesa settimanale supermercato', paymentMethod: 'Carta di debito', amount: 64.2, status: 'Completato', notes: 'Esselunga', createdAt: '2026-04-09T18:00:00.000Z', updatedAt: '2026-04-09T18:00:00.000Z' },
    { id: 1008, date: '2026-04-12', type: 'expense', category: 'Trasporti', description: 'Abbonamento mensile bus', paymentMethod: 'Carta di debito', amount: 38, status: 'Ricorrente', notes: '', createdAt: '2026-04-12T08:00:00.000Z', updatedAt: '2026-04-12T08:00:00.000Z' },
    { id: 1009, date: '2026-04-15', type: 'expense', category: 'Svago', description: 'Cena fuori con amici', paymentMethod: 'Contanti', amount: 32, status: 'Completato', notes: '', createdAt: '2026-04-15T21:30:00.000Z', updatedAt: '2026-04-15T21:30:00.000Z' },
    { id: 1010, date: '2026-04-18', type: 'expense', category: 'Salute', description: 'Visita dentistica', paymentMethod: 'Carta di credito', amount: 80, status: 'Completato', notes: 'Controllo annuale', createdAt: '2026-04-18T11:00:00.000Z', updatedAt: '2026-04-18T11:00:00.000Z' },
    { id: 1011, date: '2026-04-20', type: 'expense', category: 'Shopping', description: 'Scarpe da corsa', paymentMethod: 'PayPal', amount: 89.9, status: 'Completato', notes: '', createdAt: '2026-04-20T16:00:00.000Z', updatedAt: '2026-04-20T16:00:00.000Z' },
    { id: 1012, date: '2026-04-30', type: 'expense', category: 'Tasse', description: 'Acconto imposte — F24', paymentMethod: 'Addebito diretto', amount: 110, status: 'In sospeso', notes: 'Scadenza fine mese', createdAt: '2026-04-25T12:00:00.000Z', updatedAt: '2026-04-25T12:00:00.000Z' },
    { id: 1013, date: '2026-03-28', type: 'income', category: 'Stipendio', description: 'Stipendio marzo — Universita Padova', paymentMethod: 'Bonifico', amount: 1550, status: 'Ricorrente', notes: '', createdAt: '2026-03-28T08:00:00.000Z', updatedAt: '2026-03-28T08:00:00.000Z' },
    { id: 1014, date: '2026-03-15', type: 'income', category: 'Entrate passive', description: 'Dividendi ETF', paymentMethod: 'Bonifico', amount: 18.4, status: 'Completato', notes: '', createdAt: '2026-03-15T08:00:00.000Z', updatedAt: '2026-03-15T08:00:00.000Z' },
    { id: 1015, date: '2026-03-04', type: 'expense', category: 'Affitto / Mutuo', description: 'Affitto appartamento', paymentMethod: 'Bonifico', amount: 350, status: 'Ricorrente', notes: '', createdAt: '2026-03-04T07:00:00.000Z', updatedAt: '2026-03-04T07:00:00.000Z' },
    { id: 1016, date: '2026-03-10', type: 'expense', category: 'Spesa alimentare', description: 'Spesa mensile', paymentMethod: 'Carta di debito', amount: 210.5, status: 'Completato', notes: '', createdAt: '2026-03-10T18:00:00.000Z', updatedAt: '2026-03-10T18:00:00.000Z' }
  ]
};

const INCOME_CATEGORIES = ['Stipendio', 'Freelance', 'Entrate passive', 'Investimenti', 'Rimborsi', 'Altre entrate'];
const EXPENSE_CATEGORIES = ['Affitto / Mutuo', 'Spesa alimentare', 'Trasporti', 'Bollette', 'Abbonamenti', 'Salute', 'Istruzione', 'Svago', 'Shopping', 'Tasse', 'Altre uscite'];
const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
const PAYMENT_METHODS = ['Bonifico', 'Carta di debito', 'Carta di credito', 'Contanti', 'PayPal', 'Addebito diretto'];
const TX_STATUSES = ['Completato', 'In sospeso', 'Ricorrente'];

const STORAGE_KEY = 'gabriele_finance_dashboard_v4';
const LEGACY_KEY = 'gabriele_finance_dashboard_v3';
const THEME_KEY = 'gabriele_finance_dashboard_theme';
const fmt = (n) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n || 0);
const fmtEUR2 = (n) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n || 0);
const fmtUSD = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n || 0);
const fmtPct = (n) => isFinite(n) ? `${(n * 100).toFixed(1)}%` : '0.0%';
const fmtPct2 = (n) => isFinite(n) ? `${(n * 100).toFixed(2)}%` : '0.00%';

/* ── Movimenti: calcoli (puri, riutilizzabili, testabili) ── */
const txSum = (list) => (list || []).reduce((s, t) => s + Math.abs(Number(t.amount) || 0), 0);
function txTotals(list) {
  const inc = (list || []).filter(t => t.type === 'income');
  const exp = (list || []).filter(t => t.type === 'expense');
  const totalIncome = txSum(inc);
  const totalExpenses = txSum(exp);
  return { totalIncome, totalExpenses, netBalance: totalIncome - totalExpenses };
}
function monthlyTotals(list) {
  const map = {};
  (list || []).forEach(t => {
    const key = (t.date || '').slice(0, 7);
    if (!key) return;
    if (!map[key]) map[key] = { income: 0, expenses: 0, net: 0 };
    const amt = Math.abs(Number(t.amount) || 0);
    if (t.type === 'income') map[key].income += amt; else map[key].expenses += amt;
    map[key].net = map[key].income - map[key].expenses;
  });
  return map;
}
const savingsRate = (income, expenses) => (income > 0 ? (income - expenses) / income : 0);
function filterTransactions(list, f) {
  f = f || {};
  const q = (f.query || '').trim().toLowerCase();
  return (list || []).filter(t => {
    if (f.type && f.type !== 'all' && t.type !== f.type) return false;
    if (f.category && f.category !== 'all' && t.category !== f.category) return false;
    if (f.from && (t.date || '') < f.from) return false;
    if (f.to && (t.date || '') > f.to) return false;
    if (q) {
      const hay = `${t.description || ''} ${t.notes || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
function sortTransactions(list, key, dir) {
  const arr = [...(list || [])];
  const sign = dir === 'asc' ? 1 : -1;
  arr.sort((a, b) => {
    let av, bv;
    if (key === 'amount') { av = Math.abs(Number(a.amount) || 0); bv = Math.abs(Number(b.amount) || 0); }
    else { av = (a[key] ?? '').toString().toLowerCase(); bv = (b[key] ?? '').toString().toLowerCase(); }
    if (av < bv) return -1 * sign;
    if (av > bv) return 1 * sign;
    return 0;
  });
  return arr;
}

/* ── Mutui: calcoli (ammortamento alla francese) ── */
function monthlyPayment(P, annualRatePct, years) {
  P = Number(P) || 0; const n = (Number(years) || 0) * 12;
  if (n <= 0) return 0;
  const i = (Number(annualRatePct) || 0) / 100 / 12;
  if (i === 0) return P / n;
  return P * i / (1 - Math.pow(1 + i, -n));
}
function amortizationSchedule(P, annualRatePct, years) {
  P = Number(P) || 0; const n = (Number(years) || 0) * 12;
  const i = (Number(annualRatePct) || 0) / 100 / 12;
  const pay = monthlyPayment(P, annualRatePct, years);
  const rows = []; let balance = P; let cumInterest = 0;
  for (let m = 1; m <= n; m++) {
    const interest = balance * i;
    let principal = pay - interest;
    if (m === n || principal > balance) principal = balance;
    balance = Math.max(0, balance - principal);
    cumInterest += interest;
    rows.push({ month: m, year: Math.ceil(m / 12), payment: pay, interest, principal, balance, cumInterest });
  }
  return rows;
}
// TAEG indicativo: tasso che annulla il VAN includendo spese una tantum e polizza mensile.
function effectiveAPR(P, annualRatePct, years, feesUpfront, insuranceMonthly) {
  P = Number(P) || 0; const n = (Number(years) || 0) * 12;
  if (P <= 0 || n <= 0) return 0;
  const pay = monthlyPayment(P, annualRatePct, years) + (Number(insuranceMonthly) || 0);
  const net = P - (Number(feesUpfront) || 0); // erogato effettivo al cliente
  const npv = (r) => { let v = -net; for (let m = 1; m <= n; m++) v += pay / Math.pow(1 + r, m); return v; };
  let lo = 0, hi = 1; // tasso mensile
  if (npv(lo) * npv(hi) > 0) return Math.pow(1 + (Number(annualRatePct) || 0) / 100 / 12, 12) - 1;
  for (let k = 0; k < 80; k++) { const mid = (lo + hi) / 2; if (npv(lo) * npv(mid) <= 0) hi = mid; else lo = mid; }
  const rMonthly = (lo + hi) / 2;
  return Math.pow(1 + rMonthly, 12) - 1;
}

function normalizeData(parsed) {
  return {
    ...DEFAULT_DATA,
    ...parsed,
    cedolini: parsed.cedolini || [],
    transactions: parsed.transactions || DEFAULT_DATA.transactions,
    investments: (parsed.investments || DEFAULT_DATA.investments).map(i => ({ entryValue: 0, ...i })),
    investmentsMeta: {
      ...DEFAULT_DATA.investmentsMeta,
      ...(parsed.investmentsMeta || {}),
      targetAllocation: {
        ...DEFAULT_DATA.investmentsMeta.targetAllocation,
        ...(parsed.investmentsMeta?.targetAllocation || {})
      }
    },
    markets: {
      ...DEFAULT_DATA.markets,
      ...(parsed.markets || {}),
      polyPositions: parsed.markets?.polyPositions || [],
      pnlHistory: parsed.markets?.pnlHistory || [],
      eurUsdRate: parsed.markets?.eurUsdRate ?? DEFAULT_DATA.markets.eurUsdRate
    },
    mortgage: { ...DEFAULT_DATA.mortgage, ...(parsed.mortgage || {}) }
  };
}

// Converte "Aprile 2026" → "2026-04", "Gennaio 2026" → "2026-01", ecc.
const MESI_IT = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
function profileMonthToISO(monthLabel) {
  if (!monthLabel) return '';
  const parts = monthLabel.trim().toLowerCase().split(/\s+/);
  if (parts.length < 2) return '';
  const mIdx = MESI_IT.indexOf(parts[0]);
  if (mIdx === -1) return '';
  const year = parts[1];
  return `${year}-${String(mIdx + 1).padStart(2, '0')}`;
}

const C = {
  bg: 'var(--bg)', card: 'var(--card-solid)', cardHover: 'var(--card-hover)',
  border: 'var(--border)', borderLight: 'var(--border-light)',
  text: 'var(--text)', textDim: 'var(--text-dim)', textMuted: 'var(--text-muted)',
  gold: 'var(--gold)', goldDim: 'var(--gold-dim)',
  rust: 'var(--rust)', sage: 'var(--sage)', danger: 'var(--danger)',
  purple: 'var(--purple)', teal: 'var(--teal)', onAccent: 'var(--on-accent)'
};
/* Rampa ordinata per il denaro che esce: dal più pesante al più leggero.
   Prima erano cinque tinte scorrelate alla stessa luminosità, quindi nessuna
   emergeva e l'ordine di grandezza non si leggeva. */
const OUTFLOW = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
const RETAINED = 'var(--chart-retained)';
const rampColor = (i, n) => OUTFLOW[Math.min(OUTFLOW.length - 1, Math.round((i / Math.max(1, n - 1)) * (OUTFLOW.length - 1)))];

/* Il numero sale una volta sola, all'ingresso. Con moto ridotto arriva già al
   valore finale: nessuno stato intermedio da guardare. */
function useCountUp(target, duration = 700) {
  const [shown, setShown] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = fromRef.current;
    fromRef.current = target;
    if (reduce || from === target || !isFinite(target)) { setShown(target); return; }
    let raf; const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return shown;
}

/* Recharts vuole un'altezza numerica, non un clamp CSS: senza questo i
   grafici restavano alti 300-400px anche su uno schermo da 390px. */
function useIsNarrow(maxWidth = 780) {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${maxWidth}px)`).matches);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const on = (e) => setNarrow(e.matches);
    mq.addEventListener('change', on);
    setNarrow(mq.matches);
    return () => mq.removeEventListener('change', on);
  }, [maxWidth]);
  return narrow;
}

/* ── Scala dei grafici ──
   Una sola per tutte le schede. Prima ogni grafico aveva la sua altezza
   fissa (340px per i mutui anche su un telefono da 390px), l'asse Y largo
   60px di default e una legenda Recharts che andava a capo dentro l'area
   disegnata, rubandole altezza. */
function useChartScale() {
  const narrow = useIsNarrow();
  return useMemo(() => ({
    narrow,
    h: (desktop, phone) => (narrow ? phone : desktop),
    yWidth: narrow ? 40 : 52,
    axis: { stroke: C.textMuted, tick: { fontSize: narrow ? 10 : 11 }, tickLine: false },
    minTickGap: narrow ? 14 : 6,
    margin: { top: 8, right: narrow ? 6 : 14, left: 0, bottom: 0 }
  }), [narrow]);
}

/* Etichette d'asse compatte: "1,5k" invece di "1500€", che a 390px si
   sovrapponevano o venivano tagliate dall'asse */
const fmtTick = (v) => {
  const n = Number(v) || 0;
  const a = Math.abs(n);
  if (a >= 1000) return `${(n / 1000).toLocaleString('it-IT', { maximumFractionDigits: a >= 10000 ? 0 : 1 })}k`;
  return `${Math.round(n)}€`;
};

/* Un solo stile per i tooltip: prima era ricopiato identico in quattro
   posti. Il cursore di Recharts era un rettangolo grigio chiaro (#ccc) che
   sul tema scuro accecava a ogni passaggio. */
const TT = {
  contentStyle: { background: C.bg, border: `1px solid ${C.gold}`, fontFamily: 'var(--font-number)', fontSize: 12, color: C.text, borderRadius: 4 },
  itemStyle: { color: C.textDim },
  labelStyle: { color: C.gold }
};
const TT_LINE = { ...TT, cursor: { stroke: 'var(--border-light)', strokeWidth: 1 } };
const TT_BAR = { ...TT, cursor: { fill: 'var(--surface-hover)' } };

/* Legenda in HTML sopra il grafico */
function ChartLegend({ items, shape = 'line' }) {
  return (
    <div className="chart-legend">
      {items.map(it => (
        <span key={it.label}><span className={`swatch ${shape}`} style={{ background: it.color }} />{it.label}</span>
      ))}
    </div>
  );
}

/* Ciambella con raggi in percentuale: prima erano 90px fissi e, nella
   colonna a metà larghezza del telefono, il disco usciva dalla scheda. Il
   totale al centro sta nella stessa scatola del grafico: prima stava in una
   più alta di 30px e scendeva sotto il centro. */
function Donut({ data, colors, height, center }) {
  return (
    <div className="donut-box" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="66%" outerRadius="94%"
            paddingAngle={2} stroke="var(--card-solid)" strokeWidth={2}>
            {data.map((d, i) => <Cell key={d.name + i} fill={colors[i % colors.length]} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {center && <div className="donut-center">{center}</div>}
    </div>
  );
}

/* Gli spicchi senza nome non dicevano niente: ogni colore ha la sua riga,
   con il valore e la quota. Sostituisce anche il tooltip, che sul telefono
   copriva il totale al centro. */
function DonutLegend({ data, colors }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="donut-legend">
      {data.map((d, i) => (
        <div key={d.name + i} className="legend-row">
          <span className="swatch" style={{ background: colors[i % colors.length] }} />
          <span className="legend-name" title={d.name}>{d.name}</span>
          <span className="legend-value">{fmt(d.value)}</span>
          <span className="legend-share">{fmtPct(d.value / Math.max(1, total))}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Hero di sezione ──
   Lo stesso livello 1 del Quadro, ora in ogni scheda: un numero solo alla
   scala grande e accanto il dato che lo spiega. Prima le altre sezioni
   aprivano con quattro riquadri identici in fila, e niente contava più di
   niente. */
function PageHero({ label, value, format = fmt, tone, meta, aside, foot, footClass = '' }) {
  const numeric = typeof value === 'number' && isFinite(value);
  const shown = useCountUp(numeric ? value : 0);
  return (
    <section className="card-hero reveal">
      <div className={aside ? 'hero-grid' : undefined}>
        <div>
          <div className="hero-label">{label}</div>
          <div className="hero-value" style={tone ? { color: tone } : undefined}>{numeric ? format(shown) : value}</div>
          {meta && <div className="hero-meta">{meta}</div>}
        </div>
        {aside && <div className="hero-aside">{aside}</div>}
      </div>
      {foot && <div className={`hero-foot ${footClass}`}>{foot}</div>}
    </section>
  );
}

function HeroDelta({ up, children }) {
  return <span className={`hero-delta ${up ? 'up' : 'down'}`}>{up ? <Ic.up /> : <Ic.down />}{children}</span>;
}

/* Livello 3: nessun riquadro, un bordo per il gruppo e filetti fra le celle */
function StatStrip({ items, delay = 60 }) {
  return (
    <div className="stat-strip reveal" data-cols={items.length} style={{ animationDelay: `${delay}ms`, '--cols': items.length }}>
      {items.map(it => (
        <div key={it.label} className={`stat-tile ${it.key ? 'stat-key' : ''}`}>
          <div className="stat-label">{it.label}</div>
          <div className="stat-value" style={it.color ? { color: it.color } : undefined}>
            {it.value}{it.unit && <span className="unit">{it.unit}</span>}
          </div>
          {it.hint && <div className="stat-hint">{it.hint}</div>}
          {it.extra}
        </div>
      ))}
    </div>
  );
}

function TrendTag({ trend, invert }) {
  if (trend === null || trend === undefined || !isFinite(trend) || trend === 0) return null;
  const good = invert ? trend < 0 : trend > 0;
  const TrendIc = trend >= 0 ? Ic.up : Ic.down;
  return <span className="trend-tag" style={{ color: good ? C.sage : C.rust }}><TrendIc /> {fmtPct(Math.abs(trend))}</span>;
}

/* Barre "da cosa è fatto": nate nell'hero del Quadro, ora condivise. Con
   `target` compare una tacca sul valore obiettivo. */
function PartBars({ title, parts, total }) {
  return (
    <div>
      {title && <div className="aside-label">{title}</div>}
      {parts.map(p => {
        const fill = p.fill !== undefined ? p.fill : p.value / Math.max(1, total);
        const share = p.share !== undefined ? p.share : fmtPct(p.value / Math.max(1, total));
        return (
          <div key={p.name} className="part-row">
            <div className="part-head">
              <span className="part-name">{p.name}</span>
              <span className="part-value">{p.display !== undefined ? p.display : fmt(p.value)}{share && <span className="part-share">{share}</span>}</span>
            </div>
            <div className="progress-track" style={{ height: 6 }}>
              <div className="progress-fill" style={{ '--fill': Math.max(0, Math.min(1, fill)), background: p.color }} />
              {p.target !== undefined && <span className="target-tick" style={{ left: `${Math.max(0, Math.min(100, p.target))}%` }} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Sparkline: solo la forma dell'andamento, senza assi né griglia.
   Disegna i valori reali dello storico, non un ornamento. */
function Sparkline({ points, color = C.gold, width = 260, height = 68 }) {
  /* Il tratteggio dell'animazione si misura in pixel dello schermo (per via
     di vector-effect), non nelle unità del viewBox: con la lunghezza del
     viewBox la linea, stirata in larghezza, restava disegnata a metà con un
     buco in mezzo. Si ricalcola sulla larghezza reale. */
  const svgRef = useRef(null);
  const [scaleX, setScaleX] = useState(1);
  React.useLayoutEffect(() => {
    if (svgRef.current && svgRef.current.clientWidth) setScaleX(svgRef.current.clientWidth / width);
  }, [width, points && points.length]);
  if (!points || points.length < 2) return null;
  const min = Math.min(...points), max = Math.max(...points);
  const span = max - min;
  const stepX = width / (points.length - 1);
  // Valori tutti uguali: linea a metà altezza, non schiacciata sul fondo
  const coords = points.map((v, i) => [i * stepX, span ? height - ((v - min) / span) * (height - 8) - 4 : height / 2]);
  const d = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const len = coords.reduce((s, c, i) => i === 0 ? 0 : s + Math.hypot((c[0] - coords[i - 1][0]) * scaleX, c[1] - coords[i - 1][1]), 0);
  return (
    <svg ref={svgRef} className="hero-spark" viewBox={`0 0 ${width} ${height}`} width="100%" height={height}
      preserveAspectRatio="none" aria-hidden="true" style={{ '--spark-len': Math.ceil(len) + 4 }}>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* Arco del tasso di risparmio: prima occupava un riquadro alto 350px con
   dentro 200px di grafico e il resto aria. Qui sta accanto al numero. */
function SavingArc({ rate, size = 62 }) {
  const color = rate >= 0.2 ? C.sage : rate >= 0.1 ? C.gold : C.rust;
  return <ArcMeter pct={rate / 0.5} color={color} size={size} />;
}

/* Lo stesso arco, per qualunque quota da 0 a 1 (es. il win rate dei mercati) */
function ArcMeter({ pct: rawPct, color, size = 62 }) {
  const pct = Math.max(0, Math.min(1, rawPct || 0));
  const r = (size - 7) / 2, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth="5" />
      {/* A zero l'arco non si disegna: il capo arrotondato lasciava un puntino */}
      {pct > 0 && (
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={`${(circ * pct).toFixed(1)} ${circ.toFixed(1)}`}
          transform={`rotate(-90 ${cx} ${cy})`} />
      )}
    </svg>
  );
}

/* Elenco ordinato delle spese: sostituisce la torta a dieci spicchi le cui
   etichette venivano tagliate a metà parola e sul telefono sparivano. */
function RankedList({ items, max = 8 }) {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((s, i) => s + i.value, 0);
  const head = sorted.slice(0, max);
  const restValue = sorted.slice(max).reduce((s, i) => s + i.value, 0);
  const rows = restValue > 0 ? [...head, { name: `Altre ${sorted.length - max} voci`, value: restValue }] : head;
  const top = rows.length ? rows[0].value : 1;
  if (!rows.length) return <div style={{ color: C.textMuted, fontSize: 13, padding: '18px 0' }}>Nessuna spesa registrata.</div>;
  return (
    <div>
      {rows.map((r, i) => (
        <div key={r.name + i} className="rank-row">
          <div className="rank-name" title={r.name}>{r.name}</div>
          <div className="rank-value">{fmt(r.value)}<span className="rank-share" style={{ marginLeft: 8 }}>{fmtPct(r.value / Math.max(1, total))}</span></div>
          <div className="rank-bar">
            <span style={{ width: `${Math.max(2, (r.value / top) * 100)}%`, background: rampColor(i, rows.length) }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* Foglio dal basso: una sola implementazione per "Altro", il mese e le azioni */
function Sheet({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const f = ref.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.activeElement;
    const t = setTimeout(() => { const b = ref.current?.querySelector('button'); if (b) b.focus(); }, 30);
    return () => { document.removeEventListener('keydown', onKey); clearTimeout(t); if (prev && prev.focus) prev.focus(); };
  }, [onClose]);
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" ref={ref} role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet-handle" />
        {title && <div className="sheet-title">{title}</div>}
        {children}
      </div>
    </>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return <div className="toast">{message}</div>;
}

/* ── RadialGauge ── */
function RadialGauge({ value, max = 1, label, sub, color = C.gold, size = 160 }) {
  const pct = Math.max(0, Math.min(1, max > 0 ? value / max : 0));
  const data = [{ name: 'v', value: pct * 100, fill: color }];
  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: size }}>
      <ResponsiveContainer width="100%" height={size}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="72%" outerRadius="100%" barSize={12} data={data} startAngle={220} endAngle={-40}>
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <RadialBar dataKey="value" cornerRadius={8} fill="url(#gaugeGrad)" background={false} />
          <Tooltip contentStyle={{ display: 'none' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', textAlign: 'center' }}>
        <div className="display-font number-display" style={{ fontSize: 32, color: color, lineHeight: 1 }}>{label}</div>
        {sub && <div className="mono-font" style={{ fontSize: 11, color: C.textDim, marginTop: 6, letterSpacing: '0.08em' }}>{sub}</div>}
      </div>
    </div>
  );
}
/* ── Sidebar (solo desktop) ── */
function Sidebar({ tabs, activeTab, onChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo" title="G">G</div>
      {tabs.map(t => {
        const Icon = t.icon;
        return (
          <button key={t.id} className={`side-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => onChange(t.id)} aria-label={t.label}>
            <Icon />
            <span className="side-label">{t.label}</span>
            <span className="tooltip">{t.label}</span>
          </button>
        );
      })}
    </aside>
  );
}

/* ── Navigazione mobile ──
   Quattro destinazioni fisse più "Altro". Prima le nove voci stavano in uno
   scroller orizzontale: etichette tagliate e Storico/Cedolini di fatto
   irraggiungibili senza sapere che si poteva scorrere. */
const PRIMARY_TABS = ['overview', 'transactions', 'investments', 'projection'];

function MobileNav({ tabs, activeTab, onChange }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const primary = PRIMARY_TABS.map(id => tabs.find(t => t.id === id)).filter(Boolean);
  const secondary = tabs.filter(t => !PRIMARY_TABS.includes(t.id));
  const inSheet = secondary.some(t => t.id === activeTab);
  const shortLabel = { overview: 'Quadro', transactions: 'Movimenti', investments: 'Investim.', projection: 'Proiezioni' };
  return (
    <>
      <nav className="mobile-nav" aria-label="Sezioni">
        {primary.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} className={`nav-btn ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => onChange(t.id)} aria-current={activeTab === t.id ? 'page' : undefined}>
              <Icon />
              <span className="nav-label">{shortLabel[t.id] || t.label}</span>
            </button>
          );
        })}
        <button className={`nav-btn ${inSheet ? 'active' : ''}`} onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog" aria-expanded={sheetOpen}>
          <Ic.more />
          <span className="nav-label">Altro</span>
        </button>
      </nav>
      {sheetOpen && (
        <Sheet title="Altre sezioni" onClose={() => setSheetOpen(false)}>
          {secondary.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} className={`sheet-row ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => { onChange(t.id); setSheetOpen(false); }}>
                <Icon />
                <span>{t.label}</span>
                <span className="sheet-chevron"><Ic.chevron /></span>
              </button>
            );
          })}
        </Sheet>
      )}
    </>
  );
}

/* ── Reusable ── */
function Section({ title, total, children, accent }) {
  return (
    <section className="bento-card span-12">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18, borderBottom: `1px solid ${C.border}`, paddingBottom: 12 }}>
        <h3 className="display-font" style={{ margin: 0, fontSize: 20, fontWeight: 400 }}>
          <span style={{ color: accent, marginRight: 8 }}>◆</span>
          <span style={{ fontStyle: 'italic' }}>{title}</span>
        </h3>
        {total !== undefined && <span className="mono-font" style={{ fontSize: 15, color: accent }}>{fmt(total)}</span>}
      </div>
      {children}
    </section>
  );
}
/* Sul telefono la griglia passava a due colonne con tre figli: il cestino
   finiva da solo su una riga, sotto ogni voce. Ora ha la sua colonna; con
   più di un numero (le rate) il nome prende una riga intera e sopra i numeri
   c'è un'intestazione, che prima mancava anche sul desktop. */
function DataTable({ items, section, onUpdate, onRemove, fields, fieldLabels }) {
  const cols = fields.length === 2 ? '2fr 1fr auto' : `2fr repeat(${fields.length - 1}, 1fr) auto`;
  const labelOf = (f) => (fieldLabels && fieldLabels[f]) || (f === 'label' ? 'Voce' : 'Importo');
  return (
    <div>
      {fields.length > 2 && (
        <div className="data-head data-edit-row" data-fields={fields.length} style={{ display: 'grid', gridTemplateColumns: cols, gap: 12 }} aria-hidden="true">
          {fields.map(f => <span key={f} style={f !== 'label' ? { textAlign: 'right' } : undefined}>{labelOf(f)}</span>)}
          <span />
        </div>
      )}
      {items.map(item => (
        <div key={item.id} className="data-row data-edit-row" data-fields={fields.length} style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, alignItems: 'center', padding: '4px 0' }}>
          {fields.map(f => (
            <input key={f} type={f === 'label' ? 'text' : 'number'} inputMode={f === 'label' ? undefined : 'decimal'} value={item[f]}
              onChange={e => onUpdate(section, item.id, f, e.target.value)} className={f === 'label' ? 'input-label' : 'input-cell'}
              placeholder={labelOf(f)} aria-label={labelOf(f)} style={f !== 'label' ? { textAlign: 'right' } : {}} />
          ))}
          <button className="row-delete" onClick={() => onRemove(section, item.id)} aria-label={`Elimina ${item.label || 'voce'}`} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer', padding: 4 }}><Ic.trash /></button>
        </div>
      ))}
    </div>
  );
}
function AddBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ marginTop: 16, background: 'transparent', border: `1px dashed ${C.border}`, color: C.textMuted, padding: '10px 16px', cursor: 'pointer', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, transition: 'all 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}>
      <Ic.plus /> Aggiungi voce
    </button>
  );
}
function DiagnosticItem({ ok, title, text }) {
  return (
    <div style={{ borderLeft: `1px solid ${ok ? C.sage : C.rust}`, paddingLeft: 14 }}>
      <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: ok ? C.sage : C.rust, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: C.textDim, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}

/* ── Parser cedolini / estratti conto ── */
function meseItToNum(name) {
  const idx = MESI_IT.indexOf(String(name || '').toLowerCase());
  return idx === -1 ? null : String(idx + 1).padStart(2, '0');
}

function parseItalianAmount(str) {
  if (!str) return null;
  let s = String(str).trim().replace(/[€\s]/g, '');
  const hasComma = s.includes(','); const hasDot = s.includes('.');
  // Con entrambi i separatori il decimale è l'ultimo dei due: vale per
  // "1.550,00" e anche per "1,550.00" (che prima diventava 1,55)
  if (hasComma && hasDot) {
    s = s.lastIndexOf(',') > s.lastIndexOf('.') ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
  }
  else if (hasComma) { s = s.replace(',', '.'); }
  else if (hasDot && /\.\d{3}(\D|$)/.test(s) && !/\.\d{1,2}$/.test(s)) { s = s.replace(/\./g, ''); }
  const n = parseFloat(s);
  return isFinite(n) ? n : null;
}

/* Importi con i decimali, come compaiono in busta paga. Prima mancava il
   confine dopo l'ultima cifra: in "1550,00" la prima alternativa si fermava
   a "155" e il netto proposto era dieci volte più piccolo. Niente lookbehind:
   su Safari prima della 16.4 una regex che lo usa non si compila e manda giù
   l'intera app. */
const DOC_AMOUNT_RE = /(^|[^0-9.,])(\d{1,3}(?:\.\d{3})+,\d{2}|\d{1,3}(?:,\d{3})+\.\d{2}|\d+,\d{2}|\d+\.\d{2})(?![0-9])/g;

function findDocAmounts(text) {
  const out = [];
  const re = new RegExp(DOC_AMOUNT_RE.source, 'g');
  let m;
  while ((m = re.exec(text)) !== null) {
    const value = parseItalianAmount(m[2]);
    if (value !== null) out.push({ value, index: m.index + m[1].length });
  }
  return out;
}

const NETTO_KEYWORDS = [
  'netto a pagare', 'netto del mese', 'netto in busta', 'netto bonifico', 'netto da corrispondere',
  'totale netto', 'importo netto', 'totale competenze nette', 'totale a pagare', 'netto'
];

function parseFinancialDoc(text) {
  const result = { month: null, netto: null, candidates: [] };
  if (!text) return result;
  const lower = text.toLowerCase().replace(/\s+/g, ' ');
  const mesi = MESI_IT.join('|');

  // Mese: prima quello accanto a "periodo", "mese", "competenza" — il primo
  // "gennaio 2024" del documento poteva essere la data di assunzione
  const nearName = lower.match(new RegExp('(?:periodo|mese|competenza|retribuzione)[^a-z0-9]{0,30}(' + mesi + ')[^a-z0-9]{0,3}(20\\d{2})'));
  const nearNum = lower.match(/(?:periodo|mese|competenza)[^0-9]{0,30}(0[1-9]|1[0-2])[\/\-](20\d{2})\b/);
  const anyName = lower.match(new RegExp('\\b(' + mesi + ')\\s+(20\\d{2})\\b'));
  if (nearName) result.month = nearName[2] + '-' + meseItToNum(nearName[1]);
  else if (nearNum) result.month = nearNum[2] + '-' + nearNum[1];
  else if (anyName) result.month = anyName[2] + '-' + meseItToNum(anyName[1]);
  else {
    const m2 = lower.match(/\b(0[1-9]|1[0-2])[\/\-](20\d{2})\b/);
    const m3 = lower.match(/\b(20\d{2})[\/\-](0[1-9]|1[0-2])\b/);
    if (m2) result.month = m2[2] + '-' + m2[1];
    else if (m3) result.month = m3[1] + '-' + m3[2];
  }

  const amounts = findDocAmounts(lower);
  const seen = new Set();
  const push = (value, keyword) => {
    const k = value.toFixed(2);
    if (seen.has(k)) return;
    seen.add(k);
    result.candidates.push({ value, keyword });
  };

  // Netto: il primo importo che segue la parola chiave entro 80 caratteri.
  // Prima doveva starle attaccato, ma pdf.js mette spesso in mezzo le altre
  // colonne della riga.
  for (const kw of NETTO_KEYWORDS) {
    let from = 0, idx;
    while ((idx = lower.indexOf(kw, from)) !== -1) {
      from = idx + kw.length;
      const hit = amounts.find(a => a.index >= from && a.index - from <= 80 && a.value >= 100 && a.value < 100000);
      if (hit) { push(hit.value, kw); break; }
    }
  }
  result.netto = result.candidates.length ? result.candidates[0].value : null;

  // Gli altri importi plausibili diventano proposte da toccare. Prima il più
  // grande del documento diventava da solo il netto: quasi sempre era il lordo.
  amounts
    .filter(a => a.value >= 300 && a.value <= 20000)
    .sort((a, b) => b.value - a.value)
    .forEach(a => push(a.value, null));
  result.candidates = result.candidates.slice(0, 6);
  return result;
}

/* ── Caricamento su richiesta di pdf.js e tesseract.js ──
   Pesano insieme diversi MB e servono solo a chi importa un cedolino o un
   estratto conto: caricarli all'avvio rallentava ogni apertura dell'app. */
const scriptCache = {};
function loadScript(src) {
  if (scriptCache[src]) return scriptCache[src];
  scriptCache[src] = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.onload = () => resolve();
    el.onerror = () => {
      delete scriptCache[src];
      const err = new Error(`Impossibile caricare ${src}`);
      err.code = 'LOAD';
      reject(err);
    };
    document.head.appendChild(el);
  });
  return scriptCache[src];
}

/* Versioni fissate di proposito. Un @5 senza patch segue la CDN: è così che
   @babel/standalone era scivolato alla v8 e aveva lasciato la pagina bianca
   (vedi il commit "Fix blank page: pin @babel/standalone to 7.x"). */
const PDFJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const TESSERACT_URL = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js';

async function ensurePdfJs(onProgress) {
  if (window.pdfjsLib) return window.pdfjsLib;
  if (onProgress) onProgress('Carico il lettore PDF…');
  await loadScript(PDFJS_URL);
  if (!window.pdfjsLib) throw new Error('PDF.js non disponibile');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
  return window.pdfjsLib;
}

async function ensureTesseract(onProgress) {
  if (window.Tesseract) return window.Tesseract;
  if (onProgress) onProgress('Carico il motore OCR…');
  await loadScript(TESSERACT_URL);
  if (!window.Tesseract) throw new Error('Tesseract.js non disponibile');
  return window.Tesseract;
}

/* Le foto del telefono arrivano a 12 MP e con la rotazione scritta solo
   nell'EXIF. Date così a Tesseract finivano la memoria di Safari su iPhone,
   e un cedolino fotografato in verticale veniva letto di traverso. Un <img>
   applica già la rotazione: lo si ridisegna rimpicciolito e in grigio. */
function prepareImageForOcr(file, maxSide = 2000) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) { reject(new Error('IMAGE_DECODE')); return; }
      const scale = Math.min(1, maxSide / Math.max(w, h));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      const ctx = canvas.getContext('2d');
      ctx.filter = 'grayscale(1) contrast(1.15)'; // ignorato dove non è supportato
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('IMAGE_DECODE')); };
    img.src = url;
  });
}

const ocrLogger = (report) => (m) => {
  if (m.status === 'recognizing text') report('Riconosco il testo…', m.progress);
  else if (m.status) report('Preparo il riconoscimento del testo…', null);
};

/* onProgress(messaggio, quota 0–1 oppure null se non si sa quanto manca) */
async function extractTextFromFile(file, onProgress) {
  const report = (msg, pct) => onProgress && onProgress(msg, pct);
  const name = (file.name || '').toLowerCase();
  const isPdf = name.endsWith('.pdf') || file.type === 'application/pdf';
  if (isPdf) {
    await ensurePdfJs(report);
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    let full = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      report(`Leggo la pagina ${i} di ${pdf.numPages}…`, i / pdf.numPages);
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      full += content.items.map(it => it.str).join(' ') + '\n';
    }
    if (full.replace(/\s/g, '').length < 30) {
      // PDF probabilmente scansionato → OCR sulla prima pagina
      report('PDF scansionato: riconosco il testo…', null);
      const Tesseract = await ensureTesseract(report);
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width; canvas.height = viewport.height;
      await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
      const { data } = await Tesseract.recognize(canvas, 'ita', { logger: ocrLogger(report) });
      full = data.text || '';
    }
    return full;
  }
  // Immagini → OCR
  if ((file.type || '').startsWith('image/') || /\.(jpe?g|png|heic|heif|webp)$/.test(name)) {
    const Tesseract = await ensureTesseract(report);
    report('Preparo la foto…', null);
    const canvas = await prepareImageForOcr(file);
    const { data } = await Tesseract.recognize(canvas, 'ita', { logger: ocrLogger(report) });
    return data.text || '';
  }
  throw new Error('UNSUPPORTED');
}

/* Un errore che dice cosa fare, non solo cosa è successo */
function describeImportError(e) {
  const msg = (e && e.message) || String(e || '');
  if ((e && e.code === 'LOAD') || (typeof navigator !== 'undefined' && navigator.onLine === false)) {
    return 'Il lettore dei PDF e il riconoscimento del testo si scaricano da internet al primo uso: collegati e riprova.';
  }
  if (msg === 'UNSUPPORTED') return 'Formato non supportato: scegli un PDF oppure una foto (JPEG, PNG o HEIC).';
  if (msg === 'IMAGE_DECODE') return 'Non riesco ad aprire questa foto. Riprova scattandola dal pulsante della fotocamera, oppure salvala in JPEG.';
  if (/password/i.test(msg) || (e && e.name === 'PasswordException')) return 'Il PDF è protetto da password: aprilo, salvane una copia senza protezione e riprova.';
  return `Non sono riuscito a leggere il file (${msg}). Puoi comunque inserire i dati a mano.`;
}

/* ── Parser estratti conto → movimenti ── */
function parseStatementDate(s) {
  if (!s) return null;
  s = String(s).trim().replace(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/, (_, y, m, d) => `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
  let m = s.match(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})\b/);
  if (m) { let y = m[3]; if (y.length === 2) y = '20' + y; return `${y}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`; }
  m = s.match(/\b(\d{4})[\/.\-](\d{1,2})[\/.\-](\d{1,2})\b/);
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  return null;
}

function parseCSVRows(text) {
  const sample = (text.split(/\r?\n/).find(l => l.trim()) || '');
  const delim = (sample.split(';').length > sample.split(',').length) ? ';' : ',';
  const rows = []; let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; }
      else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === delim) { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* skip */ }
      else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.map(r => r.map(x => String(x).trim())).filter(r => r.some(x => x.length));
}

function parseStatementCSV(text) {
  if (!text) return [];
  const rows = parseCSVRows(text);
  if (!rows.length) return [];
  // Trova la riga di intestazione
  let headerIdx = -1;
  for (let i = 0; i < Math.min(rows.length, 20); i++) {
    const joined = rows[i].join(' ').toLowerCase();
    if (/\bdata\b/.test(joined) && /(importo|amount|dare|avere|entrate|uscite|accredit|addebit|valore)/.test(joined)) { headerIdx = i; break; }
  }
  if (headerIdx === -1) return [];
  const header = rows[headerIdx].map(h => h.toLowerCase());
  const findCol = (...res) => header.findIndex(h => res.some(re => re.test(h)));
  const dateIdx = (() => {
    const pref = header.findIndex(h => /data.*(valuta|oper|contab)/.test(h));
    return pref !== -1 ? pref : findCol(/\bdata\b/);
  })();
  const descIdx = findCol(/descriz|causale|operazione|dettagl|note/);
  const amtIdx = findCol(/^importo|importo$|^amount|valore/);
  const dareIdx = findCol(/dare|uscit|addebit/);
  const avereIdx = findCol(/avere|entrat|accredit/);
  if (dateIdx === -1 || (amtIdx === -1 && dareIdx === -1 && avereIdx === -1)) return [];
  const out = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    const date = parseStatementDate(r[dateIdx]);
    if (!date) continue;
    let amount = null, type = null;
    if (amtIdx !== -1 && r[amtIdx]) {
      const raw = parseItalianAmount(r[amtIdx]);
      if (raw === null || raw === 0) continue;
      amount = Math.abs(raw); type = raw < 0 ? 'expense' : 'income';
    } else {
      const d = dareIdx !== -1 ? parseItalianAmount(r[dareIdx]) : null;
      const a = avereIdx !== -1 ? parseItalianAmount(r[avereIdx]) : null;
      if (a) { amount = Math.abs(a); type = 'income'; }
      else if (d) { amount = Math.abs(d); type = 'expense'; }
      else continue;
    }
    const description = (descIdx !== -1 ? (r[descIdx] || '') : '').replace(/\s+/g, ' ').trim();
    out.push({ date, description: description || 'Movimento', amount, type });
  }
  return out;
}

function parseStatementText(text) {
  if (!text) return [];
  const t = text.replace(/\r/g, ' ').replace(/[ \t]+/g, ' ');
  const dateRe = /\b\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}\b/g;
  const dates = [...t.matchAll(dateRe)];
  const amtRe = /([-+])?\s?(\d{1,3}(?:[.\s]\d{3})*,\d{2})\s?([-+])?/g;
  const out = [];
  for (let i = 0; i < dates.length; i++) {
    const start = dates[i].index;
    const end = (i + 1 < dates.length) ? dates[i + 1].index : Math.min(t.length, start + 400);
    const seg = t.slice(start, end);
    const dateM = seg.match(/^\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}/);
    if (!dateM) continue;
    const date = parseStatementDate(dateM[0]);
    if (!date) continue;
    amtRe.lastIndex = 0;
    let am, last = null;
    while ((am = amtRe.exec(seg)) !== null) { if (am.index >= dateM[0].length) last = am; }
    if (!last) continue;
    const num = parseItalianAmount(last[2]);
    if (!num || num <= 0) continue;
    const sign = (last[1] === '-' || last[3] === '-') ? -1 : 1;
    let desc = seg.slice(dateM[0].length, last.index)
      .replace(/^\s*\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}\s*/, '') // eventuale seconda data (valuta)
      .replace(/\s+/g, ' ').trim();
    const clean = desc.replace(/saldo|riporto|totale|pagina|estratto conto|disponibilit[aà]/ig, '').trim();
    if (!clean && desc) continue; // riga di saldo/totale
    out.push({ date, description: desc || 'Movimento', amount: num, type: sign < 0 ? 'expense' : 'income' });
  }
  return out;
}

const TX_CATEGORY_RULES = [
  // — Uscite —
  [/esselunga|conad|coop\b|carrefour|lidl|eurospin|\bpam\b|despar|supermerc|\bmd\b|\baldi\b|alimentari|macelleria|panetteria|ortofrutta/i, 'Spesa alimentare', 'expense'],
  [/affitto|canone\s+locazione|locazione/i, 'Affitto / Mutuo', 'expense'],
  [/mutuo|rata\s+mutuo/i, 'Affitto / Mutuo', 'expense'],
  [/enel|a2a|hera\b|iren\b|acea|edison|eni\s*gas|sorgenia|illumia|servizio\s+elettrico|metano|acquedot|bolletta|\bgas\b|fornitura/i, 'Bollette', 'expense'],
  [/\btim\b|vodafone|wind\s?tre|windtre|iliad|fastweb|telecom|fibra|adsl|internet|sky\s*wifi/i, 'Bollette', 'expense'],
  [/netflix|spotify|disney|prime\s*video|amazon\s*prime|now\s*tv|\bdazn\b|youtube\s*premium|icloud|google\s*one|dropbox|abbonamento|canone\s*mensile/i, 'Abbonamenti', 'expense'],
  [/trenitalia|\bitalo\b|\batac\b|\bgtt\b|\bamt\b|atm\s*milano|autostrad|telepass|carburant|benzina|\bq8\b|\beni\b|\besso\b|tamoil|\bip\b\s*gas|distributore|parchegg|\btaxi\b|\buber\b|\bbus\b|biglietto\s*treno|abbonamento\s*(bus|treno|metro)/i, 'Trasporti', 'expense'],
  [/farmacia|parafarmac|dott\.|medico|dentist|odontoiatr|ospedale|\basl\b|analisi\s*clinic|laboratorio\s*analisi|\bottica\b|visita\s*medica|fisioterap/i, 'Salute', 'expense'],
  [/universit|tasse\s*univ|libreria|\bcorso\b|iscrizione|\bscuola\b|\besame\b|udemy|coursera|formazione/i, 'Istruzione', 'expense'],
  [/ristorante|pizzeria|trattoria|osteria|\bbar\b|caff[eè]|mcdonald|burger\s*king|kfc|deliveroo|just\s?eat|glovo|\bcinema\b|teatro|concerto|museo|palestra|\bgym\b/i, 'Svago', 'expense'],
  [/zalando|\bzara\b|h&m|\bhm\b|amazon(?!\s*prime)|\bebay\b|decathlon|\bikea\b|mediaworld|unieuro|euronics|apple\s*store|\bnike\b|adidas|leroy\s*merlin|brico|negozio|acquisto\s*pos/i, 'Shopping', 'expense'],
  [/\bf24\b|agenzia\s*entrate|\bimu\b|\btari\b|\btasi\b|bollo\s*auto|canone\s*rai|imposta|tributo|\btassa\b|\biva\b\s*trimestr|inps|inail/i, 'Tasse', 'expense'],
  // — Entrate —
  [/stipendio|emolument|retribuzione|cedolino|busta\s*paga|accredito\s*stipendio|\bnetto\b\s*bonifico/i, 'Stipendio', 'income'],
  [/fattura|compenso|prestazione|parcella|freelance|\bp\.?\s?iva\b|onorario|collaborazione/i, 'Freelance', 'income'],
  [/dividend|\bcedola\b|interess(i|e)\s*attiv|rendiment|plusvalenz|affitto\s*attivo|locazione\s*attiva/i, 'Entrate passive', 'income'],
  [/rimborso|\bstorno\b|\breso\b|cashback/i, 'Rimborsi', 'income'],
  [/disinvestiment|vendita\s*titoli|riscatto|liquidazione\s*fondo|prelievo\s*da\s*deposito/i, 'Investimenti', 'income'],
];
function guessTxCategory(desc, type) {
  const d = String(desc || '');
  for (const [re, cat, t] of TX_CATEGORY_RULES) { if (t === type && re.test(d)) return cat; }
  return type === 'income' ? 'Altre entrate' : 'Altre uscite';
}
function guessPaymentMethod(desc) {
  const d = String(desc || '').toLowerCase();
  if (/paypal/.test(d)) return 'PayPal';
  if (/prelievo|\batm\b|sportello|contant/.test(d)) return 'Contanti';
  if (/\bpos\b|pagamento\s*pos|carta\s*di\s*debito|bancomat/.test(d)) return 'Carta di debito';
  if (/carta\s*di\s*credito|\bcredit\b|revolving|\bcc\b\s/.test(d)) return 'Carta di credito';
  if (/\bsdd\b|rid\b|addebito\s*(diretto|sdd|preautorizzato)|domiciliazione/.test(d)) return 'Addebito diretto';
  if (/bonifico|giroconto|\bsepa\b|\bf24\b|mav|rav|bollettino/.test(d)) return 'Bonifico';
  return 'Bonifico';
}
function isDuplicateTx(tx, existing) {
  const amt = Math.abs(Number(tx.amount) || 0);
  const desc = String(tx.description || '').slice(0, 24).toLowerCase().trim();
  return (existing || []).some(e =>
    e.date === tx.date &&
    Math.abs(Math.abs(Number(e.amount) || 0) - amt) < 0.005 &&
    String(e.description || '').slice(0, 24).toLowerCase().trim() === desc
  );
}

/* ── Cedolini Tab ── */
const shortMonthLabel = (key) => {
  const [y, m] = String(key || '').split('-');
  return `${(MESI_IT[parseInt(m, 10) - 1] || '').slice(0, 3)} ${String(y || '').slice(2)}`;
};

function CedoliniTab({ cedolini, onAdd, onRemove, currentISO, showToast }) {
  const [form, setForm] = useState({ month: currentISO || '', netto: '', note: '' });
  const [err, setErr] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(null); // null | { msg, pct }
  const [importErr, setImportErr] = useState('');
  const [confirmData, setConfirmData] = useState(null);
  const [confirmErr, setConfirmErr] = useState('');
  const confirmRef = useRef(null);
  const scale = useChartScale();
  const busy = !!loading;

  /* Sul telefono il pannello di conferma compare sotto la piega: senza
     questo il file sembrava non aver prodotto nulla */
  const hasConfirm = !!confirmData;
  useEffect(() => {
    if (!hasConfirm || !confirmRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    confirmRef.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }, [hasConfirm]);

  const handleFile = async (file) => {
    if (!file || busy) return;
    setImportErr(''); setConfirmErr(''); setConfirmData(null);
    setLoading({ msg: 'Apro il documento…', pct: null });
    try {
      const text = await extractTextFromFile(file, (msg, pct) => setLoading({ msg, pct: pct === undefined ? null : pct }));
      const parsed = parseFinancialDoc(text);
      /* Anche se non si trova niente il pannello si apre: prima un avviso di
         due secondi e mezzo chiudeva la faccenda, e il file era perso */
      setConfirmData({
        month: parsed.month || currentISO || '',
        netto: parsed.netto ? parsed.netto.toFixed(2) : '',
        note: `Importato da ${file.name}`,
        candidates: parsed.candidates || [],
        fileName: file.name,
        found: !!parsed.netto
      });
    } catch (e) {
      console.error(e);
      setImportErr(describeImportError(e));
    } finally {
      setLoading(null);
    }
  };

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = '';
    if (f) handleFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const confirmImport = () => {
    if (!confirmData) return;
    if (!/^\d{4}-\d{2}$/.test(confirmData.month)) { setConfirmErr('Scegli il mese del cedolino.'); return; }
    const n = Number(String(confirmData.netto).replace(',', '.'));
    if (!(n > 0)) { setConfirmErr('Inserisci il netto in euro, maggiore di zero.'); return; }
    if (cedolini.find(c => c.month === confirmData.month)) {
      setConfirmErr(`C'è già un cedolino per ${itMonthLabel(confirmData.month)}: eliminalo dall'elenco prima di importarne un altro.`);
      return;
    }
    onAdd({ id: Date.now(), month: confirmData.month, netto: Math.round(n * 100) / 100, note: confirmData.note });
    setConfirmData(null); setConfirmErr('');
    showToast && showToast('Cedolino importato dal documento');
  };

  const sorted = [...cedolini].sort((a, b) => a.month.localeCompare(b.month));

  const handleAdd = () => {
    if (!/^\d{4}-\d{2}$/.test(form.month)) { setErr('Scegli il mese (formato AAAA-MM).'); return; }
    const nettoNum = Number(String(form.netto).replace(',', '.'));
    if (!nettoNum || nettoNum <= 0) { setErr('Inserisci un netto valido'); return; }
    if (cedolini.find(c => c.month === form.month)) { setErr('Cedolino già presente per questo mese'); return; }
    onAdd({ id: Date.now(), month: form.month, netto: nettoNum, note: form.note });
    setForm(f => ({ ...f, netto: '', note: '' }));
    setErr('');
  };

  const chartData = sorted.map(c => ({ month: shortMonthLabel(c.month), netto: c.netto }));
  const avg = sorted.length > 0 ? sorted.reduce((s, c) => s + c.netto, 0) / sorted.length : 0;
  const last = sorted[sorted.length - 1];
  const prevC = sorted[sorted.length - 2];
  const lastDelta = last && prevC ? last.netto - prevC.netto : null;
  const minC = sorted.length ? sorted.reduce((m, c) => c.netto < m.netto ? c : m) : null;
  const maxC = sorted.length ? sorted.reduce((m, c) => c.netto > m.netto ? c : m) : null;
  const deltaOf = (c) => {
    const i = sorted.indexOf(c);
    return i > 0 ? c.netto - sorted[i - 1].netto : null;
  };
  const deltaText = (d) => d === null ? '—' : `${d >= 0 ? '+' : '−'}${fmt(Math.abs(d))}`;
  const deltaColor = (d) => d === null ? C.textMuted : d >= 0 ? C.sage : C.rust;

  return (
    <div className="bento">

      {sorted.length > 0 && (
        <PageHero label="Netto medio mensile" value={avg}
          meta={<span>{sorted.length} {sorted.length === 1 ? 'mese registrato' : 'mesi registrati'} · da {itMonthLabel(sorted[0].month)}</span>}
          aside={(
            <div>
              <div className="aside-label">Ultimi cedolini</div>
              {[...sorted].reverse().slice(0, 4).map(c => {
                const d = deltaOf(c);
                return (
                  <div key={c.id} className="part-head recent-row">
                    <span className="part-name">{itMonthLabel(c.month)}</span>
                    <span className="part-value">{fmt(c.netto)}<span className="part-share" style={{ color: deltaColor(d) }}>{deltaText(d)}</span></span>
                  </div>
                );
              })}
            </div>
          )} />
      )}
      {sorted.length > 0 && (
        <StatStrip items={[
          { label: 'Ultimo netto', value: fmt(last.netto), color: C.gold, hint: <>{itMonthLabel(last.month)}{lastDelta !== null && <span style={{ color: deltaColor(lastDelta) }}> · {deltaText(lastDelta)}</span>}</> },
          { label: 'Netto minimo', value: fmt(minC.netto), color: C.rust, hint: itMonthLabel(minC.month) },
          { label: 'Netto massimo', value: fmt(maxC.netto), color: C.sage, hint: itMonthLabel(maxC.month) }
        ]} />
      )}

      {/* ── Importazione ──
          Il riquadro è un <label> collegato all'input: il selettore si apre
          col gesto nativo, senza il click() programmatico lanciato da un
          contenitore che riceveva a sua volta il click. Sul telefono la
          conferma stava in una griglia 160px + 180px + due bottoni: a 390px
          "Conferma" finiva fuori dalla scheda e non si poteva premere. */}
      <div className="bento-card span-12">
        <h3 className="card-title">
          <span><span className="diamond">◆</span><span>Importa da PDF / immagine</span></span>
          <span className="mono-font" style={{ fontSize: 11, color: C.textMuted }}>PDF · foto · OCR</span>
        </h3>
        <input id="cedolino-file" className="file-input" type="file" accept="application/pdf,image/*"
          disabled={busy} onChange={onPick} />
        <label htmlFor="cedolino-file" className={`dropzone ${isDragging ? 'dragging' : ''} ${busy ? 'busy' : ''}`}
          onDragOver={e => { e.preventDefault(); if (!busy) setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop} aria-busy={busy}>
          {busy ? (
            <span className="dropzone-progress" role="status" aria-live="polite">
              <span className="dropzone-msg">{loading.msg}</span>
              <span className={`progress-track ${loading.pct === null ? 'indeterminate' : ''}`} style={{ display: 'block' }}>
                <span className="progress-fill" style={{ display: 'block', '--fill': loading.pct === null ? 0.35 : loading.pct, background: C.gold }} />
              </span>
            </span>
          ) : (
            <>
              <span className="dropzone-icon"><Ic.upload size={22} /></span>
              <span className="dropzone-title only-fine">Trascina qui un <strong>cedolino</strong> in PDF o una foto</span>
              <span className="dropzone-title only-coarse">Tocca per scegliere il <strong>cedolino</strong>: PDF o foto</span>
              <span className="dropzone-hint only-fine">oppure clicca per selezionarlo · il netto viene letto in automatico</span>
              <span className="dropzone-hint only-coarse">da File, dalla libreria Foto o con la fotocamera</span>
            </>
          )}
        </label>
        <div className="dropzone-alt">
          <input id="cedolino-camera" className="file-input" type="file" accept="image/*" capture="environment"
            disabled={busy} onChange={onPick} />
          <label htmlFor="cedolino-camera" className={`btn-ghost ${busy ? 'is-disabled' : ''}`}>
            <Ic.camera /> Fotografa il cedolino
          </label>
        </div>
        {importErr && <div className="inline-error" role="alert"><Ic.alert size={15} /><span>{importErr}</span></div>}

        {confirmData && (
          <div className="import-confirm" ref={confirmRef}>
            <div className="import-confirm-head">
              <span className="aside-label" style={{ color: C.gold, margin: 0 }}>Controlla e conferma</span>
              <span className="import-file" title={confirmData.fileName}>{confirmData.fileName}</span>
            </div>
            {!confirmData.found && (
              <p className="import-note">
                Non ho trovato il netto nel documento: {confirmData.candidates.length ? 'tocca uno degli importi trovati oppure scrivilo tu.' : 'scrivilo tu qui sotto.'}
              </p>
            )}
            <div className="import-fields">
              <div className="modal-field">
                <label htmlFor="ic-month">Mese</label>
                <input id="ic-month" type="month" className="input-cell" placeholder="2026-04" value={confirmData.month}
                  onChange={e => setConfirmData(d => ({ ...d, month: e.target.value }))} />
              </div>
              <div className="modal-field">
                <label htmlFor="ic-netto">Netto (€)</label>
                <input id="ic-netto" type="number" inputMode="decimal" min="0" step="0.01" className="input-cell" value={confirmData.netto}
                  onChange={e => setConfirmData(d => ({ ...d, netto: e.target.value }))}
                  style={{ textAlign: 'right' }} />
              </div>
              <div className="modal-field">
                <label htmlFor="ic-note">Note</label>
                <input id="ic-note" className="input-cell" value={confirmData.note}
                  onChange={e => setConfirmData(d => ({ ...d, note: e.target.value }))} />
              </div>
            </div>
            {confirmData.candidates.length > 0 && (
              <div className="amount-chips">
                <span className="amount-chips-label">Importi trovati</span>
                {confirmData.candidates.map(c => {
                  const v = c.value.toFixed(2);
                  const active = Math.abs(Number(confirmData.netto) - c.value) < 0.005;
                  return (
                    <button key={v} type="button" className={`amount-chip ${active ? 'active' : ''}`} aria-pressed={active}
                      title={c.keyword ? `accanto a "${c.keyword}"` : undefined}
                      onClick={() => setConfirmData(d => ({ ...d, netto: v }))}>
                      {fmtEUR2(c.value)}
                    </button>
                  );
                })}
              </div>
            )}
            {confirmErr && <div className="inline-error" role="alert"><Ic.alert size={15} /><span>{confirmErr}</span></div>}
            <div className="import-actions">
              <button type="button" className="btn-ghost" onClick={() => { setConfirmData(null); setConfirmErr(''); }}>Annulla</button>
              <button type="button" className="btn-primary" onClick={confirmImport}><Ic.check /> Conferma</button>
            </div>
          </div>
        )}
      </div>

      {/* Form aggiunta */}
      <div className="bento-card span-12">
        <h3 className="card-title">
          <span><span className="diamond">◆</span><span>Inserisci cedolino</span></span>
        </h3>
        {/* Colonne fisse 160/180px sfondavano il contenitore a 390px:
            qui si riflowano da sole */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 16, alignItems: 'end' }}>
          <div className="modal-field" style={{ margin: 0 }}>
            <label htmlFor="cf-month">Mese</label>
            <input id="cf-month" type="month" className="input-cell" placeholder="2026-04" value={form.month}
              onChange={e => setForm(f => ({ ...f, month: e.target.value }))} />
          </div>
          <div className="modal-field" style={{ margin: 0 }}>
            <label htmlFor="cf-netto">Netto a pagare (€)</label>
            <input id="cf-netto" type="number" inputMode="decimal" className="input-cell" placeholder="1550" value={form.netto}
              onChange={e => setForm(f => ({ ...f, netto: e.target.value }))} style={{ textAlign: 'right' }} />
          </div>
          <div className="modal-field" style={{ margin: 0 }}>
            <label htmlFor="cf-note">Note (opzionale)</label>
            <input id="cf-note" className="input-label" placeholder="Arretrati, vigilanze, ecc." value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
          </div>
          <button className="btn-primary" onClick={handleAdd} style={{ justifyContent: 'center' }}>
            <Ic.plus /> Aggiungi
          </button>
        </div>
        {err && <div className="inline-error" role="alert"><Ic.alert size={15} /><span>{err}</span></div>}
      </div>

      {/* Chart trend netto */}
      {sorted.length > 1 && (
        <div className="bento-card span-12 chart-card">
          <h3 className="card-title">
            <span><span className="diamond">◆</span><span>Trend netto mensile</span></span>
            <span className="mono-font" style={{ fontSize: 11, color: C.textMuted }}>media {fmt(avg)}</span>
          </h3>
          <ResponsiveContainer width="100%" height={scale.h(240, 190)}>
            <LineChart data={chartData} margin={scale.margin}>
              <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
              <XAxis dataKey="month" {...scale.axis} minTickGap={scale.minTickGap} />
              <YAxis {...scale.axis} width={scale.yWidth} tickFormatter={fmtTick}
                domain={[min => Math.max(0, Math.floor((min * 0.92) / 100) * 100), max => Math.ceil((max * 1.04) / 100) * 100]} />
              <Tooltip {...TT_LINE} formatter={v => [fmt(v), 'Netto']} />
              <Line type="monotone" dataKey="netto" stroke={C.gold} strokeWidth={2.5} dot={{ r: scale.narrow ? 3 : 5, fill: C.gold }} name="Netto" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Tabella cedolini */}
      <div className="bento-card span-12">
        <h3 className="card-title">
          <span><span className="diamond">◆</span><span>Cedolini registrati</span></span>
          <span className="mono-font" style={{ fontSize: 11, color: C.textMuted }}>{sorted.length} mesi</span>
        </h3>

        {sorted.length === 0 ? (
          <div style={{ padding: '32px 12px', textAlign: 'center', color: C.textMuted }}>
            <div style={{ color: C.gold, marginBottom: 12 }}><Ic.receipt size={28} /></div>
            <p>Nessun cedolino inserito. Importa un PDF o una foto qui sopra, oppure inserisci il netto a mano.</p>
          </div>
        ) : (
          <>
            <div className="desktop-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {['Mese', 'Netto', 'Δ mese prec.', 'Stato', 'Note', ''].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.textMuted, fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(c => {
                    const delta = deltaOf(c);
                    const isActive = c.month === currentISO;
                    return (
                      <tr key={c.id} style={{ borderBottom: `1px solid ${C.border}`, background: isActive ? 'var(--accent-subtle)' : 'transparent' }}>
                        <td className="mono-font" style={{ padding: '12px 8px', color: isActive ? C.gold : C.text }}>{c.month}</td>
                        <td className="mono-font" style={{ padding: '12px 8px', color: C.gold, fontWeight: 600 }}>{fmt(c.netto)}</td>
                        <td className="mono-font" style={{ padding: '12px 8px', color: deltaColor(delta) }}>{deltaText(delta)}</td>
                        <td style={{ padding: '12px 8px' }}>
                          {isActive && <span className="badge badge-gold">Mese corrente</span>}
                        </td>
                        <td style={{ padding: '12px 8px', color: C.textDim, fontSize: 12, maxWidth: 200 }}>{c.note || '—'}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <button className="tx-action-btn danger" onClick={() => onRemove(c.id)} aria-label={`Elimina cedolino ${itMonthLabel(c.month)}`}>
                            <Ic.trash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Telefono: una riga per mese, dal più recente, senza scorrere di lato */}
            <div className="phone-list">
              {[...sorted].reverse().map(c => {
                const delta = deltaOf(c);
                const isActive = c.month === currentISO;
                return (
                  <div key={c.id} className={`m-row ${isActive ? 'is-active' : ''}`}>
                    <div style={{ minWidth: 0 }}>
                      <div className="m-row-title">{itMonthLabel(c.month)}</div>
                      <div className="m-row-sub">
                        <span style={{ color: deltaColor(delta) }}>{delta === null ? 'primo registrato' : deltaText(delta)}</span>
                        {isActive && ' · mese corrente'}
                        {c.note ? ` · ${c.note}` : ''}
                      </div>
                    </div>
                    <div className="m-row-end">
                      <span className="m-row-value" style={{ color: C.gold }}>{fmt(c.netto)}</span>
                      <button className="tx-action-btn danger" onClick={() => onRemove(c.id)} aria-label={`Elimina cedolino ${itMonthLabel(c.month)}`}>
                        <Ic.trash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Investment helpers ── */
const TYPE_COLORS = { Equity: C.gold, Cripto: C.rust, Pensione: C.purple, Bond: C.teal, Liquidita: C.textDim };

function pacMontante(pmt, annualNet, years) {
  const n = years * 12;
  const r = Math.pow(1 + annualNet, 1 / 12) - 1;
  if (r === 0) return pmt * n;
  return pmt * ((Math.pow(1 + r, n) - 1) / r);
}

function monthsUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const diffDays = (target - now) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.round(diffDays / 30.44));
}

/* ── Investments Tab ── */
function InvestmentsTab({ data, totals, onUpdateField, onAddItem, onRemoveItem, onUpdateTarget }) {
  const investments = data.investments;
  const scale = useChartScale();

  const totalInvested = totals.totalInvestCurrent;
  const totalEntry = investments.reduce((s, i) => s + Number(i.entryValue || 0), 0);
  const weighted = investments.reduce((acc, i) => {
    const ev = Number(i.entryValue || 0);
    const cv = Number(i.current || 0);
    if (ev > 0 && cv > 0) {
      acc.num += cv * ((cv - ev) / ev);
      acc.den += cv;
    }
    return acc;
  }, { num: 0, den: 0 });
  const roiPct = weighted.den > 0 ? (weighted.num / weighted.den) * 100 : 0;
  // Guadagno solo sulle posizioni con un capitale d'ingresso noto
  const gain = investments.reduce((s, i) => {
    const ev = Number(i.entryValue || 0);
    return ev > 0 ? s + Number(i.current || 0) - ev : s;
  }, 0);

  const allocMap = investments.reduce((acc, i) => {
    const t = i.type || 'Equity';
    acc[t] = (acc[t] || 0) + Number(i.current || 0);
    return acc;
  }, {});
  const target = data.investmentsMeta.targetAllocation;
  const categories = Array.from(new Set([...Object.keys(target), ...Object.keys(allocMap)]));
  const allocBars = categories.map(cat => ({
    name: cat,
    Attuale: totalInvested > 0 ? +((allocMap[cat] || 0) / totalInvested * 100).toFixed(1) : 0,
    Target: Number(target[cat] || 0)
  }));
  /* Allocazione per tipo, con la tacca sul target. Sostituisce la torta
     senza etichette, che non diceva a quale tipo corrispondesse ogni colore. */
  const typeParts = categories.map(cat => {
    const share = totalInvested > 0 ? (allocMap[cat] || 0) / totalInvested : 0;
    return {
      name: cat,
      value: allocMap[cat] || 0,
      fill: share,
      color: TYPE_COLORS[cat] || C.gold,
      target: Number(target[cat] || 0),
      share: `${(share * 100).toFixed(0)}% · target ${Number(target[cat] || 0)}%`
    };
  });

  const pipMonthly = 250;
  const pipYears = 36;
  const finA = pacMontante(pipMonthly, 0.0307, pipYears);
  const finB = pacMontante(pipMonthly, 0.0580, pipYears);
  const costOpportunity = finB - finA;

  const roadmapMonths = monthsUntil('2026-09-09');
  const TYPES = ['Equity', 'Pensione', 'Cripto', 'Bond', 'Liquidita'];

  return (
    <div className="bento">

      <PageHero label="Patrimonio investito" value={totalInvested}
        meta={<>
          {totalEntry > 0 && <HeroDelta up={gain >= 0}>{fmt(Math.abs(gain))} sul capitale</HeroDelta>}
          <span>{investments.length} {investments.length === 1 ? 'posizione' : 'posizioni'} · capitale {fmt(totalEntry)}</span>
        </>}
        aside={<PartBars title="Per tipo · attuale e target" parts={typeParts} total={totalInvested} />} />

      <StatStrip items={[
        { label: 'Rendimento medio ponderato', value: `${roiPct >= 0 ? '+' : ''}${roiPct.toFixed(2)}%`, color: roiPct >= 0 ? C.sage : C.rust, hint: 'media pesata su valore corrente' },
        { label: 'PAC mensile totale', value: fmt(totals.totalInvestMonthly), color: C.gold, hint: 'in accumulo automatico' },
        { label: 'Peso su patrimonio netto', value: `${totals.netWorth > 0 ? ((totalInvested / totals.netWorth) * 100).toFixed(1) : '0.0'}%`, color: C.purple, hint: `su ${fmt(totals.netWorth)} totali` }
      ]} />

      {/* Performance per posizione */}
      <div className="bento-card span-7">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Performance per posizione</span></span></h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {investments.map(inv => {
            const cv = Number(inv.current || 0);
            const ev = Number(inv.entryValue || 0);
            const roi = ev > 0 ? ((cv - ev) / ev) * 100 : 0;
            const progressMax = Math.max(cv, ev, 1);
            const progressPct = (cv / progressMax) * 100;
            const roiColor = ev === 0 ? C.textMuted : roi >= 0 ? C.sage : C.rust;
            const typeColor = TYPE_COLORS[inv.type] || C.gold;
            return (
              <div key={inv.id} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, background: 'var(--surface-soft)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', minWidth: 0 }}>
                    <span className="display-font" style={{ fontSize: 16, color: C.text }}>{inv.label}</span>
                    <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: typeColor, border: `1px solid ${typeColor}`, padding: '2px 8px', borderRadius: 3 }}>{inv.type}</span>
                    <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textDim, border: `1px solid ${C.border}`, padding: '2px 8px', borderRadius: 3 }}>{inv.risk}</span>
                  </div>
                  <div className="mono-font" style={{ fontSize: 13, color: roiColor, fontWeight: 600 }}>
                    {ev > 0 ? `${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%` : '—'}
                  </div>
                </div>
                <div className="progress-track" style={{ height: 10 }}>
                  <div className="progress-fill" style={{ '--fill': (progressPct) / 100, background: roi >= 0 ? `linear-gradient(90deg, ${C.goldDim}, ${C.sage})` : `linear-gradient(90deg, ${C.rust}, ${C.goldDim})` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px 12px', marginTop: 8, fontSize: 11 }} className="mono-font">
                  <span style={{ color: C.textDim }}>Attuale {fmt(cv)} · Capitale {fmt(ev)}</span>
                  <span style={{ color: C.gold }}>PAC {fmt(inv.monthly)}/m</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attuale vs Target (Bar) */}
      <div className="bento-card span-5 chart-card">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Attuale vs Target</span></span></h3>
        <ChartLegend shape="box" items={[{ label: 'Attuale', color: C.gold }, { label: 'Target', color: C.sage }]} />
        <ResponsiveContainer width="100%" height={scale.h(220, 190)}>
          <BarChart data={allocBars} margin={scale.margin}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
            <XAxis dataKey="name" {...scale.axis} interval={0} />
            <YAxis {...scale.axis} width={scale.narrow ? 34 : 40} tickFormatter={v => `${v}%`} />
            <Tooltip {...TT_BAR} formatter={(v) => `${v}%`} />
            <Bar dataKey="Attuale" fill={C.gold} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Target" fill={C.sage} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 100px), 1fr))', gap: 10, alignItems: 'end' }}>
          {Object.keys(target).map(cat => (
            <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label htmlFor={`tgt-${cat}`} style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textMuted }}>{cat} target %</label>
              <input id={`tgt-${cat}`} type="number" inputMode="decimal" className="input-cell mono-font" value={target[cat]} onChange={e => onUpdateTarget(cat, e.target.value)} style={{ textAlign: 'right' }} />
            </div>
          ))}
        </div>
      </div>

      {/* PIP cost analysis */}
      <div className="bento-card span-12">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Analisi costo PIP (36 anni, 250€/m)</span></span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16 }}>
          <div style={{ borderLeft: `1px solid ${C.rust}`, paddingLeft: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.rust, marginBottom: 6 }}>Scenario A — PIP Alleata</div>
            <div className="display-font number-display" style={{ fontSize: 26, color: C.rust }}>{fmt(finA)}</div>
            <div className="mono-font" style={{ fontSize: 11, color: C.textDim, marginTop: 6 }}>6% lordo − TER 2.93% = 3.07% netto</div>
          </div>
          <div style={{ borderLeft: `1px solid ${C.sage}`, paddingLeft: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.sage, marginBottom: 6 }}>Scenario B — ETF (VWCE/SWDA)</div>
            <div className="display-font number-display" style={{ fontSize: 26, color: C.sage }}>{fmt(finB)}</div>
            <div className="mono-font" style={{ fontSize: 11, color: C.textDim, marginTop: 6 }}>6% lordo − TER 0.20% = 5.80% netto</div>
          </div>
          <div style={{ borderLeft: `1px solid ${C.gold}`, paddingLeft: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginBottom: 6 }}>Costo opportunità</div>
            <div className="display-font number-display" style={{ fontSize: 26, color: C.gold }}>{fmt(costOpportunity)}</div>
            <div className="mono-font" style={{ fontSize: 11, color: C.textDim, marginTop: 6 }}>differenza A → B</div>
          </div>
        </div>
        <p style={{ marginTop: 14, fontSize: 11, color: C.textMuted }}>
          Calcolo semplificato con montante PAC (rendimento netto costante). Il TER reale Alleata Azionaria è 2.93% (fonte: prospetto 2025).
        </p>
      </div>

      {/* Roadmap */}
      <div className="bento-card span-12">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ color: C.gold, marginTop: 2 }}><Ic.clock size={22} /></div>
          <div style={{ flex: 1, minWidth: 'min(100%, 220px)' }}>
            <h4 className="display-font" style={{ margin: '0 0 4px', fontSize: 17 }}>Roadmap settembre 2026</h4>
            <div className="mono-font" style={{ fontSize: 12, color: C.gold, marginBottom: 10 }}>
              {roadmapMonths} mesi al rinnovo contratto (09/09/2026)
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.75, color: C.textDim }}>
              <li>Ridurre PIP da 250€ a ~100€/mese (mantenere soglia deducibilità)</li>
              <li>Redirigere 150€/mese verso ETF VWCE/SWDA su Scalable Capital</li>
              <li>Valutare aumento PAC ETF con cash flow liberato dalle rate in scadenza</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Posizioni: tabella su desktop, schede modificabili sul telefono.
          Prima la tabella larga 720px si scorreva di lato e i nomi restavano
          tagliati ("PIP Alleata Pre", "Bitcoin (Crypt"). */}
      <div className="bento-card span-12">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Posizioni di investimento</span></span><span className="mono-font" style={{ fontSize: 13, color: C.gold }}>{fmt(totalInvested)} · +{fmt(totals.totalInvestMonthly)}/m</span></h3>
        <div className="desktop-table" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 720 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {['Posizione', 'Valore attuale', 'Capitale investito', 'PAC mensile', 'Tipo', 'Rischio', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.textMuted, fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map(inv => (
                <tr key={inv.id} className="data-row" style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: '4px 8px' }}><input className="input-label" value={inv.label} onChange={e => onUpdateField('investments', inv.id, 'label', e.target.value)} aria-label="Posizione" /></td>
                  <td style={{ padding: '4px 8px' }}><input type="number" className="input-cell" value={inv.current} onChange={e => onUpdateField('investments', inv.id, 'current', e.target.value)} aria-label="Valore attuale" /></td>
                  <td style={{ padding: '4px 8px' }}><input type="number" className="input-cell" value={inv.entryValue || 0} onChange={e => onUpdateField('investments', inv.id, 'entryValue', e.target.value)} aria-label="Capitale investito" /></td>
                  <td style={{ padding: '4px 8px' }}><input type="number" className="input-cell" value={inv.monthly} onChange={e => onUpdateField('investments', inv.id, 'monthly', e.target.value)} aria-label="PAC mensile" /></td>
                  <td style={{ padding: '4px 8px' }}>
                    <select value={inv.type} onChange={e => onUpdateField('investments', inv.id, 'type', e.target.value)} className="input-cell" style={{ background: C.card }} aria-label="Tipo">
                      {TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '4px 8px' }}><input className="input-label mono-font" value={inv.risk} onChange={e => onUpdateField('investments', inv.id, 'risk', e.target.value)} style={{ fontSize: 12 }} aria-label="Rischio" /></td>
                  <td style={{ padding: '4px 8px' }}>
                    <button className="row-delete" onClick={() => onRemoveItem('investments', inv.id)} aria-label={`Elimina ${inv.label}`} style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer' }}><Ic.trash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="phone-list">
          {investments.map(inv => (
            <div key={inv.id} className="m-edit">
              <div className="m-edit-head">
                <input className="input-label" value={inv.label} aria-label="Nome della posizione"
                  onChange={e => onUpdateField('investments', inv.id, 'label', e.target.value)} />
                <button className="row-delete" onClick={() => onRemoveItem('investments', inv.id)} aria-label={`Elimina ${inv.label}`}
                  style={{ background: 'none', border: 'none', color: C.danger, cursor: 'pointer' }}><Ic.trash /></button>
              </div>
              <div className="m-edit-grid">
                <label className="m-field"><span>Valore attuale</span>
                  <input type="number" inputMode="decimal" className="input-cell" value={inv.current} onChange={e => onUpdateField('investments', inv.id, 'current', e.target.value)} /></label>
                <label className="m-field"><span>Capitale investito</span>
                  <input type="number" inputMode="decimal" className="input-cell" value={inv.entryValue || 0} onChange={e => onUpdateField('investments', inv.id, 'entryValue', e.target.value)} /></label>
                <label className="m-field"><span>PAC mensile</span>
                  <input type="number" inputMode="decimal" className="input-cell" value={inv.monthly} onChange={e => onUpdateField('investments', inv.id, 'monthly', e.target.value)} /></label>
                <label className="m-field"><span>Tipo</span>
                  <select value={inv.type} onChange={e => onUpdateField('investments', inv.id, 'type', e.target.value)} className="input-cell" style={{ background: C.card }}>
                    {TYPES.map(t => <option key={t}>{t}</option>)}
                  </select></label>
                <label className="m-field m-field-wide"><span>Rischio</span>
                  <input className="input-label" value={inv.risk} onChange={e => onUpdateField('investments', inv.id, 'risk', e.target.value)} /></label>
              </div>
            </div>
          ))}
        </div>
        <AddBtn onClick={() => onAddItem('investments', { label: 'Nuova posizione', current: 0, entryValue: 0, monthly: 0, type: 'Equity', risk: 'Medio' })} />
      </div>

      {/* Note originali */}
      <div className="bento-card span-12">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ color: C.gold, marginTop: 2 }}><Ic.alert size={20} /></div>
          <div>
            <h4 className="display-font" style={{ margin: '0 0 8px', fontSize: 16 }}>Note sul PIP</h4>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: C.textDim }}>
              Il PIP Alleata Previdenza ha un TER del 2,93% — sopra la media per ETF (0,15-0,25%).
              Proiezioni usano rendimento netto 4% annuo per "Pensione".
              Valuta riduzione versamento dopo settembre 2026 mantenendo quota per deducibilita fiscale.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── Sentiment Panel ── */
function SentimentPanel({ onPrefill }) {
  const [fng, setFng] = React.useState({ data: null, error: null, loading: true });
  const [poly, setPoly] = React.useState({ data: null, error: null, loading: true });
  const scale = useChartScale();

  React.useEffect(() => {
    const ctrl = new AbortController();
    fetch('https://api.alternative.me/fng/?limit=7', { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject('http'))
      .then(j => {
        const arr = (j.data || []).slice().reverse().map(d => ({
          date: new Date(Number(d.timestamp) * 1000).toISOString().slice(5, 10),
          value: Number(d.value),
          classification: d.value_classification
        }));
        setFng({ data: arr, error: null, loading: false });
      })
      .catch(e => {
        if (e.name !== 'AbortError') setFng({ data: null, error: true, loading: false });
      });
    return () => ctrl.abort();
  }, []);

  React.useEffect(() => {
    const ctrl = new AbortController();
    fetch('https://gamma-api.polymarket.com/markets?limit=10&active=true&closed=false', { signal: ctrl.signal })
      .then(r => r.ok ? r.json() : Promise.reject('http'))
      .then(j => {
        const list = (Array.isArray(j) ? j : (j.data || [])).slice(0, 10).map(m => {
          let yes = null;
          try {
            const prices = typeof m.outcomePrices === 'string' ? JSON.parse(m.outcomePrices) : m.outcomePrices;
            if (Array.isArray(prices) && prices.length > 0) yes = Number(prices[0]);
          } catch { }
          return { id: m.id || m.conditionId, question: m.question || m.slug, yes, volume: m.volume ? Number(m.volume) : null, endDate: m.endDate || m.end_date_iso || '' };
        });
        setPoly({ data: list, error: null, loading: false });
      })
      .catch(e => {
        if (e.name !== 'AbortError') setPoly({ data: null, error: true, loading: false });
      });
    return () => ctrl.abort();
  }, []);

  const fngCurrent = fng.data && fng.data.length > 0 ? fng.data[fng.data.length - 1] : null;
  const fngColor = (v) => v <= 25 ? C.danger : v <= 45 ? C.rust : v <= 55 ? C.gold : v <= 75 ? '#a0c774' : C.sage;
  const fngLabel = (v) => v <= 25 ? 'Extreme Fear' : v <= 45 ? 'Fear' : v <= 55 ? 'Neutral' : v <= 75 ? 'Greed' : 'Extreme Greed';

  return (
    <div className="bento-card span-12">
      <h3 className="card-title"><span><span className="diamond">◆</span><span>Sentiment & feed live</span></span></h3>
      {/* min(100%, 320px): a 360px la colonna minima di 320px sfondava la scheda */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 20 }}>

        {/* Fear & Greed */}
        <div style={{ minWidth: 0 }}>
          <div className="card-eyebrow" style={{ marginBottom: 12 }}>Crypto Fear & Greed (alternative.me)</div>
          {fng.loading && <div style={{ color: C.textMuted, fontSize: 12 }}>Caricamento…</div>}
          {fng.error && <div style={{ color: C.rust, fontSize: 12 }}>Dati non disponibili offline.</div>}
          {fngCurrent && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
                <RadialGauge value={fngCurrent.value} max={100} label={fngCurrent.value} sub={fngLabel(fngCurrent.value).toUpperCase()} color={fngColor(fngCurrent.value)} size={140} />
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={fng.data} margin={scale.margin}>
                  <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                  <XAxis dataKey="date" {...scale.axis} minTickGap={scale.minTickGap} />
                  <YAxis {...scale.axis} width={30} domain={[0, 100]} />
                  <Tooltip {...TT_LINE} />
                  <Line type="monotone" dataKey="value" stroke={C.gold} strokeWidth={2} dot={{ r: 3, fill: C.gold }} />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        {/* Polymarket top */}
        <div style={{ minWidth: 0 }}>
          <div className="card-eyebrow" style={{ marginBottom: 12 }}>Top 10 mercati Polymarket</div>
          {poly.loading && <div style={{ color: C.textMuted, fontSize: 12 }}>Caricamento…</div>}
          {poly.error && <div style={{ color: C.rust, fontSize: 12 }}>Feed non disponibile. Inserisci posizioni manualmente.</div>}
          {poly.data && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 380, overflowY: 'auto' }}>
              {poly.data.length === 0 && <div style={{ color: C.textMuted, fontSize: 12 }}>Nessun mercato attivo.</div>}
              {poly.data.map((m, i) => {
                const yesPct = m.yes != null ? (m.yes <= 1 ? m.yes * 100 : m.yes) : null;
                return (
                  <div key={m.id || i} style={{ border: `1px solid ${C.border}`, padding: 10, borderRadius: 6, display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.question}</div>
                      <div className="mono-font" style={{ fontSize: 10, color: C.textMuted, marginTop: 3 }}>
                        {yesPct != null ? `YES ${yesPct.toFixed(1)}%` : 'YES n/d'}
                        {m.volume != null ? ` · vol ${(m.volume / 1000).toFixed(1)}k` : ''}
                      </div>
                    </div>
                    <button
                      onClick={() => onPrefill({ market: m.question, outcome: 'YES', currency: 'USDC', entryProb: yesPct != null ? Math.max(1, Math.min(99, Math.round(yesPct))) : 50, currentProb: yesPct != null ? Math.max(1, Math.min(99, Math.round(yesPct))) : 50, deadline: (m.endDate || '').slice(0, 10) })}
                      style={{ background: 'transparent', border: `1px solid ${C.goldDim}`, color: C.gold, padding: '4px 10px', fontSize: 11, letterSpacing: '0.06em', cursor: 'pointer', borderRadius: 6, whiteSpace: 'nowrap' }}>
                      + Watchlist
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Markets Tab ── */
const POSITION_STATUSES = ['Aperta', 'Chiusa', 'Vinta', 'Persa'];

function MarketsTab({ markets, onAdd, onUpdate, onRemove, onClose, onUpdateRate }) {
  const [form, setForm] = React.useState({ market: '', outcome: 'YES', currency: 'USDC', capitalRisked: '', entryProb: '', currentProb: '', deadline: '', note: '' });
  const [err, setErr] = React.useState('');
  const formRef = React.useRef(null);
  const scale = useChartScale();

  const handlePrefill = React.useCallback((p) => {
    setForm(f => ({ ...f, ...p, capitalRisked: f.capitalRisked, note: f.note }));
    setErr('');
    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleAdd = () => {
    const cap = Number(form.capitalRisked);
    const ep = Number(form.entryProb);
    const cp = Number(form.currentProb);
    if (!form.market.trim()) { setErr('Inserisci nome mercato'); return; }
    if (!(cap > 0)) { setErr('Capitale deve essere > 0'); return; }
    if (!(ep >= 1 && ep <= 99)) { setErr('Probabilità ingresso 1-99'); return; }
    if (!(cp >= 1 && cp <= 99)) { setErr('Probabilità attuale 1-99'); return; }
    onAdd({
      market: form.market.trim(),
      outcome: form.outcome.trim() || 'YES',
      currency: form.currency,
      capitalRisked: cap,
      entryProb: ep,
      currentProb: cp,
      status: 'Aperta',
      deadline: form.deadline,
      note: form.note
    });
    setForm({ market: '', outcome: 'YES', currency: 'USDC', capitalRisked: '', entryProb: '', currentProb: '', deadline: '', note: '' });
    setErr('');
  };

  const positions = markets.polyPositions || [];
  const open = positions.filter(p => p.status === 'Aperta');
  const won = positions.filter(p => p.status === 'Vinta');
  const lost = positions.filter(p => p.status === 'Persa');

  const rate = Number(markets.eurUsdRate) || 1;
  const openEur = open.filter(p => p.currency === 'EUR').reduce((s, p) => s + Number(p.capitalRisked || 0), 0);
  const openUsd = open.filter(p => p.currency === 'USDC').reduce((s, p) => s + Number(p.capitalRisked || 0), 0);
  const openUsdInEur = openUsd / rate;
  const totalRiskEur = openEur + openUsdInEur;

  const realizedPnl = positions.reduce((s, p) => {
    if (p.status === 'Vinta') return s + p.capitalRisked * ((100 - p.entryProb) / Math.max(1, p.entryProb));
    if (p.status === 'Persa') return s - p.capitalRisked;
    return s;
  }, 0);

  const unrealizedPnl = open.reduce((s, p) => s + p.capitalRisked * ((p.currentProb - p.entryProb) / Math.max(1, p.entryProb)), 0);
  const closedCount = won.length + lost.length;
  const winRate = closedCount > 0 ? (won.length / closedCount) * 100 : 0;

  const positionPnl = (p) => {
    const delta = p.currentProb - p.entryProb;
    if (p.status === 'Aperta') return p.capitalRisked * (delta / Math.max(1, p.entryProb));
    if (p.status === 'Vinta') return p.capitalRisked * ((100 - p.entryProb) / Math.max(1, p.entryProb));
    if (p.status === 'Persa') return -p.capitalRisked;
    return 0;
  };
  const money = (p, v) => p.currency === 'USDC' ? fmtUSD(v) : fmtEUR2(v);
  const signed = (v) => `${v >= 0 ? '+' : ''}${fmtEUR2(v)}`;
  const labelStyle = { fontSize: 10, color: C.textMuted, letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: 6 };

  return (
    <div className="bento">

      {/* Il risultato prima del modulo: prima la scheda si apriva con nove
          campi vuoti e i numeri arrivavano solo dopo una schermata intera */}
      <PageHero label="P&L realizzato" value={realizedPnl} format={signed}
        tone={realizedPnl >= 0 ? C.sage : C.rust}
        meta={<span>{won.length} vinte · {lost.length} perse · {open.length} aperte</span>}
        aside={(
          <div className="arc-stat">
            <ArcMeter pct={winRate / 100} color={closedCount === 0 ? C.textMuted : winRate >= 50 ? C.sage : C.rust} size={84} />
            <div>
              <div className="aside-label" style={{ marginBottom: 6 }}>Win rate</div>
              <div className="stat-value" style={{ color: closedCount === 0 ? C.textDim : winRate >= 50 ? C.sage : C.rust }}>{winRate.toFixed(1)}%</div>
              <div className="stat-hint">{closedCount === 0 ? 'nessuna posizione chiusa' : `su ${closedCount} chiuse`}</div>
            </div>
          </div>
        )} />

      <StatStrip items={[
        { label: 'Capitale a rischio (aperte)', value: fmt(totalRiskEur), color: C.gold, hint: `EUR ${fmtEUR2(openEur)} · USDC ${fmtUSD(openUsd)}` },
        { label: 'P&L non realizzato', value: signed(unrealizedPnl), color: unrealizedPnl >= 0 ? C.sage : C.rust, hint: 'mark-to-market aperte' }
      ]} />

      {/* Positions */}
      <div className="bento-card span-12">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Posizioni</span></span><span className="mono-font" style={{ fontSize: 11, color: C.textMuted }}>{positions.length} totali</span></h3>
        {positions.length === 0 ? (
          <div style={{ padding: '32px 12px', textAlign: 'center', color: C.textMuted }}>
            <p>Nessuna posizione. Aggiungine una dal modulo qui sotto o dalla watchlist Polymarket.</p>
          </div>
        ) : (
          <>
            <div className="desktop-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, minWidth: 900 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {['Mercato', 'Outcome', 'Val.', 'Capitale', 'Prob. ingr', 'Prob. att', 'Δ', 'Quota', 'P&L stim', 'Scad.', 'Stato', ''].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '8px 6px', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', color: C.textMuted, fontWeight: 500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {positions.map(p => {
                    const delta = p.currentProb - p.entryProb;
                    const quota = (100 / Math.max(1, p.entryProb)).toFixed(2);
                    const isOpen = p.status === 'Aperta';
                    const pnl = positionPnl(p);
                    const rowBg = p.status === 'Vinta' ? 'rgba(107,142,111,0.10)'
                      : p.status === 'Persa' ? 'rgba(197,69,69,0.10)'
                        : (isOpen && p.currentProb > p.entryProb) ? 'var(--accent-soft)'
                          : 'transparent';
                    return (
                      <tr key={p.id} className="data-row" style={{ borderBottom: `1px solid ${C.border}`, background: rowBg }}>
                        <td style={{ padding: '8px 6px', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: C.text }}>{p.market}</td>
                        <td className="mono-font" style={{ padding: '8px 6px', color: C.textDim }}>{p.outcome}</td>
                        <td className="mono-font" style={{ padding: '8px 6px', color: C.textDim }}>{p.currency}</td>
                        <td className="mono-font" style={{ padding: '8px 6px', color: C.gold }}>{money(p, p.capitalRisked)}</td>
                        <td className="mono-font" style={{ padding: '8px 6px' }}>{p.entryProb}%</td>
                        <td style={{ padding: '4px 6px', width: 70 }}>
                          <input type="number" className="input-cell mono-font" value={p.currentProb} onChange={e => onUpdate(p.id, 'currentProb', e.target.value)} style={{ fontSize: 12, padding: '4px 2px', textAlign: 'right' }} aria-label="Probabilità attuale" />
                        </td>
                        <td className="mono-font" style={{ padding: '8px 6px', color: delta >= 0 ? C.sage : C.rust }}>{delta >= 0 ? '+' : ''}{delta.toFixed(0)}</td>
                        <td className="mono-font" style={{ padding: '8px 6px', color: C.textDim }}>{quota}x</td>
                        <td className="mono-font" style={{ padding: '8px 6px', color: pnl >= 0 ? C.sage : C.rust }}>{pnl >= 0 ? '+' : ''}{money(p, pnl)}</td>
                        <td className="mono-font" style={{ padding: '8px 6px', color: C.textMuted, fontSize: 11 }}>{p.deadline || '—'}</td>
                        <td style={{ padding: '4px 6px' }}>
                          <select value={p.status} onChange={e => onClose(p.id, e.target.value)} className="input-cell" style={{ background: C.card, fontSize: 11, padding: '4px 2px' }} aria-label="Stato">
                            {POSITION_STATUSES.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                        <td style={{ padding: '8px 6px' }}>
                          <button className="tx-action-btn danger" onClick={() => onRemove(p.id)} aria-label={`Elimina ${p.market}`}><Ic.trash /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Telefono: una scheda per posizione invece di dodici colonne da
                scorrere di lato */}
            <div className="phone-list">
              {positions.map(p => {
                const pnl = positionPnl(p);
                const quota = (100 / Math.max(1, p.entryProb)).toFixed(2);
                return (
                  <div key={p.id} className="m-card">
                    <div className="m-row-top">
                      <div className="m-row-title">{p.market}</div>
                      <span className="m-row-value" style={{ color: pnl >= 0 ? C.sage : C.rust }}>{pnl >= 0 ? '+' : ''}{money(p, pnl)}</span>
                    </div>
                    <div className="m-row-sub">
                      {p.outcome} · {money(p, p.capitalRisked)} · quota {quota}x{p.deadline ? ` · scad. ${p.deadline}` : ''}
                    </div>
                    <div className="m-card-controls">
                      <label className="m-field"><span>Prob. att. (ingr. {p.entryProb}%)</span>
                        <input type="number" inputMode="decimal" className="input-cell" value={p.currentProb} onChange={e => onUpdate(p.id, 'currentProb', e.target.value)} /></label>
                      <label className="m-field"><span>Stato</span>
                        <select value={p.status} onChange={e => onClose(p.id, e.target.value)} className="input-cell" style={{ background: C.card }}>
                          {POSITION_STATUSES.map(s => <option key={s}>{s}</option>)}
                        </select></label>
                      <button className="tx-action-btn danger" onClick={() => onRemove(p.id)} aria-label={`Elimina ${p.market}`}><Ic.trash /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Form */}
      <div className="bento-card span-12" ref={formRef} style={{ scrollMarginTop: 80 }}>
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Aggiungi posizione</span></span></h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: 14, alignItems: 'end' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Mercato</label>
            <input className="input-cell" placeholder="Es. Trump wins 2028" value={form.market} onChange={e => setForm(f => ({ ...f, market: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Outcome</label>
            <input className="input-cell" placeholder="YES / NO" value={form.outcome} onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Valuta</label>
            <select className="input-cell" value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} style={{ background: C.card }}>
              <option>USDC</option><option>EUR</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Capitale</label>
            <input type="number" inputMode="decimal" className="input-cell" placeholder="100" value={form.capitalRisked} onChange={e => setForm(f => ({ ...f, capitalRisked: e.target.value }))} style={{ textAlign: 'right' }} />
          </div>
          <div>
            <label style={labelStyle}>Prob. ingresso %</label>
            <input type="number" inputMode="decimal" className="input-cell" placeholder="35" value={form.entryProb} onChange={e => setForm(f => ({ ...f, entryProb: e.target.value }))} style={{ textAlign: 'right' }} />
          </div>
          <div>
            <label style={labelStyle}>Prob. attuale %</label>
            <input type="number" inputMode="decimal" className="input-cell" placeholder="42" value={form.currentProb} onChange={e => setForm(f => ({ ...f, currentProb: e.target.value }))} style={{ textAlign: 'right' }} />
          </div>
          <div>
            <label style={labelStyle}>Scadenza</label>
            <input type="date" className="input-cell" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Note</label>
            <input className="input-label" placeholder="Tesi, fonte, link…" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
          </div>
          <button className="btn-primary" onClick={handleAdd} style={{ justifyContent: 'center' }}>
            <Ic.plus /> Aggiungi
          </button>
        </div>
        {err && <div className="inline-error" role="alert"><Ic.alert size={15} /><span>{err}</span></div>}
      </div>

      {/* Kelly panel */}
      <div className="bento-card span-6">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Kelly Criterion (posizioni aperte)</span></span></h3>
        {open.length === 0 ? (
          <div style={{ color: C.textMuted, fontSize: 12, padding: 20, textAlign: 'center' }}>Nessuna posizione aperta.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {open.map(p => {
              const ep = p.entryProb;
              const cp = p.currentProb;
              const b = (100 / ep) - 1;
              const pp = cp / 100;
              const q = 1 - pp;
              const f = b > 0 ? (b * pp - q) / b : -1;
              return (
                <div key={p.id} style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: 10 }}>
                  <div style={{ fontSize: 12, color: C.text, marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.market}</div>
                  {f <= 0 ? (
                    <div className="mono-font" style={{ fontSize: 11, color: C.rust }}>Non scommettere (EV negativo)</div>
                  ) : (
                    <div className="mono-font" style={{ fontSize: 11, color: C.sage }}>
                      Kelly: {(f * 100).toFixed(1)}% del bankroll · Half-Kelly: {(f * 50).toFixed(1)}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <p style={{ marginTop: 12, fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>
          Kelly indica la dimensione ottimale teorica della posizione per massimizzare la crescita del bankroll nel lungo periodo. Valori alti vanno dimezzati (Half-Kelly) per prudenza.
        </p>
      </div>

      {/* P&L chart */}
      <div className="bento-card span-6 chart-card">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>P&L realizzato cumulativo</span></span></h3>
        {(!markets.pnlHistory || markets.pnlHistory.length === 0) ? (
          <div style={{ padding: '32px 12px', textAlign: 'center', color: C.textMuted, fontSize: 12 }}>Chiudi le prime posizioni per vedere il grafico.</div>
        ) : (
          <ResponsiveContainer width="100%" height={scale.h(240, 190)}>
            <LineChart data={markets.pnlHistory} margin={scale.margin}>
              <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
              <XAxis dataKey="date" {...scale.axis} minTickGap={scale.minTickGap} />
              <YAxis {...scale.axis} width={scale.yWidth} tickFormatter={fmtTick} />
              <Tooltip {...TT_LINE} formatter={(v) => fmtEUR2(v)} />
              <Line type="monotone" dataKey="pnl" stroke={C.gold} strokeWidth={2.5} dot={{ r: 4, fill: C.gold }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Sentiment */}
      <SentimentPanel onPrefill={handlePrefill} />

      {/* EUR/USD */}
      <div className="bento-card span-12">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <label style={labelStyle}>Tasso EUR/USD</label>
            <input type="number" step="0.0001" inputMode="decimal" className="input-cell mono-font" value={markets.eurUsdRate} onChange={e => onUpdateRate(e.target.value)} style={{ width: 160, textAlign: 'right' }} />
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, flex: 1, minWidth: 'min(100%, 220px)' }}>
            Usato per convertire le posizioni USDC in EUR nei KPI. 1 EUR = {Number(markets.eurUsdRate).toFixed(4)} USD.
          </div>
        </div>
      </div>

    </div>
  );
}

/* ══════════ MOVIMENTI (Entrate & Uscite) ══════════ */
const todayISO = () => new Date().toISOString().slice(0, 10);
const isIncomeCategory = (cat) => INCOME_CATEGORIES.includes(cat);
function itDateLabel(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d} ${(MESI_IT[parseInt(m, 10) - 1] || '').slice(0, 3)} ${y}`;
}
function itMonthLabel(key) {
  if (!key) return '—';
  const [y, m] = key.split('-');
  return `${(MESI_IT[parseInt(m, 10) - 1] || '').replace(/^./, c => c.toUpperCase())} ${y}`;
}
const STATUS_BADGE = { 'Completato': 'badge-sage', 'In sospeso': 'badge-gold', 'Ricorrente': 'badge-teal' };

function AmountDisplay({ amount, type, size = 13 }) {
  const v = Math.abs(Number(amount) || 0);
  const income = type === 'income';
  return (
    <span className="mono-font" style={{ color: income ? C.sage : C.rust, fontSize: size, fontWeight: 500, whiteSpace: 'nowrap' }} title={income ? 'Entrata' : 'Uscita'}>
      {income ? '▲ +' : '▼ −'}{fmtEUR2(v).replace('€', '').trim()} €
    </span>
  );
}

function CategoryBadge({ category }) {
  return <span className={`badge ${isIncomeCategory(category) ? 'badge-sage' : 'badge-neutral'}`}>{category || '—'}</span>;
}
function TypeBadge({ type }) {
  return <span className={`badge ${type === 'income' ? 'badge-sage' : 'badge-rust'}`}>{type === 'income' ? 'Entrata' : 'Uscita'}</span>;
}
function StatusBadge({ status }) {
  return <span className={`badge ${STATUS_BADGE[status] || 'badge-neutral'}`}>{status || '—'}</span>;
}

function TransactionFilters({ filters, onChange, onReset }) {
  const set = (k, v) => onChange({ ...filters, [k]: v });
  const active = filters.from || filters.to || filters.query || (filters.type && filters.type !== 'all') || (filters.category && filters.category !== 'all');
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'flex-end' }}>
      <div>
        <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Dal</label>
        <input type="date" className="input-cell" value={filters.from} onChange={e => set('from', e.target.value)} />
      </div>
      <div>
        <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Al</label>
        <input type="date" className="input-cell" value={filters.to} onChange={e => set('to', e.target.value)} />
      </div>
      <div>
        <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Tipo</label>
        <select className="input-cell" value={filters.type} onChange={e => set('type', e.target.value)} style={{ background: C.card }}>
          <option value="all">Tutti</option>
          <option value="income">Entrate</option>
          <option value="expense">Uscite</option>
        </select>
      </div>
      <div>
        <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Categoria</label>
        <select className="input-cell" value={filters.category} onChange={e => set('category', e.target.value)} style={{ background: C.card }}>
          <option value="all">Tutte</option>
          <optgroup label="Entrate">{INCOME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
          <optgroup label="Uscite">{EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</optgroup>
        </select>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Cerca</label>
        <input type="text" className="input-cell" placeholder="Descrizione o nota…" value={filters.query} onChange={e => set('query', e.target.value)} />
      </div>
      {active && (
        <button className="btn-ghost" onClick={onReset} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 38 }}>
          <Ic.reset /> Reimposta
        </button>
      )}
    </div>
  );
}

function SortHead({ label, col, sort, onSort, align }) {
  const active = sort.key === col;
  return (
    <th className="sortable" onClick={() => onSort(col)} style={align === 'right' ? { textAlign: 'right' } : {}}>
      {label}{active ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ''}
    </th>
  );
}

function TransactionTable({ rows, sort, onSort, onEdit, onDelete, selectedIds, onToggleRow, onToggleAll, allSelected, someSelected }) {
  const sel = selectedIds || new Set();
  /* Raggruppamento per mese, non per giorno: in un registro personale i
     movimenti cadono quasi sempre in date distinte, e per giorno si otteneva
     un'intestazione per riga. Il mese dà anche un saldo che vale la pena
     leggere. Ha senso solo ordinando per data: per importo darebbe gruppi
     spezzettati e fuori ordine. */
  const grouped = sort.key === 'date';
  const dayGroups = useMemo(() => {
    if (!grouped) return [{ key: 'all', net: 0, items: rows }];
    const out = [];
    rows.forEach(t => {
      const key = (t.date || '').slice(0, 7);
      const last = out[out.length - 1];
      const signed = (t.type === 'income' ? 1 : -1) * Math.abs(Number(t.amount) || 0);
      if (last && last.key === key) { last.items.push(t); last.net += signed; }
      else out.push({ key, net: signed, items: [t] });
    });
    return out;
  }, [rows, grouped]);
  return (
    <div>
      <div className="desktop-table" style={{ overflowX: 'auto' }}>
      <table className="tx-table">
        <thead>
          <tr>
            <th className="sel">
              <input type="checkbox" checked={!!allSelected} ref={el => { if (el) el.indeterminate = !!someSelected; }} onChange={() => onToggleAll && onToggleAll()} aria-label="Seleziona tutti i movimenti visibili" />
            </th>
            <SortHead label="Data" col="date" sort={sort} onSort={onSort} />
            <SortHead label="Tipo" col="type" sort={sort} onSort={onSort} />
            <SortHead label="Categoria" col="category" sort={sort} onSort={onSort} />
            <SortHead label="Descrizione" col="description" sort={sort} onSort={onSort} />
            <th>Metodo</th>
            <SortHead label="Importo" col="amount" sort={sort} onSort={onSort} align="right" />
            <SortHead label="Stato" col="status" sort={sort} onSort={onSort} />
            <th style={{ textAlign: 'right' }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={9} style={{ textAlign: 'center', padding: '42px 12px', color: C.textMuted }}>
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: C.gold }}><Ic.alert /></span>
                  Nessun movimento — aggiungine uno o azzera i filtri.
                </div>
              </td>
            </tr>
          )}
          {rows.map(t => (
            <tr key={t.id} className={sel.has(t.id) ? 'selected' : ''}>
              <td className="sel"><input type="checkbox" checked={sel.has(t.id)} onChange={() => onToggleRow && onToggleRow(t.id)} aria-label="Seleziona movimento" /></td>
              <td className="mono-font" style={{ whiteSpace: 'nowrap', color: C.textDim }}>{itDateLabel(t.date)}</td>
              <td><TypeBadge type={t.type} /></td>
              <td><CategoryBadge category={t.category} /></td>
              <td><div className="tx-desc" title={`${t.description || ''}${t.notes ? ' — ' + t.notes : ''}`}>{t.description || '—'}</div></td>
              <td style={{ color: C.textDim, whiteSpace: 'nowrap' }}>{t.paymentMethod || '—'}</td>
              <td style={{ textAlign: 'right' }}><AmountDisplay amount={t.amount} type={t.type} /></td>
              <td><StatusBadge status={t.status} /></td>
              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                <button className="tx-action-btn" title="Modifica" aria-label="Modifica movimento" onClick={() => onEdit(t)}><Ic.edit /></button>
                <button className="tx-action-btn danger" title="Elimina" aria-label="Elimina movimento" onClick={() => onDelete(t)} style={{ marginLeft: 6 }}><Ic.trash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* ── Elenco mobile ──
          Prima: una pila indistinta di schede alte, con l'importo più piccolo
          dei tre badge che gli stavano accanto e nessun appiglio temporale.
          Ora l'importo domina, resta un solo badge e i giorni fanno da
          intestazione adesiva. */}
      <div className="tx-mobile-list">
        {rows.length === 0 && (
          <div className="tx-mobile-card" style={{ alignItems: 'center', textAlign: 'center', color: C.textMuted }}>
            <span style={{ color: C.gold }}><Ic.alert /></span>
            <span>Nessun movimento. Aggiungine uno o azzera i filtri.</span>
          </div>
        )}
        {dayGroups.map(g => (
          <React.Fragment key={g.key}>
            {grouped && (
              <div className="tx-day-head">
                <span>{itMonthLabel(g.key)}</span>
                <span className="day-total" style={{ color: g.net >= 0 ? C.sage : C.rust }}>
                  saldo {g.net >= 0 ? '+' : '−'}{fmt(Math.abs(g.net))}
                </span>
              </div>
            )}
            {g.items.map(t => (
              <article key={t.id} className={`tx-row ${sel.has(t.id) ? 'selected' : ''}`}>
                <input type="checkbox" className="tx-row-check" checked={sel.has(t.id)}
                  onChange={() => onToggleRow && onToggleRow(t.id)} aria-label={`Seleziona ${t.description || 'movimento'}`} />
                {/* Si tocca la riga per modificarla, ed "Elimina" sta nella
                    scheda di modifica. Prima ✎ e 🗑 si prendevano 90px a
                    destra e i badge restavano troncati ("Ta…", "In sos…"). */}
                <button type="button" className="tx-row-open" onClick={() => onEdit(t)} title="Modifica movimento">
                  <span className="tx-row-main">
                    <span className="tx-row-desc">{t.description || '—'}</span>
                    {/* Una riga sola di contorno. Prima erano tre badge più il
                        metodo più la nota: cinque righe di metadati attorno a un
                        importo scritto più piccolo di tutti loro. */}
                    <span className="tx-row-sub">
                      <span className="tx-row-day">{(t.date || '').split('-')[2]} {(MESI_IT[parseInt((t.date || '').split('-')[1], 10) - 1] || '').slice(0, 3)}</span>
                      <CategoryBadge category={t.category} />
                      {/* Lo stato compare solo quando dice qualcosa: "Completato" è il caso normale */}
                      {t.status && t.status !== 'Completato' && <StatusBadge status={t.status} />}
                      {t.paymentMethod && <span className="tx-row-method">{t.paymentMethod}</span>}
                    </span>
                  </span>
                  <span className="tx-row-right">
                    <AmountDisplay amount={t.amount} type={t.type} size={17} />
                  </span>
                </button>
              </article>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function TransactionModal({ initial, onSave, onClose, onDelete }) {
  const seed = initial || { type: 'expense', amount: '', date: todayISO(), category: EXPENSE_CATEGORIES[0], description: '', paymentMethod: PAYMENT_METHODS[0], status: 'Completato', notes: '' };
  const [form, setForm] = useState(seed);
  const [err, setErr] = useState('');
  const editing = !!(initial && initial.id);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const setType = (type) => {
    setForm(f => {
      const list = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
      const category = list.includes(f.category) ? f.category : list[0];
      return { ...f, type, category };
    });
  };
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const catList = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const submit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.type) { setErr('Seleziona il tipo di movimento.'); return; }
    if (!form.date) { setErr('La data è obbligatoria.'); return; }
    if (!(amount > 0)) { setErr('Inserisci un importo maggiore di zero.'); return; }
    if (!form.category) { setErr('Seleziona una categoria.'); return; }
    if (!form.description.trim()) { setErr('La descrizione è obbligatoria.'); return; }
    onSave({
      type: form.type,
      date: form.date,
      amount: Math.round(amount * 100) / 100,
      category: form.category,
      description: form.description.trim(),
      paymentMethod: form.paymentMethod || PAYMENT_METHODS[0],
      status: form.status || 'Completato',
      notes: (form.notes || '').trim()
    });
  };

  return (
    <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <form className="modal-card" onSubmit={submit} role="dialog" aria-modal="true" aria-label={editing ? 'Modifica movimento' : 'Nuovo movimento'}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 className="display-font" style={{ margin: 0, fontSize: 20, fontStyle: 'italic' }}>{editing ? 'Modifica movimento' : 'Nuovo movimento'}</h3>
          <button type="button" className="tx-action-btn" onClick={onClose} aria-label="Chiudi"><Ic.x /></button>
        </div>

        <div className="modal-field">
          <label>Tipo</label>
          <div className="seg-group">
            <button type="button" className={`seg-btn ${form.type === 'income' ? 'active-income' : ''}`} onClick={() => setType('income')}>▲ Entrata</button>
            <button type="button" className={`seg-btn ${form.type === 'expense' ? 'active-expense' : ''}`} onClick={() => setType('expense')}>▼ Uscita</button>
          </div>
        </div>

        <div className="modal-grid">
          <div className="modal-field">
            <label>Importo (€)</label>
            <input type="number" min="0.01" step="0.01" className="input-cell" placeholder="0,00" value={form.amount} onChange={e => upd('amount', e.target.value)} style={{ textAlign: 'right' }} required />
          </div>
          <div className="modal-field">
            <label>Data</label>
            <input type="date" className="input-cell" value={form.date} onChange={e => upd('date', e.target.value)} required />
          </div>
          <div className="modal-field">
            <label>Categoria</label>
            <select className="input-cell" value={form.category} onChange={e => upd('category', e.target.value)} style={{ background: C.card }}>
              {catList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="modal-field">
            <label>Metodo di pagamento</label>
            <select className="input-cell" value={form.paymentMethod} onChange={e => upd('paymentMethod', e.target.value)} style={{ background: C.card }}>
              {PAYMENT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-field">
          <label>Descrizione</label>
          <input type="text" className="input-cell" placeholder="Es. Spesa settimanale supermercato" value={form.description} onChange={e => upd('description', e.target.value)} required />
        </div>

        <div className="modal-field">
          <label>Stato</label>
          <select className="input-cell" value={form.status} onChange={e => upd('status', e.target.value)} style={{ background: C.card }}>
            {TX_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="modal-field">
          <label>Note (facoltativo)</label>
          <textarea className="input-cell" rows={3} placeholder="Dettagli aggiuntivi…" value={form.notes} onChange={e => upd('notes', e.target.value)} style={{ resize: 'vertical' }} />
        </div>

        {err && <div style={{ color: C.danger, fontSize: 12, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><Ic.alert size={14} /> {err}</div>}

        {/* Sul telefono la barra delle azioni resta ancorata in fondo al
            foglio: prima il pulsante di salvataggio stava sotto la tastiera */}
        <div className="modal-actions">
          {editing && onDelete && (
            <button type="button" className="btn-danger modal-delete" onClick={onDelete} aria-label="Elimina movimento"><Ic.trash /><span className="modal-delete-label">Elimina</span></button>
          )}
          <button type="button" className="btn-ghost" onClick={onClose}>Annulla</button>
          <button type="submit" className="btn-primary"><Ic.check /> {editing ? 'Salva modifiche' : 'Aggiungi movimento'}</button>
        </div>
      </form>
    </div>
  );
}

function ImportStatementModal({ existing, onImport, onClose }) {
  const [stage, setStage] = useState('pick'); // pick | loading | review
  const [loading, setLoading] = useState({ msg: '', pct: null });
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleFile = async (file) => {
    if (!file) return;
    setErr(''); setStage('loading'); setLoading({ msg: 'Leggo il file…', pct: null });
    try {
      const name = (file.name || '').toLowerCase();
      let parsed = [];
      if (name.endsWith('.csv') || file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
        parsed = parseStatementCSV(await file.text());
      } else {
        const text = await extractTextFromFile(file, (msg, pct) => setLoading({ msg, pct: pct === undefined ? null : pct }));
        parsed = parseStatementText(text);
        if (!parsed.length) parsed = parseStatementCSV(text);
      }
      if (!parsed.length) { setErr('Nessun movimento riconosciuto. Prova con il CSV esportato dalla tua banca, o un PDF con testo selezionabile.'); setStage('pick'); return; }
      const prepared = parsed.map((r, i) => {
        const type = r.type === 'income' ? 'income' : 'expense';
        return { _id: i, date: r.date, description: r.description || 'Movimento', amount: Math.abs(Number(r.amount) || 0), type, category: guessTxCategory(r.description, type), paymentMethod: guessPaymentMethod(r.description), _dup: isDuplicateTx(r, existing), _checked: !isDuplicateTx(r, existing) };
      });
      setRows(prepared); setStage('review');
    } catch (e) {
      console.error(e);
      setErr(describeImportError(e)); setStage('pick');
    }
  };

  const onPick = (e) => { const f = e.target.files && e.target.files[0]; e.target.value = ''; if (f) handleFile(f); };
  const onDrop = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files && e.dataTransfer.files[0]; if (f) handleFile(f); };
  const setRow = (id, k, v) => setRows(rs => rs.map(r => r._id === id ? { ...r, [k]: v } : r));
  const setRowType = (id, type) => setRows(rs => rs.map(r => r._id === id ? { ...r, type, category: guessTxCategory(r.description, type) } : r));
  const allChecked = rows.length > 0 && rows.every(r => r._checked);
  const toggleAll = () => { const v = !allChecked; setRows(rs => rs.map(r => ({ ...r, _checked: v }))); };
  const selected = rows.filter(r => r._checked);
  const selIncome = txSum(selected.filter(r => r.type === 'income'));
  const selExpense = txSum(selected.filter(r => r.type === 'expense'));

  const doImport = () => {
    if (!selected.length) { setErr('Seleziona almeno un movimento.'); return; }
    const bad = selected.find(r => !r.date || !(Number(r.amount) > 0) || !r.description.trim());
    if (bad) { setErr('Controlla data, importo (> 0) e descrizione delle righe selezionate.'); return; }
    onImport(selected.map(r => ({
      type: r.type, date: r.date, amount: Math.round(Math.abs(Number(r.amount)) * 100) / 100,
      category: r.category, description: r.description.trim(),
      paymentMethod: r.paymentMethod || 'Bonifico', status: 'Completato', notes: 'Importato da estratto conto'
    })));
  };

  return (
    <div className="modal-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal-card ${stage === 'review' ? 'modal-card-wide' : ''}`} role="dialog" aria-modal="true" aria-label="Importa estratto conto">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 className="display-font" style={{ margin: 0, fontSize: 20 }}>Importa estratto conto</h3>
          <button type="button" className="tx-action-btn" onClick={onClose} aria-label="Chiudi"><Ic.x /></button>
        </div>

        {stage === 'pick' && (
          <div style={{ paddingBottom: 16 }}>
            <input id="statement-file" className="file-input" type="file" accept=".csv,text/csv,application/pdf,image/*" onChange={onPick} />
            <label htmlFor="statement-file" className={`dropzone ${dragging ? 'dragging' : ''}`}
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}>
              <span className="dropzone-icon"><Ic.upload size={22} /></span>
              <span className="dropzone-title only-fine">Trascina qui il file oppure clicca per selezionarlo</span>
              <span className="dropzone-title only-coarse">Tocca per scegliere il file</span>
              <span className="dropzone-hint">CSV esportato dalla banca · PDF dell'estratto conto (testo selezionabile)</span>
            </label>
            <p style={{ fontSize: 11, color: C.textMuted, marginTop: 12, lineHeight: 1.5 }}>
              I movimenti riconosciuti verranno mostrati in anteprima: potrai correggere data, descrizione, tipo, categoria e importo prima di confermare. I duplicati (stessa data, importo e descrizione) sono segnalati e pre-deselezionati.
            </p>
            {err && <div className="inline-error" role="alert"><Ic.alert size={15} /><span>{err}</span></div>}
          </div>
        )}

        {stage === 'loading' && (
          <div className="dropzone busy" role="status" aria-live="polite" style={{ marginBottom: 16 }}>
            <span className="dropzone-progress">
              <span className="dropzone-msg">{loading.msg || 'Analisi in corso…'}</span>
              <span className={`progress-track ${loading.pct === null ? 'indeterminate' : ''}`} style={{ display: 'block' }}>
                <span className="progress-fill" style={{ display: 'block', '--fill': loading.pct === null ? 0.35 : loading.pct, background: C.gold }} />
              </span>
            </span>
          </div>
        )}

        {stage === 'review' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <div className="mono-font" style={{ fontSize: 12, color: C.textDim }}>
                {selected.length}/{rows.length} selezionati · <span style={{ color: C.sage }}>Entrate {fmt(selIncome)}</span> · <span style={{ color: C.rust }}>Uscite {fmt(selExpense)}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" className="btn-ghost phone-only" onClick={toggleAll} style={{ padding: '6px 12px' }}>{allChecked ? 'Deseleziona tutti' : 'Seleziona tutti'}</button>
                <button type="button" className="btn-ghost" onClick={() => { setStage('pick'); setRows([]); setErr(''); }} style={{ padding: '6px 12px' }}>Cambia file</button>
              </div>
            </div>
            <div className="desktop-table" style={{ overflowX: 'auto', maxHeight: '52vh', overflowY: 'auto', border: `1px solid ${C.border}`, borderRadius: 8 }}>
              <table className="imp-table">
                <thead>
                  <tr>
                    <th style={{ width: 28 }}><input type="checkbox" checked={allChecked} onChange={toggleAll} aria-label="Seleziona tutti" /></th>
                    <th style={{ width: 130 }}>Data</th>
                    <th>Descrizione</th>
                    <th style={{ width: 96 }}>Tipo</th>
                    <th style={{ width: 150 }}>Categoria</th>
                    <th style={{ width: 110, textAlign: 'right' }}>Importo €</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => {
                    const cats = r.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
                    return (
                      <tr key={r._id} className={r._dup ? 'dup' : ''}>
                        <td><input type="checkbox" checked={r._checked} onChange={() => setRow(r._id, '_checked', !r._checked)} aria-label="Seleziona movimento" /></td>
                        <td><input type="date" className="input-cell" value={r.date} onChange={e => setRow(r._id, 'date', e.target.value)} />{r._dup && <div style={{ fontSize: 9, color: C.gold, marginTop: 2 }}>già presente</div>}</td>
                        <td><input type="text" className="input-cell" value={r.description} onChange={e => setRow(r._id, 'description', e.target.value)} /></td>
                        <td>
                          <select className="input-cell" value={r.type} onChange={e => setRowType(r._id, e.target.value)} style={{ background: C.card }}>
                            <option value="income">Entrata</option>
                            <option value="expense">Uscita</option>
                          </select>
                        </td>
                        <td>
                          <select className="input-cell" value={r.category} onChange={e => setRow(r._id, 'category', e.target.value)} style={{ background: C.card }}>
                            {cats.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </td>
                        <td><input type="number" min="0.01" step="0.01" className="input-cell" value={r.amount} onChange={e => setRow(r._id, 'amount', e.target.value)} style={{ textAlign: 'right' }} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Telefono: una scheda per movimento. Prima era la stessa tabella
                larga 720px, da correggere scorrendo di lato dentro un modale. */}
            <div className="phone-list">
              {rows.map(r => {
                const cats = r.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
                return (
                  <div key={r._id} className={`imp-card ${r._checked ? '' : 'off'}`}>
                    <div className="imp-card-top">
                      <input type="checkbox" className="tx-row-check" checked={r._checked} onChange={() => setRow(r._id, '_checked', !r._checked)} aria-label={`Importa ${r.description}`} />
                      <input type="date" className="input-cell" value={r.date} onChange={e => setRow(r._id, 'date', e.target.value)} aria-label="Data" />
                      <input type="number" inputMode="decimal" min="0.01" step="0.01" className="input-cell" value={r.amount} onChange={e => setRow(r._id, 'amount', e.target.value)} aria-label="Importo in euro" style={{ textAlign: 'right' }} />
                    </div>
                    <input type="text" className="input-cell" value={r.description} onChange={e => setRow(r._id, 'description', e.target.value)} aria-label="Descrizione" />
                    <div className="imp-card-selects">
                      <select className="input-cell" value={r.type} onChange={e => setRowType(r._id, e.target.value)} style={{ background: C.card }} aria-label="Tipo">
                        <option value="income">Entrata</option>
                        <option value="expense">Uscita</option>
                      </select>
                      <select className="input-cell" value={r.category} onChange={e => setRow(r._id, 'category', e.target.value)} style={{ background: C.card }} aria-label="Categoria">
                        {cats.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    {r._dup && <div className="imp-dup">Già presente nel registro: resta escluso finché non lo selezioni.</div>}
                  </div>
                );
              })}
            </div>
            {err && <div className="inline-error" role="alert"><Ic.alert size={15} /><span>{err}</span></div>}
            <div className="modal-actions">
              <button type="button" className="btn-ghost" onClick={onClose}>Annulla</button>
              <button type="button" className="btn-primary" onClick={doImport}><Ic.check /> Importa {selected.length} {selected.length === 1 ? 'movimento' : 'movimenti'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TransactionsTab({ data, onAdd, onUpdate, onDelete, onImport, onBulkDelete }) {
  const all = data.transactions || [];
  const emptyFilters = { from: '', to: '', type: 'all', category: 'all', query: '' };
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });
  const [modal, setModal] = useState(null); // null | { kind:'add'|'edit'|'import', tx? }
  const [selected, setSelected] = useState(() => new Set());
  const [filterSheet, setFilterSheet] = useState(false);
  const activeFilterCount = ['from', 'to', 'query'].filter(k => filters[k]).length
    + (filters.type !== 'all' ? 1 : 0) + (filters.category !== 'all' ? 1 : 0);

  const filtered = useMemo(() => filterTransactions(all, filters), [all, filters]);
  const sorted = useMemo(() => sortTransactions(filtered, sort.key, sort.dir), [filtered, sort.key, sort.dir]);
  const overall = useMemo(() => txTotals(all), [all]);
  const filteredTotals = useMemo(() => txTotals(filtered), [filtered]);

  // Mantieni la selezione solo sulle righe ancora visibili (filtri/eliminazioni)
  useEffect(() => {
    const visible = new Set(filtered.map(r => r.id));
    setSelected(prev => {
      const next = new Set([...prev].filter(id => visible.has(id)));
      return next.size === prev.size ? prev : next;
    });
  }, [filtered]);

  const visibleIds = useMemo(() => sorted.map(r => r.id), [sorted]);
  const allSelected = visibleIds.length > 0 && visibleIds.every(id => selected.has(id));
  const someSelected = visibleIds.some(id => selected.has(id)) && !allSelected;
  const toggleRow = (id) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSelected(prev => {
    const n = new Set(prev);
    if (visibleIds.every(id => n.has(id))) visibleIds.forEach(id => n.delete(id));
    else visibleIds.forEach(id => n.add(id));
    return n;
  });
  const clearSel = () => setSelected(new Set());
  const handleBulkDelete = () => {
    const ids = [...selected];
    if (!ids.length) return;
    if (window.confirm(`Eliminare ${ids.length} ${ids.length === 1 ? 'movimento selezionato' : 'movimenti selezionati'}?`)) {
      onBulkDelete(ids);
      clearSel();
    }
  };

  const months = useMemo(() => monthlyTotals(all), [all]);
  const monthKeys = useMemo(() => Object.keys(months).sort(), [months]);
  const curKey = monthKeys[monthKeys.length - 1];
  const prevKey = monthKeys[monthKeys.length - 2];
  const cur = curKey ? months[curKey] : { income: 0, expenses: 0, net: 0 };
  const prev = prevKey ? months[prevKey] : null;
  const curRate = savingsRate(cur.income, cur.expenses);
  const prevRate = prev ? savingsRate(prev.income, prev.expenses) : null;
  const pctChange = (a, b) => (b && b !== 0 ? (a - b) / Math.abs(b) : null);

  const onSort = (key) => setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'date' || key === 'amount' ? 'desc' : 'asc' });

  const handleDelete = (t) => {
    if (!window.confirm(`Eliminare il movimento "${t.description}" del ${itDateLabel(t.date)}?`)) return false;
    onDelete(t.id);
    return true;
  };
  const handleSave = (payload) => {
    if (modal && modal.kind === 'edit') onUpdate(modal.tx.id, payload); else onAdd(payload);
    setModal(null);
  };

  return (
    <div className="bento">
      {/* ── Hero: il saldo, e accanto il mese in corso ──
          Prima un'intestazione testuale e quattro schede identiche, con il
          saldo grande quanto il tasso di risparmio. */}
      <PageHero label="Saldo netto" value={overall.netBalance}
        tone={overall.netBalance >= 0 ? C.sage : C.rust}
        meta={<>
          {curKey && <span>{itMonthLabel(curKey)}: <strong style={{ color: cur.net >= 0 ? C.sage : C.rust }}>{cur.net >= 0 ? '+' : '−'}{fmt(Math.abs(cur.net))}</strong></span>}
          <TrendTag trend={pctChange(cur.net, prev ? prev.net : null)} />
          <span>{all.length} movimenti registrati</span>
        </>}
        aside={curKey ? (
          <PartBars title={`Il mese · ${itMonthLabel(curKey)}`} total={Math.max(cur.income, cur.expenses)} parts={[
            { name: 'Entrate', value: cur.income, color: C.sage, share: '' },
            { name: 'Uscite', value: cur.expenses, color: C.rust, share: cur.income > 0 ? `${fmtPct(cur.expenses / cur.income)} delle entrate` : '' }
          ]} />
        ) : null}
        footClass="desktop-only"
        foot={<>
          <p className="hero-note">Registro di tutti i flussi di denaro in entrata e in uscita: traccia, filtra e analizza ogni movimento.</p>
          {/* Sul telefono l'azione principale vive nel pulsante flottante in
              basso, a portata di pollice; l'importazione sta accanto ai filtri */}
          <div className="tx-head-actions">
            <button className="btn-ghost" onClick={() => setModal({ kind: 'import' })} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Ic.upload /> Importa estratto conto</button>
            <button className="btn-primary" onClick={() => setModal({ kind: 'add' })}><Ic.plus /> Aggiungi movimento</button>
          </div>
        </>} />

      <StatStrip items={[
        {
          label: 'Entrate totali', value: fmt(overall.totalIncome), color: C.sage,
          hint: <><TrendTag trend={pctChange(cur.income, prev ? prev.income : null)} />{curKey ? `${itMonthLabel(curKey)}: ${fmt(cur.income)}` : 'nessun dato'}</>
        },
        {
          label: 'Uscite totali', value: fmt(overall.totalExpenses), color: C.rust,
          hint: <><TrendTag trend={pctChange(cur.expenses, prev ? prev.expenses : null)} invert />{curKey ? `${itMonthLabel(curKey)}: ${fmt(cur.expenses)}` : 'nessun dato'}</>
        },
        {
          label: 'Tasso di risparmio (mese)', value: fmtPct(curRate),
          color: curRate >= 0.2 ? C.sage : curRate >= 0.1 ? C.gold : C.rust,
          hint: <><TrendTag trend={prevRate !== null ? (curRate - prevRate) : null} />{prevRate !== null ? `${itMonthLabel(prevKey)}: ${fmtPct(prevRate)}` : (curKey ? itMonthLabel(curKey) : 'nessun dato')}</>
        }
      ]} />

      {/* Filtri: aperti sul desktop, dietro un chip sul telefono — cinque
          campi a tutta larghezza rubavano una schermata intera prima di
          arrivare ai movimenti */}
      <div className="bento-card span-12 tx-filter-card">
        <h3 className="card-title"><span><span className="diamond">◆</span><span>Filtri</span></span></h3>
        <TransactionFilters filters={filters} onChange={setFilters} onReset={() => setFilters(emptyFilters)} />
      </div>
      {/* Sul telefono "Importa estratto conto" era nascosto insieme alle azioni
          dell'intestazione, e non c'era altro modo di raggiungerlo */}
      <div className="tx-filter-chip-wrap span-12">
        <button className="month-chip" onClick={() => setFilterSheet(true)} aria-haspopup="dialog">
          <Ic.search /> Filtri{activeFilterCount ? ` · ${activeFilterCount}` : ''}
        </button>
        <button className="month-chip" onClick={() => setModal({ kind: 'import' })} aria-haspopup="dialog">
          <Ic.upload /> Importa
        </button>
      </div>
      {filterSheet && (
        <Sheet title="Filtri" onClose={() => setFilterSheet(false)}>
          <div style={{ padding: '4px 10px 12px' }}>
            <TransactionFilters filters={filters} onChange={setFilters} onReset={() => setFilters(emptyFilters)} />
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 18 }} onClick={() => setFilterSheet(false)}>
              Mostra {sorted.length} {sorted.length === 1 ? 'movimento' : 'movimenti'}
            </button>
          </div>
        </Sheet>
      )}

      {/* Table */}
      <div className="bento-card span-12">
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
          <span><span className="diamond">◆</span><span>Movimenti</span></span>
          <span className="mono-font" style={{ fontSize: 12, color: C.textDim }}>
            {sorted.length} {sorted.length === 1 ? 'voce' : 'voci'} · <span style={{ color: C.sage }}>Entrate {fmt(filteredTotals.totalIncome)}</span> · <span style={{ color: C.rust }}>Uscite {fmt(filteredTotals.totalExpenses)}</span> · Saldo {fmt(filteredTotals.netBalance)}
          </span>
        </div>
        {selected.size > 0 && (
          <div className="tx-bulkbar">
            <span className="mono-font" style={{ fontSize: 12, color: C.gold }}>{selected.size} {selected.size === 1 ? 'movimento selezionato' : 'movimenti selezionati'}</span>
            <span style={{ flex: 1 }} />
            <button className="btn-ghost" onClick={clearSel} style={{ padding: '8px 14px' }}>Annulla selezione</button>
            <button className="btn-danger" onClick={handleBulkDelete}><Ic.trash /> Elimina selezionati</button>
          </div>
        )}
        <TransactionTable rows={sorted} sort={sort} onSort={onSort}
          onEdit={(t) => setModal({ kind: 'edit', tx: t })} onDelete={handleDelete}
          selectedIds={selected} onToggleRow={toggleRow} onToggleAll={toggleAll} allSelected={allSelected} someSelected={someSelected} />
      </div>

      {modal && (modal.kind === 'add' || modal.kind === 'edit') && (
        <TransactionModal key={modal.kind === 'edit' ? modal.tx.id : 'new'} initial={modal.kind === 'edit' ? modal.tx : null} onSave={handleSave} onClose={() => setModal(null)}
          onDelete={modal.kind === 'edit' ? () => { if (handleDelete(modal.tx)) setModal(null); } : undefined} />
      )}
      {modal && modal.kind === 'import' && (
        <ImportStatementModal existing={all} onImport={(list) => { onImport(list); setModal(null); }} onClose={() => setModal(null)} />
      )}

      {/* Azione principale a portata di pollice, sopra la barra di navigazione */}
      <button className="fab" onClick={() => setModal({ kind: 'add' })} aria-label="Aggiungi movimento">
        <Ic.plus size={18} /> Aggiungi
      </button>
    </div>
  );
}

/* ── Main App ── */
function FinanceDashboard() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return normalizeData(parsed);
      }
      return DEFAULT_DATA;
    } catch { return DEFAULT_DATA; }
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch { return 'dark'; }
  });
  const [toast, setToast] = useState('');
  const [actionSheet, setActionSheet] = useState(false);
  const [profileSheet, setProfileSheet] = useState(false);
  const fileInputRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { }
  }, [data]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(THEME_KEY, theme); } catch { }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const totals = useMemo(() => {
    // Cerca cedolino per il mese corrente
    const currentISO = profileMonthToISO(data.profile.month);
    const cedolinoAttivo = (data.cedolini || []).find(c => c.month === currentISO);

    // Se esiste cedolino attivo, sostituisce la prima voce income (stipendio)
    const incomeEffettivo = cedolinoAttivo
      ? data.income.map((item, i) => i === 0 ? { ...item, amount: cedolinoAttivo.netto } : item)
      : data.income;

    const totalIncome = incomeEffettivo.reduce((s, i) => s + Number(i.amount || 0), 0);
    const totalFixed = data.fixedExpenses.reduce((s, i) => s + Number(i.amount || 0), 0);
    const totalLoans = data.loans.reduce((s, i) => s + Number(i.amount || 0), 0);
    const totalVariable = data.variableExpenses.reduce((s, i) => s + Number(i.amount || 0), 0);
    const totalInvestMonthly = data.investments.reduce((s, i) => s + Number(i.monthly || 0), 0);
    const totalInvestCurrent = data.investments.reduce((s, i) => s + Number(i.current || 0), 0);
    const totalOutflow = totalFixed + totalLoans + totalVariable + totalInvestMonthly;
    const monthlySaving = totalIncome - totalOutflow;
    const savingRate = totalIncome > 0 ? monthlySaving / totalIncome : 0;
    const netWorth = (data.liquidity.current || 0) + totalInvestCurrent;
    const essentialExpenses = totalFixed + totalLoans + totalVariable;
    const emergencyMonths = essentialExpenses > 0 ? (data.liquidity.current || 0) / essentialExpenses : 0;
    return { totalIncome, totalFixed, totalLoans, totalVariable, totalInvestMonthly, totalInvestCurrent, totalOutflow, monthlySaving, savingRate, netWorth, emergencyMonths, essentialExpenses, cedolinoAttivo };
  }, [data]);

  const projection = useMemo(() => {
    const months = 60; const result = [];
    let liq = data.liquidity.current;
    let investments = data.investments.map(i => ({ ...i }));
    const loans = data.loans.map(l => ({ ...l }));
    const annualReturns = { 'Pensione': 0.04, 'Cripto': 0.12, 'Equity': 0.07, 'Bond': 0.03, 'Liquidita': 0.02 };
    for (let m = 0; m <= months; m++) {
      const totalInv = investments.reduce((s, i) => s + i.current, 0);
      result.push({ month: m, liquidity: Math.round(liq), investments: Math.round(totalInv), netWorth: Math.round(liq + totalInv) });
      if (m === months) break;
      const activeLoans = loans.filter(l => l.monthsLeft > m).reduce((s, l) => s + Number(l.amount || 0), 0);
      const saving = totals.totalIncome - totals.totalFixed - activeLoans - totals.totalVariable - totals.totalInvestMonthly;
      liq += saving;
      investments = investments.map(inv => {
        const annual = annualReturns[inv.type] ?? 0.05;
        const monthlyRate = Math.pow(1 + annual, 1 / 12) - 1;
        return { ...inv, current: inv.current * (1 + monthlyRate) + Number(inv.monthly || 0) };
      });
    }
    return result;
  }, [data, totals]);

  const expenseBreakdown = useMemo(() => {
    const items = [];
    data.fixedExpenses.forEach(e => items.push({ name: e.label, value: Number(e.amount || 0) }));
    data.loans.forEach(e => items.push({ name: e.label, value: Number(e.amount || 0) }));
    data.variableExpenses.forEach(e => items.push({ name: e.label, value: Number(e.amount || 0) }));
    return items.filter(i => i.value > 0);
  }, [data]);

  const updateField = useCallback((section, id, field, value) => {
    setData(prev => ({ ...prev, [section]: prev[section].map(item => item.id === id ? { ...item, [field]: ['label', 'type', 'risk', 'deadline'].includes(field) ? value : Number(value) || 0 } : item) }));
  }, []);
  const addItem = useCallback((section, template) => {
    setData(prev => { const newId = Math.max(0, ...prev[section].map(i => i.id)) + 1; return { ...prev, [section]: [...prev[section], { id: newId, ...template }] }; });
  }, []);
  const removeItem = useCallback((section, id) => {
    setData(prev => ({ ...prev, [section]: prev[section].filter(i => i.id !== id) }));
  }, []);
  const updateLiquidity = useCallback((field, val) => {
    setData(prev => ({ ...prev, liquidity: { ...prev.liquidity, [field]: Number(val) || 0 } }));
  }, []);
  const updateMortgage = useCallback((field, val) => {
    setData(prev => ({ ...prev, mortgage: { ...(prev.mortgage || {}), [field]: Number(val) || 0 } }));
  }, []);

  const updateInvestmentTarget = useCallback((category, value) => {
    setData(prev => ({
      ...prev,
      investmentsMeta: {
        ...prev.investmentsMeta,
        targetAllocation: { ...prev.investmentsMeta.targetAllocation, [category]: Number(value) || 0 }
      }
    }));
  }, []);

  const addPolyPosition = useCallback((pos) => {
    setData(prev => ({
      ...prev,
      markets: { ...prev.markets, polyPositions: [...prev.markets.polyPositions, { ...pos, id: Date.now() }] }
    }));
    showToast('Posizione aggiunta');
  }, [showToast]);

  const updatePolyPosition = useCallback((id, field, value) => {
    setData(prev => {
      const strFields = ['market', 'outcome', 'currency', 'status', 'deadline', 'note'];
      return {
        ...prev,
        markets: {
          ...prev.markets,
          polyPositions: prev.markets.polyPositions.map(x =>
            x.id === id ? { ...x, [field]: strFields.includes(field) ? value : (Number(value) || 0) } : x
          )
        }
      };
    });
  }, []);

  const removePolyPosition = useCallback((id) => {
    setData(prev => ({
      ...prev,
      markets: { ...prev.markets, polyPositions: prev.markets.polyPositions.filter(x => x.id !== id) }
    }));
  }, []);

  const closePolyPosition = useCallback((id, status) => {
    setData(prev => {
      const pos = prev.markets.polyPositions.find(x => x.id === id);
      if (!pos) return prev;
      const wasOpen = pos.status === 'Aperta' || pos.status === 'Chiusa';
      const becameResolved = status === 'Vinta' || status === 'Persa';
      const updated = prev.markets.polyPositions.map(x => x.id === id ? { ...x, status } : x);
      let hist = prev.markets.pnlHistory;
      if (becameResolved && wasOpen) {
        const realized = status === 'Vinta'
          ? pos.capitalRisked * ((100 - pos.entryProb) / Math.max(1, pos.entryProb))
          : -pos.capitalRisked;
        const month = new Date().toISOString().slice(0, 7);
        const prevCum = hist.length ? hist[hist.length - 1].pnl : 0;
        hist = [...hist, { date: month, pnl: prevCum + realized }];
      }
      return { ...prev, markets: { ...prev.markets, polyPositions: updated, pnlHistory: hist } };
    });
  }, []);

  const updateEurUsd = useCallback((rate) => {
    setData(prev => ({ ...prev, markets: { ...prev.markets, eurUsdRate: Number(rate) || 1 } }));
  }, []);

  /* Sull'app installata su iPhone un download da blob apre un'anteprima senza
     via d'uscita: il foglio di condivisione invece offre "Salva su File".
     Altrove resta il download, con il link agganciato alla pagina (Firefox lo
     ignora se è staccato) e l'URL revocato dopo, non nello stesso istante. */
  const exportJSON = useCallback(async () => {
    const name = `budget_${data.profile.month.replace(/\s/g, '_')}.json`;
    const json = JSON.stringify(data, null, 2);
    try {
      const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      const file = new File([json], name, { type: 'application/json' });
      if (touch && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: name });
        showToast('Backup pronto: salvalo in File');
        return;
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
    }
    const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    showToast('Dati esportati con successo');
  }, [data, showToast]);

  const importJSON = useCallback((e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.income && parsed.fixedExpenses) { setData(normalizeData(parsed)); showToast('Dati importati con successo'); }
        else { showToast('Formato JSON non riconosciuto'); }
      } catch { showToast('File JSON non valido'); }
    };
    reader.readAsText(file); e.target.value = '';
  }, [showToast]);

  const resetData = useCallback(() => {
    if (confirm('Sicuro di voler ripristinare i dati di default?')) { setData(DEFAULT_DATA); showToast('Dati ripristinati'); }
  }, [showToast]);

  const addCedolino = useCallback((cedolino) => {
    setData(prev => ({ ...prev, cedolini: [...(prev.cedolini || []), cedolino] }));
    showToast('Cedolino aggiunto');
  }, [showToast]);

  const removeCedolino = useCallback((id) => {
    setData(prev => ({ ...prev, cedolini: (prev.cedolini || []).filter(c => c.id !== id) }));
    showToast('Cedolino rimosso');
  }, [showToast]);

  const addTransaction = useCallback((tx) => {
    const now = new Date().toISOString();
    setData(prev => ({ ...prev, transactions: [...(prev.transactions || []), { ...tx, id: Date.now(), createdAt: now, updatedAt: now }] }));
    showToast('Movimento aggiunto');
  }, [showToast]);
  const updateTransaction = useCallback((id, tx) => {
    const now = new Date().toISOString();
    setData(prev => ({ ...prev, transactions: (prev.transactions || []).map(t => t.id === id ? { ...t, ...tx, id, updatedAt: now } : t) }));
    showToast('Movimento aggiornato');
  }, [showToast]);
  const deleteTransaction = useCallback((id) => {
    setData(prev => ({ ...prev, transactions: (prev.transactions || []).filter(t => t.id !== id) }));
    showToast('Movimento eliminato');
  }, [showToast]);
  const deleteTransactions = useCallback((ids) => {
    if (!ids || !ids.length) return;
    const set = new Set(ids);
    setData(prev => ({ ...prev, transactions: (prev.transactions || []).filter(t => !set.has(t.id)) }));
    showToast(`${ids.length} ${ids.length === 1 ? 'movimento eliminato' : 'movimenti eliminati'}`);
  }, [showToast]);
  const importTransactions = useCallback((list) => {
    if (!list || !list.length) return;
    const now = new Date().toISOString();
    let nextId = Date.now();
    setData(prev => ({ ...prev, transactions: [...(prev.transactions || []), ...list.map(tx => ({ ...tx, id: nextId++, createdAt: now, updatedAt: now }))] }));
    showToast(`${list.length} ${list.length === 1 ? 'movimento importato' : 'movimenti importati'}`);
  }, [showToast]);

  const currentISO = profileMonthToISO(data.profile.month);

  const saveSnapshot = useCallback(() => {
    const snapshot = {
      date: new Date().toISOString().slice(0, 7),
      netWorth: totals.netWorth, income: totals.totalIncome, saving: totals.monthlySaving,
      liquidity: data.liquidity.current, investments: totals.totalInvestCurrent
    };
    setData(prev => ({ ...prev, history: [...(prev.history || []).filter(h => h.date !== snapshot.date), snapshot].sort((a, b) => a.date.localeCompare(b.date)) }));
    showToast('Snapshot mese salvato');
  }, [totals, data.liquidity.current, showToast]);

  const tabs = [
    { id: 'overview', label: 'Quadro', icon: Ic.dashboard },
    { id: 'income', label: 'Entrate & Spese', icon: Ic.wallet },
    { id: 'transactions', label: 'Movimenti', icon: Ic.exchange },
    { id: 'investments', label: 'Investimenti', icon: Ic.trend },
    { id: 'markets', label: 'Mercati', icon: Ic.candle },
    { id: 'projection', label: 'Proiezioni', icon: Ic.chart },
    { id: 'mortgage', label: 'Mutui', icon: Ic.home },
    { id: 'history', label: 'Storico', icon: Ic.clock },
    { id: 'cedolini', label: 'Cedolini', icon: Ic.receipt },
  ];

  /* Ordinato per significato, non per tinta: caldo = speso, oro = allocato,
     salvia = trattenuto. Prima erano cinque colori scorrelati. */
  const barData = [
    { name: 'Fisse', value: totals.totalFixed, fill: 'var(--chart-1)' },
    { name: 'Rate', value: totals.totalLoans, fill: 'var(--chart-2)' },
    { name: 'Variabili', value: totals.totalVariable, fill: 'var(--chart-3)' },
    { name: 'Investim.', value: totals.totalInvestMonthly, fill: 'var(--chart-4)' },
    { name: 'Risparmio', value: Math.max(0, totals.monthlySaving), fill: RETAINED }
  ];

  const latestHistory = data.history && data.history.length > 0 ? data.history[data.history.length - 1] : null;
  const netTrend = latestHistory ? (totals.netWorth - latestHistory.netWorth) : 0;
  const netTrendPct = latestHistory && latestHistory.netWorth > 0 ? netTrend / latestHistory.netWorth : 0;

  /* La sparkline usa lo storico reale più il valore di adesso, così l'ultimo
     punto è sempre il presente. */
  const sparkPoints = useMemo(() => {
    const hist = (data.history || []).map(h => h.netWorth);
    return [...hist, totals.netWorth];
  }, [data.history, totals.netWorth]);
  const savingColor = totals.savingRate >= 0.2 ? C.sage : totals.savingRate >= 0.1 ? C.gold : C.rust;
  const activeTabLabel = (tabs.find(t => t.id === activeTab) || {}).label || 'Quadro';
  const scale = useChartScale();
  const narrow = scale.narrow;
  const chartH = scale.h;

  /* Composizione del patrimonio: la liquidità in grigio, le posizioni sulla
     rampa. Prima i colori andavano per indice e oltre sei voci finivano. */
  const composition = useMemo(() => {
    const rows = [{ name: 'Liquidita', value: Number(data.liquidity.current) || 0, color: C.textDim }];
    data.investments.forEach((i, k) => rows.push({ name: i.label, value: Number(i.current) || 0, color: OUTFLOW[k % OUTFLOW.length] }));
    return rows.filter(d => d.value > 0);
  }, [data.liquidity, data.investments]);

  return (
    <div className="app-shell">
      <Toast message={toast} />
      {/* Fuori dalla barra desktop, che sul telefono è display:none, e con
          l'estensione oltre al tipo: su iPhone con il solo "application/json"
          il selettore poteva lasciare i backup in grigio */}
      <input ref={fileInputRef} className="file-input" type="file" accept=".json,application/json" onChange={importJSON} tabIndex={-1} aria-hidden="true" />
      <Sidebar tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <MobileNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="main-area">

        {/* ── Barra mobile ──
            Una riga sola. Prima cinque bottoni di pari peso andavano a capo su
            due righe e occupavano tutta la prima schermata del telefono, senza
            che si vedesse un solo numero. */}
        <header className="mobile-topbar">
          <h1>{activeTabLabel}</h1>
          <button className="month-chip" onClick={() => setProfileSheet(true)} aria-haspopup="dialog">
            <Ic.calendar /> {data.profile.month}
          </button>
          <button className="icon-btn" onClick={() => setActionSheet(true)} aria-label="Altre azioni" aria-haspopup="dialog" style={{ minWidth: 40, justifyContent: 'center' }}>
            <Ic.more size={16} />
          </button>
        </header>

        {/* ── Top bar (desktop) ── */}
        <header className="topbar">
          <div className="topbar-title">
            {/* Il titolo segue la sezione: prima diceva "Il tuo Quadro" anche
                dentro Mutui o Cedolini */}
            <h1>{activeTab === 'overview' ? <><span>Il tuo</span> Quadro</> : activeTabLabel}</h1>
            <div className="topbar-meta">
              <input type="text" value={data.profile.name} onChange={e => setData(p => ({ ...p, profile: { ...p.profile, name: e.target.value } }))} className="input-label" style={{ width: 120, borderBottom: `1px dotted ${C.border}` }} aria-label="Nome" />
              <span style={{ color: C.textMuted }}>·</span>
              <input type="text" value={data.profile.month} onChange={e => setData(p => ({ ...p, profile: { ...p.profile, month: e.target.value } }))} className="input-label" style={{ width: 130, borderBottom: `1px dotted ${C.border}` }} aria-label="Mese di riferimento" />
            </div>
          </div>
          {/* Una sola azione primaria; le utility passano dietro il menu ⋯ */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="icon-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Passa alla versione chiara' : 'Passa alla versione scura'} title={theme === 'dark' ? 'Passa alla versione chiara' : 'Passa alla versione scura'} style={{ minWidth: 40, justifyContent: 'center' }}>
              <Ic.theme />
            </button>
            <button className="btn-primary" onClick={saveSnapshot}><Ic.check /> Salva snapshot</button>
            <button className="icon-btn" onClick={() => setActionSheet(true)} aria-label="Altre azioni" aria-haspopup="dialog" style={{ minWidth: 40, justifyContent: 'center' }}>
              <Ic.more size={16} />
            </button>
          </div>
        </header>

        {/* Azioni di servizio: stessa lista su desktop e telefono.
            Reset sta in fondo, separato e in rosso: prima aveva lo stesso peso
            visivo di Snapshot pur cancellando tutto. */}
        {actionSheet && (
          <Sheet title="Azioni" onClose={() => setActionSheet(false)}>
            <button className="sheet-row" onClick={() => { setActionSheet(false); saveSnapshot(); }}>
              <Ic.check size={18} /><span>Salva snapshot del mese</span>
            </button>
            <button className="sheet-row" onClick={() => { setActionSheet(false); exportJSON(); }}>
              <Ic.download size={18} /><span>Esporta dati (JSON)</span>
            </button>
            <button className="sheet-row" onClick={() => { fileInputRef.current?.click(); setActionSheet(false); }}>
              <Ic.upload size={18} /><span>Importa dati (JSON)</span>
            </button>
            <button className="sheet-row" onClick={() => { setActionSheet(false); toggleTheme(); }}>
              <Ic.theme size={18} /><span>{theme === 'dark' ? 'Passa alla versione chiara' : 'Passa alla versione scura'}</span>
            </button>
            <div style={{ borderTop: `1px solid ${C.border}`, margin: '8px 0' }} />
            <button className="sheet-row" style={{ color: C.danger }} onClick={() => { setActionSheet(false); resetData(); }}>
              <Ic.reset size={18} /><span>Ripristina i dati di default</span>
            </button>
          </Sheet>
        )}

        {profileSheet && (
          <Sheet title="Profilo e mese" onClose={() => setProfileSheet(false)}>
            <div style={{ padding: '4px 10px 12px' }}>
              <div className="modal-field">
                <label htmlFor="pf-name">Nome</label>
                <input id="pf-name" type="text" className="input-cell" value={data.profile.name}
                  onChange={e => setData(p => ({ ...p, profile: { ...p.profile, name: e.target.value } }))} />
              </div>
              <div className="modal-field">
                <label htmlFor="pf-month">Mese di riferimento</label>
                <input id="pf-month" type="text" className="input-cell" value={data.profile.month}
                  placeholder="Aprile 2026"
                  onChange={e => setData(p => ({ ...p, profile: { ...p.profile, month: e.target.value } }))} />
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setProfileSheet(false)}>Fatto</button>
            </div>
          </Sheet>
        )}

        <main>

          {/* ══════ OVERVIEW — BENTO ══════ */}
          {activeTab === 'overview' && (
            <div className="bento">

              {/* ── Hero: il patrimonio netto, e null'altro alla sua scala ──
                  Prima cinque schede identiche si contendevano l'attenzione e
                  il numero che conta era grande quanto gli altri. */}
              <PageHero label="Patrimonio netto" value={totals.netWorth}
                meta={latestHistory ? (
                  <>
                    <HeroDelta up={netTrend >= 0}>{fmt(Math.abs(netTrend))} ({fmtPct(Math.abs(netTrendPct))})</HeroDelta>
                    <span>rispetto a {itMonthLabel(latestHistory.date)}</span>
                  </>
                ) : (
                  <span>Liquidita {fmt(data.liquidity.current)} + Investimenti {fmt(totals.totalInvestCurrent)}</span>
                )}
                aside={(
                  <>
                    {/* L'affianco porta sempre un dato vero: l'andamento quando
                        c'è storico, altrimenti da cosa è fatto il patrimonio.
                        Mai un riquadro pieno d'aria. */}
                    {sparkPoints.length >= 2 && (
                      <div>
                        <div className="aside-label" style={{ marginBottom: 8 }}>Andamento · {sparkPoints.length} rilevazioni</div>
                        <Sparkline points={sparkPoints} color={C.gold} />
                      </div>
                    )}
                    <div>
                      {/* "Da cosa è fatto" e non "Composizione": più in basso
                          c'è già una scheda con quel titolo, e due etichette
                          uguali nella stessa schermata si leggono male */}
                      <PartBars title="Da cosa è fatto" total={totals.netWorth} parts={[
                        { name: 'Liquidita', value: data.liquidity.current, color: C.textDim },
                        { name: 'Investimenti', value: totals.totalInvestCurrent, color: C.gold }
                      ]} />
                      {/* Il suggerimento è utile ma non vale due righe di
                          altezza sulla prima schermata del telefono */}
                      {sparkPoints.length < 2 && !narrow && (
                        <div style={{ fontSize: 11.5, color: C.textMuted, marginTop: 14, lineHeight: 1.5 }}>
                          Salva uno snapshot ogni mese: qui comparirà l'andamento nel tempo.
                        </div>
                      )}
                    </div>
                  </>
                )}
                foot={(
                  <>
                    <div className="arc-stat" style={{ gap: 12 }}>
                      <SavingArc rate={totals.savingRate} />
                      <div>
                        <div className="aside-label" style={{ marginBottom: 0 }}>Tasso di risparmio</div>
                        <div className="number-display" style={{ fontSize: 21, marginTop: 4, color: savingColor }}>
                          {fmtPct(totals.savingRate)}
                          <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 8 }}>{fmt(totals.monthlySaving)} / mese</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: C.textDim, maxWidth: '34ch', lineHeight: 1.5 }}>
                      {totals.savingRate >= 0.2 ? 'Eccellente: oltre un quinto del netto resta ogni mese.'
                        : totals.savingRate >= 0.1 ? 'In linea, migliorabile: il margine c’è ma è sottile.'
                          : 'Sotto soglia: rivedi le spese variabili o le rate in corso.'}
                    </div>
                  </>
                )} />

              {/* ── Dati di contorno: un bordo per il gruppo, filetti fra le celle ── */}
              <div className="stat-strip reveal" style={{ animationDelay: '60ms' }}>
                <div className="stat-tile">
                  <div className="stat-label">Entrate mese</div>
                  <div className="stat-value" style={{ color: C.sage }}>{fmt(totals.totalIncome)}</div>
                  <div className="stat-hint">
                    {data.income.length} {data.income.length === 1 ? 'fonte' : 'fonti'}
                    {totals.cedolinoAttivo ? ` · netto da cedolino ${itMonthLabel(totals.cedolinoAttivo.month)}` : ''}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ '--fill': (Math.min(100, (totals.totalOutflow / Math.max(1, totals.totalIncome)) * 100)) / 100, background: `linear-gradient(90deg, ${C.rust}, ${C.gold})` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10.5 }} className="mono-font">
                      <span style={{ color: C.rust }}>Uscite {fmt(totals.totalOutflow)}</span>
                      <span style={{ color: C.textDim }}>{fmtPct(totals.totalOutflow / Math.max(1, totals.totalIncome))}</span>
                    </div>
                  </div>
                </div>

                <div className="stat-tile">
                  <div className="stat-label">Mesi emergenza</div>
                  <div className="stat-value" style={{ color: totals.emergencyMonths >= 6 ? C.sage : totals.emergencyMonths >= 3 ? C.gold : C.rust }}>
                    {totals.emergencyMonths.toFixed(1)}<span className="unit">mesi</span>
                  </div>
                  <div className="stat-hint">target ≥ 6 mesi</div>
                  <div style={{ marginTop: 10 }}>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ '--fill': (Math.min(100, (totals.emergencyMonths / 6) * 100)) / 100, background: totals.emergencyMonths >= 6 ? C.sage : `linear-gradient(90deg, ${C.rust}, ${C.gold})` }} />
                    </div>
                  </div>
                </div>

                <div className="stat-tile">
                  <div className="stat-label">Fondo emergenza</div>
                  <div className="stat-value" style={{ color: C.gold }}>{fmt(data.liquidity.current)}</div>
                  <div className="stat-hint">target {fmt(data.liquidity.targetEmergency)}</div>
                  <div style={{ marginTop: 10 }}>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ '--fill': (Math.min(100, (data.liquidity.current / Math.max(1, data.liquidity.targetEmergency)) * 100)) / 100, background: data.liquidity.current >= data.liquidity.targetEmergency ? C.sage : C.gold }} />
                    </div>
                    <div className="mono-font" style={{ marginTop: 6, fontSize: 10.5, color: C.textDim }}>
                      {fmtPct(data.liquidity.current / Math.max(1, data.liquidity.targetEmergency))} · mancano {fmt(Math.max(0, data.liquidity.targetEmergency - data.liquidity.current))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar: allocazione */}
              <div className="bento-card span-8 row-2 chart-card">
                <h3 className="card-title"><span><span className="diamond">◆</span><span>Allocazione flusso mensile</span></span><span className="mono-font" style={{ fontSize: 11, color: C.textMuted }}>su {fmt(totals.totalIncome)}</span></h3>
                <ResponsiveContainer width="100%" height={chartH(300, 230)}>
                  <BarChart data={barData} layout="vertical" margin={{ left: 0, right: scale.margin.right + 8, top: 6, bottom: 0 }}>
                    <defs>
                      {barData.map((d, i) => (
                        <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor={d.fill} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={d.fill} stopOpacity="1" />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke={C.border} horizontal={false} />
                    <XAxis type="number" {...scale.axis} tickFormatter={fmtTick} minTickGap={scale.minTickGap} />
                    <YAxis type="category" dataKey="name" {...scale.axis} width={narrow ? 64 : 80} />
                    <Tooltip {...TT_BAR} formatter={(v) => fmt(v)} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {barData.map((_, i) => <Cell key={i} fill={`url(#barGrad${i})`} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Ciambella: composizione patrimoniale. Sul telefono a tutta
                  larghezza (.chart-card): a metà colonna il disco usciva dalla
                  scheda e il totale al centro finiva tagliato. */}
              <div className="bento-card span-4 row-2 chart-card">
                <h3 className="card-title"><span><span className="diamond">◆</span><span>Composizione patrimonio</span></span></h3>
                <Donut data={composition} colors={composition.map(d => d.color)} height={chartH(210, 196)}
                  center={(
                    <>
                      <span className="donut-center-label">Totale</span>
                      <span className="donut-center-value">{fmt(totals.netWorth)}</span>
                    </>
                  )} />
                <DonutLegend data={composition} colors={composition.map(d => d.color)} />
              </div>

              {/* Line chart: 5 years */}
              <div className="bento-card span-7 row-2 chart-card">
                <h3 className="card-title"><span><span className="diamond">◆</span><span>Patrimonio — prossimi 5 anni</span></span><span className="mono-font" style={{ fontSize: 11, color: C.textMuted }}>{fmt(projection[60]?.netWorth || 0)}</span></h3>
                <ResponsiveContainer width="100%" height={chartH(280, 200)}>
                  <LineChart data={projection.filter((_, i) => i % 3 === 0)} margin={scale.margin}>
                    <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                    <XAxis dataKey="month" {...scale.axis} ticks={[0, 12, 24, 36, 48, 60]} interval={0} tickFormatter={v => `${v / 12}a`} />
                    <YAxis {...scale.axis} width={scale.yWidth} tickFormatter={fmtTick} />
                    <Tooltip {...TT_LINE} formatter={(v) => fmt(v)} labelFormatter={(l) => `Mese ${l}`} />
                    <Line type="monotone" dataKey="netWorth" stroke={C.gold} strokeWidth={2.5} dot={false} name="Patrimonio" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* ── Dettaglio spese ──
                  Era una torta a dieci spicchi: le etichette venivano tagliate
                  a metà parola ("Bollette (", "Svago / ho") e sotto i 500px
                  sparivano del tutto, lasciando un disco senza significato.
                  Un elenco ordinato dice le stesse cose a ogni larghezza. */}
              <div className="bento-card span-5 row-2">
                <h3 className="card-title">
                  <span><span className="diamond">◆</span><span style={{ fontStyle: 'italic' }}>Dettaglio spese</span></span>
                  <span className="mono-font" style={{ fontSize: 11, color: C.textMuted }}>{fmt(totals.essentialExpenses)}</span>
                </h3>
                <RankedList items={expenseBreakdown} />
              </div>

              {/* Diagnostica */}
              <div className="bento-card span-12">
                <h3 className="card-title"><span><span className="diamond">◆</span><span style={{ fontStyle: 'italic' }}>Diagnosi rapida</span></span></h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 18 }}>
                  <DiagnosticItem ok={totals.savingRate >= 0.1} title="Tasso risparmio"
                    text={`${fmtPct(totals.savingRate)} del netto. ${totals.savingRate >= 0.2 ? 'Eccellente.' : totals.savingRate >= 0.1 ? 'In linea, migliorabile.' : 'Sotto soglia: rivedi spese o rate.'}`} />
                  <DiagnosticItem ok={totals.emergencyMonths >= 6} title="Fondo emergenza"
                    text={`${totals.emergencyMonths.toFixed(1)} mesi copertura. ${totals.emergencyMonths >= 6 ? 'Adeguato.' : `Mancano ${fmt(Math.max(0, data.liquidity.targetEmergency - data.liquidity.current))} al target.`}`} />
                  <DiagnosticItem ok={totals.totalIncome > 0 && totals.totalLoans / totals.totalIncome < 0.15} title="Peso rate"
                    text={`Rate ${totals.totalIncome > 0 ? fmtPct(totals.totalLoans / totals.totalIncome) : '0%'} del netto. ${totals.totalLoans === 0 ? 'Nessun debito.' : 'Si esauriranno liberando flusso.'}`} />
                  <DiagnosticItem ok={totals.totalIncome > 0 && totals.totalInvestMonthly / totals.totalIncome >= 0.1} title="Investimenti"
                    text={`${totals.totalIncome > 0 ? fmtPct(totals.totalInvestMonthly / totals.totalIncome) : '0%'} del netto investito. ${totals.totalInvestMonthly / totals.totalIncome >= 0.15 ? 'Ottimo.' : 'Aumentabile dopo fine rate.'}`} />
                </div>
              </div>

            </div>
          )}

          {/* ══════ INCOME & EXPENSES ══════ */}
          {activeTab === 'income' && (
            <div className="bento">
              {/* Il risultato in cima, che si aggiorna mentre si scrive: prima
                  si modificavano le voci senza vedere cosa restava a fine mese */}
              <StatStrip delay={0} items={[
                {
                  label: 'Entrate', value: fmt(totals.totalIncome), color: C.sage,
                  hint: totals.cedolinoAttivo ? `netto da cedolino ${itMonthLabel(totals.cedolinoAttivo.month)}` : `${data.income.length} ${data.income.length === 1 ? 'fonte' : 'fonti'}`
                },
                { label: 'Spese e rate', value: fmt(totals.essentialExpenses), color: C.rust, hint: `fisse ${fmt(totals.totalFixed)} · variabili ${fmt(totals.totalVariable)} · rate ${fmt(totals.totalLoans)}` },
                { label: 'Investite', value: fmt(totals.totalInvestMonthly), color: C.gold, hint: 'PAC mensili' },
                { label: 'Resta ogni mese', value: fmt(totals.monthlySaving), color: savingColor, hint: `${fmtPct(totals.savingRate)} del netto`, key: true }
              ]} />

              <div className="bento-card span-6 accent-sage">
                <h3 className="card-title"><span><span className="diamond" style={{ color: C.sage }}>◆</span><span style={{ fontStyle: 'italic' }}>Entrate</span></span><span className="mono-font" style={{ fontSize: 14, color: C.sage }}>{fmt(totals.totalIncome)}</span></h3>
                <DataTable items={data.income} section="income" onUpdate={updateField} onRemove={removeItem} fields={['label', 'amount']} />
                <AddBtn onClick={() => addItem('income', { label: 'Nuova entrata', amount: 0 })} />
              </div>

              <div className="bento-card span-6">
                <h3 className="card-title"><span><span className="diamond">◆</span><span style={{ fontStyle: 'italic' }}>Liquidita & Cuscinetto</span></span></h3>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Liquidita attuale</label>
                  <input type="number" value={data.liquidity.current} onChange={e => updateLiquidity('current', e.target.value)} className="input-cell" style={{ fontSize: 22, marginTop: 6 }} />
                </div>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Target fondo emergenza</label>
                  <input type="number" value={data.liquidity.targetEmergency} onChange={e => updateLiquidity('targetEmergency', e.target.value)} className="input-cell" style={{ fontSize: 22, marginTop: 6 }} />
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ '--fill': (Math.min(100, (data.liquidity.current / Math.max(1, data.liquidity.targetEmergency)) * 100)) / 100, background: data.liquidity.current >= data.liquidity.targetEmergency ? C.sage : C.gold }} />
                </div>
                <div className="mono-font" style={{ fontSize: 11, color: C.textDim, marginTop: 8 }}>{fmtPct(data.liquidity.current / Math.max(1, data.liquidity.targetEmergency))} raggiunto — mancano {fmt(Math.max(0, data.liquidity.targetEmergency - data.liquidity.current))}</div>
              </div>

              <div className="bento-card span-6 accent-rust">
                <h3 className="card-title"><span><span className="diamond" style={{ color: C.rust }}>◆</span><span style={{ fontStyle: 'italic' }}>Spese fisse</span></span><span className="mono-font" style={{ fontSize: 14, color: C.rust }}>{fmt(totals.totalFixed)}</span></h3>
                <DataTable items={data.fixedExpenses} section="fixedExpenses" onUpdate={updateField} onRemove={removeItem} fields={['label', 'amount']} />
                <AddBtn onClick={() => addItem('fixedExpenses', { label: 'Nuova spesa fissa', amount: 0 })} />
              </div>

              <div className="bento-card span-6">
                <h3 className="card-title"><span><span className="diamond" style={{ color: C.purple }}>◆</span><span style={{ fontStyle: 'italic' }}>Spese variabili</span></span><span className="mono-font" style={{ fontSize: 14, color: C.purple }}>{fmt(totals.totalVariable)}</span></h3>
                <DataTable items={data.variableExpenses} section="variableExpenses" onUpdate={updateField} onRemove={removeItem} fields={['label', 'amount']} />
                <AddBtn onClick={() => addItem('variableExpenses', { label: 'Nuova spesa variabile', amount: 0 })} />
              </div>

              <div className="bento-card span-12">
                <h3 className="card-title"><span><span className="diamond" style={{ color: C.goldDim }}>◆</span><span style={{ fontStyle: 'italic' }}>Rate & Finanziamenti</span></span><span className="mono-font" style={{ fontSize: 14, color: C.goldDim }}>{fmt(totals.totalLoans)}</span></h3>
                <DataTable items={data.loans} section="loans" onUpdate={updateField} onRemove={removeItem} fields={['label', 'amount', 'monthsLeft']} fieldLabels={{ label: 'Descrizione', amount: 'Rata mensile', monthsLeft: 'Mesi residui' }} />
                <AddBtn onClick={() => addItem('loans', { label: 'Nuovo finanziamento', amount: 0, monthsLeft: 12 })} />
              </div>
            </div>
          )}

          {/* ══════ MOVIMENTI ══════ */}
          {activeTab === 'transactions' && (
            <TransactionsTab
              data={data}
              onAdd={addTransaction}
              onUpdate={updateTransaction}
              onDelete={deleteTransaction}
              onImport={importTransactions}
              onBulkDelete={deleteTransactions}
            />
          )}

          {/* ══════ INVESTMENTS ══════ */}
          {activeTab === 'investments' && (
            <InvestmentsTab
              data={data}
              totals={totals}
              onUpdateField={updateField}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              onUpdateTarget={updateInvestmentTarget}
            />
          )}

          {/* ══════ MARKETS ══════ */}
          {activeTab === 'markets' && (
            <MarketsTab
              markets={data.markets}
              onAdd={addPolyPosition}
              onUpdate={updatePolyPosition}
              onRemove={removePolyPosition}
              onClose={closePolyPosition}
              onUpdateRate={updateEurUsd}
            />
          )}

          {/* ══════ PROJECTION ══════ */}
          {activeTab === 'projection' && (() => {
            const growthAt = (point) => point && totals.netWorth > 0 ? (point.netWorth - totals.netWorth) / totals.netWorth : 0;
            const signedPct = (g) => `${g >= 0 ? '+' : '−'}${fmtPct(Math.abs(g))}`;
            const end = projection[60];
            const g60 = growthAt(end);
            return (
              <div className="bento">
                {/* Il punto d'arrivo è il numero grande; prima era la quarta di
                    quattro schede uguali, in fondo alla pagina */}
                <PageHero label="Patrimonio tra 5 anni" value={end ? end.netWorth : 0}
                  meta={<>
                    <HeroDelta up={g60 >= 0}>{fmtPct(Math.abs(g60))}</HeroDelta>
                    <span>rispetto a oggi, {fmt(totals.netWorth)}</span>
                  </>}
                  aside={end ? (
                    <PartBars title="Da cosa sarà fatto" total={Math.max(1, end.netWorth)} parts={[
                      { name: 'Liquidita', value: end.liquidity, color: C.textDim },
                      { name: 'Investimenti', value: end.investments, color: C.gold }
                    ]} />
                  ) : null} />

                <StatStrip items={[12, 24, 36].map(m => {
                  const point = projection[m];
                  const g = growthAt(point);
                  return {
                    label: `Tra ${m / 12} ${m === 12 ? 'anno' : 'anni'}`,
                    value: point ? fmt(point.netWorth) : '—',
                    color: C.gold,
                    hint: point ? <><span style={{ color: g >= 0 ? C.sage : C.rust }}>{signedPct(g)}</span> · Liq {fmt(point.liquidity)} · Inv {fmt(point.investments)}</> : null
                  };
                })} />

                <div className="bento-card span-12 chart-card">
                  <h3 className="card-title"><span><span className="diamond">◆</span><span>Proiezione patrimoniale a 60 mesi</span></span></h3>
                  <p style={{ fontSize: 12, color: C.textDim, marginBottom: 14, lineHeight: 1.5, maxWidth: '75ch' }}>
                    Ipotesi rendimenti annui: Equity 7%, Pensione 4% (netto costi), Cripto 12% (alta volatilita), Bond 3%. Le rate decrescono in base ai mesi residui.
                  </p>
                  <ChartLegend items={[
                    { label: 'Patrimonio totale', color: C.gold },
                    { label: 'Investimenti', color: C.rust },
                    { label: 'Liquidita', color: C.textDim }
                  ]} />
                  <ResponsiveContainer width="100%" height={chartH(380, 240)}>
                    <LineChart data={projection} margin={scale.margin}>
                      <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                      <XAxis dataKey="month" {...scale.axis} ticks={[0, 12, 24, 36, 48, 60]} interval={0} tickFormatter={v => `${v / 12}a`} />
                      <YAxis {...scale.axis} width={scale.yWidth} tickFormatter={fmtTick} />
                      <Tooltip {...TT_LINE} formatter={(v) => fmt(v)} labelFormatter={(l) => `Mese ${l}`} />
                      <Line type="monotone" dataKey="liquidity" stroke={C.textDim} strokeWidth={2} name="Liquidita" dot={false} />
                      <Line type="monotone" dataKey="investments" stroke={C.rust} strokeWidth={2} name="Investimenti" dot={false} />
                      <Line type="monotone" dataKey="netWorth" stroke={C.gold} strokeWidth={3} name="Patrimonio totale" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })()}

          {/* ══════ MUTUI ══════ */}
          {activeTab === 'mortgage' && (() => {
            const m = data.mortgage || {};
            const payA = monthlyPayment(m.amount, m.rate, m.years);
            const schedA = amortizationSchedule(m.amount, m.rate, m.years);
            const nA = schedA.length;
            const totIntA = schedA.length ? schedA[schedA.length - 1].cumInterest : 0;
            const insTotA = (Number(m.insuranceMonthly) || 0) * nA;
            const costTotA = (Number(m.amount) || 0) + totIntA + (Number(m.feesUpfront) || 0) + insTotA;
            const taegA = effectiveAPR(m.amount, m.rate, m.years, m.feesUpfront, m.insuranceMonthly);
            const payB = monthlyPayment(m.amount, m.rateB, m.yearsB);
            const schedB = amortizationSchedule(m.amount, m.rateB, m.yearsB);
            const totIntB = schedB.length ? schedB[schedB.length - 1].cumInterest : 0;
            const costTotB = (Number(m.amount) || 0) + totIntB + (Number(m.feesUpfront) || 0) + (Number(m.insuranceMonthly) || 0) * schedB.length;

            // Sostenibilità rispetto al reddito netto del dashboard
            const rataTot = payA + (Number(m.insuranceMonthly) || 0);
            const incidenza = totals.totalIncome > 0 ? rataTot / totals.totalIncome : 0;
            const risparmioResiduo = totals.monthlySaving - rataTot;
            const susColor = incidenza <= 0.30 ? C.sage : incidenza <= 0.35 ? C.gold : C.danger;

            // Dati grafico (un punto a fine anno)
            const chartData = [{ year: 0, residuo: Number(m.amount) || 0, interessi: 0 }];
            for (let y = 1; y <= (Number(m.years) || 0); y++) {
              const lastRow = [...schedA].reverse().find(r => r.year === y);
              if (lastRow) chartData.push({ year: y, residuo: Math.round(lastRow.balance), interessi: Math.round(lastRow.cumInterest) });
            }
            // Sintesi annuale piano di ammortamento
            const yearly = [];
            for (let y = 1; y <= (Number(m.years) || 0); y++) {
              const rowsY = schedA.filter(r => r.year === y);
              if (!rowsY.length) continue;
              yearly.push({
                year: y,
                cap: rowsY.reduce((s, r) => s + r.principal, 0),
                int: rowsY.reduce((s, r) => s + r.interest, 0),
                bal: rowsY[rowsY.length - 1].balance
              });
            }
            const mInput = (label, field, step = '1', suffix = '') => (
              <div>
                <label style={{ fontSize: 10, color: C.textMuted, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{label}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="number" step={step} className="input-cell mono-font" value={m[field] ?? 0} onChange={e => updateMortgage(field, e.target.value)} style={{ width: '100%', textAlign: 'right' }} />
                  {suffix && <span className="mono-font" style={{ fontSize: 12, color: C.textMuted }}>{suffix}</span>}
                </div>
              </div>
            );

            return (
              <div className="bento">
                {/* ── Hero: la rata, colorata da quanto pesa sul reddito ──
                    Prima la rata era un numero medio dentro la scheda
                    "Sostenibilità", accanto ad altri quattro riquadri uguali. */}
                <PageHero label="Rata mensile · incl. assicurazione" value={rataTot} format={fmtEUR2} tone={susColor}
                  meta={<span>{nA} rate · {(Number(m.years) || 0)} anni · TAN {fmtPct2((Number(m.rate) || 0) / 100)} · importo {fmt(m.amount)}</span>}
                  aside={(
                    <div>
                      <div className="aside-label">Incidenza sul reddito netto</div>
                      <div className="stat-value" style={{ color: susColor }}>{fmtPct(incidenza)}</div>
                      {/* Le due tacche segnano la soglia consigliata, 30% e 35% */}
                      <div className="progress-track" style={{ height: 8, marginTop: 12 }}>
                        <div className="progress-fill" style={{ '--fill': Math.min(1, incidenza), background: susColor }} />
                        <span className="target-tick" style={{ left: '30%' }} />
                        <span className="target-tick" style={{ left: '35%' }} />
                      </div>
                      <div className="stat-hint" style={{ marginTop: 6 }}>soglia consigliata 30–35%</div>
                      <dl className="hero-facts">
                        <div><dt>Reddito netto mensile</dt><dd>{fmt(totals.totalIncome)}</dd></div>
                        <div><dt>Risparmio mensile attuale</dt><dd>{fmt(totals.monthlySaving)}</dd></div>
                        <div><dt>Risparmio residuo dopo la rata</dt><dd style={{ color: risparmioResiduo < 0 ? C.danger : C.sage }}>{fmt(risparmioResiduo)}</dd></div>
                      </dl>
                      {/* Icona disegnata, non un glifo unicode prestato al posto di un'icona */}
                      {incidenza > 0.35 && (
                        <div className="inline-error" role="note">
                          <Ic.alert size={15} />
                          <span>La rata supera il 35% del reddito netto: molte banche non concedono il finanziamento a queste condizioni.</span>
                        </div>
                      )}
                    </div>
                  )} />

                <StatStrip items={[
                  { label: 'Rata mensile (mutuo)', value: fmtEUR2(payA), color: C.gold, hint: `senza assicurazione · ${nA} rate` },
                  { label: 'Totale interessi', value: fmt(totIntA), color: C.rust, hint: `${m.amount > 0 ? fmtPct(totIntA / m.amount) : '—'} sul capitale` },
                  { label: 'Costo totale', value: fmt(costTotA), hint: 'capitale + interessi + spese' },
                  { label: 'TAEG indicativo', value: fmtPct2(taegA), color: C.gold, hint: `TAN ${fmtPct2((Number(m.rate) || 0) / 100)}` }
                ]} />

                {/* Parametri */}
                <div className="bento-card span-12">
                  <h3 className="card-title"><span><span className="diamond">◆</span><span>Parametri mutuo</span></span></h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 16, marginTop: 4 }}>
                    {mInput('Importo del mutuo', 'amount', '1000', '€')}
                    {mInput('Durata', 'years', '1', 'anni')}
                    {mInput('Tasso annuo (TAN)', 'rate', '0.05', '%')}
                    {mInput('Spese una tantum', 'feesUpfront', '100', '€')}
                    {mInput('Assicurazione', 'insuranceMonthly', '5', '€/mese')}
                  </div>
                  <div style={{ marginTop: 22, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                    <div className="card-eyebrow" style={{ marginBottom: 12 }}>Scenario di confronto (B)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 16 }}>
                      {mInput('TAN scenario B', 'rateB', '0.05', '%')}
                      {mInput('Durata scenario B', 'yearsB', '1', 'anni')}
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: C.textDim, marginTop: 16 }}>
                    Calcoli indicativi a tasso fisso costante (ammortamento alla francese, rata costante). Il TAEG reale dipende da spese e condizioni della banca.
                  </p>
                </div>

                {/* Grafico capitale residuo */}
                <div className="bento-card span-12 chart-card">
                  <h3 className="card-title"><span><span className="diamond">◆</span><span>Capitale residuo e interessi cumulati</span></span></h3>
                  <ChartLegend items={[{ label: 'Capitale residuo', color: C.gold }, { label: 'Interessi cumulati', color: C.rust }]} />
                  <ResponsiveContainer width="100%" height={chartH(340, 230)}>
                    <LineChart data={chartData} margin={scale.margin}>
                      <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                      <XAxis dataKey="year" {...scale.axis} minTickGap={scale.minTickGap} tickFormatter={v => `${v}a`} />
                      <YAxis {...scale.axis} width={scale.yWidth} tickFormatter={fmtTick} />
                      <Tooltip {...TT_LINE} formatter={v => fmt(v)} labelFormatter={l => `Anno ${l}`} />
                      <Line type="monotone" dataKey="residuo" stroke={C.gold} strokeWidth={3} name="Capitale residuo" dot={false} />
                      <Line type="monotone" dataKey="interessi" stroke={C.rust} strokeWidth={2} name="Interessi cumulati" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Confronto scenari */}
                <div className="bento-card span-12">
                  <h3 className="card-title"><span><span className="diamond">◆</span><span>Confronto scenari</span></span></h3>
                  <div className="desktop-table" style={{ overflowX: 'auto' }}>
                    <table className="mono-font" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ color: C.textMuted, textAlign: 'right' }}>
                          <th style={{ textAlign: 'left', padding: '8px 10px' }}>Scenario</th>
                          <th style={{ padding: '8px 10px' }}>Importo</th>
                          <th style={{ padding: '8px 10px' }}>TAN</th>
                          <th style={{ padding: '8px 10px' }}>Durata</th>
                          <th style={{ padding: '8px 10px' }}>Rata</th>
                          <th style={{ padding: '8px 10px' }}>Totale interessi</th>
                          <th style={{ padding: '8px 10px' }}>Costo totale</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderTop: `1px solid ${C.border}`, textAlign: 'right' }}>
                          <td style={{ textAlign: 'left', padding: '10px', color: C.gold }}>A (attuale)</td>
                          <td style={{ padding: '10px' }}>{fmt(m.amount)}</td>
                          <td style={{ padding: '10px' }}>{fmtPct2((Number(m.rate) || 0) / 100)}</td>
                          <td style={{ padding: '10px' }}>{(Number(m.years) || 0)} anni</td>
                          <td style={{ padding: '10px' }}>{fmtEUR2(payA)}</td>
                          <td style={{ padding: '10px', color: totIntA <= totIntB ? C.sage : C.text }}>{fmt(totIntA)}</td>
                          <td style={{ padding: '10px', color: costTotA <= costTotB ? C.sage : C.text }}>{fmt(costTotA)}</td>
                        </tr>
                        <tr style={{ borderTop: `1px solid ${C.border}`, textAlign: 'right' }}>
                          <td style={{ textAlign: 'left', padding: '10px', color: C.purple }}>B (confronto)</td>
                          <td style={{ padding: '10px' }}>{fmt(m.amount)}</td>
                          <td style={{ padding: '10px' }}>{fmtPct2((Number(m.rateB) || 0) / 100)}</td>
                          <td style={{ padding: '10px' }}>{(Number(m.yearsB) || 0)} anni</td>
                          <td style={{ padding: '10px' }}>{fmtEUR2(payB)}</td>
                          <td style={{ padding: '10px', color: totIntB < totIntA ? C.sage : C.text }}>{fmt(totIntB)}</td>
                          <td style={{ padding: '10px', color: costTotB < costTotA ? C.sage : C.text }}>{fmt(costTotB)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* Telefono: A e B affiancati. Prima la tabella a sette colonne
                      tagliava la rata a metà ("727,") */}
                  <div className="phone-list scenario-pair">
                    {[
                      { name: 'A (attuale)', color: C.gold, rate: m.rate, years: m.years, pay: payA, interest: totIntA, cost: costTotA, bestInt: totIntA <= totIntB, bestCost: costTotA <= costTotB },
                      { name: 'B (confronto)', color: C.purple, rate: m.rateB, years: m.yearsB, pay: payB, interest: totIntB, cost: costTotB, bestInt: totIntB < totIntA, bestCost: costTotB < costTotA }
                    ].map(sc => (
                      <div key={sc.name} className="m-card">
                        <div className="m-row-title" style={{ color: sc.color }}>{sc.name}</div>
                        <dl className="hero-facts stacked">
                          <div><dt>TAN · durata</dt><dd>{fmtPct2((Number(sc.rate) || 0) / 100)} · {(Number(sc.years) || 0)} anni</dd></div>
                          <div><dt>Rata</dt><dd>{fmtEUR2(sc.pay)}</dd></div>
                          <div><dt>Totale interessi</dt><dd style={{ color: sc.bestInt ? C.sage : C.text }}>{fmt(sc.interest)}</dd></div>
                          <div><dt>Costo totale</dt><dd style={{ color: sc.bestCost ? C.sage : C.text }}>{fmt(sc.cost)}</dd></div>
                        </dl>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: C.textDim, marginTop: 10 }}>In verde lo scenario con interessi / costo totale inferiore. Differenza interessi: {fmt(Math.abs(totIntA - totIntB))}.</p>
                </div>

                {/* Piano di ammortamento — sintesi annuale */}
                <div className="bento-card span-12">
                  <h3 className="card-title"><span><span className="diamond">◆</span><span style={{ fontStyle: 'italic' }}>Piano di ammortamento (sintesi annuale — scenario A)</span></span></h3>
                  <div style={{ overflowX: 'auto', maxHeight: 360, overflowY: 'auto' }}>
                    <table className="mono-font" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ color: C.textMuted, textAlign: 'right', position: 'sticky', top: 0, background: C.card }}>
                          <th style={{ textAlign: 'left', padding: '8px 10px' }}>Anno</th>
                          <th style={{ padding: '8px 10px' }}>Quota capitale</th>
                          <th style={{ padding: '8px 10px' }}>Quota interessi</th>
                          <th style={{ padding: '8px 10px' }}>Capitale residuo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearly.map(r => (
                          <tr key={r.year} style={{ borderTop: `1px solid ${C.border}`, textAlign: 'right' }}>
                            <td style={{ textAlign: 'left', padding: '8px 10px', color: C.textDim }}>{r.year}</td>
                            <td style={{ padding: '8px 10px' }}>{fmt(r.cap)}</td>
                            <td style={{ padding: '8px 10px', color: C.rust }}>{fmt(r.int)}</td>
                            <td style={{ padding: '8px 10px', color: C.text }}>{fmt(r.bal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ══════ HISTORY ══════ */}
          {activeTab === 'history' && (() => {
            const hist = data.history || [];
            const firstH = hist[0];
            const lastH = hist[hist.length - 1];
            const change = lastH && firstH ? lastH.netWorth - firstH.netWorth : 0;
            const changePct = firstH && firstH.netWorth > 0 ? change / firstH.netWorth : 0;
            return (
              <div className="bento">
                {lastH && (
                  <PageHero label={`Ultimo snapshot · ${itMonthLabel(lastH.date)}`} value={lastH.netWorth}
                    meta={hist.length > 1 ? (
                      <>
                        <HeroDelta up={change >= 0}>{fmt(Math.abs(change))} ({fmtPct(Math.abs(changePct))})</HeroDelta>
                        <span>dal primo snapshot, {itMonthLabel(firstH.date)}</span>
                      </>
                    ) : (
                      <span>Il primo della serie: salvane uno ogni mese per vedere l'andamento.</span>
                    )}
                    aside={hist.length > 1 ? (
                      <div>
                        <div className="aside-label" style={{ marginBottom: 8 }}>Andamento · {hist.length} snapshot</div>
                        <Sparkline points={hist.map(h => h.netWorth)} color={C.gold} />
                      </div>
                    ) : null}
                    foot={<button className="btn-ghost" onClick={saveSnapshot} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Ic.check /> Salva lo snapshot di questo mese</button>} />
                )}

                <div className="bento-card span-12 chart-card">
                  <h3 className="card-title"><span><span className="diamond">◆</span><span>Storico mensile</span></span></h3>
                  {/* Sul telefono il pulsante "Snapshot" in alto non esiste: sta
                      nel menu ⋯, oppure qui sotto */}
                  <p style={{ fontSize: 12, color: C.textDim, marginBottom: 16, lineHeight: 1.5 }}>
                    Uno snapshot fissa patrimonio, liquidità, investimenti ed entrate del mese. Se il mese è già salvato, viene sovrascritto.
                  </p>
                  {hist.length === 0 ? (
                    <div style={{ padding: '32px 12px', textAlign: 'center', color: C.textMuted }}>
                      <span style={{ color: C.gold }}><Ic.trend size={32} /></span>
                      <p style={{ margin: '12px 0 18px' }}>Nessuno snapshot salvato.</p>
                      <button className="btn-primary" onClick={saveSnapshot}><Ic.check /> Salva il primo snapshot</button>
                    </div>
                  ) : (
                    <div>
                      <ChartLegend items={[
                        { label: 'Patrimonio', color: C.gold },
                        { label: 'Liquidita', color: C.textDim },
                        { label: 'Investimenti', color: C.sage }
                      ]} />
                      <ResponsiveContainer width="100%" height={chartH(300, 220)}>
                        <LineChart data={hist} margin={scale.margin}>
                          <CartesianGrid strokeDasharray="2 4" stroke={C.border} />
                          <XAxis dataKey="date" {...scale.axis} minTickGap={scale.minTickGap} />
                          <YAxis {...scale.axis} width={scale.yWidth} tickFormatter={fmtTick} />
                          <Tooltip {...TT_LINE} formatter={(v) => fmt(v)} />
                          <Line type="monotone" dataKey="netWorth" stroke={C.gold} strokeWidth={2} name="Patrimonio" dot={{ r: 4 }} />
                          <Line type="monotone" dataKey="liquidity" stroke={C.textDim} strokeWidth={1.5} name="Liquidita" dot={{ r: 3 }} />
                          <Line type="monotone" dataKey="investments" stroke={C.sage} strokeWidth={1.5} name="Investimenti" dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                      <div className="desktop-table" style={{ overflowX: 'auto', marginTop: 20 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                              {['Mese', 'Patrimonio', 'Liquidita', 'Investimenti', 'Entrate', 'Risparmio'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '10px 8px', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.textMuted }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {hist.map((h) => (
                              <tr key={h.date} style={{ borderBottom: `1px solid ${C.border}` }}>
                                <td className="mono-font" style={{ padding: '10px 8px' }}>{h.date}</td>
                                <td className="mono-font" style={{ padding: '10px 8px', color: C.gold }}>{fmt(h.netWorth)}</td>
                                <td className="mono-font" style={{ padding: '10px 8px' }}>{fmt(h.liquidity)}</td>
                                <td className="mono-font" style={{ padding: '10px 8px' }}>{fmt(h.investments)}</td>
                                <td className="mono-font" style={{ padding: '10px 8px' }}>{fmt(h.income)}</td>
                                <td className="mono-font" style={{ padding: '10px 8px', color: h.saving >= 0 ? C.sage : C.danger }}>{fmt(h.saving)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="phone-list" style={{ marginTop: 16 }}>
                        {[...hist].reverse().map(h => (
                          <div key={h.date} className="m-row">
                            <div style={{ minWidth: 0 }}>
                              <div className="m-row-title">{itMonthLabel(h.date)}</div>
                              <div className="m-row-sub">
                                Liq {fmt(h.liquidity)} · Inv {fmt(h.investments)} · risparmio <span style={{ color: h.saving >= 0 ? C.sage : C.danger }}>{fmt(h.saving)}</span>
                              </div>
                            </div>
                            <span className="m-row-value" style={{ color: C.gold }}>{fmt(h.netWorth)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ══════ CEDOLINI ══════ */}
          {activeTab === 'cedolini' && (
            <CedoliniTab
              cedolini={data.cedolini || []}
              onAdd={addCedolino}
              onRemove={removeCedolino}
              currentISO={currentISO}
              showToast={showToast}
            />
          )}

        </main>

        <footer style={{ padding: '24px 32px', borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.textMuted, textAlign: 'center' }}>
          Dati salvati localmente (localStorage). Esporta il JSON regolarmente per conservarne una copia.
        </footer>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return React.createElement('div', { style: { padding: 40, color: 'var(--danger)', fontFamily: 'var(--font-ui)', background: 'var(--bg)', minHeight: '100vh' } },
        React.createElement('h2', null, 'Errore di rendering'),
        React.createElement('pre', { style: { whiteSpace: 'pre-wrap', color: 'var(--text)', marginTop: 16 } }, this.state.error.toString())
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary><FinanceDashboard /></ErrorBoundary>
);
