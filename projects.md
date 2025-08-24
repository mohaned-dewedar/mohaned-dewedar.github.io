---
layout: default
title: Projects
---

{% include nav.html %}

# Projects

<div class="project-controls">
  <div class="search-container">
    <input type="text" id="projectSearch" class="search-input" placeholder="Search projects by name, technology, or description...">
    <div id="searchSuggestions" class="search-suggestions"></div>
  </div>
  
  <div class="search-stats" id="searchStats">
    Showing <span id="visibleCount">0</span> of <span id="totalCount">0</span> projects
  </div>
  
  <div class="filter-buttons">
    <span class="filter-label">Filter by:</span>
    <button class="filter-btn" data-filter="all">All</button>
    <button class="filter-btn" data-filter="software">Software</button>
    <button class="filter-btn" data-filter="robotics">Robotics</button>
    <button class="filter-btn" data-filter="engineering">Engineering</button>
    <button class="filter-btn" data-filter="ai">AI</button>
    <button class="filter-btn" data-filter="ml">ML</button>
    <button class="filter-btn" data-filter="web-dev">Web Dev</button>
    <button class="filter-btn" data-filter="realtime">Real-time</button>
    <button class="filter-btn" data-filter="gaming">Gaming</button>
    <button class="filter-btn" data-filter="computer-vision">Vision</button>
    <button class="filter-btn" data-filter="chatbot">Chatbots</button>
  </div>
</div>

<div class="project-grid grid">
  {% assign all_projects = site.data.projects | sort: "priority" %}
  {% for project in all_projects %}
    {% if project.featured %}
      <div class="project-card" 
           data-category="{{ project.category | downcase }}" 
           data-tech="{{ project.tech | join: ' ' | downcase }}"
           data-tags="{{ project.tags | join: ' ' | downcase }}"
           data-name="{{ project.name | downcase }}"
           data-description="{{ project.description | downcase }}">
        {% include project-card.html project=project %}
      </div>
    {% endif %}
  {% endfor %}
</div>

<div class="no-results">
  <p>No projects found matching your criteria. Try adjusting your search or filters.</p>
</div>