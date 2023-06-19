import express from "express";
import {
  createHomeStay,
  updateHomeStay,
  deleteHomeStay,
  getSingleHomeStay,
  getAllHomeStay,
  getHomeStayBySearch,
  getFeaturedHomeStay,
  getHomeStayCount,
} from "../controllers/homestayController.js";

import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create new HomeStay
router.post("/", verifyAdmin, createHomeStay);
// update new HomeStay
router.put("/:id", verifyAdmin, updateHomeStay);
// delete new HomeStay
router.delete("/:id", verifyAdmin, deleteHomeStay);
// get single HomeStay
router.get("/:id", getSingleHomeStay);
// get all HomeStay
router.get("/", getAllHomeStay);
// get HomeStay by search
router.get("/search/getHomestayBySearch", getHomeStayBySearch);
router.get("/search/getFeaturedHomestays", getFeaturedHomeStay);
router.get("/search/getHomeStayCount", getHomeStayCount);

export default router;
