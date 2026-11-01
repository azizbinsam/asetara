import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Send, Bot, User, Play, BookOpen } from 'lucide-react'
import { toast } from '../components/Toast'
import Card from '../components/Card'
import { getMockResponse, SUGGESTIONS } from '../utils/aiResponses'

const VIDEO_LIBRARY = [
  { id: 1, title: 'Pengenalan Tokenisasi Properti', duration: '4:32', category: 'Dasar' },
  { id: 2, title: 'Cara Membeli Token Pertama', duration: '6:15', category: 'Tutorial' },
  { id: 3, title: 'Memahami Smart Contract', duration: '5:48', category: 'Teknis' },
  { id: 4, title: 'Auto-Zakat: Cara Kerja', duration: '3:20', category: 'Syariah' },
  { id: 5, title: 'Strategi Diversifikasi', duration: '7:10', category: 'Investasi' },
]

export default function AiAssistant() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Halo! Saya AI Assistant ASETARA. Ada yang bisa saya bantu tentang investasi properti syariah?' },
  ])
  const [input, setInput] = useState('')
  const [activeTab, setActiveTab] = useState('chat')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
    }, 800 + Math.random() * 600)
  }

  function handleSend() {
    sendMessage(input)
  }

  function handleSuggestion(text) {
    sendMessage(text)
  }

  function handleVideoClick(video) {
    toast(`Memutar: ${video.title}`, 'info')
  }

  return (
    <div className="pb-8 h-[calc(100vh-64px)] lg:h-auto flex flex-col">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800">AI Assistant</h1>
      </header>

      <div className="p-4 lg:p-0 flex-1 flex flex-col">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-6">AI Assistant</h1>

        {/* Tabs — mobile only; desktop shows chat and video side-by-side */}
        <div className="flex gap-2 mb-4 lg:hidden">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'chat' ? 'bg-navy-600 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'video' ? 'bg-navy-600 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Video Edukasi
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 lg:gap-6 lg:items-start">
          {/* Chat panel */}
          <div className={`flex-1 flex flex-col lg:col-span-2 lg:flex ${activeTab === 'chat' ? 'flex' : 'hidden'}`}>
            <Card variant="default" padding="none" className="flex-1 flex flex-col p-4 lg:p-5 min-h-[420px] lg:min-h-[560px]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'assistant' ? 'bg-navy-100 text-navy-700' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'assistant'
                        ? 'bg-neutral-100 text-neutral-700 rounded-tl-sm'
                        : 'bg-navy-600 text-white rounded-tr-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-700">
                      <Bot size={16} />
                    </div>
                    <div className="bg-neutral-100 rounded-2xl rounded-tl-sm px-4 py-2.5">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Suggestions */}
              {messages.length < 3 && (
                <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSuggestion(s)}
                      className="shrink-0 px-3 py-1.5 rounded-full bg-navy-50 text-navy-700 text-xs font-medium border border-navy-200 hover:bg-navy-100 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanyakan sesuatu..."
                  className="flex-1 text-sm outline-none bg-transparent"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                    input.trim() ? 'bg-navy-600 text-white hover:bg-navy-700' : 'bg-neutral-100 text-neutral-400'
                  }`}
                >
                  <Send size={16} />
                </button>
              </div>
            </Card>
          </div>

          {/* Video Library panel */}
          <div className={`mt-4 lg:mt-0 lg:block ${activeTab === 'video' ? 'block' : 'hidden'}`}>
            <p className="hidden lg:block text-sm font-semibold text-neutral-700 mb-3">Video Edukasi</p>
            <div className="space-y-3 lg:max-h-[560px] lg:overflow-y-auto lg:pr-1">
              {VIDEO_LIBRARY.map((video) => (
                <Card
                  key={video.id}
                  variant="default"
                  className="flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-champagne-300 to-navy-600 flex items-center justify-center shrink-0">
                    <Play size={20} className="text-white ml-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800 truncate">{video.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-navy-50 text-navy-700 font-medium">
                        {video.category}
                      </span>
                      <span className="text-xs text-neutral-400">{video.duration}</span>
                    </div>
                  </div>
                  <BookOpen size={16} className="text-neutral-400 shrink-0" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}