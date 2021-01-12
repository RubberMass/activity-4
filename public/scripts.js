const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card_roxo");

for (let card of cards) {
  card.addEventListener('click', function() {
    const pageId = card.getAttribute('id')
    window.location.href = `/course/${pageId}`
  })
}
