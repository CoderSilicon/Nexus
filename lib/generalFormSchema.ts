import { z } from "zod";

export const optionalStringZod = z.string().trim().optional().or(z.literal(""));
export const generalFormSchema = z.object({
  title: optionalStringZod,
  description: optionalStringZod,
});

export type GeneralSchemaInfoVals = z.infer<typeof generalFormSchema>;

export const personalInfoSchema = z.object({
  firstName: optionalStringZod,
  lastName: optionalStringZod,
  jobTitle: optionalStringZod,
  city: optionalStringZod,
  country: optionalStringZod,
  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  email: z.string().trim().email().optional(),
});

export type PersonalInfoVal = z.infer<typeof personalInfoSchema>;
