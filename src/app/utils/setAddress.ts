import { FullAddress } from "@prisma/client";
import prisma from "./prisma";

export const setAddress = async (address: FullAddress, trxClient: any) => {
    const isAddressAvailable = await prisma.fullAddress.findFirst({
        where: {
            address: address.address,
            area: address.area,
            district: address.district
        }
    });

    if (isAddressAvailable) {
        return isAddressAvailable
    }
    else {
        return await trxClient.fullAddress.create({
            data: address
        });
    }
}