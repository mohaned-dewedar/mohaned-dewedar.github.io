---
layout: default
title: Home
---


{% include nav.html %}

<div style="text-align: center; margin: 2rem 0;">
  <img src='assets/img/cringe_pic.png' alt="Moe Dewedar" width="200" style="border-radius: 50%; box-shadow: 0 0 8px rgba(0,0,0,0.1);" />
</div>


# Moe Dewedar
**AI Engineer · Masters Student**

I build machine learning systems with real-world impact — and when I’m not shipping models, I’m gaming competitively and streaming.  
[GitHub](https://github.com/mohaned-dewedar) · [LinkedIn](https://linkedin.com/in/mohaned-dewedar) · [Twitter](https://twitter.com/thecherryo) · [Email](mailto:m.dewedar97@gmail.com)

<!-- Career Timeline -->
<h2 class="section-title">Career Timeline</h2>
<div class="timeline">
  {% for item in site.data.timeline %}
    <div class="timeline-item">
      <div class="timeline-dot"></div>

      <div class="timeline-card card card--compact">
        {% if item.img %}
          <img class="timeline-img" src="{{ item.img | relative_url }}" alt="{{ item.label }}">
        {% endif %}
        <div class="timeline-text">
          <div class="timeline-date">{{ item.date }}</div>
          <div class="timeline-label">{{ item.label }}</div>
        </div>
      </div>
    </div>
  {% endfor %}
</div>

## Skills & Technologies
<div class="skills-section">
  <div class="skills-grid">
    {% for skill_group in site.data.skills %}
      <div class="skill-category">
        <h3>{{ skill_group.category }}</h3>
        <div class="skill-tags">
          {% for skill in skill_group.skills %}
            <span class="skill-tag">{{ skill }}</span>
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  </div>
</div>

## Featured Projects
<div class="grid">
  {% assign featured = site.data.projects | where: "featured", true %}
  {% for p in featured %}
    {% include project-card.html project=p %}
  {% endfor %}
</div>

