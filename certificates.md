---
layout: default
title: Certificates
---

# Certificates
{% include nav.html %}
<div class="grid">
  {% for cert in site.data.certificates %}
    {% include certificate-card.html cert=cert %}
  {% endfor %}
</div>
