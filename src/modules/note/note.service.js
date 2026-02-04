import { noteModel, users } from "../../DB/model/index.js";

export const createNote = async (inputs, userId) => {
  const { title, content } = inputs;

  const note = await noteModel.create({ title, content, userId });

  return note;
};

export const updateAllNotesTitle = async (title, userId) => {
  const { title } = req.body;
  const userId = req.user.userId;

  if (!title) {
    throw new Error("Title is required");
  }

  const result = await noteModel.updateMany({ createdBy: userId }, { title });

  res.json({
    matched: result.matchedCount,
    modified: result.modifiedCount,
  });
};

export const deleteNote = async (noteId, userId) => {
  return await noteModel.findOneAndDelete({ _id: noteId, createdBy: userId });
};

export const getPaginatedNotes = async (userId, page, limit) => {
  const skip = (page - 1) * limit;

  return await noteModel
    .find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};



export const getNoteById = async (noteId, userId) => {
  return await noteModel.findOne({ _id: noteId, createdBy: userId });
};


export const getNoteByContent = async (userId, content) => {
  return await noteModel.find({ 
    createdBy: userId });
};



export const getNotesWithUserInfo = async (userId) => {
  return await noteModel
    .find({ createdBy: userId })            
    .select("title userId createdAt")        
    .populate("userId", "email");            
};



export const deleteAllNotes = async (userId) => {
  return await noteModel.deleteMany({ createdBy: userId });
};

