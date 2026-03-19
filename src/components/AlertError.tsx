import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertCircleIcon, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { AlertErrorProps } from '@/api/type'

export default function AlertError({ locationError ,getLocation}:AlertErrorProps) {
    return <>
        <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon className='h-4 w-4' />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className='flex flex-col gap-4'>
                <p>{locationError}</p>
                <Button onClick={getLocation} variant={"outline"} className='w-fit'> 
                    <MapPin className='mr-2 h-4 w-4'/> 
                    Enable Location
                </Button>
            </AlertDescription>
        </Alert>

        


    </>
}
