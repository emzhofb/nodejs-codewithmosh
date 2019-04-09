const mongoose = require("mongoose");

// connecting to mongodb database
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB...."))
  .catch(err => console.log("Couldn't connect to mongoDB", err));

// create schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublish: Boolean
});

// create model
const Course = mongoose.model("Course", courseSchema); // class

async function createCourses() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublish: true
  }); // object

  // save to database
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({
    author: "Mosh",
    isPublish: true
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({
      name: 1
    })
    .count();
  console.log(courses);
}

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   course.isPublish = true;
//   course.author = "Another Author";
//   // or use this
//   // course.set({
//   //   isPublish: true,
//   //   author: "Another Author"
//   // });
//   const result = await course.save();
//   console.log(result);
// }

// async function updateCourse(id) {
//   const result = await Course.update(
//     { _id: id },
//     {
//       $set: {
//         author: "Mosh",
//         isPublish: false
//       }
//     }
//   );
//   console.log(result);
// }
// or
async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Mike",
        isPublish: true
      }
    },
    { new: true }
  );
  console.log(result);
}

async function deleteCourse(id) {
  // const result = await Course.deleteOne({ _id: id });
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

deleteCourse("5cacb5700cd5da14475f2532");

// querying documents use find to filter documents
// async function getCourses() {
//   const courses = await Course
//     //   .find({
//     //     author: "Mosh",
//     //     isPublish: true
//     //   })
//     // /^Mosh/ is starts with mosh,
//     // so mosh hamedani, moshi moshi can returned
//     .find({ author: /^Mosh/ })
//     // end with hamedani
//     // $ is indicated the ends of history
//     // this query is not case sensitive
//     // or /Hamedani$/ => to case sensitive
//     .find({ author: /Hamedani$/i })
//     // contains Mosh, so Mosh can be at beginning, middle or the end
//     // i is for not case sensitive
//     .find({ author: /.*Mosh.*/i })

//     .limit(10)
//     .sort({
//       name: 1
//     })
//     .select({
//       name: 1,
//       tags: 1
//     });
//   console.log(courses);
// }
// getCourses();

// Comparison operator in mongodb

// async function getCourses() {
//   // eq => equal
//   // ne => not equal
//   // gt => greater than
//   // gte => greater than or equal to
//   // lt => less than
//   // lte => less than or equal to
//   // in => in
//   // nin => not in

//   const courses = await Course
//     //   .find({
//     //     price: {
//     //       $gte: 10,
//     //       $lte: 20
//     //     }
//     //   })
//     .find({
//       price: {
//         $in: [10, 15, 20]
//       }
//     })
//     .limit(10)
//     .sort({
//       name: 1
//     })
//     .select({
//       name: 1,
//       tags: 1
//     });
//   console.log(courses);
// }
// getCourses();

// logical operators in mongodb
// async function getCourses() {
//   // or
//   // and
//   const courses = await Course.find()
//     .or([{ author: "Mosh" }, { isPublish: true }])
//     .limit(10)
//     .sort({
//       name: 1
//     })
//     .select({
//       name: 1,
//       tags: 1
//     });
//   console.log(courses);
// }
// getCourses();
