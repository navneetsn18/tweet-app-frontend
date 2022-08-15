import React, { useRef } from 'react';
import "./all-users.styles.css";
import imgEmail from '../../assets/images/email.png';
import { fetchAllUsers } from './all-users.helper';

export default function MyTweets(props) {
    React.useEffect(() => {
        initialise();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.global.selectedPage]);
    const [allUsers, setAllUsers] = React.useState([])
    const onTweetClick = () => {

    }
    const initialise = async () => {
        try {
            props.showLoader("Fetching All Users")
            let allUsers = await fetchAllUsers();
            setAllUsers(allUsers);
            props.hideLoader();
        } catch (e) {
            props.hideLoader();
        }
    }
    const generateTweets = () => {

        return allUsers.map((tweet, index) => {
            return (
                <div className="shadow" style={{ width: "60%", marginLeft: "auto", marginRight: "auto", alignItems: "flex-start", display: "flex", flexDirection: "column", borderRadius: 10, marginBottom: 10 }}>
                    <div style={{ alignItems: "flex-start", display: "inline-flex", width: "100%", padding: 20, borderRadius: 10, borderWidth: 1 }}>
                        <img src={"https://robohash.org/"+tweet.username} className="rounded-circle" height={40} width={40} style={{ marginRight: 20 }} />
                        <div style={{ width: "100%", justifyContent: "flex-start", display: "inline-flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <div style={{ display: "inline-flex", justifyContent: "space-between", width: "100%" }}>
                                <p style={{ fontFamily: "Barlow-SemiBold", fontSize: 16, margin: 0 }}>{tweet.firstName} {tweet.lastName} <span style={{ color: "GrayText", fontFamily: "OpenSans-Regular", fontSize: 12 }}>@{tweet.username}</span></p>
                            </div>
                            <div style={{ flexDirection: "row", display: "inline-flex", alignItems: "center", marginTop: 10 }}>
                                <img src={imgEmail} height={20} width={20} style={{ marginRight: 5 }} />
                                <p style={{ marginRight: 10, marginBottom: 0 }}>{tweet.email} </p>
                            </div>
                        </div>
                    </div>

                </div>
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
