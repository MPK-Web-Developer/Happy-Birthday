// START countdown
const S = 1000 * 60;
const H = S * 60;
const D = H * 24;

const daysContainer = document.getElementById("countdown-days");
const hoursContainer = document.getElementById("countdown-hours");
const minutesContainer = document.getElementById("countdown-minutes");
const secondsContainer = document.getElementById("countdown-seconds");

const startCounter = setInterval(() => {
  const today = new Date();
  const targetYear = 1900 + today.getYear() + 1;
  const targetDate = new Date(`May 30, 2025 00:00:00`).getTime();
  const now = today.getTime();
  const timeLeft = targetDate - now;
  const days = Math.floor(timeLeft / D);
  const hours = Math.floor((timeLeft % D) / H);
  const minutes = Math.floor((timeLeft % H) / S);
  const seconds = Math.floor((timeLeft % S) / 1000);
  daysContainer.textContent = `${days}d`;
  hoursContainer.textContent = `${hours}h`;
  minutesContainer.textContent = `${minutes}m`;
  secondsContainer.textContent = `${seconds}s`;

  if (days <= 0) {
    daysContainer.style.display = "none";
    if (hours <= 0) {
      hoursContainer.style.display = "none";
      if (minutes <= 0) {
        minutesContainer.style.display = "none";
      }
    }
  } else if (days >= 360) {
    daysContainer.style.display = "block";
    hoursContainer.style.display = "block";
    minutesContainer.style.display = "block";
  }
}, 1000);

window.onload = function (e) {
  startCounter();
};
// END countdown

// START snowfall
const createSnowflake = (winterWrapper, count, prefix = "") => {
  for (let i = 1; i <= count; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = `snowflake ${prefix} ${prefix}-${i}`;
    winterWrapper.appendChild(snowflake);
  }
};
// END snowfall

// START fireworks
const startFireworks = ({ clientX, clientY }) => {
  const candyCount = 150; // Number of candies per firework
  const candies = [];
  const colors = [
    "#ADD8E6",
    "#B2F2BB",
    "#FFFACD",
    "#FFE4E1",
    "#FFB6C1",
    "#D8BFD8"
  ];

  for (let i = 0; i < candyCount; i++) {
    const candy = document.createElement("div");
    candy.classList.add("candy");

    // Set random color from the palette
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    candy.style.background = randomColor;

    // Set random size for the candy
    const size = Math.random() * 10 + 10; // Random size between 10px and 20px
    candy.style.width = `${size}px`;
    candy.style.height = `${size}px`;

    // Set random direction for the candy
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 50 + 10; // Random distance
    const x = Math.cos(angle) * distance + "vw";
    const y = Math.sin(angle) * distance + "vw";
    candy.style.setProperty("--x", x);
    candy.style.setProperty("--y", y);

    // Set the initial position to the click position
    candy.style.left = `${clientX - 10}px`;
    candy.style.top = `${clientY - 10}px`;

    // Add the candy to the body
    document.body.appendChild(candy);
    candies.push(candy);
  }

  // Remove candies after the animation ends
  setTimeout(() => {
    candies.forEach((candy) => candy.remove());
  }, 1250);
};
// START fireworks

window.onload = function (e) {
  const winterWrapper = document.getElementById("winter-wrapper");
  const wrapConfig = [
    { className: "_sm", spanCount: 250 },
    { className: "_md", spanCount: 50 },
    { className: "_lg", spanCount: 50 }
  ];
  wrapConfig.map(({ className, spanCount }) =>
    createSnowflake(winterWrapper, spanCount, className)
  );

  const autoFireworksInterval = setInterval(() => {
    startFireworks({
      clientX:
        Math.random() * (window.innerWidth * 0.75 - window.innerWidth * 0.25) +
        window.innerWidth * 0.25,
      clientY:
        Math.random() * (window.innerHeight * 0.6 - window.innerHeight * 0.25) +
        window.innerHeight * 0.25
    });
  }, 1250);

  winterWrapper.addEventListener("click", (event) => {
    startFireworks(event);
    // clearInterval(autoFireworksInterval);
  });

  const dialog = document.getElementById("mail");
  const showButton = document.getElementById("mailbox");
  const closeButton = document.getElementById("mailClose");
  const mailContent = document.getElementById("mailContent");
  const mailSign = document.getElementById("mailSign");

  const greetings = [
    "Today is all about you — <b>your smile 😍,</b> your heart, your beautiful soul. I hope this year brings you peace, happiness, and everything your heart quietly wishes for. I just want to say this from deep within: <b>Don’t worry about the past. Whatever happened, I’ve accepted it</b> — fully and without judgment. What matters to me is you, <b>right now. I trust you, I believe in you,</b> and I see something real between us. Just remember this — <b>my love</b> for you isn’t temporary. It’s here, steady and true, and it will stay with you until the end of my life."
  ];

  const signs = [
    "With love,"
  ];

  // "Show the dialog" button opens the dialog modally
  showButton.addEventListener("click", () => {
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    mailContent.innerHTML = randomGreeting;
    mailSign.textContent = randomSign;
    dialog.showModal();
  });

  // "Close" button closes the dialog
  closeButton.addEventListener("click", () => {
    dialog.close();
  });
};
