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
  TrendingUp,
} from 'lucide-react'

function useScrollAnimation(threshold = 0.1) {
  const [ref, setRef] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return [setRef, isVisible]
}

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation(0.1)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  )
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3 sm:py-4">
          <Image
            src="/LOGOTIPO 02.svg"
            alt="Academia Kamatambu"
            width={80}
            height={80}
            className={`h-14 sm:h-16 md:h-20 w-auto object-contain transition-all duration-300 ${scrolled ? '' : ''}`}
            priority
          />
        </div>

        <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {[
            { label: 'Inicio', href: '/' },
            { label: 'Sobre', href: '#sobre' },
            { label: 'Contatos', href: '#contatos' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                scrolled
                  ? 'text-gray-700 hover:text-[#006c49] hover:bg-[#006c49]/5'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="ml-2 inline-flex items-center gap-2 rounded-lg bg-[#006c49] px-4 py-2 text-sm font-semibold text-white hover:bg-[#005a3d] transition-colors"
          >
            Entrar
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-lg p-2 transition-colors md:hidden ${
            scrolled
              ? 'text-gray-700 hover:bg-gray-100'
              : 'text-white hover:bg-white/10'
          }`}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="overflow-hidden border-t border-white/10 bg-white md:hidden shadow-lg">
          <div className="flex flex-col space-y-1 px-4 py-4">
            {[
              { icon: Home, label: 'Inicio', href: '/' },
              { icon: Info, label: 'Sobre', href: '#sobre' },
              { icon: Phone, label: 'Contatos', href: '#contatos' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <item.icon className="size-5 text-gray-400" />
                {item.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-4 py-3 text-sm font-semibold text-white"
            >
              Entrar
              <ChevronRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-[#006c49]">
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 sm:gap-12 px-4 py-28 sm:py-32 md:flex-row md:py-40 lg:px-8">
        <div className="flex-1 space-y-6 sm:space-y-8 text-center md:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white">
              Transforme a gestao da sua{' '}
              <span className="text-white/90">formacao profissional</span>
            </h1>
          </div>

          <p className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed text-white/80 md:mx-0 md:text-xl">
            A Academia Kamatambu oferece uma plataforma completa para gerenciar cursos,
            formadores, turmas e metricas de desempenho.
          </p>

          <ul className="hidden sm:flex flex-col gap-3 pt-2">
            {[
              { text: 'Gestao completa de cursos' },
              { text: 'Acompanhamento em tempo real' },
              { text: 'Certificacao reconhecida' },
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-sm text-white/85">
                <CheckCircle className="size-4 text-white/60 shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-[#006c49] transition-colors hover:bg-gray-50"
            >
              Comecar agora
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/10 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
            >
              Saiba mais
            </Link>
          </div>

          <div className="flex items-center gap-6 pt-4 justify-center md:justify-start">
            {[
              { icon: Shield, text: 'Dados seguros' },
              { icon: BarChart3, text: 'Metricas em tempo real' },
              { icon: Users, text: 'Gestao de formadores' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-white/60">
                <Icon className="size-3.5" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg md:max-w-xl">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Estudantes em formacao profissional"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const features = [
    {
      icon: BarChart3,
      title: 'Metricas em tempo real',
      description: 'Acompanhe desempenho, engajamento e resultados com dashboards interativos e relatorios detalhados.',
    },
    {
      icon: Users,
      title: 'Gestao de formadores',
      description: 'Gerencie sua equipe, competencias e performance de formadores com facilidade e eficiencia.',
    },
    {
      icon: GraduationCap,
      title: 'Multi-cursos e turmas',
      description: 'Organize cursos, turmas e alunos de forma simples e eficiente em um so lugar.',
    },
    {
      icon: Shield,
      title: 'Seguranca e conformidade',
      description: 'Seus dados protegidos com tecnologia de ponta e conformidade com a LGPD.',
    },
  ]

  return (
    <section id="sobre" className="w-full bg-white px-4 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Tudo que voce precisa para{' '}
            <span className="text-[#006c49]">gestao de excelencia</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed">
            Ferramentas poderosas para gestores, formadores e instituicoes que buscam resultados reais.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <AnimatedSection key={index}>
              <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 transition-colors hover:border-[#006c49]/20">
                <div className="flex size-11 items-center justify-center rounded-lg bg-[#006c49]/10 mb-5">
                  <item.icon className="size-5 text-[#006c49]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { value: '1.248+', label: 'Formandos', icon: Users },
    { value: '24', label: 'Cursos ativos', icon: BookOpen },
    { value: '87.3%', label: 'Taxa de conclusao', icon: TrendingUp },
    { value: '18', label: 'Formadores ativos', icon: UserCheck },
    { value: '4.8/5', label: 'Satisfacao', icon: Award },
  ]

  return (
    <section className="w-full bg-[#0f172a] px-4 py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <div className="rounded-lg bg-white/10 p-3">
                    <Icon className="size-5" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-white/70">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereco',
      details: ['Rua da Formacao, 123', 'Bairro do Conhecimento, Cidade Educativa', 'CEP: 12345-678'],
    },
    {
      icon: Phone,
      title: 'Telefone',
      details: ['+244 923 456 789', '+244 934 567 890'],
    },
    {
      icon: Mail,
      title: 'E-mail',
      details: ['contato@academiakamatambu.com', 'suporte@academiakamatambu.com'],
    },
    {
      icon: Clock,
      title: 'Horario',
      details: ['Segunda a Sexta: 8h as 18h', 'Sabado: 8h as 12h'],
    },
  ]

  return (
    <section id="contatos" className="w-full bg-gray-50 px-4 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Entre em contato
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-gray-500">
            Estamos prontos para ajudar. Escolha o canal mais conveniente para voce.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <AnimatedSection className="space-y-5 rounded-xl bg-white p-6 sm:p-8 border border-gray-200">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="rounded-lg bg-gray-100 p-2.5">
                  <item.icon className="size-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <div className="mt-1 space-y-0.5">
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-sm text-gray-500">{detail}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="mailto:contato@academiakamatambu.com"
                className="inline-flex items-center gap-2 rounded-lg bg-[#006c49] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#005a3d] transition-colors"
              >
                <Send className="size-4" />
                Enviar mensagem
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection className="h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-gray-200 lg:h-auto min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019108905873!2d13.238948!3d-8.838945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f6b3c3b6b6b3%3A0x3f3e5b3f3e5b3f3e!2sLuanda%2C%20Angola!5e0!3m2!1spt-PT!2spt!4v1690000000000!5m2!1spt-PT!2spt"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localizacao"
              className="min-h-[320px] w-full"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
              <Image
                src="/LOGOTIPO 02.svg"
                alt="Academia Kamatambu"
                width={70}
                height={70}
                className="h-16 sm:h-18 w-auto object-contain brightness-0 invert opacity-80"
              />
            </div>
            <p className="mt-3 text-sm text-gray-500 max-w-xs">
              Excelencia em formacao profissional desde 2024.
            </p>
          </div>

          {[
            { title: 'Links rapidos', links: ['Inicio', 'Sobre', 'Contatos', 'Entrar'] },
            { title: 'Servicos', links: ['Cursos', 'Formacao', 'Certificacao', 'Consultoria'] },
          ].map((section) => (
            <div key={section.title} className="text-center sm:text-left">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <span className="text-gray-500 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Redes sociais</h4>
            <div className="mt-4 flex justify-center sm:justify-start gap-3">
              {['Facebook', 'LinkedIn', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-gray-500 hover:bg-[#006c49] hover:text-white transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-600">Siga-nos nas redes</p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-900 pt-8 text-center text-xs text-gray-600">
          &copy; {currentYear} Academia Kamatambu. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
