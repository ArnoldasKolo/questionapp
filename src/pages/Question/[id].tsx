import Header from "@/Components/Header/Header";
import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import AnswerCard from "../../Components/Answer/answer";
import Cookies from "js-cookie";
import cross from "../../Images/cross 1.png"
import Image from "next/image";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showAnswerInput, setShowAnswerInput] = useState(false); // New state variable
  const [answer, setAnswer] = useState("");
  const router = useRouter();
  const [inputFail, setInputFail] = useState(false);
  const [badData, setBadData] = useState("");

  const fetchQuestion = async () => {
    console.log(router.query.id);
    const response = await axios.get(
      `http://localhost:8081/question/${router.query.id}`
    );
    const { data } = response;
    setQuestion(data.question);
    console.log(question);
  };

  const fetchUser = async () => {
    if (question) {
      try {
        const response = await axios.get(
          `http://localhost:8081/user/${question.written_by}`
        );
        const { data } = response;
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const fetchAnswers = async () => {
    console.log(router.query.id);
    const response = await axios.get(
      `http://localhost:8081/question/answers/${router.query.id}`
    );
    console.log(response);
    const { data } = response;
    setAnswers(data.answers);
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
            authorization:  Cookies.get('Token'),
          },
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        window.location.reload();
      }
      
    } catch (err:any) {
      // if (response.status === 401) {
      //   router.push("/login");
      // }
      console.log(err)
      setBadData(err.response.data.response)
      console.log(badData)
      if(err){
        setInputFail(true)
      }
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [question]);

  useEffect(() => {
    router.query.id && fetchQuestion();
  }, [router.query.id]);

  const handleAnswerClick = () => {
    setShowAnswerInput(!showAnswerInput);
  };

  return (
    <>
      <Header />
      {question && user && answers && (
        <div className={styles.container} >
          <div className={styles.section1}>
            <div className={styles.questionCard}>
              <p className={styles.username}>User: {user.username}</p>
              <div className={styles.questionWrapper}>
                <h3 className={styles.question}>{question.question}</h3>
              </div>
              <div className={styles.descriptionWrapper}>
                <p className={styles.description}>{question.description}</p>
              </div>
              <button onClick={handleAnswerClick} className={styles.answerButton}>
                Answer
              </button>
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.section2}>
            <h3 className={styles.section2Header}>Answers</h3>
          </div>
          <div className={styles.section3}>
            <div className={styles.answersWrapper}>
              {answers.map((answer) => (
                <div key={answer.id}>
                  <AnswerCard
                    id={answer.id}
                    answer={answer.answer}
                    initialLikes={answer.likes}
                  />
                </div>
              ))}
            </div>
          </div>
          {showAnswerInput && (
            <div className={styles.insertWrapper}>
              <div className={styles.header}>
                <h1>Answer</h1>
                <button className={styles.crossButton} onClick={handleAnswerClick} ><Image src={cross} alt="" /></button>
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
    </>
  );
};

export default Question;
