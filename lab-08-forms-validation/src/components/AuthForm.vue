<template>
  <form @submit.prevent="submitForm" class="auth-form" novalidate>
    <input v-model="form.name" type="text" placeholder="Name" @blur="onBlur('name')" />
    <div v-if="touched.name && errors.name" class="error-msg">{{ errors.name }}</div>

    <input v-model="form.email" type="email" placeholder="Email" @blur="onBlur('email')" />
    <div v-if="touched.email && errors.email" class="error-msg">{{ errors.email }}</div>

    <input v-model="form.password" type="password" placeholder="Password" @blur="onBlur('password')" />
    <div v-if="touched.password && errors.password" class="error-msg">{{ errors.password }}</div>

    <input v-model="form.confirmPassword" type="password" placeholder="Confirm Password" @blur="onBlur('confirmPassword')" />
    <div v-if="touched.confirmPassword && errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</div>

    <input v-model.number="form.age" type="number" min="0" placeholder="Age" @blur="onBlur('age')" />
    <div v-if="touched.age && errors.age" class="error-msg">{{ errors.age }}</div>

    <label class="checkbox-label">
      <input v-model="form.agree" type="checkbox" @blur="onBlur('agree')" />
      I agree to the terms
    </label>
    <div v-if="touched.agree && errors.agree" class="error-msg">{{ errors.agree }}</div>

    <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>
    <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Sending...' : 'Send' }}</button>
  </form>
</template>

<script setup>
import { useValidator } from '../composables/useValidator'
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: '',
  agree: false
})
const touched = reactive({
  name: false,
  email: false,
  password: false,
  confirmPassword: false,
  age: false,
  agree: false
})

function onBlur(field) {
  touched[field] = true
  switch (field) {
    case 'name':
      validateName(form.name)
      break
    case 'email':
      validateEmail(form.email)
      break
    case 'password':
      validatePassword(form.password)
      validateConfirmPassword(form.password, form.confirmPassword)
      break
    case 'confirmPassword':
      validateConfirmPassword(form.password, form.confirmPassword)
      break
    case 'age':
      validateAge(form.age)
      break
    case 'agree':
      validateAgree(form.agree)
      break
  }
}

const { errors, validateAll, validateName, validateEmail, validatePassword, validateConfirmPassword, validateAge, validateAgree } = useValidator()

const isSubmitting = ref(false)
const successMsg = ref('')

function resetForm() {
  form.name = ''
  form.email = ''
  form.password = ''
  form.confirmPassword = ''
  form.age = ''
  form.agree = false
  Object.keys(touched).forEach(k => touched[k] = false)
}

function submitForm() {
  successMsg.value = ''
  if (!validateAll(form)) {
    // Mark all as touched to show errors if user tries to submit without touching
    Object.keys(touched).forEach(k => touched[k] = true)
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    successMsg.value = 'Form submitted successfully!'
    resetForm()
    Object.keys(errors.value).forEach(k => errors.value[k] = '')
  }, 1500)
}

// No live validation, only onBlur
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

.success-msg {
  color: #27ae60;
  font-size: 1.05rem;
  margin-bottom: 10px;
  text-align: center;
}
</style>
