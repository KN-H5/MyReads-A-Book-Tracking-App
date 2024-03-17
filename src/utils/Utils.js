export const capitalizeString = (string) => {
    return string.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
}

export const debounceEvent = (a, b = 250, c) => (...d) => clearTimeout(c, c = setTimeout(() => a(...d), b));

export const mergeArray = (source, merge, by) => source.map(item => ({
    ...item,
    ...(merge.find(i => i[by] === item[by]) || {}),
}));

