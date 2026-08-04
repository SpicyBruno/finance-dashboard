function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} = React;
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar
} = Recharts;

/* ── Icons ── */
const Ic = {
  dashboard: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "12",
    width: "7",
    height: "9"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "16",
    width: "7",
    height: "5"
  })),
  wallet: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 12V8H6a2 2 0 0 1 0-4h12v4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 6v14a2 2 0 0 0 2 2h14v-4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 12a2 2 0 0 0 0 4h4v-4Z"
  })),
  trend: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "23 6 13.5 15.5 8.5 10.5 1 18"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 6 23 6 23 12"
  })),
  chart: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3v18h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 14l4-4 4 3 5-6"
  })),
  target: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  })),
  clock: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  home: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 22 9 12 15 12 15 22"
  })),
  download: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  })),
  upload: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 8 12 3 7 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "3",
    x2: "12",
    y2: "15"
  })),
  reset: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "1 4 1 10 7 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
  })),
  trash: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  plus: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  check: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  alert: ({
    size = 18
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })),
  up: ({
    size = 12
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "18 15 12 9 6 15"
  })),
  down: ({
    size = 12
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })),
  receipt: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "13",
    x2: "8",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "17",
    x2: "8",
    y2: "17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "10 9 9 9 8 9"
  })),
  candle: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "7",
    y1: "3",
    x2: "7",
    y2: "21"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "7",
    width: "6",
    height: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    y1: "3",
    x2: "17",
    y2: "21"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "10",
    width: "6",
    height: "7"
  })),
  exchange: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "17 1 21 5 17 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 11V9a4 4 0 0 1 4-4h14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 23 3 19 7 15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 13v2a4 4 0 0 1-4 4H3"
  })),
  edit: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
  })),
  search: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  x: ({
    size = 16
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  theme: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3a9 9 0 1 0 9 9 6.6 6.6 0 0 1-9-9Z"
  })),
  more: ({
    size = 20
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1.4"
  })),
  chevron: ({
    size = 16
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })),
  calendar: ({
    size = 14
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  }))
};

/* ── Data ── */
const DEFAULT_DATA = {
  profile: {
    name: 'Gabriele',
    month: 'Aprile 2026',
    notes: 'Universita Padova — contratto fino 09/09/2026'
  },
  income: [{
    id: 1,
    label: 'Stipendio netto ricorrente',
    amount: 1550
  }, {
    id: 2,
    label: 'Entrate extra (vigilanza, ecc.)',
    amount: 0
  }],
  fixedExpenses: [{
    id: 1,
    label: 'Affitto / casa',
    amount: 350
  }, {
    id: 2,
    label: 'Bollette (luce, gas, internet)',
    amount: 120
  }, {
    id: 3,
    label: 'Abbonamenti (streaming, cloud)',
    amount: 30
  }, {
    id: 4,
    label: 'Assicurazioni',
    amount: 25
  }, {
    id: 5,
    label: 'Trasporti fissi',
    amount: 75
  }],
  loans: [{
    id: 1,
    label: 'Rata telefono',
    amount: 45,
    monthsLeft: 8
  }, {
    id: 2,
    label: 'Rata computer',
    amount: 75,
    monthsLeft: 10
  }, {
    id: 3,
    label: 'Altra rata',
    amount: 30,
    monthsLeft: 6
  }],
  variableExpenses: [{
    id: 1,
    label: 'Spesa alimentare',
    amount: 220
  }, {
    id: 2,
    label: 'Ristoranti / bar',
    amount: 80
  }, {
    id: 3,
    label: 'Svago / hobby',
    amount: 50
  }, {
    id: 4,
    label: 'Vestiti / cura personale',
    amount: 50
  }],
  investments: [{
    id: 1,
    label: 'PIP Alleata Previdenza',
    current: 2843,
    entryValue: 2500,
    monthly: 250,
    type: 'Pensione',
    risk: 'Medio'
  }, {
    id: 2,
    label: 'Bitcoin (Crypto.com)',
    current: 1500,
    entryValue: 1200,
    monthly: 50,
    type: 'Cripto',
    risk: 'Alto'
  }, {
    id: 3,
    label: 'ETF Scalable (SWDA/VWCE)',
    current: 500,
    entryValue: 500,
    monthly: 0,
    type: 'Equity',
    risk: 'Medio-Alto'
  }],
  investmentsMeta: {
    targetAllocation: {
      Equity: 50,
      Cripto: 10,
      Pensione: 30,
      Liquidita: 10
    }
  },
  markets: {
    polyPositions: [],
    pnlHistory: [],
    eurUsdRate: 1.08
  },
  liquidity: {
    current: 5500,
    targetEmergency: 9000
  },
  mortgage: {
    amount: 150000,
    // importo richiesto
    years: 25,
    // durata in anni (scenario A)
    rate: 3.2,
    // TAN annuo % (scenario A)
    rateB: 2.8,
    // TAN annuo % scenario B (confronto)
    yearsB: 20,
    // durata anni scenario B
    feesUpfront: 3500,
    // spese una tantum (istruttoria, perizia, notaio, imposte)
    insuranceMonthly: 25 // assicurazione/polizza mensile
  },
  history: [],
  cedolini: [],
  transactions: [{
    id: 1001,
    date: '2026-04-28',
    type: 'income',
    category: 'Stipendio',
    description: 'Stipendio aprile — Universita Padova',
    paymentMethod: 'Bonifico',
    amount: 1550,
    status: 'Ricorrente',
    notes: 'Netto in busta',
    createdAt: '2026-04-28T08:00:00.000Z',
    updatedAt: '2026-04-28T08:00:00.000Z'
  }, {
    id: 1002,
    date: '2026-04-26',
    type: 'income',
    category: 'Freelance',
    description: 'Sito web cliente — saldo fattura',
    paymentMethod: 'Bonifico',
    amount: 600,
    status: 'Completato',
    notes: 'Fattura 12/2026',
    createdAt: '2026-04-26T10:30:00.000Z',
    updatedAt: '2026-04-26T10:30:00.000Z'
  }, {
    id: 1003,
    date: '2026-04-22',
    type: 'income',
    category: 'Rimborsi',
    description: 'Rimborso spese trasferta',
    paymentMethod: 'Bonifico',
    amount: 85,
    status: 'Completato',
    notes: '',
    createdAt: '2026-04-22T09:00:00.000Z',
    updatedAt: '2026-04-22T09:00:00.000Z'
  }, {
    id: 1004,
    date: '2026-04-03',
    type: 'expense',
    category: 'Affitto / Mutuo',
    description: 'Affitto appartamento',
    paymentMethod: 'Bonifico',
    amount: 350,
    status: 'Ricorrente',
    notes: 'Canone mensile',
    createdAt: '2026-04-03T07:00:00.000Z',
    updatedAt: '2026-04-03T07:00:00.000Z'
  }, {
    id: 1005,
    date: '2026-04-05',
    type: 'expense',
    category: 'Bollette',
    description: 'Luce e gas — bimestrale',
    paymentMethod: 'Addebito diretto',
    amount: 132.4,
    status: 'Completato',
    notes: 'Enel',
    createdAt: '2026-04-05T07:00:00.000Z',
    updatedAt: '2026-04-05T07:00:00.000Z'
  }, {
    id: 1006,
    date: '2026-04-07',
    type: 'expense',
    category: 'Abbonamenti',
    description: 'Netflix + Spotify + iCloud',
    paymentMethod: 'Carta di credito',
    amount: 27.97,
    status: 'Ricorrente',
    notes: '',
    createdAt: '2026-04-07T07:00:00.000Z',
    updatedAt: '2026-04-07T07:00:00.000Z'
  }, {
    id: 1007,
    date: '2026-04-09',
    type: 'expense',
    category: 'Spesa alimentare',
    description: 'Spesa settimanale supermercato',
    paymentMethod: 'Carta di debito',
    amount: 64.2,
    status: 'Completato',
    notes: 'Esselunga',
    createdAt: '2026-04-09T18:00:00.000Z',
    updatedAt: '2026-04-09T18:00:00.000Z'
  }, {
    id: 1008,
    date: '2026-04-12',
    type: 'expense',
    category: 'Trasporti',
    description: 'Abbonamento mensile bus',
    paymentMethod: 'Carta di debito',
    amount: 38,
    status: 'Ricorrente',
    notes: '',
    createdAt: '2026-04-12T08:00:00.000Z',
    updatedAt: '2026-04-12T08:00:00.000Z'
  }, {
    id: 1009,
    date: '2026-04-15',
    type: 'expense',
    category: 'Svago',
    description: 'Cena fuori con amici',
    paymentMethod: 'Contanti',
    amount: 32,
    status: 'Completato',
    notes: '',
    createdAt: '2026-04-15T21:30:00.000Z',
    updatedAt: '2026-04-15T21:30:00.000Z'
  }, {
    id: 1010,
    date: '2026-04-18',
    type: 'expense',
    category: 'Salute',
    description: 'Visita dentistica',
    paymentMethod: 'Carta di credito',
    amount: 80,
    status: 'Completato',
    notes: 'Controllo annuale',
    createdAt: '2026-04-18T11:00:00.000Z',
    updatedAt: '2026-04-18T11:00:00.000Z'
  }, {
    id: 1011,
    date: '2026-04-20',
    type: 'expense',
    category: 'Shopping',
    description: 'Scarpe da corsa',
    paymentMethod: 'PayPal',
    amount: 89.9,
    status: 'Completato',
    notes: '',
    createdAt: '2026-04-20T16:00:00.000Z',
    updatedAt: '2026-04-20T16:00:00.000Z'
  }, {
    id: 1012,
    date: '2026-04-30',
    type: 'expense',
    category: 'Tasse',
    description: 'Acconto imposte — F24',
    paymentMethod: 'Addebito diretto',
    amount: 110,
    status: 'In sospeso',
    notes: 'Scadenza fine mese',
    createdAt: '2026-04-25T12:00:00.000Z',
    updatedAt: '2026-04-25T12:00:00.000Z'
  }, {
    id: 1013,
    date: '2026-03-28',
    type: 'income',
    category: 'Stipendio',
    description: 'Stipendio marzo — Universita Padova',
    paymentMethod: 'Bonifico',
    amount: 1550,
    status: 'Ricorrente',
    notes: '',
    createdAt: '2026-03-28T08:00:00.000Z',
    updatedAt: '2026-03-28T08:00:00.000Z'
  }, {
    id: 1014,
    date: '2026-03-15',
    type: 'income',
    category: 'Entrate passive',
    description: 'Dividendi ETF',
    paymentMethod: 'Bonifico',
    amount: 18.4,
    status: 'Completato',
    notes: '',
    createdAt: '2026-03-15T08:00:00.000Z',
    updatedAt: '2026-03-15T08:00:00.000Z'
  }, {
    id: 1015,
    date: '2026-03-04',
    type: 'expense',
    category: 'Affitto / Mutuo',
    description: 'Affitto appartamento',
    paymentMethod: 'Bonifico',
    amount: 350,
    status: 'Ricorrente',
    notes: '',
    createdAt: '2026-03-04T07:00:00.000Z',
    updatedAt: '2026-03-04T07:00:00.000Z'
  }, {
    id: 1016,
    date: '2026-03-10',
    type: 'expense',
    category: 'Spesa alimentare',
    description: 'Spesa mensile',
    paymentMethod: 'Carta di debito',
    amount: 210.5,
    status: 'Completato',
    notes: '',
    createdAt: '2026-03-10T18:00:00.000Z',
    updatedAt: '2026-03-10T18:00:00.000Z'
  }]
};
const INCOME_CATEGORIES = ['Stipendio', 'Freelance', 'Entrate passive', 'Investimenti', 'Rimborsi', 'Altre entrate'];
const EXPENSE_CATEGORIES = ['Affitto / Mutuo', 'Spesa alimentare', 'Trasporti', 'Bollette', 'Abbonamenti', 'Salute', 'Istruzione', 'Svago', 'Shopping', 'Tasse', 'Altre uscite'];
const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];
const PAYMENT_METHODS = ['Bonifico', 'Carta di debito', 'Carta di credito', 'Contanti', 'PayPal', 'Addebito diretto'];
const TX_STATUSES = ['Completato', 'In sospeso', 'Ricorrente'];
const STORAGE_KEY = 'gabriele_finance_dashboard_v4';
const LEGACY_KEY = 'gabriele_finance_dashboard_v3';
const THEME_KEY = 'gabriele_finance_dashboard_theme';
const fmt = n => new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0
}).format(n || 0);
const fmtEUR2 = n => new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2
}).format(n || 0);
const fmtUSD = n => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2
}).format(n || 0);
const fmtPct = n => isFinite(n) ? `${(n * 100).toFixed(1)}%` : '0.0%';
const fmtPct2 = n => isFinite(n) ? `${(n * 100).toFixed(2)}%` : '0.00%';

/* ── Movimenti: calcoli (puri, riutilizzabili, testabili) ── */
const txSum = list => (list || []).reduce((s, t) => s + Math.abs(Number(t.amount) || 0), 0);
function txTotals(list) {
  const inc = (list || []).filter(t => t.type === 'income');
  const exp = (list || []).filter(t => t.type === 'expense');
  const totalIncome = txSum(inc);
  const totalExpenses = txSum(exp);
  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses
  };
}
function monthlyTotals(list) {
  const map = {};
  (list || []).forEach(t => {
    const key = (t.date || '').slice(0, 7);
    if (!key) return;
    if (!map[key]) map[key] = {
      income: 0,
      expenses: 0,
      net: 0
    };
    const amt = Math.abs(Number(t.amount) || 0);
    if (t.type === 'income') map[key].income += amt;else map[key].expenses += amt;
    map[key].net = map[key].income - map[key].expenses;
  });
  return map;
}
const savingsRate = (income, expenses) => income > 0 ? (income - expenses) / income : 0;
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
    if (key === 'amount') {
      av = Math.abs(Number(a.amount) || 0);
      bv = Math.abs(Number(b.amount) || 0);
    } else {
      av = (a[key] ?? '').toString().toLowerCase();
      bv = (b[key] ?? '').toString().toLowerCase();
    }
    if (av < bv) return -1 * sign;
    if (av > bv) return 1 * sign;
    return 0;
  });
  return arr;
}

/* ── Mutui: calcoli (ammortamento alla francese) ── */
function monthlyPayment(P, annualRatePct, years) {
  P = Number(P) || 0;
  const n = (Number(years) || 0) * 12;
  if (n <= 0) return 0;
  const i = (Number(annualRatePct) || 0) / 100 / 12;
  if (i === 0) return P / n;
  return P * i / (1 - Math.pow(1 + i, -n));
}
function amortizationSchedule(P, annualRatePct, years) {
  P = Number(P) || 0;
  const n = (Number(years) || 0) * 12;
  const i = (Number(annualRatePct) || 0) / 100 / 12;
  const pay = monthlyPayment(P, annualRatePct, years);
  const rows = [];
  let balance = P;
  let cumInterest = 0;
  for (let m = 1; m <= n; m++) {
    const interest = balance * i;
    let principal = pay - interest;
    if (m === n || principal > balance) principal = balance;
    balance = Math.max(0, balance - principal);
    cumInterest += interest;
    rows.push({
      month: m,
      year: Math.ceil(m / 12),
      payment: pay,
      interest,
      principal,
      balance,
      cumInterest
    });
  }
  return rows;
}
// TAEG indicativo: tasso che annulla il VAN includendo spese una tantum e polizza mensile.
function effectiveAPR(P, annualRatePct, years, feesUpfront, insuranceMonthly) {
  P = Number(P) || 0;
  const n = (Number(years) || 0) * 12;
  if (P <= 0 || n <= 0) return 0;
  const pay = monthlyPayment(P, annualRatePct, years) + (Number(insuranceMonthly) || 0);
  const net = P - (Number(feesUpfront) || 0); // erogato effettivo al cliente
  const npv = r => {
    let v = -net;
    for (let m = 1; m <= n; m++) v += pay / Math.pow(1 + r, m);
    return v;
  };
  let lo = 0,
    hi = 1; // tasso mensile
  if (npv(lo) * npv(hi) > 0) return Math.pow(1 + (Number(annualRatePct) || 0) / 100 / 12, 12) - 1;
  for (let k = 0; k < 80; k++) {
    const mid = (lo + hi) / 2;
    if (npv(lo) * npv(mid) <= 0) hi = mid;else lo = mid;
  }
  const rMonthly = (lo + hi) / 2;
  return Math.pow(1 + rMonthly, 12) - 1;
}
function normalizeData(parsed) {
  return {
    ...DEFAULT_DATA,
    ...parsed,
    cedolini: parsed.cedolini || [],
    transactions: parsed.transactions || DEFAULT_DATA.transactions,
    investments: (parsed.investments || DEFAULT_DATA.investments).map(i => ({
      entryValue: 0,
      ...i
    })),
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
    mortgage: {
      ...DEFAULT_DATA.mortgage,
      ...(parsed.mortgage || {})
    }
  };
}

// Converte "Aprile 2026" → "2026-04", "Gennaio 2026" → "2026-01", ecc.
const MESI_IT = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
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
  bg: 'var(--bg)',
  card: 'var(--card-solid)',
  cardHover: 'var(--card-hover)',
  border: 'var(--border)',
  borderLight: 'var(--border-light)',
  text: 'var(--text)',
  textDim: 'var(--text-dim)',
  textMuted: 'var(--text-muted)',
  gold: 'var(--gold)',
  goldDim: 'var(--gold-dim)',
  rust: 'var(--rust)',
  sage: 'var(--sage)',
  danger: 'var(--danger)',
  purple: 'var(--purple)',
  teal: 'var(--teal)',
  onAccent: 'var(--on-accent)'
};
/* Rampa ordinata per il denaro che esce: dal più pesante al più leggero.
   Prima erano cinque tinte scorrelate alla stessa luminosità, quindi nessuna
   emergeva e l'ordine di grandezza non si leggeva. */
const OUTFLOW = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];
const RETAINED = 'var(--chart-retained)';
const rampColor = (i, n) => OUTFLOW[Math.min(OUTFLOW.length - 1, Math.round(i / Math.max(1, n - 1) * (OUTFLOW.length - 1)))];
const PIE_COLORS = OUTFLOW;

/* Il numero sale una volta sola, all'ingresso. Con moto ridotto arriva già al
   valore finale: nessuno stato intermedio da guardare. */
function useCountUp(target, duration = 700) {
  const [shown, setShown] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = fromRef.current;
    fromRef.current = target;
    if (reduce || from === target || !isFinite(target)) {
      setShown(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = t => {
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
    const on = e => setNarrow(e.matches);
    mq.addEventListener('change', on);
    setNarrow(mq.matches);
    return () => mq.removeEventListener('change', on);
  }, [maxWidth]);
  return narrow;
}

/* Sparkline: solo la forma dell'andamento, senza assi né griglia.
   Disegna i valori reali dello storico, non un ornamento. */
function Sparkline({
  points,
  color = C.gold,
  width = 260,
  height = 68
}) {
  if (!points || points.length < 2) return null;
  const min = Math.min(...points),
    max = Math.max(...points);
  const span = max - min || 1;
  const stepX = width / (points.length - 1);
  const coords = points.map((v, i) => [i * stepX, height - (v - min) / span * (height - 8) - 4]);
  const d = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const len = coords.reduce((s, c, i) => i === 0 ? 0 : s + Math.hypot(c[0] - coords[i - 1][0], c[1] - coords[i - 1][1]), 0);
  return /*#__PURE__*/React.createElement("svg", {
    className: "hero-spark",
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    height: height,
    preserveAspectRatio: "none",
    "aria-hidden": "true",
    style: {
      '--spark-len': Math.ceil(len)
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    vectorEffect: "non-scaling-stroke"
  }));
}

/* Arco del tasso di risparmio: prima occupava un riquadro alto 350px con
   dentro 200px di grafico e il resto aria. Qui sta accanto al numero. */
function SavingArc({
  rate,
  size = 62
}) {
  const pct = Math.max(0, Math.min(1, rate / 0.5));
  const r = (size - 7) / 2,
    cx = size / 2,
    cy = size / 2;
  const circ = 2 * Math.PI * r;
  const color = rate >= 0.2 ? C.sage : rate >= 0.1 ? C.gold : C.rust;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: "var(--border)",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: r,
    fill: "none",
    stroke: color,
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeDasharray: `${(circ * pct).toFixed(1)} ${circ.toFixed(1)}`,
    transform: `rotate(-90 ${cx} ${cy})`
  }));
}

