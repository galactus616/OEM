const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const clearAllUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding...");

    // Remove all users
    const result = await User.deleteMany({});
    console.log(
      `✅ Successfully removed ${result.deletedCount} users from database`
    );

    console.log("🎉 Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during seeding:", error.message);
    process.exit(1);
  }
};

// Run the seeder
clearAllUsers();