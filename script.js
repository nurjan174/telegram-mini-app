const tg = window.Telegram.WebApp;

// Проверка доступности API
if (!tg || !tg.initDataUnsafe) {
    console.error("Telegram Web Apps API не подключен.");
    return;
}

const user = tg.initDataUnsafe.user;

if (user) {
    // Фото профиля (с заглушкой, если фото отсутствует)
    const photoUrl = user.photo_url || 'https://via.placeholder.com/100';
    document.getElementById('photo').src = photoUrl;

    // Имя
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
    document.getElementById('name').textContent = fullName || "Не указано";

    // ID
    document.getElementById('id').textContent = user.id || "Недоступно";

    // Дата создания аккаунта (если доступна)
    if (user.created_at) {
        const createdDate = new Date(user.created_at * 1000).toLocaleDateString();
        document.getElementById('created').textContent = createdDate;
    } else {
        document.getElementById('created').textContent = "Недоступно";
    }
} else {
    document.getElementById('profile').innerHTML = '<p>Данные пользователя не получены.</p>';
}
