<template>
  <span 
    :class="['status-badge', sizeClass, badgeClass]"
    :title="title"
  >
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { getBadgeLevelClass } from '../utils/status.js';

const props = defineProps({
  level: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  title: {
    type: String,
    default: ''
  }
});

const badgeClass = computed(() => getBadgeLevelClass(props.level));
const sizeClass = computed(() => {
  if (props.size === 'sm') return 'status-badge-sm';
  if (props.size === 'lg') return 'status-badge-lg';
  return '';
});
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius);
  white-space: nowrap;
  transition: all var(--transition-fast);
  cursor: default;
}

.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.status-badge-sm {
  padding: 0.125rem 0.375rem;
  font-size: 0.75rem;
}

.status-badge-lg {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
}
</style>
