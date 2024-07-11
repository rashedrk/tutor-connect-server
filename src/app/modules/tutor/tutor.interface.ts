import { GENDER, MEDIUM } from "@prisma/client";

export type TTutorFilterRequest = {
    searchTerm?: string | undefined;
    class?: number | undefined;
    medium?: MEDIUM | undefined;
    gender?: GENDER | undefined;
    upozila?: string | undefined;
    district?: string | undefined;
    experties?: string | undefined;
  };