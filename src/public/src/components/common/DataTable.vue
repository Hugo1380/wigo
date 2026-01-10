<template>
  <div class="table-responsive">
    <table :class="['table', { 'table-bordered': bordered, 'table-hover': hover }]">
      <thead v-if="columns.length > 0">
        <tr>
          <th 
            v-for="column in columns" 
            :key="column.key"
            :class="column.class"
            @click="column.sortable ? sort(column.key) : null"
            :style="column.sortable ? 'cursor: pointer;' : ''"
          >
            {{ column.label }}
            <i 
              v-if="column.sortable"
              :class="[
                'fas',
                sortKey === column.key 
                  ? (sortOrder === 'asc' ? 'fa-sort-up' : 'fa-sort-down')
                  : 'fa-sort'
              ]"
              class="ms-1 text-muted"
            ></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(row, index) in sortedData" 
          :key="getRowKey(row, index)"
          :class="getRowClass(row)"
          @click="rowClickable ? $emit('row-click', row) : null"
          :style="rowClickable ? 'cursor: pointer;' : ''"
        >
          <td 
            v-for="column in columns" 
            :key="column.key"
            :class="column.class"
          >
            <slot 
              :name="`cell-${column.key}`" 
              :row="row" 
              :value="row[column.key]"
            >
              {{ formatValue(row[column.key], column) }}
            </slot>
          </td>
        </tr>
        <tr v-if="sortedData.length === 0">
          <td :colspan="columns.length" class="text-center text-muted py-4">
            <slot name="empty">No data available</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getStatusRowClass } from '../../utils/status.js';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  bordered: {
    type: Boolean,
    default: true
  },
  hover: {
    type: Boolean,
    default: true
  },
  rowClickable: {
    type: Boolean,
    default: false
  },
  statusColumn: {
    type: String,
    default: 'Status'
  },
  rowKey: {
    type: [String, Function],
    default: null
  }
});

const emit = defineEmits(['row-click']);

const sortKey = ref(null);
const sortOrder = ref('asc');

const sortedData = computed(() => {
  if (!sortKey.value) {
    return props.data;
  }
  
  const sorted = [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];
    
    if (aVal === bVal) return 0;
    
    const comparison = aVal < bVal ? -1 : 1;
    return sortOrder.value === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
});

function sort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

function getRowClass(row) {
  if (props.statusColumn && row[props.statusColumn] !== undefined) {
    return getStatusRowClass(row[props.statusColumn]);
  }
  return '';
}

function getRowKey(row, index) {
  if (props.rowKey) {
    if (typeof props.rowKey === 'function') {
      return props.rowKey(row);
    }
    return row[props.rowKey];
  }
  return index;
}

function formatValue(value, column) {
  if (column.formatter && typeof column.formatter === 'function') {
    return column.formatter(value);
  }
  return value;
}
</script>

<style scoped>
.table th {
  user-select: none;
}

.table th:hover {
  background-color: #f8f9fc;
}
</style>
