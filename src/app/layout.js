import './globals.css'

export const metadata = {
  title: 'Academia Kamatambu',
  description: 'Plataforma de gestão da Academia Kamatambu',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  )
}