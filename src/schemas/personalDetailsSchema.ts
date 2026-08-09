import { z } from 'zod';

export const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required.' })
    .min(2, { message: 'First name must be at least 2 characters.' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'First name can contain only letters.' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required.' })
    .min(2, { message: 'Last name must be at least 2 characters.' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Last name can contain only letters.' }),
  dateOfBirth: z
    .string()
    .min(1, { message: 'Date of birth is required.' })
    .refine(
      (val) => {
        if (!val) return false;
        const birthDate = new Date(val);
        if (isNaN(birthDate.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      },
      { message: 'Applicant must be at least 18 years old.' }
    ),
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: 'Please select gender.' }),
  }),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, { message: 'Mobile number must be exactly 10 digits.' }),
  email: z
    .string()
    .min(1, { message: 'Please enter a valid email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  maritalStatus: z.enum(['Single', 'Married', 'Divorced', 'Widowed'], {
    errorMap: () => ({ message: 'Please select marital status.' }),
  }),
});

export type PersonalDetailsFormData = z.infer<typeof personalDetailsSchema>;
