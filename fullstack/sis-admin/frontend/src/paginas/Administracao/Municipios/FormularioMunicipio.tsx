import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IMunicipio from "../../../interfaces/IMunicipio"

const FormularioMunicipios = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.codigoMunicipio) {
            http.get<IMunicipio>(`municipio?codigoMunicipio=${parametros.codigoMunicipio}`)
                .then(resposta =>
                    {
                        setNomeMunicipio(resposta.data.nome)                        
                        setStatusMunicipio(resposta.data.status)
                        setCodigoUFMunicipio(resposta.data.codigoUF)
                    }                                      
                )
        }else {
            console.log(parametros)
        }
    }, [parametros])
    
    const [nomeMunicipio, setNomeMunicipio] = useState('')
    const [statusMunicipio, setStatusMunicipio] = useState('')
    const [codigoUFMunicipio, setCodigoUFMunicipio] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.codigoMunicipio) {
            http.put(`municipio/${parametros.codigoMunicipio}`, {                
                codigoUF: codigoUFMunicipio,
                nome: nomeMunicipio,
                status: statusMunicipio
            })
                .then(() => {
                    alert("Municipio atualizado com sucesso!")
                })
        } else {
            http.post('municipio/', {                                
                nome: nomeMunicipio,
                status: statusMunicipio,
                codigoUF: codigoUFMunicipio
            })
                .then(() => {
                    alert("Municipio cadastrada com sucesso!")
                })
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Municipios</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nomeMunicipio}
                    onChange={evento => setNomeMunicipio(evento.target.value)}
                    label="Nome do Municipio"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={statusMunicipio}
                    onChange={evento => setStatusMunicipio(evento.target.value)}
                    label="Status do Municipio"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioMunicipios