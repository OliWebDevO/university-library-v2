'use server';

import { db } from '@/database/drizzle';
import { users } from '@/database/schema';
import { eq } from 'drizzle-orm';

export const approveUser = async (userId: string) => {
  try {
    await db
      .update(users)
      .set({ status: 'approved' }) // Update the status to 'approved'
      .where(eq(users.id, userId)); // Match the user by ID
    return { success: true };
  } catch (error) {
    console.error('Error approving user:', error);
    return { success: false, error: 'Failed to approve user' };
  }
};

export const revertUser = async (userId: string) => {
  try {
    await db
      .update(users)
      .set({ status: 'pending' }) // Update the status back to 'pending'
      .where(eq(users.id, userId)); // Match the user by ID
    return { success: true };
  } catch (error) {
    console.error('Error reverting user:', error);
    return { success: false, error: 'Failed to revert user' };
  }
};