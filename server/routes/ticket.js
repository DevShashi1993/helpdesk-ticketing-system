const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all ticket and name
router.get("/all", authorize, async (req, res) => {
  try {
    // get ticket name and description for a specified user id
    const user = await pool.query(
      "SELECT u.user_name, t.ticket_id, t.description FROM users AS u LEFT JOIN tickets AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a ticket, using authorize middleware
router.post("/new", authorize, async (req, res) => {
  try {
    const { assignTo, createdBy, dueDate, ticketDesc, ticketPriority, ticketTitle, ticketType } = req.body;
    const ticketInsertQuery = `INSERT INTO tickets(
      ticket_title, ticket_desc, type_id, status_id, priority_id, created_by, assigned_to, due_date, created_on)
      VALUES ('${ticketTitle}', '${ticketDesc}', ${ticketType}, 101, ${ticketPriority}, ${createdBy}, ${assignTo}, '${dueDate}', current_timestamp) RETURNING *`;
      console.log("something went wrong", ticketInsertQuery);
      const newticket = await pool.query(ticketInsertQuery);

    if (newticket.rows.length === 1) {
      return res.status(200).send("Ticket created sucessfully");
    }
    else {
      console.log("something went wrong", ticketInsertQuery);
    }
  } catch (err) {
    console.error(err.message);
  }
});

//update a ticket
router.put("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateticket = await pool.query(
      "UPDATE ticket SET description = $1 WHERE t_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateticket.rows.length === 0) {
      return res.json("This ticket is not yours");
    }

    res.json("ticket was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a ticket
router.delete("/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteticket = await pool.query(
      "DELETE FROM ticket WHERE t_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteticket.rows.length === 0) {
      return res.json("This ticket is not yours");
    }

    res.json("ticket was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
