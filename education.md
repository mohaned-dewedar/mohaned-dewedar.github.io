---
layout: default
title: Education
---

{% include nav.html %}

# Education

{% assign schools = site.data.education | sort: "start" | reverse %}
{% for ed in schools %}
<div class="card">
  <h3>{{ ed.degree }} — {{ ed.school }}</h3>
  <p><em>{{ ed.start }} – {{ ed.end }}</em>{% if ed.location %} · {{ ed.location }}{% endif %}</p>

  {% if ed.notes %}
  <ul>
    {% for n in ed.notes %}
      <li>{{ n }}</li>
    {% endfor %}
  </ul>
  {% endif %}

  {% assign relevant_projects = site.data.projects | where: "education", ed.school %}
  {% if relevant_projects.size > 0 %}
  <h4>Relevant Projects</h4>
  <div class="grid">
    {% for p in relevant_projects %}
      {% include project-card.html project=p %}
    {% endfor %}
  </div>
  {% endif %}

</div>
{% endfor %}

