/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna utama ASETARA: Slate Navy (navbar, heading, tombol utama)
        navy: {
          50: '#EEF2F5',
          100: '#D6E0E7',
          200: '#AFC2CF',
          300: '#7F9BAE',
          400: '#4F7088',
          500: '#33556B',
          600: '#263F50', // brand
          700: '#1E3342',
          800: '#172733',
          900: '#101B23',
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
          50: '#FAF6EC',
          100: '#F2E9D3',
          200: '#E8D9B3',
          300: '#DCC794',
          400: '#D0B67D',
          500: '#C6A66A', // brand accent
          600: '#A98A4F',
          700: '#876B3A',
          800: '#654F2B',
          900: '#43341C',
        },
        cream: '#F7F4EC', // latar utama halaman
        sage: '#E4EEEA',  // latar kartu sekunder / area edukasi
        // Netral: semua tingkat didefinisikan agar tidak jatuh ke abu-abu bawaan Tailwind
        neutral: {
          0: '#FFFFFF',
          50: '#F7F4EC',
          100: '#EFEBE1',
          200: '#E0DCD0',
          300: '#C9C7BE',
          400: '#617078',
          500: '#56636D',
          600: '#46535D',
          700: '#35444F',
          800: '#263F50',
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
        navyGlow: '0 4px 12px rgba(38,63,80,0.25)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #33556B 0%, #1E3342 100%)',
        'teal-gradient': 'linear-gradient(135deg, #477C7C 0%, #274747 100%)',
      },
    },
  },
  plugins: [],
}
