import { mount } from '@vue/test-utils';
import ResultPage from '@/views/InterventionPage.vue';
import { beforeEach, describe, expect, it } from 'vitest';

describe('ResultPage.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(ResultPage, {
      props: {
        result: {
          title: '',
          couts: ['100€', '200€'],
        },
        constantCard: {
          buttonText: 'Demander une intervention',
        },
      },
    });
  });

  it('devrait afficher la carte de gauche', () => {
    const leftCard = wrapper.find('.left-card');
    expect(leftCard.exists()).toBe(true);
  });

  it('devrait afficher la carte de droite', () => {
    const rightCard = wrapper.find('.right-card');
    expect(rightCard.exists()).toBe(true);
  });

  it('devrait afficher le bouton "Passer commande et payer en ligne"', () => {
    const nextButton = wrapper.find('.next-step-button');
    expect(nextButton.exists()).toBe(true);
    expect(nextButton.text()).toBe('Passer commande et payer en ligne');
  });

  it('devrait afficher le bouton "Étape précédente"', () => {
    const previousButton = wrapper.find('.previous-step-button');
    expect(previousButton.exists()).toBe(true);
    expect(previousButton.text()).toBe('Étape précédente');
  });

  it('devrait afficher le texte dans la carte de droite', () => {
    const titleRightCard = wrapper.find('.right-card h2');
    expect(titleRightCard.exists()).toBe(true);
    expect(titleRightCard.text()).toBe('');
  });

  it('devrait afficher le texte "Besoin d’une assistance téléphonique ?" dans la carte de droite', () => {
    const assistanceText = wrapper.find('.second-right-card h2');
    expect(assistanceText.exists()).toBe(true);
    expect(assistanceText.text()).toBe('Besoin d’une assistance téléphonique ?');
  });

  it('devrait afficher le bouton "Afficher le numéro" dans la carte de droite', () => {
    const button = wrapper.find('#num-tel');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Afficher le numéro');
  });

  it('devrait afficher les trois textes de pied de page dans la carte de droite', () => {
    const footerTexts = wrapper.findAll('.under-right-card p');
    expect(footerTexts.length).toBe(3);
    expect(footerTexts[0].text()).toBe('Vous êtes recontactés sous 20 minutes après votre passage de commande.');
    expect(footerTexts[1].text()).toBe('L\'artisan vous proposera un rendez-vous dès qu\'il aura pris connaissance de votre commande.');
  });
});
