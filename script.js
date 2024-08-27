/* script.js */
const cards = [
    { id: 1, img: 'image1.jpg', text: '우리가 처음 간 홍대 클럽, 이날 탐스피자도 처음 갔음' },
    { id: 2, img: 'image2.jpg', text: '우리의 첫 크리스마스' },
    { id: 3, img: 'image3.jpg', text: '처음으로 같이 바다 보러 떠난 여행' },
    { id: 4, img: 'image4.jpg', text: '처음 떠난 해외여행, 소금빵할까 공룡할까 고민했어' },
    { id: 5, img: 'image5.jpg', text: '두번째 크리스마스 기념 속초여행' },
    { id: 6, img: 'image6.jpg', text: '인도네시아 이후 기념비적인 날' },
    { id: 7, img: 'image7.jpg', text: '유진 생일 기념 경주 여행 눈물도 보였던 날' },
    { id: 8, img: 'image8.jpg', text: '싸울뻔했지만 어떤 외국인이 사진찍어줘서 풀린날' }
];

// 카드 쌍 만들기
let gameCards = [];
cards.forEach(card => {
    gameCards.push({ ...card, type: 'img' });  // 이미지 카드
    gameCards.push({ ...card, type: 'text' }); // 텍스트 카드
});

// 카드 위치를 무작위로 섞기
gameCards = gameCards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('game-board');
const congratulations = document.getElementById('congratulations');
let flippedCards = [];
let matchedCards = 0;

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    cardElement.appendChild(cardInner);

    // 카드의 앞면
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardInner.appendChild(cardFront);

    // 카드의 뒷면
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    
    if (card.type === 'img') {
        const cardImage = document.createElement('img');
        cardImage.src = card.img;
        cardBack.appendChild(cardImage);
    } else {
        const cardText = document.createElement('div');
        cardText.classList.add('text');
        cardText.textContent = card.text;
        cardBack.appendChild(cardText);
    }

    cardInner.appendChild(cardBack);
    cardElement.addEventListener('click', flipCard);

    return cardElement;
}

function flipCard() {
    if (this.classList.contains('flipped') || flippedCards.length === 2) return;
    
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        matchedCards += 2;
        flippedCards = [];

        if (matchedCards === gameCards.length) {
            setTimeout(() => showCongratulations(), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// 축하 메시지와 애니메이션 표시
function showCongratulations() {
    congratulations.classList.remove('hidden'); // 축하 메시지를 표시합니다.
    for (let i = 0; i < 100; i++) {
        createConfetti(); // 축하 애니메이션을 만듭니다.
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2 ~ 5초 사이의 애니메이션 지속시간
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000); // 애니메이션이 끝난 후 요소 제거
}

// 게임 보드에 카드 추가
gameCards.forEach(card => {
    gameBoard.appendChild(createCard(card));
});
