import { Contract } from "starknet";
import { bnToUint256 } from "starknet/dist/utils/uint256";
import { toBN } from "starknet/dist/utils/number";

import leaderboardRepo from "../../helpers/api/leaderboard-repo"
import ogameAbi from "../../abi/ogame.json"
import erc721Abi from "../../abi/erc721.json"
const ogameAddress = "0x03763a8330144f3552ba10e36fcf52fb002a338ff55ecb842d5282e0a6fb1226";

export default async function handler(req, res) {
  console.log('fetch');

  // init ogame contract
  const ogame = new Contract(ogameAbi, ogameAddress);

  // get planet erc721 address
  const planetAddress = await ogame.erc721_address();
  const planetAddressBN = toBN(planetAddress[0]);
  const planetAddressHexString = "0x".concat(planetAddressBN.toString(16));
  // console.log(planetAddressHexString);

  // get planet erc721 total supply
  const planetTotalSupply = await ogame.number_of_planets();
  const planetTotalSupplyBN = toBN(planetTotalSupply[0]);
  console.log(`found ${planetTotalSupplyBN.toString(10)} entries`)

  // init planet contract
  const erc721 = new Contract(erc721Abi, planetAddressHexString);

  // get players and points, write or update results to file
  for (let i = 1; i <= planetTotalSupplyBN.toNumber(); i++) {
    const ownerAddress = await erc721.ownerOf(bnToUint256(i));
    const ownerAddressBN = toBN(ownerAddress[0]);
    const ownerAddressHexString = "0x".concat(ownerAddressBN.toString(16));
    const points = await ogame.player_points(ownerAddressBN);
    const pointsBN = toBN(points);
    let item = {
      owner: ownerAddressHexString,
      points: pointsBN.toNumber()
    }
    console.log(item)
    // write to file
    leaderboardRepo.updateOrCreate(item);
  }
  res.status(200).json({ done: 'true', message: `created or updated ${planetTotalSupplyBN.toString()} entries` })
}
