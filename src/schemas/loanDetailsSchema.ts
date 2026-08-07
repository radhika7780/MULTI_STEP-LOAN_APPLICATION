import { z } from 'zod';

export const loanDetailsSchema = z.object({
  loanType: z.string().min(1, { message: 'Please select a loan type.' }),
  loanAmount: z.preprocess(
    (val) => (val === '' || val === null || val === undefined || Number.isNaN(Number(val)) ? undefined : Number(val)),
    z
      .number({
        required_error: 'Loan amount is required.',
        invalid_type_error: 'Loan amount is required.',
      })
      .positive({ message: 'Loan amount must be greater than zero.' })
  ),
  loanPurpose: z.string().min(1, { message: 'Please select loan purpose.' }),
  loanTenure: z.string().min(1, { message: 'Please select loan tenure.' }),
});

export type LoanDetailsFormData = z.infer<typeof loanDetailsSchema>;

export const zodResolver = (schema: z.ZodSchema) => async (values: Record<string, unknown>) => {
  const result = await schema.safeParseAsync(values);
  if (result.success) {
    return { values: result.data, errors: {} };
  }
  const errors: Record<string, { type: string; message: string }> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join('.');
    if (!errors[path]) {
      errors[path] = { type: err.code, message: err.message };
    }
  });
  return { values: {}, errors };
};
