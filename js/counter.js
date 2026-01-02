function initQuantumTimer() {
    const targetDate = new Date("Jan 30, 2026 09:00:00").getTime();
    const digits = document.getElementById("quantum-digits");
    const ring = document.getElementById("timer-progress-ring");
    
    // Total circumference for the ring (2 * PI * R)
    const circumference = 2 * Math.PI * 150; // Adjusted for SVG size

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            digits.innerHTML = "DEPLOYED";
            ring.style.strokeDashoffset = 0;
            return;
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        // Update Digits
        digits.innerHTML = `${d.toString().padStart(2, '0')}:${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        // Update Ring (Assume a 30-day countdown for the visual scale)
        const totalDuration = 30 * 24 * 60 * 60 * 1000;
        const offset = (distance / totalDuration) * 1000;
        ring.style.strokeDashoffset = offset;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

initQuantumTimer();