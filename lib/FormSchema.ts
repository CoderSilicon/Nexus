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

export const workexperienceSchema = z.object({
  workExperience: z
    .array(
      z.object({
        position: optionalStringZod,
        company: optionalStringZod,
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        description: optionalStringZod,
      })
    )
    .optional(),
});
export type WorkExperienceVals = z.infer<typeof workexperienceSchema>;

export const educationSchema = z.object({
  education: z
    .array(
      z.object({
        degree: optionalStringZod,
        school: optionalStringZod,
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        description: optionalStringZod,
      })
    )
    .optional(),
});
export type EducationVals = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional(),
});
export type SkillsVals = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
  summary: optionalStringZod,
});
export type SummaryVals = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalFormSchema.shape,
  ...personalInfoSchema.shape,
  ...workexperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
});

export type ResumeSchemaVals = z.infer<typeof resumeSchema> & {
  id?: string;
};
