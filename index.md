---
layout: default
title: Home
---
{% include nav.html %}

# Moe Dewedar
**AI Engineer · OMSCS Student · Pro Gamer**

I build machine learning systems with real-world impact — and when I’m not shipping models, I’m gaming competetively and streaming.  
[GitHub](https://github.com/mohaned-dewedar) · [LinkedIn](https://linkedin.com/in/mohaned-dewedar) · [Twitter](https://twitter.com/thecherryo) · [Email](mailto:m.dewedar97@gmail.com)

<!-- Career Timeline -->
<h2 class="section-title">Career Timeline</h2>
<div class="timeline">

  {% for item in site.data.timeline %}
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="card">
        <div class="timeline-date">{{ item.date }}</div>
        <div class="timeline-label">{{ item.label }}</div>
      </div>
    </div>
  {% endfor %}

</div>


## Featured Projects
<div class="grid">
  {% assign featured = site.data.projects | where: "featured", true %}
  {% for p in featured %}
    {% include project-card.html project=p %}
  {% endfor %}
</div>

## Portfolio not Final
*This portfolio is a work in progress. More projects , demos and details will be added soon!*