/* Elenco ordinato delle spese: sostituisce la torta a dieci spicchi le cui
   etichette venivano tagliate a metà parola e sul telefono sparivano. */
function RankedList({
  items,
  max = 8
}) {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((s, i) => s + i.value, 0);
  const head = sorted.slice(0, max);
  const restValue = sorted.slice(max).reduce((s, i) => s + i.value, 0);
  const rows = restValue > 0 ? [...head, {
    name: `Altre ${sorted.length - max} voci`,
    value: restValue
  }] : head;
  const top = rows.length ? rows[0].value : 1;
  if (!rows.length) return /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.textMuted,
      fontSize: 13,
      padding: '18px 0'
    }
  }, "Nessuna spesa registrata.");
  return /*#__PURE__*/React.createElement("div", null, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.name + i,
    className: "rank-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rank-name",
    title: r.name
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "rank-value"
  }, fmt(r.value), /*#__PURE__*/React.createElement("span", {
    className: "rank-share",
    style: {
      marginLeft: 8
    }
  }, fmtPct(r.value / Math.max(1, total)))), /*#__PURE__*/React.createElement("div", {
    className: "rank-bar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: `${Math.max(2, r.value / top * 100)}%`,
      background: rampColor(i, rows.length)
    }
  })))));
}

/* Foglio dal basso: una sola implementazione per "Altro", il mese e le azioni */
function Sheet({
  title,
  onClose,
  children
}) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const f = ref.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.activeElement;
    const t = setTimeout(() => {
      const b = ref.current?.querySelector('button');
      if (b) b.focus();
    }, 30);
    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
      if (prev && prev.focus) prev.focus();
    };
  }, [onClose]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "sheet-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "sheet",
    ref: ref,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-handle"
  }), title && /*#__PURE__*/React.createElement("div", {
    className: "sheet-title"
  }, title), children));
}
function Toast({
  message
}) {
  if (!message) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "toast"
  }, message);
}

/* ── RadialGauge ── */
function RadialGauge({
  value,
  max = 1,
  label,
  sub,
  color = C.gold,
  size = 160
}) {
  const pct = Math.max(0, Math.min(1, max > 0 ? value / max : 0));
  const data = [{
    name: 'v',
    value: pct * 100,
    fill: color
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: size
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: size
  }, /*#__PURE__*/React.createElement(RadialBarChart, {
    cx: "50%",
    cy: "50%",
    innerRadius: "72%",
    outerRadius: "100%",
    barSize: 12,
    data: data,
    startAngle: 220,
    endAngle: -40
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "gaugeGrad",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "1"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0.55"
  }))), /*#__PURE__*/React.createElement(RadialBar, {
    dataKey: "value",
    cornerRadius: 8,
    fill: "url(#gaugeGrad)",
    background: false
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      display: 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "display-font number-display",
    style: {
      fontSize: 32,
      color: color,
      lineHeight: 1
    }
  }, label), sub && /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textDim,
      marginTop: 6,
      letterSpacing: '0.08em'
    }
  }, sub)));
}
/* ── Sidebar (solo desktop) ── */
function Sidebar({
  tabs,
  activeTab,
  onChange
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-logo",
    title: "G"
  }, "G"), tabs.map(t => {
    const Icon = t.icon;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: `side-btn ${activeTab === t.id ? 'active' : ''}`,
      onClick: () => onChange(t.id),
      "aria-label": t.label
    }, /*#__PURE__*/React.createElement(Icon, null), /*#__PURE__*/React.createElement("span", {
      className: "side-label"
    }, t.label), /*#__PURE__*/React.createElement("span", {
      className: "tooltip"
    }, t.label));
  }));
}

/* ── Navigazione mobile ──
   Quattro destinazioni fisse più "Altro". Prima le nove voci stavano in uno
   scroller orizzontale: etichette tagliate e Storico/Cedolini di fatto
   irraggiungibili senza sapere che si poteva scorrere. */
const PRIMARY_TABS = ['overview', 'transactions', 'investments', 'projection'];
function MobileNav({
  tabs,
  activeTab,
  onChange
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const primary = PRIMARY_TABS.map(id => tabs.find(t => t.id === id)).filter(Boolean);
  const secondary = tabs.filter(t => !PRIMARY_TABS.includes(t.id));
  const inSheet = secondary.some(t => t.id === activeTab);
  const shortLabel = {
    overview: 'Quadro',
    transactions: 'Movimenti',
    investments: 'Investim.',
    projection: 'Proiezioni'
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "mobile-nav",
    "aria-label": "Sezioni"
  }, primary.map(t => {
    const Icon = t.icon;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: `nav-btn ${activeTab === t.id ? 'active' : ''}`,
      onClick: () => onChange(t.id),
      "aria-current": activeTab === t.id ? 'page' : undefined
    }, /*#__PURE__*/React.createElement(Icon, null), /*#__PURE__*/React.createElement("span", {
      className: "nav-label"
    }, shortLabel[t.id] || t.label));
  }), /*#__PURE__*/React.createElement("button", {
    className: `nav-btn ${inSheet ? 'active' : ''}`,
    onClick: () => setSheetOpen(true),
    "aria-haspopup": "dialog",
    "aria-expanded": sheetOpen
  }, /*#__PURE__*/React.createElement(Ic.more, null), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Altro"))), sheetOpen && /*#__PURE__*/React.createElement(Sheet, {
    title: "Altre sezioni",
    onClose: () => setSheetOpen(false)
  }, secondary.map(t => {
    const Icon = t.icon;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: `sheet-row ${activeTab === t.id ? 'active' : ''}`,
      onClick: () => {
        onChange(t.id);
        setSheetOpen(false);
      }
    }, /*#__PURE__*/React.createElement(Icon, null), /*#__PURE__*/React.createElement("span", null, t.label), /*#__PURE__*/React.createElement("span", {
      className: "sheet-chevron"
    }, /*#__PURE__*/React.createElement(Ic.chevron, null)));
  })));
}

/* ── Reusable ── */
function Section({
  title,
  total,
  children,
  accent
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 18,
      borderBottom: `1px solid ${C.border}`,
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "display-font",
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 400
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent,
      marginRight: 8
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, title)), total !== undefined && /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 15,
      color: accent
    }
  }, fmt(total))), children);
}
function DataTable({
  items,
  section,
  onUpdate,
  onRemove,
  fields,
  fieldLabels
}) {
  return /*#__PURE__*/React.createElement("div", null, items.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "data-row data-edit-row",
    style: {
      display: 'grid',
      gridTemplateColumns: fields.length === 2 ? '2fr 1fr auto' : `2fr repeat(${fields.length - 1}, 1fr) auto`,
      gap: 12,
      alignItems: 'center',
      padding: '4px 0'
    }
  }, fields.map(f => /*#__PURE__*/React.createElement("input", {
    key: f,
    type: f === 'label' ? 'text' : 'number',
    value: item[f],
    onChange: e => onUpdate(section, item.id, f, e.target.value),
    className: f === 'label' ? 'input-label' : 'input-cell',
    placeholder: fieldLabels?.[f] || f,
    style: f !== 'label' ? {
      textAlign: 'right'
    } : {}
  })), /*#__PURE__*/React.createElement("button", {
    className: "row-delete",
    onClick: () => onRemove(section, item.id),
    style: {
      background: 'none',
      border: 'none',
      color: C.danger,
      cursor: 'pointer',
      padding: 4
    }
  }, /*#__PURE__*/React.createElement(Ic.trash, null)))));
}
function AddBtn({
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      marginTop: 16,
      background: 'transparent',
      border: `1px dashed ${C.border}`,
      color: C.textMuted,
      padding: '10px 16px',
      cursor: 'pointer',
      fontSize: 11,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 8,
      transition: 'all 0.2s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = C.gold;
      e.currentTarget.style.color = C.gold;
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = C.border;
      e.currentTarget.style.color = C.textMuted;
    }
  }, /*#__PURE__*/React.createElement(Ic.plus, null), " Aggiungi voce");
}
function DiagnosticItem({
  ok,
  title,
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `1px solid ${ok ? C.sage : C.rust}`,
      paddingLeft: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: ok ? C.sage : C.rust,
      marginBottom: 6
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: C.textDim,
      lineHeight: 1.5
    }
  }, text));
}

/* ── Parser cedolini / estratti conto ── */
function meseItToNum(name) {
  const idx = MESI_IT.indexOf(String(name || '').toLowerCase());
  return idx === -1 ? null : String(idx + 1).padStart(2, '0');
}
function parseItalianAmount(str) {
  if (!str) return null;
  let s = String(str).trim().replace(/[€\s]/g, '');
  const hasComma = s.includes(',');
  const hasDot = s.includes('.');
  if (hasComma && hasDot) {
    s = s.replace(/\./g, '').replace(',', '.');
  } else if (hasComma) {
    s = s.replace(',', '.');
  } else if (hasDot && /\.\d{3}(\D|$)/.test(s) && !/\.\d{1,2}$/.test(s)) {
    s = s.replace(/\./g, '');
  }
  const n = parseFloat(s);
  return isFinite(n) ? n : null;
}
function parseFinancialDoc(text) {
  const result = {
    month: null,
    netto: null,
    candidates: []
  };
  if (!text) return result;
  const lower = text.toLowerCase();

  // Mese: "gennaio 2024", "01/2024", "01-2024", "2024-01"
  const reMese1 = new RegExp('\\b(' + MESI_IT.join('|') + ')\\s+(20\\d{2})\\b', 'i');
  const m1 = lower.match(reMese1);
  if (m1) {
    const mm = meseItToNum(m1[1]);
    if (mm) result.month = m1[2] + '-' + mm;
  }
  if (!result.month) {
    const m2 = text.match(/\b(0[1-9]|1[0-2])[\/\-](20\d{2})\b/);
    if (m2) result.month = m2[2] + '-' + m2[1];else {
      const m3 = text.match(/\b(20\d{2})[\/\-](0[1-9]|1[0-2])\b/);
      if (m3) result.month = m3[1] + '-' + m3[2];
    }
  }

  // Netto: cerca parole chiave seguite da numero
  const keywords = ['netto a pagare', 'netto del mese', 'totale netto', 'totale competenze nette', 'totale a pagare', 'importo netto', 'netto in busta', 'netto bonifico'];
  const numPattern = '([0-9]{1,3}(?:[\\.\\s][0-9]{3})*(?:,[0-9]{2})?|[0-9]+(?:,[0-9]{2})?|[0-9]+\\.[0-9]{2})';
  for (const kw of keywords) {
    const re = new RegExp(kw.replace(/\s+/g, '\\s+') + '[\\s:€]*' + numPattern, 'i');
    const m = lower.match(re);
    if (m) {
      const val = parseItalianAmount(m[1]);
      if (val && val > 100 && val < 100000) {
        result.candidates.push({
          keyword: kw,
          value: val
        });
        if (result.netto === null) result.netto = val;
      }
    }
  }
  if (result.netto === null) {
    // Fallback: il più grande importo del documento (euristica)
    const allNums = [...lower.matchAll(/([0-9]{1,3}(?:[\.\s][0-9]{3})+,[0-9]{2}|[0-9]+,[0-9]{2})/g)].map(x => parseItalianAmount(x[1])).filter(v => v && v > 500 && v < 20000);
    if (allNums.length) result.netto = Math.max(...allNums);
  }
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
      reject(new Error(`Impossibile caricare ${src}`));
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
  if (onProgress) onProgress('Carico il lettore PDF...');
  await loadScript(PDFJS_URL);
  if (!window.pdfjsLib) throw new Error('PDF.js non disponibile');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
  return window.pdfjsLib;
}
async function ensureTesseract(onProgress) {
  if (window.Tesseract) return window.Tesseract;
  if (onProgress) onProgress('Carico il motore OCR...');
  await loadScript(TESSERACT_URL);
  if (!window.Tesseract) throw new Error('Tesseract.js non disponibile');
  return window.Tesseract;
}
async function extractTextFromFile(file, onProgress) {
  const name = (file.name || '').toLowerCase();
  const isPdf = name.endsWith('.pdf') || file.type === 'application/pdf';
  if (isPdf) {
    await ensurePdfJs(onProgress);
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({
      data: buf
    }).promise;
    let full = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      if (onProgress) onProgress(`Lettura pagina ${i}/${pdf.numPages}...`);
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      full += content.items.map(it => it.str).join(' ') + '\n';
    }
    if (full.replace(/\s/g, '').length < 30) {
      // PDF probabilmente scansionato → fallback OCR sulla prima pagina
      if (onProgress) onProgress('PDF scansionato, eseguo OCR...');
      const Tesseract = await ensureTesseract(onProgress);
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({
        scale: 2
      });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport
      }).promise;
      const {
        data
      } = await Tesseract.recognize(canvas, 'ita');
      full = data.text || '';
    }
    return full;
  }
  // Immagini → OCR
  if (file.type.startsWith('image/')) {
    const Tesseract = await ensureTesseract(onProgress);
    if (onProgress) onProgress('OCR immagine in corso...');
    const {
      data
    } = await Tesseract.recognize(file, 'ita', {
      logger: m => {
        if (m.status === 'recognizing text' && onProgress) onProgress(`OCR ${Math.round(m.progress * 100)}%`);
      }
    });
    return data.text || '';
  }
  throw new Error('Formato file non supportato');
}

