<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header v-show="isLoggedIn">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg main-navbar">
        <div class="container-fluid">
          <img :src="logoOjk" alt="Image Description" class="navbar-icon">
          <!-- <RouterLink class="navbar-brand" to="/dashboard">Navbar</RouterLink> -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <!-- <li class="nav-item">  
                <RouterLink class="nav-link active" aria-current="page" to="/dashboard">Dashboard</RouterLink>
              </li> -->
              <li class="nav-item">
                <button type="button" class="btn btn-outline-danger logout-btn" @click="onTapLogOut">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <div class="sidenav" v-show="isLoggedIn">
    <div class="image-with-text">
      <img :src="profileLogo" alt="Image Description" class="profile-icon">
      <p class="profile-text">{{ name }}</p>
    </div>

    <hr class="hr-new">

    <p class="main-menu-txt">Menu Utama</p>

    <div class="sidenav-btn-wrapper" v-show="userType == '3'">
      <img :src="dashboardLogo" alt="Image Description" class="sidenav-btn-icon">
      <RouterLink class="sidenav-btn-text" to="/dashboard/admin">Dashboard</RouterLink>
    </div>

    <div class="sidenav-btn-wrapper" v-show="userType == '3'">
      <img :src="rincianTemuanLogo" alt="Image Description" class="sidenav-btn-icon">
      <RouterLink class="sidenav-btn-text" to="/dashboard/bank">Kelola Bank</RouterLink>
    </div>

    <div class="sidenav-btn-wrapper" v-show="userType != '3'">
      <img :src="dashboardLogo" alt="Image Description" class="sidenav-btn-icon">
      <RouterLink class="sidenav-btn-text" to="/dashboard">Dashboard</RouterLink>
    </div>

    <div v-show="userType == '1'" class="sidenav-btn-wrapper">
      <img :src="rincianTemuanLogo" alt="Image Description" class="sidenav-btn-icon">
      <RouterLink class="sidenav-btn-text" to="/findings">Rincian Temuan</RouterLink>
    </div>
    <!-- <a href="#about">About</a> -->
  </div>
  <RouterView v-show="isLoggedIn" class="router-view"/>
  <RouterView v-show="!isLoggedIn"/>
</template>

<script>
import { reactive, watch } from 'vue';

const state = reactive({
  accessToken: '',
});
export default {
  computed: {
        isLoggedIn() {
          return !!localStorage.getItem('accessToken');
        },
        profileLogo() {
            return new URL('@/assets/images/Icon_Profile.svg', import.meta.url).href;
        },
        dashboardLogo() {
            return new URL('@/assets/images/Icon_Dashboard.svg', import.meta.url).href;
        },
        rincianTemuanLogo() {
            return new URL('@/assets/images/Icon_RincianTemuan.svg', import.meta.url).href;
        },
        logoOjk() {
          return new URL('@/assets/images/logo_ojk.png', import.meta.url).href;
        },
        name() {
          return localStorage.getItem('name');
        },
        userType() {
          return localStorage.getItem('userType')
        }
    },
  methods: {
      onTapLogOut(){
        localStorage.setItem('accessToken', "");
        localStorage.setItem('refreshToken', "");
        localStorage.setItem('userType', 0);
        localStorage.setItem('name', '');
        localStorage.setItem('id', '');
        this.name = '';
        this.$router.push('/')
      }
  }
}
</script>

<style>
body {
  background-color: #F4F4F4;
}
.sidenav {
  height: 100%;
  width: 280px;
  position: fixed;
  z-index: 1;
  top: 80px;
  left: 0;
  background-color: #A90704;
  overflow-x: hidden;
}

.sidenav a {
  text-decoration: none;
  font-size: 16px;
  color: #FFE9E9;
  display: block;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav-text {
  font-size: 16px;
}

.main-navbar {
  background-color: #fffefe;
  height: 80px;
  position: fixed;  /* Make the navbar fixed */
  top: 0;           /* Stick it to the top */
    left: 0;          /* Align to the left */
    width: 100%;      /* Full width */
    z-index: 1030;    /* Ensure it’s above other content */
}

.router-view {
  margin-left: 312px;
  margin-right: 87px;
  padding-top: 32.3px;
}

.profile-text {
  font-size: 16px;
  color: #FFFFFF;
}

.profile-icon {
  width: 24px;
  height: 24px;
}

.sidenav-btn-wrapper {
  display: flex;
  align-items: center;
  margin-left: 96px;
  margin-top: 32px;
}

.sidenav-btn-icon {
  width: 16px;
  height: 16px;
  margin-right: 12px;
}

.sidenav-btn-text {
  font-size: 16px;
  color: #cc0b0b;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

.logout-btn {
  margin-right: 80px;
  padding-inline: 20px;
}

.image-with-text {
  display: flex;
  align-items: normal;
  margin-left: 80px;
  margin-top: 32px;
}
.image-with-text img {
  margin-right: 8px; /* adjust as needed */
}

.hr-new {
  border: 1px solid white;
  margin-top: 0px;
  margin-bottom: 24px;
}

.main-menu-txt {
  font-size: 16px;
  color: #FFE9E9;
  font-weight: bold;
  margin-left: 80px;
}

.navbar-icon {
  margin-left: 60px
}
</style>