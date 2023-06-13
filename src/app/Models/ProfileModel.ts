export class ProfileModel {
    
    email!: string;
    bookings!: BookingDto[];
  }
  
  export class BookingDto {
   
    passengerName!: string;
    email!: string;
    phoneNumber!: string;
    age!: number;
    gender!: string;
    cabinClass!: string;
    noOfTicket!: number;
  }
  