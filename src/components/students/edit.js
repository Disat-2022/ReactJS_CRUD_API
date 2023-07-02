import { Box, Typography,Button,Grid,TextField } from "@mui/material"
import axios from "axios"
import {useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
const Edit = () => {
  const { id } = useParams();
 const naviget = useNavigate();
 const [student, setStudent] = useState({
  stuname: "",
  email: ""
 });
 useEffect(() => {
  async function getStudent() {
   try {
    const student = await axios.get(`http://localhost:3333/students/${id}`)
    // console.log(student.data);
    setStudent(student.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getStudent();
 }, [id]);

 function onTextFieldChange(e) {
  setStudent({
   ...student,
   [e.target.name]: e.target.value
  })
 }

 async function onFormSubmit(e) {
  e.preventDefault()
  try {
   await axios.put(`http://localhost:3333/students/${id}`, student);
   naviget("/")
  } catch (error) {
   console.log("Something is Wrong");
  }
 }
//   const {id}=useParams();
//   const naviget=useNavigate();
//   const[student,setStudent]=useState(
//     {
//     stuname:"",
//     email:""
//     }
//     )
//   useEffect(()=>{
//     async function getStudent(){
//         try{
//             const student=await axios.get(`http://localhost:3333/students/${id}`)
//             setStudent(student.data);
//         }catch(error)
//         {
//             console.log("Something Wrong");
//         }
//     }
//     getStudent();
// });

// function onTextFieldChange(e){
//   setStudent({
//       ...student,
//       [e.target.name] : e.target.value,
//   }
//   )
// }

// async function onFormSubmit(e)
// {
//   e.preventDefault();
//   try{
//       await axios.put(`http://localhost:3333/students/${id}`,student);
//       naviget('/');
//   }
//   catch(error)
//   {
//       console.log("Something is Wrong");
//   }
  
// }

const handleclick=(e)=>{
  naviget("/")
}


  return (
    <>
      <Box textAlign="center" sx={{ bgcolor: 'primary.main' }} p={2} mb={2}>
            <Typography variant="h3" color="white">ReactJS CRUD with API call</Typography>
      </Box>

      <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} mb={2} sx={{bgcolor:"success.main"}}>
                    <Typography variant="h4" color="white">Edit Student</Typography>
                </Box>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="id" name="id" 
                            variant="outlined" required fullWidth id="id"
                            label="ID" autoFocus value={id} disabled>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="stuname" name="stuname" 
                            variant="outlined" required fullWidth id="stuname"
                             label="Name" value={student.stuname} onChange={e=>onTextFieldChange(e)}>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="email" name="email" 
                            variant="outlined" required fullWidth id="emai"
                             label="Email" value={student.email} onChange={e=>onTextFieldChange(e)}>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Box m={3}>
                      <Button type="button" variant="contained" fullWidth color="primary" onClick={e=>onFormSubmit(e)}>Update</Button>
                    </Box>
                </form>
                <Box m={3} textAlign="center">
                    <Button variant="contained" color="primary" onClick={handleclick}>Back To Home</Button>
                </Box>
            </Grid>
          </Grid>
    </>
  )
}

export default Edit