import express from "express";

import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createDestination,
  deleteDestination,
  getAllDestination,
  getDestinationBySearch,
  getDestinationCount,
  getSingleDestination,
  updateDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

// create new Destination
router.post("/", verifyAdmin, createDestination);
// update new Destination
router.put("/:id", verifyAdmin, updateDestination);
// delete new Destination
router.delete("/:id", verifyAdmin, deleteDestination);
// get single Destination
router.get("/:id", getSingleDestination);
// get all Destination
router.get("/", getAllDestination);
// get Destination by search
router.get("/search/getDestinationBySearch", getDestinationBySearch);
router.get("/search/getDestinationCount", getDestinationCount);

export default router;
