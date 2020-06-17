const SearchField = (input, option) => {
    const normalizedOption = option
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    const normalizedSearch = input
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
    return normalizedOption.includes(normalizedSearch);
};

export default SearchField;