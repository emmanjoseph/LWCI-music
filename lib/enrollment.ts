import * as z from "zod";

export const COURSES = [
    { value: "piano", label: "Piano" },
    { value: "solo-guitar", label: "Solo Guitar" },
    { value: "bass-guitar", label: "Bass Guitar" },
    { value: "acoustic-guitar", label: "Acoustic Guitar" },
    { value: "vocals", label: "Vocal Training" },
    { value: "drums", label: "Drums" },
] as const;

export const FEE_PAYERS = [
    { value: "self", label: "Myself" },
    { value: "parent", label: "Parent / Guardian" },
    { value: "sponsor", label: "Sponsor / Employer" },
] as const;

const kenyanPhone = z
    .string()
    .trim()
    .refine(
        (v) => /^(?:\+?254|0)[17]\d{8}$/.test(v.replace(/[\s-]/g, "")),
        "Enter a valid Kenyan number, e.g. 0712 345 678"
    );

export const enrollmentSchema = z.object({
    firstName: z.string().trim().min(2, "First name is too short").max(32, "Max 32 characters"),
    surname: z.string().trim().min(2, "Surname is too short").max(32, "Max 32 characters"),
    age: z
        .string()
        .trim()
        .refine((v) => /^\d{1,2}$/.test(v) && +v >= 3 && +v <= 99, "Enter an age between 3 and 99"),
    course: z.string().refine((v) => COURSES.some((c) => c.value === v), "Please select a course"),
    phoneNumber: kenyanPhone,
    feePayer: z.string().refine((v) => FEE_PAYERS.some((f) => f.value === v), "Please select who pays"),
    contact: kenyanPhone,
    website: z.string().optional(), // honeypot, real users never fill this
});

export type EnrollmentValues = z.infer<typeof enrollmentSchema>;