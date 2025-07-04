import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PasskeyModal from "@/components/PasskeyModal";
import Logo from "@/components/Logo";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import Image from "next/image";

function HomeContent() {
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'true';

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Logo />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 HealthSync
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="Patient onboarding"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}