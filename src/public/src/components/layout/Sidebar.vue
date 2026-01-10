<template>
  <div :class="['sidebar', { collapsed: collapsed, show: show }]">
    <ul class="navbar-nav bg-gradient-primary sidebar-dark">
      <li class="nav-item">
        <a 
          class="sidebar-brand d-flex align-items-center justify-content-center" 
          href="#/" 
          @click.prevent="router.push('/')"
        >
          <div class="sidebar-brand-icon">
            W I G O
          </div>
        </a>
      </li>
      <hr class="sidebar-divider">
      
      <slot></slot>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  show: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle']);
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: var(--sidebar-width);
  z-index: var(--z-sidebar);
  transition: width var(--transition-base), transform var(--transition-base);
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar .navbar-nav {
  height: 100%;
  min-height: 100vh;
}

.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}

.sidebar.collapsed .sidebar-brand-icon {
  font-size: 1.2rem;
}

.sidebar.collapsed .nav-link span:not(.badge) {
  display: none;
}

.sidebar.collapsed .sidebar-heading {
  display: none;
}

.sidebar.collapsed .sidebar-divider {
  margin: var(--spacing-sm) 0;
}
</style>
