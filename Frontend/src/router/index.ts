import { createRouter, createWebHistory } from 'vue-router';

import OnboardingPage from '@/views/OnboardingPage.vue';
import PlomberiePage from '@/views/PlomberiePage.vue';
import ElectricitePage from '@/views/ElectricitePage.vue';
import ChauffagePage from '@/views/ChauffagePage.vue';
import SerrureriePage from '@/views/SerrureriePage.vue';
import VitreriePage from '@/views/VitreriePage.vue';
import ElectromenagerPage from '@/views/ElectromenagerPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Onboarding',
    component: OnboardingPage,
    meta: { hideHeader: true }, // Cacher le header pour cette page
  },
  {
    path: '/plomberie',
    name: 'plomberie',
    component: PlomberiePage,
  },
  {
    path: '/electricite',
    name: 'electricite',
    component: ElectricitePage,
  },
  {
    path: '/chauffage',
    name: 'chauffage',
    component: ChauffagePage,
  },
  {
    path: '/serrurerie',
    name: 'serrurerie',
    component: SerrureriePage,
  },
  {
    path: '/vitrerie',
    name: 'vitrerie',
    component: VitreriePage,
  },
  {
    path: '/electromenager',
    name: 'electromenager',
    component: ElectromenagerPage,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
