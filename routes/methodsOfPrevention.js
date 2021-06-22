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

    const methodsOfPrevention = await MethodsOfPrevention.find({
      active: true,
    });
    if (!methodsOfPrevention.length) {
      return res
        .status(400)
        .json({ errors: [{ msg: "No methods of prevention" }] });
    }

    const methodsOfPreventionToReturn = methodsOfPrevention.map(
      ({ category, methods }) => ({
        category,
        methods: methods.filter(({ active }) => active),
      })
    );

    res.send(methodsOfPreventionToReturn);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /methodsOfPrevention/addAMethodOfPrevention
// @desc Add a method of prevention
// @access Private
router.put(
  "/addAMethodOfPrevention",
  [
    auth,
    check("category", "Provide a category").not().isEmpty(),
    check("method", "Provide a method").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { category, method } = req.body;

    try {
      let methodOfPrevention = (await MethodsOfPrevention.findOne({
        category,
      })) || { category: "", methods: [] };

      const doesMethodExist = methodOfPrevention.methods.some(
        ({ method: methodThatExists = "" }) => methodThatExists === method
      );
      if (doesMethodExist) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Method already exists" }] });
      }

      if (methodOfPrevention.category === category) {
        methodOfPrevention.methods.push({ method });
      } else {
        methodOfPrevention = new MethodsOfPrevention({
          category,
          methods: [{ method }],
        });
      }

      await methodOfPrevention.save();

      const methodsOfPrevention = await MethodsOfPrevention.find({
        active: true,
      });
      const methodsOfPreventionToReturn = methodsOfPrevention.map(
        ({ category: cat, methods }) => ({
          category: cat,
          methods: methods.filter(({ active }) => active),
        })
      );

      res.send(methodsOfPreventionToReturn);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

// @route PUT /methodsOfPrevention/deleteAMethodOfPrevention
// @desc Delete a method of prevention
// @access Private
router.delete(
  "/deleteAMethodOfPrevention/:category/:methodId",
  auth,
  async (req, res) => {
    try {
      const methodOfPrevention = await MethodsOfPrevention.findOneAndUpdate(
        { category: req.params.category },
        { $pull: { methods: { _id: req.params.methodId } } }
      );
      if (!methodOfPrevention) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Method doesn't exist" }] });
      }

      const methodsOfPrevention = await MethodsOfPrevention.find({
        active: true,
      });
      const methodsOfPreventionToReturn = methodsOfPrevention.map(
        ({ category, methods }) => ({
          category,
          methods: methods.filter(({ active }) => active),
        })
      );
      res.json(methodsOfPreventionToReturn);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT /methodsOfPrevention/deleteACategoryOfMethodsOfPrevention
// @desc Delete a method of prevention
// @access Private
router.delete(
  "/deleteACategoryOfMethodsOfPrevention/:category",
  auth,
  async (req, res) => {
    try {
      const methodOfPrevention = await MethodsOfPrevention.findOneAndDelete({
        category: req.params.category,
      });
      if (!methodOfPrevention) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Category doesn't exist" }] });
      }

      const methodsOfPrevention = await MethodsOfPrevention.find({
        active: true,
      });
      const methodsOfPreventionToReturn = methodsOfPrevention.map(
        ({ category, methods }) => ({
          category,
          methods: methods.filter(({ active }) => active),
        })
      );
      res.json(methodsOfPreventionToReturn);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
