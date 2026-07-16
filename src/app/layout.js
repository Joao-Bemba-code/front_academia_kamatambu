import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Academia Kamatambu - Gestão de Formação Profissional',
    template: '%s | Academia Kamatambu',
  },
  description: 'Plataforma completa para gestão de cursos, formadores, turmas e métricas de desempenho da Academia Kamatambu. Centro de Formação Profissional em Luanda, Angola.',
  keywords: ['academia', 'formação profissional', 'gestão educacional', 'cursos', 'Luanda', 'Angola', 'Kamatambu'],
  authors: [{ name: 'Academia Kamatambu' }],
  openGraph: {
    title: 'Academia Kamatambu - Gestão de Formação Profissional',
    description: 'Plataforma completa para gestão de cursos, formadores, turmas e métricas de desempenho.',
    type: 'website',
    locale: 'pt_AO',
    siteName: 'Academia Kamatambu',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
