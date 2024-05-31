import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import UpdateUserForm from '@/components/UpdateUserForm'

function ProfilePage() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="profile-card">
          <BackButton returnTo="/home" />
          <h1 className="mt-10">Back to home page</h1>
          <UpdateUserForm />
        </div>
      </div>
    </>
  )
}

export default ProfilePage
