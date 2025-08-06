---
layout: default
title: Experience
---
{% include nav.html %}

# Experience

{% assign jobs = site.data.experience | sort: "start" | reverse %}
{% for job in jobs %}
<div class="card">
  <h3>{{ job.role }} — {{ job.company }}</h3>
  <p><em>
    {% if job.start %}{{ job.start }}{% endif %} – {% if job.end %}{{ job.end }}{% else %}present{% endif %}
  </em>{% if job.location %} · {{ job.location }}{% endif %}</p>

  {% if job.bullets %}
  <ul>
    {% for b in job.bullets %}
      <li>{{ b }}</li>
    {% endfor %}
  </ul>
  {% endif %}

  {% if job.tech %}
  <p class="tags">
    {% for t in job.tech %}<span class="tag">{{ t }}</span>{% endfor %}
  </p>
  {% endif %}
</div>
{% endfor %}
