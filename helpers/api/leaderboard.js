import { JsonBinIoApi } from 'jsonbin-io-api';

const apiJsonBin = new JsonBinIoApi(process.env.JSONBIN_KEY);

const leaderboard = {
    readData,
    saveData
};

async function readData() {
    console.log("async function readData() ")
    // read object
    try {
        const results = await apiJsonBin.bins.read({
            binId: process.env.JSONBIN_BINID,
        })
        console.log("results.record")
        console.log(results.record)
        return results.record;
    } catch (error) {
        console.error(error);
    }
}

async function saveData(leaders) {
    console.log("async function saveData(leaders) ")
    // format object
    let now = new Date();
    let object = {
        updatedAt: now.toISOString(),
        leaders: leaders
    }

    // store object
    try {
        const record = await apiJsonBin.bins.update({
            binId: process.env.JSONBIN_BINID,
            record: object
        })
        // console.log(record)
        console.log("saved")
    } catch (error) {
        console.error(error);
    }
}

export default leaderboard;
