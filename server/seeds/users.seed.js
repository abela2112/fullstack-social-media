import { config } from "dotenv";
import mongoose from "mongoose";
import User from "../model/user.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    
    firstName: "Emma",
    lastName: "Thompson",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    
    firstName: "Olivia",
    lastName: "Miller",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    
    firstName: "Sophia",
    lastName: "Davis",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
   
    firstName: "Ava",
    lastName: "Wilson",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    
    firstName: "Isabella",
    lastName: "Brown",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    
    firstName: "Mia",
    lastName: "Johnson",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    firstName: "Charlotte",
    lastName: "Williams",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    
    firstName: "Amelia",
    lastName: "Garcia",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    firstName: "James",
    lastName: "Anderson",
    
    password: "123456",
    picture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    
    firstName: "William",
    lastName: "Clark",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
 
    firstName: "Benjamin",
    lastName: "Taylor",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    
    firstName: "Lucas",
    lastName: "Moore",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",

    firstName: "Henry",
    lastName: "Jackson",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",

    firstName: "Alexander",
    lastName: "Martin",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    
    firstName: "Daniel",
    lastName: "Rodriguez",
    password: "123456",
    picture: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();