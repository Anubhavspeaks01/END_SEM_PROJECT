const Complaint = require('../models/Complaint');

/**
 * @desc    Create new complaint
 * @route   POST /api/complaints
 * @access  Public (Can be protected if needed)
 */
const createComplaint = async (req, res, next) => {
  try {
    const { name, email, title, description, category, location } = req.body;

    // Create complaint in DB
    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location
      // aiAnalysis will be added later when we integrate AI Route
    });

    res.status(201).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all complaints
 * @route   GET /api/complaints
 * @access  Private/Admin
 */
const getComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update complaint status
 * @route   PUT /api/complaints/:id
 * @access  Private/Admin
 */
const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      res.status(404);
      throw new Error(`Complaint not found with id of ${req.params.id}`);
    }

    // Allow only valid statuses to be updated
    const validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error('Invalid status update');
    }

    complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Search/Filter complaints by location
 * @route   GET /api/complaints/search?location=Ghaziabad
 * @access  Private/Admin
 */
const searchComplaintsByLocation = async (req, res, next) => {
  try {
    const { location } = req.query;

    if (!location) {
      res.status(400);
      throw new Error('Please provide a location query parameter');
    }

    // Using case-insensitive regex for flexible searching
    const complaints = await Complaint.find({
      location: { $regex: location, $options: 'i' }
    });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete complaint
 * @route   DELETE /api/complaints/:id
 * @access  Private/Admin
 */
const deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      res.status(404);
      throw new Error(`Complaint not found with id of ${req.params.id}`);
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
  searchComplaintsByLocation,
  deleteComplaint
};
