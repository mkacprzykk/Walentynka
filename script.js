document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const introSection = document.querySelector('.intro-section');
    const gallerySection = document.getElementById('gallery-section');
    const donutSection = document.getElementById('donut-section');
    
    // Elementy powiązane z grą
    const gameInvite = document.getElementById('game-invite');
    const startGameBtn = document.getElementById('startGameBtn');
    const gameSection = document.getElementById('game-section');


    // --- TŁO (bez zmian) ---
    const backgroundAnimation = document.querySelector('.background-animation');
    function createFallingElement() {
        const element = document.createElement('div');
        const type = Math.random() > 0.5 ? 'heart' : 'flower';
        element.classList.add(type);
        backgroundAnimation.appendChild(element);
        const startX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 8 + 5;
        const delay = Math.random() * 5;
        const endX = startX + (Math.random() - 0.5) * 200;
        const endRotation = Math.random() * 720 + 360;
        element.style.left = `${startX}px`;
        element.style.animationDuration = `${animationDuration}s`;
        element.style.animationDelay = `${delay}s`;
        element.style.setProperty('--start-x', `0px`);
        element.style.setProperty('--end-x', `${endX - startX}px`);
        element.style.setProperty('--end-rotation', `${endRotation}deg`);
        element.style.setProperty('--rotation', `${Math.random() * 360}deg`);
        element.addEventListener('animationend', () => { element.remove(); });
    }
    setInterval(createFallingElement, 500);

    // --- PRZYCISK NIE (bez zmian) ---
    btnNo.addEventListener('mouseover', () => {
        const container = btnNo.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();
        const btnYesRect = btnYes.getBoundingClientRect();
        const safetyMargin = 20;
        let newX, newY, attempts = 0;
        do {
            newX = Math.random() * (containerRect.width - btnRect.width);
            newY = Math.random() * (containerRect.height - btnRect.height);
            attempts++;
        } while (
            (newX < (btnYesRect.x - containerRect.x) + btnYesRect.width + safetyMargin &&
             newX + btnRect.width > (btnYesRect.x - containerRect.x) - safetyMargin &&
             newY < (btnYesRect.y - containerRect.y) + btnYesRect.height + safetyMargin &&
             newY + btnRect.height > (btnYesRect.y - containerRect.y) - safetyMargin)
            && attempts < 50
        );
        btnNo.style.left = `${newX}px`;
        btnNo.style.top = `${newY}px`;
    });

    // --- KLIKNIĘCIE TAK (Zmiana: usunięto prompt o imię) ---
    btnYes.addEventListener('click', () => {
        introSection.classList.add('hidden');
        gallerySection.classList.remove('hidden');
        donutSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        triggerConfetti();
    });

    // --- KONFETTI (bez zmian) ---
    function triggerConfetti() {
        const colors = ['#FF69B4', '#FFD700', '#ADFF2F', '#00BFFF', '#EE82EE'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            document.body.appendChild(confetti);
            confetti.addEventListener('animationend', () => { confetti.remove(); });
        }
    }
    const confettiStyle = document.createElement('style');
    confettiStyle.innerHTML = `.confetti { position: fixed; width: 10px; height: 10px; top: -10px; z-index: 9999; opacity: 0; animation: confettiFall linear forwards; } @keyframes confettiFall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`;
    document.head.appendChild(confettiStyle);


    // --- SLIDER (bez zmian) ---
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-button');
    const nextBtn = document.querySelector('.next-button');
    let currentIndex = 0;
    function updateSlider() { slider.style.transform = `translateX(${-currentIndex * 100}%)`; }
    prevBtn.addEventListener('click', () => { currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1; updateSlider(); });
    nextBtn.addEventListener('click', () => { currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0; updateSlider(); });


