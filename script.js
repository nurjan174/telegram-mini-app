// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Функция для отображения данных пользователя
function displayUserProfile() {
    const user = tg.initDataUnsafe.user;

    if (user) {
        // Фото профиля
        const photoUrl = user.photo_url || 'https://via.placeholder.com/100';
        document.getElementById('photo').src = photoUrl;

        // Имя
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
        document.getElementById('name').textContent = fullName;

        // ID
        document.getElementById('id').textContent = user.id;

        // Дата создания аккаунта
        const createdDate = new Date(user.created_at * 1000).toLocaleDateString();
        document.getElementById('created').textContent = createdDate;
    } else {
        document.getElementById('profile').innerHTML = '<p>Данные пользователя недоступны.</p>';
    }
}

// Вызываем функцию при загрузке страницы
displayUserProfile();
