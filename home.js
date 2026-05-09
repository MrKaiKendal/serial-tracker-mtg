const homeConfirmedCount = document.getElementById("home-confirmed-count");
const homeUnknownCount = document.getElementById("home-unknown-count");
const homeRecentConfirmed = document.getElementById("home-recent-confirmed");

const confirmedCards = Object.entries(knownSerials).filter(function (entry) {
  return entry[1].status === "Confirmed";
});

const totalConfirmed = confirmedCards.length;
const totalKnown = Object.keys(knownSerials).length;

homeConfirmedCount.textContent = totalConfirmed;
homeUnknownCount.textContent = 500 - totalKnown;

if (confirmedCards.length > 0) {
  confirmedCards.sort(function (a, b) {
    const dateA = new Date(a[1].dateAdded || "2000-01-01");
    const dateB = new Date(b[1].dateAdded || "2000-01-01");

    return dateB - dateA;
  });

  const mostRecent = confirmedCards[0];
  const serialNumber = String(mostRecent[0]).padStart(3, "0");
  const cardInfo = mostRecent[1];

  homeRecentConfirmed.innerHTML = `
    <div class="recent-card">
      <div>
        <div class="recent-number">#${serialNumber}</div>
        <div class="recent-details">Confirmed — ${cardInfo.owner}</div>
      </div>

      <a class="button secondary-button" href="tracker.html">View in Tracker</a>
    </div>
  `;
} else {
  homeRecentConfirmed.innerHTML = `
    <p class="confirmed-list-empty">No confirmed serials yet.</p>
  `;
}
