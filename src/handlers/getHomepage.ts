import { httpHandler } from "../wrappers/handler.wrapper";

export const getHomepage = httpHandler(async (req, res) => {
    res.send("homepage");
});