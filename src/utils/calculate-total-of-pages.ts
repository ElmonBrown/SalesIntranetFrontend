export const calculateTotalOfPages = (totalOfitems: number, limitOfItemsPerPage: number): number[] => {
  let total: number = Math.ceil(totalOfitems / limitOfItemsPerPage);
  let pages: number[] = [];
  for (let index = 0; index < total; index++) {
    pages.push(index + 1);
  }
  return pages;
}