import Destination from "../models/Destinations.js";

//create new Destination
export const createDestination = async (req, res) => {
  const newDestination = new Destination(req.body);

  try {
    const savedDestination = await newDestination.save();
    res.status(200).json({
      success: true,
      message: "Successfuly created",
      data: savedDestination,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "failed to create. Try again" });
  }
};

// update Destination
export const updateDestination = async (req, res) => {
  const id = req.params.id;
  try {
    const updateDestination = await Destination.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfuly updated",
      data: updateDestination,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
      data: updateDestination,
    });
  }
};

// delete Destination
export const deleteDestination = async (req, res) => {
  const id = req.params.id;
  try {
    await Destination.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfuly deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
      data: deleteDestination,
    });
  }
};

// getSingle Destination
export const getSingleDestination = async (req, res) => {
  const id = req.params.id;
  try {
    const destination = await Destination.findById(id);
    res.status(200).json({
      success: true,
      message: "Successful",
      data: destination,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteDestination,
    });
  }
};

// getAll Destination
export const getAllDestination = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const destinations = await Destination.find({})
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: destinations.length,
      message: "Successful",
      data: destinations,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
      data: deleteDestination,
    });
  }
};

// get Destination by search
export const getDestinationBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");

  try {
    const destinations = await Destination.find({
      city,
    });
    res.status(200).json({
      success: true,
      message: "Successful",
      data: destinations,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

// get feature Destination
// export const getFeaturedDestination = async (req, res) => {
//   try {
//     const destinations = await Destination.find({ unggulan: true })
//       .populate("reviews")
//       .limit(8);

//     res.status(200).json({
//       success: true,
//       message: "Successful",
//       data: destinations,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "not found",
//       data: deleteDestination,
//     });
//   }
// };

// get Destination counts
export const getDestinationCount = async (req, res) => {
  try {
    const destinationsCount = await Destination.estimatedDocumentCount();

    res.status(200).json({ success: true, data: destinationsCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
