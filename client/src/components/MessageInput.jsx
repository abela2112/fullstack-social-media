import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Image, Send, Cancel, EmojiEmotions } from '@mui/icons-material';
import { Box, Button, Divider, Drawer, IconButton, InputBase } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import { setMessages } from 'state/messages';

const MessageInputContainer = styled(Box)(({ theme }) => ({
    padding: "10px",
    backgroundColor: theme.palette.background.alt,
    display: "flex",
    alignItems: "center",
    borderTop: `1px solid ${theme.palette.background.alt}`,
}));

const MessageInput = ({ socket, socketConnected, setTyping, typing }) => {
    const [newMessage, setNewMessage] = useState("");
    const { messages, users, selectedUser } = useSelector(state => state.message);
    const [imagePreview, setImagePreview] = useState(null);
    const dispatch = useDispatch()
    const fileInputRef = useRef(null);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const main = palette.primary.main;
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const formData = new FormData()
            formData.append('image', file)
            const { data } = await axios.post('http://localhost:4000/uploads', formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            )
            console.log("data", data)
            setImagePreview(data.image)
        } catch (error) {
            console.log("error", error)
            toast.error("Failed to preview image")

        }
    };

    const removeFile = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const handleEmojiClick = (emojiData) => {
        setNewMessage((prev) => prev + emojiData.emoji);
    };
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !imagePreview) return;
        socket.emit('stop typing', selectedUser._id)
        setTyping(false)
        try {
            const { data } = await axios.post(
                `http://localhost:4000/messages/send/${selectedUser._id}`,
                {
                    text: newMessage,
                    image: imagePreview,
                }
            );

            setNewMessage("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            dispatch(setMessages(data));
            console.log("new message", data);
        } catch (error) {
            console.log("error", error);
            toast.error("Failed to send message");
        }
    };
    // useEffect(() => {
    //     const getmessages = async (id) => {

    //         // setIsMessageLoading(true)
    //         try {
    //             const { data } = await axios(`/messages/${id}`)
    //             dispatch(setMessages(data))

    //         } catch (error) {
    //             console.error(error)
    //             //   setIsMessageLoading(false)
    //         }
    //     }
    //     if (!selectedUser) return
    //     getmessages(selectedUser._id)
    // }, [selectedUser])

    return (
        <form onSubmit={sendMessage}>
            {imagePreview && (
                <Box position={'relative'} display="inline-block">
                    <img src={imagePreview} alt="preview" style={{ width: "100px", height: "100px" }} />
                    <IconButton
                        onClick={removeFile}
                        sx={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            backgroundColor: "red",
                            color: "#fff",
                        }}
                    >
                        <Cancel />
                    </IconButton>
                </Box>
            )}

            <MessageInputContainer>
                <div>
                    <IconButton onClick={toggleDrawer(true)}><EmojiEmotions /></IconButton>
                    <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </Drawer>
                </div>
                <Divider orientation='vertical' sx={{ width: '1px' }} />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => {

                        setNewMessage(e.target.value)

                        if (!socketConnected) return
                        if (!typing) {
                            setTyping(true)
                            socket.emit('typing', selectedUser._id)
                        }
                        let lastTypingTime = new Date().getTime();
                        var timerLength = 3000;
                        setTimeout(() => {
                            var timeNow = new Date().getTime();
                            var timeDiff = timeNow - lastTypingTime;
                            if (timeDiff >= timerLength && typing) {
                                socket.emit('stop typing', selectedUser._id);
                                setTyping(false)
                            }
                        }, timerLength);
                    }}
                />

                {/* Hidden File Input */}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {/* Image Upload Button */}
                <IconButton
                    sx={{
                        '&:hover': { backgroundColor: primaryLight },
                        color: main,
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image />
                </IconButton>

                {/* Send Button */}
                <IconButton
                    sx={{
                        '&:hover': { backgroundColor: primaryLight },
                        color: main,
                    }}
                    type="submit"
                    disabled={!newMessage.trim() && !imagePreview}
                >
                    <Send />
                </IconButton>
            </MessageInputContainer>
        </form>
    );
};

export default MessageInput;
