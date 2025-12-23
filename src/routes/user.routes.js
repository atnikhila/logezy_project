const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/role.middleware");
const upload = require("../middlewares/export.middleware");


const importCtrl = require("../controllers/user.import.controller");
const exportCtrl = require("../controllers/user.export.controller");

router.get("/", verifyToken, isAdmin, userController.getUsers);
// Logged-in user profile
router.get("/me", verifyToken, userController.getMyProfile);
router.get("/:id", verifyToken, userController.getUserById);
router.put("/:id", verifyToken, isAdmin, userController.updateUser);
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

router.post("/import/users", verifyToken,isAdmin, upload.single("file"), importCtrl.importUsers);
router.get("/export/users", verifyToken, isAdmin, exportCtrl.exportUsers);

module.exports = router;
