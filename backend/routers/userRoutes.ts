import express from "express";
import { userController } from "../server";
import { isLoggedIn } from "../middleware/isLoggedInGuard";
import { signUpMiddleware } from "../middleware/signUpMiddleware";
import { postMiddleware } from "../middleware/postMiddleware";

export const logInRoutes = express.Router();

logInRoutes.post("/login", userController.logIn);
logInRoutes.post("/signUp", signUpMiddleware, userController.signUp);
logInRoutes.post("/getInterest", userController.getUserInterest);
logInRoutes.post("/interest", userController.addInterest);
logInRoutes.post("/editInterest", userController.editInterest);
logInRoutes.post("/post", postMiddleware, userController.newPost);
logInRoutes.post("/profile", userController.getPersonalInfo);
logInRoutes.post(
    "/updateProfile",
    signUpMiddleware,
    userController.updateUserProfile
);
logInRoutes.post("/browsePost", userController.userBrowsePost);
logInRoutes.get("/", isLoggedIn, userController.getSelfInfo);

logInRoutes.get("/getAllUsers", userController.getAllUsers);
logInRoutes.post("/getUserProfile", userController.getUserProfile);
logInRoutes.post("/getUserFriends", userController.getUserFriends);
logInRoutes.post("/updateUserPermission", userController.updateUserPermission);

// added by danny
logInRoutes.post(
    "/getUserFriendsWithInfo",
    userController.getUserFriendsWithInfo
);
