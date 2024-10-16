export const calculatePrice = (releaseDate) => {
  const currentDate = new Date();
  const releaseYear = new Date(releaseDate).getFullYear();
  const releaseMonth = new Date(releaseDate).getMonth();

  let basePrice = 24.00;
  let discount = 0.00;
  const currentYear = currentDate.getFullYear();

  if (releaseYear === currentYear) {
    basePrice += 10.00;
    discount = 10;
  } else if (releaseYear < currentYear - 5) {
    basePrice -= 5.00;
    discount = 5;
  }

  const currentMonth = currentDate.getMonth();
  
  let isAnniversary = releaseMonth === currentMonth && releaseYear < currentYear;
  
  let discountPrice = isAnniversary ? basePrice - 10 : basePrice;

  return {
    fullPrice: basePrice,
    discountPrice: discountPrice,
    isAnniversary: isAnniversary,
    discount: discount
  };
};
