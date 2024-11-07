// src/stores/authStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Reactive properties
  const accessToken = ref('');
  const isLoggedIn = computed(() => !!accessToken.value);
  const refreshToken = ref('');
  const userType = ref('');
  const name = ref('');
  const id = ref('');

  // Actions to modify the state
  function setAuthProp(accessToken, refreshToken, userType, name, id) {
    accessToken.value = accessToken;
    refreshToken.value = refreshToken;
    userType.value = userType;
    name.value = name;
    id.value = id;
    localStorage.setItem('accessToken', accessToken); // Optional: store token in localStorage
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userType', userType);
    localStorage.setItem('name', name);
    localStorage.setItem('id', id);  
}

  function clearAccessToken() {
    accessToken.value = '';
    refreshToken.value = '';
    userType.value = '';
    name.value = '';
    id.value = '';
    localStorage.removeItem('accessToken'); // Optional: clear token from localStorage
    localStorage.removeItem('refreshToken');  
    localStorage.removeItem('userType');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
}

  // Initialize from localStorage if available
  if (localStorage.getItem('accessToken')) {
    setAuthProp(localStorage.getItem('accessToken'),
    localStorage.getItem('accessToken'),
    localStorage.getItem('refreshToken'),
    localStorage.getItem('userType'),
    localStorage.getItem('name'),
    localStorage.getItem('id'));
  }

  return { accessToken, isLoggedIn, refreshToken , userType, name, id, setAuthProp, clearAccessToken };
});
