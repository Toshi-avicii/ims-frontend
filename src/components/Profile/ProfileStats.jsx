
function ProfileStats(props) {
  return (
    <div className="text-lg w-25"> 
        <h4 className="text-center lg:text-justify text-white">
            {props.stat}
            <span className="text-xs block text-gray-700">{props.name}</span>
        </h4>
    </div>
  )
}

export default ProfileStats