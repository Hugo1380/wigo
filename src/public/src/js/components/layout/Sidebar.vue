<template>
  <div
    :class="[
      'd-flex',
      'flex-column',
      'flex-shrink-0',
      'p-3',
      'align-self-stretch',
      'justify-content-start',
      'text-white',
      'navbar',
      'navbar-pills',
      { 'd-none': show },
    ]"
    data-bs-theme="dark"
    style="width: 280px; background-color: #3b65e3"
  >
    <a
      href="/"
      class="d-flex align-items-center text-white text-decoration-none"
    >
      <span class="fs-4">W I G O</span>
    </a>
    <hr class="border-white align-self-stretch" />
    <ul class="nav navbar-nav flex-column align-self-stretch">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle"]);
</script>
