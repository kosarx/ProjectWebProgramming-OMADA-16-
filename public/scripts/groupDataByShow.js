export function groupDataByShow(data) {
    return data.reduce((acc, item) => {
        let show = acc.find(show => show.showID === item.showID);
        if (!show) {
            show = {
                showID: item.showID,
                venueID: item.venueID,
                categories: []
            };
            acc.push(show);
        }
        show.categories.push({
            categoryID: item.categoryID,
            seat_price: item.seat_price,
            category_name: item.category_name
        });
        return acc;
    }, []);
}