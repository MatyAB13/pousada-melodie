'use client'

import { useState } from 'react'
import { type Language } from '@/lib/i18n'
import { Calendar, Check, AlertCircle, Loader2 } from 'lucide-react'

const roomData = {
  pt: [
    { id: 1, name: 'Cobertura', price: 600, capacity: 10 },
    { id: 2, name: 'Frente de Mar 1', price: 400, capacity: 4 },
    { id: 3, name: 'Frente de Mar 2', price: 400, capacity: 4 },
    { id: 4, name: 'Casal 1', price: 250, capacity: 2 },
    { id: 5, name: 'Casal 2', price: 250, capacity: 2 },
    { id: 6, name: 'Casal 3', price: 250, capacity: 2 },
    { id: 7, name: 'Duplex 1', price: 350, capacity: 8 },
    { id: 8, name: 'Duplex 2', price: 350, capacity: 8 },
  ],
  es: [
    { id: 1, name: 'Terraza', price: 600, capacity: 10 },
    { id: 2, name: 'Frente al Mar 1', price: 400, capacity: 4 },
    { id: 3, name: 'Frente al Mar 2', price: 400, capacity: 4 },
    { id: 4, name: 'Pareja 1', price: 250, capacity: 2 },
    { id: 5, name: 'Pareja 2', price: 250, capacity: 2 },
    { id: 6, name: 'Pareja 3', price: 250, capacity: 2 },
    { id: 7, name: 'Duplex 1', price: 350, capacity: 8 },
    { id: 8, name: 'Duplex 2', price: 350, capacity: 8 },
  ],
  en: [
    { id: 1, name: 'Rooftop', price: 600, capacity: 10 },
    { id: 2, name: 'Beachfront 1', price: 400, capacity: 4 },
    { id: 3, name: 'Beachfront 2', price: 400, capacity: 4 },
    { id: 4, name: 'Couple 1', price: 250, capacity: 2 },
    { id: 5, name: 'Couple 2', price: 250, capacity: 2 },
    { id: 6, name: 'Couple 3', price: 250, capacity: 2 },
    { id: 7, name: 'Duplex 1', price: 350, capacity: 8 },
    { id: 8, name: 'Duplex 2', price: 350, capacity: 8 },
  ],
}

interface BookingData {
  roomId: number
  checkIn: string
  checkOut: string
  guestName?: string
  guestEmail?: string
  guestPhone?: string
  totalPrice?: number
}

function getBookings(): BookingData[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('melodie_bookings')
  return stored ? JSON.parse(stored) : []
}

function checkAvailability(roomId: number, checkIn: string, checkOut: string): boolean {
  const bookings = getBookings()
  const newCheckIn = new Date(checkIn)
  const newCheckOut = new Date(checkOut)
  for (const booking of bookings) {
    if (booking.roomId !== roomId) continue
    const existingCheckIn = new Date(booking.checkIn)
    const existingCheckOut = new Date(booking.checkOut)
    if (newCheckIn < existingCheckOut && newCheckOut > existingCheckIn) return false
  }
  return true
}

function saveBooking(booking: {
  rooms: number[]
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  totalPrice: number
}) {
  const bookings = getBookings()
  for (const roomId of booking.rooms) {
    bookings.push({
      roomId,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guestName: booking.guestName,
      guestEmail: booking.guestEmail,
      guestPhone: booking.guestPhone,
      totalPrice: booking.totalPrice / booking.rooms.length,
    })
  }
  localStorage.setItem('melodie_bookings', JSON.stringify(bookings))
}

