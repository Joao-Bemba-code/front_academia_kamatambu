'use client'

import { useState, useMemo } from 'react'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  X,
  Loader2,
  CheckCircle,
  AlertTriangle,
  CalendarDays,
  FileDown,
  Package,
  Warehouse,
  Layers,
  ClipboardList,
  ClipboardCheck,
  RefreshCw,
  ArrowDownToLine,
  ArrowUpFromLine
} from 'lucide-react'

const formatKz = (valor) => `Kz ${parseFloat(valor || 0).toLocaleString('pt-PT', { maximumFractionDigits: 0 })}`

function ModalEstoque({ title, onClose, onSubmit, children, isLoading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl my-auto">
        <div className="flex items-center justify-between border-b border-[#eceef0] px-4 py-3">
          <h3 className="text-sm sm:text-base font-semibold text-[#091426]">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-500 hover:bg-[#f7f9fb]"><X className="size-4" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(Object.fromEntries(new FormData(e.target).entries())) }}>
          <div className="px-4 py-4">{children}</div>
          <div className="flex justify-end gap-2 border-t border-[#eceef0] px-4 py-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-[#f7f9fb]">Cancelar</button>
            <button type="submit" disabled={isLoading} className="flex items-center gap-1.5 rounded-lg bg-[#006c49] px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 disabled:opacity-60">
              {isLoading && <Loader2 className="size-3.5 animate-spin" />} Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ========== MÓDULO DE GESTÃO DE STOCK ==========
export default function EstoqueTab({ produtos, movimentos, requisicoes, resumo, loading, isAdmin, podeAprovar, onCreateProduto, onDeleteProduto, onRegistarMovimento, onCriarRequisicao, onAprovarRequisicao, onRejeitarRequisicao, onCancelarRequisicao, onGerarPDF }) {
  const [activeSubTab, setActiveSubTab] = useState('produtos')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategoria, setFilterCategoria] = useState('')
  const [filterMovTipo, setFilterMovTipo] = useState('')
  const [filterReqEstado, setFilterReqEstado] = useState('')
  const [periodo, setPeriodo] = useState('')

  const [modalProduto, setModalProduto] = useState(null)
  const [modalMovimento, setModalMovimento] = useState(null)
  const [modalRequisicao, setModalRequisicao] = useState(null)
  const [verRequisicao, setVerRequisicao] = useState(null)

  const hoje = new Date().toISOString().split('T')[0]

  const categorias = [...new Set((produtos || []).map(p => p.categoria).filter(Boolean))]

  const produtosFiltrados = useMemo(() => {
    let lista = [...(produtos || [])]
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase().trim()
      lista = lista.filter(p =>
        (p.nome || '').toLowerCase().includes(t) ||
        (p.codigo || '').toLowerCase().includes(t) ||
        (p.categoria || '').toLowerCase().includes(t)
      )
    }
    if (filterCategoria) lista = lista.filter(p => p.categoria === filterCategoria)
    return lista
  }, [produtos, searchTerm, filterCategoria])

  const movimentosFiltrados = useMemo(() => {
    let lista = [...(movimentos || [])]
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase().trim()
      lista = lista.filter(m => (m.produto_nome || '').toLowerCase().includes(t) || (m.motivo || '').toLowerCase().includes(t) || (m.documento || '').toLowerCase().includes(t))
    }
    if (filterMovTipo) lista = lista.filter(m => m.tipo === filterMovTipo)
    if (periodo) {
      const inicio = hoje.substring(0, 8) + '01'
      lista = lista.filter(m => {
        const d = (m.data_movimento || '').substring(0, 10)
        return d >= inicio && d <= hoje
      })
    }
    return lista
  }, [movimentos, searchTerm, filterMovTipo, periodo, hoje])

  const requisicoesFiltradas = useMemo(() => {
    let lista = [...(requisicoes || [])]
    if (searchTerm.trim()) {
      const t = searchTerm.toLowerCase().trim()
      lista = lista.filter(r =>
        (r.numero || '').toLowerCase().includes(t) ||
        (r.solicitante || '').toLowerCase().includes(t) ||
        (r.setor || '').toLowerCase().includes(t)
      )
    }
    if (filterReqEstado) lista = lista.filter(r => r.estado === filterReqEstado)
    if (periodo) {
      const inicio = hoje.substring(0, 8) + '01'
      lista = lista.filter(r => {
        const d = (r.data_requisicao || '').substring(0, 10)
        return d >= inicio && d <= hoje
      })
    }
    return lista
  }, [requisicoes, searchTerm, filterReqEstado, periodo, hoje])

  const totalEntradasPeriodo = movimentosFiltrados.filter(m => m.tipo === 'entrada' || m.tipo === 'devolucao').reduce((a, m) => a + parseFloat(m.valor_total || 0), 0)
  const totalSaidasPeriodo = movimentosFiltrados.filter(m => m.tipo === 'saida' || m.tipo === 'perda').reduce((a, m) => a + Math.abs(parseFloat(m.valor_total || 0)), 0)
  const pendentes = (requisicoes || []).filter(r => r.estado === 'pendente').length

  const guardarProduto = async (dados, id) => {
    const ok = await onCreateProduto(dados, id)
    if (ok) setModalProduto(null)
  }

  const guardarMovimento = async (dados) => {
    const ok = await onRegistarMovimento(dados)
    if (ok) setModalMovimento(null)
  }

  const labelMov = (tipo) => ({ entrada: 'Entrada', saida: 'Saída', ajuste: 'Ajuste', devolucao: 'Devolução', perda: 'Perda' }[tipo] || tipo)
  const corMov = (tipo) => ({
    entrada: 'bg-[#006c49]/10 text-[#006c49]',
    devolucao: 'bg-[#006c49]/10 text-[#006c49]',
    saida: 'bg-red-50 text-red-700',
    perda: 'bg-red-50 text-red-700',
    ajuste: 'bg-amber-50 text-amber-700'
  }[tipo] || 'bg-gray-100 text-gray-700')

  const corEstado = (estado) => ({
    pendente: 'bg-amber-50 text-amber-700',
    aprovada: 'bg-[#006c49]/10 text-[#006c49]',
    rejeitada: 'bg-red-50 text-red-700',
    cancelada: 'bg-gray-100 text-gray-600'
  }[estado] || 'bg-gray-100 text-gray-700')

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#091426]">Estoque</h2>
          <p className="text-[10px] sm:text-xs lg:text-sm text-[#45474c] mt-0.5">Entradas, saídas, requisições e registos de movimento do material</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button onClick={onGerarPDF} className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700 transition-colors w-full sm:w-auto">
            <FileDown className="size-3.5 sm:size-4" /> Relatório
          </button>
          {activeSubTab === 'produtos' && isAdmin && (
            <button onClick={() => setModalProduto({})} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
              <Plus className="size-3.5 sm:size-4" /> Novo Produto
            </button>
          )}
          {activeSubTab === 'movimentos' && isAdmin && (
            <button onClick={() => setModalMovimento({})} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
              <Plus className="size-3.5 sm:size-4" /> Registrar Movimento
            </button>
          )}
          {activeSubTab === 'requisicoes' && (
            <button onClick={() => setModalRequisicao({ itens: [] })} className="flex items-center justify-center gap-2 rounded-lg bg-[#006c49] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 w-full sm:w-auto">
              <Plus className="size-3.5 sm:size-4" /> Nova Requisição
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs text-[#45474c] font-medium">Valor do Stock</p>
            <Warehouse className="size-4 text-[#006c49]" />
          </div>
          <p className="mt-1 text-base sm:text-xl font-bold text-[#091426]">{formatKz(resumo?.valor_stock || 0)}</p>
          <p className="text-[10px] sm:text-xs text-[#45474c]">{resumo?.total_itens || 0} produto(s) activo(s)</p>
        </div>
        <div className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs text-[#45474c] font-medium">Abaixo do Mínimo</p>
            <AlertTriangle className="size-4 text-amber-500" />
          </div>
          <p className="mt-1 text-base sm:text-xl font-bold text-[#091426]">{resumo?.abaixo_minimo || 0}</p>
          <p className="text-[10px] sm:text-xs text-[#45474c]">produto(s) a repor</p>
        </div>
        <div className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs text-[#45474c] font-medium">Requisições Pendentes</p>
            <ClipboardList className="size-4 text-blue-600" />
          </div>
          <p className="mt-1 text-base sm:text-xl font-bold text-[#091426]">{pendentes}</p>
          <p className="text-[10px] sm:text-xs text-[#45474c]">{resumo?.requisicoes_aprovadas || 0} aprovada(s) no período</p>
        </div>
        <div className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[10px] sm:text-xs text-[#45474c] font-medium">Entradas / Saídas</p>
            <Layers className="size-4 text-[#45474c]" />
          </div>
          <p className="mt-1 text-sm sm:text-base font-bold text-[#006c49]">{formatKz(totalEntradasPeriodo)}</p>
          <p className="text-[10px] sm:text-xs text-red-600">{formatKz(totalSaidasPeriodo)} consumidos</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 sm:gap-2 border-b border-[#eceef0]">
        <button onClick={() => setActiveSubTab('produtos')} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 ${activeSubTab === 'produtos' ? 'border-[#006c49] text-[#006c49]' : 'border-transparent text-[#45474c] hover:text-[#091426]'}`}>
          <Package className="size-4" /> Produtos
        </button>
        <button onClick={() => setActiveSubTab('movimentos')} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 ${activeSubTab === 'movimentos' ? 'border-[#006c49] text-[#006c49]' : 'border-transparent text-[#45474c] hover:text-[#091426]'}`}>
          <RefreshCw className="size-4" /> Movimentos
        </button>
        <button onClick={() => setActiveSubTab('requisicoes')} className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors border-b-2 ${activeSubTab === 'requisicoes' ? 'border-[#006c49] text-[#006c49]' : 'border-transparent text-[#45474c] hover:text-[#091426]'}`}>
          <ClipboardCheck className="size-4" /> Requisições
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 size-3.5 sm:size-4 -translate-y-1/2 text-[#45474c]" />
          <input type="text" placeholder={activeSubTab === 'requisicoes' ? 'Buscar por número, solicitante, sector...' : 'Buscar produto...'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-[#c5c6cd] bg-white py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49]" />
        </div>

        {activeSubTab === 'produtos' && (
          <select value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
            <option value="">Todas as Categorias</option>
            {categorias.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}

        {activeSubTab === 'movimentos' && (
          <select value={filterMovTipo} onChange={(e) => setFilterMovTipo(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
            <option value="">Todos os Tipos</option>
            <option value="entrada">Entradas</option>
            <option value="saida">Saídas</option>
            <option value="ajuste">Ajustes</option>
            <option value="devolucao">Devoluções</option>
            <option value="perda">Perdas</option>
          </select>
        )}

        {activeSubTab === 'requisicoes' && (
          <select value={filterReqEstado} onChange={(e) => setFilterReqEstado(e.target.value)} className="rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#006c49]/20 w-full sm:w-auto">
            <option value="">Todos os Estados</option>
            <option value="pendente">Pendentes</option>
            <option value="aprovada">Aprovadas</option>
            <option value="rejeitada">Rejeitadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        )}

        <label className={`flex items-center gap-2 rounded-lg border border-[#c5c6cd] bg-white px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 w-full sm:w-auto ${periodo ? 'border-[#006c49] text-[#006c49]' : ''}`}>
          <CalendarDays className="size-3.5 sm:size-4" />
          <span>Este mês</span>
          <input type="checkbox" checked={!!periodo} onChange={(e) => setPeriodo(e.target.checked ? 'mes' : '')} className="accent-[#006c49]" />
        </label>

        {(searchTerm || filterCategoria || filterMovTipo || filterReqEstado || periodo) && (
          <button onClick={() => { setSearchTerm(''); setFilterCategoria(''); setFilterMovTipo(''); setFilterReqEstado(''); setPeriodo('') }} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-600 hover:bg-[#f7f9fb] transition-colors w-full sm:w-auto flex items-center justify-center gap-1">
            <X className="size-3.5" /> Limpar
          </button>
        )}
      </div>

      {activeSubTab === 'produtos' && (
        <>
          <div className="text-xs sm:text-sm text-[#45474c]">
            {produtosFiltrados.length > 0 ? <span>Mostrando <strong>{produtosFiltrados.length}</strong> produto(s)</span> : <span>Nenhum produto encontrado</span>}
          </div>

          <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
                <thead className="bg-[#eceef0]">
                  <tr>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Produto</th>
                    <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Categoria</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Stock</th>
                    <th className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Custo</th>
                    <th className="hidden sm:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Valor</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Estado</th>
                    {isAdmin && <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-right text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Ações</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c6cd]/50">
                  {loading ? (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500"><Loader2 className="size-5 sm:size-6 animate-spin mx-auto" /></td></tr>
                  ) : produtosFiltrados.length > 0 ? (
                    produtosFiltrados.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f7f9fb]">
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                          <p className="font-semibold text-[#091426]">{p.nome}</p>
                          <p className="text-[10px] text-[#45474c]">{p.codigo || 'sem código'}{p.localizacao ? ` · ${p.localizacao}` : ''}</p>
                        </td>
                        <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{p.categoria || 'Geral'}</td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                          <span className={`font-semibold ${p.abaixo_minimo ? 'text-red-600' : 'text-[#091426]'}`}>{p.stock_atual} {p.unidade}</span>
                          <span className="block text-[10px] text-[#45474c]">mín. {p.stock_minimo}</span>
                        </td>
                        <td className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{formatKz(p.preco_custo)}</td>
                        <td className="hidden sm:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-medium text-[#091426]">{formatKz(p.valor_total)}</td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${p.abaixo_minimo ? 'bg-amber-50 text-amber-700' : 'bg-[#006c49]/10 text-[#006c49]'}`}>
                            {p.abaixo_minimo ? 'Repor' : 'Disponível'}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => setModalMovimento({ produto_id: p.id, tipo: 'entrada' })} title="Registar entrada" className="rounded-lg p-1.5 text-[#006c49] hover:bg-[#006c49]/10"><ArrowDownToLine className="size-3.5 sm:size-4" /></button>
                              <button onClick={() => setModalMovimento({ produto_id: p.id, tipo: 'saida' })} title="Registar saída" className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"><ArrowUpFromLine className="size-3.5 sm:size-4" /></button>
                              <button onClick={() => setModalProduto(p)} title="Editar" className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50"><Edit className="size-3.5 sm:size-4" /></button>
                              <button onClick={() => onDeleteProduto(p)} title="Eliminar" className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"><Trash2 className="size-3.5 sm:size-4" /></button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">Nenhum produto registado</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeSubTab === 'movimentos' && (
        <>
          <div className="text-xs sm:text-sm text-[#45474c]">
            {movimentosFiltrados.length > 0 ? <span>Mostrando <strong>{movimentosFiltrados.length}</strong> movimento(s) · entradas <strong>{formatKz(totalEntradasPeriodo)}</strong> · saídas <strong>{formatKz(totalSaidasPeriodo)}</strong></span> : <span>Nenhum movimento registado</span>}
          </div>

          <div className="overflow-hidden rounded-xl border border-[#eceef0] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] sm:text-xs lg:text-sm">
                <thead className="bg-[#eceef0]">
                  <tr>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Data</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Produto</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Tipo</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Qtd.</th>
                    <th className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Stock</th>
                    <th className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Valor</th>
                    <th className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[8px] sm:text-[10px] lg:text-[11px] font-medium uppercase tracking-wider text-[#45474c]">Motivo / Documento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c5c6cd]/50">
                  {loading ? (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500"><Loader2 className="size-5 sm:size-6 animate-spin mx-auto" /></td></tr>
                  ) : movimentosFiltrados.length > 0 ? (
                    movimentosFiltrados.map((m) => (
                      <tr key={m.id} className="hover:bg-[#f7f9fb]">
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c] whitespace-nowrap">{(m.data_movimento || '').substring(0, 10)}</td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-medium text-[#091426]">{m.produto_nome}</td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3"><span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${corMov(m.tipo)}`}>{labelMov(m.tipo)}</span></td>
                        <td className="px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-semibold text-[#091426]">{m.quantidade}</td>
                        <td className="hidden md:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">{m.stock_anterior} → <strong className="text-[#091426]">{m.stock_posterior}</strong></td>
                        <td className={`px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 font-medium ${parseFloat(m.valor_total) < 0 ? 'text-red-600' : 'text-[#006c49]'}`}>{formatKz(m.valor_total)}</td>
                        <td className="hidden lg:table-cell px-2 sm:px-3 lg:px-6 py-1.5 sm:py-2 lg:py-3 text-[#45474c]">
                          {m.motivo || '—'}{m.documento ? ` · ${m.documento}` : ''}
                          {m.usuario_criou ? <span className="block text-[10px]">{m.usuario_criou}</span> : null}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">Nenhum movimento registado</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeSubTab === 'requisicoes' && (
        <>
          <div className="text-xs sm:text-sm text-[#45474c]">
            {requisicoesFiltradas.length > 0 ? <span>Mostrando <strong>{requisicoesFiltradas.length}</strong> requisição(ões)</span> : <span>Nenhuma requisição encontrada</span>}
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="rounded-xl border border-[#eceef0] bg-white p-8 text-center"><Loader2 className="size-6 animate-spin mx-auto text-[#006c49]" /></div>
            ) : requisicoesFiltradas.length > 0 ? (
              requisicoesFiltradas.map((r) => (
                <div key={r.id} className="rounded-xl border border-[#eceef0] bg-white p-3 sm:p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-[#091426] text-sm">{r.numero}</span>
                        <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${corEstado(r.estado)}`}>{r.estado}</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#45474c] mt-1">
                        {r.solicitante}{r.setor ? ` · ${r.setor}` : ''}{r.turma ? ` · ${r.turma}` : ''} · {(r.data_requisicao || '').substring(0, 10)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#091426]">{formatKz(r.total_estimado)}</span>
                      <button onClick={() => setVerRequisicao(r)} className="rounded-lg border border-[#c5c6cd] p-1.5 text-[#45474c] hover:bg-[#f7f9fb]" title="Ver detalhe"><Eye className="size-3.5 sm:size-4" /></button>
                      {podeAprovar && r.estado === 'pendente' && (
                        <>
                          <button onClick={() => onAprovarRequisicao(r)} className="rounded-lg bg-[#006c49] p-1.5 text-white hover:bg-[#006c49]/90" title="Aprovar"><CheckCircle className="size-3.5 sm:size-4" /></button>
                          <button onClick={() => onRejeitarRequisicao(r)} className="rounded-lg bg-red-600 p-1.5 text-white hover:bg-red-700" title="Rejeitar"><X className="size-3.5 sm:size-4" /></button>
                        </>
                      )}
                      {r.estado === 'pendente' && !podeAprovar && (
                        <button onClick={() => onCancelarRequisicao(r)} className="rounded-lg border border-[#c5c6cd] px-2 py-1 text-[10px] sm:text-xs text-gray-600 hover:bg-[#f7f9fb]">Cancelar</button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(r.itens || []).map((i) => (
                      <span key={i.id} className="rounded-full bg-[#eceef0] px-2 py-0.5 text-[10px] text-[#45474c]">{i.produto_nome} × {i.quantidade}</span>
                    ))}
                  </div>
                  {r.estado !== 'pendente' && (
                    <p className="mt-2 text-[10px] sm:text-xs text-[#45474c]">
                      Decisão de {r.decidido_por} em {(r.data_decisao || '').substring(0, 10)}{r.motivo_decisao ? ` — ${r.motivo_decisao}` : ''}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-[#c5c6cd] bg-white p-8 text-center text-gray-500 text-sm">Nenhuma requisição registada</div>
            )}
          </div>
        </>
      )}

      {modalProduto && (
        <ModalEstoque title={modalProduto.id ? 'Editar Produto' : 'Novo Produto'} onClose={() => setModalProduto(null)} onSubmit={(dados) => guardarProduto(dados, modalProduto.id)} isLoading={loading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2"><label className="text-xs sm:text-sm font-medium text-gray-700">Nome *</label><input name="nome" defaultValue={modalProduto.nome} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Código</label><input name="codigo" defaultValue={modalProduto.codigo || ''} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Categoria</label><input name="categoria" defaultValue={modalProduto.categoria || ''} placeholder="Material de escrita" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Unidade</label><select name="unidade" defaultValue={modalProduto.unidade || 'un'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900"><option value="un">un</option><option value="resma">resma</option><option value="pacote">pacote</option><option value="caixa">caixa</option><option value="litro">litro</option><option value="kg">kg</option><option value="metro">metro</option><option value="jogo">jogo</option></select></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Preço de custo (Kz)</label><input type="number" step="0.01" min="0" name="preco_custo" defaultValue={modalProduto.preco_custo || ''} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Stock mínimo</label><input type="number" min="0" name="stock_minimo" defaultValue={modalProduto.stock_minimo ?? 0} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            {!modalProduto.id && (
              <div><label className="text-xs sm:text-sm font-medium text-gray-700">Stock inicial</label><input type="number" min="0" name="stock_atual" defaultValue={0} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            )}
            <div className="sm:col-span-2"><label className="text-xs sm:text-sm font-medium text-gray-700">Localização</label><input name="localizacao" defaultValue={modalProduto.localizacao || ''} placeholder="Armazém A" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div className="sm:col-span-2"><label className="text-xs sm:text-sm font-medium text-gray-700">Observação</label><textarea name="observacao" defaultValue={modalProduto.observacao || ''} rows="2" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
          </div>
        </ModalEstoque>
      )}

      {modalMovimento && (
        <ModalEstoque title="Registar Movimento" onClose={() => setModalMovimento(null)} onSubmit={(dados) => guardarMovimento(dados)} isLoading={loading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Produto *</label>
              <select name="produto_id" defaultValue={modalMovimento.produto_id || ''} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required>
                <option value="">Seleccionar produto</option>
                {(produtos || []).map(p => <option key={p.id} value={p.id}>{p.nome} (stock: {p.stock_atual} {p.unidade})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">Tipo *</label>
              <select name="tipo" defaultValue={modalMovimento.tipo || 'entrada'} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900">
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
                <option value="devolucao">Devolução</option>
                <option value="perda">Perda</option>
                <option value="ajuste">Ajuste de inventário</option>
              </select>
            </div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Quantidade *</label><input type="number" min="1" name="quantidade" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" required /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Preço unitário (Kz)</label><input type="number" step="0.01" min="0" name="preco_unitario" placeholder="do produto" className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div><label className="text-xs sm:text-sm font-medium text-gray-700">Data</label><input type="date" name="data_movimento" defaultValue={new Date().toISOString().split('T')[0]} className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div className="sm:col-span-2"><label className="text-xs sm:text-sm font-medium text-gray-700">Motivo</label><input name="motivo" placeholder="Compra mensal, uso interno, perda..." className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
            <div className="sm:col-span-2"><label className="text-xs sm:text-sm font-medium text-gray-700">Documento</label><input name="documento" placeholder="FT-001, factura..." className="mt-1 w-full rounded-lg border border-gray-300 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900" /></div>
          </div>
        </ModalEstoque>
      )}

      {modalRequisicao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl my-auto">
            <div className="flex items-center justify-between border-b border-[#eceef0] px-4 py-3">
              <h3 className="text-sm sm:text-base font-semibold text-[#091426]">Nova Requisição de Material</h3>
              <button onClick={() => setModalRequisicao(null)} className="rounded-lg p-1.5 text-gray-500 hover:bg-[#f7f9fb]"><X className="size-4" /></button>
            </div>
            <RequisicaoForm produtos={produtos} valorInicial={modalRequisicao} onSubmit={(dados) => onCriarRequisicao(dados)} onCancel={() => setModalRequisicao(null)} />
          </div>
        </div>
      )}

      {verRequisicao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl my-auto">
            <div className="flex items-center justify-between border-b border-[#eceef0] px-4 py-3">
              <h3 className="text-sm sm:text-base font-semibold text-[#091426]">{verRequisicao.numero}</h3>
              <button onClick={() => setVerRequisicao(null)} className="rounded-lg p-1.5 text-gray-500 hover:bg-[#f7f9fb]"><X className="size-4" /></button>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                <p><span className="text-[#45474c]">Solicitante:</span> <strong>{verRequisicao.solicitante}</strong></p>
                <p><span className="text-[#45474c]">Estado:</span> <strong>{verRequisicao.estado}</strong></p>
                <p><span className="text-[#45474c]">Data:</span> {(verRequisicao.data_requisicao || '').substring(0, 10)}</p>
                <p><span className="text-[#45474c]">Total:</span> <strong>{formatKz(verRequisicao.total_estimado)}</strong></p>
                {verRequisicao.setor && <p><span className="text-[#45474c]">Sector:</span> {verRequisicao.setor}</p>}
                {verRequisicao.turma && <p><span className="text-[#45474c]">Turma:</span> {verRequisicao.turma}</p>}
                {verRequisicao.observacao && <p className="col-span-2"><span className="text-[#45474c]">Observação:</span> {verRequisicao.observacao}</p>}
                {verRequisicao.decidido_por && <p className="col-span-2"><span className="text-[#45474c]">Decisão:</span> {verRequisicao.decidido_por} — {verRequisicao.motivo_decisao || 'sem motivo'}</p>}
              </div>
              <div className="overflow-hidden rounded-lg border border-[#eceef0]">
                <table className="w-full text-left text-[10px] sm:text-xs">
                  <thead className="bg-[#eceef0]"><tr><th className="px-3 py-2 font-medium uppercase text-[#45474c]">Produto</th><th className="px-3 py-2 font-medium uppercase text-[#45474c]">Qtd.</th><th className="px-3 py-2 font-medium uppercase text-[#45474c]">Subtotal</th></tr></thead>
                  <tbody className="divide-y divide-[#c5c6cd]/50">
                    {(verRequisicao.itens || []).map((i) => (
                      <tr key={i.id}><td className="px-3 py-2">{i.produto_nome}</td><td className="px-3 py-2">{i.quantidade}</td><td className="px-3 py-2 font-medium">{formatKz(i.subtotal)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#eceef0] px-4 py-3">
              <button onClick={() => setVerRequisicao(null)} className="rounded-lg border border-[#c5c6cd] px-3 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-[#f7f9fb]">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RequisicaoForm({ produtos, valorInicial, onSubmit, onCancel }) {
  const [tipo, setTipo] = useState('material')
  const [setor, setSetor] = useState('')
  const [turma, setTurma] = useState('')
  const [observacao, setObservacao] = useState('')
  const [itens, setItens] = useState(valorInicial?.itens || [])
  const [produtoSel, setProdutoSel] = useState('')
  const [qtd, setQtd] = useState(1)

  const produto = (produtos || []).find(p => String(p.id) === String(produtoSel))
  const total = itens.reduce((acc, i) => acc + (parseFloat(i.preco_unitario || 0) * parseInt(i.quantidade || 0)), 0)

  const adicionar = () => {
    if (!produto || !qtd || parseInt(qtd) <= 0) return
    setItens([...itens, { produto_id: produto.id, produto_nome: produto.nome, quantidade: parseInt(qtd), preco_unitario: parseFloat(produto.preco_custo || 0) }])
    setProdutoSel('')
    setQtd(1)
  }

  const submeter = async () => {
    if (itens.length === 0) return
    const ok = await onSubmit({ tipo, setor, turma, observacao, itens })
    if (ok) onCancel()
  }

  return (
    <div className="px-4 py-3 space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div><label className="text-xs font-medium text-gray-700">Tipo</label><select value={tipo} onChange={(e) => setTipo(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs sm:text-sm"><option value="material">Material</option><option value="limpeza">Limpeza</option><option value="equipamento">Equipamento</option><option value="manutencao">Manutenção</option><option value="outro">Outro</option></select></div>
        <div><label className="text-xs font-medium text-gray-700">Sector</label><input value={setor} onChange={(e) => setSetor(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs sm:text-sm" placeholder="Secretaria" /></div>
        <div><label className="text-xs font-medium text-gray-700">Turma</label><input value={turma} onChange={(e) => setTurma(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs sm:text-sm" placeholder="Turma A" /></div>
      </div>

      <div className="rounded-lg border border-[#eceef0] p-3 space-y-2">
        <p className="text-xs font-medium text-gray-700">Adicionar produto</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <select value={produtoSel} onChange={(e) => setProdutoSel(e.target.value)} className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-xs sm:text-sm">
            <option value="">Seleccionar produto</option>
            {(produtos || []).filter(p => p.ativo).map(p => <option key={p.id} value={p.id}>{p.nome} (disponível: {p.stock_atual} {p.unidade})</option>)}
          </select>
          <input type="number" min="1" value={qtd} onChange={(e) => setQtd(e.target.value)} className="w-full sm:w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-xs sm:text-sm" />
          <button onClick={adicionar} className="rounded-lg bg-[#006c49] px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90"><Plus className="size-3.5 inline" /> Adicionar</button>
        </div>
      </div>

      <div className="max-h-56 overflow-y-auto rounded-lg border border-[#eceef0]">
        <table className="w-full text-left text-[10px] sm:text-xs">
          <thead className="bg-[#eceef0]"><tr><th className="px-3 py-2 font-medium uppercase text-[#45474c]">Produto</th><th className="px-3 py-2 font-medium uppercase text-[#45474c]">Qtd.</th><th className="px-3 py-2 font-medium uppercase text-[#45474c]">Subtotal</th><th className="px-3 py-2" /></tr></thead>
          <tbody className="divide-y divide-[#c5c6cd]/50">
            {itens.length === 0 ? (
              <tr><td colSpan="4" className="px-3 py-4 text-center text-gray-500">Nenhum produto adicionado</td></tr>
            ) : itens.map((i, idx) => (
              <tr key={`${i.produto_id}-${idx}`}>
                <td className="px-3 py-2">{i.produto_nome}</td>
                <td className="px-3 py-2">{i.quantidade}</td>
                <td className="px-3 py-2 font-medium">{formatKz(parseFloat(i.preco_unitario || 0) * parseInt(i.quantidade || 0))}</td>
                <td className="px-3 py-2 text-right"><button onClick={() => setItens(itens.filter((_, k) => k !== idx))} className="text-red-600 hover:bg-red-50 rounded p-1"><Trash2 className="size-3.5" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700">Observação</label>
        <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} rows="2" className="mt-1 w-full rounded-lg border border-gray-300 px-2 py-1.5 text-xs sm:text-sm" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#eceef0] pt-3">
        <p className="text-sm text-[#45474c]">Total estimado: <strong className="text-[#091426]">{formatKz(total)}</strong></p>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={onCancel} className="flex-1 rounded-lg border border-[#c5c6cd] px-3 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-[#f7f9fb]">Cancelar</button>
          <button onClick={submeter} disabled={itens.length === 0} className="flex-1 rounded-lg bg-[#006c49] px-3 py-1.5 text-xs sm:text-sm font-medium text-white hover:bg-[#006c49]/90 disabled:opacity-50">Submeter requisição</button>
        </div>
      </div>
    </div>
  )
}