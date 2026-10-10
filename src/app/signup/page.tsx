"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";


const SignUpPage = () => {

    const onSubmit = async (e:React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as{name:string, email: string, image: string, password:string}
     
        const {data, error} = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if(data){
            redirect("/")
            console.log(data);
        }

        if(error){
            console.log(error);
            
        }
        
    }
    return (

        <div className="flex justify-center">
          <form onSubmit={onSubmit}>
            <h2>অ্যাকাউন্ট তৈরি করুন</h2>
            <p>বিনা খরচে সাইন আপ করে বিস্তারিত দাম দেখুন।</p>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>
  
  <label className="label">Name</label>
  <input name="name" type="text" className="input w-md" placeholder="Name" />
  
  <label className="label">ImageURL</label>
  <input name="image" type="url" className="input w-md" placeholder="Image" />

  <label className="label">Email</label>
  <input name="email" type="email" className="input w-md" placeholder="Email" />

  <label className="label">Password</label>
  <input name="password" type="password" className="input w-md" placeholder="Password" />

  <button type="submit" className="btn bg-green-600 text-white mt-4">অ্যাকাউন্ট তৈরি করুন</button>
</fieldset>
          </form>
        </div>
    );
};

export default SignUpPage;