const translations = {
  pt: {
    title: 'Faça sua Reserva',
    subtitle: 'Reserve seu momento perfeito',
    selectRoom: 'Selecione a(s) Habitação(oes)',
    selectRoomHint: 'Clique para selecionar múltiplas habitações',
    selectDates: 'Selecione as Datas',
    guestInfo: 'Dados do Hóspede',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    adults: 'Adultos',
    children: 'Crianças',
    total: 'Total',
    confirm: 'Confirmar Reserva',
    perNight: '/noite',
    fullName: 'Nome Completo',
    email: 'Email',
    phone: 'WhatsApp',
    nights: 'noites',
    roomSelected: 'habitação(oes) selecionada(s)',
    roomUnavailable: 'não disponível para as datas escolhidas',
    back: 'Voltar',
    next: 'Próximo',
    selectAtLeastOne: 'Selecione pelo menos uma habitación',
    selectDatesFirst: 'Selecione as datas primeiro',
    bookingConfirmed: 'Sua reserva foi confirmada!',
    bookingCode: 'Código da reserva',
    weContact: 'Entraremos em contato em breve',
    guests: 'hóspedes',
    roomsLabel: 'Quartos:',
    unavailableTitle: 'Habitações indisponíveis:',
    selectRoomFirst: 'Selecione um quarto',
  },
  es: {
    title: 'Haga su Reserva',
    subtitle: 'Reserve su momento perfecto',
    selectRoom: 'Seleccione la(s) Habitación(es)',
    selectRoomHint: 'Haga clic para seleccionar múltiples habitaciones',
    selectDates: 'Seleccione las Fechas',
    guestInfo: 'Datos del Huésped',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    adults: 'Adultos',
    children: 'Niños',
    total: 'Total',
    confirm: 'Confirmar Reserva',
    perNight: '/noche',
    fullName: 'Nombre Completo',
    email: 'Email',
    phone: 'WhatsApp',
    nights: 'noches',
    roomSelected: 'habitación(es) seleccionada(s)',
    roomUnavailable: 'no disponible para las fechas elegidas',
    back: 'Atrás',
    next: 'Siguiente',
    selectAtLeastOne: 'Seleccione al menos una habitación',
    selectDatesFirst: 'Seleccione las fechas primero',
    bookingConfirmed: '¡Su reserva ha sido confirmada!',
    bookingCode: 'Código de reserva',
    weContact: 'Nos pondremos en contacto pronto',
    guests: 'huéspedes',
    roomsLabel: 'Habitaciones:',
    unavailableTitle: 'Habitaciones no disponibles:',
    selectRoomFirst: 'Seleccione una habitación',
  },
  en: {
    title: 'Make Your Reservation',
    subtitle: 'Book your perfect moment',
    selectRoom: 'Select Room(s)',
    selectRoomHint: 'Click to select multiple rooms',
    selectDates: 'Select Dates',
    guestInfo: 'Guest Information',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    adults: 'Adults',
    children: 'Children',
    total: 'Total',
    confirm: 'Confirm Reservation',
    perNight: '/night',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'WhatsApp',
    nights: 'nights',
    roomSelected: 'room(s) selected',
    roomUnavailable: 'not available for selected dates',
    back: 'Back',
    next: 'Next',
    selectAtLeastOne: 'Select at least one room',
    selectDatesFirst: 'Select dates first',
    bookingConfirmed: 'Your reservation has been confirmed!',
    bookingCode: 'Booking code',
    weContact: 'We will contact you shortly',
    guests: 'guests',
    roomsLabel: 'Rooms:',
    unavailableTitle: 'Unavailable rooms:',
    selectRoomFirst: 'Select a room',
  },
}

