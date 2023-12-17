

export type initialValuesProps = {
    startDestination: string,
    endDestination: string
    stopage: stopageProps[]
    vehicle: string,
    model: string
    startDate:string
    
}

export type stopageProps = {
    text:string
}

export type vehicleProps = {
    brand: string,
    models:string[]
}


export type markerProps = {
    id: number,
    position:number[]
}



