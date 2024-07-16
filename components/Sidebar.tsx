'use client';
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({user}: SiderbarProps) => {

    const pathname = usePathname();

  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href='/' className='flex mb-12 cursor-pointer items-center gap-2'>
            <Image src='/icons/logo.svg' width={34} height={34} alt='logo image' className='size-[50px] max-xl:14'/>
            <h1 className='sidebar-logo'>Horizon</h1>
            </Link>

            {/**mapping over sidebar links from sidebarLinks */}
            {sidebarLinks.map((item)=>{
                const isActive = pathname === item.route  || pathname.startsWith(`${item.route}/`)

                {/**below are the dynamically set the css class */}
                return (
                    <Link href={item.route} key={item.label} className={cn('sidebar-link', {
                    'bg-bank-gradient': isActive
                    })}>

                    <div className='relative size-6'>
                        <Image src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({
                            'brightness-[3] invert-0': isActive
                        })}/>
                    </div>

                    <p className={cn('sidebar-label', {
                        '!text-white' : isActive
                    })}>{item.label}</p>
                    </Link>
                )
            })}

            {/**add USER part here */}
            USER
        </nav>
        {/**add some footer part here */}
        FOOTER
    </section>
  )
}

export default Sidebar