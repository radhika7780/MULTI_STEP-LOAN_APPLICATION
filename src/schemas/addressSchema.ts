import { z } from 'zod';

export const addressSchema = z.object({
  currentAddressLine1: z
    .string()
    .min(1, { message: 'Address line 1 must be at least 5 characters.' })
    .min(5, { message: 'Address line 1 must be at least 5 characters.' }),
  currentAddressLine2: z.string().optional(),
  currentPinCode: z
    .string()
    .min(1, { message: 'PIN code must be exactly 6 digits.' })
    .regex(/^[0-9]{6}$/, { message: 'PIN code must be exactly 6 digits.' }),
  currentState: z.string().min(1, { message: 'Please select state.' }),
  currentCity: z.string().min(1, { message: 'Please select city.' }),
  currentPostOffice: z.string().min(1, { message: 'Please select post office.' }),

  permanentAddressLine1: z
    .string()
    .min(1, { message: 'Address line 1 must be at least 5 characters.' })
    .min(5, { message: 'Address line 1 must be at least 5 characters.' }),
  permanentAddressLine2: z.string().optional(),
  permanentPinCode: z
    .string()
    .min(1, { message: 'PIN code must be exactly 6 digits.' })
    .regex(/^[0-9]{6}$/, { message: 'PIN code must be exactly 6 digits.' }),
  permanentState: z.string().min(1, { message: 'Please select state.' }),
  permanentCity: z.string().min(1, { message: 'Please select city.' }),
  permanentPostOffice: z.string().min(1, { message: 'Please select post office.' }),

  sameAsCurrentAddress: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
