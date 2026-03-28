<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <input v-model="form.name" type="text" placeholder="Name" required />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <input v-model="form.password" type="password" placeholder="Password" required />
    <input v-model="form.confirmPassword" type="password" placeholder="Confirm Password" required />
    <input v-model.number="form.age" type="number" min="0" placeholder="Age" required />
    <label class="checkbox-label">
      <input v-model="form.agree" type="checkbox" required />
      I agree to the terms
    </label>
    <button type="submit">Send</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  agree: false
})

function submitForm() {
  console.log('Form submitted:', { ...form })
}
</script>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 340px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(66,185,131,0.10);
  padding: 32px 28px 24px 28px;
}
.auth-form input {
  padding: 10px 14px;
  border: 1px solid #b2f2dd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
.auth-form input:focus {
  border: 1.5px solid #42b983;
}
.auth-form button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}
.auth-form button:hover {
  background: #2c8c6b;
}
</style>
