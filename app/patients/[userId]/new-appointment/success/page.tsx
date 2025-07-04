import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from "@/components/Logo"
import { getAppointment } from '@/lib/actions/appointment.action'
import {Doctors} from "@/constants/index"
import { format } from 'path'
import { formatDateTime } from '@/lib/utils'
import {Button} from "@/components/ui/button"


const Success = async ({params: {userId}, searchParams }:  SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointment = await getAppointment(appointmentId);
  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  // const appointmentId = (searchParams?.appointmentId as string) || "";
  // const appointment = await getAppointment(appointmentId);

  // const doctor = Doctors.find(
  //   (doctor) => doctor.name === appointment.primaryPhysician
  // );

  
  // console.log("Appointment Data - " + searchParams.appointementId)
  // console.log("This is the doctor object " + doctor);
  return (  
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href='/'>
            <Logo/>
        </Link>

        <section className='flex flex-col items-center'>
          <Image 
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt='success'
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className='text-green-400'>appointment request</span> has been successfully submitted
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        
        <section className="request-details">
          <p>Requested appointment details</p>
          <div className='flex items-center gap-3'>
            <Image
              src={doctor?.image!}
              alt='doctor image'
              width={100}
              height={100}
              className='size-6'
            />
            <p className='whitespace-nowrap'>{doctor?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image
              src="/assets/icons/calendar.svg"
              alt='calender icon'
              height={24}
              width={24}
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment 
          </Link>
        </Button>
        <p className='copyright'>© 2025 HealthSync</p>
      </div>
    </div>
  )
}

export default Success;
