/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna utama INKLUSARA: Navy Blue (navbar, heading, tombol utama)
        navy: {
          50: '#F0F1F3',
          100: '#DCE0E3',
          200: '#BAC1C7',
          300: '#929EA8',
          400: '#677784',
          500: '#445868',
          600: '#263D50', // brand
          700: '#1E3140',
          800: '#182632',
          900: '#111B24',
        },
        // Warna sekunder: Muted Teal (progres, ikon aktif, status positif)
        teal: {
          50: '#E4EEEA', // = Soft Sage
          100: '#D3E5E1',
          200: '#B7D3D0',
          300: '#8FB8B6',
          400: '#6B9E9D',
          500: '#538B8A',
          600: '#477C7C', // brand secondary
          700: '#366060',
          800: '#274747',
          900: '#1A3030',
        },
        // Aksen: Champagne Gold (ikon, highlight, bintang)
        champagne: {
          50: '#F9F4EC',
          100: '#F2E8D7',
          200: '#E9D9BF',
          300: '#E0C8A2',
          400: '#D4B47F',
          500: '#C9A15F', // Champagne Gold: brand accent
          600: '#AB8951',
          700: '#896D41',
          800: '#645030',
          900: '#42351F',
        },
        cream: '#F8F6EF', // Warm Ivory: latar utama halaman
        ivory: '#F8F6EF', // alias cream
        sage: '#E4EEEA',  // latar kartu sekunder / area edukasi
        // Netral: semua tingkat didefinisikan agar tidak jatuh ke abu-abu bawaan Tailwind
        neutral: {
          0: '#FFFFFF',
          50: '#F8F6EF',
          100: '#F0EDE3',
          200: '#E2DED2',
          300: '#C9C7BE',
          400: '#617078',
          500: '#56636D',
          600: '#46535D',
          700: '#35444F',
          800: '#263D50',
          900: '#17242E',
        },
        danger: '#C0392B',
        info: '#2E6F9E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(23,36,46,0.06)',
        navyGlow: '0 4px 12px rgba(38,61,80,0.25)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #445868 0%, #1E3140 100%)',
        'teal-gradient': 'linear-gradient(135deg, #477C7C 0%, #274747 100%)',
      },
    },
  },
  plugins: [],
}
