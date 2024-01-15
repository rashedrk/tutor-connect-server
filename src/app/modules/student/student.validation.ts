import { z } from "zod";

const nameValidationSchema = z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
});

const addressValidationSchema = z.object({
    areaName: z.string(),
    policeStation: z.string(),
    postOfficeName: z.string(),
    postalCode: z.number(),
    subDistrict: z.string(),
    district: z.string(),
});

const guardianValidationSchema = z.object({
    fatherName: z.string(),
    motherName: z.string(),
    fatherContact: z.string(),
    motherContact: z.string(),
});

const studentValidationSchema = z.object({
    body: z.object({
        name: nameValidationSchema,
        email: z.string().email(),
        gender: z.enum(['male', 'female']),
        dateOfBirth: z.string(),
        contactNo: z.string(),
        presentAddress: addressValidationSchema,
        permanentAddress: addressValidationSchema,
        guardian: guardianValidationSchema,
        profileImage: z.string(),
        isDeleted: z.boolean().optional(),
    })
});

export const studentValidations = {
    studentValidationSchema,
}