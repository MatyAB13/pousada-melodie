// Datos de habitaciones fijas
const rooms = [
    { id: 1, name: 'Dúplex 1', type: 'Dúplex' },
    { id: 2, name: 'Dúplex 2', type: 'Dúplex' },
    { id: 3, name: 'Pareja 1', type: 'Habitación de Pareja' },
    { id: 4, name: 'Pareja 2', type: 'Habitación de Pareja' },
    { id: 5, name: 'Pareja 3', type: 'Habitación de Pareja' },
    { id: 6, name: 'Frente al Mar 1', type: 'Habitación Frente al Mar' },
    { id: 7, name: 'Frente al Mar 2', type: 'Habitación Frente al Mar' },
    { id: 8, name: 'Cobertura', type: 'Cobertura' }
];

// Cargar datos desde LocalStorage
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

// Elementos DOM
const roomsGrid = document.getElementById('rooms-grid');
const roomSelect = document.getElementById('room-select');
const reserveForm = document.getElementById('reserve-form');
const calendarGrid = document.getElementById('calendar-grid');
const monthYear = document.getElementById('month-year');
const occupationsList = document.getElementById('occupations-list');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadRooms();
    populateRoomSelect();
    initCalendar();
    initSlider();

    // Navegación
    document.getElementById('btn-rooms').addEventListener('click', () => showSection('rooms-section'));
    document.getElementById('btn-calendar').addEventListener('click', () => showSection('calendar-section'));

    // Formulario
    reserveForm.addEventListener('submit', handleReservation);

    // Calendario
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
});

// Mostrar sección
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-' + sectionId.split('-')[0]).classList.add('active');
}

// Cargar habitaciones en grid
function loadRooms() {
    roomsGrid.innerHTML = '';
    rooms.forEach(room => {
        const reservation = reservations.find(r => r.roomId === room.id && isOccupied(r));
        const card = document.createElement('div');
        card.className = `room-card ${reservation ? 'occupied' : 'free'}`;
        card.innerHTML = `
            <h3>${room.name}</h3>
            <p><strong>Tipo:</strong> ${room.type}</p>
            <p><strong>Estado:</strong> ${reservation ? 'Ocupada' : 'Libre'}</p>
            ${reservation ? `
                <p><strong>Entrada:</strong> ${reservation.checkin}</p>
                <p><strong>Salida:</strong> ${reservation.checkout}</p>
                <p><strong>Huésped:</strong> ${reservation.guest}</p>
                <button class="btn-danger" onclick="freeRoom(${room.id})">Liberar</button>
                <button class="btn-danger" onclick="deleteReservation(${reservation.id})">Eliminar Reserva</button>
            ` : ''}
        `;
        roomsGrid.appendChild(card);
    });
}

// Poblar select de habitaciones
function populateRoomSelect() {
    roomSelect.innerHTML = '<option value="">Seleccionar Habitación</option>';
    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = room.name;
        roomSelect.appendChild(option);
    });
}

// Manejar reserva
function handleReservation(e) {
    e.preventDefault();
    const roomId = parseInt(roomSelect.value);
    const checkin = document.getElementById('checkin-date').value;
    const checkout = document.getElementById('checkout-date').value;
    const guest = document.getElementById('guest-name').value;

    if (new Date(checkin) >= new Date(checkout)) {
        alert('Fecha de salida debe ser posterior a entrada.');
        return;
    }

    const id = Date.now(); // ID simple
    reservations.push({ id, roomId, checkin, checkout, guest });
    saveReservations();
    loadRooms();
    reserveForm.reset();
    renderCalendar();
}

// Liberar habitación
function freeRoom(roomId) {
    reservations = reservations.filter(r => !(r.roomId === roomId && isOccupied(r)));
    saveReservations();
    loadRooms();
    renderCalendar();
}

// Eliminar reserva
function deleteReservation(id) {
    reservations = reservations.filter(r => r.id !== id);
    saveReservations();
    loadRooms();
    renderCalendar();
}

// Verificar si está ocupada (fechas actuales)
function isOccupied(reservation) {
    const now = new Date();
    const checkin = new Date(reservation.checkin);
    const checkout = new Date(reservation.checkout);
    return now >= checkin && now <= checkout;
}

// Guardar en LocalStorage
function saveReservations() {
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

// Calendario
let currentDate = new Date();
let selectedDate = null;

function initCalendar() {
    renderCalendar();
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent = `${getMonthName(month)} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    // Días de la semana
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    days.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });

    // Días vacíos
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        calendarGrid.appendChild(empty);
    }

    // Días del mes
    for (let date = 1; date <= lastDate; date++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = date;

        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        const today = new Date().toISOString().split('T')[0];

        if (fullDate === today) {
            dayEl.classList.add('today');
        }

        if (selectedDate === fullDate) {
            dayEl.classList.add('selected');
        }

        // Verificar si hay ocupaciones
        const occupiedRooms = reservations.filter(r => {
            const checkin = new Date(r.checkin);
            const checkout = new Date(r.checkout);
            const current = new Date(fullDate);
            return current >= checkin && current <= checkout;
        });

        if (occupiedRooms.length > 0) {
            dayEl.classList.add('occupied');
        }

        dayEl.addEventListener('click', () => selectDate(fullDate, occupiedRooms));
        calendarGrid.appendChild(dayEl);
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
    selectedDate = null;
    occupationsList.innerHTML = '';
}

function selectDate(date, occupiedRooms) {
    selectedDate = date;
    renderCalendar();
    occupationsList.innerHTML = '';
    if (occupiedRooms.length === 0) {
        occupationsList.innerHTML = '<li>No hay ocupaciones este día.</li>';
    } else {
        occupiedRooms.forEach(r => {
            const room = rooms.find(rm => rm.id === r.roomId);
            const li = document.createElement('li');
            li.textContent = `${room.name} - Huésped: ${r.guest}`;
            occupationsList.appendChild(li);
        });
    }
}

function getMonthName(month) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[month];
}

// Slider del banner
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function initSlider() {
    document.getElementById('prev-slide').addEventListener('click', () => changeSlide(-1));
    document.getElementById('next-slide').addEventListener('click', () => changeSlide(1));
    showSlide(currentSlide);
    setInterval(() => changeSlide(1), 5000); // Auto-slide cada 5s
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}