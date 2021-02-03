const reducer = (state = {
   tickets: [],
   stop: false,
   sortTickets: [],
   filter: {all: true, without: true, one: true, two: true, three: true},
   sorterActive: { lowprice: true, faster: false },
   loading: true, 
   }, action) => {

      switch(action.type) {
         case "SET_SEARCH_ID":
            return state = { ...state, searchId: action.id };
         case "SET_TICKETS":
            return state = { ...state, tickets: action.tickets };
         case "SET_STOP":
            return state = { ...state, stop: true, loading: false };
         case "SET_SORT_TICKETS":
            return state = { ...state, sortTickets: action.sortTickets };
         case "SET_FILTER":
            return state = { ...state, filter: action.filter };
         case "SET_SORTER_ACTIVE":
            return state = { ...state, sorterActive: action.sorterActive };
         default:
            return state;
      };
};

export default reducer;