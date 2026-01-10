<template>
  <div class="app-layout">
    <Sidebar
      :collapsed="sidebarCollapsed && !isMobile"
      :show="sidebarCollapsed && isMobile"
      @toggle="toggleSidebar"
    >
      <slot name="sidebar"></slot>
    </Sidebar>
    
    <TopBar
      :counts="counts"
      :sidebar-collapsed="sidebarCollapsed"
      :current-interval="currentInterval"
      @refresh-settings="handleRefreshSettings"
      @toggle-sidebar="toggleSidebar"
    />
    
    <main class="content-wrapper" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="container-fluid">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Sidebar from './Sidebar.vue';
import TopBar from './TopBar.vue';

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
  currentInterval: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['refresh-settings']);

const sidebarCollapsed = ref(false);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value < 769);

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value;
}

function handleRefreshSettings(seconds) {
  emit('refresh-settings', seconds);
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  position: relative;
}

.content-wrapper {
  margin-left: var(--sidebar-width);
  margin-top: var(--topbar-height);
  min-height: calc(100vh - var(--topbar-height));
  padding: var(--spacing-lg);
  transition: margin-left var(--transition-base);
}

.content-wrapper.sidebar-collapsed {
  margin-left: var(--sidebar-width-collapsed);
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0 !important;
  }
  
  .content-wrapper.sidebar-collapsed {
    margin-left: 0 !important;
  }
}
</style>
