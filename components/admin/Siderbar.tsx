'use client';
import { adminSideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Siderbar = () => {
    const pathname = usePathname();
  return (
    <div className='admin-sidebar'>
        <div>
            <div className='logo'>
                <Image src="/icons/logo.svg" alt='logo' width={37} height={37} />
                <h1>BookWise</h1>
            </div>
            <div className='mt-10 flex flex-col gap-5'>
                {adminSideBarLinks.map((link) => {
                   const isSelected = (link.route != '/admin' && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                   return (
                    <Link href={link.route} key={link.route}>
                        <div className={cn(
                            'link',
                            isSelected && 'bg-primary-admin shadow-sm',
                        )}>
                            <div className='relative size-5'>
                                <Image src={link.img} alt='icon' fill className={`${isSelected ? 'brightness-0 invert' : ''} object-contain`}></Image>
                            </div>
                            <p className={cn(isSelected ? 'text-white' : 'text-dark')}>
                                {link.text}
                            </p>
                        </div>
                    </Link>
                   )
                })}
            </div>
        </div>
    </div>
  )
}

export default Siderbar