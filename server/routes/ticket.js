const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all ticket and name
router.get("/all", authorize, async (req, res) => {
  try {
    const getAllTicketsDataQry = `SELECT t.id, ticket_title, ticket_desc, tt.name as ticket_type, ts.name as ticket_status, tp.name as ticket_priority, due_date FROM tickets AS t
    LEFT JOIN ticket_type AS tt
    ON tt.id = t.type_id
    LEFT JOIN ticket_status AS ts
    ON ts.id = t.status_id
    LEFT JOIN ticket_priority AS tp
    ON tp.id = t.priority_id
    ORDER BY t.id`;

    const allTicketsData = await pool.query(getAllTicketsDataQry);

    if (allTicketsData.rows.length >= 0) {
      // console.log(allTicketsData.rows);
      return res.status(200).json(allTicketsData.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//create a ticket, using authorize middleware
router.post("/new", authorize, async (req, res) => {
  try {
    let {
      assignTo,
      createdBy,
      dueDate,
      ticketDesc,
      ticketPriority,
      ticketTitle,
      ticketType,
    } = req.body;

    // TODO: need to move to utility functions
    // replaced apostrophe symbol ' with '', just to handle insert query in SQL
    ticketTitle = ticketTitle.replace(/'/g, "''");
    ticketDesc = ticketDesc.replace(/'/g, "''");

    const ticketInsertQuery = `INSERT INTO tickets(
      ticket_title, ticket_desc, type_id, status_id, priority_id, created_by, assigned_to, due_date, created_on)
      VALUES ('${ticketTitle}', '${ticketDesc}', ${ticketType}, 101, ${ticketPriority}, ${createdBy}, ${assignTo}, '${dueDate}', current_timestamp) RETURNING *`;

    const newticketData = await pool.query(ticketInsertQuery);

    if (newticketData.rows.length === 1) {
      return res.status(200).send("Ticket created sucessfully");
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).send("Server error");
  }
});

// TODO: need to be implemented
// update a ticket
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

// delete all tickets
router.delete("/deleteall", authorize, async (req, res) => {
  try {
    const ticketDeleteQuery = `DELETE FROM tickets RETURNING *`;
    const deletedTicketData = await pool.query(ticketDeleteQuery);

    if (deletedTicketData.rows.length > 0) {
      return res.status(200).send("All Tickets deleted sucessfully");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// delete a ticket
router.delete("/delete", authorize, async (req, res) => {
  try {
    const { IDs } = req.query;
    const ticketDeleteQuery = `DELETE FROM tickets WHERE id IN(${IDs}) RETURNING *`;
    const deletedTicketData = await pool.query(ticketDeleteQuery);

    if (deletedTicketData.rows.length > 0) {
      return res.status(200).send("Ticket deleted sucessfully");
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
