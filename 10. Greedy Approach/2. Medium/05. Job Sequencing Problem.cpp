/*
Question:
Given a set of N jobs where each job 'i' has a deadline and profit associated with it. Each job takes 1 unit of time to complete, and only one job can be scheduled at a time. We earn the profit associated with a job if and only if the job is completed by its deadline. Find the number of jobs done and the maximum profit.

Example:
Input:
N = 4
Jobs = {(1,4,20),(2,1,10),(3,1,40),(4,1,30)}
Output:
2 60
Explanation:
Job1 and Job3 can be done with a maximum profit of 60 (20+40).

Approach:
- We create a vector of pairs 'jobs' to store the profit and deadline of each job.
- We sort the 'jobs' vector in non-increasing order of profits.
- We initialize a vector 'deadline' of size 'n+1' and set all elements to -1.
- We also initialize variables 'ans' and 'cnt' to 0.
- We iterate over the 'jobs' vector.
  - For each job, we get the deadline and profit.
  - We check from the deadline to 1 (in reverse order) if there is any slot available to schedule the job.
  - If we find an available slot, we mark it as scheduled by setting 'deadline[dead]' to 1, increment 'cnt' and add the profit to 'ans'.
- Finally, we return a vector containing 'cnt' and 'ans' as the number of jobs done and the maximum profit.

Complexity Analysis:
- The time complexity of this approach is O(NlogN), where N is the number of jobs.
- This is due to the sorting operation on the 'jobs' vector based on profits.
- The space complexity is O(N) as we use additional vectors to store the jobs and deadlines.

Code:
*/

static bool comp(pair<int,int> a, pair<int,int> b) {
    return a.first > b.first;
}

vector<int> JobScheduling(Job arr[], int n) {
    vector<pair<int,int>> jobs;
    for(int i = 0; i < n; i++) {
        jobs.push_back({arr[i].profit, arr[i].dead});
    }
    sort(jobs.begin(), jobs.end(), comp);
    vector<int> deadline(n+1, -1);
    int ans = 0, cnt = 0;
    for(int i = 0; i < n; i++) {
        int dead = jobs[i].second;
        int profit = jobs[i].first;
        while(dead >= 1 && deadline[dead] != -1) {
            dead--;
        }
        if(dead >= 1) {
            deadline[dead] = 1;
            cnt++;
            ans += profit;
        }
    }
    return {cnt, ans};
}
