<template>
  <div>
    <OnboardingComponent />
    <FooterComponent />
  </div>
</template>

<script>
import OnboardingComponent from '@/components/OnboardingComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  components: {
    OnboardingComponent,
    FooterComponent,
  },
};
</script>
