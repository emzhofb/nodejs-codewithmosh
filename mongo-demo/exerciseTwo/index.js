const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-exercises");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] }
    // can't use tags: ["frontend", "backend"]
  })
    // or([ {tags: "frontend"}, {tags: "backend"} ])
    .sort({ price: -1 })
    // sort("-price")
    .select({ name: 1, author: 1, price: 1 });
  // select("name author price")
}

async function run() {
  const courses = await getCourses();
  for (let i = 0; i < courses.length; i++) {
    console.log(courses[i]._doc);
  }
}

run();
