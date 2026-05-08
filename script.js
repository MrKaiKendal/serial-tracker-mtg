const trackerGrid = document.getElementById("tracker-grid");
const confirmedCount = document.getElementById("confirmed-count");
const unknownCount = document.getElementById("unknown-count");

const confirmedSerials = {
  352: {
  status: "Confirmed",
  owner: "MrKaiKendal",
  note: "Owned by site creator. Serial number #352 confirmed.",
  image: "https://github.com/MrKaiKendal/serial-tracker-mtg/blob/main/mox-jasper-352.jpg?raw=true",
  proof: "https://github.com/MrKaiKendal/serial-tracker-mtg/blob/main/mox-jasper-352.jpg"
}
};

const totalConfirmed = Object.keys(confirmedSerials).length;

confirmedCount.textContent = totalConfirmed;
unknownCount.textContent = 500 - totalConfirmed;

for (let number = 1; number <= 500; number++) {
  const serialText = String(number).padStart(3, "0");
  const confirmedInfo = confirmedSerials[number];

  const card = document.createElement("div");

  if (confirmedInfo) {
    card.className = "serial-card confirmed-card";

    card.innerHTML = `
      <div class="serial-number">#${serialText}</div>
      <div class="serial-status confirmed">${confirmedInfo.status}</div>
      <div class="serial-note">${confirmedInfo.owner}</div>
    `;
  } else {
    card.className = "serial-card";

    card.innerHTML = `
      <div class="serial-number">#${serialText}</div>
      <div class="serial-status unknown">Unknown</div>
    `;
  }

  card.addEventListener("click", function () {
    openCardDetails(number);
  });

  trackerGrid.appendChild(card);
}

const modal = document.getElementById("card-modal");
const closeModal = document.getElementById("close-modal");

const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalStatus = document.getElementById("modal-status");
const modalOwner = document.getElementById("modal-owner");
const modalNotes = document.getElementById("modal-notes");
const modalProof = document.getElementById("modal-proof");
const proofLine = document.getElementById("proof-line");
const modalSubmit = document.getElementById("modal-submit");

function openCardDetails(number) {
  const serialText = String(number).padStart(3, "0");
  const cardInfo = confirmedSerials[number];

  modalTitle.textContent = `Mox Jasper #${serialText}`;

  if (cardInfo) {
    modalImage.src = cardInfo.image;
    modalImage.style.display = "block";

    modalStatus.textContent = cardInfo.status;
    modalOwner.textContent = cardInfo.owner;
    modalNotes.textContent = cardInfo.note;

    modalProof.href = cardInfo.proof;
    proofLine.style.display = "block";

    modalSubmit.style.display = "none";
  } else {
    modalImage.style.display = "none";

    modalStatus.textContent = "Unknown";
    modalOwner.textContent = "No confirmed owner/submission yet.";
    modalNotes.textContent = "This serial number has not been confirmed.";

    modalProof.href = "#";
    proofLine.style.display = "none";

    modalSubmit.href = "submit.html";
    modalSubmit.textContent = "Submit This Serial";
    modalSubmit.style.display = "inline-block";
  }

  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

const searchInput = document.getElementById("serial-search");
const searchButton = document.getElementById("search-button");

function searchSerial() {
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
}

searchButton.addEventListener("click", searchSerial);

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchSerial();
  }
});
