<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'

const { t, locale } = useI18n()

// Oggetto per le bandiere
const flags = {
  en: '🇬🇧',
  it: '🇮🇹'
}

// Riferimento reattivo per la lingua selezionata
const selectedLanguage = ref(locale.value)

// Funzione per impostare la lingua di default
const setDefaultLanguage = () => {
  const systemLanguage = navigator.language.split('-')[0]
  const supportedLanguages = Object.keys(flags)
  const defaultLanguage = supportedLanguages.includes(systemLanguage)
    ? systemLanguage
    : 'en'
  selectedLanguage.value = defaultLanguage
  locale.value = defaultLanguage
}

// Imposta la lingua di default all'avvio del componente
onMounted(setDefaultLanguage)

// Funzione per gestire il cambio di lingua
const handleLanguageChange = (lang: string) => {
  selectedLanguage.value = lang
  locale.value = lang
}
</script>

<template>
  <form>
    <Select
      v-model="selectedLanguage"
      @update:modelValue="handleLanguageChange"
    >
      <SelectTrigger class="w-[180px]">
        <SelectValue :placeholder="t('language')" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="(flag, lang) in flags" :key="lang" :value="lang">
            <div class="flex items-center">
              <span class="mr-2 text-lg">{{ flag }}</span>
              {{ t(lang) }}
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </form>
</template>
