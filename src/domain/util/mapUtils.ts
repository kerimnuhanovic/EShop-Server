export const formatFilterParams = (filterCategories: string): string[] => {
    return filterCategories.split("$");
}