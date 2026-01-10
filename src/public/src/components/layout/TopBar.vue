<template>
  <nav :class="['navbar', 'navbar-expand', 'navbar-light', 'topbar', { 'sidebar-collapsed': sidebarCollapsed }]">
    <button
      v-if="showSidebarToggle"
      class="btn btn-link text-dark sidebar-toggle me-3"
      @click="$emit('toggle-sidebar')"
      type="button"
    >
      <i class="fas fa-bars"></i>
    </button>
    
    <div class="topbar-counters">
      <button
        v-for="level in ['OK', 'INFO', 'WARNING', 'CRITICAL', 'ERROR']"
        :key="level"
        type="button"
        :class="['btn', 'topbar-counter', getBtnClass(level)]"
      >
        <span class="d-none d-lg-inline">{{ level }}: </span>
        {{ counts[level] || 0 }}
      </button>
    </div>

    <ul class="navbar-nav ms-auto">
      <li class="nav-item dropdown">
        <a 
          class="nav-link dropdown-toggle" 
          href="#" 
          role="button" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
          title="Refresh settings"
        >
          <i class="fas fa-sync"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a 
              :class="['dropdown-item', { 'active': currentInterval === 5 }]"
              href="#" 
              @click.prevent="setInterval(5)"
              title="Refresh every 5 seconds"
            >
              <i class="fas fa-gear fa-fw"></i> 5 sec
            </a>
          </li>
          <li>
            <a 
              :class="['dropdown-item', { 'active': currentInterval === 15 }]"
              href="#" 
              @click.prevent="setInterval(15)"
              title="Refresh every 15 seconds"
            >
              <i class="fas fa-gear fa-fw"></i> 15 sec
            </a>
          </li>
          <li>
            <a 
              :class="['dropdown-item', { 'active': currentInterval === 30 }]"
              href="#" 
              @click.prevent="setInterval(30)"
              title="Refresh every 30 seconds"
            >
              <i class="fas fa-gear fa-fw"></i> 30 sec
            </a>
          </li>
          <li>
            <a 
              :class="['dropdown-item', { 'active': currentInterval === 60 }]"
              href="#" 
              @click.prevent="setInterval(60)"
              title="Refresh every 60 seconds"
            >
              <i class="fas fa-gear fa-fw"></i> 60 sec
            </a>
          </li>
          <li>
            <a 
              :class="['dropdown-item', { 'active': currentInterval === 300 }]"
              href="#" 
              @click.prevent="setInterval(300)"
              title="Refresh every 300 seconds"
            >
              <i class="fas fa-gear fa-fw"></i> 300 sec
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a 
              :class="['dropdown-item', { 'active': currentInterval === 0 }]"
              href="#" 
              @click.prevent="setInterval(0)"
              title="Disable auto-refresh"
            >
              <i class="fas fa-stop fa-fw"></i> Disable
            </a>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/logs" title="View logs">
          <i class="fas fa-list fa-fw"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/authority" title="Authority settings">
          <i class="fas fa-lock fa-fw"></i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getBtnLevelClass } from '../../utils/status.js';

const router = useRouter();

const props = defineProps({
  counts: {
    type: Object,
    default: () => ({
      OK: 0,
      INFO: 0,
      WARNING: 0,
      CRITICAL: 0,
      ERROR: 0
    })
  },
  sidebarCollapsed: {
    type: Boolean,
    default: false
  },
  currentInterval: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['refresh-settings', 'toggle-sidebar']);

const windowWidth = ref(window.innerWidth);

const showSidebarToggle = computed(() => {
  return windowWidth.value < 769;
});

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function setInterval(seconds) {
  emit('refresh-settings', seconds);
}

function getBtnClass(level) {
  return getBtnLevelClass(level);
}
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  right: 0;
  height: var(--topbar-height);
  background-color: var(--topbar-bg);
  box-shadow: var(--topbar-shadow);
  z-index: var(--z-topbar);
  transition: left var(--transition-base);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg);
}

.topbar.sidebar-collapsed {
  left: var(--sidebar-width-collapsed);
}

.topbar-counters {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.topbar-counter {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
  border: none;
  color: white;
}

.topbar-counter.btn-success {
  background-color: var(--color-ok) !important;
}

.topbar-counter.btn-primary {
  background-color: var(--color-info) !important;
}

.topbar-counter.btn-warning {
  background-color: var(--color-warning) !important;
  color: #000 !important;
}

.topbar-counter.btn-danger {
  background-color: var(--color-critical) !important;
}

.topbar-counter.btn-dark {
  background-color: var(--color-error) !important;
}

.dropdown-item.active {
  background-color: var(--color-info);
  color: white;
}

.dropdown-item.active:hover {
  background-color: var(--color-info);
  color: white;
  opacity: 0.9;
}

.sidebar-toggle {
  border: none;
  background: none;
  padding: var(--spacing-sm);
}

.sidebar-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: var(--border-radius);
}

@media (max-width: 768px) {
  .topbar {
    left: 0 !important;
  }
  
  .topbar.sidebar-collapsed {
    left: 0 !important;
  }
}
</style>
