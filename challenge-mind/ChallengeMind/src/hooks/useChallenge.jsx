import { useContext } from 'react'
import ChallengeContext from '../context/ChallengeProvider'

export default function useChallenge() {
    return useContext(ChallengeContext)
}
