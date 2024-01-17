import TicketModel from "../models/ticket.js";
import UserModel from "../models/user.js";

const INSTERT_TICKET = async (req, res) => {
  try {
    const ticket = new TicketModel({
      title: req.body.title,
      ticket_price: req.body.ticket_price,
      from_location: req.body.from_location,
      to_location: req.body.to_location,
      to_location_photo_url: req.body.to_location_photo_url,
    });

    const response = await ticket.save();
    return res.status(201).json({ message: "Ticket was added", response });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const BUY_TICKET = async (req, res) => {
  try {
    const ticket = await TicketModel.findById(req.body._id);
    const user = await UserModel.findById(req.body.userId);

    const ticketPrice = ticket.ticket_price;

    let userMoney = user.money_balance;

    if (ticketPrice > userMoney) {
      return res
        .status(400)
        .json({ message: "Insufficient funds for purchase" });
    }

    userMoney -= ticketPrice;

    user.bought_tickets.push(ticket._id);

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.body.userId },
      { money_balance: userMoney, bought_tickets: user.bought_tickets },
      { new: true }
    );

    return res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { INSTERT_TICKET, BUY_TICKET };
