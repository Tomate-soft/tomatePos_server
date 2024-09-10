export const dateFormatter = (date: string) => {
  const formatDate = new Date(date).toLocaleDateString('Es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatDate;
};
