import { Router } from "express";
import { getAllAlbums } from "../controllers/albums.controller.js";

const router = Router()

router.get('/', getAllAlbums)

export default router