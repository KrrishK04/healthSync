"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import SubmitButton from "@/components/ui/SubmitButton"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"

import CustomFormField from "@/components/CustomFormField" 
import { useState } from "react"

import {UserFormValidation} from "@/lib/validation"
import {useRouter} from "next/navigation"
import {createUser} from "@/lib/actions/patient.actions"
export enum FormFieldType{
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = 'checkbox',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton'
}

export default function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
    try{
      const userData = {name, email, phone};
      const result = await createUser(userData);
      if (result?.user) {
        if (result.isNew) {
          router.push(`/patients/${result.user.$id}/register`);
        } else {
          router.push(`/patients/${result.user.$id}/new-appointment`);
        }
      }

    }catch(error){
      console.log(error);
    }
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 w-[75%]">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>   
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Name"
          placeholder="Full Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user icon"
          control={form.control}
         />

         <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="email@xyz.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email-icon"
          control={form.control}
         />

         <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone"
          placeholder="+1 234 567 890"
          iconSrc="/assets/icons/phone.svg"
          iconAlt="phone-icon"
          control={form.control}
         />
         <SubmitButton isLoading={isLoading}>
          Get Started
         </SubmitButton>
      </form>
    </Form>
  );
}   