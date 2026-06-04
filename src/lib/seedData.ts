import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const sampleUsers = [
  { displayName: "Jane Doe", email: "jane@test.com", points: 145, reports: 8 },
  { displayName: "Sarah Brown", email: "sarah@test.com", points: 132, reports: 7 },
  { displayName: "David Williams", email: "david@test.com", points: 125, reports: 5 },
  { displayName: "Michael Miller", email: "michael@test.com", points: 89, reports: 4 },
  { displayName: "Mary Smith", email: "mary@test.com", points: 76, reports: 3 },
  { displayName: "Peter Jones", email: "peter@test.com", points: 54, reports: 2 },
  { displayName: "Sarah Wilson", email: "sara.wilson@test.com", points: 43, reports: 2 },
  { displayName: "Patricia Taylor", email: "patricia@test.com", points: 32, reports: 1 },
  { displayName: "James Martin", email: "james@test.com", points: 25, reports: 1 },
];

export async function seedSampleUsers() {
  try {
    // Check if users already exist
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    
    if (snapshot.size > 0) {
      console.log("Users already exist, skipping seed.");
      return;
    }

    // Add sample users
    for (const user of sampleUsers) {
      await addDoc(usersRef, {
        displayName: user.displayName,
        email: user.email,
        points: user.points,
        reports: user.reports,
        badges: ["contributor"],
        createdAt: new Date(),
      });
    }
    console.log("Sample users seeded successfully.");
  } catch (err) {
    console.error("Error seeding sample users:", err);
  }
}
