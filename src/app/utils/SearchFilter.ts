export const addArrayFieldFilter = (andConditions: any, fieldName: string, value?: string| number) => {
    if (value) {
        andConditions.push({
            [fieldName]: {
                hasSome: [value],
            },
        });
    }
};