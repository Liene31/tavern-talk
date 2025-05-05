import { tavernTalkData } from "./data.js";

function getFeedHtml() {
  let feedHtml = "";

  tavernTalkData.forEach(function (tweet) {
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
                <i class="fa-regular fa-comment-dots"></i
                ><span class="num-of-replies">${tweet.replies.length}</span>
              </div>
              <div class="tweet-likes">
                <i class="fa-solid fa-heart"></i
                ><span class="num-of-likes">${tweet.likes}</span>
              </div>
              <div class="tweet-retweets">
                <i class="fa-solid fa-retweet"></i
                ><span class="num-of-retweets">${tweet.retweets}</span>
              </div>
            </div>
          </div>
    
    `;
  });

  return feedHtml;
}

function render() {
  const tweetSection = document.getElementById("tweet-section");
  tweetSection.innerHTML = getFeedHtml();
}

render();
