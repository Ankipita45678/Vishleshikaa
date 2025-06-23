document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;

    const res = await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    document.getElementById('status-msg').innerText = data.message;
  });