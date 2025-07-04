import Image from "next/image";
import styles from "./page.module.css";
import {Button} from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import Logo from "@/components/Logo";
import {NewAppointmentForm} from "@/components/forms/NewAppointmentForm";
import {getPatient} from "@/lib/actions/patient.actions";


export default async function NewAppointment({params : {userId}}: SearchParamProps) {
    const patient = await getPatient(userId);
  return (
    <div className="flex h-screen ">
      <section className="remove-scollbar container my-auto">
        <div className="sub-container items-center max-w[860px] flex-1 justify-between">
          <Logo/>
          
          <NewAppointmentForm type="create" userId={userId} patientId={patient.$id}/>
          
            <p className="mt-10 justify-items-end text-dark-600 xl:text-left">© 2025 HealthSync</p> 
            
        </div>
      </section>
      <Image
       src="/assets/images/appointment-img.png" 
       alt="patient onboarding image"
       height={1000}
       width={1000}
       className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
