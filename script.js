const trackerGrid = document.getElementById("tracker-grid");
const confirmedList = document.getElementById("confirmed-list");
const confirmedCount = document.getElementById("confirmed-count");
const pendingCount = document.getElementById("pending-count");
const unknownCount = document.getElementById("unknown-count");

const totalConfirmed = Object.values(knownSerials).filter(function (card) {
  return card.status === "Confirmed";
}).length;

const totalPending = Object.values(knownSerials).filter(function (card) {
  return card.status === "Pending Review";
}).length;

const totalKnown = Object.keys(knownSerials).length;

confirmedCount.textContent = totalConfirmed;
pendingCount.textContent = totalPending;
unknownCount.textContent = 500 - totalKnown;

if (confirmedList) {
  const confirmedEntries = Object.entries(knownSerials).filter(function (entry) {
    return entry[1].status === "Confirmed";
  });

  if (confirmedEntries.length === 0) {
    confirmedList.innerHTML = `
      <p class="confirmed-list-empty">No confirmed serials yet.</p>
    `;
  } else {
    confirmedEntries.forEach(function (entry) {
      const number = Number(entry[0]);
      const cardInfo = entry[1];
      const serialText = String(number).padStart(3, "0");

      const listItem = document.createElement("div");
      listItem.className = "confirmed-list-item";

      listItem.innerHTML = `
        <div>
          <div class="confirmed-list-number">#${serialText}</div>
          <div class="confirmed-list-details">${cardInfo.status} — ${cardInfo.owner}</div>
        </div>

        <button class="button secondary-button" type="button">View Details</button>
      `;

      listItem.querySelector("button").addEventListener("click", function () {
        openCardDetails(number);
      });

      confirmedList.appendChild(listItem);
    });
  }
}

for (let number = 1; number <= 500; number++) {
  const serialText = String(number).padStart(3, "0");
  const cardInfo = knownSerials[number];

  const card = document.createElement("div");

  if (cardInfo && cardInfo.status === "Confirmed") {
    card.className = "serial-card confirmed-card";

    card.innerHTML = `
      <div class="serial-number">#${serialText}</div>
      <div class="serial-status confirmed">Confirmed</div>
      <div class="serial-note">${cardInfo.owner}</div>
    `;
  } else if (cardInfo && cardInfo.status === "Pending Review") {
    card.className = "serial-card pending-card";

    card.innerHTML = `
      <div class="serial-number">#${serialText}</div>
      <div class="serial-status pending">Pending Review</div>
      <div class="serial-note">${cardInfo.owner}</div>
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
  const cardInfo = knownSerials[number];

  modalTitle.textContent = `Mox Jasper #${serialText}`;

  if (cardInfo) {
    modalStatus.textContent = cardInfo.status;
    modalOwner.textContent = cardInfo.owner;
    modalNotes.textContent = cardInfo.note;

    if (cardInfo.image) {
      modalImage.src = cardInfo.image;
      modalImage.style.display = "block";
    } else {
      modalImage.style.display = "none";
    }

    if (cardInfo.proof) {
      modalProof.href = cardInfo.proof;
      proofLine.style.display = "block";
    } else {
      modalProof.href = "#";
      proofLine.style.display = "none";
    }

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
