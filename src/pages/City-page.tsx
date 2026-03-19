import { GeocodingResponse } from '@/api/type';
import CurrentWeather from '@/components/CurrentWeather';
import Favoritebutton from '@/components/favorite-button';
import HourlyTemprature from '@/components/HourlyTemprature';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import WeatherDetails from '@/components/WeatherDetails';
import WeatherForecast from '@/components/WeatherForecast';
import { useForecastQuery, useWeatherQuery } from '@/hooks/use-weather';
import { AlertCircleIcon } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom'

export default function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")
  const coordinates = { lat, lon }
  const weatherQuery = useWeatherQuery(coordinates)
  const foreCastQuery = useForecastQuery(coordinates)



  if (weatherQuery.error || foreCastQuery.error) {
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon className='h-4 w-4' />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className='flex flex-col gap-4'>
        <p>Faild to fetch weather data. Please try again</p>
      </AlertDescription>
    </Alert>
  }
  if (weatherQuery.isLoading || foreCastQuery.isLoading || !params.cityName) {
    return <LoadingSkeleton />
  }

  return <>
    <div className='space-y-4 '>
      {/* Favorite Cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>{params.cityName},{weatherQuery.data?.sys.country}</h1>
        <div>
          <Favoritebutton data={{ ...weatherQuery.data ?? { coord: { lat: 0, lon: 0 }, weather: [], base: '', main: { temp: 0, pressure: 0, humidity: 0, temp_min: 0, temp_max: 0, feels_like: 0 }, wind: { speed: 0, deg: 0 }, clouds: { all: 0 }, name: '', sys: { sunrise: 0, sunset: 0, country: '' } }, name: params.cityName }} />
        </div>
      </div>
      <div className='grid gap-6 '>
        <div className='flex flex-col lg:flex-row gap-4 '>
          {/* current weather */}
          <CurrentWeather data={weatherQuery?.data ?? { coord: { lat: 0, lon: 0 }, weather: [], base: '', main: { temp: 0, pressure: 0, humidity: 0, temp_min: 0, temp_max: 0, feels_like: 0 }, wind: { speed: 0, deg: 0 }, clouds: { all: 0 }, name: '', sys: { sunrise: 0, sunset: 0, country: '' } }} locationName={{ country: '', lat: 0, lon: 0, name: '', state: '' }} />
          {/* hourly temprature */}
          <HourlyTemprature data={foreCastQuery?.data ?? { list: [], city: { name: '', country: '', sunrise: 0, sunset: 0 } }} />
        </div>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* details */}
          <WeatherDetails data={weatherQuery?.data ?? { coord: { lat: 0, lon: 0 }, weather: [], base: '', main: { temp: 0, pressure: 0, humidity: 0, temp_min: 0, temp_max: 0, feels_like: 0 }, wind: { speed: 0, deg: 0 }, clouds: { all: 0 }, name: '', sys: { sunrise: 0, sunset: 0, country: '' } }} />
          {/* forecast */}
          <WeatherForecast data={foreCastQuery?.data ?? { list: [], city: { name: '', country: '', sunrise: 0, sunset: 0 } }} />
        </div>
      </div>

    </div>

  </>
} 
