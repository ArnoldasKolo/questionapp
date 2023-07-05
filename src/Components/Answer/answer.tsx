import React, { useState } from "react";
import styles from "./styles.module.css";
import up from "../../Images/arrowUp.png";
import down from "../../Images/arrowDown.png";
import Image from "next/image";
import axios from "axios";

const AnswerCard = ({ id, answer, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);

  const likeAnswer = async () => {
    try {
      await axios.put(`http://localhost:8081/like/${id}`);
      setLikes(likes + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const dislikeAnswer = async () => {
    try {
      await axios.put(`http://localhost:8081/dislike/${id}`);
      setLikes(likes - 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.answerCard}>
        <div className={styles.likesWrapper}>
          <p className={styles.likes}>{likes}</p>
          <button onClick={likeAnswer} className={styles.button}>
            <Image src={up} alt="up" />
          </button>
          <button onClick={dislikeAnswer} className={styles.button}>
            <Image src={down} alt="down" />
          </button>
        </div>
        <div className={styles.asnwerWrapper}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </>
  );
};

export default AnswerCard;

