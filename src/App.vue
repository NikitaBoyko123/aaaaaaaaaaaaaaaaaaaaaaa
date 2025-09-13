<template>
  <div class="app">
    <nav class="app__navigation">
      <router-link to="/" class="app__nav-link">
        📝 Задачи
      </router-link>
    </nav>
    
    <main class="app__main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #0f0b18;
}

.app__navigation {
  padding: 20px;
  background-color: #1d1825;
  border-bottom: 2px solid #2a2438;
}

.app__nav-link {
  color: #9e78cf;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
}

.app__nav-link:hover {
  background-color: rgba(158, 120, 207, 0.1);
}

.app__main {
  padding: 20px;
}
</style>