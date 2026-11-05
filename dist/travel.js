(() => {
  'use strict';

  const translations = {
    zh: {
      china: '国内',
      world: '国外',
      chinaMap: '中国旅行地图',
      worldMap: '世界旅行地图',
      visited: '已到访',
      unvisited: '未到访',
      provinceUnit: '个省级地区',
      countryUnit: '个国家与地区',
      selectChina: '选择省级地区',
      selectWorld: '选择国家或地区',
      selectHint: '选择地区查看到访状态',
      mapHint: '悬停或点选查看名称，放大后可拖动地图。',
      zoomIn: '放大地图',
      zoomOut: '缩小地图',
      reset: '重置地图',
      source: '底图'
    },
    en: {
      china: 'China',
      world: 'Abroad',
      chinaMap: 'Travel map of China',
      worldMap: 'World travel map',
      visited: 'Visited',
      unvisited: 'Not visited',
      provinceUnit: 'province-level regions',
      countryUnit: 'countries and territories',
      selectChina: 'Choose a province-level region',
      selectWorld: 'Choose a country or territory',
      selectHint: 'Select a place to see its visit status',
      mapHint: 'Hover or select a place. Zoom in to drag the map.',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      reset: 'Reset map',
      source: 'Map data'
    }
  };

  function escape(value) {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value ?? '').replace(/[&<>"']/g, (character) => entities[character]);
  }

  function normalized(value) {
    return String(value).trim().toLowerCase();
  }

  function visitedRegions(regions, values) {
    const names = new Set((values || []).map(normalized));
    return new Set(
      regions
        .filter((region) => {
          const shortName = region.name.zh.replace(
            /(?:壮族|回族|维吾尔)?自治区$|特别行政区$|[省市]$/g,
            ''
          );
          return [
            region.id,
            region.name.zh,
            region.name.en,
            shortName,
            ...(region.aliases || [])
          ].some((value) => value && names.has(normalized(value)));
        })
        .map((region) => region.id)
    );
  }

  function mount(root, options) {
    const maps = window.HOMEPAGE_MAPS;
    const language = options.language === 'en' ? 'en' : 'zh';
    const ui = translations[language];
    const state = options.state || { view: 'china', selected: { china: '', world: '' } };
    const visits = options.visits || {};
    const visited = {
      china: visitedRegions(maps.china.regions, visits.visitedProvinces),
      world: visitedRegions(maps.world.regions, visits.visitedCountries)
    };
    let zoom = 1;
    let pan = { x: 0, y: 0 };
    let drag = null;
    let suppressClick = false;

    function regionName(region) {
      return region.name[language] || region.name.en;
    }

    function selectionText(region) {
      return region
        ? regionName(region) +
            ' · ' +
            (visited[state.view].has(region.id) ? ui.visited : ui.unvisited)
        : ui.selectHint;
    }

    function renderRegion(region, index) {
      const selected = state.selected[state.view] === region.id;
      const isVisited = visited[state.view].has(region.id);
      const className =
        'map-region' + (isVisited ? ' is-visited' : '') + (selected ? ' is-selected' : '');
      return `
        <path class="${className}" d="${region.path}" data-region-id="${escape(region.id)}"
          role="button" tabindex="${selected || (!state.selected[state.view] && index === 0) ? '0' : '-1'}"
          aria-label="${escape(selectionText(region))}" aria-pressed="${selected}">
          <title>${escape(selectionText(region))}</title>
        </path>
        ${region.small ? `<circle class="${className} map-marker" cx="${region.center[0]}" cy="${region.center[1]}" r="2" data-region-id="${escape(region.id)}" aria-hidden="true"/>` : ''}`;
    }

    function render() {
      const map = maps[state.view];
      const regions = [...map.regions].sort((first, second) =>
        regionName(first).localeCompare(regionName(second), language === 'zh' ? 'zh-CN' : 'en')
      );
      const selectedRegion = regions.find((region) => region.id === state.selected[state.view]);
      const [x, y, width, height] = map.viewBox;
      root.innerHTML = `
        <div class="travel-toolbar">
          <div class="travel-tabs" role="tablist" aria-label="${language === 'zh' ? '旅行地图范围' : 'Travel map view'}">
            ${['china', 'world'].map((view) => `<button type="button" role="tab" id="travel-tab-${view}" data-travel-view="${view}" aria-selected="${state.view === view}" aria-controls="travel-panel" tabindex="${state.view === view ? '0' : '-1'}">${escape(ui[view])}</button>`).join('')}
          </div>
          <p class="travel-count">${escape(ui.visited)} <strong>${visited[state.view].size}</strong> ${escape(state.view === 'china' ? ui.provinceUnit : ui.countryUnit)}</p>
        </div>
        <div class="travel-panel" role="tabpanel" id="travel-panel" aria-labelledby="travel-tab-${state.view}">
          <div class="map-legend">
            <span><i class="legend-dot visited-dot" aria-hidden="true"></i>${escape(ui.visited)}</span>
            <span><i class="legend-dot unvisited-dot" aria-hidden="true"></i>${escape(ui.unvisited)}</span>
          </div>
          <svg class="travel-map-svg" viewBox="${x} ${y} ${width} ${height}" width="${width}" height="${height}"
            role="group" aria-label="${escape(state.view === 'china' ? ui.chinaMap : ui.worldMap)}"
            aria-describedby="travel-map-hint">
            ${regions.map(renderRegion).join('')}
            ${map.decoration ? `<path class="map-decoration" d="${map.decoration}" aria-hidden="true"/>` : ''}
          </svg>
          <div class="map-bottom-controls">
            <label class="region-picker">
              <span class="visually-hidden">${escape(state.view === 'china' ? ui.selectChina : ui.selectWorld)}</span>
              <select data-travel-select aria-label="${escape(state.view === 'china' ? ui.selectChina : ui.selectWorld)}">
                <option value="">${escape(state.view === 'china' ? ui.selectChina : ui.selectWorld)}</option>
                ${regions.map((region) => `<option value="${escape(region.id)}"${selectedRegion?.id === region.id ? ' selected' : ''}>${escape(regionName(region))}</option>`).join('')}
              </select>
            </label>
            <div class="map-zoom-controls" role="group" aria-label="${language === 'zh' ? '地图缩放' : 'Map zoom'}">
              <button type="button" data-travel-zoom="out" aria-label="${escape(ui.zoomOut)}" title="${escape(ui.zoomOut)}" disabled>−</button>
              <button type="button" data-travel-zoom="reset" aria-label="${escape(ui.reset)}" title="${escape(ui.reset)}" disabled>↺</button>
              <button type="button" data-travel-zoom="in" aria-label="${escape(ui.zoomIn)}" title="${escape(ui.zoomIn)}">+</button>
            </div>
          </div>
          <p class="map-selection" role="status" aria-live="polite">${escape(selectionText(selectedRegion))}</p>
          <div class="map-caption">
            <p id="travel-map-hint">${escape(ui.mapHint)}</p>
            <a href="${escape(map.source)}" target="_blank" rel="noopener noreferrer">${escape(ui.source)} · ${escape(map.credit)}</a>
          </div>
        </div>`;
    }

    function updateViewport() {
      const [baseX, baseY, width, height] = maps[state.view].viewBox;
      const viewWidth = width / zoom;
      const viewHeight = height / zoom;
      pan.x = Math.max(-(width - viewWidth) / 2, Math.min((width - viewWidth) / 2, pan.x));
      pan.y = Math.max(-(height - viewHeight) / 2, Math.min((height - viewHeight) / 2, pan.y));
      const svg = root.querySelector('.travel-map-svg');
      svg.setAttribute(
        'viewBox',
        [
          baseX + (width - viewWidth) / 2 + pan.x,
          baseY + (height - viewHeight) / 2 + pan.y,
          viewWidth,
          viewHeight
        ].join(' ')
      );
      svg.classList.toggle('can-pan', zoom > 1);
      root.querySelector('[data-travel-zoom="out"]').disabled = zoom <= 1;
      root.querySelector('[data-travel-zoom="reset"]').disabled = zoom <= 1;
      root.querySelector('[data-travel-zoom="in"]').disabled = zoom >= 5;
    }

    function selectRegion(identifier, focus = false) {
      const region = maps[state.view].regions.find((item) => item.id === identifier);
      state.selected[state.view] = region?.id || '';
      root.querySelectorAll('[data-region-id]').forEach((element) => {
        const active = element.dataset.regionId === region?.id;
        element.classList.toggle('is-selected', active);
        if (element.tagName.toLowerCase() === 'path') {
          element.setAttribute('aria-pressed', String(active));
          element.setAttribute('tabindex', active ? '0' : '-1');
        }
      });
      root.querySelector('[data-travel-select]').value = region?.id || '';
      root.querySelector('.map-selection').textContent = selectionText(region);
      if (region && zoom > 1) {
        const [, , width, height] = maps[state.view].viewBox;
        pan = { x: region.center[0] - width / 2, y: region.center[1] - height / 2 };
        updateViewport();
      }
      if (region && focus) root.querySelector('path[data-region-id="' + region.id + '"]').focus();
      if (!region) root.querySelector('path[data-region-id]')?.setAttribute('tabindex', '0');
    }

    function switchView(view) {
      if (view === state.view) return;
      state.view = view;
      zoom = 1;
      pan = { x: 0, y: 0 };
      drag = null;
      suppressClick = false;
      render();
    }

    root.addEventListener('click', (event) => {
      const tab = event.target.closest('[data-travel-view]');
      if (tab) {
        switchView(tab.dataset.travelView);
        root.querySelector('[data-travel-view="' + state.view + '"]').focus();
        return;
      }
      const control = event.target.closest('[data-travel-zoom]');
      if (control) {
        suppressClick = false;
        const action = control.dataset.travelZoom;
        const factor = action === 'in' ? 1.5 : 1 / 1.5;
        zoom = action === 'reset' ? 1 : Math.max(1, Math.min(5, zoom * factor));
        if (action === 'reset') pan = { x: 0, y: 0 };
        if (action === 'in' && state.selected[state.view]) {
          selectRegion(state.selected[state.view]);
        } else {
          updateViewport();
        }
        return;
      }
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      const region = event.target.closest('[data-region-id]');
      if (region) selectRegion(region.dataset.regionId);
    });
    root.addEventListener('change', (event) => {
      if (event.target.matches('[data-travel-select]')) selectRegion(event.target.value);
    });
    root.addEventListener('keydown', (event) => {
      const tab = event.target.closest('[data-travel-view]');
      const adjacentView = state.view === 'china' ? 'world' : 'china';
      const requestedView = {
        ArrowLeft: adjacentView,
        ArrowRight: adjacentView,
        Home: 'china',
        End: 'world'
      }[event.key];
      if (tab && requestedView) {
        event.preventDefault();
        switchView(requestedView);
        root.querySelector('[data-travel-view="' + state.view + '"]').focus();
      }
      const region = event.target.closest('path[data-region-id]');
      if (region && ['Enter', ' '].includes(event.key)) {
        event.preventDefault();
        selectRegion(region.dataset.regionId);
      }
      if (region && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        const regions = [...root.querySelectorAll('path[data-region-id]')];
        const index = regions.indexOf(region);
        const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
        const next = regions[(index + direction + regions.length) % regions.length];
        selectRegion(next.dataset.regionId, true);
      }
    });
    root.addEventListener('pointerdown', (event) => {
      const svg = event.target.closest('.travel-map-svg');
      if (!svg || zoom <= 1 || event.button !== 0) return;
      drag = {
        x: event.clientX,
        y: event.clientY,
        pan: { ...pan },
        moved: false,
        svg,
        targetId: event.target.closest('[data-region-id]')?.dataset.regionId
      };
      suppressClick = false;
      svg.setPointerCapture(event.pointerId);
    });
    root.addEventListener('pointermove', (event) => {
      if (!drag) return;
      const bounds = drag.svg.getBoundingClientRect();
      const [, , width, height] = maps[state.view].viewBox;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (Math.hypot(dx, dy) > 5) drag.moved = true;
      pan = {
        x: drag.pan.x - (dx * width) / zoom / bounds.width,
        y: drag.pan.y - (dy * height) / zoom / bounds.height
      };
      updateViewport();
    });
    root.addEventListener('pointerup', () => {
      if (drag) {
        suppressClick = drag.moved;
        if (!drag.moved && drag.targetId) selectRegion(drag.targetId);
      }
      drag = null;
    });
    root.addEventListener('pointercancel', () => {
      drag = null;
      suppressClick = false;
    });

    render();
  }

  window.HomepageTravel = { mount };
})();
