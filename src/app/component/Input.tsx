import React from 'react'
import { Field, FieldArray, } from 'formik'
import { vehicleProps } from '../defs/def'
type Props = {
    label: string,
    placeholder: string
    id: string
    divId: string
    name: string
    type: string
    
}

type ModelSelectProps = {
  label: string;
  type: string;
  id: "model"; // 'model' for the model case
  name: string;
  divId: string;
  item: string[]; // Assuming 'item' is an array of strings for models
};

type VehicleSelectProps = {
  label: string;
  type: string;
  id: "vehicle"; // 'vehicle' for the vehicle case
  name: string;
  divId: string;
  item: { brand: string }[]; // Assuming 'item' is an array of objects with a 'brand' property
};


const TextInput = ({ divId, label, placeholder, id, name, type }: Props) => {
    return (
        <div id={divId} className="w-full ">
            <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

            >
                {label}
            </label>
            <Field
                className="flex h-10  rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type={type}
                placeholder={placeholder}
                id={id}
                name={name}
            />
        </div>
    )
}

export const SelectInput = ({label,item,type,id,name,divId}:VehicleSelectProps|ModelSelectProps) => {
   
    if (id === "model") {
        return (
        <div id={divId}>
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
            <Field
            as={type}
            id={id}
            name={name}
            className="flex h-10   rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option  value="" disabled>
              {label}
            </option>
            {item.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </Field>
        </div>
         
    )
    }
    if (id === "vehicle") {
         return (
        <div id={divId}>
            <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {label}
            </label>
            <Field
            as={type}
            id={id}
            name={name}
            className="flex h-10   rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option  value="" disabled>
              {label}
            </option>
            {item.map((item, index) => (
              <option key={index} value={item?.brand}>
                {item?.brand}
              </option>
            ))}
          </Field>
        </div>
         
    )
    }
   
   
}




export default function Input({ divId, label, placeholder, id, name, type }: Props) {
    if (type === "text") {
        return (
            <TextInput label={label} placeholder={placeholder} id={id} divId={divId} name={name} type={type}/>
        )
    }

    if (type === "select") {
        return 
    }
    
}