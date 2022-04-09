import leaderboardRepo from "../../helpers/api/leaderboard-repo"

export default function handler(req, res) {
  console.log('read')
  console.log(leaderboardRepo)
  const data = leaderboardRepo.getAll()
  console.log(data)
  res.status(200).json({ leaderboard: data })
}
