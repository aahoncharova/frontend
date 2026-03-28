<template>
  <div class="profile-info">
    <h2>Basic Information</h2>
    <p>Name: Tom</p>
    <p>Email: tom@example.com</p>
  </div>
</template>
<script>
export default {
  name: 'ProfileInfo'
}
</script>
<style scoped>
.profile-info {
  text-align: center;
}
.profile-info h2 {
  color: #42b983;
  margin-bottom: 12px;
}
.profile-info p {
  color: #444;
  font-size: 1.05rem;
}
</style>
