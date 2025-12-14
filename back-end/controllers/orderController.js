import asyncHandler from "../middlewares/asyncHandler.js";
import Sweet from "../models/sweets.js";
import Order from "../models/order.js";

/**
 * PURCHASE A SWEET
 * POST /api/sweets/:id/purchase
 */
// export const purchaseSweet = asyncHandler(async (req, res) => {
//   const sweetId = req.params.id;
//   const { quantity } = req.body; // requestedQuantity from frontend

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

//   // Reduce stock (but do NOT delete product)
//   sweet.quantity -= quantity;
//   await sweet.save();

//   // Snapshot stored exactly at purchase time
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


export const purchaseSweet = asyncHandler(async (req, res) => {
  const sweetId = req.params.id;
  const { quantity} = req.body;

  if (!quantity || quantity <= 0) {
    res.status(400);
    throw new Error("Invalid quantity");
  }

  const sweet = await Sweet.findById(sweetId);
  if (!sweet) {
    res.status(404);
    throw new Error("Sweet not found");
  }

  if (sweet.quantity < quantity) {
    res.status(400);
    throw new Error("Not enough stock available");
  }

  // decrease stock
  sweet.quantity -= quantity;
  await sweet.save();

  // snapshot created at order time
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

  res.status(201).json(order);
});

/**
 * GET PENDING ORDERS
 * GET /api/orders/pending
 */
export const getPendingOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "pending" })
    .populate("customerId");
  res.status(200).json(orders);
});

export const getPreparingOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "preparing" })
    .populate("customerId");
  res.status(200).json(orders);
});

export const getDeliveredOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: "completed" })
    .populate("customerId");
  res.status(200).json(orders);
});




/**
 * START PREPARING ORDER
 * PUT /api/orders/:id/start
 */
export const startPreparingOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = "preparing";
  await order.save();

  res.status(200).json({ message: "Order moved to preparing stage", order });
});

/**
 * DELIVER ORDER
 * PUT /api/orders/:id/deliver
 */
export const deliverOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = "completed";
  await order.save();

  res.status(200).json({ message: "Order delivered successfully", order });
});

/**
 * GET USER’S ORDERS (optional)
 * GET /api/orders/my
 */
export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customerId: req.user._id });
  res.status(200).json(orders);
});

