import Header from "@/Components/Header/Header";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import kratos from "../Images/kratos.png";
import { useEffect, useState } from "react";
import axios from "axios";
import search from "../Images/search.png";

interface Post {
  id: string;
  title: string;
  console: string;
  form: string;
  price: number;
  photo: string;
}

export default function Home() {
  const [form, setForm] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>("");

  function scrollToSection(): void {
    const section: HTMLElement | null = document.getElementById('section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

  const fetchAllPosts = async () => {
    const response = await axios.get<{ posts: Post[] }>("https://gamesbe.adaptable.app/posts");
    const { data } = response;
    console.log(data.posts);
    setPosts(data.posts);
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase()) &&
    (form === "" || post.form === form)
  );

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.section1}>
          <div className={styles.heroText}>
            <p>Discover Games you Love for a cheaper Price</p>
            <h1>Find power in Gaming Cheaper </h1>
            <button onClick={ scrollToSection} >Start exploring</button>
          </div>
          <div className={styles.heroImageWrapper}>
            <Image className={styles.heroImage} src={kratos} alt="kratos" />
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.section2} id="section">
          <h3 className={styles.section2Header}>All Games</h3>
          <div className={styles.searchWrapper}>
          <Image className={styles.searchImage} src={search} alt="search" />
          <input
            type="text"
            placeholder="Game Name"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className={styles.searchInput}
          />
        </div>
          <div className={styles.selectWrapper}>
            <select
              id="platform"
              onChange={(event) => setForm(event.target.value)}
              className={styles.formSelect}
            >
              <option value="">All</option>
              <option value="Digital">Digital</option>
              <option value="Physical">Physical</option>
            </select>
          </div>
        </div>
        <div className={styles.section3}>
          <div className={styles.cardsWrapper}>
          {filteredPosts.map((post) => (
              <div key={post.id}>
                <PostCard
                  id={post.id}
                  title={post.title}
                  console={post.console}
                  form={post.form}
                  price={post.price}
                  photo={post.photo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
