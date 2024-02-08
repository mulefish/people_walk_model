document.addEventListener('DOMContentLoaded', () => {
    const cardCollection = {
        '2diamonds': '&#x1F0C2;&#xFE0E;', '3diamonds': '&#x1F0C3;&#xFE0E;', '4diamonds': '&#x1F0C4;&#xFE0E;', '5diamonds': '&#x1F0C5;&#xFE0E;', '6diamonds': '&#x1F0C6;&#xFE0E;', '7diamonds': '&#x1F0C7;&#xFE0E;', '8diamonds': '&#x1F0C8;&#xFE0E;', '9diamonds': '&#x1F0C9;&#xFE0E;', '10diamonds': '&#x1F0CA;&#xFE0E;', 'Jdiamonds': '&#x1F0CB;&#xFE0E;', 'Qdiamonds': '&#x1F0CD;&#xFE0E;', 'Kdiamonds': '&#x1F0CE;&#xFE0E;', // Diamonds
        '2hearts': '&#x1F0B2;&#xFE0E;', '3hearts': '&#x1F0B3;&#xFE0E;', '4hearts': '&#x1F0B4;&#xFE0E;', '5hearts': '&#x1F0B5;&#xFE0E;', '6hearts': '&#x1F0B6;&#xFE0E;', '7hearts': '&#x1F0B7;&#xFE0E;', '8hearts': '&#x1F0B8;&#xFE0E;', '9hearts': '&#x1F0B9;&#xFE0E;', '10hearts': '&#x1F0BA;&#xFE0E;', 'Jhearts': '&#x1F0BB;&#xFE0E;', 'Qhearts': '&#x1F0BD;&#xFE0E;', 'Khearts': '&#x1F0BE;&#xFE0E;', // Hearts
        '2clubs': '&#x1F0D2;&#xFE0E;', '3clubs': '&#x1F0D3;&#xFE0E;', '4clubs': '&#x1F0D4;&#xFE0E;', '5clubs': '&#x1F0D5;&#xFE0E;', '6clubs': '&#x1F0D6;&#xFE0E;', '7clubs': '&#x1F0D7;&#xFE0E;', '8clubs': '&#x1F0D8;&#xFE0E;', '9clubs': '&#x1F0D9;&#xFE0E;', '10clubs': '&#x1F0DA;&#xFE0E;', 'Jclubs': '&#x1F0DB;&#xFE0E;', 'Qclubs': '&#x1F0DD;&#xFE0E;', 'Kclubs': '&#x1F0DE;&#xFE0E;', // Clubs
        '2spades': '&#x1F0A2;&#xFE0E;', '3spades': '&#x1F0A3;&#xFE0E;', '4spades': '&#x1F0A4;&#xFE0E;', '5spades': '&#x1F0A5;&#xFE0E;', '6spades': '&#x1F0A6;&#xFE0E;', '7spades': '&#x1F0A7;&#xFE0E;', '8spades': '&#x1F0A8;&#xFE0E;', '9spades': '&#x1F0A9;&#xFE0E;', '10spades': '&#x1F0AA;&#xFE0E;', 'Jspades': '&#x1F0AB;&#xFE0E;', 'Qspades': '&#x1F0AD;&#xFE0E;', 'Kspades': '&#x1F0AE;&#xFE0E;', // Spades
    };
alert("hello")
    const cardContainer = document.getElementById('cardContainer');

    for (let card in cardCollection) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = cardCollection[card]; // Using innerHTML to interpret HTML entities
        const [rank, suit] = card.split('');
        if (suit === 'diamonds' || suit === 'hearts') { // If it's a heart or diamond, set color to red
            cardElement.style.color = 'red';
        }
        cardContainer.appendChild(cardElement);

        // Add drag functionality
        cardElement.setAttribute('draggable', true);
        cardElement.addEventListener('dragstart', handleDragStart);
        cardElement.addEventListener('dragend', handleDragEnd);
    }
});

function handleDragStart(e) {
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

document.addEventListener('dragover', (e) => {
    e.preventDefault(); // Necessary to allow dropping
});

document.addEventListener('drop', (e) => {
    e.preventDefault(); // Prevent default behavior (like opening as link for some elements)
    const draggingCard = document.querySelector('.dragging');

    // Get the drop coordinates
    const dropX = e.clientX - draggingCard.offsetWidth / 2;
    const dropY = e.clientY - draggingCard.offsetHeight / 2;

    // Position the card at the drop coordinates
    draggingCard.style.position = 'absolute';
    draggingCard.style.left = `${dropX}px`;
    draggingCard.style.top = `${dropY}px`;

    // Remove the dragging class
    draggingCard.classList.remove('dragging');
});
