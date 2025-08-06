---
layout: default
title: Projects
---

{% include nav.html %}

# Projects

{% assign filtered = site.data.projects %}
{% assign filtered = filtered | sort: "priority" %}
{% assign custom_order = "Software,Robotics,Engineering" | split: "," %}

{% for cat in custom_order %}
  <h2 class="text-xl font-bold mt-8 mb-2">{{ cat }}</h2>
  <div class="grid">
    {% assign in_cat = filtered | where: "category", cat %}
    {% for p in in_cat %}
      {% if p.featured %}
        {% include project-card.html project=p %}
      {% endif %}
    {% endfor %}
    
  </div>
{% endfor %}
