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

