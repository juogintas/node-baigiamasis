import TicketModel from "../models/ticket.js";

const GET_ALL_TICKETS = async (req, res) => {
  try {
    const tickets = await TicketModel.find();
    return res.status(200).json({ tickets: tickets });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GET_TICKET_BY_ID = async (req, res) => {
  try {
    const ticket = await TicketModel.findById(req.params.id);
    return res.status(200).json({ ticket: ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

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

const UPDATE_TICKET = async (req, res) => {
  try {
    const ticket = await TicketModel.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ ticket: ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const DELETE_TICKET_BY_ID = async (req, res) => {
  try {
    const ticket = await TicketModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ ticket: ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  GET_ALL_TICKETS,
  GET_TICKET_BY_ID,
  INSTERT_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET_BY_ID,
};
