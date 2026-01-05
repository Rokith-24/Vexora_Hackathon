

  // 🔴 SET HACKATHON START DATE
  const eventDate = new Date("January 31, 2026 09:00:00").getTime();

  setInterval(() => {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("cd-days").innerText = String(days).padStart(2, "0");
    document.getElementById("cd-hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("cd-minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("cd-seconds").innerText = String(seconds).padStart(2, "0");
  }, 1000);

