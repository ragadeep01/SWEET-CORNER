import user from '../models/user.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import Crop from '../models/sweets.js';


const createSweet = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, category, quantity, price } = req.body;

  if (!name || !category || !quantity || !price) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const sellerId = req.user._id;

  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const newCrop = await Crop.create({
    name,
    category,
    quantity,
    price,
    image,
    sellerId,
    status: "available",
  });

  res.status(201).json(newCrop);
});


const updateSweet = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);

  if (!crop) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (crop.sellerId.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized to update this sweet" });
  }

  let updateData = req.body;

  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json(updatedCrop);
});

const deleteSweet = asyncHandler(async (req, res) => {
  const crop = await Crop.findById(req.params.id);

  if (!crop) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  if (crop.sellerId.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized to delete this sweet" });
  }

  await crop.deleteOne();

  return res.status(200).json({ message: "Sweet deleted successfully" });
});


const getMySweets = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  if (!sellerId) {
    res.status(400);
    throw new Error("Invalid seller ID");
  }

  const crops = await Crop.find({ sellerId });
  res.status(200).json(crops || []);
});

const allSweets = asyncHandler(async (req, res) => {
  const crops = await Crop.find({});
  res.status(200).json(crops || []);
  console.log(crops);
});

export { createSweet, updateSweet, deleteSweet, getMySweets, allSweets };
