/* eslint-disable react/prop-types */
import NoData from "@/customComponents/iconComponents/NoData";


const User = ({users,loading, handleAction}) => {
    
    return (
        <div className="p-6">
      <div className=" border-2 border-stone-400 ">
       
        <div className="divider "></div>
        <div className="p-3">
          <div className="overflow-x-hidden">
            {!loading? (
              <div className="overflow-x-auto">
          <table className="table table-auto w-full text-sm md:text-base">
                {/* head */}
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    
                    <th>Email</th>
                 
                   
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <th><img className="w-20 h-20 rounded-full p-2" src={user.image} alt="User " /></th>
                      <td>{user?.name}</td>
                      
                      <td>{user?.email}</td>
                      
                      <td><button onClick={()=>handleAction(user?._id)} className={user?.status !== 'active' ? 'btn btn-error': 'btn btn-secondary'}>{user?.status === 'active'? 'Block' : 'Unblock'}</button></td>
                    </tr>
                    
                  ))}
                </tbody>
              </table> </div>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </div>
    );
};

export default User;