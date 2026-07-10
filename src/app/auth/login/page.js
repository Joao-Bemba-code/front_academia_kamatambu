'use client'

import { 
  BarChart3, 
  Building2, 
  Users, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          Email: email, 
          Senha: password 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.msg || 'Erro ao fazer login')
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user || data.usuario))
      }

      // Redireciona para o dashboard home
      router.push('/dashboard/home')
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 animate-fade-in px-4 sm:px-0">
      {/* Logotipo MOBILE */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-8 shadow-xl lg:hidden">
        <Image 
          src="/LOGOTIPO 02.svg" 
          alt="Academia Kamatambu" 
          width={200} 
          height={200} 
          className="object-contain drop-shadow-2xl brightness-0 invert"
          priority
        />
      </div>

      <div className="space-y-3 text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bem-vindo de volta
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          Acesse sua conta para gerenciar formações, formadores e métricas do centro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200 animate-fade-in">
            <AlertCircle className="size-5 shrink-0 mt-0.5 text-red-500" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary" />
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-12 pr-4 py-3.5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300"
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <Link href="/auth/recuperar-senha" className="text-sm font-medium text-primary transition-colors hover:text-primary/80 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-primary" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-12 pr-12 py-3.5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-gray-300"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 group"
        >
          {isLoading ? (
            <>
              <span className="opacity-0">Entrar</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Entrar
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">ou</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Ainda não tem acesso?{' '}
          <Link href="/auth/register" className="font-semibold text-primary transition-colors hover:text-primary/80 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

const highlights = [
  { icon: BarChart3, label: 'Métricas em tempo real' },
  { icon: Users, label: 'Gestão de formadores' },
  { icon: Building2, label: 'Multi-cursos' },
]

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Painel ESQUERDO - Logotipo e conteúdo alinhado à esquerda */}
      <section className="relative hidden overflow-hidden lg:flex lg:w-1/2 xl:w-[55%]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
        
        {/* Padrão decorativo */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 bg-repeat" />
        
        <div className="relative flex h-full w-full flex-col justify-between p-10 xl:p-16">
          {/* Logo superior esquerdo */}
          <div className="flex items-start">
            <div className="flex items-center gap-4">
              <Image 
                src="/LOGOTIPO 02.svg" 
                alt="Academia Kamatambu" 
                width={80} 
                height={80} 
                className="object-contain drop-shadow-2xl brightness-0 invert"
                priority
              />
              <div>
                <span className="block font-serif text-2xl font-bold text-white drop-shadow-lg">
                  Academia Kamatambu
                </span>
                <span className="block text-xs font-medium uppercase tracking-widest text-white/60">
                  Centro de Formação
                </span>
              </div>
            </div>
          </div>

          {/* Conteúdo central */}
          <div className="flex-1 flex flex-col justify-center -mt-10">
            <div className="max-w-lg space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-white backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium uppercase tracking-wider">Plataforma em destaque</span>
              </div>

              <h2 className="text-balance font-serif text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl xl:text-5xl">
                Excelência em <br />
                <span className="text-white/95">formação profissional</span>
              </h2>
              
              <p className="text-pretty text-base leading-relaxed text-white/80 drop-shadow sm:text-lg">
                Gerencie seus cursos, acompanhe o desempenho dos formadores e visualize métricas 
                do centro em tempo real. Tudo em um só lugar.
              </p>

              <ul className="flex flex-col items-start gap-3 pt-2">
                {highlights.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-white/90 group">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-white/15 ring-1 ring-inset ring-white/20 transition-all group-hover:bg-white/25">
                      <Icon className="size-4 text-white" aria-hidden="true" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <svg className="size-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Dados seguros</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <svg className="size-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Certificado</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <svg className="size-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>+1.200 formandos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé removido */}
        </div>
      </section>

      {/* Painel DIREITO - Formulário */}
      <section className="flex flex-1 items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2 xl:w-[45%]">
        <LoginForm />
      </section>
    </main>
  )
}