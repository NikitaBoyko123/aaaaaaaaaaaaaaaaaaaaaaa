<template>
  <div class="task-detail">
    <h2>Страница задачи #{{ $route.params.id }}</h2>
    <p>Здесь будет детальная информация о задаче</p>
    <router-link to="/">← Назад к списку</router-link>
  </div>
</template>

<script setup>
// Простая страница без логики
</script>

<style scoped>
.task-detail {
  padding: 40px;
  color: white;
  text-align: center;
  background-color: #1d1825;
  border-radius: 20px;
  border: 2px solid #2a2438;
  max-width: 500px;
  margin: 0 auto;
}

.task-detail a {
  color: #9e78cf;
  text-decoration: none;
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  border: 2px solid #9e78cf;
  border-radius: 8px;
}

.task-detail a:hover {
  background-color: #9e78cf;
  color: white;
}
</style>