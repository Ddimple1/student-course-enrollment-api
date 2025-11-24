import Joi from "joi";
import { Enrollment } from "../models/Enrollment_model";

export const createEnrollmentSchema = Joi.object<Enrollment>({
  Enrollment_number: Joi.number().optional(), // assigned by controller
  Enrollment_date: Joi.string().isoDate().required(),
  Enrollment_status: Joi.string().valid("active", "completed", "cancelled").required(),
});

export const updateEnrollmentSchema = Joi.object<Partial<Enrollment>>({
  Enrollment_date: Joi.string().isoDate(),
  Enrollment_status: Joi.string().valid("active", "completed", "cancelled"),
});
