import { Box, Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IPessoa from "../../../interfaces/IPessoa"
import IEndereco from "../../../interfaces/IEndereco"

const FormularioPessoa = () => {    

    const parametros = useParams()

    useEffect(() => {
        if (parametros.codigoPessoa) {
            http.get<IPessoa>(`pessoa?codigoPessoa=${parametros.codigoPessoa}`)
                .then(resposta => 
                    {
                        const {nome, sobrenome, idade, login, senha, status, enderecos} = resposta.data
                        setNomePessoa(nome)
                        setSobrenomePessoa(sobrenome)
                        setIdadePessoa(idade)
                        setLoginPessoa(login)
                        setSenhaPessoa(senha)
                        setStatusPessoa(status)

                        // setEnderecos(enderecos)
                        
                        setEnderecos(enderecos)
                        // setCodigoEndereco(enderecos[0].codigoEndereco)
                        // setCodigoBairro(enderecos[0].codigoBairro)
                        // setNomeRua(enderecos[0].nomeRua)
                        // setNumero(enderecos[0].numero)
                        // setComplemento(enderecos[0].complemento)
                        // setCep(enderecos[0].cep)
                        // console.log(enderecos[0]);
                    }  
                )
        }
    }, [parametros])

    const [nomePessoa, setNomePessoa] = useState('')
    const [sobrenomePessoa, setSobrenomePessoa] = useState('')
    const [idadePessoa, setIdadePessoa] = useState('')
    const [loginPessoa, setLoginPessoa] = useState('')
    const [senhaPessoa, setSenhaPessoa] = useState('')
    const [statusPessoa, setStatusPessoa] = useState('')

    const [codigoEnderecoEndereco, setCodigoEndereco] = useState('')
    const [codigoBairroEndereco, setCodigoBairro] = useState('')
    const [nomeRuaEndereco, setNomeRua] = useState('')
    const [numeroEndereco, setNumero] = useState('')
    const [complementoEndereco, setComplemento] = useState('')
    const [cepEndereco, setCep] = useState('')
    
    const [enderecos, setEnderecos] = useState<IEndereco[]>([])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
      
      const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.codigoPessoa) {
            http.put(`pessoa/${parametros.codigoPessoa}`, {
                nome: nomePessoa,
                sobrenome: sobrenomePessoa,
                idade: idadePessoa,
                login: loginPessoa,
                senha: senhaPessoa,
                status: statusPessoa,

                enderecos: [{
                    codigoEndereco: codigoEnderecoEndereco,
                    codigoBairro: codigoBairroEndereco,
                    nomeRua: nomeRuaEndereco,
                    numero: numeroEndereco,
                    complemento: complementoEndereco,
                    cep: cepEndereco 
                }]
            })
                .then(() => {
                    alert("Pessoa atualizada com sucesso!")
                })
        } else {
            http.post('pessoa/', {
                nome: nomePessoa,
                sobrenome: sobrenomePessoa,
                idade: idadePessoa,
                login: loginPessoa,
                senha: senhaPessoa,
                status: statusPessoa,

                enderecos
            })
                .then(() => {
                    alert("Pessoa cadastrada com sucesso!")
                    document.location.href = "/admin/pessoas";
                })
        }

    }

    function handleAddEndereco(){
        const endereco: IEndereco = {
            cep:cepEndereco,
            codigoBairro: codigoBairroEndereco,            
            complemento: complementoEndereco,
            nomeRua: nomeRuaEndereco,
            numero: numeroEndereco
        }
        setEnderecos([...enderecos, endereco])
        setCep('')
        setCodigoBairro('')
        setCodigoEndereco('')
        setComplemento('')
        setNomeRua('')
        setNumero('')
    }

    function handleDeleteAddress(index:number){
        const firstPartEndereco = enderecos.slice(0,index);
        const lastPartEndereco = enderecos.slice(index+1);

        const finalListEndereco = [...firstPartEndereco,...lastPartEndereco];

        setEnderecos(finalListEndereco);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pessoas</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>                
                <TextField
                    value={nomePessoa}
                    onChange={evento => setNomePessoa(evento.target.value)}
                    label="Nome da Pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={sobrenomePessoa}
                    onChange={evento => setSobrenomePessoa(evento.target.value)}
                    label="Sobrenome da pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={idadePessoa}
                    onChange={evento => setIdadePessoa(evento.target.value)}
                    label="Idade da Pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={loginPessoa}
                    onChange={evento => setLoginPessoa(evento.target.value)}
                    label="Login da Pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={senhaPessoa}
                    onChange={evento => setSenhaPessoa(evento.target.value)}
                    label="Senha da Pessoa"
                    variant="standard"
                    type="password"
                    fullWidth
                    required
                />
                <TextField
                    value={statusPessoa}
                    onChange={evento => setStatusPessoa(evento.target.value)}
                    label="Status da Pessoa"
                    variant="standard"
                    fullWidth
                    required
                />

<Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Endereço</Typography>
                <TextField
                    value={codigoBairroEndereco}
                    onChange={evento => setCodigoBairro(evento.target.value)}
                    label="Código do Bairro"
                    variant="standard"
                    fullWidth                    
                />
                <TextField
                    value={nomeRuaEndereco}
                    onChange={evento => setNomeRua(evento.target.value)}
                    label="Nome da rua"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={numeroEndereco}
                    onChange={evento => setNumero(evento.target.value)}
                    label="Numero"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={complementoEndereco}
                    onChange={evento => setComplemento(evento.target.value)}
                    label="Complemento"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={cepEndereco}
                    onChange={evento => setCep(evento.target.value)}
                    label="Cep"
                    variant="standard"
                    fullWidth
                    
               />

                <Button sx={{ marginTop: 1 }} type="button" fullWidth variant="outlined" onClick={handleAddEndereco}>Incluir novo endereço</Button>

                <List dense>
              {enderecos.map((endereco, index)=>{
                return (                    
                        <ListItem
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={()=>{
                                handleDeleteAddress(index)
                            }}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        >                  
                          <ListItemText
                            primary={
                                // `${endereco.codigoBairro} ${endereco.nomeRua}`

                                <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                  rows={rows}
                                  columns={columns}
                                  pageSize={5}
                                  rowsPerPageOptions={[5]}
                                  checkboxSelection
                                />
                              </div>
                            }
                          />
                        </ListItem>                      
                )
              })}
            </List>
        </Box>            
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>

            </Box>
        </Box>
    )
}

export default FormularioPessoa