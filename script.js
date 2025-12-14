// 1. Функция воспроизведения звука
function playSound(e) {
    // Получаем код клавиши
    // Если событие от клавиатуры (e.keyCode), берем его
    // Если событие от клика мыши, берем атрибут data-key из нажатого элемента
    let keyCode;
    
    if (e.type === 'keydown') {
        keyCode = e.keyCode;
    } else {
        // 'this' здесь ссылается на div, по которому кликнули
        keyCode = this.getAttribute('data-key');
    }

    // Ищем аудио с таким кодом
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    // Ищем кнопку с таким кодом (чтобы подсветить)
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    // Если аудио нет (нажата не та клавиша), выходим
    if (!audio) return;

    // Сбрасываем звук в начало (чтобы можно было быстро нажимать подряд)
    audio.currentTime = 0; 
    audio.play();

    // Добавляем класс анимации
    key.classList.add('playing');
}

// 2. Функция удаления анимации (убираем подсветку)
function removeTransition(e) {
    // Нас интересует только окончание трансформации (transform)
    if (e.propertyName !== 'transform') return;
    
    // Удаляем класс 'playing'
    this.classList.remove('playing');
}

// 3. Находим все клавиши
const keys = document.querySelectorAll('.key');

// 4. Вешаем слушатели событий
// Для каждой клавиши: когда заканчивается анимация -> запускаем removeTransition
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// Для каждой клавиши: поддержка клика мышкой
keys.forEach(key => key.addEventListener('click', playSound));

// Слушаем нажатие кнопок на клавиатуре
window.addEventListener('keydown', playSound);