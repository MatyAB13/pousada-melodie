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

const roomMapLayout = {
    'Dúplex 1': 'duplex1',
    'Dúplex 2': 'duplex2',
    'Pareja 1': 'pareja1',
    'Pareja 2': 'pareja2',
    'Pareja 3': 'pareja3',
    'Frente al Mar 1': 'frente1',
    'Frente al Mar 2': 'frente2',
    'Cobertura': 'cobertura'
};

// Cargar datos desde LocalStorage
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

// Elementos DOM
const roomsGrid = document.getElementById('rooms-grid');
const roomSelect = document.getElementById('room-select');
const roomButtons = document.getElementById('room-buttons');
const selectedRoomLabel = document.getElementById('selected-room-label');
const reserveForm = document.getElementById('reserve-form');
const calendarGrid = document.getElementById('calendar-grid');
const monthYear = document.getElementById('month-year');
const occupationsList = document.getElementById('occupations-list');
const roomMap = document.getElementById('room-map');
const themeToggleBtn = document.getElementById('theme-toggle');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadRooms();
    populateRoomSelect();
    initCalendar();
    initSlider();
    initTheme();

    // Navegación
    document.getElementById('btn-rooms').addEventListener('click', () => showSection('rooms-section'));
    document.getElementById('btn-calendar').addEventListener('click', () => showSection('calendar-section'));

    // Formulario
    reserveForm.addEventListener('submit', handleReservation);

    // Calendario
    document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
    document.getElementById('next-month').addEventListener('click', () => changeMonth(1));

    // Tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');

    themeToggleBtn.textContent = isDark ? '☀️ Modo claro' : '🌙 Modo oscuro';
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
    themeToggleBtn.classList.toggle('active', isDark);
}

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
    const todayStr = new Date().toISOString().split('T')[0];

    rooms.forEach(room => {
        const occupiedToday = reservations.some(r => {
            if (r.roomId !== room.id) return false;
            const checkin = new Date(r.checkin);
            const checkout = new Date(r.checkout);
            const today = new Date(todayStr);
            return today >= checkin && today <= checkout;
        });

        const card = document.createElement('div');
        card.className = `room-card ${occupiedToday ? 'occupied' : 'free'}`;
        card.dataset.roomId = room.id;
        card.innerHTML = `
            <h3>${room.name}</h3>
            <p><strong>Estado hoy (${todayStr}):</strong> ${occupiedToday ? 'Ocupada' : 'Libre'}</p>
        `;

        card.addEventListener('click', () => setSelectedRoom(room.id));
        roomsGrid.appendChild(card);
    });
}

// Poblar select de habitaciones
function populateRoomSelect() {
    roomSelect.innerHTML = '<option value="">Seleccionar Habitación</option>';
    roomButtons.innerHTML = '';

    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = room.name;
        roomSelect.appendChild(option);

        const roomBtn = document.createElement('button');
        roomBtn.type = 'button';
        roomBtn.className = 'room-select-btn';
        roomBtn.dataset.roomId = room.id;
        roomBtn.textContent = room.name;
        roomBtn.addEventListener('click', () => setSelectedRoom(room.id));
        roomButtons.appendChild(roomBtn);
    });

    setSelectedRoom(selectedRoomId || rooms[0]?.id || null);
}

function setSelectedRoom(roomId) {
    selectedRoomId = roomId ? Number(roomId) : null;
    roomSelect.value = selectedRoomId ? String(selectedRoomId) : '';

    document.querySelectorAll('.room-select-btn').forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.roomId) === selectedRoomId);
    });

    document.querySelectorAll('.room-card').forEach(card => {
        card.classList.toggle('selected-room-card', Number(card.dataset.roomId) === selectedRoomId);
    });

    const selectedRoom = rooms.find(r => r.id === selectedRoomId);
    selectedRoomLabel.textContent = selectedRoom
        ? `Habitación seleccionada: ${selectedRoom.name}`
        : 'Habitación seleccionada: ninguna';
}

