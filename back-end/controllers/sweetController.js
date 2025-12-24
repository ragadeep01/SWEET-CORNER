import user from '../models/user.js';
import Crop from '../models/sweets.js';


const createSweet = async (req, res) => {
  try {
    console.log(req.body);

    const { name, category, quantity, price } = req.body;

    if (!name || !category || !quantity || !price) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const sellerId = req.user._id;

    const existingSweet = await Crop.findOne({ name, sellerId });
    if (existingSweet) {
      return res.status(400).json({ message: "Sweet already exists" });
    }

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

    return res.status(201).json(newCrop);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const updateSweet = async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteSweet = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (crop.sellerId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this sweet" });
    }

    await crop.deleteOne();

    return res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const getMySweets = async (req, res) => {
  try {
    const sellerId = req.user._id;

    if (!sellerId) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    const crops = await Crop.find({ sellerId });
    return res.status(200).json(crops || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const allSweets = async (req, res) => {
  try {
    const crops = await Crop.find({});
    console.log(crops);
    return res.status(200).json(crops || []);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export { createSweet, updateSweet, deleteSweet, getMySweets, allSweets };
