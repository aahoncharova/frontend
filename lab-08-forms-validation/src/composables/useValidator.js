import { ref } from 'vue'

export function useValidator() {
  const errors = ref({})

  const validateName = (name) => {
    errors.value.name = name.trim().length >= 2 ? '' : 'Name must be at least 2 characters'
  }

  const validateEmail = (email) => {
    errors.value.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? '' : 'Invalid email'
  }

  const validatePassword = (password) => {
    errors.value.password = password.length >= 6 ? '' : 'Password must be at least 6 characters'
  }

  const validateConfirmPassword = (password, confirmPassword) => {
    errors.value.confirmPassword = password === confirmPassword && confirmPassword.length > 0 ? '' : 'Passwords do not match'
  }

  const validateAge = (age) => {
    errors.value.age = age && Number(age) > 0 ? '' : 'Enter a valid age/course'
  }

  const validateAgree = (agree) => {
    errors.value.agree = agree ? '' : 'You must agree to the terms'
  }

  const validateAll = (form) => {
    validateName(form.name)
    validateEmail(form.email)
    validatePassword(form.password)
    validateConfirmPassword(form.password, form.confirmPassword)
    validateAge(form.age)
    validateAgree(form.agree)
    return Object.values(errors.value).every(e => !e)
  }

  return {
    errors,
    validateName,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateAge,
    validateAgree,
    validateAll
  }
}
