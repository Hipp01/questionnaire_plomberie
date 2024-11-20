import { mount } from '@vue/test-utils';
import ResultPage from '@/views/ResultPage.vue';
import { beforeEach, describe, expect, it } from 'vitest';

describe('ResultPage.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(ResultPage, {
      props: {
        result: {
          description: 'Test description',
          title: 'Test title',
          infos: ['Info 1', 'Info 2', 'Info 3'],
          path: 'some/path; Autre; Test path',
          text: 'Text 1; Text 2',
          couts: ['100€', '200€'],
        },
        constantCard: {
          buttonText: 'Demander une intervention',
          footerText: ['Text footer 1', 'Text footer 2'],
        },
      },
    });
  });

  it('devrait afficher le titre dans la carte de gauche', () => {
    expect(wrapper.find('.left-card h2').text()).toBe('Bon à savoir');
  });

  it('devrait afficher le texte "Bon à savoir" avec une description correcte', () => {
    const paragraph = wrapper.findAll('p');
    expect(paragraph.at(0)?.text()).toBe(
      'Vous faites face à un problème autre ? Vous vous interrogez sur les raisons de ce blocage et les solutions pour y remédier ? Faites appel à un plombier de MesDépanneurs.fr pour une intervention rapide et efficace.'
    );
  });

  it('devrait afficher le bouton dans la carte de droite avec le texte correct', () => {
    const button = wrapper.find('.right-card button');
    expect(button.text()).toBe('Demander une intervention');
  });

  it('devrait afficher le texte de pied de page dans la carte de droite', () => {
    const footerTexts = wrapper.findAll('.under-right-card p');
    expect(footerTexts.at(0)?.text()).toBe('Vous êtes recontactés sous 20 minutes après votre passage de commande.');
    expect(footerTexts.at(1)?.text()).toBe('Si l\'origine de votre panne nécessite un diagnostic complémentaire, il s\'agit d\'une intervention à part entière demandant l\'expertise d\'un professionnel. Celle-ci fera l\'objet d\'une facturation.');
  });
});
