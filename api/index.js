const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs')
const Post = require('../model/post')

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))


const secretKey = 'youCanAddThisOneByYourOwn';

mongoose
  .connect('mongodb://127.0.0.1:27017/foodBlogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Listening at port 5000...');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.post('/register', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userDoc = await User.create({ userName, password: hashedPassword });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(500)
      .json({ success: false, error: 'Failed to register user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const userDoc = await User.findOne({ userName });
    if (userDoc) {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        userDoc.password
      );
      console.log('isCorrectPassword:', isPasswordCorrect);
      if (isPasswordCorrect) {
        console.log('Welcome');
        const token = jwt.sign({ userName, id: userDoc.id }, secretKey);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true });
      } else {
        console.log('Wrong password');
        res
          .status(401)
          .json({ success: false, error: 'Incorrect password' });
      }
    } else {
      res.status(400).json({ success: false, error: 'Invalid username' });
    }
  } catch (error) {
    console.log('Error while logging in:', error);
    res.status(500).json({ success: false, error: 'Failed to login' });
  }
});



app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  jwt.verify(token, secretKey, {}, (err, info) => {
    if (err) {
      console.error('Error while verifying token:', err);
      return res.status(401).json({ success: false, error: "Invalid token" });
    }
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok")
})

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const renamedPath = path + "." + ext;
  fs.renameSync(path, path + "." + ext);
  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: renamedPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});
app.get('/post', async (req, res) => {
  const posts = await Post.find({}).populate("author", 'userName').sort({ createdAt: -1 }).limit(20);
  res.json(posts);
});

app.get('/Posts/:id', async (req, res) => {
  const { id } = req.params
  const postDoc = await Post.findById(id).populate("author", 'userName')
  res.json(postDoc)
});

app.put("/Edit/:id", uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author");
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });
});



