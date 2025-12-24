import Sweet from "../models/sweets.js";
import Order from "../models/order.js";

// export const purchaseSweet = asyncHandler(async (req, res) => {
//   const sweetId = req.params.id;
//   const { quantity } = req.body; 

//   if (!quantity || quantity <= 0) {
//     res.status(400);
//     throw new Error("Invalid quantity");
//   }

//   const sweet = await Crop.findById(sweetId);
//   if (!sweet) {
//     res.status(404);
//     throw new Error("Sweet not found");
//   }

//   if (sweet.quantity < quantity) {
//     res.status(400);
//     throw new Error("Not enough stock available");
//   }

// 
//   sweet.quantity -= quantity;
//   await sweet.save();

//   const sweetSnapshot = {
//     name: sweet.name,
//     category: sweet.category,
//     price: sweet.price,
//     image: sweet.image,
//     requestedQuantity: quantity,
//   };

//   const order = await OrderInfo.create({
//     buyer: req.user._id,
//     sweet: sweetId,
//     sweetSnapshot,
//     orderedQuantity: quantity,
//     totalPrice: quantity * sweet.price,
//     status: "pending",
//   });

//   res.status(201).json(order);
// });


export const purchaseSweet = async (req, res, next) => {
  try {
    const sweetId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    const sweetSnapshot = {
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      image: sweet.image,
    };

    const totalAmount = quantity * sweet.price;

    const order = await Order.create({
      sweetId,
      customerId: req.user._id,
      sweetSnapshot,
      quantity,
      totalAmount,
      status: "pending",
    });

    return res.status(201).json(order);
  } catch (err) {
    return next(err);
  }
};

export const getPendingOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "pending" }).populate("customerId");
    return res.status(200).json(orders);
  } catch (err) {
    return next(err);
  }
};

export const getPreparingOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "preparing" }).populate("customerId");
    return res.status(200).json(orders);
  } catch (err) {
    return next(err);
  }
};

export const getDeliveredOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: "completed" }).populate("customerId");
    return res.status(200).json(orders);
  } catch (err) {
    return next(err);
  }
};



export const startPreparingOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "preparing";
    await order.save();

    return res.status(200).json({ message: "Order moved to preparing stage", order });
  } catch (err) {
    return next(err);
  }
};


export const deliverOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "completed";
    await order.save();

    return res.status(200).json({ message: "Order delivered successfully", order });
  } catch (err) {
    return next(err);
  }
};


export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user._id });
    return res.status(200).json(orders);
  } catch (err) {
    return next(err);
  }
};

