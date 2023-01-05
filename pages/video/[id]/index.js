import { useRouter } from "next/router";
import Menu from "../../../src/components/Menu";
import styled from "styled-components";
import { videoService } from "../../../src/services/videoService";
import React, { useEffect } from "react";

export default function Videos() {
    const router = useRouter();
    const id = router.query.id;

    const [video, setVideo] = React.useState(null);

    const service = videoService();

    useEffect(() => {
        if(!router.isReady) return;

        service.getVideoDetails(id)
            .then((response) => {
                console.log(response.data)
                setVideo(response.data[0])
            })
    }, [router.isReady])

    return (
        <>
            <Menu />
            {video &&
                <Video>
                    <iframe width="100%" height="500" src={`https://www.youtube.com/embed/${service.youTubeGetID(video.url)}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <h2>{video.title}</h2>
                </Video>
            }
        </>
    )
}

const Video = styled.div`
    width: 100%;
    margin-top: 64px;
    padding: 16px 32px;
`;