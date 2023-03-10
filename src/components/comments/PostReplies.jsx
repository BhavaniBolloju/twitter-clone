import React from "react";
import { RxCross2 } from "react-icons/rx";
import UserProfile from "../timeline/UserProfile";
import Home from "../timeline/Home";
import { updatePostReplies, updateUserReplies } from "../../firebase/services";
import { useId } from "react";

function PostReplies({
  onClose,
  postImage,
  caption,
  spFullname,
  spUsername,
  spUserId,
  spDocId,
  postId,
  loggedUserId,
  imageSrc,
  loggedUserDocId,
  loggedUserName,
  loggedUserFullName,
  onAddComment,
}) {
  const id = useId();
  const replyCommentHandler = function (reply) {
    updatePostReplies(spDocId, loggedUserName, reply, id);
    updateUserReplies(loggedUserDocId, reply, postId, spUsername, id);
    onClose(false);
    onAddComment((prev) => (prev += 1));
  };

  return (
    <div className="fixed h-[100vh] z-20 w-full top-0 left-0">
      <div className="fixed h-full z-30  w-full bg-black/40" />
      <div className="fixed  translate-x-[-50%] top-20 left-1/2 z-50 bg-white w-[500px] p-4 rounded-xl">
        <RxCross2
          onClick={(e) => {
            e.stopPropagation();
            onClose(false);
          }}
          className="cursor-pointer"
        />
        <div className="flex flex-col gap-6 mt-3 pl-5 pt-4">
          <div>
            <UserProfile
              imageSrc={postImage}
              fullname={spFullname}
              username={spUsername}
            />
            <div className="text-sm text-gray-600">
              <p className="ml-12 mb-2">{caption}</p>
              <p className="ml-12">
                replaying to
                <span className="text-blue-500"> @{spUsername}</span>
              </p>
            </div>
          </div>

          <Home
            onReply={replyCommentHandler}
            avatarUrl={imageSrc}
            username={loggedUserName}
            fullname={loggedUserFullName}
          />
        </div>
      </div>
    </div>
  );
}

export default PostReplies;
