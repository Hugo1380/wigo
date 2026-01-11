<template>
  <span :class="['status-badge', sizeClass, badgeClass]" :title="title">
    <slot></slot>
  </span>
</template>

<script setup>
import { computed } from "vue";
import { getBadgeLevelClass } from "../utils/status.js";

const props = defineProps({
  level: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  title: {
    type: String,
    default: "",
  },
});

const badgeClass = computed(() => getBadgeLevelClass(props.level));
const sizeClass = computed(() => {
  if (props.size === "sm") return "status-badge-sm";
  if (props.size === "lg") return "status-badge-lg";
  return "";
});
</script>
