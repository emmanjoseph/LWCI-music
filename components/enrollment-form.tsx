"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Control } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { COURSES, FEE_PAYERS, enrollmentSchema, type EnrollmentValues } from "@/lib/enrollment";
import { enroll } from "@/app/actions/enroll";
import {Checkbox} from "@/components/ui/checkbox";

function TextField({
                       control,
                       name,
                       label,
                       description,
                       ...inputProps
                   }: {
    control: Control<EnrollmentValues>;
    name: keyof EnrollmentValues;
    label: string;
    description?: string;
} & Omit<React.ComponentProps<"input">, "name" | "defaultValue">) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className={'text-muted-foreground'} htmlFor={`enroll-${name}`}>{label}</FieldLabel>
                    <Input
                        aria-label={'name'}
                        {...inputProps}
                        {...field}
                        value={field.value ?? ""}
                        id={`enroll-${name}`}
                        aria-invalid={fieldState.invalid}
                        className={'rounded-xl'}
                    />
                    {description && <FieldDescription>{description}</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}

function SelectField({
                         control,
                         name,
                         label,
                         placeholder,
                         options,
                     }: {
    control: Control<EnrollmentValues>;
    name: "course" | "feePayer";
    label: string;
    placeholder: string;
    options: readonly { value: string; label: string }[];
}) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`enroll-${name}`}>{label}</FieldLabel>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger
                            id={`enroll-${name}`}
                            aria-invalid={fieldState.invalid}
                            onBlur={field.onBlur}
                        >
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className={'p-0.5'}>
                            {options.map((o) => (
                                <SelectItem className={'cursor-pointer'} key={o.value} value={o.value}>
                                    {o.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}

export default function EnrollmentForm() {
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const form = useForm<EnrollmentValues>({
        resolver: zodResolver(enrollmentSchema),
        defaultValues: {
            firstName: "",
            surname: "",
            age: "",
            course: "",
            phoneNumber: "",
            feePayer: "",
            contact: "",
            website: "",
        },
    });

    const onSubmit = async (values: EnrollmentValues) => {
        setMessage(null);
        try {
            const res = await enroll(values);
            if (res.ok) {
                setMessage({ type: "success", text: "Thanks! A teacher will contact you shortly." });
                form.reset();
            } else {
                setMessage({ type: "error", text: res.error });
            }
        } catch {
            setMessage({ type: "error", text: "Something went wrong. Please try again." });
        }
    };

    const { control } = form;

    return (
        <form id="enroll" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <FieldGroup>
                <div className="grid gap-6 sm:grid-cols-2">
                    <TextField control={control} name="firstName" label="First name" placeholder="Wanjiru" autoComplete="given-name" />
                    <TextField control={control} name="surname" label="Surname" placeholder="Kamau" autoComplete="family-name" />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <TextField control={control} name="age" label="Student's age" inputMode="numeric" placeholder="12" />
                    <SelectField control={control} name="course" label="Course" placeholder="Choose a course" options={COURSES} />
                </div>

                <TextField
                    control={control}
                    name="phoneNumber"
                    label="Student's phone number"
                    type="tel"
                    inputMode="tel"
                    placeholder="0712 345 678"
                    autoComplete="tel"
                />

                <SelectField control={control} name="feePayer" label="Who pays the fees?" placeholder="Select one" options={FEE_PAYERS} />

                <TextField
                    control={control}
                    name="contact"
                    label="Fee payer's contact number"
                    type="tel"
                    inputMode="tel"
                    placeholder="0722 000 000"
                    description="We'll use this number for fee and schedule details."
                />

                {/* honeypot */}
                <input
                    {...form.register("website")}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                {message && (
                    <p
                        role="status"
                        className={message.type === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}
                    >
                        {message.text}
                    </p>
                )}

                <Field orientation="horizontal">
                    <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
                    <FieldLabel htmlFor="terms-checkbox-basic" className={'text-muted-foreground cursor-pointer'}>
                        Confirmed that I have successfully reviewed and submitted the correct information.
                    </FieldLabel>
                </Field>

                <Button type="submit" disabled={form.formState.isSubmitting} className="h-12">
                    {form.formState.isSubmitting ? "Sending…" : "Enroll"}
                </Button>
            </FieldGroup>
        </form>
    );
}