module.exports = {
    // Format the date as MM/DD/YYYY
    format_date: (date) => {
        return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    // Format the large numbers with commas
    format_amount: (amount) => {
        return parseInt(amount).toLocaleString();
    },

    is_my_page: (pageUser, userId) => {
        return pageUser === userId;
    }
}