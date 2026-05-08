const trackerGrid = document.getElementById("tracker-grid");

const confirmedSerials = {
  1: {
    status: "Confirmed",
    note: "Example entry"
  }
};

for (let number = 1; number <= 500; number++) {
  const serialText = String(number).padStart(3, "0");
  const confirmedInfo = confirmedSerials[number];

  const card = document.createElement("div");

  if (confirmedInfo) {
    card.className = "serial-card confirmed-card";

    card.innerHTML = `
      <div class="serial-number">#${serialText}</div>
      <div class="serial-status confirmed">${confirmedInfo.status}</div>
      <div class="serial-note">${confirmedInfo.note}</div>
    `;
  } else {
    card.className = "serial-card";

    card.innerHTML = `
      <div class="serial-number">#${serialText}</div>
      <div class="serial-status unknown">Unknown</div>
    `;
  }

  trackerGrid.appendChild(card);
}
const searchInput = document.getElementById("serial-search");

searchInput.addEventListener("input", function () {
  const searchNumber = Number(searchInput.value);
  const allCards = document.querySelectorAll(".serial-card");

  allCards.forEach(function (card) {
    card.classList.remove("highlight-card");
  });

  if (searchNumber >= 1 && searchNumber <= 500) {
    const cardToHighlight = allCards[searchNumber - 1];
    cardToHighlight.classList.add("highlight-card");
    cardToHighlight.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
});
