import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("The Error on the GetAllSidebar Users Controller");
    res.status(500).json({ message: "The Server internal error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("The Error on the getMessage Controller");
    res.status(500).json({ message: "The Server internal error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId=req.user._id
    if (!text) {
      return res.status(402).json({ message: "You can't send empty Message." });
    }
    let imageUrl;
    if(image){
        const uploadResponse=await cloudinary.uploader.upload(image)
         imageUrl=uploadResponse.secure_url;
    }
    const newMessage=new Message({
        senderId,
        recieverId,
        text,
        image:imageUrl,
    })

   await newMessage.save()


//todo:realtime functionality.

const recieverSocketId=getRecieverSocketId(recieverId)

if(recieverSocketId){
  io.to(recieverSocketId).emit("newMessage",newMessage)
}

res.status(201).json(newMessage)

  } catch (error) {
    console.log("The Error on the sendMessage Controller");
    res.status(500).json({ message: "The Server internal error" });
  }
};