// Manejar reserva
function handleReservation(e) {
    e.preventDefault();
    const roomId = selectedRoomId || parseInt(roomSelect.value, 10);
    const checkin = document.getElementById('checkin-date').value;
    const checkout = document.getElementById('checkout-date').value;
    const guest = document.getElementById('guest-name').value;
    const guestCount = parseInt(document.getElementById('guest-count').value, 10);
    const carCount = parseInt(document.getElementById('car-count').value || 0, 10);
    const carPlates = document.getElementById('car-plates').value.trim();
    const paymentStatus = document.getElementById('payment-status').value;
    const extraDays = parseInt(document.getElementById('extra-days').value || 0, 10);
    const checkinTime = document.getElementById('checkin-time').value;
    const checkoutTime = document.getElementById('checkout-time').value;
    const paidAmount = parseFloat(document.getElementById('paid-amount').value || 0);
    const pendingAmount = parseFloat(document.getElementById('pending-amount').value || 0);

    if (!roomId) {
        alert('Seleccioná una habitación para reservar.');
        return;
    }

    if (new Date(checkin) >= new Date(checkout)) {
        alert('Fecha de salida debe ser posterior a entrada.');
        return;
    }

    const id = Date.now();
    reservations.push({
        id,
        roomId,
        checkin,
        checkout,
        guest,
        guestCount,
        carCount,
        carPlates,
        paymentStatus,
        extraDays,
        checkinTime,
        checkoutTime,
        paidAmount,
        pendingAmount
    });

    saveReservations();
    loadRooms();
    setSelectedRoom(roomId);
    reserveForm.reset();
    renderCalendar();
    if (selectedDate) {
        selectDate(selectedDate, getOccupiedRoomsByDate(selectedDate));
    }
}

// Liberar habitación
function freeRoom(roomId) {
    reservations = reservations.filter(r => !(r.roomId === roomId && isOccupied(r)));
    saveReservations();
    loadRooms();
    setSelectedRoom(selectedRoomId);
    renderCalendar();
    if (selectedDate) {
        selectDate(selectedDate, getOccupiedRoomsByDate(selectedDate));
    }
}

// Eliminar reserva
function deleteReservation(id) {
    reservations = reservations.filter(r => r.id !== id);
    saveReservations();
    loadRooms();
    setSelectedRoom(selectedRoomId);
    renderCalendar();
    if (selectedDate) {
        selectDate(selectedDate, getOccupiedRoomsByDate(selectedDate));
    }
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
let selectedRoomId = null;

function initCalendar() {
    selectedDate = new Date().toISOString().split('T')[0];
    renderCalendar();
    selectDate(selectedDate, getOccupiedRoomsByDate(selectedDate));
}

function getOccupiedRoomsByDate(fullDate) {
    return reservations.filter(r => {
        const checkin = new Date(r.checkin);
        const checkout = new Date(r.checkout);
        const current = new Date(fullDate);
        return current >= checkin && current <= checkout;
    });
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    monthYear.textContent = `${getMonthName(month)} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    days.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day calendar-header-day';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        calendarGrid.appendChild(empty);
    }

    for (let date = 1; date <= lastDate; date++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';

        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-date-number';
        dayNumber.textContent = date;
        dayEl.appendChild(dayNumber);

        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        const today = new Date().toISOString().split('T')[0];

        if (fullDate === today) {
            dayEl.classList.add('today');
        }

        if (selectedDate === fullDate) {
            dayEl.classList.add('selected');
        }

        const occupiedRooms = getOccupiedRoomsByDate(fullDate);

        if (occupiedRooms.length > 0) {
            dayEl.classList.add('occupied');
            const roomList = document.createElement('div');
            roomList.className = 'calendar-room-list';

            const uniqueRoomIds = [...new Set(occupiedRooms.map(r => r.roomId))];
            uniqueRoomIds.forEach(roomId => {
                const room = rooms.find(rm => rm.id === roomId);
                const chip = document.createElement('span');
                chip.className = 'room-chip';
                chip.textContent = room ? room.name : `Hab ${roomId}`;
                roomList.appendChild(chip);
            });

            dayEl.appendChild(roomList);
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
    renderRoomMap([]);
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
            li.textContent = `${room.name} | Huésped: ${r.guest} | Personas: ${r.guestCount || 0} | Autos: ${r.carCount || 0} | Patentes: ${r.carPlates || 'N/A'} | ${r.paymentStatus || 'Sin estado'} | Días extra: ${r.extraDays || 0} | Entrada ${r.checkinTime || '--:--'} / Salida ${r.checkoutTime || '--:--'} | Pagado: $${r.paidAmount || 0} | Falta: $${r.pendingAmount || 0}`;
            occupationsList.appendChild(li);
        });
    }

    renderRoomMap(occupiedRooms);
}

function renderRoomMap(occupiedRooms) {
    roomMap.innerHTML = '';
    const occupiedByRoom = new Map(occupiedRooms.map(r => [r.roomId, r]));

    rooms.forEach(room => {
        const card = document.createElement('div');
        const reservation = occupiedByRoom.get(room.id);
        const layoutKey = roomMapLayout[room.name] || '';
        card.className = `map-room map-room--${layoutKey} ${reservation ? 'occupied' : ''}`;
        card.innerHTML = `
            <div>${room.name}</div>
            <small>${reservation ? `Ocupada por ${reservation.guest} (${reservation.paymentStatus || 'sin estado'})` : 'Disponible'}</small>
        `;
        roomMap.appendChild(card);
    });
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
    setInterval(() => changeSlide(1), 5000);
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
