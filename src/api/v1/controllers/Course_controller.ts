import { Request, Response }from "express"; 
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Course } from "../models/Course_model";

let courses : Course[] = [];
let nextCourseId = 1;


/**
 * GET /api/courses
 */
export const getAllCourses = (req: Request, res: Response): void => {
  let filteredCourses = [...courses];

    // Filtering
    const { Course_credit, Course_duration, Course_Name } = req.query;

    if (Course_credit) {
        filteredCourses = filteredCourses.filter(
            c => c.Course_credit === Number(Course_credit)
        );
    }

    if (Course_duration) {
        filteredCourses = filteredCourses.filter(
            c => c.Course_duration === Number(Course_duration)
        );
    }

    if (Course_Name) {
        filteredCourses = filteredCourses.filter(
            c => c.Course_Name.toLowerCase().includes((Course_Name as string).toLowerCase())
        );
    }

    // Sorting
    const { sort } = req.query;
    if (sort === "Course_Name") {
        filteredCourses.sort((a, b) => a.Course_Name.localeCompare(b.Course_Name));
    } else if (sort === "Course_credit") {
        filteredCourses.sort((a, b) => a.Course_credit - b.Course_credit);
    }
    
    res.status(HTTP_STATUS.OK).json({
        message: "All courses fetched successfully",
        data: courses,
    });
};

/**
 * POST /api/courses
 * expects { Course_Name, Course_credit, Course_duration, Course_description }
 */
export const addCourse = (req:Request, res:Response): void => {
    const {Course_Name, Course_credit, Course_duration, Course_description} = req.body;

    if (!Course_Name || !Course_credit || !Course_duration || !Course_description) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "All fields are required",
        });
        return;
    }

    // Validate numeric fields
  const creditNum = Number(Course_credit);
  const durationNum = Number(Course_duration);
  if (Number.isNaN(creditNum) || Number.isNaN(durationNum)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Course_credit and Course_duration must be numbers",
    });
    return;
  }

    const newCourse: Course = {
        Course_id: nextCourseId++,
        Course_Name,
        Course_credit: creditNum,
        Course_description,
        Course_duration: durationNum,
    };

    courses.push(newCourse);

    res.status(HTTP_STATUS.CREATED).json({
        message: "Courses added successfully",
        data: newCourse,
    });
};

/**
 * PUT /api/courses/:id
 */
export const UpdateCourse = (req: Request, res: Response): void => {
  const courseId = Number(req.params.id);
  if (Number.isNaN(courseId)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid course id" });
    return;
  }

  const { Course_Name, Course_credit, Course_duration, Course_description} = req.body;

  const CourseIndex = courses.findIndex((c) => c.Course_id === courseId);

  if (CourseIndex === -1) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Course not found" });
    return;
  }

  const updatedCourse: Course = {
    ...courses[CourseIndex],
    Course_Name: Course_Name || courses[CourseIndex].Course_Name,
    Course_credit: Course_credit != null ? Number(Course_credit) : courses[CourseIndex].Course_credit,
    Course_description: Course_description ?? courses[CourseIndex].Course_description,
    Course_duration: Course_duration != null ? Number(Course_duration) : courses[CourseIndex].Course_duration,
  };

  courses[CourseIndex] = updatedCourse;

  res.status(HTTP_STATUS.OK).json({
    message: "Courses updated successfully",
    data: updatedCourse,
  });
};

/**
 * DELETE /api/courses/:id
 */
export const deleteCourse = (req: Request, res: Response): void => {
  const Course_id = Number(req.params.id);
  if (Number.isNaN(Course_id)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid course id" });
    return;
  }
  
  const existing = courses.find((c) => c.Course_id=== Course_id);

  if (!existing) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Course not found" });
    return;
  }

  courses = courses.filter((c) => c.Course_id !== Course_id);

  res.status(HTTP_STATUS.OK).json({
    message: "Course deleted successfully",
    data: existing,
  });
};
