import Logo from "@/components/Logo";
import Image from "next/image";
import Link  from "next/link";
import RegisterForm from "@/components/forms/RegisterForm"
import {getUser} from "@/lib/actions/patient.actions";

const Register = async ({ params: {userId}}: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen ">
      <section className="remove-scrollbar container  ">
        <div className="sub-container items-center max-w[860px] flex-1 flex-col py-10">
          <Logo/>
          <RegisterForm user={user}/>
          <div className="text-14-regular mt-20 flex flex-row justify-between w-[75%]">
            <p className="text-dark-600 xl:text-left">© 2025 HealthSync</p> 
          </div>
        </div>
      </section>
      <Image
       src="/assets/images/register-img.png" 
       alt="patient onboarding image"
       height={1000}
       width={1000}
       className="side-img max-w-[390px]"
      />
    </div>
  )
}

export default Register
