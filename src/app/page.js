'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Menu, 
  X, 
  Home, 
  Info, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  GraduationCap,
  Users,
  Award,
  BarChart3,
  ChevronRight,
  Send,
  Shield,
  ArrowRight,
  CheckCircle,
  BookOpen,
  UserCheck,
  TrendingUp
} from 'lucide-react'

// ======== NAVBAR ========
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`
      fixed top-0 z-50 w-full transition-all duration-300
      ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200' : 'bg-white shadow-sm border-b border-gray-100'}
    `}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-2 sm:py-3">
          <Image 
            src="/LOGOTIPO 02.svg" 
            alt="Academia Kamatambu" 
            width={80} 
            height={80} 
            className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            priority
          />
        </div>

        <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          <Link href="/" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary">
            Início
          </Link>
          <Link href="#sobre" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary">
            Sobre
          </Link>
          <Link href="#contatos" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary">
            Contatos
          </Link>
          <Link
            href="/auth/login"
            className="rounded-lg bg-primary px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            Entrar
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-1.5 sm:p-2 text-gray-700 hover:bg-primary/10 md:hidden"
        >
          {isOpen ? <X className="size-5 sm:size-6" /> : <Menu className="size-5 sm:size-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
          <div className="flex flex-col space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary">
              <Home className="size-5" /> Início
            </Link>
            <Link href="#sobre" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary">
              <Info className="size-5" /> Sobre
            </Link>
            <Link href="#contatos" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary">
              <Phone className="size-5" /> Contatos
            </Link>
            <Link href="/auth/login" onClick={() => setIsOpen(false)} className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white">
              Entrar <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

// ======== HEADER ========
function Header() {
  const features = [
    { icon: CheckCircle, text: 'Gestão completa de cursos' },
    { icon: CheckCircle, text: 'Acompanhamento em tempo real' },
    { icon: CheckCircle, text: 'Certificação reconhecida' },
  ]

  return (
    <section className="relative mt-14 sm:mt-16 min-h-[85vh] sm:min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat" />
      
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 sm:gap-8 px-4 py-10 sm:py-16 md:flex-row md:py-20 lg:px-8">
        <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 sm:px-4 py-1 sm:py-1.5 text-white backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider">Plataforma em destaque</span>
          </div>

          <h1 className="text-balance font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-white drop-shadow-lg">
            Transforme a gestão da sua <br className="hidden sm:block" />
            <span className="text-white/95">formação profissional</span>
          </h1>
          
          <p className="text-pretty text-sm sm:text-base leading-relaxed text-white/90 drop-shadow md:text-lg">
            A Academia Kamatambu oferece uma plataforma completa para gerenciar cursos, 
            formadores, turmas e métricas de desempenho. Tudo em um só lugar, com 
            segurança e eficiência.
          </p>

          <ul className="hidden sm:flex flex-col gap-2 pt-2">
            {features.map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-white/80">
                <item.icon className="size-4 text-green-400" />
                {item.text}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center md:justify-start">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-gray-100 hover:shadow-xl"
            >
              Começar agora
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/20 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30"
            >
              Saiba mais
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Estudantes negros em formação profissional"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-[8px] font-bold text-gray-700">JD</div>
                  <div className="h-6 w-6 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-[8px] font-bold text-gray-700">MS</div>
                  <div className="h-6 w-6 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[8px] font-bold text-white">+12</div>
                </div>
                <span>+1.200 alunos formados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ======== SEÇÃO SOBRE ========
function AboutSection() {
  const features = [
    {
      icon: BarChart3,
      title: 'Métricas em tempo real',
      description: 'Acompanhe desempenho, engajamento e resultados com dashboards interativos e relatórios detalhados.',
      color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
    },
    {
      icon: Users,
      title: 'Gestão de formadores',
      description: 'Gerencie sua equipe, competências e performance de formadores com facilidade e eficiência.',
      color: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'
    },
    {
      icon: GraduationCap,
      title: 'Multi-cursos e turmas',
      description: 'Organize cursos, turmas e alunos de forma simples e eficiente em um só lugar.',
      color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
    },
    {
      icon: Shield,
      title: 'Segurança e conformidade',
      description: 'Seus dados protegidos com tecnologia de ponta e conformidade com a LGPD.',
      color: 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
    }
  ]

  return (
    <section id="sobre" className="w-full bg-white px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary mb-3">Diferenciais</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Tudo que você precisa para uma <br className="hidden sm:block" />
            <span className="text-primary">gestão de excelência</span>
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-gray-600">
            Ferramentas poderosas para gestores, formadores e instituições que buscam resultados reais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
            >
              <div className={`flex size-10 sm:size-12 items-center justify-center rounded-lg transition-colors ${item.color}`}>
                <item.icon className="size-5 sm:size-6" />
              </div>
              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ======== SEÇÃO ESTATÍSTICAS ========
function StatsSection() {
  const stats = [
    { value: '1.248+', label: 'Formandos', description: 'Este mês', icon: Users },
    { value: '24', label: 'Cursos ativos', description: 'Em andamento', icon: BookOpen },
    { value: '87.3%', label: 'Taxa de conclusão', description: 'Média geral', icon: TrendingUp },
    { value: '18', label: 'Formadores ativos', description: 'Na plataforma', icon: UserCheck },
    { value: '4.8/5', label: 'Satisfação', description: 'Avaliação média', icon: Award },
  ]

  return (
    <section className="w-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-4 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <div className="rounded-full bg-white/10 p-2 sm:p-3">
                    <Icon className="size-4 sm:size-5 md:size-6" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-semibold opacity-90">
                  {stat.label}
                </div>
                <div className="text-[10px] sm:text-xs opacity-70">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ======== SEÇÃO CONTATOS ========
function ContactSection() {
  return (
    <section id="contatos" className="w-full bg-gray-50 px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary mb-3">Contato</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Entre em contato
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-gray-600">
            Estamos prontos para ajudar. Escolha o canal mais conveniente para você.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="space-y-4 sm:space-y-6 rounded-xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5 sm:p-3">
                <MapPin className="size-5 sm:size-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Endereço</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Rua da Formação, 123<br />
                  Bairro do Conhecimento, Cidade Educativa<br />
                  CEP: 12345-678
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5 sm:p-3">
                <Phone className="size-5 sm:size-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Telefone</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  +244 923 456 789<br />
                  +244 934 567 890
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5 sm:p-3">
                <Mail className="size-5 sm:size-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">E-mail</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  contato@academiakamatambu.com<br />
                  suporte@academiakamatambu.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-2.5 sm:p-3">
                <Clock className="size-5 sm:size-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Horário</h4>
                <p className="text-xs sm:text-sm text-gray-600">
                  Segunda a Sexta: 8h às 18h<br />
                  Sábado: 8h às 12h
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <Link
                href="mailto:contato@academiakamatambu.com"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow transition-all hover:bg-primary/90 hover:shadow-md"
              >
                <Send className="size-3.5 sm:size-4" />
                Enviar mensagem
              </Link>
            </div>
          </div>

          <div className="h-64 sm:h-72 md:h-80 w-full overflow-hidden rounded-xl shadow-sm border border-gray-100 lg:h-auto min-h-[280px] sm:min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019108905873!2d13.238948!3d-8.838945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f6b3c3b6b6b3%3A0x3f3e5b3f3e5b3f3e!2sLuanda%2C%20Angola!5e0!3m2!1spt-PT!2spt!4v1690000000000!5m2!1spt-PT!2spt"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização"
              className="min-h-[280px] sm:min-h-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ======== FOOTER ========
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:py-12 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
              <Image 
                src="/LOGOTIPO 02.svg" 
                alt="Academia Kamatambu" 
                width={70} 
                height={70} 
                className="h-16 sm:h-20 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
              Excelência em formação profissional desde 2024.
            </p>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white text-sm sm:text-base">Links rápidos</h4>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
              <li><Link href="#sobre" className="text-gray-400 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link href="#contatos" className="text-gray-400 hover:text-white transition-colors">Contatos</Link></li>
              <li><Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">Entrar</Link></li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white text-sm sm:text-base">Contato</h4>
            <ul className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="size-3.5 sm:size-4" />
                +244 923 456 789
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="size-3.5 sm:size-4" />
                contato@academiakamatambu.com
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white text-sm sm:text-base">Redes sociais</h4>
            <div className="mt-2 sm:mt-3 flex justify-center sm:justify-start gap-3 sm:gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="size-5 sm:size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="size-5 sm:size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="size-5 sm:size-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.048 1.407-.06 4.123-.06h.08z"/>
                  <path d="M12.315 8.356a3.644 3.644 0 100 7.288 3.644 3.644 0 000-7.288z"/>
                  <circle cx="17.869" cy="6.131" r="1.5"/>
                </svg>
              </a>
            </div>
            <p className="mt-2 text-[10px] sm:text-xs text-gray-500">Siga-nos nas redes</p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-gray-800 pt-5 sm:pt-6 text-center text-[10px] sm:text-xs text-gray-500">
          &copy; {currentYear} Academia Kamatambu. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

// ======== PÁGINA PRINCIPAL ========
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Header />
      <AboutSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}