import Image from 'next/image';




const Header = () => {
    return (
        <header className='container mx-auto flex justify-between mt-5'>
            <div className='flex gap-2'>
                <Image className='bg-green-600 rounded-2xl pr-1' src={'/logo-icon.png'}
                width={60}
                height={50}
                alt=''/>
                
                <div>
                    <div className='font-bold text-2xl'>বাজার দর</div> 
                <div>
                    <p className="text-gray-600">
            {new Date().toLocaleDateString("bn-BD", {
              day: "numeric",
              weekday: "long",
              month: "long",
              year: "numeric",
            })}
          </p>
                </div> 
                </div>
            </div>

           <div>
             <button className='btn'>সাইন ইন</button>
            <button className='btn bg-green-600 text-white'>সাইন আপ</button>
           </div>

          

        </header>

        
    );
};

export default Header;