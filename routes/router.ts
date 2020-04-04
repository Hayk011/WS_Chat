import {Router, Response, Request,} from "express";

const router = Router();
router.get("/", (request: Request, response: Response) => {
    console.log("hi")
    return response.json({message: "hello"}).end();
});

module.exports = router;