class Ticket {
  constructor(
    ticketID,
    ticketTitle,
    ticketDesc,
    tickeType,
    tickePriority,
    tickeStatus,
    tickeDueDate
  ) {
    this.ticketID = ticketID;
    this.ticketTitle = ticketTitle;
    this.ticketDesc = ticketDesc;
    this.tickeType = tickeType;
    this.tickePriority = tickePriority;
    this.tickeStatus = tickeStatus;
    this.tickeDueDate = tickeDueDate;
  }
}

export default Ticket;
