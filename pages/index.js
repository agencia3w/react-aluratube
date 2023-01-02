import React from "react";
import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/Timeline";
import Menu from "../src/components/Menu";
import { StyledFavoriteUsers } from "../src/components/FavoriteUsers";

function HomePage() {
    const [filterValue, setfilterValue] = React.useState("");

    return (
        <>
            <CSSReset />
            <div>
                <Menu filterValue={filterValue} setfilterValue={setfilterValue} />
                <Header />
                <Timeline searchValue={filterValue} playlists={config.playlists} />
                <FavoriteUsers />
            </div>
        </>
    )
}

export default HomePage

const StyledHeader = styled.div`
    .banner {
        width: 100%;
        height: 250px;
        overflow: hidden;
    }

    .banner img {
        width: 100%;
    }

    section img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
        margin-top: 20px;
    }
`;

function Header() {
    return (
        <StyledHeader>
            <div className="banner">
                <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200" />
            </div>

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...props }) {
    const playlistsNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {playlistsNames.map(playlistsName => {
                const videos = props.playlists[playlistsName]

                return (
                    <section key={playlistsName}>
                        <h2>{playlistsName}</h2>
                        <div>
                            {
                                videos.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase()
                                    const searchValueNormalized = searchValue.toLowerCase()

                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                    .map((video) => {
                                        return (
                                            <a key={video.url} href={video.url}>
                                                <img src={video.thumb} />
                                                <span>{video.title}</span>
                                            </a>
                                        )
                                    })
                            }
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function FavoriteUsers() {
    return (
        <>
            <h2 style={{ paddingLeft: '32px', fontSize: '16px', marginBottom: '16px' }}>AluraTubes Favoritos</h2>
            <StyledFavoriteUsers>
                {config.favoriteUsers.map((user) => {
                    return (
                        <div className="user-info" key={user.github}>
                            <img src={`https://github.com/${user.github}.png`} />
                            <span>@{user.github}</span>
                        </div>
                    )
                })}
            </StyledFavoriteUsers>
        </>
    )
}