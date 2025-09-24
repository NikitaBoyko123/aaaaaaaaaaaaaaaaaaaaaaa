<template>
  <div class="app">
    <nav class="navigation">
      <router-link to="/" class="nav-link">
        📝 Задачи
      </router-link>
    </nav>
    
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>

.app {
  min-height: 100vh;
  background-color: #0f0b18;
}

.navigation {
  padding: 20px;
  background-color: #1d1825;
  border-bottom: 2px solid #2a2438;
}

.nav-link {
  color: #9e78cf;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
}

.nav-link:hover {
  background-color: rgba(158, 120, 207, 0.1);
}

.main-content {
  padding: 20px;
}
</style>