import config from "../config.json"
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/Timeline";
import Menu from "../src/components/Menu";

function HomePage() {
    return (
        <>
            <CSSReset />
            <div>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
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

function Timeline(props) {
    const playlistsNames = Object.keys(props.playlists)

    return (
        <StyledTimeline>
            {playlistsNames.map(playlistsName => {
                const videos = props.playlists[playlistsName]

                return (
                    <section>
                        <h2>{playlistsName}</h2>
                        <div>
                            {
                                videos.map((video) => {
                                    return (
                                        <a href={video.url}>
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