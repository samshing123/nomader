import express from "express";
import { getDataController } from "../server";

export const dataRoutes = express.Router();

dataRoutes.get("/interest", getDataController.getInterests);
dataRoutes.get("/country", getDataController.getCountries);
dataRoutes.get("/post", getDataController.getPosts);
dataRoutes.get("/hotPost", getDataController.getHotPosts);
dataRoutes.get("/attraction", getDataController.getAttractions);
dataRoutes.get("/code", getDataController.getCode);
dataRoutes.post("/rate", getDataController.getRate);
dataRoutes.post("/emergency", getDataController.getEmergency);
