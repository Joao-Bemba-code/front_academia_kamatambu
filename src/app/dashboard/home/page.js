'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
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
  TrendingDown,
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
  Receipt,
  DollarSign,
  Banknote,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  AlertTriangle,
  BookOpen as BookOpenIcon,
  Shield
} from 'lucide-react'

// ========== URL BASE DA API ==========
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

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
      'Cancelada': 'bg-[#ffdad6] text-[#93000a]',
      'pago': 'bg-green-100 text-green-800',
      'pendente': 'bg-yellow-100 text-yellow-800',
      'parcial': 'bg-orange-100 text-orange-800',
      'cancelado': 'bg-red-100 text-red-800',
      'aprovado': 'bg-green-100 text-green-800',
      'reprovado': 'bg-red-100 text-red-800',
      'recuperacao': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getTipoLabel = (tipo) => {
    const tipos = {
      'matricula': 'Matrícula',
      'mensalidade': 'Mensalidade',
      'certificado': 'Certificado',
      'taxa': 'Taxa',
      'venda': 'Venda de Artigos',
      'outro': 'Outro',
      'prova': 'Prova',
      'trabalho': 'Trabalho',
      'projeto': 'Projeto',
      'exame': 'Exame',
      'participacao': 'Participação'
    }
    return tipos[tipo] || tipo
  }

  const formatarMoeda = (valor) => {
    return `Kz ${parseFloat(valor || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`
  }

  const formatarNota = (nota) => {
    return parseFloat(nota || 0).toFixed(1)
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
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Matrícula</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Data_Matricula ? new Date(data.Data_Matricula).toLocaleDateString('pt-PT') : 'Não informado'}</p>
        </div>
      </div>
    </div>
  )

  const renderPagamentoDetails = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#006c49]/10 shrink-0">
          <Receipt className="size-10 sm:size-12 text-[#006c49]" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.aluno || (data.tipo === 'venda' ? 'Venda de Artigos' : '—')}</h3>
          <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status || 'Pendente'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formando</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.aluno || (data.tipo === 'venda' ? 'Venda de Artigos (sem formando)' : '—')}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.curso || (data.tipo === 'venda' ? 'Artigos' : 'Não informado')}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Pagamento</p>
          <p className="text-sm sm:text-base text-gray-900">{getTipoLabel(data.tipo)}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Forma de Pagamento</p>
          <p className="text-sm sm:text-base text-gray-900">{data.forma_pagamento || 'Dinheiro'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</p>
          <p className="text-lg sm:text-xl font-bold text-[#006c49]">{formatarMoeda(data.valor)}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status || 'Pendente'}
          </span>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data Pagamento</p>
          <p className="text-sm sm:text-base text-gray-900">{data.data_pagamento ? new Date(data.data_pagamento).toLocaleDateString('pt-PT') : 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</p>
          <p className="text-sm sm:text-base text-gray-900">{data.data_vencimento ? new Date(data.data_vencimento).toLocaleDateString('pt-PT') : 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1 col-span-full">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Observação</p>
          <p className="text-sm sm:text-base text-gray-900">{data.observacao || 'Nenhuma observação'}</p>
        </div>
      </div>
    </div>
  )

  const renderSaidaDetails = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-50 shrink-0">
          <ArrowDownRight className="size-10 sm:size-12 text-red-600" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.descricao}</h3>
          <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status || 'Pendente'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.descricao}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Despesa</p>
          <p className="text-sm sm:text-base text-gray-900">{data.tipo || 'Outro'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</p>
          <p className="text-lg sm:text-xl font-bold text-red-600">{formatarMoeda(data.valor)}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status || 'Pendente'}
          </span>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data da Saída</p>
          <p className="text-sm sm:text-base text-gray-900">{data.data_saida ? new Date(data.data_saida).toLocaleDateString('pt-PT') : 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Forma de Pagamento</p>
          <p className="text-sm sm:text-base text-gray-900">{data.forma_pagamento || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1 col-span-full">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Observação</p>
          <p className="text-sm sm:text-base text-gray-900">{data.observacao || 'Nenhuma observação'}</p>
        </div>
      </div>
    </div>
  )

  const renderNotaDetails = () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#006c49]/10 shrink-0">
          <BookOpenIcon className="size-10 sm:size-12 text-[#006c49]" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.aluno}</h3>
          <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status || 'Pendente'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formando</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.aluno}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.curso}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Turma</p>
          <p className="text-sm sm:text-base text-gray-900">{data.turma}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Disciplina</p>
          <p className="text-sm sm:text-base text-gray-900">{data.disciplina}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Módulo</p>
          <p className="text-sm sm:text-base text-gray-900">{data.modulo}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Avaliação</p>
          <p className="text-sm sm:text-base text-gray-900 capitalize">{getTipoLabel(data.tipo_avaliacao)}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</p>
          <p className="text-lg sm:text-xl font-bold text-[#006c49]">{formatarNota(data.nota)}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
          <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${getStatusColor(data.status)}`}>
            {data.status || 'Pendente'}
          </span>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data Avaliação</p>
          <p className="text-sm sm:text-base text-gray-900">{data.data_avaliacao ? new Date(data.data_avaliacao).toLocaleDateString('pt-PT') : 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formador</p>
          <p className="text-sm sm:text-base text-gray-900">{data.formador || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1 col-span-full">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Observação</p>
          <p className="text-sm sm:text-base text-gray-900">{data.observacao || 'Nenhuma observação'}</p>
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
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Curso}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Módulo</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Modulo || 1}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Período</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Periodo || 'Manhã'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formador</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Formador || 'Não definido'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formandos</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Numero_Alunos || 0}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Capacidade_Maxima || 30}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data Início</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Data_INIC ? new Date(data.Data_INIC).toLocaleDateString('pt-PT') : 'Não definido'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Data Término</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Data_Term ? new Date(data.Data_Term).toLocaleDateString('pt-PT') : 'Não definido'}</p>
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
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Duracao || 'Não definida'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Carga Horária</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Carga_Horaria ? `${data.Carga_Horaria} horas` : 'Não definida'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Valor_curso ? `Kz ${parseFloat(data.Valor_curso).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` : 'Não definido'}</p>
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
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Email}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Telefone || 'Não informado'}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidade</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Especialidade}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
          <p className="text-sm sm:text-base text-gray-900 break-words">{data.Curso}</p>
        </div>
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Turmas</p>
          <p className="text-sm sm:text-base text-gray-900">{data.Turmas || 0}</p>
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

  const renderDividaDetails = () => {
    const meses = (data.meses || []).sort((a, b) => {
      if (a.data_vencimento && b.data_vencimento) return new Date(a.data_vencimento) - new Date(b.data_vencimento)
      return 0
    })
    const mesesVencidas = meses.filter(m => m.vencida)
    const totalDevido = meses.reduce((s, m) => s + parseFloat(m.valor || 0), 0)
    const todosVencidos = mesesVencidas.length === meses.length

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-50 shrink-0">
            <PiggyBank className="size-10 sm:size-12 text-red-600" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.aluno}</h3>
            <p className="text-xs sm:text-sm text-gray-500">ID: {data.id}</p>
            <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium ${todosVencidos ? 'bg-red-100 text-red-800' : mesesVencidas.length > 0 ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'}`}>
              {todosVencidos ? 'Em atraso' : 'A vencer / Em atraso parcial'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Formando</p>
            <p className="text-sm sm:text-base text-gray-900 break-words">{data.aluno || 'Não informado'}</p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</p>
            <p className="text-sm sm:text-base text-gray-900 break-words">{data.curso || 'Não informado'}</p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Turma</p>
            <p className="text-sm sm:text-base text-gray-900">{data.turma || 'Não informado'}</p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</p>
            <p className="text-sm sm:text-base text-gray-900 break-words">{data.telefone || 'Não informado'}</p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Módulos do Curso</p>
            <p className="text-sm sm:text-base text-gray-900">{data.modulos_curso || 1}</p>
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">Meses em Dívida</p>
            <p className="text-lg sm:text-xl font-bold text-red-600">{data.total_meses_devidos || 0} {data.total_meses_devidos === 1 ? 'mês' : 'meses'}</p>
          </div>
        </div>

        <div className="pt-2">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Mensalidades em Aberto</h4>
          <div className="overflow-x-auto rounded-lg border border-[#c5c6cd]/50">
            <table className="w-full text-left text-[10px] sm:text-xs">
              <thead className="bg-[#eceef0]">
                <tr>
                  <th className="px-2 sm:px-3 py-1 sm:py-2 text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Mês Referência</th>
                  <th className="px-2 sm:px-3 py-1 sm:py-2 text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Vencimento</th>
                  <th className="px-2 sm:px-3 py-1 sm:py-2 text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Valor</th>
                  <th className="px-2 sm:px-3 py-1 sm:py-2 text-[8px] sm:text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c5c6cd]/50">
                {meses.length > 0 ? meses.map((m) => (
                  <tr key={m.id} className="hover:bg-[#f7f9fb]">
                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-[#091426] font-medium">{m.label}</td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-[#45474c]">{m.data_vencimento ? new Date(m.data_vencimento).toLocaleDateString('pt-PT') : 'Não definida'}</td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2 font-semibold text-[#091426]">{formatarMoeda(m.valor)}</td>
                    <td className="px-2 sm:px-3 py-1 sm:py-2">
                      <span className={`rounded-full px-1.5 py-0.5 text-[7px] sm:text-[9px] font-bold uppercase ${m.vencida ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                        {m.vencida ? 'Vencida' : 'A vencer'}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="px-3 py-4 text-center text-gray-500 text-[10px]">Sem mensalidades em aberto</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-lg bg-red-50 border border-red-200 px-3 sm:px-4 py-2.5 sm:py-3">
            <span className="text-xs sm:text-sm font-medium text-red-800">Total da Dívida</span>
            <span className="text-lg sm:text-xl font-bold text-red-600">{formatarMoeda(totalDevido)}</span>
          </div>
        </div>
      </div>
    )
  }

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
      case 'pagamentos':
        return renderPagamentoDetails()
      case 'saidas':
        return renderSaidaDetails()
      case 'dividas':
        return renderDividaDetails()
      case 'notas':
      case 'academico':
        return renderNotaDetails()
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
      case 'pagamentos': return 'Detalhes do Pagamento'
      case 'saidas': return 'Detalhes da Saída'
      case 'dividas': return 'Detalhes da Dívida'
      case 'notas': return 'Detalhes da Avaliação'
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
function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab, onLogout, userTipo, userNome }) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'matriculas', icon: UserPlus, label: 'Matrículas' },
    { id: 'turmas', icon: UsersIcon, label: 'Turmas' },
    { id: 'cursos', icon: BookOpen, label: 'Cursos' },
    { id: 'formadores', icon: GraduationCap, label: 'Formadores' },
    { id: 'tesouraria', icon: CreditCard, label: 'Tesouraria' },
    { id: 'academico', icon: Award, label: 'Gestão Acadêmica' },
    ...(userTipo === 'admin' ? [{ id: 'usuarios', icon: Shield, label: 'Utilizadores' }] : [])
  ]

  const allowedTabs = {
    admin: ['dashboard', 'matriculas', 'turmas', 'cursos', 'formadores', 'tesouraria', 'academico', 'usuarios'],
    pedagogico: ['dashboard', 'matriculas', 'turmas', 'cursos', 'formadores', 'academico'],
    tesouraria: ['dashboard', 'tesouraria'],
    formador: ['dashboard', 'academico'],
    recursos_humanos: ['dashboard']
  }

  const visibleTabs = allowedTabs[userTipo] || allowedTabs.admin
  const filteredMenuItems = menuItems.filter(item => visibleTabs.includes(item.id))

  const handleLogout = () => {
    onLogout()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[260px]
          bg-[#0f172a] text-white
          shadow-xl
          transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006c49]">
            <Image src="/LOGOTIPO 02.svg" alt="Academia Kamatambu" width={24} height={24} className="object-contain brightness-0 invert" />
          </div>
          <div>
            <h1 className="text-[17px] font-bold text-white">Kamatambu</h1>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{userNome || 'Admin Portal'}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {filteredMenuItems.map((item) => {
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
                  flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors
                  ${isActive
                    ? 'bg-[#006c49] text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <Icon className="size-[18px] shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3 shrink-0">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="size-[18px] shrink-0" />
            <span className="truncate">Sair da conta</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// ========== TOPBAR COM PESQUISA GLOBAL ==========
function TopBar({ setIsSidebarOpen, onLogout, onSearch, userNome, userTipo, onOpenPerfil }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const menuRef = useRef(null)
  const searchRef = useRef(null)
  const searchTimeoutRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async (query) => {
    setSearchQuery(query)
    setShowResults(true)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await onSearch(query)
        setSearchResults(results || [])
      } catch (error) {
        console.error('Erro na pesquisa:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300)
  }

  const getResultIcon = (type) => {
    switch (type) {
      case 'matricula': return <UserPlus className="size-4 text-blue-600" />
      case 'turma': return <UsersIcon className="size-4 text-purple-600" />
      case 'curso': return <BookOpen className="size-4 text-emerald-600" />
      case 'formador': return <GraduationCap className="size-4 text-amber-600" />
      case 'pagamento': return <Receipt className="size-4 text-indigo-600" />
      case 'nota': return <BookOpenIcon className="size-4 text-rose-600" />
      default: return <Search className="size-4 text-gray-400" />
    }
  }

  const getResultTypeLabel = (type) => {
    switch (type) {
      case 'matricula': return 'Matrícula'
      case 'turma': return 'Turma'
      case 'curso': return 'Curso'
      case 'formador': return 'Formador'
      case 'pagamento': return 'Pagamento'
      case 'nota': return 'Avaliação'
      default: return ''
    }
  }

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-gray-200 bg-white px-4 sm:px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden shrink-0 transition-colors"
        >
          <Menu className="size-5" />
        </button>
        <div className="relative flex-1 max-w-lg min-w-0" ref={searchRef}>
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar alunos, turmas, cursos, formadores..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim()) {
                setShowResults(true)
              }
            }}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#006c49] focus:bg-white focus:ring-1 focus:ring-[#006c49]/20"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSearchResults([])
                setShowResults(false)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="size-4" />
            </button>
          )}

          {showResults && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto rounded-xl bg-white shadow-xl shadow-black/8 border border-gray-200/80 z-50">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="size-5 animate-spin text-[#006c49]" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-1.5">
                  {searchResults.map((result, index) => (
                    <div
                      key={`${result.type}-${result.id}-${index}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setShowResults(false)
                        const tabMap = {
                          'matricula': 'matriculas',
                          'turma': 'turmas',
                          'curso': 'cursos',
                          'formador': 'formadores',
                          'pagamento': 'tesouraria',
                          'nota': 'academico'
                        }
                        if (result.type && tabMap[result.type]) {
                          window.dispatchEvent(new CustomEvent('navigateTo', {
                            detail: { tab: tabMap[result.type], id: result.id }
                          }))
                        }
                        setSearchQuery('')
                        setSearchResults([])
                      }}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 shrink-0">
                        {result.avatar ? (
                          <img src={result.avatar} alt={result.title} className="h-9 w-9 rounded-lg object-cover" />
                        ) : (
                          getResultIcon(result.type)
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900 truncate">{result.title}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#006c49]/8 text-[#006c49] font-semibold whitespace-nowrap">
                            {getResultTypeLabel(result.type)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                      </div>
                      {result.status && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${
                          ['Ativo','Ativa','Inscrito','pago','aprovado'].includes(result.status)
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {result.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-3">
                    <AlertCircle className="size-6 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Nenhum resultado encontrado</p>
                  <p className="text-xs text-gray-400 mt-1">Tente buscar por nome, curso ou turma</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="h-8 w-px bg-gray-200" />
        <div className="relative" ref={menuRef}>
          <button
            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{userNome || 'Utilizador'}</p>
              <p className="text-[11px] font-medium text-gray-500">{userTipo === 'admin' ? 'Administrador' : userTipo === 'tesouraria' ? 'Tesouraria' : userTipo === 'pedagogico' ? 'Pedagógico' : userTipo === 'recursos_humanos' ? 'Recursos Humanos' : userTipo === 'formador' ? 'Formador' : userTipo}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#006c49] to-[#004d34] text-white shadow-md shadow-[#006c49]/20 shrink-0">
              <User className="size-4" />
            </div>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white shadow-xl shadow-black/8 border border-gray-200/80 z-50 overflow-hidden">
              <div className="p-1.5">
                <button
                  onClick={() => { setIsMenuOpen(false); onOpenPerfil && onOpenPerfil() }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="size-4 text-gray-400" />
                  Perfil
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); onLogout() }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="size-4" />
                  Sair da conta
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
  }

  const safeStats = Array.isArray(stats) ? stats : []

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      {safeStats.map((stat, index) => {
        const Icon = typeof stat.icon === 'string' ? iconMap[stat.icon] : stat.icon
        if (!Icon) return null

        return (
          <div
            key={stat.label || index}
            className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stat.value}</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <Icon className="size-4 sm:size-5" />
              </div>
            </div>
            {stat.change && (
              <div className="mt-2 sm:mt-3 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-emerald-700">
                  <ArrowUpRight className="size-3" />
                  {stat.change}
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-400">vs mes anterior</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ========== MATRÍCULAS RECENTES ==========
function MatriculasRecentes({ matriculas, onEdit, onDelete, onView }) {
  const [searchRecent, setSearchRecent] = useState('')

  const getStatusColor = (status) => {
    const colors = {
      'Ativo': 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
      'Inscrito': 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
      'Pendente': 'bg-amber-50 text-amber-700 ring-amber-600/10',
      'Admitido': 'bg-blue-50 text-blue-700 ring-blue-600/10',
      'Concluído': 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
      'Concluido': 'bg-emerald-50 text-emerald-700 ring-emerald-600/10',
      'Cancelado': 'bg-red-50 text-red-700 ring-red-600/10',
      'Desistente': 'bg-red-50 text-red-700 ring-red-600/10',
      'Trancado': 'bg-gray-50 text-gray-600 ring-gray-500/10'
    }
    return colors[status] || 'bg-gray-50 text-gray-600 ring-gray-500/10'
  }

  const safeMatriculas = Array.isArray(matriculas) ? matriculas : []
  const filtered = searchRecent.trim()
    ? safeMatriculas.filter(m =>
        (m.Nome && m.Nome.toLowerCase().includes(searchRecent.toLowerCase())) ||
        (m.Curso && m.Curso.toLowerCase().includes(searchRecent.toLowerCase())) ||
        (m.Turma && m.Turma.toLowerCase().includes(searchRecent.toLowerCase()))
      ).slice(0, 5)
    : safeMatriculas.slice(0, 5)

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm">
      <div className="px-4 sm:px-6 py-3 sm:py-5 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base">Matrículas Recentes</h3>
          <p className="text-[11px] sm:text-sm text-gray-500 mt-0.5">Últimas matrículas realizadas</p>
        </div>
        <button className="text-xs sm:text-sm font-semibold text-[#006c49] hover:text-[#004d34] transition-colors">
          Ver todas
        </button>
      </div>
      <div className="px-4 sm:px-6 py-2 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Buscar matriculas recentes..." value={searchRecent} onChange={(e) => setSearchRecent(e.target.value)} className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-9 pr-3 text-xs text-gray-900 outline-none focus:border-[#006c49] focus:bg-white focus:ring-1 focus:ring-[#006c49]/20" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Nome</th>
              <th className="hidden md:table-cell px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Curso</th>
              <th className="hidden lg:table-cell px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Turma</th>
              <th className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-right text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length > 0 ? (
              filtered.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 sm:px-6 py-2.5 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#006c49] to-[#004d34] text-[9px] sm:text-xs font-bold text-white shrink-0">
                        {student.Nome ? student.Nome.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-xs sm:text-sm">{student.Nome}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">ID: {student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-2.5 sm:py-4 text-gray-600 truncate max-w-[200px]">{student.Curso}</td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-2.5 sm:py-4 text-gray-600">{student.Turma}</td>
                  <td className="px-3 sm:px-6 py-2.5 sm:py-4">
                    <span className={`inline-flex items-center rounded-full px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold ring-1 ring-inset ${getStatusColor(student.Status)}`}>
                      {student.Status || 'Inscrito'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-2.5 sm:py-4 text-right">
                    <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                      <button onClick={() => onView(student)} className="rounded-lg p-1 sm:p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Visualizar">
                        <Eye className="size-3.5 sm:size-4" />
                      </button>
                      <button onClick={() => onEdit(student)} className="rounded-lg p-1 sm:p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Editar">
                        <Edit className="size-3.5 sm:size-4" />
                      </button>
                      <button onClick={() => onDelete(student.id)} className="rounded-lg p-1 sm:p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Excluir">
                        <Trash2 className="size-3.5 sm:size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <UsersIcon className="size-6 text-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Nenhuma matrícula encontrada</p>
                      <p className="text-sm text-gray-400">As matrículas aparecerão aqui</p>
                    </div>
                  </div>
                </td>
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
  const inscricoes = inscricoesPorCurso && inscricoesPorCurso.length > 0
    ? inscricoesPorCurso
    : [
        { name: 'Gestão de Empresas', value: 0 },
        { name: 'Engenharia Software', value: 0 },
        { name: 'Design & UX', value: 0 },
        { name: 'Direito Academico', value: 0 },
        { name: 'Outros', value: 0 }
      ]

  const meses = crescimento && crescimento.length > 0
    ? crescimento
    : ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'].map(m => ({ mes: m, total: 0 }))

  const totalInscricoes = inscricoes.reduce((sum, item) => sum + (item.value || 0), 0)
  const donutColors = ['#006c49', '#1e293b', '#6b7280', '#9ca3af', '#d1d5db']
  const maxVal = Math.max(...meses.map(m => m.total || 0), 1)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500 mt-0.5">Visao geral do desempenho institucional</p>
        </div>
        <button
          onClick={onGeneratePDF}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors w-full sm:w-auto"
        >
          <FileDown className="size-4" />
          Gerar Relatório
        </button>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Growth Chart */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-gray-900">Crescimento de Matrículas</h4>
              <p className="text-sm text-gray-500">Ingressos nos ultimos 6 meses</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
                <g key={i}>
                  <line x1="40" y1={10 + 160 * (1 - pct)} x2="390" y2={10 + 160 * (1 - pct)} stroke="#f1f5f9" strokeWidth="1" />
                  <text x="36" y={14 + 160 * (1 - pct)} textAnchor="end" className="fill-gray-400" style={{ fontSize: '9px' }}>
                    {Math.round(maxVal * pct)}
                  </text>
                </g>
              ))}
              {meses.map((item, index) => {
                const barW = 40
                const totalW = 350
                const spacing = totalW / meses.length
                const x = 45 + index * spacing + (spacing - barW) / 2
                const h = maxVal > 0 ? (item.total / maxVal) * 160 : 0
                return (
                  <g key={`${item.mes}-${index}`}>
                    <rect
                      x={x}
                      y={10 + 160 - h}
                      width={barW}
                      height={h}
                      rx="4"
                      fill="#006c49"
                      className="animate-chart-grow"
                      style={{ transformOrigin: `${x + barW / 2}px ${10 + 160}px`, animationDelay: `${index * 0.12}s` }}
                    />
                    <text x={x + barW / 2} y={6 + 160 - h} textAnchor="middle" className="fill-gray-600" style={{ fontSize: '9px', fontWeight: 600 }}>
                      {item.total}
                    </text>
                    <text x={x + barW / 2} y={188} textAnchor="middle" className="fill-gray-500" style={{ fontSize: '10px', fontWeight: 500 }}>
                      {item.mes}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h4 className="text-base font-bold text-gray-900">Inscrições por Curso</h4>
          <p className="text-sm text-gray-500 mb-4">Distribuição atual</p>
          <div className="flex justify-center mb-4">
            <svg width="160" height="160" viewBox="0 0 160 160">
              {(() => {
                let acc = 0
                const radius = 60
                const circumference = 2 * Math.PI * radius
                return inscricoes.map((item, i) => {
                  const pct = totalInscricoes > 0 ? (item.value / totalInscricoes) : (1 / inscricoes.length)
                  const dashLen = pct * circumference
                  const targetOffset = -acc * circumference
                  acc += pct
                  return (
                    <circle
                      key={`${item.name}-${i}`}
                      cx="80" cy="80" r={radius}
                      fill="none"
                      stroke={donutColors[i % donutColors.length]}
                      strokeWidth="20"
                      strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                      strokeDashoffset={circumference}
                      className="animate-donut"
                      style={{ '--circumference': circumference, '--target-offset': targetOffset, animationDelay: `${i * 0.15}s` }}
                    />
                  )
                })
              })()}
              <text x="80" y="76" textAnchor="middle" className="fill-gray-900" style={{ fontSize: '22px', fontWeight: 700 }}>{totalInscricoes}</text>
              <text x="80" y="94" textAnchor="middle" className="fill-gray-400" style={{ fontSize: '11px' }}>total</text>
            </svg>
          </div>
          <div className="space-y-2">
            {inscricoes.map((item, i) => (
              <div key={`${item.name}-${i}`} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: donutColors[i % donutColors.length] }} />
                  <span className="text-gray-600 truncate">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900 shrink-0 ml-2">{item.value}</span>
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

// ========== DASHBOARD DO FORMADOR ==========
function FormadorDashboard({ turmas, matriculas, notas, userNome, onView }) {
  const minhasTurmas = (turmas || []).filter(t => (t.Formador || '').trim().toLowerCase() === (userNome || '').trim().toLowerCase())

  const getStatusColor = (status) => {
    const colors = {
      'Ativa': 'bg-[#006c49]/10 text-[#006c49]',
      'Inscrito': 'bg-[#006c49]/10 text-[#006c49]',
      'Admitido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Pendente': 'bg-[#c0c1ff]/30 text-[#040057]',
      'Concluída': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Concluido': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Cancelada': 'bg-[#ffdad6] text-[#93000a]',
      'Cancelado': 'bg-[#ffdad6] text-[#93000a]'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const statsCards = [
    { label: 'Minhas Turmas', value: minhasTurmas.length, icon: <GraduationCap className="size-4 sm:size-5" /> },
    { label: 'Meus Formandos', value: matriculas?.length || 0, icon: <UsersIcon className="size-4 sm:size-5" /> },
    { label: 'Avaliações Registadas', value: notas?.length || 0, icon: <Award className="size-4 sm:size-5" /> }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Dashboard</h2>
        <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Visão geral das suas turmas e formandos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
        {statsCards.map((stat, index) => (
          <div key={stat.label || index} className="rounded-xl border border-gray-200 bg-white p-3 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-medium text-gray-500 truncate">{stat.label}</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{stat.value}</p>
              </div>
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#006c49]/10 text-[#006c49]">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm sm:text-base font-bold text-gray-900">As Minhas Turmas</h4>
          <span className="text-[10px] sm:text-xs text-[#45474c]">{minhasTurmas.length} turma{minhasTurmas.length !== 1 ? 's' : ''}</span>
        </div>

        {minhasTurmas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {minhasTurmas.map((turma) => (
              <div key={turma.id} className="rounded-xl border border-[#eceef0] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-[#091426]">{turma.Turma}</h5>
                    <p className="text-xs text-[#45474c]">{turma.Curso} • {turma.Periodo || 'Manhã'}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${getStatusColor(turma.Status)}`}>
                    {turma.Status || 'Pendente'}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#45474c]">Formandos</span>
                    <span className="font-medium">{turma.Numero_Alunos || 0}/{turma.Capacidade_Maxima || 30}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45474c]">Módulo</span>
                    <span className="font-medium">Módulo {turma.Modulo || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45474c]">Período</span>
                    <span className="font-medium">{turma.Periodo || 'Manhã'}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-[#eceef0] pt-3">
                  <button onClick={() => onView(turma)} className="flex-1 rounded-lg border border-[#006c49] px-3 py-1 text-xs text-[#006c49] hover:bg-[#006c49]/5">
                    Ver Turma
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#c5c6cd] bg-white p-6 text-center">
            <GraduationCap className="size-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Ainda não tem turmas atribuídas</p>
            <p className="text-[10px] text-gray-400 mt-1">Assim que lhe for atribuída uma turma, ela aparecerá aqui</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ========== MATRÍCULAS TAB ==========
function MatriculasTab({ matriculas, loading, onEdit, onDelete, onView, onCreate, cursosList, turmasList, onGeneratePDF }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCurso, setFilterCurso] = useState('')
  const [filterTurma, setFilterTurma] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filteredMatriculas, setFilteredMatriculas] = useState([])

  useEffect(() => {
    let filtered = [...(matriculas || [])]
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(m => 
        (m.Nome && m.Nome.toLowerCase().includes(term)) ||
        (m.Curso && m.Curso.toLowerCase().includes(term)) ||
        (m.Turma && m.Turma.toLowerCase().includes(term)) ||
        (m.BI_Cedula && m.BI_Cedula.toLowerCase().includes(term)) ||
        (m.Telefone && m.Telefone.includes(term)) ||
        (m.id && String(m.id).includes(term))
      )
    }
    if (filterCurso) filtered = filtered.filter(m => m.Curso === filterCurso)
    if (filterTurma) filtered = filtered.filter(m => m.Turma === filterTurma)
    if (filterStatus) filtered = filtered.filter(m => m.Status === filterStatus)
    setFilteredMatriculas(filtered)
  }, [matriculas, searchTerm, filterCurso, filterTurma, filterStatus])

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

  const cursosUnicos = [...new Set(matriculas?.map(m => m.Curso).filter(Boolean) || [])]
  const turmasUnicas = [...new Set(matriculas?.map(m => m.Turma).filter(Boolean) || [])]
  const statusUnicos = [...new Set(matriculas?.map(m => m.Status).filter(Boolean) || [])]

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Matrículas</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todas as matrículas da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={onGeneratePDF} className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto">
            <FileDown className="size-3.5 sm:size-4" /> <span>Gerar PDF</span>
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
            <Plus className="size-3.5 sm:size-4" /> Nova Matrícula
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
        <select value={filterCurso} onChange={(e) => setFilterCurso(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todos os Cursos</option>
          {cursosUnicos.map(curso => <option key={curso} value={curso}>{curso}</option>)}
        </select>
        <select value={filterTurma} onChange={(e) => setFilterTurma(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todas as Turmas</option>
          {turmasUnicas.map(turma => <option key={turma} value={turma}>{turma}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todos os Status</option>
          {statusUnicos.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        {(searchTerm || filterCurso || filterTurma || filterStatus) && (
          <button onClick={() => { setSearchTerm(''); setFilterCurso(''); setFilterTurma(''); setFilterStatus('') }} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-[#f7f9fb] transition-colors w-full sm:w-auto flex items-center justify-center gap-1">
            <X className="size-3.5" /> Limpar
          </button>
        )}
      </div>
      <div className="text-xs sm:text-sm text-[#45474c]">
        {filteredMatriculas.length > 0 ? <span>Mostrando <strong>{filteredMatriculas.length}</strong> matrícula{filteredMatriculas.length > 1 ? 's' : ''}</span> : <span>Nenhuma matrícula encontrada</span>}
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
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500"><Loader2 className="size-5 sm:size-6 animate-spin mx-auto" /></td></tr>
              ) : filteredMatriculas.length > 0 ? (
                filteredMatriculas.map((student) => (
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
                        <button onClick={() => onView(student)} className="rounded p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50" title="Visualizar"><Eye className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onEdit(student)} className="rounded p-0.5 sm:p-1 text-green-600 hover:bg-green-50" title="Editar"><Edit className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onDelete(student.id)} className="rounded p-0.5 sm:p-1 text-red-600 hover:bg-red-50" title="Excluir"><Trash2 className="size-3 sm:size-3.5 lg:size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="size-8 text-gray-300" />
                      <p>Nenhuma matrícula encontrada</p>
                      <p className="text-[10px] text-gray-400">Tente ajustar os filtros de busca</p>
                    </div>
                  </td>
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
function TurmasTab({ turmas, loading, onEdit, onDelete, onView, onCreate, cursosList, formadoresList, onGeneratePDF, matriculas }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCurso, setFilterCurso] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filteredTurmas, setFilteredTurmas] = useState([])

  useEffect(() => {
    let filtered = [...(turmas || [])]
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(t => 
        (t.Turma && t.Turma.toLowerCase().includes(term)) ||
        (t.Curso && t.Curso.toLowerCase().includes(term)) ||
        (t.Formador && t.Formador.toLowerCase().includes(term)) ||
        (t.Sala && t.Sala.toLowerCase().includes(term)) ||
        (t.Periodo && t.Periodo.toLowerCase().includes(term)) ||
        (t.id && String(t.id).includes(term))
      )
    }
    if (filterCurso) filtered = filtered.filter(t => t.Curso === filterCurso)
    if (filterStatus) filtered = filtered.filter(t => t.Status === filterStatus)
    setFilteredTurmas(filtered)
  }, [turmas, searchTerm, filterCurso, filterStatus])

  const contarAlunosPorTurma = (curso, turma) => {
    if (!matriculas || !Array.isArray(matriculas)) return 0
    return matriculas.filter(m => m.Curso === curso && m.Turma === turma).length
  }

  const getStatusColor = (status) => {
    const colors = {
      'Ativa': 'bg-[#006c49]/10 text-[#006c49]',
      'Pendente': 'bg-[#c0c1ff]/30 text-[#040057]',
      'Concluída': 'bg-[#6cf8bb]/30 text-[#005236]',
      'Cancelada': 'bg-[#ffdad6] text-[#93000a]'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const cursosUnicos = [...new Set(turmas?.map(t => t.Curso).filter(Boolean) || [])]
  const statusUnicos = [...new Set(turmas?.map(t => t.Status).filter(Boolean) || [])]

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Turmas</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todas as turmas da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={onGeneratePDF} className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto">
            <FileDown className="size-3.5 sm:size-4" /> <span>Gerar PDF</span>
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
            <Plus className="size-3.5 sm:size-4" /> Nova Turma
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
        <select value={filterCurso} onChange={(e) => setFilterCurso(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todos os Cursos</option>
          {cursosUnicos.map(curso => <option key={curso} value={curso}>{curso}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todos os Status</option>
          {statusUnicos.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        {(searchTerm || filterCurso || filterStatus) && (
          <button onClick={() => { setSearchTerm(''); setFilterCurso(''); setFilterStatus('') }} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-[#f7f9fb] transition-colors w-full sm:w-auto flex items-center justify-center gap-1">
            <X className="size-3.5" /> Limpar
          </button>
        )}
      </div>
      <div className="text-xs sm:text-sm text-[#45474c]">
        {filteredTurmas.length > 0 ? <span>Mostrando <strong>{filteredTurmas.length}</strong> turma{filteredTurmas.length > 1 ? 's' : ''}</span> : <span>Nenhuma turma encontrada</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8"><Loader2 className="size-6 sm:size-8 animate-spin text-[#006c49]" /></div>
        ) : filteredTurmas.length > 0 ? (
          filteredTurmas.map((turma) => {
            const totalAlunos = contarAlunosPorTurma(turma.Curso, turma.Turma)
            return (
              <div key={turma.id} className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 lg:p-6 shadow-sm">
                <div className="mb-2 sm:mb-3 flex flex-wrap items-center justify-between gap-1">
                  <h3 className="font-semibold text-[#091426] text-xs sm:text-sm lg:text-base break-words">{turma.Curso} - {turma.Turma}</h3>
                  <span className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-medium shrink-0 ${getStatusColor(turma.Status)}`}>{turma.Status || 'Pendente'}</span>
                </div>
                <div className="space-y-0.5 sm:space-y-1 lg:space-y-2 text-[10px] sm:text-xs lg:text-sm">
                  <p className="text-[#45474c]"><span className="font-medium">Curso:</span> <span className="break-words">{turma.Curso}</span></p>
                  <p className="text-[#45474c]"><span className="font-medium">Turma:</span> {turma.Turma}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Módulo:</span> {turma.Modulo || 1}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Período:</span> {turma.Periodo || 'Manhã'}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Formador:</span> <span className="break-words">{turma.Formador || 'Não definido'}</span></p>
                  <p className="text-[#45474c]"><span className="font-medium">Formandos:</span> {totalAlunos}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Capacidade:</span> {turma.Capacidade_Maxima || 30}</p>
                  <p className="text-[#45474c]"><span className="font-medium">Sala:</span> <span className="break-words">{turma.Sala || 'Não definida'}</span></p>
                </div>
                <div className="mt-2 sm:mt-3 lg:mt-4 flex gap-2 border-t border-[#eceef0] pt-2 sm:pt-3">
                  <button onClick={() => onView(turma)} className="flex-1 rounded-lg border border-[#c5c6cd] px-2 sm:px-3 py-1 text-[10px] sm:text-xs lg:text-sm text-[#45474c] hover:bg-[#f7f9fb]">Ver</button>
                  <button onClick={() => onEdit(turma)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#45474c] hover:bg-[#f7f9fb]"><Edit className="size-3 sm:size-3.5 lg:size-4" /></button>
                  <button onClick={() => onDelete(turma.id)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]"><Trash2 className="size-3 sm:size-3.5 lg:size-4" /></button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <Search className="size-8 text-gray-300" />
              <p>Nenhuma turma encontrada</p>
              <p className="text-[10px] text-gray-400">Tente ajustar os filtros de busca</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ========== CURSOS TAB ==========
function CursosTab({ cursos, loading, onEdit, onDelete, onView, onCreate, onGeneratePDF }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredCursos = Array.isArray(cursos) ? cursos.filter(item => {
    const term = searchTerm?.toLowerCase() || ''
    return item.Nome?.toLowerCase().includes(term) || item.Desc?.toLowerCase().includes(term) || item.Tipo_curso?.toLowerCase().includes(term) || item.Status?.toLowerCase().includes(term) || item.Duracao?.toLowerCase().includes(term)
  }) : []

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Cursos</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todos os cursos da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={onGeneratePDF} className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto">
            <FileDown className="size-3.5 sm:size-4" /> <span>Gerar PDF</span>
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
            <Plus className="size-3.5 sm:size-4" /> Novo Curso
          </button>
        </div>
      </div>
      <div className="relative flex-1 w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
        <input type="text" placeholder="Buscar cursos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8"><Loader2 className="size-6 sm:size-8 animate-spin text-[#006c49]" /></div>
        ) : filteredCursos.length > 0 ? (
          filteredCursos.map((curso) => (
            <div key={curso.id} className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm transition-all hover:shadow-md">
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="mb-2 sm:mb-3 flex flex-wrap items-center justify-between gap-1">
                  <h3 className="font-semibold text-[#091426] text-xs sm:text-sm lg:text-base break-words">{curso.Nome}</h3>
                  <span className="rounded-full bg-[#006c49]/10 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-medium text-[#006c49] shrink-0">{curso.Status || 'Ativo'}</span>
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
                  <button onClick={() => onEdit(curso)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#45474c] hover:bg-[#f7f9fb]"><Edit className="size-3 sm:size-3.5 lg:size-4" /></button>
                  <button onClick={() => onDelete(curso.id)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]"><Trash2 className="size-3 sm:size-3.5 lg:size-4" /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <Search className="size-8 text-gray-300" />
              <p>Nenhum curso encontrado</p>
              <p className="text-[10px] text-gray-400">Tente buscar por nome, descrição ou tipo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ========== FORMADORES TAB ==========
function FormadoresTab({ formadores, loading, onEdit, onDelete, onView, onCreate, onGeneratePDF }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterEspecialidade, setFilterEspecialidade] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filteredFormadores, setFilteredFormadores] = useState([])

  useEffect(() => {
    let filtered = [...(formadores || [])]
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(f => 
        (f.Nome && f.Nome.toLowerCase().includes(term)) ||
        (f.Email && f.Email.toLowerCase().includes(term)) ||
        (f.Especialidade && f.Especialidade.toLowerCase().includes(term)) ||
        (f.Curso && f.Curso.toLowerCase().includes(term)) ||
        (f.Telefone && f.Telefone.includes(term)) ||
        (f.id && String(f.id).includes(term))
      )
    }
    if (filterEspecialidade) filtered = filtered.filter(f => f.Especialidade === filterEspecialidade)
    if (filterStatus) filtered = filtered.filter(f => f.Status === filterStatus)
    setFilteredFormadores(filtered)
  }, [formadores, searchTerm, filterEspecialidade, filterStatus])

  const especialidadesUnicas = [...new Set(formadores?.map(f => f.Especialidade).filter(Boolean) || [])]
  const statusUnicos = [...new Set(formadores?.map(f => f.Status).filter(Boolean) || [])]

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Formadores</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerencie todos os formadores da academia.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={onGeneratePDF} className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto">
            <FileDown className="size-3.5 sm:size-4" /> <span>Gerar PDF</span>
          </button>
          <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
            <Plus className="size-3.5 sm:size-4" /> Novo Formador
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
        <select value={filterEspecialidade} onChange={(e) => setFilterEspecialidade(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todas as Especialidades</option>
          {especialidadesUnicas.map(esp => <option key={esp} value={esp}>{esp}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todos os Status</option>
          {statusUnicos.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        {(searchTerm || filterEspecialidade || filterStatus) && (
          <button onClick={() => { setSearchTerm(''); setFilterEspecialidade(''); setFilterStatus('') }} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-[#f7f9fb] transition-colors w-full sm:w-auto flex items-center justify-center gap-1">
            <X className="size-3.5" /> Limpar
          </button>
        )}
      </div>
      <div className="text-xs sm:text-sm text-[#45474c]">
        {filteredFormadores.length > 0 ? <span>Mostrando <strong>{filteredFormadores.length}</strong> formador{filteredFormadores.length > 1 ? 'es' : ''}</span> : <span>Nenhum formador encontrado</span>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {loading ? (
          <div className="col-span-full flex justify-center py-8"><Loader2 className="size-6 sm:size-8 animate-spin text-[#006c49]" /></div>
        ) : filteredFormadores.length > 0 ? (
          filteredFormadores.map((formador) => (
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
                <span className="rounded-full bg-[#006c49]/10 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] lg:text-xs font-medium text-[#006c49] shrink-0">{formador.Status || 'Ativo'}</span>
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
                <button onClick={() => onEdit(formador)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#45474c] hover:bg-[#f7f9fb]"><Edit className="size-3 sm:size-3.5 lg:size-4" /></button>
                <button onClick={() => onDelete(formador.id)} className="rounded-lg border border-[#c5c6cd] p-1 sm:p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6]"><Trash2 className="size-3 sm:size-3.5 lg:size-4" /></button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            <div className="flex flex-col items-center gap-2">
              <Search className="size-8 text-gray-300" />
              <p>Nenhum formador encontrado</p>
              <p className="text-[10px] text-gray-400">Tente ajustar os filtros de busca</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ========== FINANCEIRO RESUMO ==========
function FinanceiroResumo({ stats }) {
  const formatarMoeda = (valor) => {
    return `Kz ${parseFloat(valor || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`
  }

  const items = [
    { label: 'Total Arrecadado', value: formatarMoeda(stats?.totalArrecadado || 0), icon: TrendingUp, accent: '#006c49' },
    { label: 'Dinheiro Recebido', value: formatarMoeda(stats?.totalDinheiro || 0), icon: Banknote, accent: '#059669' },
    { label: 'Total Saídas', value: formatarMoeda(stats?.totalSaidas || 0), icon: TrendingDown, accent: '#dc2626' },
    { label: 'Total em Atraso', value: formatarMoeda(stats?.totalAtraso || 0), icon: AlertTriangle, accent: '#dc2626' },
    { label: 'Inadimplentes', value: stats?.inadimplentes || 0, icon: UsersIcon, accent: '#ea580c' },
    { label: 'Previsão Mês', value: formatarMoeda(stats?.previsaoMes || 0), icon: CalendarDays, accent: '#2563eb' },
    { label: 'Saldo em Caixa', value: formatarMoeda(stats?.saldoCaixa || 0), icon: Wallet, accent: '#7c3aed' },
    { label: 'Taxa Inadimplência', value: `${stats?.taxaInadimplencia || 0}%`, icon: ShieldAlert, accent: '#ca8a04' }
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-2 sm:gap-3">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 transition-colors hover:bg-gray-50/50"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
                <Icon className="size-4" style={{ color: item.accent }} />
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 leading-tight">{item.label}</p>
            </div>
            <p className="text-sm sm:text-base font-bold text-gray-900">{item.value}</p>
          </div>
        )
      })}
    </div>
  )
}

function GraficoReceitas({ dados }) {
  const [hoveredBar, setHoveredBar] = useState(null)

  const dadosGrafico = dados || [
    { mes: 'JAN', receita: 0, previsao: 0 },
    { mes: 'FEV', receita: 0, previsao: 0 },
    { mes: 'MAR', receita: 0, previsao: 0 },
    { mes: 'ABR', receita: 0, previsao: 0 },
    { mes: 'MAI', receita: 0, previsao: 0 },
    { mes: 'JUN', receita: 0, previsao: 0 }
  ]

  const maxValor = Math.max(...dadosGrafico.map(d => Math.max(d.receita || 0, d.previsao || 0)), 1)
  const H = 150, L = 42, R = 272, T = 16
  const bw = 20
  const n = dadosGrafico.length
  const spacing = (R - L) / n

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-900">Evolucao de Receitas</h4>
        <p className="text-[11px] text-gray-500">Arrecadacao vs previsao mensal</p>
      </div>
      <svg viewBox="0 0 280 195" className="w-full" style={{ height: '180px' }}>
        <defs>
          <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00a36b" />
            <stop offset="100%" stopColor="#006c49" />
          </linearGradient>
          <linearGradient id="barGhost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#006c49" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#006c49" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#006c49" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#006c49" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
          <g key={i}>
            <line x1={L} y1={T + H * (1 - pct)} x2={R} y2={T + H * (1 - pct)} stroke="#f1f5f9" strokeWidth="0.7" />
            <text x={L - 5} y={T + H * (1 - pct) + 3} textAnchor="end" fill="#94a3b8" style={{ fontSize: '7.5px' }}>
              {Math.round(maxValor * pct).toLocaleString('pt-PT')}
            </text>
          </g>
        ))}
        <line x1={L} y1={T + H} x2={R} y2={T + H} stroke="#e2e8f0" strokeWidth="0.5" />

        {dadosGrafico.some(d => d.receita > 0) && (() => {
          const pts = dadosGrafico.map((d, i) => {
            const x = L + i * spacing + spacing / 2
            const y = T + H - (maxValor > 0 ? (d.receita / maxValor) * H : 0)
            return { x, y }
          })
          const areaPath = `M${pts[0].x},${T + H} ` + pts.map(p => `L${p.x},${p.y}`).join(' ') + ` L${pts[pts.length - 1].x},${T + H} Z`
          const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
          return (
            <g>
              <path d={areaPath} fill="url(#areaGrad)" opacity="0.7" />
              <path d={linePath} fill="none" stroke="#006c49" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </g>
          )
        })()}

        {dadosGrafico.map((item, index) => {
          const x = L + index * spacing + (spacing - bw * 2 - 2) / 2
          const hP = maxValor > 0 ? (item.previsao / maxValor) * H : 0
          const hR = maxValor > 0 ? (item.receita / maxValor) * H : 0
          const hovered = hoveredBar === index

          return (
            <g key={index} onMouseEnter={() => setHoveredBar(index)} onMouseLeave={() => setHoveredBar(null)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={T + H - hP} width={bw} height={Math.max(hP, 0)} rx="3" fill="url(#barGhost)" className="animate-chart-grow" style={{ transformOrigin: `${x + bw / 2}px ${T + H}px`, animationDelay: `${index * 0.08}s` }} />
              <rect x={x + bw + 2} y={T + H - hR} width={bw} height={Math.max(hR, 0)} rx="3" fill="url(#barG)" className="animate-chart-grow" style={{ transformOrigin: `${x + bw + 2 + bw / 2}px ${T + H}px`, animationDelay: `${index * 0.08 + 0.04}s`, opacity: hovered ? 1 : 0.85, transition: 'opacity 0.15s' }} />

              {hovered && item.receita > 0 && (
                <g>
                  <rect x={x + bw + 2 - 6} y={T + H - hR - 26} width={bw + 12} height="18" rx="5" fill="#0f172a" opacity="0.92" />
                  <text x={x + bw + 2 + bw / 2} y={T + H - hR - 14} textAnchor="middle" fill="white" style={{ fontSize: '8px', fontWeight: 600 }}>{formatKz(item.receita)}</text>
                </g>
              )}

              <text x={x + bw + 1} y={T + H + 12} textAnchor="middle" fill={hovered ? '#0f172a' : '#94a3b8'} style={{ fontSize: '8px', fontWeight: hovered ? 700 : 500, transition: 'fill 0.15s' }}>{item.mes}</text>
            </g>
          )
        })}
      </svg>
      <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-gray-600">
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-4 rounded-sm" style={{ background: 'linear-gradient(180deg, #00a36b, #006c49)' }} />Receita</div>
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-4 rounded-sm bg-[#006c49]/10" />Previsao</div>
      </div>
    </div>
  )
}

function formatKz(valor) {
  return `Kz ${parseFloat(valor || 0).toLocaleString('pt-PT', { maximumFractionDigits: 0 })}`
}

function GraficoInadimplencia({ inadimplentes }) {
  const [hoveredSlice, setHoveredSlice] = useState(null)

  const dados = inadimplentes?.slice(0, 6) || []
  const donutColors = ['#dc2626', '#ea580c', '#ca8a04', '#6366f1', '#8b5cf6', '#ec4899']
  const totalDebito = dados.reduce((sum, d) => sum + (d.debito || 0), 0)
  const maxDebito = Math.max(...dados.map(d => d.debito || 0), 1)

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-900">Inadimplência</h4>
        <p className="text-[11px] text-gray-500">Alunos com debitos pendentes</p>
      </div>
      {dados.length > 0 ? (
        <>
          <div className="flex justify-center mb-4">
            <div className="relative" style={{ width: 140, height: 140 }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                {(() => {
                  let acc = 0
                  const radius = 52
                  const circumference = 2 * Math.PI * radius
                  return dados.map((item, i) => {
                    const pct = totalDebito > 0 ? (item.debito / totalDebito) : (1 / dados.length)
                    const dashLen = pct * circumference
                    const targetOffset = -acc * circumference
                    acc += pct
                    return (
                      <circle
                        key={i}
                        cx="70" cy="70" r={radius}
                        fill="none"
                        stroke={donutColors[i % donutColors.length]}
                        strokeWidth={hoveredSlice === i ? '21' : '18'}
                        strokeDasharray={`${dashLen} ${circumference - dashLen}`}
                        strokeDashoffset={circumference}
                        className="animate-donut"
                        style={{ '--circumference': circumference, '--target-offset': targetOffset, animationDelay: `${i * 0.15}s`, transition: 'stroke-width 0.2s', filter: hoveredSlice === i ? 'drop-shadow(0 0 4px rgba(0,0,0,0.15))' : 'none' }}
                        onMouseEnter={() => setHoveredSlice(i)}
                        onMouseLeave={() => setHoveredSlice(null)}
                      />
                    )
                  })
                })()}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-gray-900">{formatKz(totalDebito)}</span>
                <span className="text-[8px] text-gray-400">total em atraso</span>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            {dados.map((aluno, index) => {
              const pct = maxDebito > 0 ? (aluno.debito / maxDebito) * 100 : 0
              return (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.08}s` }}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700 truncate mr-2">{aluno.nome}</span>
                    <span className="text-red-600 font-bold shrink-0">{formatKz(aluno.debito)}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: donutColors[index % donutColors.length] }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-400 mt-0.5">{aluno.dias_atraso} dias em atraso</p>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <CheckCircle className="size-10 text-green-500 mb-2" />
          <p className="text-sm font-medium">Nenhum aluno inadimplente</p>
          <p className="text-xs">Todos os pagamentos em dia</p>
        </div>
      )}
    </div>
  )
}

// ========== TESOURARIA TAB ==========
function MatriculasModal({ isOpen, onClose, matriculas, onView, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterCurso, setFilterCurso] = useState('')
  const [filterTurma, setFilterTurma] = useState('')

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

  const cursosUnicos = [...new Set(matriculas?.map(m => m.Curso).filter(Boolean) || [])]
  const turmasUnicas = [...new Set(matriculas?.map(m => m.Turma).filter(Boolean) || [])]
  const statusUnicos = [...new Set(matriculas?.map(m => m.Status).filter(Boolean) || [])]

  const filtered = matriculas ? matriculas.filter(m => {
    if (search.trim()) {
      const term = search.toLowerCase().trim()
      if (!(m.Nome && m.Nome.toLowerCase().includes(term)) &&
          !(m.BI_Cedula && m.BI_Cedula.toLowerCase().includes(term)) &&
          !(m.Telefone && m.Telefone.includes(term)) &&
          !(m.id && String(m.id).includes(term))) return false
    }
    if (filterStatus && m.Status !== filterStatus) return false
    if (filterCurso && m.Curso !== filterCurso) return false
    if (filterTurma && m.Turma !== filterTurma) return false
    return true
  }) : []

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4">
      <div className="flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#eceef0] px-4 sm:px-6 py-3 sm:py-4">
          <h2 className="text-base sm:text-lg font-bold text-[#091426]">Todas as Matrículas</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[#45474c] hover:bg-[#f7f9fb] transition-colors">
            <X className="size-4 sm:size-5" />
          </button>
        </div>

        <div className="border-b border-[#eceef0] px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#45474c]" />
              <input type="text" placeholder="Buscar por nome, BI, telefone..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-9 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none">
              <option value="">Todos Status</option>
              {statusUnicos.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterCurso} onChange={(e) => setFilterCurso(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none">
              <option value="">Todos Cursos</option>
              {cursosUnicos.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={filterTurma} onChange={(e) => setFilterTurma(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none">
              <option value="">Todas Turmas</option>
              {turmasUnicas.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {(search || filterStatus || filterCurso || filterTurma) && (
              <button onClick={() => { setSearch(''); setFilterStatus(''); setFilterCurso(''); setFilterTurma('') }} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-[#f7f9fb] transition-colors">
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#eceef0] sticky top-0">
              <tr>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Nome</th>
                <th className="hidden sm:table-cell px-4 sm:px-6 py-2 sm:py-3 text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Curso</th>
                <th className="hidden lg:table-cell px-4 sm:px-6 py-2 sm:py-3 text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Turma</th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
                <th className="px-4 sm:px-6 py-2 sm:py-3 text-right text-[10px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd]/50">
              {filtered.length > 0 ? filtered.map(m => (
                <tr key={m.id} className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="px-4 sm:px-6 py-2 sm:py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[9px] sm:text-xs font-bold text-[#091426] shrink-0">
                        {m.Nome ? m.Nome.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-[#091426] truncate">{m.Nome}</p>
                        <p className="text-[10px] text-[#45474c]">ID: {m.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-4 sm:px-6 py-2 sm:py-3 text-[#45474c] truncate max-w-[120px]">{m.Curso}</td>
                  <td className="hidden lg:table-cell px-4 sm:px-6 py-2 sm:py-3 text-[#45474c]">{m.Turma}</td>
                  <td className="px-4 sm:px-6 py-2 sm:py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter ${getStatusColor(m.Status)}`}>
                      {m.Status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { onView(m); onClose() }} className="rounded p-1 text-blue-600 hover:bg-blue-50 transition-colors" title="Visualizar"><Eye className="size-3.5 sm:size-4" /></button>
                      <button onClick={() => { onEdit(m); onClose() }} className="rounded p-1 text-green-600 hover:bg-green-50 transition-colors" title="Editar"><Edit className="size-3.5 sm:size-4" /></button>
                      <button onClick={() => { onDelete(m.id); onClose() }} className="rounded p-1 text-red-600 hover:bg-red-50 transition-colors" title="Excluir"><Trash2 className="size-3.5 sm:size-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <UsersIcon className="size-8 text-gray-300" />
                      <p className="text-sm">Nenhuma matrícula encontrada</p>
                      <p className="text-[10px] text-gray-400">Tente ajustar os filtros</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#eceef0] px-4 sm:px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-[#45474c]">Total: <strong>{filtered.length}</strong> matrícula{filtered.length !== 1 ? 's' : ''}</span>
          <button onClick={onClose} className="rounded-lg border border-[#c5c6cd] px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-[#f7f9fb] transition-colors">Fechar</button>
        </div>
      </div>
    </div>
  )
}

function TesourariaTab({ 
  pagamentos, 
  loading, 
  loadingMatriculas,
  onEdit, 
  onDelete, 
  onView, 
  onCreate,
  onGeneratePDF,
  onGerarComprovativo,
  stats,
  inadimplentes,
  matriculas,
  saidas,
  onCreateSaida,
  onEditSaida,
  onDeleteSaida,
  onViewSaida,
  onGerarSaidaPDF,
  onEditMatricula,
  onDeleteMatricula,
  onViewMatricula,
  onCreateMatricula,
  dividas,
  dividasLoading,
  onGerarNotaCobranca,
  onGerarNotasCobrancaAll
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTipo, setFilterTipo] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filteredPagamentos, setFilteredPagamentos] = useState([])
  const [showMatriculasModal, setShowMatriculasModal] = useState(false)
  const [activeSubTab, setActiveSubTab] = useState('entradas')
   const [searchSaida, setSearchSaida] = useState('')
   const [filteredSaidas, setFilteredSaidas] = useState([])

  // Search state for matrículas
  const [searchMatricula, setSearchMatricula] = useState('')
  const [filterCursoMat, setFilterCursoMat] = useState('')
  const [filterTurmaMat, setFilterTurmaMat] = useState('')
  const [filterStatusMat, setFilterStatusMat] = useState('')
  const [filteredMatriculas, setFilteredMatriculas] = useState([])

  useEffect(() => {
    let filtered = [...(pagamentos || [])]
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(p => 
        (p.aluno && p.aluno.toLowerCase().includes(term)) ||
        (p.curso && p.curso.toLowerCase().includes(term)) ||
        (p.tipo && p.tipo.toLowerCase().includes(term)) ||
        (p.id && String(p.id).includes(term))
      )
    }
    if (filterTipo) filtered = filtered.filter(p => p.tipo === filterTipo)
    if (filterStatus) filtered = filtered.filter(p => p.status === filterStatus)
    setFilteredPagamentos(filtered)
  }, [pagamentos, searchTerm, filterTipo, filterStatus])

  useEffect(() => {
    let filtered = [...(matriculas || [])]
    if (searchMatricula.trim()) {
      const term = searchMatricula.toLowerCase().trim()
      filtered = filtered.filter(m => 
        (m.Nome && m.Nome.toLowerCase().includes(term)) ||
        (m.Curso && m.Curso.toLowerCase().includes(term)) ||
        (m.Turma && m.Turma.toLowerCase().includes(term)) ||
        (m.BI_Cedula && m.BI_Cedula.toLowerCase().includes(term)) ||
        (m.Telefone && m.Telefone.includes(term)) ||
        (m.id && String(m.id).includes(term))
      )
    }
    if (filterCursoMat) filtered = filtered.filter(m => m.Curso === filterCursoMat)
    if (filterTurmaMat) filtered = filtered.filter(m => m.Turma === filterTurmaMat)
    if (filterStatusMat) filtered = filtered.filter(m => m.Status === filterStatusMat)
    setFilteredMatriculas(filtered)
  }, [matriculas, searchMatricula, filterCursoMat, filterTurmaMat, filterStatusMat])

   useEffect(() => {
     let filtered = [...(saidas || [])]
     if (searchSaida.trim()) {
       const term = searchSaida.toLowerCase().trim()
       filtered = filtered.filter(s => 
         (s.descricao && s.descricao.toLowerCase().includes(term)) ||
         (s.tipo && s.tipo.toLowerCase().includes(term))
       )
     }
     setFilteredSaidas(filtered)
   }, [saidas, searchSaida])

   const filteredDividas = useMemo(() => {
     if (!searchTerm.trim()) return [...(dividas || [])]
     const term = searchTerm.toLowerCase().trim()
     return (dividas || []).filter(d => 
       (d.aluno && d.aluno.toLowerCase().includes(term)) ||
       (d.curso && d.curso.toLowerCase().includes(term)) ||
       (d.turma && d.turma.toLowerCase().includes(term)) ||
       (d.id && String(d.id).includes(term))
     )
   }, [dividas, searchTerm])

  const getStatusBadge = (status) => {
    const colors = { 'pago': 'bg-green-100 text-green-800', 'pendente': 'bg-yellow-100 text-yellow-800', 'parcial': 'bg-orange-100 text-orange-800', 'cancelado': 'bg-red-100 text-red-800' }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

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

  const getTipoLabel = (tipo) => {
    const tipos = { 'matricula': 'Matrícula', 'mensalidade': 'Mensalidade', 'certificado': 'Certificado', 'taxa': 'Taxa', 'venda': 'Venda de Artigos', 'outro': 'Outro' }
    return tipos[tipo] || tipo
  }

  const formatarMoeda = (valor) => {
    return `Kz ${parseFloat(valor || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`
  }

  const tiposUnicos = [...new Set(pagamentos?.map(p => p.tipo).filter(Boolean) || [])]
  const statusUnicos = [...new Set(pagamentos?.map(p => p.status).filter(Boolean) || [])]
  const cursosUnicosMat = [...new Set(matriculas?.map(m => m.Curso).filter(Boolean) || [])]
  const turmasUnicasMat = [...new Set(matriculas?.map(m => m.Turma).filter(Boolean) || [])]
  const statusUnicosMat = [...new Set(matriculas?.map(m => m.Status).filter(Boolean) || [])]

  const saidasPagas = (saidas || []).filter(s => s.status === 'pago')
  const saidasPorForma = [
    { forma: 'dinheiro', label: 'Dinheiro', icon: Banknote, accent: '#059669' },
    { forma: 'transferencia', label: 'Transferência', icon: ArrowUpRight, accent: '#2563eb' },
    { forma: 'deposito', label: 'Depósito', icon: Landmark, accent: '#7c3aed' },
    { forma: 'multicaixa', label: 'Multicaixa', icon: CreditCard, accent: '#ca8a04' }
  ].map(item => ({
    ...item,
    total: saidasPagas
      .filter(s => (s.forma_pagamento || 'dinheiro') === item.forma)
      .reduce((acc, s) => acc + parseFloat(s.valor || 0), 0)
  }))

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Tesouraria</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gestão financeira e pagamentos da academia</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={onGeneratePDF} className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto">
            <FileDown className="size-3.5 sm:size-4" /> <span>Relatório</span>
          </button>
          {activeSubTab === 'saidas' ? (
            <button onClick={onCreateSaida} className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-600/90 w-full sm:w-auto">
              <Plus className="size-3.5 sm:size-4" /> Nova Saída
            </button>
          ) : (
            <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
              <Plus className="size-3.5 sm:size-4" /> Novo Pagamento
            </button>
          )}
        </div>
      </div>

      <FinanceiroResumo stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <GraficoReceitas dados={stats?.graficoReceitas} />
        <GraficoInadimplencia inadimplentes={inadimplentes} />
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-[#eceef0]">
        <button onClick={() => setActiveSubTab('entradas')} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 ${activeSubTab === 'entradas' ? 'border-[#006c49] text-[#006c49]' : 'border-transparent text-[#45474c] hover:text-[#091426]'}`}>
          <TrendingUp className="size-4" /> Entradas
        </button>
        <button onClick={() => setActiveSubTab('saidas')} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 ${activeSubTab === 'saidas' ? 'border-red-600 text-red-600' : 'border-transparent text-[#45474c] hover:text-[#091426]'}`}>
          <TrendingDown className="size-4" /> Saídas
        </button>
        <button onClick={() => setActiveSubTab('dividas')} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 ${activeSubTab === 'dividas' ? 'border-amber-600 text-amber-600' : 'border-transparent text-[#45474c] hover:text-[#091426]'}`}>
          <AlertTriangle className="size-4" /> Dívidas
        </button>
      </div>

      {activeSubTab === 'entradas' && (<>
      <div className="flex items-center justify-between rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#006c49]/10">
            <UsersIcon className="size-4 sm:size-5 text-[#006c49]" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#091426]">Matrículas</p>
            <p className="text-[10px] sm:text-xs text-[#45474c]">Total de {matriculas?.length || 0} formando{(matriculas?.length || 0) !== 1 ? 's' : ''} registado{(matriculas?.length || 0) !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button onClick={() => setShowMatriculasModal(true)} className="flex items-center gap-1.5 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 transition-colors">
          <Eye className="size-3.5 sm:size-4" /> Ver todas
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar por aluno, curso, tipo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
        <select value={filterTipo} onChange={(e) => setFilterTipo(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todos os Tipos</option>
          {tiposUnicos.map(tipo => <option key={tipo} value={tipo}>{getTipoLabel(tipo)}</option>)}
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
          <option value="">Todos os Status</option>
          {statusUnicos.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
        {(searchTerm || filterTipo || filterStatus) && (
          <button onClick={() => { setSearchTerm(''); setFilterTipo(''); setFilterStatus('') }} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-[#f7f9fb] transition-colors w-full sm:w-auto flex items-center justify-center gap-1">
            <X className="size-3.5" /> Limpar
          </button>
        )}
      </div>

      <div className="text-xs sm:text-sm text-[#45474c]">
        {filteredPagamentos.length > 0 ? <span>Mostrando <strong>{filteredPagamentos.length}</strong> pagamento{filteredPagamentos.length > 1 ? 's' : ''}</span> : <span>Nenhum pagamento encontrado</span>}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
            <thead className="bg-[#eceef0]">
              <tr>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Formando</th>
                <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Curso</th>
                <th className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Tipo</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Valor</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd]/50">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500"><Loader2 className="size-5 sm:size-6 animate-spin mx-auto" /></td></tr>
              ) : filteredPagamentos.length > 0 ? (
                filteredPagamentos.map((pagamento) => (
                  <tr key={pagamento.id} className="transition-colors hover:bg-[#f7f9fb]">
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                      <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                        <div className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[8px] sm:text-[10px] lg:text-xs font-bold text-[#091426]">
                          {pagamento.aluno ? pagamento.aluno.split(' ').map(n => n[0]).join('') : '?'}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#091426] truncate">{pagamento.aluno}</p>
                          <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-[#45474c]">ID: {pagamento.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c] truncate max-w-[80px] sm:max-w-[100px]">{pagamento.curso}</td>
                    <td className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{getTipoLabel(pagamento.tipo)}</td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-semibold text-[#091426]">{formatarMoeda(pagamento.valor)}</td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                      <span className={`rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 text-[7px] sm:text-[9px] lg:text-[11px] font-bold uppercase tracking-tighter ${getStatusBadge(pagamento.status)}`}>
                        {pagamento.status || 'pendente'}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        <button onClick={() => onGerarComprovativo(pagamento)} className="rounded p-0.5 sm:p-1 text-purple-600 hover:bg-purple-50" title="Comprovativo"><FileDown className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onView(pagamento)} className="rounded p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50" title="Visualizar"><Eye className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onEdit(pagamento)} className="rounded p-0.5 sm:p-1 text-green-600 hover:bg-green-50" title="Editar"><Edit className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onDelete(pagamento.id)} className="rounded p-0.5 sm:p-1 text-red-600 hover:bg-red-50" title="Excluir"><Trash2 className="size-3 sm:size-3.5 lg:size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="size-8 text-gray-300" />
                      <p>Nenhum pagamento encontrado</p>
                      <p className="text-[10px] text-gray-400">Tente ajustar os filtros de busca</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {activeSubTab === 'saidas' && (<>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {saidasPorForma.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.forma} className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm transition-colors hover:bg-gray-50/50">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-100">
                  <Icon className="size-4" style={{ color: item.accent }} />
                </div>
                <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 leading-tight">Saídas · {item.label}</p>
              </div>
              <p className="text-sm sm:text-base font-bold text-red-600">- {formatarMoeda(item.total)}</p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder="Buscar por descrição, tipo..." value={searchSaida} onChange={(e) => setSearchSaida(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>
      </div>

      <div className="text-xs sm:text-sm text-[#45474c]">
        {filteredSaidas.length > 0 ? <span>Mostrando <strong>{filteredSaidas.length}</strong> saída{filteredSaidas.length > 1 ? 's' : ''}</span> : <span>Nenhuma saída encontrada</span>}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
            <thead className="bg-[#eceef0]">
              <tr>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Descrição</th>
                <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Tipo</th>
                <th className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Data</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Valor</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd]/50">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500"><Loader2 className="size-5 sm:size-6 animate-spin mx-auto" /></td></tr>
              ) : filteredSaidas.length > 0 ? (
                filteredSaidas.map((saida) => (
                  <tr key={saida.id} className="transition-colors hover:bg-[#f7f9fb]">
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#091426] truncate">{saida.descricao}</p>
                        <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-[#45474c]">ID: {saida.id}</p>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{saida.tipo}</td>
                    <td className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{saida.data_saida}</td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-semibold text-red-600">- {formatarMoeda(saida.valor)}</td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                      <span className={`rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 text-[7px] sm:text-[9px] lg:text-[11px] font-bold uppercase tracking-tighter ${saida.status === 'pago' ? 'bg-red-100 text-red-800' : saida.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}>
                        {saida.status}
                      </span>
                    </td>
                    <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right">
                      <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                        <button onClick={() => onGerarSaidaPDF(saida)} className="rounded p-0.5 sm:p-1 text-purple-600 hover:bg-purple-50" title="Recibo PDF"><FileDown className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onViewSaida(saida)} className="rounded p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50" title="Visualizar"><Eye className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onEditSaida(saida)} className="rounded p-0.5 sm:p-1 text-green-600 hover:bg-green-50" title="Editar"><Edit className="size-3 sm:size-3.5 lg:size-4" /></button>
                        <button onClick={() => onDeleteSaida(saida.id)} className="rounded p-0.5 sm:p-1 text-red-600 hover:bg-red-50" title="Excluir"><Trash2 className="size-3 sm:size-3.5 lg:size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="size-8 text-gray-300" />
                      <p>Nenhuma saída encontrada</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      {activeSubTab === 'dividas' && (<>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Dívidas de Mensalidades</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Formandos em cursos multi-mês com mensalidades em aberto. Cobrança no dia 1 de cada mês.</p>
        </div>
        {(dividas || []).length > 0 && (
          <button onClick={onGerarNotasCobrancaAll} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[#006c49] hover:bg-[#006c49]/5 transition-colors w-full sm:w-auto">
            <FileDown className="size-3.5 sm:size-4" /> Gerar notas (todos)
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 border border-amber-200"><UsersIcon className="size-4 text-amber-600" /></div>
            <p className="text-[10px] sm:text-xs font-medium text-gray-500">Devedores</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-[#091426]">{(dividas || []).length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 border border-red-200"><CalendarDays className="size-4 text-red-600" /></div>
            <p className="text-[10px] sm:text-xs font-medium text-gray-500">Meses em dívida</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{(dividas || []).reduce((s, d) => s + (d.total_meses_devidos || 0), 0)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 border border-red-200"><PiggyBank className="size-4 text-red-600" /></div>
            <p className="text-[10px] sm:text-xs font-medium text-gray-500">Total em dívida</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{formatarMoeda((dividas || []).reduce((s, d) => s + (d.total_divida || 0), 0))}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 border border-amber-200"><Wallet className="size-4 text-amber-600" /></div>
            <p className="text-[10px] sm:text-xs font-medium text-gray-500">Só em atraso</p>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-amber-600">
            {formatarMoeda((dividas || []).reduce((s, d) => s + (d.meses || []).filter(m => m.vencida).reduce((ms, m) => ms + parseFloat(m.valor || 0), 0), 0))}
          </p>
        </div>
      </div>

      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
        <input type="text" placeholder="Buscar por formando, curso, turma..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
      </div>

      <div className="text-xs sm:text-sm text-[#45474c]">
        {filteredDividas.length > 0 ? <span>Mostrando <strong>{filteredDividas.length}</strong> formando{(filteredDividas.length > 1 ? 's' : '')} devedor{(filteredDividas.length > 1 ? 's' : '')}</span> : <span>Nenhum formando com dívida de mensalidade encontrado</span>}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
            <thead className="bg-[#eceef0]">
              <tr>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Formando</th>
                <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Curso</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Turma</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Deve (meses)</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Total (Kz)</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Situação</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd]/50">
              {dividasLoading ? (
                <tr><td colSpan="8" className="px-6 py-8 text-center text-gray-500"><Loader2 className="size-5 sm:size-6 animate-spin mx-auto" /></td></tr>
              ) : filteredDividas.length > 0 ? (
                filteredDividas.map((d) => {
                  const mesesVencidas = (d.meses || []).filter(m => m.vencida)
                  const mesesAVencer = (d.meses || []).filter(m => !m.vencida)
                  const todosVencidos = mesesAVencer.length === 0
                  return (
                    <tr key={d.id} className="transition-colors hover:bg-[#f7f9fb]">
                      <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                          <div className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[8px] sm:text-[10px] lg:text-xs font-bold text-[#091426]">
                            {d.aluno ? d.aluno.split(' ').map(n => n[0]).join('') : '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#091426] truncate">{d.aluno}</p>
                            <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-[#45474c]">ID: {d.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c] truncate max-w-[80px] sm:max-w-[100px]">{d.curso}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{d.turma}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-red-600">{d.total_meses_devidos} {d.total_meses_devidos === 1 ? 'mês' : 'meses'}</span>
                          <div className="mt-0.5 flex flex-wrap gap-0.5">
                            {d.meses.slice(0, 3).map((m) => (
                              <span key={m.id} className={`inline-block rounded px-1 py-0.5 text-[7px] sm:text-[9px] font-medium ${m.vencida ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                                {m.label}
                              </span>
                            ))}
                            {d.meses.length > 3 && (
                              <span className="inline-block rounded px-1 py-0.5 text-[7px] sm:text-[9px] font-medium bg-gray-100 text-gray-700">+{d.meses.length - 3} mais</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-semibold text-[#091426]">{formatarMoeda(d.total_divida)}</td>
                      <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                        <span className={`inline-block rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 text-[7px] sm:text-[9px] lg:text-[11px] font-bold uppercase tracking-tighter ${todosVencidos ? 'bg-red-100 text-red-800' : mesesVencidas.length > 0 ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'}`}>
                          {todosVencidos ? 'Em atraso' : (mesesVencidas.length > 0 ? 'Parcial atraso' : 'A vencer')}
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right">
                        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                          <button onClick={() => onGerarNotaCobranca(d)} className="rounded p-0.5 sm:p-1 text-purple-600 hover:bg-purple-50" title="Nota de Cobrança (PDF)"><FileDown className="size-3 sm:size-3.5 lg:size-4" /></button>
                          <button onClick={() => onViewDivida && onViewDivida(d)} className="rounded p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50" title="Ver dívida"><Eye className="size-3 sm:size-3.5 lg:size-4" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle className="size-8 text-green-500" />
                      <p>Sem dívidas de mensalidades</p>
                      <p className="text-[10px] text-gray-400">Todos os formandos em mãos na atualidade</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </>)}

      <MatriculasModal
        isOpen={showMatriculasModal}
        onClose={() => setShowMatriculasModal(false)}
        matriculas={matriculas}
        onView={onViewMatricula}
        onEdit={onEditMatricula}
        onDelete={onDeleteMatricula}
      />
    </div>
  )
}

// ========== GESTÃO ACADÊMICA TAB ==========
function AcademicoTab({ 
  notas, 
  loading, 
  onEdit, 
  onDelete, 
  onView, 
  onCreate,
  onGerarBoletim,
  onGerarAvaliacao,
  matriculas,
  cursosList,
  formadoresList,
  userTipo
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSubTab, setActiveSubTab] = useState('notas')
  const [filteredNotas, setFilteredNotas] = useState([])
  const [filterDisciplina, setFilterDisciplina] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [gerandoBoletim, setGerandoBoletim] = useState(false)
  const [gerandoAvaliacao, setGerandoAvaliacao] = useState(false)
  const ehFormadorView = userTipo === 'formador'

  useEffect(() => {
    let filtered = [...(notas || [])]
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(n => 
        (n.aluno && n.aluno.toLowerCase().includes(term)) ||
        (n.disciplina && n.disciplina.toLowerCase().includes(term)) ||
        (n.curso && n.curso.toLowerCase().includes(term)) ||
        (n.turma && n.turma.toLowerCase().includes(term))
      )
    }
    if (filterDisciplina) filtered = filtered.filter(n => n.disciplina === filterDisciplina)
    if (filterStatus) filtered = filtered.filter(n => n.status === filterStatus)
    setFilteredNotas(filtered)
  }, [notas, searchTerm, filterDisciplina, filterStatus])

  const getStatusBadge = (status) => {
    const colors = { 'aprovado': 'bg-green-100 text-green-800', 'reprovado': 'bg-red-100 text-red-800', 'recuperacao': 'bg-yellow-100 text-yellow-800', 'pendente': 'bg-gray-100 text-gray-700' }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getTipoLabel = (tipo) => {
    const tipos = { 'prova': 'Prova', 'trabalho': 'Trabalho', 'projeto': 'Projeto', 'exame': 'Exame', 'participacao': 'Participação', 'outro': 'Outro' }
    return tipos[tipo] || tipo
  }

  const formatarNota = (nota) => {
    return parseFloat(nota || 0).toFixed(1)
  }

  const disciplinasUnicas = [...new Set(notas?.map(n => n.disciplina).filter(Boolean) || [])]
  const statusUnicos = [...new Set(notas?.map(n => n.status).filter(Boolean) || [])]

  const subTabs = [
    { id: 'notas', label: 'Notas', icon: <BookOpenIcon className="size-4" /> },
    { id: 'boletins', label: 'Boletins', icon: <Award className="size-4" /> }
  ]

  const calcularMediaAluno = (alunoId) => {
    const notasAluno = notas?.filter(n => n.aluno_id === alunoId) || []
    if (notasAluno.length === 0) return null
    const soma = notasAluno.reduce((sum, n) => sum + parseFloat(n.nota), 0)
    return (soma / notasAluno.length).toFixed(1)
  }

  const handleGerarBoletimClick = async (alunoId) => {
    setGerandoBoletim(true)
    try {
      await onGerarBoletim(alunoId)
    } catch (error) {
      console.error('Erro ao gerar boletim:', error)
    } finally {
      setGerandoBoletim(false)
    }
  }

  const handleGerarAvaliacaoClick = async (alunoId) => {
    setGerandoAvaliacao(true)
    try {
      await onGerarAvaliacao(alunoId)
    } catch (error) {
      console.error('Erro ao gerar avaliação:', error)
    } finally {
      setGerandoAvaliacao(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Gestão Acadêmica</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Notas, avaliações e boletins dos alunos</p>
        </div>
        {ehFormadorView && (
          <div className="w-full sm:w-auto rounded-lg bg-[#006c49]/5 border border-[#006c49]/20 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs text-[#006c49]">
            Só pode avaliar formandos das suas próprias turmas
          </div>
        )}
        <button onClick={onCreate} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
          <Plus className="size-3.5 sm:size-4" /> Nova Avaliação
        </button>
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-[#eceef0]">
        {subTabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 ${activeSubTab === tab.id ? 'border-[#006c49] text-[#006c49]' : 'border-transparent text-[#45474c] hover:text-[#091426]'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeSubTab === 'notas' && (
        <>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
              <input type="text" placeholder="Buscar por aluno, disciplina..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
            </div>
            <select value={filterDisciplina} onChange={(e) => setFilterDisciplina(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
              <option value="">Todas as Disciplinas</option>
              {disciplinasUnicas.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
              <option value="">Todos os Status</option>
              {statusUnicos.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {(searchTerm || filterDisciplina || filterStatus) && (
              <button onClick={() => { setSearchTerm(''); setFilterDisciplina(''); setFilterStatus('') }} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-[#f7f9fb] transition-colors w-full sm:w-auto flex items-center justify-center gap-1">
                <X className="size-3.5" /> Limpar
              </button>
            )}
          </div>
          <div className="text-xs sm:text-sm text-[#45474c]">
            {filteredNotas.length > 0 ? <span>Mostrando <strong>{filteredNotas.length}</strong> avaliação{filteredNotas.length > 1 ? 'ões' : ''}</span> : <span>Nenhuma avaliação encontrada</span>}
          </div>
          <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
                <thead className="bg-[#eceef0]">
                  <tr>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Formando</th>
                    <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Disciplina</th>
                    <th className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Tipo</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Nota</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Status</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c6cd]/50">
                  {loading ? (
                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500"><Loader2 className="size-5 sm:size-6 animate-spin mx-auto" /></td></tr>
                  ) : filteredNotas.length > 0 ? (
                    filteredNotas.map((nota) => (
                      <tr key={nota.id} className="transition-colors hover:bg-[#f7f9fb]">
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                            <div className="flex h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-[#eceef0] text-[8px] sm:text-[10px] lg:text-xs font-bold text-[#091426]">
                              {nota.aluno ? nota.aluno.split(' ').map(n => n[0]).join('') : '?'}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#091426] truncate">{nota.aluno}</p>
                              <p className="text-[8px] sm:text-[10px] lg:text-[11px] text-[#45474c]">ID: {nota.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{nota.disciplina}</td>
                        <td className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c] capitalize">{getTipoLabel(nota.tipo_avaliacao)}</td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-bold text-[#091426]">{formatarNota(nota.nota)}</td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                          <span className={`rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 text-[7px] sm:text-[9px] lg:text-[11px] font-bold uppercase tracking-tighter ${getStatusBadge(nota.status)}`}>
                            {nota.status || 'pendente'}
                          </span>
                        </td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right">
                          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
                            <button onClick={() => onView(nota)} className="rounded p-0.5 sm:p-1 text-blue-600 hover:bg-blue-50" title="Visualizar"><Eye className="size-3 sm:size-3.5 lg:size-4" /></button>
                            <button onClick={() => onEdit(nota)} className="rounded p-0.5 sm:p-1 text-green-600 hover:bg-green-50" title="Editar"><Edit className="size-3 sm:size-3.5 lg:size-4" /></button>
                            <button onClick={() => onDelete(nota.id)} className="rounded p-0.5 sm:p-1 text-red-600 hover:bg-red-50" title="Excluir"><Trash2 className="size-3 sm:size-3.5 lg:size-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <BookOpenIcon className="size-8 text-gray-300" />
                          <p>Nenhuma avaliação encontrada</p>
                          <p className="text-[10px] text-gray-400">Registre as avaliações dos alunos</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeSubTab === 'boletins' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {matriculas?.map((aluno) => {
            const media = calcularMediaAluno(aluno.id)
            const notasAluno = notas?.filter(n => n.aluno_id === aluno.id) || []
            const situacao = media >= 10 ? 'aprovado' : media >= 7 ? 'recuperacao' : media < 7 ? 'reprovado' : 'pendente'
            
            return (
              <div key={aluno.id} className="rounded-xl border border-[#eceef0] bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[#091426]">{aluno.Nome}</h4>
                    <p className="text-xs text-[#45474c]">{aluno.Curso} - {aluno.Turma}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusBadge(situacao)}`}>
                    {media ? (situacao === 'aprovado' ? 'Aprovado' : situacao === 'recuperacao' ? 'Recuperação' : 'Reprovado') : 'Pendente'}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#45474c]">Módulo</span>
                    <span className="font-medium">{aluno.Modulo || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45474c]">Média Final</span>
                    <span className="font-bold text-[#006c49]">{media || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#45474c]">Avaliações</span>
                    <span className="font-medium">{notasAluno.length}</span>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-[#eceef0] pt-3">
                  <button 
                    onClick={() => handleGerarBoletimClick(aluno.id)}
                    disabled={gerandoBoletim || !media}
                    className="flex-1 rounded-lg bg-[#006c49] px-3 py-1 text-xs text-white hover:bg-[#006c49]/90 disabled:opacity-50"
                  >
                    {gerandoBoletim ? <Loader2 className="size-3 animate-spin inline mr-1" /> : <FileDown className="size-3 inline mr-1" />}
                    Gerar Boletim
                  </button>
                  <button 
                    onClick={() => handleGerarAvaliacaoClick(aluno.id)}
                    disabled={gerandoAvaliacao || !media}
                    className="flex-1 rounded-lg border border-[#006c49] px-3 py-1 text-xs text-[#006c49] hover:bg-[#006c49]/5 disabled:opacity-50"
                  >
                    {gerandoAvaliacao ? <Loader2 className="size-3 animate-spin inline mr-1" /> : <FileDown className="size-3 inline mr-1" />}
                    Gerar Avaliação
                  </button>
                </div>
              </div>
            )
          })}
          {(!matriculas || matriculas.length === 0) && (
            <div className="col-span-full text-center py-8 text-gray-500">
              <div className="flex flex-col items-center gap-2">
                <Award className="size-8 text-gray-300" />
                <p>Nenhum aluno matriculado</p>
                <p className="text-[10px] text-gray-400">Cadastre alunos para gerar boletins</p>
              </div>
            </div>
          )}
        </div>
      )}
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

// ========== RECURSOS HUMANOS TAB ==========
function RecursosHumanosTab() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  const [stats, setStats] = useState({ totalFormandos: 0, totalFormadores: 0, totalFuncionarios: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${API_BASE_URL}/api/stats/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success) {
          const s = data.data.stats || []
          setStats({
            totalFormandos: s.find(i => i.label.includes('Formandos'))?.value || 0,
            totalFormadores: s.find(i => i.label.includes('Formadores'))?.value || 0,
          })
        }
      } catch (e) { console.error(e) }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="size-6 animate-spin" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Recursos Humanos</h2>
        <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gestão de pessoal e recursos da academia</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-[#eceef0] bg-white p-5 shadow-sm">
          <p className="text-[11px] uppercase tracking-wider text-[#45474c]">Total Formandos</p>
          <p className="mt-1 text-3xl font-bold text-[#091426]">{stats.totalFormandos}</p>
        </div>
        <div className="rounded-xl border border-[#eceef0] bg-white p-5 shadow-sm">
          <p className="text-[11px] uppercase tracking-wider text-[#45474c]">Total Formadores</p>
          <p className="mt-1 text-3xl font-bold text-[#091426]">{stats.totalFormadores}</p>
        </div>
      </div>
    </div>
  )
}

// ========== UTILIZADORES TAB ==========
function UsuariosTab() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

  const loadUsers = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_BASE_URL}/auth/users`, { headers: { 'Authorization': `Bearer ${token}` } })
      const data = await res.json()
      if (data.success) setUsers(data.data)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  useEffect(() => { loadUsers() }, [])

  const updateTipo = async (userId, tipo) => {
    setSaving(userId)
    try {
      const token = localStorage.getItem('token')
      await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ tipo })
      })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, tipo } : u))
    } catch (e) { console.error(e) }
    setSaving(null)
  }

  const toggleAdmin = async (userId, current) => {
    setSaving(userId)
    try {
      const token = localStorage.getItem('token')
      await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ eAdmin: !current })
      })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, eAdmin: !current } : u))
    } catch (e) { console.error(e) }
    setSaving(null)
  }

  const tipoLabel = { admin: 'Administrador', pedagogico: 'Pedagógico', tesouraria: 'Tesouraria', recursos_humanos: 'Recursos Humanos', formador: 'Formador', pendente: 'Pendente' }
  const tipoColor = { admin: 'bg-purple-100 text-purple-800', pedagogico: 'bg-blue-100 text-blue-800', tesouraria: 'bg-orange-100 text-orange-800', recursos_humanos: 'bg-teal-100 text-teal-800', formador: 'bg-amber-100 text-amber-800', pendente: 'bg-yellow-100 text-yellow-800' }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Utilizadores</h2>
        <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Gerir permissões e tipos de acesso</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
            <thead className="bg-[#eceef0]">
              <tr>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Nome</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Email</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Tipo</th>
                <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c5c6cd]/50">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center"><Loader2 className="size-5 animate-spin mx-auto" /></td></tr>
              ) : users.map(user => (
                <tr key={user.id} className="transition-colors hover:bg-[#f7f9fb]">
                  <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-semibold text-[#091426]">{user.Nome}</td>
                  <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{user.Email}</td>
                  <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                    <select
                      value={user.tipo || 'pendente'}
                      onChange={(e) => updateTipo(user.id, e.target.value)}
                      disabled={saving === user.id}
                      className="rounded-lg border border-[#c5c6cd] bg-white px-2 py-1 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20"
                    >
                      <option value="recursos_humanos">Recursos Humanos</option>
                      <option value="formador">Formador</option>
                      <option value="pendente">Pendente</option>
                      <option value="pedagogico">Pedagógico</option>
                      <option value="tesouraria">Tesouraria</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                    <button
                      onClick={() => toggleAdmin(user.id, user.eAdmin)}
                      disabled={saving === user.id}
                      className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${user.eAdmin ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {user.eAdmin ? 'Sim' : 'Não'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ========== PERFIL MODAL ==========
function PerfilModal({ isOpen, onClose, userNome, userEmail, userId, userTipo, onSave }) {
  const [nome, setNome] = useState(userNome || '')
  const [email, setEmail] = useState(userEmail || '')
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })
  const [activeSection, setActiveSection] = useState('perfil')

  useEffect(() => {
    setNome(userNome || '')
    setEmail(userEmail || '')
  }, [userNome, userEmail])

  if (!isOpen) return null

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg({ type: '', text: '' })
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ Nome: nome, Email: email })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erro ao atualizar perfil')
      onSave(nome, email)
      setMsg({ type: 'success', text: 'Perfil atualizado com sucesso!' })
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg({ type: '', text: '' })
    if (novaSenha !== confirmarSenha) {
      setMsg({ type: 'error', text: 'As senhas não coincidem!' })
      setSaving(false)
      return
    }
    if (novaSenha.length < 6) {
      setMsg({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres!' })
      setSaving(false)
      return
    }
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/${userId}/senha`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ NovaSenha: novaSenha })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Erro ao alterar senha')
      setMsg({ type: 'success', text: 'Senha alterada com sucesso!' })
      setSenhaAtual('')
      setNovaSenha('')
      setConfirmarSenha('')
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  const tipoLabel = { admin: 'Administrador', pedagogico: 'Pedagógico', tesouraria: 'Tesouraria', recursos_humanos: 'Recursos Humanos', pendente: 'Pendente' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006c49]/10 text-[#006c49]">
              <User className="size-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Meu Perfil</h2>
              <p className="text-xs text-gray-500">{tipoLabel[userTipo] || userTipo}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="size-5 text-gray-400" />
          </button>
        </div>

        <div className="flex border-b border-gray-100">
          <button onClick={() => setActiveSection('perfil')} className={`flex-1 py-3 text-sm font-medium transition-colors ${activeSection === 'perfil' ? 'text-[#006c49] border-b-2 border-[#006c49]' : 'text-gray-500 hover:text-gray-700'}`}>
            Dados Pessoais
          </button>
          <button onClick={() => setActiveSection('senha')} className={`flex-1 py-3 text-sm font-medium transition-colors ${activeSection === 'senha' ? 'text-[#006c49] border-b-2 border-[#006c49]' : 'text-gray-500 hover:text-gray-700'}`}>
            Alterar Senha
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {msg.text && (
            <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {msg.text}
            </div>
          )}

          {activeSection === 'perfil' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" required />
              </div>
              <div className="pt-2">
                <button type="submit" disabled={saving} className="w-full py-2.5 rounded-lg bg-[#006c49] text-white text-sm font-semibold hover:bg-[#005236] transition-colors disabled:opacity-50">
                  {saving ? 'A guardar...' : 'Guardar Alterações'}
                </button>
              </div>
            </form>
          )}

          {activeSection === 'senha' && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nova Senha</label>
                <input type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" required minLength={6} placeholder="Mínimo 6 caracteres" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                <input type="password" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" required minLength={6} placeholder="Repita a nova senha" />
              </div>
              <div className="pt-2">
                <button type="submit" disabled={saving} className="w-full py-2.5 rounded-lg bg-[#006c49] text-white text-sm font-semibold hover:bg-[#005236] transition-colors disabled:opacity-50">
                  {saving ? 'A alterar...' : 'Alterar Senha'}
                </button>
              </div>
            </form>
          )}
        </div>
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
  const [userTipo, setUserTipo] = useState('admin')
  const [userNome, setUserNome] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userId, setUserId] = useState(null)
  const [showPerfilModal, setShowPerfilModal] = useState(false)
  const [perfilLoading, setPerfilLoading] = useState(false)
  const router = useRouter()
  const fileInputRef = useRef(null)

  const [matriculas, setMatriculas] = useState([])
  const [turmas, setTurmas] = useState([])
  const [cursos, setCursos] = useState([])
  const [formadores, setFormadores] = useState([])
  const [pagamentos, setPagamentos] = useState([])
  const [dividas, setDividas] = useState([])
  const [dividasLoading, setDividasLoading] = useState(false)
  const [notas, setNotas] = useState([])
  const [criteriosAvaliacao, setCriteriosAvaliacao] = useState([])
  const [saidas, setSaidas] = useState([])
  const [stats, setStats] = useState([])
  const [statsFinanceiro, setStatsFinanceiro] = useState({})
  const [inadimplentes, setInadimplentes] = useState([])
  const [loading, setLoading] = useState({ matriculas: false, turmas: false, cursos: false, formadores: false, pagamentos: false, saidas: false, notas: false, criterios: false })
  const [crescimento, setCrescimento] = useState([])
  const [inscricoesPorCurso, setInscricoesPorCurso] = useState([])
  const [cursosList, setCursosList] = useState([])
  const [turmasList, setTurmasList] = useState([])
  const [formadoresList, setFormadoresList] = useState([])
  const [fotoUrl, setFotoUrl] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [fotoCertificadoUrl, setFotoCertificadoUrl] = useState(null)
  const [fotoCertificadoPreview, setFotoCertificadoPreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalData, setModalData] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, type: '' })
  const [toast, setToast] = useState(null)
  // Estado para armazenar o tipo real da visualização
  const [viewRealType, setViewRealType] = useState('matriculas')
  const [studentSearch, setStudentSearch] = useState('')
  const [studentSearchNotas, setStudentSearchNotas] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [pagoTipo, setPagoTipo] = useState('')

  const uploadToBackend = async (base64Image) => {
    try {
      const token = localStorage.getItem('token')
      var formData = new FormData()
      var blob = await (await fetch(base64Image)).blob()
      formData.append('image', blob, 'upload.jpg')
      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      const data = await response.json()
      if (data.success && data.url) return data.url
      return null
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      return null
    }
  }

  // ========== FUNÇÃO DE PESQUISA GLOBAL ==========
  const handleGlobalSearch = async (query) => {
    if (!query || query.trim().length < 2) return []
    const searchTerm = query.toLowerCase().trim()
    const results = []

    try {
      if (matriculas && matriculas.length > 0) {
        const matchedMatriculas = matriculas.filter(m => 
          (m.Nome && m.Nome.toLowerCase().includes(searchTerm)) ||
          (m.Curso && m.Curso.toLowerCase().includes(searchTerm)) ||
          (m.Turma && m.Turma.toLowerCase().includes(searchTerm)) ||
          (m.BI_Cedula && m.BI_Cedula.toLowerCase().includes(searchTerm)) ||
          (m.Telefone && m.Telefone.includes(searchTerm)) ||
          (m.id && String(m.id).includes(searchTerm))
        )
        matchedMatriculas.forEach(m => {
          results.push({
            id: m.id, type: 'matricula', title: m.Nome || 'Não informado',
            subtitle: `${m.Curso || 'Curso não definido'} • Turma: ${m.Turma || 'Turma não definida'}`,
            status: m.Status || 'Inscrito', avatar: m.Foto_User || null
          })
        })
      }

      if (turmas && turmas.length > 0) {
        const matchedTurmas = turmas.filter(t => 
          (t.Turma && t.Turma.toLowerCase().includes(searchTerm)) ||
          (t.Curso && t.Curso.toLowerCase().includes(searchTerm)) ||
          (t.Formador && t.Formador.toLowerCase().includes(searchTerm)) ||
          (t.Sala && t.Sala.toLowerCase().includes(searchTerm)) ||
          (t.id && String(t.id).includes(searchTerm))
        )
        matchedTurmas.forEach(t => {
          results.push({
            id: t.id, type: 'turma', title: `${t.Curso} - ${t.Turma}`,
            subtitle: `Formador: ${t.Formador || 'Não definido'} • ${t.Periodo || 'Período não definido'}`,
            status: t.Status || 'Pendente', avatar: null
          })
        })
      }

      if (cursos && cursos.length > 0) {
        const matchedCursos = cursos.filter(c => 
          (c.Nome && c.Nome.toLowerCase().includes(searchTerm)) ||
          (c.Desc && c.Desc.toLowerCase().includes(searchTerm)) ||
          (c.Tipo_curso && c.Tipo_curso.toLowerCase().includes(searchTerm)) ||
          (c.id && String(c.id).includes(searchTerm))
        )
        matchedCursos.forEach(c => {
          results.push({
            id: c.id, type: 'curso', title: c.Nome || 'Curso não definido',
            subtitle: `${c.Tipo_curso || 'Tipo não definido'} • ${c.Duracao || 'Duração não definida'}`,
            status: c.Status || 'Ativo', avatar: null
          })
        })
      }

      if (formadores && formadores.length > 0) {
        const matchedFormadores = formadores.filter(f => 
          (f.Nome && f.Nome.toLowerCase().includes(searchTerm)) ||
          (f.Email && f.Email.toLowerCase().includes(searchTerm)) ||
          (f.Especialidade && f.Especialidade.toLowerCase().includes(searchTerm)) ||
          (f.Curso && f.Curso.toLowerCase().includes(searchTerm)) ||
          (f.Telefone && f.Telefone.includes(searchTerm)) ||
          (f.id && String(f.id).includes(searchTerm))
        )
        matchedFormadores.forEach(f => {
          results.push({
            id: f.id, type: 'formador', title: f.Nome || 'Formador não definido',
            subtitle: `${f.Especialidade || 'Especialidade não definida'} • ${f.Curso || 'Curso não definido'}`,
            status: f.Status || 'Ativo', avatar: f.Foto || null
          })
        })
      }

      if (pagamentos && pagamentos.length > 0) {
        const matchedPagamentos = pagamentos.filter(p => 
          (p.aluno && p.aluno.toLowerCase().includes(searchTerm)) ||
          (p.curso && p.curso.toLowerCase().includes(searchTerm)) ||
          (p.tipo && p.tipo.toLowerCase().includes(searchTerm)) ||
          (p.id && String(p.id).includes(searchTerm))
        )
        matchedPagamentos.forEach(p => {
          results.push({
            id: p.id, type: 'pagamento', title: p.aluno || 'Formando não definido',
            subtitle: `${p.curso || 'Curso não definido'} • ${p.tipo || 'Tipo não definido'}`,
            status: p.status || 'pendente', avatar: null
          })
        })
      }

      if (notas && notas.length > 0) {
        const matchedNotas = notas.filter(n => 
          (n.aluno && n.aluno.toLowerCase().includes(searchTerm)) ||
          (n.disciplina && n.disciplina.toLowerCase().includes(searchTerm)) ||
          (n.curso && n.curso.toLowerCase().includes(searchTerm)) ||
          (n.id && String(n.id).includes(searchTerm))
        )
        matchedNotas.forEach(n => {
          results.push({
            id: n.id, type: 'nota', title: n.aluno || 'Formando não definido',
            subtitle: `${n.disciplina || 'Disciplina não definida'} • Nota: ${n.nota}`,
            status: n.status || 'pendente', avatar: null
          })
        })
      }

      return results.slice(0, 15)
    } catch (error) {
      console.error('Erro na pesquisa global:', error)
      return []
    }
  }

  // ========== NAVEGAÇÃO POR PESQUISA ==========
  useEffect(() => {
    const handleNavigateTo = (event) => {
      const { tab, id } = event.detail
      setActiveTab(tab)
      if (id) {
        let item = null
        let type = ''
        if (tab === 'matriculas') { item = matriculas.find(m => m.id === id); type = 'matriculas' }
        else if (tab === 'turmas') { item = turmas.find(t => t.id === id); type = 'turmas' }
        else if (tab === 'cursos') { item = cursos.find(c => c.id === id); type = 'cursos' }
        else if (tab === 'formadores') { item = formadores.find(f => f.id === id); type = 'formadores' }
        else if (tab === 'tesouraria') { item = pagamentos.find(p => p.id === id); type = 'pagamentos' }
        else if (tab === 'academico') { item = notas.find(n => n.id === id); type = 'notas' }
        if (item) { handleOpenModal('view', item, type) }
      }
    }
    window.addEventListener('navigateTo', handleNavigateTo)
    return () => window.removeEventListener('navigateTo', handleNavigateTo)
  }, [matriculas, turmas, cursos, formadores, pagamentos, notas])

  // ========== GERAR PDF ==========
  const getLogoBase64 = async () => {
    try {
      const res = await fetch('/LOGOTIPO 02.svg')
      const svg = await res.text()
      const canvas = document.createElement('canvas')
      const img = new Image()
      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.naturalWidth * 2
          canvas.height = img.naturalHeight * 2
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve(canvas.toDataURL('image/png'))
        }
        img.onerror = () => resolve(null)
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)))
      })
    } catch { return null }
  }

  const PDF_COLORS = {
    primary: [0, 108, 73],
    primaryLight: [230, 245, 240],
    primaryDark: [0, 80, 53],
    dark: [30, 30, 30],
    gray: [100, 100, 100],
    grayLight: [160, 160, 160],
    grayLighter: [220, 220, 220],
    white: [255, 255, 255],
    tableAlt: [246, 250, 248],
    tableHead: [0, 90, 60],
  }

  const addPDFHeader = async (doc, title, stats) => {
    const pageWidth = doc.internal.pageSize.getWidth()
    const logo = await getLogoBase64()
    const lm = 14
    const rm = pageWidth - 14
    const docRef = `REF: AK-${Date.now().toString(36).toUpperCase()}`

    doc.setFillColor(...PDF_COLORS.primary)
    doc.rect(0, 0, pageWidth, 2, 'F')
    doc.setFillColor(...PDF_COLORS.primaryDark)
    doc.rect(0, 2, pageWidth, 0.8, 'F')

    if (logo) {
      doc.addImage(logo, 'PNG', lm, 8, 0, 16)
    }

    const nameX = logo ? lm + 26 : pageWidth / 2
    const nameAlign = logo ? 'left' : 'center'

    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PDF_COLORS.primary)
    doc.text('Academia Kamatambu', nameX, 14, { align: nameAlign })

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...PDF_COLORS.gray)
    doc.text('Centro de Formação Profissional', nameX, 20, { align: nameAlign })

    doc.setDrawColor(...PDF_COLORS.grayLighter)
    doc.setLineWidth(0.15)
    doc.line(lm, 28, rm, 28)

    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...PDF_COLORS.grayLight)
    doc.text(docRef, lm, 32)

    const dataAtual = new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })
    const horaAtual = new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
    doc.text(`${dataAtual} | ${horaAtual}`, rm, 32, { align: 'right' })

    doc.setFillColor(...PDF_COLORS.primaryLight)
    doc.roundedRect(lm, 36, rm - lm, 10, 1.5, 1.5, 'F')
    doc.setDrawColor(...PDF_COLORS.primary)
    doc.setLineWidth(0.3)
    doc.roundedRect(lm, 36, rm - lm, 10, 1.5, 1.5, 'S')

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...PDF_COLORS.dark)
    doc.text(title, pageWidth / 2, 43, { align: 'center' })

    let y = 52
    if (stats && stats.length > 0) {
      const cardWidth = (rm - lm - (stats.length - 1) * 4) / stats.length
      const valueFontSize = 10
      const lineHeight = 4.5
      let maxLines = 1
      stats.forEach(stat => {
        doc.setFontSize(valueFontSize)
        doc.setFont('helvetica', 'bold')
        const lines = doc.splitTextToSize(String(stat.value), cardWidth - 16)
        if (lines.length > maxLines) maxLines = lines.length
      })
      const cardHeight = Math.max(16, 12 + maxLines * lineHeight + 2)
      stats.forEach((stat, i) => {
        const cx = lm + i * (cardWidth + 4)
        doc.setFillColor(...PDF_COLORS.white)
        doc.roundedRect(cx, y, cardWidth, cardHeight, 2, 2, 'F')
        doc.setDrawColor(...PDF_COLORS.grayLighter)
        doc.setLineWidth(0.15)
        doc.roundedRect(cx, y, cardWidth, cardHeight, 2, 2, 'S')
        doc.setFillColor(...PDF_COLORS.primary)
        doc.roundedRect(cx, y, 3, cardHeight, 1, 1, 'F')
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...PDF_COLORS.gray)
        doc.text(stat.label.toUpperCase(), cx + 8, y + 5)
        doc.setFontSize(valueFontSize)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...PDF_COLORS.primary)
        const valueLines = doc.splitTextToSize(String(stat.value), cardWidth - 16)
        valueLines.forEach((line, idx) => {
          doc.text(line, cx + 8, y + 12 + idx * lineHeight)
        })
      })
      y += cardHeight + 6
    }

    doc.setDrawColor(...PDF_COLORS.grayLighter)
    doc.setLineWidth(0.1)
    doc.line(lm, y, rm, y)

    return y + 4
  }

  const addPDFFooter = (doc, pageNum) => {
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const lm = 14
    const rm = pageWidth - 14

    doc.setDrawColor(...PDF_COLORS.grayLighter)
    doc.setLineWidth(0.15)
    doc.line(lm, pageHeight - 16, rm, pageHeight - 16)

    doc.setFillColor(...PDF_COLORS.primary)
    doc.rect(0, pageHeight - 2, pageWidth, 2, 'F')

    doc.setFontSize(6.5)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...PDF_COLORS.grayLight)
    doc.text('Documento confidencial - Uso exclusivo da Administração', lm, pageHeight - 10)

    const totalPages = doc.internal.getNumberOfPages()
    doc.text(`Página ${pageNum} de ${totalPages}`, rm, pageHeight - 10, { align: 'right' })

    doc.setFontSize(6)
    doc.setTextColor(...PDF_COLORS.grayLighter)
    doc.text('Academia Kamatambu | Plataforma de Gestão Académica', pageWidth / 2, pageHeight - 6, { align: 'center' })
  }

  const TABLE_BASE = {
    headStyles: {
      fillColor: PDF_COLORS.tableHead,
      textColor: PDF_COLORS.white,
      fontSize: 7,
      fontStyle: 'bold',
      halign: 'center',
      cellPadding: 3,
      lineWidth: 0.2,
      lineColor: PDF_COLORS.primary,
    },
    alternateRowStyles: { fillColor: PDF_COLORS.tableAlt },
    styles: {
      fontSize: 6.5,
      cellPadding: 2.5,
      halign: 'center',
      textColor: PDF_COLORS.dark,
      lineWidth: 0.1,
      lineColor: PDF_COLORS.grayLighter,
      font: 'helvetica',
    },
    tableLineColor: PDF_COLORS.grayLighter,
    tableLineWidth: 0.1,
  }

  const generateCursosPDF = async () => {
    if (!cursos || cursos.length === 0) { showToast('Nenhum curso encontrado para gerar PDF', 'warning'); return }
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const startY = await addPDFHeader(doc, 'RELATÓRIO DE CURSOS', [
        { label: 'Total de Cursos', value: cursos.length },
        { label: 'Ativos', value: cursos.filter(c => c.Status === 'Ativo').length },
        { label: 'Valor Total', value: `Kz ${cursos.reduce((s, c) => s + parseFloat(c.Valor_curso || 0), 0).toLocaleString('pt-PT')}` },
      ])
      const tableData = cursos.map((c, index) => [
        index + 1, c.Nome || '-', c.Desc || '-', c.Tipo_curso || 'Tecnico',
        `${c.Modulos || 1}o`, c.Edicao || '-', c.Duracao || '-',
        c.Carga_Horaria ? `${c.Carga_Horaria}h` : '-',
        c.Valor_curso ? `Kz ${parseFloat(c.Valor_curso).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` : '0,00',
        c.Status || 'Ativo'
      ])
      autoTable(doc, {
        startY,
        head: [['No', 'Nome do Curso', 'Descrição', 'Tipo', 'Módulo', 'Edição', 'Duração', 'Carga Horária', 'Valor (Kz)', 'Status']],
        body: tableData, theme: 'striped',
        ...TABLE_BASE,
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 32 }, 2: { cellWidth: 32 }, 3: { cellWidth: 22 }, 4: { cellWidth: 14 }, 5: { cellWidth: 14 }, 6: { cellWidth: 16 }, 7: { cellWidth: 18 }, 8: { cellWidth: 24 }, 9: { cellWidth: 16 } },
        didDrawPage: (d) => { addPDFFooter(doc, d.pageNumber) },
      })
      doc.save('cursos_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao gerar PDF:', error); showToast('Erro ao gerar PDF', 'error')
    }
  }

  const generateMatriculasPDF = async () => {
    if (!matriculas || matriculas.length === 0) { showToast('Nenhuma matrícula encontrada para gerar PDF', 'warning'); return }
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const inscritos = matriculas.filter(m => m.Status === 'Inscrito').length
      const concluidos = matriculas.filter(m => m.Status === 'Concluido' || m.Status === 'Concluido').length
      const startY = await addPDFHeader(doc, 'RELATÓRIO DE MATRÍCULAS', [
        { label: 'Total', value: matriculas.length },
        { label: 'Inscritos', value: inscritos },
        { label: 'Concluidos', value: concluidos },
      ])
      const tableData = matriculas.map((m, index) => [
        index + 1, m.Nome || '-', m.Curso || '-', m.Turma || '-',
        `${m.Modulo || 1}o`, m.Status || 'Inscrito', m.BI_Cedula || '-',
        m.Telefone || '-', m.Data_Matricula ? new Date(m.Data_Matricula).toLocaleDateString('pt-PT') : '-'
      ])
      autoTable(doc, {
        startY,
        head: [['No', 'Nome', 'Curso', 'Turma', 'Módulo', 'Status', 'BI/Cédula', 'Telefone', 'Data Matrícula']],
        body: tableData, theme: 'striped',
        ...TABLE_BASE,
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 32 }, 2: { cellWidth: 28 }, 3: { cellWidth: 22 }, 4: { cellWidth: 14 }, 5: { cellWidth: 20 }, 6: { cellWidth: 22 }, 7: { cellWidth: 22 }, 8: { cellWidth: 22 } },
        didDrawPage: (d) => { addPDFFooter(doc, d.pageNumber) },
      })
      doc.save('matriculas_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao gerar PDF:', error); showToast('Erro ao gerar PDF', 'error')
    }
  }

  const generateTurmasPDF = async () => {
    if (!turmas || turmas.length === 0) { showToast('Nenhuma turma encontrada para gerar PDF', 'warning'); return }
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const totalAlunos = turmas.reduce((s, t) => s + parseInt(t.Numero_Alunos || 0), 0)
      const capacidadeTotal = turmas.reduce((s, t) => s + parseInt(t.Capacidade_Maxima || 30), 0)
      const startY = await addPDFHeader(doc, 'RELATÓRIO DE TURMAS', [
        { label: 'Total Turmas', value: turmas.length },
        { label: 'Total Formandos', value: totalAlunos },
        { label: 'Ocupação', value: capacidadeTotal > 0 ? `${Math.round((totalAlunos / capacidadeTotal) * 100)}%` : '0%' },
      ])
      const tableData = turmas.map((t, index) => [
        index + 1, t.Turma || '-', t.Curso || '-', `${t.Modulo || 1}o`,
        t.Periodo || 'Manhã', t.Formador || '-', t.Numero_Alunos || 0,
        t.Capacidade_Maxima || 30, t.Status || 'Pendente'
      ])
      autoTable(doc, {
        startY,
        head: [['No', 'Turma', 'Curso', 'Módulo', 'Período', 'Formador', 'Formandos', 'Capacidade', 'Status']],
        body: tableData, theme: 'striped',
        ...TABLE_BASE,
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 28 }, 2: { cellWidth: 30 }, 3: { cellWidth: 14 }, 4: { cellWidth: 18 }, 5: { cellWidth: 28 }, 6: { cellWidth: 14 }, 7: { cellWidth: 18 }, 8: { cellWidth: 18 } },
        didDrawPage: (d) => { addPDFFooter(doc, d.pageNumber) },
      })
      doc.save('turmas_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao gerar PDF:', error); showToast('Erro ao gerar PDF', 'error')
    }
  }

  const generateFormadoresPDF = async () => {
    if (!formadores || formadores.length === 0) { showToast('Nenhum formador encontrado para gerar PDF', 'warning'); return }
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const startY = await addPDFHeader(doc, 'RELATÓRIO DE FORMADORES', [
        { label: 'Total Formadores', value: formadores.length },
        { label: 'Ativos', value: formadores.filter(f => f.Status === 'Ativo').length },
        { label: 'Especialidades', value: [...new Set(formadores.map(f => f.Especialidade).filter(Boolean))].length },
      ])
      const tableData = formadores.map((f, index) => [
        index + 1, f.Nome || '-', f.Email || '-', f.Telefone || '-',
        f.Especialidade || '-', f.Curso || '-', f.Turmas || 0, f.Status || 'Ativo'
      ])
      autoTable(doc, {
        startY,
        head: [['No', 'Nome', 'Email', 'Telefone', 'Especialidade', 'Curso', 'Turmas', 'Status']],
        body: tableData, theme: 'striped',
        ...TABLE_BASE,
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 36 }, 2: { cellWidth: 48 }, 3: { cellWidth: 26 }, 4: { cellWidth: 30 }, 5: { cellWidth: 30 }, 6: { cellWidth: 14 }, 7: { cellWidth: 16 } },
        didDrawPage: (d) => { addPDFFooter(doc, d.pageNumber) },
      })
      doc.save('formadores_academia_kamatambu.pdf')
      showToast('PDF gerado com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao gerar PDF:', error); showToast('Erro ao gerar PDF', 'error')
    }
  }

  const generateRelatorioGeral = async () => {
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const lm = 14, rm = doc.internal.pageSize.getWidth() - 14
      const startY = await addPDFHeader(doc, 'RELATÓRIO GERAL DA ACADÉMIA', [
        { label: 'Matrículas', value: matriculas?.length || 0 },
        { label: 'Turmas', value: turmas?.length || 0 },
        { label: 'Cursos', value: cursos?.length || 0 },
        { label: 'Formadores', value: formadores?.length || 0 },
      ])
      let y = startY

      const drawSection = (label, headers, data, colWidths) => {
        if (!data || data.length === 0) return
        doc.setFillColor(...PDF_COLORS.primaryLight)
        doc.roundedRect(lm, y - 3, rm - lm, 8, 1.5, 1.5, 'F')
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...PDF_COLORS.primary)
        doc.text(label, lm + 4, y + 2)
        doc.setFontSize(8)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...PDF_COLORS.gray)
        doc.text(`${data.length} registro(s)`, rm - 4, y + 2, { align: 'right' })
        y += 8
        autoTable(doc, {
          startY: y, head: [headers], body: data, theme: 'striped',
          ...TABLE_BASE,
          columnStyles: colWidths,
          didDrawPage: (d) => { addPDFFooter(doc, d.pageNumber) },
        })
        y = doc.lastAutoTable.finalY + 8
      }

      if (matriculas?.length > 0) {
        drawSection('MATRÍCULAS', ['No', 'Nome', 'Curso', 'Turma', 'Status'],
          matriculas.slice(0, 20).map((m, i) => [i + 1, m.Nome || '-', m.Curso || '-', m.Turma || '-', m.Status || '-']),
          { 0: { cellWidth: 10 }, 1: { cellWidth: 40 }, 2: { cellWidth: 35 }, 3: { cellWidth: 30 }, 4: { cellWidth: 20 } }
        )
      }
      if (cursos?.length > 0) {
        drawSection('CURSOS', ['No', 'Nome', 'Tipo', 'Modulos', 'Valor', 'Status'],
          cursos.slice(0, 15).map((c, i) => [i + 1, c.Nome || '-', c.Tipo_curso || '-', `${c.Modulos || 1}o`, c.Valor_curso ? `Kz ${parseFloat(c.Valor_curso).toLocaleString('pt-PT')}` : '-', c.Status || '-']),
          { 0: { cellWidth: 10 }, 1: { cellWidth: 45 }, 2: { cellWidth: 28 }, 3: { cellWidth: 18 }, 4: { cellWidth: 28 }, 5: { cellWidth: 18 } }
        )
      }
      if (turmas?.length > 0) {
        drawSection('TURMAS', ['No', 'Turma', 'Curso', 'Formador', 'Formandos', 'Status'],
          turmas.slice(0, 15).map((t, i) => [i + 1, t.Turma || '-', t.Curso || '-', t.Formador || '-', `${t.Numero_Alunos || 0}/${t.Capacidade_Maxima || 30}`, t.Status || '-']),
          { 0: { cellWidth: 10 }, 1: { cellWidth: 28 }, 2: { cellWidth: 32 }, 3: { cellWidth: 30 }, 4: { cellWidth: 20 }, 5: { cellWidth: 18 } }
        )
      }

      addPDFFooter(doc, 1)
      doc.save('relatorio_geral_academia_kamatambu.pdf')
      showToast('Relatório geral gerado com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao gerar relatorio:', error); showToast('Erro ao gerar relatorio', 'error')
    }
  }

  const generateComprovativoPDF = async (pagamento) => {
    try {
      const nomeFormando = getNomeFormando(pagamento.aluno) || (pagamento.tipo === 'venda' ? 'Venda de Artigos' : '-')
      const tipoLabel = { matricula: 'Matrícula', mensalidade: 'Mensalidade', certificado: 'Certificado', taxa: 'Taxa', venda: 'Venda de Artigos', outro: 'Outro' }[pagamento.tipo] || pagamento.tipo
      const valor = parseFloat(pagamento.valor || 0)
      const statusLabel = { pago: 'PAGO', pendente: 'PENDENTE', parcial: 'PAGO PARCIAL', cancelado: 'CANCELADO' }[pagamento.status] || pagamento.status
      const corStatus = { pago: [0, 150, 0], pendente: [200, 150, 0], parcial: [0, 108, 73], cancelado: [200, 0, 0] }[pagamento.status] || [100, 100, 100]

      const doc = new jsPDF('portrait', 'mm', 'a4')
      const lm = 14
      const rm = doc.internal.pageSize.getWidth() - 14
      const pageWidth = doc.internal.pageSize.getWidth()

      await addPDFHeader(doc, 'COMPROVATIVO DE PAGAMENTO', [
        { label: 'Formando', value: nomeFormando },
        { label: 'Curso', value: pagamento.curso || '-' }
      ])

      let y = 68

      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text(`Ref: AK-PAG-${String(pagamento.id).padStart(4, '0')}`, lm, y)
      doc.text(`Data: ${pagamento.data_pagamento ? new Date(pagamento.data_pagamento).toLocaleDateString('pt-PT') : new Date().toLocaleDateString('pt-PT')}`, rm, y, { align: 'right' })
      y += 12

      doc.setFillColor(...PDF_COLORS.primaryLight)
      doc.roundedRect(lm, y, rm - lm, 50, 2, 2, 'F')
      doc.setDrawColor(...PDF_COLORS.primary)
      doc.setLineWidth(0.3)
      doc.roundedRect(lm, y, rm - lm, 50, 2, 2, 'S')
      y += 8

      const drawField = (label, value, fx, fy) => {
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...PDF_COLORS.gray)
        doc.text(label.toUpperCase(), fx, fy)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...PDF_COLORS.dark)
        doc.text(String(value || '-'), fx, fy + 5)
      }

      drawField('Formando', nomeFormando, lm + 5, y)
      drawField('Curso', pagamento.curso || '-', lm + 90, y)
      y += 14

      drawField('Tipo de Pagamento', tipoLabel, lm + 5, y)
      drawField('Forma de Pagamento', pagamento.forma_pagamento || '-', lm + 90, y)
      y += 14

      drawField('Valor Total', `Kz ${valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, lm + 5, y)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text('ESTADO', lm + 90, y)
      y += 2

      doc.setFillColor(...corStatus)
      doc.roundedRect(lm + 90, y, 40, 8, 2, 2, 'F')
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text(statusLabel, lm + 110, y + 5.5, { align: 'center' })

      y += 22

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PDF_COLORS.dark)
      doc.text('Detalhes do Pagamento', lm, y)
      y += 2

      autoTable(doc, {
        startY: y,
        head: [['Campo', 'Valor']],
        body: [
          ['Formando', nomeFormando],
          ['Curso', pagamento.curso || '-'],
          ['Tipo', tipoLabel],
          ['Valor', `Kz ${valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`],
          ['Forma de Pagamento', pagamento.forma_pagamento || '-'],
          ['Estado', statusLabel],
          ['Data', pagamento.data_pagamento ? new Date(pagamento.data_pagamento).toLocaleDateString('pt-PT') : '-'],
          ['Observação', pagamento.observacao || '-']
        ],
        ...TABLE_BASE,
        columnStyles: {
          0: { cellWidth: 50, fontStyle: 'bold', halign: 'left' },
          1: { cellWidth: 120, halign: 'left' }
        },
        margin: { left: lm, right: 14 }
      })

      y = doc.lastAutoTable.finalY + 15

      doc.setDrawColor(...PDF_COLORS.grayLighter)
      doc.setLineWidth(0.3)
      doc.line(lm, y, lm + 50, y)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text('Assinatura do Responsável', lm + 25, y + 5, { align: 'center' })

      doc.line(rm - 50, y, rm, y)
      doc.text('Assinatura do Formando', rm - 25, y + 5, { align: 'center' })

      addPDFFooter(doc, 1)

      doc.save(`Comprovativo_${nomeFormando.replace(/\s/g, '_')}_${tipoLabel}.pdf`)
      showToast('Comprovativo gerado com sucesso!', 'success')

    } catch (error) {
      console.error('Erro ao gerar comprovativo:', error)
      showToast('Erro ao gerar comprovativo', 'error')
    }
  }

  // ========== NOTA DE COBRANÇA (por formando com dívida) ==========
  const generateNotaCobrancaPDF = async (divida) => {
    if (!divida) { showToast('Sem dados de dívida para gerar nota', 'warning'); return }
    try {
      const meses = (divida.meses || []).slice().sort((a, b) => {
        if (a.data_vencimento && b.data_vencimento) return new Date(a.data_vencimento) - new Date(b.data_vencimento)
        return 0
      })
      const totalDevido = divida.total_divida || meses.reduce((s, m) => s + parseFloat(m.valor || 0), 0)
      const nomeFormando = getNomeFormando(divida.aluno) || divida.aluno || '-'

      const doc = new jsPDF('portrait', 'mm', 'a4')
      const lm = 14
      const rm = doc.internal.pageSize.getWidth() - 14
      const pageWidth = doc.internal.pageSize.getWidth()

      const startY = await addPDFHeader(doc, 'NOTA DE COBRANÇA', [
        { label: 'Formando', value: divida.aluno },
        { label: 'Curso', value: divida.curso },
        { label: 'Total Devido', value: `Kz ${totalDevido.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` }
      ])

      let y = startY

      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text(`Emitido em: ${new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })}`, lm, y)
      doc.text(`Referência: AK-DIV-${String(divida.id).padStart(5, '0')}`, rm, y, { align: 'right' })
      y += 8

      // Box dados pessoais
      doc.setFillColor(...PDF_COLORS.primaryLight)
      doc.roundedRect(lm, y, rm - lm, 40, 2, 2, 'F')
      doc.setDrawColor(...PDF_COLORS.primary)
      doc.setLineWidth(0.3)
      doc.roundedRect(lm, y, rm - lm, 40, 2, 2, 'S')
      y += 10

      const drawField = (label, value, fx, fy) => {
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...PDF_COLORS.gray)
        doc.text(label.toUpperCase(), fx, fy)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...PDF_COLORS.dark)
        doc.text(String(value || '-'), fx, fy + 5)
      }

      drawField('Formando', divida.aluno, lm + 5, y)
      drawField('Curso', divida.curso, lm + 5, y + 8)
      drawField('Turma', divida.turma, lm + 5, y + 16)
      drawField('Telefone', divida.telefone, lm + 60, y)
      drawField('Módulos do curso', divida.modulos_curso || '-', lm + 60, y + 8)
      drawField('Total a pagar', `Kz ${totalDevido.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, lm + 60, y + 16)
      y += 42

      // Lista de meses em dívida
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PDF_COLORS.dark)
      doc.text('Mensalidades em Aberto', lm, y)
      y += 4

      autoTable(doc, {
        startY: y,
        head: [['No', 'Mês Referência', 'Vencimento', 'Valor (Kz)', 'Situação']],
        body: meses.map((m, i) => [
          i + 1,
          m.label || 'Mês desconhecido',
          m.data_vencimento ? new Date(m.data_vencimento).toLocaleDateString('pt-PT') : '-',
          parseFloat(m.valor || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 }),
          m.vencida ? 'VENCIDA' : 'A VENCER'
        ]),
        ...TABLE_BASE,
        columnStyles: {
          0: { cellWidth: 10 },
          1: { cellWidth: 50 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 30 }
        },
        margin: { left: lm, right: 14 },
        didDrawPage: (d) => { addPDFFooter(doc, d.pageNumber) }
      })

      y = doc.lastAutoTable.finalY + 12

      // Destaque do total
      doc.setFillColor(...PDF_COLORS.primary)
      doc.roundedRect(lm, y, rm - lm, 12, 2, 2, 'F')
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PDF_COLORS.white)
      doc.text(`TOTAL A PAGAR: Kz ${totalDevido.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, pageWidth / 2, y + 8, { align: 'center' })
      y += 20

      // Aviso / instruções
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      const aviso = 'Aviso: O pagamento das mensalidades deve ser efectuado até ao dia 1 de cada mês. O não pagamento no prazo implica a suspensão das aulas e a acumulação de dívidas.'
      const avisoSplit = doc.splitTextToSize(aviso, rm - lm)
      doc.text(avisoSplit, lm, y)
      y += avisoSplit.length * 3.6 + 4

      doc.setDrawColor(...PDF_COLORS.grayLighter)
      doc.setLineWidth(0.3)
      doc.line(lm, y, lm + 50, y)
      doc.setFontSize(7)
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text('Assinatura da Academia', lm + 25, y + 5, { align: 'center' })

      doc.line(rm - 50, y, rm, y)
      doc.text('Assinatura do Formando', rm - 25, y + 5, { align: 'center' })

      addPDFFooter(doc, doc.internal.getNumberOfPages())

      doc.save(`Nota_Cobranca_${nomeFormando.replace(/\s/g, '_')}_${divida.id}.pdf`)
      showToast('Nota de cobrança gerada com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao gerar nota de cobrança:', error)
      showToast('Erro ao gerar nota de cobrança', 'error')
    }
  }

  // ========== GERAR NOTAS DE COBRANÇA (todas as dívidas) ==========
  const generateNotasCobrancaAllPDF = async () => {
    if (!dividas || dividas.length === 0) { showToast('Nenhuma dívida encontrada para gerar notas', 'warning'); return }
    try {
      for (const divida of dividas) {
        await generateNotaCobrancaPDF(divida)
      }
      showToast(`${dividas.length} nota(s) de cobrança gerada(s) com sucesso!`, 'success')
    } catch (error) {
      console.error('Erro ao gerar notas de cobrança:', error)
      showToast('Erro ao gerar notas de cobrança', 'error')
    }
  }

  const generateSaidaPDF = async (saida) => {
    try {
      const tipoLabel = { salario: 'Salário', aluguel: 'Aluguel', material: 'Material', equipamento: 'Equipamento', servico: 'Serviço', energia: 'Energia', agua: 'Água', internet: 'Internet', manutencao: 'Manutenção', imposto: 'Imposto', outro: 'Outro' }[saida.tipo] || saida.tipo
      const valor = parseFloat(saida.valor || 0)
      const statusLabel = { pago: 'PAGO', pendente: 'PENDENTE', cancelado: 'CANCELADO' }[saida.status] || saida.status
      const corStatus = { pago: [0, 150, 0], pendente: [200, 150, 0], cancelado: [200, 0, 0] }[saida.status] || [100, 100, 100]

      const doc = new jsPDF('portrait', 'mm', 'a4')
      const lm = 14
      const rm = doc.internal.pageSize.getWidth() - 14

      await addPDFHeader(doc, 'RECIBO DE SAÍDA', [
        { label: 'Tipo', value: tipoLabel },
        { label: 'Valor', value: `Kz ${valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}` }
      ])

      let y = 68

      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text(`Ref: AK-SAI-${String(saida.id).padStart(4, '0')}`, lm, y)
      doc.text(`Data: ${saida.data_saida ? new Date(saida.data_saida).toLocaleDateString('pt-PT') : new Date().toLocaleDateString('pt-PT')}`, rm, y, { align: 'right' })
      y += 12

      doc.setFillColor(254, 226, 226)
      doc.roundedRect(lm, y, rm - lm, 50, 2, 2, 'F')
      doc.setDrawColor(220, 38, 38)
      doc.setLineWidth(0.3)
      doc.roundedRect(lm, y, rm - lm, 50, 2, 2, 'S')
      y += 8

      const drawField = (label, value, fx, fy) => {
        doc.setFontSize(7)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...PDF_COLORS.gray)
        doc.text(label.toUpperCase(), fx, fy)
        doc.setFontSize(10)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(...PDF_COLORS.dark)
        doc.text(String(value || '-'), fx, fy + 5)
      }

      drawField('Descrição', saida.descricao, lm + 5, y)
      drawField('Tipo de Despesa', tipoLabel, lm + 90, y)
      y += 14

      drawField('Valor Total', `Kz ${valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, lm + 5, y)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text('ESTADO', lm + 90, y)
      y += 2

      doc.setFillColor(...corStatus)
      doc.roundedRect(lm + 90, y, 40, 8, 2, 2, 'F')
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text(statusLabel, lm + 110, y + 5.5, { align: 'center' })

      y += 22

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PDF_COLORS.dark)
      doc.text('Detalhes da Saída', lm, y)
      y += 2

      autoTable(doc, {
        startY: y,
        head: [['Campo', 'Valor']],
        body: [
          ['Descrição', saida.descricao || '-'],
          ['Tipo de Despesa', tipoLabel],
          ['Valor', `Kz ${valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`],
          ['Forma de Pagamento', saida.forma_pagamento || '-'],
          ['Estado', statusLabel],
          ['Data', saida.data_saida ? new Date(saida.data_saida).toLocaleDateString('pt-PT') : '-'],
          ['Observação', saida.observacao || '-']
        ],
        ...TABLE_BASE,
        columnStyles: {
          0: { cellWidth: 50, fontStyle: 'bold', halign: 'left' },
          1: { cellWidth: 120, halign: 'left' }
        },
        margin: { left: lm, right: 14 }
      })

      y = doc.lastAutoTable.finalY + 15

      doc.setDrawColor(...PDF_COLORS.grayLighter)
      doc.setLineWidth(0.3)
      doc.line(lm, y, lm + 50, y)
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(...PDF_COLORS.gray)
      doc.text('Assinatura do Responsável', lm + 25, y + 5, { align: 'center' })

      doc.line(rm - 50, y, rm, y)
      doc.text('Assinatura do Beneficiário', rm - 25, y + 5, { align: 'center' })

      addPDFFooter(doc, 1)

      doc.save(`Recibo_Saida_${String(saida.id).padStart(4, '0')}_${tipoLabel.replace(/\s/g, '_')}.pdf`)
      showToast('Recibo de saída gerado com sucesso!', 'success')

    } catch (error) {
      console.error('Erro ao gerar recibo de saída:', error)
      showToast('Erro ao gerar recibo de saída', 'error')
    }
  }

  const generateRelatorioFinanceiro = async () => {
    if (!pagamentos || pagamentos.length === 0) { showToast('Nenhum pagamento encontrado para gerar relatorio', 'warning'); return }
    try {
      const doc = new jsPDF('landscape', 'mm', 'a4')
      const totalArrecadado = pagamentos.reduce((s, p) => s + parseFloat(p.valor || 0), 0)
      const pagos = pagamentos.filter(p => p.status === 'pago' || p.status === 'Pago').length
      const pendentes = pagamentos.filter(p => p.status === 'pendente').length
      const startY = await addPDFHeader(doc, 'RELATÓRIO FINANCEIRO', [
        { label: 'Pagamentos', value: pagamentos.length },
        { label: 'Pago', value: pagos },
        { label: 'Pendente', value: pendentes },
        { label: 'Total Arrecadado', value: `Kz ${totalArrecadado.toLocaleString('pt-PT')}` },
      ])
      const tableData = pagamentos.map((p, index) => [
        index + 1, p.aluno || '-', p.curso || '-',
        p.tipo || '-', p.forma_pagamento || '-',
        `Kz ${parseFloat(p.valor || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`,
        p.status || '-',
        p.data_pagamento ? new Date(p.data_pagamento).toLocaleDateString('pt-PT') : '-'
      ])
      autoTable(doc, {
        startY,
        head: [['No', 'Formando', 'Curso', 'Tipo', 'Forma Pagamento', 'Valor (Kz)', 'Status', 'Data']],
        body: tableData, theme: 'striped',
        ...TABLE_BASE,
        columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 32 }, 2: { cellWidth: 28 }, 3: { cellWidth: 20 }, 4: { cellWidth: 22 }, 5: { cellWidth: 24 }, 6: { cellWidth: 18 }, 7: { cellWidth: 22 } },
        didDrawPage: (d) => { addPDFFooter(doc, d.pageNumber) },
      })
      doc.save('relatorio_financeiro_academia_kamatambu.pdf')
      showToast('Relatório financeiro gerado com sucesso!', 'success')
    } catch (error) {
      console.error('Erro ao gerar relatorio financeiro:', error); showToast('Erro ao gerar relatorio financeiro', 'error')
    }
  }

  const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token')
    const defaultOptions = {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
        ...defaultOptions, ...options,
        headers: { ...defaultOptions.headers, ...options.headers }
      })
      if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/auth/login'
        return { success: false, message: 'Sessão expirada' }
      }
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        return { success: false, message: 'Resposta inválida do servidor' }
      }
      return response.json()
    } catch (error) {
      console.error('Erro na requisição:', error)
      return { success: false, message: 'Erro de rede' }
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 5000)
  }

  const loadData = async () => {
    try {
      const tipoUser = typeof window !== 'undefined' ? localStorage.getItem('userTipo') || 'admin' : 'admin'
      const ehFormadorLogado = tipoUser === 'formador'
       setLoading({ matriculas: true, turmas: true, cursos: true, formadores: true, pagamentos: true, saidas: true, notas: true, criterios: true })
       setDividasLoading(true)
      const token = localStorage.getItem('token')

      try {
        const statsRes = await fetch(`${API_BASE_URL}/api/stats/dashboard`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const statsContentType = statsRes.headers.get('content-type') || ''
        if (!statsContentType.includes('application/json')) {
          throw new Error('Resposta não é JSON')
        }
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
          { label: 'Total Formandos', value: 0, icon: 'UsersIcon', color: 'bg-blue-100 text-blue-600', change: '+0%' },
          { label: 'Cursos Ativos', value: 0, icon: 'BookOpen', color: 'bg-green-100 text-green-600', change: '+0%' },
          { label: 'Turmas', value: 0, icon: 'GraduationCap', color: 'bg-purple-100 text-purple-600', change: '+0%' },
          { label: 'Formadores', value: 0, icon: 'User', color: 'bg-orange-100 text-orange-600', change: '+0%' }
        ])
      }

      const [matriculasRes, turmasRes, cursosRes, formadoresRes, pagamentosRes, financeiroStatsRes, notasRes, criteriosRes, saidasRes, dividasRes] = await Promise.all([
        apiFetch('/matriculas'), apiFetch('/turmas'), apiFetch('/cursos'), apiFetch('/formadores'),
        ehFormadorLogado ? Promise.resolve({ success: false }) : apiFetch('/pagamentos'),
        ehFormadorLogado ? Promise.resolve({ success: false }) : apiFetch('/pagamentos/financeiro/stats'),
        apiFetch('/academico/notas'),
        apiFetch('/criterios-avaliacao'),
        ehFormadorLogado ? Promise.resolve({ success: false }) : apiFetch('/saidas'),
        ehFormadorLogado ? Promise.resolve({ success: false }) : apiFetch('/pagamentos/dividas')
      ])

      if (matriculasRes.success) setMatriculas(matriculasRes.data)
      if (turmasRes.success) setTurmas(turmasRes.data)
      if (cursosRes.success) setCursos(cursosRes.data)
      if (formadoresRes.success) setFormadores(formadoresRes.data)
      if (pagamentosRes.success) setPagamentos(pagamentosRes.data)
      if (financeiroStatsRes.success) {
        setStatsFinanceiro(financeiroStatsRes.data)
        setInadimplentes(financeiroStatsRes.data?.inadimplentesList || [])
      }
      if (notasRes.success) setNotas(notasRes.data)
      if (criteriosRes.success) setCriteriosAvaliacao(criteriosRes.data)
      if (saidasRes.success) setSaidas(saidasRes.data)
      if (dividasRes.success) {
        setDividas(dividasRes.data || [])
      }

      try {
        const [cursosListRes, turmasListRes, formadoresListRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/cursos/lista`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}/api/turmas`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_BASE_URL}/api/formadores/lista`, { headers: { 'Authorization': `Bearer ${token}` } })
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
      setLoading({ matriculas: false, turmas: false, cursos: false, formadores: false, pagamentos: false, saidas: false, notas: false, criterios: false })
      setDividasLoading(false)
    }
  }

  const handleFileUpload = async (e, field = 'Foto_User') => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { showToast('Por favor, selecione uma imagem válida', 'error'); return }
    if (file.size > 5 * 1024 * 1024) { showToast('A imagem deve ter no máximo 5MB', 'error'); return }
    setIsUploading(true)
    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        try {
          const imageUrl = await uploadToBackend(reader.result)
          if (imageUrl) {
            if (field === 'Foto_User') { setFotoUrl(imageUrl); setFotoPreview(reader.result) }
            else { setFotoCertificadoUrl(imageUrl); setFotoCertificadoPreview(reader.result) }
            showToast('Imagem enviada com sucesso!', 'success')
          } else { showToast('Erro ao enviar imagem', 'error') }
        } catch (error) { console.error('Erro:', error); showToast('Erro ao processar imagem', 'error') }
        finally { setIsUploading(false) }
      }
      reader.readAsDataURL(file)
    } catch (error) { console.error('Erro:', error); showToast('Erro ao processar imagem', 'error'); setIsUploading(false) }
  }

  // ========== GERAR BOLETIM (PDF DIRETO NO FRONT) ==========
  const getNomeFormando = (nome) => {
    if (!nome) return ''
    const partes = nome.trim().split(/\s+/)
    if (partes.length <= 2) return nome
    return `${partes[0]} ${partes[partes.length - 1]}`
  }

  const handleGerarBoletim = async (alunoId) => {
    try {
      const aluno = matriculas.find(m => m.id === alunoId)
      if (!aluno) {
        showToast('Formando não encontrado', 'error')
        return
      }

      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/academico/notas/aluno/${alunoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()

      if (!data.success || !data.data || data.data.length === 0) {
        showToast('Este formando não possui notas para gerar boletim', 'warning')
        return
      }

      const notasAvaliacao = data.data.filter(n => n.tipo_avaliacao === 'outro')
      if (notasAvaliacao.length === 0) {
        showToast('Este formando não possui avaliação por critérios registada', 'warning')
        return
      }

      const notasPorDisciplina = {}
      notasAvaliacao.forEach(n => { notasPorDisciplina[n.disciplina] = n })

      const modulo = aluno.Modulo || 1

      const somaNotas = notasAvaliacao.reduce((sum, n) => sum + parseFloat(n.nota), 0)
      const mediaFinal = (somaNotas / notasAvaliacao.length).toFixed(2)

      let situacao = 'aprovado'
      if (mediaFinal >= 10) situacao = 'aprovado'
      else if (mediaFinal >= 7) situacao = 'recuperacao'
      else situacao = 'reprovado'

const situacaoText = situacao === 'aprovado' ? 'Apto' :
                            situacao === 'recuperacao' ? 'Recuperação' : 'Não Apto'
      const corSituacao = situacao === 'aprovado' ? [0, 150, 0] :
                          situacao === 'recuperacao' ? [200, 150, 0] : [200, 0, 0]

      const doc = new jsPDF('portrait', 'mm', 'a4')
      const lm = 14
      const rm = doc.internal.pageSize.getWidth() - 14

let y = await addPDFHeader(doc, 'BOLETIM DO FORMANDO', [
        { label: 'Formando', value: aluno.Nome },
        { label: 'Curso', value: aluno.Curso },
        { label: 'Turma', value: aluno.Turma },
        { label: 'BI', value: aluno.BI_Cedula || '-' }
      ])

       doc.setFontSize(8)
       doc.setFont('helvetica', 'normal')
       doc.setTextColor(...PDF_COLORS.gray)
       doc.text(`Modulo: ${modulo}`, lm, y)
      doc.text(`Data: ${new Date().toLocaleDateString('pt-PT')}`, rm, y, { align: 'right' })
      y += 8

      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PDF_COLORS.dark)
      doc.text(`Media Final: ${mediaFinal}`, lm, y)
      y += 8

      doc.setFillColor(...corSituacao)
      doc.roundedRect(lm, y, 60, 10, 2, 2, 'F')
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text(situacaoText, lm + 30, y + 7, { align: 'center' })
      y += 18

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PDF_COLORS.dark)
      doc.text('Critérios de Avaliação', lm, y)
      y += 2

      autoTable(doc, {
        startY: y,
        head: [['Criterio', 'Indicador', 'Nota', 'Peso (%)', 'Instrumento']],
        body: notasAvaliacao.map(n => {
          const criterio = criteriosAvaliacao.find(c => c.nome === n.disciplina)
          const pesoNota = parseFloat(n.peso) * 20
          return [
            n.disciplina || '-',
            criterio ? criterio.indicador : '-',
            parseFloat(n.nota).toFixed(1),
            `${pesoNota.toFixed(0)}%`,
            criterio ? criterio.instrumento : '-'
          ]
        }),
        ...TABLE_BASE,
        columnStyles: {
          0: { cellWidth: 30, halign: 'left', fontStyle: 'bold' },
          1: { cellWidth: 45, halign: 'left' },
          2: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
          3: { cellWidth: 18, halign: 'center' },
          4: { cellWidth: 50, halign: 'left' }
        },
        margin: { left: lm, right: 14 }
      })

      y = doc.lastAutoTable.finalY + 10

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(...PDF_COLORS.dark)
      doc.text('Escala de Classificação', lm, y)
      y += 2

      autoTable(doc, {
        startY: y,
        head: [['Percentagem', 'Classificacao', 'Resultado']],
        body: [
          ['90% - 100%', 'Excelente', 'Apto'],
          ['75% - 89%', 'Muito Bom', 'Apto'],
          ['60% - 74%', 'Bom', 'Apto'],
          ['50% - 59%', 'Suficiente', 'Apto'],
          ['Abaixo de 50%', 'Insuficiente', 'Não Apto']
        ],
        ...TABLE_BASE,
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 60, fontStyle: 'bold' },
          2: { cellWidth: 40 }
        },
        margin: { left: lm, right: 14 }
      })

      addPDFFooter(doc, 1)

      doc.save(`Boletim_${aluno.Nome.replace(/\s/g, '_')}.pdf`)
      showToast('Boletim gerado com sucesso!', 'success')

    } catch (error) {
      console.error('Erro ao gerar boletim:', error)
      showToast('Erro ao gerar boletim', 'error')
    }
  }

  const generateAvaliacaoPDF = async (alunoId) => {
    try {
      const aluno = matriculas.find(m => m.id === alunoId)
      if (!aluno) {
        showToast('Formando não encontrado', 'error')
        return
      }

      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/api/academico/notas/aluno/${alunoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()

      if (!data.success || !data.data || data.data.length === 0) {
        showToast('Este formando não possui notas para gerar avaliação', 'warning')
        return
      }

      const notasAvaliacao = data.data.filter(n => n.tipo_avaliacao === 'outro')
      if (notasAvaliacao.length === 0) {
        showToast('Este formando não possui avaliação por critérios registada', 'warning')
        return
      }

      const criterios = criteriosAvaliacao
      if (!criterios || criterios.length === 0) {
        showToast('Critérios de avaliação não configurados', 'warning')
        return
      }

      const notasPorDisciplina = {}
      notasAvaliacao.forEach(n => { notasPorDisciplina[n.disciplina] = parseFloat(n.nota) })

      const totalPeso = criterios.reduce((sum, c) => sum + parseFloat(c.peso), 0)
      let somaPonderada = 0
      const linhasTabela = criterios.map(c => {
        const nota = notasPorDisciplina[c.nome] ?? null
        const peso = parseFloat(c.peso)
        const valorPonderado = nota !== null ? (nota * peso / 20) : 0
        somaPonderada += valorPonderado
        return [c.nome, c.indicador, nota !== null ? nota.toFixed(1) : '-', `${peso.toFixed(0)}%`, valorPonderada.toFixed(2)]
      })

      const mediaFinal = totalPeso > 0 ? (somaPonderada / totalPeso * 20).toFixed(1) : '0.0'

      let classificacao = 'Insuficiente'
      let resultado = 'Não Apto'
      let corClassificacao = [200, 0, 0]
      if (mediaFinal >= 90) { classificacao = 'Excelente'; resultado = 'Apto'; corClassificacao = [0, 120, 60] }
      else if (mediaFinal >= 75) { classificacao = 'Muito Bom'; resultado = 'Apto'; corClassificacao = [0, 100, 180] }
      else if (mediaFinal >= 60) { classificacao = 'Bom'; resultado = 'Apto'; corClassificacao = [0, 108, 73] }
      else if (mediaFinal >= 50) { classificacao = 'Suficiente'; resultado = 'Apto'; corClassificacao = [200, 150, 0] }

      const doc = new jsPDF('portrait', 'mm', 'a4')
      const lm = 14
      const rm = doc.internal.pageSize.getWidth() - 14

let y = await addPDFHeader(doc, 'AVALIAÇÃO POR CRITÉRIOS', [
        { label: 'Formando', value: aluno.Nome },
        { label: 'Curso', value: aluno.Curso },
        { label: 'Turma', value: aluno.Turma },
        { label: 'BI', value: aluno.BI_Cedula || '-' }
      ])

       doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(PDF_COLORS.gray[0], PDF_COLORS.gray[1], PDF_COLORS.gray[2])
      doc.text(`Modulo: ${aluno.Modulo || 1}`, lm, y)
      doc.text(`Data: ${new Date().toLocaleDateString('pt-PT')}`, rm, y, { align: 'right' })
      y += 8

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(PDF_COLORS.dark[0], PDF_COLORS.dark[1], PDF_COLORS.dark[2])
      doc.text('Avaliação por Critérios', lm, y)
      y += 2

      autoTable(doc, {
        startY: y,
        head: [['Criterio', 'Indicador', 'Nota', 'Peso', 'Valor Ponderado']],
        body: linhasTabela,
        ...TABLE_BASE,
        columnStyles: {
          0: { cellWidth: 32, halign: 'left', fontStyle: 'bold' },
          1: { cellWidth: 55, halign: 'left' },
          2: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
          3: { cellWidth: 18, halign: 'center' },
          4: { cellWidth: 25, halign: 'center' }
        },
        margin: { left: lm, right: 14 }
      })

      y = doc.lastAutoTable.finalY + 10

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(PDF_COLORS.dark[0], PDF_COLORS.dark[1], PDF_COLORS.dark[2])
      doc.text('Resultado Final', lm, y)
      y += 2

      autoTable(doc, {
        startY: y,
        head: [['Nota Final', 'Classificacao', 'Resultado']],
        body: [[mediaFinal, classificacao, resultado]],
        ...TABLE_BASE,
        headStyles: {
          ...TABLE_BASE.headStyles,
          fillColor: corClassificacao
        },
        columnStyles: {
          0: { cellWidth: 40, fontStyle: 'bold', fontSize: 10 },
          1: { cellWidth: 60, fontSize: 10 },
          2: { cellWidth: 50, fontSize: 10, fontStyle: 'bold' }
        },
        margin: { left: lm, right: 14 }
      })

      y = doc.lastAutoTable.finalY + 10

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(PDF_COLORS.dark[0], PDF_COLORS.dark[1], PDF_COLORS.dark[2])
      doc.text('Escala de Classificação', lm, y)
      y += 2

      autoTable(doc, {
        startY: y,
        head: [['Percentagem', 'Classificacao', 'Resultado']],
        body: [
          ['90% - 100%', 'Excelente', 'Apto'],
          ['75% - 89%', 'Muito Bom', 'Apto'],
          ['60% - 74%', 'Bom', 'Apto'],
          ['50% - 59%', 'Suficiente', 'Apto'],
          ['Abaixo de 50%', 'Insuficiente', 'Não Apto']
        ],
        ...TABLE_BASE,
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 60, fontStyle: 'bold' },
          2: { cellWidth: 40 }
        },
        margin: { left: lm, right: 14 }
      })

      y = doc.lastAutoTable.finalY + 10

      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(PDF_COLORS.dark[0], PDF_COLORS.dark[1], PDF_COLORS.dark[2])
      doc.text('Observacao', lm, y)
      y += 2

      doc.setDrawColor(PDF_COLORS.grayLighter[0], PDF_COLORS.grayLighter[1], PDF_COLORS.grayLighter[2])
      doc.setLineWidth(0.3)
      doc.roundedRect(lm, y, rm - lm, 40, 2, 2)

      for (let i = 0; i < 5; i++) {
        doc.setDrawColor(PDF_COLORS.grayLighter[0], PDF_COLORS.grayLighter[1], PDF_COLORS.grayLighter[2])
        doc.setLineWidth(0.15)
        doc.line(lm + 5, y + 8 + (i * 7), rm - 5, y + 8 + (i * 7))
      }

      addPDFFooter(doc, 1)

      doc.save(`Avaliacao_${aluno.Nome.replace(/\s/g, '_')}.pdf`)
      showToast('Avaliação gerada com sucesso!', 'success')

    } catch (error) {
      console.error('Erro ao gerar avaliação:', error)
      showToast('Erro ao gerar avaliação', 'error')
    }
  }

  // ========== HANDLE OPEN MODAL - CORRIGIDO ==========
  const handleOpenModal = (type, data = null, realType = null) => {
    // Se for 'view', abre o modal de visualização
    if (type === 'view') {
      setModalType('view')
      setModalData(data)
      setViewRealType(realType || 'matriculas')
      setFotoUrl(null)
      setFotoPreview(null)
      setFotoCertificadoUrl(null)
      setFotoCertificadoPreview(null)
      setModalOpen(true)
      return
    }
    
    // Para criação ou edição
    setModalType(type)
    setModalData(data)
    setFotoUrl(null)
    setFotoPreview(null)
    setFotoCertificadoUrl(null)
    setFotoCertificadoPreview(null)
    setStudentSearch(data?.aluno || '')
    setStudentSearchNotas('')
    setPagoTipo(data?.tipo || (type === 'pagamentos' ? 'mensalidade' : ''))
    setShowDropdown(false)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setModalData(null)
    setFotoUrl(null)
    setFotoPreview(null)
    setFotoCertificadoUrl(null)
    setFotoCertificadoPreview(null)
  }

  // ========== HANDLE CREATE ==========
  const handleCreate = async (data, type) => {
    setModalLoading(true)
    try {
      if (type === 'cursos') {
        if (data.Valor_curso) { data.Valor_curso = String(data.Valor_curso) } else { data.Valor_curso = "0.00" }
        const tiposValidos = ['Formação profissional inicial', 'Formação profissional continua', 'Formação profissional de dupla Certificação']
        if (!tiposValidos.includes(data.Tipo_curso)) data.Tipo_curso = 'Formação profissional inicial'
        const edicoesValidas = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º']
        if (!edicoesValidas.includes(data.Edicao)) data.Edicao = '1º'
        const statusValidos = ['Ativo', 'Inativo', 'Em desenvolvimento']
        if (!statusValidos.includes(data.Status)) data.Status = 'Ativo'
        if (data.Modulos) data.Modulos = parseInt(data.Modulos)
        if (data.Carga_Horaria) data.Carga_Horaria = parseInt(data.Carga_Horaria)
        else data.Carga_Horaria = null
      }

      if (type === 'notas' || type === 'academico') {
        const hasCriterios = Object.keys(data).some(k => k.startsWith('nota_'))
        if (hasCriterios) {
          if (!data.aluno_id) {
            showToast('Selecione um aluno', 'error')
            setModalLoading(false)
            return
          }
          const aluno = matriculas.find(m => m.id === parseInt(data.aluno_id))
          if (!aluno) {
            showToast('Formando não encontrado', 'error')
            setModalLoading(false)
            return
          }
          const criterioFields = Object.keys(data).filter(k => k.startsWith('nota_'))
          let erros = 0
          let criados = 0
          for (const campo of criterioFields) {
            const criterioId = parseInt(campo.replace('nota_', ''))
            const criterio = criteriosAvaliacao.find(c => c.id === criterioId)
            const notaVal = parseFloat(data[campo])
            if (!criterio || isNaN(notaVal) || notaVal < 0 || notaVal > 20) {
              erros++
              continue
            }
            let statusNota = 'pendente'
            if (notaVal >= 10) statusNota = 'aprovado'
            else if (notaVal >= 7) statusNota = 'recuperacao'
            else statusNota = 'reprovado'
            const notaData = {
              aluno_id: parseInt(data.aluno_id),
              aluno: aluno.Nome,
              curso: aluno.Curso,
              turma: aluno.Turma,
              disciplina: criterio.nome,
              modulo: parseInt(data.modulo) || 1,
              tipo_avaliacao: 'outro',
              nota: notaVal,
              peso: parseFloat(criterio.peso) / 20,
              data_avaliacao: data.data_avaliacao || null,
              observacao: data.observacao_geral || null,
              formador: data.formador || null,
              status: statusNota
            }
            const res = await apiFetch('/academico/notas', { method: 'POST', body: JSON.stringify(notaData) })
            if (res.success) criados++
          }
          if (erros > 0) {
            showToast(`${erros} criterio(s) com nota invalida.`, 'warning')
          }
          if (criados > 0) {
            showToast(`${criados} avaliacao(oes) registada(s) com sucesso!`, 'success')
            setModalOpen(false); setFotoUrl(null); setFotoPreview(null); loadData()
          }
          setModalLoading(false)
          return
        }
        if (!data.aluno_id || !data.disciplina || !data.nota) {
          showToast('Formando, disciplina e nota são obrigatórios', 'error')
          setModalLoading(false)
          return
        }
        const nota = parseFloat(data.nota)
        let status = 'pendente'
        if (nota >= 10) status = 'aprovado'
        else if (nota >= 7) status = 'recuperacao'
        else if (nota < 7) status = 'reprovado'
        data.status = status
        data.tipo_avaliacao = data.tipo_avaliacao || 'prova'
        data.modulo = data.modulo || 1
      }

      if (type === 'saidas') {
        if (data.valor) data.valor = parseFloat(data.valor)
      }

      if (fotoUrl) data.Foto_User = fotoUrl
      if (fotoCertificadoUrl) data.Foto_Certificado = fotoCertificadoUrl

      const endpoint = type === 'notas' || type === 'academico' ? '/academico/notas' : `/${type}`
      const response = await apiFetch(endpoint, { method: 'POST', body: JSON.stringify(data) })
      
      if (response.success) {
        showToast(response.message || `${type === 'notas' || type === 'academico' ? 'Avaliação' : type === 'saidas' ? 'Saída' : type.slice(0, -1)} criado com sucesso!`, 'success')
        setModalOpen(false); setFotoUrl(null); setFotoPreview(null); setFotoCertificadoUrl(null); setFotoCertificadoPreview(null); loadData()
      } else {
        console.error('Erro do backend:', response); showToast(response.message || 'Erro ao criar', 'error')
      }
    } catch (error) {
      console.error('Erro detalhado:', error); showToast('Erro ao criar', 'error')
    } finally { setModalLoading(false) }
  }

  // ========== HANDLE UPDATE ==========
  const handleUpdate = async (id, data, type) => {
    setModalLoading(true)
    try {
      if (type === 'cursos') {
        if (data.Valor_curso) { data.Valor_curso = String(data.Valor_curso) } else { data.Valor_curso = "0.00" }
        const tiposValidos = ['Formação profissional inicial', 'Formação profissional continua', 'Formação profissional de dupla Certificação']
        if (!tiposValidos.includes(data.Tipo_curso)) data.Tipo_curso = 'Formação profissional inicial'
        const edicoesValidas = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º', '9º', '10º']
        if (!edicoesValidas.includes(data.Edicao)) data.Edicao = '1º'
        const statusValidos = ['Ativo', 'Inativo', 'Em desenvolvimento']
        if (!statusValidos.includes(data.Status)) data.Status = 'Ativo'
        if (data.Modulos) data.Modulos = parseInt(data.Modulos)
        if (data.Carga_Horaria) data.Carga_Horaria = parseInt(data.Carga_Horaria)
        else data.Carga_Horaria = null
      }

      if (type === 'notas' || type === 'academico') {
        if (data.nota) {
          const nota = parseFloat(data.nota)
          let status = 'pendente'
          if (nota >= 10) status = 'aprovado'
          else if (nota >= 7) status = 'recuperacao'
          else if (nota < 7) status = 'reprovado'
          data.status = status
        }
      }

      if (type === 'saidas') {
        if (data.valor) data.valor = parseFloat(data.valor)
      }

      if (fotoUrl) data.Foto_User = fotoUrl
      if (fotoCertificadoUrl) data.Foto_Certificado = fotoCertificadoUrl

      const endpoint = type === 'notas' || type === 'academico' ? `/academico/notas/${id}` : `/${type}/${id}`
      const response = await apiFetch(endpoint, { method: 'PUT', body: JSON.stringify(data) })
      
      if (response.success) {
        showToast(`${type === 'notas' || type === 'academico' ? 'Avaliação' : type === 'saidas' ? 'Saída' : type.slice(0, -1)} atualizado com sucesso!`, 'success')
        setModalOpen(false); setFotoUrl(null); setFotoPreview(null); setFotoCertificadoUrl(null); setFotoCertificadoPreview(null); loadData()
      } else {
        console.error('Erro do backend:', response); showToast(response.message || 'Erro ao atualizar', 'error')
      }
    } catch (error) {
      console.error('Erro detalhado:', error); showToast('Erro ao atualizar', 'error')
    } finally { setModalLoading(false) }
  }

  const handleDelete = async () => {
    const { id, type } = confirmModal
    setModalLoading(true)
    try {
      const endpoint = type === 'notas' || type === 'academico' ? `/academico/notas/${id}` : `/${type}/${id}`
      const response = await apiFetch(endpoint, { method: 'DELETE' })
      if (response.success) {
        const label = type === 'notas' || type === 'academico' ? 'Avaliação' : type.slice(0, -1)
        showToast(`${label} deletado com sucesso!`, 'success')
        setConfirmModal({ open: false, id: null, type: '' })
        loadData()
      } else {
        showToast(response.message || 'Erro ao deletar', 'error')
      }
    } catch (error) {
      showToast('Erro ao deletar', 'error')
    } finally { setModalLoading(false) }
  }

  const handleConfirmDelete = (id, type) => {
    setConfirmModal({ open: true, id, type })
  }

  // ========== LOGOUT ==========
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('userTipo')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userId')
    }
    router.push('/auth/login')
  }

  // ========== CHECK ADMIN ACCESS ==========
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) { router.push('/auth/login'); setIsChecking(false); return }

        const response = await fetch(`${API_BASE_URL}/auth/validar_token`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })

        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          throw new Error('Servidor temporariamente indisponível')
        }

        const data = await response.json()

        if (!response.ok) {
          const msg = data.message || 'Sessão inválida'
          localStorage.removeItem('token')
          localStorage.removeItem('userTipo')
          router.push('/auth/login')
          return
        }

        if (data.user) {
          if (data.user.tipo === 'pendente') {
            localStorage.removeItem('token')
            localStorage.removeItem('userTipo')
            router.push('/auth/login?pendente=1')
            return
          }
          if (data.user.tipo === 'recursos_humanos') {
            setIsAdmin(false)
            setIsChecking(false)
            setIsLoading(false)
            return
          }
          setIsAdmin(true)
          const tipo = data.user.tipo || 'pedagogico'
          setUserTipo(tipo)
          setUserNome(data.user.Nome || data.user.nome || '')
          setUserEmail(data.user.Email || data.user.email || '')
          setUserId(data.user.id || null)
          localStorage.setItem('userTipo', tipo)
          localStorage.setItem('userName', data.user.Nome || data.user.nome || '')
          localStorage.setItem('userEmail', data.user.Email || data.user.email || '')
          localStorage.setItem('userId', data.user.id || '')
          if (tipo === 'tesouraria') setActiveTab('tesouraria')
          else if (tipo === 'pedagogico') setActiveTab('matriculas')
          else if (tipo === 'formador') setActiveTab('academico')
          await loadData()
        } else {
          setIsAdmin(false)
        }
        setIsChecking(false)
      } catch (error) {
        console.error('Erro ao verificar permissões:', error)
        setIsChecking(false)
        router.push('/auth/login')
      } finally { setIsLoading(false) }
    }
    checkAdminAccess()
  }, [router])

  if (isLoading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fb]">
        <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-[#006c49] border-t-transparent" />
      </div>
    )
  }

  if (!isAdmin) { return <AccessDenied /> }

  const renderContent = () => {
    if (userTipo === 'formador') {
      switch (activeTab) {
        case 'academico':
          return <AcademicoTab notas={notas} loading={loading.notas} onEdit={(data) => handleOpenModal('notas', data)} onDelete={(id) => handleConfirmDelete(id, 'notas')} onView={(data) => handleOpenModal('view', data, 'notas')} onCreate={() => handleOpenModal('notas')} onGerarBoletim={handleGerarBoletim} onGerarAvaliacao={generateAvaliacaoPDF} matriculas={matriculas} cursosList={cursosList} formadoresList={formadoresList} userTipo={userTipo} />
        case 'dashboard':
        default:
          return <FormadorDashboard turmas={turmas} matriculas={matriculas} notas={notas} userNome={userNome} onView={(data) => handleOpenModal('view', data, 'turmas')} />
      }
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab stats={stats} matriculas={matriculas} onEdit={(data) => handleOpenModal('matriculas', data)} onDelete={(id) => handleConfirmDelete(id, 'matriculas')} onView={(data) => handleOpenModal('view', data, 'matriculas')} crescimento={crescimento} inscricoesPorCurso={inscricoesPorCurso} onGeneratePDF={generateRelatorioGeral} />
      case 'matriculas':
        return <MatriculasTab matriculas={matriculas} loading={loading.matriculas} onEdit={(data) => handleOpenModal('matriculas', data)} onDelete={(id) => handleConfirmDelete(id, 'matriculas')} onView={(data) => handleOpenModal('view', data, 'matriculas')} onCreate={() => handleOpenModal('matriculas')} cursosList={cursosList} turmasList={turmasList} onGeneratePDF={generateMatriculasPDF} />
      case 'turmas':
        return <TurmasTab turmas={turmas} loading={loading.turmas} onEdit={(data) => handleOpenModal('turmas', data)} onDelete={(id) => handleConfirmDelete(id, 'turmas')} onView={(data) => handleOpenModal('view', data, 'turmas')} onCreate={() => handleOpenModal('turmas')} cursosList={cursosList} formadoresList={formadoresList} onGeneratePDF={generateTurmasPDF} matriculas={matriculas} />
      case 'cursos':
        return <CursosTab cursos={cursos} loading={loading.cursos} onEdit={(data) => handleOpenModal('cursos', data)} onDelete={(id) => handleConfirmDelete(id, 'cursos')} onView={(data) => handleOpenModal('view', data, 'cursos')} onCreate={() => handleOpenModal('cursos')} onGeneratePDF={generateCursosPDF} />
      case 'formadores':
        return <FormadoresTab formadores={formadores} loading={loading.formadores} onEdit={(data) => handleOpenModal('formadores', data)} onDelete={(id) => handleConfirmDelete(id, 'formadores')} onView={(data) => handleOpenModal('view', data, 'formadores')} onCreate={() => handleOpenModal('formadores')} onGeneratePDF={generateFormadoresPDF} />
      case 'tesouraria':
        return <TesourariaTab pagamentos={pagamentos} loading={loading.pagamentos} loadingMatriculas={loading.matriculas} stats={statsFinanceiro} inadimplentes={inadimplentes} matriculas={matriculas} saidas={saidas} onCreateSaida={() => handleOpenModal('saidas')} onEditSaida={(data) => handleOpenModal('saidas', data)} onDeleteSaida={(id) => handleConfirmDelete(id, 'saidas')} onViewSaida={(data) => handleOpenModal('view', data, 'saidas')} onGerarSaidaPDF={generateSaidaPDF} onEdit={(data) => handleOpenModal('pagamentos', data)} onDelete={(id) => handleConfirmDelete(id, 'pagamentos')} onView={(data) => handleOpenModal('view', data, 'pagamentos')} onCreate={() => handleOpenModal('pagamentos')} onGeneratePDF={generateRelatorioFinanceiro} onGerarComprovativo={generateComprovativoPDF} onEditMatricula={(data) => handleOpenModal('matriculas', data)} onDeleteMatricula={(id) => handleConfirmDelete(id, 'matriculas')} onViewMatricula={(data) => handleOpenModal('view', data, 'matriculas')} onCreateMatricula={() => handleOpenModal('matriculas')} dividas={dividas} dividasLoading={dividasLoading} onGerarNotaCobranca={generateNotaCobrancaPDF} onGerarNotasCobrancaAll={generateNotasCobrancaAllPDF} onViewDivida={(data) => handleOpenModal('view', data, 'dividas')} />
      case 'academico':
        return <AcademicoTab notas={notas} loading={loading.notas} onEdit={(data) => handleOpenModal('notas', data)} onDelete={(id) => handleConfirmDelete(id, 'notas')} onView={(data) => handleOpenModal('view', data, 'notas')} onCreate={() => handleOpenModal('notas')} onGerarBoletim={handleGerarBoletim} onGerarAvaliacao={generateAvaliacaoPDF} matriculas={matriculas} cursosList={cursosList} formadoresList={formadoresList} userTipo={userTipo} />
      case 'usuarios':
        return <UsuariosTab />
      default:
        return <DashboardTab stats={stats} matriculas={matriculas} onEdit={(data) => handleOpenModal('matriculas', data)} onDelete={(id) => handleConfirmDelete(id, 'matriculas')} onView={(data) => handleOpenModal('view', data, 'matriculas')} crescimento={crescimento} inscricoesPorCurso={inscricoesPorCurso} onGeneratePDF={generateRelatorioGeral} />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50/80">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} userTipo={userTipo} userNome={userNome} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <TopBar setIsSidebarOpen={setIsSidebarOpen} onLogout={handleLogout} onSearch={handleGlobalSearch} userNome={userNome} userTipo={userTipo} onOpenPerfil={() => setShowPerfilModal(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] space-y-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <ConfirmModal isOpen={confirmModal.open} onClose={() => setConfirmModal({ open: false, id: null, type: '' })} onConfirm={handleDelete} title="Confirmar exclusão" message={`Tem certeza que deseja excluir este ${confirmModal.type ? confirmModal.type.slice(0, -1) : 'item'}? Esta ação não pode ser desfeita.`} isLoading={modalLoading} />

      <FormModal isOpen={modalOpen && modalType !== 'view'} onClose={handleCloseModal} title={modalData ? `Editar ${modalType.slice(0, -1)}` : `Novo ${modalType.slice(0, -1)}`} onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        if (modalData) { handleUpdate(modalData.id, data, modalType) }
        else { handleCreate(data, modalType) }
      }} isLoading={modalLoading}>
        {/* Formulários para cada tipo - mantido do código anterior */}
        {modalType === 'matriculas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Nome *</label><input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Encarregado</label><input name="Encarregado" defaultValue={modalData?.Encarregado} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">BI/Cédula *</label><input name="BI_Cedula" defaultValue={modalData?.BI_Cedula} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data de Nascimento</label><input type="date" name="Nascimento" defaultValue={modalData?.Nascimento} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Estado Civil</label><select name="Estado_Civil" defaultValue={modalData?.Estado_Civil || 'Solteiro'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="Solteiro">Solteiro</option><option value="Casado">Casado</option><option value="Divorciado">Divorciado</option><option value="Viúvo">Viúvo</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Gênero *</label><select name="Genero" defaultValue={modalData?.Genero} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="">Selecione</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Morada</label><input name="Morada" defaultValue={modalData?.Morada} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Telefone *</label><input name="Telefone" defaultValue={modalData?.Telefone} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Curso *</label><select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="">Selecione um curso</option>{cursosList && cursosList.length > 0 ? cursosList.map(curso => <option key={curso.id} value={curso.Nome}>{curso.Nome}</option>) : <option value="" disabled>Nenhum curso cadastrado</option>}</select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Turma *</label><select name="Turma" defaultValue={modalData?.Turma} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="">Selecione uma turma</option>{turmasList && turmasList.length > 0 ? turmasList.map(turma => <option key={turma.id} value={turma.Turma}>{turma.Turma}</option>) : <option value="" disabled>Nenhuma turma cadastrada</option>}</select></div>

            <div className="col-span-full">
              {modalType === 'matriculas' && (() => {
                const cursoInfo = cursosList && cursosList.find(c => c.Nome === modalData?.Curso)
                const modulos = cursoInfo ? (parseInt(cursoInfo.Modulos) || 1) : 1
                if (modulos > 1) {
                  return (
                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-2.5 sm:p-3">
                      <div className="flex items-start gap-2">
                        <Info className="size-4 shrink-0 mt-0.5 text-blue-600" />
                        <p className="text-[10px] sm:text-xs text-blue-800">
                          Este curso tem <strong>{modulos} módulos</strong>. Ao confirmar a matrícula, o sistema gera automaticamente as <strong>{modulos} mensalidades</strong> mensais (cobrança no dia 1 de cada mês). Gerir pagamentos e ver dívidas em <strong>Tesouraria &gt; Dívidas</strong>.
                        </p>
                      </div>
                    </div>
                  )
                }
                return (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-2.5 sm:p-3">
                    <div className="flex items-start gap-2">
                      <Info className="size-4 shrink-0 mt-0.5 text-blue-600" />
                      <p className="text-[10px] sm:text-xs text-blue-800">
                        Cursos com mais de um módulo (ex: English, 4 módulos) geram <strong>mensalidades automáticas</strong> de cada mês. A cobrança é no dia 1 de cada mês e as dívidas são controladas em <strong>Tesouraria &gt; Dívidas</strong>.
                      </p>
                    </div>
                  </div>
                )
              })()}
            </div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Módulo</label><input type="number" name="Modulo" defaultValue={modalData?.Modulo || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Status</label><select name="Status" defaultValue={modalData?.Status || 'Inscrito'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="Inscrito">Inscrito</option><option value="Admitido">Admitido</option><option value="Ativo">Ativo</option><option value="Desistente">Desistente</option><option value="Concluido">Concluído</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data de Matrícula</label><input type="date" name="Data_Matricula" defaultValue={modalData?.Data_Matricula || new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Foto do Formando</label><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'Foto_User')} className="mt-1 w-full text-xs sm:text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#006c49] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-[#005a3d]" />{fotoPreview && <img src={fotoPreview} alt="Preview" className="mt-2 h-20 w-20 rounded-lg object-cover border" />}</div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Foto do Certificado</label><input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'Foto_Certificado')} className="mt-1 w-full text-xs sm:text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-[#006c49] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-[#005a3d]" />{fotoCertificadoPreview && <img src={fotoCertificadoPreview} alt="Preview" className="mt-2 h-20 w-20 rounded-lg object-cover border" />}</div>
          </div>
        )}

        {modalType === 'turmas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Turma *</label><input name="Turma" defaultValue={modalData?.Turma} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Curso *</label><select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="">Selecione um curso</option>{cursosList && cursosList.length > 0 ? cursosList.map(curso => <option key={curso.id} value={curso.Nome}>{curso.Nome}</option>) : <option value="" disabled>Nenhum curso cadastrado</option>}</select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Módulo</label><input type="number" name="Modulo" defaultValue={modalData?.Modulo || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Período</label><select name="Periodo" defaultValue={modalData?.Periodo || 'Manhã'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="Manhã">Manhã</option><option value="Tarde">Tarde</option><option value="Noite">Noite</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Formador</label><select name="Formador" defaultValue={modalData?.Formador} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="">Selecione um formador</option>{formadoresList && formadoresList.length > 0 ? formadoresList.map(formador => <option key={formador.id} value={formador.Nome}>{formador.Nome}</option>) : <option value="" disabled>Nenhum formador disponível</option>}</select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Capacidade Máxima</label><input type="number" name="Capacidade_Maxima" defaultValue={modalData?.Capacidade_Maxima || 30} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data Início *</label><input type="date" name="Data_INIC" defaultValue={modalData?.Data_INIC} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data Término *</label><input type="date" name="Data_Term" defaultValue={modalData?.Data_Term} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Sala</label><input name="Sala" defaultValue={modalData?.Sala} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Status</label><select name="Status" defaultValue={modalData?.Status || 'Pendente'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="Pendente">Pendente</option><option value="Ativa">Ativa</option><option value="Concluída">Concluída</option><option value="Cancelada">Cancelada</option></select></div>
          </div>
        )}

        {modalType === 'cursos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Nome do Curso *</label><input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Descrição</label><textarea name="Desc" defaultValue={modalData?.Desc} rows="3" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Tipo de Curso *</label><select name="Tipo_curso" defaultValue={modalData?.Tipo_curso || 'Formação profissional inicial'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="Formação profissional inicial">Formação profissional inicial</option><option value="Formação profissional continua">Formação profissional continua</option><option value="Formação profissional de dupla Certificação">Formação profissional de dupla Certificação</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Módulos</label><input type="number" name="Modulos" defaultValue={modalData?.Modulos || 1} min="1" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Edição</label><select name="Edicao" defaultValue={modalData?.Edicao || '1º'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="1º">1º</option><option value="2º">2º</option><option value="3º">3º</option><option value="4º">4º</option><option value="5º">5º</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Duração</label><input name="Duracao" defaultValue={modalData?.Duracao} placeholder="Ex: 6 meses" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Carga Horária (horas)</label><input type="number" name="Carga_Horaria" defaultValue={modalData?.Carga_Horaria} min="0" placeholder="Ex: 120" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Valor do Curso (Kz)</label><input type="text" name="Valor_curso" defaultValue={modalData?.Valor_curso || "0.00"} placeholder="0.00" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Status</label><select name="Status" defaultValue={modalData?.Status || 'Ativo'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="Ativo">Ativo</option><option value="Inativo">Inativo</option><option value="Em desenvolvimento">Em desenvolvimento</option></select></div>
          </div>
        )}

        {modalType === 'formadores' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Nome *</label><input name="Nome" defaultValue={modalData?.Nome} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Email *</label><input type="email" name="Email" defaultValue={modalData?.Email} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Telefone *</label><input name="Telefone" defaultValue={modalData?.Telefone} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Especialidade *</label><input name="Especialidade" defaultValue={modalData?.Especialidade} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Curso *</label><select name="Curso" defaultValue={modalData?.Curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="">Selecione um curso</option>{cursosList && cursosList.length > 0 ? cursosList.map(curso => <option key={curso.id} value={curso.Nome}>{curso.Nome}</option>) : <option value="" disabled>Nenhum curso cadastrado</option>}</select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Gênero *</label><select name="Genero" defaultValue={modalData?.Genero} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="">Selecione</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Turmas</label><input type="number" name="Turmas" defaultValue={modalData?.Turmas || 0} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Status</label><select name="Status" defaultValue={modalData?.Status || 'Ativo'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="Ativo">Ativo</option><option value="Inativo">Inativo</option><option value="Férias">Férias</option><option value="Afastado">Afastado</option></select></div>
          </div>
        )}

        {modalType === 'pagamentos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-full">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Formando *</label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input type="text" placeholder="Digite para buscar formando..." value={studentSearch} onChange={(e) => { setStudentSearch(e.target.value); setShowDropdown(true) }} onFocus={() => setShowDropdown(true)} onBlur={() => setTimeout(() => setShowDropdown(false), 200)} className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
                {showDropdown && (
                  <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-48 overflow-y-auto">
                    {matriculas && matriculas.length > 0 ? (
                      matriculas.filter(m => !studentSearch || m.Nome.toLowerCase().includes(studentSearch.toLowerCase())).map(m => (
                        <div key={m.id} className="px-3 py-2 text-xs hover:bg-[#006c49]/10 cursor-pointer border-b border-gray-100 last:border-0" onMouseDown={() => { setStudentSearch(m.Nome); setShowDropdown(false); document.getElementById('hidden-aluno-select').value = m.Nome }}>
                          <p className="font-medium text-gray-900">{m.Nome}</p>
                          <p className="text-[10px] text-gray-500">{m.Curso} — {m.Turma}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-xs text-gray-400">Nenhum formando encontrado</div>
                    )}
                  </div>
                )}
              </div>
              <select id="hidden-aluno-select" name="aluno" defaultValue={modalData?.aluno || ''} className="hidden" required><option value="">Selecione</option>{matriculas && matriculas.length > 0 ? matriculas.map(m => <option key={m.id} value={m.Nome}>{m.Nome}</option>) : null}</select>
            </div>
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Curso</label><select name="curso" defaultValue={modalData?.curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="">Selecione um curso</option>{cursosList && cursosList.length > 0 ? cursosList.map(c => <option key={c.id} value={c.Nome}>{c.Nome}</option>) : <option value="" disabled>Nenhum curso cadastrado</option>}</select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Tipo *</label><select name="tipo" defaultValue={modalData?.tipo || 'mensalidade'} onChange={(e) => setPagoTipo(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="matricula">Matrícula</option><option value="mensalidade">Mensalidade</option><option value="certificado">Certificado</option><option value="taxa">Taxa</option><option value="venda">Venda de Artigos</option><option value="outro">Outro</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Forma de Pagamento *</label><select name="forma_pagamento" defaultValue={modalData?.forma_pagamento || 'dinheiro'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="dinheiro">Dinheiro</option><option value="transferencia">Transferência</option><option value="deposito">Depósito</option><option value="multicaixa">Multicaixa</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Valor (Kz) *</label><input type="number" step="0.01" name="valor" defaultValue={modalData?.valor} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Status</label><select key={pagoTipo} name="status" defaultValue={modalData?.status || (pagoTipo === 'venda' ? 'pago' : 'pendente')} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="pago">Pago</option><option value="pendente">Pendente</option><option value="parcial">Parcial</option><option value="cancelado">Cancelado</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data Pagamento</label><input type="date" name="data_pagamento" defaultValue={modalData?.data_pagamento || new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data Vencimento</label><input type="date" name="data_vencimento" defaultValue={modalData?.data_vencimento} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Observação</label><textarea name="observacao" defaultValue={modalData?.observacao} rows="2" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
          </div>
        )}

        {modalType === 'saidas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Descrição *</label><input name="descricao" defaultValue={modalData?.descricao} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required placeholder="Ex: Salário do formador, Aluguel..." /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Tipo *</label><select name="tipo" defaultValue={modalData?.tipo || 'outro'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="salario">Salário</option><option value="aluguel">Aluguel</option><option value="material">Material</option><option value="equipamento">Equipamento</option><option value="servico">Serviço</option><option value="energia">Energia</option><option value="agua">Água</option><option value="internet">Internet</option><option value="manutencao">Manutenção</option><option value="imposto">Imposto</option><option value="outro">Outro</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Valor (Kz) *</label><input type="number" step="0.01" name="valor" defaultValue={modalData?.valor} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data *</label><input type="date" name="data_saida" defaultValue={modalData?.data_saida || new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Status</label><select name="status" defaultValue={modalData?.status || 'pago'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="pago">Pago</option><option value="pendente">Pendente</option><option value="cancelado">Cancelado</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Forma de Pagamento</label><select name="forma_pagamento" defaultValue={modalData?.forma_pagamento || 'dinheiro'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="dinheiro">Dinheiro</option><option value="transferencia">Transferência</option><option value="deposito">Depósito</option><option value="multicaixa">Multicaixa</option></select></div>
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Observação</label><textarea name="observacao" defaultValue={modalData?.observacao} rows="2" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
          </div>
        )}

        {modalType === 'notas' && !modalData && criteriosAvaliacao && criteriosAvaliacao.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-full">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Formando *</label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Buscar formando..." value={studentSearchNotas} onChange={(e) => setStudentSearchNotas(e.target.value)} className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
                </div>
                <select name="aluno_id" defaultValue="" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
                  <option value="">Selecione um formando</option>
                  {matriculas && matriculas.length > 0
                    ? matriculas.filter(m => !studentSearchNotas || m.Nome.toLowerCase().includes(studentSearchNotas.toLowerCase())).map(m => <option key={m.id} value={m.id}>{m.Nome} - {m.Curso} ({m.Turma})</option>)
                    : <option value="" disabled>Nenhum formando cadastrado</option>}
                </select>
              </div>
              <div><label className="text-xs sm:text-sm font-medium text-gray-700">Módulo</label><input type="number" name="modulo" defaultValue="1" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
              <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data</label><input type="date" name="data_avaliacao" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
              <div><label className="text-xs sm:text-sm font-medium text-gray-700">Formador</label><select name="formador" defaultValue="" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="">Selecione um formador</option>{formadoresList && formadoresList.length > 0 ? formadoresList.map(f => <option key={f.id} value={f.Nome}>{f.Nome}</option>) : <option value="" disabled>Nenhum formador cadastrado</option>}</select></div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Critérios de Avaliação</h4>
              <p className="text-[11px] text-gray-500 mb-4">Insira a nota (0-20) para cada criterio. O peso de cada criterio e definido automaticamente.</p>
              <div className="space-y-3">
                {criteriosAvaliacao.map((criterio) => (
                  <div key={criterio.id} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900">{criterio.nome}</p>
                      <p className="text-[10px] text-gray-500 truncate">{criterio.indicador}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#006c49] bg-[#006c49]/10 px-2 py-0.5 rounded-full shrink-0">{parseFloat(criterio.peso).toFixed(0)}%</span>
                    <input type="number" step="0.1" min="0" max="20" name={`nota_${criterio.id}`} placeholder="0.0" className="w-20 rounded-lg border border-gray-300 px-2 py-1.5 text-xs text-center text-gray-900 focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" required />
                  </div>
                ))}
              </div>
              <div className="mt-3"><label className="text-xs sm:text-sm font-medium text-gray-700">Observacao</label><textarea name="observacao_geral" rows="2" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" placeholder="Observacoes gerais sobre a avaliacao..." /></div>
            </div>
          </div>
        )}
        {modalType === 'notas' && (modalData || !criteriosAvaliacao || criteriosAvaliacao.length === 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-full">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Formando *</label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar formando..." value={studentSearchNotas} onChange={(e) => setStudentSearchNotas(e.target.value)} className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
              </div>
              <select name="aluno_id" defaultValue={modalData?.aluno_id} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
                <option value="">Selecione um formando</option>
                {matriculas && matriculas.length > 0
                  ? matriculas.filter(m => !studentSearchNotas || m.Nome.toLowerCase().includes(studentSearchNotas.toLowerCase())).map(m => <option key={m.id} value={m.id}>{m.Nome}</option>)
                  : <option value="" disabled>Nenhum formando cadastrado</option>}
              </select>
            </div>
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Curso</label><input type="text" name="curso" defaultValue={modalData?.curso} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 bg-gray-100" disabled placeholder="Será preenchido automaticamente" /></div>
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Disciplina *</label><input name="disciplina" defaultValue={modalData?.disciplina} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Módulo</label><input type="number" name="modulo" defaultValue={modalData?.modulo || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Tipo Avaliação *</label><select name="tipo_avaliacao" defaultValue={modalData?.tipo_avaliacao || 'prova'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required><option value="prova">Prova</option><option value="trabalho">Trabalho</option><option value="projeto">Projeto</option><option value="exame">Exame</option><option value="participacao">Participação</option><option value="outro">Outro</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Nota (0-20) *</label><input type="number" step="0.1" min="0" max="20" name="nota" defaultValue={modalData?.nota} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Peso</label><input type="number" step="0.1" min="0" name="peso" defaultValue={modalData?.peso || 1} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data Avaliação</label><input type="date" name="data_avaliacao" defaultValue={modalData?.data_avaliacao || new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Formador</label><select name="formador" defaultValue={modalData?.formador} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="">Selecione um formador</option>{formadoresList && formadoresList.length > 0 ? formadoresList.map(f => <option key={f.id} value={f.Nome}>{f.Nome}</option>) : <option value="" disabled>Nenhum formador cadastrado</option>}</select></div>
            <div className="col-span-full"><label className="text-xs sm:text-sm font-medium text-gray-700">Observação</label><textarea name="observacao" defaultValue={modalData?.observacao} rows="2" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
          </div>
        )}
      </FormModal>

      <ViewModal isOpen={modalOpen && modalType === 'view'} onClose={handleCloseModal} data={modalData} type={viewRealType} />

      {showPerfilModal && (
        <PerfilModal
          isOpen={showPerfilModal}
          onClose={() => setShowPerfilModal(false)}
          userNome={userNome}
          userEmail={userEmail}
          userId={userId}
          userTipo={userTipo}
          onSave={(nome, email) => {
            setUserNome(nome)
            setUserEmail(email)
            localStorage.setItem('userName', nome)
            localStorage.setItem('userEmail', email)
          }}
        />
      )}
    </div>
  )
}