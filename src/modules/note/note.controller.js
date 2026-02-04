import { Router } from "express";
import {
  createNote,
  deleteAllNotes,
  deleteNote,
  getNoteByContent,
  getNoteById,
  getNotesWithUserInfo,
  getPaginatedNotes,
  updateAllNotesTitle,
} from "./note.service.js";

const router = Router();

router.post("/", auth, async (req, res) => {
  try {
    const note = await createNote(req.body, req.user.userId);
    return res.status(201).json({ note });
  } catch (err) {
    return res.status(400).json({ message: "Failed to add note" });
  }
});

router.patch("/all", auth, async (req, res) => {
  try {
    const note = await updateAllNotesTitle(title, req.user._id);
    return res.status(201).json({ message: "Updated well" });
  } catch (err) {
    return res.status(400).json({ message: "Failed" });
  }
});

router.delete("/:noteId", auth, async (req, res) => {
  try {
    const deletedNote = await deleteNote(req.params.noteId, req.user._id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res
      .status(200)
      .json({ message: "Note deleted successfully", note: deletedNote });
  } catch (err) {
    return res.status(404).json({ message: "Failed", error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const notes = await getPaginatedNotes(req.user._id, page, limit);

    return res.status(200).json({
      message: "retrieved",
      page,
      limit,
      notes,
    });
  } catch (err) {
    return res.status(404).json({ message: "Failed", error: err.message });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const note = await getNoteById(req.params.id, req.user._id);

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized" });
    }

    return res.status(200).json({
      message: "Note retrieved successfully",
      note,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed", error: err.message });
  }
});

router.get("/note-by-content", auth, async (req, res) => {
  try {
    const { content } = req.query;
    if (!content) {
      return res.status(400).json({ message: "query is required" });
    }

    const notes = await getNoteByContent(req.user._id, content);

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    return res.status(200).json({
      message: "retrieved successfully",
      notes,
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed", error: err.message });
  }
});


router.get("/all-with-user", auth, async (req, res) => {
  try {
    const notes = await getNotesWithUserInfo(req.user._id);

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    return res.status(200).json({
      message: "Notes retrieved successfully",
      notes
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed", error: err.message });
  }
});


router.delete("/", auth, async (req, res) => {
  try {
    const result = await deleteAllNotes(req.user._id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No notes to delete" });
    }

    return res.status(200).json({
      message: "notes deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed", error: err.message });
  }
});


export default router;
