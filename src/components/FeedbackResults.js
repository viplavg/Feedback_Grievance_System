import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


function FeedbackResults() {

  // define columns for the table
  const columns = [
    { 
      field: 'formDetails', 
      headerName: 'Form details', 
      width: 120, 
      sortable: false, 
      headerAlign: 'center', 
      align: 'center' 
    },
    { 
      field: 'customerName', 
      headerName: 'Customer name', 
      width: 150, 
      sortable: false, 
      headerAlign: 'center', 
      align: 'center' 
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 150, 
      sortable: false, 
      headerAlign: 'center', 
      align: 'center' 
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'number',
      width: 150,
      sortable: false,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'quality',
      headerName: 'Please rate the quality of the service you received from your host',
      sortable: false,
      width: 510,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'beverage',
      headerName: 'Please rate the quality of your beverage',
      sortable: false,
      width: 310,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'clean',
      headerName: 'Was our restaurant clean?',
      sortable: false,
      width: 250,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'dining',
      headerName: 'Please rate your overall dining experience',
      sortable: false,
      width: 350,
      headerAlign: 'center',
      align: 'center'
    },
  ];
  
  //define rows for the table and initialise it to empty array for now
  let rows = [];  

  //state variables 
  const [feedbacks ,setFeedbacks] = useState([]);
  const [records, setRecords] = useState(0);

  //useEffect to get the data from localStorage on component loads and set respective state variables
  useEffect(()=>{

    let data = JSON.parse(localStorage.getItem("masterData"));   
    setFeedbacks(data);
    setRecords(data.length);

  }, [])

  //iterate over each object in the feedback state variable and make the required row format object to coordinate it with column defined above
  feedbacks.forEach((fb, ind)=>{
    let row = {
      id: ind,
      formDetails: "View details",
      customerName: fb.name,
      email: fb.email,
      phone: fb.phone,
      quality: fb.quality,
      beverage: fb.beverage,
      clean: fb.clean,
      dining: fb.dining,
    }
    rows.push(row);
  })


  // display on the screen 
  return (


    <div className='feedback-results'>
        
      <div className='feedback-container'>

        <div className='top-bar'>

            <p>{records} records found. <span>0 filters applied.</span></p>

            <div className='tools'>

              <i class="fa-solid fa-magnifying-glass"></i>
              <i class="fa-solid fa-arrow-rotate-right"></i>
              <button>Add New</button>

            </div>

            

        </div>

        <div className='table-data'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
        </div>

      </div>
        
    </div>


  )


}



export default FeedbackResults;