import AlertError from '@/components/AlertError'
import CurrentWeather from '@/components/CurrentWeather'
import FavoriteCities from '@/components/FavoriteCities'
import HourlyTemprature from '@/components/HourlyTemprature'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherForecast from '@/components/WeatherForecast'
import { useGeoLocation } from '@/hooks/use-geolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/use-weather'
import { AlertCircleIcon, MapPin, RefreshCcw } from 'lucide-react'



export default function WeatherDashboard() {
  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeoLocation()

  const weatherQuery = useWeatherQuery(coordinates)
  const foreCastQuery = useForecastQuery(coordinates)
  const locationQuery = useReverseGeocodeQuery(coordinates)

  // console.log(weatherQuery.data)

  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weatherQuery.refetch();
      foreCastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if (locationLoading  ) {
    return <LoadingSkeleton />
  }
  if (locationError) {
    return <AlertError locationError={locationError} getLocation={getLocation} />
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive" className="max-w-md">
        <AlertCircleIcon className='h-4 w-4' />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Please enable location access to see your local weather.</p>
          <Button onClick={getLocation} variant={"outline"} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (weatherQuery.error || foreCastQuery.error) {
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon className='h-4 w-4' />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className='flex flex-col gap-4'>
        <p>Faild to fetch weather data. Please try again</p>
        <Button onClick={handleRefresh} variant={"outline"} className='w-fit'>
          <RefreshCcw className='mr-2 h-4 w-4' />
          retry
        </Button>
      </AlertDescription>
    </Alert>
  }

  if (weatherQuery.isLoading || foreCastQuery.isLoading ) {
  return <LoadingSkeleton />
}
  const locationName = locationQuery.data?.[0] ;
  
  return <>
      <div className='space-y-4 '>
      {/* Favorite Cities */}
      <FavoriteCities/> 
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button variant='outline' size={"icon"} onClick={handleRefresh} disabled={weatherQuery.isFetching || foreCastQuery.isFetching} className='cursor-pointer' >
          <RefreshCcw className={`h-4 w-4  ${weatherQuery.isFetching?"animate-spin":null}`} />
        </Button>
      </div>
      <div className='grid gap-6 '>
        <div className='flex flex-col lg:flex-row gap-4 '>
          {/* current weather */} 
          <CurrentWeather locationName={locationName ?? {country:'',lat:0,lon:0,name:'',state:''}} data={weatherQuery?.data ?? {coord:{lat:0,lon:0},weather:[],base:'',main:{temp:0,pressure:0,humidity:0,temp_min:0,temp_max:0,feels_like:0},wind:{speed:0,deg:0},clouds:{all:0},name:'',sys:{sunrise:0,sunset:0,country:''}}}/>  
          {/* hourly temprature */}
          <HourlyTemprature data={foreCastQuery?.data ?? {list:[],city:{name:'',country:'',sunrise:0,sunset:0}}}/> 
        </div>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* details */}
          <WeatherDetails data={weatherQuery?.data ?? {coord:{lat:0,lon:0},weather:[],base:'',main:{temp:0,pressure:0,humidity:0,temp_min:0,temp_max:0,feels_like:0},wind:{speed:0,deg:0},clouds:{all:0},name:'',sys:{sunrise:0,sunset:0,country:''}}}/>
          {/* forecast */} 
          <WeatherForecast data={foreCastQuery?.data ?? {list:[],city:{name:'',country:'',sunrise:0,sunset:0}}}/>
        </div>
        
      </div>


    </div>



  </>
}

