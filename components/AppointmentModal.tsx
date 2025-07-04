"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import { Ghost } from 'lucide-react';
import { Appointment } from '@/types/appwrite.types';
import {NewAppointmentForm} from './forms/NewAppointmentForm';

const AppointmentModal = ({type, 
    patientId,
    userId,
    appointment
}: {
    type : "schedule" | "cancel",
    patientId: string,
    userId: string,
    appointment?: Appointment
}) => {
    const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
        <Button asChild variant="ghost" className={`capitalize ${type === 'schedule' && 'text-green-500'} ${type==='cancel' && 'text-red-500'}`}>
          <span>{type}</span>
        </Button>
      </DialogTrigger>
        <DialogContent className='shad-dialog'>
            <DialogHeader className='mb-4 space-y-3'>
            <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
            <DialogDescription>
                Please fill in the following details to {type} an appointment
            </DialogDescription>
            </DialogHeader>

            <NewAppointmentForm
                userId={userId}
                patientId={patientId}
                type={type}
                appointment={appointment}
                setOpen={setOpen}
             />
        </DialogContent>
        </Dialog>
    </div>
  )
}

export default AppointmentModal
