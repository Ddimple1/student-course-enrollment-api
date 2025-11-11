import { Request, Response }from "express"; 
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Course } from "../models/Course_model";

let courses : Course[] = [];

export const getAllCourses = (req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
        message: "All courses fetched successfully",
        data: courses,
    });
};

export const addCourse = (req:Request, res:Response): void => {
    const {Course_Name, Course_credit, Course_duration, Course_description} = req.body;

    if (!Course_Name || !Course_credit || !Course_duration || !Course_description) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "All fields are required",
        });
        return;
    }

    const newCourse: Course = {
        Course_id: courses.length + 1,
        Course_Name,
        Course_credit,
        Course_description,
        Course_duration,
    };

    courses.push(newCourse);

    res.status(HTTP_STATUS.CREATED).json({
        message: "Courses added successfully",
        data: newCourse,
    });
};

export const UpdateCourse = (req: Request, res: Response): void => {
  const Course_id = parseInt(req.params.id);
  const { Course_Name, Course_credit, Course_duration, Course_description} = req.body;

  const CourseIndex = courses.findIndex((c) => c.Course_id === Course_id);

  if (CourseIndex === -1) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Course not found" });
    return;
  }

  const updatedCourse: Course = {
    ...courses[CourseIndex],
    Course_Name: Course_Name || courses[CourseIndex].Course_Name,
    Course_credit: Course_credit || courses[CourseIndex].Course_credit,
    Course_description: Course_description || courses[CourseIndex].Course_description,
    Course_duration: Course_duration || courses[CourseIndex].Course_duration,
  };

  courses[CourseIndex] = updatedCourse;

  res.status(HTTP_STATUS.OK).json({
    message: "Courses updated successfully",
    data: updatedCourse,
  });
};

export const deleteCourse = (req: Request, res: Response): void => {
  const Course_id = parseInt(req.params.id);
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
