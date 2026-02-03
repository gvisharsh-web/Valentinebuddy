const noBtn = document.querySelector(".js-no-btn");
const yesBtn = document.querySelector(".js-yes-btn");
const questionText = document.getElementById('dynamic-question');
const media = document.getElementById('media-placeholder');
let noCount = 0;
let currentMode = 'cat';

const phrases = {
  cat: ["Never!", "I work alone...", "Are you sure, Selina?", "The Bat is lonely 🥺", "Last chance!"],
  valentine: ["No", "Wait, what?", "Are you sure?", "Think again! 💖", "Try the other button!"]
};

window.checkPass = function() {
    if (document.getElementById('pass-input').value.toUpperCase() === "3SV") {
        document.getElementById('lock-screen').style.display = "none";
        document.querySelector(".choice-container").style.display = "block";
    } else { document.getElementById('pass-error').style.display = "block"; }
}

window.setMode = function(mode) {
    currentMode = mode;
    document.querySelector(".choice-container").style.display = 'none';
    document.querySelector(".question-container").style.display = 'block';
    const signal = document.querySelector(".bat-signal-heart");
    signal.style.opacity = "0.9"; 
    
    if (mode === 'cat') {
        questionText.innerText = "Will you be my Cat? 🐾";
        document.body.style.backgroundColor = "#0b0d17";
        questionText.style.color = "#fff";
        signal.style.backgroundColor = "#f1c40f";
        media.innerHTML = `<img class="local-gif" src="batman-heart.gif">`;
    } else {
        questionText.innerText = "Will you be my Valentine? 💖";
        document.body.style.backgroundColor = "#fff0f3";
        questionText.style.color = "#333";
        signal.style.backgroundColor = "#ff4d6d";
        media.innerHTML = `<img class="local-gif" src="valentine-heart.gif">`;
    }
}

function moveNoButton() {
    // Resolution Fix: 100px padding ensures button stays on screen
    const padding = 100;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    noBtn.style.position = "fixed";
    noBtn.style.left = Math.max(padding/2, Math.random() * maxX) + "px";
    noBtn.style.top = Math.max(padding/2, Math.random() * maxY) + "px";

    noCount++;
    const currentPhrases = phrases[currentMode];
    if (noCount < currentPhrases.length) noBtn.innerText = currentPhrases[noCount];

    if (noCount === 5) {
        questionText.innerText = currentMode === 'cat' ? "Last chance, or it's Arkham! ⚖️" : "Are you REALLY sure? 🥺";
    }

    // Growth capped at 1.4x for mobile
    yesBtn.style.transform = `scale(${Math.min(1.4, 1 + noCount * 0.1)})`;
}

// Smartphone Support: Touchstart triggers the move
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); });

yesBtn.addEventListener("click", () => {
    document.querySelector(".question-container").style.display = "none";
    document.querySelector(".result-container").style.display = "block";
    document.getElementById('result-text').innerText = currentMode === 'cat' ? "I knew it, Sneha (Selina)! 😍" : "Yay! Best Valentine ever! 💖";
    document.getElementById('result-text').style.color = currentMode === 'cat' ? "#fff" : "#333";
    document.getElementById('final-gif').src = currentMode === 'cat' ? "bat-romance.gif" : "val-romance.gif";
});