export function ticketNormalize(arrOTicket) {

   function setKey() {
      return `_${Math.random().toString(36).substr(2, 9)}`;
    };

   function priceNormalize(price) {
      return price
               .toString()
               .split("")
               .reverse()
               .reduce((agrigation, char, i) => {
               if(i % 3 === 0) {
                  return agrigation + " " + char;
               } 
               return agrigation + char;
               }, "р ")
               .split("")
               .reverse()
               .join("");
   };

   function timeOutIn(date, time) {

      let dateOut = new Date(date);
      const outHours = dateOut.getHours();
      const outMinutes = dateOut.getMinutes();
      const inHours = new Date(dateOut.setHours(dateOut.getHours() + Math.ceil(time/60))).getHours();
      const inMinutes = new Date(dateOut.setMinutes(dateOut.getMinutes() + time)).getMinutes();

      return `${outHours} : ${outMinutes} - ${inHours} : ${inMinutes}`;
   }

   function timeInTrack(duration) {
      return Math.ceil(duration / 60) + ":" + (duration % 60);
   }

   function stops(stops) {
      switch (stops.length) {
         case 0: 
            return "Без пересадок";
         case 1: 
            return "1 пересадка";
         default: 
            return `${stops.length} пересадки`;
      };
   };

   function outIn(arrOutIn) {
      return arrOutIn.map((way) => {
         return {
            id: setKey(),
            out: `${way.origin} - ${way.destination}`,
            outTime: timeOutIn(way.date, way.duration),
            timeInFlight: timeInTrack(way.duration),
            stops: stops(way.stops),
            stopCitys: way.stops.join(", "),
         };
      });
   };

   return arrOTicket.map((ticket) => {
      return {
         id: setKey(),
         price: priceNormalize(ticket.price),
         carrier: `//pics.avs.io/99/36/${ticket.carrier}.png`,
         segments: outIn(ticket.segments),
      };
   });
};