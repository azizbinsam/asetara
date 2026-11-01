import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useProperties } from './context/PropertiesContext'
import { PortfolioProvider } from './context/PortfolioContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRoute } from './components/AdminRoute'
import ResponsiveShell from './layouts/ResponsiveShell'
import AdminLayout from './layouts/AdminLayout'
import { ToastContainer } from './components/Toast'

// Public pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Styleguide from './pages/Styleguide'

// User pages
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import PropertyDetail from './pages/PropertyDetail'
import DetailTokenisasi from './pages/DetailTokenisasi'
import DompetTransaksi from './pages/DompetTransaksi'
import DetailTransaksi from './pages/DetailTransaksi'
import SertifikatList from './pages/SertifikatList'
import SertifikatDetail from './pages/SertifikatDetail'
import AutoZakat from './pages/AutoZakat'
import AiAssistant from './pages/AiAssistant'
import Dampak from './pages/Dampak'
import Laporan from './pages/Laporan'
import Akun from './pages/Akun'

// Fitur baru ASETARA
import Literasi from './pages/Literasi'
import LiterasiDetail from './pages/LiterasiDetail'
import LiterasiKuis from './pages/LiterasiKuis'
import Perencanaan from './pages/Perencanaan'
import PerbandinganInvestasi from './pages/PerbandinganInvestasi'
import AksesKeamanan from './pages/AksesKeamanan'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProperti from './pages/admin/AdminProperti'
import AdminInvestor from './pages/admin/AdminInvestor'
import AdminTransaksi from './pages/admin/AdminTransaksi'
import AdminZakat from './pages/admin/AdminZakat'
import AdminPengaturan from './pages/admin/AdminPengaturan'

import NotFound from './pages/NotFound'

function AppWithPortfolio() {
  const { properties } = useProperties()
  return (
    <PortfolioProvider properties={properties}>
      <AppRoutes />
    </PortfolioProvider>
  )
}

function AppRoutes() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/styleguide" element={<Styleguide />} />

        <Route element={<ResponsiveShell />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
          <Route path="/marketplace/:propertyId" element={<ProtectedRoute><PropertyDetail /></ProtectedRoute>} />
          <Route path="/tokenisasi/:propertyId" element={<ProtectedRoute><DetailTokenisasi /></ProtectedRoute>} />
          <Route path="/dompet" element={<ProtectedRoute><DompetTransaksi /></ProtectedRoute>} />
          <Route path="/transaksi/:txId" element={<ProtectedRoute><DetailTransaksi /></ProtectedRoute>} />
          <Route path="/sertifikat" element={<ProtectedRoute><SertifikatList /></ProtectedRoute>} />
          <Route path="/sertifikat/:tokenId" element={<ProtectedRoute><SertifikatDetail /></ProtectedRoute>} />
          <Route path="/zakat" element={<ProtectedRoute><AutoZakat /></ProtectedRoute>} />
          <Route path="/ai-assistant" element={<ProtectedRoute><AiAssistant /></ProtectedRoute>} />
          <Route path="/dampak" element={<ProtectedRoute><Dampak /></ProtectedRoute>} />
          <Route path="/laporan" element={<ProtectedRoute><Laporan /></ProtectedRoute>} />
          <Route path="/akun" element={<ProtectedRoute><Akun /></ProtectedRoute>} />
          <Route path="/literasi" element={<ProtectedRoute><Literasi /></ProtectedRoute>} />
          <Route path="/literasi/:materiId" element={<ProtectedRoute><LiterasiDetail /></ProtectedRoute>} />
          <Route path="/literasi/:materiId/kuis" element={<ProtectedRoute><LiterasiKuis /></ProtectedRoute>} />
          <Route path="/perencanaan" element={<ProtectedRoute><Perencanaan /></ProtectedRoute>} />
          <Route path="/perbandingan" element={<ProtectedRoute><PerbandinganInvestasi /></ProtectedRoute>} />
          <Route path="/akses-keamanan" element={<ProtectedRoute><AksesKeamanan /></ProtectedRoute>} />
        </Route>

        <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/properti" element={<AdminProperti />} />
          <Route path="/admin/investor" element={<AdminInvestor />} />
          <Route path="/admin/transaksi" element={<AdminTransaksi />} />
          <Route path="/admin/zakat" element={<AdminZakat />} />
          <Route path="/admin/pengaturan" element={<AdminPengaturan />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppWithPortfolio />
    </BrowserRouter>
  )
}

export default App