'use client'

import {
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agreedToTerms) {
      setError('Voce precisa concordar com os termos de uso')
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas nao coincidem')
      return
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nome: formData.nome,
          Email: formData.email,
          Senha: formData.senha,
        }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Servidor temporariamente indisponível. Tente novamente.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.msg || 'Erro ao criar conta')
      }

      setSuccessMessage(data.message || 'Conta criada com sucesso!')
      setSuccess(true)

      setTimeout(() => router.push('/auth/login'), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = () => {
    const password = formData.senha
    if (!password) return { score: 0, label: '', color: '' }

    let score = 0
    if (password.length >= 6) score++
    if (password.length >= 10) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    const strengths = [
      { score: 0, label: 'Muito fraca', color: 'bg-red-500' },
      { score: 1, label: 'Fraca', color: 'bg-orange-500' },
      { score: 2, label: 'Media', color: 'bg-yellow-500' },
      { score: 3, label: 'Forte', color: 'bg-blue-500' },
      { score: 4, label: 'Muito forte', color: 'bg-green-500' },
      { score: 5, label: 'Excelente', color: 'bg-emerald-500' },
    ]

    return strengths[Math.min(score, 5)]
  }

  const passwordStrength = getPasswordStrength()

  if (success) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-5 text-center px-4">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle className="size-14 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{successMessage}</h2>
        <p className="text-gray-500 max-w-sm">
          Bem-vindo a Academia Kamatambu. Redirecionando para o login...
        </p>
        <Link
          href="/auth/login"
          className="mt-2 btn-green inline-flex items-center gap-2 text-sm"
        >
          Ir para o login
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
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
          Cadastre-se
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Crie sua conta e comece a gerenciar sua formacao
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            <AlertCircle className="size-5 shrink-0 mt-0.5 text-red-500" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">
            Nome completo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-[18px]" />
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Joao Silva"
              value={formData.nome}
              onChange={handleChange}
              className="input-field"
              required
              disabled={isLoading}
              autoComplete="name"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-[18px]" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="senha" className="text-sm font-medium text-gray-700">
            Senha <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-[18px]" />
            <input
              id="senha"
              name="senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Crie uma senha forte"
              value={formData.senha}
              onChange={handleChange}
              className="input-field pr-11"
              required
              disabled={isLoading}
              minLength={6}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="input-right-toggle"
            >
              {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
            </button>
          </div>

          {formData.senha && (
            <div className="space-y-1.5">
              <div className="flex h-1.5 gap-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`transition-all duration-500 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">
                  Forca: <span className="font-medium text-gray-700">{passwordStrength.label}</span>
                </span>
                <span className="text-gray-400">
                  {formData.senha.length}/6+ caracteres
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="confirmarSenha" className="text-sm font-medium text-gray-700">
            Confirmar senha <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 size-[18px]" />
            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className={`input-field pr-11 ${
                formData.confirmarSenha && formData.confirmarSenha !== formData.senha
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                  : ''
              }`}
              required
              disabled={isLoading}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="input-right-toggle"
            >
              {showConfirmPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
            </button>
          </div>
          {formData.confirmarSenha && formData.confirmarSenha !== formData.senha && (
            <p className="text-xs text-red-600 mt-1">
              As senhas nao coincidem
            </p>
          )}
        </div>

        <div className="flex items-start gap-3 pt-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 size-4 rounded border-gray-300 text-[#006c49] focus:ring-[#006c49]/20"
            disabled={isLoading}
          />
          <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
            Concordo com os{' '}
            <a href="#" className="text-[#006c49] font-semibold hover:underline">
              Termos de Uso
            </a>
            {' '}e{' '}
            <a href="#" className="text-[#006c49] font-semibold hover:underline">
              Politica de Privacidade
            </a>
          </label>
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
              Criar conta
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
          Ja tem uma conta?{' '}
          <Link href="/auth/login" className="font-semibold text-[#006c49] hover:underline">
            Faca login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
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
                Transforme sua gestao educacional
              </h2>

              <p className="text-base leading-relaxed text-white/75 sm:text-lg">
                Cadastre-se e tenha acesso a ferramentas poderosas para gerenciar
                formadores, acompanhar turmas e visualizar o desempenho do centro.
              </p>

              <ul className="flex flex-col items-start gap-3 pt-2">
                {[
                  { icon: Mail, label: 'Notificacoes por e-mail' },
                  { icon: Lock, label: 'Dados seguros' },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-white/90">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="size-4 text-white" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-1 items-center justify-center bg-white px-4 py-8 sm:px-6 sm:py-12 lg:w-1/2 xl:w-[45%]">
        <RegisterForm />
      </section>
    </main>
  )
}
