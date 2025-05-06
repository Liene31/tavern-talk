import { tavernTalkData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

document.getElementById("container").addEventListener("click", handleClicks);

function handleClicks(e) {
  if (e.target.dataset.likes) {
    handleLikes(e.target.dataset.likes);
  } else if (e.target.dataset.retweets) {
    handleRetweets(e.target.dataset.retweets);
  } else if (e.target.dataset.replies) {
    handleReplies(e.target.dataset.replies);
  } else if (e.target.id === "tweet-btn") {
    handleBtn();
  }
}

function handleLikes(tweetId) {
  const tweetObject = tavernTalkData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (tweetObject.isLiked) {
    tweetObject.likes--;
  } else {
    tweetObject.likes++;
  }

  tweetObject.isLiked = !tweetObject.isLiked;

  render();
}

function handleRetweets(tweetId) {
  const tweetObject = tavernTalkData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (tweetObject.isRetweeted) {
    tweetObject.retweets--;
  } else {
    tweetObject.retweets++;
  }

  tweetObject.isRetweeted = !tweetObject.isRetweeted;

  render();
}

function handleReplies(tweetId) {
  document.getElementById(tweetId).classList.toggle("hidden");
}

function handleBtn() {
  const inputText = document.getElementById("textarea-input");
  if (inputText.value) {
    tavernTalkData.unshift({
      handle: `@AshesAndHornz 🔥`,
      profilePic: `images/tiefling.jpg`,
      likes: 0,
      retweets: 0,
      tweetText: `${inputText.value}`,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });

    render();
    inputText.value = "";
  }
}

function getFeedHtml() {
  let feedHtml = "";

  tavernTalkData.forEach(function (tweet) {
    let repliesFeedHtml = "";
    let classLiked = "";
    let classRetweeted = "";
    if (tweet.isLiked) {
      classLiked = "liked";
    }
    if (tweet.isRetweeted) {
      classRetweeted = "retweeted";
    }

    tweet.replies.forEach(function (replies) {
      repliesFeedHtml += `
          
          <div class="replies-inner section-line-short">
            <div class="flex">
              <img
                src="${replies.profilePic}"
                class="tweet-img"
              />
              <div>
                <h2 class="handle">${replies.handle}</h2>
                <p class="reply-text">
                  ${replies.tweetText}
                </p>
              </div>
            </div>
          </div>
        
      `;
    });

    feedHtml += `
             <div class="flex">
            <img
              src="${tweet.profilePic}"              
              class="tweet-img"
            />
            <div>
              <h2 class="handle">${tweet.handle}</h2>
              <p class="tweet-text">
                ${tweet.tweetText}
              </p>
            </div>
          </div>
          <div class="tweet-meta">
            <div class="tweet-meta-inner flex">
              <div class="tweet-replies">
                <i class="fa-regular fa-comment-dots pointer" data-replies="${tweet.uuid}"></i
                ><span class="num-of-replies">${tweet.replies.length}</span>
              </div>
              <div class="tweet-likes">
                <i class="fa-solid fa-heart pointer ${classLiked}" data-likes="${tweet.uuid}"></i
                ><span class="num-of-likes" >${tweet.likes}</span>
              </div>
              <div class="tweet-retweets">
                <i class="fa-solid fa-retweet pointer ${classRetweeted}" data-retweets="${tweet.uuid}"></i
                ><span class="num-of-retweets">${tweet.retweets}</span>
              </div>
            </div>
          </div>

          <section class="replies hidden" id="${tweet.uuid}">
          ${repliesFeedHtml}
          </section>
          
    
    `;
  });

  return feedHtml;
}

function render() {
  const tweetSection = document.getElementById("tweet-section");
  tweetSection.innerHTML = getFeedHtml();
}

render();
