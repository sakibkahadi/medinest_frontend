/* eslint-disable react/prop-types */
import NoData from "@/customComponents/iconComponents/NoData";


const User = ({users,loading, handleAction}) => {
    
    return (
        <div className="p-6">
      <div className=" border-2 border-stone-400 ">
        <div className="p-3">
          <label className="mr-4" htmlFor="">
            {" "}
            Search:
          </label>
          <input
            type="text"
            placeholder="type here"
            className=" p-1 border-2 border-stone-400 rounded-md"
          />
        </div>
        <div className="divider "></div>
        <div className="p-3">
          <div className="overflow-x-hidden">
            {!loading? (
              <table className=" table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    
                    <th>Email</th>
                    <th>Phone</th>
                   
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <th><img className="w-20 h-20 rounded-full p-2" src={user.image} alt="User " /></th>
                      <td>{user?.name}</td>
                      
                      <td>{user?.email}</td>
                      <td>{user?.phoneNumber}</td>
                      <td>{user?.status}</td>
                      <td><button onClick={()=>handleAction(user?._id)} className={user?.status !== 'active' ? 'btn btn-error': 'btn btn-secondary'}>{user?.status === 'active'? 'Block' : 'Unblock'}</button></td>
                    </tr>
                    
                  ))}
                </tbody>
              </table>
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