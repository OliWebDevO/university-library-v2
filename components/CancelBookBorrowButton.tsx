'use client';
import React, { useState } from 'react';
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { cancelBorrowBook } from '@/lib/actions/book';

interface Props {
    userId: string;
    bookId: string;
}

const CancelBorrowBookButton = ({ userId, bookId }: Props) => {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(false); // State to disable the button

    const handleCancelBorrow = async () => {
        if (isDisabled) return; // Prevent multiple clicks
        setIsDisabled(true); // Disable the button immediately

        try {
            const result = await cancelBorrowBook({ bookId, userId });

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Book unborrowed successfully.',
                });
                router.refresh(); // Refresh the page to reflect changes
            } else {
                toast({
                    title: 'Error',
                    description: result.message || 'Failed to unborrow the book.',
                    variant: 'destructive',
                });
                setIsDisabled(false); // Re-enable the button if the operation fails
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while unborrowing the book.',
                variant: 'destructive',
            });
            setIsDisabled(false); // Re-enable the button if an error occurs
        }
    };

    return (
        <Button
            className='book-overview_btn'
            onClick={handleCancelBorrow}
            disabled={isDisabled} // Disable the button based on state
        >
            <Image src='/icons/book.svg' className='' alt='arrow-right' width={20} height={20} />
            <p className='font-bebas-neue text-xl text-dark-100'>
                {isDisabled ? 'Canceling...' : 'Cancel Borrow'}
            </p>
        </Button>
    );
};

export default CancelBorrowBookButton;