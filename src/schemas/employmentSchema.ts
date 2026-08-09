import { z } from 'zod';

export const employmentSchema = z
  .object({
    employmentType: z.enum(['Salaried', 'Self-Employed'], {
      errorMap: () => ({ message: 'Please select employment type.' }),
    }),
    employerOrBusinessName: z
      .string()
      .min(1, { message: 'Name is required.' })
      .min(2, { message: 'Name must be at least 2 characters.' }),
    jobTitle: z.string().optional(),
    businessType: z.string().optional(),
    income: z
      .union([
        z.number(),
        z.string().transform((val) => (val === '' || val === null || val === undefined || Number.isNaN(Number(val)) ? undefined : Number(val))),
      ])
      .pipe(
        z
          .number({
            required_error: 'Income is required.',
            invalid_type_error: 'Income is required.',
          })
          .positive({ message: 'Income must be greater than zero.' })
      ),
    workExperience: z.string().min(1, { message: 'Please select work experience.' }),
  })
  .superRefine((data, ctx) => {
    if (data.employmentType === 'Salaried') {
      if (!data.jobTitle || data.jobTitle.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Job title is required.',
          path: ['jobTitle'],
        });
      } else if (data.jobTitle.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Job title must be at least 2 characters.',
          path: ['jobTitle'],
        });
      }
    } else if (data.employmentType === 'Self-Employed') {
      if (!data.businessType || data.businessType.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Business type is required.',
          path: ['businessType'],
        });
      } else if (data.businessType.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Business type must be at least 2 characters.',
          path: ['businessType'],
        });
      }
    }
  });

export type EmploymentFormData = z.input<typeof employmentSchema>;
