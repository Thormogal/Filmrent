export const calculatePrice = (releaseDate) => {
  const currentDate = new Date();
  const releaseYear = new Date(releaseDate).getFullYear();
  const releaseMonth = new Date(releaseDate).getMonth();

  let basePrice = 24.00;
  const currentYear = currentDate.getFullYear();

  if (releaseYear === currentYear) {
    basePrice += 10.00;
  } else if (releaseYear < currentYear - 5) {
    basePrice -= 5.00;
  }

  const currentMonth = currentDate.getMonth();
  let isAnniversary = releaseMonth === currentMonth;
  let discountPrice = isAnniversary ? basePrice - 10 : basePrice;

  return {
    fullPrice: basePrice,
    discountPrice: discountPrice,
    isAnniversary: isAnniversary
  };
};
