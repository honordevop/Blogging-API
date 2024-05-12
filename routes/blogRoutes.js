const passport = require("passport");
const router = require("express").Router();
const {
  createArticle,
  AllPublishedArticles,
  PublishedArticle,
  updatePubishedArticle,
  updatePubishedArticleState,
  deletePublishedArticles,
} = require("../controller/articleController");
const auth = require("../middleware/auth");
router.route("/blog").get(AllPublishedArticles);
router.route("/:id").get(PublishedArticle);
router.route("/article/:id").patch(updatePubishedArticle);
router.route("/:id").patch(updatePubishedArticleState);
router.route("/:id").delete(deletePublishedArticles);
// router.use(auth)
//router.post('/', passport.authenticate('blog', {session:false}))

router.route("/").post(createArticle);

module.exports = router;
