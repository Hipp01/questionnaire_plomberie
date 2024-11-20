import { mount } from '@vue/test-utils'
import NotFound from '@/views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { beforeEach, describe, expect, it } from 'vitest'

// Création du routeur pour tester la navigation
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
    { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound }
  ]
})

describe('NotFound.vue', () => {
  beforeEach(async () => {
    // Montée du composant et démarrage du routeur
    await router.push('/') // Simuler une page inexistante
    await router.isReady()
  })

  it('renders correctly', () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [router]
      }
    })

    // Vérification si le texte est bien affiché
    expect(wrapper.text()).toContain('404 - Page Not Found')
    expect(wrapper.text()).toContain('Sorry, the page you are looking for does not exist.')
    expect(wrapper.text()).toContain('Go to Home')
  })

  it('navigates to home when "Go to Home" is clicked', async () => {
    const wrapper = mount(NotFound, {
      global: {
        plugins: [router]
      }
    })

    // Cliquer sur le lien "Go to Home"
    await wrapper.find('a').trigger('click')

    // Vérification que la navigation a bien eu lieu
    expect(wrapper.vm.$route.path).toBe('/')
  })
})
