export interface Coordinates {
    lat:number;
    lon:number;
} 

export interface weatherCondition{
    id:number;
    main:string;
    description:string;
    icon:string;
}

export interface WeatherData {
    coord:Coordinates;
    weather:weatherCondition[];
    base:string;
    main:{
        temp:number;
        pressure:number;
        humidity:number;
        temp_min:number;
        temp_max:number;
        feels_like:number;
    };
    wind:{
        speed:number;
        deg:number;
    };
    clouds:{
        all:number;
    };
    name:string;
    sys:{
        sunrise:number;
        sunset:number;
        country:string;
    } 
}

export interface ForecastData {
    list:Array<{
        dt:number;
        main:WeatherData["main"];
        weather:WeatherData['weather'];
        wind:WeatherData["wind"];
        dt_txt:string;
    }>;
    city:{
        name:string;
        country:string;
        sunrise:number;
        sunset:number;
    }
}

export interface GeocodingResponse {
    name:string;
    local_name?:Record<string,string>;
    lat:number;
    lon:number;
    country:string;
    state:string;
} 

export interface AlertErrorProps {
  locationError: string;
  getLocation: () => void;
}