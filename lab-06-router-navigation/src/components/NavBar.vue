<template>
  <nav class="navbar">
    <router-link to="/" exact>Home</router-link>
    <router-link to="/catalog">Catalog</router-link>
    <router-link to="/about">About</router-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 32px;
  padding: 20px 40px;
  background: linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%);
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.08);
  border-radius: 0 0 16px 16px;
  align-items: center;
}

.navbar a {
  text-decoration: none;
  color: #222;
  font-size: 1.15rem;
  padding: 6px 0;
  transition: color 0.2s, border-bottom 0.2s;
  border-bottom: 2px solid transparent;
}

.router-link-active {
  color: #42b983;
  font-weight: bold;
  border-bottom: 2px solid #42b983;
}

.navbar a:hover {
  color: #2c8c6b;
  border-bottom: 2px solid #b2f2dd;
}
</style>
