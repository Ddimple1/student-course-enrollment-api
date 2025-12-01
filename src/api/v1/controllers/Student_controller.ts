import { Request, Response }from "express"; 
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Student } from "../models/Student_model";
let students: Student[] = [];

export const getAllStudents = (req: Request, res: Response): void => {
  let filteredStudents = [...students];

    // Filtering
    const { program, enrollment_year } = req.query;

    if (program) {
        filteredStudents = filteredStudents.filter(
            s => s.program?.toLowerCase() === (program as string).toLowerCase()
        );
    }

    if (enrollment_year) {
        filteredStudents = filteredStudents.filter(
            s => s.enrollment_year === Number(enrollment_year)
        );
    }

    // Sorting
    const { sort } = req.query;
    if (sort === "FullName") {
        filteredStudents.sort((a, b) => a.FullName.localeCompare(b.FullName));
    }

    res.status(HTTP_STATUS.OK).json({
        message: "All students fetched successfully",
        data:filteredStudents,
    });
};

export const addStudent = (req:Request, res:Response): void => {
    const {FullName, email, program, enrollment_year} = req.body;

    if (!FullName || !email ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "All fields are required",
        });
        return;
    }

    const newStudent: Student = {
        id: students.length + 1,
        FullName,
        email,
        program,
        enrollment_year,
    };

    students.push(newStudent);

    res.status(HTTP_STATUS.CREATED).json({
        message: "Students added successfully",
        data: newStudent,
    });
};

export const UpdateStudent = (req: Request, res: Response): void => {
  const studentId = parseInt(req.params.id);
  const { FullName, email, program, enrollment_year } = req.body;

  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Student not found" });
    return;
  }

  const updatedStudent: Student = {
    ...students[studentIndex],
    FullName: FullName || students[studentIndex].FullName,
    email: email || students[studentIndex].email,
    program: program || students[studentIndex].program,
    enrollment_year: enrollment_year || students[studentIndex].enrollment_year,
  };

  students[studentIndex] = updatedStudent;

  res.status(HTTP_STATUS.OK).json({
    message: "Student updated successfully",
    data: updatedStudent,
  });
};

// DELETE /api/students/:id
export const deleteStudent = (req: Request, res: Response): void => {
  const studentId = parseInt(req.params.id);
  const existing = students.find((s) => s.id === studentId);

  if (!existing) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Student not found" });
    return;
  }

  students = students.filter((s) => s.id !== studentId);

  res.status(HTTP_STATUS.OK).json({
    message: "Student deleted successfully",
    data: existing,
  });
};
