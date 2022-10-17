import { MatchService } from "../service/matchService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";
// import jwtSimple from 'jwt-simple';
// import jwt from '../utils/jwt';
// import { Bearer } from 'permit';

export class MatchController {
    constructor(private matchService: MatchService) {}

    matchUser = async (req: Request, res: Response) => {
        try {
            // const permit = new Bearer({
            //     query: "access_token"
            // })
            // const token = permit.check(req);
            // const payload = jwtSimple.decode(token, jwt.jwtSecret);
            // const userId = payload.id as number;

            console.log(req.body);
            const userId = req.body.user_id as number;
            const waitingList: Array<{ user1_id: number }> = [];
            const waitingUserId =
                await this.matchService.getUserIdWhoWaitMatchYou(userId);
            if (waitingUserId.length > 0) {
                for (let waitingUser of waitingUserId) {
                    const alreadyMatched =
                        await this.matchService.checkAlreadyMatchedUser(
                            userId,
                            waitingUser["user1_id"]
                        );

                    if (alreadyMatched == false) {
                        waitingList.push(waitingUser);
                    }
                }
            }

            let allUserId = await this.matchService.getAllUserId(userId);
            const wantMatchUserId =
                await this.matchService.geUserIdWhoYouWantToMatch(userId);
            for (let wantUser of wantMatchUserId) {
                allUserId = allUserId.filter((id) => {
                    return id["id"] !== wantUser["user2_id"];
                });
            }

            let randomWaitingId = [0, 0];
            let message = 2;
            switch (waitingList.length) {
                case 0:
                    message = 0;
                    break;
                case 1:
                    randomWaitingId[0] = waitingList[0]["user1_id"];
                    message = 1;
                    break;
                case 2:
                    randomWaitingId[0] = waitingList[0]["user1_id"];
                    randomWaitingId[1] = waitingList[1]["user1_id"];
                    break;
                default:
                    while (randomWaitingId[0] == randomWaitingId[1]) {
                        randomWaitingId[0] =
                            waitingList[
                                Math.floor(Math.random() * waitingList.length)
                            ]["user1_id"];
                        randomWaitingId[1] =
                            waitingList[
                                Math.floor(Math.random() * waitingList.length)
                            ]["user1_id"];
                    }
                    break;
            }

            let randomId = [0, 0, 0];
            switch (allUserId.length) {
                case 0:
                    break;
                case 1:
                    randomId[0] = allUserId[0]["id"];
                    break;
                case 2:
                    randomId[0] = allUserId[0]["id"];
                    randomId[1] = allUserId[1]["id"];
                    break;
                case 3:
                    randomId[0] = allUserId[0]["id"];
                    randomId[1] = allUserId[1]["id"];
                    randomId[2] = allUserId[2]["id"];
                    break;
                default:
                    while (
                        randomId[0] == randomId[1] ||
                        randomId[0] == randomId[2] ||
                        randomId[1] == randomId[2]
                    ) {
                        randomId[0] =
                            allUserId[
                                Math.floor(Math.random() * allUserId.length)
                            ]["id"];
                        randomId[1] =
                            allUserId[
                                Math.floor(Math.random() * allUserId.length)
                            ]["id"];
                        randomId[2] =
                            allUserId[
                                Math.floor(Math.random() * allUserId.length)
                            ]["id"];
                    }
                    break;
            }

            if (randomWaitingId[0] == 0 && randomId.length > 4) {
                do {
                    randomWaitingId[0] =
                        allUserId[Math.floor(Math.random() * allUserId.length)][
                            "id"
                        ];
                    randomWaitingId[1] =
                        allUserId[Math.floor(Math.random() * allUserId.length)][
                            "id"
                        ];
                } while (
                    randomId.filter((num) => num === randomWaitingId[0])
                        .length > 0 ||
                    randomId.filter((num) => num === randomWaitingId[1])
                        .length > 0
                );
            } else if (randomWaitingId[1] == 0 && randomId.length > 3) {
                do {
                    randomWaitingId[1] =
                        allUserId[Math.floor(Math.random() * allUserId.length)][
                            "id"
                        ];
                } while (
                    randomId.filter((num) => num === randomWaitingId[1])
                        .length > 0
                );
            }

            const idArr = randomWaitingId.concat(randomId);
            const matchIdArr = idArr.filter((id) => id !== 0);
            const matchUserData = [];
            for (let id of matchIdArr) {
                const userData = await this.matchService.getUserInfo(id);
                if (userData) {
                    const interestList: Array<{ title: string }> =
                        userData["interestIdList"];
                    let interestArr = [];
                    if (interestList.length > 0) {
                        for (let interest of interestList) {
                            interestArr.push(interest["title"]);
                        }
                    }
                    const userInfo = userData["userData"][0];
                    const userPortfolio = {
                        id: id,
                        username: userInfo["username"],
                        jobTitle: userInfo["title"],
                        profile: userInfo["profile"],
                        information: userInfo["information"],
                        interests: interestArr,
                        country : userInfo["name"]
                    };
                    matchUserData.push(userPortfolio);
                }
            }
            res.status(200).json({
                success: true,
                message: { waitMatchNum: message, user: matchUserData },
            });
            return;
        } catch (err) {
            logger.error(err.toString());
            res.status(401).json({ message: "match failed" });
            return;
        }
    };

    unlikeUser = async (req: Request, res: Response) => {
        try {
            const id = req.body.id;
            const userId = req.body.userId;
            await this.matchService.unlikeWaitingMatchUser(id, userId);
            res.status(200).json({
                success: true,
                message: "success",
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(401).json({ message: "match failed" });
            return;
        }
    };

    likedUser = async (req: Request, res: Response) => {
        try {
            const id = req.body.id;
            const userId = req.body.userId;
            const resp = await this.matchService.likeUser(id, userId);
            console.log(resp);
            res.status(200).json({
                success: true,
                message: "success",
            });
        } catch (err) {
            logger.error(err.toString());
            res.status(401).json({ message: "match failed" });
            return;
        }
    };
}
