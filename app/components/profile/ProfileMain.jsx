import FavoriteFilms from "./FavoriteFilms"
import RecentActivity from "./RecentActivity"
import RecentReviews from "./RecentReviews"

function ProfileMain() {
    return (
        <div className="basis-[640px]">
            <FavoriteFilms />
            <RecentActivity />
            <RecentReviews />
        </div>
    )
}

export default ProfileMain