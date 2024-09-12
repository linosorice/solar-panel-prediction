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

const { t } = useI18n()
</script>

<template>
  <form>
    <Select v-model="$i18n.locale">
      <SelectTrigger>
        <SelectValue :placeholder="t('language')" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">{{ t('en') }}</SelectItem>
          <SelectItem value="it">{{ t('it') }}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </form>
</template>
