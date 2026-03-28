<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for doesn't exist.</p>
    <router-link to="/">Go Home</router-link>
    <button @click="goBack">Go Back</button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const goBack = () => router.back()
    return { goBack }
  }
}
</script>

<style scoped>
.not-found {
  max-width: 500px;
  margin: 60px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66,185,131,0.10);
  padding: 32px 40px 24px 40px;
  text-align: center;
}
.not-found h1 {
  color: #e74c3c;
  margin-bottom: 18px;
  font-size: 2rem;
}
.not-found p {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 18px;
}
.not-found a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  margin-right: 18px;
}
.not-found button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.not-found button:hover {
  background: #2c8c6b;
}
</style>
