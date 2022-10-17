import { UserService } from "../service/userService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { checkPassword } from "../utils/hash";
import jwtSimple from "jwt-simple";
import jwt from "../utils/jwt";
import { Interest, Post, User } from "../utils/models";

export class UserController {
    constructor(private userService: UserService) {}

    logIn = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;
            console.log(req.body);
            if (!username || !password) {
                res.status(400).json({
                    success: false,
                    message: "invalid username/password",
                });
                return;
            }

            const user = await this.userService.getUserByUserName(username);
            console.log(user);
            if (!user) {
                res.status(401).json({
                    success: false,
                    message: "No such user or wrong password",
                });
                return;
            }
            const match = await checkPassword(password, user["password"]);
            if (match) {
                if (req.session) {
                    req.session["user"] = {
                        id: user["id"],
                        username: user["username"],
                    };

                    //jwt
                    const payload = {
                        id: user.id,
                        username: user.username,
                    };
                    const token = jwtSimple.encode(payload, jwt.jwtSecret);
                    console.log("isAdmin = " + user.isAdmin);

                    res.status(200).json({
                        success: true,
                        message: "success",
                        token: token,
                        username: user.username,
                        id: user.id,
                        // additional user information needed - danny
                        isAdmin: user.isAdmin,
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: "No such user or wrong password",
                });
                return;
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };

    signUp = async (req: Request, res: Response) => {
        try {
            let userData = req.form?.fields;
            const file = req.form?.files.profile;
            const profile = file?.["newFilename"];
            userData!.profile = profile;

            console.log(userData);

            const newUser = await this.userService.create(
                userData as any as User
            );
            if (newUser) {
                res.status(201).json({ success: true, message: "Created" });
            } else {
                res.status(405).json({
                    success: false,
                    message: "Username is already used.",
                });
            }
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getSelfInfo = async (req: Request, res: Response) => {
        try {
            const user = req.user!;
            res.json(user);
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getUserInterest = async (req: Request, res: Response) => {
        try {
            const user_id = req.body.uid;
            console.log("user", user_id);
            const foundInterest = await this.userService.getInterestByUserId(
                req.body.uid
            );
            console.log(foundInterest);
            if (!foundInterest) {
                res.status(401).json({
                    success: false,
                    message: "No interest",
                });
                return;
            }
            res.status(201).json({
                success: true,
                message: "Interest Found",
                interest: foundInterest,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    addInterest = async (req: Request, res: Response) => {
        try {
            const user_id: number = req.body.user_id;
            let interestIdList: number[] = [];
            req.body.interestList.forEach((element: any) => {
                interestIdList.push(element.id);
            });
            await this.userService.addInterest(user_id, interestIdList);
            res.status(201).json({
                success: true,
                message: "Updated Interest List",
            });
            console.log(req.body);
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    editInterest = async (req: Request, res: Response) => {
        try {
            const user_id: number = req.body.user_id;
            let interestIdList: number[] = [];
            req.body.interestList.forEach((element: any) => {
                interestIdList.push(element.id);
            });
            await this.userService.editInterest(user_id, interestIdList);
            res.status(201).json({
                success: true,
                message: "Updated Interest List",
            });
            console.log(req.body);
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    newPost = async (req: Request, res: Response) => {
        try {
            let postData = req.form?.fields;
            const file = req.form?.files.image;
            const image = file?.["newFilename"];
            postData!.image = image;

            const resp = await this.userService.addPost(
                postData as any as Post
            );
            console.log(resp);
            res.status(201).json({
                success: true,
                message: "New Post Created",
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    userBrowsePost = async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            await this.userService.addUserBrowsePost(req.body);
            res.status(201).json({
                success: true,
                message: "Success count",
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getPersonalInfo = async (req: Request, res: Response) => {
        try {
            const user_id = req.body.uid;
            const user = await this.userService.getUserByUserId(user_id);
            // console.log("controller", user);
            res.status(200).json({
                success: true,
                message: "success",
                userDetail: user,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    };

    //Danny
    getAllUsers = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.getAllUsersData();

            res.status(201).json({
                success: true,
                message: "Success getting all users",
                userList: result,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getUserProfile = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;

            if (!username) {
                res.status(401).json({
                    success: false,
                    message: "No username provided",
                });
                return;
            }
            const result = await this.userService.getUserProfileData(username);

            console.log("check", result);
            res.status(201).json({
                success: true,
                message: "Success getting user profile",
                userProfile: result,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getUserFriends = async (req: Request, res: Response) => {
        try {
            const user_id = req.body.user_id;
            if (!user_id) {
                res.status(401).json({
                    success: false,
                    message: "No username provided",
                });
                return;
            }

            const result = await this.userService.getUserFriends(user_id);

            console.log("<Controller - User Freinds>", result);

            res.status(201).json({
                success: true,
                message: "Success getting user friends",
                userFriends: result,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    updateUserProfile = async (req: Request, res: Response) => {
        try {
            let userData = req.form?.fields;
            const file = req.form?.files.profile;
            const profile = file?.["newFilename"];
            userData!.profile = profile;

            console.log(userData);
            await this.userService.update(userData as any as User);

            res.status(201).json({ success: true, message: "Updated" });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    updateUserPermission = async (req: Request, res: Response) => {
        try {
            const username = req.body.username;
            const permissions = req.body.permissions;
            if (!username) {
                res.status(401).json({
                    success: false,
                    message: "No username provided",
                });
                return;
            }

            const result = await this.userService.updateUserPermission(
                username,
                permissions
            );

            console.log("<Controller - Update User Permission>", result);

            res.status(201).json({
                success: true,
                message: "Success Update User Permission",
                result: result,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };

    getUserFriendsWithInfo = async (req: Request, res: Response) => {
        try {
            const user_id = req.body.user_id;
            if (!user_id) {
                res.status(401).json({
                    success: false,
                    message: "No username provided",
                });
                return;
            }

            const result = await this.userService.getUserFriendsWithInfo(
                user_id
            );

            console.log("<Controller - getUserFriendsWithInfo>", result);

            res.status(201).json({
                success: true,
                message: "Success getting user friends",
                userFriends: result,
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }
    };
}

declare global {
    namespace Express {
        interface Request {
            user?: Omit<User, "password">;
            interest?: Array<Interest>;
        }
    }
}
