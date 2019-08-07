const express = require("express")
const app = express()
const socket = require("socket.io")
const Message = require("./app/Modals/Message")
const User = require("./app/Modals/Accounts")
const mongoose = require("mongoose")
const server = app.listen(8000)
const cors = require("cors");
const io = socket(server);
const bodyParser = require("body-parser");
const Conversation = require("./app/Modals/ConversionModal");
const clients = {};




app.use(cors())
app.use(bodyParser.json({ limit: "5000kb" }))
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb://quizapp:maaz1234@ds227664.mlab.com:27664/quiz_data");


app.post("/signup", (req, res) => {
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            }
            else {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })
                user.save().then((success) => {
                    res.status(201).json({
                        user: success,
                        message: "User Created"
                    })
                }).catch((err) => {
                    res.status(500).json({
                        error: "Incorrect email !"
                    })
                })

            }
        })
})


app.post("/signin", (req, res) => {
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user < 1) {
                res.status(401).json({
                    message: "Email not found"
                })
            } else if (req.body.password === user[0].password) {
                res.status(200).json({
                    message: "Login Successful",
                    user: user[0]
                })
            } else {
                res.status(401).json({
                    userId: "Invelid email or password !"
                })

            }
        }).catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})


app.get("/getUser", (req, res) => {
    User.find().exec().then((data) => {
        res.send({
            data
        })
    })
})


app.post(`/createConversation`, (req, res) => {
    let obj;
    const conversation = new Conversation({
        conversetionIdS: req.body.conversetionIdS
    })
    Conversation.find().exec()
        .then((data) => {
            data.map((val) => {
                if (
                    (
                        req.body.conversetionIdS[0] === val.conversetionIdS[0]
                        &&
                        req.body.conversetionIdS[1] === val.conversetionIdS[1]
                    )
                    ||
                    (
                        req.body.conversetionIdS[0] === val.conversetionIdS[1]
                        &&
                        req.body.conversetionIdS[1] === val.conversetionIdS[0]
                    )
                ) {
                    obj = val;
                }
            })
            if (obj === undefined) {

                conversation.save().then((conver) => {
                    Message.find({ conversetionID: conver._id }).exec().then((messages) => {
                        res.send({
                            data: conver,
                            messages,
                            message: "Conversation has been created !",
                        })
                    })
                })
            }
            else {
                Message.find({ conversetionID: obj._id }).exec().then((messages) => {
                    res.send({
                        data: obj,
                        messages,
                        message: "Conversation alrady created !",
                    })
                })
            }

        })
})





app.get(`/getConversation`, (req, res) => {
    Conversation.find().exec()
        .then(async (data) => {
            let arr = []
            await data.map((val) => {
                if (req.query.currentUser === val.conversetionIdS[0] || req.query.currentUser === val.conversetionIdS[1]) {
                    arr.push(val)
                }
            })
            User.find().exec().then((snap) => {
                let chats = []
                snap.filter(item => arr.some(other => {
                    if (item.id === other.conversetionIdS[0] || item.id == other.conversetionIdS[1]) {
                        chats.push({
                            _id: item._id,
                            username: item.username,
                            email: item.email,
                            password: item.password,
                            conversetionID: other._id,
                            __v: item.__v
                        })
                    }
                }));
                res.send(chats)
            })
        })

})









io.on("connection", (socket) => {
    User.find().exec().then((snap) => {
        io.sockets.emit("USERS", snap)
    })
    clients[socket.id] = socket;

    socket.on("SEND_MESSAGE", data => {
        const message = new Message({
            message: data.message,
            conversetionID: data.conversetionID,
            senderID: data.senderID,
        })

        io.sockets.emit(`GET_MESSAGE${message.conversetionID}`, message)
        // message.save().then((suc) => {
        // })

    })


    socket.on("disconnect", () => {
        console.log("Socket has connected", socket.id)
        delete clients[socket.id]
    })
})












