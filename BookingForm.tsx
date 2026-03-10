'use client'

import { useState } from 'react'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  room: string
  guests: number
  message: string
  createdAt: string
}

const roomPrices: Record<string, number> = {
  'cobertura': 600,
  'frente-mar-1': 400,
  'frente-mar-2': 400,
  'casal-1': 250,
  'casal-2': 250,
  'casal-3': 250,
  'duplex-1': 350,
  'duplex-2': 350,
}

const roomNames: Record<string, string> = {
  'cobertura': 'Cobertura',
  'frente-mar-1': 'Frente de Mar 1',
  'frente-mar-2': 'Frente de Mar 2',
  'casal-1': 'Casal 1',
  'casal-2': 'Casal 2',
  'casal-3': 'Casal 3',
  'duplex-1': 'Duplex 1',
  'duplex-2': 'Duplex 2',
}

function getBookings(): Booking[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('melodie_bookings')
  return stored ? JSON.parse(stored) : []
}

function saveBooking(booking: Booking) {
  const bookings = getBookings()
  bookings.push(booking)
  localStorage.setItem('melodie_bookings', JSON.stringify(bookings))
}

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    room: '',
    guests: 2,
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bookingCode, setBookingCode] = useState('')

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !formData.room) return 0
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    if (nights <= 0) return 0
    return (roomPrices[formData.room] || 0) * nights
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Generate booking code
    const code = 'MEL' + Date.now().toString(36).toUpperCase()
    setBookingCode(code)
    
    // Create booking object
    const booking: Booking = {
      id: code,
      ...formData,
      createdAt: new Date().toISOString()
    }
    
    // Save to localStorage
    saveBooking(booking)
    
    // Simulate sending WhatsApp message to admin
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Nueva reserva guardada:', booking)
    console.log('WhatsApp message would be sent to +543765237582')
    
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reserva Confirmada!</h2>
          <p className="text-gray-600 mb-4">Obrigado pela sua reserva. Entraremos em contato em breve.</p>
          <div className="bg-ocean-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-500">Código da reserva</p>
            <p className="text-2xl font-bold text-primary">{bookingCode}</p>
          </div>
          <div className="text-left text-sm text-gray-600 space-y-1">
            <p><strong>Quarto:</strong> {roomNames[formData.room]}</p>
            <p><strong>Check-in:</strong> {formData.checkIn}</p>
            <p><strong>Check-out:</strong> {formData.checkOut}</p>
            <p><strong>Total:</strong> R$ {calculateTotal()}</p>
          </div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-primary text-center mb-2">Faça sua Reserva</h1>
        <p className="text-gray-600 text-center mb-8">Preencha o formulário abaixo</p>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
              <input 
                type="tel" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})} 
              />
            </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <input 
                type="date" 
                required 
                min={today}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.checkIn} 
                onChange={e => setFormData({...formData, checkIn: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <input 
                type="date" 
                required 
                min={formData.checkIn || today}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.checkOut} 
                onChange={e => setFormData({...formData, checkOut: e.target.value})} 
              />
            </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quarto</label>
              <select 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.room} 
                onChange={e => setFormData({...formData, room: e.target.value})}>
                <option value="">Selecione...</option>
                <option value="cobertura">Cobertura - R$ 600/noite</option>
                <option value="frente-mar-1">Frente de Mar 1 - R$ 400/noite</option>
                <option value="frente-mar-2">Frente de Mar 2 - R$ 400/noite</option>
                <option value="casal-1">Casal 1 - R$ 250/noite</option>
                <option value="casal-2">Casal 2 - R$ 250/noite</option>
                <option value="casal-3">Casal 3 - R$ 250/noite</option>
                <option value="duplex-1">Duplex 1 - R$ 350/noite</option>
                <option value="duplex-2">Duplex 2 - R$ 350/noite</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hóspedes</label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.guests} 
                onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'hóspede' : 'hóspedes'}</option>
                ))}
              </select>
            </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})} 
              placeholder="Alguma observação especial..."
            />
          </div>

          {formData.checkIn && formData.checkOut && formData.room && (
            <div className="bg-ocean-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Estimado:</span>
                <span className="text-primary font-bold text-xl">R$ {calculateTotal()}</span>
              </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando...
              </>
            ) : (
              'Confirmar Reserva'
            )}
          </button>
        </form>
      </div>
  )
}
