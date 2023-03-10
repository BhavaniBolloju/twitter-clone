import { useEffect, useState } from "react";
import {
  getPosts,
  getUserByUserId,
  getTweetedPostsFromUser,
} from "../../firebase/services";

const usePosts = function (fn, following, uid) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userPost = async function () {
      const res = await fn(following, uid);
      const tweet = await getTweetedPostsFromUser(uid, following);
      // console.log(tweet);
      const resData = tweet.flatMap((post) => post);
      let posts = [];
      if (tweet[0]) {
        posts = [...res, ...resData];
      } else {
        posts = res;
      }

      // console.log(resData);
      const postDetails = posts?.map(async (post) => {
        // console.log(post);
        const user = await getUserByUserId(post.userId);

        return { ...user, ...post };
      });
      const data = await Promise.all(postDetails);
      setPosts(data);
    };

    userPost();
  }, []);

  // console.log(posts);

  return { posts };
};

export default usePosts;
