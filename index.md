---
layout: default
title: Home
---
{% include nav.html %}

# Moe Dewedar
**OMSCS @ Georgia Tech** · Interests: AI, ML, Data Science, Software Engineering
[GitHub](https://github.com/mohaned-dewedar) · [LinkedIn](https://linkedin.com/in/mohaned-dewedar) · [Twitter](https://twitter.com/thecherryo) · [Email](mailto:m.dewedar97@gmail.com)

## Featured Projects
<div class="grid">
  {% assign featured = site.data.projects | where: "featured", true %}
  {% for p in featured %}
    {% include project-card.html project=p %}
  {% endfor %}
</div>
