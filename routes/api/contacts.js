const express = require("express");
const contactsOperations = require("../../model");
const { validation } = require("../../middlewares");
const { joiContactSchema } = require("../../model/contact");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", validation(joiContactSchema), async (req, res, next) => {
  try {
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  validation(joiContactSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contactsOperations.updateContact(
        contactId,
        req.body
      );
      if (!result) {
        const error = new Error(`Contact with id=${contactId} not found`);
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:contactId/favorite", async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (typeof favorite === "undefined") {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const contact = await contactsOperations.updateStatusContact(
      contactId,
      req.body
    );
    return res.status(200).json(contact);
  } catch (e) {
    return res.status(404).json({ message: "not found" });
  }
});

module.exports = router;
