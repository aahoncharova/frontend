<template>
  <form @submit.prevent="submitForm" class="auth-form" novalidate>
    <input v-model="form.name" type="text" placeholder="Name" />
    <div v-if="errors.name" class="error-msg">{{ errors.name }}</div>

    <input v-model="form.email" type="email" placeholder="Email" />
    <div v-if="errors.email" class="error-msg">{{ errors.email }}</div>

    <input v-model="form.password" type="password" placeholder="Password" />
    <div v-if="errors.password" class="error-msg">{{ errors.password }}</div>

    <input v-model="form.confirmPassword" type="password" placeholder="Confirm Password" />
    <div v-if="errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</div>

    <input v-model.number="form.age" type="number" min="0" placeholder="Age" />
    <div v-if="errors.age" class="error-msg">{{ errors.age }}</div>

    <label class="checkbox-label">
      <input v-model="form.agree" type="checkbox" />
      I agree to the terms
    </label>
    <div v-if="errors.agree" class="error-msg">{{ errors.agree }}</div>

    <button type="submit">Send</button>
  </form>
</template>

<script setup>
import { useValidator } from '../composables/useValidator'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  agree: false
})

const { errors, validateAll } = useValidator()

function submitForm() {
  if (!validateAll(form)) return
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

.error-msg {
  color: #c0392b;
  font-size: 0.98rem;
  margin: -10px 0 8px 2px;
  padding-left: 2px;
}
</style>