/* ── Parser estratti conto → movimenti ── */
function parseStatementDate(s) {
  if (!s) return null;
  s = String(s).trim().replace(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/, (_, y, m, d) => `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`);
  let m = s.match(/\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})\b/);
  if (m) {
    let y = m[3];
    if (y.length === 2) y = '20' + y;
    return `${y}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
  }
  m = s.match(/\b(\d{4})[\/.\-](\d{1,2})[\/.\-](\d{1,2})\b/);
  if (m) return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
  return null;
}
function parseCSVRows(text) {
  const sample = text.split(/\r?\n/).find(l => l.trim()) || '';
  const delim = sample.split(';').length > sample.split(',').length ? ';' : ',';
  const rows = [];
  let row = [],
    field = '',
    inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQ = false;
      } else field += c;
    } else {
      if (c === '"') inQ = true;else if (c === delim) {
        row.push(field);
        field = '';
      } else if (c === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else if (c === '\r') {/* skip */} else field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
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
    if (/\bdata\b/.test(joined) && /(importo|amount|dare|avere|entrate|uscite|accredit|addebit|valore)/.test(joined)) {
      headerIdx = i;
      break;
    }
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
  if (dateIdx === -1 || amtIdx === -1 && dareIdx === -1 && avereIdx === -1) return [];
  const out = [];
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    const date = parseStatementDate(r[dateIdx]);
    if (!date) continue;
    let amount = null,
      type = null;
    if (amtIdx !== -1 && r[amtIdx]) {
      const raw = parseItalianAmount(r[amtIdx]);
      if (raw === null || raw === 0) continue;
      amount = Math.abs(raw);
      type = raw < 0 ? 'expense' : 'income';
    } else {
      const d = dareIdx !== -1 ? parseItalianAmount(r[dareIdx]) : null;
      const a = avereIdx !== -1 ? parseItalianAmount(r[avereIdx]) : null;
      if (a) {
        amount = Math.abs(a);
        type = 'income';
      } else if (d) {
        amount = Math.abs(d);
        type = 'expense';
      } else continue;
    }
    const description = (descIdx !== -1 ? r[descIdx] || '' : '').replace(/\s+/g, ' ').trim();
    out.push({
      date,
      description: description || 'Movimento',
      amount,
      type
    });
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
    const end = i + 1 < dates.length ? dates[i + 1].index : Math.min(t.length, start + 400);
    const seg = t.slice(start, end);
    const dateM = seg.match(/^\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}/);
    if (!dateM) continue;
    const date = parseStatementDate(dateM[0]);
    if (!date) continue;
    amtRe.lastIndex = 0;
    let am,
      last = null;
    while ((am = amtRe.exec(seg)) !== null) {
      if (am.index >= dateM[0].length) last = am;
    }
    if (!last) continue;
    const num = parseItalianAmount(last[2]);
    if (!num || num <= 0) continue;
    const sign = last[1] === '-' || last[3] === '-' ? -1 : 1;
    let desc = seg.slice(dateM[0].length, last.index).replace(/^\s*\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}\s*/, '') // eventuale seconda data (valuta)
    .replace(/\s+/g, ' ').trim();
    const clean = desc.replace(/saldo|riporto|totale|pagina|estratto conto|disponibilit[aà]/ig, '').trim();
    if (!clean && desc) continue; // riga di saldo/totale
    out.push({
      date,
      description: desc || 'Movimento',
      amount: num,
      type: sign < 0 ? 'expense' : 'income'
    });
  }
  return out;
}
const TX_CATEGORY_RULES = [
// — Uscite —
[/esselunga|conad|coop\b|carrefour|lidl|eurospin|\bpam\b|despar|supermerc|\bmd\b|\baldi\b|alimentari|macelleria|panetteria|ortofrutta/i, 'Spesa alimentare', 'expense'], [/affitto|canone\s+locazione|locazione/i, 'Affitto / Mutuo', 'expense'], [/mutuo|rata\s+mutuo/i, 'Affitto / Mutuo', 'expense'], [/enel|a2a|hera\b|iren\b|acea|edison|eni\s*gas|sorgenia|illumia|servizio\s+elettrico|metano|acquedot|bolletta|\bgas\b|fornitura/i, 'Bollette', 'expense'], [/\btim\b|vodafone|wind\s?tre|windtre|iliad|fastweb|telecom|fibra|adsl|internet|sky\s*wifi/i, 'Bollette', 'expense'], [/netflix|spotify|disney|prime\s*video|amazon\s*prime|now\s*tv|\bdazn\b|youtube\s*premium|icloud|google\s*one|dropbox|abbonamento|canone\s*mensile/i, 'Abbonamenti', 'expense'], [/trenitalia|\bitalo\b|\batac\b|\bgtt\b|\bamt\b|atm\s*milano|autostrad|telepass|carburant|benzina|\bq8\b|\beni\b|\besso\b|tamoil|\bip\b\s*gas|distributore|parchegg|\btaxi\b|\buber\b|\bbus\b|biglietto\s*treno|abbonamento\s*(bus|treno|metro)/i, 'Trasporti', 'expense'], [/farmacia|parafarmac|dott\.|medico|dentist|odontoiatr|ospedale|\basl\b|analisi\s*clinic|laboratorio\s*analisi|\bottica\b|visita\s*medica|fisioterap/i, 'Salute', 'expense'], [/universit|tasse\s*univ|libreria|\bcorso\b|iscrizione|\bscuola\b|\besame\b|udemy|coursera|formazione/i, 'Istruzione', 'expense'], [/ristorante|pizzeria|trattoria|osteria|\bbar\b|caff[eè]|mcdonald|burger\s*king|kfc|deliveroo|just\s?eat|glovo|\bcinema\b|teatro|concerto|museo|palestra|\bgym\b/i, 'Svago', 'expense'], [/zalando|\bzara\b|h&m|\bhm\b|amazon(?!\s*prime)|\bebay\b|decathlon|\bikea\b|mediaworld|unieuro|euronics|apple\s*store|\bnike\b|adidas|leroy\s*merlin|brico|negozio|acquisto\s*pos/i, 'Shopping', 'expense'], [/\bf24\b|agenzia\s*entrate|\bimu\b|\btari\b|\btasi\b|bollo\s*auto|canone\s*rai|imposta|tributo|\btassa\b|\biva\b\s*trimestr|inps|inail/i, 'Tasse', 'expense'],
// — Entrate —
[/stipendio|emolument|retribuzione|cedolino|busta\s*paga|accredito\s*stipendio|\bnetto\b\s*bonifico/i, 'Stipendio', 'income'], [/fattura|compenso|prestazione|parcella|freelance|\bp\.?\s?iva\b|onorario|collaborazione/i, 'Freelance', 'income'], [/dividend|\bcedola\b|interess(i|e)\s*attiv|rendiment|plusvalenz|affitto\s*attivo|locazione\s*attiva/i, 'Entrate passive', 'income'], [/rimborso|\bstorno\b|\breso\b|cashback/i, 'Rimborsi', 'income'], [/disinvestiment|vendita\s*titoli|riscatto|liquidazione\s*fondo|prelievo\s*da\s*deposito/i, 'Investimenti', 'income']];
function guessTxCategory(desc, type) {
  const d = String(desc || '');
  for (const [re, cat, t] of TX_CATEGORY_RULES) {
    if (t === type && re.test(d)) return cat;
  }
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
  return (existing || []).some(e => e.date === tx.date && Math.abs(Math.abs(Number(e.amount) || 0) - amt) < 0.005 && String(e.description || '').slice(0, 24).toLowerCase().trim() === desc);
}

/* ── Cedolini Tab ── */
function CedoliniTab({
  cedolini,
  onAdd,
  onRemove,
  currentISO,
  showToast
}) {
  const [form, setForm] = React.useState({
    month: currentISO || '',
    netto: '',
    note: ''
  });
  const [err, setErr] = React.useState('');
  const [isDragging, setIsDragging] = React.useState(false);
  const [loading, setLoading] = React.useState('');
  const [confirmData, setConfirmData] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const handleFileUpload = async file => {
    if (!file) return;
    setLoading('Analisi del documento in corso...');
    try {
      const text = await extractTextFromFile(file, msg => setLoading(msg));
      const parsed = parseFinancialDoc(text);
      if (!parsed.netto && !parsed.month) {
        showToast && showToast('Estrazione fallita: dati non riconosciuti');
        setLoading('');
        return;
      }
      setConfirmData({
        month: parsed.month || currentISO || '',
        netto: parsed.netto ? String(parsed.netto.toFixed(2)) : '',
        note: `Importato da ${file.name}`,
        candidates: parsed.candidates,
        fileName: file.name
      });
      setLoading('');
    } catch (e) {
      console.error(e);
      showToast && showToast('Errore: ' + e.message);
      setLoading('');
    }
  };
  const onDrop = e => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFileUpload(f);
  };
  const confirmImport = () => {
    if (!confirmData) return;
    if (!confirmData.month.match(/^\d{4}-\d{2}$/)) {
      showToast && showToast('Mese non valido');
      return;
    }
    const n = Number(confirmData.netto);
    if (!n || n <= 0) {
      showToast && showToast('Netto non valido');
      return;
    }
    if (cedolini.find(c => c.month === confirmData.month)) {
      showToast && showToast('Cedolino già presente per questo mese');
      return;
    }
    onAdd({
      id: Date.now(),
      month: confirmData.month,
      netto: n,
      note: confirmData.note
    });
    setConfirmData(null);
    showToast && showToast('Cedolino importato dal documento');
  };
  const sorted = [...cedolini].sort((a, b) => a.month.localeCompare(b.month));
  const handleAdd = () => {
    if (!form.month.match(/^\d{4}-\d{2}$/)) {
      setErr('Formato mese non valido (YYYY-MM)');
      return;
    }
    const nettoNum = Number(form.netto);
    if (!nettoNum || nettoNum <= 0) {
      setErr('Inserisci un netto valido');
      return;
    }
    if (cedolini.find(c => c.month === form.month)) {
      setErr('Cedolino già presente per questo mese');
      return;
    }
    onAdd({
      id: Date.now(),
      month: form.month,
      netto: nettoNum,
      note: form.note
    });
    setForm(f => ({
      ...f,
      netto: '',
      note: ''
    }));
    setErr('');
  };
  const chartData = sorted.map(c => ({
    month: c.month,
    netto: c.netto
  }));
  const avg = sorted.length > 0 ? sorted.reduce((s, c) => s + c.netto, 0) / sorted.length : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Importa da PDF / immagine")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, "cedolini \xB7 estratti conto")), /*#__PURE__*/React.createElement("div", {
    onDragOver: e => {
      e.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: () => setIsDragging(false),
    onDrop: onDrop,
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    style: {
      border: `2px dashed ${isDragging ? C.gold : C.borderLight}`,
      background: isDragging ? 'var(--accent-subtle)' : 'var(--surface-soft)',
      borderRadius: 8,
      padding: '32px 20px',
      textAlign: 'center',
      cursor: loading ? 'wait' : 'pointer',
      transition: 'all 0.2s',
      opacity: loading ? 0.7 : 1
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "application/pdf,image/*",
    style: {
      display: 'none'
    },
    onChange: e => {
      const f = e.target.files[0];
      if (f) handleFileUpload(f);
      e.target.value = '';
    }
  }), loading ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 10
    }
  }, "\u23F3"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.gold,
      fontSize: 13,
      letterSpacing: '0.05em'
    }
  }, loading)) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 10,
      color: C.gold
    }
  }, "\u2913"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.text,
      fontSize: 14,
      marginBottom: 6
    }
  }, "Trascina qui un ", /*#__PURE__*/React.createElement("strong", null, "cedolino PDF"), " o un ", /*#__PURE__*/React.createElement("strong", null, "estratto conto")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.textMuted,
      fontSize: 11.5
    }
  }, "oppure clicca per selezionare \xB7 supportati PDF e immagini (OCR)"))), confirmData && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: 16,
      border: `1px solid ${C.gold}`,
      borderRadius: 6,
      background: 'var(--accent-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: C.gold,
      marginBottom: 12
    }
  }, "Conferma dati estratti \u2014 ", confirmData.fileName), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '160px 180px 1fr auto auto',
      gap: 12,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Mese"), /*#__PURE__*/React.createElement("input", {
    className: "input-cell",
    value: confirmData.month,
    onChange: e => setConfirmData(d => ({
      ...d,
      month: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Netto (\u20AC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    value: confirmData.netto,
    onChange: e => setConfirmData(d => ({
      ...d,
      netto: e.target.value
    })),
    style: {
      textAlign: 'right'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Note"), /*#__PURE__*/React.createElement("input", {
    className: "input-label",
    value: confirmData.note,
    onChange: e => setConfirmData(d => ({
      ...d,
      note: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("button", {
    onClick: confirmImport,
    style: {
      background: C.gold,
      border: 'none',
      color: C.onAccent,
      padding: '10px 20px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.08em',
      borderRadius: 6,
      whiteSpace: 'nowrap'
    }
  }, "\u2713 Conferma"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmData(null),
    style: {
      background: 'transparent',
      border: `1px solid ${C.border}`,
      color: C.textDim,
      padding: '10px 16px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 12,
      letterSpacing: '0.08em',
      borderRadius: 6
    }
  }, "Annulla")), confirmData.candidates && confirmData.candidates.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 11,
      color: C.textMuted
    }
  }, "Riconosciuto via: ", confirmData.candidates.map(c => `"${c.keyword}" → ${fmt(c.value)}`).join(' · ')))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Inserisci cedolino"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: 16,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Mese (YYYY-MM)"), /*#__PURE__*/React.createElement("input", {
    className: "input-cell",
    placeholder: "2026-04",
    value: form.month,
    onChange: e => setForm(f => ({
      ...f,
      month: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Netto a pagare (\u20AC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    placeholder: "1550",
    value: form.netto,
    onChange: e => setForm(f => ({
      ...f,
      netto: e.target.value
    })),
    style: {
      textAlign: 'right'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Note (opzionale)"), /*#__PURE__*/React.createElement("input", {
    className: "input-label",
    placeholder: "Arretrati, vigilanze, ecc.",
    value: form.note,
    onChange: e => setForm(f => ({
      ...f,
      note: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: handleAdd,
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ic.plus, null), " Aggiungi")), err && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 12,
      color: C.danger
    }
  }, err)), sorted.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Trend netto mensile")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, "media ", fmt(avg))), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 240
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: chartData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    stroke: C.textMuted,
    tick: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: C.textMuted,
    tickFormatter: v => `${v}€`,
    tick: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    contentStyle: {
      background: C.bg,
      border: `1px solid ${C.gold}`,
      fontFamily: 'var(--font-number)',
      fontSize: 12,
      color: C.text,
      borderRadius: 4
    },
    formatter: v => [fmt(v), 'Netto']
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "netto",
    stroke: C.gold,
    strokeWidth: 2.5,
    dot: {
      r: 5,
      fill: C.gold
    },
    name: "Netto"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Cedolini registrati")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, sorted.length, " mesi")), sorted.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      textAlign: 'center',
      color: C.textMuted
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 12
    }
  }, "\uD83D\uDCC4"), /*#__PURE__*/React.createElement("p", null, "Nessun cedolino inserito. Usa il form sopra per aggiungere il netto mensile.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: `1px solid ${C.border}`
    }
  }, ['Mese', 'Netto', 'Δ mese prec.', 'Stato', 'Note', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '10px 8px',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: C.textMuted,
      fontWeight: 500
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, sorted.map((c, i) => {
    const prev = sorted[i - 1];
    const delta = prev ? c.netto - prev.netto : null;
    const isActive = c.month === currentISO;
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id,
      style: {
        borderBottom: `1px solid ${C.border}`,
        background: isActive ? 'var(--accent-subtle)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '12px 8px',
        color: isActive ? C.gold : C.text
      }
    }, c.month), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '12px 8px',
        color: C.gold,
        fontWeight: 600
      }
    }, fmt(c.netto)), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '12px 8px',
        color: delta === null ? C.textMuted : delta >= 0 ? C.sage : C.rust
      }
    }, delta === null ? '—' : `${delta >= 0 ? '+' : ''}${fmt(delta)}`), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 8px'
      }
    }, isActive && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: C.gold,
        border: `1px solid ${C.goldDim}`,
        padding: '2px 8px',
        borderRadius: 3
      }
    }, "Mese corrente")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 8px',
        color: C.textDim,
        fontSize: 12,
        maxWidth: 200
      }
    }, c.note || '—'), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 8px'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onRemove(c.id),
      style: {
        background: 'none',
        border: 'none',
        color: C.danger,
        cursor: 'pointer',
        opacity: 0.6,
        transition: 'opacity 0.2s'
      },
      onMouseEnter: e => e.currentTarget.style.opacity = 1,
      onMouseLeave: e => e.currentTarget.style.opacity = 0.6
    }, /*#__PURE__*/React.createElement(Ic.trash, null))));
  }))))), sorted.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Media netto"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: C.gold
    }
  }, fmt(avg)), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, sorted.length, " mesi registrati")), sorted.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-4 accent-rust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Netto minimo"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: C.rust
    }
  }, fmt(Math.min(...sorted.map(c => c.netto)))), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, sorted.reduce((m, c) => c.netto < m.netto ? c : m).month)), sorted.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-4 accent-sage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Netto massimo"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: C.sage
    }
  }, fmt(Math.max(...sorted.map(c => c.netto)))), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, sorted.reduce((m, c) => c.netto > m.netto ? c : m).month)));
}

/* ── Investment helpers ── */
const TYPE_COLORS = {
  Equity: C.gold,
  Cripto: C.rust,
  Pensione: C.purple,
  Bond: C.teal,
  Liquidita: C.textDim
};
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
function InvestmentsTab({
  data,
  totals,
  onUpdateField,
  onAddItem,
  onRemoveItem,
  onUpdateTarget
}) {
  const investments = data.investments;
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
  }, {
    num: 0,
    den: 0
  });
  const roiPct = weighted.den > 0 ? weighted.num / weighted.den * 100 : 0;
  const allocMap = investments.reduce((acc, i) => {
    const t = i.type || 'Equity';
    acc[t] = (acc[t] || 0) + Number(i.current || 0);
    return acc;
  }, {});
  const allocPie = Object.entries(allocMap).map(([name, value]) => ({
    name,
    value
  }));
  const target = data.investmentsMeta.targetAllocation;
  const categories = Array.from(new Set([...Object.keys(target), ...Object.keys(allocMap)]));
  const allocBars = categories.map(cat => ({
    name: cat,
    Attuale: totalInvested > 0 ? +((allocMap[cat] || 0) / totalInvested * 100).toFixed(1) : 0,
    Target: Number(target[cat] || 0)
  }));
  const pipMonthly = 250;
  const pipYears = 36;
  const finA = pacMontante(pipMonthly, 0.0307, pipYears);
  const finB = pacMontante(pipMonthly, 0.0580, pipYears);
  const costOpportunity = finB - finA;
  const roadmapMonths = monthsUntil('2026-09-09');
  const ttStyle = {
    contentStyle: {
      background: C.bg,
      border: `1px solid ${C.gold}`,
      fontFamily: 'var(--font-number)',
      fontSize: 12,
      color: C.text,
      borderRadius: 4
    },
    itemStyle: {
      color: C.textDim
    },
    labelStyle: {
      color: C.gold
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Patrimonio investito"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: C.gold
    }
  }, fmt(totalInvested)), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, investments.length, " posizioni \xB7 capitale ", fmt(totalEntry))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3 accent-sage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Rendimento medio ponderato"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: roiPct >= 0 ? C.sage : C.rust
    }
  }, roiPct >= 0 ? '+' : '', roiPct.toFixed(2), "%"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "media pesata su valore corrente")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "PAC mensile totale"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: C.gold
    }
  }, fmt(totals.totalInvestMonthly)), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "in accumulo automatico")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3 accent-rust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Peso su patrimonio netto"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: C.purple
    }
  }, totals.netWorth > 0 ? (totalInvested / totals.netWorth * 100).toFixed(1) : '0.0', "%"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "su ", fmt(totals.netWorth), " totali")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Performance per posizione"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, investments.map(inv => {
    const cv = Number(inv.current || 0);
    const ev = Number(inv.entryValue || 0);
    const roi = ev > 0 ? (cv - ev) / ev * 100 : 0;
    const progressMax = Math.max(cv, ev, 1);
    const progressPct = cv / progressMax * 100;
    const roiColor = ev === 0 ? C.textMuted : roi >= 0 ? C.sage : C.rust;
    const typeColor = TYPE_COLORS[inv.type] || C.gold;
    return /*#__PURE__*/React.createElement("div", {
      key: inv.id,
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: 14,
        background: 'var(--surface-soft)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "display-font",
      style: {
        fontSize: 16,
        fontStyle: 'italic',
        color: C.text
      }
    }, inv.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: typeColor,
        border: `1px solid ${typeColor}`,
        padding: '2px 8px',
        borderRadius: 3
      }
    }, inv.type), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: C.textDim,
        border: `1px solid ${C.border}`,
        padding: '2px 8px',
        borderRadius: 3
      }
    }, inv.risk)), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 13,
        color: roiColor,
        fontWeight: 600
      }
    }, ev > 0 ? `${roi >= 0 ? '+' : ''}${roi.toFixed(2)}%` : '—')), /*#__PURE__*/React.createElement("div", {
      className: "progress-track",
      style: {
        height: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-fill",
      style: {
        '--fill': progressPct / 100,
        background: roi >= 0 ? `linear-gradient(90deg, ${C.goldDim}, ${C.sage})` : `linear-gradient(90deg, ${C.rust}, ${C.goldDim})`
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 8,
        fontSize: 11
      },
      className: "mono-font"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.textDim
      }
    }, "Attuale ", fmt(cv), " \xB7 Capitale ", fmt(ev)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.gold
      }
    }, "PAC ", fmt(inv.monthly), "/m")));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Allocazione attuale per tipo"))), allocPie.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      textAlign: 'center',
      color: C.textMuted
    }
  }, "Nessun investimento.") : /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 260
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: allocPie,
    dataKey: "value",
    cx: "50%",
    cy: "50%",
    innerRadius: 55,
    outerRadius: 95,
    paddingAngle: 2,
    label: ({
      name,
      percent
    }) => percent > 0.04 ? `${name} ${(percent * 100).toFixed(0)}%` : '',
    labelLine: false
  }, allocPie.map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: TYPE_COLORS[d.name] || PIE_COLORS[i % PIE_COLORS.length]
  }))), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => fmt(v)
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Attuale vs Target"))), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 220
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: allocBars,
    margin: {
      top: 10,
      right: 10,
      left: 0,
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "name",
    stroke: C.textMuted,
    tick: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: C.textMuted,
    tickFormatter: v => `${v}%`,
    tick: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => `${v}%`
  })), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "Attuale",
    fill: C.gold,
    radius: [4, 4, 0, 0]
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "Target",
    fill: C.sage,
    radius: [4, 4, 0, 0]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: 10
    }
  }, Object.keys(target).map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 9,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: C.textMuted
    }
  }, cat, " target %"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell mono-font",
    value: target[cat],
    onChange: e => onUpdateTarget(cat, e.target.value),
    style: {
      textAlign: 'right'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Analisi costo PIP (36 anni, 250\u20AC/m)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `1px solid ${C.rust}`,
      paddingLeft: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: C.rust,
      marginBottom: 6
    }
  }, "Scenario A \u2014 PIP Alleata"), /*#__PURE__*/React.createElement("div", {
    className: "display-font number-display",
    style: {
      fontSize: 26,
      color: C.rust
    }
  }, fmt(finA)), /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textDim,
      marginTop: 6
    }
  }, "6% lordo \u2212 TER 2.93% = 3.07% netto")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `1px solid ${C.sage}`,
      paddingLeft: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: C.sage,
      marginBottom: 6
    }
  }, "Scenario B \u2014 ETF (VWCE/SWDA)"), /*#__PURE__*/React.createElement("div", {
    className: "display-font number-display",
    style: {
      fontSize: 26,
      color: C.sage
    }
  }, fmt(finB)), /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textDim,
      marginTop: 6
    }
  }, "6% lordo \u2212 TER 0.20% = 5.80% netto")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `1px solid ${C.gold}`,
      paddingLeft: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: C.gold,
      marginBottom: 6
    }
  }, "Costo opportunit\xE0"), /*#__PURE__*/React.createElement("div", {
    className: "display-font number-display",
    style: {
      fontSize: 26,
      color: C.gold
    }
  }, fmt(costOpportunity)), /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textDim,
      marginTop: 6
    }
  }, "differenza A \u2192 B"))), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: 11,
      color: C.textMuted
    }
  }, "Calcolo semplificato con montante PAC (rendimento netto costante). Il TER reale Alleata Azionaria \xE8 2.93% (fonte: prospetto 2025).")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.gold,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Ic.clock, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement("h4", {
    className: "display-font",
    style: {
      margin: '0 0 4px',
      fontSize: 17,
      fontStyle: 'italic'
    }
  }, "Roadmap settembre 2026"), /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 12,
      color: C.gold,
      marginBottom: 10
    }
  }, roadmapMonths, " mesi al rinnovo contratto (09/09/2026)"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      paddingLeft: 20,
      fontSize: 13,
      lineHeight: 1.75,
      color: C.textDim
    }
  }, /*#__PURE__*/React.createElement("li", null, "Ridurre PIP da 250\u20AC a ~100\u20AC/mese (mantenere soglia deducibilit\xE0)"), /*#__PURE__*/React.createElement("li", null, "Redirigere 150\u20AC/mese verso ETF VWCE/SWDA su Scalable Capital"), /*#__PURE__*/React.createElement("li", null, "Valutare aumento PAC ETF con cash flow liberato dalle rate in scadenza"))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Posizioni di investimento")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 13,
      color: C.gold
    }
  }, fmt(totalInvested), " \xB7 +", fmt(totals.totalInvestMonthly), "/m")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 13,
      minWidth: 720
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: `1px solid ${C.border}`
    }
  }, ['Posizione', 'Valore attuale', 'Capitale investito', 'PAC mensile', 'Tipo', 'Rischio', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '10px 8px',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: C.textMuted,
      fontWeight: 500
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, investments.map(inv => /*#__PURE__*/React.createElement("tr", {
    key: inv.id,
    className: "data-row",
    style: {
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-label",
    value: inv.label,
    onChange: e => onUpdateField('investments', inv.id, 'label', e.target.value)
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    value: inv.current,
    onChange: e => onUpdateField('investments', inv.id, 'current', e.target.value)
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    value: inv.entryValue || 0,
    onChange: e => onUpdateField('investments', inv.id, 'entryValue', e.target.value)
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    value: inv.monthly,
    onChange: e => onUpdateField('investments', inv.id, 'monthly', e.target.value)
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: inv.type,
    onChange: e => onUpdateField('investments', inv.id, 'type', e.target.value),
    className: "input-cell",
    style: {
      background: C.card
    }
  }, /*#__PURE__*/React.createElement("option", null, "Equity"), /*#__PURE__*/React.createElement("option", null, "Pensione"), /*#__PURE__*/React.createElement("option", null, "Cripto"), /*#__PURE__*/React.createElement("option", null, "Bond"), /*#__PURE__*/React.createElement("option", null, "Liquidita"))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "input-label mono-font",
    value: inv.risk,
    onChange: e => onUpdateField('investments', inv.id, 'risk', e.target.value),
    style: {
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '4px 8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "row-delete",
    onClick: () => onRemoveItem('investments', inv.id),
    style: {
      background: 'none',
      border: 'none',
      color: C.danger,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Ic.trash, null)))))))), /*#__PURE__*/React.createElement(AddBtn, {
    onClick: () => onAddItem('investments', {
      label: 'Nuova posizione',
      current: 0,
      entryValue: 0,
      monthly: 0,
      type: 'Equity',
      risk: 'Medio'
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.gold,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Ic.alert, {
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "display-font",
    style: {
      margin: '0 0 8px',
      fontSize: 16,
      fontStyle: 'italic'
    }
  }, "Note sul PIP"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      lineHeight: 1.6,
      color: C.textDim
    }
  }, "Il PIP Alleata Previdenza ha un TER del 2,93% \u2014 sopra la media per ETF (0,15-0,25%). Proiezioni usano rendimento netto 4% annuo per \"Pensione\". Valuta riduzione versamento dopo settembre 2026 mantenendo quota per deducibilita fiscale.")))));
}

/* ── Sentiment Panel ── */
function SentimentPanel({
  onPrefill
}) {
  const [fng, setFng] = React.useState({
    data: null,
    error: null,
    loading: true
  });
  const [poly, setPoly] = React.useState({
    data: null,
    error: null,
    loading: true
  });
  React.useEffect(() => {
    const ctrl = new AbortController();
    fetch('https://api.alternative.me/fng/?limit=7', {
      signal: ctrl.signal
    }).then(r => r.ok ? r.json() : Promise.reject('http')).then(j => {
      const arr = (j.data || []).slice().reverse().map(d => ({
        date: new Date(Number(d.timestamp) * 1000).toISOString().slice(5, 10),
        value: Number(d.value),
        classification: d.value_classification
      }));
      setFng({
        data: arr,
        error: null,
        loading: false
      });
    }).catch(e => {
      if (e.name !== 'AbortError') setFng({
        data: null,
        error: true,
        loading: false
      });
    });
    return () => ctrl.abort();
  }, []);
  React.useEffect(() => {
    const ctrl = new AbortController();
    fetch('https://gamma-api.polymarket.com/markets?limit=10&active=true&closed=false', {
      signal: ctrl.signal
    }).then(r => r.ok ? r.json() : Promise.reject('http')).then(j => {
      const list = (Array.isArray(j) ? j : j.data || []).slice(0, 10).map(m => {
        let yes = null;
        try {
          const prices = typeof m.outcomePrices === 'string' ? JSON.parse(m.outcomePrices) : m.outcomePrices;
          if (Array.isArray(prices) && prices.length > 0) yes = Number(prices[0]);
        } catch {}
        return {
          id: m.id || m.conditionId,
          question: m.question || m.slug,
          yes,
          volume: m.volume ? Number(m.volume) : null,
          endDate: m.endDate || m.end_date_iso || ''
        };
      });
      setPoly({
        data: list,
        error: null,
        loading: false
      });
    }).catch(e => {
      if (e.name !== 'AbortError') setPoly({
        data: null,
        error: true,
        loading: false
      });
    });
    return () => ctrl.abort();
  }, []);
  const fngCurrent = fng.data && fng.data.length > 0 ? fng.data[fng.data.length - 1] : null;
  const fngColor = v => v <= 25 ? C.danger : v <= 45 ? C.rust : v <= 55 ? C.gold : v <= 75 ? '#a0c774' : C.sage;
  const fngLabel = v => v <= 25 ? 'Extreme Fear' : v <= 45 ? 'Fear' : v <= 55 ? 'Neutral' : v <= 75 ? 'Greed' : 'Extreme Greed';
  const ttStyle = {
    contentStyle: {
      background: C.bg,
      border: `1px solid ${C.gold}`,
      fontFamily: 'var(--font-number)',
      fontSize: 12,
      color: C.text,
      borderRadius: 4
    },
    itemStyle: {
      color: C.textDim
    },
    labelStyle: {
      color: C.gold
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Sentiment & feed live"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Crypto Fear & Greed (alternative.me)"), fng.loading && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.textMuted,
      fontSize: 12
    }
  }, "Caricamento\u2026"), fng.error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.rust,
      fontSize: 12
    }
  }, "Dati non disponibili offline."), fngCurrent && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(RadialGauge, {
    value: fngCurrent.value,
    max: 100,
    label: fngCurrent.value,
    sub: fngLabel(fngCurrent.value).toUpperCase(),
    color: fngColor(fngCurrent.value),
    size: 140
  })), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 120
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: fng.data
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: C.textMuted,
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: C.textMuted,
    domain: [0, 100],
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(Tooltip, ttStyle), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "value",
    stroke: C.gold,
    strokeWidth: 2,
    dot: {
      r: 3,
      fill: C.gold
    }
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Top 10 mercati Polymarket"), poly.loading && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.textMuted,
      fontSize: 12
    }
  }, "Caricamento\u2026"), poly.error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.rust,
      fontSize: 12
    }
  }, "Feed non disponibile. Inserisci posizioni manualmente."), poly.data && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      maxHeight: 380,
      overflowY: 'auto'
    }
  }, poly.data.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.textMuted,
      fontSize: 12
    }
  }, "Nessun mercato attivo."), poly.data.map((m, i) => {
    const yesPct = m.yes != null ? m.yes <= 1 ? m.yes * 100 : m.yes : null;
    return /*#__PURE__*/React.createElement("div", {
      key: m.id || i,
      style: {
        border: `1px solid ${C.border}`,
        padding: 10,
        borderRadius: 6,
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.text,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, m.question), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 10,
        color: C.textMuted,
        marginTop: 3
      }
    }, yesPct != null ? `YES ${yesPct.toFixed(1)}%` : 'YES n/d', m.volume != null ? ` · vol ${(m.volume / 1000).toFixed(1)}k` : '')), /*#__PURE__*/React.createElement("button", {
      onClick: () => onPrefill({
        market: m.question,
        outcome: 'YES',
        currency: 'USDC',
        entryProb: yesPct != null ? Math.max(1, Math.min(99, Math.round(yesPct))) : 50,
        currentProb: yesPct != null ? Math.max(1, Math.min(99, Math.round(yesPct))) : 50,
        deadline: (m.endDate || '').slice(0, 10)
      }),
      style: {
        background: 'transparent',
        border: `1px solid ${C.goldDim}`,
        color: C.gold,
        padding: '4px 8px',
        fontSize: 10,
        letterSpacing: '0.08em',
        cursor: 'pointer',
        borderRadius: 4,
        whiteSpace: 'nowrap'
      }
    }, "+ Watchlist"));
  })))));
}

/* ── Markets Tab ── */
function MarketsTab({
  markets,
  onAdd,
  onUpdate,
  onRemove,
  onClose,
  onUpdateRate
}) {
  const [form, setForm] = React.useState({
    market: '',
    outcome: 'YES',
    currency: 'USDC',
    capitalRisked: '',
    entryProb: '',
    currentProb: '',
    deadline: '',
    note: ''
  });
  const [err, setErr] = React.useState('');
  const formRef = React.useRef(null);
  const handlePrefill = React.useCallback(p => {
    setForm(f => ({
      ...f,
      ...p,
      capitalRisked: f.capitalRisked,
      note: f.note
    }));
    setErr('');
    if (formRef.current) formRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, []);
  const handleAdd = () => {
    const cap = Number(form.capitalRisked);
    const ep = Number(form.entryProb);
    const cp = Number(form.currentProb);
    if (!form.market.trim()) {
      setErr('Inserisci nome mercato');
      return;
    }
    if (!(cap > 0)) {
      setErr('Capitale deve essere > 0');
      return;
    }
    if (!(ep >= 1 && ep <= 99)) {
      setErr('Probabilità ingresso 1-99');
      return;
    }
    if (!(cp >= 1 && cp <= 99)) {
      setErr('Probabilità attuale 1-99');
      return;
    }
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
    setForm({
      market: '',
      outcome: 'YES',
      currency: 'USDC',
      capitalRisked: '',
      entryProb: '',
      currentProb: '',
      deadline: '',
      note: ''
    });
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
  const winRate = won.length + lost.length > 0 ? won.length / (won.length + lost.length) * 100 : 0;
  const ttStyle = {
    contentStyle: {
      background: C.bg,
      border: `1px solid ${C.gold}`,
      fontFamily: 'var(--font-number)',
      fontSize: 12,
      color: C.text,
      borderRadius: 4
    },
    itemStyle: {
      color: C.textDim
    },
    labelStyle: {
      color: C.gold
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12",
    ref: formRef
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Aggiungi posizione"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 14,
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span 2',
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Mercato"), /*#__PURE__*/React.createElement("input", {
    className: "input-cell",
    placeholder: "Es. Trump wins 2028",
    value: form.market,
    onChange: e => setForm(f => ({
      ...f,
      market: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Outcome"), /*#__PURE__*/React.createElement("input", {
    className: "input-cell",
    placeholder: "YES / NO",
    value: form.outcome,
    onChange: e => setForm(f => ({
      ...f,
      outcome: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Valuta"), /*#__PURE__*/React.createElement("select", {
    className: "input-cell",
    value: form.currency,
    onChange: e => setForm(f => ({
      ...f,
      currency: e.target.value
    })),
    style: {
      background: C.card
    }
  }, /*#__PURE__*/React.createElement("option", null, "USDC"), /*#__PURE__*/React.createElement("option", null, "EUR"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Capitale"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    placeholder: "100",
    value: form.capitalRisked,
    onChange: e => setForm(f => ({
      ...f,
      capitalRisked: e.target.value
    })),
    style: {
      textAlign: 'right'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Prob. ingresso %"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    placeholder: "35",
    value: form.entryProb,
    onChange: e => setForm(f => ({
      ...f,
      entryProb: e.target.value
    })),
    style: {
      textAlign: 'right'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Prob. attuale %"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "input-cell",
    placeholder: "42",
    value: form.currentProb,
    onChange: e => setForm(f => ({
      ...f,
      currentProb: e.target.value
    })),
    style: {
      textAlign: 'right'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Scadenza"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "input-cell",
    value: form.deadline,
    onChange: e => setForm(f => ({
      ...f,
      deadline: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 'span 2',
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Note"), /*#__PURE__*/React.createElement("input", {
    className: "input-label",
    placeholder: "Tesi, fonte, link\u2026",
    value: form.note,
    onChange: e => setForm(f => ({
      ...f,
      note: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("button", {
    onClick: handleAdd,
    style: {
      background: C.gold,
      border: 'none',
      color: C.onAccent,
      padding: '10px 20px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.08em',
      borderRadius: 6,
      whiteSpace: 'nowrap',
      height: 42
    }
  }, "+ Aggiungi")), err && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 12,
      color: C.danger
    }
  }, err)), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Capitale a rischio (aperte)"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: C.gold
    }
  }, fmt(totalRiskEur)), /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textDim,
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "EUR: ", fmtEUR2(openEur), /*#__PURE__*/React.createElement("br", null), "USDC: ", fmtUSD(openUsd))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3 accent-sage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "P&L realizzato"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: realizedPnl >= 0 ? C.sage : C.rust
    }
  }, realizedPnl >= 0 ? '+' : '', fmtEUR2(realizedPnl)), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, won.length, " vinte \xB7 ", lost.length, " perse")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "P&L non realizzato"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: unrealizedPnl >= 0 ? C.sage : C.rust
    }
  }, unrealizedPnl >= 0 ? '+' : '', fmtEUR2(unrealizedPnl)), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "mark-to-market aperte")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-3 accent-rust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow"
  }, "Win rate"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-value",
    style: {
      color: winRate >= 50 ? C.sage : C.rust
    }
  }, winRate.toFixed(1), "%"), /*#__PURE__*/React.createElement("div", {
    className: "kpi-sub"
  }, "su ", won.length + lost.length, " chiuse")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Posizioni")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, positions.length, " totali")), positions.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      textAlign: 'center',
      color: C.textMuted
    }
  }, /*#__PURE__*/React.createElement("p", null, "Nessuna posizione. Usa il form sopra per aggiungerne una.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12,
      minWidth: 900
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: `1px solid ${C.border}`
    }
  }, ['Mercato', 'Outcome', 'Val.', 'Capitale', 'Prob. ingr', 'Prob. att', 'Δ', 'Quota', 'P&L stim', 'Scad.', 'Stato', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '8px 6px',
      fontSize: 9,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: C.textMuted,
      fontWeight: 500
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, positions.map(p => {
    const delta = p.currentProb - p.entryProb;
    const quota = (100 / Math.max(1, p.entryProb)).toFixed(2);
    const isOpen = p.status === 'Aperta';
    const pnl = isOpen ? p.capitalRisked * (delta / Math.max(1, p.entryProb)) : p.status === 'Vinta' ? p.capitalRisked * ((100 - p.entryProb) / Math.max(1, p.entryProb)) : p.status === 'Persa' ? -p.capitalRisked : 0;
    const rowBg = p.status === 'Vinta' ? 'rgba(107,142,111,0.10)' : p.status === 'Persa' ? 'rgba(197,69,69,0.10)' : isOpen && p.currentProb > p.entryProb ? 'var(--accent-soft)' : 'transparent';
    return /*#__PURE__*/React.createElement("tr", {
      key: p.id,
      className: "data-row",
      style: {
        borderBottom: `1px solid ${C.border}`,
        background: rowBg
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 6px',
        maxWidth: 220,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: C.text
      }
    }, p.market), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px',
        color: C.textDim
      }
    }, p.outcome), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px',
        color: C.textDim
      }
    }, p.currency), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px',
        color: C.gold
      }
    }, p.currency === 'USDC' ? fmtUSD(p.capitalRisked) : fmtEUR2(p.capitalRisked)), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px'
      }
    }, p.entryProb, "%"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '4px 6px',
        width: 70
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "input-cell mono-font",
      value: p.currentProb,
      onChange: e => onUpdate(p.id, 'currentProb', e.target.value),
      style: {
        fontSize: 12,
        padding: '4px 2px',
        textAlign: 'right'
      }
    })), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px',
        color: delta >= 0 ? C.sage : C.rust
      }
    }, delta >= 0 ? '+' : '', delta.toFixed(0)), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px',
        color: C.textDim
      }
    }, quota, "x"), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px',
        color: pnl >= 0 ? C.sage : C.rust
      }
    }, pnl >= 0 ? '+' : '', p.currency === 'USDC' ? fmtUSD(pnl) : fmtEUR2(pnl)), /*#__PURE__*/React.createElement("td", {
      className: "mono-font",
      style: {
        padding: '8px 6px',
        color: C.textMuted,
        fontSize: 11
      }
    }, p.deadline || '—'), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '4px 6px'
      }
    }, /*#__PURE__*/React.createElement("select", {
      value: p.status,
      onChange: e => onClose(p.id, e.target.value),
      className: "input-cell",
      style: {
        background: C.card,
        fontSize: 11,
        padding: '4px 2px'
      }
    }, /*#__PURE__*/React.createElement("option", null, "Aperta"), /*#__PURE__*/React.createElement("option", null, "Chiusa"), /*#__PURE__*/React.createElement("option", null, "Vinta"), /*#__PURE__*/React.createElement("option", null, "Persa"))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 6px'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onRemove(p.id),
      style: {
        background: 'none',
        border: 'none',
        color: C.danger,
        cursor: 'pointer',
        opacity: 0.6
      }
    }, /*#__PURE__*/React.createElement(Ic.trash, null))));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Kelly Criterion (posizioni aperte)"))), open.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.textMuted,
      fontSize: 12,
      padding: 20,
      textAlign: 'center'
    }
  }, "Nessuna posizione aperta.") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, open.map(p => {
    const ep = p.entryProb;
    const cp = p.currentProb;
    const b = 100 / ep - 1;
    const pp = cp / 100;
    const q = 1 - pp;
    const f = b > 0 ? (b * pp - q) / b : -1;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.text,
        marginBottom: 6,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, p.market), f <= 0 ? /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.rust
      }
    }, "Non scommettere (EV negativo)") : /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.sage
      }
    }, "Kelly: ", (f * 100).toFixed(1), "% del bankroll \xB7 Half-Kelly: ", (f * 50).toFixed(1), "%"));
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12,
      fontSize: 11,
      color: C.textMuted,
      lineHeight: 1.5
    }
  }, "Kelly indica la dimensione ottimale teorica della posizione per massimizzare la crescita del bankroll nel lungo periodo. Valori alti vanno dimezzati (Half-Kelly) per prudenza.")), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "P&L realizzato cumulativo"))), !markets.pnlHistory || markets.pnlHistory.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      textAlign: 'center',
      color: C.textMuted,
      fontSize: 12
    }
  }, "Chiudi le prime posizioni per vedere il grafico.") : /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 240
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: markets.pnlHistory
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: C.textMuted,
    tick: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: C.textMuted,
    tick: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => fmtEUR2(v)
  })), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "pnl",
    stroke: C.gold,
    strokeWidth: 2.5,
    dot: {
      r: 4,
      fill: C.gold
    }
  })))), /*#__PURE__*/React.createElement(SentimentPanel, {
    onPrefill: handlePrefill
  }), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Tasso EUR/USD"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.0001",
    className: "input-cell mono-font",
    value: markets.eurUsdRate,
    onChange: e => onUpdateRate(e.target.value),
    style: {
      width: 160,
      textAlign: 'right'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.textMuted,
      flex: 1,
      minWidth: 220
    }
  }, "Usato per convertire le posizioni USDC in EUR nei KPI. 1 EUR = ", Number(markets.eurUsdRate).toFixed(4), " USD."))));
}

/* ══════════ MOVIMENTI (Entrate & Uscite) ══════════ */
const todayISO = () => new Date().toISOString().slice(0, 10);
const isIncomeCategory = cat => INCOME_CATEGORIES.includes(cat);
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
const STATUS_BADGE = {
  'Completato': 'badge-sage',
  'In sospeso': 'badge-gold',
  'Ricorrente': 'badge-teal'
};
function AmountDisplay({
  amount,
  type,
  size = 13
}) {
  const v = Math.abs(Number(amount) || 0);
  const income = type === 'income';
  return /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      color: income ? C.sage : C.rust,
      fontSize: size,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    },
    title: income ? 'Entrata' : 'Uscita'
  }, income ? '▲ +' : '▼ −', fmtEUR2(v).replace('€', '').trim(), " \u20AC");
}
function CategoryBadge({
  category
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `badge ${isIncomeCategory(category) ? 'badge-sage' : 'badge-neutral'}`
  }, category || '—');
}
function TypeBadge({
  type
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `badge ${type === 'income' ? 'badge-sage' : 'badge-rust'}`
  }, type === 'income' ? 'Entrata' : 'Uscita');
}
function StatusBadge({
  status
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `badge ${STATUS_BADGE[status] || 'badge-neutral'}`
  }, status || '—');
}
function SummaryCard({
  label,
  value,
  hint,
  trend,
  accent,
  invertTrend
}) {
  const has = trend !== null && trend !== undefined && isFinite(trend);
  const positive = invertTrend ? trend < 0 : trend > 0;
  const TrendIc = trend >= 0 ? Ic.up : Ic.down;
  return /*#__PURE__*/React.createElement("div", {
    className: `bento-card span-3 ${accent || ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-eyebrow",
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.14em',
      textTransform: 'uppercase'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "display-font number-display",
    style: {
      fontSize: 30,
      marginTop: 8,
      lineHeight: 1.1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 10,
      flexWrap: 'wrap'
    }
  }, has && trend !== 0 && /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: positive ? C.sage : C.rust,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(TrendIc, null), " ", fmtPct(Math.abs(trend))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, hint)));
}
function TransactionFilters({
  filters,
  onChange,
  onReset
}) {
  const set = (k, v) => onChange({
    ...filters,
    [k]: v
  });
  const active = filters.from || filters.to || filters.query || filters.type && filters.type !== 'all' || filters.category && filters.category !== 'all';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Dal"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "input-cell",
    value: filters.from,
    onChange: e => set('from', e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Al"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "input-cell",
    value: filters.to,
    onChange: e => set('to', e.target.value)
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Tipo"), /*#__PURE__*/React.createElement("select", {
    className: "input-cell",
    value: filters.type,
    onChange: e => set('type', e.target.value),
    style: {
      background: C.card
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "Tutti"), /*#__PURE__*/React.createElement("option", {
    value: "income"
  }, "Entrate"), /*#__PURE__*/React.createElement("option", {
    value: "expense"
  }, "Uscite"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Categoria"), /*#__PURE__*/React.createElement("select", {
    className: "input-cell",
    value: filters.category,
    onChange: e => set('category', e.target.value),
    style: {
      background: C.card
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "all"
  }, "Tutte"), /*#__PURE__*/React.createElement("optgroup", {
    label: "Entrate"
  }, INCOME_CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("optgroup", {
    label: "Uscite"
  }, EXPENSE_CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 6
    }
  }, "Cerca"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "input-cell",
    placeholder: "Descrizione o nota\u2026",
    value: filters.query,
    onChange: e => set('query', e.target.value)
  })), active && /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost",
    onClick: onReset,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 38
    }
  }, /*#__PURE__*/React.createElement(Ic.reset, null), " Reimposta"));
}
function SortHead({
  label,
  col,
  sort,
  onSort,
  align
}) {
  const active = sort.key === col;
  return /*#__PURE__*/React.createElement("th", {
    className: "sortable",
    onClick: () => onSort(col),
    style: align === 'right' ? {
      textAlign: 'right'
    } : {}
  }, label, active ? sort.dir === 'asc' ? ' ▲' : ' ▼' : '');
}
function TransactionTable({
  rows,
  sort,
  onSort,
  onEdit,
  onDelete,
  selectedIds,
  onToggleRow,
  onToggleAll,
  allSelected,
  someSelected
}) {
  const sel = selectedIds || new Set();
  /* Raggruppamento per mese, non per giorno: in un registro personale i
     movimenti cadono quasi sempre in date distinte, e per giorno si otteneva
     un'intestazione per riga. Il mese dà anche un saldo che vale la pena
     leggere. Ha senso solo ordinando per data: per importo darebbe gruppi
     spezzettati e fuori ordine. */
  const grouped = sort.key === 'date';
  const dayGroups = useMemo(() => {
    if (!grouped) return [{
      key: 'all',
      net: 0,
      items: rows
    }];
    const out = [];
    rows.forEach(t => {
      const key = (t.date || '').slice(0, 7);
      const last = out[out.length - 1];
      const signed = (t.type === 'income' ? 1 : -1) * Math.abs(Number(t.amount) || 0);
      if (last && last.key === key) {
        last.items.push(t);
        last.net += signed;
      } else out.push({
        key,
        net: signed,
        items: [t]
      });
    });
    return out;
  }, [rows, grouped]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "desktop-table",
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "tx-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "sel"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: !!allSelected,
    ref: el => {
      if (el) el.indeterminate = !!someSelected;
    },
    onChange: () => onToggleAll && onToggleAll(),
    "aria-label": "Seleziona tutti i movimenti visibili"
  })), /*#__PURE__*/React.createElement(SortHead, {
    label: "Data",
    col: "date",
    sort: sort,
    onSort: onSort
  }), /*#__PURE__*/React.createElement(SortHead, {
    label: "Tipo",
    col: "type",
    sort: sort,
    onSort: onSort
  }), /*#__PURE__*/React.createElement(SortHead, {
    label: "Categoria",
    col: "category",
    sort: sort,
    onSort: onSort
  }), /*#__PURE__*/React.createElement(SortHead, {
    label: "Descrizione",
    col: "description",
    sort: sort,
    onSort: onSort
  }), /*#__PURE__*/React.createElement("th", null, "Metodo"), /*#__PURE__*/React.createElement(SortHead, {
    label: "Importo",
    col: "amount",
    sort: sort,
    onSort: onSort,
    align: "right"
  }), /*#__PURE__*/React.createElement(SortHead, {
    label: "Stato",
    col: "status",
    sort: sort,
    onSort: onSort
  }), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Azioni"))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 9,
    style: {
      textAlign: 'center',
      padding: '42px 12px',
      color: C.textMuted
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.gold
    }
  }, /*#__PURE__*/React.createElement(Ic.alert, null)), "Nessun movimento \u2014 aggiungine uno o azzera i filtri."))), rows.map(t => /*#__PURE__*/React.createElement("tr", {
    key: t.id,
    className: sel.has(t.id) ? 'selected' : ''
  }, /*#__PURE__*/React.createElement("td", {
    className: "sel"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: sel.has(t.id),
    onChange: () => onToggleRow && onToggleRow(t.id),
    "aria-label": "Seleziona movimento"
  })), /*#__PURE__*/React.createElement("td", {
    className: "mono-font",
    style: {
      whiteSpace: 'nowrap',
      color: C.textDim
    }
  }, itDateLabel(t.date)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(TypeBadge, {
    type: t.type
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(CategoryBadge, {
    category: t.category
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "tx-desc",
    title: `${t.description || ''}${t.notes ? ' — ' + t.notes : ''}`
  }, t.description || '—')), /*#__PURE__*/React.createElement("td", {
    style: {
      color: C.textDim,
      whiteSpace: 'nowrap'
    }
  }, t.paymentMethod || '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(AmountDisplay, {
    amount: t.amount,
    type: t.type
  })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusBadge, {
    status: t.status
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "tx-action-btn",
    title: "Modifica",
    "aria-label": "Modifica movimento",
    onClick: () => onEdit(t)
  }, /*#__PURE__*/React.createElement(Ic.edit, null)), /*#__PURE__*/React.createElement("button", {
    className: "tx-action-btn danger",
    title: "Elimina",
    "aria-label": "Elimina movimento",
    onClick: () => onDelete(t),
    style: {
      marginLeft: 6
    }
  }, /*#__PURE__*/React.createElement(Ic.trash, null)))))))), /*#__PURE__*/React.createElement("div", {
    className: "tx-mobile-list"
  }, rows.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "tx-mobile-card",
    style: {
      alignItems: 'center',
      textAlign: 'center',
      color: C.textMuted
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.gold
    }
  }, /*#__PURE__*/React.createElement(Ic.alert, null)), /*#__PURE__*/React.createElement("span", null, "Nessun movimento. Aggiungine uno o azzera i filtri.")), dayGroups.map(g => /*#__PURE__*/React.createElement(React.Fragment, {
    key: g.key
  }, grouped && /*#__PURE__*/React.createElement("div", {
    className: "tx-day-head"
  }, /*#__PURE__*/React.createElement("span", null, itMonthLabel(g.key)), /*#__PURE__*/React.createElement("span", {
    className: "day-total",
    style: {
      color: g.net >= 0 ? C.sage : C.rust
    }
  }, "saldo ", g.net >= 0 ? '+' : '−', fmt(Math.abs(g.net)))), g.items.map(t => /*#__PURE__*/React.createElement("article", {
    key: t.id,
    className: `tx-row ${sel.has(t.id) ? 'selected' : ''}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "tx-row-check",
    checked: sel.has(t.id),
    onChange: () => onToggleRow && onToggleRow(t.id),
    "aria-label": `Seleziona ${t.description || 'movimento'}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "tx-row-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tx-row-desc"
  }, t.description || '—'), /*#__PURE__*/React.createElement("div", {
    className: "tx-row-sub"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tx-row-day"
  }, (t.date || '').split('-')[2], " ", (MESI_IT[parseInt((t.date || '').split('-')[1], 10) - 1] || '').slice(0, 3)), /*#__PURE__*/React.createElement(CategoryBadge, {
    category: t.category
  }), t.status && t.status !== 'Completato' && /*#__PURE__*/React.createElement(StatusBadge, {
    status: t.status
  }), t.paymentMethod && /*#__PURE__*/React.createElement("span", {
    className: "tx-row-method"
  }, t.paymentMethod))), /*#__PURE__*/React.createElement("div", {
    className: "tx-row-right"
  }, /*#__PURE__*/React.createElement(AmountDisplay, {
    amount: t.amount,
    type: t.type,
    size: 17
  }), /*#__PURE__*/React.createElement("div", {
    className: "tx-row-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "tx-action-btn",
    "aria-label": `Modifica ${t.description || 'movimento'}`,
    onClick: () => onEdit(t)
  }, /*#__PURE__*/React.createElement(Ic.edit, null)), /*#__PURE__*/React.createElement("button", {
    className: "tx-action-btn danger",
    "aria-label": `Elimina ${t.description || 'movimento'}`,
    onClick: () => onDelete(t)
  }, /*#__PURE__*/React.createElement(Ic.trash, null))))))))));
}
function TransactionModal({
  initial,
  onSave,
  onClose
}) {
  const seed = initial || {
    type: 'expense',
    amount: '',
    date: todayISO(),
    category: EXPENSE_CATEGORIES[0],
    description: '',
    paymentMethod: PAYMENT_METHODS[0],
    status: 'Completato',
    notes: ''
  };
  const [form, setForm] = useState(seed);
  const [err, setErr] = useState('');
  const editing = !!(initial && initial.id);
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const setType = type => {
    setForm(f => {
      const list = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
      const category = list.includes(f.category) ? f.category : list[0];
      return {
        ...f,
        type,
        category
      };
    });
  };
  const upd = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const catList = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const submit = e => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.type) {
      setErr('Seleziona il tipo di movimento.');
      return;
    }
    if (!form.date) {
      setErr('La data è obbligatoria.');
      return;
    }
    if (!(amount > 0)) {
      setErr('Inserisci un importo maggiore di zero.');
      return;
    }
    if (!form.category) {
      setErr('Seleziona una categoria.');
      return;
    }
    if (!form.description.trim()) {
      setErr('La descrizione è obbligatoria.');
      return;
    }
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
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onMouseDown: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "modal-card",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "display-font",
    style: {
      margin: 0,
      fontSize: 20,
      fontStyle: 'italic'
    }
  }, editing ? 'Modifica movimento' : 'Nuovo movimento'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "tx-action-btn",
    onClick: onClose,
    "aria-label": "Chiudi"
  }, /*#__PURE__*/React.createElement(Ic.x, null))), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Tipo"), /*#__PURE__*/React.createElement("div", {
    className: "seg-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `seg-btn ${form.type === 'income' ? 'active-income' : ''}`,
    onClick: () => setType('income')
  }, "\u25B2 Entrata"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `seg-btn ${form.type === 'expense' ? 'active-expense' : ''}`,
    onClick: () => setType('expense')
  }, "\u25BC Uscita"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Importo (\u20AC)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "0.01",
    step: "0.01",
    className: "input-cell",
    placeholder: "0,00",
    value: form.amount,
    onChange: e => upd('amount', e.target.value),
    style: {
      textAlign: 'right'
    },
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Data"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "input-cell",
    value: form.date,
    onChange: e => upd('date', e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Categoria"), /*#__PURE__*/React.createElement("select", {
    className: "input-cell",
    value: form.category,
    onChange: e => upd('category', e.target.value),
    style: {
      background: C.card
    }
  }, catList.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Metodo di pagamento"), /*#__PURE__*/React.createElement("select", {
    className: "input-cell",
    value: form.paymentMethod,
    onChange: e => upd('paymentMethod', e.target.value),
    style: {
      background: C.card
    }
  }, PAYMENT_METHODS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m))))), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Descrizione"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "input-cell",
    placeholder: "Es. Spesa settimanale supermercato",
    value: form.description,
    onChange: e => upd('description', e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Stato"), /*#__PURE__*/React.createElement("select", {
    className: "input-cell",
    value: form.status,
    onChange: e => upd('status', e.target.value),
    style: {
      background: C.card
    }
  }, TX_STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", null, "Note (facoltativo)"), /*#__PURE__*/React.createElement("textarea", {
    className: "input-cell",
    rows: 3,
    placeholder: "Dettagli aggiuntivi\u2026",
    value: form.notes,
    onChange: e => upd('notes', e.target.value),
    style: {
      resize: 'vertical'
    }
  })), err && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.danger,
      fontSize: 12,
      marginBottom: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Ic.alert, {
    size: 14
  }), " ", err), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-ghost",
    onClick: onClose
  }, "Annulla"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-primary"
  }, /*#__PURE__*/React.createElement(Ic.check, null), " ", editing ? 'Salva modifiche' : 'Aggiungi movimento'))));
}
function ImportStatementModal({
  existing,
  onImport,
  onClose
}) {
  const [stage, setStage] = useState('pick'); // pick | loading | review
  const [loadingMsg, setLoadingMsg] = useState('');
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState('');
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const handleFile = async file => {
    if (!file) return;
    setErr('');
    setStage('loading');
    setLoadingMsg('Lettura del file…');
    try {
      const name = (file.name || '').toLowerCase();
      let parsed = [];
      if (name.endsWith('.csv') || file.type === 'text/csv' || file.type === 'application/vnd.ms-excel') {
        parsed = parseStatementCSV(await file.text());
      } else {
        const text = await extractTextFromFile(file, m => setLoadingMsg(m));
        parsed = parseStatementText(text);
        if (!parsed.length) parsed = parseStatementCSV(text);
      }
      if (!parsed.length) {
        setErr('Nessun movimento riconosciuto. Prova con il CSV esportato dalla tua banca, o un PDF con testo selezionabile.');
        setStage('pick');
        return;
      }
      const prepared = parsed.map((r, i) => {
        const type = r.type === 'income' ? 'income' : 'expense';
        return {
          _id: i,
          date: r.date,
          description: r.description || 'Movimento',
          amount: Math.abs(Number(r.amount) || 0),
          type,
          category: guessTxCategory(r.description, type),
          paymentMethod: guessPaymentMethod(r.description),
          _dup: isDuplicateTx(r, existing),
          _checked: !isDuplicateTx(r, existing)
        };
      });
      setRows(prepared);
      setStage('review');
    } catch (e) {
      setErr('Errore nella lettura del file: ' + (e && e.message ? e.message : e));
      setStage('pick');
    }
  };
  const onDrop = e => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  };
  const setRow = (id, k, v) => setRows(rs => rs.map(r => r._id === id ? {
    ...r,
    [k]: v
  } : r));
  const setRowType = (id, type) => setRows(rs => rs.map(r => r._id === id ? {
    ...r,
    type,
    category: guessTxCategory(r.description, type)
  } : r));
  const allChecked = rows.length > 0 && rows.every(r => r._checked);
  const toggleAll = () => {
    const v = !allChecked;
    setRows(rs => rs.map(r => ({
      ...r,
      _checked: v
    })));
  };
  const selected = rows.filter(r => r._checked);
  const selIncome = txSum(selected.filter(r => r.type === 'income'));
  const selExpense = txSum(selected.filter(r => r.type === 'expense'));
  const doImport = () => {
    if (!selected.length) {
      setErr('Seleziona almeno un movimento.');
      return;
    }
    const bad = selected.find(r => !r.date || !(Number(r.amount) > 0) || !r.description.trim());
    if (bad) {
      setErr('Controlla data, importo (> 0) e descrizione delle righe selezionate.');
      return;
    }
    onImport(selected.map(r => ({
      type: r.type,
      date: r.date,
      amount: Math.round(Math.abs(Number(r.amount)) * 100) / 100,
      category: r.category,
      description: r.description.trim(),
      paymentMethod: r.paymentMethod || 'Bonifico',
      status: 'Completato',
      notes: 'Importato da estratto conto'
    })));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onMouseDown: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `modal-card ${stage === 'review' ? 'modal-card-wide' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "display-font",
    style: {
      margin: 0,
      fontSize: 20,
      fontStyle: 'italic'
    }
  }, "Importa estratto conto"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "tx-action-btn",
    onClick: onClose,
    "aria-label": "Chiudi"
  }, /*#__PURE__*/React.createElement(Ic.x, null))), stage === 'pick' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: `dropzone ${dragging ? 'dragging' : ''}`,
    onClick: () => fileRef.current && fileRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: onDrop
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Ic.upload, {
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      marginBottom: 4
    }
  }, "Trascina qui il file oppure clicca per selezionarlo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, "CSV esportato dalla banca \xB7 PDF dell'estratto conto (testo selezionabile)"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: ".csv,text/csv,application/pdf,image/*",
    style: {
      display: 'none'
    },
    onChange: e => {
      const f = e.target.files && e.target.files[0];
      if (f) handleFile(f);
      e.target.value = '';
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: C.textMuted,
      marginTop: 12,
      lineHeight: 1.5
    }
  }, "I movimenti riconosciuti verranno mostrati in anteprima: potrai correggere data, descrizione, tipo, categoria e importo prima di confermare. I duplicati (stessa data, importo e descrizione) sono segnalati e pre-deselezionati."), err && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.danger,
      fontSize: 12,
      marginTop: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Ic.alert, {
    size: 14
  }), " ", err)), stage === 'loading' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px 8px',
      textAlign: 'center',
      color: C.textDim,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      color: C.gold,
      marginBottom: 8
    }
  }, "\u25CF \u25CF \u25CF"), loadingMsg || 'Analisi in corso…'), stage === 'review' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 12,
      color: C.textDim
    }
  }, selected.length, "/", rows.length, " selezionati \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.sage
    }
  }, "Entrate ", fmt(selIncome)), " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.rust
    }
  }, "Uscite ", fmt(selExpense))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-ghost",
    onClick: () => {
      setStage('pick');
      setRows([]);
      setErr('');
    },
    style: {
      padding: '6px 12px'
    }
  }, "Cambia file")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      maxHeight: '52vh',
      overflowY: 'auto',
      border: `1px solid ${C.border}`,
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "imp-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 28
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: allChecked,
    onChange: toggleAll,
    "aria-label": "Seleziona tutti"
  })), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 130
    }
  }, "Data"), /*#__PURE__*/React.createElement("th", null, "Descrizione"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 96
    }
  }, "Tipo"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 150
    }
  }, "Categoria"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 110,
      textAlign: 'right'
    }
  }, "Importo \u20AC"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => {
    const cats = r.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    return /*#__PURE__*/React.createElement("tr", {
      key: r._id,
      className: r._dup ? 'dup' : ''
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: r._checked,
      onChange: () => setRow(r._id, '_checked', !r._checked),
      "aria-label": "Seleziona movimento"
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "date",
      className: "input-cell",
      value: r.date,
      onChange: e => setRow(r._id, 'date', e.target.value)
    }), r._dup && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: C.gold,
        marginTop: 2
      }
    }, "gi\xE0 presente")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "input-cell",
      value: r.description,
      onChange: e => setRow(r._id, 'description', e.target.value)
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
      className: "input-cell",
      value: r.type,
      onChange: e => setRowType(r._id, e.target.value),
      style: {
        background: C.card
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "income"
    }, "Entrata"), /*#__PURE__*/React.createElement("option", {
      value: "expense"
    }, "Uscita"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
      className: "input-cell",
      value: r.category,
      onChange: e => setRow(r._id, 'category', e.target.value),
      style: {
        background: C.card
      }
    }, cats.map(c => /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, c)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "number",
      min: "0.01",
      step: "0.01",
      className: "input-cell",
      value: r.amount,
      onChange: e => setRow(r._id, 'amount', e.target.value),
      style: {
        textAlign: 'right'
      }
    })));
  })))), err && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.danger,
      fontSize: 12,
      marginTop: 12,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Ic.alert, {
    size: 14
  }), " ", err), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-ghost",
    onClick: onClose
  }, "Annulla"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-primary",
    onClick: doImport
  }, /*#__PURE__*/React.createElement(Ic.check, null), " Importa ", selected.length, " ", selected.length === 1 ? 'movimento' : 'movimenti')))));
}
function TransactionsTab({
  data,
  onAdd,
  onUpdate,
  onDelete,
  onImport,
  onBulkDelete
}) {
  const all = data.transactions || [];
  const emptyFilters = {
    from: '',
    to: '',
    type: 'all',
    category: 'all',
    query: ''
  };
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState({
    key: 'date',
    dir: 'desc'
  });
  const [modal, setModal] = useState(null); // null | { kind:'add'|'edit'|'import', tx? }
  const [selected, setSelected] = useState(() => new Set());
  const [filterSheet, setFilterSheet] = useState(false);
  const activeFilterCount = ['from', 'to', 'query'].filter(k => filters[k]).length + (filters.type !== 'all' ? 1 : 0) + (filters.category !== 'all' ? 1 : 0);
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
  const toggleRow = id => setSelected(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const toggleAll = () => setSelected(prev => {
    const n = new Set(prev);
    if (visibleIds.every(id => n.has(id))) visibleIds.forEach(id => n.delete(id));else visibleIds.forEach(id => n.add(id));
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
  const cur = curKey ? months[curKey] : {
    income: 0,
    expenses: 0,
    net: 0
  };
  const prev = prevKey ? months[prevKey] : null;
  const curRate = savingsRate(cur.income, cur.expenses);
  const prevRate = prev ? savingsRate(prev.income, prev.expenses) : null;
  const pctChange = (a, b) => b && b !== 0 ? (a - b) / Math.abs(b) : null;
  const onSort = key => setSort(s => s.key === key ? {
    key,
    dir: s.dir === 'asc' ? 'desc' : 'asc'
  } : {
    key,
    dir: key === 'date' || key === 'amount' ? 'desc' : 'asc'
  });
  const handleDelete = t => {
    if (window.confirm(`Eliminare il movimento "${t.description}" del ${itDateLabel(t.date)}?`)) onDelete(t.id);
  };
  const handleSave = payload => {
    if (modal && modal.kind === 'edit') onUpdate(modal.tx.id, payload);else onAdd(payload);
    setModal(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "display-font",
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 400
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.gold,
      marginRight: 8
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Entrate & Uscite")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      color: C.textDim,
      fontSize: 13,
      maxWidth: 560
    }
  }, "Registro di tutti i flussi di denaro in entrata e in uscita: traccia, filtra e analizza ogni movimento.")), /*#__PURE__*/React.createElement("div", {
    className: "tx-head-actions",
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost",
    onClick: () => setModal({
      kind: 'import'
    }),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Ic.upload, null), " Importa estratto conto"), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => setModal({
      kind: 'add'
    })
  }, /*#__PURE__*/React.createElement(Ic.plus, null), " Aggiungi movimento"))), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Entrate totali",
    accent: "accent-sage",
    value: fmt(overall.totalIncome),
    trend: pctChange(cur.income, prev ? prev.income : null),
    hint: curKey ? `${itMonthLabel(curKey)}: ${fmt(cur.income)}` : 'nessun dato'
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Uscite totali",
    accent: "accent-rust",
    value: fmt(overall.totalExpenses),
    trend: pctChange(cur.expenses, prev ? prev.expenses : null),
    invertTrend: true,
    hint: curKey ? `${itMonthLabel(curKey)}: ${fmt(cur.expenses)}` : 'nessun dato'
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Saldo netto",
    value: /*#__PURE__*/React.createElement("span", {
      style: {
        color: overall.netBalance >= 0 ? C.sage : C.rust
      }
    }, fmt(overall.netBalance)),
    trend: pctChange(cur.net, prev ? prev.net : null),
    hint: `${all.length} movimenti registrati`
  }), /*#__PURE__*/React.createElement(SummaryCard, {
    label: "Tasso di risparmio (mese)",
    value: fmtPct(curRate),
    trend: prevRate !== null ? curRate - prevRate : null,
    hint: prevRate !== null ? `${itMonthLabel(prevKey)}: ${fmtPct(prevRate)}` : curKey ? itMonthLabel(curKey) : 'nessun dato'
  }), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12 tx-filter-card"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Filtri"))), /*#__PURE__*/React.createElement(TransactionFilters, {
    filters: filters,
    onChange: setFilters,
    onReset: () => setFilters(emptyFilters)
  })), /*#__PURE__*/React.createElement("div", {
    className: "tx-filter-chip-wrap span-12"
  }, /*#__PURE__*/React.createElement("button", {
    className: "month-chip",
    onClick: () => setFilterSheet(true),
    "aria-haspopup": "dialog",
    style: {
      width: '100%',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ic.search, null), " Filtri", activeFilterCount ? ` · ${activeFilterCount}` : '')), filterSheet && /*#__PURE__*/React.createElement(Sheet, {
    title: "Filtri",
    onClose: () => setFilterSheet(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px 12px'
    }
  }, /*#__PURE__*/React.createElement(TransactionFilters, {
    filters: filters,
    onChange: setFilters,
    onReset: () => setFilters(emptyFilters)
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 18
    },
    onClick: () => setFilterSheet(false)
  }, "Mostra ", sorted.length, " ", sorted.length === 1 ? 'movimento' : 'movimenti'))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Movimenti")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 12,
      color: C.textDim
    }
  }, sorted.length, " ", sorted.length === 1 ? 'voce' : 'voci', " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.sage
    }
  }, "Entrate ", fmt(filteredTotals.totalIncome)), " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.rust
    }
  }, "Uscite ", fmt(filteredTotals.totalExpenses)), " \xB7 Saldo ", fmt(filteredTotals.netBalance))), selected.size > 0 && /*#__PURE__*/React.createElement("div", {
    className: "tx-bulkbar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 12,
      color: C.gold
    }
  }, selected.size, " ", selected.size === 1 ? 'movimento selezionato' : 'movimenti selezionati'), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost",
    onClick: clearSel,
    style: {
      padding: '8px 14px'
    }
  }, "Annulla selezione"), /*#__PURE__*/React.createElement("button", {
    className: "btn-danger",
    onClick: handleBulkDelete
  }, /*#__PURE__*/React.createElement(Ic.trash, null), " Elimina selezionati")), /*#__PURE__*/React.createElement(TransactionTable, {
    rows: sorted,
    sort: sort,
    onSort: onSort,
    onEdit: t => setModal({
      kind: 'edit',
      tx: t
    }),
    onDelete: handleDelete,
    selectedIds: selected,
    onToggleRow: toggleRow,
    onToggleAll: toggleAll,
    allSelected: allSelected,
    someSelected: someSelected
  })), modal && (modal.kind === 'add' || modal.kind === 'edit') && /*#__PURE__*/React.createElement(TransactionModal, {
    key: modal.kind === 'edit' ? modal.tx.id : 'new',
    initial: modal.kind === 'edit' ? modal.tx : null,
    onSave: handleSave,
    onClose: () => setModal(null)
  }), modal && modal.kind === 'import' && /*#__PURE__*/React.createElement(ImportStatementModal, {
    existing: all,
    onImport: list => {
      onImport(list);
      setModal(null);
    },
    onClose: () => setModal(null)
  }), /*#__PURE__*/React.createElement("button", {
    className: "fab",
    onClick: () => setModal({
      kind: 'add'
    }),
    "aria-label": "Aggiungi movimento"
  }, /*#__PURE__*/React.createElement(Ic.plus, {
    size: 18
  }), " Aggiungi"));
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
    } catch {
      return DEFAULT_DATA;
    }
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' || saved === 'dark' ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [toast, setToast] = useState('');
  const [actionSheet, setActionSheet] = useState(false);
  const [profileSheet, setProfileSheet] = useState(false);
  const fileInputRef = useRef(null);
  const showToast = useCallback(msg => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);
  const totals = useMemo(() => {
    // Cerca cedolino per il mese corrente
    const currentISO = profileMonthToISO(data.profile.month);
    const cedolinoAttivo = (data.cedolini || []).find(c => c.month === currentISO);

    // Se esiste cedolino attivo, sostituisce la prima voce income (stipendio)
    const incomeEffettivo = cedolinoAttivo ? data.income.map((item, i) => i === 0 ? {
      ...item,
      amount: cedolinoAttivo.netto
    } : item) : data.income;
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
    return {
      totalIncome,
      totalFixed,
      totalLoans,
      totalVariable,
      totalInvestMonthly,
      totalInvestCurrent,
      totalOutflow,
      monthlySaving,
      savingRate,
      netWorth,
      emergencyMonths,
      essentialExpenses,
      cedolinoAttivo
    };
  }, [data]);
  const projection = useMemo(() => {
    const months = 60;
    const result = [];
    let liq = data.liquidity.current;
    let investments = data.investments.map(i => ({
      ...i
    }));
    const loans = data.loans.map(l => ({
      ...l
    }));
    const annualReturns = {
      'Pensione': 0.04,
      'Cripto': 0.12,
      'Equity': 0.07,
      'Bond': 0.03,
      'Liquidita': 0.02
    };
    for (let m = 0; m <= months; m++) {
      const totalInv = investments.reduce((s, i) => s + i.current, 0);
      result.push({
        month: m,
        liquidity: Math.round(liq),
        investments: Math.round(totalInv),
        netWorth: Math.round(liq + totalInv)
      });
      if (m === months) break;
      const activeLoans = loans.filter(l => l.monthsLeft > m).reduce((s, l) => s + Number(l.amount || 0), 0);
      const saving = totals.totalIncome - totals.totalFixed - activeLoans - totals.totalVariable - totals.totalInvestMonthly;
      liq += saving;
      investments = investments.map(inv => {
        const annual = annualReturns[inv.type] ?? 0.05;
        const monthlyRate = Math.pow(1 + annual, 1 / 12) - 1;
        return {
          ...inv,
          current: inv.current * (1 + monthlyRate) + Number(inv.monthly || 0)
        };
      });
    }
    return result;
  }, [data, totals]);
  const expenseBreakdown = useMemo(() => {
    const items = [];
    data.fixedExpenses.forEach(e => items.push({
      name: e.label,
      value: Number(e.amount || 0)
    }));
    data.loans.forEach(e => items.push({
      name: e.label,
      value: Number(e.amount || 0)
    }));
    data.variableExpenses.forEach(e => items.push({
      name: e.label,
      value: Number(e.amount || 0)
    }));
    return items.filter(i => i.value > 0);
  }, [data]);
  const updateField = useCallback((section, id, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? {
        ...item,
        [field]: ['label', 'type', 'risk', 'deadline'].includes(field) ? value : Number(value) || 0
      } : item)
    }));
  }, []);
  const addItem = useCallback((section, template) => {
    setData(prev => {
      const newId = Math.max(0, ...prev[section].map(i => i.id)) + 1;
      return {
        ...prev,
        [section]: [...prev[section], {
          id: newId,
          ...template
        }]
      };
    });
  }, []);
  const removeItem = useCallback((section, id) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter(i => i.id !== id)
    }));
  }, []);
  const updateLiquidity = useCallback((field, val) => {
    setData(prev => ({
      ...prev,
      liquidity: {
        ...prev.liquidity,
        [field]: Number(val) || 0
      }
    }));
  }, []);
  const updateMortgage = useCallback((field, val) => {
    setData(prev => ({
      ...prev,
      mortgage: {
        ...(prev.mortgage || {}),
        [field]: Number(val) || 0
      }
    }));
  }, []);
  const updateInvestmentTarget = useCallback((category, value) => {
    setData(prev => ({
      ...prev,
      investmentsMeta: {
        ...prev.investmentsMeta,
        targetAllocation: {
          ...prev.investmentsMeta.targetAllocation,
          [category]: Number(value) || 0
        }
      }
    }));
  }, []);
  const addPolyPosition = useCallback(pos => {
    setData(prev => ({
      ...prev,
      markets: {
        ...prev.markets,
        polyPositions: [...prev.markets.polyPositions, {
          ...pos,
          id: Date.now()
        }]
      }
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
          polyPositions: prev.markets.polyPositions.map(x => x.id === id ? {
            ...x,
            [field]: strFields.includes(field) ? value : Number(value) || 0
          } : x)
        }
      };
    });
  }, []);
  const removePolyPosition = useCallback(id => {
    setData(prev => ({
      ...prev,
      markets: {
        ...prev.markets,
        polyPositions: prev.markets.polyPositions.filter(x => x.id !== id)
      }
    }));
  }, []);
  const closePolyPosition = useCallback((id, status) => {
    setData(prev => {
      const pos = prev.markets.polyPositions.find(x => x.id === id);
      if (!pos) return prev;
      const wasOpen = pos.status === 'Aperta' || pos.status === 'Chiusa';
      const becameResolved = status === 'Vinta' || status === 'Persa';
      const updated = prev.markets.polyPositions.map(x => x.id === id ? {
        ...x,
        status
      } : x);
      let hist = prev.markets.pnlHistory;
      if (becameResolved && wasOpen) {
        const realized = status === 'Vinta' ? pos.capitalRisked * ((100 - pos.entryProb) / Math.max(1, pos.entryProb)) : -pos.capitalRisked;
        const month = new Date().toISOString().slice(0, 7);
        const prevCum = hist.length ? hist[hist.length - 1].pnl : 0;
        hist = [...hist, {
          date: month,
          pnl: prevCum + realized
        }];
      }
      return {
        ...prev,
        markets: {
          ...prev.markets,
          polyPositions: updated,
          pnlHistory: hist
        }
      };
    });
  }, []);
  const updateEurUsd = useCallback(rate => {
    setData(prev => ({
      ...prev,
      markets: {
        ...prev.markets,
        eurUsdRate: Number(rate) || 1
      }
    }));
  }, []);
  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget_${data.profile.month.replace(/\s/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Dati esportati con successo');
  }, [data, showToast]);
  const importJSON = useCallback(e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.income && parsed.fixedExpenses) {
          setData(normalizeData(parsed));
          showToast('Dati importati con successo');
        } else {
          showToast('Formato JSON non riconosciuto');
        }
      } catch {
        showToast('File JSON non valido');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }, [showToast]);
  const resetData = useCallback(() => {
    if (confirm('Sicuro di voler ripristinare i dati di default?')) {
      setData(DEFAULT_DATA);
      showToast('Dati ripristinati');
    }
  }, [showToast]);
  const addCedolino = useCallback(cedolino => {
    setData(prev => ({
      ...prev,
      cedolini: [...(prev.cedolini || []), cedolino]
    }));
    showToast('Cedolino aggiunto');
  }, [showToast]);
  const removeCedolino = useCallback(id => {
    setData(prev => ({
      ...prev,
      cedolini: (prev.cedolini || []).filter(c => c.id !== id)
    }));
    showToast('Cedolino rimosso');
  }, [showToast]);
  const addTransaction = useCallback(tx => {
    const now = new Date().toISOString();
    setData(prev => ({
      ...prev,
      transactions: [...(prev.transactions || []), {
        ...tx,
        id: Date.now(),
        createdAt: now,
        updatedAt: now
      }]
    }));
    showToast('Movimento aggiunto');
  }, [showToast]);
  const updateTransaction = useCallback((id, tx) => {
    const now = new Date().toISOString();
    setData(prev => ({
      ...prev,
      transactions: (prev.transactions || []).map(t => t.id === id ? {
        ...t,
        ...tx,
        id,
        updatedAt: now
      } : t)
    }));
    showToast('Movimento aggiornato');
  }, [showToast]);
  const deleteTransaction = useCallback(id => {
    setData(prev => ({
      ...prev,
      transactions: (prev.transactions || []).filter(t => t.id !== id)
    }));
    showToast('Movimento eliminato');
  }, [showToast]);
  const deleteTransactions = useCallback(ids => {
    if (!ids || !ids.length) return;
    const set = new Set(ids);
    setData(prev => ({
      ...prev,
      transactions: (prev.transactions || []).filter(t => !set.has(t.id))
    }));
    showToast(`${ids.length} ${ids.length === 1 ? 'movimento eliminato' : 'movimenti eliminati'}`);
  }, [showToast]);
  const importTransactions = useCallback(list => {
    if (!list || !list.length) return;
    const now = new Date().toISOString();
    let nextId = Date.now();
    setData(prev => ({
      ...prev,
      transactions: [...(prev.transactions || []), ...list.map(tx => ({
        ...tx,
        id: nextId++,
        createdAt: now,
        updatedAt: now
      }))]
    }));
    showToast(`${list.length} ${list.length === 1 ? 'movimento importato' : 'movimenti importati'}`);
  }, [showToast]);
  const currentISO = profileMonthToISO(data.profile.month);
  const saveSnapshot = useCallback(() => {
    const snapshot = {
      date: new Date().toISOString().slice(0, 7),
      netWorth: totals.netWorth,
      income: totals.totalIncome,
      saving: totals.monthlySaving,
      liquidity: data.liquidity.current,
      investments: totals.totalInvestCurrent
    };
    setData(prev => ({
      ...prev,
      history: [...(prev.history || []).filter(h => h.date !== snapshot.date), snapshot].sort((a, b) => a.date.localeCompare(b.date))
    }));
    showToast('Snapshot mese salvato');
  }, [totals, data.liquidity.current, showToast]);
  const tabs = [{
    id: 'overview',
    label: 'Quadro',
    icon: Ic.dashboard
  }, {
    id: 'income',
    label: 'Entrate & Spese',
    icon: Ic.wallet
  }, {
    id: 'transactions',
    label: 'Movimenti',
    icon: Ic.exchange
  }, {
    id: 'investments',
    label: 'Investimenti',
    icon: Ic.trend
  }, {
    id: 'markets',
    label: 'Mercati',
    icon: Ic.candle
  }, {
    id: 'projection',
    label: 'Proiezioni',
    icon: Ic.chart
  }, {
    id: 'mortgage',
    label: 'Mutui',
    icon: Ic.home
  }, {
    id: 'history',
    label: 'Storico',
    icon: Ic.clock
  }, {
    id: 'cedolini',
    label: 'Cedolini',
    icon: Ic.receipt
  }];

  /* Ordinato per significato, non per tinta: caldo = speso, oro = allocato,
     salvia = trattenuto. Prima erano cinque colori scorrelati. */
  const barData = [{
    name: 'Fisse',
    value: totals.totalFixed,
    fill: 'var(--chart-1)'
  }, {
    name: 'Rate',
    value: totals.totalLoans,
    fill: 'var(--chart-2)'
  }, {
    name: 'Variabili',
    value: totals.totalVariable,
    fill: 'var(--chart-3)'
  }, {
    name: 'Investim.',
    value: totals.totalInvestMonthly,
    fill: 'var(--chart-4)'
  }, {
    name: 'Risparmio',
    value: Math.max(0, totals.monthlySaving),
    fill: RETAINED
  }];
  const ttStyle = {
    contentStyle: {
      background: C.bg,
      border: `1px solid ${C.gold}`,
      fontFamily: 'var(--font-number)',
      fontSize: 12,
      color: C.text,
      borderRadius: 4
    },
    itemStyle: {
      color: C.textDim
    },
    labelStyle: {
      color: C.gold
    }
  };
  const latestHistory = data.history && data.history.length > 0 ? data.history[data.history.length - 1] : null;
  const netTrend = latestHistory ? totals.netWorth - latestHistory.netWorth : 0;
  const netTrendPct = latestHistory && latestHistory.netWorth > 0 ? netTrend / latestHistory.netWorth : 0;

  /* Il patrimonio sale all'ingresso; la sparkline usa lo storico reale più il
     valore di adesso, così l'ultimo punto è sempre il presente. */
  const heroNetWorth = useCountUp(totals.netWorth);
  const sparkPoints = useMemo(() => {
    const hist = (data.history || []).map(h => h.netWorth);
    return [...hist, totals.netWorth];
  }, [data.history, totals.netWorth]);
  const savingColor = totals.savingRate >= 0.2 ? C.sage : totals.savingRate >= 0.1 ? C.gold : C.rust;
  const activeTabLabel = (tabs.find(t => t.id === activeTab) || {}).label || 'Quadro';
  const narrow = useIsNarrow();
  const chartH = (desktop, mobile) => narrow ? mobile : desktop;
  return /*#__PURE__*/React.createElement("div", {
    className: "app-shell"
  }, /*#__PURE__*/React.createElement(Toast, {
    message: toast
  }), /*#__PURE__*/React.createElement(Sidebar, {
    tabs: tabs,
    activeTab: activeTab,
    onChange: setActiveTab
  }), /*#__PURE__*/React.createElement(MobileNav, {
    tabs: tabs,
    activeTab: activeTab,
    onChange: setActiveTab
  }), /*#__PURE__*/React.createElement("div", {
    className: "main-area"
  }, /*#__PURE__*/React.createElement("header", {
    className: "mobile-topbar"
  }, /*#__PURE__*/React.createElement("h1", null, activeTabLabel), /*#__PURE__*/React.createElement("button", {
    className: "month-chip",
    onClick: () => setProfileSheet(true),
    "aria-haspopup": "dialog"
  }, /*#__PURE__*/React.createElement(Ic.calendar, null), " ", data.profile.month), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: () => setActionSheet(true),
    "aria-label": "Altre azioni",
    "aria-haspopup": "dialog",
    style: {
      minWidth: 40,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ic.more, {
    size: 16
  }))), /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar-title"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Il tuo"), " Quadro"), /*#__PURE__*/React.createElement("div", {
    className: "topbar-meta"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.profile.name,
    onChange: e => setData(p => ({
      ...p,
      profile: {
        ...p.profile,
        name: e.target.value
      }
    })),
    className: "input-label",
    style: {
      width: 120,
      borderBottom: `1px dotted ${C.border}`
    },
    "aria-label": "Nome"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.textMuted
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: data.profile.month,
    onChange: e => setData(p => ({
      ...p,
      profile: {
        ...p.profile,
        month: e.target.value
      }
    })),
    className: "input-label",
    style: {
      width: 130,
      borderBottom: `1px dotted ${C.border}`
    },
    "aria-label": "Mese di riferimento"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: toggleTheme,
    "aria-label": theme === 'dark' ? 'Passa alla versione chiara' : 'Passa alla versione scura',
    title: theme === 'dark' ? 'Passa alla versione chiara' : 'Passa alla versione scura',
    style: {
      minWidth: 40,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ic.theme, null)), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: saveSnapshot
  }, /*#__PURE__*/React.createElement(Ic.check, null), " Salva snapshot"), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: () => setActionSheet(true),
    "aria-label": "Altre azioni",
    "aria-haspopup": "dialog",
    style: {
      minWidth: 40,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Ic.more, {
    size: 16
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'none'
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: "application/json",
    onChange: importJSON
  })))), actionSheet && /*#__PURE__*/React.createElement(Sheet, {
    title: "Azioni",
    onClose: () => setActionSheet(false)
  }, /*#__PURE__*/React.createElement("button", {
    className: "sheet-row",
    onClick: () => {
      setActionSheet(false);
      saveSnapshot();
    }
  }, /*#__PURE__*/React.createElement(Ic.check, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Salva snapshot del mese")), /*#__PURE__*/React.createElement("button", {
    className: "sheet-row",
    onClick: () => {
      setActionSheet(false);
      exportJSON();
    }
  }, /*#__PURE__*/React.createElement(Ic.download, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Esporta dati (JSON)")), /*#__PURE__*/React.createElement("button", {
    className: "sheet-row",
    onClick: () => {
      setActionSheet(false);
      fileInputRef.current?.click();
    }
  }, /*#__PURE__*/React.createElement(Ic.upload, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Importa dati (JSON)")), /*#__PURE__*/React.createElement("button", {
    className: "sheet-row",
    onClick: () => {
      setActionSheet(false);
      toggleTheme();
    }
  }, /*#__PURE__*/React.createElement(Ic.theme, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, theme === 'dark' ? 'Passa alla versione chiara' : 'Passa alla versione scura')), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${C.border}`,
      margin: '8px 0'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "sheet-row",
    style: {
      color: C.danger
    },
    onClick: () => {
      setActionSheet(false);
      resetData();
    }
  }, /*#__PURE__*/React.createElement(Ic.reset, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Ripristina i dati di default"))), profileSheet && /*#__PURE__*/React.createElement(Sheet, {
    title: "Profilo e mese",
    onClose: () => setProfileSheet(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pf-name"
  }, "Nome"), /*#__PURE__*/React.createElement("input", {
    id: "pf-name",
    type: "text",
    className: "input-cell",
    value: data.profile.name,
    onChange: e => setData(p => ({
      ...p,
      profile: {
        ...p.profile,
        name: e.target.value
      }
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pf-month"
  }, "Mese di riferimento"), /*#__PURE__*/React.createElement("input", {
    id: "pf-month",
    type: "text",
    className: "input-cell",
    value: data.profile.month,
    placeholder: "Aprile 2026",
    onChange: e => setData(p => ({
      ...p,
      profile: {
        ...p.profile,
        month: e.target.value
      }
    }))
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    style: {
      width: '100%',
      justifyContent: 'center'
    },
    onClick: () => setProfileSheet(false)
  }, "Fatto"))), /*#__PURE__*/React.createElement("main", null, activeTab === 'overview' && /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("section", {
    className: "card-hero reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-label"
  }, "Patrimonio netto"), /*#__PURE__*/React.createElement("div", {
    className: "hero-value"
  }, fmt(heroNetWorth)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
      marginTop: 16
    }
  }, latestHistory ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: `hero-delta ${netTrend >= 0 ? 'up' : 'down'}`
  }, netTrend >= 0 ? /*#__PURE__*/React.createElement(Ic.up, null) : /*#__PURE__*/React.createElement(Ic.down, null), fmt(Math.abs(netTrend)), " (", fmtPct(Math.abs(netTrendPct)), ")"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: C.textMuted
    }
  }, "rispetto a ", latestHistory.date)) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: C.textMuted
    }
  }, "Liquidita ", fmt(data.liquidity.current), " + Investimenti ", fmt(totals.totalInvestCurrent)))), /*#__PURE__*/React.createElement("div", {
    className: "hero-aside"
  }, sparkPoints.length >= 2 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: C.textMuted,
      marginBottom: 8
    }
  }, "Andamento \xB7 ", sparkPoints.length, " rilevazioni"), /*#__PURE__*/React.createElement(Sparkline, {
    points: sparkPoints,
    color: C.gold
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: C.textMuted,
      marginBottom: 12
    }
  }, "Da cosa \xE8 fatto"), [{
    name: 'Liquidita',
    value: data.liquidity.current,
    color: C.textDim
  }, {
    name: 'Investimenti',
    value: totals.totalInvestCurrent,
    color: C.gold
  }].map(part => /*#__PURE__*/React.createElement("div", {
    key: part.name,
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 10,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: C.textDim
    }
  }, part.name), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 12.5,
      color: C.text
    }
  }, fmt(part.value), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.textMuted,
      marginLeft: 8
    }
  }, fmtPct(part.value / Math.max(1, totals.netWorth))))), /*#__PURE__*/React.createElement("div", {
    className: "progress-track",
    style: {
      height: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      '--fill': Math.min(100, part.value / Math.max(1, totals.netWorth) * 100) / 100,
      background: part.color
    }
  })))), sparkPoints.length < 2 && !narrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: C.textMuted,
      marginTop: 14,
      lineHeight: 1.5
    }
  }, "Salva uno snapshot ogni mese: qui comparir\xE0 l'andamento nel tempo.")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-foot"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(SavingArc, {
    rate: totals.savingRate
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: C.textMuted
    }
  }, "Tasso di risparmio"), /*#__PURE__*/React.createElement("div", {
    className: "number-display",
    style: {
      fontSize: 21,
      marginTop: 4,
      color: savingColor
    }
  }, fmtPct(totals.savingRate), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: C.textMuted,
      marginLeft: 8
    }
  }, fmt(totals.monthlySaving), " / mese")))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.textDim,
      maxWidth: '34ch',
      lineHeight: 1.5
    }
  }, totals.savingRate >= 0.2 ? 'Eccellente: oltre un quinto del netto resta ogni mese.' : totals.savingRate >= 0.1 ? 'In linea, migliorabile: il margine c’è ma è sottile.' : 'Sotto soglia: rivedi le spese variabili o le rate in corso.'))), /*#__PURE__*/React.createElement("div", {
    className: "stat-strip reveal",
    style: {
      animationDelay: '60ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Entrate mese"), /*#__PURE__*/React.createElement("div", {
    className: "stat-value",
    style: {
      color: C.sage
    }
  }, fmt(totals.totalIncome)), /*#__PURE__*/React.createElement("div", {
    className: "stat-hint"
  }, data.income.length, " ", data.income.length === 1 ? 'fonte' : 'fonti', totals.cedolinoAttivo ? ` · netto da cedolino ${totals.cedolinoAttivo.month}` : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      '--fill': Math.min(100, totals.totalOutflow / Math.max(1, totals.totalIncome) * 100) / 100,
      background: `linear-gradient(90deg, ${C.rust}, ${C.gold})`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 6,
      fontSize: 10.5
    },
    className: "mono-font"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.rust
    }
  }, "Uscite ", fmt(totals.totalOutflow)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.textDim
    }
  }, fmtPct(totals.totalOutflow / Math.max(1, totals.totalIncome)))))), /*#__PURE__*/React.createElement("div", {
    className: "stat-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Mesi emergenza"), /*#__PURE__*/React.createElement("div", {
    className: "stat-value",
    style: {
      color: totals.emergencyMonths >= 6 ? C.sage : totals.emergencyMonths >= 3 ? C.gold : C.rust
    }
  }, totals.emergencyMonths.toFixed(1), /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "mesi")), /*#__PURE__*/React.createElement("div", {
    className: "stat-hint"
  }, "target \u2265 6 mesi"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      '--fill': Math.min(100, totals.emergencyMonths / 6 * 100) / 100,
      background: totals.emergencyMonths >= 6 ? C.sage : `linear-gradient(90deg, ${C.rust}, ${C.gold})`
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "stat-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, "Fondo emergenza"), /*#__PURE__*/React.createElement("div", {
    className: "stat-value",
    style: {
      color: C.gold
    }
  }, fmt(data.liquidity.current)), /*#__PURE__*/React.createElement("div", {
    className: "stat-hint"
  }, "target ", fmt(data.liquidity.targetEmergency)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      '--fill': Math.min(100, data.liquidity.current / Math.max(1, data.liquidity.targetEmergency) * 100) / 100,
      background: data.liquidity.current >= data.liquidity.targetEmergency ? C.sage : C.gold
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      marginTop: 6,
      fontSize: 10.5,
      color: C.textDim
    }
  }, fmtPct(data.liquidity.current / Math.max(1, data.liquidity.targetEmergency)), " \xB7 mancano ", fmt(Math.max(0, data.liquidity.targetEmergency - data.liquidity.current)))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-8 row-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Allocazione flusso mensile")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, "su ", fmt(totals.totalIncome))), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: chartH(300, 240)
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: barData,
    layout: "vertical",
    margin: {
      left: 10,
      right: 30,
      top: 10
    }
  }, /*#__PURE__*/React.createElement("defs", null, barData.map((d, i) => /*#__PURE__*/React.createElement("linearGradient", {
    key: i,
    id: `barGrad${i}`,
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: d.fill,
    stopOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: d.fill,
    stopOpacity: "1"
  })))), /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border,
    horizontal: false
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    stroke: C.textMuted,
    tickFormatter: v => `${v}€`
  }), /*#__PURE__*/React.createElement(YAxis, {
    type: "category",
    dataKey: "name",
    stroke: C.textMuted,
    width: narrow ? 62 : 80,
    tick: {
      fontSize: narrow ? 10 : 11
    }
  }), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => fmt(v)
  })), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "value",
    radius: [0, 6, 6, 0]
  }, barData.map((_, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: `url(#barGrad${i})`
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-4 row-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Composizione patrimonio"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: 240
    }
  }, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: chartH(240, 210)
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: [{
      name: 'Liquidita',
      value: data.liquidity.current
    }, ...data.investments.map(i => ({
      name: i.label,
      value: i.current
    }))].filter(d => d.value > 0),
    dataKey: "value",
    cx: "50%",
    cy: "50%",
    innerRadius: 55,
    outerRadius: 90,
    paddingAngle: 3
  }, [C.textDim, ...PIE_COLORS].map((c, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: c
  }))), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => fmt(v)
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em'
    }
  }, "TOTALE"), /*#__PURE__*/React.createElement("div", {
    className: "display-font number-display",
    style: {
      fontSize: 22,
      color: C.gold
    }
  }, fmt(totals.netWorth)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.textDim,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.textDim
    }
  }, "\u25CF Liquidita ", fmtPct(data.liquidity.current / Math.max(1, totals.netWorth))), '  ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.gold
    }
  }, "\u25CF Investimenti ", fmtPct(totals.totalInvestCurrent / Math.max(1, totals.netWorth))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-7 row-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Patrimonio \u2014 prossimi 5 anni")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, fmt(projection[60]?.netWorth || 0))), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: chartH(280, 200)
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: projection.filter((_, i) => i % 3 === 0)
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "netGrad",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: C.gold,
    stopOpacity: "0.3"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: C.gold,
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    stroke: C.textMuted,
    tickFormatter: v => v % 12 === 0 ? `${v / 12}a` : ''
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: C.textMuted,
    tickFormatter: v => `${(v / 1000).toFixed(0)}k`
  }), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => fmt(v),
    labelFormatter: l => `Mese ${l}`
  })), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "netWorth",
    stroke: C.gold,
    strokeWidth: 2.5,
    dot: false,
    name: "Patrimonio"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-5 row-2"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Dettaglio spese")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textMuted
    }
  }, fmt(totals.essentialExpenses))), /*#__PURE__*/React.createElement(RankedList, {
    items: expenseBreakdown
  })), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Diagnosi rapida"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(DiagnosticItem, {
    ok: totals.savingRate >= 0.1,
    title: "Tasso risparmio",
    text: `${fmtPct(totals.savingRate)} del netto. ${totals.savingRate >= 0.2 ? 'Eccellente.' : totals.savingRate >= 0.1 ? 'In linea, migliorabile.' : 'Sotto soglia: rivedi spese o rate.'}`
  }), /*#__PURE__*/React.createElement(DiagnosticItem, {
    ok: totals.emergencyMonths >= 6,
    title: "Fondo emergenza",
    text: `${totals.emergencyMonths.toFixed(1)} mesi copertura. ${totals.emergencyMonths >= 6 ? 'Adeguato.' : `Mancano ${fmt(Math.max(0, data.liquidity.targetEmergency - data.liquidity.current))} al target.`}`
  }), /*#__PURE__*/React.createElement(DiagnosticItem, {
    ok: totals.totalIncome > 0 && totals.totalLoans / totals.totalIncome < 0.15,
    title: "Peso rate",
    text: `Rate ${totals.totalIncome > 0 ? fmtPct(totals.totalLoans / totals.totalIncome) : '0%'} del netto. ${totals.totalLoans === 0 ? 'Nessun debito.' : 'Si esauriranno liberando flusso.'}`
  }), /*#__PURE__*/React.createElement(DiagnosticItem, {
    ok: totals.totalIncome > 0 && totals.totalInvestMonthly / totals.totalIncome >= 0.1,
    title: "Investimenti",
    text: `${totals.totalIncome > 0 ? fmtPct(totals.totalInvestMonthly / totals.totalIncome) : '0%'} del netto investito. ${totals.totalInvestMonthly / totals.totalIncome >= 0.15 ? 'Ottimo.' : 'Aumentabile dopo fine rate.'}`
  })))), activeTab === 'income' && /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6 accent-sage"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond",
    style: {
      color: C.sage
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Entrate")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 14,
      color: C.sage
    }
  }, fmt(totals.totalIncome))), /*#__PURE__*/React.createElement(DataTable, {
    items: data.income,
    section: "income",
    onUpdate: updateField,
    onRemove: removeItem,
    fields: ['label', 'amount']
  }), /*#__PURE__*/React.createElement(AddBtn, {
    onClick: () => addItem('income', {
      label: 'Nuova entrata',
      amount: 0
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Liquidita & Cuscinetto"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase'
    }
  }, "Liquidita attuale"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: data.liquidity.current,
    onChange: e => updateLiquidity('current', e.target.value),
    className: "input-cell",
    style: {
      fontSize: 22,
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 10,
      color: C.textMuted,
      letterSpacing: '0.15em',
      textTransform: 'uppercase'
    }
  }, "Target fondo emergenza"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: data.liquidity.targetEmergency,
    onChange: e => updateLiquidity('targetEmergency', e.target.value),
    className: "input-cell",
    style: {
      fontSize: 22,
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      '--fill': Math.min(100, data.liquidity.current / Math.max(1, data.liquidity.targetEmergency) * 100) / 100,
      background: data.liquidity.current >= data.liquidity.targetEmergency ? C.sage : C.gold
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "mono-font",
    style: {
      fontSize: 11,
      color: C.textDim,
      marginTop: 8
    }
  }, fmtPct(data.liquidity.current / Math.max(1, data.liquidity.targetEmergency)), " raggiunto \u2014 mancano ", fmt(Math.max(0, data.liquidity.targetEmergency - data.liquidity.current)))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6 accent-rust"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond",
    style: {
      color: C.rust
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Spese fisse")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 14,
      color: C.rust
    }
  }, fmt(totals.totalFixed))), /*#__PURE__*/React.createElement(DataTable, {
    items: data.fixedExpenses,
    section: "fixedExpenses",
    onUpdate: updateField,
    onRemove: removeItem,
    fields: ['label', 'amount']
  }), /*#__PURE__*/React.createElement(AddBtn, {
    onClick: () => addItem('fixedExpenses', {
      label: 'Nuova spesa fissa',
      amount: 0
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond",
    style: {
      color: C.purple
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Spese variabili")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 14,
      color: C.purple
    }
  }, fmt(totals.totalVariable))), /*#__PURE__*/React.createElement(DataTable, {
    items: data.variableExpenses,
    section: "variableExpenses",
    onUpdate: updateField,
    onRemove: removeItem,
    fields: ['label', 'amount']
  }), /*#__PURE__*/React.createElement(AddBtn, {
    onClick: () => addItem('variableExpenses', {
      label: 'Nuova spesa variabile',
      amount: 0
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond",
    style: {
      color: C.goldDim
    }
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Rate & Finanziamenti")), /*#__PURE__*/React.createElement("span", {
    className: "mono-font",
    style: {
      fontSize: 14,
      color: C.goldDim
    }
  }, fmt(totals.totalLoans))), /*#__PURE__*/React.createElement(DataTable, {
    items: data.loans,
    section: "loans",
    onUpdate: updateField,
    onRemove: removeItem,
    fields: ['label', 'amount', 'monthsLeft'],
    fieldLabels: {
      label: 'Descrizione',
      amount: 'Rata mensile',
      monthsLeft: 'Mesi residui'
    }
  }), /*#__PURE__*/React.createElement(AddBtn, {
    onClick: () => addItem('loans', {
      label: 'Nuovo finanziamento',
      amount: 0,
      monthsLeft: 12
    })
  }))), activeTab === 'transactions' && /*#__PURE__*/React.createElement(TransactionsTab, {
    data: data,
    onAdd: addTransaction,
    onUpdate: updateTransaction,
    onDelete: deleteTransaction,
    onImport: importTransactions,
    onBulkDelete: deleteTransactions
  }), activeTab === 'investments' && /*#__PURE__*/React.createElement(InvestmentsTab, {
    data: data,
    totals: totals,
    onUpdateField: updateField,
    onAddItem: addItem,
    onRemoveItem: removeItem,
    onUpdateTarget: updateInvestmentTarget
  }), activeTab === 'markets' && /*#__PURE__*/React.createElement(MarketsTab, {
    markets: data.markets,
    onAdd: addPolyPosition,
    onUpdate: updatePolyPosition,
    onRemove: removePolyPosition,
    onClose: closePolyPosition,
    onUpdateRate: updateEurUsd
  }), activeTab === 'projection' && /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Proiezione patrimoniale a 60 mesi"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: C.textDim,
      marginBottom: 16
    }
  }, "Ipotesi rendimenti annui: Equity 7%, Pensione 4% (netto costi), Cripto 12% (alta volatilita), Bond 3%. Le rate decrescono in base ai mesi residui."), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: chartH(400, 260)
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: projection
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "month",
    stroke: C.textMuted,
    tickFormatter: v => v % 12 === 0 ? `${v / 12}a` : ''
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: C.textMuted,
    tickFormatter: v => `${(v / 1000).toFixed(0)}k`
  }), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => fmt(v),
    labelFormatter: l => `Mese ${l}`
  })), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "liquidity",
    stroke: C.textDim,
    strokeWidth: 2,
    name: "Liquidita",
    dot: false
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "investments",
    stroke: C.rust,
    strokeWidth: 2,
    name: "Investimenti",
    dot: false
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "netWorth",
    stroke: C.gold,
    strokeWidth: 3,
    name: "Patrimonio totale",
    dot: false
  })))), [12, 24, 36, 60].map(m => {
    const point = projection[m];
    const growth = point && totals.netWorth > 0 ? (point.netWorth - totals.netWorth) / totals.netWorth : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: m,
      className: "bento-card span-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow"
    }, "Tra ", m / 12, " ", m === 12 ? 'anno' : 'anni'), /*#__PURE__*/React.createElement("div", {
      className: "kpi-value",
      style: {
        color: C.gold
      }
    }, point ? fmt(point.netWorth) : '—'), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.sage,
        marginTop: 8
      }
    }, "+", fmtPct(growth)), point && /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.textDim,
        marginTop: 8,
        lineHeight: 1.6
      }
    }, "Liq: ", fmt(point.liquidity), /*#__PURE__*/React.createElement("br", null), "Inv: ", fmt(point.investments)));
  })), activeTab === 'mortgage' && (() => {
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
    const chartData = [{
      year: 0,
      residuo: Number(m.amount) || 0,
      interessi: 0
    }];
    for (let y = 1; y <= (Number(m.years) || 0); y++) {
      const lastRow = [...schedA].reverse().find(r => r.year === y);
      if (lastRow) chartData.push({
        year: y,
        residuo: Math.round(lastRow.balance),
        interessi: Math.round(lastRow.cumInterest)
      });
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
    const mInput = (label, field, step = '1', suffix = '') => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: {
        fontSize: 10,
        color: C.textMuted,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: 6
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      step: step,
      className: "input-cell mono-font",
      value: m[field] ?? 0,
      onChange: e => updateMortgage(field, e.target.value),
      style: {
        width: '100%',
        textAlign: 'right'
      }
    }), suffix && /*#__PURE__*/React.createElement("span", {
      className: "mono-font",
      style: {
        fontSize: 12,
        color: C.textMuted
      }
    }, suffix)));
    return /*#__PURE__*/React.createElement("div", {
      className: "bento"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-7"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "card-title"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "diamond"
    }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: 'italic'
      }
    }, "Parametri mutuo"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 16,
        marginTop: 4
      }
    }, mInput('Importo del mutuo', 'amount', '1000', '€'), mInput('Durata', 'years', '1', 'anni'), mInput('Tasso annuo (TAN)', 'rate', '0.05', '%'), mInput('Spese una tantum', 'feesUpfront', '100', '€'), mInput('Assicurazione', 'insuranceMonthly', '5', '€/mese')), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 22,
        paddingTop: 16,
        borderTop: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow",
      style: {
        marginBottom: 12
      }
    }, "Scenario di confronto (B)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 16
      }
    }, mInput('TAN scenario B', 'rateB', '0.05', '%'), mInput('Durata scenario B', 'yearsB', '1', 'anni'))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: C.textDim,
        marginTop: 16
      }
    }, "Calcoli indicativi a tasso fisso costante (ammortamento alla francese, rata costante). Il TAEG reale dipende da spese e condizioni della banca.")), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-5"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "card-title"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "diamond"
    }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: 'italic'
      }
    }, "Sostenibilit\xE0 della rata"))), /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow"
    }, "Rata mensile (incl. assicurazione)"), /*#__PURE__*/React.createElement("div", {
      className: "kpi-value",
      style: {
        color: susColor
      }
    }, fmtEUR2(rataTot)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-track",
      style: {
        height: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "progress-fill",
      style: {
        '--fill': Math.min(100, incidenza * 100) / 100,
        background: susColor
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.textDim
      }
    }, "Incidenza sul reddito netto: ", fmtPct(incidenza)), /*#__PURE__*/React.createElement("span", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.textMuted
      }
    }, "soglia consigliata 30\u201335%"))), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 12,
        color: C.textDim,
        marginTop: 18,
        lineHeight: 1.9
      }
    }, "Reddito netto mensile: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.text
      }
    }, fmt(totals.totalIncome)), /*#__PURE__*/React.createElement("br", null), "Risparmio mensile attuale: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.text
      }
    }, fmt(totals.monthlySaving)), /*#__PURE__*/React.createElement("br", null), "Risparmio residuo dopo la rata: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: risparmioResiduo < 0 ? C.danger : C.sage,
        fontWeight: 600
      }
    }, fmt(risparmioResiduo))), incidenza > 0.35 && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: C.danger,
        marginTop: 12,
        display: 'flex',
        gap: 8,
        alignItems: 'flex-start',
        lineHeight: 1.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Ic.alert, {
      size: 15
    })), /*#__PURE__*/React.createElement("span", null, "La rata supera il 35% del reddito netto: molte banche non concedono il finanziamento a queste condizioni."))), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow"
    }, "Rata mensile (mutuo)"), /*#__PURE__*/React.createElement("div", {
      className: "kpi-value",
      style: {
        color: C.gold
      }
    }, fmtEUR2(payA)), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.textDim,
        marginTop: 8
      }
    }, nA, " rate \xB7 ", Number(m.years) || 0, " anni")), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-3 accent-rust"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow"
    }, "Totale interessi"), /*#__PURE__*/React.createElement("div", {
      className: "kpi-value",
      style: {
        color: C.rust
      }
    }, fmt(totIntA)), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.textDim,
        marginTop: 8
      }
    }, m.amount > 0 ? fmtPct(totIntA / m.amount) : '—', " sul capitale")), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow"
    }, "Costo totale"), /*#__PURE__*/React.createElement("div", {
      className: "kpi-value",
      style: {
        color: C.text
      }
    }, fmt(costTotA)), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.textDim,
        marginTop: 8
      }
    }, "capitale + interessi + spese")), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow"
    }, "TAEG indicativo"), /*#__PURE__*/React.createElement("div", {
      className: "kpi-value",
      style: {
        color: C.gold
      }
    }, fmtPct2(taegA)), /*#__PURE__*/React.createElement("div", {
      className: "mono-font",
      style: {
        fontSize: 11,
        color: C.textDim,
        marginTop: 8
      }
    }, "TAN ", fmtPct2((Number(m.rate) || 0) / 100))), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-12"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "card-title"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "diamond"
    }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: 'italic'
      }
    }, "Capitale residuo e interessi cumulati"))), /*#__PURE__*/React.createElement(ResponsiveContainer, {
      width: "100%",
      height: 340
    }, /*#__PURE__*/React.createElement(LineChart, {
      data: chartData
    }, /*#__PURE__*/React.createElement(CartesianGrid, {
      strokeDasharray: "2 4",
      stroke: C.border
    }), /*#__PURE__*/React.createElement(XAxis, {
      dataKey: "year",
      stroke: C.textMuted,
      tickFormatter: v => `${v}a`
    }), /*#__PURE__*/React.createElement(YAxis, {
      stroke: C.textMuted,
      tickFormatter: v => `${(v / 1000).toFixed(0)}k`
    }), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
      formatter: v => fmt(v),
      labelFormatter: l => `Anno ${l}`
    })), /*#__PURE__*/React.createElement(Legend, {
      wrapperStyle: {
        fontSize: 12
      }
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "residuo",
      stroke: C.gold,
      strokeWidth: 3,
      name: "Capitale residuo",
      dot: false
    }), /*#__PURE__*/React.createElement(Line, {
      type: "monotone",
      dataKey: "interessi",
      stroke: C.rust,
      strokeWidth: 2,
      name: "Interessi cumulati",
      dot: false
    })))), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-12"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "card-title"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "diamond"
    }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: 'italic'
      }
    }, "Confronto scenari"))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: 'auto'
      }
    }, /*#__PURE__*/React.createElement("table", {
      className: "mono-font",
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        color: C.textMuted,
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("th", {
      style: {
        textAlign: 'left',
        padding: '8px 10px'
      }
    }, "Scenario"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Importo"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "TAN"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Durata"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Rata"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Totale interessi"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Costo totale"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        borderTop: `1px solid ${C.border}`,
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'left',
        padding: '10px',
        color: C.gold
      }
    }, "A (attuale)"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, fmt(m.amount)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, fmtPct2((Number(m.rate) || 0) / 100)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, Number(m.years) || 0, " anni"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, fmtEUR2(payA)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px',
        color: totIntA <= totIntB ? C.sage : C.text
      }
    }, fmt(totIntA)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px',
        color: costTotA <= costTotB ? C.sage : C.text
      }
    }, fmt(costTotA))), /*#__PURE__*/React.createElement("tr", {
      style: {
        borderTop: `1px solid ${C.border}`,
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'left',
        padding: '10px',
        color: C.purple
      }
    }, "B (confronto)"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, fmt(m.amount)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, fmtPct2((Number(m.rateB) || 0) / 100)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, Number(m.yearsB) || 0, " anni"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px'
      }
    }, fmtEUR2(payB)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px',
        color: totIntB < totIntA ? C.sage : C.text
      }
    }, fmt(totIntB)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '10px',
        color: costTotB < costTotA ? C.sage : C.text
      }
    }, fmt(costTotB)))))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 11,
        color: C.textDim,
        marginTop: 10
      }
    }, "In verde lo scenario con interessi / costo totale inferiore. Differenza interessi: ", fmt(Math.abs(totIntA - totIntB)), ".")), /*#__PURE__*/React.createElement("div", {
      className: "bento-card span-12"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "card-title"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      className: "diamond"
    }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: 'italic'
      }
    }, "Piano di ammortamento (sintesi annuale \u2014 scenario A)"))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowX: 'auto',
        maxHeight: 360,
        overflowY: 'auto'
      }
    }, /*#__PURE__*/React.createElement("table", {
      className: "mono-font",
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        color: C.textMuted,
        textAlign: 'right',
        position: 'sticky',
        top: 0,
        background: C.card
      }
    }, /*#__PURE__*/React.createElement("th", {
      style: {
        textAlign: 'left',
        padding: '8px 10px'
      }
    }, "Anno"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Quota capitale"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Quota interessi"), /*#__PURE__*/React.createElement("th", {
      style: {
        padding: '8px 10px'
      }
    }, "Capitale residuo"))), /*#__PURE__*/React.createElement("tbody", null, yearly.map(r => /*#__PURE__*/React.createElement("tr", {
      key: r.year,
      style: {
        borderTop: `1px solid ${C.border}`,
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'left',
        padding: '8px 10px',
        color: C.textDim
      }
    }, r.year), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px'
      }
    }, fmt(r.cap)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        color: C.rust
      }
    }, fmt(r.int)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        color: C.text
      }
    }, fmt(r.bal)))))))));
  })(), activeTab === 'history' && /*#__PURE__*/React.createElement("div", {
    className: "bento"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card span-12"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "diamond"
  }, "\u25C6"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "Storico mensile"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: C.textDim,
      marginBottom: 16
    }
  }, "Usa il pulsante \"Snapshot\" in alto per salvare lo stato del mese corrente. Ogni mese si sovrascrive se gia presente."), (data.history || []).length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      textAlign: 'center',
      color: C.textMuted
    }
  }, /*#__PURE__*/React.createElement(Ic.trend, {
    size: 32
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12
    }
  }, "Nessuno snapshot salvato. Clicca \"Snapshot\" per iniziare.")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: chartH(300, 230)
  }, /*#__PURE__*/React.createElement(LineChart, {
    data: data.history
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "2 4",
    stroke: C.border
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "date",
    stroke: C.textMuted
  }), /*#__PURE__*/React.createElement(YAxis, {
    stroke: C.textMuted,
    tickFormatter: v => `${(v / 1000).toFixed(0)}k`
  }), /*#__PURE__*/React.createElement(Tooltip, _extends({}, ttStyle, {
    formatter: v => fmt(v)
  })), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "netWorth",
    stroke: C.gold,
    strokeWidth: 2,
    name: "Patrimonio",
    dot: {
      r: 4
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "liquidity",
    stroke: C.textDim,
    strokeWidth: 1.5,
    name: "Liquidita",
    dot: {
      r: 3
    }
  }), /*#__PURE__*/React.createElement(Line, {
    type: "monotone",
    dataKey: "investments",
    stroke: C.sage,
    strokeWidth: 1.5,
    name: "Investimenti",
    dot: {
      r: 3
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: `1px solid ${C.border}`
    }
  }, ['Mese', 'Patrimonio', 'Liquidita', 'Investimenti', 'Entrate', 'Risparmio'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      padding: '10px 8px',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      color: C.textMuted
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, data.history.map(h => /*#__PURE__*/React.createElement("tr", {
    key: h.date,
    style: {
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    className: "mono-font",
    style: {
      padding: '10px 8px'
    }
  }, h.date), /*#__PURE__*/React.createElement("td", {
    className: "mono-font",
    style: {
      padding: '10px 8px',
      color: C.gold
    }
  }, fmt(h.netWorth)), /*#__PURE__*/React.createElement("td", {
    className: "mono-font",
    style: {
      padding: '10px 8px'
    }
  }, fmt(h.liquidity)), /*#__PURE__*/React.createElement("td", {
    className: "mono-font",
    style: {
      padding: '10px 8px'
    }
  }, fmt(h.investments)), /*#__PURE__*/React.createElement("td", {
    className: "mono-font",
    style: {
      padding: '10px 8px'
    }
  }, fmt(h.income)), /*#__PURE__*/React.createElement("td", {
    className: "mono-font",
    style: {
      padding: '10px 8px',
      color: h.saving >= 0 ? C.sage : C.danger
    }
  }, fmt(h.saving)))))))))), activeTab === 'cedolini' && /*#__PURE__*/React.createElement(CedoliniTab, {
    cedolini: data.cedolini || [],
    onAdd: addCedolino,
    onRemove: removeCedolino,
    currentISO: currentISO,
    showToast: showToast
  })), /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '24px 32px',
      borderTop: `1px solid ${C.border}`,
      fontSize: 11,
      color: C.textMuted,
      textAlign: 'center'
    }
  }, "Dati salvati localmente (localStorage). Esporta il JSON regolarmente per conservarne una copia.")));
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  render() {
    if (this.state.error) {
      return React.createElement('div', {
        style: {
          padding: 40,
          color: 'var(--danger)',
          fontFamily: 'var(--font-ui)',
          background: 'var(--bg)',
          minHeight: '100vh'
        }
      }, React.createElement('h2', null, 'Errore di rendering'), React.createElement('pre', {
        style: {
          whiteSpace: 'pre-wrap',
          color: 'var(--text)',
          marginTop: 16
        }
      }, this.state.error.toString()));
    }
    return this.props.children;
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(FinanceDashboard, null)));
