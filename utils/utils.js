import jwt from "jsonwebtoken";

export const getUserDetails = (token) => {
    return jwt.decode(token);
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
};

export function _debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
