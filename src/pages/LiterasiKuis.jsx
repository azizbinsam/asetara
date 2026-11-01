import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, CheckCircle2, XCircle, RotateCcw, BookOpen, ArrowRight, Trophy } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import ProgressBar from '../components/ProgressBar'
import { useLiteracy } from '../context/literacyStore'

const LETTERS = ['A', 'B', 'C', 'D']

// Pesan hasil sesuai skor: bukan sekadar angka, tapi arahan belajar berikutnya
function getInsight(percent) {
  if (percent >= 80) {
    return {
      title: 'Pemahamanmu sudah kuat',
      text: 'Kamu menguasai sebagian besar konsep di materi ini. Lanjutkan ke materi berikutnya untuk memperluas pengetahuanmu.',
    }
  }
  if (percent >= 50) {
    return {
      title: 'Kamu sudah di jalur yang baik',
      text: 'Dasar-dasarnya sudah kamu pahami. Tinjau jawaban yang keliru di bawah, lalu coba kuis sekali lagi.',
    }
  }
  return {
    title: 'Yuk, pelajari lagi pelan-pelan',
    text: 'Tidak apa-apa, belajar memang bertahap. Baca ulang materinya, lalu ulangi kuis ini.',
  }
}

export default function LiterasiKuis() {
  const { materiId } = useParams()
  const navigate = useNavigate()
  const { getMaterial, saveQuizResult, getRecommendations } = useLiteracy()
  const material = getMaterial(materiId)

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null) // pilihan untuk soal yang sedang tampil
  const [answers, setAnswers] = useState([]) // pilihan untuk soal-soal sebelumnya
  const [finished, setFinished] = useState(false)

  if (!material) {
    return (
      <div className="p-4 lg:p-0">
        <Card className="text-center py-10">
          <p className="font-bold text-neutral-800">Kuis tidak ditemukan</p>
          <Button className="mt-4" onClick={() => navigate('/literasi')}>Kembali ke Literasi</Button>
        </Card>
      </div>
    )
  }

  const total = material.quiz.length
  const current = material.quiz[index]
  const answered = selected !== null
  const isLast = index === total - 1

  function handleSelect(i) {
    if (answered) return // jawaban sudah dikunci setelah dipilih
    setSelected(i)
  }

  function handleNext() {
    const nextAnswers = [...answers, selected]
    if (isLast) {
      const score = nextAnswers.filter((a, i) => a === material.quiz[i].answer).length
      saveQuizResult(material.id, score, total)
      setAnswers(nextAnswers)
      setFinished(true)
    } else {
      setAnswers(nextAnswers)
      setSelected(null)
      setIndex(index + 1)
    }
  }

  function handleRetry() {
    setIndex(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
  }

  // ---------- Layar hasil ----------
  if (finished) {
    const score = answers.filter((a, i) => a === material.quiz[i].answer).length
    const percent = Math.round((score / total) * 100)
    const insight = getInsight(percent)
    const wrong = material.quiz
      .map((item, i) => ({ item, picked: answers[i], number: i + 1 }))
      .filter((x) => x.picked !== x.item.answer)
    const recommendations = getRecommendations(material.id, 2)

    const R = 52
    const C = 2 * Math.PI * R

    return (
      <div className="pb-8">
        <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(`/literasi/${material.id}`)} className="text-neutral-600" aria-label="Kembali">
            <ChevronLeft size={20} />
          </button>
          <h1 className="font-bold text-neutral-800">Hasil Kuis</h1>
        </header>

        <div className="p-4 lg:p-0 max-w-3xl space-y-5">
          <h1 className="hidden lg:block text-xl font-bold text-neutral-800">Hasil Kuis: {material.title}</h1>

          <Card className="text-center">
            <div className="relative w-36 h-36 mx-auto">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r={R} fill="none" strokeWidth="10" className="stroke-neutral-200" />
                <circle
                  cx="60" cy="60" r={R} fill="none" strokeWidth="10" strokeLinecap="round"
                  className="stroke-teal-600"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - percent / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-navy-800">{percent}%</span>
                <span className="text-xs text-neutral-500">{score} dari {total} benar</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {percent >= 80 && <Trophy size={18} className="text-champagne-600" />}
              <p className="text-lg font-bold text-neutral-800">{insight.title}</p>
            </div>
            <p className="text-sm text-neutral-600 mt-1 max-w-md mx-auto">{insight.text}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-5">
              <Button variant="outline" onClick={handleRetry}><RotateCcw size={16} /> Ulangi Kuis</Button>
              <Button variant="outline" onClick={() => navigate(`/literasi/${material.id}`)}><BookOpen size={16} /> Baca Materi Lagi</Button>
            </div>
          </Card>

          {wrong.length > 0 && (
            <div>
              <p className="font-bold text-neutral-800 mb-3">Yang perlu ditinjau ({wrong.length})</p>
              <div className="space-y-3">
                {wrong.map(({ item, picked, number }) => (
                  <Card key={number}>
                    <p className="text-sm font-semibold text-neutral-800">{number}. {item.question}</p>
                    <p className="text-sm text-danger mt-2">Jawabanmu: {item.options[picked]}</p>
                    <p className="text-sm text-teal-700 mt-1 font-medium">Jawaban benar: {item.options[item.answer]}</p>
                    <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{item.explanation}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {recommendations.length > 0 && (
            <div>
              <p className="font-bold text-neutral-800 mb-3">Rekomendasi belajar berikutnya</p>
              <div className="grid gap-3 md:grid-cols-2">
                {recommendations.map((r) => (
                  <Link key={r.id} to={`/literasi/${r.id}`} className="block">
                    <Card className="h-full hover:border-navy-300 transition-colors">
                      <p className="font-bold text-neutral-800">{r.title}</p>
                      <p className="text-sm text-neutral-600 mt-1">{r.summary}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 mt-3">
                        Mulai Belajar <ArrowRight size={14} />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Button variant="ghost" onClick={() => navigate('/literasi')}>Kembali ke daftar materi</Button>
        </div>
      </div>
    )
  }

  // ---------- Layar soal ----------
  return (
    <div className="pb-8">
      <header className="lg:hidden sticky top-0 z-30 bg-neutral-0 border-b border-neutral-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(`/literasi/${material.id}`)} className="text-neutral-600" aria-label="Kembali">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-bold text-neutral-800 truncate">Kuis: {material.title}</h1>
      </header>

      <div className="p-4 lg:p-0 max-w-3xl">
        <h1 className="hidden lg:block text-xl font-bold text-neutral-800 mb-4">Kuis: {material.title}</h1>

        <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
          <span className="font-semibold">Soal {index + 1} dari {total}</span>
          <span>{Math.round((index / total) * 100)}%</span>
        </div>
        <ProgressBar value={index} max={total} className="mb-5" />

        <Card>
          <p className="text-lg font-bold text-neutral-800 leading-snug">{current.question}</p>

          <div className="mt-4 space-y-2">
            {current.options.map((opt, i) => {
              const isCorrect = i === current.answer
              const isPicked = i === selected
              let style = 'border-neutral-200 bg-neutral-0 hover:border-navy-400'
              if (answered && isCorrect) style = 'border-teal-600 bg-teal-50'
              else if (answered && isPicked) style = 'border-danger bg-red-50'
              else if (answered) style = 'border-neutral-200 bg-neutral-0 opacity-70'
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border-[1.5px] transition-colors ${style}`}
                >
                  <span className="w-7 h-7 shrink-0 rounded-full bg-neutral-100 text-neutral-700 text-xs font-bold flex items-center justify-center">
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-sm text-neutral-800 pt-1">{opt}</span>
                  {answered && isCorrect && <CheckCircle2 size={20} className="text-teal-600 shrink-0 mt-0.5" />}
                  {answered && isPicked && !isCorrect && <XCircle size={20} className="text-danger shrink-0 mt-0.5" />}
                </button>
              )
            })}
          </div>

          {answered && (
            <div className="mt-4 rounded-xl bg-sage border border-teal-100 p-4">
              <p className="text-sm font-bold text-navy-800">
                {selected === current.answer ? 'Tepat!' : 'Belum tepat.'}
              </p>
              <p className="text-sm text-neutral-700 mt-1 leading-relaxed">{current.explanation}</p>
            </div>
          )}
        </Card>

        <div className="mt-4 flex justify-end">
          <Button onClick={handleNext} disabled={!answered}>
            {isLast ? 'Lihat Hasil' : 'Soal Berikutnya'} <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
