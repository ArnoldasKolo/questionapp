import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "@/Components/Header/Header";
import QuestionCard from "../../Components/QuestionId/QuestionId";
import AnswerCard from "../../Components/Answer/answer";
import styles from "./styles.module.css";
import Cookies from "js-cookie";
import cross from "../../Images/cross 1.png";

interface Answer {
  id: number;
  answer: string;
  likes: number;
}

interface QuestionData {
  question: string;
  description: string;
  written_by: string;
}

interface UserData {
  username: string;
}

const Question: React.FC = () => {
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [answer, setAnswer] = useState("");
  const [inputFail, setInputFail] = useState(false);
  const [badData, setBadData] = useState("");
  const router = useRouter();

  const fetchQuestion = async () => {
    try {
      const response = await axios.get<{ question: QuestionData }>(
        `http://localhost:8081/question/${router.query.id}`
      );
      const { data } = response;
      console.log(data.question)
      setQuestion(data.question);
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  const fetchUser = async () => {
    if (question) {
      try {
        const response = await axios.get<UserData>(
          `http://localhost:8081/user/${question.written_by}`
        );
        const { data } = response;
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const fetchAnswers = async () => {
    try {
      const response = await axios.get<{ posts: { answers: Answer[] } }>(
        `http://localhost:8081/question/answers/${router.query.id}`
      );
      /* @ts-ignore */
      const data = response.data.posts[0].answers;

      const sortedAnswers = data.sort((a: { likes: number }, b: { likes: number }) => b.likes - a.likes);
      setAnswers(sortedAnswers);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };

  const createAnswer = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/question/${router.query.id}/answer`,
        {
          answer: answer,
        },
        {
          headers: {
            authorization: Cookies.get("Token"),
          },
        }
      );

      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error:any) {
      console.log(error);
      setBadData(error.response.data.response);
      setInputFail(true);
    }
  };

  const handleAnswerClick = () => {
    setShowAnswerInput(!showAnswerInput);
  };

  useEffect(() => {
    fetchAnswers();
  }, [router.query.id]);

  useEffect(() => {
    fetchUser();
  }, [question]);

  useEffect(() => {
    if (router.query.id) {
      fetchQuestion();
    }
  }, [router.query.id]);

  return (
    <>
      <div className={styles.container}>
      <Header />
      {question && user && answers && (
        <div className={styles.wrapper}>
          <div className={styles.section1}>
            <QuestionCard
              username={user.username}
              question={question.question}
              description={question.description}
              handleAnswerClick={handleAnswerClick}
            />

            <div className={styles.line}></div>
          </div>
          <div className={styles.section2}>
            <h3 className={styles.section2Header}>Answers</h3>
          </div>
          <div className={styles.section3}>
            <div className={styles.answersWrapper}>
              {answers.map((answer) => (
                <AnswerCard
                  key={answer.id}
                  id={answer.id}
                  answer={answer.answer}
                  initialLikes={answer.likes}
                />
              ))}
            </div>
          </div>
          {showAnswerInput && (
            <div className={styles.insertWrapper}>
              <div className={styles.header}>
                <h1>Answer</h1>
                <button
                  className={styles.crossButton}
                  onClick={handleAnswerClick}
                >
                  <Image src={cross} alt="" />
                </button>
              </div>
              <textarea
                placeholder="Your Answer"
                className={styles.input}
                cols={30}
                rows={10}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
              ></textarea>
              <button onClick={createAnswer} className={styles.button}>
                Submit
              </button>
              {inputFail ? <p className={styles.inputFail}>{badData}</p> : ""}
            </div>
          )}
        </div>
      )}
      </div>
    </>
  );
};

export default Question;
