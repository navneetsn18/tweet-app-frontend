import React, { useRef } from 'react';
import Picker from 'emoji-picker-react';
import "./my-tweets.styles.css";
import imgLikeWhite from '../../assets/images/like-white.png';
import imgLike from '../../assets/images/like.png';
import imgReply from '../../assets/images/reply.png';
import imgDelete from '../../assets/images/delete.png';
import imgEdit from '../../assets/images/edit.png';
import { postReplyTweet } from '../home/home.helper';
import { fetchMyTweets, deleteTweet, updateTweet, likeTweet } from './my-tweets.helper';

export default function MyTweets(props) {

    const [allTweets, setAllTweets] = React.useState([])
    const [replyMessage, setReplyMessage] = React.useState("")
    const [editMessage, setEditMessage] = React.useState("")
    const [showPicker, setShowPicker] = React.useState(false);
    React.useEffect(() => {
        initialise();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.global.selectedPage]);

    const onEmojiClickReply = (event, emojiObject) => {
        setReplyMessage((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const onEmojiClickEdit = (event, emojiObject) => {
        setEditMessage((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
    };

    const initialise = async () => {
        try {
            props.showLoader("Fetching My Tweets")
            let allTweets = await fetchMyTweets();
            setAllTweets(allTweets);
            props.hideLoader();
        } catch (e) {
            props.hideLoader();
        }
    }
    const generateTweets = () => {

        return allTweets.map((tweet, index) => {
            const date1 = new Date();
            const date2 = new Date(tweet.date + " " + tweet.time);
            const diffTime = Math.abs(date2 - date1);
            let diffDays = Math.ceil(diffTime / (1000 * 60));
            let units = "mins"
            if (diffDays > 60) {
                diffDays = (diffDays / 60).toFixed();
                units = "hours"
                if (diffDays > 24) {
                    diffDays = (diffDays / 24).toFixed();
                    units = diffDays > 1 ? "days" : "day"
                }
            }
            const onLikeClick = () => {
                try {
                    let tweets = [...allTweets]
                    likeTweet(tweetId);
                    if(tweets[index].likes.indexOf(localStorage.getItem("username"))>-1){
                        tweets[index].likes = tweets[index].likes.filter(username => username!=localStorage.getItem("username"))
                    }else{
                        tweets[index].likes.push(localStorage.getItem("username"));
                    }
                    setAllTweets(tweets);
                } catch (e) {
                    console.log(e)
                }
            }
            const onReplyClick = () => {
                let tweets = [...allTweets]
                tweets[index].showReplies = !tweets[index].showReplies;
                setAllTweets(tweets);
                setReplyMessage("");
            }
            let tweetId = tweet.id
            const onReplyTweet = async () => {
                try {
                    props.showLoader("Posting Reply Tweet")
                    await postReplyTweet(tweetId, replyMessage);
                    let allTweets = await fetchMyTweets();
                    setAllTweets(allTweets);
                    props.hideLoader();
                } catch (e) {
                    props.hideLoader();
                }
            }
            const onUpdateTweet = async () => {
                try {
                    props.showLoader("Updating Tweet")
                    await updateTweet({
                        "id": tweetId,
                        "tweet": editMessage
                    });
                    let allTweets = await fetchMyTweets(props.global.userData.username);
                    setAllTweets(allTweets);
                    setEditMessage("");
                    props.hideLoader();
                } catch (e) {
                    props.hideLoader();
                }
            }

            const onDeleteClick = async () => {
                try {
                    props.showLoader("Deleting Tweet")
                    await deleteTweet(props.global.userData.username, tweetId);
                    let allTweets = await fetchMyTweets(props.global.userData.username);
                    setAllTweets(allTweets);
                    props.hideLoader();
                } catch (e) {
                    props.hideLoader();
                }
            }

            const onEditClick = () => {
                let tweets = [...allTweets]
                tweets[index].isEditing = true
                setEditMessage(tweet.tweet);
                setAllTweets(tweets);
            }
            
            return (
                <div className="shadow" style={{ width: "60%", marginLeft: "auto", marginRight: "auto", alignItems: "flex-start", display: "flex", flexDirection: "column", borderRadius: 10, marginBottom: 10 ,backgroundColor: "#3E065F"}}>
                    <div style={{ alignItems: "flex-start", display: "inline-flex", width: "100%", padding: 20, borderRadius: 10, borderWidth: 1 }}>
                        <img src={"https://robohash.org/" + tweet.username} className="rounded-circle" height={40} width={40} style={{ marginRight: 20 }} />
                        <div style={{ width: "100%", justifyContent: "flex-start", display: "inline-flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <div style={{ display: "inline-flex", justifyContent: "space-between", width: "100%" }}>
                                <p style={{ fontFamily: "Barlow-SemiBold", fontSize: 16, margin: 0 , color: "white"}}>{tweet.username} <span style={{  color: "#ECB365", fontFamily: "OpenSans-Regular", fontSize: 12 }}>{diffDays} {units} ago</span></p>
                                <div style={{ marginBottom: 10 }}>
                                    <img className={"ml-4"} src={imgEdit} height={20} width={20} onClick={onEditClick} />
                                    <img className={"ml-4"} src={imgDelete} height={20} width={20} onClick={onDeleteClick} />
                                </div>

                            </div>
                            {
                                tweet.isEditing ?
                                    <div style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                        <div className="picker-container">
                                            <textarea placeholder={"Edit Tweet"} value={editMessage} multiple={4} style={{ width: "80%", borderWidth: 0, resize: "none", padding: 10, marginRight: 20 , backgroundColor : "#700B97", color : "white"}} maxLength={144} onChange={(e) => setEditMessage(e.target.value)}/>
                                            <img
                                                className="emoji-icon"
                                                alt="true"
                                                src="https://img.icons8.com/emoji/36/FAB005/grinning-squinting-face--v2.png"
                                                onClick={() => setShowPicker((val) => !val)}
                                            />
                                            {showPicker && (
                                                <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClickEdit} />
                                            )}
                                        </div>
                                        <button style={{ borderWidth: 0, backgroundColor: "#1DA1F2", color: "white", width: 100, padding: 5, borderRadius: 20, marginRight: 30 }} onClick={onUpdateTweet}>Save</button>
                                    </div> :
                                    <p style={{ borderWidth: 0, fontFamily: "OpenSans-Regular", fontSize: 16, textAlign: "justify" ,color: "white"}}>{tweet.tweet}</p>
                            }
                        </div>

                    </div>
                    <div style={{ display: "inline-flex", marginLeft: 20 }}>
                        <img className={"ml-2"} src={tweet.likes.indexOf(localStorage.getItem("username"))>-1 ? imgLike : imgLikeWhite} height={30} width={30} onClick={onLikeClick} />
                        <p className={"ml-2 mt-1"} style={{color:"white"}}>{tweet.likes.length}</p>
                        <img className={"ml-4"} src={imgReply} height={30} width={30} onClick={onReplyClick} />
                        <p className={"ml-2 mt-1"} style={{color:"white"}}>{tweet.reply.length}</p>
                    </div>
                    <div style={{ width: "100%" }}>
                        {
                            tweet.showReplies &&
                            <>
                                <div>
                                    {
                                        tweet.reply.map((reply) => {
                                            const replydate1 = new Date();
                                            const replydate2 = new Date(reply.date);
                                            const replydiffTime = Math.abs(replydate2 - replydate1);
                                            let replydiffDays = Math.ceil(replydiffTime / (1000 * 60));
                                            let units = "mins"
                                            if (replydiffDays > 60) {
                                                replydiffDays = (replydiffDays / 60).toFixed();
                                                units = "hours"
                                                if (replydiffDays > 24) {
                                                    replydiffDays = (replydiffDays / 24).toFixed();
                                                    units = "days"
                                                }
                                            }
                                            return (
                                                <div style={{ alignItems: "flex-start", display: "inline-flex", width: "100%", padding: 10, borderRadius: 10, borderWidth: 1, marginLeft: 30 }}>
                                                    <img src={"https://robohash.org/" + tweet.username} className="rounded-circle" height={30} width={30} style={{ marginRight: 20 }} />
                                                    <div style={{ width: "100%", justifyContent: "flex-start", display: "inline-flex", flexDirection: "column", alignItems: "flex-start" }}>
                                                        <p style={{ fontFamily: "Barlow-SemiBold", fontSize: 16, margin: 0 , color: "white"}}>{reply.username} <span style={{ color: "#E0C097", fontFamily: "OpenSans-Regular", fontSize: 12 }}>{replydiffDays} {units} ago</span></p>
                                                        <p style={{ borderWidth: 0, color : "#E7F6F2"}}>{reply.replyMsg}</p>
                                                    </div>

                                                </div>
                                            )
                                        })}
                                </div>
                                <div className="shadow" style={{ alignItems: "flex-start", display: "flex", flexDirection: "column", borderRadius: 10, margin: 30, marginTop: 0, }}>
                                    <p style={{ marginLeft: 20, marginTop: 20, fontSize: 12, fontFamily: "OpenSans-Regular" ,color: "#E0C097"}}>You are replying to <span style={{ color: "#1DA1F2" }}>{tweet.username}</span> </p>
                                    <div style={{ alignItems: "flex-start", display: "inline-flex", width: "100%", borderRadius: 10, borderWidth: 1, marginLeft: 30 }}>
                                        <img src={"https://robohash.org/" + tweet.username} className="rounded-circle" height={30} width={30} style={{ marginRight: 20 }} />
                                        <div className="picker-container">
                                            <textarea placeholder={"Give A Reply"} multiple={4} style={{ width: "100%", height: 50, borderWidth: 0, resize: "none", padding: 10, fontSize: 16, backgroundColor: "#3E065F", color: "#EEEEEE" }} maxLength={144} value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} />
                                            <img
                                                className="emoji-icon"
                                                alt="true"
                                                src="https://img.icons8.com/emoji/36/FAB005/grinning-squinting-face--v2.png"
                                                onClick={() => setShowPicker((val) => !val)}
                                            />
                                            {showPicker && (
                                                <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClickReply} />
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ display: "inline-flex", alignItems: "flex-end", justifyContent: "flex-end", width: "100%" }}>
                                        <button style={{ borderWidth: 0, marginTop: 10, backgroundColor: "#1DA1F2", color: "white", width: 100, padding: 10, borderRadius: 20, marginBottom: 20, marginRight: 30 }} onClick={onReplyTweet}>Tweet</button>
                                    </div>
                                </div>
                            </>
                        }

                    </div>

                </div >
            )
        })
    }
    return (
        <>
            <div className={"h-100"}>
                <div>
                    {
                        generateTweets()
                    }
                </div>

            </div>
        </>
    )

}
