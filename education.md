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

  {% assign visible_projects = site.data.projects | where: "education", ed.school | where: "show_in_edu", true %}
  {% assign hidden_projects = site.data.projects | where: "education", ed.school | where: "show_in_edu", false %}

 {% if visible_projects.size > 0 %}
  <h4>Relevant Projects</h4>
  <div class="grid">
    {% for p in visible_projects %}
      {% include project-card.html project=p %}
    {% endfor %}
  </div>
{% endif %}
{% if hidden_projects.size > 0 %}
  <details>
    <summary style="cursor: pointer; margin-top: 1em;"><strong>Show all projects from this degree</strong></summary>
    <div class="grid" style="margin-top: 1em;">
      {% for p in hidden_projects %}
        {% include project-card.html project=p %}
      {% endfor %}
    </div>
  </details>
{% endif %}


</div>
{% endfor %}

