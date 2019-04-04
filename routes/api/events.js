const router = require("express").Router();
const eventController = require("../../controllers/eventController");

router.route("/create")
  .post(eventController.createEvent);
router.route("/attend")
  .put(eventController.addAttendat);
router.route("/leave")
  .put(eventController.removeAttendant);
router.route("/search")
  .get(eventController.findBySearch);
router.route("/get")
  .get(eventController.findAll);
router.route("/getsorted")
  .get(eventController.findAllSortedByDate);
  //this route goes to controllers/event controller
router.route("/user")
  .get(eventController.findByUser);
router.route("/update/:id")
  .put(eventController.update);
router.route("/deleteEvent/:id")
  .delete(eventController.remove);
router.route("/:id")
  .get(eventController.getEventById);
module.exports = router