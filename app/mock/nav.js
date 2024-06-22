export const user = {
    photo: "/img/profile-picture.jpg",
    username: "determinate"
}
export const userNav = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Profile",
        link: `/${user.username}/`
    },
    {
        name: "Films",
        link: `/${user.username}/films/`
    },
    {
        name: "Diary",
        link: `/${user.username}/films/diary/`
    },
    {
        name: "Reviews",
        link: `/${user.username}/films/reviews/`
    },
    {
        name: "Watchlist",
        link: `/${user.username}/watchlist/`
    },
    {
        name: "Lists",
        link: `/${user.username}/lists/`
    },
    {
        name: "Likes",
        link: `/${user.username}/likes/`
    },
    {
        name: "Tags",
        link: `/${user.username}/tags/`
    },
    {
        name: "Network",
        link: `/${user.username}/following/`
    },
    {
        name: "Settings",
        link: `/settings/`
    },
    {
        name: "Subscriptions",
        link: `/settings/subscriptions/`
    },
    {
        name: "Sign Out",
        link: `/${user.username}/#`
    }
]
export const nav = [
    {
        name: "Films",
        link: `/${user.username}/films/`
    },
    {
        name: "Lists",
        link: `/${user.username}/lists/`
    },
    {
        name: "Members",
        link: `/members/`
    },
    {
        name: "Journal",
        link: `/journal/`
    },
]