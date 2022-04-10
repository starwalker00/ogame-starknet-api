import leaderboardRepo from "../../helpers/api/leaderboard"

export default async function handler(req, res) {
  console.log('getLeaderboard')
  const data = await leaderboardRepo.readData();
  res.status(200).json({ leaderboard: data })
}
