import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Image from "next/image";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //add some info about currently loggedIn user:
  const loggedIn = await getLoggedInUser()
  //check user is loggedin then redirect to 
  //use redirect because its not use client component
  if(!loggedIn) redirect('/sign-in');



  return (
    <main className="flex h-screen w-full font-inter">
      {/*because all components contain sidebar its root layout */}
      <Sidebar user={loggedIn}/>

      {/**also add sidebar for mobile devices */}
      <div className="flex flex-col size-full">
        <div className="root-layout">
          <Image src='/icons/logo.svg' alt="logoImage" width={30} height={30}/>
          {/**add MobileNavbar */}
          <MobileNav user={loggedIn}/>
        </div>
        {children}
      </div>
    </main>
  );
}
