const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = max ? `${(scrollY / max) * 100}%` : "0%";
});

const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

const button = document.getElementById("coinButton");
const screenText = document.getElementById("screenText");
const screenAmount = document.getElementById("screenAmount");
const screenSub = document.getElementById("screenSub");
const atmStatus = document.getElementById("atmStatus");
const receipt = document.getElementById("receipt");

button.addEventListener("click", () => {
  button.disabled = true;
  receipt.style.display = "none";
  const steps = [
    ["COIN DETECTED", "₹1.00", "STATUS: DETECTED"],
    ["PROCESSING...", "₹1.00", "STATUS: PROCESSING"],
    ["RETURNING ₹1", "₹1.00", "STATUS: RETURNING"],
    ["TRANSACTION COMPLETE ✓", "₹1.00", "STATUS: COMPLETE"]
  ];
  let i = 0;
  const next = () => {
    const [a,b,c] = steps[i];
    screenText.textContent = a;
    screenAmount.textContent = b;
    atmStatus.textContent = c;
    screenSub.textContent = i === steps.length-1 ? "NOTHING GAINED. NOTHING LOST." : "PLEASE WAIT...";
    if (i < steps.length - 1) {
      i++;
      setTimeout(next, 1000);
    } else {
      receipt.style.display = "block";
      button.disabled = false;
    }
  };
  screenText.textContent = "INSERTING ₹1...";
  atmStatus.textContent = "STATUS: STARTING";
  setTimeout(next, 650);
});
