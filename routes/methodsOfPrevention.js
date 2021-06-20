const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const MethodsOfPrevention = require("../models/MethodsOfPrevention");

// @route GET /methodsOfPrevention/getMethodsOfPrevention
// @desc Get methods of prevention
// @access Private
router.get("/getMethodsOfPrevention", auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const methodsOfPrevention = await MethodsOfPrevention.find({ active: true });
    if (!methodsOfPrevention.length) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No methods of prevention" }] });
    }
    res.send(methodsOfPrevention);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /methodsOfPrevention/addAMethodOfPrevention
// @desc Add side effect by admin
// @access Private
router.put(
  "/addAMethodOfPrevention",
  [
    auth,
    check("method", "Provide a method")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { method } = req.body;

    try {
      let methodOfPrevention = await MethodsOfPrevention.findOne({ method });
      if (methodOfPrevention) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Method already exists" }] });
      }

      methodOfPrevention = new MethodsOfPrevention({
        method,
      });

      await methodOfPrevention.save();

      const methodsOfPrevention = await MethodsOfPrevention.find({ active: true });
      res.send(methodsOfPrevention);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

router.delete(
  "/deleteAMethodOfPrevention/:methodId",
  auth,
  async (req, res) => {
    try {
      const methodToDelete = await MethodsOfPrevention.findOneAndRemove({
        _id: req.params.methodId,
      });
      if (!methodToDelete) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Method doesn't exist" }] });
      }

      const methodsOfPrevention = await MethodsOfPrevention.find({ active: true });
      res.json(methodsOfPrevention);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
