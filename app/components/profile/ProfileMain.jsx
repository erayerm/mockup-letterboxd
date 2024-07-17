import FavoriteFilms from "./FavoriteFilms"
import PopularReviews from "./PopularReviews"
import RecentActivity from "./RecentActivity"
import RecentReviews from "./RecentReviews"

function ProfileMain() {
    return (
        <div className="basis-[640px]">
            <FavoriteFilms />
            <RecentActivity />
            <RecentReviews />
            <PopularReviews />
        </div>
    )
}

export default ProfileMain