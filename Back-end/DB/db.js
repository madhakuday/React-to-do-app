import mongoose from 'mongoose';

const db = mongoose.connect('mongodb://localhost:27017/ToDoData', () => {
  console.log('Database Done');
});

export default db;
