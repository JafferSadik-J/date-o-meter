document.getElementById("user-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const dobInput = document.getElementById("dob").value;
  
    if (!name || !dobInput) {
      alert("Please fill in all fields!");
      return;
    }
  
    const dob = new Date(dobInput);
    const now = new Date();
  
    if (dob > now) {
      alert("Please enter a valid date of birth!");
      return;
    }
  
    const diff = now - dob;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = now.getMonth() - dob.getMonth() + (years * 12);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor(diff / 1000);
  
    const dayBorn = dob.toLocaleDateString('en-US', { weekday: 'long' });
  
    const indiaLifeExpectancyYears = 69.96;
    const totalExpectedSeconds = indiaLifeExpectancyYears * 365.25 * 24 * 60 * 60;
    const livedPercentage = ((seconds / totalExpectedSeconds) * 100).toFixed(2);
  
    const randomRemainingYears = Math.floor(Math.random() * (100 - 70 + 1)) + 70; // Between 70 and 100
    const estimatedTotalSeconds = randomRemainingYears * 365.25 * 24 * 60 * 60;
    const remainingSeconds = Math.max(estimatedTotalSeconds - seconds, 0);
    const remainingPercentage = ((remainingSeconds / estimatedTotalSeconds) * 100).toFixed(2);
  
    document.getElementById("user-form").style.display = "none";
  
    document.getElementById("result").innerHTML = `
      <h1>Your Life Stats</h1>
      <p>🗓️ You were born on a <strong>${dayBorn}</strong>.</p>
      <p>⏳ You have lived: <strong>${years}</strong> years, <strong>${months % 12}</strong> months, <strong>${days}</strong> days, <strong>${hours}</strong> hours, <strong>${minutes}</strong> minutes, and <strong>${seconds}</strong> seconds.</p>
      <p>💖 Based on the average Indian life expectancy (69.96 years), you've lived approximately: <strong>${livedPercentage}%</strong></p>
      <p>🎯 Random life estimation: ~<strong>${randomRemainingYears} years</strong></p>
      <p>⏰ <span id="countdown"></span></p>
      <p style="font-size: 1.2em; color: #ff79c6;">⚠️ Life is ticking... Go live it! Enjoy! Hurry up! ⚡</p>
    `;
  
    function startCountdown(secondsLeft) {
      function updateClock() {
        if (secondsLeft <= 0) {
          document.getElementById("countdown").textContent = "Time's up!";
          return;
        }
  
        const years = Math.floor(secondsLeft / (60 * 60 * 24 * 365.25));
        const daysLeftAfterYears = secondsLeft % (60 * 60 * 24 * 365.25);
        const months = Math.floor(daysLeftAfterYears / (60 * 60 * 24 * 30.44));
        const days = Math.floor((daysLeftAfterYears % (60 * 60 * 24 * 30.44)) / (60 * 60 * 24));
        const hours = Math.floor((secondsLeft % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((secondsLeft % (60 * 60)) / 60);
        const seconds = Math.floor(secondsLeft % 60);
  
        document.getElementById("countdown").textContent = `⌛ Estimated time left: ${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
        secondsLeft--;
        setTimeout(updateClock, 1000);
      }
  
      updateClock();
    }
  
    startCountdown(remainingSeconds);
  });
  