import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import StatCard from '@/components/StatCard'
import { getAppointment, getRecentAppointmentList } from '@/lib/actions/appointment.action'
import {DataTable} from '@/components/table/DataTable'
import {columns} from '@/components/table/columns'
import { Appointment } from '@/types/appwrite.types'

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  // console.log(appointments.documents);
  return (
    <div className='remove-scrollbar bg-dark-400 '>
        <div className='mx-auto flex max-w-7xl flex-col space-y-10 '>
          <header className='admin-header h-20'>
              <Link href="/" className='pt-12'>
                <Logo/>
              </Link>
              <p className='text-16-semibold '>Admin Dashboard</p>
          </header>

          <main>
            <section className='w-full space-y-4 px-14'>
              <h1 className='header '>
                Welcome 👋
              </h1>
              <p className='text-dark-700'> Start Today with managing new appointments </p>
            </section>
            
            <section className='admin-stat py-6  px-14'>
              <StatCard
                type="appointments"
                count={appointments.scheduledCount}
                label = "Scheduled Appointments"
                icon="assets/icons/appointments.svg"
              />
              <StatCard
                type="pending"
                count={appointments.pendingCount}
                label = "Pending Appointments"
                icon="assets/icons/pending.svg"
              />
              <StatCard
                type="cancelled"
                count={appointments.cancelledCount}
                label = "Cancelled Appointments"
                icon="assets/icons/cancelled.svg"
              />
            </section>
            <div className='px-14'>
              <DataTable columns={columns} data={appointments.documents}  />
            </div>

          </main>
      </div>
    </div>
    
  )
}

export default Admin;
