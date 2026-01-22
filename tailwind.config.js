/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        magma: '#FF4500',
        cyber: '#ff2d00'
      },
      boxShadow: {
        neon: '0 0 30px rgba(255,69,0,0.35)'
      }
    }
  },
  plugins: []
};
