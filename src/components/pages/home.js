import { Box,Button,CssBaseline,Grid,IconButton,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,Tooltip,Typography} from "@mui/material"
import { Link } from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from "axios";
import {useState,useEffect} from "react"

const Home = () => {

  const [students,setStudents]=useState([]);
  useEffect(()=>{
    async function getAllstudent(){
        try{
            const students=await axios.get("http://localhost:3333/students");
            // console.log(students.data);
            setStudents(students.data)
        }
        catch(error)
        {
            console.log("Something is Wrong");
        }
      }
        getAllstudent();
  })

  const[student,setStudent]=useState(
    {
        stuname:"",
        email:""
    }
  )
  function onTextFieldChange(e){
    setStudent({
        ...student,
        [e.target.name] : e.target.value,
    }
    )
  }

  const [status,setStatus]=useState();
  async function onFormSubmit(e)
  {
    e.preventDefault();
    try{
        await axios.post(`http://localhost:3333/students`,student);
        setStatus(true)
    }
    catch(error)
    {
        console.log("Something is Wrong");
    }
    // document.getElementById("addform").reset();
  }
  if(status)
  {
    return(<Home/>)
  }
  
  const handleDelte = async id=>{
    await axios.delete(`http://localhost:3333/students/${id}`);

    var newstudent=students.filter((item)=>{
        return item.id !==id;
    })
    setStudents(newstudent);
  }

  return (
    <>
    <CssBaseline/>
       <Box textAlign="center" sx={{ bgcolor: 'primary.main' }} p={2} mb={2}>
            <Typography variant="h3" color="white">ReactJS CRUD with API call</Typography>
       </Box> 
       <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} mb={2} sx={{bgcolor:"success.main"}}>
                    <Typography variant="h4" color="white">Add Student</Typography>
                </Box>
                <form noValidate id="addform">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete="stuname" name="stuname" 
                            variant="outlined" required fullWidth id="stuname"
                             label="Name" onChange={e=>onTextFieldChange(e)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="email" name="email" 
                            variant="outlined" required fullWidth id="emai"
                             label="Email" onChange={e=>onTextFieldChange(e)}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                    <Button type="submit" variant="contained" color="primary" fullWidth onClick={e=>onFormSubmit(e)}>Add</Button>
                    </Box>
                </form>
            </Grid>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} sx={{bgcolor:"warning.main"}}>
                    <Typography variant="h4" color="white">Student List</Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{backgroundColor:"#616161"}}>
                                <TableCell textAlign="center">ID</TableCell>
                                <TableCell textAlign="center">Name</TableCell>
                                <TableCell textAlign="center">Email</TableCell>
                                <TableCell textAlign="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                            {
                                students.map((student,i)=>{
                                    return(
                            <TableRow key={i}>
                                <TableCell textAlign="center">{i+1}</TableCell>
                                <TableCell textAlign="center">{student.stuname}</TableCell>
                                <TableCell textAlign="center">{student.email}</TableCell>
                                <TableCell textAlign="center">
                                    <Tooltip title="View">
                                        <IconButton>
                                            <Link to={`/view/${student.id}`}>
                                                <VisibilityIcon color="primary"></VisibilityIcon>
                                           </Link>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton>
                                            <Link to={`/edit/${student.id}`}>
                                                <EditIcon></EditIcon>
                                           </Link>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={()=>handleDelte(student.id)}>
                                                <DeleteIcon color="secondary"></DeleteIcon>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                                    )
                                })
                            }

                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
       </Grid>
    </>
  )
}

export default Home