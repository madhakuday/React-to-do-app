import mongoose from 'mongoose';

const toDoData = new mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

const toDoListData = mongoose.model('toDoApp', toDoData);

export default toDoListData;