export default function BookingClient(props: { lang: Language }) {
  const lang = props.lang
  const rooms = roomData[lang] || roomData.pt
  const t = translations[lang] || translations.pt
  const [selectedRooms, setSelectedRooms] = useState<number[]>([])
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [bookingCode, setBookingCode] = useState('')
  const [availabilityErrors, setAvailabilityErrors] = useState<number[]>([])

  const toggleRoom = (roomId: number) => {
    setSelectedRooms(prev => prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId])
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0
    const nights = Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    if (nights <= 0) return 0
    return selectedRooms.reduce((sum, roomId) => sum + (rooms.find(r => r.id === roomId)?.price || 0), 0) * nights
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    return Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
  }

  const checkAvailabilityForSelectedRooms = () => {
    if (!checkIn || !checkOut) return true
    const errors: number[] = []
    for (const roomId of selectedRooms) if (!checkAvailability(roomId, checkIn, checkOut)) errors.push(roomId)
    setAvailabilityErrors(errors)
    return errors.length === 0
  }

  const generateBookingCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'MEL'
    for (let i = 0; i < 5; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
    return code
  }

  const handleNext = () => {
    if (step === 1 && selectedRooms.length === 0) { alert(t.selectAtLeastOne); return }
    if (step === 2 && (!checkIn || !checkOut)) { alert(t.selectDatesFirst); return }
    if (step === 2 && !checkAvailabilityForSelectedRooms()) return
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const code = generateBookingCode()
    setBookingCode(code)
    const formData = new FormData(e.currentTarget)
    saveBooking({ 
      rooms: selectedRooms, 
      guestName: formData.get('guestName') as string, 
      guestEmail: formData.get('guestEmail') as string, 
      guestPhone: formData.get('guestPhone') as string, 
      checkIn, 
      checkOut, 
      adults, 
      children, 
      totalPrice: calculateTotal() 
    })
    console.log('Nueva reserva:', { code, rooms: selectedRooms, checkIn, checkOut, total: calculateTotal() })
    setIsSubmitting(false)
    setSubmitSuccess(true)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-ocean-50 pt-24 pb-12">
        <div className="container-custom">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="font-heading text-2xl text-primary mb-4">{t.bookingConfirmed}</h2>
              <p className="text-text-secondary mb-6">{t.weContact}</p>
              <div className="bg-ocean-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-text-secondary">{t.bookingCode}</p>
                <p className="font-heading text-3xl text-primary">{bookingCode}</p>
              </div>
              <div className="text-left text-sm text-text-secondary space-y-2">
                <p><strong>{t.roomsLabel}</strong> {selectedRooms.map(id => rooms.find(r => r.id === id)?.name).join(', ')}</p>
                <p><strong>{t.checkIn}:</strong> {checkIn}</p>
                <p><strong>{t.checkOut}:</strong> {checkOut}</p>
                <p><strong>{t.total}:</strong> R$ {calculateTotal()}</p>
              </div>
          </div>
      </div>
    )
  }

  const selected = rooms.filter(r => selectedRooms.includes(r.id))
  const nights = calculateNights()
  const minDate = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-ocean-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary mb-4">{t.title}</h1>
          <p className="text-text-secondary text-lg">{t.subtitle}</p>
        </div>
        
        <div className="flex justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step >= s ? 'bg-primary text-white' : 'bg-ocean-200 text-text-secondary'}`}>
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 ${step > s ? 'bg-primary' : 'bg-ocean-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-heading text-xl text-primary mb-2">{t.selectRoom}</h2>
                <p className="text-text-secondary text-sm mb-6">{t.selectRoomHint}</p>
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div key={room.id} onClick={() => toggleRoom(room.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedRooms.includes(room.id) ? 'border-primary bg-ocean-50' : 'border-ocean-100 hover:border-primary/50'}`}>
                      <div className="flex gap-4 items-center">
                        <div className="w-24 h-24 bg-ocean-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-ocean-300" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-lg text-primary">{room.name}</h3>
                          <p className="text-text-secondary text-sm">{room.capacity} {t.guests}</p>
                          <p className="text-accent font-semibold mt-2">R$ {room.price} <span className="text-sm font-normal text-text-secondary">{t.perNight}</span></p>
                        </div>
                        {selectedRooms.includes(room.id) && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                  ))}
                </div>
                {selectedRooms.length > 0 && (
                  <p className="text-primary font-medium mt-4 text-center">{selectedRooms.length} {t.roomSelected}</p>
                )}
                <button onClick={handleNext} disabled={selectedRooms.length === 0} className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                  {t.next}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-heading text-xl text-primary mb-6">{t.selectDates}</h2>
                {availabilityErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-medium">{t.unavailableTitle}</span>
                    </div>
                    <ul className="text-sm text-red-600">
                      {availabilityErrors.map(id => (
                        <li key={id}>- {rooms.find(r => r.id === id)?.name} {t.roomUnavailable}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="label">{t.checkIn}</label>
                    <input type="date" className="input-field" value={checkIn} onChange={(e) => { setCheckIn(e.target.value); setAvailabilityErrors([]) }} min={minDate} />
                  </div>
                  <div>
                    <label className="label">{t.checkOut}</label>
                    <input type="date" className="input-field" value={checkOut} onChange={(e) => { setCheckOut(e.target.value); setAvailabilityErrors([]) }} min={checkIn || minDate} />
                  </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="label">{t.adults}</label>
                    <select className="input-field" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">{t.children}</label>
                    <select className="input-field" value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                      {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1">{t.back}</button>
                  <button onClick={handleNext} disabled={!checkIn || !checkOut || availabilityErrors.length > 0} className="btn-primary flex-1 disabled:opacity-50">
                    {t.next}
                  </button>
                </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-heading text-xl text-primary mb-6">{t.guestInfo}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label">{t.fullName}</label>
                    <input type="text" name="guestName" className="input-field" required />
                  </div>
                  <div>
                    <label className="label">{t.email}</label>
                    <input type="email" name="guestEmail" className="input-field" required />
                  </div>
                  <div>
                    <label className="label">{t.phone}</label>
                    <input type="tel" name="guestPhone" className="input-field" placeholder="+55 48 99999-9999" required />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1" disabled={isSubmitting}>
                      {t.back}
                    </button>
                    <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={isSubmitting}>
                      {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />{lang === 'pt' ? 'Enviando...' : 'Enviando...'}</> : t.confirm}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h3 className="font-heading text-lg text-primary mb-4">{lang === 'pt' ? 'Resumo da Reserva' : lang === 'es' ? 'Resumen de la Reserva' : 'Reservation Summary'}</h3>
              {selected.length > 0 ? (
                <div className="border-b border-ocean-100 pb-4 mb-4">
                  {selected.map(room => (
                    <div key={room.id} className="flex justify-between text-sm mb-1">
                      <span className="text-text-primary">{room.name}</span>
                      <span className="text-text-primary">R$ {room.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary text-sm mb-4">{t.selectRoomFirst}</p>
              )}
              {checkIn && checkOut && (
                <div className="border-b border-ocean-100 pb-4 mb-4">
                  <div className="flex justify-between text-sm mb-1"><span className="text-text-secondary">{t.checkIn}</span><span className="text-text-primary">{checkIn}</span></div>
                  <div className="flex justify-between text-sm mb-1"><span className="text-text-secondary">{t.checkOut}</span><span className="text-text-primary">{checkOut}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-text-secondary">{t.nights}</span><span className="text-text-primary">{nights}</span></div>
              )}
              <div className="flex justify-between font-semibold text-lg">
                <span>{t.total}</span>
                <span className="text-primary">R$ {calculateTotal()}</span>
              </div>
          </div>
      </div>
  )
}