const startDonutRainBtn = document.getElementById('startDonutRain');
    
    if (startDonutRainBtn) { // Sprawdzamy czy przycisk istnieje
        startDonutRainBtn.addEventListener('click', () => {
            // 1. Pobieramy kwiaty dokładnie w momencie kliknięcia
            const flowerLeft = document.getElementById('side-flower-left');
            const flowerRight = document.getElementById('side-flower-right');

            // 2. Dodajemy klasę 'active' (sprawdź czy w CSS masz .active!)
            if (flowerLeft) flowerLeft.classList.add('active');
            if (flowerRight) flowerRight.classList.add('active');

            // 3. Ukrywamy przycisk
            startDonutRainBtn.style.display = 'none';
            
            // 4. Puszczamy pączki
            for (let i = 0; i < 40; i++) {
                createDonut();
            }

            // 5. Pokazujemy zaproszenie do gry po 5 sekundach
            setTimeout(() => {
                const gameInvite = document.getElementById('game-invite');
                if (gameInvite) {
                    gameInvite.classList.remove('hidden');
                    gameInvite.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 5000);
        });
    }

    function createDonut() {
        const donut = document.createElement('div');
        donut.classList.add('donut');
        donutSection.appendChild(donut);
        const startX = Math.random() * donutSection.offsetWidth;
        const animationDuration = Math.random() * 3 + 2; 
        donut.style.left = `${startX}px`;
        donut.style.animationDuration = `${animationDuration}s`;
        donut.style.animationDelay = `${Math.random() * 2}s`;
        donut.addEventListener('animationend', () => { donut.remove(); });
    }

    // ==========================================
    // --- GRA SNAKE (Cała nowa logika) ---
    // ==========================================
    
    startGameBtn.addEventListener('click', () => {
        donutSection.classList.add('hidden');
        gameSection.classList.remove('hidden');
        initGame();
    });

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const restartBtn = document.getElementById('restartGameBtn');

    const gridSize = 20; // Rozmiar jednego kwadratu siatki
    let snake = [{x: 10, y: 10}]; // Początkowa pozycja węża
    let food = {};
    let direction = 'right';
    let score = 0;
    let gameInterval;
    let gameSpeed = 150; // Im mniej, tym szybciej

    function initGame() {
        snake = [{x: 10, y: 10}];
        direction = 'right';
        score = 0;
        scoreElement.textContent = score;
        restartBtn.classList.add('hidden');
        placeFood();
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, gameSpeed);
    }

    function gameLoop() {
        moveSnake();
        if (checkCollision()) {
            gameOver();
            return;
        }
        if (checkFoodCollision()) {
            score++;
            scoreElement.textContent = score;
            placeFood();
            // Opcjonalnie: przyspieszaj grę co 5 punktów
            // if (score % 5 === 0 && gameSpeed > 50) { clearInterval(gameInterval); gameSpeed -= 10; gameInterval = setInterval(gameLoop, gameSpeed);}
        } else {
            snake.pop(); // Usuń ogon, jeśli nie zjadł
        }
        draw();
    }

    function moveSnake() {
        const head = { ...snake[0] }; // Kopia głowy
        switch (direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        snake.unshift(head); // Dodaj nową głowę na początku
    }

    function checkCollision() {
        const head = snake[0];
        // Ściany (canvas ma 400x400, więc siatka to 20x20 pól)
        if (head.x < 0 || head.x >= canvas.width / gridSize || 
            head.y < 0 || head.y >= canvas.height / gridSize) {
            return true;
        }
        // Sam ze sobą (zaczynamy od i=1, bo i=0 to głowa)
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) return true;
        }
        return false;
    }

    function checkFoodCollision() {
        const head = snake[0];
        return head.x === food.x && head.y === food.y;
    }

    function placeFood() {
        // Losowa pozycja na siatce
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)),
            y: Math.floor(Math.random() * (canvas.height / gridSize))
        };
        // Sprawdź, czy jedzenie nie pojawiło się na wężu
        snake.forEach(segment => {
            if (segment.x === food.x && segment.y === food.y) placeFood();
        });
    }

    function draw() {
        // Wyczyść canvas
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Narysuj węża
        ctx.fillStyle = '#ff69b4'; // Różowy wąż
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Narysuj jedzenie (pączek)
        ctx.fillStyle = '#d35400'; // Brązowy pączek
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 2, 0, 2 * Math.PI);
        ctx.fill();
        // Dziurka w pączku
        ctx.fillStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/5, 0, 2 * Math.PI);
        ctx.fill();
    }

    function gameOver() {
        clearInterval(gameInterval);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '30px Quicksand';
        ctx.textAlign = 'center';
        ctx.fillText('Koniec Gry!', canvas.width / 2, canvas.height / 2);
        restartBtn.classList.remove('hidden');
    }

    restartBtn.addEventListener('click', initGame);

    // Sterowanie klawiaturą
    document.addEventListener('keydown', (e) => {
        if (gameSection.classList.contains('hidden')) return; // Nie steruj, jak gry nie widać

        switch (e.key) {
            case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
            case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
            case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
            case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
        }
    });
    
    // Zapobieganie przewijaniu strony strzałkami podczas gry
    window.addEventListener("keydown", function(e) {
        if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1 && !gameSection.classList.contains('hidden')) {
            e.preventDefault();
        }
    }, false);
});