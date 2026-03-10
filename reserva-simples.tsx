'use client';

import { useState } from 'react';

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
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('melodie_bookings') || '[]');
    bookings.push({
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('melodie_bookings', JSON.stringify(bookings));
    
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pt-24 pb-12 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reserva Confirmada!</h2>
          <p className="text-gray-600 mb-4">Obrigado pela sua reserva. Entraremos em contato em breve.</p>
          <p className="text-sm text-gray-500">Código: MEL{Date.now().toString().slice(-5)}</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-primary text-center mb-2">Faça sua Reserva</h1>
        <p className="text-gray-600 text-center mb-8">Preencha o formulário abaixo</p>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
              <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <input type="date" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.checkIn} onChange={e => setFormData({...formData, checkIn: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <input type="date" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.checkOut} onChange={e => setFormData({...formData, checkOut: e.target.value})} />
            </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quarto</label>
              <select required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.room} onChange={e => setFormData({...formData, room: e.target.value})}>
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
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'hóspede' : 'hóspedes'}</option>)}
              </select>
            </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Alguma observação especial..." />
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50">
            {loading ? 'Enviando...' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>
  );
}
