import Image from 'next/image'
const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2 mb-12 h-10 w-[75%] max-w-full">
            <Image
              src="/assets/icons/logo.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-2xl"
            />
            <h1 className="font-poppins font-semibold">HealthSync</h1>
          </div>
  )
}

export default Logo;
