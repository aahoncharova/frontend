<template>
  <div class="profile">
    <h1>User Profile</h1>
    <nav class="profile-nav">
      <router-link to="/profile/info">Basic Info</router-link>
      <span>|</span>
      <router-link to="/profile/settings">Settings</router-link>
    </nav>
    <div class="nested-content">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProfileView'
}
</script>
<style scoped>
.profile {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(66,185,131,0.10);
  padding: 32px 40px 24px 40px;
}
.profile h1 {
  color: #42b983;
  margin-bottom: 18px;
  font-size: 2rem;
  text-align: center;
}
.profile-nav {
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: 24px;
  font-size: 1.1rem;
}
.profile-nav a {
  color: #222;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}
.profile-nav a.router-link-active {
  color: #42b983;
  background: #e6f9f1;
  font-weight: bold;
}
.profile-nav span {
  color: #bbb;
}
.nested-content {
  margin-top: 24px;
  min-height: 120px;
}
</style>
