// Penyimpan notifikasi toast (di luar komponen agar fast refresh tidak error).
// toast(...) bisa dipanggil dari mana saja; <ToastContainer /> berlangganan lewat subscribeToast.
let toastListeners = []

export function toast(message, type = 'success') {
  const id = Date.now() + Math.random()
  toastListeners.forEach((fn) => fn({ id, message, type }))
}

export function subscribeToast(fn) {
  toastListeners.push(fn)
  return () => {
    toastListeners = toastListeners.filter((l) => l !== fn)
  }
}
