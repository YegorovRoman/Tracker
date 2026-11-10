/// <reference lib="dom" />

const form = document.querySelector('#form_tracker')
const input = document.querySelector('#input_tracker')
const error = document.querySelector('#error')

const parcels = [
    { id: '123456', status: 'Склад' },
    { id: '234567', status: 'В пути' },
    { id: '345678', status: 'Пункт выдачи' },
    { id: '456789', status: 'В пути' },
    { id: '567890', status: 'Склад' }
]

// Функция для сброса всех статусов в исходный вид
function resetStatuses() {
    document.querySelectorAll('.tracker_status_number').forEach(el => {
        el.classList.remove('active')
    })
}

// Функция для покраски нужных шагов
function updateStatusUI(status) {
    resetStatuses() // Сначала сбрасываем

    // Определяем, сколько шагов нужно покрасить
    let stepsToActivate = 0
    if (status === 'Склад') stepsToActivate = 1
    else if (status === 'В пути') stepsToActivate = 2
    else if (status === 'Пункт выдачи') stepsToActivate = 3

    // Красим нужные шаги
    for (let i = 1; i <= stepsToActivate; i++) {
        const stepElement = document.querySelector(`#status-step-${i}`)
        if (stepElement) {
            stepElement.classList.add('active')
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const value = input.value.trim()

    if (!/^\d{6}$/.test(value)) {
        error.textContent = 'Введите ровно 6 цифр'
        return
    }

    error.textContent = ''

    const parcel = parcels.find(p => p.id === value)

    if (!parcel) {
        error.textContent = 'Посылка не найдена'
        resetStatuses() // Если не нашли, сбрасываем визуал
        return
    }

    // Обновляем визуальную часть на основе статуса
    updateStatusUI(parcel.status)

    console.log(`Посылка ${parcel.id}: ${parcel.status}`)
})