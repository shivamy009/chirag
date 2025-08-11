import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProfileLayout from './pages/profile/ProfileLayout'
import Dashboard from './pages/profile/Dashboard'
import AddProduct from './pages/profile/AddProduct'
import ManageProducts from './pages/profile/ManageProducts'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="manage-products" element={<ManageProducts />} />
      </Route>
    </Routes>
  )
}

export default App