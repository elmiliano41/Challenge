import { useContext } from 'react'
import ChallengeContext from '../context/ChallengeProvider'

const useChallenge = () => {
    return useContext(ChallengeContext)
}

export default useChallenge;