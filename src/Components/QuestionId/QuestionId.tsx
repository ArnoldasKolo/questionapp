import React from "react";
import Image from "next/image";
import cross from "../../Images/cross 1.png";
import styles from "./QuestionId.module.css";

const QuestionCard = ({ username, question, description, handleAnswerClick }) => {
  return (
    <div className={styles.questionCard}>
      <p className={styles.username}>User: {username}</p>
      <div className={styles.questionWrapper}>
        <h3 className={styles.question}>{question}</h3>
      </div>
      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>{description}</p>
      </div>
      <button onClick={handleAnswerClick} className={styles.answerButton}>
        Answer
      </button>
    </div>
  );
};

export default QuestionCard;