import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {Control, FieldPath, Form} from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')


//add interface of customInput
interface CustomInput {
        control: Control<z.infer<typeof formSchema>>,
        // name: 'email' | 'password',  //if we add another input here username want one single sourec of line
        name: FieldPath<z.infer<typeof formSchema>>,
        label: string,
        placeholder: string,
        // id: string; // Add id prop here
}

const CustomInput = ({control, name, label, placeholder}: CustomInput) => {

  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <div className='form-link'>
          <FormLabel className='form-label'>
            {label}
          </FormLabel>
          <div className='flex flex-col w-full'>
              <FormControl>
                  <Input
                   placeholder={placeholder}
                  className='input-class' type={name === 'password' ? 'password' : 'text'}
                  {...field}/>
              </FormControl>
              <FormMessage className="form-message mt-2" />
          </div>
      </div>
    )}
  />
  )
}

export default CustomInput