import React , {useRef} from "react";
import {useForm} from "react-hook-form";

// export default function App() {
//     const { register, watch , handleSubmit, formState: { errors } } = useForm();
//     const name = useRef({});
//     name.current = watch("name", "");
//     const email = useRef({});
//     email.current = watch("email", "");
//     const aadhar = useRef({});
//     aadhar.current = watch("aadhar", "");
//     const gender = useRef({});
//     gender.current = watch("gender", "");
//     const password = useRef({});
//     password.current = watch("password", "");
//     const cpassword = useRef({});
//     cpassword.current = watch("cpassword", "");

//     const onSubmit123 = async data => {
//         alert(JSON.stringify(data));
//         console.log(errors);
//       };
  

//   return (
//     <form onSubmit={e => e.preventDefault()}>
//         {errors.name && <p>{errors.name.message}</p>}
//       <input
//         name="name"
//         type="text"
//         placeholder="Enter Your Name"
//         ref = {"name", register("name", { required: "You must specify a name",minLength: {
//             value: 2,
//             message: "Name should be of at least 2 characters"
//           } })}
//       />
//       {errors.email && <p>{errors.email.message}</p>}
//       <input
//         name="email"
//         type="email"
//         placeholder="Enter Your Email"
//         ref = {register("email", { required: "You must enter a valid email address", pattern: /^\S+@\S+$/i })}
//       />
//       <input
//         name="aadhar"
//         type="text"
//         placeholder="Enter Aadhar Number"
//         ref={register("aadhar", { required: true, max: 13, min: 13 })}
//       />
//       <span>Gender :- </span>
//       <span> Yes </span>{" "}
//       <input
//         name="gender"
//         ref={register("gender", { required: true })}
//         type="radio"
//         value="Yes"
//       />
//       <span> No </span>{" "}
//       <input
//         name="gender"
//         ref={register("gender", { required: true })}
//         type="radio"
//         value="No"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Enter password"
//         ref={register("password", { required: true, max: 32, min: 8 })}
//       />
//       <input
//         name="cpassword"
//         type="password"
//         placeholder="Re-Enter password"
//         ref={register("cpassword", { required: true, max: 32, min: 8 })}
//       />
//       <input type="submit" onClick={handleSubmit(onSubmit123)} />
//     </form>
//   );
// }

export default function Registration1() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async data => {
      alert(JSON.stringify(data));
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName", { required: true })} />
        {errors.firstName?.type === 'required' && "First name is required"}
       
        <input {...register("lastName", { required: true })} />
        {errors.lastName && "Last name is required"}
       
        <input type="submit" />
       </form>
    );
  }
