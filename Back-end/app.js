import express from 'express';
const app = express();
import db from './DB/db.js';
import toDoListData from './Schema/schema.js';
import cors from 'cors';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', async (req, res) => {
  // const data = await toDoListData.find({});
  // res.send('data');
});

app.get('/getlistdata', async (req, res) => {
  try {
    const data = await toDoListData.find({});
    res.send(data);
  } catch (error) {
    console.log('err in post listdata', erros);
    res.status(404).send(error);
  }
});

app.post('/postlistdata', async (req, res) => {
  try {
    const { name } = req.body;
    const alldata = new toDoListData({
      name,
      isActive: true,
    });

    if (alldata) {
      await alldata.save();
      res.status(200).send(alldata);
    }
  } catch (err) {
    console.log('err in post listdata', err);
    res.status(404).json({ err: err.message });
  }
});

app.post('/deletelistdata/:id', (req, res) => {
  toDoListData.findByIdAndUpdate(
    { _id: req.params.id },
    { isActive: false },
    (err, docs) => {}
  );
});

app.post('/updatelistdata/:id', async (req, res) => {
  try {
    toDoListData.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, docs) => {
        if (err) {
          console.log('erro in update ', err);
        } else {
          console.log('update done');
        }
      }
    );
  } catch (error) {
    console.log('error in updatelistdata', error);
    res.status(404).send({ error: error.message });
  }
});

const port = 7000;
app.listen(port, () => {
  console.log(`app is run at ${port}`);
});
