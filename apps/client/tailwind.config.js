import plugin from 'tailwindcss/plugin';

const MAX_SPACING_SIZE_BORDER = 300;

const spacing = {};

for (let i = 0; i < MAX_SPACING_SIZE_BORDER; i++) {
  spacing[i] = `${4 * i}px`;
}

const shades = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const colorsData = {
  slate: [
    '#F9FAFB',
    '#F1F2F4',
    '#E2E6E9',
    '#C6CCD2',
    '#A9B3BC',
    '#8C99A6',
    '#708090',
    '#596673',
    '#434C56',
    '#2D3339',
    '#16191D',
    '#0B0D0E',
  ],
  orange: [
    '#FFFAF5',
    '#FEF3E6',
    '#FEE6CD',
    '#FDCE9B',
    '#FCB569',
    '#FB9C37',
    '#FA8C16',
    '#C86904',
    '#964F03',
    '#643502',
    '#321A01',
    '#190D01',
  ],
  'deep-blue': [
    '#F6F7FE',
    '#E8ECFD',
    '#D0D9FB',
    '#A2B3F6',
    '#738DF2',
    '#4567ED',
    '#2F55EB',
    '#1234BA',
    '#0D278C',
    '#091A5D',
    '#040D2F',
    '#020617',
  ],
  'light-blue': [
    '#F5FAFF',
    '#E5F3FF',
    '#CCE6FF',
    '#99CEFF',
    '#66B5FF',
    '#339CFF',
    '#188FFF',
    '#0069CC',
    '#004F99',
    '#003566',
    '#001A33',
    '#000D1A',
  ],
  'deep-green': [
    '#F9FEF6',
    '#EFFCE8',
    '#DFF9D2',
    '#BFF3A5',
    '#9FED78',
    '#7FE74B',
    '#53C41A',
    '#4CB418',
    '#398712',
    '#265A0C',
    '#132D06',
    '#091703',
  ],
  red: [
    '#FFF5F5',
    '#FFE5E5',
    '#FFCCCC',
    '#FF9999',
    '#FF6666',
    '#FF3333',
    '#BB0000',
    '#AC0000',
    '#990000',
    '#660000',
    '#330000',
    '#1A0000',
  ],
  mint: [
    '#F5FFFF',
    '#E5FFFF',
    '#CCFFFE',
    '#99FFFD',
    '#66FFFC',
    '#33FFFC',
    '#00C6C3',
    '#00b2b0',
    '#009996',
    '#006664',
    '#003332',
    '#001A19',
  ],
  yellow: [
    '#FFFDF5',
    '#FFFBE5',
    '#FFF7CC',
    '#FFF099',
    '#FFE866',
    '#FFE033',
    '#FFD900',
    '#CCAD00',
    '#998200',
    '#665700',
    '#332B00',
    '#1A1600',
  ],
  magenta: [
    '#FFF5FE',
    '#FFE5FC',
    '#FFCCFA',
    '#FF99F5',
    '#FF66F0',
    '#FF33EB',
    '#B900A7',
    '#A30093',
    '#99008A',
    '#66005C',
    '#33002E',
    '#1A0017',
  ],
};

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

for (const [key] of Object.entries(colorsData)) {
  colors[key] = {};
  for (let i = 0; i < colorsData[key].length; i++) {
    colors[key] = {
      ...colors[key],
      [shades[i]]: colorsData[key][i],
    };
  }
}

export const plugins = [
  plugin(({ addBase, theme }) => {
    addBase({ html: { color: theme('colors.slate.900') } });
  }),
];
export const content = ['./index.html', './src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  spacing,
  fontSize: {
    xxs: ['11px', '14px'],
    xs: ['12px', '16px'],
    sm: ['14px', '20px'],
    base: ['16px', '24px'],
    lg: ['18px', '24px'],
    xl: ['23px', '32px'],
    '2xl': ['32px', '36px'],
  },
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '9999px',
  },
  boxShadow: {
    sm: '0px 2px 4px rgba(47, 84, 235, 0.3)',
    modal: '0px 4px 15px rgba(0, 0, 0, 0.25)',
    focus: '0px 0px 0px 4px #66b5ff',
    'btn-outline-hover': '0px 0px 0px 1px #4567ED inset',
    'btn-outline-active': '0px 0px 0px 1px #1234BA inset',
    'btn-outline-danger-hover': '0px 0px 0px 1px #FF3333 inset',
    'btn-outline-danger-active': '0px 0px 0px 1px #AC0000 inset',
    dropdown: '0px 2px 4px rgba(47, 84, 235, 0.3)',
    'card-step': '0px 4px 18px 3px rgba(47, 84, 235, 0.05)',
  },
  zIndex: {
    0: '0',
    5: '5',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },
  colors,
};
