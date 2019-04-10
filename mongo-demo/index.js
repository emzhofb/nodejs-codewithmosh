const mongoose = require("mongoose");

// connecting to mongodb database
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to mongoDB...."))
  .catch(err => console.log("Couldn't connect to mongoDB", err));

// create schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    // validate: {
    //   // custom validator
    //   validator: function(v) {
    //     return v && v.length > 0;
    //   },
    //   message: "A course should have at least one tag."
    // }

    // async validator
    validate: {
      isAsync: true,
      validator: function(v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have at least one tag."
    }
  },
  date: { type: Date, default: Date.now },
  isPublish: Boolean,
  price: {
    type: Number,
    // can't use arrow function
    required: function() {
      return this.isPublish;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

// create model
const Course = mongoose.model("Course", courseSchema); // class

async function createCourses() {
  const course = new Course({
    name: "Angular Course",
    category: "Web",
    author: "Mosh",
    tags: ["frontend"],
    isPublish: true,
    price: 15.8
  }); // object

  try {
    // await course.validate();
    // save to database
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // validation error
    for (let field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ _id: "5cad90e91b1dbe162aa03b3e" })
    // .skip((pageNumber - 1) * pageSize)
    // .limit(pageSize)
    .sort({
      name: 1
    })
    .select({ name: 1, tags: 1, price: 1 });
  console.log(courses[0].price);
}

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

getCourses();
