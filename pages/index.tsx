import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar.js";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { setHttpAgentOptions } from "next/dist/server/config";

const Home: NextPage = () => {
  const [postData, setPostData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { loading, error, data } = useQuery(queryPosts);

  useEffect(() => {
    if (searchValue) {
      setPostData(
        data.posts.nodes.filter((post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    } else if (data) {
      setPostData(data.posts.nodes);
    }
  }, [data, searchValue]);


  return (
    <div>
      <Head>
        <title>WPEngine Atlas Info</title>
        <meta name="WPEngine-atlas info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <main className={styles.document}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to WPEngine Atlas Info</h1>
          <p className={styles.heroDescription}>
            This is a collection of useful information about WPEngine.
          </p>
        </div>

        <h2>All Posts</h2>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {postData.map((post) => {
          return (
            <>
              <div className="container">
                <div className="card-deck">
                  <div className="card">
                    <h5 className="card-title">{post.title}</h5>
                    <div className="card-body">
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </main>
    </div>
  );
};

export default Home;

const queryPosts = gql`
  query allPosts {
    posts {
      nodes {
        id
        title
        date
        content
        excerpt
      }
    }
  }
`;
