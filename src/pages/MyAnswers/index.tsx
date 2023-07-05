import Header from "../../Components/Header/Header";
import styles from "./styles.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import search from "../../Images/search.png";
import QuestionCard from "../../Components/Question/QuestionCard";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import AnswerCard from "@/Components/Answer/answer";

interface Answer {
  id: string;
  answer: string;
  likes: number;
}

export default function Home() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const fetchAllUsersAnswers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/AllUsersAnswers",
        {
          headers: {
            authorization: Cookies.get("Token"),
          },
        }
      );

      console.log(response);
      const { data } = response;
      setAnswers(data.user[0].createdAnswers);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    fetchAllUsersAnswers();
  }, []);

  const deleteQuestion = async (postId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8081/deleteAnswer/${postId}`
      );
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.section2} id="section">
          <h3 className={styles.section2Header}>All users answers</h3>
        </div>
        <div className={styles.section3}>
          {success && <div className={styles.deleteText}>Post was deleted</div>}
          <div className={styles.section3}>
            <div className={styles.answersWrapper}>
              {answers.map((answer) => (
                <div key={answer.id}>
                  <AnswerCard
                  /* @ts-ignore */
                    id={answer.id}
                    answer={answer.answer}
                    initialLikes={answer.likes}
                  />
                  <button onClick={() => deleteQuestion(answer.id)} className={styles.delete}>
                    DELETE
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
