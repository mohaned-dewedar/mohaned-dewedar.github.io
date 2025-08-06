---
layout: default
title: Projects
---

{% include nav.html %}

# Projects

{% assign filtered_projects = site.data.projects | sort: "priority" %}
{% assign custom_order = "Software,Robotics,Engineering" | split: "," %}

{% for cat in custom_order %}
  <h2 class="text-xl font-bold mt-8 mb-2">{{ cat }}</h2>
  <div class="grid">
    {% assign projects_in_category = filtered_projects | where: "category", cat %}
    {% for project in projects_in_category %}
      {% if project.featured %}
        {% include project-card.html project=project %}
      {% endif %}
    {% endfor %}
  </div>
{% endfor %}

---

## Work In Progress

Embedding projects here and including demos, links, and papers.