const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Chemotherapies = require("../models/Chemotherapies");

// @route GET /chemotherapies/getChemotherapies
// @desc Get chemotherapies
// @access Private
router.get("/getChemotherapies", auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const chemotherapies = await Chemotherapies.find({
      active: true,
    });

    res.send(chemotherapies);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /chemotherapies/addChemotherapy
// @desc Add addChemotherapy
// @access Private
router.put(
  "/addChemotherapy",
  [auth, check("chemotherapy", "Provide a chemotherapy").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { chemotherapy, aboutChemotherapy } = req.body;

    try {
      const chemotherapyFound = await Chemotherapies.findOne({ chemotherapy });
      if (chemotherapyFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Chemotherapy already exists" }] });
      }

      const chemotherapyToAdd = new Chemotherapies({
        user: req.user.id,
        chemotherapy,
        aboutChemotherapy,
      });

      await chemotherapyToAdd.save();

      const chemotherapies = await Chemotherapies.find({ active: true });
      res.send(chemotherapies);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

router.delete("/deleteChemotherapy/:chemotherapyId", auth, async (req, res) => {
  try {
    await Chemotherapies.findOneAndRemove({
      _id: req.params.chemotherapyId,
    });

    const chemotherapies = await Chemotherapies.find({
      active: true,
    });
    res.json(chemotherapies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put(
  "/updateChemotherapy",
  [
    auth,
    check("_id", "Provide the id of the chemotherapy").not().isEmpty(),
    check("aboutChemotherapy", "Provide info on the chemotherapy")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { _id, aboutChemotherapy } = req.body;

      const chemotherapyToUpdate = await Chemotherapies.findOne({ _id });
      if (!chemotherapyToUpdate) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Chemotherapy doesn't exist" }] });
      }

      chemotherapyToUpdate.aboutChemotherapy = aboutChemotherapy;

      await chemotherapyToUpdate.save();

      const chemotherapies = await Chemotherapies.find({
        active: true,
      });
      res.json({ chemotherapies, updatedChemotherapy: chemotherapyToUpdate });
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

module.exports = router;
