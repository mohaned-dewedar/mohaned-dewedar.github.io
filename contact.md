---
layout: default
title: Contact
---

{% include nav.html %}

# Contact

- 📧 Email: [m.dewedar97@gmail.com](mailto:m.dewedar97@gmail.com)
- 🎓 Edu Email: [mdewedar3@gatech.edu](mailto:mdewedar3@gatech.edu)
- 🐙 GitHub: [github.com/mohaned-dewedar](https://github.com/mohaned-dewedar)
- 💼 LinkedIn: [linkedin.com/in/mohaned-dewdar](https://linkedin.com/in/mohaned-dewdar)
- 🐦 Twitter: [@thecherryo](https://twitter.com/thecherryo)
- 🎮 Twitch: [twitch.tv/thecherryo](https://twitch.tv/thecherryo)


# How to Reach Me

<div style="margin-bottom: 1.5rem;">
  <button onclick="showForm()" style="margin-right: 1rem; padding: 0.5rem 1rem; border: none; background-color: #2c7be5; color: white; border-radius: 6px; cursor: pointer;">
    📨 Contact Form
  </button>
  <button onclick="showCalendly()" style="padding: 0.5rem 1rem; border: none; background-color: #00b289; color: white; border-radius: 6px; cursor: pointer;">
    📅 Book a Meeting
  </button>
</div>

<!-- Contact Form -->
<div id="contact-form" style="display: block; max-width: 600px;">
  <form action="https://formspree.io/f/mblkpbry" method="POST" style="display: flex; flex-direction: column; gap: 0.75rem;">
    <label for="name"><strong>Name</strong></label>
    <input type="text" name="name" required style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">

    <label for="email"><strong>Email</strong></label>
    <input type="email" name="email" required style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">

    <label for="message"><strong>Message</strong></label>
    <textarea name="message" rows="5" required style="padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"></textarea>

    <button type="submit" style="padding: 0.5rem 1rem; background-color: #2c7be5; color: white; border: none; border-radius: 4px; margin-top: 0.5rem; cursor: pointer;">
      Send
    </button>
  </form>
</div>

<!-- Calendly -->
<div id="calendly-frame" style="display: none; min-width: 320px; height: 630px;">
  <iframe src="https://calendly.com/m-dewedar97/30min" width="100%" height="100%" frameborder="0"></iframe>
</div>

<script>
  function showForm() {
    document.getElementById("contact-form").style.display = "block";
    document.getElementById("calendly-frame").style.display = "none";
  }

  function showCalendly() {
    document.getElementById("contact-form").style.display = "none";
    document.getElementById("calendly-frame").style.display = "block";
  }
</script>

