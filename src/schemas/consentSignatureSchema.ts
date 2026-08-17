import { z } from 'zod';

export const consentSignatureSchema = z.object({
  applicationDeclaration: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the application declaration.',
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the Terms & Conditions.',
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must provide privacy consent.',
  }),
  signatureName: z
    .string()
    .min(2, 'Signature name must be at least 2 characters.'),
  finalAcknowledgement: z.boolean().refine((val) => val === true, {
    message: 'You must confirm the final acknowledgement.',
  }),
});

export type ConsentSignatureFormData = z.infer<typeof consentSignatureSchema>;
