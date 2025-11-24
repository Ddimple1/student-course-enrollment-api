import { Request, Response }from "express"; 
import { HTTP_STATUS } from "../../../../src/constants/httpConstants";
import { Enrollment } from "../models/Enrollment_model";

let enrollments: Enrollment[] = [];
let nextEnrollmentNumber = 1;

/**
 * GET /api/enrollments
 */

export const getAllEnrollments = (req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
        message: "All enrollments fetched successfully",
        data: enrollments,
    });
};

/**
 * POST /api/enrollments
 * expects { Enrollment_date, Enrollment_status }
 */

export const addEnrollment = (req:Request, res:Response): void => {
    const {Enrollment_date, Enrollment_status} = req.body;

    if ( Enrollment_date == null || Enrollment_status == null ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "All fields are required",
        });
        return;
    }

    const newEnrollment: Enrollment = {
        Enrollment_number: nextEnrollmentNumber++,
        Enrollment_date,
        Enrollment_status
    };

    enrollments.push(newEnrollment);

    res.status(HTTP_STATUS.CREATED).json({
        message: "Enrollment added successfully",
        data: newEnrollment,
    });
};

/**
 * PUT /api/enrollments/:id
 */


export const UpdateEnrollment = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid enrollment id" });
    return;
  }

  const { Enrollment_date, Enrollment_status } = req.body;

  const enrollmentIndex = enrollments.findIndex((e) => e.Enrollment_number === id);

  if (enrollmentIndex === -1) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Enrollment not found" });
    return;
  }

  const updatedEnrollment: Enrollment = {
    ...enrollments[enrollmentIndex],
    Enrollment_status: Enrollment_status || enrollments[enrollmentIndex].Enrollment_status,
    Enrollment_date: Enrollment_date || enrollments[enrollmentIndex].Enrollment_date,
  };

  enrollments[enrollmentIndex] = updatedEnrollment;

  res.status(HTTP_STATUS.OK).json({
    message: "enrollments updated successfully",
    data: updatedEnrollment,
  });
};


// DELETE /api/students/:id
export const deleteEnrollment = (req: Request, res: Response): void => {
  const id = Number(req.params.id); 
  if (Number.isNaN(id)) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid enrollment id" });
    return;
  }

  const enrollment = enrollments.find(e => e.Enrollment_number === id);

  if (!enrollment) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Enrollment not found" });
    return;
  }

  enrollments = enrollments.filter(e => e.Enrollment_number !== id);

  res.status(HTTP_STATUS.OK).json({
    message: "Enrollment deleted successfully",
    data: enrollment,
  });
};