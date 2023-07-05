import React, { useState } from "react";
import styles from "./styles.module.css";
import up from "../../Images/arrowUp.png";
import down from "../../Images/arrowDown.png";
import Image from "next/image";
import axios from "axios";

interface AnswerCardProps {
  id: number;
  answer: string;
  initialLikes: number;
}

const AnswerCard: React.FC<AnswerCardProps> = ({ id, answer, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [likeStatus, setLikeStatus] = useState(0); 

  const likeAnswer = async () => {
    if (likeStatus === 0) {
      try {
        await axios.put(`http://localhost:8081/like/${id}`);
        setLikes(likes + 1);
        setLikeStatus(1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const dislikeAnswer = async () => {
    if (likeStatus === 0 && likes > 0) {
      try {
        await axios.put(`http://localhost:8081/dislike/${id}`);
        setLikes(likes - 1);
        setLikeStatus(-1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={styles.answerCard}>
      <div className={styles.likesWrapper}>
        <p className={styles.likes}>{likes}</p>
        <button
          onClick={likeAnswer}
          className={styles.button}
          disabled={likeStatus !== 0}
        >
          <Image src={up} alt="up" />
        </button>
        <button
          onClick={dislikeAnswer}
          className={styles.button}
          disabled={likeStatus !== 0 || likes <= 0}
        >
          <Image src={down} alt="down" />
        </button>
      </div>
      <div className={styles.asnwerWrapper}>
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
};

export default AnswerCard;

