import { Box,Button, Typography,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from "@mui/material"
import { useParams } from "react-router-dom"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from "react"



const View = () => {
  const {id}=useParams();
//   console.log(id)

    const [student,setStudent]=useState([]);
    const naviget = useNavigate();

    useEffect(()=>{
        async function getStudent(){
            try{
                const student=await axios.get(`http://localhost:3333/students/${id}`)
                setStudent(student.data);
            }catch(error)
            {
                console.log("Something Wrong");
            }
        }
        getStudent();
    })

    const handleclick=(e)=>{
        naviget("/")
    }

  return (
    <>
    <Box textAlign="center" p={2} sx={{bgcolor:"warning.main"}}>
        <Typography variant="h4" color="white">Student Detail</Typography>
    </Box>
    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{backgroundColor:"#616161"}}>
                                <TableCell textAlign="center">ID</TableCell>
                                <TableCell textAlign="center">NAME</TableCell>
                                <TableCell textAlign="center">EMAIL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell textAlign="center">{student.id}</TableCell>
                                <TableCell textAlign="center">{student.stuname}</TableCell>
                                <TableCell textAlign="center">{student.email}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box m={3} textAlign="center">
                    <Button  variant="contained" color="primary" onClick={handleclick}>Bact To Home</Button>
                </Box>
    </>
  )
}

export default View