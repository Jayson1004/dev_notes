/*
 * @Author: mu.mingming 815915578@qq.com
 * @Date: 2025-02-06 17:38:50
 * @LastEditors: mu.mingming 815915578@qq.com
 * @LastEditTime: 2025-02-07 09:57:17
 * @FilePath: \WeAssistant_Web\src\app\[locale]\chat\page.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Menucustom from "../menu";
import styles from "./chat.module.scss";
import Footer from "../components/footer";
import { useTranslations } from "next-intl";

const serverHost =
  process.env.NODE_ENV === "production"
    ? "https://www.xiaoweibot.com/backend"
    : "http://8.130.132.208:5050";
// const serverHost = 'http://8.130.132.208:5050'; //local
// const serverHost = 'https://www.xiaoweibot.com/backend'; //server

function ChatInterface({ params }) {
  const t = useTranslations();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  function saveMessages(msgs) {
    localStorage.setItem("chatMessages", JSON.stringify(msgs));
  }

  function loadMessages() {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (savedMessages) {
      setMessages(savedMessages);
    } else {
      setMessages([{ text: t("chat.defaultText"), type: "bot" }]);
    }
  }
  const { locale } = params;
  const [apiData, setApiData] = useState(null);

  // useEffect(() => {
  //     const fetchApiData = async () => {
  //         try {
  //             const response = await fetch(`/${locale}/api/data`);
  //             const data = await response.json();
  //             setApiData(data);
  //         } catch (error) {
  //             console.error('Error fetching API data:', error);
  //         }
  //     };

  //     fetchApiData();
  // }, []);
  useEffect(() => {
    loadMessages();
  }, []);
  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      fetch(`${serverHost}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputMessage,
          uid: 1,
          session_id: 1,
          is_room: "True",
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          const list = [
            ...messages,
            { text: inputMessage, type: "user" },
            { text: JSON.parse(result).detail, type: "bot" },
          ];
          setMessages(list);
          saveMessages(list);
        })
        .catch((error) => console.error("Error:", error));
      setInputMessage("");
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(selectedFile);
    fetch(`/${locale}/api/data`, {
      method: "POST", // 设置方法为 PUT
      body: formData, // 设置 body 为 FormData 对象
    })
      .then((response) => response.json()) // 解析响应为 JSON
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Menucustom></Menucustom>
      <div className={styles["chat-container"]}>
        <div className={styles["message-list"]}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type == "user" ? styles["sent"] : styles["received"]
              }`}
            >
              <img
                className={styles["usericon"]}
                src={message.type == "user" ? "/send.png" : "/xw.png"}
                alt="Avatar"
              />
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        <div>{JSON.stringify(apiData)}</div>
        <div className={styles["input-area"]}>
          <textarea
            value={inputMessage}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSendMessage();
            }}
            onChange={(e) => setInputMessage(e.target.value)}
            className={styles["input-box"]}
          />
          <Button
            disabled={!inputMessage}
            type="primary"
            onClick={handleSendMessage}
            className={styles["send-button"]}
          >
            {t("chat.sendBtn")}
          </Button>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ChatInterface;
