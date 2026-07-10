'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  Menu,
  Users as UsersIcon,
  GraduationCap,
  BookOpen,
  UserPlus,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Home,
  LogOut,
  User,
  Bell,
  HelpCircle,
  TrendingUp,
  CreditCard,
  CalendarDays,
  CheckCircle,
  ShieldAlert,
  X,
  AlertCircle,
  RefreshCw,
  Eye,
  FileText,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Loader2,
  Info,
  Camera,
  UserCircle,
  IdCard,
  Smartphone,
  Heart,
  Award,
  Clock,
  Upload,
  FileDown,
  Check,
  AlertTriangle
} from 'lucide-react'

// ========== MAPEAMENTO DE ÍCONES ==========
const ICON_MAP = {
  'Users': UsersIcon,
  'BookOpen': BookOpen,
  'CalendarDays': CalendarDays,
  'GraduationCap': GraduationCap,
  'CreditCard': CreditCard,
  'UserPlus': UserPlus,
  'Home': Home,
  'User': User,
  'Bell': Bell,
  'HelpCircle': HelpCircle,
  'TrendingUp': TrendingUp,
  'CheckCircle': CheckCircle,
  'AlertCircle': AlertCircle,
  'Info': Info,
  'Eye': Eye,
  'Edit': Edit,
  'Trash2': Trash2,
  'Plus': Plus,
  'Search': Search,
  'X': X,
  'Menu': Menu,
  'LogOut': LogOut,
  'FileDown': FileDown,
  'Upload': Upload,
  'Loader2': Loader2,
  'Smartphone': Smartphone,
  'Mail': Mail,
  'Award': Award,
  'Clock': Clock,
  'Calendar': Calendar,
  'MapPin': MapPin,
  'Phone': Phone,
  'IdCard': IdCard,
  'Heart': Heart,
  'Camera': Camera,
  'UserCircle': UserCircle,
  'FileText': FileText,
  'RefreshCw': RefreshCw,
  'MoreVertical': MoreVertical,
  'ShieldAlert': ShieldAlert,
  'Check': Check,
  'AlertTriangle': AlertTriangle,
}

