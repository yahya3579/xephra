const Payment = require("../models/Payment");
const path = require("path");
const fs = require("fs").promises;

const paymentController = {
  createPayment: async (req, res) => {
    try {
      const { userDetails, selectedPlan, paymentDetails } = req.body;

      if (!userDetails || !selectedPlan || !paymentDetails || !req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Missing required fields: userDetails, selectedPlan, paymentDetails, or payment receipt",
        });
      }

      // Check if user ID is provided
      if (!userDetails.userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required in userDetails",
        });
      }

      // Check if user already has an existing payment/subscription using userId
      const existingPayment = await Payment.findOne({
        "userDetails.userId": userDetails.userId,
        "paymentStatus.status": { $in: ["pending", "verified"] },
      }).sort({ "paymentStatus.submissionDate": -1 });

      if (existingPayment) {
        const status = existingPayment.paymentStatus.status;

        if (status === "pending") {
          return res.status(409).json({
            success: false,
            message:
              "You already have a payment request pending. Please wait for verification.",
            data: {
              paymentId: existingPayment.paymentId,
              status: status,
              submissionDate: existingPayment.paymentStatus.submissionDate,
            },
          });
        }

        if (status === "verified") {
          return res.status(409).json({
            success: false,
            message: "Your subscription is already verified and active.",
            data: {
              paymentId: existingPayment.paymentId,
              status: status,
              submissionDate: existingPayment.paymentStatus.submissionDate,
              expiryDate: existingPayment.paymentStatus.expiryDate,
            },
          });
        }
      }

      const paymentReceipt = {
        fileName: req.file.filename,
        originalFileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        filePath: req.file.path,
        uploadDate: new Date(),
      };

      const payment = new Payment({
        userDetails,
        selectedPlan,
        paymentDetails,
        paymentReceipt,
      });

      await payment.save();

      res.status(201).json({
        success: true,
        message: "Payment submitted successfully",
        data: {
          paymentId: payment.paymentId,
          status: payment.paymentStatus.status,
          submissionDate: payment.paymentStatus.submissionDate,
          expiryDate: payment.paymentStatus.expiryDate,
        },
      });
    } catch (error) {
      console.error("Create Payment Error:", error);
      if (req.file) await fs.unlink(req.file.path).catch(console.error);
      res.status(500).json({
        success: false,
        message: "Failed to create payment",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  getAllPayments: async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        planId,
        paymentMethod,
        startDate,
        endDate,
        search, // User name ya email search karne ke liye
        sortBy = "submissionDate",
        sortOrder = "desc",
      } = req.query;

      // Input validation
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.min(Math.max(1, parseInt(limit)), 100); // Max 100 records

      // Build filter object
      const filter = {};

      if (status) {
        // Multiple status filter support
        const statuses = Array.isArray(status) ? status : [status];
        filter["paymentStatus.status"] = { $in: statuses };
      }

      if (planId) filter["selectedPlan.planId"] = planId;
      if (paymentMethod) filter["paymentDetails.paymentMethod"] = paymentMethod;

      // Date range filter
      if (startDate || endDate) {
        filter["paymentStatus.submissionDate"] = {};
        if (startDate) {
          const start = new Date(startDate);
          if (isNaN(start.getTime())) {
            return res.status(400).json({
              success: false,
              message: "Invalid start date format",
            });
          }
          filter["paymentStatus.submissionDate"].$gte = start;
        }
        if (endDate) {
          const end = new Date(endDate);
          if (isNaN(end.getTime())) {
            return res.status(400).json({
              success: false,
              message: "Invalid end date format",
            });
          }
          // End date ko end of day set karenge
          end.setHours(23, 59, 59, 999);
          filter["paymentStatus.submissionDate"].$lte = end;
        }
      }

      // Search functionality
      if (search) {
        filter.$or = [
          { "userDetails.name": { $regex: search, $options: "i" } },
          { "userDetails.email": { $regex: search, $options: "i" } },
          { "paymentDetails.transactionId": { $regex: search, $options: "i" } },
        ];
      }

      // Sort options
      const sortOptions = {};
      const validSortFields = ["submissionDate", "amount", "status"];
      const sortField = validSortFields.includes(sortBy)
        ? sortBy
        : "submissionDate";
      const sortDirection = sortOrder === "asc" ? 1 : -1;

      if (sortField === "submissionDate") {
        sortOptions["paymentStatus.submissionDate"] = sortDirection;
      } else if (sortField === "amount") {
        sortOptions["selectedPlan.price"] = sortDirection;
      } else if (sortField === "status") {
        sortOptions["paymentStatus.status"] = sortDirection;
      }

      const skip = (pageNum - 1) * limitNum;

      // Parallel execution for better performance
      const [payments, totalCount] = await Promise.all([
        Payment.find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(limitNum)
          .populate("paymentStatus.verifiedBy", "name email")
          .populate("userDetails.userId", "name email") // User details bhi populate karenge
          .lean(), // Better performance ke liye
        Payment.countDocuments(filter),
      ]);

      // Response with additional metadata
      const totalPages = Math.ceil(totalCount / limitNum);

      res.status(200).json({
        success: true,
        data: {
          payments,
          pagination: {
            currentPage: pageNum,
            totalPages,
            totalCount,
            limit: limitNum,
            hasNextPage: pageNum < totalPages,
            hasPrevPage: pageNum > 1,
          },
          filters: {
            status,
            planId,
            paymentMethod,
            startDate,
            endDate,
            search,
          },
          sort: {
            sortBy: sortField,
            sortOrder,
          },
        },
      });
    } catch (error) {
      console.error("Get All Payments Error:", error);

      // Specific error handling
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid ID format provided",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to fetch payments",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },


// (18 July 2025)
updatePaymentById: async (req, res) => {
  try {
    const { paymentId } = req.params;
    if (!paymentId || paymentId.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing payment ID",
      });
    }

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    const updateData = req.body;

    // Step 1: Update userDetails
    if (updateData.userDetails) {
      const { fullName, email, phoneNumber } = updateData.userDetails;
      if (fullName) payment.userDetails.fullName = fullName;
      if (email) payment.userDetails.email = email;
      if (phoneNumber) payment.userDetails.phoneNumber = phoneNumber;
    }

    // Step 2: Update paymentDetails
    if (updateData.paymentDetails) {
      const { paymentMethod, transactionId } = updateData.paymentDetails;
      if (paymentMethod) {
        const methodMap = {
          hbl: "HBL Bank Transfer",
          ubl: "UBL Bank Transfer",
          mcb: "MCB Bank Transfer",
          jazzcash: "JazzCash",
          easypaisa: "Easypaisa",
        };
        payment.paymentDetails.paymentMethod = paymentMethod;
        payment.paymentDetails.paymentMethodName = methodMap[paymentMethod] || "";
      }
      if (transactionId) {
        payment.paymentDetails.transactionId = transactionId;
      }
    }

    // Step 3: Update selectedPlan
    let planChanged = false;
    if (updateData.selectedPlan?.planId) {
      const planId = updateData.selectedPlan.planId;
      const planMap = {
        weekly: {
          planName: "Weekly Plan",
          planPrice: "PKR 350",
          planDuration: "1 Week",
        },
        monthly: {
          planName: "Monthly Plan",
          planPrice: "PKR 999",
          planDuration: "1 Month",
        },
        yearly: {
          planName: "Yearly Plan",
          planPrice: "PKR 8,999",
          planDuration: "12 Months",
        },
      };
      const plan = planMap[planId];

      if (!plan) {
        return res.status(400).json({
          success: false,
          message: "Invalid planId",
        });
      }

      payment.selectedPlan.planId = planId;
      payment.selectedPlan.planName = plan.planName;
      payment.selectedPlan.planPrice = plan.planPrice;
      payment.selectedPlan.planDuration = plan.planDuration;
      planChanged = true;
    }

    // Step 4: Update paymentStatus (NEW SECTION)
    if (updateData.paymentStatus) {
      const { rejectionReason } = updateData.paymentStatus;
      
      // Update rejection reason if provided
      if (rejectionReason !== undefined) {
        // Allow empty string to clear the rejection reason
        payment.paymentStatus.rejectionReason = rejectionReason;
      }
      
      // Optional: Add validation for rejected payments
      if (payment.paymentStatus.status === "rejected" && 
          (!rejectionReason || rejectionReason.trim() === "")) {
        return res.status(400).json({
          success: false,
          message: "Rejection reason is required for rejected payments",
        });
      }
    }

    // Step 5: If plan changed and status is verified, recalculate dates
    if (planChanged && payment.paymentStatus.status === "verified") {
      const now = new Date();
      let subscriptionStartDate = new Date(now);
      let subscriptionEndDate = new Date(now);

      switch (payment.selectedPlan.planId) {
        case "weekly":
          subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 7);
          break;
        case "monthly":
          subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
          break;
        case "yearly":
          subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);
          break;
      }

      payment.paymentStatus.subscriptionStartDate = subscriptionStartDate;
      payment.paymentStatus.subscriptionEndDate = subscriptionEndDate;
      payment.paymentStatus.expiryDate = new Date(subscriptionEndDate);
      payment.paymentStatus.isActive = true;
    }

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });

  } catch (error) {
    console.error("Update Payment Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment",
      error: error.message, // Show real error during testing
    });
  }
},

  verifyPayment: async (req, res) => {
    try {
      const { paymentId } = req.params;
      const adminId = req.user?.id;

      const payment = await Payment.findOne({ paymentId });

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        });
      }

      if (payment.paymentStatus.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: `Payment is already ${payment.paymentStatus.status}`,
        });
      }

      // Subscription duration logic
      const now = new Date();
      let subscriptionStartDate = new Date(now);
      let subscriptionEndDate = new Date(now);

      const planType = payment.selectedPlan?.planId; // 'weekly', 'monthly', 'yearly'

      switch (planType) {
        case "weekly":
          subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 7);
          break;
        case "monthly":
          subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
          break;
        case "yearly":
          subscriptionEndDate.setFullYear(
            subscriptionEndDate.getFullYear() + 1
          );
          break;
        default:
          subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
          break;
      }

      // Expiry Date = same as subscription end date (or +1 day grace)
      const expiryDate = new Date(subscriptionEndDate); // OR add 1 day: new Date(subscriptionEndDate.getTime() + 86400000)

      // Update payment status
      payment.paymentStatus = {
        ...payment.paymentStatus,
        status: "verified",
        verificationDate: now,
        verifiedBy: adminId,
        subscriptionStartDate,
        subscriptionEndDate,
        expiryDate,
        isActive: true,
      };

      await payment.save();

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: payment.paymentStatus,
      });
    } catch (error) {
      console.error("Verify Payment Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to verify payment",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  // rejectPayment: async (req, res) => {
  //   try {
  //     const { paymentId } = req.params;
  //     const adminId = req.user?.id;

  //     const payment = await Payment.findOne({ paymentId });

  //     if (!payment) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Payment not found",
  //       });
  //     }

  //     if (payment.paymentStatus.status !== "pending") {
  //       return res.status(400).json({
  //         success: false,
  //         message: `Payment is already ${payment.paymentStatus.status}`,
  //       });
  //     }

  //     // Update payment status to rejected
  //     payment.paymentStatus = {
  //       ...payment.paymentStatus,
  //       status: "rejected",
  //       verificationDate: new Date(),
  //       verifiedBy: adminId,
  //     };

  //     await payment.save();

  //     res.status(200).json({
  //       success: true,
  //       message: "Payment rejected successfully",
  //       data: payment.paymentStatus,
  //     });
  //   } catch (error) {
  //     console.error("Reject Payment Error:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to reject payment",
  //       error:
  //         process.env.NODE_ENV === "development"
  //           ? error.message
  //           : "Internal server error",
  //     });
  //   }
  // },


  rejectPayment: async (req, res) => {
    try {
      const { paymentId } = req.params;
      const { rejectionReason } = req.body; // Get rejection reason from request body
      const adminId = req.user?.id;

      // Validate rejection reason
      if (!rejectionReason || !rejectionReason.trim()) {
        return res.status(400).json({
          success: false,
          message: "Rejection reason is required",
        });
      }

      // Validate rejection reason length
      if (rejectionReason.trim().length > 500) {
        return res.status(400).json({
          success: false,
          message: "Rejection reason must be less than 500 characters",
        });
      }

      const payment = await Payment.findOne({ paymentId });

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment not found",
        });
      }

      if (payment.paymentStatus.status !== "pending") {
        return res.status(400).json({
          success: false,
          message: `Payment is already ${payment.paymentStatus.status}`,
        });
      }

      // Update payment status to rejected with reason
      payment.paymentStatus = {
        ...payment.paymentStatus,
        status: "rejected",
        verificationDate: new Date(),
        verifiedBy: adminId,
        rejectionReason: rejectionReason.trim(), // Store the rejection reason
      };

      await payment.save();

      res.status(200).json({
        success: true,
        message: "Payment rejected successfully",
        data: {
          paymentId: payment.paymentId,
          status: payment.paymentStatus.status,
          rejectionReason: payment.paymentStatus.rejectionReason,
          verificationDate: payment.paymentStatus.verificationDate,
          verifiedBy: payment.paymentStatus.verifiedBy,
        },
      });
    } catch (error) {
      console.error("Reject Payment Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to reject payment",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  getPaymentById: async (req, res) => {
    try {
      const payment = await Payment.findOne({
        paymentId: req.params.paymentId,
      }).populate("paymentStatus.verifiedBy", "name email");
      if (!payment)
        return res
          .status(404)
          .json({ success: false, message: "Payment not found" });
      res.status(200).json({ success: true, data: payment });
    } catch (error) {
      console.error("Get Payment By ID Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch payment",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  // getUserSubscriptions: async (req, res) => {
  //   try {
  //     const { userId } = req.params;
  //     const { page = 1, limit = 10 } = req.query;
  //     const skip = (page - 1) * limit;

  //     // Get all payments for the user
  //     const [allPayments, totalCount] = await Promise.all([
  //       Payment.find({ "userDetails.userId": userId })
  //         .sort({ "paymentStatus.submissionDate": -1 })
  //         .skip(Number(skip))
  //         .limit(Number(limit)),
  //       Payment.countDocuments({ "userDetails.userId": userId }),
  //     ]);

  //     // Separate verified and pending subscriptions
  //     const verifiedSubscriptions = allPayments.filter(
  //       (payment) =>
  //         payment.paymentStatus?.status === "completed" ||
  //         payment.paymentStatus?.status === "verified" ||
  //         payment.paymentStatus?.status === "success"
  //     );

  //     const pendingSubscriptions = allPayments.filter(
  //       (payment) =>
  //         payment.paymentStatus?.status === "pending" ||
  //         payment.paymentStatus?.status === "processing" ||
  //         payment.paymentStatus?.status === "initiated"
  //     );

  //     // Format response data
  //     const formatSubscription = (payment) => ({
  //       id: payment._id,
  //       plan_name: payment.planDetails?.planName || payment.planDetails?.name,
  //       amount: payment.paymentDetails?.amount,
  //       currency: payment.paymentDetails?.currency || "PKR",
  //       payment_method: payment.paymentDetails?.method,
  //       status: payment.paymentStatus?.status,
  //       created_date: payment.paymentStatus?.submissionDate,
  //       start_date: payment.subscriptionDetails?.startDate,
  //       end_date: payment.subscriptionDetails?.endDate,
  //       // Add actions for pending subscriptions
  //       actions:
  //         payment.paymentStatus?.status === "pending"
  //           ? {
  //               can_edit: true,
  //               can_delete: true,
  //             }
  //           : undefined,
  //     });

  //     res.status(200).json({
  //       success: true,
  //       data: {
  //         verified_subscriptions: verifiedSubscriptions.map(formatSubscription),
  //         pending_subscriptions: pendingSubscriptions.map(formatSubscription),
  //         pagination: {
  //           currentPage: Number(page),
  //           totalPages: Math.ceil(totalCount / limit),
  //           totalCount,
  //           verifiedCount: verifiedSubscriptions.length,
  //           pendingCount: pendingSubscriptions.length,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Get User Subscriptions Error:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to fetch user subscriptions",
  //       error:
  //         process.env.NODE_ENV === "development"
  //           ? error.message
  //           : "Internal server error",
  //     });
  //   }
  // },

  // // Additional methods for pending subscription management
  // updatePendingSubscription: async (req, res) => {
  //   try {
  //     const { userId, subscriptionId } = req.params;
  //     const updateData = req.body;

  //     // Only allow editing if status is pending
  //     const subscription = await Payment.findOne({
  //       _id: subscriptionId,
  //       "userDetails.userId": userId,
  //       "paymentStatus.status": { $in: ["pending", "processing", "initiated"] },
  //     });

  //     if (!subscription) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Pending subscription not found or cannot be edited",
  //       });
  //     }

  //     const updatedSubscription = await Payment.findByIdAndUpdate(
  //       subscriptionId,
  //       { $set: updateData },
  //       { new: true, runValidators: true }
  //     );

  //     res.status(200).json({
  //       success: true,
  //       message: "Subscription updated successfully",
  //       data: updatedSubscription,
  //     });
  //   } catch (error) {
  //     console.error("Update Pending Subscription Error:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to update subscription",
  //       error:
  //         process.env.NODE_ENV === "development"
  //           ? error.message
  //           : "Internal server error",
  //     });
  //   }
  // },

  // deletePendingSubscription: async (req, res) => {
  //   try {
  //     const { userId, subscriptionId } = req.params;

  //     // Only allow deletion if status is pending
  //     const subscription = await Payment.findOne({
  //       _id: subscriptionId,
  //       "userDetails.userId": userId,
  //       "paymentStatus.status": { $in: ["pending", "processing", "initiated"] },
  //     });

  //     if (!subscription) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "Pending subscription not found or cannot be deleted",
  //       });
  //     }

  //     await Payment.findByIdAndDelete(subscriptionId);

  //     res.status(200).json({
  //       success: true,
  //       message: "Subscription deleted successfully",
  //     });
  //   } catch (error) {
  //     console.error("Delete Pending Subscription Error:", error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Failed to delete subscription",
  //       error:
  //         process.env.NODE_ENV === "development"
  //           ? error.message
  //           : "Internal server error",
  //     });
  //   }
  // },


//   // GET subscriptions categorized by status
// getUserSubscriptions: async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const subscriptions = await Payment.find({ "userDetails.userId": userId });

//     const active = [];
//     const expired = [];
//     const pending = [];
//     const rejected = [];

//     subscriptions.forEach((sub) => {
//       const status = sub.paymentStatus.status;
//       const isActive = sub.paymentStatus.isActive;

//       if (status === 'verified' && isActive) active.push(sub);
//       else if (status === 'expired') expired.push(sub);
//       else if (status === 'pending') pending.push(sub);
//       else if (status === 'rejected') rejected.push(sub);
//     });

//     res.json([...active, ...expired, ...pending, ...rejected]); // frontend filters again
//   } catch (err) {
//     console.error('Error fetching subscriptions:', err);
//     res.status(500).json({ message: 'Server error fetching subscriptions' });
//   }
// },


getUserSubscriptions: async (req, res) => {
  const { userId } = req.params;

  try {
    // Add basic validation
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const subscriptions = await Payment.find({ "userDetails.userId": userId }).lean();

    // Return early if no subscriptions found
    if (!subscriptions || subscriptions.length === 0) {
      return res.json({
        active: [],
        expired: [],
        pending: [],
        rejected: [],
        total: 0
      });
    }

    // Use reduce for more efficient categorization
    const categorized = subscriptions.reduce((acc, sub) => {
      const status = sub.paymentStatus?.status;
      const isActive = sub.paymentStatus?.isActive;

      // Handle potential missing paymentStatus
      if (!status) {
        acc.pending.push(sub);
        return acc;
      }

      if (status === 'verified' && isActive) {
        acc.active.push(sub);
      } else if (status === 'expired') {
        acc.expired.push(sub);
      } else if (status === 'pending') {
        acc.pending.push(sub);
      } else if (status === 'rejected') {
        acc.rejected.push(sub);
      }

      return acc;
    }, {
      active: [],
      expired: [],
      pending: [],
      rejected: []
    });

    // Return structured response instead of flattened array
    res.json({
      ...categorized,
      total: subscriptions.length
    });

  } catch (err) {
    console.error('Error fetching user subscriptions:', err);
    res.status(500).json({ 
      message: 'Failed to fetch subscriptions',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
},


// PUT update a pending subscription
updatePendingSubscription: async (req, res) => {
  const { userId, subscriptionId } = req.params;
  const updatedFields = req.body;

  try {
    const subscription = await Payment.findOne({ _id: subscriptionId, userId });

    if (!subscription || subscription.paymentStatus.status !== 'pending') {
      return res.status(404).json({ message: 'Pending subscription not found' });
    }

    // Update selectedPlan or other fields as needed
    Object.assign(subscription.selectedPlan, updatedFields.selectedPlan || {});
    subscription.paymentStatus.updatedAt = Date.now(); // optional

    await subscription.save();
    res.json({ message: 'Subscription updated', subscription });
  } catch (err) {
    console.error('Error updating subscription:', err);
    res.status(500).json({ message: 'Error updating pending subscription' });
  }
},

// DELETE a pending subscription
deletePendingSubscription: async (req, res) => {
  const { userId, subscriptionId } = req.params;

  try {
    const subscription = await Payment.findOne({
      _id: subscriptionId,
      userId,
      'paymentStatus.status': 'pending'
    });

    if (!subscription) {
      return res.status(404).json({ message: 'Pending subscription not found' });
    }

    await Payment.deleteOne({ _id: subscriptionId });
    res.json({ message: 'Subscription deleted' });
  } catch (err) {
    console.error('Error deleting subscription:', err);
    res.status(500).json({ message: 'Error deleting pending subscription' });
  }
},

  getUserSubscriptionStatus: async (req, res) => {
    try {
      const status = await Payment.getUserSubscriptionStatus(req.params.userId);
      res.status(200).json({ success: true, data: status });
    } catch (error) {
      console.error("Get Subscription Status Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscription status",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  getPendingPayments: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * limit;

      const [payments, totalCount] = await Promise.all([
        Payment.find({ "paymentStatus.status": "pending" })
          .sort({ "paymentStatus.submissionDate": -1 })
          .skip(Number(skip))
          .limit(Number(limit)),
        Payment.countDocuments({ "paymentStatus.status": "pending" }),
      ]);

      res.status(200).json({
        success: true,
        data: {
          payments,
          pagination: {
            currentPage: Number(page),
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
          },
        },
      });
    } catch (error) {
      console.error("Get Pending Payments Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch pending payments",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  updatePaymentNotes: async (req, res) => {
    try {
      const { paymentId } = req.params;
      const { notes } = req.body;

      const payment = await Payment.findOneAndUpdate(
        { paymentId },
        { "paymentStatus.notes": notes },
        { new: true }
      );

      if (!payment)
        return res
          .status(404)
          .json({ success: false, message: "Payment not found" });
      res.status(200).json({
        success: true,
        message: "Payment notes updated successfully",
        data: { paymentId: payment.paymentId, notes },
      });
    } catch (error) {
      console.error("Update Payment Notes Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update payment notes",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  downloadReceipt: async (req, res) => {
    try {
      const payment = await Payment.findOne({
        paymentId: req.params.paymentId,
      });
      if (!payment)
        return res
          .status(404)
          .json({ success: false, message: "Payment not found" });

      const filePath = payment.paymentReceipt.filePath;
      try {
        await fs.access(filePath);
        res.download(filePath, payment.paymentReceipt.originalFileName);
      } catch {
        res
          .status(404)
          .json({ success: false, message: "Receipt file not found" });
      }
    } catch (error) {
      console.error("Download Receipt Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to download receipt",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },

  // Add this function to your paymentController object, before the closing brace

  getPaymentStats: async (req, res) => {
    try {
      const stats = await Payment.aggregate([
        {
          $group: {
            _id: null,
            totalPayments: { $sum: 1 },
            pendingCount: {
              $sum: {
                $cond: [{ $eq: ["$paymentStatus.status", "pending"] }, 1, 0],
              },
            },
            verifiedCount: {
              $sum: {
                $cond: [{ $eq: ["$paymentStatus.status", "verified"] }, 1, 0],
              },
            },
            rejectedCount: {
              $sum: {
                $cond: [{ $eq: ["$paymentStatus.status", "rejected"] }, 1, 0],
              },
            },
            totalRevenue: {
              $sum: {
                $cond: [
                  { $eq: ["$paymentStatus.status", "verified"] },
                  "$selectedPlan.price",
                  0,
                ],
              },
            },
          },
        },
      ]);

      // Get monthly stats for the last 6 months
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const monthlyStats = await Payment.aggregate([
        {
          $match: {
            "paymentStatus.submissionDate": { $gte: sixMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$paymentStatus.submissionDate" },
              month: { $month: "$paymentStatus.submissionDate" },
            },
            count: { $sum: 1 },
            revenue: {
              $sum: {
                $cond: [
                  { $eq: ["$paymentStatus.status", "verified"] },
                  "$selectedPlan.price",
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ]);

      // Get plan popularity
      const planStats = await Payment.aggregate([
        {
          $group: {
            _id: "$selectedPlan.planId",
            planName: { $first: "$selectedPlan.planName" },
            count: { $sum: 1 },
            revenue: {
              $sum: {
                $cond: [
                  { $eq: ["$paymentStatus.status", "verified"] },
                  "$selectedPlan.price",
                  0,
                ],
              },
            },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);

      const result = {
        overview: stats[0] || {
          totalPayments: 0,
          pendingCount: 0,
          verifiedCount: 0,
          rejectedCount: 0,
          totalRevenue: 0,
        },
        monthlyStats,
        planStats,
      };

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Get Payment Stats Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch payment statistics",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  },
};

module.exports = paymentController;
