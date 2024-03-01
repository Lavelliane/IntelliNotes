/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'system-ui'],
        
      },
      colors: {
        'custom-gray': '#7C7C7C',
        'custom-light-blue': '#E8FAFF',
        'custom-gray': '#9D9B9B',
        'custom-blue': '#2029F4',
      },
      borderRadius: {
        '100px': '50px',
        '20px': '20px',
      },
      width:
      {
        'custom-width' : '60px', 
        'fixed-custom-width' : '1000px'
      },
      height:
      {
        'custom-height' : '328px',
      }
      
    },
   
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