// ========== TOAST NOTIFICATION ==========
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'bg-green-50 border-green-500 text-green-800',
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800'
  }

  const icons = {
    success: <CheckCircle className="size-5 text-green-500" />,
    error: <AlertCircle className="size-5 text-red-500" />,
    warning: <AlertCircle className="size-5 text-yellow-500" />,
    info: <Info className="size-5 text-blue-500" />
  }

  return (
    <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 rounded-xl border-l-4 p-4 shadow-lg ${colors[type]} max-w-sm animate-fade-in`}>
      {icons[type]}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="size-4" />
      </button>
    </div>
  )
}

// ========== VIEW MODAL ==========
function ViewModal({ isOpen, onClose, data, type }) {
  if (!isOpen || !data) return null

  const getStatusColor = (status) => {
    const colors = {
      'Ativo': 'bg-[#006c49]/10 text-[#006c49]',
      'Inscrito': 'bg-[#006c49]/10 text-[#006c49]',
      'Pendente': 'bg-[#c0c1ff]/30 text-[#040057]',
      'Admitido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Concluído': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Concluido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Cancelado': 'bg-[#ffdad6] text-[#93000a]',
      'Desistente': 'bg-[#ffdad6] text-[#93000a]',
      'Trancado': 'bg-[#c5c6cd]/30 text-[#45474c]',
      'Ativa': 'bg-[#006c49]/10 text-[#006c49]',
      'Concluída': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Cancelada': 'bg-[#ffdad6] text-[#93000a]'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getDocumentStatus = (value) => {
    if (!value) return { label: 'Pendente', color: 'bg-yellow-100 text-yellow-700' }
    return { label: 'Confirmado ✓', color: 'bg-green-100 text-green-700' }
  }

  const renderMatriculaDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          {data.Foto_User ? (
            <img src={data.Foto_User} alt={data.Nome} className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <UserCircle className="size-12 text-primary" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{data.Nome}</h3>
          <p className="text-sm text-gray-500">ID: {data.id}</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(data.Status)}`}>
            {data.Status || 'Inscrito'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Completo</p>
          <p className="text-sm text-gray-900">{data.Nome}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</p>
          <p className="text-sm text-gray-900">{data.Genero || 'Não informado'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Smartphone className="size-4 text-gray-400" />
            {data.Telefone || 'Não informado'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <BookOpen className="size-4 text-gray-400" />
            {data.Curso}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Turma</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <UsersIcon className="size-4 text-gray-400" />
            {data.Turma}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Módulo</p>
          <p className="text-sm text-gray-900">Módulo {data.Modulo || 1}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Encarregado</p>
          <p className="text-sm text-gray-900">{data.Encarregado || 'Não informado'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Civil</p>
          <p className="text-sm text-gray-900">{data.Estado_Civil || 'Não informado'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Morada</p>
          <p className="text-sm text-gray-900">{data.Morada || 'Não informado'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">BI/Cédula</p>
          <p className="text-sm text-gray-900">{data.BI_Cedula || 'Não informado'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Nascimento</p>
          <p className="text-sm text-gray-900">{data.Nascimento ? new Date(data.Nascimento).toLocaleDateString('pt-PT') : 'Não informado'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Matrícula</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Clock className="size-4 text-gray-400" />
            {data.Data_Matricula ? new Date(data.Data_Matricula).toLocaleDateString('pt-PT') : 'Não informado'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(data.Status)}`}>
            {data.Status || 'Inscrito'}
          </span>
        </div>
        
        {/* Documentos */}
        <div className="col-span-full">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Documentos</p>
          <div className="grid grid-cols-2 gap-2">
            <div className={`rounded-lg p-2 text-center text-xs font-medium ${getDocumentStatus(data.BI_Cedula).color}`}>
              <IdCard className="size-4 mx-auto mb-1" />
              BI/Cédula: {getDocumentStatus(data.BI_Cedula).label}
            </div>
            <div className={`rounded-lg p-2 text-center text-xs font-medium ${getDocumentStatus(data.Foto_Certificado).color}`}>
              <FileText className="size-4 mx-auto mb-1" />
              Certificado: {getDocumentStatus(data.Foto_Certificado).label}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTurmaDetails = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{data.Turma}</h3>
        <p className="text-sm text-gray-500">ID: {data.id}</p>
        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(data.Status)}`}>
          {data.Status || 'Pendente'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <BookOpen className="size-4 text-gray-400" />
            {data.Curso}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Módulo</p>
          <p className="text-sm text-gray-900">Módulo {data.Modulo || 1}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Período</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Clock className="size-4 text-gray-400" />
            {data.Periodo || 'Manhã'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Formador</p>
          <p className="text-sm text-gray-900">{data.Formador || 'Não definido'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Formandos</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <UsersIcon className="size-4 text-gray-400" />
            {data.Numero_Alunos || 0}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</p>
          <p className="text-sm text-gray-900">{data.Capacidade_Maxima || 30}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Início</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Calendar className="size-4 text-gray-400" />
            {data.Data_INIC ? new Date(data.Data_INIC).toLocaleDateString('pt-PT') : 'Não definido'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Data Término</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Calendar className="size-4 text-gray-400" />
            {data.Data_Term ? new Date(data.Data_Term).toLocaleDateString('pt-PT') : 'Não definido'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</p>
          <p className="text-sm text-gray-900">{data.Sala || 'Não definida'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(data.Status)}`}>
            {data.Status || 'Pendente'}
          </span>
        </div>
      </div>
    </div>
  )

  const renderCursoDetails = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900">{data.Nome}</h3>
        <p className="text-sm text-gray-500">ID: {data.id}</p>
        <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
          {data.Status || 'Ativo'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1 col-span-full">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</p>
          <p className="text-sm text-gray-900">{data.Desc || 'Sem descrição'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</p>
          <p className="text-sm text-gray-900">{data.Tipo_curso || 'Formação profissional inicial'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Módulos</p>
          <p className="text-sm text-gray-900">{data.Modulos || 1}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Edição</p>
          <p className="text-sm text-gray-900">{data.Edicao || '1º'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duração</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Clock className="size-4 text-gray-400" />
            {data.Duracao || 'Não definida'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Carga Horária</p>
          <p className="text-sm text-gray-900">{data.Carga_Horaria ? `${data.Carga_Horaria} horas` : 'Não definida'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
            {data.Status || 'Ativo'}
          </span>
        </div>
      </div>
    </div>
  )

  const renderFormadorDetails = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          {data.Foto ? (
            <img src={data.Foto} alt={data.Nome} className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <UserCircle className="size-12 text-primary" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{data.Nome}</h3>
          <p className="text-sm text-gray-500">ID: {data.id}</p>
          <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
            {data.Status || 'Ativo'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Mail className="size-4 text-gray-400" />
            {data.Email}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Smartphone className="size-4 text-gray-400" />
            {data.Telefone || 'Não informado'}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidade</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <Award className="size-4 text-gray-400" />
            {data.Especialidade}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <BookOpen className="size-4 text-gray-400" />
            {data.Curso}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Turmas</p>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <UsersIcon className="size-4 text-gray-400" />
            {data.Turmas || 0}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</p>
          <p className="text-sm text-gray-900">{data.Genero || 'Não informado'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
            {data.Status || 'Ativo'}
          </span>
        </div>
      </div>
    </div>
  )

  const renderDetails = () => {
    switch (type) {
      case 'matriculas':
        return renderMatriculaDetails()
      case 'turmas':
        return renderTurmaDetails()
      case 'cursos':
        return renderCursoDetails()
      case 'formadores':
        return renderFormadorDetails()
      default:
        return <p className="text-gray-500">Detalhes não disponíveis</p>
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'matriculas': return 'Detalhes da Matrícula'
      case 'turmas': return 'Detalhes da Turma'
      case 'cursos': return 'Detalhes do Curso'
      case 'formadores': return 'Detalhes do Formador'
      default: return 'Detalhes'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{getTitle()}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-6" />
          </button>
        </div>
        {renderDetails()}
        <div className="mt-6 flex justify-end border-t border-gray-200 pt-4">
          <button onClick={onClose} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

// ========== CONFIRM MODAL ==========
function ConfirmModal({ isOpen, onClose, onConfirm, title, message, isLoading }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-red-100 p-2">
            <AlertCircle className="size-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={isLoading} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50">
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ========== FORM MODAL ==========
function FormModal({ isOpen, onClose, title, children, onSubmit, isLoading }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-6" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50">
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ========== SIDEBAR ==========
function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab }) {
  const router = useRouter()

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'matriculas', icon: UserPlus, label: 'Matrículas' },
    { id: 'turmas', icon: UsersIcon, label: 'Turmas' },
    { id: 'cursos', icon: BookOpen, label: 'Cursos' },
    { id: 'formadores', icon: GraduationCap, label: 'Formadores' },
  ]

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    router.push('/auth/login')
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#091426] to-[#1e293b] text-white shadow-lg transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10 shrink-0">
          <Image src="/LOGOTIPO 02.svg" alt="Academia Kamatambu" width={40} height={40} className="h-10 w-auto object-contain brightness-0 invert" />
          <div>
            <h1 className="font-serif text-[22px] font-bold leading-tight text-white">Kamatambu</h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#8590a6]">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsOpen(false)
                }}
                className={`
                  flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                  ${isActive ? 'bg-[#006c49] text-white shadow-md' : 'text-[#8590a6] hover:bg-[#1e293b]/50 hover:text-white'}
                `}
              >
                <Icon className="size-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4 shrink-0">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#8590a6] transition-colors hover:bg-[#1e293b]/50 hover:text-white">
            <LogOut className="size-5 shrink-0" />
            <span className="truncate">Sair</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// ========== TOPBAR ==========
function TopBar({ setIsSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[#c5c6cd] bg-[#f7f9fb] px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button onClick={() => setIsSidebarOpen(true)} className="rounded-lg p-1.5 text-gray-700 hover:bg-[#1e293b]/10 lg:hidden shrink-0">
          <Menu className="size-6" />
        </button>
        <div className="relative flex-1 max-w-md min-w-[100px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#45474c]" />
          <input
            type="text"
            placeholder="Escreva aqui para procurar..."
            className="w-full rounded-full border border-[#c5c6cd] bg-white py-2 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#eceef0] transition-colors">
          <Bell className="size-4 sm:size-5 text-[#45474c]" />
          <span className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#ba1a1a]" />
        </button>
        <button className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#eceef0] transition-colors">
          <HelpCircle className="size-4 sm:size-5 text-[#45474c]" />
        </button>
        <div className="h-6 w-px sm:h-8 bg-[#c5c6cd]" />
        <div className="flex cursor-pointer items-center gap-2 sm:gap-3 min-w-0">
          <div className="text-right truncate">
            <p className="text-xs sm:text-sm font-semibold text-[#091426] truncate">Administrador</p>
            <p className="hidden sm:block text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Admin</p>
          </div>
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-[#006c49]/20 bg-[#006c49]/10 shrink-0">
            <User className="size-4 sm:size-5 text-[#006c49]" />
          </div>
        </div>
      </div>
    </header>
  )
}

// ========== STATS CARDS ==========
function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const IconComponent = ICON_MAP[stat.icon]
        
        if (!IconComponent) {
          console.warn(`Ícone não encontrado: ${stat.icon}`)
          return null
        }

        return (
          <div key={stat.label} className="rounded-xl border border-[#eceef0] bg-white p-4 sm:p-5 shadow-sm transition-transform hover:-translate-y-1">
            <div className="mb-3 sm:mb-4 flex items-start justify-between">
              <div className={`rounded-lg p-1.5 sm:p-2 ${stat.color}`}>
                <IconComponent className="size-4 sm:size-5" />
              </div>
              <span className={`flex items-center gap-1 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold ${stat.changeColor || 'text-[#006c49] bg-[#006c49]/5'}`}>
                <TrendingUp className="size-3 sm:size-3.5" />
                {stat.change}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-[#45474c]">{stat.label}</p>
            <h3 className="mt-0.5 sm:mt-1 font-serif text-2xl sm:text-3xl font-bold text-[#091426]">{stat.value}</h3>
            <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-[#45474c]/70">vs. mês anterior</p>
          </div>
        )
      })}
    </div>
  )
}

// ========== MATRÍCULAS RECENTES ==========
function MatriculasRecentes({ matriculas, onEdit, onDelete, onView }) {
  const getStatusColor = (status) => {
    const colors = {
      'Ativo': 'bg-[#006c49]/10 text-[#006c49]',
      'Inscrito': 'bg-[#006c49]/10 text-[#006c49]',
      'Pendente': 'bg-[#c0c1ff]/30 text-[#040057]',
      'Admitido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Concluído': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Concluido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Cancelado': 'bg-[#ffdad6] text-[#93000a]',
      'Desistente': 'bg-[#ffdad6] text-[#93000a]',
      'Trancado': 'bg-[#c5c6cd]/30 text-[#45474c]'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#eceef0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h3 className="font-semibold text-[#091426] text-sm sm:text-base">Matrículas Recentes</h3>
        <button className="text-xs sm:text-sm text-[#006c49] hover:underline">Ver todas</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="bg-[#eceef0]">
            <tr>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Nome</th>
              <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Curso</th>
              <th className="hidden lg:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Turma</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
              <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c5c6cd]/50">
            {matriculas && matriculas.length > 0 ? (
              matriculas.slice(0, 5).map((student) => (
                <tr key={student.id} className="transition-colors hover:bg-[#f7f9fb]">
                  <td className="px-3 sm:px-6 py-2 sm:py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[10px] sm:text-xs font-bold text-[#091426]">
                        {student.Nome ? student.Nome.split(' ').map(n => n[0]).join('') : '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-[#091426] truncate">{student.Nome}</p>
                        <p className="text-[10px] sm:text-[11px] text-[#45474c]">ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[#45474c] truncate max-w-[100px]">{student.Curso}</td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[#45474c]">{student.Turma}</td>
                  <td className="px-3 sm:px-6 py-2 sm:py-3">
                    <span className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-tighter ${getStatusColor(student.Status)}`}>
                      {student.Status || 'Inscrito'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onView(student)} className="rounded p-1 text-blue-600 hover:bg-blue-50" title="Visualizar">
                        <Eye className="size-3.5 sm:size-4" />
                      </button>
                      <button onClick={() => onEdit(student)} className="rounded p-1 text-green-600 hover:bg-green-50" title="Editar">
                        <Edit className="size-3.5 sm:size-4" />
                      </button>
                      <button onClick={() => onDelete(student.id)} className="rounded p-1 text-red-600 hover:bg-red-50" title="Excluir">
                        <Trash2 className="size-3.5 sm:size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Nenhuma matrícula encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ========== DASHBOARD TAB ==========
function DashboardTab({ stats, matriculas, onEdit, onDelete, onView, crescimento, inscricoesPorCurso, onGeneratePDF }) {
  const colors = ['bg-[#091426]', 'bg-[#006c49]', 'bg-[#006c49]/60', 'bg-[#c5c6cd]', 'bg-[#c5c6cd]/40']

  const inscricoes = inscricoesPorCurso && inscricoesPorCurso.length > 0 
    ? inscricoesPorCurso 
    : [
        { name: 'Gestão de Empresas', value: 0 },
        { name: 'Engenharia Software', value: 0 },
        { name: 'Design & UX', value: 0 },
        { name: 'Direito Académico', value: 0 },
        { name: 'Outros', value: 0 }
      ]

  const maxHeight = crescimento && crescimento.length > 0 
    ? Math.max(...crescimento.map(item => item.total || 0), 1)
    : 140

  const meses = crescimento && crescimento.length > 0 
    ? crescimento 
    : ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'].map(m => ({ mes: m, total: 0 }))

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#091426]">Dashboard Administrativo</h2>
          <p className="text-xs sm:text-sm text-[#45474c] mt-0.5 sm:mt-1">Visão geral do desempenho institucional da Academia Kamatambu.</p>
        </div>
        <button 
          onClick={onGeneratePDF}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          <FileDown className="size-4" />
          Gerar Relatório
        </button>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-[#eceef0] bg-white p-4 sm:p-6 shadow-sm">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#091426]">Crescimento de Matrículas</h4>
              <p className="text-xs sm:text-sm text-[#45474c]">Análise de ingressos nos últimos 6 meses</p>
            </div>
            <select className="rounded-lg border-[#c5c6cd] bg-[#f7f9fb] px-2 sm:px-3 py-1 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
              <option>Semestre Atual</option>
              <option>Ano Inteiro</option>
            </select>
          </div>
          <div className="h-48 sm:h-64 w-full">
            <div className="flex h-full items-end justify-between gap-1 sm:gap-2 px-2 sm:px-4">
              {meses.map((item, index) => {
                const altura = maxHeight > 0 ? (item.total / maxHeight) * 100 : 0
                return (
                  <div key={index} className="flex flex-col items-center gap-1 sm:gap-2 flex-1">
                    <div 
                      className="w-full max-w-8 sm:max-w-12 rounded-lg bg-[#006c49] transition-all hover:bg-[#006c49]/80" 
                      style={{ height: `${Math.max(altura * 0.8, 4)}px` }} 
                    />
                    <span className="text-[8px] sm:text-[10px] font-medium text-[#45474c]">{item.mes}</span>
                    <span className="text-[6px] sm:text-[8px] text-[#45474c]">{item.total}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#eceef0] bg-white p-4 sm:p-6 shadow-sm">
          <h4 className="font-serif text-lg sm:text-xl font-semibold text-[#091426]">Inscrições por Curso</h4>
          <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-[#45474c]">Distribuição de alunos atuais</p>
          <div className="space-y-3 sm:space-y-4">
            {inscricoes.map((item, index) => (
              <div key={index} className="space-y-0.5 sm:space-y-1">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="font-medium truncate">{item.name}</span>
                  <span className="text-[#45474c] shrink-0">{item.value}%</span>
                </div>
                <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-[#eceef0]">
                  <div className={`h-full rounded-full ${colors[index % colors.length]}`} style={{ width: `${Math.min(item.value, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MatriculasRecentes 
        matriculas={matriculas} 
        onEdit={onEdit} 
        onDelete={onDelete}
        onView={onView}
      />
    </div>
  )
}

// ========== MATRÍCULAS TAB ==========
function MatriculasTab({ matriculas, loading, onEdit, onDelete, onView, onCreate, cursosList, turmasList, onGeneratePDF }) {
  const getStatusColor = (status) => {
    const colors = {
      'Ativo': 'bg-[#006c49]/10 text-[#006c49]',
      'Inscrito': 'bg-[#006c49]/10 text-[#006c49]',
      'Pendente': 'bg-[#c0c1ff]/30 text-[#040057]',
      'Admitido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Concluído': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Concluido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Cancelado': 'bg-[#ffdad6] text-[#93000a]',
      'Desistente': 'bg-[#ffdad6] text-[#93000a]',
      'Trancado': 'bg-[#c5c6cd]/30 text-[#45474c]'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#091426]">Matrículas</h2>
          <p className="text-xs sm:text-sm text-[#45474c] mt-0.5 sm:mt-1">Gerencie todas as matrículas da academia.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            <FileDown className="size-4" />
            Gerar PDF
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-4 py-2 text-sm font-medium text-white hover:bg-[#006c49]/90">
            <Plus className="size-4" /> Nova Matrícula
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar matrícula..." className="w-full rounded-lg border border-[#c5c6cd] bg-white py-2 pl-10 pr-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#eceef0]">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Nome</th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Curso</th>
                <th className="hidden lg:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Turma</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd]/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <Loader2 className="size-6 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : matriculas && matriculas.length > 0 ? (
                matriculas.map((student) => (
                  <tr key={student.id} className="transition-colors hover:bg-[#f7f9fb]">
                    <td className="px-3 sm:px-6 py-2 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[10px] sm:text-xs font-bold text-[#091426]">
                          {student.Nome ? student.Nome.split(' ').map(n => n[0]).join('') : '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-[#091426] truncate">{student.Nome}</p>
                          <p className="text-[10px] sm:text-[11px] text-[#45474c]">ID: {student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[#45474c] truncate max-w-[100px]">{student.Curso}</td>
                    <td className="hidden lg:table-cell px-3 sm:px-6 py-2 sm:py-3 text-[#45474c]">{student.Turma}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-3">
                      <span className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[11px] font-bold uppercase tracking-tighter ${getStatusColor(student.Status)}`}>
                        {student.Status || 'Inscrito'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => onView(student)} className="rounded p-1 text-blue-600 hover:bg-blue-50" title="Visualizar">
                          <Eye className="size-3.5 sm:size-4" />
                        </button>
                        <button onClick={() => onEdit(student)} className="rounded p-1 text-green-600 hover:bg-green-50" title="Editar">
                          <Edit className="size-3.5 sm:size-4" />
                        </button>
                        <button onClick={() => onDelete(student.id)} className="rounded p-1 text-red-600 hover:bg-red-50" title="Excluir">
                          <Trash2 className="size-3.5 sm:size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Nenhuma matrícula encontrada</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ========== TURMAS TAB ==========
function TurmasTab({ turmas, loading, onEdit, onDelete, onView, onCreate, cursosList, formadoresList, onGeneratePDF }) {
  const getStatusColor = (status) => {
    const colors = {
      'Ativa': 'bg-[#006c49]/10 text-[#006c49]',
      'Pendente': 'bg-[#c0c1ff]/30 text-[#040057]',
      'Concluída': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Cancelada': 'bg-[#ffdad6] text-[#93000a]'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#091426]">Turmas</h2>
          <p className="text-xs sm:text-sm text-[#45474c] mt-0.5 sm:mt-1">Gerencie todas as turmas da academia.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            <FileDown className="size-4" />
            Gerar PDF
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-4 py-2 text-sm font-medium text-white hover:bg-[#006c49]/90">
            <Plus className="size-4" /> Nova Turma
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar turma..." className="w-full rounded-lg border border-[#c5c6cd] bg-white py-2 pl-10 pr-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2 className="size-8 animate-spin text-[#006c49]" />
          </div>
        ) : turmas && turmas.length > 0 ? (
          turmas.map((turma) => (
            <div key={turma.id} className="rounded-xl border border-[#eceef0] bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-[#091426] text-sm sm:text-base">{turma.Turma}</h3>
                <span className={`rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(turma.Status)}`}>
                  {turma.Status || 'Pendente'}
                </span>
              </div>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p className="text-[#45474c]"><span className="font-medium">Curso:</span> {turma.Curso}</p>
                <p className="text-[#45474c]"><span className="font-medium">Módulo:</span> {turma.Modulo || 1}</p>
                <p className="text-[#45474c]"><span className="font-medium">Período:</span> {turma.Periodo || 'Manhã'}</p>
                <p className="text-[#45474c]"><span className="font-medium">Formador:</span> {turma.Formador || 'Não definido'}</p>
                <p className="text-[#45474c]"><span className="font-medium">Formandos:</span> {turma.Numero_Alunos || 0}</p>
                <p className="text-[#45474c]"><span className="font-medium">Capacidade:</span> {turma.Capacidade_Maxima || 30}</p>
                <p className="text-[#45474c]"><span className="font-medium">Sala:</span> {turma.Sala || 'Não definida'}</p>
              </div>
              <div className="mt-3 sm:mt-4 flex gap-2 border-t border-[#eceef0] pt-3">
                <button onClick={() => onView(turma)} className="flex-1 rounded-lg border border-[#c5c6cd] px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-[#45474c] hover:bg-[#f7f9fb]">Ver</button>
                <button onClick={() => onEdit(turma)} className="rounded-lg border border-[#c5c6cd] p-1.5 text-[#45474c] hover:bg-[#f7f9fb]">
                  <Edit className="size-3.5 sm:size-4" />
                </button>
                <button onClick={() => onDelete(turma.id)} className="rounded-lg border border-[#c5c6cd] p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]">
                  <Trash2 className="size-3.5 sm:size-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">Nenhuma turma encontrada</div>
        )}
      </div>
    </div>
  )
}

// ========== CURSOS TAB ==========
function CursosTab({ cursos, loading, onEdit, onDelete, onView, onCreate, onGeneratePDF }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#091426]">Cursos</h2>
          <p className="text-xs sm:text-sm text-[#45474c] mt-0.5 sm:mt-1">Gerencie todos os cursos da academia.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            <FileDown className="size-4" />
            Gerar PDF
          </button>
          <button 
            onClick={onCreate}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-4 py-2 text-sm font-medium text-white hover:bg-[#006c49]/90"
          >
            <Plus className="size-4" /> Novo Curso
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2 className="size-8 animate-spin text-[#006c49]" />
          </div>
        ) : cursos && cursos.length > 0 ? (
          cursos.map((curso) => (
            <div key={curso.id} className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm transition-all hover:shadow-md">
              <div className="p-4 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-[#091426] text-sm sm:text-base">{curso.Nome}</h3>
                  <span className="rounded-full bg-[#006c49]/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-[#006c49]">
                    {curso.Status || 'Ativo'}
                  </span>
                </div>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                  <p className="text-[#45474c]"><span className="font-medium">Descrição:</span> {curso.Desc || 'Sem descrição'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Tipo:</span> {curso.Tipo_curso || 'Formação profissional inicial'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Módulos:</span> {curso.Modulos || 1}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Edição:</span> {curso.Edicao || '1º'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Duração:</span> {curso.Duracao || 'Não definida'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Carga Horária:</span> {curso.Carga_Horaria ? `${curso.Carga_Horaria} horas` : 'Não definida'}</p>
                </div>
                <div className="mt-3 sm:mt-4 flex gap-2 border-t border-[#eceef0] pt-3">
                  <button onClick={() => onView(curso)} className="flex-1 rounded-lg border border-[#c5c6cd] px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-[#45474c] hover:bg-[#f7f9fb]">Ver</button>
                  <button onClick={() => onEdit(curso)} className="rounded-lg border border-[#c5c6cd] p-1.5 text-[#45474c] hover:bg-[#f7f9fb]">
                    <Edit className="size-3.5 sm:size-4" />
                  </button>
                  <button onClick={() => onDelete(curso.id)} className="rounded-lg border border-[#c5c6cd] p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]">
                    <Trash2 className="size-3.5 sm:size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">Nenhum curso encontrado</div>
        )}
      </div>
    </div>
  )
}

// ========== FORMADORES TAB ==========
function FormadoresTab({ formadores, loading, onEdit, onDelete, onView, onCreate, onGeneratePDF }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#091426]">Formadores</h2>
          <p className="text-xs sm:text-sm text-[#45474c] mt-0.5 sm:mt-1">Gerencie todos os formadores da academia.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            <FileDown className="size-4" />
            Gerar PDF
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-4 py-2 text-sm font-medium text-white hover:bg-[#006c49]/90">
            <Plus className="size-4" /> Novo Formador
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar formador..." className="w-full rounded-lg border border-[#c5c6cd] bg-white py-2 pl-10 pr-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2 className="size-8 animate-spin text-[#006c49]" />
          </div>
        ) : formadores && formadores.length > 0 ? (
          formadores.map((formador) => (
            <div key={formador.id} className="rounded-xl border border-[#eceef0] bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-3 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#006c49]/10 text-[#006c49] font-bold text-xs sm:text-sm">
                    {formador.Nome ? formador.Nome.split(' ').map(n => n[0]).join('') : '?'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#091426] text-sm sm:text-base">{formador.Nome}</h3>
                    <p className="text-[10px] sm:text-xs text-[#45474c] truncate max-w-[100px] sm:max-w-none">{formador.Email}</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#006c49]/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-[#006c49] shrink-0">
                  {formador.Status || 'Ativo'}
                </span>
              </div>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <p className="text-[#45474c]"><span className="font-medium">Especialidade:</span> {formador.Especialidade}</p>
                <p className="text-[#45474c]"><span className="font-medium">Curso:</span> {formador.Curso}</p>
                <p className="text-[#45474c]"><span className="font-medium">Turmas:</span> {formador.Turmas || 0}</p>
                <p className="text-[#45474c]"><span className="font-medium">Gênero:</span> {formador.Genero || 'Não informado'}</p>
                <p className="text-[#45474c]"><span className="font-medium">Telefone:</span> {formador.Telefone || 'Não informado'}</p>
              </div>
              <div className="mt-3 sm:mt-4 flex gap-2 border-t border-[#eceef0] pt-3">
                <button onClick={() => onView(formador)} className="flex-1 rounded-lg border border-[#c5c6cd] px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-[#45474c] hover:bg-[#f7f9fb]">Ver</button>
                <button onClick={() => onEdit(formador)} className="rounded-lg border border-[#c5c6cd] p-1.5 text-[#45474c] hover:bg-[#f7f9fb]">
                  <Edit className="size-3.5 sm:size-4" />
                </button>
                <button onClick={() => onDelete(formador.id)} className="rounded-lg border border-[#c5c6cd] p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]">
                  <Trash2 className="size-3.5 sm:size-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">Nenhum formador encontrado</div>
        )}
      </div>
    </div>
  )
}

// ========== ACCESS DENIED ==========
function AccessDenied() {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f9fb] px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-100 p-4">
            <ShieldAlert className="size-16 text-red-600" />
          </div>
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900">Acesso Negado</h1>
        <p className="mt-3 text-gray-600">Você não tem permissão para acessar esta área. Apenas administradores podem visualizar o dashboard.</p>
        <button onClick={() => router.push('/')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl">
          Voltar para o início
        </button>
      </div>
    </div>
  )
}

// ========== PÁGINA PRINCIPAL ==========
export default function DashboardHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const fileInputRef = useRef(null)
  const certificadoInputRef = useRef(null)

  // Estados para dados
  const [matriculas, setMatriculas] = useState([])
  const [turmas, setTurmas] = useState([])
  const [cursos, setCursos] = useState([])
  const [formadores, setFormadores] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState({ matriculas: false, turmas: false, cursos: false, formadores: false })
  const [crescimento, setCrescimento] = useState([])
  const [inscricoesPorCurso, setInscricoesPorCurso] = useState([])
  
  // Estados para listas (selects)
  const [cursosList, setCursosList] = useState([])
  const [turmasList, setTurmasList] = useState([])
  const [formadoresList, setFormadoresList] = useState([])
  
  // Estados para imagem do aluno
  const [fotoUrl, setFotoUrl] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  // Estados para certificado
  const [certificadoUrl, setCertificadoUrl] = useState(null)
  const [certificadoPreview, setCertificadoPreview] = useState(null)
  const [isUploadingCertificado, setIsUploadingCertificado] = useState(false)

  // Estado para modais
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalData, setModalData] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, type: '' })
  const [toast, setToast] = useState(null)

  // ========== FUNÇÃO DE UPLOAD PARA IMGBB ==========
  const uploadToImgBB = async (base64Image) => {
    try {
      const apiKey = '232f3c0e8a3eb4b401113f5fdcd3be64'
      const formData = new FormData()
      formData.append('image', base64Image)

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data && data.data && data.data.url) {
        return data.data.url
      }
      return null
    } catch (error) {
      console.error('Erro ao fazer upload para ImgBB:', error)
      return null
    }
  }

  // ========== HANDLE FILE UPLOAD - FOTO DO ALUNO ==========
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showToast('Por favor, selecione uma imagem válida', 'error')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast('A imagem deve ter no máximo 5MB', 'error')
      return
    }

    setIsUploading(true)
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(',')[1]
          const imageUrl = await uploadToImgBB(base64String)
          
          if (imageUrl) {
            setFotoUrl(imageUrl)
            setFotoPreview(reader.result)
            showToast('Imagem enviada com sucesso!', 'success')
          } else {
            showToast('Erro ao enviar imagem', 'error')
          }
        } catch (error) {
          console.error('Erro:', error)
          showToast('Erro ao processar imagem', 'error')
        } finally {
          setIsUploading(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Erro:', error)
      showToast('Erro ao processar imagem', 'error')
      setIsUploading(false)
    }
  }

  // ========== HANDLE FILE UPLOAD - CERTIFICADO ==========
  const handleCertificadoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Verificar tipo de arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      showToast('Por favor, selecione uma imagem ou PDF', 'error')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('O arquivo deve ter no máximo 10MB', 'error')
      return
    }

    setIsUploadingCertificado(true)
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(',')[1]
          const fileUrl = await uploadToImgBB(base64String)
          
          if (fileUrl) {
            setCertificadoUrl(fileUrl)
            // Para preview, se for imagem, mostra a imagem; se for PDF, mostra ícone
            if (file.type.startsWith('image/')) {
              setCertificadoPreview(reader.result)
            } else {
              setCertificadoPreview('pdf')
            }
            showToast('Certificado enviado com sucesso!', 'success')
          } else {
            showToast('Erro ao enviar certificado', 'error')
          }
        } catch (error) {
          console.error('Erro:', error)
          showToast('Erro ao processar arquivo', 'error')
        } finally {
          setIsUploadingCertificado(false)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Erro:', error)
      showToast('Erro ao processar arquivo', 'error')
      setIsUploadingCertificado(false)
    }
  }

  // ========== FUNÇÕES DE API ==========
  const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token')
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await fetch(`http://localhost:8080/api${endpoint}`, {
      ...defaultOptions,
      ...options,
      headers: { ...defaultOptions.headers, ...options.headers }
    })
    return response.json()
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }

  // ========== CARREGAR DADOS E LISTAS ==========
  const loadData = async () => {
    try {
      setLoading({ matriculas: true, turmas: true, cursos: true, formadores: true })

      const token = localStorage.getItem('token')

      // Buscar estatísticas do dashboard
      try {
        const statsRes = await fetch('http://localhost:8080/api/stats/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const statsData = await statsRes.json()

        if (statsData.success) {
          setStats(statsData.data.stats || [])
          setCrescimento(statsData.data.crescimento || [])
          setInscricoesPorCurso(statsData.data.inscricoesPorCurso || [])
          setMatriculas(statsData.data.matriculasRecentes || [])
        }
      } catch (statsError) {
        console.error('Erro ao buscar estatísticas:', statsError)
      }

      // Buscar dados principais
      const [matriculasRes, turmasRes, cursosRes, formadoresRes] = await Promise.all([
        apiFetch('/matriculas'),
        apiFetch('/turmas'),
        apiFetch('/cursos'),
        apiFetch('/formadores')
      ])

      if (matriculasRes.success) setMatriculas(matriculasRes.data)
      if (turmasRes.success) setTurmas(turmasRes.data)
      if (cursosRes.success) setCursos(cursosRes.data)
      if (formadoresRes.success) setFormadores(formadoresRes.data)

      // Buscar listas para selects
      try {
        const [cursosListRes, turmasListRes, formadoresListRes] = await Promise.all([
          fetch('http://localhost:8080/api/cursos/lista', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:8080/api/turmas', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:8080/api/formadores/lista', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])

        const cursosListData = await cursosListRes.json()
        const turmasListData = await turmasListRes.json()
        const formadoresListData = await formadoresListRes.json()

        if (cursosListData.success) setCursosList(cursosListData.data)
        if (turmasListData.success) setTurmasList(turmasListData.data)
        if (formadoresListData.success) setFormadoresList(formadoresListData.data)
      } catch (listError) {
        console.error('Erro ao carregar listas:', listError)
      }

    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      showToast('Erro ao carregar dados', 'error')
    } finally {
      setLoading({ matriculas: false, turmas: false, cursos: false, formadores: false })
    }
  }

  // ========== FUNÇÕES PARA GERAR PDF ==========

  // ========== GERAR PDF DOS CURSOS ==========
  const generateCursosPDF = () => {
    if (!cursos || cursos.length === 0) {
      showToast('Nenhum curso encontrado para gerar PDF', 'warning')
      return
    }

    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()
      
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('Academia Kamatambu', pageWidth / 2, 20, { align: 'center' })
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('Centro de Formação Profissional', pageWidth / 2, 28, { align: 'center' })
      
      doc.setDrawColor(10, 20, 40)
      doc.setLineWidth(0.5)
      doc.line(14, 35, pageWidth - 14, 35)
      
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('RELATÓRIO DE CURSOS', pageWidth / 2, 45, { align: 'center' })
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      const dataAtual = new Date().toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      doc.text(`Emissão: ${dataAtual}`, pageWidth - 20, 52, { align: 'right' })
      doc.text(`Total de Cursos: ${cursos.length}`, 20, 52, { align: 'left' })
      
      const tableData = cursos.map((curso, index) => [
        index + 1,
        curso.Nome || '-',
        curso.Desc || 'Sem descrição',
        curso.Tipo_curso || 'Formação profissional inicial',
        curso.Modulos || 1,
        curso.Edicao || '1º',
        curso.Duracao || 'Não definida',
        curso.Carga_Horaria ? `${curso.Carga_Horaria}h` : 'Não definida',
        curso.Status || 'Ativo'
      ])

      autoTable(doc, {
        startY: 58,
        head: [['Nº', 'Nome do Curso', 'Descrição', 'Tipo', 'Módulos', 'Edição', 'Duração', 'Carga Horária', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [10, 20, 40],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          fontSize: 7,
          cellPadding: 2,
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 35 },
          2: { cellWidth: 40 },
          3: { cellWidth: 20 },
          4: { cellWidth: 15 },
          5: { cellWidth: 15 },
          6: { cellWidth: 20 },
          7: { cellWidth: 20 },
          8: { cellWidth: 18 }
        }
      })

      const finalY = doc.lastAutoTable.finalY + 10
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        'Documento gerado automaticamente pela plataforma Academia Kamatambu',
        pageWidth / 2,
        finalY,
        { align: 'center' }
      )
      
      doc.save('cursos_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      showToast('Erro ao gerar PDF', 'error')
    }
  }

  // ========== GERAR PDF DE MATRÍCULAS ==========
  const generateMatriculasPDF = () => {
    if (!matriculas || matriculas.length === 0) {
      showToast('Nenhuma matrícula encontrada para gerar PDF', 'warning')
      return
    }

    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()
      
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('Academia Kamatambu', pageWidth / 2, 20, { align: 'center' })
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('Centro de Formação Profissional', pageWidth / 2, 28, { align: 'center' })
      
      doc.setDrawColor(10, 20, 40)
      doc.setLineWidth(0.5)
      doc.line(14, 35, pageWidth - 14, 35)
      
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('RELATÓRIO DE MATRÍCULAS', pageWidth / 2, 45, { align: 'center' })
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      const dataAtual = new Date().toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      doc.text(`Emissão: ${dataAtual}`, pageWidth - 20, 52, { align: 'right' })
      doc.text(`Total de Matrículas: ${matriculas.length}`, 20, 52, { align: 'left' })
      
      const tableData = matriculas.map((matricula, index) => [
        index + 1,
        matricula.Nome || '-',
        matricula.Curso || '-',
        matricula.Turma || '-',
        matricula.Modulo || 1,
        matricula.Status || 'Inscrito',
        matricula.Data_Matricula ? new Date(matricula.Data_Matricula).toLocaleDateString('pt-PT') : '-',
        matricula.BI_Cedula ? '✓' : '✗',
        matricula.Foto_Certificado ? '✓' : '✗'
      ])

      autoTable(doc, {
        startY: 58,
        head: [['Nº', 'Nome', 'Curso', 'Turma', 'Módulo', 'Status', 'Data Matrícula', 'BI', 'Certificado']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [10, 20, 40],
          textColor: [255, 255, 255],
          fontSize: 7,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          fontSize: 6.5,
          cellPadding: 1.5,
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 8 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 20 },
          4: { cellWidth: 12 },
          5: { cellWidth: 15 },
          6: { cellWidth: 20 },
          7: { cellWidth: 10 },
          8: { cellWidth: 10 }
        }
      })

      const finalY = doc.lastAutoTable.finalY + 10
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        'Documento gerado automaticamente pela plataforma Academia Kamatambu',
        pageWidth / 2,
        finalY,
        { align: 'center' }
      )
      
      doc.save('matriculas_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      showToast('Erro ao gerar PDF', 'error')
    }
  }

  // ========== GERAR PDF DE TURMAS ==========
  const generateTurmasPDF = () => {
    if (!turmas || turmas.length === 0) {
      showToast('Nenhuma turma encontrada para gerar PDF', 'warning')
      return
    }

    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()
      
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('Academia Kamatambu', pageWidth / 2, 20, { align: 'center' })
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('Centro de Formação Profissional', pageWidth / 2, 28, { align: 'center' })
      
      doc.setDrawColor(10, 20, 40)
      doc.setLineWidth(0.5)
      doc.line(14, 35, pageWidth - 14, 35)
      
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('RELATÓRIO DE TURMAS', pageWidth / 2, 45, { align: 'center' })
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      const dataAtual = new Date().toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      doc.text(`Emissão: ${dataAtual}`, pageWidth - 20, 52, { align: 'right' })
      doc.text(`Total de Turmas: ${turmas.length}`, 20, 52, { align: 'left' })
      
      const tableData = turmas.map((turma, index) => [
        index + 1,
        turma.Turma || '-',
        turma.Curso || '-',
        turma.Modulo || 1,
        turma.Periodo || 'Manhã',
        turma.Formador || 'Não definido',
        turma.Numero_Alunos || 0,
        turma.Capacidade_Maxima || 30,
        turma.Status || 'Pendente'
      ])

      autoTable(doc, {
        startY: 58,
        head: [['Nº', 'Turma', 'Curso', 'Módulo', 'Período', 'Formador', 'Alunos', 'Capacidade', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [10, 20, 40],
          textColor: [255, 255, 255],
          fontSize: 7,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          fontSize: 6.5,
          cellPadding: 2,
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 25 },
          2: { cellWidth: 30 },
          3: { cellWidth: 15 },
          4: { cellWidth: 15 },
          5: { cellWidth: 25 },
          6: { cellWidth: 15 },
          7: { cellWidth: 18 },
          8: { cellWidth: 18 }
        }
      })

      const finalY = doc.lastAutoTable.finalY + 10
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        'Documento gerado automaticamente pela plataforma Academia Kamatambu',
        pageWidth / 2,
        finalY,
        { align: 'center' }
      )
      
      doc.save('turmas_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      showToast('Erro ao gerar PDF', 'error')
    }
  }

  // ========== GERAR PDF DE FORMADORES ==========
  const generateFormadoresPDF = () => {
    if (!formadores || formadores.length === 0) {
      showToast('Nenhum formador encontrado para gerar PDF', 'warning')
      return
    }

    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()
      
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('Academia Kamatambu', pageWidth / 2, 20, { align: 'center' })
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('Centro de Formação Profissional', pageWidth / 2, 28, { align: 'center' })
      
      doc.setDrawColor(10, 20, 40)
      doc.setLineWidth(0.5)
      doc.line(14, 35, pageWidth - 14, 35)
      
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('RELATÓRIO DE FORMADORES', pageWidth / 2, 45, { align: 'center' })
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      const dataAtual = new Date().toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      doc.text(`Emissão: ${dataAtual}`, pageWidth - 20, 52, { align: 'right' })
      doc.text(`Total de Formadores: ${formadores.length}`, 20, 52, { align: 'left' })
      
      const tableData = formadores.map((formador, index) => [
        index + 1,
        formador.Nome || '-',
        formador.Email || '-',
        formador.Telefone || '-',
        formador.Especialidade || '-',
        formador.Curso || '-',
        formador.Turmas || 0,
        formador.Status || 'Ativo'
      ])

      autoTable(doc, {
        startY: 58,
        head: [['Nº', 'Nome', 'Email', 'Telefone', 'Especialidade', 'Curso', 'Turmas', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [10, 20, 40],
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          fontSize: 7,
          cellPadding: 2,
          halign: 'center'
        },
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 35 },
          2: { cellWidth: 45 },
          3: { cellWidth: 25 },
          4: { cellWidth: 30 },
          5: { cellWidth: 30 },
          6: { cellWidth: 15 },
          7: { cellWidth: 18 }
        }
      })

      const finalY = doc.lastAutoTable.finalY + 10
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        'Documento gerado automaticamente pela plataforma Academia Kamatambu',
        pageWidth / 2,
        finalY,
        { align: 'center' }
      )
      
      doc.save('formadores_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      showToast('Erro ao gerar PDF', 'error')
    }
  }

  // ========== GERAR RELATÓRIO GERAL ==========
  const generateRelatorioGeral = () => {
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()
      
      doc.setFontSize(22)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('Academia Kamatambu', pageWidth / 2, 20, { align: 'center' })
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('Centro de Formação Profissional', pageWidth / 2, 28, { align: 'center' })
      
      doc.setDrawColor(10, 20, 40)
      doc.setLineWidth(0.5)
      doc.line(14, 35, pageWidth - 14, 35)
      
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('RELATÓRIO GERAL', pageWidth / 2, 45, { align: 'center' })
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      const dataAtual = new Date().toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      doc.text(`Emissão: ${dataAtual}`, pageWidth - 20, 52, { align: 'right' })
      
      // Resumo
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(10, 20, 40)
      doc.text('Resumo Geral', 14, 62)
      
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(60, 60, 60)
      doc.text(`Total de Matrículas: ${matriculas?.length || 0}`, 14, 72)
      doc.text(`Total de Turmas: ${turmas?.length || 0}`, 14, 80)
      doc.text(`Total de Cursos: ${cursos?.length || 0}`, 14, 88)
      doc.text(`Total de Formadores: ${formadores?.length || 0}`, 14, 96)
      
      let startY = 102
      
      // Matrículas
      if (matriculas && matriculas.length > 0) {
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(10, 20, 40)
        doc.text('Matrículas', 14, startY)
        
        const matriculasData = matriculas.slice(0, 15).map((m, i) => [
          i + 1,
          m.Nome || '-',
          m.Curso || '-',
          m.Turma || '-',
          m.Status || 'Inscrito'
        ])
        
        autoTable(doc, {
          startY: startY + 4,
          head: [['Nº', 'Nome', 'Curso', 'Turma', 'Status']],
          body: matriculasData,
          theme: 'striped',
          headStyles: {
            fillColor: [10, 20, 40],
            textColor: [255, 255, 255],
            fontSize: 7,
            fontStyle: 'bold',
            halign: 'center'
          },
          styles: {
            fontSize: 6.5,
            cellPadding: 1.5,
            halign: 'center'
          },
          columnStyles: {
            0: { cellWidth: 8 },
            1: { cellWidth: 35 },
            2: { cellWidth: 30 },
            3: { cellWidth: 25 },
            4: { cellWidth: 18 }
          }
        })
        
        startY = doc.lastAutoTable.finalY + 8
      }
      
      // Cursos
      if (cursos && cursos.length > 0) {
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(10, 20, 40)
        doc.text('Cursos', 14, startY)
        
        const cursosData = cursos.slice(0, 10).map((c, i) => [
          i + 1,
          c.Nome || '-',
          c.Tipo_curso || 'Formação profissional inicial',
          c.Modulos || 1,
          c.Status || 'Ativo'
        ])
        
        autoTable(doc, {
          startY: startY + 4,
          head: [['Nº', 'Nome', 'Tipo', 'Módulos', 'Status']],
          body: cursosData,
          theme: 'striped',
          headStyles: {
            fillColor: [10, 20, 40],
            textColor: [255, 255, 255],
            fontSize: 7,
            fontStyle: 'bold',
            halign: 'center'
          },
          styles: {
            fontSize: 6.5,
            cellPadding: 1.5,
            halign: 'center'
          },
          columnStyles: {
            0: { cellWidth: 8 },
            1: { cellWidth: 45 },
            2: { cellWidth: 25 },
            3: { cellWidth: 18 },
            4: { cellWidth: 20 }
          }
        })
        
        startY = doc.lastAutoTable.finalY + 8
      }
      
      // Rodapé
      const finalY = Math.max(startY + 4, doc.internal.pageSize.getHeight() - 20)
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text(
        'Documento gerado automaticamente pela plataforma Academia Kamatambu',
        pageWidth / 2,
        finalY,
        { align: 'center' }
      )
      
      doc.save('relatorio_geral_academia_kamatambu.pdf')
      showToast('Relatório geral gerado com sucesso!', 'success')
      
    } catch (error) {
      console.error('Erro ao gerar relatório:', error)
      showToast('Erro ao gerar relatório', 'error')
    }
  }

  // ========== CRUD OPERATIONS ==========
  const handleCreate = async (data, type) => {
    setModalLoading(true)
    try {
      if (fotoUrl) {
        data.Foto_User = fotoUrl
      }
      if (certificadoUrl) {
        data.Foto_Certificado = certificadoUrl
      }

      const response = await apiFetch(`/${type}`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      if (response.success) {
        showToast(`${type.slice(0, -1)} criado com sucesso!`, 'success')
        setModalOpen(false)
        setFotoUrl(null)
        setFotoPreview(null)
        setCertificadoUrl(null)
        setCertificadoPreview(null)
        loadData()
      } else {
        showToast(response.message || 'Erro ao criar', 'error')
      }
    } catch (error) {
      showToast('Erro ao criar', 'error')
    } finally {
      setModalLoading(false)
    }
  }

  const handleUpdate = async (id, data, type) => {
    setModalLoading(true)
    try {
      if (fotoUrl) {
        data.Foto_User = fotoUrl
      }
      if (certificadoUrl) {
        data.Foto_Certificado = certificadoUrl
      }

      const response = await apiFetch(`/${type}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      if (response.success) {
        showToast(`${type.slice(0, -1)} atualizado com sucesso!`, 'success')
        setModalOpen(false)
        setFotoUrl(null)
        setFotoPreview(null)
        setCertificadoUrl(null)
        setCertificadoPreview(null)
        loadData()
      } else {
        showToast(response.message || 'Erro ao atualizar', 'error')
      }
    } catch (error) {
      showToast('Erro ao atualizar', 'error')
    } finally {
      setModalLoading(false)
    }
  }

  const handleDelete = async () => {
    const { id, type } = confirmModal
    setModalLoading(true)
    try {
      const response = await apiFetch(`/${type}/${id}`, {
        method: 'DELETE'
      })
      if (response.success) {
        showToast(`${type.slice(0, -1)} deletado com sucesso!`, 'success')
        setConfirmModal({ open: false, id: null, type: '' })
        loadData()
      } else {
        showToast(response.message || 'Erro ao deletar', 'error')
      }
    } catch (error) {
      showToast('Erro ao deletar', 'error')
    } finally {
      setModalLoading(false)
    }
  }

  // ========== VERIFICAR ADMIN ==========
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/login')
          setIsChecking(false)
          return
        }

        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          if (user.eAdmin === true) {
            setIsAdmin(true)
            await loadData()
          } else {
            setIsAdmin(false)
          }
        } else {
          const response = await fetch('http://localhost:8080/auth/validar_token', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          if (response.ok) {
            const data = await response.json()
            if (data.user && data.user.eAdmin === true) {
              setIsAdmin(true)
              localStorage.setItem('user', JSON.stringify(data.user))
              await loadData()
            } else {
              setIsAdmin(false)
            }
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push('/auth/login')
          }
        }
        setIsChecking(false)
      } catch (error) {
        console.error('Erro ao verificar permissões:', error)
        setIsChecking(false)
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAdminAccess()
  }, [router])

  // ========== HANDLERS ==========
  const handleOpenModal = (type, data = null) => {
    setModalType(type)
    setModalData(data)
    setFotoUrl(null)
    setFotoPreview(null)
    setCertificadoUrl(null)
    setCertificadoPreview(null)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setModalData(null)
    setFotoUrl(null)
    setFotoPreview(null)
    setCertificadoUrl(null)
    setCertificadoPreview(null)
  }

  const handleConfirmDelete = (id, type) => {
    setConfirmModal({ open: true, id, type })
  }

  if (isLoading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fb]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#006c49] border-t-transparent" />
      </div>
    )
  }

  if (!isAdmin) {
    return <AccessDenied />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab 
          stats={stats} 
          matriculas={matriculas} 
          onEdit={(data) => handleOpenModal('matriculas', data)} 
          onDelete={(id) => handleConfirmDelete(id, 'matriculas')} 
          onView={(data) => handleOpenModal('view', data)}
          crescimento={crescimento}
          inscricoesPorCurso={inscricoesPorCurso}
          onGeneratePDF={generateRelatorioGeral}
        />
      case 'matriculas':
        return <MatriculasTab 
          matriculas={matriculas} 
          loading={loading.matriculas}
          onEdit={(data) => handleOpenModal('matriculas', data)}
          onDelete={(id) => handleConfirmDelete(id, 'matriculas')}
          onView={(data) => handleOpenModal('view', data)}
          onCreate={() => handleOpenModal('matriculas')}
          cursosList={cursosList}
          turmasList={turmasList}
          onGeneratePDF={generateMatriculasPDF}
        />
      case 'turmas':
        return <TurmasTab 
          turmas={turmas} 
          loading={loading.turmas}
          onEdit={(data) => handleOpenModal('turmas', data)}
          onDelete={(id) => handleConfirmDelete(id, 'turmas')}
          onView={(data) => handleOpenModal('view', data)}
          onCreate={() => handleOpenModal('turmas')}
          cursosList={cursosList}
          formadoresList={formadoresList}
          onGeneratePDF={generateTurmasPDF}
        />
      case 'cursos':
        return <CursosTab 
          cursos={cursos} 
          loading={loading.cursos}
          onEdit={(data) => handleOpenModal('cursos', data)}
          onDelete={(id) => handleConfirmDelete(id, 'cursos')}
          onView={(data) => handleOpenModal('view', data)}
          onCreate={() => handleOpenModal('cursos')}
          onGeneratePDF={generateCursosPDF}
        />
      case 'formadores':
        return <FormadoresTab 
          formadores={formadores} 
          loading={loading.formadores}
          onEdit={(data) => handleOpenModal('formadores', data)}
          onDelete={(id) => handleConfirmDelete(id, 'formadores')}
          onView={(data) => handleOpenModal('view', data)}
          onCreate={() => handleOpenModal('formadores')}
          onGeneratePDF={generateFormadoresPDF}
        />
      default:
        return <DashboardTab 
          stats={stats} 
          matriculas={matriculas} 
          onEdit={(data) => handleOpenModal('matriculas', data)} 
          onDelete={(id) => handleConfirmDelete(id, 'matriculas')} 
          onView={(data) => handleOpenModal('view', data)}
          crescimento={crescimento}
          inscricoesPorCurso={inscricoesPorCurso}
          onGeneratePDF={generateRelatorioGeral}
        />
    }
  }

  return (
    <div className="flex min-h-screen bg-[#f7f9fb]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 p-3 sm:p-4 lg:p-8">
          <div className="mx-auto max-w-[1440px] space-y-4 sm:space-y-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <ConfirmModal isOpen={confirmModal.open} onClose={() => setConfirmModal({ open: false, id: null, type: '' })} onConfirm={handleDelete} title="Confirmar exclusão" message={`Tem certeza que deseja excluir este ${confirmModal.type ? confirmModal.type.slice(0, -1) : 'item'}? Esta ação não pode ser desfeita.`} isLoading={modalLoading} />

      <FormModal isOpen={modalOpen} onClose={handleCloseModal} title={modalData ? `Editar ${modalType.slice(0, -1)}` : `Novo ${modalType.slice(0, -1)}`} onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        if (modalData) {
          handleUpdate(modalData.id, data, modalType)
        } else {
          handleCreate(data, modalType)
        }
      }} isLoading={modalLoading}>
        {modalType === 'matriculas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dados Pessoais */}
            <div>
              <label className="text-sm font-medium text-gray-700">Nome *</label>
              <input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Gênero *</label>
              <select name="Genero" defaultValue={modalData?.Genero} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Telefone *</label>
              <input name="Telefone" defaultValue={modalData?.Telefone} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Curso *</label>
              <select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required>
                <option value="">Selecione um curso</option>
                {cursosList && cursosList.length > 0 ? (
                  cursosList.map(curso => (
                    <option key={curso.id} value={curso.Nome}>{curso.Nome}</option>
                  ))
                ) : (
                  <option value="" disabled>Nenhum curso cadastrado</option>
                )}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Turma *</label>
              <select name="Turma" defaultValue={modalData?.Turma} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required>
                <option value="">Selecione uma turma</option>
                {turmasList && turmasList.length > 0 ? (
                  turmasList.map(turma => (
                    <option key={turma.id} value={turma.Turma}>{turma.Turma}</option>
                  ))
                ) : (
                  <option value="" disabled>Nenhuma turma cadastrada</option>
                )}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Módulo</label>
              <input type="number" name="Modulo" defaultValue={modalData?.Modulo || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Encarregado</label>
              <input name="Encarregado" defaultValue={modalData?.Encarregado} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Estado Civil</label>
              <select name="Estado_Civil" defaultValue={modalData?.Estado_Civil || 'Solteiro'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viúvo">Viúvo</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Morada</label>
              <input name="Morada" defaultValue={modalData?.Morada} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Nº BI/Cédula *</label>
              <input name="BI_Cedula" defaultValue={modalData?.BI_Cedula} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Data de Nascimento</label>
              <input type="date" name="Nascimento" defaultValue={modalData?.Nascimento} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="Status" defaultValue={modalData?.Status || 'Inscrito'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="Inscrito">Inscrito</option>
                <option value="Admitido">Admitido</option>
                <option value="Desistente">Desistente</option>
                <option value="Concluido">Concluído</option>
                <option value="Ativo">Ativo</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Data de Matrícula</label>
              <input type="date" name="Data_Matricula" defaultValue={modalData?.Data_Matricula || new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>

            {/* Validação de Documentos */}
            <div className="col-span-full border-t border-gray-200 pt-4 mt-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Validação de Documentos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* BI/Cédula */}
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IdCard className="size-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">BI/Cédula</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      modalData?.BI_Cedula ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {modalData?.BI_Cedula ? (
                        <>
                          <Check className="size-3" /> Verificado
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="size-3" /> Pendente
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {modalData?.BI_Cedula ? `Nº: ${modalData.BI_Cedula}` : 'Nenhum documento enviado'}
                  </p>
                  {modalData?.BI_Cedula && (
                    <button 
                      type="button"
                      onClick={() => window.open(modalData.BI_Cedula, '_blank')}
                      className="mt-1 text-xs text-primary hover:underline"
                    >
                      Visualizar documento
                    </button>
                  )}
                </div>

                {/* Certificado */}
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="size-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Certificado</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                      modalData?.Foto_Certificado ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {modalData?.Foto_Certificado ? (
                        <>
                          <Check className="size-3" /> Verificado
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="size-3" /> Pendente
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {modalData?.Foto_Certificado ? 'Documento enviado' : 'Nenhum documento enviado'}
                  </p>
                  {modalData?.Foto_Certificado && (
                    <button 
                      type="button"
                      onClick={() => window.open(modalData.Foto_Certificado, '_blank')}
                      className="mt-1 text-xs text-primary hover:underline"
                    >
                      Visualizar documento
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Upload da Foto do Aluno */}
            <div className="col-span-full">
              <label className="text-sm font-medium text-gray-700">Foto do Aluno</label>
              <div className="mt-1 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Upload className="size-4" />
                  {isUploading ? 'Enviando...' : 'Escolher imagem'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    ref={fileInputRef} 
                    className="hidden" 
                    disabled={isUploading}
                  />
                </label>
                {isUploading && <Loader2 className="size-5 animate-spin text-primary" />}
                {(fotoPreview || modalData?.Foto_User) && (
                  <div className="flex items-center gap-2">
                    <img 
                      src={fotoPreview || modalData?.Foto_User} 
                      alt="Preview" 
                      className="h-12 w-12 rounded-full object-cover border-2 border-gray-200" 
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setFotoUrl(null)
                        setFotoPreview(null)
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
              {modalData?.Foto_User && !fotoPreview && (
                <p className="text-xs text-gray-500 mt-1">Imagem atual: <a href={modalData.Foto_User} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ver imagem</a></p>
              )}
            </div>

            {/* Upload do Certificado */}
            <div className="col-span-full">
              <label className="text-sm font-medium text-gray-700">Certificado (PDF ou Imagem) *</label>
              <div className="mt-1 flex items-center gap-4">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Upload className="size-4" />
                  {isUploadingCertificado ? 'Enviando...' : 'Escolher arquivo'}
                  <input 
                    type="file" 
                    accept="image/*,application/pdf" 
                    onChange={handleCertificadoUpload} 
                    ref={certificadoInputRef} 
                    className="hidden" 
                    disabled={isUploadingCertificado}
                  />
                </label>
                {isUploadingCertificado && <Loader2 className="size-5 animate-spin text-primary" />}
                {(certificadoPreview || modalData?.Foto_Certificado) && (
                  <div className="flex items-center gap-2">
                    {certificadoPreview && certificadoPreview.startsWith('data:image') ? (
                      <img 
                        src={certificadoPreview} 
                        alt="Certificado" 
                        className="h-12 w-12 object-cover border-2 border-gray-200 rounded" 
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded border-2 border-gray-200 bg-gray-50">
                        <FileText className="size-6 text-gray-500" />
                      </div>
                    )}
                    <button 
                      type="button"
                      onClick={() => {
                        setCertificadoUrl(null)
                        setCertificadoPreview(null)
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
              {modalData?.Foto_Certificado && !certificadoPreview && (
                <p className="text-xs text-gray-500 mt-1">Certificado atual: <a href={modalData.Foto_Certificado} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ver arquivo</a></p>
              )}
            </div>
          </div>
        )}

        {modalType === 'turmas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Turma *</label>
              <input name="Turma" defaultValue={modalData?.Turma} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Curso *</label>
              <select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required>
                <option value="">Selecione um curso</option>
                {cursosList && cursosList.length > 0 ? (
                  cursosList.map(curso => (
                    <option key={curso.id} value={curso.Nome}>{curso.Nome}</option>
                  ))
                ) : (
                  <option value="" disabled>Nenhum curso cadastrado</option>
                )}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Módulo</label>
              <input type="number" name="Modulo" defaultValue={modalData?.Modulo || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Período</label>
              <select name="Periodo" defaultValue={modalData?.Periodo || 'Manhã'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Formador</label>
              <select name="Formador" defaultValue={modalData?.Formador} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="">Selecione um formador</option>
                {formadoresList && formadoresList.length > 0 ? (
                  formadoresList.map(formador => (
                    <option key={formador.id} value={formador.Nome}>{formador.Nome}</option>
                  ))
                ) : (
                  <option value="" disabled>Nenhum formador disponível</option>
                )}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Capacidade Máxima</label>
              <input type="number" name="Capacidade_Maxima" defaultValue={modalData?.Capacidade_Maxima || 30} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Data Início *</label>
              <input type="date" name="Data_INIC" defaultValue={modalData?.Data_INIC} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Data Término *</label>
              <input type="date" name="Data_Term" defaultValue={modalData?.Data_Term} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Sala</label>
              <input name="Sala" defaultValue={modalData?.Sala} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="Status" defaultValue={modalData?.Status || 'Pendente'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="Pendente">Pendente</option>
                <option value="Ativa">Ativa</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        )}

        {modalType === 'cursos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nome *</label>
              <input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div className="col-span-full">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea name="Desc" defaultValue={modalData?.Desc} rows="3" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Tipo</label>
              <select name="Tipo_curso" defaultValue={modalData?.Tipo_curso || 'Formação profissional inicial'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="Formação profissional inicial">Formação profissional inicial</option>
                <option value="Formação profissional continua">Formação profissional continua</option>
                <option value="Formação profissional de dupla Certificação">Formação profissional de dupla Certificação</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Módulos</label>
              <input type="number" name="Modulos" defaultValue={modalData?.Modulos || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Edição</label>
              <select name="Edicao" defaultValue={modalData?.Edicao || '1º'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                {['1º','2º','3º','4º','5º','6º','7º','8º','9º','10º'].map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Duração</label>
              <input name="Duracao" defaultValue={modalData?.Duracao} placeholder="Ex: 6 meses" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Carga Horária (horas)</label>
              <input type="number" name="Carga_Horaria" defaultValue={modalData?.Carga_Horaria} placeholder="Ex: 120" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="Status" defaultValue={modalData?.Status || 'Ativo'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Em desenvolvimento">Em desenvolvimento</option>
              </select>
            </div>
          </div>
        )}

        {modalType === 'formadores' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nome *</label>
              <input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input type="email" name="Email" defaultValue={modalData?.Email} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Telefone *</label>
              <input name="Telefone" defaultValue={modalData?.Telefone} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Especialidade *</label>
              <input name="Especialidade" defaultValue={modalData?.Especialidade} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Curso *</label>
              <select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required>
                <option value="">Selecione um curso</option>
                {cursosList && cursosList.length > 0 ? (
                  cursosList.map(curso => (
                    <option key={curso.id} value={curso.Nome}>{curso.Nome}</option>
                  ))
                ) : (
                  <option value="" disabled>Nenhum curso cadastrado</option>
                )}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Gênero *</label>
              <select name="Genero" defaultValue={modalData?.Genero} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" required>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Turmas</label>
              <input type="number" name="Turmas" defaultValue={modalData?.Turmas || 0} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="Status" defaultValue={modalData?.Status || 'Ativo'} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Férias">Férias</option>
                <option value="Afastado">Afastado</option>
              </select>
            </div>
          </div>
        )}
      </FormModal>

      <ViewModal 
        isOpen={modalOpen && modalType === 'view'} 
        onClose={handleCloseModal} 
        data={modalData} 
        type={activeTab === 'dashboard' ? 'matriculas' : activeTab === 'turmas' ? 'turmas' : activeTab === 'cursos' ? 'cursos' : activeTab === 'formadores' ? 'formadores' : 'matriculas'} 
      />
    </div>
  )
}