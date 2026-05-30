// middlewares/upload.middleware.ts

import multer from "multer";

const storage = multer.memoryStorage();

console.log("running here");
export const upload = multer({
  storage,
});
