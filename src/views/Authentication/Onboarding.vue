<template>
    <div class="onboarding-container">
      <div class="onboarding-card card mx-auto">
        <div class="card-body text-center">
          <!-- Logo -->
          <img :src="logoUrl" alt="OJK Logo" class="logo mb-3" />
          <!-- Title -->
          <h5 class="card-title">Sistem Informasi Monitoring dan Tindak Lanjut (SIMANTUL)</h5>
          <p class="card-text">Silakan pilih jenis akses Anda untuk melanjutkan proses.</p>
          <!-- Radio Options -->
          <div class="radio-options">
            <div class="form-check option-item">
            <input
                class="form-check-input"
                type="radio"
                name="accessType"
                id="optionPengawas"
            />
            <label class="form-check-label" for="optionPengawas">
                Masuk sebagai Pengawas
            </label>
            <img :src="iconPengawas" alt="Icon Pengawas" class="icon ms-auto" />
            </div>

            <div class="form-check option-item">
            <input
                class="form-check-input"
                type="radio"
                name="accessType"
                id="optionBank"
            />
            <label class="form-check-label" for="optionBank">
                Masuk sebagai Bank
            </label>
            <img :src="iconBank" alt="Icon Bank" class="icon ms-auto" />
            </div>
        </div>
          <!-- Submit Button -->
          <RouterLink to="/login/supervisor" class="btn btn-danger mt-4">Masuk</RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "OnboardingView",
    computed: {
    logoUrl() {
      return new URL('@/assets/images/logo_ojk.png', import.meta.url).href;
    },
    iconPengawas() {
      return new URL('@/assets/images/Icon_Pengawas.svg', import.meta.url).href;
    },
    iconBank() {
      return new URL('@/assets/images/Icon_Bank.svg', import.meta.url).href;
    },
  },
  };
  </script>
  
  <style scoped>
  .onboarding-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #c92429, #922222);
    background-size: cover;
  }
  
  .onboarding-card {
    width: 100%;
    max-width: 480px;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
  }

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.icon {
  width: 30px; /* Adjust size as needed */
  height: 30px;
}

.btn {
    width: 100%;
    height: 50px;
}
  </style>
  