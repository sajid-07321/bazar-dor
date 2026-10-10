"use client"

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";


const SignInPage = () => {

  const onSubmit = async (e:React.SubmitEvent<HTMLElement>) => {
          e.preventDefault()
  
          const formData = new FormData(e.target)
          const user = Object.fromEntries(formData.entries()) as{ email: string, password:string}
       
          const {data, error} = await authClient.signIn.email({
              ...user,
              callbackURL: "/"
          })
  
          if(data){
            toast.success("পুনরায় আপনাকে স্বাগতম")
              console.log(data);
          }
  
          if(error){
            toast.error("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে")
              console.log(error);
              
          }
          
      }

      const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
          provider: "google",
        });
        console.log(data);
        
      };

    return (
        <div className="flex justify-center">

            
          <form onSubmit={onSubmit}>

            <h2>সাইন ইন</h2>
            <p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend">Login</legend>
  
  <label className="label">Email</label>
  <input name="email" type="email" className="input w-md" placeholder="Email" />

  <label className="label">Password</label>
  <input name="password" type="password" className="input w-md" placeholder="Password" />

  <button className="btn bg-green-600 text-white mt-4">সাইন ইন</button>
</fieldset>
          </form>
          <button
          onClick={handleGoogleSignIn} className="btn">Google দিয়ে চালিয়ে যান</button>
        </div>
    );
};

export default SignInPage;