'use client';
import React from 'react';
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { cancelBorrowBook } from '@/lib/actions/book';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { stopBorrowing } from '@/store/borrowingSlice';

interface Props {
    userId: string;
    bookId: string;
}

const CancelBorrowBookButton = ({ userId, bookId }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const borrowingBooks = useSelector((state: RootState) => state.borrow.borrowingBooks);
    const isBorrowing = borrowingBooks.includes(bookId); // Check if the book is being borrowed

    const handleCancelBorrow = async () => {
        if (!isBorrowing) return; // Prevent multiple clicks

        try {
            const result = await cancelBorrowBook({ bookId, userId });

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Book unborrowed successfully.',
                });
                dispatch(stopBorrowing(bookId)); // Remove the book from the borrowing state
                router.refresh(); // Refresh the page to reflect changes
            } else {
                toast({
                    title: 'Error',
                    description: result.message || 'Failed to unborrow the book.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while unborrowing the book.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Button
            className='book-overview_btn'
            onClick={handleCancelBorrow}
            disabled={!isBorrowing} // Disable the button if the book is not being borrowed
        >
            <Image src='/icons/book.svg' className='' alt='arrow-right' width={20} height={20} />
            <p className='font-bebas-neue text-xl text-dark-100'>
                {isBorrowing ? 'Cancel Borrow' : 'Cancel Borrow'}
            </p>
        </Button>
    );
};

export default CancelBorrowBookButton;