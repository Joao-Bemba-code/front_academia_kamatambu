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
  FileDown
} from 'lucide-react'

// ========== URL BASE DA API ==========
const API_BASE_URL = 'https://back-kamatambu-1.onrender.com'

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
    success: <CheckCircle className="size-4 sm:size-5 text-green-500" />,
    error: <AlertCircle className="size-4 sm:size-5 text-red-500" />,
    warning: <AlertCircle className="size-4 sm:size-5 text-yellow-500" />,
    info: <Info className="size-4 sm:size-5 text-blue-500" />
  }

  return (
    <div className={`fixed top-16 sm:top-20 right-2 sm:right-4 z-50 flex items-center gap-2 sm:gap-3 rounded-xl border-l-4 p-3 sm:p-4 shadow-lg ${colors[type]} max-w-[90vw] sm:max-w-sm animate-fade-in`}>
      {icons[type]}
      <span className="text-xs sm:text-sm font-medium flex-1">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="size-3 sm:size-4" />
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

  const renderMatriculaDetails = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10 shrink-0">
          {data.Foto_User ? (
            <img src={data.Foto_User} alt={data.Nome} className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover" />
          ) : (
            <UserCircle className="size-10 sm:size-12 text-primary" />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.Nome}</h3>
          <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.Status)}`}>
            {data.Status || 'Inscrito'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Nome Completo</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Nome}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Encarregado</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Encarregado || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">BI/Cédula</p>
          <p className="text-sm sm:text-base text-gray-900">{data.BI_Cedula || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Nascimento</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Nascimento ? new Date(data.Nascimento).toLocaleDateString('pt-PT') : 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Civil</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Estado_Civil || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Genero || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Morada</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Morada || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <Smartphone className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Telefone || 'Não informado'}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <BookOpen className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Curso}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Turma</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2">
            <UsersIcon className="size-3 sm:size-4 text-gray-400 shrink-0" />
            {data.Turma}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Módulo</p>
          <p className="text-sm sm:text-base text-gray-900">Módulo {data.Modulo || 1}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.Status)}`}>
            {data.Status || 'Inscrito'}
          </span>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Certificado</p>
          <div className="flex items-center gap-2">
            {data.Foto_Certificado ? (
              <a href={data.Foto_Certificado} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-primary hover:underline flex items-center gap-1">
                <FileText className="size-3 sm:size-4" />
                Ver Certificado
              </a>
            ) : (
              <span className="text-sm sm:text-base text-gray-500">Não informado</span>
            )}
          </div>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Matrícula</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2">
            <Clock className="size-3 sm:size-4 text-gray-400 shrink-0" />
            {data.Data_Matricula ? new Date(data.Data_Matricula).toLocaleDateString('pt-PT') : 'Não informado'}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</p>
          <p className="text-sm sm:text-base text-gray-900">{data.createdAt ? new Date(data.createdAt).toLocaleString('pt-PT') : 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Atualizado em</p>
          <p className="text-sm sm:text-base text-gray-900">{data.updatedAt ? new Date(data.updatedAt).toLocaleString('pt-PT') : 'Não informado'}</p>
        </div>
      </div>
    </div>
  )

  const renderTurmaDetails = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.Turma}</h3>
        <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.Status)}`}>
          {data.Status || 'Pendente'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <BookOpen className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Curso}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Módulo</p>
          <p className="text-sm sm:text-base text-gray-900">Módulo {data.Modulo || 1}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Período</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2">
            <Clock className="size-3 sm:size-4 text-gray-400 shrink-0" />
            {data.Periodo || 'Manhã'}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formador</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Formador || 'Não definido'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formandos</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2">
            <UsersIcon className="size-3 sm:size-4 text-gray-400 shrink-0" />
            {data.Numero_Alunos || 0}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Capacidade_Maxima || 30}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data Início</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2">
            <Calendar className="size-3 sm:size-4 text-gray-400 shrink-0" />
            {data.Data_INIC ? new Date(data.Data_INIC).toLocaleDateString('pt-PT') : 'Não definido'}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data Término</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2">
            <Calendar className="size-3 sm:size-4 text-gray-400 shrink-0" />
            {data.Data_Term ? new Date(data.Data_Term).toLocaleDateString('pt-PT') : 'Não definido'}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Sala || 'Não definida'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.Status)}`}>
            {data.Status || 'Pendente'}
          </span>
        </div>
      </div>
    </div>
  )

  const renderCursoDetails = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{data.Nome}</h3>
        <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
        <span className="inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
          {data.Status || 'Ativo'}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1 col-span-full">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Desc || 'Sem descrição'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Tipo_curso || 'Técnico'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Módulos</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Modulos || 1}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Edição</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Edicao || '1º'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Duração</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <Clock className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Duracao || 'Não definida'}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Carga Horária</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Carga_Horaria ? `${data.Carga_Horaria} horas` : 'Não definida'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Valor do Curso</p>
          <p className="text-sm sm:text-base text-gray-900">
            {data.Valor_curso ? `Kz ${parseFloat(data.Valor_curso).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` : 'Não definido'}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className="inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
            {data.Status || 'Ativo'}
          </span>
        </div>
      </div>
    </div>
  )

  const renderFormadorDetails = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/10 shrink-0">
          {data.Foto ? (
            <img src={data.Foto} alt={data.Nome} className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover" />
          ) : (
            <UserCircle className="size-10 sm:size-12 text-primary" />
          )}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{data.Nome}</h3>
          <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
          <span className="inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
            {data.Status || 'Ativo'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <Mail className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Email}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <Smartphone className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Telefone || 'Não informado'}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidade</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <Award className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Especialidade}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2 break-words">
            <BookOpen className="size-3 sm:size-4 text-gray-400 shrink-0" />
            <span className="break-words">{data.Curso}</span>
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Turmas</p>
          <p className="text-sm sm:text-base text-gray-900 flex items-center gap-2">
            <UsersIcon className="size-3 sm:size-4 text-gray-400 shrink-0" />
            {data.Turmas || 0}
          </p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Genero || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className="inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-[#006c49]/10 text-[#006c49]">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-xl mx-2 sm:mx-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-xl font-semibold text-gray-900">{getTitle()}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5 sm:size-6" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="w-full max-w-[90vw] sm:max-w-md rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-xl mx-2 sm:mx-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-red-100 p-2">
            <AlertCircle className="size-5 sm:size-6 text-red-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm sm:text-base text-gray-600">{message}</p>
        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 order-2 sm:order-1">
            Cancelar
          </button>
          <button onClick={onConfirm} disabled={isLoading} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 order-1 sm:order-2">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="w-full max-w-[95vw] sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-xl mx-2 sm:mx-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5 sm:size-6" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 border-t border-gray-200 pt-4">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 order-2 sm:order-1">
              Cancelar
            </button>
            <button type="submit" disabled={isLoading} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 order-1 sm:order-2">
              {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ========== SIDEBAR ==========
function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab, onLogout }) {
  const router = useRouter()

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'matriculas', icon: UserPlus, label: 'Matrículas' },
    { id: 'turmas', icon: UsersIcon, label: 'Turmas' },
    { id: 'cursos', icon: BookOpen, label: 'Cursos' },
    { id: 'formadores', icon: GraduationCap, label: 'Formadores' },
  ]

  const handleLogout = () => {
    onLogout()
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] sm:w-64 bg-gradient-to-b from-[#091426] to-[#1e293b] text-white shadow-lg transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-4 sm:py-5 border-b border-white/10 shrink-0">
          <Image src="/LOGOTIPO 02.svg" alt="Academia Kamatambu" width={32} height={32} className="h-8 w-8 sm:h-10 sm:w-10 object-contain brightness-0 invert" />
          <div>
            <h1 className="font-serif text-lg sm:text-[22px] font-bold leading-tight text-white">Kamatambu</h1>
            <p className="text-[8px] sm:text-[10px] font-medium uppercase tracking-widest text-[#8590a6]">Admin Portal</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 sm:px-3 py-3 sm:py-4 space-y-0.5 sm:space-y-1">
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
                  flex w-full items-center gap-2 sm:gap-3 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all
                  ${isActive ? 'bg-[#006c49] text-white shadow-md' : 'text-[#8590a6] hover:bg-[#1e293b]/50 hover:text-white'}
                `}
              >
                <Icon className="size-4 sm:size-5 shrink-0" />
                <span className="truncate text-sm sm:text-base">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3 sm:p-4 shrink-0">
          <button onClick={handleLogout} className="flex w-full items-center gap-2 sm:gap-3 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#8590a6] transition-colors hover:bg-[#1e293b]/50 hover:text-white">
            <LogOut className="size-4 sm:size-5 shrink-0" />
            <span className="truncate text-sm sm:text-base">Sair</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// ========== TOPBAR COM DROPDOWN ==========
function TopBar({ setIsSidebarOpen, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 h-14 sm:h-16 border-b border-[#c5c6cd] bg-[#f7f9fb] px-2 sm:px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        <button onClick={() => setIsSidebarOpen(true)} className="rounded-lg p-1.5 text-gray-700 hover:bg-[#1e293b]/10 lg:hidden shrink-0">
          <Menu className="size-5 sm:size-6" />
        </button>
        <div className="relative flex-1 max-w-[140px] sm:max-w-md min-w-[60px] sm:min-w-[100px]">
          <Search className="absolute left-2 sm:left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input
            type="text"
            placeholder="Procurar..."
            className="w-full rounded-full border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-7 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-gray-900 outline-none transition-all focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-4 shrink-0">
        <button className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#eceef0] transition-colors">
          <Bell className="size-3.5 sm:size-5 text-[#45474c]" />
          <span className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#ba1a1a]" />
        </button>
        <button className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full hover:bg-[#eceef0] transition-colors">
          <HelpCircle className="size-4 sm:size-5 text-[#45474c]" />
        </button>
        <div className="h-5 w-px sm:h-8 bg-[#c5c6cd]" />
        <div className="relative" ref={menuRef}>
          <div 
            className="flex cursor-pointer items-center gap-1 sm:gap-3 min-w-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="text-right truncate hidden sm:block">
              <p className="text-xs sm:text-sm font-semibold text-[#091426] truncate">Administrador</p>
              <p className="hidden sm:block text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Admin</p>
            </div>
            <div className="flex h-7 w-7 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-[#006c49]/20 bg-[#006c49]/10 shrink-0">
              <User className="size-3.5 sm:size-5 text-[#006c49]" />
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    // Navegar para perfil (se houver)
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="size-4" />
                  Perfil
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    onLogout()
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="size-4" />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

// ========== STATS CARDS ==========
function StatsCards({ stats }) {
  const iconMap = {
    'Users': UsersIcon,
    'UsersIcon': UsersIcon,
    'GraduationCap': GraduationCap,
    'BookOpen': BookOpen,
    'UserPlus': UserPlus,
    'Home': Home,
    'CreditCard': CreditCard,
    'CalendarDays': CalendarDays,
    'TrendingUp': TrendingUp,
    'User': User,
    'GraduationCap': GraduationCap,
  }

  const safeStats = Array.isArray(stats) ? stats : []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      {safeStats.map((stat, index) => {
        const Icon = typeof stat.icon === 'string' ? iconMap[stat.icon] : stat.icon
        
        if (!Icon) {
          console.warn(`Ícone não encontrado para: ${stat.icon}`)
          return null
        }
        
        return (
          <div key={stat.label || index} className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 lg:p-5 shadow-sm transition-transform hover:-translate-y-1">
            <div className="mb-2 sm:mb-3 lg:mb-4 flex items-start justify-between">
              <div className={`rounded-lg p-1 sm:p-1.5 lg:p-2 ${stat.color}`}>
                <Icon className="size-3.5 sm:size-4 lg:size-5" />
              </div>
              <span className={`flex items-center gap-0.5 sm:gap-1 rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-bold ${stat.changeColor || 'text-[#006c49] bg-[#006c49]/5'}`}>
                <TrendingUp className="size-2.5 sm:size-3 lg:size-3.5" />
                {stat.change}
              </span>
            </div>
            <p className="text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-widest text-[#45474c]">{stat.label}</p>
            <h3 className="mt-0.5 sm:mt-1 font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#091426]">{stat.value}</h3>
            <p className="mt-0.5 sm:mt-1 lg:mt-2 text-[8px] sm:text-[10px] lg:text-xs text-[#45474c]/70">vs. mês anterior</p>
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

  const safeMatriculas = Array.isArray(matriculas) ? matriculas : []

  return (
    <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
      <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border-b border-[#eceef0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h3 className="font-semibold text-[#091426] text-xs sm:text-sm lg:text-base">Matrículas Recentes</h3>
        <button className="text-[10px] sm:text-xs lg:text-sm text-[#006c49] hover:underline">Ver todas</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
          <thead className="bg-[#eceef0]">
            <tr>
              <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Nome</th>
              <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Curso</th>
              <th className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Turma</th>
              <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
              <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c5c6cd]/50">
            {safeMatriculas.length > 0 ? (
              safeMatriculas.slice(0, 5).map((student) => (
                <tr key={student.id} className="transition-colors hover:bg-[#f7f9fb]">
                  <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[8px] sm:text-[10px] lg:text-xs font-bold text-[#091426]">
                        {student.Nome ? student.Nome.split(' ').map(n => n[0]).join('') : '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#091426] truncate">{student.Nome}</p>
                        <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-[#45474c]">ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c] truncate max-w-[80px] sm:max-w-[100px]">{student.Curso}</td>
                  <td className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{student.Turma}</td>
                  <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                    <span className={`rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 text-[7px] sm:text-[9px] lg:text-[11px] font-bold uppercase tracking-tighter ${getStatusColor(student.Status)}`}>
                      {student.Status || 'Inscrito'}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right">
                    <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                      <button onClick={() => onView(student)} className="rounded p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50" title="Visualizar">
                        <Eye className="size-3 sm:size-3.5 lg:size-4" />
                      </button>
                      <button onClick={() => onEdit(student)} className="rounded p-0.5 sm:p-1 text-green-600 hover:bg-green-50" title="Editar">
                        <Edit className="size-3 sm:size-3.5 lg:size-4" />
                      </button>
                      <button onClick={() => onDelete(student.id)} className="rounded p-0.5 sm:p-1 text-red-600 hover:bg-red-50" title="Excluir">
                        <Trash2 className="size-3 sm:size-3.5 lg:size-4" />
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
    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Dashboard Administrativo</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Visão geral do desempenho institucional da Academia Kamatambu.</p>
        </div>
        <button 
          onClick={onGeneratePDF}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto"
        >
          <FileDown className="size-3.5 sm:size-4" />
          <span>Gerar Relatório</span>
        </button>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 lg:p-6 shadow-sm">
          <div className="mb-3 sm:mb-4 lg:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif text-base sm:text-lg lg:text-xl font-semibold text-[#091426]">Crescimento de Matrículas</h4>
              <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c]">Análise de ingressos nos últimos 6 meses</p>
            </div>
            <select className="rounded-lg border-[#c5c6cd] bg-[#f7f9fb] px-2 sm:px-3 py-1 text-[10px] sm:text-xs lg:text-sm outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
              <option>Semestre Atual</option>
              <option>Ano Inteiro</option>
            </select>
          </div>
          <div className="h-36 sm:h-48 lg:h-64 w-full">
            <div className="flex h-full items-end justify-between gap-1 sm:gap-2 px-1 sm:px-2 lg:px-4">
              {meses.map((item) => {
                const altura = maxHeight > 0 ? (item.total / maxHeight) * 100 : 0
                return (
                  <div key={item.mes} className="flex flex-col items-center gap-0.5 sm:gap-1 lg:gap-2 flex-1">
                    <div 
                      className="w-full max-w-5 sm:max-w-8 lg:max-w-12 rounded-lg bg-[#006c49] transition-all hover:bg-[#006c49]/80" 
                      style={{ height: `${Math.max(altura * 0.8, 4)}px` }} 
                    />
                    <span className="text-[6px] sm:text-[8px] lg:text-[10px] font-medium text-[#45474c]">{item.mes}</span>
                    <span className="text-[5px] sm:text-[6px] lg:text-[8px] text-[#45474c]">{item.total}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 lg:p-6 shadow-sm">
          <h4 className="font-serif text-base sm:text-lg lg:text-xl font-semibold text-[#091426]">Inscrições por Curso</h4>
          <p className="mb-2 sm:mb-3 lg:mb-4 text-[10px] sm:text-xs lg:text-sm text-[#45474c]">Distribuição de alunos atuais</p>
          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
            {inscricoes.map((item, index) => (
              <div key={item.name} className="space-y-0.5">
                <div className="flex justify-between text-[10px] sm:text-xs lg:text-sm">
                  <span className="font-medium truncate">{item.name}</span>
                  <span className="text-[#45474c] shrink-0">{item.value}%</span>
                </div>
                <div className="h-1 sm:h-1.5 lg:h-2 w-full overflow-hidden rounded-full bg-[#eceef0]">
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

  const safeMatriculas = Array.isArray(matriculas) ? matriculas : []

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Matrículas</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todas as matrículas da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            <FileDown className="size-3.5 sm:size-4" />
            <span>Gerar PDF</span>
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
            <Plus className="size-3.5 sm:size-4" /> Nova Matrícula
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar matrícula..." className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
            <thead className="bg-[#eceef0]">
              <tr>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Nome</th>
                <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Curso</th>
                <th className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Turma</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd]/50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <Loader2 className="size-5 sm:size-6 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : safeMatriculas.length > 0 ? (
                safeMatriculas.map((student) => (
                  <tr key={student.id} className="transition-colors hover:bg-[#f7f9fb]">
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                        <div className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[8px] sm:text-[10px] lg:text-xs font-bold text-[#091426]">
                          {student.Nome ? student.Nome.split(' ').map(n => n[0]).join('') : '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#091426] truncate">{student.Nome}</p>
                          <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-[#45474c]">ID: {student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c] truncate max-w-[80px] sm:max-w-[100px]">{student.Curso}</td>
                    <td className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{student.Turma}</td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                      <span className={`rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 text-[7px] sm:text-[9px] lg:text-[11px] font-bold uppercase tracking-tighter ${getStatusColor(student.Status)}`}>
                        {student.Status || 'Inscrito'}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        <button onClick={() => onView(student)} className="rounded p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50" title="Visualizar">
                          <Eye className="size-3 sm:size-3.5 lg:size-4" />
                        </button>
                        <button onClick={() => onEdit(student)} className="rounded p-0.5 sm:p-1 text-green-600 hover:bg-green-50" title="Editar">
                          <Edit className="size-3 sm:size-3.5 lg:size-4" />
                        </button>
                        <button onClick={() => onDelete(student.id)} className="rounded p-0.5 sm:p-1 text-red-600 hover:bg-red-50" title="Excluir">
                          <Trash2 className="size-3 sm:size-3.5 lg:size-4" />
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

  const safeTurmas = Array.isArray(turmas) ? turmas : []

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Turmas</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todas as turmas da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            <FileDown className="size-3.5 sm:size-4" />
            <span>Gerar PDF</span>
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
            <Plus className="size-3.5 sm:size-4" /> Nova Turma
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar turma..." className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2 className="size-6 sm:size-8 animate-spin text-[#006c49]" />
          </div>
        ) : safeTurmas.length > 0 ? (
          safeTurmas.map((turma) => (
            <div key={turma.id} className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="mb-2 sm:mb-3 flex flex-wrap items-center justify-between gap-1">
                <h3 className="font-semibold text-[#091426] text-xs sm:text-sm lg:text-base break-words">{turma.Turma}</h3>
                <span className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-medium shrink-0 ${getStatusColor(turma.Status)}`}>
                  {turma.Status || 'Pendente'}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-[10px] sm:text-xs lg:text-sm">
                <p className="text-[#45474c]"><span className="font-medium">Curso:</span> <span className="break-words">{turma.Curso}</span></p>
                <p className="text-[#45474c]"><span className="font-medium">Módulo:</span> {turma.Modulo || 1}</p>
                <p className="text-[#45474c]"><span className="font-medium">Período:</span> {turma.Periodo || 'Manhã'}</p>
                <p className="text-[#45474c]"><span className="font-medium">Formador:</span> <span className="break-words">{turma.Formador || 'Não definido'}</span></p>
                <p className="text-[#45474c]"><span className="font-medium">Formandos:</span> {turma.Numero_Alunos || 0}</p>
                <p className="text-[#45474c]"><span className="font-medium">Capacidade:</span> {turma.Capacidade_Maxima || 30}</p>
                <p className="text-[#45474c]"><span className="font-medium">Sala:</span> <span className="break-words">{turma.Sala || 'Não definida'}</span></p>
              </div>
              <div className="mt-2 sm:mt-3 lg:mt-4 flex gap-2 border-t border-[#eceef0] pt-2 sm:pt-3">
                <button onClick={() => onView(turma)} className="flex-1 rounded-lg border border-[#c5c6cd] px-2 sm:px-3 py-1 text-[10px] sm:text-xs lg:text-sm text-[#45474c] hover:bg-[#f7f9fb]">Ver</button>
                <button onClick={() => onEdit(turma)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#45474c] hover:bg-[#f7f9fb]">
                  <Edit className="size-3 sm:size-3.5 lg:size-4" />
                </button>
                <button onClick={() => onDelete(turma.id)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]">
                  <Trash2 className="size-3 sm:size-3.5 lg:size-4" />
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
  const safeCursos = Array.isArray(cursos) ? cursos : []

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Cursos</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todos os cursos da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            <FileDown className="size-3.5 sm:size-4" />
            <span>Gerar PDF</span>
          </button>
          <button 
            onClick={onCreate}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto"
          >
            <Plus className="size-3.5 sm:size-4" /> Novo Curso
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2 className="size-6 sm:size-8 animate-spin text-[#006c49]" />
          </div>
        ) : safeCursos.length > 0 ? (
          safeCursos.map((curso) => (
            <div key={curso.id} className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm transition-all hover:shadow-md">
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="mb-2 sm:mb-3 flex flex-wrap items-center justify-between gap-1">
                  <h3 className="font-semibold text-[#091426] text-xs sm:text-sm lg:text-base break-words">{curso.Nome}</h3>
                  <span className="rounded-full bg-[#006c49]/10 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-medium text-[#006c49] shrink-0">
                    {curso.Status || 'Ativo'}
                  </span>
                </div>
                <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-[10px] sm:text-xs lg:text-sm">
                  <p className="text-[#45474c]"><span className="font-medium">Descrição:</span> <span className="break-words">{curso.Desc || 'Sem descrição'}</span></p>
                  <p className="text-[#45474c]"><span className="font-medium">Tipo:</span> {curso.Tipo_curso || 'Técnico'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Módulos:</span> {curso.Modulos || 1}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Edição:</span> {curso.Edicao || '1º'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Duração:</span> <span className="break-words">{curso.Duracao || 'Não definida'}</span></p>
                  <p className="text-[#45474c]"><span className="font-medium">Carga Horária:</span> {curso.Carga_Horaria ? `${curso.Carga_Horaria} horas` : 'Não definida'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Valor:</span> {curso.Valor_curso ? `Kz ${parseFloat(curso.Valor_curso).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` : 'Não definido'}</p>
                </div>
                <div className="mt-2 sm:mt-3 lg:mt-4 flex gap-2 border-t border-[#eceef0] pt-2 sm:pt-3">
                  <button onClick={() => onView(curso)} className="flex-1 rounded-lg border border-[#c5c6cd] px-2 sm:px-3 py-1 text-[10px] sm:text-xs lg:text-sm text-[#45474c] hover:bg-[#f7f9fb]">Ver</button>
                  <button onClick={() => onEdit(curso)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#45474c] hover:bg-[#f7f9fb]">
                    <Edit className="size-3 sm:size-3.5 lg:size-4" />
                  </button>
                  <button onClick={() => onDelete(curso.id)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]">
                    <Trash2 className="size-3 sm:size-3.5 lg:size-4" />
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
  const safeFormadores = Array.isArray(formadores) ? formadores : []

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Formadores</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todos os formadores da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button 
            onClick={onGeneratePDF}
            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto"
          >
            <FileDown className="size-3.5 sm:size-4" />
            <span>Gerar PDF</span>
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
            <Plus className="size-3.5 sm:size-4" /> Novo Formador
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar formador..." className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <Loader2 className="size-6 sm:size-8 animate-spin text-[#006c49]" />
          </div>
        ) : safeFormadores.length > 0 ? (
          safeFormadores.map((formador) => (
            <div key={formador.id} className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="mb-2 sm:mb-3 flex flex-wrap items-start justify-between gap-1">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#006c49]/10 text-[#006c49] font-bold text-[10px] sm:text-xs lg:text-sm shrink-0">
                    {formador.Nome ? formador.Nome.split(' ').map(n => n[0]).join('') : '?'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[#091426] text-xs sm:text-sm lg:text-base truncate">{formador.Nome}</h3>
                    <p className="text-[8px] sm:text-[10px] lg:text-xs text-[#45474c] truncate">{formador.Email}</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#006c49]/10 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-medium text-[#006c49] shrink-0">
                  {formador.Status || 'Ativo'}
                </span>
              </div>
              <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-[10px] sm:text-xs lg:text-sm">
                <p className="text-[#45474c]"><span className="font-medium">Especialidade:</span> <span className="break-words">{formador.Especialidade}</span></p>
                <p className="text-[#45474c]"><span className="font-medium">Curso:</span> <span className="break-words">{formador.Curso}</span></p>
                <p className="text-[#45474c]"><span className="font-medium">Turmas:</span> {formador.Turmas || 0}</p>
                <p className="text-[#45474c]"><span className="font-medium">Gênero:</span> {formador.Genero || 'Não informado'}</p>
                <p className="text-[#45474c]"><span className="font-medium">Telefone:</span> <span className="break-words">{formador.Telefone || 'Não informado'}</span></p>
              </div>
              <div className="mt-2 sm:mt-3 lg:mt-4 flex gap-2 border-t border-[#eceef0] pt-2 sm:pt-3">
                <button onClick={() => onView(formador)} className="flex-1 rounded-lg border border-[#c5c6cd] px-2 sm:px-3 py-1 text-[10px] sm:text-xs lg:text-sm text-[#45474c] hover:bg-[#f7f9fb]">Ver</button>
                <button onClick={() => onEdit(formador)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#45474c] hover:bg-[#f7f9fb]">
                  <Edit className="size-3 sm:size-3.5 lg:size-4" />
                </button>
                <button onClick={() => onDelete(formador.id)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]">
                  <Trash2 className="size-3 sm:size-3.5 lg:size-4" />
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
      <div className="text-center max-w-[90vw] sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-red-100 p-4">
            <ShieldAlert className="size-12 sm:size-16 text-red-600" />
          </div>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">Acesso Negado</h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600">Você não tem permissão para acessar esta área. Apenas administradores podem visualizar o dashboard.</p>
        <button onClick={() => router.push('/')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl">
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

  const [matriculas, setMatriculas] = useState([])
  const [turmas, setTurmas] = useState([])
  const [cursos, setCursos] = useState([])
  const [formadores, setFormadores] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState({ matriculas: false, turmas: false, cursos: false, formadores: false })
  const [crescimento, setCrescimento] = useState([])
  const [inscricoesPorCurso, setInscricoesPorCurso] = useState([])
  const [cursosList, setCursosList] = useState([])
  const [turmasList, setTurmasList] = useState([])
  const [formadoresList, setFormadoresList] = useState([])
  const [fotoUrl, setFotoUrl] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalData, setModalData] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, type: '' })
  const [toast, setToast] = useState(null)

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

  // ========== GERAR PDF ==========
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
        curso.Tipo_curso || 'Técnico',
        curso.Modulos || 1,
        curso.Edicao || '1º',
        curso.Duracao || 'Não definida',
        curso.Carga_Horaria ? `${curso.Carga_Horaria}h` : 'Não definida',
        curso.Valor_curso ? `Kz ${parseFloat(curso.Valor_curso).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` : '0.00',
        curso.Status || 'Ativo'
      ])

      autoTable(doc, {
        startY: 58,
        head: [['Nº', 'Nome do Curso', 'Descrição', 'Tipo', 'Módulos', 'Edição', 'Duração', 'Carga Horária', 'Valor', 'Status']],
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
          0: { cellWidth: 8 },
          1: { cellWidth: 30 },
          2: { cellWidth: 35 },
          3: { cellWidth: 20 },
          4: { cellWidth: 12 },
          5: { cellWidth: 10 },
          6: { cellWidth: 15 },
          7: { cellWidth: 18 },
          8: { cellWidth: 22 },
          9: { cellWidth: 15 }
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
        matricula.BI_Cedula || '-',
        matricula.Telefone || '-',
        matricula.Data_Matricula ? new Date(matricula.Data_Matricula).toLocaleDateString('pt-PT') : '-'
      ])

      autoTable(doc, {
        startY: 58,
        head: [['Nº', 'Nome', 'Curso', 'Turma', 'Módulo', 'Status', 'BI/Cédula', 'Telefone', 'Data Matrícula']],
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
          0: { cellWidth: 8 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 20 },
          4: { cellWidth: 12 },
          5: { cellWidth: 18 },
          6: { cellWidth: 20 },
          7: { cellWidth: 20 },
          8: { cellWidth: 22 }
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
      
      if (cursos && cursos.length > 0) {
        doc.setFontSize(12)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(10, 20, 40)
        doc.text('Cursos', 14, startY)
        
        const cursosData = cursos.slice(0, 10).map((c, i) => [
          i + 1,
          c.Nome || '-',
          c.Tipo_curso || 'Técnico',
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

  const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token')
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
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

  const loadData = async () => {
    try {
      setLoading({ matriculas: true, turmas: true, cursos: true, formadores: true })

      const token = localStorage.getItem('token')

      try {
        const statsRes = await fetch(`${API_BASE_URL}/api/stats/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const statsData = await statsRes.json()

        if (statsData.success) {
          const processedStats = (statsData.data.stats || []).map(stat => ({
            ...stat,
            icon: typeof stat.icon === 'string' ? stat.icon : 'UsersIcon'
          }))
          setStats(processedStats)
          setCrescimento(statsData.data.crescimento || [])
          setInscricoesPorCurso(statsData.data.inscricoesPorCurso || [])
          setMatriculas(statsData.data.matriculasRecentes || [])
        }
      } catch (statsError) {
        console.error('Erro ao buscar estatísticas:', statsError)
        setStats([
          { label: 'Total Alunos', value: 0, icon: 'UsersIcon', color: 'bg-blue-100 text-blue-600', change: '+0%' },
          { label: 'Cursos Ativos', value: 0, icon: 'BookOpen', color: 'bg-green-100 text-green-600', change: '+0%' },
          { label: 'Turmas', value: 0, icon: 'GraduationCap', color: 'bg-purple-100 text-purple-600', change: '+0%' },
          { label: 'Formadores', value: 0, icon: 'User', color: 'bg-orange-100 text-orange-600', change: '+0%' }
        ])
      }

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

      try {
        const [cursosListRes, turmasListRes, formadoresListRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/cursos/lista`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/turmas`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/formadores/lista`, {
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

  // ========== HANDLE CREATE ==========
  const handleCreate = async (data, type) => {
    setModalLoading(true)
    try {
      if (type === 'cursos') {
        if (data.Valor_curso) {
          data.Valor_curso = String(data.Valor_curso)
        } else {
          data.Valor_curso = "0.00"
        }
        
        const tiposValidos = [
          'Formação profissional inicial',
          'Formação profissional continua',
          'Formação profissional de dupla Certificação'
        ]
        if (!tiposValidos.includes(data.Tipo_curso)) {
          data.Tipo_curso = 'Formação profissional inicial'
        }
        
        const edicoesValidas = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º']
        if (!edicoesValidas.includes(data.Edicao)) {
          data.Edicao = '1º'
        }
        
        const statusValidos = ['Ativo', 'Inativo', 'Em desenvolvimento']
        if (!statusValidos.includes(data.Status)) {
          data.Status = 'Ativo'
        }
        
        if (data.Modulos) {
          data.Modulos = parseInt(data.Modulos)
        }
        
        if (data.Carga_Horaria) {
          data.Carga_Horaria = parseInt(data.Carga_Horaria)
        } else {
          data.Carga_Horaria = null
        }
      }

      if (fotoUrl) {
        data.Foto_User = fotoUrl
      }

      console.log('Enviando dados:', data)

      const response = await apiFetch(`/${type}`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      
      if (response.success) {
        showToast(`${type.slice(0, -1)} criado com sucesso!`, 'success')
        setModalOpen(false)
        setFotoUrl(null)
        setFotoPreview(null)
        loadData()
      } else {
        console.error('Erro do backend:', response)
        showToast(response.message || 'Erro ao criar', 'error')
      }
    } catch (error) {
      console.error('Erro detalhado:', error)
      showToast('Erro ao criar', 'error')
    } finally {
      setModalLoading(false)
    }
  }

  // ========== HANDLE UPDATE ==========
  const handleUpdate = async (id, data, type) => {
    setModalLoading(true)
    try {
      if (type === 'cursos') {
        if (data.Valor_curso) {
          data.Valor_curso = String(data.Valor_curso)
        } else {
          data.Valor_curso = "0.00"
        }
        
        const tiposValidos = [
          'Formação profissional inicial',
          'Formação profissional continua',
          'Formação profissional de dupla Certificação'
        ]
        if (!tiposValidos.includes(data.Tipo_curso)) {
          data.Tipo_curso = 'Formação profissional inicial'
        }
        
        const edicoesValidas = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º']
        if (!edicoesValidas.includes(data.Edicao)) {
          data.Edicao = '1º'
        }
        
        const statusValidos = ['Ativo', 'Inativo', 'Em desenvolvimento']
        if (!statusValidos.includes(data.Status)) {
          data.Status = 'Ativo'
        }
        
        if (data.Modulos) {
          data.Modulos = parseInt(data.Modulos)
        }
        
        if (data.Carga_Horaria) {
          data.Carga_Horaria = parseInt(data.Carga_Horaria)
        } else {
          data.Carga_Horaria = null
        }
      }

      if (fotoUrl) {
        data.Foto_User = fotoUrl
      }

      console.log('Enviando dados para atualização:', data)

      const response = await apiFetch(`/${type}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
      
      if (response.success) {
        showToast(`${type.slice(0, -1)} atualizado com sucesso!`, 'success')
        setModalOpen(false)
        setFotoUrl(null)
        setFotoPreview(null)
        loadData()
      } else {
        console.error('Erro do backend:', response)
        showToast(response.message || 'Erro ao atualizar', 'error')
      }
    } catch (error) {
      console.error('Erro detalhado:', error)
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

  // ========== LOGOUT ==========
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    router.push('/auth/login')
  }

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
          const response = await fetch(`${API_BASE_URL}/auth/validar_token`, {
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

  const handleOpenModal = (type, data = null) => {
    setModalType(type)
    setModalData(data)
    setFotoUrl(null)
    setFotoPreview(null)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setModalData(null)
    setFotoUrl(null)
    setFotoPreview(null)
  }

  const handleConfirmDelete = (id, type) => {
    setConfirmModal({ open: true, id, type })
  }

  if (isLoading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fb]">
        <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-[#006c49] border-t-transparent" />
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
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <TopBar 
          setIsSidebarOpen={setIsSidebarOpen} 
          onLogout={handleLogout}
        />

        <main className="flex-1 p-2 sm:p-3 lg:p-6">
          <div className="mx-auto max-w-[1440px] space-y-3 sm:space-y-4 lg:space-y-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Nome *</label>
              <input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Encarregado</label>
              <input name="Encarregado" defaultValue={modalData?.Encarregado} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">BI/Cédula *</label>
              <input name="BI_Cedula" defaultValue={modalData?.BI_Cedula} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Data de Nascimento</label>
              <input type="date" name="Nascimento" defaultValue={modalData?.Nascimento} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Estado Civil</label>
              <select name="Estado_Civil" defaultValue={modalData?.Estado_Civil || 'Solteiro'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900">
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
                <option value="Divorciado">Divorciado</option>
                <option value="Viúvo">Viúvo</option>
                <option value="União Estável">União Estável</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Gênero *</label>
              <select name="Genero" defaultValue={modalData?.Genero} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Morada</label>
              <input name="Morada" defaultValue={modalData?.Morada} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Telefone *</label>
              <input name="Telefone" defaultValue={modalData?.Telefone} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Curso *</label>
              <select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
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
              <label className="text-xs sm:text-sm font-medium text-gray-700">Turma *</label>
              <select name="Turma" defaultValue={modalData?.Turma} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
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
              <label className="text-xs sm:text-sm font-medium text-gray-700">Módulo</label>
              <input type="number" name="Modulo" defaultValue={modalData?.Modulo || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Status</label>
              <select name="Status" defaultValue={modalData?.Status || 'Inscrito'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900">
                <option value="Inscrito">Inscrito</option>
                <option value="Admitido">Admitido</option>
                <option value="Desistente">Desistente</option>
                <option value="Concluido">Concluído</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Data de Matrícula</label>
              <input type="date" name="Data_Matricula" defaultValue={modalData?.Data_Matricula || new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div className="col-span-full">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Foto do Aluno</label>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Upload className="size-3.5 sm:size-4" />
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
                {isUploading && <Loader2 className="size-4 sm:size-5 animate-spin text-primary" />}
                {(fotoPreview || modalData?.Foto_User) && (
                  <div className="flex items-center gap-2">
                    <img 
                      src={fotoPreview || modalData?.Foto_User} 
                      alt="Preview" 
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-gray-200" 
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setFotoUrl(null)
                        setFotoPreview(null)
                      }}
                      className="text-[10px] sm:text-xs text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
              {modalData?.Foto_User && !fotoPreview && (
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">Imagem atual: <a href={modalData.Foto_User} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ver imagem</a></p>
              )}
            </div>
            <div className="col-span-full">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Foto do Certificado</label>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <FileText className="size-3.5 sm:size-4" />
                  {isUploading ? 'Enviando...' : 'Enviar Certificado'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    disabled={isUploading}
                  />
                </label>
                {isUploading && <Loader2 className="size-4 sm:size-5 animate-spin text-primary" />}
                {modalData?.Foto_Certificado && (
                  <div className="flex items-center gap-2">
                    <a href={modalData.Foto_Certificado} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs sm:text-sm">Ver certificado atual</a>
                    <button 
                      type="button"
                      onClick={() => {
                        // Aqui você pode adicionar lógica para remover o certificado
                      }}
                      className="text-[10px] sm:text-xs text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {modalType === 'turmas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Turma *</label>
              <input name="Turma" defaultValue={modalData?.Turma} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Curso *</label>
              <select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
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
              <label className="text-xs sm:text-sm font-medium text-gray-700">Módulo</label>
              <input type="number" name="Modulo" defaultValue={modalData?.Modulo || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Período</label>
              <select name="Periodo" defaultValue={modalData?.Periodo || 'Manhã'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900">
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Formador</label>
              <select name="Formador" defaultValue={modalData?.Formador} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900">
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
              <label className="text-xs sm:text-sm font-medium text-gray-700">Capacidade Máxima</label>
              <input type="number" name="Capacidade_Maxima" defaultValue={modalData?.Capacidade_Maxima || 30} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Data Início *</label>
              <input type="date" name="Data_INIC" defaultValue={modalData?.Data_INIC} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Data Término *</label>
              <input type="date" name="Data_Term" defaultValue={modalData?.Data_Term} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Sala</label>
              <input name="Sala" defaultValue={modalData?.Sala} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Status</label>
              <select name="Status" defaultValue={modalData?.Status || 'Pendente'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900">
                <option value="Pendente">Pendente</option>
                <option value="Ativa">Ativa</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
          </div>
        )}

        {modalType === 'cursos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Nome do Curso *</label>
              <input 
                name="Nome" 
                defaultValue={modalData?.Nome} 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" 
                required 
              />
            </div>
            <div className="col-span-full">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Descrição</label>
              <textarea 
                name="Desc" 
                defaultValue={modalData?.Desc} 
                rows="3" 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" 
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Tipo de Curso *</label>
              <select 
                name="Tipo_curso" 
                defaultValue={modalData?.Tipo_curso || 'Formação profissional inicial'} 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"
                required
              >
                <option value="Formação profissional inicial">Formação profissional inicial</option>
                <option value="Formação profissional continua">Formação profissional continua</option>
                <option value="Formação profissional de dupla Certificação">Formação profissional de dupla Certificação</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Módulos</label>
              <input 
                type="number" 
                name="Modulos" 
                defaultValue={modalData?.Modulos || 1} 
                min="1"
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" 
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Edição</label>
              <select 
                name="Edicao" 
                defaultValue={modalData?.Edicao || '1º'} 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"
              >
                <option value="1º">1º</option>
                <option value="2º">2º</option>
                <option value="3º">3º</option>
                <option value="4º">4º</option>
                <option value="5º">5º</option>
                <option value="6º">6º</option>
                <option value="7º">7º</option>
                <option value="8º">8º</option>
                <option value="9º">9º</option>
                <option value="10º">10º</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Duração</label>
              <input 
                name="Duracao" 
                defaultValue={modalData?.Duracao} 
                placeholder="Ex: 6 meses" 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" 
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Carga Horária (horas)</label>
              <input 
                type="number" 
                name="Carga_Horaria" 
                defaultValue={modalData?.Carga_Horaria} 
                min="0"
                placeholder="Ex: 120" 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" 
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Valor do Curso (Kz)</label>
              <input 
                type="text" 
                name="Valor_curso" 
                defaultValue={modalData?.Valor_curso || "0.00"} 
                placeholder="0.00" 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" 
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Status</label>
              <select 
                name="Status" 
                defaultValue={modalData?.Status || 'Ativo'} 
                className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"
              >
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Em desenvolvimento">Em desenvolvimento</option>
              </select>
            </div>
          </div>
        )}

        {modalType === 'formadores' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Nome *</label>
              <input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Email *</label>
              <input type="email" name="Email" defaultValue={modalData?.Email} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Telefone *</label>
              <input name="Telefone" defaultValue={modalData?.Telefone} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Especialidade *</label>
              <input name="Especialidade" defaultValue={modalData?.Especialidade} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Curso *</label>
              <select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
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
              <label className="text-xs sm:text-sm font-medium text-gray-700">Gênero *</label>
              <select name="Genero" defaultValue={modalData?.Genero} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Turmas</label>
              <input type="number" name="Turmas" defaultValue={modalData?.Turmas || 0} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" />
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Status</label>
              <select name="Status" defaultValue={modalData?.Status || 'Ativo'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900">
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