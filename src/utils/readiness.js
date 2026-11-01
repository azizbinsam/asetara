// Rumus Financial Readiness Simulator (ilustrasi, bukan nasihat keuangan).
// Semua angka bisa diubah di sini tanpa menyentuh halaman.

export const SAVE_SHARE = 0.5 // porsi surplus yang disarankan untuk disisihkan
export const SAVING_RATIO_TARGET = 0.2 // rasio tabungan sehat
export const EMERGENCY_MONTHS = 6 // dana darurat ideal = 6 x pengeluaran
export const EXPENSE_RATIO_LIMIT = 0.7 // pengeluaran maksimal 70% dari penghasilan
export const READY_THRESHOLD = 60 // skor >= 60 => "Siap"
export const ALMOST_THRESHOLD = 40 // skor 40-59 => "Hampir siap"

export const GOALS = [
  { id: 'darurat', label: 'Dana darurat (6 bulan)' },
  { id: 'pendidikan', label: 'Pendidikan anak' },
  { id: 'rumah', label: 'Membeli rumah' },
  { id: 'ibadah', label: 'Ibadah haji / umrah' },
  { id: 'pensiun', label: 'Masa pensiun' },
  { id: 'lainnya', label: 'Tujuan lainnya' },
]

const clamp01 = (n) => Math.min(1, Math.max(0, n))

export function calculateReadiness({ income, expense, savings, goal }) {
  const surplus = income - expense
  const monthlySave = Math.max(0, surplus) * SAVE_SHARE
  const savingRatio = income > 0 ? Math.max(0, surplus) / income : 0
  const expenseRatio = income > 0 ? expense / income : 0
  const emergencyTarget = expense * EMERGENCY_MONTHS
  const coverageMonths = expense > 0 ? savings / expense : 0

  const savingScore = clamp01(savingRatio / SAVING_RATIO_TARGET)
  const emergencyScore = emergencyTarget > 0 ? clamp01(savings / emergencyTarget) : 0
  const controlScore = expenseRatio <= EXPENSE_RATIO_LIMIT ? 1 : 0

  const score = Math.round((0.4 * savingScore + 0.4 * emergencyScore + 0.2 * controlScore) * 100)
  const status = score >= READY_THRESHOLD ? 'siap' : score >= ALMOST_THRESHOLD ? 'hampir' : 'persiapan'

  return {
    goal,
    income,
    expense,
    savings,
    surplus,
    monthlySave,
    savingRatio,
    expenseRatio,
    emergencyTarget,
    coverageMonths,
    score,
    status,
    factors: [
      {
        id: 'tabungan',
        label: 'Rasio tabungan',
        detail: `${Math.round(savingRatio * 100)}% dari penghasilan (acuan ${SAVING_RATIO_TARGET * 100}%)`,
        value: savingScore,
        weight: 40,
      },
      {
        id: 'darurat',
        label: 'Dana darurat',
        detail: `Dana tersedia setara ${coverageMonths.toFixed(1).replace('.', ',')} bulan pengeluaran (acuan ${EMERGENCY_MONTHS} bulan)`,
        value: emergencyScore,
        weight: 40,
      },
      {
        id: 'kendali',
        label: 'Pengeluaran terkendali',
        detail: `Pengeluaran ${Math.round(expenseRatio * 100)}% dari penghasilan (batas ${EXPENSE_RATIO_LIMIT * 100}%)`,
        value: controlScore,
        weight: 20,
      },
    ],
  }
}
