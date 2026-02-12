// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// ==========================
// Multi-question flow (EDIT)
// ==========================

// Add / remove questions here:
const QUESTIONS = [
  {
    title: "Do you miss me? 🥺",
    cat: "cat_peek.gif",
    lockNo: false
  },
  {
    title: "Awww! Do you know I am madly in love with you?",
    cat: "cat_ask.gif",
    lockNo: false
  },
  {
    title: "Seesh! In that case can I ask something from you? 😌",
    cat: "cat_cry.gif",
    lockNo: false
  },
  {
    title: "On this Valentine's Day, Will you please be my Valentine? ♥",
    cat: "cat_beg.gif",
    lockNo: true
  }
];

let qIndex = 0;

// ✅ Reset YES/NO to their original positions each time
function resetButtonsPosition() {
  // Snap back instantly (no animation)
  noBtn.style.transition = "none";
  noBtn.style.transform = "translate(0px, 0px)";

  yesBtn.style.transition = "none";
  yesBtn.style.transform = "translate(0px, 0px)";

  // Re-enable transitions next frame so NO still animates when it runs away
  requestAnimationFrame(() => {
    noBtn.style.transition = "transform 0.3s ease";
    yesBtn.style.transition = "transform 0.3s ease";
  });
}

function renderQuestion() {
  // ✅ ensure both buttons start in the same place every question
  resetButtonsPosition();

  const q = QUESTIONS[qIndex];

  // Update title + image
  title.textContent = q.title;
  if (q.cat) catImg.src = q.cat;

  // Ensure buttons are visible during questions
  buttons.style.display = "block";
  finalText.style.display = "none";

  // Optional: stop NO button moving on certain steps
  if (q.lockNo) {
    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = "translate(0px, 0px)";
    // If you want to completely disable "No" hovering on the last step, uncomment:
    // noBtn.style.pointerEvents = "none";
  } else {
    // Re-enable in case it was disabled
    // noBtn.style.pointerEvents = "auto";
  }

  // Remove final styling while in question flow
  document.querySelector(".letter-window").classList.remove("final");
}

// Click Envelope
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  // Start the question flow IMMEDIATELY (prevents default H1 from showing)
  qIndex = 0;
  renderQuestion();

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// Logic to move the NO btn
noBtn.addEventListener("mouseover", () => {
  const min = 200;
  const max = 200;

  const distance = Math.random() * (max - min) + min;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES advances through questions; last step triggers final state
yesBtn.addEventListener("click", () => {
  if (qIndex < QUESTIONS.length - 1) {
    qIndex++;
    renderQuestion();
    return;
  }

  // Final state (your original behavior)
  title.textContent = "Yippeeeeeeeeee!";
  catImg.src = "Flower.jpg";

  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";
});
