import { Request, Response } from "express";
import {auth} from "../../../config/firebaseConfig";

// GET USER DETAILS
export const getUserById = async (req: Request, res: Response) => {
    const { uid } = req.params;

    try {
        const userRecord = await auth.getUser(uid);

        return res.status(200).json({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            disabled: userRecord.disabled,
            claims: userRecord.customClaims || {}
        });
    } catch (error: any) {
        return res.status(400).json({
            message: "Error retrieving user",
            error: error.message
        });
    }
};

// ADMIN: SET CUSTOM ROLE
export const setUserRole = async (req: Request, res: Response) => {
    const { uid } = req.params;
    const { role } = req.body;

    if (!role) {
        return res.status(400).json({ message: "Role is required" });
    }

    try {
        await auth.setCustomUserClaims(uid, { role });

        return res.status(200).json({
            message: `Role '${role}' assigned to user ${uid}`
        });
    } catch (error: any) {
        return res.status(400).json({
            message: "Error setting role",
            error: error.message
        });
    }
};
