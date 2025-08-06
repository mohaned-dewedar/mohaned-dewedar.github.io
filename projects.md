---
layout: default
title: Projects
---
{% include nav.html %}

# Projects
<div class="grid">
  {% for p in site.data.projects %}
    {% include project-card.html project=p %}
  {% endfor %}
</div>
