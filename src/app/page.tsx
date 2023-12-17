"use client"
import Header from './component/Header'
import { Form, Formik, FormikValues, FormikProps, FieldArray } from 'formik'
import { initialValuesProps } from './defs/def'
import Input from './component/Input'
import Map from './component/Map'
import Button from './component/Button'
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';
import Swap from "./utils/swap.svg"
import { SelectInput } from './component/Input'
import { vehicles } from './defs/constant'
import { useState } from 'react'
import { LeafletMouseEvent } from 'leaflet'


export default function Home() {
 const [markers, setMarkers] = useState([
    { id: 1, position: [51.505, -0.09] }, 
    { id: 2, position: [51.51, -0.1] },   
  ]);
  
  const handleMapClick = (event:LeafletMouseEvent, markerId: number) => {
  console.log("h1")
    // Add a new marker to the map
    const newMarker = {
      id: markers.length + 1,
      position: [event.latlng.lat, event.latlng.lng],
    };

    setMarkers([...markers, newMarker]);
  };

  const handleSwapValue = (formikProps: FormikProps<FormikValues>) => {
    const newStartDestination = formikProps.values.endDestination;
    const newEndDestination = formikProps.values.startDestination;

    formikProps.setValues({
      ...formikProps.values,
      startDestination: newStartDestination,
      endDestination: newEndDestination,
    });
  }

  const intialValues: initialValuesProps = {
    startDestination: "",
    endDestination: "",
    stopage: [{ text: "" }],
    vehicle: "",
    model: "",
    startDate: ""


  }
  const addValues = (formikProps: FormikProps<FormikValues>) => {

    formikProps.setValues({
      ...formikProps.values,
      stopage: [...formikProps.values.stopage, { text: "" }],
    });
  }
  const removeValues = (index: number, formikProps: FormikProps<FormikValues>) => {
    const newFields = [...formikProps.values.stopage];
    newFields.splice(index, 1);
    formikProps.setValues({
      ...formikProps.values,
      stopage: newFields,
    });
  }

  return (
    <main className="w-full min-h-screen flex gap-14 flex-col">
      <div className='relative'>
        <Header />

      </div>
      <div className='flex flex-row w-full p-5'>
        <div className='flex w-3/4'>
          <Formik
            initialValues={intialValues}
            onSubmit={(values: FormikValues) => {
              console.log(values)
            }}>
            {(formikProps: FormikProps<FormikValues>) => (
              <Form className='w-full'>
                <div className='flex flex-col gap-4 '>
                  <Input
                    type="text"
                    name="startDestination"
                    label={'Start Destination'}
                    placeholder={'Enter Start Destination'}
                    id={'start-destination'}
                    divId={'startdestination'}

                  />
                  <div className='item'>

                    <Button url={Swap} name={'swap'} type={"button"} id={'swap'} onClick={() => handleSwapValue(formikProps)} />
                  </div>
                  <Input type="text" name="endDestination" label={'End Destination'} placeholder={'Enter End Destination'} id={'end-destination'} divId={'startdestination'} />

                  <div className="flex flex-col gap-4">
                    <div>

                      {Array.isArray(formikProps.values.stopage) &&
                        formikProps.values.stopage.map((stopage, index) => (
                          <div key={index}>
                            <Input
                              name={`stopage[${index}].text`}
                              label={`Stopage ${index + 1}`}
                              placeholder={`Enter ${index + 1}st Stopage `}
                              id={`stopage${index + 1}`}
                              divId={`stopage${index + 1}`}
                              type={'text'}
                            />
                            <Button type="button" onClick={() => removeValues(index, formikProps)} name={'remove'} id={'remove-field'} />
                          </div>
                        ))}
                    </div>
                    <div>

                      {formikProps.values.startDestination && formikProps.values.endDestination ?
                        <Button name={'Add destination'} type={"button"} id={'add-destination'} onClick={() => addValues(formikProps)} /> : <span></span>
                      }
                    </div>

                  </div>
                  <div className='flex flex-col gap-4'>
                    <div>
                      <SelectInput label={'Select Vehicle'} type={'select'} id={'vehicle'} name={'vehicle'} divId={'vechicle'} item={vehicles} />

                    </div>
                    <div>
                      {vehicles.filter((vehicle) => vehicle.brand === formikProps.values.vehicle)
                        .map((filteredVehicle, index) => (
                          <SelectInput
                            key={index}
                            label={'Vehicle Model'}
                            type={'select'}
                            id={'model'}
                            name={'model'}
                            divId={'model'}
                            item={filteredVehicle.models}
                          />
                        ))}

                    </div>
                  </div>
                  <div className='flex flex-col '>
                    <label> Departure Time</label>
                    <DatePicker
                      name="startDate"
                      className='flex h-10  rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50'
                      selected={formikProps.values.startDate}
                      onChange={(date) => formikProps.setFieldValue("startDate", date)}
                      showTimeSelect
                      placeholderText='Enter Date and Time'
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>
                  <div className='flex justify-center items-center'>
                    <Button name={'Submit'} type={"submit"} id={'submit-button'} />

                  </div>


                </div>


              </Form>

            )
            }





          </Formik>
        </div>
        <div className='flex w-full'>

          <Map markers={ markers} handleMapClick={handleMapClick} />
        </div>
      </div>
    </main>
  )
}
