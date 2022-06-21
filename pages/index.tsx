import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar.js"


const Home: NextPage = () => {

  const { loading, error, data } = useQuery(queryPosts);
  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;
  const allPosts = data.posts.nodes;

  return (
    <div className={styles.container}>
      <Head>
        <title>WPEngine Atlas Info</title>
        <meta name="WPEngine-atlas info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <main className={styles.main}>
        <h2>All Posts</h2>
        {allPosts.map((post) => {
          return (
            <>
              <h4>{post.title}</h4>
            </>
          )
        })}
      </main>

      <footer className={styles.footer}></footer>
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
        }
      }
    }
  `;