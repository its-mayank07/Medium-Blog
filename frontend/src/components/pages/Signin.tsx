import Auth from "../Auth"
import Quote from "../Quote"


const Signin = () => {
  return (
    <div>
        <div className="grid grid-cols-1  lg:grid-cols-2 ">
            <div>
                <Auth type="signin"/>
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    </div>
  )
}

export default Signin