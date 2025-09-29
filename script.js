// Сайт розроблено студентом Ім'я Прізвище, група ХХ-Х-Х
// Дані турів збережені в масиві JS; жодної серверної логіки.

const tours = [
  {
    id: 'kyiv-weekend',
    title: 'Kyiv Weekend',
    city: 'Київ, Україна',
    img: 'images/kyiv.svg',
    days: 2,
    priceUAH: 1800,
    desc: 'Екскурсії старим містом, Подолом та Андріївським узвозом.'
  },
  {
    id: 'lviv-flavors',
    title: 'Lviv Flavors',
    city: 'Львів, Україна',
    img: 'images/lviv.svg',
    days: 3,
    priceUAH: 3200,
    desc: 'Кавові тури, шоколадні майстерні та Архікафедральний собор.'
  },
  {
    id: 'odesa-sea',
    title: 'Odesa by the Sea',
    city: 'Одеса, Україна',
    img: 'images/odesa.svg',
    days: 3,
    priceUAH: 2900,
    desc: 'Морське узбережжя, Дерибасівська та Оперний театр.'
  },
  {
    id: 'carpathian-hike',
    title: 'Carpathian Hike',
    city: 'Карпати, Україна',
    img: 'images/carpathians.svg',
    days: 4,
    priceUAH: 4500,
    desc: 'Похід Чорногорою, полонини та місцева кухня.'
  },
  {
    id: 'vilnius-escape',
    title: 'Vilnius Escape',
    city: 'Вільнюс, Литва',
    img: 'images/vilnius.svg',
    days: 3,
    priceUAH: 5200,
    desc: 'Старе місто, площа Ратуші та панорами з Трьох Хрестів.'
  },
  {
    id: 'krakow-classic',
    title: 'Kraków Classic',
    city: 'Краків, Польща',
    img: 'images/krakow.svg',
    days: 3,
    priceUAH: 5100,
    desc: 'Вавель, Ринок та атмосферні вулички Казімежа.'
  }
];

const grid = document.getElementById('tour-grid');
const bookingDialog = document.getElementById('bookingDialog');
const bookingForm = document.getElementById('bookingForm');
const dialogTitle = document.getElementById('dialogTitle');
const tourNameInput = document.getElementById('tourName');
const dateInput = document.getElementById('date');
const peopleInput = document.getElementById('people');
const pricePerPersonInput = document.getElementById('pricePerPerson');
const totalPriceOutput = document.getElementById('totalPrice');
const closeDialogBtn = document.getElementById('closeDialog');

function formatUAH(n){
  return new Intl.NumberFormat('uk-UA', { style:'currency', currency:'UAH', maximumFractionDigits:0 }).format(n);
}

function renderTours(){
  const fragment = document.createDocumentFragment();
  tours.forEach(t => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${t.img}" alt="${t.title}" loading="lazy">
      <div class="body">
        <h3>${t.title} <span class="tag">${t.days} дні</span></h3>
        <div class="muted">${t.city}</div>
        <p>${t.desc}</p>
      </div>
      <div class="footer">
        <div class="price">${formatUAH(t.priceUAH)} / особа</div>
        <button class="btn btn-primary" data-id="${t.id}">Забронювати</button>
      </div>
    `;
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);
}

function openBooking(tour){
  dialogTitle.textContent = `Бронювання: ${tour.title}`;
  tourNameInput.value = `${tour.title} — ${tour.city}`;
  pricePerPersonInput.value = formatUAH(tour.priceUAH);
  dateInput.value = '';
  peopleInput.value = 1;
  updateTotal(tour.priceUAH, 1);
  bookingDialog.showModal();
}

function updateTotal(pricePerPerson, people){
  const total = pricePerPerson * people;
  totalPriceOutput.textContent = formatUAH(total);
}

document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button.btn.btn-primary[data-id]');
  if(btn){
    const tour = tours.find(t => t.id === btn.dataset.id);
    if(tour){ openBooking(tour); }
  }
});

peopleInput.addEventListener('input', ()=>{
  const p = parseInt(peopleInput.value || '1', 10);
  const price = parseInt(pricePerPersonInput.value.replace(/[^0-9]/g,''),10);
  updateTotal(price, Math.max(1, p));
});

closeDialogBtn.addEventListener('click', ()=> bookingDialog.close());

bookingForm.addEventListener('submit', (e)=>{
  // Ніяких реальних транзакцій — просто підтвердження
  e.preventDefault();
  const date = dateInput.value;
  const people = Math.max(1, parseInt(peopleInput.value||'1',10));
  if(!date){
    alert('Будь ласка, оберіть дату.');
    return;
  }
  alert(`Дякуємо! Ви забронювали тур на ${date} для ${people} осіб. ${totalPriceOutput.textContent}`);
  bookingDialog.close();
});

// Рендер
renderTours();
document.getElementById('year').textContent = new Date().getFullYear();
