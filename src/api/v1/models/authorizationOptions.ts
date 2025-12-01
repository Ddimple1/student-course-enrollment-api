export interface AuthorizationOptions {
    hasRole: Array<"admin" | "student" >;
    allowSameUser?: boolean;
}