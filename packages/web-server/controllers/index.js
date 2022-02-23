const Router = require("@koa/router");
const IndexController = require("./IndexController");

// 创建router实例
const router = new Router();

router.get("/", new IndexController().actionIndex);
router.post("/login", new IndexController().actionLogin);
router.get("/project", new IndexController().actionGetProjectList);
router.get("/addProject", new IndexController().actionAddProject)

module.exports = (app) => {
	app.use(router.routes()).use(router.allowedMethods());
}
