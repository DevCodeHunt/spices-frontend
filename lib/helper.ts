import { CartItem } from "@/types";
import { formatPrice } from "./format";

export const calculateDiscountPercentage = (originalPrice: number, discountPrice: number) => {
    const discountPercentage = ((originalPrice - discountPrice) / originalPrice) * 100;
    return discountPercentage;
};

export const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number) => {
    if (originalPrice <= 0 || discountPercentage < 0 || discountPercentage > 100) {
        return 0; // To handle invalid inputs
    }
    return originalPrice - (discountPercentage / 100) * originalPrice;
};


export const calculateCartTotals = (carts: CartItem[]) => {
    let total = 0;
    let totalDiscount = 0;
    let totalQuantity = 0;
    let subTotal = 0;

    carts?.forEach((item: CartItem) => {
        const product = item.product;
        const quantity = item.quantity;
        const price = product.price;
        subTotal += price * quantity;
        totalDiscount += ((product.discountPrice / 100) * price) * quantity
        total = subTotal - totalDiscount
        totalQuantity += quantity;
    });

    return {
        subTotal: formatPrice(subTotal),
        totalDiscount: formatPrice(totalDiscount),
        total: formatPrice(total),
        totalQuantity
    }

}

