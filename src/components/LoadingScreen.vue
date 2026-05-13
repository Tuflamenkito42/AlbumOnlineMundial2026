<template>
  <div class="loading-root">
    <div class="loading-card">
      <div class="spinner" aria-hidden="true"></div>
      <h1>Mundial 2026</h1>
      <p>Cargando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.loading-root {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--app-bg);
  z-index: 9999;
}

.loading-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 28px 36px;
  border-radius: 14px;
  background: var(--card-bg);
  color: var(--text-main);
  box-shadow: var(--shadow-lg);
}

.spinner {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: 6px solid rgba(0,0,0,0.08);
  border-top-color: var(--accent);
  animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
