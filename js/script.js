document
  .getElementById("subscribe-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const message = document.getElementById("message");

    // Reset message
    message.className = "message";

    // Simple email validation
    if (!validateEmail(email)) {
      showMessage(message, "Please enter a valid email address", "error");
      return;
    }

    try {
        message.className = 'message show';
      const response = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        message.textContent = "🎉 You’re subscribed!";
        message.style.color = "green";
      } else {
        message.textContent = result.error || "❌ Subscription failed.";
        message.style.color = "red";
      }
    } catch (err) {
      message.textContent = "⚠️ Network error!";
      message.style.color = "red";
    }
  });

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = `message show ${type}`;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
