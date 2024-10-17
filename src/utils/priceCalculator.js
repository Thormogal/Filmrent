export const calculatePrice = (releaseDate, runtime) => {
  const currentDate = new Date();
  const releaseYear = new Date(releaseDate).getFullYear();
  const releaseMonth = new Date(releaseDate).getMonth();
  
  let basePrice = 24.00;
  let discount = 0.00; // Procentuell rabatt
  const currentYear = currentDate.getFullYear();

  // Specialfall för filmer med runtime mindre än 15 minuter
  if (runtime < 15) {
    return {
      fullPrice: 1.00,  // Sätt fast pris på 1 USD
      discountPrice: 1.00,
      isAnniversary: false,  // Ingen jubileumsrabatt för dessa filmer
      discount: 0.00
    };
  }

  if (releaseYear === currentYear) {
    basePrice += 10.00;
  } else if (releaseYear < currentYear - 5) {
    discount = 0.20;
  }

  const currentMonth = currentDate.getMonth();
  let isAnniversary = releaseMonth === currentMonth && releaseYear < currentYear;

  if (isAnniversary) {
    discount = 0.30;
  }

  if (runtime < 60 && runtime >= 15) {
    discount += 0.15;
  }

  let discountPrice = basePrice * (1 - discount);

  return {
    fullPrice: basePrice,
    discountPrice: discountPrice,
    isAnniversary: isAnniversary,
    discount: discount * 100
  };
};
