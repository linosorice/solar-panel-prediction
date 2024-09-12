<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const { t } = useI18n()
onMounted(() => {
  console.log('the component is now mounted.')
})
const latitude = ref('')
const longitude = ref('')
</script>

<template>
  <div class="rounded-md border p-4">
    Solar
    <Input class="mt-4" v-model="latitude" :placeholder="t('latitude')" />
    <Input class="mt-4" v-model="longitude" :placeholder="t('longitude')" />
    <Button class="mt-4 w-full">{{ t('hello') }} Lino</Button>
  </div>
</template>
