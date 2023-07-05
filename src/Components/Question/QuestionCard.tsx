import Link from "next/link";
import React from "react";
import styles from "./styles.module.css"

interface QuestionProps {
  id: string;
  question: string;
  description: string;

}

const PostCard: React.FC<QuestionProps> = ({
  id,
  question,
  description
}) => {
  return (
    <>
      <Link className={styles.link} href={`Question/${id}`}>
        <div className={styles.questionCard}>
          <div className={styles.questionWrapper}>
            <h3 className={styles.question}>{question}</h3>
          </div>
          <div className={styles.descriptionWrapper}>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PostCard;