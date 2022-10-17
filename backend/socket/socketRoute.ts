import { Router, Request, Response } from "express";

const socketRouter: Router = Router();

socketRouter.get("/chat", (req: Request, res: Response) => {
    console.log('<Server> Up and Running')
    res.send("Server working!").status(200);
});

export default socketRouter;
