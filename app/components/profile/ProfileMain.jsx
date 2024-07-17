import FavoriteFilms from "./FavoriteFilms"
import RecentActivity from "./RecentActivity"

function ProfileMain() {
    return (
        <div className="basis-[640px]">
            <FavoriteFilms />
            <RecentActivity />
        </div>
    )
}

export default ProfileMain