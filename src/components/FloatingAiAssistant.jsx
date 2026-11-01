import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Bot, X, Send, Maximize2, Sparkles } from 'lucide-react'
import { getMockResponse, SUGGESTIONS } from '../utils/aiResponses'

const INITIAL_MESSAGE = {
  id: 1,
  role: 'assistant',
  text: 'Halo! Saya AI Assistant ASETARA. Ada yang bisa saya bantu tentang investasi properti syariah?',
}

export default function FloatingAiAssistant() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  // Tampilkan tooltip otomatis sekali setelah beberapa detik untuk menarik perhatian,
  // lalu sembunyikan lagi setelah beberapa saat kalau tidak diklik.
  useEffect(() => {
    if (tooltipDismissed || open) return
    const showTimer = setTimeout(() => setShowTooltip(true), 1500)
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000)
    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [tooltipDismissed, open])

  // Sembunyikan tombol di halaman AI Assistant penuh — di sana chat sudah ada di layar
  if (location.pathname.startsWith('/ai-assistant')) return null

  function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg = { id: Date.now(), role: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const response = getMockResponse(trimmed)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: response }])
      setTyping(false)
    }, 700 + Math.random() * 500)
  }

  function handleSend() {
    sendMessage(input)
  }

  function handleSuggestion(text) {
    sendMessage(text)
  }

  function handleOpenFullPage() {
    setOpen(false)
    navigate('/ai-assistant')
  }

  function handleToggle() {
    setOpen((v) => !v)
    setShowTooltip(false)
    setTooltipDismissed(true)
  }

  function dismissTooltip(e) {
    e.stopPropagation()
    setShowTooltip(false)
    setTooltipDismissed(true)
  }

  return (
    <>
      {/* Tombol sticky + tooltip */}
      <div
        className="fixed z-40 bottom-24 right-4 lg:bottom-8 lg:right-8 flex items-center gap-3"
        onMouseEnter={() => !tooltipDismissed && setShowTooltip(true)}
      >
        {/* Tooltip bubble */}
        <div
          className={`hidden lg:flex items-center gap-2 bg-neutral-800 text-white text-xs font-medium pl-3 pr-2 py-2 rounded-xl shadow-lg transition-all duration-300 origin-right ${
            showTooltip && !open ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-2 pointer-events-none'
          }`}
        >
          <Sparkles size={13} className="text-champagne-400 shrink-0" />
          <span className="whitespace-nowrap">Tanya AI Assistant, gratis!</span>
          <button
            onClick={dismissTooltip}
            className="ml-1 text-neutral-400 hover:text-white transition-colors shrink-0"
            aria-label="Tutup tooltip"
          >
            <X size={12} />
          </button>
          {/* Arrow */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-neutral-800" />
        </div>

        {/* Tooltip versi mobile: bubble kecil di atas tombol */}
        <div
          className={`lg:hidden absolute bottom-full right-0 mb-3 flex items-center gap-1.5 bg-neutral-800 text-white text-[11px] font-medium pl-2.5 pr-1.5 py-1.5 rounded-lg shadow-lg transition-all duration-300 origin-bottom-right ${
            showTooltip && !open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <Sparkles size={11} className="text-champagne-400 shrink-0" />
          <span className="whitespace-nowrap">Tanya AI Assistant</span>
          <button onClick={dismissTooltip} className="text-neutral-400 shrink-0">
            <X size={11} />
          </button>
        </div>

        <div className="relative">
          {/* Ring pulsa untuk menarik perhatian saat tooltip tampil */}
          {showTooltip && !open && (
            <span className="absolute inset-0 rounded-full bg-navy-500 animate-ping opacity-40" />
          )}
          <button
            onClick={handleToggle}
            aria-label="Buka AI Assistant"
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-navy-500 to-navy-700 text-white shadow-lg shadow-navy-700/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          >
            {open ? <X size={22} /> : <Bot size={22} />}
          </button>
        </div>
      </div>

      {/* Backdrop (mobile: menutup penuh supaya bottom sheet mudah ditutup dengan tap luar) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:bg-transparent"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Popup chat */}
      {open && (
        <div
          className="fixed z-40 bottom-16 left-0 right-0 lg:bottom-24 lg:right-8 lg:left-auto
            w-full lg:w-[360px] h-[70vh] lg:h-[520px]
            bg-neutral-0 border border-neutral-200 shadow-2xl
            rounded-t-2xl lg:rounded-2xl
            flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-navy-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-navy-600 text-white flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-800 leading-tight">AI Assistant</p>
                <p className="text-[11px] text-teal-600 leading-tight">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleOpenFullPage}
                title="Buka halaman penuh"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
              >
                <Maximize2 size={15} />
              </button>
              <button
                onClick={() => setOpen(false)}
                title="Tutup"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'assistant' ? 'bg-navy-100 text-navy-700' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  <Bot size={12} />
                </div>
                <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-neutral-100 text-neutral-700 rounded-tl-sm'
                    : 'bg-navy-600 text-white rounded-tr-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center text-navy-700">
                  <Bot size={12} />
                </div>
                <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions — hanya tampil sebelum user mengirim pesan pertama */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-navy-50 text-navy-700 text-[11px] font-medium border border-navy-200 hover:bg-navy-100 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-neutral-200">
            <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanyakan sesuatu..."
                className="flex-1 text-xs outline-none bg-transparent py-1.5"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                  input.trim() ? 'bg-navy-600 text-white hover:bg-navy-700' : 'bg-neutral-200 text-neutral-400'
                }`}
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}