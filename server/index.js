import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path'
dotenv.config();
const app = express();
app.use(express.json());
const __dirname = path.resolve();
import Link from './models/link.js';

const connetionToMongodb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        if (connect) {
            console.log("MongoDB is connected");
        }
    }
    catch (err) {
        console.log(err)
    }
}
connetionToMongodb();
// post request is created

app.post('/link', async (req, res) => {
    const { url, slug } = req.body
    const randomurl = Math.random().toString(36).substring(2, 7)
    const urldata = new Link({
        url: url,
        slug: slug || randomurl
    })
    try {
        const savetoMDB = await urldata.save();
        res.json({
            success: true,
            data: {
                shortlink: `${process.env.baseUrl}/${savetoMDB.slug}`
            },
            message: "save succesfully"
        })
    }
    catch (e) {
        res.json({
            message: e.message
        })

    }

})

app.get('/:slug', async (req, res) => {
    const { slug } = req.params
    const findslug = await Link.findOne({ slug: slug })
    const setviews = await Link.updateOne({ slug: slug }, {
        $set: {
            view: findslug.view + 1
        }
    })

    const rerander = findslug.url
    if (!rerander) {
        return res.json({
            success: false,
            message: "invalid url"
        })
    }
    res.redirect(rerander)
})

app.get('/api/links', async (req, res) => {
    const fetchLinks = await Link.find({})
    res.json({
        success: true,
        data: fetchLinks,
        message: "all data fetch succesfully"
    })
})



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is on ${PORT}`);
})