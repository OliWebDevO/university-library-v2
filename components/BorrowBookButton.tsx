'use client';
import React from 'react';
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { borrowBook } from '@/lib/actions/book';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { startBorrowing, stopBorrowing } from '@/store/borrowingSlice';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    };
}

const BorrowBookButton = ({ userId, bookId, borrowingEligibility: { isEligible, message } }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const borrowingBooks = useSelector((state: RootState) => state.borrow.borrowingBooks);
    const isBorrowing = borrowingBooks.includes(bookId); // Check if the book is being borrowed

    const handleBorrow = async () => {
        if (isBorrowing) return; // Prevent multiple clicks
        dispatch(startBorrowing(bookId)); // Mark the book as being borrowed

        if (!isEligible) {
            toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            });
            dispatch(stopBorrowing(bookId)); // Re-enable the button if the user is not eligible
            return;
        }

        try {
            
            const result = await borrowBook({ bookId, userId });

            if (result.success) {
                toast({
                    title: 'Success',
                    description: 'Book borrowed successfully.',
                });
                router.push('/my-profile'); // Redirect to the profile page
            } else {
                toast({
                    title: 'Error',
                    description: 'You have already borrowed that book.',
                    variant: 'destructive',
                });
                dispatch(stopBorrowing(bookId)); // Re-enable the button if the operation fails
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while borrowing the book.',
                variant: 'destructive',
            });
            dispatch(stopBorrowing(bookId)); // Re-enable the button if an error occurs
        }
    };

    return (
        <Button
            className="book-overview_btn"
            onClick={handleBorrow}
            disabled={isBorrowing} // Disable the button based on Redux state
        >
            <Image src="/icons/book.svg" alt="arrow-right" width={20} height={20} />
            <p className="font-bebas-neue text-xl text-dark-100">
                {isBorrowing ? 'Borrowed' : 'Borrow Book'}
            </p>
        </Button>
    );
};

export default BorrowBookButton;