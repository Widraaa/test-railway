import HomeStay from "../models/HomeStay.js";

//create new Home stay
export const createHomeStay = async (req, res) => {
  const newHomeStay = new HomeStay(req.body);

  try {
    const savedHomeStay = await newHomeStay.save();
    res.status(200).json({
      success: true,
      message: "Successfuly created",
      data: savedHomeStay,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to create. Try again" });
  }
};

// update Home stay
export const updateHomeStay = async (req, res) => {
  const id = req.params.id;
  try {
    const updateHomeStay = await HomeStay.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfuly updated",
      data: updateHomeStay,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      data: updateHomeStay,
    });
  }
};

// delete Home stay
export const deleteHomeStay = async (req, res) => {
  const id = req.params.id;
  try {
    await HomeStay.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfuly deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
      data: deleteHomeStay,
    });
  }
};

// getSingle Home stay
export const getSingleHomeStay = async (req, res) => {
  const id = req.params.id;
  try {
    const homestay = await HomeStay.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: homestay,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteHomeStay,
    });
  }
};

// getAll Home stay
export const getAllHomeStay = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const homestays = await HomeStay.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: homestays.length,
      message: "Successful",
      data: homestays,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteHomeStay,
    });
  }
};

// get HomeStay by search
export const getHomeStayBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    // gte = greater than equal
    const homestays = await HomeStay.find({
      city,
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: homestays,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get featured Home stay
export const getFeaturedHomeStay = async (req, res) => {
  try {
    const homestays = await HomeStay.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: homestays,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteHomeStay,
    });
  }
};

// get HomeStay counts
export const getHomeStayCount = async (req, res) => {
  try {
    const homestaysCount = await HomeStay.estimatedDocumentCount();

    res.status(200).json({ success: true, data: homestaysCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
