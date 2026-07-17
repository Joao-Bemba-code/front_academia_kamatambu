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
  AlertCircle,
  Shield,
  Zap,
  Globe,
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Senha: password }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Servidor temporariamente indisponível. Tente novamente.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.msg || 'Erro ao fazer login')
      }

      if (data.token) {
        localStorage.setItem('token', data.token)
      }

      router.push('/dashboard/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#006c49] p-8 shadow-xl lg:hidden">
        <Image
          src="/LOGOTIPO 02.svg"
          alt="Academia Kamatambu"
          width={180}
          height={180}
          className="object-contain brightness-0 invert"
          priority
        />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Bem-vindo de volta
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Acesse sua conta para gerenciar formacoes, formadores e metricas do centro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            <AlertCircle className="size-5 shrink-0 mt-0.5 text-red-500" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-[18px]" />
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
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
            <Link href="/auth/recuperar-senha" className="text-sm text-[#006c49] hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-[18px]" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pr-11"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="input-right-toggle"
            >
              {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-green"
        >
          {isLoading ? (
            <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              Entrar
              <ArrowRight className="size-4" />
            </>
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
          Ainda nao tem acesso?{' '}
          <Link href="/auth/register" className="font-semibold text-[#006c49] hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left Panel */}
      <section className="relative hidden overflow-hidden lg:flex lg:w-1/2 xl:w-[55%]">
        <div className="absolute inset-0 bg-[#006c49]" />

        <div className="relative flex h-full w-full flex-col justify-between p-10 xl:p-16">
          <div className="flex items-start">
            <div className="flex items-center gap-4">
              <Image
                src="/LOGOTIPO 02.svg"
                alt="Academia Kamatambu"
                width={80}
                height={80}
                className="object-contain brightness-0 invert"
                priority
              />
              <div>
                <span className="block text-2xl font-bold text-white">
                  Academia Kamatambu
                </span>
                <span className="block text-xs font-medium uppercase tracking-widest text-white/50">
                  Centro de Formacao
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center -mt-10">
            <div className="max-w-lg space-y-6">
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold leading-tight text-white">
                Excelencia em formacao profissional
              </h2>

              <p className="text-base leading-relaxed text-white/75 sm:text-lg">
                Gerencie seus cursos, acompanhe o desempenho dos formadores e visualize metricas
                do centro em tempo real.
              </p>

              <ul className="flex flex-col items-start gap-3 pt-2">
                {[
                  { icon: BarChart3, label: 'Metricas em tempo real' },
                  { icon: Users, label: 'Gestao de formadores' },
                  { icon: Building2, label: 'Multi-cursos' },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="size-4 text-white" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { icon: Shield, label: 'Dados seguros' },
                  { icon: Zap, label: 'Rapido e eficiente' },
                  { icon: Globe, label: 'Acesso 24/7' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-white/60">
                    <Icon className="size-3.5" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel - Form */}
      <section className="flex flex-1 items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2 xl:w-[45%]">
        <LoginForm />
      </section>
    </main>
  )
}
