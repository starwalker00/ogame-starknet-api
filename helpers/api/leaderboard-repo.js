const fs = require('fs');

let leaderboard = require('../../data/leaderboard.json');

const leaderboardRepo = {
    getAll: () => leaderboard,
    updateOrCreate
};

function updateOrCreate(item) {
    console.log("updateOrCreate")
    const current = leaderboard.find(x => x.owner.toString() === item.owner);
    if (current) {
        console.log("existing owner found")
        //update 
        Object.assign(current, item);
    }
    else {
        console.log("new owner")
        // add
        leaderboard.push(item);
    }
    saveData();
}

function saveData() {
    fs.writeFileSync('data/leaderboard.json', JSON.stringify(leaderboard, null, 4));
}

export default leaderboardRepo;
