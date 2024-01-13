import { Schema, model } from 'mongoose';
import { TAddress, TGuardian, TName, TStudent } from './student.interface';

const nameSchema = new Schema<TName>({
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
    }
});


const addressSchema = new Schema<TAddress>({
    areaName: {
        type: String,
        required: true,
    },
    policeStation: {
        type: String,
        required: true,
    },
    postOfficeName: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    subDistrict: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    fatherContact: {
        type: String,
        required: true,
    },
    motherContact: {
        type: String,
        required: true,
    },
});

const studentSchema = new Schema<TStudent>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    name: {
        type: nameSchema,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    dateOfBirth: {
        type: String,
    },
    contactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: addressSchema,
        required: true,
    },
    permanentAddress: {
        type: addressSchema,
        required: true,
    },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    profileImage: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

export const studentModel = model<TStudent>('student', studentSchema);