<template>
  <div class="onboarding-container background-container" :style="backgroundImageStyle">
    <div class="onboarding-card card mx-auto">
      <div class="card-body text-center">
        <!-- Logo -->
        <img :src="logoUrl" alt="OJK Logo" class="logo mb-3" />
        <!-- Title -->
        <div class="mb-5">
          <h5 class="card-title fw-light">Sistem Informasi Monitoring Tindak Lanjut Temuan Pemeriksaan</h5>
          <h5 class="fw-bolder">(SIMANTAP)</h5>
        </div>
        <p class="card-text">Silakan pilih jenis akses Anda untuk melanjutkan proses.</p>
        <!-- Radio Options -->
        <div class="radio-options">
            <div class="form-check option-item">
              <input class="form-check-input" type="radio" name="accessType" id="optionPengawas" style="margin-left: 24px; margin-right: 10px"/>
              <label class="form-check-label" for="optionPengawas">Masuk sebagai Pengawas</label>
              <img :src="iconPengawas" alt="Icon Pengawas" class="icon ms-auto" />
            </div>
            <div class="form-check option-item">
              <input class="form-check-input" type="radio" name="accessType" id="optionBank" style="margin-left: 24px; margin-right: 10px" />
              <label class="form-check-label" for="optionBank">Masuk sebagai Bank</label>
              <img :src="iconBank" alt="Icon Bank" class="icon ms-auto" />
            </div>
        </div>
        <!-- Submit Button -->
        <RouterLink to="/login" class="btn btn-danger mt-4">Masuk</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnboardingView",
  data() {
    return {
      backgroundImageStyle: {
        backgroundImage: `linear-gradient(180deg, #A90704, #E38B8C), url(${new URL('@/assets/images/background_image.png', import.meta.url).href})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    };
  },
  computed: {
    logoUrl() {
      return new URL('@/assets/images/logo_ojk.png', import.meta.url).href;
    },
    iconPengawas() {
      return new URL('@/assets/images/Icon_Pengawas.svg', import.meta.url).href;
    },
    iconBank() {
      return new URL('@/assets/images/Icon_Bank.svg', import.meta.url).href;
    }
  }
};
</script>

<style scoped>
.background-container {
  width: 100%;
  height: 100vh;
}
.onboarding-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
  width: 30px;
  height: 30px;
}
.btn {
  width: 100%;
  height: 50px;
}
</style>
