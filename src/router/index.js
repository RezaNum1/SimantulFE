import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard/DashboardView.vue'
import UserView from '../views/User/View.vue'
import ReportCreateView from '../views/Report/Create.vue'
import ReportEditView from '../views/Report/Edit.vue'
import ReportReadView from '../views/Report/Read.vue'
import ReportReadFormView from '../views/Report/ReadForm.vue'
import ReportAuthorizationView from '../views/Report/Authorization.vue'
import ReportFollowUpView from '../views/Report/FollowUpForm.vue'
import OnboardingView from '../views/Authentication/Onboarding.vue'
import LoginSupervisor from '../views/Authentication/LoginSupervisor.vue'
import Findings from '../views/Dashboard/FindingsView.vue'
import DashboardAdminView from '../views/Dashboard/DashboardAdminView.vue'
import DashboardBankView from '../views/Dashboard/DashboardBankView.vue'
import UploadDocument from '../views/Report/UploadDocument.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard/admin',
      name: 'admin',
      component: DashboardAdminView
    },
    {
      path: '/',
      name: 'onboarding',
      component: OnboardingView
    },
    {
      path: '/login/supervisor',
      name: 'loginSupervisor',
      component: LoginSupervisor
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/findings',
      name: 'findings',
      component: Findings
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/report/create',
      name: 'reportCreate',
      component: ReportCreateView
    },
    {
      path: '/report/:id/edit',
      name: 'reportEdit',
      component: ReportEditView
    },
    {
      path: '/report/:id/read',
      name: 'reportRead',
      component: ReportReadView
    },
    {
      path: '/report/:id/readForm',
      name: 'reportReadForm',
      component: ReportReadFormView
    },
    {
      path: '/report/:id/authorization',
      name: 'reportAuthorization',
      component: ReportAuthorizationView
    },
    {
      path: '/report/:id/followUp',
      name: 'reportFollowUp',
      component: ReportFollowUpView
    },
    {
      path: '/report/:id/document',
      name: 'uploadDocument',
      component: UploadDocument
    },
    {
      path: '/dashboard/bank',
      name: 'adminBank',
      component: DashboardBankView
    },
  ]
})

export default router
