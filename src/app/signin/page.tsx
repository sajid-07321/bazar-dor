

const SignInPage = () => {
    return (
        <div className="flex justify-center">

            
          <form>

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
        </div>
    );
};

export default SignInPage;