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
          <div class="text-start">
            <h6 class="fw-bolder fs-5">Masuk</h6>
            <p class="fw-light">Silakan pilih jenis akses Anda untuk melanjutkan proses.</p>
          </div>
          
          <div class="mb-3">
            <div class="text-start">
                <label for="">Email</label>
            </div>
            <input type="text" v-model="model.auth.email" class="form-control"/>
          </div>
          <div class="mb-3">
            <div class="text-start">
                <label for="">Password</label>
            </div>
            <input type="password" v-model="model.auth.password" class="form-control"/>
          </div>
          <button type="button" @click="onTapLogin" class="btn btn-danger mt-4">Masuk</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../../axiosInstance';
  export default {
    name: "OnboardingView",
    data(){
        return {
            model: {
                auth: {
                    email: '',
                    password: ''
                }
            },
            backgroundImageStyle: {
              backgroundImage: `linear-gradient(180deg, #A90704, #E38B8C), url(${new URL('@/assets/images/background_image.png', import.meta.url).href})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
        }
    },
    computed: {
        logoUrl() {
            return new URL('@/assets/images/logo_ojk.png', import.meta.url).href;
        },
    },
    methods: {
        async onTapLogin() {
          try {
            const response = await axiosInstance.post('/api/auth/login', this.model.auth)
            console.log(response);
                if (response.data.code == 200) {
                    localStorage.setItem('accessToken', `${response.data.data.accessToken}`);
                    localStorage.setItem('refreshToken', `${response.data.data.refreshToken}`);
                    localStorage.setItem('userType', response.data.data.type);
                    localStorage.setItem('name', response.data.data.name);
                    localStorage.setItem('id', response.data.data.id);
                    this.auth = {
                        email: "",
                        password: ""
                    }
                    if (response.data.data.type == 3) {
                      this.$router.push('/dashboard/admin')
                    } else {
                      this.$router.push('/dashboard')
                    }
                }
          } catch (error) {
            console.log('Error fetching data:', error)
          }
        }
    }
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

.background-container {
  width: 100%;
  height: 100vh; /* Full viewport height */
}
  </style>
  