// Skill Endorsement - (Algorithmic) - [Medium - Linkedin]
// You have an array of skill endorsements where each endorsement consists of a skill and a user. Your goal is to create a function 
// that aggregates these endorsements to provide a summary of each skill along with the users who endorsed it and the total count of 
// endorsements.

// Input:
// endorsements: An array of endorsement objects, where each object has properties skill and user.
// Output:
// An array of skill summaries, each containing skill, user array, and count of endorsements.

// Example:
const endorsements = [
    { skill: 'css', user: 'Bill' },
    { skill: 'javascript', user: 'Chad' },
    { skill: 'javascript', user: 'Bill' },
    { skill: 'css', user: 'Sue' },
    { skill: 'javascript', user: 'Sue' },
    { skill: 'html', user: 'Sue' }
];

function aggregateSkillEndorsements(endorsements) {
    const resultMap = {};
    // Iterate through each endorsement
    endorsements.forEach(endorsement => {
        // If skill doesn't exist in resultMap, initialize an array
        if (!resultMap[endorsement.skill]) resultMap[endorsement.skill] = [];
        // Push the user to the skill's user array
        resultMap[endorsement.skill].push(endorsement.user);
    });

    const results = [];
    // Convert resultMap to skill summaries
    for (const skill in resultMap) {
        const users = resultMap[skill];
        results.push({
            skill: skill,
            user: users,
            count: users.length
        });
    }
    return results;
}

const skillSummaries = aggregateSkillEndorsements(endorsements);
document.getElementById('skillEndorsement').addEventListener('click', () => console.log(skillSummaries));
// Output:
// [ // { skill: 'javascript', user: ['Chad', 'Bill', 'Sue'], count: 3 }, 
// { skill: 'css', user: ['Bill', 'Sue'], count: 2 }, 
// { skill: 'html', user: ['Sue'], count: 1 } // ] 
