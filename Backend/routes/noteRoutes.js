const express=require("express");
const { getNotes } = require("../controllers/noteController");
const {createNote}=require("../controllers/noteController");
const {getNoteById}=require("../controllers/noteController");
const {updateNote}=require("../controllers/noteController");
const {DeleteNote}=require("../controllers/noteController");

const router = express.Router();
const {protect} =require("../middlewares/authMiddleware")
router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNote)
router.route('/:id').get(getNoteById).put(protect,updateNote).delete(protect,DeleteNote)

module.exports = router;
