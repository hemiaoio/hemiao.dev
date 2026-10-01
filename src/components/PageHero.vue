<script setup lang="ts">
interface Props {
  title: string
  description?: string
  eyebrow?: string
}

defineProps<Props>()
</script>

<template>
  <section class="page-hero">
    <div class="hm-container">
      <p v-if="eyebrow" class="page-hero__eyebrow">{{ eyebrow }}</p>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="description" class="page-hero__desc">{{ description }}</p>
      <div v-if="$slots.default" class="page-hero__extra">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.page-hero {
  padding-block: 56px 40px;
  border-bottom: 1px solid var(--hm-color-border);
  background: var(--hm-color-bg-subtle);
}

.page-hero__eyebrow {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--hm-color-primary);
  text-transform: uppercase;
}

.page-hero__title {
  margin-top: 10px;
  font-size: 34px;
  letter-spacing: -0.01em;
}

.page-hero__desc {
  margin-top: 14px;
  max-width: 680px;
  font-size: 16px;
  color: var(--hm-color-text-secondary);
}

.page-hero__extra {
  margin-top: 24px;
}

@media (max-width: 640px) {
  .page-hero {
    padding-block: 40px 28px;
  }

  .page-hero__title {
    font-size: 25px;
  }

  .page-hero__desc {
    font-size: 15px;
  }
}
</style>
