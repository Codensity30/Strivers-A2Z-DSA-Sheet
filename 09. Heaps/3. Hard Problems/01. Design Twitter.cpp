/*
QUESTION:
Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.

APPROACH:
To design the Twitter class, we can use the following data structures:

1. unordered_map<int, vector<int>> following: This map stores the users and the list of users they are following. Each user follows themselves initially.
2. unordered_map<int, deque<pair<int, int>>> posts: This map stores the tweets of each user. Each tweet is represented by a pair of (timestamp, tweetId). We use a deque to maintain the most recent 10 tweets for each user.
3. int time: This variable keeps track of the timestamp for tweets.

The Twitter class provides the following methods:

1. Twitter(): Initializes the Twitter object.
2. void postTweet(int userId, int tweetId): Composes a new tweet with ID tweetId by the user userId. The tweet is added to the posts map with the current timestamp. If the size of the user's tweets exceeds 10, the oldest tweet is removed.
3. vector<int> getNewsFeed(int userId): Retrieves the 10 most recent tweet IDs in the user's news feed. It iterates through the users that the given user follows and adds their tweets to a set. The set is sorted in descending order of timestamps. The first 10 tweets are returned.
4. void follow(int followerId, int followeeId): The user with ID followerId starts following the user with ID followeeId. The followeeId is added to the followerId's following list.
5. void unfollow(int followerId, int followeeId): The user with ID followerId stops following the user with ID followeeId. The followeeId is removed from the followerId's following list.

The code provided implements the Twitter class with the above approach.

TIME COMPLEXITY:
The time complexity of the postTweet method is O(1) for adding a tweet to the user's posts.
The time complexity of the getNewsFeed method is O(F * P * log(P)) where F is the number of users the given user follows and P is the maximum number of posts by any user. The method iterates through the posts of each followed user, which takes O(F * P) time, and sorts the tweets, which takes O(P * log(P)) time.
The time complexity of the follow and unfollow methods is O(1) for adding or removing a user from the following list.

SPACE COMPLEXITY:
The space complexity is O(U + P) where U is the number of users and P is the total number of posts. The posts map stores the tweets of each user, and the size of the posts map is bounded by the number of users. The maximum size of the posts deque for each user is 10.
*/

unordered_map<int, vector<int>> following; // key = userId, value = followeeIds
unordered_map<int, deque<pair<int, int>>> posts; // key = userId, value = posts corresponding to that userId
int time;

Twitter() {
    time = 0;
}

void postTweet(int userId, int tweetId) {
    following[userId].push_back(userId); // each user will follow themselves

    if (posts.find(userId) != posts.end() && posts[userId].size() > 10)
        posts[userId].pop_back();

    posts[userId].push_front({time, tweetId});
    time++;
}

vector<int> getNewsFeed(int userId) {
    vector<int> ans;
    set<pair<int, int>, greater<pair<int, int>>> allposts;
    for (int i = 0; i < following[userId].size(); i++) {
        int followe = following[userId][i];
        for (int i = 0; i < posts[followe].size(); i++) {
            allposts.insert(posts[followe][i]);
        }
    }
    int siz = allposts.size();
    int n = min(10, siz);
    for (auto it = allposts.begin(); it != allposts.end() && n; it++) {
        ans.push_back(it->second);
        n--;
    }
    return ans;
}

void follow(int followerId, int followeeId) {
    following[followerId].push_back(followeeId);
}

void unfollow(int followerId, int followeeId) {
    for (int i = 0; i < following[followerId].size(); i++) {
        if (following[followerId][i] == followeeId) {
            following[followerId].erase(following[followerId].begin() + i);
            return;
        }
    }
}
