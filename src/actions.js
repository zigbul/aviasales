export const setSearchId = (id) => {
   return { type: "SET_SEARCH_ID", id };
};

export const setTickets = (tickets) => {
   return { type: "SET_TICKETS", tickets };
};

export const setStop = () => {
   return { type: "SET_STOP" };
};

export const setSortTickets = (sortTickets) => {
   return { type: "SET_SORT_TICKETS", sortTickets };
};

export const setFilter = (filter) => {
   return { type: "SET_FILTER", filter };
};

export const setSorterActive = (sorterActive) => {
   return { type: "SET_SORTER_ACTIVE", sorterActive };
};

export const setLoading = () => {
   return { type: "SET_SORTER_ACTIVE" };
};