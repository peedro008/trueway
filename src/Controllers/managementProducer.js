import React, {  useState } from "react";
import { useForm  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { GetProducer } from "../Logic/Fetch";
import ManagementProducerComponent from "../Components/managementProducer";
import { useDispatch, useSelector } from "react-redux";


const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.number().positive().integer().required(),
    LocationId: yup.number().required(),
    Password: yup.string().required().min(6),

}).required();
  
const ManagementProducer=()=>{
    const dispatch = useDispatch()
    const locations = useSelector((state) => state.Locations);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const { register, handleSubmit,control, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
      });
    const [inputs, setinputs]= useState({})
    const onSubmit = (data) => {
        data&&
        setinputs({...inputs, UserRole:"Producer"})
        
        fetch(`http://localhost:8080/addProducer`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(data)
            
        })
        .then(async res => { 
            
            try {
            const jsonRes = await res.json();
            
            if (res.status !== 200) {
                console.log("error")
            } else {
               
               console.log(jsonRes)
            
               GetProducer(dispatch)
                
            }
        } catch (err) {
            console.log(err);
        };
    onOpenModal()
  
    })
        .catch(err => {
            console.log(err);
        });
    }

    const options = locations.map(e=>({value:e.id,label:e.name}))
       
    return( 
       <ManagementProducerComponent
            onOpenModal={onOpenModal}
            onCloseModal={onCloseModal}
            open={open}
            options={options}
            locations={locations}
            control={control}
            inputs={inputs}
            setinputs={setinputs}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            schema={schema}
        />
    )
}
export default ManagementProducer