import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import QuestionnaireComponent from '@/components/QuestionnaireComponent.vue';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { getQuestionById } from '@/api/questionsService';  // Simuler cette fonction

// Créer un router simulé pour les tests
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', name: 'Questionnaire', component: QuestionnaireComponent }],
});

vi.mock('@/api/questionsService', () => ({
  getQuestionById: vi.fn(),
}));

describe('QuestionnaireComponent', () => {
  let wrapper: any;

  beforeEach(async () => {
    // Mock de la question à charger
    (getQuestionById as vi.Mock).mockResolvedValue({
      id: '1',
      text: 'Quelle est votre préférence ?',
      options: [
        { id: 'option1', text: 'Option 1', nextQuestionId: '2' },
        { id: 'option2', text: 'Option 2', nextQuestionId: '3' },
      ],
    });

    // Créer le wrapper du composant
    wrapper = mount(QuestionnaireComponent, {
      global: {
        plugins: [router],
      },
      props: {
        initialQuestionId: '1',
      },
    });

    // Attendre que le composant soit monté et que la question soit chargée
    await nextTick();
  });

  it('should load the question correctly', async () => {
    // Vérifier que le texte de la question est présent
    const questionText = wrapper.find('h1');
    expect(questionText.exists()).toBe(true);
    expect(questionText.text()).toBe('Quelle est votre préférence ?');
  });

  it('should render options correctly', async () => {
    // Vérifier que les options sont présentes
    const options = wrapper.findAll('.option-item');
    expect(options.length).toBe(2);
    expect(options[0].text()).toContain('Option 1');
    expect(options[1].text()).toContain('Option 2');
  });

  it('should call handleOptionClick when an option is clicked', async () => {
    // Mock de la fonction handleOptionClick
    const handleOptionClickMock = vi.fn();
    wrapper.vm.handleOptionClick = handleOptionClickMock;

    // Trouver le bouton de la première option et simuler un clic
    const button = wrapper.find('.option-item button');
    await button.trigger('click');

    // Vérifier que la méthode a été appelée
    expect(handleOptionClickMock).toHaveBeenCalled();
  });

  it('should navigate to the next question when an option is clicked', async () => {
    // Simuler la réponse de l'API avec une question suivante
    (getQuestionById as vi.Mock).mockResolvedValueOnce({
      id: '2',
      text: 'Quel est votre choix suivant ?',
      options: [
        { id: 'option1', text: 'Option 1', nextQuestionId: null },
        { id: 'option2', text: 'Option 2', nextQuestionId: null },
      ],
    });

    // Cliquer sur la première option
    const button = wrapper.find('.option-item button');
    await button.trigger('click');

    // Attendre le changement de question
    await nextTick();

    // Vérifier que la nouvelle question est affichée
    const questionText = wrapper.find('h1');
    expect(questionText.text()).toBe('Quel est votre choix suivant ?');
  });

  it('should handle previous step navigation', async () => {
    // Simuler une navigation vers la question précédente
    const previousStepMock = vi.fn();
    wrapper.vm.goToPreviousStep = previousStepMock;

    // Vérifier que le bouton "étape précédente" est présent
    const prevButton = wrapper.find('.previous-step-button');
    expect(prevButton.exists()).toBe(true);

    // Simuler un clic sur le bouton "étape précédente"
    await prevButton.trigger('click');

    // Vérifier que la méthode `goToPreviousStep` a été appelée
    expect(previousStepMock).toHaveBeenCalled();
  });
});
