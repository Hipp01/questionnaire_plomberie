import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import OnboardingComponent from '@/components/OnboardingComponent.vue';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';

describe('OnboardingComponent', () => {
  let router: any;

  beforeEach(async () => {
    // Configuration du router avec les routes
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'Onboarding', component: OnboardingComponent },
        { path: '/plomberie', name: 'plomberie', component: { template: '<div>Plomberie</div>' } },
        { path: '/electricite', name: 'electricite', component: { template: '<div>Électricité</div>' } },
        { path: '/chauffage', name: 'chauffage', component: { template: '<div>Chauffage</div>' } },
        { path: '/serrurerie', name: 'serrurerie', component: { template: '<div>Serrurerie</div>' } },
        { path: '/vitrerie', name: 'vitrerie', component: { template: '<div>Vitrerie</div>' } },
        { path: '/electromenager', name: 'electromenager', component: { template: '<div>Électroménager</div>' } },
      ],
    });

    // Définir la route par défaut comme la page d'accueil
    await router.push('/');
    await router.isReady();
  });

  it('should render the title correctly', () => {
    const wrapper = mount(OnboardingComponent, { global: { plugins: [router] } });
    const title = wrapper.find('.onboarding-title');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe('Mon problème concerne :');
  });

  it('should render 6 cards', () => {
    const wrapper = mount(OnboardingComponent, { global: { plugins: [router] } });
    const cards = wrapper.findAll('.card');
    expect(cards.length).toBe(6);
  });

  it('should call redirectToPage when a card is clicked', async () => {
    const redirectToPageMock = vi.fn(); // Mock de la méthode redirectToPage

    const wrapper = mount(OnboardingComponent, {
      global: {
        mocks: {
          redirectToPage: redirectToPageMock,
        },
      },
    });

    const card = wrapper.find('[data-test="card-plomberie"]');
    expect(card.exists()).toBe(true);

    await card.trigger('click');

    // Vérifier que la fonction a été appelée
    expect(redirectToPageMock).toHaveBeenCalledWith('plomberie');
  });


  it('should display correct text on each card', () => {
    const wrapper = mount(OnboardingComponent, { global: { plugins: [router] } });
    const expectedTexts = ['Plomberie', 'Électricité', 'Chauffage', 'Serrurerie', 'Vitrerie', 'Électroménager'];

    expectedTexts.forEach((text, index) => {
      const card = wrapper.find(`[data-test="card-${text.toLowerCase().replace(/é/g, 'e')}"]`);
      expect(card.exists()).toBe(true);
      expect(card.text()).toContain(text);
    });
  });

  it('should have correct images in each card', () => {
    const wrapper = mount(OnboardingComponent, { global: { plugins: [router] } });
    const cards = wrapper.findAll('.card');

    cards.forEach(card => {
      const img = card.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBeTruthy();
    });
  });

  it('should have correct classes on images within cards', () => {
    const wrapper = mount(OnboardingComponent, { global: { plugins: [router] } });

    expect(wrapper.find('[data-test="card-plomberie"] .img-plomberie').exists()).toBe(true);
    expect(wrapper.find('[data-test="card-electricite"] .img-electricite').exists()).toBe(true);
    expect(wrapper.find('[data-test="card-chauffage"] .img-chauffage').exists()).toBe(true);
    expect(wrapper.find('[data-test="card-serrurerie"] .img-serrurerie').exists()).toBe(true);
    expect(wrapper.find('[data-test="card-vitrerie"] .img-vitrerie').exists()).toBe(true);
    expect(wrapper.find('[data-test="card-electromenager"] .img-electromenager').exists()).toBe(true);
  });
});
