export const calculateDiscountPercentage = (originalPrice: number, discountPrice: number) => {
    const discountPercentage = ((originalPrice - discountPrice) / originalPrice) * 100;
    return discountPercentage;
};