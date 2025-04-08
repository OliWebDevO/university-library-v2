'use client'
import React, { useState } from 'react'
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    }
}

const BorrowBookButton = ({userId, bookId, borrowingEligibility: {isEligible, message}}: Props) => {

    const router = useRouter()
    const [borrowing, setBorrowing] = useState(false)

    const handleBorrow = async () => {

        if (!isEligible) {
           toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            })
        }

        setBorrowing(true)
        try {
            const result = await borrowBook({bookId, userId})

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Book borrowed successfully',
                })
                router.push('/my-profile')
            } else { 
                toast({
                    title: 'Error',
                    description: 'You have already borrowed that book',
                    variant: 'destructive',
                })
            }

        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occured while borrowing book',
                variant: 'destructive',
            })
        } finally {
            setBorrowing(false)
        }
    }

  return (
    <Button className='book-overview_btn' onClick={handleBorrow} disabled={borrowing} >
        <Image src='/icons/book.svg' alt='arrow-right' width={20} height={20} />
        <p className='font-bebas-neue text-xl text-dark-100'>
            {borrowing ? 'Borrowing...' : 'Borrow Book'}
        </p>
    </Button>
  )
}

export default BorrowBookButton