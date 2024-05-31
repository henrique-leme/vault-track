import { ArrowLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ returnTo }: { returnTo: string }) => {
  const navigate = useNavigate()

  return (
    <ArrowLeftIcon
      className="absolute h-8 w-8 returnTop-6 left-6 p-1 rounded-full bg-white shadow hover:bg-gray-200 border border-gray-200"
      onClick={() => navigate(returnTo)}
    />
  )
}

export default BackButton
