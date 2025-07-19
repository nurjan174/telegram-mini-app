    <script>
        // Инициализация Telegram WebApp
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.MainButton.setText("Готово").hide();
        
        // Основные функции калькулятора
        function appendToDisplay(value) {
            const display = document.getElementById('display');
            display.value += value;
        }
        
        function clearDisplay() {
            document.getElementById('display').value = '';
        }
        
        function backspace() {
            const display = document.getElementById('display');
            display.value = display.value.slice(0, -1);
        }
        
        function calculate() {
            const display = document.getElementById('display');
            try {
                // Заменяем символ × на * для вычисления
                const expression = display.value.replace(/×/g, '*');
                const result = eval(expression);
                display.value = result;
                
                // Можно отправить результат в Telegram
                tg.sendData(JSON.stringify({
                    action: 'calculation',
                    expression: expression,
                    result: result
                }));
            } catch (e) {
                display.value = 'Ошибка';
            }
        }
        
        // Обработка нажатий клавиш
        document.addEventListener('keydown', function(event) {
            if (event.key >= '0' && event.key <= '9') {
                appendToDisplay(event.key);
            } else if (['+', '-', '*', '/', '(', ')', '.'].includes(event.key)) {
                appendToDisplay(event.key);
            } else if (event.key === 'Enter') {
                calculate();
            } else if (event.key === 'Backspace') {
                backspace();
            } else if (event.key === 'Escape') {
                clearDisplay();
            }
        });
    </script>
</body>
</html>
