<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'

const { t } = useI18n()
const apiKey = '2cce4c8f614380fe3ee1c8c525fa1ef7'

onMounted(() => {
  getCoordinates()
})

interface WeatherData {
  coord: { lon: number; lat: number }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: { speed: number; deg: number }
  clouds: { all: number }
  dt: number
  sys: { country: string; sunrise: number; sunset: number }
  timezone: number
  name: string
}

const weatherData = ref<WeatherData | null>(null)

const getCoordinates = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        getCurrentWeather(
          position.coords.latitude.toString(),
          position.coords.longitude.toString()
        )
      },
      error => {
        console.error('Error getting geolocation:', error.message)
      }
    )
  } else {
    console.log('Geolocation is not available in this browser.')
  }
}

const getCurrentWeather = async (latitude: string, longitude: string) => {
  if (!latitude || !longitude) {
    console.error('Latitude and longitude are required')
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

  try {
    const response = await axios.get(url)
    weatherData.value = response.data
    console.log('Current weather:', response.data)
  } catch (error) {
    console.error('Error getting current weather:', error)
  }
}

const sections = [
  {
    title: t('temperature'),
    items: ['temp', 'feels_like', 'temp_min', 'temp_max']
  },
  { title: t('atmosphere'), items: ['humidity', 'pressure', 'visibility'] },
  { title: t('wind_clouds'), items: ['wind', 'cloudiness'] },
  { title: t('location'), items: ['coordinates', 'sunrise', 'sunset'] }
]

const formatWeatherItem = (item: string, data: WeatherData) => {
  switch (item) {
    case 'temp':
      return `${t('temperature')}: ${data.main.temp.toFixed(1)}°C`
    case 'feels_like':
      return `${t('feels_like')}: ${data.main.feels_like.toFixed(1)}°C`
    case 'temp_min':
      return `${t('min_temp')}: ${data.main.temp_min.toFixed(1)}°C`
    case 'temp_max':
      return `${t('max_temp')}: ${data.main.temp_max.toFixed(1)}°C`
    case 'humidity':
      return `${t('humidity')}: ${data.main.humidity}%`
    case 'pressure':
      return `${t('pressure')}: ${data.main.pressure} hPa`
    case 'visibility':
      return `${t('visibility')}: ${data.visibility / 1000} km`
    case 'wind':
      return `${t('wind')}: ${data.wind.speed.toFixed(1)} m/s`
    case 'cloudiness':
      return `${t('cloudiness')}: ${data.clouds.all}%`
    case 'coordinates':
      return `${t('coordinates')}: ${data.coord.lat.toFixed(2)}, ${data.coord.lon.toFixed(2)}`
    case 'sunrise':
      return `${t('sunrise')}: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`
    case 'sunset':
      return `${t('sunset')}: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`
    default:
      return ''
  }
}
</script>

<template>
  <div class="mx-auto mt-6 w-full max-w-md">
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <Card
        v-if="weatherData"
        class="transform bg-neutral-50 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900"
      >
        <CardHeader>
          <CardTitle
            >{{ t('current_weather') }} - {{ weatherData.name }}</CardTitle
          >
          <CardDescription>{{
            new Date(weatherData.dt * 1000).toLocaleString()
          }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="mb-6 flex items-center space-x-4">
            <img
              :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
              :alt="weatherData.weather[0].description"
              class="h-16 w-16"
            />
            <div>
              <p class="text-2xl font-bold">
                {{ weatherData.main.temp.toFixed(1) }}°C
              </p>
              <p class="text-muted-foreground">
                {{ weatherData.weather[0].description }}
              </p>
            </div>
          </div>

          <div class="space-y-6">
            <div
              v-for="(section, index) in sections"
              :key="section.title"
              class="transform transition duration-300"
              :class="[`delay-${index * 150}`, 'translate-y-0 opacity-100']"
              :style="{ transitionDelay: `${index * 150}ms` }"
            >
              <h3 class="mb-2 text-lg font-semibold">{{ section.title }}</h3>
              <div class="grid grid-cols-2 gap-4">
                <p v-for="item in section.items" :key="item" class="text-sm">
                  {{ formatWeatherItem(item, weatherData) }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div v-else class="space-y-6">
        <Skeleton class="h-16 w-full rounded-lg" />
        <div v-for="i in 4" :key="i" class="space-y-2">
          <Skeleton class="h-6 w-1/3 rounded" />
          <div class="grid grid-cols-2 gap-4">
            <Skeleton v-for="j in 4" :key="j" class="h-8 w-full rounded" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
