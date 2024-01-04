const Member = require("../models/Member");

// Handler to fetch a particular member profile
exports.getMemberProfile = async (req, res) => {
  try {
    // get member id from req.user.id
    const userId = req.user.id;
    const user = await Member.findById(userId)
      .populate({
        path: "memberAccount", 
        populate: {
          path: "transactions",
        },
      })
      .exec();
    console.log("User in getMemberProfileHandler:",user);
    return res.status(200).json({
      success: true,
      user,
      message: "User profile fetched successfully",

    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error occured while getting member profile",
    });
  }
};

// Handler to fetch all members profile
exports.getAllProfile = async (req, res) => {
  try {
    const users = await Member.find()
      .populate({
        path: "memberAccount",
        populate: "transactions",
      })
      .exec();
    // console.log("Printing All Members:",users);
    return res.status(200).json({
      success: true,
      users,
      message: "Profiles Fetched successfully.",
    });
  } catch (err) {
    // console.log(err);
    console.error(err);
    return res.status(500).json({
      success: false,
      message:
        "Error occured while fetching user profile. Please try again later.",
    });
  }
};
