import { ref, onUnmounted } from 'vue';

/**
 * Composable pour gérer le rafraîchissement automatique
 * @param {Function} callback - Fonction à appeler lors du rafraîchissement
 * @param {number} defaultInterval - Intervalle par défaut en secondes
 * @returns {Object} Objet avec startRefresh, stopRefresh, setInterval, interval
 */
export function useRefresh(callback, defaultInterval = 60) {
  const interval = ref(defaultInterval);
  const timeoutId = ref(null);

  function startRefresh() {
    stopRefresh();
    if (interval.value > 0) {
      const callbackWrapper = () => {
        callback();
        timeoutId.value = setTimeout(callbackWrapper, interval.value * 1000);
      };
      timeoutId.value = setTimeout(callbackWrapper, interval.value * 1000);
    }
  }

  function stopRefresh() {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
  }

  function setRefreshInterval(newInterval) {
    interval.value = newInterval;
    if (timeoutId.value) {
      startRefresh();
    }
  }

  onUnmounted(() => {
    stopRefresh();
  });

  return {
    interval,
    startRefresh,
    stopRefresh,
    setRefreshInterval
  };
}
