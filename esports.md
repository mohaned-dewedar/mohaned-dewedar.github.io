---
layout: default
title: Esports
---
{% include nav.html %}

# Esports

I spent a decade competing and analyzing at a high level, including two World Championship wins.

## Highlights
<ul>
{% for h in site.data.esports[0].highlights %}
  <li>{{ h }}</li>
{% endfor %}
</ul>

## Analytics Work
I built scouting and performance dashboards in **Power BI** and **Excel** to study matchups, opponent tendencies, and win/loss conditions.

## Media
{% for l in site.data.esports[0].links %}
- [{{ l.text }}]({{ l.url }})
{% endfor %}
