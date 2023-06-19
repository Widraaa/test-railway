import TourGuide from "../models/Tour.js";

//create new Tour Guide
export const createTourGuide = async (req, res) => {
  const newTourGuide = new TourGuide(req.body);

  try {
    const savedTourGuide = await newTourGuide.save();
    res.status(200).json({
      success: true,
      message: "Successfuly created",
      data: savedTourGuide,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to create. Try again" });
  }
};

// update Tour Guide
export const updateTourGuide = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTourGuide = await TourGuide.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfuly updated",
      data: updateTourGuide,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      data: updateTourGuide,
    });
  }
};

// delete Tour Guide
export const deleteTourGuide = async (req, res) => {
  const id = req.params.id;
  try {
    await TourGuide.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfuly deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
      data: deleteTourGuide,
    });
  }
};

// getSingle Tour Guide
export const getSingleTourGuide = async (req, res) => {
  const id = req.params.id;
  try {
    const tourguide = await TourGuide.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tourguide,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteTourGuide,
    });
  }
};

// getAll Tour Guide
export const getAllTourGuide = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const tourguides = await TourGuide.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: tourguides.length,
      message: "Successful",
      data: tourguides,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteTourGuide,
    });
  }
};

// get TourGuide by search
export const getTourGuideBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  try {
    const tourguides = await TourGuide.find({
      city,
    }).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successful",
      data: tourguides,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get feature Tour Guide
export const getFeaturedTourGuide = async (req, res) => {
  try {
    const tourguides = await TourGuide.find({ featured: true })
      .populate("reviews")
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: tourguides,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteTourGuide,
    });
  }
};

// get TourGuide counts
export const getTourGuideCount = async (req, res) => {
  try {
    const tourguidesCount = await TourGuide.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourguidesCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
