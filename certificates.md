---
layout: default
title: Certificates
---
{% include nav.html %}
## Certificates
<div class="certificates-grid">
  {% for cert in site.data.certificates %}
    <div class="card card--compact certificate-card">
      {% if cert.img %}
        <img class="logo-img" src="{{ cert.img | relative_url }}" alt="{{ cert.issuer }} badge" loading="lazy">
      {% endif %}
      <h3 class="certificate-name">{{ cert.name }}</h3>
      <p class="certificate-issuer"><strong>{{ cert.issuer }}</strong></p>
      {% if cert.link %}
        <a class="cert-cta" href="{{ cert.link }}" target="_blank" rel="noopener">View certificate</a>
      {% endif %}
    </div>
  {% endfor %}
</div>
