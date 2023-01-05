import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from '@supabase/supabase-js'
import { videoService } from "../../services/videoService";

const PROJECT_URL = 'https://ilewblbxmxdxzwedlwhc.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsZXdibGJ4bXhkeHp3ZWRsd2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI4NjE0NTAsImV4cCI6MTk4ODQzNzQ1MH0.bv34XY4NWeZo2UfyiWwRbBVZXM3wkpqZ7BJoiTK58AQ'
const supabase = createClient(PROJECT_URL, API_KEY)

const service = videoService();

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues)
    const [thumb, setThumb] = React.useState(null);

    return {
        values,
        thumb,
        handleChange: (event) => {
            const value = event.target.value;
            const name = event.target.name;
            setValues({
                ...values,
                [name]: value
            })
        },
        clearForm() {
            setValues({})
            setThumb(null)
        },
        generateThumb(url) {
            if (url) {
                setThumb(`https://img.youtube.com/vi/${service.youTubeGetID(url)}/hqdefault.jpg`)
            } else {
                setThumb(null)
            }
        }
    }
}

export default function RegisterVideo() {
    const [showModal, setShowModal] = React.useState(false);
    const formCadastro = useForm({
        initialValues: { titulo: "", url: "" }
    });

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setShowModal(true)}>
                +
            </button>
            {showModal
                ? (
                    <form onSubmit={
                        (event) => {
                            event.preventDefault()
                            supabase.from('videos').insert({
                                title: formCadastro.values.titulo,
                                url: formCadastro.values.url,
                                thumb: formCadastro.thumb,
                                playlist: "jogos"
                            })
                                .then((response) => {
                                    console.log(response)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                            setShowModal(false)
                            formCadastro.clearForm()
                        }
                    }>
                        <div>
                            <button type="button" className="close-modal"
                                onClick={() => {
                                    formCadastro.clearForm()
                                    setShowModal(false)
                                }}
                            >
                                x
                            </button>
                            <input placeholder="Título do vídeo"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                            />
                            <input placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                                onBlur={() => formCadastro.generateThumb(formCadastro.values.url)}
                            />

                            {formCadastro.thumb && <img src={formCadastro.thumb} alt="thumb" />}

                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}