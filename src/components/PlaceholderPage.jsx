export default function PlaceholderPage({ title, description, icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-6">
      <div className="w-14 h-14 rounded-full bg-navy-50 flex items-center justify-center mb-4">
        {Icon ? (
          <Icon size={26} className="text-navy-600" />
        ) : (
          <span className="text-navy-600 font-bold text-lg">A</span>
        )}
      </div>
      <h1 className="text-xl font-bold text-neutral-800">{title}</h1>
      <p className="text-neutral-500 mt-2 max-w-sm">{description}</p>
      <span className="mt-4 inline-block text-xs font-semibold text-champagne-700 bg-champagne-50 px-3 py-1 rounded-full">
        Segera hadir di tahap berikutnya
      </span>
    </div>
  )
}
